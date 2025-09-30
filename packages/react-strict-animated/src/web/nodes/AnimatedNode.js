/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

export default class AnimatedNode<+TOutput> {
  __attach(): void {}
  __detach(): void {}
  __getValue(): TOutput {
    throw new Error('Method not implemented');
  }
  __getAnimatedValue(): TOutput {
    return this.__getValue();
  }
}
