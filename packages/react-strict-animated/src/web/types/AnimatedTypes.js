/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type InternalAnimatedNode from '../nodes/AnimatedNode';

import AnimatedValue from '../nodes/AnimatedValue';

// The React Native version of AnimatedNode isn't polymorphic (and not
// type-safe) to to keep type parity I'm intentionally reducing the type
// safety on the web version
export type AnimatedNodeType = InternalAnimatedNode<$FlowFixMe>;

export type EndResult = { finished: boolean, ... };
export type EndCallback = (result: EndResult) => void;

export type CompositeAnimation = $ReadOnly<{
  reset: () => void,
  start: (callback?: EndCallback) => void,
  stop: () => void
}>;

export { AnimatedValue };
