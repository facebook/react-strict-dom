/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type {
  InterpolationConfig,
  SpringAnimationConfig,
  TimingAnimationConfig
} from '../shared/SharedAnimatedTypes';
import type AnimatedValue from './nodes/AnimatedValue';
import type AnimatedWithChildren from './nodes/AnimatedWithChildren';
import type {
  AnimatedNodeType,
  CompositeAnimation,
  EndCallback
} from './types/AnimatedTypes';

import Delay from './animations/Delay';
import ParallelAnimation from './animations/ParallelAnimation';
import SequenceAnimation from './animations/SequenceAnimation';
import SpringAnimation from './animations/SpringAnimation';
import TimingAnimation from './animations/TimingAnimation';
import useAnimatedValue from './hooks/useAnimatedValue';
import { Interpolate } from './nodes/AnimatedInterpolation';

export const useValue = useAnimatedValue;

export const parallel = ParallelAnimation;
export const sequence = SequenceAnimation;
export const delay = Delay;

export function timing(
  value: AnimatedValue,
  config: TimingAnimationConfig
): CompositeAnimation {
  return {
    reset() {
      value.resetAnimation();
    },
    start(callback?: EndCallback) {
      value.animate(new TimingAnimation(config), callback);
    },
    stop() {
      value.stopAnimation();
    }
  };
}

export function spring(
  value: AnimatedValue,
  config: SpringAnimationConfig
): CompositeAnimation {
  return {
    reset() {
      value.resetAnimation();
    },
    start(callback?: EndCallback) {
      value.animate(new SpringAnimation(config), callback);
    },
    stop() {
      value.stopAnimation();
    }
  };
}

export function interpolate<TOutput: number | string>(
  value: AnimatedNodeType,
  config: InterpolationConfig<TOutput>
): AnimatedNodeType {
  return Interpolate(
    // $FlowFixMe[incompatible-cast] - need a sketchy cast to be compatible with RN version of Animated
    value as AnimatedWithChildren<number>,
    config
  );
}
