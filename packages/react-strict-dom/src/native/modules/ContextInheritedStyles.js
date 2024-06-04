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
import { CSSLengthUnitValue } from '../stylex/CSSLengthUnitValue';
import { PixelRatio, useWindowDimensions } from 'react-native';
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
export function InheritedStylesProvider(
  props: ProviderProps
): React$MixedElement {
  const { children, value } = props;
  const inheritedStyles = useInheritedStyles();
  const inheritedFontSize = inheritedStyles?.fontSize;
  const valueFontSize = value?.fontSize;

  const { height: viewportHeight, width: viewportWidth } =
    useWindowDimensions();

  let computedFontSize = null;
  if (valueFontSize instanceof CSSLengthUnitValue) {
    computedFontSize = valueFontSize.resolvePixelValue({
      viewportHeight,
      viewportWidth,
      fontScale: PixelRatio.getFontScale(),
      inheritedFontSize: inheritedFontSize
    });
  } else {
    computedFontSize = valueFontSize || inheritedFontSize;
  }

  const flatStyle = flattenStyle([
    inheritedStyles as ?Style,
    value as ?Style,
    computedFontSize != null && { fontSize: computedFontSize }
  ]);

  return (
    <ContextInheritedStyles.Provider children={children} value={flatStyle} />
  );
}

export function useInheritedStyles(): Value {
  return React.useContext(ContextInheritedStyles);
}
