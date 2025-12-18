/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type InternalAnimatedNode from '../nodes/AnimatedNode';

import AnimatedValue from '../nodes/AnimatedValue';

// The React Native version of AnimatedNode isn't polymorphic (and not
// type-safe) to to keep type parity I'm intentionally reducing the type
// safety on the web version
export type AnimatedNodeType = InternalAnimatedNode<$FlowFixMe>;

export type EndResult = { finished: boolean, ... };
export type EndCallback = (result: EndResult) => void;

/**
 * Timing information for an animation, used to coordinate parallel/sequence
 * compositions.
 */
export type AnimationTiming = $ReadOnly<{
  delay: number, // When this animation starts relative to parent
  duration: number, // How long the animation runs (excluding delay)
  totalDuration: number // delay + duration
}>;

/**
 * A value animation is a leaf animation that animates a single AnimatedValue.
 * It knows how to calculate the value at any point in time.
 */
export type ValueAnimation = $ReadOnly<{
  animatedValue: AnimatedValue,
  config: $ReadOnly<{
    delay: number,
    duration: number,
    easing: (t: number) => number,
    fromValue: number,
    toValue: number
  }>
}>;

/**
 * CompositeAnimation represents any animation that can be started, stopped,
 * and reset. It can operate in two modes:
 *
 * 1. Driver mode: When start() is called directly, it drives the animation
 *    by generating keyframes, merging them, and calling element.animate()
 *
 * 2. Driven mode: When composed inside another CompositeAnimation (like
 *    parallel), it provides timing info and value animations to the parent
 */
export type CompositeAnimation = $ReadOnly<{
  // Core lifecycle methods
  reset: () => void,
  start: (callback?: EndCallback) => void,
  stop: () => void,

  // Timing information for this animation
  getTiming: () => AnimationTiming,

  // Get all value animations (leaf animations that animate AnimatedValues)
  // For timing/spring: returns single-element array
  // For parallel/sequence: returns flattened array from all children
  // For delay: returns empty array
  getValueAnimations: () => $ReadOnlyArray<ValueAnimation>
}>;

export { AnimatedValue };
