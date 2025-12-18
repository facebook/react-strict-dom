/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type AnimatedNode from './AnimatedNode';

import AnimatedStyle from './AnimatedStyle';
import AnimatedWithChildren from './AnimatedWithChildren';

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

export default class AnimatedValue extends AnimatedWithChildren<number> {
  #value: number;
  #startingValue: number;

  constructor(startingValue: number) {
    super();
    this.#value = startingValue;
    this.#startingValue = startingValue;
  }

  __getValue(): number {
    return this.#value;
  }

  /**
   * Set the internal value without triggering a flush.
   * Used by the animation driver when building keyframes.
   */
  __setValueInternal(value: number): void {
    this.#value = value;
  }

  /**
   * Directly set the value. This will update all the bound properties.
   */
  setValue(value: number): void {
    this.#value = value;
    flush(this);
  }

  /**
   * Reset value to the starting value.
   */
  resetValue(): void {
    this.setValue(this.#startingValue);
  }
}
