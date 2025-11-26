/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type AnimatedNode from './AnimatedNode';
import type { EndCallback } from '../types/AnimatedTypes';
import type { AnimatedAnimation, KeyframeMap } from '../animations/Animation';

import AnimatedStyle from './AnimatedStyle';
import AnimatedWithChildren from './AnimatedWithChildren';

type AnimationData = $ReadOnly<{
  animatedAnimation: AnimatedAnimation,
  webAnimations: $ReadOnlyArray<Animation>
}>;

function findAnimatedStyles(
  node: AnimatedNode<mixed>,
  animatedStyles: Set<AnimatedStyle>
) {
  if (node instanceof AnimatedStyle) {
    animatedStyles.add(node);
  } else if (node instanceof AnimatedWithChildren) {
    node
      .__getChildren()
      .forEach((child) => findAnimatedStyles(child, animatedStyles));
  }
}

function flush(rootNode: AnimatedValue) {
  const animatedStyles: Set<AnimatedStyle> = new Set();
  findAnimatedStyles(rootNode, animatedStyles);
  animatedStyles.forEach((aStyle) => aStyle.flush());
  return animatedStyles;
}

function flushToKeyframeMap(rootNode: AnimatedValue, keyframeMap: KeyframeMap) {
  const animatedStyles: Set<AnimatedStyle> = new Set();
  findAnimatedStyles(rootNode, animatedStyles);
  animatedStyles.forEach((aStyle) => aStyle.update(keyframeMap));
}

export default class AnimatedValue extends AnimatedWithChildren<number> {
  #value: number;
  #startingValue: number;
  #currentAnimation: AnimationData | null;

  constructor(startingValue: number) {
    super();
    this.#value = startingValue;
    this.#startingValue = startingValue;
    this.#currentAnimation = null;
  }

  __getValue(): number {
    return this.#value;
  }

  /**
   * Directly set the value.  This will stop any animations running on the value
   * and update all the bound properties.
   */
  setValue(value: number): void {
    if (this.#currentAnimation != null) {
      this.#currentAnimation.webAnimations.forEach((anim) => {
        anim.cancel();
      });
      this.#currentAnimation = null;
    }
    this.#value = value;
    flush(this);
  }

  stopAnimation() {
    const currentAnimation = this.#currentAnimation;
    if (currentAnimation != null) {
      const duration = currentAnimation.animatedAnimation.getDuration();
      const elapsedTime = currentAnimation.webAnimations[0]?.currentTime;
      if (elapsedTime != null) {
        // TODO: actually get the interpolated resulting value instead of one
        // clamped to a keyframe
        const timeline = currentAnimation.animatedAnimation.getTimeline();
        const timelineIndex = Math.max(
          Math.ceil((elapsedTime / duration) * timeline.length) - 1,
          0
        );
        const newValue = timeline[timelineIndex];
        this.setValue(newValue != null ? newValue : this.#value);
      } else {
        currentAnimation.webAnimations.forEach((anim) => {
          anim.cancel();
        });
        this.#currentAnimation = null;
      }
    }
  }

  resetAnimation() {
    if (this.#currentAnimation != null) {
      this.setValue(this.#startingValue);
    }
  }

  animate(animation: AnimatedAnimation, callback?: EndCallback): void {
    this.stopAnimation();

    const { config, keyframeMap } = animation.generate(
      this.#value,
      this.__updateValue
    );

    const currentAnimations = Array.from(keyframeMap.entries())
      .map(([domElement, keyframes]) => {
        if (keyframes.length < 2) {
          return null;
        }
        return domElement.animate(keyframes, { ...config });
      })
      .filter(Boolean);

    this.#currentAnimation = {
      animatedAnimation: animation,
      webAnimations: currentAnimations
    };

    const animPromise = Promise.all(
      currentAnimations.map((anim) => {
        if (anim.finished != null) {
          return anim.finished;
        }
        return new Promise((resolve, reject) => {
          anim.onfinish = resolve;
          anim.oncancel = reject;
        });
      })
    );

    animPromise
      .then(() => {
        // animation finished
        this.#currentAnimation = null;
        if (callback != null) {
          callback({ finished: true });
        }
      })
      .catch(() => {
        // animation cancelled
        if (callback != null) {
          callback({ finished: false });
        }
      });

    flush(this);
  }

  __updateValue = (value: number, keyframeMap: KeyframeMap) => {
    this.#value = value;
    flushToKeyframeMap(this, keyframeMap);
  };
}
