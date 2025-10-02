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
import { AnimatedDiv, AnimatedImg, AnimatedSpan } from './components';
import useAnimatedValue from './hooks/useAnimatedValue';
import { Interpolate } from './nodes/AnimatedInterpolation';

export const Animation = {
  useValue: useAnimatedValue,

  parallel: ParallelAnimation,
  sequence: SequenceAnimation,
  delay: Delay,

  timing: (
    value: AnimatedValue,
    config: TimingAnimationConfig
  ): CompositeAnimation => ({
    reset() {
      value.resetAnimation();
    },
    start(callback?: EndCallback) {
      value.animate(new TimingAnimation(config), callback);
    },
    stop() {
      value.stopAnimation();
    }
  }),

  spring: (
    value: AnimatedValue,
    config: SpringAnimationConfig
  ): CompositeAnimation => ({
    reset() {
      value.resetAnimation();
    },
    start(callback?: EndCallback) {
      value.animate(new SpringAnimation(config), callback);
    },
    stop() {
      value.stopAnimation();
    }
  }),

  interpolate: <TOutput: number | string>(
    value: AnimatedNodeType,
    config: InterpolationConfig<TOutput>
  ): AnimatedNodeType =>
    Interpolate(
      // $FlowFixMe[incompatible-cast] - need a sketchy cast to be compatible with RN version of Animated
      value as AnimatedWithChildren<number>,
      config
    )
};

export const animated = {
  div: AnimatedDiv,
  span: AnimatedSpan,
  img: AnimatedImg
};
