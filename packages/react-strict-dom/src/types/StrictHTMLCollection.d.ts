/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { StrictHTMLElement } from './StrictHTMLElement';

// This interface is needed because flow-api-translator can't translate
// the Flow type correctly.
export interface StrictHTMLCollection<out Elem extends StrictHTMLElement> {
  [Symbol.iterator](): IterableIterator<Elem>;
  readonly length: number;
  readonly [index: number]: Elem;
}
