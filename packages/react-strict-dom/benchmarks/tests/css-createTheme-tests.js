/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { createSuite } = require('../helpers');
const { css } = require('../../build/react-strict-dom-for-benchmarks');
const { customProperties } = require('../fixtures');

function runSuite(options) {
  const { suite, test } = createSuite('css.createTheme', options);

  const simpleTokens = css.defineVars(customProperties.simple);
  const polyfillTokens = css.defineVars(customProperties.polyfills);

  test('simple theme', () => {
    css.createTheme(simpleTokens, {
      backgroundColor: 'darkred',
      borderWidth: 11,
      color: 'darkgreen',
      height: 1001,
      margin: 17,
      padding: 33,
      width: 1001
    });
  });

  test('polyfill theme', () => {
    css.createTheme(polyfillTokens, {
      backgroundColor: {
        default: 'blue',
        '@media (prefers-color-scheme:dark)': 'darkblue'
      },
      borderWidth: '1rem',
      color: 'lightblue',
      height: '91vh',
      margin: '2rem',
      padding: '3em',
      width: '91vw'
    });
  });

  suite.run();
}

module.exports = runSuite;
