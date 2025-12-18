/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type {
  AnimationTiming,
  CompositeAnimation,
  EndCallback,
  ValueAnimation
} from '../types/AnimatedTypes';

export default function delay(time: number): CompositeAnimation {
  let timeoutID: TimeoutID | null = null;
  let cb: EndCallback | null = null;

  const stopDelay = () => {
    if (timeoutID !== null) {
      window.clearTimeout(timeoutID);
      timeoutID = null;
    }
    cb?.({ finished: false });
    cb = null;
  };

  return {
    reset() {
      stopDelay();
    },
    start(callback?: EndCallback) {
      if (callback != null) {
        cb = callback;
      }
      timeoutID = window.setTimeout(() => {
        timeoutID = null;
        cb?.({ finished: true });
      }, time);
    },
    stop() {
      stopDelay();
    },
    getTiming(): AnimationTiming {
      return {
        delay: time,
        duration: 0,
        totalDuration: time
      };
    },
    getValueAnimations(): $ReadOnlyArray<ValueAnimation> {
      // Delay doesn't animate any values
      return [];
    }
  };
}
