/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { StrictReactDOMImageProps } from '../../types/StrictReactDOMImageProps';

import * as React from 'react';
import { Animated, Image } from 'react-native';
import { mergeRefs } from '../../shared/mergeRefs';
import { useNativeProps } from './useNativeProps';
import { useStrictDOMElement } from './useStrictDOMElement';
import * as stylex from '../stylex';

export function createStrictDOMImageComponent<P: StrictReactDOMImageProps, T>(
  tagName: string,
  _defaultProps?: P
): component(ref?: React.RefSetter<T>, ...P) {
  const component: React.AbstractComponent<P, T> = React.forwardRef(
    function (props, forwardedRef) {
      let NativeComponent = Image;
      const elementRef = useStrictDOMElement<T>({ tagName });

      const {
        alt,
        crossOrigin,
        height,
        onError,
        onLoad,
        referrerPolicy,
        src,
        srcSet,
        width
      } = props;

      /**
       * Resolve global HTML and style props
       */

      const defaultProps = {
        style: [
          _defaultProps?.style,
          height != null && width != null && styles.aspectRatio(width, height)
        ]
      };

      const { nativeProps } = useNativeProps(defaultProps, props, {
        provideInheritableStyle: false,
        withInheritedStyle: false,
        withTextStyle: false
      });

      // Tag-specific props

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

      // Component-specific props

      nativeProps.ref = React.useMemo(
        () => mergeRefs(elementRef, forwardedRef),
        [elementRef, forwardedRef]
      );

      // Use Animated components if necessary
      if (nativeProps.animated === true) {
        NativeComponent = Animated.Image;
      }

      // $FlowFixMe
      const element = <NativeComponent {...nativeProps} />;

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
  })
});
