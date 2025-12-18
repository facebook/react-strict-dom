/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { EndCallback, ValueAnimation } from '../types/AnimatedTypes';
import type { KeyframeMap } from './Animation';

import AnimatedNode from '../nodes/AnimatedNode';
import AnimatedStyle from '../nodes/AnimatedStyle';
import AnimatedWithChildren from '../nodes/AnimatedWithChildren';
import { TIMESTEP_COEFFICIENT } from '../utils/constants';

export type AnimationState = {
  webAnimations: $ReadOnlyArray<Animation>,
  originalValues: Map<ValueAnimation, number>,
  valueAnimations: $ReadOnlyArray<ValueAnimation>,
  totalDuration: number,
  animatedStyles: Set<AnimatedStyle>
};

/**
 * Finds all AnimatedStyle nodes connected to an AnimatedValue by traversing
 * the node graph.
 */
function findAnimatedStyles(
  node: AnimatedNode<mixed>,
  styles: Set<AnimatedStyle>
): void {
  if (node instanceof AnimatedStyle) {
    styles.add(node);
  } else if (node instanceof AnimatedWithChildren) {
    node.__getChildren().forEach((child) => {
      findAnimatedStyles(child, styles);
    });
  }
}

/**
 * Calculates the interpolated value for a ValueAnimation at a given
 * normalized time (0-1) within the total animation duration.
 */
function getValueAtTime(
  valueAnim: ValueAnimation,
  normalizedTime: number,
  totalDuration: number
): number {
  const { config } = valueAnim;
  const { delay, duration, easing, fromValue, toValue } = config;

  // Convert normalized time to absolute time
  const absoluteTime = normalizedTime * totalDuration;

  // Before this animation starts
  if (absoluteTime < delay) {
    return fromValue;
  }

  // After this animation ends
  if (absoluteTime >= delay + duration) {
    return toValue;
  }

  // During animation - calculate progress
  const animationTime = absoluteTime - delay;
  const progress = duration > 0 ? animationTime / duration : 1;
  const easedProgress = easing(progress);

  return fromValue + (toValue - fromValue) * easedProgress;
}

/**
 * Groups value animations by their animated value and returns a map.
 */
function groupAnimationsByValue(
  valueAnimations: $ReadOnlyArray<ValueAnimation>
): Map<ValueAnimation['animatedValue'], Array<ValueAnimation>> {
  const grouped: Map<
    ValueAnimation['animatedValue'],
    Array<ValueAnimation>
  > = new Map();

  valueAnimations.forEach((valueAnim) => {
    const existing = grouped.get(valueAnim.animatedValue);
    if (existing != null) {
      existing.push(valueAnim);
    } else {
      grouped.set(valueAnim.animatedValue, [valueAnim]);
    }
  });

  return grouped;
}

/**
 * Finds the "active" animation for a given animated value at a specific time.
 * When multiple animations target the same value (like in a sequence),
 * this determines which one should be used at the current time.
 */
function findActiveAnimation(
  animations: $ReadOnlyArray<ValueAnimation>,
  absoluteTime: number
): ValueAnimation {
  // For a single animation, just return it
  if (animations.length === 1) {
    return animations[0];
  }

  // Find the animation that is "active" at this time
  // An animation is active if:
  // 1. It has started (delay <= absoluteTime)
  // 2. It's currently running OR it's the last one that finished
  let activeAnim = animations[0];
  let activeEndTime = activeAnim.config.delay + activeAnim.config.duration;

  for (let i = 1; i < animations.length; i++) {
    const anim = animations[i];
    const { delay, duration } = anim.config;
    const endTime = delay + duration;

    // This animation has started
    if (delay <= absoluteTime) {
      // If this animation ends later than the current active one,
      // or if the current active one has already finished and this one has started,
      // then this one becomes active
      if (endTime > activeEndTime || activeEndTime <= absoluteTime) {
        activeAnim = anim;
        activeEndTime = endTime;
      }
    }
  }

  return activeAnim;
}

/**
 * Drives an animation by:
 * 1. Collecting all AnimatedStyles connected to the animated values
 * 2. Stepping through the timeline and updating all values at each step
 * 3. Flushing styles to build keyframes
 * 4. Calling element.animate() once per element with merged keyframes
 */
export function driveAnimation(
  valueAnimations: $ReadOnlyArray<ValueAnimation>,
  totalDuration: number,
  delay: number,
  callback?: EndCallback
): AnimationState {
  // Collect all unique AnimatedStyles connected to any of the animated values
  const animatedStyles: Set<AnimatedStyle> = new Set();
  const originalValues: Map<ValueAnimation, number> = new Map();

  valueAnimations.forEach((valueAnim) => {
    // Store original value for reset
    originalValues.set(valueAnim, valueAnim.animatedValue.__getValue());
    // Find connected styles
    findAnimatedStyles(valueAnim.animatedValue, animatedStyles);
  });

  // Build keyframes by stepping through the timeline
  const keyframeMap: KeyframeMap = new Map();
  const numSteps = Math.max(Math.ceil(totalDuration / TIMESTEP_COEFFICIENT), 2);

  // Group animations by their animated value to handle sequences correctly
  const animationsByValue = groupAnimationsByValue(valueAnimations);

  for (let i = 0; i <= numSteps; i++) {
    const normalizedTime = i / numSteps;
    const absoluteTime = normalizedTime * totalDuration;

    // For each animated value, find the active animation and set its value
    animationsByValue.forEach((animations, animatedValue) => {
      const activeAnim = findActiveAnimation(animations, absoluteTime);
      const value = getValueAtTime(activeAnim, normalizedTime, totalDuration);
      // Directly set the internal value without triggering flush
      animatedValue.__setValueInternal(value);
    });

    // Now flush all styles - they will read the consistent state
    animatedStyles.forEach((style) => {
      style.update(keyframeMap);
    });
  }

  // Restore original values after keyframe generation
  valueAnimations.forEach((valueAnim) => {
    const originalValue = originalValues.get(valueAnim);
    if (originalValue != null) {
      valueAnim.animatedValue.__setValueInternal(originalValue);
    }
  });

  // Create web animations
  const config: KeyframeAnimationOptions = {
    delay,
    direction: 'normal',
    duration: totalDuration,
    easing: 'linear', // Easing is baked into keyframes
    fill: 'backwards',
    iterations: 1,
    iterationStart: 0
  };

  const webAnimations: Array<Animation> = [];

  keyframeMap.forEach((keyframes, element) => {
    if (keyframes.length >= 2) {
      const anim = element.animate(keyframes, config);
      webAnimations.push(anim);
    }
  });

  // Set values to final state and flush immediately after starting animation.
  // This ensures React's inline style reflects the end state, so when the
  // Web Animation API animation ends (with fill: 'backwards'), the element's
  // underlying style already has the correct final value applied.
  // For sequences with multiple animations on the same value, use the last animation's toValue.
  animationsByValue.forEach((animations, animatedValue) => {
    const lastAnim = findActiveAnimation(animations, totalDuration);
    animatedValue.__setValueInternal(lastAnim.config.toValue);
  });
  animatedStyles.forEach((style) => style.flush());

  // Handle completion
  if (webAnimations.length > 0) {
    Promise.all(
      webAnimations.map((anim) => {
        if (anim.finished != null) {
          return anim.finished;
        }
        return new Promise((resolve, reject) => {
          anim.onfinish = resolve;
          anim.oncancel = reject;
        });
      })
    )
      .then(() => {
        callback?.({ finished: true });
      })
      .catch(() => {
        callback?.({ finished: false });
      });
  } else {
    // No animations to run
    callback?.({ finished: true });
  }

  return {
    webAnimations,
    originalValues,
    valueAnimations,
    totalDuration,
    animatedStyles
  };
}

/**
 * Stops all web animations and updates animated values to their current
 * interpolated position based on elapsed time.
 */
export function stopAnimation(state: AnimationState | null): void {
  if (state == null) {
    return;
  }

  const { webAnimations, valueAnimations, totalDuration, animatedStyles } =
    state;

  // Get the current time from the first animation (they all started together)
  let elapsedTime: number | null = null;
  for (const anim of webAnimations) {
    const currentTime = anim.currentTime;
    if (currentTime != null && typeof currentTime === 'number') {
      elapsedTime = currentTime;
      break;
    }
  }

  // Cancel all animations
  webAnimations.forEach((anim) => {
    anim.cancel();
  });

  // If we have elapsed time, update values to their current interpolated position
  if (elapsedTime != null && totalDuration > 0) {
    const normalizedTime = Math.min(elapsedTime / totalDuration, 1);
    const absoluteTime = normalizedTime * totalDuration;

    // Group value animations by their animated value
    // For each animated value, find the animation that should be "active" at this time
    const valueToActiveAnim: Map<
      (typeof valueAnimations)[0]['animatedValue'],
      ValueAnimation
    > = new Map();

    valueAnimations.forEach((valueAnim) => {
      const { delay, duration } = valueAnim.config;
      const animEndTime = delay + duration;
      const existingAnim = valueToActiveAnim.get(valueAnim.animatedValue);

      if (existingAnim == null) {
        // First animation for this value
        valueToActiveAnim.set(valueAnim.animatedValue, valueAnim);
      } else {
        // Check if this animation is "more active" at the current time
        const existingDelay = existingAnim.config.delay;
        const existingEndTime = existingDelay + existingAnim.config.duration;

        // Prefer the animation that:
        // 1. Has started (delay <= absoluteTime) and
        // 2. Ends later (or is currently running)
        if (delay <= absoluteTime && animEndTime > existingEndTime) {
          valueToActiveAnim.set(valueAnim.animatedValue, valueAnim);
        } else if (
          delay <= absoluteTime &&
          delay > existingDelay &&
          existingEndTime <= absoluteTime
        ) {
          // The existing animation has finished, and this one has started
          valueToActiveAnim.set(valueAnim.animatedValue, valueAnim);
        }
      }
    });

    // Now calculate and set the value for each animated value using its active animation
    valueToActiveAnim.forEach((valueAnim) => {
      const currentValue = getValueAtTime(
        valueAnim,
        normalizedTime,
        totalDuration
      );
      valueAnim.animatedValue.__setValueInternal(currentValue);
    });

    // Flush the styles to apply the current values
    animatedStyles.forEach((style) => style.flush());
  }
}

/**
 * Resets all animated values to their original values before the animation
 * started.
 */
export function resetAnimation(
  state: AnimationState | null,
  valueAnimations: $ReadOnlyArray<ValueAnimation>
): void {
  if (state == null) {
    return;
  }
  stopAnimation(state);

  // Restore original values
  valueAnimations.forEach((valueAnim) => {
    const originalValue = state.originalValues.get(valueAnim);
    if (originalValue != null) {
      valueAnim.animatedValue.setValue(originalValue);
    }
  });
}
