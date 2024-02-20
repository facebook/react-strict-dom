/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { StrictReactDOMProps } from './StrictReactDOMProps';

export type StrictReactDOMTextAreaProps = {|
  ...StrictReactDOMProps,
  defaultValue?: Stringish,
  disabled?: boolean,
  maxLength?: number,
  minLength?: number,
  // $FlowFixMe
  onBeforeInput?: any,
  // $FlowFixMe
  onChange?: any,
  // $FlowFixMe
  onInput?: any,
  // $FlowFixMe
  onInvalid?: any,
  // $FlowFixMe
  onSelect?: any,
  // $FlowFixMe
  onSelectionChange?: any,
  placeholder?: Stringish,
  readOnly?: boolean,
  required?: boolean,
  rows?: number,
  value?: Stringish
|};
