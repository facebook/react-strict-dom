/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

/* eslint-disable no-unreachable */

import type { AnimatedStyleValue } from '../shared/SharedAnimatedTypes';
import type { Text, View } from 'react-native';
import type { ImageProps } from 'react-native/Libraries/Image/ImageProps';
import type { html } from 'react-strict-dom';

import * as React from 'react';
import { Animated } from 'react-native';

import { compat, css } from 'react-strict-dom';

const styles = css.create({
  defaults: {
    boxSizing: 'content-box',
    position: 'static'
  }
});

export component AnimatedDiv(
  animatedStyle?: AnimatedStyleValue<Animated.Node>,
  children?: React.Node,
  ref?: React.RefSetter<React.RefOf<html.div>>,
  ...htmlProps: Omit<React.PropsOf<html.div>, 'children'>
) {
  return (
    // $FlowFixMe[prop-missing] - RSD missing ref type on compat.native API
    <compat.native
      {...htmlProps}
      as="div"
      ref={ref}
      style={[styles.defaults, htmlProps.style]}
    >
      {(nativeProps: React.PropsOf<View>) => {
        return (
          <Animated.View
            {...nativeProps}
            style={[nativeProps.style, animatedStyle]}
          >
            {nativeProps.children}
          </Animated.View>
        );
      }}
    </compat.native>
  );
}

export component AnimatedSpan(
  animatedStyle: AnimatedStyleValue<Animated.Node>,
  children?: React.Node,
  ref?: React.RefSetter<React.RefOf<html.span>>,
  ...htmlProps: Omit<React.PropsOf<html.span>, 'children'>
) {
  return (
    // $FlowFixMe[prop-missing] - RSD missing ref type on compat.native API
    <compat.native
      {...htmlProps}
      as="span"
      ref={ref}
      style={[styles.defaults, htmlProps.style]}
    >
      {(nativeProps: React.PropsOf<Text>) => {
        return (
          <Animated.Text
            {...nativeProps}
            style={[nativeProps.style, animatedStyle]}
          >
            {children}
          </Animated.Text>
        );
      }}
    </compat.native>
  );
}

export component AnimatedImg(
  animatedStyle: AnimatedStyleValue<Animated.Node>,
  ref?: React.RefSetter<React.RefOf<html.img>>,
  ...htmlProps: React.PropsOf<html.img>
) {
  return (
    // $FlowFixMe[prop-missing] - RSD missing ref type on compat.native API
    <compat.native
      {...htmlProps}
      as="img"
      ref={ref}
      style={[styles.defaults, htmlProps.style]}
    >
      {(nativeProps: ImageProps) => {
        return (
          <Animated.Image
            {...nativeProps}
            style={[nativeProps.style, animatedStyle]}
          />
        );
      }}
    </compat.native>
  );
}
