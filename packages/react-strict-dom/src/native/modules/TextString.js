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
import { useStyleProps } from './useStyleProps';

type Props = $ReadOnly<{|
  children: string
|}>;

export function TextString(props: Props): React$MixedElement {
  const { children } = props;

  const customProperties = useCustomProperties();

  const { nativeProps } = useStyleProps(null, {
    customProperties,
    provideInheritableStyle: false,
    withInheritedStyle: true,
    withTextStyle: true
  });

  return (
    // $FlowFixMe
    <Text {...nativeProps} children={children} />
  );
}
