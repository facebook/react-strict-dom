/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { applyFillModeStyles } from '../animationFillMode';

// Mock parseTransform
jest.mock('../parseTransform', () => ({
  parseTransform: jest.fn(() => ({
    resolveTransformValue: jest.fn(() => [{ scale: 1.5 }])
  }))
}));

describe('applyFillModeStyles', () => {
  const keyframes = {
    '0%': { opacity: 0, transform: 'scale(0.8)' },
    '100%': { opacity: 1, transform: 'scale(1.2)' }
  };
  const baseStyle = { opacity: 0.5, color: 'blue' };

  test('should return null when no fill mode styles apply', () => {
    const result = applyFillModeStyles(
      keyframes,
      'normal',
      'none',
      'running',
      baseStyle
    );

    expect(result).toBeNull();
  });

  test('should return base style for "none" fill mode when completed', () => {
    const result = applyFillModeStyles(
      keyframes,
      'normal',
      'none',
      'completed',
      baseStyle
    );

    expect(result).toBe(baseStyle);
  });

  test('should apply backwards fill mode when not started', () => {
    const result = applyFillModeStyles(
      keyframes,
      'normal',
      'backwards',
      'not-started',
      baseStyle
    );

    expect(result).toMatchObject({
      opacity: 0,
      transform: [{ scale: 1.5 }],
      color: 'blue'
    });
  });

  test('should apply forwards fill mode when completed', () => {
    const result = applyFillModeStyles(
      keyframes,
      'normal',
      'forwards',
      'completed',
      baseStyle
    );

    expect(result).toMatchObject({
      opacity: 1,
      transform: [{ scale: 1.5 }],
      color: 'blue'
    });
  });

  test('should apply both fill mode - backwards when not started', () => {
    const result = applyFillModeStyles(
      keyframes,
      'normal',
      'both',
      'not-started',
      baseStyle
    );

    expect(result).toMatchObject({
      opacity: 0,
      transform: [{ scale: 1.5 }]
    });
  });

  test('should apply both fill mode - forwards when completed', () => {
    const result = applyFillModeStyles(
      keyframes,
      'normal',
      'both',
      'completed',
      baseStyle
    );

    expect(result).toMatchObject({
      opacity: 1,
      transform: [{ scale: 1.5 }]
    });
  });

  test('should handle reverse direction for backwards fill mode', () => {
    const result = applyFillModeStyles(
      keyframes,
      'reverse',
      'backwards',
      'not-started',
      baseStyle
    );

    // For reverse direction, backwards should apply 100% keyframe
    expect(result).toMatchObject({
      opacity: 1,
      transform: [{ scale: 1.5 }]
    });
  });

  test('should handle reverse direction for forwards fill mode', () => {
    const result = applyFillModeStyles(
      keyframes,
      'reverse',
      'forwards',
      'completed',
      baseStyle
    );

    // For reverse direction, forwards should apply 0% keyframe
    expect(result).toMatchObject({
      opacity: 0,
      transform: [{ scale: 1.5 }]
    });
  });

  test('should handle alternate direction', () => {
    const result = applyFillModeStyles(
      keyframes,
      'alternate',
      'backwards',
      'not-started',
      baseStyle
    );

    // Alternate starts like normal direction
    expect(result).toMatchObject({
      opacity: 0,
      transform: [{ scale: 1.5 }]
    });
  });

  test('should handle non-string, non-number values', () => {
    const keyframesWithComplexValues = {
      '0%': { opacity: 0, complexProp: { nested: true } },
      '100%': { opacity: 1 }
    };

    const result = applyFillModeStyles(
      keyframesWithComplexValues,
      'normal',
      'backwards',
      'not-started',
      baseStyle
    );

    expect(result).toMatchObject({
      opacity: 0,
      color: 'blue'
    });
    expect(result).not.toHaveProperty('complexProp');
  });
});
