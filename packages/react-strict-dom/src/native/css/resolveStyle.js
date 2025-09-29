/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { CustomProperties } from '../../types/styles';

import { CSSLengthUnitValue } from './CSSLengthUnitValue';
import { CSSTransformValue } from './CSSTransformValue';
import { CSSUnparsedValue } from './typed-om/CSSUnparsedValue';
import { flattenStyle } from './flattenStyleXStyles';
import { lengthStyleKeySet } from './isLengthStyleKey';
import { mediaQueryMatches } from './mediaQueryMatches';
import { processStyle } from './processStyle';
import { resolveVariableReferences } from './customProperties';

import { __customProperties } from './index';

export type ResolveStyleOptions = $ReadOnly<{
  active?: ?boolean,
  colorScheme: ?('light' | 'dark'),
  customProperties: CustomProperties,
  focus?: ?boolean,
  fontScale: number | void,
  fontSize?: ?number,
  hover?: ?boolean,
  inheritedFontSize: ?number,
  viewportHeight: number,
  viewportScale: number | void,
  viewportWidth: number,
  writingDirection?: ?'ltr' | 'rtl'
}>;

/**
 * Resolve 'props'
 */
const mqDark = '@media (prefers-color-scheme: dark)';

export function resolveStyle(
  style: $ReadOnlyArray<?{ +[string]: mixed }> | { +[string]: mixed }, // This should be ProcessedStyle
  options: ResolveStyleOptions
): { +[string]: mixed } /*ReactNativeStyle*/ {
  const {
    active,
    focus,
    fontScale,
    fontSize: _fontSize,
    hover,
    inheritedFontSize,
    viewportHeight,
    viewportScale = 1,
    viewportWidth
  } = options;
  const colorScheme = options.colorScheme || 'light';
  const customProperties = options.customProperties || __customProperties;

  const result: { [string]: mixed } = {};
  const stylesToReprocess: { [string]: mixed } = {};
  const flatStyle = flattenStyle(style);

  for (const propName in flatStyle) {
    const styleValue = flatStyle[propName];

    // Resolve custom property references
    if (styleValue instanceof CSSUnparsedValue) {
      const resolvedValue = resolveVariableReferences(
        propName,
        styleValue,
        customProperties,
        colorScheme
      );
      if (resolvedValue != null) {
        stylesToReprocess[propName] = resolvedValue;
      }
      continue;
    }

    // Resolve length units
    if (styleValue instanceof CSSLengthUnitValue) {
      const fontSize =
        flatStyle.fontSize != null ? flatStyle.fontSize : _fontSize;
      // If fontSize is being resolved, or there is no fontSize for this style,
      // we use the inherited fontSize.
      if (propName === 'fontSize' || fontSize == null) {
        result[propName] = styleValue.resolvePixelValue({
          fontScale,
          inheritedFontSize: inheritedFontSize,
          viewportHeight,
          viewportScale,
          viewportWidth
        });
        continue;
      }
      if (fontSize != null) {
        // If the style contains a fontSize, it must first be resolved and then
        // used as the "inherited" value to resolve other lengths correctly.
        if (typeof fontSize === 'number') {
          result[propName] = styleValue.resolvePixelValue({
            fontScale,
            inheritedFontSize: fontSize,
            viewportHeight,
            viewportScale,
            viewportWidth
          });
        } else {
          stylesToReprocess[propName] = styleValue;
        }
        continue;
      }
    }

    if (styleValue instanceof CSSTransformValue) {
      result[propName] = styleValue.resolveTransformValue(viewportScale);
      continue;
    }
    if (
      viewportScale !== 1 &&
      typeof styleValue === 'number' &&
      lengthStyleKeySet.has(propName)
    ) {
      result[propName] = styleValue * viewportScale;
      continue;
    }

    // Resolve the object-value syntax
    if (
      styleValue != null &&
      typeof styleValue === 'object' &&
      Object.hasOwn(styleValue, 'default')
    ) {
      let activeVariant = 'default';
      if (Object.hasOwn(styleValue, ':hover') && hover === true) {
        activeVariant = ':hover';
      }
      if (Object.hasOwn(styleValue, ':focus') && focus === true) {
        activeVariant = ':focus';
      }
      if (Object.hasOwn(styleValue, ':active') && active === true) {
        activeVariant = ':active';
      }
      if (Object.hasOwn(styleValue, mqDark) && colorScheme === 'dark') {
        activeVariant = mqDark;
      }
      // Just picks the last MQ in order that matches.
      for (const variant in styleValue) {
        if (variant.startsWith('@media') && variant !== mqDark) {
          const matches = mediaQueryMatches(
            variant,
            viewportWidth,
            viewportHeight
          );
          if (matches) {
            activeVariant = variant;
          }
        }
      }
      stylesToReprocess[propName] = styleValue[activeVariant];
      continue;
    }

    // Resolve textShadow
    if (propName === 'textShadow') {
      Object.assign(result, styleValue);
      continue;
    }

    result[propName] = styleValue;
  }

  const propNamesToReprocess = Object.keys(stylesToReprocess);
  if (propNamesToReprocess.length > 0) {
    const processedStyles = processStyle(stylesToReprocess, true);
    // We can end up re-processing values without a fontSize (since it might already be resolved),
    // which generates incorrect 'em'-based values. Passing the fontSize back in avoids this.
    // However, if the fontSize is already a number it could be incorrectly scaled so it must be
    // passed in as an option instead of a style.
    const resolvedFontSize = result.fontSize;
    const fontSizeStyle =
      resolvedFontSize != null && typeof resolvedFontSize !== 'number'
        ? { fontSize: resolvedFontSize }
        : null;
    const nextStyles =
      fontSizeStyle != null
        ? [fontSizeStyle, processedStyles]
        : processedStyles;
    const nextOptions =
      resolvedFontSize != null && typeof resolvedFontSize === 'number'
        ? { ...options, fontSize: resolvedFontSize }
        : options;

    const resolvedStyles = resolveStyle(nextStyles, nextOptions);
    Object.assign(result, resolvedStyles);
  }

  return result;
}
