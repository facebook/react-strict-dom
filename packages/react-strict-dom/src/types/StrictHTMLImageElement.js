/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { StrictHTMLElement } from './StrictHTMLElement';

export interface StrictHTMLImageElement extends StrictHTMLElement {
  +complete: boolean;
  currentSrc: string;
  naturalHeight: number;
  naturalWidth: number;
}
