/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { SpringAnimationConfig } from '../../shared/SharedAnimatedTypes';
import type AnimatedValueClass from '../nodes/AnimatedValue';
import type {
  AnimationTiming,
  CompositeAnimation,
  EndCallback,
  ValueAnimation
} from '../types/AnimatedTypes';

import {
  driveAnimation,
  stopAnimation,
  resetAnimation
} from './AnimationDriver';
import SpringAnimation from './SpringAnimation';

/**
 * Cached result of spring simulation
 */
type SpringSimulationResult = {
  duration: number,
  // Normalized timeline where values are 0-1 progress (with possible overshoot)
  normalizedTimeline: $ReadOnlyArray<number>,
  easing: (t: number) => number
};

export default function createSpringAnimation(
  value: AnimatedValueClass,
  config: SpringAnimationConfig
): CompositeAnimation {
  const springDelay = config.delay ?? 0;
  const toValue = config.toValue;

  let animationState = null;
  let valueAnimation: ValueAnimation | null = null;
  let cachedSimulation: SpringSimulationResult | null = null;

  /**
   * Runs the spring simulation once and caches the results.
   * Returns duration and an easing function based on the timeline.
   *
   * The simulation is run with canonical values (0 → 1) and the easing function
   * returns normalized progress (0-1, with possible overshoot for springs).
   * This allows the easing to work correctly even when the sequence overrides
   * the fromValue - the spring "shape" is the same regardless of the actual
   * from/to values when using the same spring parameters.
   */
  const getSimulation = (): SpringSimulationResult => {
    if (cachedSimulation != null) {
      return cachedSimulation;
    }

    // Run spring simulation with canonical values (0 → 1)
    // The spring curve shape is independent of the actual from/to values
    const canonicalConfig = {
      ...config,
      toValue: 1
    };
    const springAnim = new SpringAnimation(canonicalConfig);
    springAnim.generate(0); // fromValue = 0

    const duration = springAnim.getDuration();
    const timeline = springAnim.getTimeline();

    // Timeline already contains normalized values (0 → 1 with possible overshoot)
    // since we simulated from 0 to 1
    const normalizedTimeline: $ReadOnlyArray<number> = timeline;

    // Create easing function from normalized timeline
    const easing = (t: number): number => {
      const index = Math.min(
        Math.floor(t * (normalizedTimeline.length - 1)),
        normalizedTimeline.length - 1
      );
      return normalizedTimeline[index];
    };

    cachedSimulation = { duration, normalizedTimeline, easing };
    return cachedSimulation;
  };

  return {
    reset() {
      resetAnimation(animationState, valueAnimation ? [valueAnimation] : []);
      animationState = null;
      valueAnimation = null;
      cachedSimulation = null;
    },

    start(callback?: EndCallback) {
      const fromValue = value.__getValue();
      const simulation = getSimulation();

      valueAnimation = {
        animatedValue: value,
        config: {
          delay: springDelay,
          duration: simulation.duration,
          easing: simulation.easing,
          fromValue,
          toValue
        }
      };

      animationState = driveAnimation(
        [valueAnimation],
        springDelay + simulation.duration,
        0,
        callback
      );
    },

    stop() {
      stopAnimation(animationState);
      animationState = null;
    },

    getTiming(): AnimationTiming {
      // Get the simulation to compute actual duration based on spring physics
      const simulation = getSimulation();
      return {
        delay: springDelay,
        duration: simulation.duration,
        totalDuration: springDelay + simulation.duration
      };
    },

    getValueAnimations(): $ReadOnlyArray<ValueAnimation> {
      if (valueAnimation == null) {
        const fromValue = value.__getValue();
        const simulation = getSimulation();

        valueAnimation = {
          animatedValue: value,
          config: {
            delay: springDelay,
            duration: simulation.duration,
            easing: simulation.easing,
            fromValue,
            toValue
          }
        };
      }
      return [valueAnimation];
    }
  };
}
