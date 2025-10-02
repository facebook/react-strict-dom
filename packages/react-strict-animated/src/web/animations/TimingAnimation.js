/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { TimingAnimationConfig } from '../../shared/SharedAnimatedTypes';
import type {
  AnimatedAnimation,
  GenerateResult,
  KeyframeMap
} from './Animation';

import { TIMESTEP_COEFFICIENT } from '../utils/constants';

export default class TimingAnimation implements AnimatedAnimation {
  #toValue: number;
  #duration: number;
  #delay: number;
  #easing: (t: number) => number;
  #timeline: Array<number>;

  constructor(config: TimingAnimationConfig) {
    this.#toValue = config.toValue;
    this.#easing = config.easing ?? ((t) => t);
    this.#duration = config.duration ?? 500;
    this.#delay = config.delay ?? 0;

    this.#timeline = [];
  }

  getTimeline(): Array<number> {
    return this.#timeline;
  }

  getDuration(): number {
    return this.#duration;
  }

  generate(
    fromValue: number,
    onUpdate: (value: number, keyframeMap: KeyframeMap) => void
  ): GenerateResult {
    const keyframeMap: KeyframeMap = new Map();

    const numSteps = this.#duration / TIMESTEP_COEFFICIENT;
    const timestep = 1 / numSteps;

    let currentTime = 0;
    for (let i = 0; i < numSteps; i++) {
      const nextValue =
        fromValue + this.#easing(currentTime) * (this.#toValue - fromValue);
      this.#timeline.push(nextValue);
      onUpdate(nextValue, keyframeMap);
      currentTime += timestep;
    }

    // call update callback on "last" value
    onUpdate(this.#toValue, keyframeMap);

    const config: Partial<EffectTiming> = {
      delay: this.#delay,
      direction: 'normal',
      duration: this.#duration,
      easing: 'linear',
      fill: 'backwards',
      iterations: 1,
      iterationStart: 0
    };

    return { config, keyframeMap };
  }
}
