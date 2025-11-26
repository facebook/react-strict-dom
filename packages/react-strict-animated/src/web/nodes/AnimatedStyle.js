/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { AnimatedStyleValue } from '../../shared/SharedAnimatedTypes';
import type { KeyframeMap } from '../animations/Animation';
import type { AnimatedNodeType } from '../types/AnimatedTypes';

import AnimatedNode from './AnimatedNode';
import AnimatedTransform from './AnimatedTransform';
import AnimatedWithChildren from './AnimatedWithChildren';

type ElementGetter = () => ?HTMLElement;
type Flusher = () => void;

type OutputAnimatedStyle = {
  opacity?: string,
  transform?: string
};

export type ReadOnlyOutputAnimatedStyle = $ReadOnly<OutputAnimatedStyle>;

export default class AnimatedStyleNode extends AnimatedNode<ReadOnlyOutputAnimatedStyle> {
  #style: $ReadOnly<{
    ...Omit<AnimatedStyleValue<AnimatedNodeType>, 'transform'>,
    transform?: AnimatedTransform
  }>;
  #elementGetter: ElementGetter;
  #flush: Flusher;

  constructor(
    style: AnimatedStyleValue<AnimatedNodeType>,
    elementGetter: ElementGetter,
    flusher: Flusher
  ) {
    super();
    this.#elementGetter = elementGetter;
    this.#flush = flusher;
    this.#style = {
      opacity: style.opacity,
      transform:
        style.transform != null
          ? new AnimatedTransform(style.transform)
          : undefined
    };
  }

  __getValue(): ReadOnlyOutputAnimatedStyle {
    const outputStyle: OutputAnimatedStyle = {};
    for (const key of Object.keys(this.#style)) {
      const value = this.#style[key];
      if (value instanceof AnimatedNode) {
        outputStyle[key] = value.__getValue();
      } else if (typeof value === 'number') {
        // TODO: currently works because we're only taking opacity into account
        // but will have to set units if we expand usage
        outputStyle[key] = `${value}`;
      } else if (typeof value === 'string') {
        outputStyle[key] = value;
      }
    }
    return outputStyle;
  }

  __getAnimatedValue(): ReadOnlyOutputAnimatedStyle {
    const outputStyle: OutputAnimatedStyle = {};
    for (const key of Object.keys(this.#style)) {
      const value = this.#style[key];
      if (value instanceof AnimatedNode) {
        outputStyle[key] = value.__getAnimatedValue();
      }
    }
    return outputStyle;
  }

  __attach(): void {
    for (const key of Object.keys(this.#style)) {
      const value = this.#style[key];
      if (value instanceof AnimatedWithChildren) {
        value.__addChild(this);
      }
    }
  }

  __detach(): void {
    for (const key of Object.keys(this.#style)) {
      const value = this.#style[key];
      if (value instanceof AnimatedWithChildren) {
        value.__removeChild(this);
      }
    }
  }

  flush() {
    this.#flush();
  }

  update(keyframeMap: KeyframeMap) {
    const domElement = this.#elementGetter();
    if (domElement != null) {
      const keyframes = keyframeMap.get(domElement);
      if (keyframes != null) {
        keyframes.push({ ...this.__getAnimatedValue() });
      } else {
        keyframeMap.set(domElement, [{ ...this.__getAnimatedValue() }]);
      }
    }
  }
}
