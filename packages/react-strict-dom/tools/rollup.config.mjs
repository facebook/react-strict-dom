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

const __dirname = import.meta.dirname;

const babelPlugin = babel({
  babelHelpers: 'bundled',
  configFile: path.resolve(__dirname, 'rollup/babelConfig.mjs')
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
  ossLicensePlugin(),
  resolve(),
  commonjs(), // commonjs packages: styleq and css-mediaquery
];

/**
 * Web bundles
 */
const webConfigs = [
  // OSS build
  {
    external: ['react', 'react/jsx-runtime', 'react-dom', '@stylexjs/stylex'],
    input: path.join(__dirname, '../src/dom/index.js'),
    output: {
      file: path.join(__dirname, '../dist/dom/index.js'),
      format: 'es'
    },
    plugins: [...sharedPlugins]
  },
  // Runtime
  {
    external: ['react', 'react/jsx-runtime', 'react-dom', '@stylexjs/stylex'],
    input: path.join(__dirname, '../src/dom/runtime.js'),
    output: {
      file: path.join(__dirname, '../dist/dom/runtime.js'),
      format: 'es'
    },
    plugins: [...sharedPlugins]
  }
];

/**
 * Native bundles
 */
const nativeConfigs = [
  // OSS build
  {
    external: [
      'react',
      'react/jsx-runtime',
      /^react-native.*/,
      '@stylexjs/stylex'
    ],
    input: path.join(__dirname, '../src/native/index.js'),
    output: {
      file: path.join(__dirname, '../dist/native/index.js'),
      format: 'es'
    },
    plugins: [...sharedPlugins]
  }
];

export default [...webConfigs, ...nativeConfigs];
