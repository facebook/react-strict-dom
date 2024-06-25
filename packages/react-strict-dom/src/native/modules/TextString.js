/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import * as React from 'react';
import { Text } from 'react-native';
import { useCustomProperties } from './ContextCustomProperties';
import { useInheritedStyles } from './ContextInheritedStyles';
import { useStyleProps } from './useStyleProps';

type Props = $ReadOnly<{|
  children: string,
  hover: boolean
|}>;

export function TextString(props: Props): React$MixedElement {
  const { children, hover } = props;

  const customProperties = useCustomProperties();
  const inheritedStyles: $FlowFixMe = useInheritedStyles();
  const inheritedFontSize =
    typeof inheritedStyles?.fontSize === 'number'
      ? inheritedStyles?.fontSize
      : undefined;

  const styleProps = useStyleProps(inheritedStyles, {
    customProperties,
    hover,
    inheritedFontSize: inheritedFontSize
  });

  return (
    // $FlowFixMe
    <Text {...styleProps} children={children} />
  );
}
