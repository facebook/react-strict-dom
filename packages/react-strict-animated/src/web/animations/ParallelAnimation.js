/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { ParallelConfig } from '../../shared/SharedAnimatedTypes';
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

export default function ParallelAnimation(
  animations: Array<CompositeAnimation>,
  config?: ParallelConfig
): CompositeAnimation {
  const stopTogether = config?.stopTogether ?? false;

  let animationState = null;
  let cachedValueAnimations: $ReadOnlyArray<ValueAnimation> | null = null;

  const collectValueAnimations = (): $ReadOnlyArray<ValueAnimation> => {
    if (cachedValueAnimations != null) {
      return cachedValueAnimations;
    }
    // Collect all value animations from all children
    const allValueAnims: Array<ValueAnimation> = [];
    animations.forEach((animation) => {
      const childValueAnims = animation.getValueAnimations();
      allValueAnims.push(...childValueAnims);
    });
    cachedValueAnimations = allValueAnims;
    return allValueAnims;
  };

  const getTiming = (): AnimationTiming => {
    // Duration is the max of all children's total duration
    let maxDuration = 0;
    animations.forEach((animation) => {
      const childTiming = animation.getTiming();
      maxDuration = Math.max(maxDuration, childTiming.totalDuration);
    });
    return {
      delay: 0,
      duration: maxDuration,
      totalDuration: maxDuration
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

      // Collect all value animations from all children
      const valueAnims = collectValueAnimations();

      if (valueAnims.length === 0) {
        // No value animations - maybe all delays?
        // Fall back to running children individually
        let doneCount = 0;
        const hasEnded: { [number]: boolean } = {};

        animations.forEach((animation, idx) => {
          const cb = (endResult: { finished: boolean, ... }) => {
            hasEnded[idx] = true;
            doneCount++;
            if (doneCount === animations.length) {
              callback?.(endResult);
              return;
            }
            if (!endResult.finished && stopTogether) {
              animations.forEach((anim, i) => {
                if (!hasEnded[i]) {
                  anim.stop();
                  hasEnded[i] = true;
                }
              });
            }
          };
          animation.start(cb);
        });
        return;
      }

      // Calculate total duration as max of all children
      const timing = getTiming();

      // Drive the animation with merged keyframes
      animationState = driveAnimation(
        valueAnims,
        timing.totalDuration,
        0, // delay is handled within each value animation
        (result) => {
          if (!result.finished && stopTogether) {
            stop();
          }
          callback?.(result);
        }
      );
    },

    stop,

    getTiming,

    getValueAnimations(): $ReadOnlyArray<ValueAnimation> {
      return collectValueAnimations();
    }
  };
}
