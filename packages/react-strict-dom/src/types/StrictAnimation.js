/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { StrictAnimationProgressEventTarget } from './StrictEventTarget';

export interface StrictAnimation extends StrictAnimationProgressEventTarget {
  constructor(
    effect?: AnimationEffect | null,
    timeline?: AnimationTimeline | null
  ): void;
  // Feel free to remove things we don't need
  +id: string;
  +effect: AnimationEffect | null;
  +timeline: AnimationTimeline | null;
  +startTime: number | null;
  +currentTime: number | null;
  +playbackRate: number;
  +playState: AnimationPlayState;
  +replaceState: AnimationReplaceState;
  +pending: boolean;
  +ready: Promise<Animation>;
  +finished: Promise<Animation>;

  // Do we need these?
  +onfinish: ?(ev: AnimationPlaybackEvent) => mixed;
  +oncancel: ?(ev: AnimationPlaybackEvent) => mixed;
  +onremove: ?(ev: AnimationPlaybackEvent) => mixed;

  cancel(): void;
  finish(): void;
  play(): void;
  pause(): void;
  updatePlaybackRate(playbackRate: number): void;
  reverse(): void;
  persist(): void;

  commitStyles(): void;
}

// TODO:
// StrictElement should extend Animatable when the functionality is implemented
export interface Animatable {
  animate(
    keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
    options?: number | KeyframeAnimationOptions
  ): StrictAnimation;
  getAnimations(
    options?: GetAnimationsOptions
  ): $ReadOnlyArray<StrictAnimation>;
}
