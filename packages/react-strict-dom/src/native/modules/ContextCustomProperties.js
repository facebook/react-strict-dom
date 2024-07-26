/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { CustomProperties } from '../../types/styles';

import * as React from 'react';
import { __customProperties } from '../stylex';

const defaultContext = __customProperties;
const ContextCustomProperties: React$Context<CustomProperties> =
  React.createContext(defaultContext);

if (__DEV__) {
  ContextCustomProperties.displayName = 'ContextCustomProperties';
}

export const ProvideCustomProperties = ContextCustomProperties.Provider;

export function useCustomProperties(
  customPropertiesFromThemes: ?CustomProperties
): CustomProperties {
  const inheritedCustomProperties = React.useContext(ContextCustomProperties);
  if (customPropertiesFromThemes == null) {
    return inheritedCustomProperties;
  }
  // TODO: optimize
  const customProperties = Object.assign(
    {},
    inheritedCustomProperties,
    customPropertiesFromThemes
  );
  return customProperties;
}
