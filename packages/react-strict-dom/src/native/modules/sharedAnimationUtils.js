/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { ReactNativeStyle } from '../../types/renderer.native';

import { parseTimeValue } from '../css/parseTimeValue';
import * as ReactNative from '../react-native';

/**
 * Shared type guards used by both animations and transitions
 */
export function isNumber(num: mixed): num is number {
  return typeof num === 'number';
}

export function isString(str: mixed): str is string {
  return typeof str === 'string';
}

/**
 * Shared time value parser for duration/delay properties
 */
export function parseAnimationTimeValue(value: mixed): number {
  if (typeof value === 'number') {
    return value; // Use numeric values directly as milliseconds
  }
  if (typeof value === 'string') {
    return parseTimeValue(value); // Parse string values (e.g., "800ms", "1s")
  }
  return 0; // Default fallback
}

/**
 * Shared native driver capability detection
 * Determines if animation properties can use native driver for better performance
 */
export function canUseNativeDriver(
  properties: { [string]: mixed } | ReactNativeStyle | void
): boolean {
  if (properties === undefined) {
    return false;
  }
  for (const property in properties) {
    const value = properties[property];
    if (property === 'opacity') {
      continue;
    }
    if (
      property === 'transform' &&
      Array.isArray(value) &&
      !value.includes('skew')
    ) {
      continue;
    }
    return false;
  }
  return true;
}

/**
 * Shared easing function utility (used by both animations and transitions)
 * Converts CSS timing function names to React Native Easing functions
 */
export function getEasingFunction(input: ?string): (value: number) => number {
  if (input === 'ease') {
    return ReactNative.Easing.ease;
  } else if (input === 'ease-in') {
    return ReactNative.Easing.in(ReactNative.Easing.ease);
  } else if (input === 'ease-out') {
    return ReactNative.Easing.out(ReactNative.Easing.ease);
  } else if (input === 'ease-in-out') {
    return ReactNative.Easing.inOut(ReactNative.Easing.ease);
  } else if (input != null && input.includes('cubic-bezier')) {
    const chunk = input.split('cubic-bezier(')[1];
    const str = chunk.split(')')[0];
    const curve = str.split(',').map((point) => parseFloat(point.trim()));
    return ReactNative.Easing.bezier(...curve);
  }
  return ReactNative.Easing.linear;
}
