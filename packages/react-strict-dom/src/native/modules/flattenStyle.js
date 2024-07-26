/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { Style, Styles } from '../../types/styles';

const emptyObject = {};

export function flattenStyle(
  style: ?Styles | Style | Array<Styles | Style>
): Style {
  if (style === null || typeof style !== 'object') {
    return emptyObject;
  }

  if (!Array.isArray(style)) {
    if (style.$$css) {
      // This will never actually happen, but it fixes the types
      return emptyObject;
    }
    return style;
  }

  const flatArray = style.flat(Infinity);
  const result: { ...Style } = {};
  for (let i = 0; i < flatArray.length; i++) {
    const style = flatArray[i];
    if (style != null && typeof style === 'object') {
      Object.assign(result, style);
    }
  }
  return result;
}
