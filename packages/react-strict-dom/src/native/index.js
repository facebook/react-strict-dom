/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {
  StyleXStyles,
  StyleXStylesWithout,
  StaticStyles,
  Theme,
  VarGroup
} from '@stylexjs/stylex';

import typeof * as TStyleX from '@stylexjs/stylex';

import * as React from 'react';
import * as html from './html';
import * as cssRaw from './stylex';
import { ProvideCustomProperties } from './modules/ContextCustomProperties';

type StyleTheme<V, T> = Theme<V, T>;
type StyleVars<T> = VarGroup<T>;
type Styles<T> = StyleXStyles<T>;
type StylesWithout<T> = StyleXStylesWithout<T>;

type ProviderValue = $ReadOnly<{ [string]: string | number }>;

type ProviderProps = $ReadOnly<{
  children: React$MixedElement,
  customProperties: ProviderValue
}>;

function ThemeProvider(props: ProviderProps): React$MixedElement {
  const { children, customProperties } = props;

  return customProperties ? (
    <ProvideCustomProperties children={children} value={customProperties} />
  ) : (
    children
  );
}

const contexts = {
  ThemeProvider: ThemeProvider as typeof ThemeProvider
};

// Export using StyleX types as the shim has divergent types internally.
const css: TStyleX = cssRaw as $FlowFixMe;

export type { StaticStyles, StyleTheme, StyleVars, Styles, StylesWithout };

export { contexts, css, html };
