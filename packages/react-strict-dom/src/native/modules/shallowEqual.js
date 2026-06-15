/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Copied from the fbjs implementation
 *
 * @flow strict
 */

'use strict';

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
export function shallowEqual(objA: unknown, objB: unknown): boolean {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  const a: Readonly<{ [string]: unknown }> = objA;
  const b: Readonly<{ [string]: unknown }> = objB;

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    if (!Object.hasOwn(b, keysA[i]) || !Object.is(a[keysA[i]], b[keysA[i]])) {
      return false;
    }
  }

  return true;
}
