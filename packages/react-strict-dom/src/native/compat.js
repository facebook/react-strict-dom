/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { StrictProps } from '../types/StrictProps';
import type { StrictReactDOMProps } from '../types/StrictReactDOMProps';
import type { StrictReactDOMImageProps } from '../types/StrictReactDOMImageProps';
import type { StrictReactDOMInputProps } from '../types/StrictReactDOMInputProps';
import type { StrictReactDOMTextAreaProps } from '../types/StrictReactDOMTextAreaProps';

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

const StrictText: component(
  ref?: React.RefSetter<HTMLSpanElement>,
  ...StrictReactDOMProps
) = createStrictText<HTMLSpanElement, StrictReactDOMProps>(
  'span',
  defaultProps
);
const StrictInput: component(
  ref?: React.RefSetter<HTMLInputElement>,
  ...StrictReactDOMInputProps
) = createStrictTextInput<HTMLInputElement, StrictReactDOMInputProps>(
  'input',
  defaultProps
);
const StrictTextArea: component(
  ref?: React.RefSetter<HTMLTextAreaElement>,
  ...StrictReactDOMTextAreaProps
) = createStrictTextInput<HTMLTextAreaElement, StrictReactDOMTextAreaProps>(
  'textarea',
  defaultProps
);
const StrictImage: component(
  ref?: React.RefSetter<HTMLImageElement>,
  ...StrictReactDOMImageProps
) = createStrictImage<HTMLImageElement, StrictReactDOMImageProps>(
  'img',
  defaultProps
);
const Strict: component(
  ref?: React.RefSetter<HTMLDivElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLDivElement, StrictReactDOMProps>('div', defaultProps);

component Native<T>(...htmlProps: StrictPropsOnlyCompat<T>) {
  const { as, ...rest } = htmlProps;
  if (typeof rest.children !== 'function') {
    throw new Error(
      '<compat.native> requires the "children" prop to be a function.'
    );
  }
  // Untyped: dispatches across components with divergent prop types.
  let Component = Strict as $FlowFixMe;
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
