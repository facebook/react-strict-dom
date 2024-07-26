/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { Style } from '../../types/styles';

import * as React from 'react';
import { flattenStyle } from './flattenStyle';

type Value = Style;

type ProviderProps = $ReadOnly<{
  children: React$MixedElement,
  value: Value
}>;

const defaultContext = {};
const ContextInheritedStyles: React$Context<Value> =
  React.createContext(defaultContext);

if (__DEV__) {
  ContextInheritedStyles.displayName = 'ContextInheritedStyles';
}

// We do some special-casing to compute inherited fontSize.
// The 'em' unit polyfill in stylex assumes the inherited fontSize is always a computed number.
export function ProvideInheritedStyles(
  props: ProviderProps
): React$MixedElement {
  const { children, value } = props;
  const inheritedStyles = useInheritedStyles();
  const flatStyle = flattenStyle([inheritedStyles as ?Style, value as ?Style]);

  return (
    <ContextInheritedStyles.Provider children={children} value={flatStyle} />
  );
}

export function useInheritedStyles(): Value {
  return React.useContext(ContextInheritedStyles);
}
