/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { CustomProperties, Styles, Style } from '../../types/styles';
import type { Props as ReactNativeProps } from '../../types/react-native';
import type { Style as ReactNativeStyle } from '../../types/react-native';

import * as stylex from '../stylex';
import { PixelRatio, useColorScheme, useWindowDimensions } from 'react-native';
import { flattenStyle } from './flattenStyle';
import { useInheritedStyles } from './ContextInheritedStyles';
import { usePseudoStates } from './usePseudoStates';
import { useStyleTransition } from './useStyleTransition';

type StyleOptions = {
  customProperties: ?CustomProperties,
  provideInheritableStyle: boolean,
  withTextStyle: boolean,
  withInheritedStyle: boolean,
  writingDirection?: ?('auto' | 'ltr' | 'rtl')
};

const emptyObject = {};

/**
 * Unitless lineHeight acts as a fontSize multiplier. It is only fully resolved
 * at the point at which an element is being styled, so that inherited values
 * remain correct rather than being prematurely resolved to pixel values.
 * Note: this mutates the input.
 */
function resolveUnitlessLineHeight(style: ReactNativeStyle): ReactNativeStyle {
  if (typeof style?.lineHeight === 'string') {
    const fontSize = typeof style?.fontSize === 'number' ? style.fontSize : 16;
    style.lineHeight = parseFloat(style.lineHeight) * fontSize;
  }
  return style;
}

/**
 * Produces the relevant React Native props to implement the given styles, and any
 * inheritable text styles that may be required.
 */
export function useStyleProps(
  style: Styles,
  options: StyleOptions
): {
  nativeProps: ReactNativeProps,
  inheritableStyle: ?Style
} {
  const {
    customProperties,
    provideInheritableStyle,
    withTextStyle,
    withInheritedStyle,
    writingDirection: dir
  } = options;

  const { height, width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const fontScale = PixelRatio.getFontScale();

  const inheritedStyles = useInheritedStyles();
  const inheritedFontSize =
    typeof inheritedStyles?.fontSize === 'number'
      ? inheritedStyles?.fontSize
      : undefined;

  const renderStyle = flattenStyle([
    withInheritedStyle === true && inheritedStyles,
    dir != null && dir !== 'auto' && { direction: dir },
    dir != null && { writingDirection: dir },
    style
  ]);

  const { active, focus, hover, handlers } = usePseudoStates(renderStyle);

  const styleProps = stylex.props.call(
    {
      active,
      colorScheme,
      customProperties: customProperties ?? emptyObject,
      focus,
      fontScale,
      hover,
      inheritedFontSize,
      viewportHeight: height,
      viewportWidth: width
    },
    renderStyle as $FlowFixMe
  );

  if (handlers != null) {
    for (const handler of [
      'onBlur',
      'onFocus',
      'onMouseEnter',
      'onMouseLeave',
      'onPointerCancel',
      'onPointerDown',
      'onPointerEnter',
      'onPointerLeave',
      'onPointerUp'
    ]) {
      if (handler != null) {
        styleProps[handler] = handlers[handler];
      }
    }
  }

  // Polyfill CSS transitions
  const styleWithAnimations = useStyleTransition(styleProps.style);
  if (styleProps.style !== styleWithAnimations) {
    // This is an internal prop used to track components that need Animated renderers
    styleProps.animated = true;
    styleProps.style = styleWithAnimations;
  }

  // Extract text properties for CSS inheritance polyfill
  const {
    color,
    cursor,
    fontFamily,
    fontSize,
    fontStyle,
    fontVariant,
    fontWeight,
    letterSpacing,
    lineHeight, // eslint-disable-line no-unused-vars
    textAlign,
    textIndent,
    textTransform,
    whiteSpace,
    writingDirection,
    ...viewStyle
  } = styleProps.style;

  const inheritableStyle = {} as $FlowFixMe;
  if (color != null) {
    inheritableStyle.color = color;
  }
  if (cursor != null) {
    inheritableStyle.cursor = cursor;
  }
  if (fontFamily != null) {
    inheritableStyle.fontFamily = fontFamily;
  }
  if (fontSize != null) {
    inheritableStyle.fontSize = fontSize;
  }
  if (fontStyle != null) {
    inheritableStyle.fontStyle = fontStyle;
  }
  if (fontVariant != null) {
    inheritableStyle.fontVariant = fontVariant;
  }
  if (fontWeight != null) {
    inheritableStyle.fontWeight = fontWeight;
  }
  if (letterSpacing != null) {
    inheritableStyle.letterSpacing = letterSpacing;
  }
  if (lineHeight != null) {
    inheritableStyle.lineHeight = lineHeight;
  }
  if (textAlign != null) {
    inheritableStyle.textAlign = textAlign;
  }
  if (textIndent != null) {
    inheritableStyle.textIndent = textIndent;
  }
  if (textTransform != null) {
    inheritableStyle.textTransform = textTransform;
  }
  if (whiteSpace != null) {
    inheritableStyle.whiteSpace = whiteSpace;
  }
  if (writingDirection != null) {
    inheritableStyle.writingDirection = writingDirection;
  }

  if (withTextStyle === true) {
    styleProps.style = Object.assign(
      viewStyle,
      resolveUnitlessLineHeight(
        provideInheritableStyle === true
          ? { ...inheritableStyle }
          : inheritableStyle
      )
    );
  } else {
    styleProps.style = viewStyle;
  }

  if (
    styleProps.style != null &&
    typeof styleProps.style === 'object' &&
    Object.keys(styleProps.style).length === 0
  ) {
    // $FlowFixMe (safe to remove style at this point)
    delete styleProps.style;
  }

  return {
    nativeProps: styleProps,
    inheritableStyle: provideInheritableStyle === true ? inheritableStyle : null
  };
}
