/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import AnimatedValue from '../nodes/AnimatedValue';

import { useState } from 'react';

export default function useAnimatedValue(initialValue: number): AnimatedValue {
  return useState(() => new AnimatedValue(initialValue))[0];
}
