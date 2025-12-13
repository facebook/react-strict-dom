/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

'use strict';

import type { AnimatedTransformValue } from '../../shared/SharedAnimatedTypes';
import type { AnimatedNodeType } from '../types/AnimatedTypes';

import AnimatedNode from './AnimatedNode';
import AnimatedWithChildren from './AnimatedWithChildren';

const UNIT: $ReadOnly<{
  rotate: string,
  rotateX: string,
  rotateY: string,
  rotateZ: string,
  scale: string,
  scaleX: string,
  scaleY: string,
  skewX: string,
  skewY: string,
  translate: string,
  translateX: string,
  translateY: string,
  perspective: string
}> = {
  perspective: 'px',
  rotate: 'deg',
  rotateX: 'deg',
  rotateY: 'deg',
  rotateZ: 'deg',
  scale: '',
  scaleX: '',
  scaleY: '',
  skewX: 'deg',
  skewY: 'deg',
  translate: 'px',
  translateX: 'px',
  translateY: 'px'
};

function mapTransform(t: AnimatedTransformValue<AnimatedNodeType>): string {
  const key = Object.keys(t)[0];
  // $FlowFixMe[prop-missing] - this is type safe as the key using to access object was literally just extracted from the object
  let value = t[key];
  if (value instanceof AnimatedNode) {
    value = value.__getAnimatedValue();
  }
  if (typeof value === 'number') {
    return `${key}(${value}${UNIT[key]})`;
  } else if (typeof value === 'string') {
    return `${key}(${value})`;
  }
  throw new Error('value is neither a number or string');
}

type TransformsArray = $ReadOnlyArray<AnimatedTransformValue<AnimatedNodeType>>;

export default class AnimatedTransform extends AnimatedWithChildren<string> {
  #transforms: TransformsArray;

  constructor(transforms: TransformsArray) {
    super();
    this.#transforms = transforms;
  }

  __getValue(): string {
    return this.#transforms.reduce((tformString, tformObj) => {
      return tformString + mapTransform(tformObj);
    }, '');
  }

  __attach(): void {
    for (const transform of this.#transforms) {
      for (const key of Object.keys(transform)) {
        // $FlowFixMe[prop-missing] - this is type safe as the key using to access object was literally just extracted from the object
        const value = transform[key];
        if (value instanceof AnimatedWithChildren) {
          value.__addChild(this);
        }
      }
    }
  }

  __detach(): void {
    for (const transform of this.#transforms) {
      for (const key of Object.keys(transform)) {
        // $FlowFixMe[prop-missing] - this is type safe as the key using to access object was literally just extracted from the object
        const value = transform[key];
        if (value instanceof AnimatedWithChildren) {
          value.__removeChild(this);
        }
      }
    }
  }
}
