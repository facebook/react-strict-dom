/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';

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

const sharedPlugins = [
  babelPlugin,
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
    input: require.resolve('../src/dom/index.js'),
    output: {
      file: path.join(__dirname, '../dist/dom/index.js'),
      format: 'es'
    },
    plugins: [...ossPlugins]
  },
  // Runtime
  {
    external: ['react', 'react-dom', '@stylexjs/stylex'],
    input: require.resolve('../src/dom/runtime.js'),
    output: {
      file: path.join(__dirname, '../dist/dom/runtime.js'),
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
    input: require.resolve('../src/native/index.js'),
    output: {
      file: path.join(__dirname, '../dist/native/index.js'),
      format: 'es'
    },
    plugins: [...nativePlugins, ...ossPlugins]
  }
];

export default [...webConfigs, ...nativeConfigs];
