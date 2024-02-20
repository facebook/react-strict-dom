/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { StrictElement } from './StrictElement';

export interface StrictHTMLElement extends StrictElement {
  hidden: boolean;
  +offsetHeight: number;
  +offsetLeft: number;
  +offsetParent: ?StrictElement;
  +offsetTop: number;
  +offsetWidth: number;
  inert: boolean;

  // methods
  blur(): void;
  click(): void;
  focus(options?: FocusOptions): void;
}
