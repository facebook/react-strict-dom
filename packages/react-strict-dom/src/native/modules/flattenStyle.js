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
  for (const style of flatArray) {
    if (style != null && typeof style === 'object') {
      for (const [key, val] of Object.entries(style)) {
        if (
          (key.startsWith('@') || key.startsWith(':')) &&
          val != null &&
          typeof val === 'object'
        ) {
          result[key] = Object.assign(
            {},
            result[key] != null && typeof result[key] === 'object'
              ? result[key]
              : null,
            val
          );
        } else {
          // $FlowFixMe
          result[key] = val;
        }
      }
    }
  }
  return result;
}
