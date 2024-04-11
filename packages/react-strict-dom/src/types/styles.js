/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type {
  InlineStyles,
  StyleXArray,
  StyleXStyles,
  Theme,
  VarGroup
} from '@stylexjs/stylex/lib/StyleXTypes';

import typeof TStyleX from '@stylexjs/stylex';

export type Style = InlineStyles;

export type Styles = StyleXArray<
  StyleXStyles<> | Theme<VarGroup<{ +[string]: mixed }>>
>;

export type IStyleX = $ReadOnly<{
  create: TStyleX['create'],
  firstThatWorks: TStyleX['firstThatWorks'],
  keyframes: TStyleX['keyframes'],
  props: TStyleX['props'],
  defineVars: TStyleX['defineVars'],
  createTheme: TStyleX['createTheme'],
  ...
}>;
