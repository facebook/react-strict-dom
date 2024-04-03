/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

'use strict';

const validStyles = require('./valid-styles');

const rules: {
  'valid-styles': typeof validStyles
} = {
  'valid-styles': validStyles
};

module.exports = { rules };
