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
  AnimationFillMode,
  AnimationPlayState
} from '../../types/animation';

import {
  isNumber,
  isString,
  parseAnimationTimeValue,
  canUseNativeDriver,
  getEasingFunction
} from './sharedAnimationUtils';

// Animation-specific constants
export const ANIMATION_PROPERTIES: $ReadOnlyArray<string> = [
  'animationName',
  'animationDuration',
  'animationDelay',
  'animationTimingFunction',
  'animationIterationCount',
  'animationDirection',
  'animationFillMode',
  'animationPlayState'
];

export {
  isNumber,
  isString,
  parseAnimationTimeValue,
  canUseNativeDriver,
  getEasingFunction
};

// Shared animation property parsers
export function parseAnimationIterationCount(
  value: mixed
): number | 'infinite' {
  if (value === 'infinite') {
    return 'infinite';
  }
  if (isNumber(value)) {
    return Math.max(0, value);
  }
  if (isString(value)) {
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      return Math.max(0, parsed);
    }
  }
  return 1; // default
}

export function parseAnimationDirection(value: mixed): AnimationDirection {
  if (
    value === 'normal' ||
    value === 'reverse' ||
    value === 'alternate' ||
    value === 'alternate-reverse'
  ) {
    return value;
  }
  return 'normal'; // default
}

export function parseAnimationFillMode(value: mixed): AnimationFillMode {
  if (
    value === 'none' ||
    value === 'forwards' ||
    value === 'backwards' ||
    value === 'both'
  ) {
    return value;
  }
  return 'none'; // default
}

export function parseAnimationPlayState(value: mixed): AnimationPlayState {
  if (value === 'paused' || value === 'running') {
    return value;
  }
  return 'running'; // default
}

// Shared utility to collect animated properties from keyframes
export function collectAnimatedProperties(keyframes: {
  +[percentage: string]: { +[property: string]: mixed }
}): { [string]: mixed } {
  const animatedProperties: { [string]: mixed } = {};

  for (const percentage in keyframes) {
    const keyframeValues = keyframes[percentage];
    for (const property in keyframeValues) {
      animatedProperties[property] = keyframeValues[property];
    }
  }

  return animatedProperties;
}

// Shared utility to filter animation properties from style
export function removeAnimationProperties(
  style: ReactNativeStyle
): ReactNativeStyle {
  const animationProps = new Set(ANIMATION_PROPERTIES);
  const filteredStyle: ReactNativeStyle = {};

  for (const key in style) {
    if (!animationProps.has(key)) {
      filteredStyle[key] = style[key];
    }
  }

  return filteredStyle;
}
