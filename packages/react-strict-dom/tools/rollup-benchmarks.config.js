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

const babelPlugin = babel({
  babelHelpers: 'bundled',
  configFile: require.resolve('./babel.config.js')
});

/**
 * Build for Node.js benchmarks
 */
const config = [
  {
    external: ['react'],
    input: require.resolve('../src/native/index.js'),
    output: {
      file: path.join(__dirname, '../build/react-strict-dom-for-benchmarks.js'),
      format: 'commonjs'
    },
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          __DEV__: 'false'
        }
      }),
      // alias react-native to mock
      alias({
        entries: [
          {
            find: 'react-native',
            replacement: path.resolve(
              __dirname,
              './rollup/mock-react-native-for-benchmarks.js'
            )
          }
        ]
      }),
      babelPlugin,
      resolve(),
      // commonjs packages: css-mediaquery
      commonjs()
    ]
  },
  {
    input: require.resolve('../src/native/modules/extractStyleThemes.js'),
    output: {
      file: path.join(__dirname, '../build/extractStyleThemes.js'),
      format: 'commonjs'
    },
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          __DEV__: 'false'
        }
      }),
      babelPlugin,
      resolve()
    ]
  },
  {
    input: require.resolve('../src/native/modules/flattenStyle.js'),
    output: {
      file: path.join(__dirname, '../build/flattenStyle.js'),
      format: 'commonjs'
    },
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          __DEV__: 'false'
        }
      }),
      babelPlugin,
      resolve()
    ]
  }
];

export default config;
