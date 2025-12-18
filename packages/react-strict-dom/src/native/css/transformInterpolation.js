/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { ReactNativeTransform } from '../../types/renderer.native';

import * as ReactNative from '../react-native';

/**
 * Transform property metadata for maintaining type safety and reducing repetition
 * Exported for use in other transform-related modules
 */
export type TransformProperty =
  | 'perspective'
  | 'rotate'
  | 'rotateX'
  | 'rotateY'
  | 'rotateZ'
  | 'scale'
  | 'scaleX'
  | 'scaleY'
  | 'scaleZ'
  | 'skewX'
  | 'skewY'
  | 'translateX'
  | 'translateY';

export const TRANSFORM_PROPERTIES: $ReadOnlyArray<TransformProperty> = [
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

/**
 * Extract a specific property value from a transform object using property existence check
 */
function getTransformPropertyValue(
  transform: ReactNativeTransform,
  property: TransformProperty
): mixed {
  // Check if this transform variant has the requested property
  if (property in transform) {
    // We know the property exists, so we can access it safely
    // Cast needed due to Flow's strict union type checking
    return (transform as $FlowFixMe)[property] ?? null;
  }
  return null;
}

/**
 * Create a transform object with a single property set using computed property names
 * Exported for use in other transform-related modules
 */
export function createTransformWithProperty(
  property: TransformProperty,
  value: mixed
): { [string]: mixed } {
  return { [property]: value };
}

/**
 * Check if transform arrays have the same length, types and order.
 * Reused from useStyleTransition.js
 */
export function transformsHaveSameLengthTypesAndOrder(
  transformsA: $ReadOnlyArray<ReactNativeTransform>,
  transformsB: $ReadOnlyArray<ReactNativeTransform>
): boolean {
  if (transformsA.length !== transformsB.length) {
    return false;
  }

  for (let i = 0; i < transformsA.length; i++) {
    const transformA = transformsA[i];
    const transformB = transformsB[i];

    // Check that both transforms have the same properties present/absent
    for (const property of TRANSFORM_PROPERTIES) {
      const hasPropertyA =
        getTransformPropertyValue(transformA, property) != null;
      const hasPropertyB =
        getTransformPropertyValue(transformB, property) != null;

      if (hasPropertyA !== hasPropertyB) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Interpolate a single transform property between two values
 */
export function interpolateTransformProperty(
  animatedValue: ReactNative.Animated.Value,
  inputRange: $ReadOnlyArray<number>,
  outputRange: $ReadOnlyArray<number | string>
): mixed {
  return animatedValue.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp'
  });
}

/**
 * Create an animated transform object for a specific transform property
 */
export function createAnimatedTransform(
  property: string,
  animatedValue: ReactNative.Animated.Value,
  inputRange: $ReadOnlyArray<number>,
  outputRange: $ReadOnlyArray<number | string>
): { [string]: mixed } {
  return {
    [property]: interpolateTransformProperty(
      animatedValue,
      inputRange,
      outputRange
    )
  };
}

/**
 * Extract values for a specific transform property from an array of transform objects
 */
export function extractTransformPropertyValues(
  transforms: $ReadOnlyArray<ReactNativeTransform>,
  property: TransformProperty
): Array<mixed> {
  return transforms.map((transform) => {
    return getTransformPropertyValue(transform, property);
  });
}

/**
 * Check if all transform arrays have the same structure for a specific property
 */
export function validateTransformPropertyConsistency(
  transformArrays: $ReadOnlyArray<$ReadOnlyArray<ReactNativeTransform>>,
  property: TransformProperty
): boolean {
  if (transformArrays.length < 2) {
    return true;
  }

  const firstValues = extractTransformPropertyValues(
    transformArrays[0],
    property
  );

  for (let i = 1; i < transformArrays.length; i++) {
    const currentValues = extractTransformPropertyValues(
      transformArrays[i],
      property
    );

    // Check lengths match
    if (firstValues.length !== currentValues.length) {
      return false;
    }

    // Check that same positions have same property presence
    for (let j = 0; j < firstValues.length; j++) {
      const firstHasProperty = firstValues[j] !== null;
      const currentHasProperty = currentValues[j] !== null;

      if (firstHasProperty !== currentHasProperty) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Create interpolated transform array from multiple keyframe transform arrays
 */
export function interpolateTransformArrays(
  animatedValue: ReactNative.Animated.Value,
  inputRange: $ReadOnlyArray<number>,
  transformArrays: $ReadOnlyArray<$ReadOnlyArray<ReactNativeTransform>>
): $ReadOnlyArray<{ [string]: mixed }> {
  if (transformArrays.length === 0) {
    return [];
  }

  const firstTransforms = transformArrays[0];
  const resultTransforms = [];

  // Process each transform position in the array
  for (let i = 0; i < firstTransforms.length; i++) {
    let transformObject = {};
    let hasAnimatedProperties = false;

    // Handle each transform property explicitly to avoid dynamic property access
    for (const property of TRANSFORM_PROPERTIES) {
      // Extract values for this property from all keyframes
      const propertyValues = transformArrays.map((transforms) => {
        const transform = transforms[i];
        if (!transform) return null;
        return getTransformPropertyValue(transform, property);
      });

      // Check if this property exists in any keyframe
      const hasProperty = propertyValues.some((value) => value !== null);
      if (!hasProperty) {
        continue;
      }

      // Check if all keyframes that have transforms at this position also have this property
      const validValues = [];
      const validInputRange = [];

      for (let j = 0; j < propertyValues.length; j++) {
        if (propertyValues[j] !== null) {
          validValues.push(propertyValues[j] as $FlowFixMe);
          validInputRange.push(inputRange[j]);
        }
      }

      let propertyValue;
      if (validValues.length >= 2) {
        // Create interpolated value
        propertyValue = interpolateTransformProperty(
          animatedValue,
          validInputRange,
          validValues
        );
        hasAnimatedProperties = true;
      } else if (validValues.length === 1) {
        // Static value
        propertyValue = validValues[0];
      } else {
        continue;
      }

      // Create new transform object with the specific property using type-safe assignment
      const propertyTransform = createTransformWithProperty(
        property,
        propertyValue
      );
      transformObject = { ...transformObject, ...propertyTransform };
    }

    if (hasAnimatedProperties || Object.keys(transformObject).length > 0) {
      resultTransforms.push(transformObject);
    }
  }

  return resultTransforms;
}
