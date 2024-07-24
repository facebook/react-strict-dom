/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const brotliSizePkg = require('brotli-size');
const fs = require('fs-extra');
const { minify_sync } = require('terser');

function getSizes(files) {
  const sizes = files.map((file) => {
    const code = fs.readFileSync(file, 'utf8');
    const result = minify_sync(code).code;
    const minified = Buffer.byteLength(result, 'utf8');
    const compressed = brotliSizePkg.sync(result);
    return { file, compressed, minified };
  });
  return sizes;
}

module.exports = {
  getSizes
};
