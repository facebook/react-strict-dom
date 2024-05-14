/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

export * from '../types/StrictTypes';

import * as html from './html';
import * as css from '@stylexjs/stylex';
import { createStrictDOMComponent } from './modules/createStrictDOMComponent';

export { css, html, createStrictDOMComponent };
