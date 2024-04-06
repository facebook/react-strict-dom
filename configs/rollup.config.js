/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { babel } from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';

const isProduction = false;

const babelPlugin = babel({
  babelHelpers: 'bundled',
  configFile: require.resolve('./babel.config.js')
});

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

const sharedPlugins = [
  babelPlugin,
  replacePlugin,
  resolve(),
  // commonjs packages: styleq and css-mediaquery
  commonjs()
];

const ossPlugins = [...sharedPlugins, ossLicensePlugin()];

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
  // Build for Node.js benchmarks
  {
    external: ['react'],
    input: require.resolve('../packages/react-strict-dom/src/native/index.js'),
    output: {
      file: path.join(
        __dirname,
        '../packages/react-strict-dom/build/native-bench.js'
      ),
      format: 'commonjs'
    },
    plugins: [
      // alias react-native to mock
      alias({
        entries: [
          {
            find: 'react-native',
            replacement: path.resolve(
              __dirname,
              '../packages/react-strict-dom/tests/benchmarks/react-native.js'
            )
          }
        ]
      }),
      ...nativePlugins,
      ...ossPlugins
    ]
  }
];

export default [...webConfigs, ...nativeConfigs];
