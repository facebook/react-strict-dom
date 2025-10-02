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

import * as React from 'react';
import { html, css } from 'react-strict-dom';
import useAnimatedStyle from './useAnimatedStyle';
import type { AnimatedNodeType } from './types/AnimatedTypes';

const styles = css.create({
  animatedOpacity: (opacity: string) => ({ opacity }),
  animatedTransform: (transform: string) => ({ transform })
});

export component AnimatedDiv(
  animatedStyle?: AnimatedStyleValue<AnimatedNodeType>,
  ref?: React.RefSetter<React.RefOf<html.div>>,
  style as incomingStyle?: React.PropsOf<html.div>['style'],
  ...restProps: Omit<React.PropsOf<html.div>, 'style'>
) {
  const [{ opacity, transform }, animatedRefSetter] =
    useAnimatedStyle<HTMLDivElement | null>(animatedStyle, ref);
  return (
    <html.div
      {...restProps}
      ref={animatedRefSetter}
      style={[
        incomingStyle,
        transform != null ? styles.animatedTransform(transform) : null,
        opacity != null ? styles.animatedOpacity(opacity) : null
      ]}
    />
  );
}

export component AnimatedSpan(
  animatedStyle?: AnimatedStyleValue<AnimatedNodeType>,
  ref?: React.RefSetter<React.RefOf<html.span>>,
  style as incomingStyle?: React.PropsOf<html.span>['style'],
  ...restProps: Omit<React.PropsOf<html.span>, 'style'>
) {
  const [{ opacity, transform }, animatedRefSetter] =
    useAnimatedStyle<HTMLSpanElement | null>(animatedStyle, ref);
  return (
    <html.span
      {...restProps}
      ref={animatedRefSetter}
      style={[
        incomingStyle,
        transform != null ? styles.animatedTransform(transform) : null,
        opacity != null ? styles.animatedOpacity(opacity) : null
      ]}
    />
  );
}

export component AnimatedImg(
  animatedStyle?: AnimatedStyleValue<AnimatedNodeType>,
  ref?: React.RefSetter<React.RefOf<html.img>>,
  style as incomingStyle?: React.PropsOf<html.img>['style'],
  ...restProps: Omit<React.PropsOf<html.img>, 'style'>
) {
  const [{ opacity, transform }, animatedRefSetter] =
    useAnimatedStyle<HTMLImageElement | null>(animatedStyle, ref);
  return (
    <html.img
      {...restProps}
      ref={animatedRefSetter}
      style={[
        incomingStyle,
        transform != null ? styles.animatedTransform(transform) : null,
        opacity != null ? styles.animatedOpacity(opacity) : null
      ]}
    />
  );
}
