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
import mockAnimateWithTime from './helpers/mockAnimateWithTime';

describe('Animation stop behavior', () => {
  describe('Stopping animations updates values to current position', () => {
    test('stopping a timing animation mid-flight updates the animated value', async () => {
      const { animateMock, mockAnimations, restore } = mockAnimateWithTime();

      const opacity = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { opacity },
        () => element,
        () => {}
      );

      style.__attach();

      const anim = Animation.timing(opacity, { toValue: 1, duration: 100 });
      anim.start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      // Simulate animation being at 50% (50ms into a 100ms animation)
      mockAnimations[0].currentTime = 50;

      // Stop the animation
      anim.stop();

      // The animated value should be updated to approximately 0.5
      // (50% through the animation from 0 to 1)
      expect(opacity.__getValue()).toBeCloseTo(0.5, 1);

      restore();
    });

    test('stopping a timing animation at 25% updates the animated value correctly', async () => {
      const { animateMock, mockAnimations, restore } = mockAnimateWithTime();

      const translateX = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { transform: [{ translateX }] },
        () => element,
        () => {}
      );

      style.__attach();

      const anim = Animation.timing(translateX, {
        toValue: 200,
        duration: 100
      });
      anim.start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      // Simulate animation being at 25%
      mockAnimations[0].currentTime = 25;

      anim.stop();

      // Should be at 25% of 200 = 50
      expect(translateX.__getValue()).toBeCloseTo(50, 0);

      restore();
    });

    test('stopping a timing animation at 75% updates the animated value correctly', async () => {
      const { animateMock, mockAnimations, restore } = mockAnimateWithTime();

      const opacity = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { opacity },
        () => element,
        () => {}
      );

      style.__attach();

      const anim = Animation.timing(opacity, { toValue: 1, duration: 100 });
      anim.start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      // Simulate animation being at 75%
      mockAnimations[0].currentTime = 75;

      anim.stop();

      // Should be at 75% of 1 = 0.75
      expect(opacity.__getValue()).toBeCloseTo(0.75, 1);

      restore();
    });

    test('stopping at the very beginning keeps value at fromValue', async () => {
      const { animateMock, mockAnimations, restore } = mockAnimateWithTime();

      const opacity = new AnimatedValue(0.5);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { opacity },
        () => element,
        () => {}
      );

      style.__attach();

      const anim = Animation.timing(opacity, { toValue: 1, duration: 100 });
      anim.start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      // Animation just started
      mockAnimations[0].currentTime = 0;

      anim.stop();

      // Should still be at the starting value
      expect(opacity.__getValue()).toBeCloseTo(0.5, 1);

      restore();
    });

    test('stopping near the end gives value close to toValue', async () => {
      const { animateMock, mockAnimations, restore } = mockAnimateWithTime();

      const opacity = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { opacity },
        () => element,
        () => {}
      );

      style.__attach();

      const anim = Animation.timing(opacity, { toValue: 1, duration: 100 });
      anim.start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      // Almost finished
      mockAnimations[0].currentTime = 99;

      anim.stop();

      // Should be very close to 1
      expect(opacity.__getValue()).toBeCloseTo(0.99, 1);

      restore();
    });
  });

  describe('Stopping parallel animations', () => {
    test('stopping parallel animations updates all values to current position', async () => {
      const { animateMock, mockAnimations, restore } = mockAnimateWithTime();

      const opacity = new AnimatedValue(0);
      const translateX = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { opacity, transform: [{ translateX }] },
        () => element,
        () => {}
      );

      style.__attach();

      const anim = Animation.parallel([
        Animation.timing(opacity, { toValue: 1, duration: 100 }),
        Animation.timing(translateX, { toValue: 200, duration: 100 })
      ]);

      anim.start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      // Simulate animation being at 50%
      mockAnimations[0].currentTime = 50;

      anim.stop();

      // Both values should be at 50%
      expect(opacity.__getValue()).toBeCloseTo(0.5, 1);
      expect(translateX.__getValue()).toBeCloseTo(100, 0);

      restore();
    });

    test('stopping parallel animations with different durations', async () => {
      const { animateMock, mockAnimations, restore } = mockAnimateWithTime();

      const opacity = new AnimatedValue(0);
      const translateX = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { opacity, transform: [{ translateX }] },
        () => element,
        () => {}
      );

      style.__attach();

      // opacity: 100ms, translateX: 200ms
      // Total duration is 200ms
      const anim = Animation.parallel([
        Animation.timing(opacity, { toValue: 1, duration: 100 }),
        Animation.timing(translateX, { toValue: 200, duration: 200 })
      ]);

      anim.start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      // At 100ms: opacity should be at 100% (finished), translateX at 50%
      mockAnimations[0].currentTime = 100;

      anim.stop();

      expect(opacity.__getValue()).toBeCloseTo(1, 1);
      expect(translateX.__getValue()).toBeCloseTo(100, 0);

      restore();
    });
  });

  describe('Stopping sequence animations', () => {
    test('stopping a sequence in parallel updates values correctly', async () => {
      const { animateMock, mockAnimations, restore } = mockAnimateWithTime();

      const opacity = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { opacity },
        () => element,
        () => {}
      );

      style.__attach();

      // Sequence: 0 -> 0.5 (100ms), then 0.5 -> 1 (100ms)
      // Total: 200ms
      // Note: In a sequence inside parallel, all fromValues are captured at start time
      // So effectively:
      //   First animation: 0 -> 0.5 (100ms, delay 0)
      //   Second animation: 0 -> 1 (100ms, delay 100ms) - fromValue is captured as 0
      // This means the second animation interpolates from 0 to 1, but only takes effect
      // after 100ms when the first animation is done
      const anim = Animation.parallel([
        Animation.sequence([
          Animation.timing(opacity, { toValue: 0.5, duration: 100 }),
          Animation.timing(opacity, { toValue: 1, duration: 100 })
        ])
      ]);

      anim.start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      // At 50ms: halfway through first animation (0 -> 0.5)
      // Value should be 0.25
      mockAnimations[0].currentTime = 50;

      anim.stop();

      expect(opacity.__getValue()).toBeCloseTo(0.25, 1);

      restore();
    });

    test('stopping a sequence after first animation completes', async () => {
      const { animateMock, mockAnimations, restore } = mockAnimateWithTime();

      const opacity = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { opacity },
        () => element,
        () => {}
      );

      style.__attach();

      // At 150ms:
      // First animation (0->0.5, 100ms) is complete
      // Second animation (0.5->1, 100ms starting at 100ms) is at 50%
      // The second animation's fromValue is 0.5 (the toValue of the first),
      // so at 50% progress: 0.5 + (1-0.5) * 0.5 = 0.75
      const anim = Animation.parallel([
        Animation.sequence([
          Animation.timing(opacity, { toValue: 0.5, duration: 100 }),
          Animation.timing(opacity, { toValue: 1, duration: 100 })
        ])
      ]);

      anim.start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      // At 150ms: second animation is at 50% through (0.5 -> 1)
      // fromValue is 0.5, toValue is 1, so value = 0.5 + 0.5*0.5 = 0.75
      mockAnimations[0].currentTime = 150;

      anim.stop();

      expect(opacity.__getValue()).toBeCloseTo(0.75, 1);

      restore();
    });
  });

  describe('Reset animation behavior', () => {
    test('resetting an animation restores the original value', async () => {
      const { animateMock, mockAnimations, restore } = mockAnimateWithTime();

      const opacity = new AnimatedValue(0.3);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { opacity },
        () => element,
        () => {}
      );

      style.__attach();

      const anim = Animation.timing(opacity, { toValue: 1, duration: 100 });
      anim.start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      // Simulate animation being at 50%
      mockAnimations[0].currentTime = 50;

      // Reset should restore to original value (0.3), not current position
      anim.reset();

      expect(opacity.__getValue()).toBeCloseTo(0.3, 1);

      restore();
    });

    test('resetting a parallel animation restores all original values', async () => {
      const { animateMock, mockAnimations, restore } = mockAnimateWithTime();

      const opacity = new AnimatedValue(0.2);
      const translateX = new AnimatedValue(50);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { opacity, transform: [{ translateX }] },
        () => element,
        () => {}
      );

      style.__attach();

      const anim = Animation.parallel([
        Animation.timing(opacity, { toValue: 1, duration: 100 }),
        Animation.timing(translateX, { toValue: 200, duration: 100 })
      ]);

      anim.start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      mockAnimations[0].currentTime = 50;

      anim.reset();

      // Should restore to original values
      expect(opacity.__getValue()).toBeCloseTo(0.2, 1);
      expect(translateX.__getValue()).toBeCloseTo(50, 0);

      restore();
    });
  });

  describe('Edge cases', () => {
    test('stopping when currentTime is null does not crash', async () => {
      const { animateMock, mockAnimations, restore } = mockAnimateWithTime();

      const opacity = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { opacity },
        () => element,
        () => {}
      );

      style.__attach();

      const anim = Animation.timing(opacity, { toValue: 1, duration: 100 });
      anim.start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      // Set currentTime to null (simulating some edge case)
      mockAnimations[0].currentTime = null;

      // Should not throw
      expect(() => anim.stop()).not.toThrow();

      restore();
    });

    test('stopping an animation that was never started does not crash', () => {
      const opacity = new AnimatedValue(0);

      const anim = Animation.timing(opacity, { toValue: 1, duration: 100 });

      // Should not throw
      expect(() => anim.stop()).not.toThrow();

      // Value should remain unchanged
      expect(opacity.__getValue()).toBe(0);
    });
  });
});
