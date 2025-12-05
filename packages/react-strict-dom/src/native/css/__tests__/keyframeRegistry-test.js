/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import { keyframeRegistry } from '../keyframeRegistry';

describe('keyframeRegistry', () => {
  beforeEach(() => {
    keyframeRegistry.clear();
  });

  afterEach(() => {
    keyframeRegistry.clear();
  });

  describe('register', () => {
    test('registers keyframes and returns unique ID', () => {
      const keyframes = {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 }
      };

      const id = keyframeRegistry.register(keyframes);

      expect(typeof id).toBe('string');
      expect(id.startsWith('keyframe_')).toBe(true);
    });

    test('returns different IDs for different registrations', () => {
      const keyframes1 = { '0%': { opacity: 0 }, '100%': { opacity: 1 } };
      const keyframes2 = { from: { scale: 1 }, to: { scale: 2 } };

      const id1 = keyframeRegistry.register(keyframes1);
      const id2 = keyframeRegistry.register(keyframes2);

      expect(id1).not.toBe(id2);
    });
  });

  describe('resolve', () => {
    test('returns null for unregistered keyframes', () => {
      const result = keyframeRegistry.resolve('nonexistent');
      expect(result).toBe(null);
    });

    test('returns registered keyframe definition', () => {
      const keyframes = {
        '0%': { opacity: 0 },
        '50%': { opacity: 0.5 },
        '100%': { opacity: 1 }
      };

      const id = keyframeRegistry.register(keyframes);
      const resolved = keyframeRegistry.resolve(id);

      expect(resolved).toBeTruthy();
      expect(resolved?.keyframes).toEqual(keyframes);
      expect(resolved?.id).toBe(id);
    });
  });

  describe('clear', () => {
    test('removes all registered keyframes', () => {
      const keyframes = { '0%': { opacity: 0 }, '100%': { opacity: 1 } };
      const id = keyframeRegistry.register(keyframes);

      expect(keyframeRegistry.resolve(id)).toBeTruthy();

      keyframeRegistry.clear();

      expect(keyframeRegistry.resolve(id)).toBe(null);
    });
  });
});
