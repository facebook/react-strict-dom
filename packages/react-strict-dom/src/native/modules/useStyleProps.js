/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { CustomProperties, Styles } from '../../types/styles';
import type { Props as ReactNativeProps } from '../../types/react-native';

import { PixelRatio, useColorScheme, useWindowDimensions } from 'react-native';
import * as stylex from '../stylex';
import { useHoverHandlers } from './useHoverHandlers';
import { useStyleTransition } from './useStyleTransition';

type StyleOptions = {
  customProperties: ?CustomProperties,
  inheritedFontSize: ?number
};

const emptyObject = {};

export function useStyleProps(
  style: Styles,
  options: StyleOptions
): ReactNativeProps {
  const { customProperties, inheritedFontSize } = options;

  const { height, width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const fontScale = PixelRatio.getFontScale();

  const { hover, handlers } = useHoverHandlers(style);

  // Marking it as `any` as Flow slows to a crawl when trying to type this.
  // But we already know that `style` is the correct type so this is still safe.
  const styleProps = stylex.props.call(
    {
      colorScheme,
      customProperties: customProperties ?? emptyObject,
      fontScale,
      hover,
      inheritedFontSize,
      viewportHeight: height,
      viewportWidth: width
    },
    style as $FlowFixMe
  );

  if (handlers.type === 'HOVERABLE') {
    for (const handler of [
      'onMouseEnter',
      'onMouseLeave',
      'onPointerEnter',
      'onPointerLeave'
    ]) {
      styleProps[handler] = handlers[handler];
    }
  }

  const styleWithAnimations = useStyleTransition(styleProps.style);
  if (styleProps.style !== styleWithAnimations) {
    // This is an internal prop used to track components that need Animated renderers
    styleProps.animated = true;
    styleProps.style = styleWithAnimations;
  }

  return styleProps;
}
