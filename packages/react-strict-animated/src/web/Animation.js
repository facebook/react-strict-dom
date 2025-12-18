/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { InterpolationConfig } from '../shared/SharedAnimatedTypes';
import type AnimatedWithChildren from './nodes/AnimatedWithChildren';
import type { AnimatedNodeType } from './types/AnimatedTypes';

import Delay from './animations/Delay';
import ParallelAnimation from './animations/ParallelAnimation';
import SequenceAnimation from './animations/SequenceAnimation';
import createSpringAnimation from './animations/SpringCompositeAnimation';
import createTimingAnimation from './animations/TimingCompositeAnimation';
import useAnimatedValue from './hooks/useAnimatedValue';
import { Interpolate } from './nodes/AnimatedInterpolation';

export const useValue = useAnimatedValue;

export const parallel = ParallelAnimation;
export const sequence = SequenceAnimation;
export const delay = Delay;

export const timing = createTimingAnimation;
export const spring = createSpringAnimation;

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
