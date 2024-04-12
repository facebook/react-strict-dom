/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { StrictReactDOMProps } from './StrictReactDOMProps';

export type StrictReactDOMInputProps = $ReadOnly<{
  ...StrictReactDOMProps,
  checked?: boolean | 'mixed',
  defaultChecked?: boolean,
  defaultValue?: Stringish,
  disabled?: boolean,
  max?: string | number,
  maxLength?: number,
  min?: string | number,
  minLength?: number,
  multiple?: boolean,
  onBeforeInput?: $FlowFixMe,
  onChange?: $FlowFixMe,
  onInput?: $FlowFixMe,
  onInvalid?: $FlowFixMe,
  onSelect?: $FlowFixMe,
  onSelectionChange?: $FlowFixMe,
  placeholder?: Stringish,
  readOnly?: number,
  required?: number,
  step?: number | 'any',
  type?:
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week',
  value?: Stringish | boolean | number
}>;
