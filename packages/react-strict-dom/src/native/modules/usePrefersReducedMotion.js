/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import * as React from 'react';

import {
  getPrefersReducedMotionSnapshot,
  subscribeToPrefersReducedMotion
} from './PrefersReducedMotionStore';

export function usePrefersReducedMotion(): boolean {
  return React.useSyncExternalStore(
    subscribeToPrefersReducedMotion,
    getPrefersReducedMotionSnapshot,
    getPrefersReducedMotionSnapshot
  );
}
