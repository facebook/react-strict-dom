/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { CallbackRef, Ref } from '../types/react';

export type RefType<TElement> = null | void | Ref<TElement>;

export function mergeRefs<TElement>(
  ...args: $ReadOnlyArray<RefType<TElement>>
): CallbackRef<TElement> {
  return function forwardRef(node: TElement | null) {
    args.forEach((ref) => {
      if (ref == null) {
        return;
      }
      if (typeof ref === 'function') {
        ref(node);
        return;
      }
      if (typeof ref === 'object') {
        ref.current = node;
        return;
      }
      console.error(
        `mergeRefs cannot handle refs of type boolean, number, or string. Received ref ${String(
          ref
        )}`
      );
    });
  };
}
