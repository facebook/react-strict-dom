/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { ReactNativeTransform } from '../../types/renderer.native';
import { parseTransform } from './parseTransform';

/**
 * Identity transform array used as a safe fallback.
 * This represents "no transformation" and is always safe to interpolate.
 */
export const IDENTITY_TRANSFORM: Array<ReactNativeTransform> = [];

/**
 * Normalizes any transform value to a consistent ReactNativeTransform[] format.
 * This is the single source of truth for transform value conversion.
 */
export function normalizeTransformValue(
  value: string | Array<ReactNativeTransform> | null | void
): Array<ReactNativeTransform> {
  // Handle null/undefined - return identity transform
  if (value == null) {
    return [...IDENTITY_TRANSFORM];
  }

  // Handle CSS string transforms
  if (typeof value === 'string') {
    try {
      const parsedTransform = parseTransform(value).resolveTransformValue();
      if (Array.isArray(parsedTransform)) {
        // Create a mutable copy to ensure type safety
        return [...parsedTransform];
      }
    } catch (error) {
      // Parse failed, use identity transform
    }
    return [...IDENTITY_TRANSFORM];
  }

  // Handle array transforms
  if (Array.isArray(value)) {
    // Validate that each element is a proper transform object
    const validatedTransforms = value.filter((transform): boolean => {
      if (transform == null || typeof transform !== 'object') {
        return false;
      }

      // Check that it has at least one valid transform property
      const validProperties = [
        'matrix',
        'perspective',
        'rotate',
        'rotateX',
        'rotateY',
        'rotateZ',
        'scale',
        'scaleX',
        'scaleY',
        'scaleZ',
        'skewX',
        'skewY',
        'translateX',
        'translateY'
      ];

      return validProperties.some((prop) => prop in transform);
    });

    if (validatedTransforms.length > 0) {
      // Return a mutable copy of validated transforms
      return [...validatedTransforms];
    }
  }

  // Fallback to identity transform for any invalid input
  return [...IDENTITY_TRANSFORM];
}

/**
 * Validates that a value represents a proper transform array.
 * Used for runtime validation where needed.
 */
export function isValidTransformArray(value: mixed): boolean {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.every((transform): boolean => {
    if (transform == null || typeof transform !== 'object') {
      return false;
    }

    // Check for at least one valid transform property
    const validProperties = [
      'matrix',
      'perspective',
      'rotate',
      'rotateX',
      'rotateY',
      'rotateZ',
      'scale',
      'scaleX',
      'scaleY',
      'scaleZ',
      'skewX',
      'skewY',
      'translateX',
      'translateY'
    ];

    return validProperties.some((prop) => prop in transform);
  });
}

/**
 * Creates a normalized transform array from keyframe data.
 * This function handles the specific case of extracting transform values
 * from keyframe objects where the property might be missing or invalid.
 */
export function normalizeKeyframeTransform(
  keyframeValue: mixed,
  fallbackValue?: Array<ReactNativeTransform>
): Array<ReactNativeTransform> {
  // Type guard for mixed value - handle each case explicitly
  let typedValue: string | Array<ReactNativeTransform> | null | void = null;

  if (typeof keyframeValue === 'string') {
    typedValue = keyframeValue;
  } else if (Array.isArray(keyframeValue)) {
    // Validate it's an array of transform objects before using it
    const isValidTransformArray = keyframeValue.every((item) => {
      return item != null && typeof item === 'object';
    });
    if (isValidTransformArray) {
      // Use type assertion after validation - mixed type needs to be cast
      // Flow doesn't understand that our runtime validation ensures this is safe
      // $FlowFixMe[unclear-type] - Runtime validated mixed type
      typedValue = keyframeValue as any;
    }
  }

  const normalized = normalizeTransformValue(typedValue);

  // If normalization resulted in identity transform and we have a fallback, use it
  if (
    normalized.length === 0 &&
    fallbackValue != null &&
    fallbackValue.length > 0
  ) {
    return [...fallbackValue];
  }

  return normalized;
}
