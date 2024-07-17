/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { Style as ReactNativeStyle } from '../../types/react-native';

/**
 * Unitless lineHeight acts as a fontSize multiplier. It is only fully resolved
 * at the point at which an element is being styled, so that inherited values
 * remain correct rather than being prematurely resolved to pixel values.
 */
export function resolveUnitlessLineHeight(
  style: ReactNativeStyle
): ReactNativeStyle {
  if (typeof style?.lineHeight === 'string') {
    const fontSize = typeof style?.fontSize === 'number' ? style.fontSize : 16;
    style.lineHeight = parseFloat(style.lineHeight) * fontSize;
  }
  return style;
}
