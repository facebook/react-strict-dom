/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

type Milliseconds = number;

const cache = new Map<string, Milliseconds>();
const msRegex = /ms$/;
const sRegex = /s$/;

export function parseTimeValue(timeValue: string): Milliseconds {
  const memoizedValue = cache.get(timeValue);
  if (memoizedValue != null) {
    return memoizedValue;
  }
  const trimmedTimeValue = timeValue.trim().toLowerCase();
  if (trimmedTimeValue.endsWith('ms')) {
    const msVal = parseFloat(trimmedTimeValue.replace(msRegex, ''));
    const normalizedValue = Number.isFinite(msVal) ? msVal : 0;
    cache.set(timeValue, normalizedValue);
    return normalizedValue;
  }
  if (trimmedTimeValue.endsWith('s')) {
    const sVal = parseFloat(trimmedTimeValue.replace(sRegex, ''));
    const normalizedValue = Number.isFinite(sVal) ? sVal * 1000 : 0;
    cache.set(timeValue, normalizedValue);
    return normalizedValue;
  }
  return 0;
}
