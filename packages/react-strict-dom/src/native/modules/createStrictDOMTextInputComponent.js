/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { StrictReactDOMInputProps } from '../../types/StrictReactDOMInputProps';
import type { StrictReactDOMTextAreaProps } from '../../types/StrictReactDOMTextAreaProps';

import * as React from 'react';
import { Animated, TextInput } from 'react-native';
import { errorMsg } from '../../shared/logUtils';
import { mergeRefs } from '../../shared/mergeRefs';
import { useNativeProps } from './useNativeProps';
import { useStrictDOMElement } from './useStrictDOMElement';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export function createStrictDOMTextInputComponent<
  P: StrictReactDOMInputProps | StrictReactDOMTextAreaProps,
  T
>(
  tagName: string,
  defaultProps?: P
): component(ref?: React.RefSetter<T>, ...P) {
  const component: React.AbstractComponent<P, T> = React.forwardRef(
    function (props, forwardedRef) {
      let NativeComponent = TextInput;
      const elementRef = useStrictDOMElement<T>({ tagName });

      const {
        autoComplete,
        defaultValue,
        disabled,
        enterKeyHint,
        inputMode,
        maxLength,
        onChange,
        onInput,
        onKeyDown,
        placeholder,
        readOnly,
        rows,
        spellCheck,
        type,
        value
      } = props;

      /**
       * Resolve global HTML and style props
       */

      const { nativeProps } = useNativeProps(defaultProps, props, {
        provideInheritableStyle: false,
        withInheritedStyle: false,
        withTextStyle: true
      });

      // Tag-specific props

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
          if (__DEV__) {
            errorMsg(
              `<input type="${type}" /> is not implemented in React Native.`
            );
          }
        }
      } else if (tagName === 'textarea') {
        nativeProps.multiline = true;
        if (rows != null) {
          nativeProps.numberOfLines = rows;
        }
      }

      // Component-specific props

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

      nativeProps.ref = React.useMemo(
        () => mergeRefs(elementRef, forwardedRef),
        [elementRef, forwardedRef]
      );

      // Use Animated components if necessary
      if (nativeProps.animated === true) {
        NativeComponent = AnimatedTextInput;
      }

      // $FlowFixMe
      const element = <NativeComponent {...nativeProps} />;

      return element;
    }
  );

  component.displayName = `html.${tagName}`;
  return component;
}
