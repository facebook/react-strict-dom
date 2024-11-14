/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const reactStrictPreset = require('react-strict-dom/babel-preset');

function getPlatform(caller) {
  return caller && caller.platform;
}

function getIsDev(caller) {
  if (caller?.isDev != null) return caller.isDev;
  // https://babeljs.io/docs/options#envname
  return (
    process.env.BABEL_ENV === 'development' ||
    process.env.NODE_ENV === 'development'
  );
}

module.exports = function (api) {
  //api.cache(true);

  const platform = api.caller(getPlatform);
  const dev = api.caller(getIsDev);

  const presets = ['babel-preset-expo'];
  const plugins = [];

  if (platform === 'web') {
    presets.push([reactStrictPreset, { debug: true, dev, rootDir: __dirname }]);
  }

  return {
    plugins,
    presets
  };
};
