/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';

/**
 * Build for Node.js benchmarks
 */
const config = [
  {
    external: ['react', 'react/jsx-runtime'],
    input: require.resolve('../../react-strict-dom/dist/native/index.js'),
    output: {
      file: path.join(__dirname, './build/react-strict-dom.js'),
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
            find: /^react-native$/,
            replacement: path.resolve(__dirname, './mocks/react-native.js')
          },
          {
            find: 'react-native/Libraries/Components/View/ViewNativeComponent',
            replacement: path.resolve(
              __dirname,
              './mocks/ViewNativeComponent.js'
            )
          },
          {
            find: 'react-native/Libraries/Text/TextAncestor',
            replacement: path.resolve(
              __dirname,
              './mocks/TextAncestorContext.js'
            )
          }
        ]
      }),
      resolve()
    ]
  }
];

export default config;
