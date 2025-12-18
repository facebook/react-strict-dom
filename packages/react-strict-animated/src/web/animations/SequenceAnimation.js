/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type {
  AnimationTiming,
  CompositeAnimation,
  EndCallback,
  ValueAnimation
} from '../types/AnimatedTypes';

import {
  driveAnimation,
  stopAnimation,
  resetAnimation
} from './AnimationDriver';

export default function SequenceAnimation(
  animations: Array<CompositeAnimation>
): CompositeAnimation {
  let animationState = null;
  let cachedValueAnimations: $ReadOnlyArray<ValueAnimation> | null = null;

  const collectValueAnimations = (): $ReadOnlyArray<ValueAnimation> => {
    if (cachedValueAnimations != null) {
      return cachedValueAnimations;
    }

    // For sequences, we need to adjust the delay of each child's value animations
    // to account for the cumulative offset.
    // We also need to fix the fromValue for animations that target the same
    // animated value - the fromValue should be the toValue of the previous animation.
    const result: Array<ValueAnimation> = [];
    let cumulativeOffset = 0;

    // Track the last toValue for each animated value to use as fromValue for the next
    const lastToValueByAnimatedValue: Map<
      ValueAnimation['animatedValue'],
      number
    > = new Map();

    animations.forEach((animation) => {
      const childTiming = animation.getTiming();
      const childValueAnims = animation.getValueAnimations();

      // Adjust each value animation's delay and fromValue
      childValueAnims.forEach((valueAnim) => {
        const lastToValue = lastToValueByAnimatedValue.get(
          valueAnim.animatedValue
        );
        const fromValue =
          lastToValue != null ? lastToValue : valueAnim.config.fromValue;

        result.push({
          animatedValue: valueAnim.animatedValue,
          config: {
            ...valueAnim.config,
            delay: valueAnim.config.delay + cumulativeOffset,
            fromValue
          }
        });

        // Update the last toValue for this animated value
        lastToValueByAnimatedValue.set(
          valueAnim.animatedValue,
          valueAnim.config.toValue
        );
      });

      cumulativeOffset += childTiming.totalDuration;
    });

    cachedValueAnimations = result;
    return result;
  };

  const getTiming = (): AnimationTiming => {
    // Total duration is sum of all children
    let totalDuration = 0;
    animations.forEach((animation) => {
      totalDuration += animation.getTiming().totalDuration;
    });
    return {
      delay: 0,
      duration: totalDuration,
      totalDuration
    };
  };

  const stop = () => {
    stopAnimation(animationState);
    animationState = null;
    // Also stop any children that might have their own state
    animations.forEach((animation) => {
      animation.stop();
    });
  };

  return {
    reset() {
      const valueAnims = collectValueAnimations();
      resetAnimation(animationState, valueAnims);
      animationState = null;
      cachedValueAnimations = null;
      // Also reset children to clear their internal state
      animations.forEach((animation) => {
        animation.reset();
      });
    },

    start(callback?: EndCallback) {
      // Clear cache to get fresh fromValues
      cachedValueAnimations = null;

      // Collect all value animations with adjusted delays
      const valueAnims = collectValueAnimations();

      if (valueAnims.length === 0) {
        // No value animations - maybe all delays?
        // Fall back to running children sequentially
        let current = 0;
        const runNext = () => {
          if (current >= animations.length) {
            callback?.({ finished: true });
            return;
          }
          animations[current].start((result) => {
            if (!result.finished) {
              callback?.(result);
              return;
            }
            current++;
            runNext();
          });
        };
        runNext();
        return;
      }

      // Calculate total duration
      const timing = getTiming();

      // Drive the animation with merged keyframes (single Web Animation)
      animationState = driveAnimation(
        valueAnims,
        timing.totalDuration,
        0, // delay is handled within each value animation
        callback
      );
    },

    stop,

    getTiming,

    getValueAnimations(): $ReadOnlyArray<ValueAnimation> {
      return collectValueAnimations();
    }
  };
}
