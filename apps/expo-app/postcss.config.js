/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  plugins: [
    require('react-strict-dom/postcss-plugin')({
      include: [
        'src/**/*.{js,jsx,mjs,ts,tsx}',
        '../../node_modules/example-ui/**/*.js'
      ]
    })
  ]
};
