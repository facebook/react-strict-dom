/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { AnimationDirection } from '../../types/animation';

/**
 * Applies animation direction handling to input and output ranges.
 */
export function applyAnimationDirection<T>(
  inputRange: Array<number>,
  outputRange: Array<T>,
  direction: AnimationDirection
): { finalInputRange: Array<number>, finalOutputRange: Array<T> } {
  let finalInputRange = [...inputRange];
  let finalOutputRange = [...outputRange];

  if (direction === 'reverse') {
    // For reverse: flip the output range completely
    finalOutputRange.reverse();
  } else if (direction === 'alternate' || direction === 'alternate-reverse') {
    // For alternate animations, create double-length interpolation
    const forwardInputRange = inputRange.map((val) => val * 0.5);
    const backwardInputRange = inputRange.map((val) => 0.5 + val * 0.5);

    if (direction === 'alternate') {
      // First half: normal, Second half: reverse
      finalInputRange = [...forwardInputRange, ...backwardInputRange];
      finalOutputRange = [...outputRange, ...outputRange.slice().reverse()];
    } else {
      // alternate-reverse
      // First half: reverse, Second half: normal
      finalInputRange = [...forwardInputRange, ...backwardInputRange];
      finalOutputRange = [...outputRange.slice().reverse(), ...outputRange];
    }
  }

  return { finalInputRange, finalOutputRange };
}
