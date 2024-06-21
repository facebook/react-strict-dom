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

import { PixelRatio, useColorScheme, useWindowDimensions } from 'react-native';
import * as stylex from '../stylex';

type StyleOptions = {
  customProperties: ?$ReadOnly<{ [string]: string | number }>,
  hover: boolean,
  inheritedFontSize: ?number
};

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
  const { customProperties, hover, inheritedFontSize } = options;

  const { height, width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const fontScale = PixelRatio.getFontScale();

  // Marking it as `any` as Flow slows to a crawl when trying to type this.
  // But we already know that `style` is the correct type so this is still safe.
  const styleProps = stylex.props.call(
    {
      colorScheme,
      customProperties: customProperties ?? emptyObject,
      fontScale,
      hover,
      // $FlowFixMe
      inheritedFontSize,
      viewportHeight: height,
      viewportWidth: width
    },
    style as $FlowFixMe
  );

  return styleProps;
}
