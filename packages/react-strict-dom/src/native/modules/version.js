/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

// $FlowFixMe(nonstrict-import)
import * as ReactNative from '../react-native';

const reactNativeVersion = ReactNative.Platform.constants.reactNativeVersion;
const { major, minor, patch, prerelease } = reactNativeVersion;
// Main branch OSS build, or internal build
const isHead = major === 1000 && minor === 0 && patch === 0;
// Nightly NPM package
const isNightly =
  (typeof prerelease === 'string' && prerelease.startsWith('nightly-')) ||
  false;

type Version = {
  major: number,
  minor: number,
  patch: number,
  experimental: boolean
};

export const version: Version = {
  major,
  minor,
  patch,
  experimental: isHead || isNightly
};
