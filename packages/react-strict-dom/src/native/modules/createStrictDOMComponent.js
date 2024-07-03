/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { StrictProps } from '../../types/StrictProps';
import type { Props as ReactNativeProps } from '../../types/react-native';

import * as React from 'react';
import {
  Animated,
  Image,
  TextInput,
  Platform,
  Pressable,
  Text,
  View
} from 'react-native';

import {
  CustomPropertiesProvider,
  useCustomProperties
} from './ContextCustomProperties';
import {
  DisplayModeInsideProvider,
  useDisplayModeInside
} from './ContextDisplayModeInside';
import {
  InheritedStylesProvider,
  useInheritedStyles
} from './ContextInheritedStyles';
// import { Text, View } from '../react-native';
import { TextString } from './TextString';
import { flattenStyle } from './flattenStyle';
import { errorMsg, warnMsg } from '../../shared/logUtils';
import { extractStyleThemes } from './extractStyleThemes';
import { isPropAllowed } from '../../shared/isPropAllowed';
import { mergeRefs } from '../../shared/mergeRefs';
import { useHoverHandlers } from './useHoverHandlers';
import { useStrictDOMElement } from './useStrictDOMElement';
import { useStyleProps } from './useStyleProps';
import { useStyleTransition } from './useStyleTransition';
import * as stylex from '../stylex';

function getComponentFromElement(tagName: string) {
  switch (tagName) {
    case 'article':
    case 'aside':
    case 'div':
    case 'fieldset':
    case 'footer':
    case 'form':
    case 'header':
    case 'main':
    case 'nav':
    case 'ol':
    case 'section':
    case 'ul': {
      return View;
    }
    case 'blockquote':
    case 'br':
    case 'code':
    case 'em':
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
    case 'p':
    case 'pre':
    case 'strong':
    case 'sub':
    case 'sup': {
      return Text;
    }
    case 'button': {
      return Pressable;
    }
    case 'img': {
      return Image;
    }
    case 'input':
    case 'textarea': {
      return TextInput;
    }
    default:
      return Text;
  }
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const unsupportedProps = new Set([
  'onBeforeInput',
  'onInvalid',
  'onSelect',
  'onSelectionChange'
]);

function isString(str: mixed): boolean %checks {
  return typeof str === 'string';
}

function validateStrictProps(props: StrictProps) {
  Object.keys(props).forEach((key) => {
    const isValidProp = isPropAllowed(key);
    const isUnsupportedProp = unsupportedProps.has(key);
    if (!isValidProp) {
      errorMsg(`invalid prop "${key}"`);
    }
    if (isUnsupportedProp) {
      warnMsg(`unsupported prop "${key}"`);
    }
  });
}

function isNumber(num: mixed): boolean %checks {
  return typeof num === 'number';
}

function resolveTransitionProperty(property: mixed): ?(string[]) {
  if (property === 'all') {
    return ['opacity', 'transform'];
  }
  if (typeof property === 'string') {
    return property.split(',').map((p) => p.trim());
  }
  return null;
}

export function createStrictDOMComponent<T, P: StrictProps>(
  tagName: string,
  defaultProps?: P
): React.AbstractComponent<P, T> {
  const component: React.AbstractComponent<P, T> = React.forwardRef(
    function (props, forwardedRef) {
      let nativeComponent = getComponentFromElement(tagName);
      const elementRef = useStrictDOMElement<T>({ tagName });

      if (__DEV__) {
        validateStrictProps(props);
      }

      /**
       * Construct props
       */
      const {
        alt,
        'aria-busy': ariaBusy,
        'aria-checked': ariaChecked,
        'aria-disabled': ariaDisabled,
        'aria-expanded': ariaExpanded,
        'aria-hidden': ariaHidden,
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        'aria-live': ariaLive,
        'aria-modal': ariaModal,
        'aria-posinset': ariaPosInSet,
        'aria-selected': ariaSelected,
        'aria-setsize': ariaSetSize,
        'aria-valuemax': ariaValueMax,
        'aria-valuemin': ariaValueMin,
        'aria-valuenow': ariaValueNow,
        'aria-valuetext': ariaValueText,
        autoComplete,
        children,
        crossOrigin,
        'data-testid': dataTestID,
        defaultValue,
        dir,
        disabled,
        enterKeyHint,
        height,
        hidden,
        href,
        id,
        inputMode,
        maxLength,
        onBlur,
        onChange,
        onClick,
        onError,
        onFocus,
        onGotPointerCapture,
        onInput,
        onKeyDown,
        onLoad,
        onLostPointerCapture,
        onMouseDown,
        onMouseEnter,
        onMouseLeave,
        onMouseOut,
        onMouseOver,
        onMouseUp,
        onPointerCancel,
        onPointerDown,
        onPointerEnter,
        onPointerLeave,
        onPointerMove,
        onPointerOut,
        onPointerOver,
        onPointerUp,
        onScroll,
        onTouchCancel,
        onTouchEnd,
        onTouchMove,
        onTouchStart,
        placeholder,
        readOnly,
        referrerPolicy,
        role,
        rows,
        spellCheck,
        src,
        srcSet,
        style,
        tabIndex,
        type,
        value,
        width
      } = props;

      // $FlowFixMe[prop-missing] style is added to nativeProps later
      const nativeProps: ReactNativeProps = {
        children
      };

      if (ariaHidden != null) {
        nativeProps.accessibilityElementsHidden = ariaHidden;
        if (ariaHidden === true) {
          nativeProps.importantForAccessibility = 'no-hide-descendants';
        }
      }
      if (ariaLabel != null) {
        nativeProps.accessibilityLabel = ariaLabel;
      }
      if (ariaLabelledBy != null) {
        nativeProps.accessibilityLabelledBy = ariaLabelledBy?.split(/\s*,\s*/g);
      }
      if (ariaLive != null) {
        nativeProps.accessibilityLiveRegion =
          ariaLive === 'off' ? 'none' : ariaLive;
      }
      if (ariaModal != null) {
        nativeProps.accessibilityViewIsModal = ariaModal;
      }
      if (ariaPosInSet != null) {
        nativeProps.accessibilityPosInSet = ariaPosInSet;
      }
      const ariaRole =
        role ||
        (tagName === 'a' && 'link') ||
        (tagName === 'header' && 'header');
      if (ariaRole) {
        nativeProps.role = ariaRole;
      }
      if (ariaSetSize != null) {
        nativeProps.accessibilitySetSize = ariaSetSize;
      }
      if (
        ariaBusy != null ||
        ariaChecked != null ||
        ariaDisabled != null ||
        ariaExpanded != null ||
        ariaSelected != null
      ) {
        nativeProps.accessibilityState = {
          busy: ariaBusy,
          checked: ariaChecked,
          disabled: ariaDisabled,
          expanded: ariaExpanded,
          selected: ariaSelected
        };
      }
      if (
        ariaValueMax != null ||
        ariaValueMin != null ||
        ariaValueNow != null ||
        ariaValueText != null
      ) {
        nativeProps.accessibilityValue = {
          max: ariaValueMax,
          min: ariaValueMin,
          now: ariaValueNow,
          text: ariaValueText
        };
      }
      if (dataTestID != null) {
        nativeProps.testID = dataTestID;
      }
      if (id != null) {
        nativeProps.nativeID = id;
      }
      if (tabIndex != null) {
        nativeProps.focusable = !tabIndex;
      }

      // Events

      if (onBlur != null) {
        nativeProps.onBlur = onBlur;
      }
      // TODO: remove once PointerEvent onClick is available
      if (onClick != null) {
        // Text has onPress, View doesn't
        if (nativeComponent === View) {
          nativeComponent = Pressable;
        }
        nativeProps.onPress = function ({ nativeEvent }) {
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
            defaultPrevented: false,
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
      if (onFocus != null) {
        nativeProps.onFocus = onFocus;
      }
      if (onGotPointerCapture != null) {
        nativeProps.onGotPointerCapture = onGotPointerCapture;
      }
      if (onLostPointerCapture != null) {
        nativeProps.onLostPointerCapture = onLostPointerCapture;
      }
      if (onMouseDown != null) {
        nativeProps.onMouseDown = onMouseDown;
      }
      if (onMouseEnter != null) {
        nativeProps.onMouseEnter = onMouseEnter;
      }
      if (onMouseLeave != null) {
        nativeProps.onMouseLeave = onMouseLeave;
      }
      if (onMouseOut != null) {
        nativeProps.onMouseOut = onMouseOut;
      }
      if (onMouseOver != null) {
        nativeProps.onMouseOver = onMouseOver;
      }
      if (onMouseUp != null) {
        nativeProps.onMouseUp = onMouseUp;
      }
      if (onPointerCancel != null) {
        nativeProps.onPointerCancel = onPointerCancel;
      }
      if (onPointerDown != null) {
        nativeProps.onPointerDown = onPointerDown;
      }
      if (onPointerEnter != null) {
        nativeProps.onPointerEnter = onPointerEnter;
      }
      if (onPointerLeave != null) {
        nativeProps.onPointerLeave = onPointerLeave;
      }
      if (onPointerMove != null) {
        nativeProps.onPointerMove = onPointerMove;
      }
      if (onPointerOut != null) {
        nativeProps.onPointerOut = onPointerOut;
      }
      if (onPointerOver != null) {
        nativeProps.onPointerOver = onPointerOver;
      }
      if (onPointerUp != null) {
        nativeProps.onPointerUp = onPointerUp;
      }
      if (onScroll != null) {
        nativeProps.onScroll = onScroll;
      }
      if (onTouchCancel != null) {
        nativeProps.onTouchCancel = onTouchCancel;
      }
      if (onTouchEnd != null) {
        nativeProps.onTouchEnd = onTouchEnd;
      }
      if (onTouchMove != null) {
        nativeProps.onTouchMove = onTouchMove;
      }
      if (onTouchStart != null) {
        nativeProps.onTouchStart = onTouchStart;
      }

      // Tag-specific props

      if (tagName === 'a' && href != null) {
        nativeProps.onPress = function (e) {
          if (__DEV__) {
            errorMsg('<a> "href" handling is not implemented in React Native.');
          }
        };
      } else if (tagName === 'br') {
        nativeProps.children = '\n';
      } else if (tagName === 'input') {
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
          if (__DEV__) {
            errorMsg(
              `<input type="${type}" /> is not implemented in React Native.`
            );
          }
        }
      } else if (tagName === 'img') {
        if (alt != null) {
          nativeProps.alt = alt;
        }
        if (crossOrigin != null) {
          nativeProps.crossOrigin = crossOrigin;
        }
        if (height != null) {
          nativeProps.height = height;
        }
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
        if (referrerPolicy != null) {
          nativeProps.referrerPolicy = referrerPolicy;
        }
        if (src != null) {
          nativeProps.src = src;
        }
        if (srcSet != null) {
          nativeProps.srcSet = srcSet;
        }
        if (width != null) {
          nativeProps.width = width;
        }
      } else if (tagName === 'textarea') {
        nativeProps.multiline = true;
        if (rows != null) {
          nativeProps.numberOfLines = rows;
        }
      }

      // Component-specific props

      if (nativeComponent === Pressable) {
        if (disabled === true) {
          nativeProps.disabled = true;
          nativeProps.focusable = false;
        }
      } else if (nativeComponent === TextInput) {
        if (autoComplete != null) {
          nativeProps.autoComplete = autoComplete;
        }
        if (defaultValue != null) {
          nativeProps.defaultValue = defaultValue;
        }
        if (disabled === true) {
          // polyfill disabled elements
          nativeProps.disabled = true;
          nativeProps.editable = false;
          nativeProps.focusable = false;
        }
        if (enterKeyHint != null) {
          nativeProps.enterKeyHint = enterKeyHint;
        }
        if (maxLength != null) {
          nativeProps.maxLength = maxLength;
        }
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
        if (placeholder != null) {
          nativeProps.placeholder = placeholder;
        }
        if (readOnly != null) {
          nativeProps.editable = !readOnly;
        }
        if (spellCheck != null) {
          nativeProps.spellCheck = spellCheck;
        }
        if (value != null) {
          nativeProps.value = value;
        }
      }

      nativeProps.ref = React.useMemo(
        () => mergeRefs(elementRef, forwardedRef),
        [elementRef, forwardedRef]
      );

      /**
       * Resolve the style props
       */
      const [extractedStyles, customPropertiesFromThemes] =
        extractStyleThemes(style);
      const customProperties = useCustomProperties(customPropertiesFromThemes);
      const inheritedStyles = useInheritedStyles();
      const inheritedFontSize =
        typeof inheritedStyles?.fontSize === 'number'
          ? inheritedStyles?.fontSize
          : undefined;

      const flatStyle = flattenStyle(extractedStyles);

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
        // Styles for Text
        [
          nativeComponent === Text && [styles.userSelectAuto, inheritedStyles],
          flatStyle
        ]
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

      const styleProps = useStyleProps(renderStyles, {
        customProperties,
        hover,
        inheritedFontSize
      });

      // Workaround: Android doesn't support ellipsis truncation if text is selectable
      // See #136
      if (
        Platform.OS === 'android' &&
        styleProps.numberOfLines != null &&
        styleProps.style.userSelect !== 'none'
      ) {
        styleProps.style.userSelect = 'none';
      }

      if (dir != null) {
        if (dir !== 'auto') {
          styleProps.style.direction = dir;
        }
        styleProps.style.writingDirection = dir;
      }

      // Workaround: React Native doesn't support raw text children of View
      // Sometimes we can auto-fix this
      if (
        isString(children) &&
        nativeComponent !== Text &&
        nativeComponent !== TextInput &&
        nativeComponent !== Image
      ) {
        nativeProps.children = <TextString children={children} hover={hover} />;
      }

      // polyfill for display:block-as-default
      let nextDisplayModeInside = 'flow';
      const displayModeInside = useDisplayModeInside();
      const displayValue = styleProps.style.display;
      if (
        displayValue != null &&
        displayValue !== 'flex' &&
        displayValue !== 'none' &&
        displayValue !== 'block'
      ) {
        if (__DEV__) {
          warnMsg(
            `unsupported style value in "display:${String(displayValue)}"`
          );
        }
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
        transitionDelay,
        transitionDuration,
        transitionProperty,
        transitionTimingFunction,
        ...nonTextStyle
      } = styleProps.style;

      const nextInheritedStyles = {} as $FlowFixMe;
      if (color != null) {
        nextInheritedStyles.color = color;
      }
      if (cursor != null) {
        nextInheritedStyles.cursor = cursor;
      }
      if (fontFamily != null) {
        nextInheritedStyles.fontFamily = fontFamily;
      }
      if (fontSize != null) {
        nextInheritedStyles.fontSize = fontSize;
      }
      if (fontStyle != null) {
        nextInheritedStyles.fontStyle = fontStyle;
      }
      if (fontVariant != null) {
        nextInheritedStyles.fontVariant = fontVariant;
      }
      if (fontWeight != null) {
        nextInheritedStyles.fontWeight = fontWeight;
      }
      if (letterSpacing != null) {
        nextInheritedStyles.letterSpacing = letterSpacing;
      }
      if (flatStyle.lineHeight != null) {
        // Intentionally use the unresolved value to account for unitless
        // lineHeight, which needs to be preserved when inherited.
        nextInheritedStyles.lineHeight = flatStyle.lineHeight;
      }
      if (textAlign != null) {
        nextInheritedStyles.textAlign = textAlign;
      }
      if (textIndent != null) {
        nextInheritedStyles.textIndent = textIndent;
      }
      if (textTransform != null) {
        nextInheritedStyles.textTransform = textTransform;
      }
      if (whiteSpace != null) {
        nextInheritedStyles.whiteSpace = whiteSpace;
      }

      const hasNextInheritedStyles =
        nextInheritedStyles != null &&
        typeof nextInheritedStyles === 'object' &&
        Object.keys(nextInheritedStyles).length > 0;

      if (nativeComponent !== Text && nativeComponent !== TextInput) {
        styleProps.style = nonTextStyle;
      }

      const resolvedTransitionProperty =
        resolveTransitionProperty(transitionProperty);
      const transitionProperties = resolvedTransitionProperty?.flatMap(
        (property) => {
          const value = styleProps.style[property];
          if (isString(value) || isNumber(value) || Array.isArray(value)) {
            return [{ property, value }];
          }
          return [] as [];
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

      delete styleProps.style.transitionDelay;
      delete styleProps.style.transitionDuration;
      delete styleProps.style.transitionProperty;
      delete styleProps.style.transitionTimingFunction;

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

      Object.assign(nativeProps, styleProps);
      // $FlowFixMe (we don't care about the internal React Native prop types)
      let element = React.createElement(nativeComponent, nativeProps);

      if (hasNextInheritedStyles) {
        element = (
          <InheritedStylesProvider
            children={element}
            value={nextInheritedStyles}
          />
        );
      }

      if (nextDisplayModeInside !== displayModeInside) {
        element = (
          <DisplayModeInsideProvider
            children={element}
            value={nextDisplayModeInside}
          />
        );
      }

      if (customPropertiesFromThemes != null) {
        element = (
          <CustomPropertiesProvider
            children={element}
            value={customProperties}
          />
        );
      }

      return element;
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
