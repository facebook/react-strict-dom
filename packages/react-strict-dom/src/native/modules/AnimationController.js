/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { CompositeAnimation } from '../../types/renderer.native';

import type {
  AnimationDirection,
  AnimationFillMode
} from '../../types/animation';

import * as ReactNative from '../react-native';

import { keyframeRegistry } from '../css/keyframeRegistry';
import { getEasingFunction } from './animationUtils';

export type AnimationState = 'not-started' | 'running' | 'completed';

export type AnimationMetadata = $ReadOnly<{
  animationName: string,
  delay: number,
  duration: number,
  timingFunction: string,
  iterationCount: number | 'infinite',
  direction: AnimationDirection,
  fillMode: AnimationFillMode,
  playState: 'running' | 'paused',
  shouldUseNativeDriver: boolean
}>;

/**
 * AnimationController handles the lifecycle and state management of CSS animations.
 */
export class AnimationController {
  _metadata: AnimationMetadata;
  _animatedValue: ReactNative.Animated.Value;
  _animation: CompositeAnimation | null = null;
  _state: AnimationState = 'not-started';
  _isPaused: boolean = false;
  _pausedValue: number = 0;
  _onStateChange: ?(state: AnimationState) => void;
  _isDisposed: boolean = false;

  constructor(
    metadata: AnimationMetadata,
    onStateChange?: (state: AnimationState) => void
  ) {
    this._metadata = metadata;
    this._animatedValue = new ReactNative.Animated.Value(0);
    this._onStateChange = onStateChange;
    this._isPaused = metadata.playState === 'paused';
  }

  start(): void {
    if (this._isDisposed) {
      return;
    }

    this._isPaused = false;
    this.stop();
    this._animatedValue = new ReactNative.Animated.Value(0);

    const keyframeDefinition = keyframeRegistry.resolve(
      this._metadata.animationName
    );
    if (!keyframeDefinition) {
      return;
    }

    this._animation = this._createKeyframeAnimation();
    if (this._animation) {
      this._animation.start();
      this._setState('running');
    }
  }

  pause(): void {
    if (this._isDisposed || this._isPaused) {
      return;
    }

    if (this._animation) {
      this._animatedValue.stopAnimation((value) => {
        this._pausedValue = value || 0;
      });
      if (this._animation) {
        this._animation.stop();
      }
      this._isPaused = true;
    }
  }

  resume(): void {
    if (this._isDisposed || !this._isPaused) {
      return;
    }

    const resumeAnimation = this._createResumeAnimation(this._pausedValue);
    if (resumeAnimation) {
      this._animation = resumeAnimation;
      resumeAnimation.start((result) => {
        if (this._isDisposed) {
          return;
        }

        if (result?.finished) {
          if (this._metadata.iterationCount === 'infinite') {
            this.start();
          } else {
            this._setState('completed');
          }
        }
      });
      this._setState('running');
    } else {
      this.start();
    }

    this._isPaused = false;
  }

  stop(): void {
    if (this._animation) {
      this._animation.stop();
      this._animation = null;
    }
    this._isPaused = false;
    this._setState('not-started');
  }

  dispose(): void {
    this.stop();
    this._isDisposed = true;
    this._onStateChange = null;

    // $FlowFixMe[method-unbinding] - stopAnimation is a valid React Native API method
    if (this._animatedValue && this._animatedValue.stopAnimation) {
      this._animatedValue.stopAnimation();
    }
  }

  getState(): AnimationState {
    return this._state;
  }

  isPaused(): boolean {
    return this._isPaused;
  }

  getAnimatedValue(): ReactNative.Animated.Value {
    return this._animatedValue;
  }

  _createKeyframeAnimation(): CompositeAnimation | null {
    const {
      delay,
      duration,
      timingFunction,
      iterationCount,
      shouldUseNativeDriver
    } = this._metadata;

    try {
      this._animatedValue.setValue(0);
    } catch (error) {
      // In test environments, setValue might not exist
    }

    const baseAnimation = ReactNative.Animated.timing(this._animatedValue, {
      delay,
      duration,
      easing: getEasingFunction(timingFunction),
      toValue: 1,
      useNativeDriver: shouldUseNativeDriver
    });

    const wrappedAnimation = this._wrapAnimationWithCallbacks(baseAnimation);

    if (iterationCount === 'infinite') {
      if (typeof ReactNative.Animated.loop === 'function') {
        return ReactNative.Animated.loop(wrappedAnimation, { iterations: -1 });
      }
    } else if (iterationCount > 1) {
      if (typeof ReactNative.Animated.loop === 'function') {
        return ReactNative.Animated.loop(wrappedAnimation, {
          iterations: Math.floor(iterationCount)
        });
      }
    }

    return wrappedAnimation;
  }

  _createResumeAnimation(fromValue: number): CompositeAnimation | null {
    const { duration, timingFunction, shouldUseNativeDriver } = this._metadata;

    const remainingProgress = 1 - fromValue;

    if (remainingProgress <= 0.01) {
      return null;
    }

    const remainingDuration = Math.max(0, duration * remainingProgress);
    if (remainingDuration <= 0) {
      return null;
    }

    return ReactNative.Animated.timing(this._animatedValue, {
      delay: 0,
      duration: remainingDuration,
      easing: getEasingFunction(timingFunction),
      toValue: 1,
      useNativeDriver: shouldUseNativeDriver
    });
  }

  _wrapAnimationWithCallbacks(
    animation: CompositeAnimation
  ): CompositeAnimation {
    const originalStart = animation.start;
    const { delay, iterationCount } = this._metadata;

    animation.start = (callback) => {
      if (delay > 0) {
        setTimeout(() => {
          if (!this._isDisposed) {
            this._setState('running');
          }
        }, delay);
      } else {
        this._setState('running');
      }

      originalStart.call(animation, (result) => {
        if (!this._isDisposed) {
          if (result?.finished && iterationCount !== 'infinite') {
            this._setState('completed');
          }
        }
        if (callback) callback(result);
      });
    };

    return animation;
  }

  _setState(state: AnimationState): void {
    if (this._state !== state) {
      this._state = state;
      if (this._onStateChange && !this._isDisposed) {
        this._onStateChange(state);
      }
    }
  }
}
