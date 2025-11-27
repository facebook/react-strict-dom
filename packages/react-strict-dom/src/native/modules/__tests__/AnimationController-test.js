/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AnimationController } from '../AnimationController';

// Mock react-native animated
const mockAnimatedValue = {
  setValue: jest.fn(),
  stopAnimation: jest.fn(),
  interpolate: jest.fn(() => 'interpolatedValue'),
  _value: 0
};

const createMockAnimation = () => ({
  start: jest.fn(),
  stop: jest.fn()
});

jest.mock('../../react-native', () => ({
  Animated: {
    Value: jest.fn(() => mockAnimatedValue),
    timing: jest.fn(() => createMockAnimation()),
    loop: jest.fn(() => createMockAnimation())
  },
  Easing: {
    linear: jest.fn(),
    ease: jest.fn()
  }
}));

// Mock keyframe registry
jest.mock('../../css/keyframeRegistry', () => ({
  keyframeRegistry: {
    resolve: jest.fn(() => ({
      id: 'test',
      keyframes: {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 }
      }
    }))
  }
}));

// Mock animation utils
jest.mock('../animationUtils', () => ({
  getEasingFunction: jest.fn(() => jest.fn())
}));

// Mock interpolation
jest.mock('../../css/animationInterpolation', () => ({
  getInterpolatedStyle: jest.fn(() => ({ opacity: 'interpolatedValue' }))
}));

describe('AnimationController', () => {
  let controller;
  let mockStateCallback;
  let mockMetadata;

  beforeEach(() => {
    jest.clearAllMocks();
    mockStateCallback = jest.fn();
    mockMetadata = {
      animationName: 'testAnimation',
      delay: 0,
      duration: 1000,
      timingFunction: 'ease',
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'none',
      playState: 'running',
      shouldUseNativeDriver: false
    };
    controller = new AnimationController(mockMetadata, mockStateCallback);
  });

  afterEach(() => {
    if (controller) {
      controller.dispose();
    }
  });

  test('should initialize with correct state', () => {
    expect(controller.getState()).toBe('not-started');
    expect(controller.isPaused()).toBe(false);
  });

  test('should start animation and change state', () => {
    controller.start();
    // State changes to running when animation starts
    expect(controller.getState()).toBe('running');
  });

  test('should handle paused initial state', () => {
    const pausedMetadata = { ...mockMetadata, playState: 'paused' };
    const pausedController = new AnimationController(pausedMetadata);

    expect(pausedController.isPaused()).toBe(true);

    pausedController.dispose();
  });

  test('should pause and resume animation', () => {
    controller.start();

    // Pause
    controller.pause();
    expect(controller.isPaused()).toBe(true);

    // Resume
    controller.resume();
    expect(controller.isPaused()).toBe(false);
  });

  test('should dispose and prevent further operations', () => {
    controller.start();
    controller.dispose();

    // Operations after dispose should not crash
    controller.start();
    controller.pause();
    controller.resume();
  });

  test('should handle infinite iteration count', () => {
    const infiniteMetadata = { ...mockMetadata, iterationCount: 'infinite' };
    const infiniteController = new AnimationController(infiniteMetadata);

    infiniteController.start();
    // State changes to running when animation starts
    expect(infiniteController.getState()).toBe('running');

    infiniteController.dispose();
  });

  test('should handle multiple iteration count', () => {
    const multipleMetadata = { ...mockMetadata, iterationCount: 3 };
    const multipleController = new AnimationController(multipleMetadata);

    multipleController.start();
    // State changes to running when animation starts
    expect(multipleController.getState()).toBe('running');

    multipleController.dispose();
  });

  test('should allow restart after pause and stop', () => {
    const controller = new AnimationController(mockMetadata);

    // Start animation
    controller.start();
    expect(controller.getState()).toBe('running');
    expect(controller.isPaused()).toBe(false);

    // Pause animation
    controller.pause();
    expect(controller.isPaused()).toBe(true);

    // Stop animation (this should clear paused state)
    controller.stop();
    expect(controller.getState()).toBe('not-started');
    expect(controller.isPaused()).toBe(false);

    // Should be able to start again
    controller.start();
    expect(controller.getState()).toBe('running');
    expect(controller.isPaused()).toBe(false);

    // Cleanup
    controller.dispose();
  });

  test('should allow start even when previously paused', () => {
    const controller = new AnimationController(mockMetadata);

    // Start and pause
    controller.start();
    controller.pause();
    expect(controller.isPaused()).toBe(true);

    // Start should clear paused state and start animation
    controller.start();
    expect(controller.getState()).toBe('running');
    expect(controller.isPaused()).toBe(false);

    // Cleanup
    controller.dispose();
  });
});
