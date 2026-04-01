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
  | Readonly<{ perspective: number | TAnimatedNode }>
  | Readonly<{ rotate: string | TAnimatedNode }>
  | Readonly<{ rotateX: string | TAnimatedNode }>
  | Readonly<{ rotateY: string | TAnimatedNode }>
  | Readonly<{ rotateZ: string | TAnimatedNode }>
  | Readonly<{ scale: number | TAnimatedNode }>
  | Readonly<{ scaleX: number | TAnimatedNode }>
  | Readonly<{ scaleY: number | TAnimatedNode }>
  | Readonly<{ translateX: number | string | TAnimatedNode }>
  | Readonly<{ translateY: number | string | TAnimatedNode }>
  | Readonly<{ skewX: string | TAnimatedNode }>
  | Readonly<{ skewY: string | TAnimatedNode }>;

export type AnimatedStyleValue<TAnimatedNode> = Readonly<{
  opacity?: number | TAnimatedNode,
  transform?: ReadonlyArray<AnimatedTransformValue<TAnimatedNode>>
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

export type InterpolationConfig<TOutput extends string | number> = {
  easing?: (input: number) => number,
  extrapolate?: ExtrapolateType,
  extrapolateLeft?: ExtrapolateType,
  extrapolateRight?: ExtrapolateType,
  inputRange: Array<number>,
  outputRange: Array<TOutput>
};
