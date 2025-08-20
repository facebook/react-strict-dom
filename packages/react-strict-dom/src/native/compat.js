/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { StrictProps } from '../types/StrictProps';

import * as React from 'react';
// $FlowFixMe[nonstrict-import]
import { createStrictDOMComponent as createStrict } from './modules/createStrictDOMComponent';
// $FlowFixMe[nonstrict-import]
import { createStrictDOMImageComponent as createStrictImage } from './modules/createStrictDOMImageComponent';
// $FlowFixMe[nonstrict-import]
import { createStrictDOMTextComponent as createStrictText } from './modules/createStrictDOMTextComponent';
// $FlowFixMe[nonstrict-import]
import { createStrictDOMTextInputComponent as createStrictTextInput } from './modules/createStrictDOMTextInputComponent';

/**
 * Components for mixing React Native with React Strict DOM elements.
 * RSD props are translated to RN props, and RN elements are wrapped in the
 * necessary Context. This allows RSD component libraries to delegate to custom
 * RN elements while still exposing an RSD-compatible props API to consumers.
 *
 * <compat.native
 *   {...props}
 *   aria-label="label"
 *   as="text"
 * >
 *   {(nativeProps: React.PropsOf<Text>)) => (
 *     <Text {...nativeProps} />
 *   )}
 * </compat.native>
 */

const defaultProps = {};

type StrictPropsOnlyCompat<T> = {
  ...StrictProps,
  as?: 'div' | 'img' | 'input' | 'span' | 'textarea',
  children: (nativeProps: T) => React.Node
};

const StrictText = createStrictText('span', defaultProps);
const StrictInput = createStrictTextInput('input', defaultProps);
const StrictTextArea = createStrictTextInput('textarea', defaultProps);
const StrictImage = createStrictImage('img', defaultProps);
const Strict = createStrict('div', defaultProps);

component Native<T>(...htmlProps: StrictPropsOnlyCompat<T>) {
  const { as, ...rest } = htmlProps;
  if (typeof rest.children !== 'function') {
    throw new Error(
      '<compat.native> requires the "children" prop to be a function.'
    );
  }
  let Component = Strict;
  if (as === 'img') {
    Component = StrictImage;
  } else if (as === 'input') {
    Component = StrictInput;
  } else if (as === 'span') {
    Component = StrictText;
  } else if (as === 'textarea') {
    Component = StrictTextArea;
  } else if (as === 'div') {
    Component = Strict;
  }

  return <Component {...rest} />;
}

// eslint-disable-next-line no-unreachable
export const native = Native;
