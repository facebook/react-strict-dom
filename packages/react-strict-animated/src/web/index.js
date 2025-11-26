/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type AnimatedValue from './nodes/AnimatedValue';
import type { CompositeAnimation } from './types/AnimatedTypes';
import type {
  InterpolationConfig,
  SpringAnimationConfig,
  TimingAnimationConfig
} from '../shared/SharedAnimatedTypes';

export type {
  AnimatedValue,
  CompositeAnimation,
  SpringAnimationConfig,
  TimingAnimationConfig,
  InterpolationConfig
};

export * as animated from './animated';
export * as Animation from './Animation';
