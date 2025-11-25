/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type {
  CompositeAnimation,
  EndCallback,
  EndResult
} from '../types/AnimatedTypes';

export default function SequenceAnimation(
  animations: Array<CompositeAnimation>
): CompositeAnimation {
  let current = 0;
  return {
    reset() {
      animations.forEach((animation, idx) => {
        if (idx <= current) {
          animation.reset();
        }
      });
      current = 0;
    },
    start(callback?: EndCallback) {
      const onComplete = (result: EndResult) => {
        if (!result.finished) {
          callback?.(result);
          return;
        }

        current++;
        if (current === animations.length) {
          callback?.(result);
          return;
        }

        animations[current].start(onComplete);
      };

      if (animations.length === 0) {
        callback?.({ finished: true });
      } else {
        animations[current].start(onComplete);
      }
    },
    stop() {
      if (current < animations.length) {
        animations[current].stop();
      }
    }
  };
}
