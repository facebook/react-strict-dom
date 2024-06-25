/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { CustomProperties, Style } from '../../types/styles';

import * as React from 'react';
import { flattenStyle } from './flattenStyle';
import { useStyleProps } from './useStyleProps';

type Value = Style;

type ProviderProps = $ReadOnly<{
  children: React$MixedElement,
  customProperties: ?CustomProperties,
  hover: boolean,
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
export function InheritedStylesProvider(
  props: ProviderProps
): React$MixedElement {
  const { children, customProperties, hover, value } = props;
  const valueFontSize = value?.fontSize;

  const inheritedStyles = useInheritedStyles();
  const inheritedFontSize = inheritedStyles?.fontSize;

  const computedFontSize = useStyleProps(
    { fontSize: valueFontSize } as $FlowFixMe,
    {
      customProperties,
      hover,
      // $FlowFixMe
      inheritedFontSize
    }
  ).style?.fontSize;

  const fontStyle = computedFontSize != null && { fontSize: computedFontSize };

  const flatStyle = flattenStyle([
    inheritedStyles as ?Style,
    value as ?Style,
    fontStyle as $FlowFixMe
  ]);

  return (
    <ContextInheritedStyles.Provider children={children} value={flatStyle} />
  );
}

export function useInheritedStyles(): Value {
  return React.useContext(ContextInheritedStyles);
}
