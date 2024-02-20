/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { Style } from '../../types/styles';

import * as React from 'react';

type ProviderValue = ?Style;

const defaultContext: ProviderValue = {};

export const InheritableStyleContext: React$Context<ProviderValue> =
  React.createContext(defaultContext);
