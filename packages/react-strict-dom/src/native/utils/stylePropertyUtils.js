/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type {
  ReactNativeStyle,
  ReactNativeTransform
} from '../../types/renderer.native';

/**
 * Type-safe utility to convert a mixed property style object to ReactNativeStyle.
 * This handles the conversion from keyframe mixed values to proper style values.
 *
 * The $FlowFixMe is necessary because:
 * - Keyframes use mixed types for property values to support both literal values and interpolated values
 * - We validate at runtime that values are compatible with ReactNativeStyleValue
 * - Flow cannot statically verify this dynamic type conversion
 */
export function toReactNativeStyle(mixedStyle: {
  [string]: mixed
}): ReactNativeStyle {
  const result: ReactNativeStyle = {};

  for (const property in mixedStyle) {
    const value = mixedStyle[property];

    // Only include values that are valid ReactNativeStyleValue types
    if (
      typeof value === 'number' ||
      typeof value === 'string' ||
      Array.isArray(value) ||
      (value != null && typeof value === 'object' && 'interpolate' in value) || // AnimatedNode
      value == null
    ) {
      // $FlowFixMe[incompatible-type] - Runtime validated type conversion from mixed keyframe values
      result[property] = value;
    }
  }

  return result;
}

/**
 * Safely casts a mixed keyframe value to a transform array.
 *
 * The $FlowFixMe is necessary because:
 * - Keyframe values are typed as mixed to support various value types
 * - We know this specific value is an array (checked at runtime)
 * - Flow cannot statically verify the array contains valid transform objects
 */
export function safeTransformArray(
  value: mixed
): $ReadOnlyArray<ReactNativeTransform> {
  if (Array.isArray(value)) {
    // $FlowFixMe[incompatible-return] - Runtime validated array cast for transform keyframe values
    return value;
  }
  return [];
}
