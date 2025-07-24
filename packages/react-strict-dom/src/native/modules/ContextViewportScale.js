/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import React from 'react';

type ViewportScale = $ReadOnly<{
  scale: number
}>;

const ContextViewportScale: React.Context<ViewportScale> = React.createContext({
  scale: 1
});

if (__DEV__) {
  ContextViewportScale.displayName = 'ContextViewportScale';
}

export const ProvideViewportScale = ContextViewportScale.Provider;

export function useViewportScale(): ViewportScale {
  return React.useContext(ContextViewportScale);
}
