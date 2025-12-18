/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { TimingAnimationConfig } from '../../shared/SharedAnimatedTypes';
import type AnimatedValueClass from '../nodes/AnimatedValue';
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

const DEFAULT_DURATION = 500;
const DEFAULT_EASING = (t: number): number => t;

export default function createTimingAnimation(
  value: AnimatedValueClass,
  config: TimingAnimationConfig
): CompositeAnimation {
  const animDelay = config.delay ?? 0;
  const duration = config.duration ?? DEFAULT_DURATION;
  const easing = config.easing ?? DEFAULT_EASING;
  const toValue = config.toValue;

  let animationState = null;
  let valueAnimation: ValueAnimation | null = null;

  const getValueAnimation = (): ValueAnimation => {
    if (valueAnimation == null) {
      valueAnimation = {
        animatedValue: value,
        config: {
          delay: animDelay,
          duration,
          easing,
          fromValue: value.__getValue(),
          toValue
        }
      };
    }
    return valueAnimation;
  };

  const getTiming = (): AnimationTiming => {
    return {
      delay: animDelay,
      duration,
      totalDuration: animDelay + duration
    };
  };

  return {
    reset() {
      resetAnimation(animationState, [getValueAnimation()]);
      animationState = null;
      valueAnimation = null;
    },

    start(callback?: EndCallback) {
      // Capture current value as fromValue
      const currentValueAnimation: ValueAnimation = {
        animatedValue: value,
        config: {
          delay: animDelay,
          duration,
          easing,
          fromValue: value.__getValue(),
          toValue
        }
      };
      valueAnimation = currentValueAnimation;

      const timing = getTiming();
      animationState = driveAnimation(
        [currentValueAnimation],
        timing.duration,
        timing.delay,
        callback
      );
    },

    stop() {
      stopAnimation(animationState);
      animationState = null;
    },

    getTiming,

    getValueAnimations(): $ReadOnlyArray<ValueAnimation> {
      return [getValueAnimation()];
    }
  };
}
