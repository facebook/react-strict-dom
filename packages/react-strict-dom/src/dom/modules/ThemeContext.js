/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import * as React from 'react';

type ProviderValue = {
  customProperties: { +[string]: ?string | number }
};

type ProviderProps = {
  ...ProviderValue,
  children: React$MixedElement
};

const defaultContext = {
  customProperties: {}
};

export const ThemeContext: React$Context<ProviderValue> =
  React.createContext(defaultContext);

export function ThemeProvider(props: ProviderProps): React$MixedElement {
  const { children, customProperties } = props;

  return customProperties ? (
    <ThemeContext.Provider
      children={children}
      value={{
        customProperties
      }}
    />
  ) : (
    children
  );
}
