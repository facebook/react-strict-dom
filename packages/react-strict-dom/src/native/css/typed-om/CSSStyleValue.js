/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

export class CSSStyleValue {
  toString(): string {
    throw new Error(
      '[CSSStyleValue] toString() must be called by a subclass of CSSStyleValue'
    );
  }
}
