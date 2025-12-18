/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import AnimatedStyle from '../nodes/AnimatedStyle';
import AnimatedValue from '../nodes/AnimatedValue';
import * as Animation from '../Animation';
import mockAnimate from './helpers/mockAnimate';

describe('AnimatedValue (web)', () => {
  test('flushes styles when the value changes', () => {
    const animated = new AnimatedValue(0);
    const flush = jest.fn();
    const element = document.createElement('div');

    const style = new AnimatedStyle(
      { opacity: animated, transform: [{ translateX: animated }] },
      () => element,
      flush
    );

    style.__attach();

    expect(style.__getValue()).toEqual({
      opacity: 0,
      transform: 'translateX(0px)'
    });

    animated.setValue(0.5);

    expect(flush).toHaveBeenCalledTimes(1);
    expect(style.__getValue()).toEqual({
      opacity: 0.5,
      transform: 'translateX(0.5px)'
    });
  });

  test('creates keyframes for the Web Animations API when animating', async () => {
    const { animateMock, restore } = mockAnimate();

    const animated = new AnimatedValue(0);
    const element = document.createElement('div');
    const style = new AnimatedStyle(
      { opacity: animated },
      () => element,
      () => {}
    );

    style.__attach();
    Animation.timing(animated, { toValue: 1, duration: 33 }).start();

    await Promise.resolve();

    expect(animateMock).toHaveBeenCalledTimes(1);
    const [keyframes, config] = animateMock.mock.calls[0];
    expect(Array.isArray(keyframes)).toBe(true);
    expect(keyframes[0].opacity).toBeCloseTo(0);
    expect(keyframes[keyframes.length - 1].opacity).toBeCloseTo(1);
    expect(config.duration).toBe(33);

    restore();
  });
});
