/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import * as React from 'react';

type Value = ?number;

const defaultContext = null;

export const CSSFontSizeContext: React$Context<Value> =
  React.createContext(defaultContext);

if (__DEV__) {
  CSSFontSizeContext.displayName = 'CSSFontSize';
}
