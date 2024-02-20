/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

type Values = $ReadOnly<{
  type?: 'screen',
  width?: number,
  height?: number,
  orientation?: 'landscape' | 'portrait',
  'aspect-ratio'?: number,
  direction?: 'ltr' | 'rtl'
}>;

declare module 'css-mediaquery' {
  declare module.exports: {
    match: (string, Values) => boolean
  };
}
