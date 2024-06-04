/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { createSuite } = require('./helpers');

const { css } = require('../build/react-strict-dom-for-benchmarks');
const { extractStyleThemes } = require('../build/extractStyleThemes');
const { flattenStyle } = require('../build/flattenStyle');
const { customProperties, styles: stylesFixture } = require('./fixtures');

const { suite, test } = createSuite('internals');

const styles = css.create(stylesFixture);
const simpleTokens = css.defineVars(customProperties.simple);
const polyfillTokens = css.defineVars(customProperties.polyfills);
const simpleTheme = css.createTheme(simpleTokens, {
  backgroundColor: 'darkred',
  borderWidth: 11,
  color: 'darkgreen',
  height: 1001,
  margin: 17,
  padding: 33,
  width: 1001
});
const polyfillTheme = css.createTheme(polyfillTokens, {
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

// Testing internals that are potentially expensive parts of element rendering

test('extractStyleThemes', () => {
  extractStyleThemes([
    styles.simple,
    styles.simpleWithUnits,
    simpleTheme,
    styles.large,
    polyfillTheme
  ]);
});

test('flattenStyle', () => {
  flattenStyle([
    styles.simple,
    styles.simpleWithUnits,
    styles.large,
    styles.largeWithPolyfills
  ]);
});

suite.run();
