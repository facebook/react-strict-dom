/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { createSuite } = require('../helpers');
const { css } = require('../react-strict-dom');
const { customProperties, styles: stylesFixture } = require('../fixtures');

function runSuite(opts) {
  const { suite, test } = createSuite('css.props', opts);

  const options = {
    customProperties: customProperties.simple,
    fontScale: 1,
    hover: true,
    inheritedFontSize: 16,
    viewportHeight: 600,
    viewportWidth: 1024
  };

  const optionsVarUnits = {
    customProperties: customProperties.polyfills,
    fontScale: 1,
    hover: true,
    inheritedFontSize: 16,
    viewportHeight: 600,
    viewportWidth: 1024
  };

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

  test('small', () => {
    css.props.call(options, styles.small);
  });

  test('small with units', () => {
    css.props.call(options, styles.smallWithUnits);
  });

  test('small with variables', () => {
    css.props.call(options, styles.smallWithVariables);
  });

  test('small with variables of units', () => {
    css.props.call(optionsVarUnits, styles.smallWithVariables);
  });

  test('large', () => {
    css.props.call(options, styles.large);
  });

  test('large with polyfills', () => {
    css.props.call(optionsVarUnits, styles.largeWithPolyfills);
  });

  test('complex', () => {
    css.props.call(optionsVarUnits, styles.complex);
  });

  test('unsupported', () => {
    css.props.call(options, styles.unsupported);
  });

  // SIMPLE MERGE

  test('simple merge', () => {
    css.props.call(options, [styles.small, styles.smallWithUnits]);
  });

  // WIDE MERGE

  test('wide merge', () => {
    css.props.call(optionsVarUnits, [
      styles.small,
      false,
      styles.smallWithUnits,
      false,
      styles.large,
      null,
      styles.largeWithPolyfills,
      null,
      styles.complex
    ]);
  });

  // DEEP MERGE

  test('deep merge', () => {
    css.props.call(optionsVarUnits, [
      styles.small,
      [
        false,
        styles.smallWithUnits,
        [
          false,
          styles.large,
          [null, styles.largeWithPolyfills, [null, [styles.complex]]]
        ]
      ]
    ]);
  });

  // THEMED MERGE

  test('themed merge', () => {
    css.props.call(optionsVarUnits, [
      styles.simple,
      styles.simpleWithUnits,
      simpleTheme,
      styles.large,
      polyfillTheme
    ]);
  });

  suite.run();
}

module.exports = runSuite;
