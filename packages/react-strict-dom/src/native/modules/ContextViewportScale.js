/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import * as React from 'react';
import * as ReactNative from '../react-native';

type Value = $ReadOnly<{
  scale: number
}>;

type ProviderProps = $ReadOnly<{
  children: React.Node,
  viewportWidth: number
}>;

const defaultContext = { scale: 1 };
const ContextViewportScale: React.Context<Value> =
  React.createContext(defaultContext);

if (__DEV__) {
  ContextViewportScale.displayName = 'ContextViewportScale';
}

export function ProvideViewportScale({
  viewportWidth: logicalViewportWidth,
  children
}: ProviderProps): React.Node {
  const { width: viewportWidth } = ReactNative.useWindowDimensions();

  const viewportScale = React.useMemo(
    () => ({
      scale: viewportWidth / logicalViewportWidth
    }),
    [logicalViewportWidth, viewportWidth]
  );

  return (
    <ContextViewportScale.Provider value={viewportScale}>
      {children}
    </ContextViewportScale.Provider>
  );
}

export function useViewportScale(): Value {
  return React.useContext(ContextViewportScale);
}
