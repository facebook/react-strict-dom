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
  MutableCustomProperties
} from './customProperties';
import type { IStyleX } from '../../types/styles';
import type { SpreadOptions } from './SpreadOptions';

import { CSSLengthUnitValue } from './CSSLengthUnitValue';
import { CSSMediaQuery } from './CSSMediaQuery';
import { errorMsg, warnMsg } from '../../shared/errorMsg';
import { fixContentBox } from './fixContentBox';
import { flattenStyle } from './flattenStyleXStyles';
import { parseShadow } from './parseShadow';
import { parseTimeValue } from './parseTimeValue';
import {
  resolveVariableReferences,
  stringContainsVariables
} from './customProperties';
import { CSSUnparsedValue } from './typed-om/CSSUnparsedValue';

const stylePropertyAllowlistSet = new Set<string>([
  'alignContent',
  'alignItems',
  'alignSelf',
  'animationDelay',
  'animationDuration',
  'aspectRatio',
  'backfaceVisibility',
  'backgroundColor',
  'borderBottomColor',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomStyle',
  'borderBottomWidth',
  'borderColor',
  'borderLeftColor',
  'borderLeftStyle',
  'borderLeftWidth',
  'borderRadius',
  'borderRightColor',
  'borderRightStyle',
  'borderRightWidth',
  'borderStyle',
  'borderTopColor',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopStyle',
  'borderTopWidth',
  'borderWidth',
  'bottom',
  'boxSizing',
  'color',
  'direction',
  'display',
  'end',
  'flex',
  'flexBasis',
  'flexDirection',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'fontVariant',
  'gap',
  'gapColumn',
  'gapRow',
  'height',
  // 'includeFontPadding', Android Only
  'justifyContent',
  'left',
  'letterSpacing',
  'lineHeight',
  'margin',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'objectFit',
  'opacity',
  'overflow',
  'padding',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'pointerEvents',
  'position',
  'resizeMode',
  'right',
  'shadowColor',
  'shadowOffset',
  'shadowOpacity',
  'shadowRadius',
  'shadowWidth',
  'start',
  'textAlign',
  'textDecorationLine',
  'textDecorationColor', // iOS Only
  'textDecorationStyle', // iOS Only
  'textShadowColor',
  'textShadowOffset',
  'textShadowRadius',
  'textTransform',
  'tintColor',
  'transform',
  'transformOrigin',
  'transitionDelay',
  'transitionDuration',
  'top',
  'userSelect',
  'verticalAlign', // Android Only
  'width',
  // 'writingDirection', // iOS Only
  'zIndex'

  // DESKTOP: no built-in support for logical properties.
  // Comment out all the logical properties so they can be converted to fallbacks
  // and legacy non-standard properties.
  //'blockSize',
  //'inlineSize',
  //'maxBlockSize',
  //'minBlockSize',
  //'maxInlineSize',
  //'minInlineSize',
  //'borderBlockColor',
  //'borderBlockStyle',
  //'borderBlockWidth',
  //'borderBlockEndColor',
  //'borderBlockEndStyle',
  //'borderBlockEndWidth',
  //'borderBlockStartColor',
  //'borderBlockStartStyle',
  //'borderBlockStartWidth',
  //'borderInlineColor',
  //'borderInlineStyle',
  //'borderInlineWidth',
  //'borderInlineEndColor',
  //'borderInlineEndStyle',
  //'borderInlineEndWidth',
  //'borderInlineStartColor',
  //'borderInlineStartStyle',
  //'borderInlineStartWidth',
  //'borderEndEndRadius',
  //'borderEndStartRadius',
  //'borderStartEndRadius',
  //'borderStartStartRadius',
  //'inset',
  //'insetBlock',
  //'insetBlockEnd',
  //'insetBlockStart',
  //'insetInline',
  //'insetInlineEnd',
  //'insetInlineStart',
  //'marginBlock',
  //'marginBlockEnd',
  //'marginBlockStart',
  //'marginInline',
  //'marginInlineEnd',
  //'marginInlineStart',
  //'paddingBlock',
  //'paddingBlockEnd',
  //'paddingBlockStart',
  //'paddingInline',
  //'paddingInlineEnd',
  //'paddingInlineStart',
]);

function isReactNativeStyleProp(propName: string): boolean {
  return stylePropertyAllowlistSet.has(propName) || propName.startsWith('--');
}

function isReactNativeStyleValue(propValue: mixed): boolean {
  if (typeof propValue === 'string') {
    // RN doesn't have an inherit keyword
    if (propValue === 'inherit') {
      return false;
    }
    // RN doesn't have an inherit keyword
    if (propValue === 'initial') {
      return false;
    }
    //if (propValue.endsWith('em')) {
    //  return false;
    //}
    //if (propValue.endsWith('rem')) {
    //  return false;
    //}
    // RN on android doesn't like explicitly specified px units
    if (propValue.endsWith('px')) {
      return false;
    }
    // RN doesn't support calc functions
    if (propValue.includes('calc(')) {
      return false;
    }
  }

  return true;
}

function processStyle<S: { +[string]: mixed }>(style: S): S {
  const result = { ...style };

  const propNames = Object.keys(result);
  for (let i = 0; i < propNames.length; i++) {
    const propName = propNames[i];
    let styleValue = result[propName];

    // Polyfill unitless lineHeight
    // React Native treats unitless as a 'px' value
    // Web treats unitless as an 'em' value
    if (propName === 'lineHeight') {
      if (
        typeof styleValue === 'number' ||
        (typeof styleValue === 'string' &&
          CSSLengthUnitValue.parse(styleValue) == null)
      ) {
        styleValue = styleValue + 'em';
      }
    }

    // React Native shadows on iOS cannot polyfill box-shadow
    if (propName === 'boxShadow' && typeof styleValue === 'string') {
      warnMsg('"boxShadow" is not supported in React Native.');
      delete result.boxShadow;
      continue;
    }

    if (
      CSSMediaQuery.isMediaQueryString(propName) &&
      typeof styleValue === 'object' &&
      styleValue != null
    ) {
      const processedSubstyle = processStyle(styleValue);
      result[propName] = new CSSMediaQuery(propName, processedSubstyle);
      continue;
    }

    if (
      typeof styleValue === 'object' &&
      styleValue != null &&
      Object.hasOwn(styleValue, 'default')
    ) {
      // TODO: customize processStyle to be able to override the candidate "prop name"
      result[propName] = processStyle(styleValue);
      continue;
    }

    if (typeof styleValue === 'string') {
      if (stringContainsVariables(styleValue)) {
        result[propName] = CSSUnparsedValue.parse(propName, styleValue);
        continue;
      }

      // React Native only supports non-standard text-shadow styles
      if (propName === 'textShadow') {
        const parsedShadow = parseShadow(styleValue);
        if (parsedShadow.length > 1) {
          warnMsg(
            'Multiple "textShadow" values are not supported in React Native.'
          );
        }
        const { offsetX, offsetY, blurRadius, color } = parsedShadow[0];
        result.textShadowColor = color;
        result.textShadowOffset = processStyle({
          height: offsetY,
          width: offsetX
        });
        result.textShadowRadius = blurRadius;
        propNames.push('textShadowColor', 'textShadowRadius');
        delete result.textShadow;
        continue;
      }

      const maybeLengthUnitValue = CSSLengthUnitValue.parse(styleValue);
      if (maybeLengthUnitValue != null) {
        result[propName] =
          maybeLengthUnitValue[1] === 'px'
            ? maybeLengthUnitValue[0]
            : new CSSLengthUnitValue(...maybeLengthUnitValue);
        continue;
      }
    }

    result[propName] = styleValue;
  }

  return result;
}

function resolveStyle<S: { +[string]: mixed }>(
  style: S,
  options: SpreadOptions
): S {
  const customProperties = options.customProperties || {};
  const result: { [string]: mixed } = {};
  const stylesToReprocess: { [string]: mixed } = {};
  const propNames = Object.keys(style);

  for (let i = 0; i < propNames.length; i++) {
    const propName = propNames[i];
    const styleValue = style[propName];

    // Resolve the stylex media variant value object syntax
    if (
      typeof styleValue === 'object' &&
      styleValue != null &&
      Object.hasOwn(styleValue, 'default')
    ) {
      let variant = 'default';
      if (options.hover === true && Object.hasOwn(styleValue, ':hover')) {
        variant = ':hover';
      }
      // TODO: resolve media queries

      stylesToReprocess[propName] = styleValue[variant];
      continue;
    }

    // resolve custom property references
    if (styleValue instanceof CSSUnparsedValue) {
      const resolvedValue = resolveVariableReferences(
        propName,
        styleValue,
        customProperties
      );
      if (resolvedValue != null) {
        stylesToReprocess[propName] = resolvedValue;
      }
      continue;
    }

    // resolve length units
    if (styleValue instanceof CSSLengthUnitValue) {
      result[propName] = styleValue.resolvePixelValue(options);
      continue;
    }

    // resolve textShadowOffset nested object values
    if (
      propName === 'textShadowOffset' &&
      typeof styleValue === 'object' &&
      styleValue != null
    ) {
      result[propName] = resolveStyle(styleValue, options);
    }

    result[propName] = styleValue;
  }

  const propNamesToReprocess = Object.keys(stylesToReprocess);
  if (propNamesToReprocess.length > 0) {
    const processedStyles = processStyle(stylesToReprocess);
    Object.assign(result, resolveStyle(processedStyles, options));
  }

  return result as $FlowIssue;
}

/**
 * The create method shim should do initial transforms like
 * renaming/expanding/validating properties, essentially all the steps
 * which can be done at initialization-time (could potentially be done at
 * compile-time in the future).
 */
function _create<S: { [string]: { ... } }>(styles: S): {
  [string]: { ... }
} {
  const result: { [string]: { ... } } = {};
  for (const styleName in styles) {
    const val = styles[styleName];
    if (typeof val === 'function') {
      result[styleName] = (...args: $FlowFixMe) => {
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
  errorMsg('css.keyframes is not supported in React Native.');
  return k;
}
export const keyframes: (Keyframes) => string = _keyframes as $FlowFixMe;

const timeValuedProperties = [
  'animationDelay',
  'animationDuration',
  'transitionDelay',
  'transitionDuration'
];

/**
 * The spread method shim
 */

export function props(
  this: SpreadOptions,
  ...style: $ReadOnlyArray<?{ [key: string]: mixed }>
): {
  style?: { [string]: string | number },
  ...
} {
  const options = this;
  /* eslint-disable prefer-const */
  let { lineClamp, ...flatStyle }: { [key: string]: mixed } =
    flattenStyle(style);
  let prevStyle = { ...flatStyle };
  /* eslint-enable prefer-const */

  const {
    passthroughProperties = [],
    viewportHeight,
    viewportWidth,
    writingDirection
  } = options;
  const nativeProps: { [string]: $FlowFixMe } = {};

  flatStyle = CSSMediaQuery.resolveMediaQueries(flatStyle, {
    width: viewportWidth,
    height: viewportHeight,
    direction: writingDirection ?? 'ltr'
  });

  flatStyle = resolveStyle(flatStyle, options);

  for (const styleProp in flatStyle) {
    const styleValue = flatStyle[styleProp];

    // Filter out any unexpected style property names so RN doesn't crash but give
    // the developer a warning to let them know that there's a new prop we should either
    // explicitly ignore or process in some way.
    // NOTE: Any kind of prop name transformations should happen before this check.
    if (
      !isReactNativeStyleProp(styleProp) &&
      passthroughProperties.indexOf(styleProp) === -1
    ) {
      // block/inlineSize
      if (styleProp === 'blockSize') {
        flatStyle.height = flatStyle.height ?? styleValue;
      } else if (styleProp === 'inlineSize') {
        flatStyle.width = flatStyle.width ?? styleValue;
      } else if (styleProp === 'maxBlockSize') {
        flatStyle.maxHeight = flatStyle.maxHeight ?? styleValue;
      } else if (styleProp === 'minBlockSize') {
        flatStyle.minHeight = flatStyle.minHeight ?? styleValue;
      } else if (styleProp === 'maxInlineSize') {
        flatStyle.maxWidth = flatStyle.maxWidth ?? styleValue;
      } else if (styleProp === 'minInlineSize') {
        flatStyle.minWidth = flatStyle.minWidth ?? styleValue;
      }
      // borderBlock
      else if (styleProp === 'borderBlockColor') {
        flatStyle.borderTopColor = flatStyle.borderTopColor ?? styleValue;
        flatStyle.borderBottomColor = flatStyle.borderBottomColor ?? styleValue;
      } else if (styleProp === 'borderBlockStyle') {
        flatStyle.borderTopStyle = flatStyle.borderTopStyle ?? styleValue;
        flatStyle.borderBottomStyle = flatStyle.borderBottomStyle ?? styleValue;
      } else if (styleProp === 'borderBlockWidth') {
        flatStyle.borderTopWidth = flatStyle.borderTopWidth ?? styleValue;
        flatStyle.borderBottomWidth = flatStyle.borderBottomWidth ?? styleValue;
      } else if (styleProp === 'borderBlockEndColor') {
        flatStyle.borderBottomColor = prevStyle.borderBottomColor ?? styleValue;
      } else if (styleProp === 'borderBlockEndStyle') {
        flatStyle.borderBottomStyle = prevStyle.borderBottomStyle ?? styleValue;
      } else if (styleProp === 'borderBlockEndWidth') {
        flatStyle.borderBottomWidth = prevStyle.borderBottomWidth ?? styleValue;
      } else if (styleProp === 'borderBlockStartColor') {
        flatStyle.borderTopColor = prevStyle.borderTopColor ?? styleValue;
      } else if (styleProp === 'borderBlockStartStyle') {
        flatStyle.borderTopStyle = prevStyle.borderTopStyle ?? styleValue;
      } else if (styleProp === 'borderBlockStartWidth') {
        flatStyle.borderTopWidth = prevStyle.borderTopWidth ?? styleValue;
      }
      // borderInline
      else if (styleProp === 'borderInlineColor') {
        flatStyle.borderStartColor = flatStyle.borderStartColor ?? styleValue;
        flatStyle.borderEndColor = flatStyle.borderEndColor ?? styleValue;
      } else if (styleProp === 'borderInlineStyle') {
        flatStyle.borderStartStyle = flatStyle.borderStartStyle ?? styleValue;
        flatStyle.borderEndStyle = flatStyle.borderEndStyle ?? styleValue;
      } else if (styleProp === 'borderInlineWidth') {
        flatStyle.borderStartWidth = flatStyle.borderStartWidth ?? styleValue;
        flatStyle.borderEndWidth = flatStyle.borderEndWidth ?? styleValue;
      } else if (styleProp === 'borderInlineEndColor') {
        flatStyle.borderEndColor = styleValue;
      } else if (styleProp === 'borderInlineEndStyle') {
        flatStyle.borderEndStyle = styleValue;
      } else if (styleProp === 'borderInlineEndWidth') {
        flatStyle.borderEndWidth = styleValue;
      } else if (styleProp === 'borderInlineStartColor') {
        flatStyle.borderStartColor = styleValue;
      } else if (styleProp === 'borderInlineStartStyle') {
        flatStyle.borderStartStyle = styleValue;
      } else if (styleProp === 'borderInlineStartWidth') {
        flatStyle.borderStartWidth = styleValue;
      }
      // borderRadius
      else if (styleProp === 'borderStartStartRadius') {
        flatStyle.borderTopStartRadius = styleValue;
      } else if (styleProp === 'borderEndStartRadius') {
        flatStyle.borderBottomStartRadius = styleValue;
      } else if (styleProp === 'borderStartEndRadius') {
        flatStyle.borderTopEndRadius = styleValue;
      } else if (styleProp === 'borderEndEndRadius') {
        flatStyle.borderBottomEndRadius = styleValue;
      }
      // inset
      else if (styleProp === 'inset') {
        flatStyle.top = flatStyle.top ?? styleValue;
        flatStyle.start = flatStyle.start ?? styleValue;
        flatStyle.end = flatStyle.end ?? styleValue;
        flatStyle.bottom = flatStyle.bottom ?? styleValue;
      } else if (styleProp === 'insetBlock') {
        flatStyle.top = flatStyle.top ?? styleValue;
        flatStyle.bottom = flatStyle.bottom ?? styleValue;
      } else if (styleProp === 'insetBlockEnd') {
        flatStyle.bottom = prevStyle.bottom ?? styleValue;
      } else if (styleProp === 'insetBlockStart') {
        flatStyle.top = prevStyle.top ?? styleValue;
      } else if (styleProp === 'insetInline') {
        flatStyle.end = flatStyle.end ?? styleValue;
        flatStyle.start = flatStyle.start ?? styleValue;
      } else if (styleProp === 'insetInlineEnd') {
        flatStyle.end = prevStyle.end ?? styleValue;
      } else if (styleProp === 'insetInlineStart') {
        flatStyle.start = prevStyle.start ?? styleValue;
      }
      // marginBlock
      else if (styleProp === 'marginBlock') {
        flatStyle.marginVertical = styleValue;
      } else if (styleProp === 'marginBlockStart') {
        flatStyle.marginTop = flatStyle.marginTop ?? styleValue;
      } else if (styleProp === 'marginBlockEnd') {
        flatStyle.marginBottom = flatStyle.marginBottom ?? styleValue;
      }
      // marginInline
      else if (styleProp === 'marginInline') {
        flatStyle.marginHorizontal = styleValue;
      } else if (styleProp === 'marginInlineStart') {
        flatStyle.marginStart = styleValue;
      } else if (styleProp === 'marginInlineEnd') {
        flatStyle.marginEnd = styleValue;
      }
      // paddingBlock
      else if (styleProp === 'paddingBlock') {
        flatStyle.paddingVertical = styleValue;
      } else if (styleProp === 'paddingBlockStart') {
        flatStyle.paddingTop = flatStyle.paddingTop ?? styleValue;
      } else if (styleProp === 'paddingBlockEnd') {
        flatStyle.paddingBottom = flatStyle.paddingBottom ?? styleValue;
      }
      // paddingInline
      else if (styleProp === 'paddingInline') {
        flatStyle.paddingHorizontal = styleValue;
      } else if (styleProp === 'paddingInlineStart') {
        flatStyle.paddingStart = styleValue;
      } else if (styleProp === 'paddingInlineEnd') {
        flatStyle.paddingEnd = styleValue;
      }
      // visibility polyfill
      // note: we can't polyfill nested visibility changes
      else if (styleProp === 'visibility') {
        if (styleValue === 'hidden' || styleValue === 'collapse') {
          flatStyle.opacity = 0;
          nativeProps['aria-hidden'] = true;
          nativeProps.pointerEvents = 'none';
          nativeProps.tabIndex = -1;
        }
      }
      // everything else
      else {
        warnMsg(`Ignoring unsupported style property "${styleProp}"`);
      }

      delete flatStyle[styleProp];
      continue;
    }

    // Similar filter to the prop name one above but instead operates on the property's
    // value. Similarly, any sort of prop value transformations should happen before this
    // filter.
    // We check this at resolve time to ensure the render-time styles are safe.
    if (!isReactNativeStyleValue(styleValue)) {
      warnMsg(
        `Ignoring unsupported style value "${String(
          styleValue
        )}" for property "${styleProp}"`
      );
      delete flatStyle[styleProp];
      continue;
    }

    flatStyle[styleProp] = styleValue;
  }

  if (flatStyle != null && Object.keys(flatStyle).length > 0) {
    // polyfill boxSizing:"content-box"
    const boxSizingValue = flatStyle.boxSizing;
    if (boxSizingValue === 'content-box') {
      flatStyle = fixContentBox(flatStyle);
    }
    delete flatStyle.boxSizing;

    // polyfill borderStyle:"none" behavior
    if (flatStyle.borderStyle === 'none') {
      flatStyle.borderWidth = 0;
      delete flatStyle.borderStyle;
    }

    // polyfill numeric fontWeight (for desktop)
    if (typeof flatStyle.fontWeight === 'number') {
      flatStyle.fontWeight = flatStyle.fontWeight.toString();
    }

    // workaround unsupported objectFit values
    if (flatStyle.objectFit === 'none') {
      flatStyle.objectFit = 'scale-down';
    }

    // workaround unsupported position values
    const positionValue = flatStyle.position;
    if (positionValue === 'fixed') {
      flatStyle.position = 'absolute';
      warnMsg(
        '"position" value of "fixed" is not supported in React Native. Falling back to "absolute".'
      );
    } else if (positionValue === 'sticky') {
      flatStyle.position = 'relative';
      warnMsg(
        '"position" value of "sticky" is not supported in React Native. Falling back to "relative".'
      );
    }

    for (const timeValuedProperty of timeValuedProperties) {
      if (typeof flatStyle[timeValuedProperty] === 'string') {
        flatStyle[timeValuedProperty] = parseTimeValue(
          flatStyle[timeValuedProperty]
        );
      }
    }

    // $FlowFixMe
    nativeProps.style = flatStyle;
  }

  if (lineClamp != null) {
    // $FlowFixMe
    nativeProps.numberOfLines = lineClamp;
  }

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
    const varName: string = baseTokens[key] as $FlowFixMe;
    const normalizedKey = varName.replace(/^var\(--(.*)\)$/, '$1');
    result[normalizedKey] = overrides[key];
  }
  return result;
};
