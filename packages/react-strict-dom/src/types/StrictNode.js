/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { StrictEventTarget } from './StrictEventTarget';

export interface StrictNode extends StrictEventTarget {
  // properties
  nodeName: Node['nodeName'];
  parentElement: Node['parentElement'];

  // methods
  // Using `any` to ensure `Node` is a subtype of `StrictNode`
  contains(other: $FlowFixMe): boolean;
  getRootNode(options?: { composed: boolean, ... }): StrictNode;
}
