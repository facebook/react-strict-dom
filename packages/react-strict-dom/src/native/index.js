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
  Types,
  VarGroup
} from '@stylexjs/stylex';

import typeof * as TStyleX from '@stylexjs/stylex';

import * as React from 'react';
import * as compat from './compat';
import * as html from './html';
import * as _css from './css';
import { ProvideCustomProperties } from './modules/ContextCustomProperties';
import { ProvideViewportScale } from './modules/ContextViewportScale';

type ProviderValue = $ReadOnly<{ [string]: string | number }>;

type ProviderProps = $ReadOnly<{
  children: React.Node,
  customProperties: ProviderValue
}>;

function ThemeProvider(props: ProviderProps): React.Node {
  const { children, customProperties } = props;

  return customProperties ? (
    <ProvideCustomProperties children={children} value={customProperties} />
  ) : (
    children
  );
}

const contexts = {
  ThemeProvider: ThemeProvider as typeof ThemeProvider,
  ViewportProvider: ProvideViewportScale as typeof ProvideViewportScale
};

// Export using StyleX types as the shim has divergent types internally.
const css: TStyleX = _css as $FlowFixMe;

export type { StaticStyles };
export type { StyleXStyles as Styles };
export type { StyleXStylesWithout as StylesWithout };
export type { Theme as StyleTheme };
export type { Types as StyleTypes };
export type { VarGroup as StyleVars };

export { compat, contexts, css, html };
