/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { Style, Styles } from '../../types/styles';

// TODO: optimize
export function flattenStyle(
  style: ?Styles | Style | Array<Styles | Style>
): ?{ ...Style } {
  if (style === null || typeof style !== 'object') {
    return undefined;
  }

  if (!Array.isArray(style)) {
    if (style.$$css) {
      // This will never actually happen, but it fixes the types
      return undefined;
    }
    return { ...style };
  }

  const result: { ...Style } = {};
  for (let i = 0, styleLength = style.length; i < styleLength; ++i) {
    const computedStyle = flattenStyle(style[i]);
    if (computedStyle) {
      for (const key in computedStyle) {
        result[key] = computedStyle[key];
      }
    }
  }
  return result;
}
