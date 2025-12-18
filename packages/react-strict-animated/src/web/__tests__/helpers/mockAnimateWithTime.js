/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

'use strict';

type MockAnimation = {
  currentTime: number | null,
  cancel: JestMockFn<any, any>,
  finished: Promise<void>,
  _resolve: () => void,
  _reject: () => void
};

type AnimationReplacementWithTime = {
  animateMock: JestMockFn<any, any>,
  mockAnimations: Array<MockAnimation>,
  restore: () => void
};

/**
 * Creates a mock for element.animate() that allows controlling animation time.
 */
export default function mockAnimateWithTime(): AnimationReplacementWithTime {
  const originalAnimate = HTMLElement.prototype.animate;
  const mockAnimations: Array<MockAnimation> = [];

  const animateMock = jest.fn(() => {
    let resolveFinished: () => void = () => {};
    let rejectFinished: () => void = () => {};

    const mockAnim: MockAnimation = {
      currentTime: 0,
      cancel: jest.fn(() => {
        rejectFinished();
      }),
      finished: new Promise<void>((resolve, reject) => {
        resolveFinished = resolve;
        rejectFinished = reject;
      }),
      _resolve: () => resolveFinished(),
      _reject: () => rejectFinished()
    };

    mockAnimations.push(mockAnim);
    return mockAnim;
  });

  HTMLElement.prototype.animate = animateMock;

  return {
    animateMock,
    mockAnimations,
    restore() {
      HTMLElement.prototype.animate = originalAnimate;
    }
  };
}
