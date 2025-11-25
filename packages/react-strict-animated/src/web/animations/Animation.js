/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

export type KeyframeObject = Keyframe;
export type KeyframeMap = Map<HTMLElement, Array<KeyframeObject>>;
export type GenerateResult = {
  config: Partial<EffectTiming>,
  keyframeMap: KeyframeMap
};

export interface AnimatedAnimation {
  generate(
    fromValue: number,
    onUpdate: (value: number, keyframeMap: KeyframeMap) => void
  ): GenerateResult;
  getDuration(): number;
  getTimeline(): Array<number>;
}
