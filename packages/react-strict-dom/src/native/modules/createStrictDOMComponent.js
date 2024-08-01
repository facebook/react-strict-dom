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
  ProvideCustomProperties,
  useCustomProperties
} from './ContextCustomProperties';
import { ProvideDisplayInside, useDisplayInside } from './ContextDisplayInside';
import {
  ProvideInheritedStyles,
  useInheritedStyles
} from './ContextInheritedStyles';
// import { Text, View } from '../react-native';
import { TextString } from './TextString';
import { flattenStyle } from './flattenStyle';
import { errorMsg, warnMsg } from '../../shared/logUtils';
import { extractStyleThemes } from './extractStyleThemes';
import { isPropAllowed } from '../../shared/isPropAllowed';
import { mergeRefs } from '../../shared/mergeRefs';
import { resolveUnitlessLineHeight } from './resolveUnitlessLineHeight';
import { useStrictDOMElement } from './useStrictDOMElement';
import { useStyleProps } from './useStyleProps';
import * as stylex from '../stylex';

function getComponentFromElement(tagName: string) {
  switch (tagName) {
    case 'article':
    case 'aside':
    case 'blockquote':
    case 'div':
    case 'fieldset':
    case 'footer':
    case 'form':
    case 'header':
    case 'hr':
    case 'li':
    case 'main':
    case 'nav':
    case 'ol':
    case 'optgroup':
    case 'section':
    case 'select':
    case 'ul': {
      return View;
    }
    case 'a':
    case 'b':
    case 'bdi':
    case 'bdo':
    case 'br':
    case 'code':
    case 'del':
    case 'em':
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
    case 'i':
    case 'ins':
    case 'kbd':
    case 'label':
    case 'option':
    case 'p':
    case 'pre':
    case 's':
    case 'span':
    case 'strong':
    case 'sub':
    case 'sup':
    case 'u': {
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

type EventHandler =
  | ReactNativeProps['onMouseEnter']
  | ReactNativeProps['onMouseLeave']
  | ReactNativeProps['onPointerEnter']
  | ReactNativeProps['onPointerLeave'];

function combineEventHandlers(a: EventHandler, b: EventHandler): EventHandler {
  if (a == null) {
    return b;
  } else {
    return (e) => {
      const returnA = typeof a === 'function' ? a(e) : null;
      const returnB = typeof b === 'function' ? b(e) : null;
      return returnB || returnA;
    };
  }
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
        label,
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

      /**
       * Resolve style props
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

      const nativeProps: ReactNativeProps = useStyleProps(renderStyles, {
        customProperties,
        inheritedFontSize
      });

      /**
       * Resolve other props
       */

      nativeProps.children = children;

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
        nativeProps.onMouseEnter = combineEventHandlers(
          nativeProps.onMouseEnter,
          onMouseEnter
        );
      }
      if (onMouseLeave != null) {
        nativeProps.onMouseLeave = combineEventHandlers(
          nativeProps.onMouseLeave,
          onMouseLeave
        );
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
        nativeProps.onPointerEnter = combineEventHandlers(
          nativeProps.onPointerEnter,
          onPointerEnter
        );
      }
      if (onPointerLeave != null) {
        nativeProps.onPointerLeave = combineEventHandlers(
          nativeProps.onPointerLeave,
          onPointerLeave
        );
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
      } else if (tagName === 'option') {
        nativeProps.children = label;
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
        if (value != null && typeof value === 'string') {
          nativeProps.value = value;
        }
      }

      nativeProps.ref = React.useMemo(
        () => mergeRefs(elementRef, forwardedRef),
        [elementRef, forwardedRef]
      );

      // Workaround: Android doesn't support ellipsis truncation if Text is selectable
      // See #136
      if (
        Platform.OS === 'android' &&
        nativeComponent === Text &&
        nativeProps.numberOfLines != null &&
        nativeProps.style.userSelect !== 'none'
      ) {
        nativeProps.style.userSelect = 'none';
      }

      if (dir != null) {
        if (dir !== 'auto') {
          nativeProps.style.direction = dir;
        }
        nativeProps.style.writingDirection = dir;
      }

      // Workaround: React Native doesn't support raw text children of View
      // Sometimes we can auto-fix this
      if (
        typeof children === 'string' &&
        nativeComponent !== Text &&
        nativeComponent !== TextInput &&
        nativeComponent !== Image
      ) {
        nativeProps.children = <TextString children={children} />;
      }

      // polyfill for default of "display:block"
      // which implies "displayInside:flow"
      let nextDisplayInsideValue = 'flow';
      const displayInsideValue = useDisplayInside();
      const displayValue = nativeProps.style.display;
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
        nextDisplayInsideValue = 'flex';
        nativeProps.style.alignItems ??= 'stretch';
        nativeProps.style.flexBasis ??= 'auto';
        nativeProps.style.flexDirection ??= 'row';
        nativeProps.style.flexShrink ??= 1;
        nativeProps.style.flexWrap ??= 'nowrap';
        nativeProps.style.justifyContent ??= 'flex-start';
      } else if (displayValue === 'block' && displayInsideValue === 'flow') {
        // Force the block emulation styles
        nextDisplayInsideValue = 'flow';
        nativeProps.style.alignItems = 'stretch';
        nativeProps.style.display = 'flex';
        nativeProps.style.flexBasis = 'auto';
        nativeProps.style.flexDirection = 'column';
        nativeProps.style.flexShrink = 0;
        nativeProps.style.flexWrap = 'nowrap';
        nativeProps.style.justifyContent = 'flex-start';
      } else if (displayValue == null) {
        // 'hidden' polyfill (overridden by "display" is set)
        if (hidden && hidden !== 'until-found') {
          nativeProps.style.display = 'none';
        }
      }

      if (displayInsideValue === 'flex') {
        // flex child should not shrink
        nativeProps.style.flexShrink ??= 1;
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
        ...nonTextStyle
      } = nativeProps.style;

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
      if (lineHeight != null) {
        nextInheritedStyles.lineHeight = lineHeight;
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
        nativeProps.style = nonTextStyle;
      } else {
        resolveUnitlessLineHeight(nativeProps.style);
      }

      // Use Animated components if necessary
      if (nativeProps.animated === true) {
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

      // $FlowFixMe (we don't care about the internal React Native prop types)
      let element = React.createElement(nativeComponent, nativeProps);

      if (hasNextInheritedStyles) {
        element = (
          <ProvideInheritedStyles
            children={element}
            value={nextInheritedStyles}
          />
        );
      }
      if (nextDisplayInsideValue !== displayInsideValue) {
        element = (
          <ProvideDisplayInside
            children={element}
            value={nextDisplayInsideValue}
          />
        );
      }
      if (customPropertiesFromThemes != null) {
        element = (
          <ProvideCustomProperties
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
