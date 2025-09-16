/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  plugins: {
    'react-strict-dom/postcss-plugin': {
      include: [
        'src/**/*.{js,jsx,ts,tsx}',
        '../../node_modules/example-ui/**/*.js'
      ],
      babelConfig: {
        babelrc: false,
        parserOpts: {
          plugins: ['typescript', 'jsx']
        },
        presets: [
          [
            'react-strict-dom/babel-preset',
            {
              debug: dev,
              dev,
              rootDir: process.cwd()
            }
          ]
        ]
      }
    },
    autoprefixer: {}
  }
};
