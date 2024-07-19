/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { createSuite } = require('../helpers');
const { css } = require('../../build/react-strict-dom-for-benchmarks');
const { styles } = require('../fixtures');

function runSuite(options) {
  const { suite, test } = createSuite('css.create', options);

  test('small', () => {
    css.create({
      small: styles.small
    });
  });

  test('small with units', () => {
    css.create({
      smallWithUnits: styles.smallWithUnits
    });
  });

  test('small with variables', () => {
    css.create({
      smallWithVariables: styles.smallWithVariables
    });
  });

  test('several small', () => {
    css.create({
      small: styles.small,
      smallWithUnits: styles.smallWithUnits
    });
  });

  test('large', () => {
    css.create({
      large: styles.large
    });
  });

  test('large with polyfills', () => {
    css.create({
      largeWithPolyfills: styles.largeWithPolyfills
    });
  });

  test('complex', () => {
    css.create({
      complex: styles.complex
    });
  });

  test('unsupported', () => {
    css.create({
      unsupported: styles.unsupported
    });
  });

  suite.run();
}

module.exports = runSuite;
