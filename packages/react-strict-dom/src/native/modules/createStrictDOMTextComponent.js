/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { StrictPropsWithCompat } from '../../types/StrictProps';

import * as React from 'react';
import { Animated, Platform, Text } from 'react-native';
import { ProvideCustomProperties } from './ContextCustomProperties';
import { ProvideInheritedStyles } from './ContextInheritedStyles';
import { errorMsg } from '../../shared/logUtils';
import { mergeRefs } from '../../shared/mergeRefs';
import { useNativeProps } from './useNativeProps';
import { useStrictDOMElement } from './useStrictDOMElement';
import * as stylex from '../stylex';

function hasElementChildren(children: mixed): boolean {
  return children != null && typeof children !== 'string';
}

export function createStrictDOMTextComponent<T, P: StrictPropsWithCompat>(
  tagName: string,
  _defaultProps?: P
): component(ref?: React.RefSetter<T>, ...P) {
  const component: React.AbstractComponent<P, T> = React.forwardRef(
    function (props, forwardedRef) {
      let NativeComponent = Text;
      const elementRef = useStrictDOMElement<T>({ tagName });

      const { href, label } = props;

      /**
       * Resolve global HTML and style props
       */

      const defaultProps = {
        style: [_defaultProps?.style, styles.userSelectAuto]
      };

      const { customProperties, nativeProps, inheritableStyle } =
        useNativeProps(defaultProps, props, {
          provideInheritableStyle:
            tagName !== 'br' ||
            tagName !== 'option' ||
            hasElementChildren(props.children),
          withInheritedStyle: true,
          withTextStyle: true
        });

      // Tag-specific props

      if (tagName === 'a') {
        nativeProps.role ??= 'link';
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
      } else if (tagName === 'option') {
        nativeProps.children = label;
      }

      // Component-specific props

      nativeProps.ref = React.useMemo(
        () => mergeRefs(elementRef, forwardedRef),
        [elementRef, forwardedRef]
      );

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

      // Use Animated components if necessary
      if (nativeProps.animated === true) {
        NativeComponent = Animated.Text;
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

      if (
        hasElementChildren(nativeProps.children) ||
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
  userSelectAuto: {
    userSelect: 'auto'
  }
});
