/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import { act, renderHook } from '@testing-library/react';

import AnimatedValue from '../nodes/AnimatedValue';
import useAnimatedStyle from '../useAnimatedStyle';

describe('useAnimatedStyle (web)', () => {
  test('returns animated values and forwards refs', () => {
    const animatedValue = new AnimatedValue(0);
    const parentRef = jest.fn();

    const { result } = renderHook(
      ({ style }) => useAnimatedStyle(style, parentRef),
      {
        initialProps: {
          style: {
            opacity: animatedValue,
            transform: [{ translateX: animatedValue }]
          }
        }
      }
    );

    let style = result.current[0];
    const ref = result.current[1];
    expect(style).toMatchObject({
      opacity: 0,
      transform: 'translateX(0px)'
    });

    const element = document.createElement('div');
    act(() => {
      ref(element);
      animatedValue.setValue(0.25);
    });

    [style] = result.current;

    expect(parentRef).toHaveBeenCalledWith(element);
    expect(style).toMatchObject({
      opacity: 0.25,
      transform: 'translateX(0.25px)'
    });
  });
});
