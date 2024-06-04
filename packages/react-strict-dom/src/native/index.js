/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import typeof * as TStyleX from '@stylexjs/stylex';
export * from '../types/StrictTypes';

import * as React from 'react';
import * as html from './html';
import * as cssRaw from './stylex';
import { CustomPropertiesProvider } from './modules/ContextCustomProperties';

type ProviderValue = $ReadOnly<{ [string]: string | number }>;

type ProviderProps = $ReadOnly<{
  children: React$MixedElement,
  customProperties: ProviderValue
}>;

function ThemeProvider(props: ProviderProps): React$MixedElement {
  const { children, customProperties } = props;

  return customProperties ? (
    <CustomPropertiesProvider children={children} value={customProperties} />
  ) : (
    children
  );
}

const contexts = {
  ThemeProvider: ThemeProvider as typeof ThemeProvider
};

// Export using StyleX types as the shim has divergent types internally.
const css: TStyleX = cssRaw as $FlowFixMe;

export { contexts, css, html };
