/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { StrictReactDOMProps } from './StrictReactDOMProps';

export type StrictReactDOMSelectProps = {|
  ...StrictReactDOMProps,
  multiple?: boolean,
  required?: boolean,
  // $FlowFixMe
  onBeforeInput?: any,
  // $FlowFixMe
  onChange?: any,
  // $FlowFixMe
  onInput?: any,
  // $FlowFixMe
  onInvalid?: any,
  // $FlowFixMe
  onSelect?: any
|};
