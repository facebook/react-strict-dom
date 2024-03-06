/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import typeof * as TStyleX from '@stylexjs/stylex';

import * as html from './html';
import * as cssRaw from './stylex';
import { ThemeProvider } from './modules/ThemeContext';
import { typeof ThemeProvider as TThemeProvider } from './modules/ThemeContext';

const contexts = { ThemeProvider: (ThemeProvider: TThemeProvider) };

// Export using StyleX types as the shim has divergent types internally.
const css: TStyleX = (cssRaw: $FlowFixMe);

export { contexts, css, html };
