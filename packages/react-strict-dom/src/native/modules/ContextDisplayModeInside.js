/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import * as React from 'react';

type Value = 'flow' | 'flex';

const defaultContext = 'flow';
const ContextDisplayModeInside: React$Context<Value> =
  React.createContext(defaultContext);

if (__DEV__) {
  ContextDisplayModeInside.displayName = 'ContextDisplayModeInside';
}

export const DisplayModeInsideProvider = ContextDisplayModeInside.Provider;

export function useDisplayModeInside(): Value {
  const context = React.useContext(ContextDisplayModeInside);
  return context;
}
