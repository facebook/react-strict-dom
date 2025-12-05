/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import {
  normalizeTransformValue,
  normalizeKeyframeTransform,
  IDENTITY_TRANSFORM
} from '../transformValueNormalizer';

describe('transformValueNormalizer', () => {
  describe('normalizeTransformValue', () => {
    test('should return identity transform for null/undefined', () => {
      expect(normalizeTransformValue(null)).toEqual(IDENTITY_TRANSFORM);
      expect(normalizeTransformValue()).toEqual(IDENTITY_TRANSFORM);
    });

    test('should handle CSS string transforms', () => {
      // This test will verify the integration with parseTransform
      const result = normalizeTransformValue('translateX(10px)');
      expect(Array.isArray(result)).toBe(true);
      // We can't easily test the exact parsed result without mocking parseTransform
    });

    test('should handle transform arrays', () => {
      const transformArray = [{ translateX: 10 }, { scale: 2 }];
      const result = normalizeTransformValue(transformArray);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    test('should return identity transform for invalid input', () => {
      expect(normalizeTransformValue('invalid')).toEqual(IDENTITY_TRANSFORM);
      expect(normalizeTransformValue(123)).toEqual(IDENTITY_TRANSFORM);
      expect(normalizeTransformValue({})).toEqual(IDENTITY_TRANSFORM);
    });
  });

  describe('normalizeKeyframeTransform', () => {
    test('should handle string keyframe values', () => {
      const result = normalizeKeyframeTransform('translateX(20px)');
      expect(Array.isArray(result)).toBe(true);
    });

    test('should handle array keyframe values', () => {
      const transformArray = [{ translateY: 15 }];
      const result = normalizeKeyframeTransform(transformArray);
      expect(Array.isArray(result)).toBe(true);
    });

    test('should use fallback when normalization produces empty array and fallback provided', () => {
      const fallback = [{ scale: 1 }];
      const result = normalizeKeyframeTransform(null, fallback);
      // Since null normalizes to empty array, fallback should be used
      expect(result).toEqual(fallback);
    });
  });
});
