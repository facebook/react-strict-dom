/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { ParsedShadow } from './parseShadow';

import { parseShadow } from './parseShadow';
import { warnMsg } from '../../shared/logUtils';

type ReactNativeTextShadowProps = $ReadOnly<{
  textShadowColor: string | null,
  textShadowOffset: {
    height: number | string,
    width: number | string
  },
  textShadowRadius: number | string
}>;

export class CSSTextShadow {
  static parse(str: string): Array<ParsedShadow> {
    return parseShadow(str);
  }

  value: ReactNativeTextShadowProps;

  constructor(value: string) {
    const parsedShadow = CSSTextShadow.parse(value);
    if (__DEV__) {
      if (parsedShadow.length > 1) {
        warnMsg('unsupported multiple values for style property "textShadow".');
      }
    }
    const shadow = parsedShadow[0];
    if (shadow != null) {
      const { offsetX, offsetY, blurRadius, color } = shadow;
      const textShadowProps = {
        textShadowColor: color,
        textShadowOffset: {
          height: offsetY,
          width: offsetX
        },
        textShadowRadius: blurRadius
      };
      this.value = textShadowProps;
    }
  }

  resolve(): ReactNativeTextShadowProps {
    return this.value;
  }
}
