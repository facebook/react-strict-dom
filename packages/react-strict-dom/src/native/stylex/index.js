/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type {
  CustomProperties,
  MutableCustomProperties,
  IStyleX
} from '../../types/styles';

import type {
  Props as ReactNativeProps,
  Style as ReactNativeStyle
} from '../../types/react-native';

import { CSSLengthUnitValue } from './CSSLengthUnitValue';
import { errorMsg, warnMsg } from '../../shared/logUtils';
import { fixContentBox } from './fixContentBox';
import { flattenStyle } from './flattenStyleXStyles';
import { isAllowedShortFormValue } from './isAllowedShortFormValue';
import { isAllowedStyleKey } from './isAllowedStyleKey';
import { mediaQueryMatches } from './mediaQueryMatches';
import { parseTextShadow } from './parseTextShadow';
import { parseTimeValue } from './parseTimeValue';
import { parseTransform } from './parseTransform';
import {
  resolveVariableReferences,
  stringContainsVariables
} from './customProperties';
import { CSSUnparsedValue } from './typed-om/CSSUnparsedValue';

type ResolveStyleOptions = $ReadOnly<{
  active?: ?boolean,
  colorScheme: ?('light' | 'dark'),
  customProperties: CustomProperties,
  focus?: ?boolean,
  fontScale: number | void,
  hover?: ?boolean,
  inheritedFontSize: ?number,
  viewportHeight: number,
  viewportWidth: number,
  writingDirection?: ?'ltr' | 'rtl'
}>;

const validPlaceContentValues = new Set<string>([
  'center',
  'flex-end',
  'flex-start',
  // distributed alignment
  'space-around',
  'space-between',
  'space-evenly'
]);

/**
 * Pre-process 'create'
 */

function processStyle(
  style: { +[string]: mixed },
  skipValidation?: boolean
): { +[string]: mixed } {
  const result: { [string]: mixed } = {};

  for (const propName in style) {
    const styleValue = style[propName];

    if (skipValidation !== true && !isAllowedStyleKey(propName)) {
      if (__DEV__) {
        warnMsg(`unsupported style property "${propName}"`);
      }
      continue;
    }

    // Object values
    else if (typeof styleValue === 'object' && styleValue != null) {
      if (propName === '::placeholder') {
        const placeholderStyleProps = Object.keys(styleValue);
        for (let i = 0; i < placeholderStyleProps.length; i++) {
          const prop = placeholderStyleProps[i];
          if (prop === 'color') {
            result['placeholderTextColor'] = processStyle({
              color: styleValue.color
            }).color;
          } else {
            if (__DEV__) {
              warnMsg(`unsupported "::placeholder" style property "${prop}"`);
            }
          }
        }
        continue;
      } else if (Object.hasOwn(styleValue, 'default')) {
        result[propName] = processStyle(styleValue);
        continue;
      }
    }

    // String values
    else if (typeof styleValue === 'string') {
      // Polyfill support for string '0' on Android
      if (styleValue === '0') {
        result[propName] = 0;
        continue;
      }
      // Polyfill support for custom property references (do this first)
      else if (stringContainsVariables(styleValue)) {
        result[propName] = CSSUnparsedValue.parse(propName, styleValue);
        continue;
      } else if (
        propName === 'caretColor' &&
        (typeof styleValue === 'undefined' || styleValue === 'auto')
      ) {
        if (__DEV__) {
          warnMsg(
            `unsupported style value in "${propName}:${String(styleValue)}"`
          );
        }
        continue;
      }
      // Workaround unsupported objectFit values
      else if (propName === 'objectFit' && styleValue === 'none') {
        result[propName] = 'scale-down';
        continue;
      }
      // Polyfill placeContent
      else if (propName === 'placeContent') {
        // None of these values are supported in RN for both properties.
        if (!validPlaceContentValues.has(styleValue)) {
          if (__DEV__) {
            warnMsg(
              `unsupported style value in "${propName}:${String(styleValue)}"`
            );
          }
          continue;
        }
      }
      // Workaround unsupported position values
      else if (
        propName === 'position' &&
        (styleValue === 'fixed' || styleValue === 'sticky')
      ) {
        const fallback = styleValue === 'fixed' ? 'absolute' : 'relative';
        if (__DEV__) {
          warnMsg(
            `unsupported style value in "position:${styleValue}". Falling back to "position:${fallback}".`
          );
        }
        result[propName] = fallback;
        continue;
      }
      // Polyfill textShadow
      else if (propName === 'textShadow') {
        result[propName] = parseTextShadow(styleValue);
        continue;
      }
      // Polyfill transform as string value
      else if (propName === 'transform') {
        result[propName] = parseTransform(styleValue);
        continue;
      }
      // Polyfill time-valued string values (e.g., '1000ms' => 1000)
      else if (
        propName === 'animationDelay' ||
        propName === 'animationDuration' ||
        propName === 'transitionDelay' ||
        propName === 'transitionDuration'
      ) {
        result[propName] = parseTimeValue(styleValue);
        continue;
      }

      const maybeLengthUnitValue = CSSLengthUnitValue.parse(styleValue);
      if (maybeLengthUnitValue != null) {
        result[propName] = new CSSLengthUnitValue(...maybeLengthUnitValue);
        continue;
        // React Native doesn't support these keywords or functions
      } else if (
        styleValue === 'currentcolor' ||
        styleValue === 'inherit' ||
        styleValue === 'initial' ||
        styleValue === 'unset' ||
        styleValue.includes('calc(')
      ) {
        if (__DEV__) {
          warnMsg(
            `unsupported style value in "${propName}:${String(styleValue)}"`
          );
        }
        continue;
      } else if (!isAllowedShortFormValue(propName, styleValue)) {
        if (__DEV__) {
          errorMsg(
            `invalid style value in "${propName}:${String(styleValue)}". Shortform properties cannot contain multiple values. Please use longform properties.`
          );
        }
        continue;
      }
    }

    // Number values
    else if (typeof styleValue === 'number') {
      // Polyfill numeric fontWeight (for desktop)
      if (propName === 'fontWeight') {
        result[propName] = styleValue.toString();
        continue;
      }
      // Normalize unitless lineHeight to string
      if (propName === 'lineHeight') {
        result[propName] = styleValue.toString();
        continue;
      }
    }

    // Everything else
    result[propName] = styleValue;
  }

  return result;
}

/**
 * Resolve 'props'
 */
const mqDark = '@media (prefers-color-scheme: dark)';

function resolveStyle(
  style: $ReadOnlyArray<?{ +[string]: mixed }> | { +[string]: mixed },
  options: ResolveStyleOptions
): { +[string]: mixed } {
  const {
    active,
    focus,
    fontScale,
    hover,
    inheritedFontSize,
    viewportHeight,
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
      const fontSize = flatStyle.fontSize;
      // If fontSize is being resolved, or there is no fontSize for this style,
      // we use the inherited fontSize.
      if (propName === 'fontSize' || fontSize == null) {
        result[propName] = styleValue.resolvePixelValue({
          fontScale,
          inheritedFontSize: inheritedFontSize,
          viewportHeight,
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
            viewportWidth
          });
        } else {
          stylesToReprocess[propName] = styleValue;
        }
        continue;
      }
    }

    // Resolve the stylex object-value syntax
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
      // TODO: decide how StyleX should handle multiple MQs.
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
    const resolvedFontSize = result.fontSize;
    const fontSizeStyle =
      resolvedFontSize != null ? { fontSize: resolvedFontSize } : null;
    const resolvedStyles = resolveStyle(
      [fontSizeStyle, processedStyles],
      options
    );
    Object.assign(result, resolvedStyles);
  }

  return result;
}

/**
 * The create method shim should do initial transforms like
 * renaming/expanding/validating properties, essentially all the steps
 * which can be done at initialization-time (could potentially be done at
 * compile-time in the future).
 */
function _create<S: { +[string]: { +[string]: mixed } }>(styles: S): {
  [string]: mixed
} {
  const result: { [string]: mixed } = {};
  for (const styleName in styles) {
    const val = styles[styleName];
    if (typeof val === 'function') {
      result[styleName] = (...args: ?(string | number)) => {
        const style = val(...args);
        return processStyle(style);
      };
    } else {
      result[styleName] = processStyle(styles[styleName]);
    }
  }
  return result;
}
export const create: IStyleX['create'] = _create as $FlowFixMe;

export const firstThatWorks = <T: string | number>(
  ...values: $ReadOnlyArray<T>
): T => {
  return values[0];
};

type Keyframes = {
  +[key: string]: { +[k: string]: string | number }
};

function _keyframes(k: Keyframes): Keyframes {
  if (__DEV__) {
    errorMsg('css.keyframes() is not supported.');
  }
  return k;
}
export const keyframes: (Keyframes) => string = _keyframes as $FlowFixMe;

/**
 * The spread method shim
 */

export function props(
  this: ResolveStyleOptions,
  ...style: $ReadOnlyArray<?{ [key: string]: mixed }>
): ReactNativeProps {
  const options = this;

  const nativeProps: ReactNativeProps = { style: {} };
  let nextStyle: ReactNativeStyle = nativeProps.style;

  const flatStyle = resolveStyle(style, options) as $FlowFixMe;

  for (const styleProp in flatStyle) {
    const styleValue = flatStyle[styleProp];

    // block/inlineSize
    if (styleProp === 'blockSize') {
      nextStyle.height = nextStyle.height ?? styleValue;
    } else if (styleProp === 'inlineSize') {
      nextStyle.width = nextStyle.width ?? styleValue;
    } else if (styleProp === 'maxBlockSize') {
      nextStyle.maxHeight = nextStyle.maxHeight ?? styleValue;
    } else if (styleProp === 'minBlockSize') {
      nextStyle.minHeight = nextStyle.minHeight ?? styleValue;
    } else if (styleProp === 'maxInlineSize') {
      nextStyle.maxWidth = nextStyle.maxWidth ?? styleValue;
    } else if (styleProp === 'minInlineSize') {
      nextStyle.minWidth = nextStyle.minWidth ?? styleValue;
    }
    // borderBlock
    else if (styleProp === 'borderBlockColor') {
      nextStyle.borderTopColor = nextStyle.borderTopColor ?? styleValue;
      nextStyle.borderBottomColor = nextStyle.borderBottomColor ?? styleValue;
    } else if (styleProp === 'borderBlockStyle') {
      nextStyle.borderTopStyle = nextStyle.borderTopStyle ?? styleValue;
      nextStyle.borderBottomStyle = nextStyle.borderBottomStyle ?? styleValue;
    } else if (styleProp === 'borderBlockWidth') {
      nextStyle.borderTopWidth = nextStyle.borderTopWidth ?? styleValue;
      nextStyle.borderBottomWidth = nextStyle.borderBottomWidth ?? styleValue;
    } else if (styleProp === 'borderBlockEndColor') {
      nextStyle.borderBottomColor = flatStyle.borderBottomColor ?? styleValue;
    } else if (styleProp === 'borderBlockEndStyle') {
      nextStyle.borderBottomStyle = flatStyle.borderBottomStyle ?? styleValue;
    } else if (styleProp === 'borderBlockEndWidth') {
      nextStyle.borderBottomWidth = flatStyle.borderBottomWidth ?? styleValue;
    } else if (styleProp === 'borderBlockStartColor') {
      nextStyle.borderTopColor = flatStyle.borderTopColor ?? styleValue;
    } else if (styleProp === 'borderBlockStartStyle') {
      nextStyle.borderTopStyle = flatStyle.borderTopStyle ?? styleValue;
    } else if (styleProp === 'borderBlockStartWidth') {
      nextStyle.borderTopWidth = flatStyle.borderTopWidth ?? styleValue;
    }
    // borderInline
    else if (styleProp === 'borderInlineColor') {
      nextStyle.borderStartColor = nextStyle.borderStartColor ?? styleValue;
      nextStyle.borderEndColor = nextStyle.borderEndColor ?? styleValue;
    } else if (styleProp === 'borderInlineStyle') {
      nextStyle.borderStartStyle = nextStyle.borderStartStyle ?? styleValue;
      nextStyle.borderEndStyle = nextStyle.borderEndStyle ?? styleValue;
    } else if (styleProp === 'borderInlineWidth') {
      nextStyle.borderStartWidth = nextStyle.borderStartWidth ?? styleValue;
      nextStyle.borderEndWidth = nextStyle.borderEndWidth ?? styleValue;
    } else if (styleProp === 'borderInlineEndColor') {
      nextStyle.borderEndColor = styleValue;
    } else if (styleProp === 'borderInlineEndStyle') {
      nextStyle.borderEndStyle = styleValue;
    } else if (styleProp === 'borderInlineEndWidth') {
      nextStyle.borderEndWidth = styleValue;
    } else if (styleProp === 'borderInlineStartColor') {
      nextStyle.borderStartColor = styleValue;
    } else if (styleProp === 'borderInlineStartStyle') {
      nextStyle.borderStartStyle = styleValue;
    } else if (styleProp === 'borderInlineStartWidth') {
      nextStyle.borderStartWidth = styleValue;
    }
    // borderRadius
    else if (styleProp === 'borderStartStartRadius') {
      nextStyle.borderTopStartRadius = styleValue;
    } else if (styleProp === 'borderEndStartRadius') {
      nextStyle.borderBottomStartRadius = styleValue;
    } else if (styleProp === 'borderStartEndRadius') {
      nextStyle.borderTopEndRadius = styleValue;
    } else if (styleProp === 'borderEndEndRadius') {
      nextStyle.borderBottomEndRadius = styleValue;
    }
    // borderStyle:"none" polyfill
    else if (styleProp === 'borderStyle' && styleValue === 'none') {
      nextStyle.borderWidth = 0;
    } else if (styleProp === 'borderWidth') {
      nextStyle.borderWidth = nextStyle.borderWidth ?? styleValue;
    }
    // caretColor polyfill
    else if (styleProp === 'caretColor') {
      if (styleValue === 'transparent') {
        nativeProps.caretHidden = true;
      } else {
        nativeProps.cursorColor = styleValue;
      }
    }
    // inset
    else if (styleProp === 'inset') {
      nextStyle.top = nextStyle.top ?? styleValue;
      nextStyle.start = nextStyle.start ?? styleValue;
      nextStyle.end = nextStyle.end ?? styleValue;
      nextStyle.bottom = nextStyle.bottom ?? styleValue;
    } else if (styleProp === 'insetBlock') {
      nextStyle.top = nextStyle.top ?? styleValue;
      nextStyle.bottom = nextStyle.bottom ?? styleValue;
    } else if (styleProp === 'insetBlockEnd') {
      nextStyle.bottom = flatStyle.bottom ?? styleValue;
    } else if (styleProp === 'insetBlockStart') {
      nextStyle.top = flatStyle.top ?? styleValue;
    } else if (styleProp === 'insetInline') {
      nextStyle.end = nextStyle.end ?? styleValue;
      nextStyle.start = nextStyle.start ?? styleValue;
    } else if (styleProp === 'insetInlineEnd') {
      nextStyle.end = flatStyle.end ?? styleValue;
    } else if (styleProp === 'insetInlineStart') {
      nextStyle.start = flatStyle.start ?? styleValue;
    }
    // lineClamp polyfill
    else if (styleProp === 'lineClamp') {
      nativeProps.numberOfLines = styleValue;
    }
    // marginBlock
    else if (styleProp === 'marginBlock') {
      nextStyle.marginVertical = styleValue;
    } else if (styleProp === 'marginBlockStart') {
      nextStyle.marginTop = nextStyle.marginTop ?? styleValue;
    } else if (styleProp === 'marginBlockEnd') {
      nextStyle.marginBottom = nextStyle.marginBottom ?? styleValue;
    }
    // marginInline
    else if (styleProp === 'marginInline') {
      nextStyle.marginHorizontal = styleValue;
    } else if (styleProp === 'marginInlineStart') {
      nextStyle.marginStart = styleValue;
    } else if (styleProp === 'marginInlineEnd') {
      nextStyle.marginEnd = styleValue;
    }
    // paddingBlock
    else if (styleProp === 'paddingBlock') {
      nextStyle.paddingVertical = styleValue;
    } else if (styleProp === 'paddingBlockStart') {
      nextStyle.paddingTop = nextStyle.paddingTop ?? styleValue;
    } else if (styleProp === 'paddingBlockEnd') {
      nextStyle.paddingBottom = nextStyle.paddingBottom ?? styleValue;
    }
    // paddingInline
    else if (styleProp === 'paddingInline') {
      nextStyle.paddingHorizontal = styleValue;
    } else if (styleProp === 'paddingInlineStart') {
      nextStyle.paddingStart = styleValue;
    } else if (styleProp === 'paddingInlineEnd') {
      nextStyle.paddingEnd = styleValue;
    }
    // '::placeholder' polyfill
    else if (styleProp === 'placeholderTextColor') {
      nativeProps.placeholderTextColor = styleValue;
    }
    // visibility polyfill
    // Note: we can't polyfill nested visibility changes
    else if (styleProp === 'visibility') {
      if (styleValue === 'hidden' || styleValue === 'collapse') {
        nextStyle.opacity = 0;
        nativeProps.accessibilityElementsHidden = true;
        nativeProps.importantForAccessibility = 'no-hide-descendants';
        nativeProps.focusable = false;
        nativeProps.pointerEvents = 'none';
      }
    }
    // placeContent polyfill
    else if (styleProp === 'placeContent') {
      nextStyle.alignContent = nextStyle.alignContent ?? styleValue;
      nextStyle.justifyContent = nextStyle.justifyContent ?? styleValue;
    }
    // experimental styles
    else if (styleProp === 'boxShadow') {
      nextStyle.experimental_boxShadow = styleValue;
    } else if (styleProp === 'filter') {
      nextStyle.experimental_filter = styleValue;
    } else if (styleProp === 'mixBlendMode') {
      nextStyle.experimental_mixBlendMode = styleValue;
    }
    // Everything else
    else {
      nextStyle[styleProp] = styleValue;
    }
  }

  // boxSizing:"content-box" polyfill
  const boxSizingValue = nextStyle.boxSizing;
  if (boxSizingValue === 'content-box') {
    nextStyle = fixContentBox(nextStyle);
  }
  nativeProps.style = nextStyle;

  return nativeProps;
}

type Tokens = { [string]: string };
let count = 1;

export const __customProperties: MutableCustomProperties = {};

export const defineVars = (tokens: CustomProperties): Tokens => {
  const result: Tokens = {};
  for (const key in tokens) {
    const value = tokens[key];
    const customPropName = `${key}__id__${count++}`;
    result[key] = `var(--${customPropName})`;
    // NOTE: it's generally not a good idea to mutate the default context,
    // but defineVars is always called before any component body is evaluated,
    // and so it's safe to do so here.
    __customProperties[customPropName] = value;
  }
  return result;
};

export const createTheme = (
  baseTokens: Tokens,
  overrides: CustomProperties
): CustomProperties => {
  const result: MutableCustomProperties = { $$theme: 'theme' };
  for (const key in baseTokens) {
    const varName: string = baseTokens[key];
    const normalizedKey = varName.replace(/^var\(--(.*)\)$/, '$1');
    result[normalizedKey] = overrides[key];
  }
  return result;
};
