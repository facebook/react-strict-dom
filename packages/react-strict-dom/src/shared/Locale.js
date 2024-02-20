/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { Node } from 'react';

import React, { createContext } from 'react';
import { getLocaleDirection } from './getLocaleDirection';

type LocaleValue = string;
type WritingDirection = 'ltr' | 'rtl' | void;

type ContextValue = {
  // Locale writing direction.
  direction: WritingDirection,
  // Locale BCP47 language code: https://www.ietf.org/rfc/bcp/bcp47.txt
  locale: ?LocaleValue
};

type ProviderProps = {
  ...ContextValue,
  children: Node
};

const defaultContext = {
  direction: 'ltr',
  locale: 'en-US'
};

const Context: React$Context<ContextValue> = createContext(defaultContext);

function Provider(props: ProviderProps): Node {
  const { direction: directionProp, locale, children } = props;
  const needsContext = directionProp != null || locale != null;

  return needsContext ? (
    <Context.Provider
      children={children}
      value={{
        direction: locale != null ? getLocaleDirection(locale) : directionProp,
        locale
      }}
    />
  ) : (
    children
  );
}

export const Locale = { Context, Provider };
