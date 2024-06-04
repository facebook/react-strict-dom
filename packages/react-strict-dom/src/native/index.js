/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import typeof * as TStyleX from '@stylexjs/stylex';
import { typeof CSSCustomPropertiesProvider as TCSSCustomPropertiesProvider } from './modules/CSSCustomPropertiesContext';

export * from '../types/StrictTypes';

import * as html from './html';
import * as cssRaw from './stylex';
import { CSSCustomPropertiesProvider } from './modules/CSSCustomPropertiesContext';

const contexts = {
  ThemeProvider: CSSCustomPropertiesProvider as TCSSCustomPropertiesProvider
};

// Export using StyleX types as the shim has divergent types internally.
const css: TStyleX = cssRaw as $FlowFixMe;

export { contexts, css, html };
