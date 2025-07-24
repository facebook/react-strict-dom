/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { ReactNativeTransform } from '../../types/renderer.native';

export class CSSTransformValue {
  value: $ReadOnlyArray<ReactNativeTransform>;
  cachedScaledTransform: void | {
    viewportScale: number,
    value: $ReadOnlyArray<ReactNativeTransform>
  };

  constructor(value: $ReadOnlyArray<ReactNativeTransform>) {
    this.value = value;
  }

  resolveTransformValue(
    viewportScale: number
  ): $ReadOnlyArray<ReactNativeTransform> {
    if (viewportScale === 1) {
      return this.value;
    }
    if (
      this.cachedScaledTransform != null &&
      this.cachedScaledTransform.viewportScale === viewportScale
    ) {
      return this.cachedScaledTransform.value;
    }

    const scaledTransform = this.value.map((transform) => {
      if (
        transform.translateX != null &&
        typeof transform.translateX === 'number'
      ) {
        return { translateX: transform.translateX * viewportScale };
      }
      if (
        transform.translateY != null &&
        typeof transform.translateY === 'number'
      ) {
        return { translateY: transform.translateY * viewportScale };
      }
      return transform;
    });

    this.cachedScaledTransform = {
      viewportScale,
      value: scaledTransform
    };

    return scaledTransform;
  }
}
