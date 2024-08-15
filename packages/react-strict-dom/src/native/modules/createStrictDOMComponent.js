/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { StrictProps } from '../../types/StrictProps';

import * as React from 'react';
import {
  Animated,
  Image,
  TextInput,
  Platform,
  Pressable,
  Text
} from 'react-native';
import { View } from '../react-native';

import { ProvideCustomProperties } from './ContextCustomProperties';
import { ProvideDisplayInside, useDisplayInside } from './ContextDisplayInside';
import { ProvideInheritedStyles } from './ContextInheritedStyles';
import { TextString } from './TextString';
import { errorMsg, warnMsg } from '../../shared/logUtils';
import { mergeRefs } from '../../shared/mergeRefs';
import { useNativeProps } from './useNativeProps';
import { useStrictDOMElement } from './useStrictDOMElement';
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

export function createStrictDOMComponent<T, P: StrictProps>(
  tagName: string,
  _defaultProps?: P
): React.AbstractComponent<P, T> {
  const component: React.AbstractComponent<P, T> = React.forwardRef(
    function (props, forwardedRef) {
      let NativeComponent = getComponentFromElement(tagName);
      const elementRef = useStrictDOMElement<T>({ tagName });

      /**
       * Construct props
       */
      const {
        alt,
        autoComplete,
        crossOrigin,
        defaultValue,
        disabled,
        enterKeyHint,
        height,
        hidden,
        href,
        inputMode,
        label,
        maxLength,
        onChange,
        onError,
        onInput,
        onKeyDown,
        onLoad,
        placeholder,
        readOnly,
        referrerPolicy,
        rows,
        spellCheck,
        src,
        srcSet,
        type,
        value,
        width
      } = props;

      /**
       * Resolve global HTML and style props
       */

      const defaultProps = { style: _defaultProps?.style };

      if (tagName === 'img') {
        defaultProps.style = [
          defaultProps?.style,
          height != null && width != null && styles.aspectRatio(width, height)
        ];
      } else if (NativeComponent === Text) {
        defaultProps.style = [defaultProps?.style, styles.userSelectAuto];
      }

      const { customProperties, nativeProps, inheritableStyle } =
        useNativeProps(defaultProps, props, {
          provideInheritableStyle:
            tagName !== 'br' ||
            tagName !== 'hr' ||
            tagName !== 'img' ||
            tagName !== 'option' ||
            NativeComponent !== TextInput,
          withInheritedStyle: NativeComponent === Text,
          withTextStyle:
            NativeComponent === Text || NativeComponent === TextInput
        });

      if (nativeProps.onPress != null && NativeComponent === View) {
        NativeComponent = Pressable;
      }

      // Tag-specific props

      if (tagName === 'a') {
        nativeProps.role = nativeProps.role ?? 'link';
        if (href != null) {
          nativeProps.onPress = function (e) {
            if (__DEV__) {
              errorMsg(
                '<a> "href" handling is not implemented in React Native.'
              );
            }
          };
        }
      } else if (tagName === 'br') {
        nativeProps.children = '\n';
      } else if (tagName === 'header') {
        nativeProps.role = nativeProps.role ?? 'header';
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

      if (NativeComponent === Pressable) {
        if (disabled === true) {
          nativeProps.disabled = true;
          nativeProps.focusable = false;
        }
      } else if (NativeComponent === TextInput) {
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

      // Workaround: React Native doesn't support raw text children of View
      // Sometimes we can auto-fix this
      if (
        typeof nativeProps.children === 'string' &&
        NativeComponent !== Text &&
        NativeComponent !== TextInput &&
        NativeComponent !== Image
      ) {
        nativeProps.children = <TextString children={nativeProps.children} />;
      }

      // Polyfill for default of "display:block"
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

      if (NativeComponent === Text) {
        // Workaround: Android doesn't support ellipsis truncation if Text is selectable
        // See #136
        const disableUserSelect =
          Platform.OS === 'android' &&
          nativeProps.numberOfLines != null &&
          nativeProps.style.userSelect !== 'none';

        nativeProps.style = Object.assign(
          nativeProps.style,
          disableUserSelect ? { userSelect: 'none' } : null
        );
      }

      // Use Animated components if necessary
      if (nativeProps.animated === true) {
        if (NativeComponent === View) {
          NativeComponent = Animated.View;
        }
        if (NativeComponent === Text) {
          NativeComponent = Animated.Text;
        }
        if (NativeComponent === Pressable) {
          NativeComponent = AnimatedPressable;
        }
      }

      /**
       * Construct tree
       */

      if (NativeComponent === View) {
        // enable W3C flexbox layout
        nativeProps.experimental_layoutConformance = 'strict';
      }

      // $FlowFixMe
      let element = <NativeComponent {...nativeProps} />;

      if (
        nativeProps.children != null &&
        typeof nativeProps.children !== 'string'
      ) {
        if (inheritableStyle != null) {
          element = (
            <ProvideInheritedStyles
              children={element}
              value={inheritableStyle}
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
        if (customProperties != null) {
          element = (
            <ProvideCustomProperties
              children={element}
              value={customProperties}
            />
          );
        }
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
  userSelectAuto: {
    userSelect: 'auto'
  }
});
