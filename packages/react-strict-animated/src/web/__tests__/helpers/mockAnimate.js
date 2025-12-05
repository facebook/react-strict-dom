/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

'use strict';

type AnimationReplacement = {
  animateMock: JestMockFn<any, any>,
  restore: () => void
};

export default function mockAnimate(): AnimationReplacement {
  const originalAnimate = HTMLElement.prototype.animate;

  const animateMock = jest.fn(() => ({
    finished: Promise.resolve(),
    cancel: jest.fn()
  }));

  HTMLElement.prototype.animate = animateMock;

  return {
    animateMock,
    restore() {
      HTMLElement.prototype.animate = originalAnimate;
    }
  };
}
