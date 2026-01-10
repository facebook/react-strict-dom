/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { applyAnimationDirection } from '../animationDirection';

describe('applyAnimationDirection', () => {
  const inputRange = [0, 0.5, 1];
  const outputRange = ['start', 'middle', 'end'];

  test('should handle normal direction unchanged', () => {
    const result = applyAnimationDirection(inputRange, outputRange, 'normal');

    expect(result.finalInputRange).toEqual([0, 0.5, 1]);
    expect(result.finalOutputRange).toEqual(['start', 'middle', 'end']);
  });

  test('should reverse output range for reverse direction', () => {
    const result = applyAnimationDirection(inputRange, outputRange, 'reverse');

    expect(result.finalInputRange).toEqual([0, 0.5, 1]);
    expect(result.finalOutputRange).toEqual(['end', 'middle', 'start']);
  });

  test('should create double-length interpolation for alternate', () => {
    const result = applyAnimationDirection(
      inputRange,
      outputRange,
      'alternate'
    );

    expect(result.finalInputRange).toEqual([0, 0.25, 0.5, 0.5, 0.75, 1]);
    expect(result.finalOutputRange).toEqual([
      'start',
      'middle',
      'end',
      'end',
      'middle',
      'start'
    ]);
  });

  test('should create reverse-first double-length interpolation for alternate-reverse', () => {
    const result = applyAnimationDirection(
      inputRange,
      outputRange,
      'alternate-reverse'
    );

    expect(result.finalInputRange).toEqual([0, 0.25, 0.5, 0.5, 0.75, 1]);
    expect(result.finalOutputRange).toEqual([
      'end',
      'middle',
      'start',
      'start',
      'middle',
      'end'
    ]);
  });

  test('should handle numeric values', () => {
    const numericOutputRange = [0, 50, 100];
    const result = applyAnimationDirection(
      inputRange,
      numericOutputRange,
      'reverse'
    );

    expect(result.finalOutputRange).toEqual([100, 50, 0]);
  });

  test('should preserve input range for normal and reverse', () => {
    const normalResult = applyAnimationDirection(
      inputRange,
      outputRange,
      'normal'
    );
    const reverseResult = applyAnimationDirection(
      inputRange,
      outputRange,
      'reverse'
    );

    expect(normalResult.finalInputRange).toEqual(inputRange);
    expect(reverseResult.finalInputRange).toEqual(inputRange);
  });
});
