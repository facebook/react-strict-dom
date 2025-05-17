/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const styleXPlugin = require('@stylexjs/postcss-plugin');

const plugin = ({
  cwd = process.cwd(),
  // By default reuses the Babel configuration from the project root.
  // Use `babelrc: false` to disable this behavior.
  babelConfig = {},
  include,
  exclude
}) => {
  include = [
    // Include the React Strict DOM package's source files by default
    require.resolve('react-strict-dom'),
    require.resolve('react-strict-dom/runtime'),
    ...(include ?? [])
  ];

  return styleXPlugin({
    cwd,
    babelConfig,
    include,
    exclude,
    useCSSLayers: true,
    importSources: [
      '@stylexjs/stylex',
      'stylex',
      { from: 'react-strict-dom', as: 'css' }
    ]
  });
};

plugin.postcss = true;

module.exports = plugin;
