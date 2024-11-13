/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { CustomProperties, Styles, Style } from '../../types/styles';
import type {
  ReactNativeProps,
  ReactNativeStyle
} from '../../types/renderer.native';

import * as stylex from '../stylex';
import { useColorScheme, useWindowDimensions } from 'react-native';
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

  const { fontScale, height, width } = useWindowDimensions();
  const colorScheme = useColorScheme();

  // These values are already computed
  const {
    color: inheritedColor,
    cursor: inheritedCursor,
    fontFamily: inheritedFontFamily,
    fontSize: inheritedFontSize,
    fontStyle: inheritedFontStyle,
    fontVariant: inheritedFontVariant,
    fontWeight: inheritedFontWeight,
    letterSpacing: inheritedLetterSpacing,
    lineHeight: inheritedLineHeight,
    textAlign: inheritedTextAlign,
    textDecorationColor: inheritedTextDecorationColor,
    textDecorationLine: inheritedTextDecorationLine,
    textDecorationStyle: inheritedTextDecorationStyle,
    textIndent: inheritedTextIndent,
    textTransform: inheritedTextTransform,
    whiteSpace: inheritedWhiteSpace,
    writingDirection: inheritedWritingDirection
  } = useInheritedStyles();

  const flatStyle = flattenStyle(style);

  const { active, focus, hover, handlers } = usePseudoStates(flatStyle);

  // Get the computed style props
  const styleProps = stylex.props.call(
    {
      active,
      colorScheme,
      customProperties: customProperties ?? emptyObject,
      focus,
      fontScale,
      hover,
      inheritedFontSize:
        typeof inheritedFontSize === 'number' ? inheritedFontSize : undefined,
      viewportHeight: height,
      viewportWidth: width
    },
    flatStyle as $FlowFixMe
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

  // Polyfill 'dir'
  if (dir != null) {
    if (dir !== 'auto' && styleProps.style.direction == null) {
      styleProps.style.direction = dir;
    }
    styleProps.style.writingDirection = dir;
  }

  // Polyfill CSS transitions
  const styleWithAnimations = useStyleTransition(styleProps.style);
  if (styleProps.style !== styleWithAnimations) {
    // This is an internal prop used to track components that need Animated renderers
    styleProps.animated = true;
    styleProps.style = styleWithAnimations;
  }

  const {
    color,
    cursor,
    fontFamily,
    fontSize,
    fontStyle,
    fontVariant,
    fontWeight,
    letterSpacing,
    lineHeight,
    textAlign,
    textDecorationColor,
    textDecorationLine,
    textDecorationStyle,
    textIndent,
    textTransform,
    whiteSpace,
    writingDirection,
    ...viewStyle
  } = styleProps.style;

  const inheritableStyle = {} as $FlowFixMe;

  [
    ['color', color, inheritedColor],
    ['cursor', cursor, inheritedCursor],
    ['fontFamily', fontFamily, inheritedFontFamily],
    ['fontSize', fontSize, inheritedFontSize],
    ['fontStyle', fontStyle, inheritedFontStyle],
    ['fontVariant', fontVariant, inheritedFontVariant],
    ['fontWeight', fontWeight, inheritedFontWeight],
    ['letterSpacing', letterSpacing, inheritedLetterSpacing],
    ['lineHeight', lineHeight, inheritedLineHeight],
    ['textAlign', textAlign, inheritedTextAlign],
    ['textDecorationColor', textDecorationColor, inheritedTextDecorationColor],
    ['textDecorationLine', textDecorationLine, inheritedTextDecorationLine],
    ['textDecorationStyle', textDecorationStyle, inheritedTextDecorationStyle],
    ['textIndent', textIndent, inheritedTextIndent],
    ['textTransform', textTransform, inheritedTextTransform],
    ['whiteSpace', whiteSpace, inheritedWhiteSpace],
    ['writingDirection', writingDirection, inheritedWritingDirection]
  ].forEach(([key, value, inheritedValue]) => {
    let val = value;
    if (
      (withInheritedStyle && value == null) ||
      value === 'inherit' ||
      value === 'unset'
    ) {
      val = inheritedValue;
    }
    if (val != null) {
      inheritableStyle[key] = val;
      styleProps.style[key] = val;
    }
  });

  if (withTextStyle === true) {
    const textStyle =
      provideInheritableStyle === true
        ? { ...inheritableStyle }
        : inheritableStyle;

    styleProps.style = Object.assign(
      viewStyle,
      resolveUnitlessLineHeight(textStyle)
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
