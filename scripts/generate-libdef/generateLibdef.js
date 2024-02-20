#!/usr/bin/env node

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

const { spawnSync } = require('child_process');
const fs = require('fs');
const fsPromises = require('fs/promises');
const monorepoPackage = require('../../package.json');
const onDeath = require('death');
const path = require('path');
const topologicalSort = require('./topologicalSort');
const translate = require('flow-api-translator');

const BOOK_EMOJI = '\u{1f4da}';
const CAT_EMOJI = '\u{1f408}';
const RUN_EMOJI = '\u{1f3c3}';

function spawn(command, args) {
  if (process.platform === 'win32' && ['npm', 'npx'].includes(command)) {
    command += '.cmd';
  }

  console.log(`${RUN_EMOJI} [RUN] ${command} ${args.join(' ')}`);

  // Use 'spawnSync' instead to ensure 'cleanupTempdir' is run if something happens
  const proc = spawnSync(command, args, {
    stdio: ['ignore', 'inherit', 'inherit']
  });
  if (proc.status !== 0) {
    throw (
      proc.error ||
      new Error(`${command} exited with code ${proc.status || proc.signal}`)
    );
  }
}

async function catAsync(files, toFile, processContents = null) {
  console.log(`${CAT_EMOJI} [CAT] ${files.join(' ')} >${toFile}`);

  const toFileHandle = await fsPromises.open(toFile, 'w');
  for (const file of files) {
    let fileContents = await fsPromises.readFile(file, { encoding: 'utf8' });
    if (processContents != null) {
      fileContents = processContents(fileContents);
    }
    await toFileHandle.write(fileContents);
  }
  await toFileHandle.close();
}

async function generateTypes(inputDir, outputDir) {
  await fsPromises.mkdir(outputDir, { recursive: true });
  const dirents = await fsPromises.readdir(inputDir, { withFileTypes: true });
  for (const dirent of dirents) {
    const inputFullPath = path.join(inputDir, dirent.name);
    const outputFullPath = path.join(outputDir, dirent.name);
    if (dirent.isDirectory()) {
      if (dirent.name !== '__tests__') {
        await generateTypes(inputFullPath, outputFullPath);
      }
    } else {
      // dirent is a file
      if (dirent.name.endsWith('.js')) {
        try {
          const fileContents = await fsPromises.readFile(inputFullPath, 'utf8');
          const outputFlowContents = await translate.translateFlowToFlowDef(
            fileContents,
            monorepoPackage.prettier
          );
          await fsPromises.writeFile(
            `${outputFullPath}.flow`,
            outputFlowContents
          );
          // TODO: Fix TSDef generation. flow-api-translator does not support
          //       React.ElementProps which is used throughout our code.
          // const outputTSContents = await translate.translateFlowToTSDef(
          //   fileContents,
          //   monorepoPackage.prettier
          // );
          // await fsPromises.writeFile(
          //   outputFullPath.replace(/\.js$/, '.d.ts'),
          //   outputTSContents
          // );
        } catch (err) {
          console.log(`Failed to process file: ${inputFullPath}`);
          throw err;
        }
      }
    }
  }
}

async function generatePlatformSpecificLibdef(platform, tempdir, depsFileInfo) {
  const sortedJsTempfile = path.join(tempdir, 'sorted.js');
  const orderedFiles = topologicalSort(
    path.join(tempdir, 'typegen', platform, 'index.js.flow'),
    depsFileInfo
  );
  // HACK: exclude the index file because it uses a namespace import, which our
  //       codemod script can't handle
  orderedFiles.pop();
  await catAsync(orderedFiles, sortedJsTempfile);

  spawn('npx', [
    '--no-install',
    'jscodeshift',
    '--fail-on-error',
    '-t',
    './scripts/generate-libdef/fixFlatImports.js',
    sortedJsTempfile
  ]);

  // Ensure the destination directory exists.
  const libdefDirectoryPath = path.join('packages/react-strict-dom/dist');
  await fsPromises.mkdir(libdefDirectoryPath, { recursive: true });

  const libdefFilePath = path.join(libdefDirectoryPath, `${platform}.js.flow`);
  await catAsync(
    [
      'scripts/generate-libdef/libdef.prefix',
      sortedJsTempfile,
      'scripts/generate-libdef/libdef.suffix'
    ],
    libdefFilePath,
    (fileContents) => {
      return fileContents
        .split('\n')
        .map((line) => line.replace(/^type /, 'declare type '))
        .join('\n');
    }
  );

  return libdefFilePath;
}

async function runInTempdir(tempdir) {
  const depGraphTempfile = path.join(tempdir, 'dep_graph');

  await generateTypes(
    'packages/react-strict-dom/src',
    path.join(tempdir, 'typegen')
  );

  spawn('npm', [
    'run',
    'flow',
    '--',
    'graph',
    'dep-graph',
    '--strip-root',
    '--out',
    depGraphTempfile
  ]);

  const depGraphContents = await fsPromises.readFile(depGraphTempfile, {
    encoding: 'utf8'
  });
  const depGraphLines = depGraphContents.split('\n');
  const depsFileInfo = [];
  for (const line of depGraphLines) {
    if (line.includes('->') && !line.includes('node_modules')) {
      const [outbound, inbound] = line.split(' ').flatMap((s) => {
        if (s === '' || s === '->') {
          return [];
        }
        return [JSON.parse(s)];
      });
      depsFileInfo.push({ inbound, outbound });
    }
  }

  const libdefForDom = await generatePlatformSpecificLibdef(
    'dom',
    tempdir,
    depsFileInfo
  );
  const libdefForDomInternal = 'packages/react-strict-dom/dist/dom.www.js.flow';
  await fsPromises.copyFile(libdefForDom, libdefForDomInternal);
  spawn('npx', [
    '--no-install',
    'jscodeshift',
    '--fail-on-error',
    '-t',
    './scripts/generate-libdef/fixStyleXTypeImport.js',
    libdefForDomInternal
  ]);
  const libdefForNative = await generatePlatformSpecificLibdef(
    'native',
    tempdir,
    depsFileInfo
  );
  spawn('npx', [
    '--no-install',
    'prettier',
    '--write',
    libdefForDom,
    libdefForDomInternal,
    libdefForNative
  ]);
}

async function run() {
  process.chdir(path.resolve(__dirname, '../..'));

  const tempdir = await fsPromises.mkdtemp('libdef');
  const cleanupTempdir = () => {
    fs.rmSync(tempdir, { force: true, recursive: true });
  };
  onDeath(cleanupTempdir);

  try {
    await runInTempdir(tempdir);
  } finally {
    cleanupTempdir();
  }
}

run()
  .then(() => {
    console.log(`${BOOK_EMOJI} [SUCCESS] Successfully generated libdefs`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
