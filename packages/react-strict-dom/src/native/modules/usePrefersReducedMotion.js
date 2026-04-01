/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import { useEffect, useState } from 'react';

import {
  getPrefersReducedMotionSnapshot,
  subscribeToPrefersReducedMotion
} from './PrefersReducedMotionStore';

export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    getPrefersReducedMotionSnapshot()
  );

  useEffect(() => {
    const unsubscribe = subscribeToPrefersReducedMotion(
      (isReduceMotionEnabled) => {
        setPrefersReducedMotion(isReduceMotionEnabled);
      }
    );

    return unsubscribe;
  }, []);

  return prefersReducedMotion;
}
