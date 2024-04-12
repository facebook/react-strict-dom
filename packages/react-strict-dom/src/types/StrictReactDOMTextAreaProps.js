/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { StrictReactDOMProps } from './StrictReactDOMProps';

export type StrictReactDOMTextAreaProps = $ReadOnly<{
  ...StrictReactDOMProps,
  defaultValue?: Stringish,
  disabled?: boolean,
  maxLength?: number,
  minLength?: number,
  onBeforeInput?: $FlowFixMe,
  onChange?: $FlowFixMe,
  onInput?: $FlowFixMe,
  onInvalid?: $FlowFixMe,
  onSelect?: $FlowFixMe,
  onSelectionChange?: $FlowFixMe,
  placeholder?: Stringish,
  readOnly?: boolean,
  required?: boolean,
  rows?: number,
  value?: Stringish
}>;
