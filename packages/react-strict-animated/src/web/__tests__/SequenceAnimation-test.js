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
 * These tests verify that sequence animations correctly chain animations
 * and produce properly timed keyframes when nested inside parallel animations.
 *
 * Note: When a sequence is started directly, it runs each child animation
 * sequentially. When a sequence is nested inside a parallel animation, the
 * parallel animation collects all value animations (with adjusted delays)
 * and merges them into a single Web Animation API call.
 */
describe('Sequence animations', () => {
  describe('Sequence inside parallel (merged keyframes)', () => {
    test('parallel wrapping a sequence produces merged keyframes', async () => {
      const { animateMock, restore } = mockAnimate();

      const opacity = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { opacity },
        () => element,
        () => {}
      );

      style.__attach();

      // Wrap sequence in parallel to trigger keyframe merging
      Animation.parallel([
        Animation.sequence([
          Animation.timing(opacity, { toValue: 0.5, duration: 100 }),
          Animation.timing(opacity, { toValue: 1, duration: 100 })
        ])
      ]).start();

      await Promise.resolve();

      // Should be a single animation call with merged keyframes
      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes, config] = animateMock.mock.calls[0];

      // Total duration should be 200ms (100 + 100)
      expect(config.duration).toBe(200);

      // First keyframe should start at 0
      expect(keyframes[0].opacity).toBeCloseTo(0);

      // Last keyframe should end at 1
      expect(keyframes[keyframes.length - 1].opacity).toBeCloseTo(1);

      restore();
    });

    test('sequence of three animations in parallel chains correctly', async () => {
      const { animateMock, restore } = mockAnimate();

      const translateX = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { transform: [{ translateX }] },
        () => element,
        () => {}
      );

      style.__attach();

      Animation.parallel([
        Animation.sequence([
          Animation.timing(translateX, { toValue: 100, duration: 100 }),
          Animation.timing(translateX, { toValue: 50, duration: 100 }),
          Animation.timing(translateX, { toValue: 200, duration: 100 })
        ])
      ]).start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes, config] = animateMock.mock.calls[0];

      // Total duration should be 300ms
      expect(config.duration).toBe(300);

      // First keyframe: start position
      expect(keyframes[0].transform).toBe('translateX(0px)');

      // Last keyframe: final position
      expect(keyframes[keyframes.length - 1].transform).toBe(
        'translateX(200px)'
      );

      restore();
    });

    test('sequence animating same value produces correct intermediate keyframes', async () => {
      const { animateMock, restore } = mockAnimate();

      const translateX = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { transform: [{ translateX }] },
        () => element,
        () => {}
      );

      style.__attach();

      // This is the pattern from SequenceDemo: 0 -> 60 -> -60 -> 0
      Animation.parallel([
        Animation.sequence([
          Animation.timing(translateX, { toValue: 60, duration: 350 }),
          Animation.timing(translateX, { toValue: -60, duration: 700 }),
          Animation.timing(translateX, { toValue: 0, duration: 350 })
        ])
      ]).start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes, config] = animateMock.mock.calls[0];

      // Total duration should be 350 + 700 + 350 = 1400ms
      expect(config.duration).toBe(1400);

      // First keyframe: start position (0)
      expect(keyframes[0].transform).toBe('translateX(0px)');

      // At 25% (350ms / 1400ms = 25%), we should be at the end of the first animation
      // which means translateX should be at or near 60
      const quarterIndex = Math.floor(keyframes.length * 0.25);
      const quarterValue = parseFloat(
        keyframes[quarterIndex].transform.match(/translateX\(([-\d.]+)px\)/)[1]
      );
      expect(quarterValue).toBeCloseTo(60, 0);

      // At 75% (1050ms / 1400ms = 75%), we should be at the end of the second animation
      // which means translateX should be at or near -60
      const threeQuarterIndex = Math.floor(keyframes.length * 0.75);
      const threeQuarterValue = parseFloat(
        keyframes[threeQuarterIndex].transform.match(
          /translateX\(([-\d.]+)px\)/
        )[1]
      );
      expect(threeQuarterValue).toBeCloseTo(-60, 0);

      // Last keyframe: final position (back to 0)
      expect(keyframes[keyframes.length - 1].transform).toBe('translateX(0px)');

      restore();
    });
  });

  describe('Sequence with Animation.delay()', () => {
    test('delay at the start of sequence delays the animation', async () => {
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
        Animation.sequence([
          Animation.delay(50),
          Animation.timing(opacity, { toValue: 1, duration: 100 })
        ])
      ]).start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes, config] = animateMock.mock.calls[0];

      // Total duration should be 150ms (50 delay + 100 animation)
      expect(config.duration).toBe(150);

      // First keyframe should still be at opacity 0 (during delay period)
      expect(keyframes[0].opacity).toBeCloseTo(0);

      // Last keyframe should be at opacity 1
      expect(keyframes[keyframes.length - 1].opacity).toBeCloseTo(1);

      restore();
    });

    test('delay between animations creates a pause', async () => {
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
        Animation.sequence([
          Animation.timing(opacity, { toValue: 0.5, duration: 100 }),
          Animation.delay(50),
          Animation.timing(opacity, { toValue: 1, duration: 100 })
        ])
      ]).start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes, config] = animateMock.mock.calls[0];

      // Total duration should be 250ms (100 + 50 + 100)
      expect(config.duration).toBe(250);

      // First keyframe: opacity 0
      expect(keyframes[0].opacity).toBeCloseTo(0);

      // Last keyframe: opacity 1
      expect(keyframes[keyframes.length - 1].opacity).toBeCloseTo(1);

      restore();
    });

    test('delay at the end of sequence extends total duration', async () => {
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
        Animation.sequence([
          Animation.timing(opacity, { toValue: 1, duration: 100 }),
          Animation.delay(50)
        ])
      ]).start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes, config] = animateMock.mock.calls[0];

      // Total duration should be 150ms (100 + 50)
      expect(config.duration).toBe(150);

      // Last keyframe should still be at opacity 1 (value holds during delay)
      expect(keyframes[keyframes.length - 1].opacity).toBeCloseTo(1);

      restore();
    });

    test('multiple delays in sequence accumulate correctly', async () => {
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
        Animation.sequence([
          Animation.delay(25),
          Animation.timing(opacity, { toValue: 0.5, duration: 50 }),
          Animation.delay(25),
          Animation.timing(opacity, { toValue: 1, duration: 50 }),
          Animation.delay(25)
        ])
      ]).start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      const [, config] = animateMock.mock.calls[0];

      // Total duration: 25 + 50 + 25 + 50 + 25 = 175ms
      expect(config.duration).toBe(175);

      restore();
    });
  });

  describe('Parallel containing multiple sequences', () => {
    test('two sequences in parallel run concurrently with merged keyframes', async () => {
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

      // Two sequences running in parallel
      Animation.parallel([
        Animation.sequence([
          Animation.timing(translateX, { toValue: 50, duration: 50 }),
          Animation.timing(translateX, { toValue: 100, duration: 50 })
        ]),
        Animation.sequence([
          Animation.timing(translateY, { toValue: 100, duration: 50 }),
          Animation.timing(translateY, { toValue: 200, duration: 50 })
        ])
      ]).start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes, config] = animateMock.mock.calls[0];

      // Both sequences are 100ms, so parallel duration is 100ms
      expect(config.duration).toBe(100);

      // First keyframe: both at 0
      expect(keyframes[0].transform).toBe('translateX(0px)translateY(0px)');

      // Last keyframe: X at 100, Y at 200
      expect(keyframes[keyframes.length - 1].transform).toBe(
        'translateX(100px)translateY(200px)'
      );

      restore();
    });

    test('sequences with different durations in parallel', async () => {
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

      // First sequence is longer (150ms) than second (100ms)
      Animation.parallel([
        Animation.sequence([
          Animation.timing(translateX, { toValue: 50, duration: 50 }),
          Animation.timing(translateX, { toValue: 100, duration: 100 })
        ]),
        Animation.sequence([
          Animation.timing(translateY, { toValue: 200, duration: 100 })
        ])
      ]).start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes, config] = animateMock.mock.calls[0];

      // Duration is max of both sequences: 150ms
      expect(config.duration).toBe(150);

      // First keyframe: both at 0
      expect(keyframes[0].transform).toBe('translateX(0px)translateY(0px)');

      // Last keyframe: X at 100, Y at 200 (Y finished at 100ms, held until 150ms)
      expect(keyframes[keyframes.length - 1].transform).toBe(
        'translateX(100px)translateY(200px)'
      );

      restore();
    });

    test('sequence with delay followed by parallel animation', async () => {
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
        Animation.sequence([
          Animation.delay(50),
          Animation.parallel([
            Animation.timing(opacity, { toValue: 1, duration: 100 }),
            Animation.timing(translateX, { toValue: 100, duration: 100 })
          ])
        ])
      ]).start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes, config] = animateMock.mock.calls[0];

      // Total: 50 delay + 100 animation = 150ms
      expect(config.duration).toBe(150);

      // First keyframe: initial state
      expect(keyframes[0].opacity).toBeCloseTo(0);
      expect(keyframes[0].transform).toBe('translateX(0px)');

      // Last keyframe: final state
      expect(keyframes[keyframes.length - 1].opacity).toBeCloseTo(1);
      expect(keyframes[keyframes.length - 1].transform).toBe(
        'translateX(100px)'
      );

      restore();
    });
  });

  describe('Sequence with individual animation delays', () => {
    test('timing animations with their own delays accumulate in sequence', async () => {
      const { animateMock, restore } = mockAnimate();

      const opacity = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { opacity },
        () => element,
        () => {}
      );

      style.__attach();

      // Each timing animation has its own delay
      Animation.parallel([
        Animation.sequence([
          Animation.timing(opacity, { toValue: 0.5, duration: 100, delay: 25 }),
          Animation.timing(opacity, { toValue: 1, duration: 100, delay: 25 })
        ])
      ]).start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      const [, config] = animateMock.mock.calls[0];

      // Total: (25 + 100) + (25 + 100) = 250ms
      expect(config.duration).toBe(250);

      restore();
    });
  });

  describe('Multiple elements in sequence', () => {
    test('sequence animations on different elements create separate animations', async () => {
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

      // Sequence on different elements, wrapped in parallel
      Animation.parallel([
        Animation.sequence([
          Animation.timing(opacity1, { toValue: 1, duration: 100 }),
          Animation.timing(opacity2, { toValue: 1, duration: 100 })
        ])
      ]).start();

      await Promise.resolve();

      // Two separate elements = two separate animate calls
      expect(animateMock).toHaveBeenCalledTimes(2);

      restore();
    });
  });

  describe('Empty and edge cases', () => {
    test('empty sequence completes immediately', async () => {
      const callback = jest.fn();

      Animation.sequence([]).start(callback);

      await Promise.resolve();

      expect(callback).toHaveBeenCalledWith({ finished: true });
    });

    test('sequence with only delays has correct timing', () => {
      const seq = Animation.sequence([
        Animation.delay(10),
        Animation.delay(10),
        Animation.delay(10)
      ]);

      // Check timing
      const timing = seq.getTiming();
      expect(timing.totalDuration).toBe(30);

      // getValueAnimations should return empty array
      expect(seq.getValueAnimations()).toEqual([]);
    });

    test('sequence getTiming returns correct cumulative duration', () => {
      const value = new AnimatedValue(0);

      const seq = Animation.sequence([
        Animation.timing(value, { toValue: 1, duration: 100 }),
        Animation.delay(50),
        Animation.timing(value, { toValue: 2, duration: 150 }),
        Animation.delay(25)
      ]);

      const timing = seq.getTiming();
      expect(timing.totalDuration).toBe(325); // 100 + 50 + 150 + 25
      expect(timing.delay).toBe(0);
      expect(timing.duration).toBe(325);
    });

    test('sequence getValueAnimations adjusts delays correctly', () => {
      const value = new AnimatedValue(0);

      const seq = Animation.sequence([
        Animation.timing(value, { toValue: 1, duration: 100 }),
        Animation.delay(50),
        Animation.timing(value, { toValue: 2, duration: 100 })
      ]);

      const valueAnims = seq.getValueAnimations();
      expect(valueAnims).toHaveLength(2);

      // First animation starts at 0
      expect(valueAnims[0].config.delay).toBe(0);
      expect(valueAnims[0].config.toValue).toBe(1);

      // Second animation starts after first (100ms) + delay (50ms) = 150ms
      expect(valueAnims[1].config.delay).toBe(150);
      expect(valueAnims[1].config.toValue).toBe(2);
    });
  });

  describe('Nested sequences', () => {
    test('nested sequences flatten correctly in parallel', async () => {
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
        Animation.sequence([
          Animation.sequence([
            Animation.timing(opacity, { toValue: 0.25, duration: 50 }),
            Animation.timing(opacity, { toValue: 0.5, duration: 50 })
          ]),
          Animation.sequence([
            Animation.timing(opacity, { toValue: 0.75, duration: 50 }),
            Animation.timing(opacity, { toValue: 1, duration: 50 })
          ])
        ])
      ]).start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes, config] = animateMock.mock.calls[0];

      // Total: 50 + 50 + 50 + 50 = 200ms
      expect(config.duration).toBe(200);

      // First keyframe: opacity 0
      expect(keyframes[0].opacity).toBeCloseTo(0);

      // Last keyframe: opacity 1
      expect(keyframes[keyframes.length - 1].opacity).toBeCloseTo(1);

      restore();
    });

    test('deeply nested sequence with delays', async () => {
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
        Animation.sequence([
          Animation.delay(25),
          Animation.sequence([
            Animation.timing(opacity, { toValue: 0.5, duration: 50 }),
            Animation.delay(25)
          ]),
          Animation.timing(opacity, { toValue: 1, duration: 50 })
        ])
      ]).start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      const [, config] = animateMock.mock.calls[0];

      // Total: 25 + 50 + 25 + 50 = 150ms
      expect(config.duration).toBe(150);

      restore();
    });
  });

  describe('Sequence with spring animations', () => {
    test('sequence of springs on the same value chains correctly', async () => {
      const { animateMock, restore } = mockAnimate();

      const scale = new AnimatedValue(1);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { transform: [{ scale }] },
        () => element,
        () => {}
      );

      style.__attach();

      // This is the pattern from SpringDemo: 1 -> 1.4 -> 1
      Animation.sequence([
        Animation.spring(scale, {
          toValue: 1.4,
          stiffness: 300,
          damping: 10
        }),
        Animation.spring(scale, {
          toValue: 1,
          stiffness: 300,
          damping: 10
        })
      ]).start();

      await Promise.resolve();

      // Should create a single merged animation
      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes] = animateMock.mock.calls[0];

      // First keyframe should start at scale 1
      expect(keyframes[0].transform).toBe('scale(1)');

      // At approximately the halfway point (end of first spring, start of second),
      // the value should be at or near 1.4
      const midIndex = Math.floor(keyframes.length / 2);
      const midValue = parseFloat(
        keyframes[midIndex].transform.match(/scale\(([\d.]+)\)/)[1]
      );
      // The first spring should end at approximately 1.4
      // (allowing some tolerance due to spring physics)
      expect(midValue).toBeGreaterThan(1.3);

      // Last keyframe should end at scale 1
      expect(keyframes[keyframes.length - 1].transform).toBe('scale(1)');

      restore();
    });

    test('sequence of springs with different targets chains fromValue correctly', async () => {
      const { animateMock, restore } = mockAnimate();

      const translateY = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { transform: [{ translateY }] },
        () => element,
        () => {}
      );

      style.__attach();

      // Pattern: 0 -> 50 -> -25 (second spring should start from 50, not 0)
      Animation.sequence([
        Animation.spring(translateY, {
          toValue: 50,
          stiffness: 300,
          damping: 20
        }),
        Animation.spring(translateY, {
          toValue: -25,
          stiffness: 300,
          damping: 20
        })
      ]).start();

      await Promise.resolve();

      expect(animateMock).toHaveBeenCalledTimes(1);

      const [keyframes] = animateMock.mock.calls[0];

      // First keyframe: start position (0)
      expect(keyframes[0].transform).toBe('translateY(0px)');

      // Find approximately where first spring ends (near 50)
      // and verify second spring starts from there
      let foundMidpoint = false;
      for (let i = 1; i < keyframes.length - 1; i++) {
        const value = parseFloat(
          keyframes[i].transform.match(/translateY\(([-\d.]+)px\)/)[1]
        );
        // If we find a value close to 50, check the next few frames
        // don't suddenly jump back to 0 (wrong fromValue)
        if (Math.abs(value - 50) < 5 && !foundMidpoint) {
          foundMidpoint = true;
          // Check the next frame doesn't jump back toward 0
          if (i + 1 < keyframes.length) {
            const nextValue = parseFloat(
              keyframes[i + 1].transform.match(/translateY\(([-\d.]+)px\)/)[1]
            );
            // Next value should be moving toward -25, not jumping back to 0
            // It should still be positive or just crossing zero
            expect(nextValue).toBeGreaterThan(-30);
          }
        }
      }

      // Last keyframe: final position (-25)
      expect(keyframes[keyframes.length - 1].transform).toBe(
        'translateY(-25px)'
      );

      restore();
    });
  });

  describe('Standalone sequence behavior', () => {
    test('standalone sequence creates a single merged animation', async () => {
      const { animateMock, restore } = mockAnimate();

      const opacity = new AnimatedValue(0);
      const element = document.createElement('div');

      const style = new AnimatedStyle(
        { opacity },
        () => element,
        () => {}
      );

      style.__attach();

      // Standalone sequence (not wrapped in parallel) now also creates
      // a single merged Web Animation
      Animation.sequence([
        Animation.timing(opacity, { toValue: 0.5, duration: 100 }),
        Animation.timing(opacity, { toValue: 1, duration: 100 })
      ]).start();

      await Promise.resolve();

      // Single merged animation for the entire sequence
      expect(animateMock).toHaveBeenCalledTimes(1);

      // Total duration is 200ms (100 + 100)
      const [keyframes, config] = animateMock.mock.calls[0];
      expect(config.duration).toBe(200);
      expect(keyframes[0].opacity).toBeCloseTo(0);
      expect(keyframes[keyframes.length - 1].opacity).toBeCloseTo(1);

      restore();
    });
  });
});
