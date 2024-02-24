/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';

const isProduction = false;

const babelPlugin = babel({
  babelHelpers: 'bundled',
  configFile: require.resolve('./babel.config.js')
});

function internalLicensePlugin() {
  const header = `/**
 * @noflow
 * @nolint
 * @noformat
 * @generated
 */
/**
 * @license react-strict-dom
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';`;

  return {
    renderChunk(source) {
      return `${header}\n${source}`;
    }
  };
}

function ossLicensePlugin() {
  const header = `/**
 * @license react-strict-dom
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';`;

  return {
    renderChunk(source) {
      return `${header}\n${source}`;
    }
  };
}

const replacePlugin = replace({
  preventAssignment: true,
  values: {
    __DEV__: isProduction ? 'false' : 'true',
    'process.env.NODE_ENV': isProduction ? "'production'" : "'development'"
  }
});

function replaceImports(options = {}) {
  const { original, replacement, starAsSpecifier, defaultImportName } = options;

  return {
    name: 'replace-imports', // this name will show up in warnings and errors
    transform(code) {
      if (code.includes(original)) {
        const pattern = new RegExp(`(['"])${original}(['"])`, 'g');
        let newCode = code.replace(pattern, `$1${replacement}$2`);
        // If starAsSpecifier and defaultImportName are provided, replace "* as starAsSpecifier" with "defaultImportName"
        if (starAsSpecifier && defaultImportName) {
          const importSpecifierPattern = new RegExp(
            `\\* as ${starAsSpecifier}`,
            'g'
          );
          newCode = newCode.replace(importSpecifierPattern, defaultImportName);
        }
        return {
          code: newCode,
          map: { mappings: '' }
        };
      }
    }
  };
}

const sharedPlugins = [
  babelPlugin,
  replacePlugin,
  resolve(),
  // commonjs packages: styleq and css-mediaquery
  commonjs()
];

const ossPlugins = [...sharedPlugins, ossLicensePlugin()];

const internalPlugins = [
  ...sharedPlugins,
  internalLicensePlugin(),
  replaceImports({
    original: '@stylexjs/stylex',
    replacement: 'stylex',
    starAsSpecifier: 'stylex',
    defaultImportName: 'stylex'
  })
];

const nativePlugins = [];

/**
 * Web bundles
 */
const webConfigs = [
  // OSS build
  {
    external: ['react', 'react-dom', '@stylexjs/stylex'],
    input: require.resolve('../packages/react-strict-dom/src/dom/index.js'),
    output: {
      file: path.join(
        __dirname,
        '../packages/react-strict-dom/dist/dom/index.js'
      ),
      format: 'es'
    },
    plugins: [...ossPlugins]
  },
  // Runtime
  {
    external: ['react', 'react-dom', '@stylexjs/stylex'],
    input: require.resolve('../packages/react-strict-dom/src/dom/runtime.js'),
    output: {
      file: path.join(
        __dirname,
        '../packages/react-strict-dom/dist/dom/runtime.js'
      ),
      format: 'es'
    },
    plugins: [...ossPlugins]
  },
  // www build
  {
    external: ['react', 'react-dom', '@stylexjs/stylex'],
    input: require.resolve('../packages/react-strict-dom/src/dom/index.js'),
    output: {
      file: path.join(
        __dirname,
        '../packages/react-strict-dom/dist/dom.www.js'
      ),
      format: 'es'
    },
    plugins: [...internalPlugins]
  }
];

/**
 * Native bundles
 */
const nativeConfigs = [
  // OSS build
  {
    external: ['react', 'react-native', '@stylexjs/stylex'],
    input: require.resolve('../packages/react-strict-dom/src/native/index.js'),
    output: {
      file: path.join(
        __dirname,
        '../packages/react-strict-dom/dist/native/index.js'
      ),
      format: 'es'
    },
    plugins: [...nativePlugins, ...ossPlugins]
  },
  // fbsource build
  {
    external: ['react', 'react-native', '@stylexjs/stylex'],
    input: require.resolve('../packages/react-strict-dom/src/native/index.js'),
    output: {
      file: path.join(
        __dirname,
        '../packages/react-strict-dom/dist/native.fbsource.js'
      ),
      format: 'es'
    },
    plugins: [...nativePlugins, ...internalPlugins]
  }
];

export default [...webConfigs, ...nativeConfigs];
