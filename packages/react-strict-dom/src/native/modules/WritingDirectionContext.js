/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import * as React from 'react';

type WritingDirectionValue = ?('ltr' | 'rtl');

const defaultContext = 'ltr';

export const WritingDirectionContext: React$Context<WritingDirectionValue> =
  React.createContext(defaultContext);
