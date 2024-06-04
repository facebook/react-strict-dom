/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import * as React from 'react';
import { __customProperties } from '../stylex';

type Value = $ReadOnly<{ [string]: string | number }>;

const defaultContext = __customProperties;
const ContextCustomProperties: React$Context<Value> =
  React.createContext(defaultContext);

if (__DEV__) {
  ContextCustomProperties.displayName = 'ContextCustomProperties';
}

export const CustomPropertiesProvider = ContextCustomProperties.Provider;

export function useCustomProperties(): Value {
  const context = React.useContext(ContextCustomProperties);
  return context;
}
