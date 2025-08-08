/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { CustomProperties, Style, Styles } from '../../types/styles';

const emptyValue = [{}, null];

export function extractStyleThemes(
  mixOfStyleAndTheme: ?Styles | Style | Array<Styles | Style>
): [Style, ?CustomProperties] {
  if (mixOfStyleAndTheme === null || typeof mixOfStyleAndTheme !== 'object') {
    return emptyValue;
  }

  const style: { ...Style } = {};
  const theme: { ...CustomProperties } = {};
  let hasTheme = false;

  const flatArray = [mixOfStyleAndTheme].flat(Infinity);
  for (let i = 0; i < flatArray.length; i++) {
    const item = flatArray[i];
    if (item !== null && typeof item === 'object') {
      if (item.$$theme != null) {
        for (const key in item) {
          if (item[key] !== undefined) {
            hasTheme = true;
            theme[key] = item[key];
          }
        }
      } else {
        Object.assign(style, item);
      }
    }
  }

  const themeValue = hasTheme ? theme : null;

  return [style, themeValue];
}
