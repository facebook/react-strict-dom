/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

const babel = require('@babel/core');
const reactStrictBabelPreset = require('react-strict-dom/babel-preset');

// Creates a stateful bundler for processing StyleX rules using Babel.
module.exports = function createBundler() {
  const styleXRulesMap = new Map();

  // Determines if the source code should be transformed based on the presence of StyleX/RSD imports.
  function shouldTransform(sourceCode) {
    return (
      sourceCode.includes('stylex') || sourceCode.includes('react-strict-dom')
    );
  }

  // Transforms the source code using Babel, extracting StyleX rules and storing them.
  async function transform(id, sourceCode, babelConfig, options) {
    const { isDev, shouldSkipTransformError } = options;
    const { code, map, metadata } = await babel
      .transformAsync(sourceCode, {
        filename: id,
        caller: {
          name: 'react-strict-dom/postcss-plugin',
          platform: 'web',
          isDev,
          supportsStaticESM: true
        },
        ...babelConfig
      })
      .catch((error) => {
        if (shouldSkipTransformError) {
          console.warn(
            `[react-strict-dom/postcss-plugin] Failed to transform "${id}": ${error.message}`
          );

          return { code: sourceCode, map: null, metadata: {} };
        }
        throw error;
      });

    const stylex = metadata.stylex;
    if (stylex != null && stylex.length > 0) {
      styleXRulesMap.set(id, stylex);
    }

    return { code, map, metadata };
  }

  // Removes the stored StyleX rules for the specified file.
  function remove(id) {
    styleXRulesMap.delete(id);
  }

  //  Bundles all collected StyleX rules into a single CSS string.
  function bundle({ useCSSLayers }) {
    const rules = Array.from(styleXRulesMap.values()).flat();

    const css = reactStrictBabelPreset.generateStyles(rules);

    return css;
  }

  return {
    shouldTransform,
    transform,
    remove,
    bundle
  };
};
