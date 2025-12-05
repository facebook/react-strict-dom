/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

export type TimingAnimationConfig = {
  delay?: number,
  duration?: number,
  easing?: (value: number) => number,
  toValue: number
};

export type AnimatedTransformValue<TAnimatedNode> =
  | $ReadOnly<{ perspective: number | TAnimatedNode }>
  | $ReadOnly<{ rotate: string | TAnimatedNode }>
  | $ReadOnly<{ rotateX: string | TAnimatedNode }>
  | $ReadOnly<{ rotateY: string | TAnimatedNode }>
  | $ReadOnly<{ rotateZ: string | TAnimatedNode }>
  | $ReadOnly<{ scale: number | TAnimatedNode }>
  | $ReadOnly<{ scaleX: number | TAnimatedNode }>
  | $ReadOnly<{ scaleY: number | TAnimatedNode }>
  | $ReadOnly<{ translateX: number | string | TAnimatedNode }>
  | $ReadOnly<{ translateY: number | string | TAnimatedNode }>
  | $ReadOnly<{ skewX: string | TAnimatedNode }>
  | $ReadOnly<{ skewY: string | TAnimatedNode }>;

export type AnimatedStyleValue<TAnimatedNode> = $ReadOnly<{
  opacity?: number | TAnimatedNode,
  transform?: $ReadOnlyArray<AnimatedTransformValue<TAnimatedNode>>
}>;

export type ParallelConfig = {
  stopTogether?: boolean
};

export type SpringAnimationConfig = {
  bounciness?: number,
  damping?: number,
  delay?: number,
  friction?: number,
  mass?: number,
  overshootClamping?: boolean,
  restDisplacementThreshold?: number,
  restSpeedThreshold?: number,
  speed?: number,
  stiffness?: number,
  tension?: number,
  toValue: number,
  velocity?: number
};

type ExtrapolateType = 'extend' | 'identity' | 'clamp';

export type InterpolationConfig<TOutput: string | number> = {
  easing?: (input: number) => number,
  extrapolate?: ExtrapolateType,
  extrapolateLeft?: ExtrapolateType,
  extrapolateRight?: ExtrapolateType,
  inputRange: Array<number>,
  outputRange: Array<TOutput>
};
