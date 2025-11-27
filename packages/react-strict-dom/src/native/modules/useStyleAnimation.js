/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { ReactNativeStyle } from '../../types/renderer.native';

import * as React from 'react';

import { warnMsg } from '../../shared/logUtils';
import { keyframeRegistry } from '../css/keyframeRegistry';
import {
  isString,
  parseAnimationTimeValue,
  parseAnimationIterationCount,
  parseAnimationDirection,
  parseAnimationFillMode,
  parseAnimationPlayState,
  canUseNativeDriver,
  collectAnimatedProperties,
  removeAnimationProperties
} from './animationUtils';
import {
  AnimationController,
  type AnimationMetadata,
  type AnimationState
} from './AnimationController';
import { getInterpolatedStyle } from '../css/animationInterpolation';

function extractAnimationProperties(
  style: ReactNativeStyle
): AnimationMetadata | null {
  const {
    animationName,
    animationDuration = '0s',
    animationDelay = '0s',
    animationTimingFunction = 'ease',
    animationIterationCount = 1,
    animationDirection = 'normal',
    animationFillMode = 'none',
    animationPlayState = 'running'
  } = style;

  if (animationName == null || typeof animationName !== 'string') {
    return null;
  }

  const duration = parseAnimationTimeValue(animationDuration);
  const delay = parseAnimationTimeValue(animationDelay);

  if (duration <= 0) {
    return null;
  }

  const keyframeDefinition = keyframeRegistry.resolve(animationName);
  if (!keyframeDefinition) {
    if (__DEV__) {
      warnMsg(`Animation "${animationName}" keyframes not found`);
    }
    return null;
  }

  const { keyframes } = keyframeDefinition;
  const animatedProperties = collectAnimatedProperties(keyframes);
  const shouldUseNativeDriver = canUseNativeDriver(animatedProperties);

  return {
    animationName,
    delay,
    duration,
    timingFunction: isString(animationTimingFunction)
      ? animationTimingFunction
      : 'ease',
    iterationCount: parseAnimationIterationCount(animationIterationCount),
    direction: parseAnimationDirection(animationDirection),
    fillMode: parseAnimationFillMode(animationFillMode),
    playState: parseAnimationPlayState(animationPlayState),
    shouldUseNativeDriver
  };
}

function animationStyleHasChanged(
  next: ReactNativeStyle | void,
  prev: ReactNativeStyle | void | null
): boolean {
  if (next === undefined) {
    return false;
  }

  if (prev === undefined || prev === null) {
    return true; // No previous style, so this is a change
  }

  if (typeof prev !== typeof next) {
    return true;
  }

  // Check for changes that require a full restart
  const restartProperties = [
    'animationName',
    'animationDuration',
    'animationDelay',
    'animationTimingFunction',
    'animationIterationCount'
  ];

  for (const prop of restartProperties) {
    if (prev[prop] !== next[prop]) {
      return true;
    }
  }

  // Don't restart for these properties - they can be handled without restarting
  // - animationPlayState: handled by the play state effect
  // - animationDirection: handled by interpolation logic
  // - animationFillMode: handled by interpolation logic

  return false;
}

export function useStyleAnimation(style: ReactNativeStyle): ReactNativeStyle {
  const controllerRef = React.useRef<?AnimationController>(null);
  const [currentStyle, setCurrentStyle] =
    React.useState<?ReactNativeStyle>(null);
  const [animationState, setAnimationState] =
    React.useState<AnimationState>('not-started');

  const hasAnimation = style.animationName != null;

  const animationMetadata = React.useMemo(() => {
    return hasAnimation ? extractAnimationProperties(style) : null;
  }, [hasAnimation, style]);

  React.useEffect(() => {
    if (!hasAnimation || !animationMetadata) {
      if (controllerRef.current) {
        controllerRef.current.dispose();
        controllerRef.current = null;
      }
      setCurrentStyle(null);
      setAnimationState('not-started');
      return;
    }

    const hasAnimationChanged = animationStyleHasChanged(style, currentStyle);

    const needsNewController = !controllerRef.current || hasAnimationChanged;

    if (needsNewController) {
      if (controllerRef.current) {
        controllerRef.current.dispose();
      }

      setCurrentStyle(style);
      setAnimationState('not-started');

      controllerRef.current = new AnimationController(
        animationMetadata,
        (newState) => {
          setAnimationState(newState);
        }
      );

      // Start animation unless paused
      if (animationMetadata.playState !== 'paused') {
        controllerRef.current.start();
      }
    }
  }, [hasAnimation, animationMetadata, style, currentStyle]);

  // Handle play state changes
  React.useEffect(() => {
    const controller = controllerRef.current;
    if (!controller || !animationMetadata) {
      return;
    }

    const currentPlayState = parseAnimationPlayState(style.animationPlayState);
    const shouldBePaused = currentPlayState === 'paused';

    if (shouldBePaused && !controller.isPaused()) {
      controller.pause();
    } else if (!shouldBePaused && controller.isPaused()) {
      controller.resume();
    }
  }, [style.animationPlayState, animationMetadata]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.dispose();
      }
    };
  }, []);

  // Early return if no animation
  if (!hasAnimation || !animationMetadata) {
    return style;
  }

  const controller = controllerRef.current;
  if (!controller) {
    return style;
  }

  // Get current direction and fill mode from style
  const currentDirection = parseAnimationDirection(style.animationDirection);
  const currentFillMode = parseAnimationFillMode(style.animationFillMode);

  // Get interpolated style using React animation state (which triggers re-renders)
  const interpolatedStyle = getInterpolatedStyle(
    controller.getAnimatedValue(),
    animationMetadata.animationName,
    style,
    currentDirection,
    currentFillMode,
    animationState // Use React state instead of controller's internal state
  );

  // Remove animation properties and return final style
  const styleWithoutAnimationProps = removeAnimationProperties(style);

  return {
    ...styleWithoutAnimationProps,
    ...interpolatedStyle
  };
}
