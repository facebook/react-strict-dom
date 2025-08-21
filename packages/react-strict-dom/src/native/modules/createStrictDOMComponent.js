/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { ReactNativeProps } from '../../types/renderer.native';
import type { StrictProps as StrictPropsOriginal } from '../../types/StrictProps';

import * as React from 'react';
import * as ReactNative from '../react-native';

import { ProvideCustomProperties } from './ContextCustomProperties';
import { ProvideDisplayInside, useDisplayInside } from './ContextDisplayInside';
import { ProvideInheritedStyles } from './ContextInheritedStyles';
import { TextString } from './TextString';
import { errorMsg } from '../../shared/logUtils';
import { useNativeProps } from './useNativeProps';
import { useStrictDOMElement } from './useStrictDOMElement';

type StrictProps = $ReadOnly<{
  ...StrictPropsOriginal,
  children?: React.Node | ((ReactNativeProps) => React.Node)
}>;

const AnimatedPressable = ReactNative.Animated.createAnimatedComponent<
  React.ElementConfig<typeof ReactNative.Pressable>,
  typeof ReactNative.Pressable
>(ReactNative.Pressable);

export function createStrictDOMComponent<T, P: StrictProps>(
  tagName: string,
  defaultProps?: P
): component(ref?: React.RefSetter<T>, ...P) {
  const component: React.AbstractComponent<P, T> = React.forwardRef(
    function (props, forwardedRef) {
      let NativeComponent = null;
      switch (tagName) {
        case 'button':
          NativeComponent = ReactNative.Pressable;
          break;
        case 'dialog':
          NativeComponent = ReactNative.Modal;
          break;
        default:
          NativeComponent = ReactNative.ViewNativeComponent;
      }
      const elementRef = useStrictDOMElement<T>(forwardedRef, { tagName });
      const hasTextAncestor = React.useContext(ReactNative.TextAncestorContext);

      /**
       * Resolve global HTML and style props
       */

      const { customProperties, nativeProps, inheritableStyle } =
        useNativeProps(defaultProps, props, {
          provideInheritableStyle:
            tagName !== 'br' || tagName !== 'hr' || tagName !== 'option',
          withInheritedStyle: false,
          withTextStyle: false
        });

      if (
        nativeProps.onPress != null &&
        NativeComponent === ReactNative.ViewNativeComponent
      ) {
        NativeComponent = ReactNative.Pressable;
      }

      // Tag-specific props

      if (tagName === 'button') {
        nativeProps.role ??= 'button';
      } else if (tagName === 'header') {
        nativeProps.role ??= 'header';
      } else if (tagName === 'li') {
        nativeProps.role ??= 'listitem';
      } else if (tagName === 'ol' || tagName === 'ul') {
        nativeProps.role ??= 'list';
      }

      // Component-specific props

      if (NativeComponent === ReactNative.Pressable) {
        if (props.disabled === true) {
          nativeProps.disabled = true;
          nativeProps.focusable = false;
        }
      }

      nativeProps.ref = elementRef;

      // Workaround: React Native doesn't support raw text children of View
      // Sometimes we can auto-fix this
      if (typeof nativeProps.children === 'string') {
        nativeProps.children = <TextString children={nativeProps.children} />;
      }

      // Polyfill for default of "display:block"
      // which implies "displayInside:flow"
      let nextDisplayInsideValue = 'flow';
      const displayInsideValue = useDisplayInside();
      const displayValue = nativeProps.style.display;

      if (__DEV__) {
        const nativeStyle = nativeProps.style;
        if (displayInsideValue !== 'flex') {
          // Error message if the element is not a flex child but tries to use flex
          ['flex', 'flexBasis', 'flexGrow', 'flexShrink'].forEach(
            (styleProp) => {
              const value = nativeStyle[styleProp];
              if (value != null) {
                errorMsg(
                  `"display:flex" is required on the parent for "${styleProp}" to have an effect.`
                );
              }
            }
          );
        }
      }

      if (displayValue === 'flex') {
        nextDisplayInsideValue = 'flex';
        nativeProps.style.alignContent ??= 'stretch';
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
      }

      if (displayInsideValue === 'flex') {
        // flex child should not shrink by default
        nativeProps.style.flexShrink ??= 1;
      }

      // Use Animated components if necessary
      if (nativeProps.animated === true) {
        if (NativeComponent === ReactNative.ViewNativeComponent) {
          NativeComponent = ReactNative.Animated.View;
        }
        if (NativeComponent === ReactNative.Pressable) {
          NativeComponent = AnimatedPressable;
        }
      }

      /**
       * Construct tree
       */

      let element: React.Node =
        typeof props.children === 'function' ? (
          props.children(nativeProps)
        ) : (
          // $FlowFixMe
          <NativeComponent {...nativeProps} />
        );

      // Enable W3C layout support
      if (props['data-layoutconformance'] === 'strict') {
        element = (
          <ReactNative.LayoutConformance children={element} mode="strict" />
        );
      }

      if (
        (nativeProps.children != null &&
          typeof nativeProps.children !== 'string') ||
        typeof props.children === 'function'
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

      if (hasTextAncestor) {
        return (
          <ReactNative.TextAncestorContext.Provider value={false}>
            {element}
          </ReactNative.TextAncestorContext.Provider>
        );
      }

      return element;
    }
  );

  component.displayName = `html.${tagName}`;
  return component;
}
