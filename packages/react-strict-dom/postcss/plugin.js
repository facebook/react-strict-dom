/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const postcssPlugin = require('postcss-react-strict-dom');

const plugin = ({
  cwd = process.cwd(),
  // By default reuses the Babel configuration from the project root.
  // Use `babelrc: false` to disable this behavior.
  babelConfig = {},
  include,
  exclude
}) => {
  return postcssPlugin({
    cwd,
    babelConfig,
    include,
    exclude
  });
};

plugin.postcss = true;

module.exports = plugin;
