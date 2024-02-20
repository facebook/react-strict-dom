/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

export type SpreadOptions = $ReadOnly<{
  customProperties: $ReadOnly<{ [string]: string | number }>,
  inheritedFontSize: ?number,
  fontScale: number | void,
  hover?: ?boolean,
  passthroughProperties: $ReadOnlyArray<string>,
  viewportHeight: number,
  viewportWidth: number,
  writingDirection?: ?'ltr' | 'rtl'
}>;
