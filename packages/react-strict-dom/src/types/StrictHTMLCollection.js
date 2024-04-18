/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { StrictHTMLElement } from './StrictHTMLElement';

export interface StrictHTMLCollection<+Elem: StrictHTMLElement> {
  @@iterator(): Iterator<Elem>;
  +length: number;
  +[index: number | string]: Elem;
}
