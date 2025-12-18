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

/**
 * These tests verify that parallel animations correctly merge multiple
 * AnimatedValue instances into a single Web Animation API call per element.
 */
describe('Parallel animations', () => {
  describe('Basic parallel animations', () => {
    test('two timing animations in parallel produce a single element.animate() call', async () => {
      const { animateMock, restore } = mockAnimate();

      const opacity = new AnimatedValue(0);
      const translateX = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { opacity, transform: [{ translateX }] },
        () => element,
        () => {}
      );

      style.__attach();

      Animation.parallel([
        Animation.timing(opacity, { toValue: 1, duration: 100 }),
        Animation.timing(translateX, { toValue: 100, duration: 100 })
      ]).start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes, config] = animateMock.mock.calls[0];

      expect(config.duration).toBe(100);
      expect(keyframes[0].opacity).toBeCloseTo(0);
      expect(keyframes[0].transform).toBe('translateX(0px)');
      expect(keyframes[keyframes.length - 1].opacity).toBeCloseTo(1);
      expect(keyframes[keyframes.length - 1].transform).toBe(
        'translateX(100px)'
      );

      restore();
    });

    test('three animations in parallel merge into one animation', async () => {
      const { animateMock, restore } = mockAnimate();

      const opacity = new AnimatedValue(0);
      const translateX = new AnimatedValue(0);
      const translateY = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { opacity, transform: [{ translateX }, { translateY }] },
        () => element,
        () => {}
      );

      style.__attach();

      Animation.parallel([
        Animation.timing(opacity, { toValue: 1, duration: 100 }),
        Animation.timing(translateX, { toValue: 100, duration: 100 }),
        Animation.timing(translateY, { toValue: 200, duration: 100 })
      ]).start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes] = animateMock.mock.calls[0];

      expect(keyframes[0].opacity).toBeCloseTo(0);
      expect(keyframes[0].transform).toBe('translateX(0px)translateY(0px)');
      expect(keyframes[keyframes.length - 1].opacity).toBeCloseTo(1);
      expect(keyframes[keyframes.length - 1].transform).toBe(
        'translateX(100px)translateY(200px)'
      );

      restore();
    });

    test('single animation in parallel works correctly', async () => {
      const { animateMock, restore } = mockAnimate();

      const opacity = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { opacity },
        () => element,
        () => {}
      );

      style.__attach();

      Animation.parallel([
        Animation.timing(opacity, { toValue: 1, duration: 100 })
      ]).start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes, config] = animateMock.mock.calls[0];
      expect(config.duration).toBe(100);
      expect(keyframes[0].opacity).toBeCloseTo(0);
      expect(keyframes[keyframes.length - 1].opacity).toBeCloseTo(1);

      restore();
    });
  });

  describe('Transform animations', () => {
    test('parallel animations on transform properties produce a single element.animate() call', async () => {
      const { animateMock, restore } = mockAnimate();

      const translateX = new AnimatedValue(0);
      const translateY = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        {
          transform: [{ translateX }, { translateY }]
        },
        () => element,
        () => {}
      );

      style.__attach();

      Animation.parallel([
        Animation.timing(translateX, { toValue: 100, duration: 100 }),
        Animation.timing(translateY, { toValue: 200, duration: 100 })
      ]).start();

      await Promise.resolve();

      // Only ONE call to element.animate() with merged keyframes
      expect(animateMock).toHaveBeenCalledTimes(1);

      restore();
    });

    test('merged keyframes animate both transform components together', async () => {
      const { animateMock, restore } = mockAnimate();

      const translateX = new AnimatedValue(0);
      const translateY = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        {
          transform: [{ translateX }, { translateY }]
        },
        () => element,
        () => {}
      );

      style.__attach();

      Animation.parallel([
        Animation.timing(translateX, { toValue: 100, duration: 100 }),
        Animation.timing(translateY, { toValue: 200, duration: 100 })
      ]).start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes] = animateMock.mock.calls[0];

      // First keyframe has both transforms at their starting positions
      expect(keyframes[0].transform).toBe('translateX(0px)translateY(0px)');

      // Last keyframe has both transforms at their final positions
      expect(keyframes[keyframes.length - 1].transform).toBe(
        'translateX(100px)translateY(200px)'
      );

      // Intermediate keyframes show both values animating together
      const midIndex = Math.floor(keyframes.length / 2);
      const midKeyframe = keyframes[midIndex];

      // Both translateX and translateY should be at approximately 50% of their journey
      expect(midKeyframe.transform).toMatch(/translateX\(\d+\.?\d*px\)/);
      expect(midKeyframe.transform).toMatch(/translateY\(\d+\.?\d*px\)/);

      restore();
    });

    test('three transform properties animated in parallel merge into one animation', async () => {
      const { animateMock, restore } = mockAnimate();

      const translateX = new AnimatedValue(0);
      const translateY = new AnimatedValue(0);
      const scale = new AnimatedValue(1);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        {
          transform: [{ translateX }, { translateY }, { scale }]
        },
        () => element,
        () => {}
      );

      style.__attach();

      Animation.parallel([
        Animation.timing(translateX, { toValue: 100, duration: 100 }),
        Animation.timing(translateY, { toValue: 200, duration: 100 }),
        Animation.timing(scale, { toValue: 2, duration: 100 })
      ]).start();

      await Promise.resolve();

      // Only ONE call with all three transforms animating together
      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes] = animateMock.mock.calls[0];

      // First keyframe has all transforms at starting positions
      expect(keyframes[0].transform).toBe(
        'translateX(0px)translateY(0px)scale(1)'
      );

      // Last keyframe has all transforms at final positions
      expect(keyframes[keyframes.length - 1].transform).toBe(
        'translateX(100px)translateY(200px)scale(2)'
      );

      restore();
    });

    test('opacity and transform animated in parallel on same element produce one animation', async () => {
      const { animateMock, restore } = mockAnimate();

      const opacity = new AnimatedValue(0);
      const translateX = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        {
          opacity,
          transform: [{ translateX }]
        },
        () => element,
        () => {}
      );

      style.__attach();

      Animation.parallel([
        Animation.timing(opacity, { toValue: 1, duration: 100 }),
        Animation.timing(translateX, { toValue: 100, duration: 100 })
      ]).start();

      await Promise.resolve();

      // One animation with both opacity and transform keyframes
      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes] = animateMock.mock.calls[0];

      // Verify keyframes contain both properties
      expect(keyframes[0]).toHaveProperty('opacity');
      expect(keyframes[0]).toHaveProperty('transform');
      expect(keyframes[0].opacity).toBeCloseTo(0);
      expect(keyframes[0].transform).toBe('translateX(0px)');

      expect(keyframes[keyframes.length - 1].opacity).toBeCloseTo(1);
      expect(keyframes[keyframes.length - 1].transform).toBe(
        'translateX(100px)'
      );

      restore();
    });

    test('non-parallel single transform animation works correctly', async () => {
      const { animateMock, restore } = mockAnimate();

      const translateX = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        {
          transform: [{ translateX }]
        },
        () => element,
        () => {}
      );

      style.__attach();

      // Single animation - should work as expected
      Animation.timing(translateX, { toValue: 100, duration: 100 }).start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes] = animateMock.mock.calls[0];
      expect(keyframes[0].transform).toBe('translateX(0px)');
      expect(keyframes[keyframes.length - 1].transform).toBe(
        'translateX(100px)'
      );

      restore();
    });
  });

  describe('Different timing configurations', () => {
    test('animations with different durations use max duration', async () => {
      const { animateMock, restore } = mockAnimate();

      const opacity = new AnimatedValue(0);
      const translateX = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { opacity, transform: [{ translateX }] },
        () => element,
        () => {}
      );

      style.__attach();

      Animation.parallel([
        Animation.timing(opacity, { toValue: 1, duration: 100 }),
        Animation.timing(translateX, { toValue: 100, duration: 200 })
      ]).start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes, config] = animateMock.mock.calls[0];

      // Duration should be the max of both (200)
      expect(config.duration).toBe(200);

      // Both should reach their final values
      expect(keyframes[keyframes.length - 1].opacity).toBeCloseTo(1);
      expect(keyframes[keyframes.length - 1].transform).toBe(
        'translateX(100px)'
      );

      restore();
    });

    test('animations with different delays merge correctly', async () => {
      const { animateMock, restore } = mockAnimate();

      const translateX = new AnimatedValue(0);
      const translateY = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        {
          transform: [{ translateX }, { translateY }]
        },
        () => element,
        () => {}
      );

      style.__attach();

      // Different delays - translateY starts later
      Animation.parallel([
        Animation.timing(translateX, { toValue: 100, duration: 100, delay: 0 }),
        Animation.timing(translateY, {
          toValue: 200,
          duration: 100,
          delay: 50
        })
      ]).start();

      await Promise.resolve();

      // Still should be a single merged animation
      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes] = animateMock.mock.calls[0];

      // First keyframe: translateX starts animating, translateY still at start
      expect(keyframes[0].transform).toBe('translateX(0px)translateY(0px)');

      // Last keyframe: both at end
      expect(keyframes[keyframes.length - 1].transform).toBe(
        'translateX(100px)translateY(200px)'
      );

      restore();
    });

    test('animations with both different durations and delays', async () => {
      const { animateMock, restore } = mockAnimate();

      const opacity = new AnimatedValue(0);
      const translateX = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { opacity, transform: [{ translateX }] },
        () => element,
        () => {}
      );

      style.__attach();

      // opacity: starts at 0, runs for 100ms
      // translateX: starts at 50ms, runs for 100ms (ends at 150ms)
      Animation.parallel([
        Animation.timing(opacity, { toValue: 1, duration: 100, delay: 0 }),
        Animation.timing(translateX, { toValue: 100, duration: 100, delay: 50 })
      ]).start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes, config] = animateMock.mock.calls[0];

      // Total duration should be max(0+100, 50+100) = 150
      expect(config.duration).toBe(150);

      // First keyframe: both at start
      expect(keyframes[0].opacity).toBeCloseTo(0);
      expect(keyframes[0].transform).toBe('translateX(0px)');

      // Last keyframe: both at end
      expect(keyframes[keyframes.length - 1].opacity).toBeCloseTo(1);
      expect(keyframes[keyframes.length - 1].transform).toBe(
        'translateX(100px)'
      );

      restore();
    });
  });

  describe('Multiple elements', () => {
    test('parallel animations on different elements create separate animations', async () => {
      const { animateMock, restore } = mockAnimate();

      const opacity1 = new AnimatedValue(0);
      const opacity2 = new AnimatedValue(0);
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');

      const style1 = new AnimatedStyle(
        { opacity: opacity1 },
        () => element1,
        () => {}
      );

      const style2 = new AnimatedStyle(
        { opacity: opacity2 },
        () => element2,
        () => {}
      );

      style1.__attach();
      style2.__attach();

      Animation.parallel([
        Animation.timing(opacity1, { toValue: 1, duration: 100 }),
        Animation.timing(opacity2, { toValue: 0.5, duration: 100 })
      ]).start();

      await Promise.resolve();

      // Two separate elements = two separate animate calls
      expect(animateMock).toHaveBeenCalledTimes(2);

      restore();
    });

    test('parallel animations on different elements with transforms create separate animations', async () => {
      const { animateMock, restore } = mockAnimate();

      // Two separate elements with their own animated values
      const translateX1 = new AnimatedValue(0);
      const translateX2 = new AnimatedValue(0);
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');

      const style1 = new AnimatedStyle(
        { transform: [{ translateX: translateX1 }] },
        () => element1,
        () => {}
      );

      const style2 = new AnimatedStyle(
        { transform: [{ translateX: translateX2 }] },
        () => element2,
        () => {}
      );

      style1.__attach();
      style2.__attach();

      // Parallel animations on DIFFERENT elements
      Animation.parallel([
        Animation.timing(translateX1, { toValue: 100, duration: 100 }),
        Animation.timing(translateX2, { toValue: 200, duration: 100 })
      ]).start();

      await Promise.resolve();

      // These SHOULD be 2 separate animations since they're on different elements
      expect(animateMock).toHaveBeenCalledTimes(2);

      restore();
    });

    test('mixed same and different elements in parallel', async () => {
      const { animateMock, restore } = mockAnimate();

      const opacity1 = new AnimatedValue(0);
      const translateX1 = new AnimatedValue(0);
      const opacity2 = new AnimatedValue(0);
      const element1 = document.createElement('div');
      const element2 = document.createElement('div');

      const style1 = new AnimatedStyle(
        { opacity: opacity1, transform: [{ translateX: translateX1 }] },
        () => element1,
        () => {}
      );

      const style2 = new AnimatedStyle(
        { opacity: opacity2 },
        () => element2,
        () => {}
      );

      style1.__attach();
      style2.__attach();

      // Two animations on element1, one on element2
      Animation.parallel([
        Animation.timing(opacity1, { toValue: 1, duration: 100 }),
        Animation.timing(translateX1, { toValue: 100, duration: 100 }),
        Animation.timing(opacity2, { toValue: 0.5, duration: 100 })
      ]).start();

      await Promise.resolve();

      // Two animate calls: one for element1 (merged), one for element2
      expect(animateMock).toHaveBeenCalledTimes(2);

      restore();
    });
  });

  describe('Empty and edge cases', () => {
    test('empty parallel has zero duration timing', () => {
      const parallel = Animation.parallel([]);

      const timing = parallel.getTiming();
      expect(timing.totalDuration).toBe(0);
      expect(timing.delay).toBe(0);
      expect(timing.duration).toBe(0);

      // getValueAnimations should return empty array
      expect(parallel.getValueAnimations()).toEqual([]);
    });

    test('parallel with only delays runs children individually', () => {
      const parallel = Animation.parallel([
        Animation.delay(10),
        Animation.delay(20)
      ]);

      // Check timing
      const timing = parallel.getTiming();
      expect(timing.totalDuration).toBe(20); // max of delays

      // getValueAnimations should return empty array
      expect(parallel.getValueAnimations()).toEqual([]);
    });

    test('parallel getTiming returns max of children durations', () => {
      const value1 = new AnimatedValue(0);
      const value2 = new AnimatedValue(0);

      const parallel = Animation.parallel([
        Animation.timing(value1, { toValue: 1, duration: 100 }),
        Animation.timing(value2, { toValue: 1, duration: 200 })
      ]);

      const timing = parallel.getTiming();
      expect(timing.totalDuration).toBe(200);
      expect(timing.delay).toBe(0);
      expect(timing.duration).toBe(200);
    });

    test('parallel getTiming accounts for delays', () => {
      const value1 = new AnimatedValue(0);
      const value2 = new AnimatedValue(0);

      const parallel = Animation.parallel([
        Animation.timing(value1, { toValue: 1, duration: 100, delay: 50 }),
        Animation.timing(value2, { toValue: 1, duration: 100 })
      ]);

      const timing = parallel.getTiming();
      // max(50+100, 0+100) = 150
      expect(timing.totalDuration).toBe(150);
    });
  });

  describe('Nested parallel animations', () => {
    test('nested parallels flatten correctly', async () => {
      const { animateMock, restore } = mockAnimate();

      const opacity = new AnimatedValue(0);
      const translateX = new AnimatedValue(0);
      const translateY = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { opacity, transform: [{ translateX }, { translateY }] },
        () => element,
        () => {}
      );

      style.__attach();

      Animation.parallel([
        Animation.timing(opacity, { toValue: 1, duration: 100 }),
        Animation.parallel([
          Animation.timing(translateX, { toValue: 100, duration: 100 }),
          Animation.timing(translateY, { toValue: 200, duration: 100 })
        ])
      ]).start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes] = animateMock.mock.calls[0];

      expect(keyframes[0].opacity).toBeCloseTo(0);
      expect(keyframes[0].transform).toBe('translateX(0px)translateY(0px)');
      expect(keyframes[keyframes.length - 1].opacity).toBeCloseTo(1);
      expect(keyframes[keyframes.length - 1].transform).toBe(
        'translateX(100px)translateY(200px)'
      );

      restore();
    });
  });

  describe('Parallel with spring animations', () => {
    test('parallel with timing and spring animations', async () => {
      const { animateMock, restore } = mockAnimate();

      const opacity = new AnimatedValue(0);
      const translateX = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { opacity, transform: [{ translateX }] },
        () => element,
        () => {}
      );

      style.__attach();

      Animation.parallel([
        Animation.timing(opacity, { toValue: 1, duration: 100 }),
        Animation.spring(translateX, { toValue: 100 })
      ]).start();

      await Promise.resolve();

      // Should still produce a single merged animation
      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes] = animateMock.mock.calls[0];

      // First keyframe
      expect(keyframes[0].opacity).toBeCloseTo(0);
      expect(keyframes[0].transform).toBe('translateX(0px)');

      // Last keyframe - spring should reach its target
      expect(keyframes[keyframes.length - 1].opacity).toBeCloseTo(1);
      expect(keyframes[keyframes.length - 1].transform).toBe(
        'translateX(100px)'
      );

      restore();
    });

    test('two spring animations in parallel', async () => {
      const { animateMock, restore } = mockAnimate();

      const translateX = new AnimatedValue(0);
      const translateY = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { transform: [{ translateX }, { translateY }] },
        () => element,
        () => {}
      );

      style.__attach();

      Animation.parallel([
        Animation.spring(translateX, { toValue: 100 }),
        Animation.spring(translateY, { toValue: 200 })
      ]).start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes] = animateMock.mock.calls[0];

      expect(keyframes[0].transform).toBe('translateX(0px)translateY(0px)');
      expect(keyframes[keyframes.length - 1].transform).toBe(
        'translateX(100px)translateY(200px)'
      );

      restore();
    });
  });

  describe('Callback behavior', () => {
    test('callback is called when parallel animation finishes', async () => {
      const { restore } = mockAnimate();
      const callback = jest.fn();

      const opacity = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { opacity },
        () => element,
        () => {}
      );

      style.__attach();

      Animation.parallel([
        Animation.timing(opacity, { toValue: 1, duration: 100 })
      ]).start(callback);

      await Promise.resolve();
      // Wait for the mock animation to "finish"
      await Promise.resolve();

      expect(callback).toHaveBeenCalledWith({ finished: true });

      restore();
    });
  });
});
