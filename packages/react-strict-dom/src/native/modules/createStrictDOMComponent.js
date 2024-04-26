/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { StrictProps } from '../../types/StrictProps';
import type { Style } from '../../types/styles';
import type {
  ChangeEvent,
  EditingEvent,
  ImageLoadEvent,
  KeyPressEvent,
  PressEvent,
  SyntheticEvent,
  TextStyleProp,
  ViewStyleProp
} from '../../types/react-native';

import * as React from 'react';
import { FontSizeContext } from './FontSizeContext';
import { InheritableStyleContext } from './InheritableStyleContext';
import { ThemeContext } from './ThemeContext';
import { flattenStyle } from './flattenStyle';
import { errorMsg, warnMsg } from '../../shared/logUtils';
import { extractStyleThemes } from './extractStyleThemes';
import { isPropAllowed } from '../../shared/isPropAllowed';
import { mergeRefs } from '../../shared/mergeRefs';
import { useHoverHandlers } from './useHoverHandlers';
import { useStrictDOMElement } from './useStrictDOMElement';
import { useStyleProps } from './useStyleProps';
import { useStyleTransition } from './useStyleTransition';
import {
  Animated,
  Image,
  TextInput,
  Text,
  View,
  Pressable
} from 'react-native';
import * as stylex from '../stylex';

type ReactNativeProps = {
  ...StrictProps,
  accessibilityPosInSet?: $FlowFixMe,
  accessibilitySetSize?: $FlowFixMe,
  caretHidden?: ?boolean,
  experimental_layoutConformance?: 'strict',
  multiline?: ?boolean,
  numberOfLines?: ?number,
  onChange?: ?(event: ChangeEvent) => mixed,
  onError?: ?(
    event: SyntheticEvent<
      $ReadOnly<{|
        error: string
      |}>
    >
  ) => void,
  onKeyPress?: ?(event: KeyPressEvent) => mixed,
  onLoad?: ?(event: ImageLoadEvent) => void,
  onPress?: $FlowFixMe,
  onSubmitEditing?: ?(event: EditingEvent) => mixed,
  ref?: $FlowFixMe,
  secureTextEntry?: ?boolean,
  style?: ViewStyleProp | TextStyleProp,
  testID?: ?string
};

const elements = {
  article: View,
  aside: View,
  blockquote: Text,
  br: Text,
  button: Pressable,
  code: Text,
  div: View,
  em: Text,
  fieldset: View,
  footer: View,
  form: View,
  header: View,
  h1: Text,
  h2: Text,
  h3: Text,
  h4: Text,
  h5: Text,
  h6: Text,
  img: Image,
  input: TextInput,
  main: View,
  nav: View,
  ol: View,
  p: Text,
  pre: Text,
  section: View,
  strong: Text,
  sub: Text,
  sup: Text,
  textarea: TextInput,
  ul: View
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const roles = {
  a: 'link',
  header: 'header'
};

const unsupportedProps = new Set([
  'onBeforeInput',
  'onInvalid',
  'onSelect',
  'onSelectionChange'
]);

function isString(str: mixed): boolean %checks {
  return typeof str === 'string';
}

function validateStrictProps(props: $FlowFixMe) {
  Object.keys(props).forEach((key) => {
    const isValidProp = isPropAllowed(key);
    const isUnsupportedProp = unsupportedProps.has(key);
    if (!isValidProp) {
      errorMsg(`invalid prop "${key}"`);
      delete props[key];
    }
    if (isUnsupportedProp) {
      warnMsg(`unsupported prop "${key}"`);
      delete props[key];
    }
  });
}

function isNumber(num: mixed): boolean %checks {
  return typeof num === 'number';
}

function resolveTransitionProperty(property: mixed): string[] {
  if (property === 'all') {
    return ['opacity', 'transform'];
  }
  if (typeof property === 'string') {
    return property.split(',').map((p) => p.trim());
  }
  return [];
}

const DisplayModeInsideContext = React.createContext('flow');

export function createStrictDOMComponent<T, P: StrictProps>(
  tagName: string,
  defaultProps?: P
): React.AbstractComponent<P, T> {
  const component: React.AbstractComponent<P, T> = React.forwardRef(
    function (props, forwardedRef) {
      let nativeComponent =
        elements[tagName] != null ? elements[tagName] : Text;

      const elementRef = useStrictDOMElement<T>({ tagName });

      /**
       * Construct props
       */
      const {
        'aria-posinset': ariaPosInSet,
        'aria-setsize': ariaSetSize,
        children,
        'data-testid': dataTestID,
        dir,
        disabled,
        height,
        hidden,
        href,
        inputMode,
        onChange,
        onClick,
        onError,
        onInput,
        onKeyDown,
        onLoad,
        role,
        type,
        width
      } = props;

      // $FlowFixMe[prop-missing]
      const nativeProps: ReactNativeProps = Object.assign(
        {},
        defaultProps,
        props
      );
      delete nativeProps.suppressHydrationWarning;
      validateStrictProps(nativeProps);

      if (ariaPosInSet != null) {
        nativeProps.accessibilityPosInSet = ariaPosInSet;
      }
      if (ariaSetSize != null) {
        nativeProps.accessibilitySetSize = ariaSetSize;
      }
      const ariaRole = role || roles[tagName];
      if (ariaRole) {
        nativeProps.role = ariaRole;
      }
      if (dataTestID != null) {
        nativeProps.testID = dataTestID;
      }
      if (disabled != null) {
        // don't disabled Text elements
        nativeProps.disabled = nativeComponent !== Text ? disabled : false;
        // polyfill disabled form elements
        if (nativeComponent === TextInput && disabled === true) {
          nativeProps['aria-disabled'] = true;
          nativeProps.readOnly = true;
          nativeProps.tabIndex = -1;
        }
      }
      if (href != null && tagName === 'a') {
        nativeProps.onPress = function (e) {
          errorMsg('<a> "href" handling is not implemented in React Native.');
        };
      }
      if (tagName === 'br') {
        nativeProps.children = '\n';
      }
      if (tagName === 'input') {
        let _inputMode = inputMode;
        if (type === 'email') {
          _inputMode = 'email';
        }
        if (type === 'search') {
          _inputMode = 'search';
        }
        if (type === 'tel') {
          _inputMode = 'tel';
        }
        if (type === 'url') {
          _inputMode = 'url';
        }
        if (type === 'number') {
          _inputMode = 'numeric';
        }
        if (_inputMode != null) {
          nativeProps.inputMode = _inputMode;
        }
        if (type === 'password') {
          nativeProps.secureTextEntry = true;
        }
        if (type === 'checkbox' || type === 'date' || type === 'radio') {
          errorMsg(
            `<input type="${type}" /> is not implemented in React Native.`
          );
        }
      }
      if (tagName === 'textarea') {
        nativeProps.multiline = true;
      }
      if (tagName === 'input' || tagName === 'textarea') {
        if (onChange != null || onInput != null) {
          nativeProps.onChange = function (e) {
            const { text } = e.nativeEvent;
            if (onInput != null) {
              onInput({
                target: {
                  value: text
                },
                type: 'input'
              });
            }
            if (onChange != null) {
              onChange({
                target: {
                  value: text
                },
                type: 'change'
              });
            }
          };
        }
        if (onKeyDown != null) {
          nativeProps.onKeyPress = function (e) {
            const { key } = e.nativeEvent;
            // Filter out bad iOS keypress data on submit
            if (
              key === 'Backspace' ||
              (tagName === 'textarea' && key === 'Enter') ||
              key.length === 1
            ) {
              onKeyDown({
                key,
                type: 'keydown'
              });
            }
          };
          nativeProps.onSubmitEditing = function (e) {
            onKeyDown({
              key: 'Enter',
              type: 'keydown'
            });
          };
        }
      }

      if (tagName === 'img') {
        if (onError != null) {
          nativeProps.onError = function () {
            onError({
              type: 'error'
            });
          };
        }
        if (onLoad != null) {
          nativeProps.onLoad = function (e) {
            const { source } = e.nativeEvent;
            onLoad({
              target: {
                naturalHeight: source?.height,
                naturalWidth: source?.width
              },
              type: 'load'
            });
          };
        }
      }

      // TODO: remove once PointerEvent onClick is available
      if (onClick != null) {
        // Text has onPress, View doesn't
        if (nativeComponent === View) {
          nativeComponent = Pressable;
        }
        nativeProps.onPress = ({ nativeEvent }: PressEvent): void => {
          const event: mixed = nativeEvent;
          let altKey = false;
          let ctrlKey = false;
          let metaKey = false;
          let shiftKey = false;
          let button = 0;
          if (event != null) {
            if (typeof event.altKey === 'boolean') {
              altKey = event.altKey;
            }
            if (typeof event.ctrlKey === 'boolean') {
              ctrlKey = event.ctrlKey;
            }
            if (typeof event.metaKey === 'boolean') {
              metaKey = event.metaKey;
            }
            if (typeof event.shiftKey === 'boolean') {
              shiftKey = event.shiftKey;
            }
            if (typeof event.button === 'number') {
              button = event.button;
            }
          }
          const getModifierState = (key: string): boolean => {
            switch (key) {
              case 'Alt':
                return altKey;
              case 'Control':
                return ctrlKey;
              case 'Meta':
                return metaKey;
              case 'Shift':
                return shiftKey;
              default:
                return false;
            }
          };
          onClick({
            altKey,
            button,
            ctrlKey,
            getModifierState,
            metaKey,
            pageX: nativeEvent.pageX,
            pageY: nativeEvent.pageY,
            preventDefault() {},
            shiftKey,
            stopPropagation() {},
            type: 'click'
          });
        };
      }

      nativeProps.ref = React.useMemo(
        () => mergeRefs(elementRef, forwardedRef),
        [elementRef, forwardedRef]
      );

      /**
       * Resolve the style props
       */
      const inheritedStyles: ?Style = React.useContext(InheritableStyleContext);
      const [extractedStyles, customPropertiesFromThemes] = extractStyleThemes(
        props.style
      );
      const {
        color,
        cursor,
        fontFamily,
        fontSize,
        fontStyle,
        fontVariant,
        fontWeight,
        letterSpace,
        lineHeight,
        textAlign,
        textIndent,
        textTransform,
        whiteSpace,
        ...nonTextStyles
      } = flattenStyle(extractedStyles) || {};

      const textStyles: { ...Style } = {};
      if (color != null) {
        textStyles.color = color;
      }
      if (cursor != null) {
        textStyles.cursor = cursor;
      }
      if (fontFamily != null) {
        textStyles.fontFamily = fontFamily;
      }
      if (fontSize != null) {
        textStyles.fontSize = fontSize;
      }
      if (fontStyle != null) {
        textStyles.fontStyle = fontStyle;
      }
      if (fontVariant != null) {
        textStyles.fontVariant = fontVariant;
      }
      if (fontWeight != null) {
        textStyles.fontWeight = fontWeight;
      }
      if (letterSpace != null) {
        textStyles.letterSpace = letterSpace;
      }
      if (lineHeight != null) {
        textStyles.lineHeight = lineHeight;
      }
      if (textAlign != null) {
        textStyles.textAlign = textAlign;
      }
      if (textIndent != null) {
        textStyles.textIndent = textIndent;
      }
      if (textTransform != null) {
        textStyles.textTransform = textTransform;
      }
      if (whiteSpace != null) {
        textStyles.whiteSpace = whiteSpace;
      }

      const renderStyles = [
        defaultProps?.style ?? null,
        // Use 'static' position by default where allowed
        styles.positionStatic,
        // Use box-sizing: 'content-box' by default
        styles.contentBox,
        // Add default img styles
        tagName === 'img'
          ? [
              styles.objectFitFill,
              height != null &&
                width != null &&
                styles.aspectRatio(width, height)
            ]
          : null,
        dir != null && styles.direction(dir),
        // Add default text styles
        nativeComponent === Text && styles.userSelectAuto,
        // Provided styles
        nativeComponent === Text || nativeComponent === TextInput
          ? [inheritedStyles, extractedStyles]
          : [nonTextStyles]
      ];
      const { hover, handlers } = useHoverHandlers(renderStyles);

      if (handlers.type === 'HOVERABLE') {
        for (const handler of [
          'onMouseEnter',
          'onMouseLeave',
          'onPointerEnter',
          'onPointerLeave'
        ]) {
          if (nativeProps[handler] != null) {
            const nativeHandler = nativeProps[handler];
            nativeProps[handler] = (e) => {
              handlers[handler]();
              return nativeHandler(e);
            };
          } else {
            nativeProps[handler] = handlers[handler];
          }
        }
      }
      const _styleProps = useStyleProps(renderStyles, {
        customProperties: customPropertiesFromThemes,
        hover
      });

      // Mark `styleProps` as writable so we can mutate it
      const styleProps: {
        style: { [string]: string | number | (typeof Animated)['Value'] },
        [string]: mixed
      } = {
        ..._styleProps,
        style: { ..._styleProps.style }
      };

      if (
        isString(children) &&
        nativeComponent !== Text &&
        nativeComponent !== TextInput &&
        nativeComponent !== Image
      ) {
        let s = {};
        const p: {
          style?: ?TextStyleProp
        } = {};
        if (
          inheritedStyles != null &&
          typeof inheritedStyles === 'object' &&
          Object.keys(inheritedStyles).length > 0
        ) {
          s = inheritedStyles;
        }
        if (
          textStyles != null &&
          typeof textStyles === 'object' &&
          Object.keys(textStyles).length > 0
        ) {
          s = { ...s, ...textStyles };
        }
        if (Object.keys(s).length > 0) {
          p.style = s;
        }
        nativeProps.children = <Text {...p}>{children}</Text>;
      }

      // polyfill for display:block-as-default
      let nextDisplayModeInside = 'flow';
      const displayModeInside = React.useContext(DisplayModeInsideContext);
      const displayValue = styleProps.style.display;
      if (
        displayValue != null &&
        displayValue !== 'flex' &&
        displayValue !== 'none' &&
        displayValue !== 'block'
      ) {
        warnMsg(`unsupported style value in "display:${String(displayValue)}"`);
      }

      if (displayValue === 'flex') {
        nextDisplayModeInside = 'flex';
        styleProps.style.alignItems ??= 'stretch';
        styleProps.style.flexBasis ??= 'auto';
        styleProps.style.flexDirection ??= 'row';
        styleProps.style.flexShrink ??= 1;
        styleProps.style.flexWrap ??= 'nowrap';
        styleProps.style.justifyContent ??= 'flex-start';
      } else if (displayValue === 'block' && displayModeInside === 'flow') {
        // Force the block emulation styles
        nextDisplayModeInside = 'flow';
        styleProps.style.alignItems = 'stretch';
        styleProps.style.display = 'flex';
        styleProps.style.flexBasis = 'auto';
        styleProps.style.flexDirection = 'column';
        styleProps.style.flexShrink = 0;
        styleProps.style.flexWrap = 'nowrap';
        styleProps.style.justifyContent = 'flex-start';
      } else if (displayValue == null) {
        // 'hidden' polyfill (overridden by "display" is set)
        if (hidden && hidden !== 'until-found') {
          styleProps.style.display = 'none';
        }
      }

      if (displayModeInside === 'flex') {
        // flex child should not shrink
        styleProps.style.flexShrink ??= 1;
      }

      // This is where we hack in a shim for `transitionProperty`,
      // `transitionDuration`, `transitionDelay`, `transitionTimingFunction`.
      const {
        caretColor,
        transitionDelay,
        transitionDuration,
        transitionProperty,
        transitionTimingFunction
      } = styleProps.style;

      const resolvedTransitionProperty =
        resolveTransitionProperty(transitionProperty);
      const transitionProperties = resolvedTransitionProperty.flatMap(
        (property) => {
          const value = styleProps.style[property];
          if (isString(value) || isNumber(value)) {
            return [{ property, value }];
          }
          return [] as Array<{ property: string, value: string | number }>;
        }
      );
      const animatedPropertyValues = useStyleTransition({
        transitionDelay: isNumber(transitionDelay) ? transitionDelay : 0,
        transitionDuration: isNumber(transitionDuration)
          ? transitionDuration
          : 16,
        transitionProperties,
        transitionTimingFunction: isString(transitionTimingFunction)
          ? transitionTimingFunction
          : null
      });

      delete styleProps.style.caretColor;
      delete styleProps.style.transitionDelay;
      delete styleProps.style.transitionDuration;
      delete styleProps.style.transitionProperty;
      delete styleProps.style.transitionTimingFunction;

      if (caretColor === 'transparent' && nativeComponent === TextInput) {
        nativeProps.caretHidden = true;
      }
      if (animatedPropertyValues.length > 0) {
        for (const animatedProperty of animatedPropertyValues) {
          // $FlowFixMe[incompatible-type]
          styleProps.style[animatedProperty.property] = animatedProperty.style;
        }
        if (nativeComponent === View) {
          nativeComponent = Animated.View;
        }
        if (nativeComponent === Text) {
          nativeComponent = Animated.Text;
        }
        if (nativeComponent === Pressable) {
          nativeComponent = AnimatedPressable;
        }
      }

      /**
       * Construct tree
       */

      if (nativeComponent === View) {
        // enable W3C flexbox layout
        nativeProps.experimental_layoutConformance = 'strict';
      }
      const element = React.createElement(nativeComponent, {
        ...(nativeProps as $FlowFixMe),
        ...(styleProps as $FlowFixMe)
      });
      let fontSizeValue = null;
      const fontSizeStyleValue = styleProps.style.fontSize;
      if (isNumber(fontSizeStyleValue)) {
        fontSizeValue = fontSizeStyleValue;
      }
      if (isString(fontSizeStyleValue) && fontSizeStyleValue.endsWith('px')) {
        fontSizeValue = parseFloat(
          fontSizeStyleValue.slice(0, fontSizeStyleValue.length - 2)
        );
      }

      const inheritedCustomProperties = React.useContext(ThemeContext);

      return (
        <ThemeContext.Provider
          value={{
            ...inheritedCustomProperties,
            ...customPropertiesFromThemes
          }}
        >
          <DisplayModeInsideContext.Provider value={nextDisplayModeInside}>
            <InheritableStyleContext.Provider
              value={flattenStyle([
                inheritedStyles as ?Style,
                textStyles as ?Style
              ])}
            >
              <FontSizeContext.Provider value={fontSizeValue}>
                {element}
              </FontSizeContext.Provider>
            </InheritableStyleContext.Provider>
          </DisplayModeInsideContext.Provider>
        </ThemeContext.Provider>
      );
    }
  );

  component.displayName = `html.${tagName}`;
  return component;
}

const styles = stylex.create({
  aspectRatio: (width: number, height: number) => ({
    aspectRatio: width / height,
    width,
    height
  }),
  contentBox: {
    boxSizing: 'content-box'
  },
  direction: (dir: string) => ({
    direction: dir,
    writingDirection: dir
  }),
  objectFitFill: {
    objectFit: 'fill'
  },
  positionStatic: {
    position: 'static'
  },
  userSelectAuto: {
    userSelect: 'auto'
  }
});
