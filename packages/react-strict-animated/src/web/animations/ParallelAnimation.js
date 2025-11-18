/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { ParallelConfig } from '../../shared/SharedAnimatedTypes';
import type { CompositeAnimation, EndCallback } from '../types/AnimatedTypes';

export default function ParallelAnimation(
  animations: Array<CompositeAnimation>,
  config?: ParallelConfig
): CompositeAnimation {
  let doneCount = 0;
  // Make sure we only call stop() at most once for each animation
  const hasEnded: { [number]: boolean } = {};
  const stopTogether = config?.stopTogether ?? false;

  const result = {
    reset() {
      animations.forEach((animation, idx) => {
        animation.reset();
        hasEnded[idx] = false;
      });
      doneCount = 0;
    },
    start(callback?: EndCallback) {
      if (doneCount === animations.length) {
        callback?.({ finished: true });
        return;
      }
      animations.forEach((animation, idx) => {
        const cb = (endResult: { finished: boolean, ... }) => {
          hasEnded[idx] = true;
          doneCount++;
          if (doneCount === animations.length) {
            doneCount = 0;
            callback?.(endResult);
            return;
          }
          if (!endResult.finished && stopTogether) {
            result.stop();
          }
        };
        if (!animation) {
          cb({ finished: true });
        } else {
          animation.start(cb);
        }
      });
    },
    stop() {
      animations.forEach((animation, idx) => {
        !hasEnded[idx] && animation.stop();
        hasEnded[idx] = true;
      });
    }
  };

  return result;
}
