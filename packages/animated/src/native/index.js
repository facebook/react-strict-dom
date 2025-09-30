/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

/* eslint-disable no-unreachable */

import type {
  InterpolationConfig,
  ParallelConfig,
  SpringAnimationConfig,
  TimingAnimationConfig
} from '../shared/SharedAnimatedTypes';
import type { CompositeAnimation } from 'react-native/Libraries/Animated/Animated';

import { AnimatedDiv, AnimatedImg, AnimatedSpan } from './components';

import {
  Animated,
  useAnimatedValue as rn_useAnimatedValue
} from 'react-native';

export type AnimatedValue = Animated.Value;
export type {
  CompositeAnimation,
  SpringAnimationConfig,
  TimingAnimationConfig,
  InterpolationConfig
};

hook useAnimatedValue(initialValue: number): Animated.Value {
  return rn_useAnimatedValue(initialValue, { useNativeDriver: true });
}

export const Animation = {
  useValue: useAnimatedValue,

  parallel: (
    animations: Array<CompositeAnimation>,
    config?: ParallelConfig
  ): CompositeAnimation => {
    return Animated.parallel(animations, config);
  },
  sequence: (animations: Array<CompositeAnimation>): CompositeAnimation => {
    return Animated.sequence(animations);
  },
  delay: (time: number): CompositeAnimation => {
    return Animated.delay(time);
  },

  timing: (
    value: Animated.Value,
    config: TimingAnimationConfig
  ): CompositeAnimation => {
    return Animated.timing(value, { ...config, useNativeDriver: true });
  },
  spring: (
    value: Animated.Value,
    config: SpringAnimationConfig
  ): CompositeAnimation => {
    return Animated.spring(value, { ...config, useNativeDriver: true });
  },

  interpolate: <TOutput: string | number>(
    value: Animated.Node,
    config: InterpolationConfig<TOutput>
  ): Animated.Node => {
    return new Animated.Interpolation(value, config);
  }
};

export const animated = {
  div: AnimatedDiv,
  img: AnimatedImg,
  span: AnimatedSpan
};
