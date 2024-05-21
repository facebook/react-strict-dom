/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { Styles } from '../../types/styles';

import * as React from 'react';
import { typeof Animated, PixelRatio, useWindowDimensions } from 'react-native';
import { FontSizeContext } from './FontSizeContext';
import * as stylex from '../stylex';

type StyleOptions = {
  customProperties: ?$ReadOnly<{ [string]: string | number }>,
  hover: boolean,
  inheritedCustomProperties: ?$ReadOnly<{ [string]: string | number }>
};

const passthroughProperties = [
  'transitionDelay',
  'transitionDuration',
  'transitionProperty',
  'transitionTimingFunction'
];

const emptyObject = {};

export function useStyleProps(
  style: Styles,
  options: StyleOptions
): $ReadOnly<{
  style?: $ReadOnly<{
    [key: string]: string | number | Animated['Value']
  }>,
  ...
}> {
  const { height, width } = useWindowDimensions();
  const inheritedFontSize = React.useContext(FontSizeContext);
  const fontScale = PixelRatio.getFontScale();
  const { customProperties, inheritedCustomProperties, hover } = options;

  // Marking it as `any` as Flow slows to a crawl when trying to type this.
  // But we already know that `style` is the correct type so this is still safe.
  const styleProps = stylex.props.call(
    {
      customProperties: customProperties ?? emptyObject,
      fontScale,
      hover,
      inheritedCustomProperties: inheritedCustomProperties ?? emptyObject,
      inheritedFontSize,
      passthroughProperties,
      viewportHeight: height,
      viewportWidth: width
    },
    style as $FlowFixMe
  );

  return styleProps;
}
