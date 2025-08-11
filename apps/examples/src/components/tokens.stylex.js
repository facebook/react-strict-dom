/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { StyleVars } from 'react-strict-dom';

import { css } from 'react-strict-dom';

export const tokens: StyleVars<
  $ReadOnly<{
    squareColor: string,
    textColor: string,
    inputColor: string,
    inputPlaceholderColor: string
  }>
> = css.defineVars({
  squareColor: 'red',
  textColor: {
    default: 'darkred',
    '@media (prefers-color-scheme: dark)': 'lightred'
  },
  inputColor: 'red',
  inputPlaceholderColor: 'pink'
});

export const themeColors: StyleVars<
  $ReadOnly<{
    primary100: string,
    primary200: string
  }>
> = css.defineVars({
  primary100: 'black',
  primary200: 'white'
});

export const systemColors: StyleVars<
  $ReadOnly<{
    squareColor: string,
    outlineColor: string
  }>
> = css.defineVars({
  squareColor: themeColors.primary100,
  outlineColor: themeColors.primary200
});
