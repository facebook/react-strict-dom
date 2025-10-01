/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import * as ReactNative from '../react-native';

import { useEffect, useState } from 'react';

export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // 1. Get the initial value of reduce motion
    ReactNative.AccessibilityInfo.isReduceMotionEnabled().then(
      (isReduceMotionEnabled) => {
        setPrefersReducedMotion(isReduceMotionEnabled);
      }
    );

    // 2. Subscribe to changes in reduce motion
    const reduceMotionChangedSubscription =
      ReactNative.AccessibilityInfo.addEventListener(
        'reduceMotionChanged',
        (isReduceMotionEnabled) => {
          setPrefersReducedMotion(isReduceMotionEnabled);
        }
      );

    return () => {
      reduceMotionChangedSubscription.remove();
    };
  }, []);

  return prefersReducedMotion;
}
