/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { ReactNativeStyle } from '../../types/renderer.native';

import type {
  AnimationDirection,
  AnimationFillMode
} from '../../types/animation';

import * as ReactNative from '../react-native';

import { collectAnimatedProperties } from '../modules/animationUtils';
import { applyFillModeStyles, type AnimationState } from './animationFillMode';
import {
  interpolateTransformProperty,
  interpolateRegularProperty
} from './propertyInterpolation';
import { toReactNativeStyle } from '../utils/stylePropertyUtils';
import { keyframeRegistry } from './keyframeRegistry';

export type { AnimationState };

/**
 * Creates an interpolated style object from keyframe animation data.
 */
export function getInterpolatedStyle(
  animatedValue: ReactNative.Animated.Value,
  keyframeName: string,
  baseStyle: ReactNativeStyle,
  direction: AnimationDirection = 'normal',
  fillMode: AnimationFillMode = 'none',
  animationState: AnimationState = 'not-started'
): ReactNativeStyle {
  // keyframeRegistry is now imported at the top
  const keyframeDefinition = keyframeRegistry.resolve(keyframeName);
  if (!keyframeDefinition) {
    return baseStyle;
  }

  const { keyframes } = keyframeDefinition;

  // Check for fill mode behavior first
  const fillModeResult = applyFillModeStyles(
    keyframes,
    direction,
    fillMode,
    animationState,
    baseStyle
  );

  if (fillModeResult !== null) {
    return fillModeResult;
  }

  // Apply normal animation interpolation
  const result: { [string]: mixed } = { ...baseStyle };

  // Get all unique properties that are animated
  const animatedPropertiesObj = collectAnimatedProperties(keyframes);
  const animatedProperties = new Set(Object.keys(animatedPropertiesObj));

  // Create interpolated values for each animated property
  for (const property of animatedProperties) {
    if (property === 'transform') {
      interpolateTransformProperty(
        result,
        property,
        keyframes,
        animatedValue,
        direction
      );
    } else {
      interpolateRegularProperty(
        result,
        property,
        keyframes,
        baseStyle,
        animatedValue,
        direction
      );
    }
  }

  // Convert mixed property result to properly typed ReactNativeStyle
  return toReactNativeStyle(result);
}
