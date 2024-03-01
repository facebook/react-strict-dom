/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as html from './html';
import * as css from './stylex';
import { ThemeProvider } from './modules/ThemeContext';
import { typeof ThemeProvider as TThemeProvider } from './modules/ThemeContext';

const contexts = { ThemeProvider: (ThemeProvider: TThemeProvider) };

export { contexts, css, html };
