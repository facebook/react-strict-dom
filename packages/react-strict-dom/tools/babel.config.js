/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const createConfig = ({ modules, target }) => {
  const plugins = ['babel-plugin-syntax-hermes-parser'];
  const presets = [
    [
      '@babel/preset-react',
      {
        runtime: 'automatic'
      }
    ],
    '@babel/preset-flow'
  ];

  if (process.env.NODE_ENV === 'test') {
    if (target === 'dom') {
      plugins.push([
        '@stylexjs/babel-plugin',
        {
          styleResolution: 'property-specificity'
        }
      ]);
    }
    presets.push([
      '@babel/preset-env',
      {
        loose: true,
        modules,
        exclude: ['transform-typeof-symbol'],
        targets: {
          browsers: [
            'chrome 49',
            'firefox 52',
            'ios_saf 11',
            'safari 11',
            'edge 79',
            'opera 36'
          ]
        }
      }
    ]);
  }

  return {
    assumptions: {
      iterableIsArray: true
    },
    comments: false,
    presets,
    plugins
  };
};

function createPreset(opts) {
  return process.env.BABEL_ENV === 'commonjs' || process.env.NODE_ENV === 'test'
    ? createConfig({ ...opts, modules: 'commonjs' })
    : createConfig({ ...opts, modules: false });
}

module.exports = function (api, opts) {
  if (api) {
    api.cache(true);
  }

  return {
    presets: [createPreset(opts)]
  };
};
