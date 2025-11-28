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

import { parseTransform } from './parseTransform';
import { toReactNativeStyle } from '../utils/stylePropertyUtils';

export type AnimationState = 'not-started' | 'running' | 'completed';

/**
 * Applies fill mode behavior to determine when and how to apply keyframe styles
 * when the animation is not actively running.
 */
export function applyFillModeStyles(
  keyframes: { +[percentage: string]: { +[property: string]: mixed } },
  direction: AnimationDirection,
  fillMode: AnimationFillMode,
  animationState: AnimationState,
  baseStyle: ReactNativeStyle
): ReactNativeStyle | null {
  // Handle fill mode behavior - apply keyframe values when animation is not running
  const shouldApplyBackwards =
    (fillMode === 'backwards' || fillMode === 'both') &&
    animationState === 'not-started';
  const shouldApplyForwards =
    (fillMode === 'forwards' || fillMode === 'both') &&
    animationState === 'completed';
  const shouldReturnToOriginal =
    (fillMode === 'none' || fillMode === 'backwards') &&
    animationState === 'completed';

  if (shouldReturnToOriginal) {
    return baseStyle;
  }

  if (!shouldApplyBackwards && !shouldApplyForwards) {
    return null; // No fill mode styles to apply
  }

  const result: { [string]: mixed } = { ...baseStyle };

  // Determine which keyframe to use for fill mode based on direction
  let targetKeyframe = '0%';

  if (shouldApplyForwards) {
    // Apply the final state based on animation direction
    if (direction === 'normal' || direction === 'alternate') {
      targetKeyframe = '100%'; // Ends at 100%
    } else if (direction === 'reverse' || direction === 'alternate-reverse') {
      targetKeyframe = '0%'; // Reverse directions end at 0%
    }
  } else if (shouldApplyBackwards) {
    // Apply the initial state based on animation direction
    if (direction === 'normal' || direction === 'alternate') {
      targetKeyframe = '0%'; // Starts at 0%
    } else if (direction === 'reverse' || direction === 'alternate-reverse') {
      targetKeyframe = '100%'; // Reverse directions start at 100%
    }
  }

  // Apply the fill mode styles directly (no animation interpolation needed)
  if (keyframes[targetKeyframe]) {
    const fillModeValues = keyframes[targetKeyframe];
    for (const property in fillModeValues) {
      const value = fillModeValues[property];

      // Handle transform property specially
      if (property === 'transform' && typeof value === 'string') {
        const parsedTransform = parseTransform(value).resolveTransformValue();
        if (Array.isArray(parsedTransform)) {
          result[property] = parsedTransform;
        }
      } else if (typeof value === 'string' || typeof value === 'number') {
        result[property] = value;
      }
    }
  }

  // Convert mixed property result to properly typed ReactNativeStyle
  return toReactNativeStyle(result);
}
