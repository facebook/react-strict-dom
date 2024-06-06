/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import { typeof Animated } from 'react-native';
import type { Styles } from '../../types/styles';

import { PixelRatio, useWindowDimensions } from 'react-native';
import * as stylex from '../stylex';
import { useCustomProperties } from './ContextCustomProperties';
import { useInheritedStyles } from './ContextInheritedStyles';

type StyleOptions = {
  customProperties: ?$ReadOnly<{ [string]: string | number }>,
  hover: boolean
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
  const { customProperties, hover } = options;

  const { height, width } = useWindowDimensions();
  const fontScale = PixelRatio.getFontScale();
  const inheritedCustomProperties = useCustomProperties();
  const inheritedFontSize = useInheritedStyles()?.fontSize;

  // Marking it as `any` as Flow slows to a crawl when trying to type this.
  // But we already know that `style` is the correct type so this is still safe.
  const styleProps = stylex.props.call(
    {
      customProperties: customProperties ?? emptyObject,
      fontScale,
      hover,
      inheritedCustomProperties: inheritedCustomProperties ?? emptyObject,
      // $FlowFixMe
      inheritedFontSize,
      passthroughProperties,
      viewportHeight: height,
      viewportWidth: width
    },
    style as $FlowFixMe
  );

  return styleProps;
}
