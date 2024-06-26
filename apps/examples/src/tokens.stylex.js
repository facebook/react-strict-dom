/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { VarGroup } from '@stylexjs/stylex';

import { css } from 'react-strict-dom';

export const tokens: VarGroup<
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
