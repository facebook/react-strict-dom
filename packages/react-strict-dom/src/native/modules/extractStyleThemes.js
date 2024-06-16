/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { Style, Styles } from '../../types/styles';

type CustomProperties = { [key: string]: string | number };

const emptyValue = [undefined, undefined];

export function extractStyleThemes(
  mixOfStyleAndTheme: ?Styles | Style | Array<Styles | Style>
): [?Array<Styles | Style>, ?CustomProperties] {
  if (mixOfStyleAndTheme === null || typeof mixOfStyleAndTheme !== 'object') {
    return emptyValue;
  }

  const styles: Array<Styles | Style> = [];
  const theme: { ...CustomProperties } = {};

  const flatArray = [mixOfStyleAndTheme].flat(Infinity);
  for (let i = 0, l = flatArray.length; i < l; ++i) {
    const item = flatArray[i];
    if (item !== null && typeof item === 'object') {
      if (item.$$theme != null) {
        for (const key in item) {
          if (typeof item[key] === 'string') {
            theme[key] = item[key];
          }
        }
      } else {
        // $FlowFixMe[incompatible-call]
        styles.push(item);
      }
    }
  }

  const themeValue = Object.keys(theme).length > 0 ? theme : null;

  return [styles, themeValue];
}
