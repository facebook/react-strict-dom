/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { AutoComplete, StrictReactDOMProps } from './StrictReactDOMProps';
import type {
  StrictChangeEvent,
  StrictInputEvent,
  StrictOpaqueEventHandler
} from './StrictReactDOMEvents';

export type StrictReactDOMInputProps = Readonly<{
  ...StrictReactDOMProps,
  autoComplete?: AutoComplete,
  checked?: ?(boolean | 'mixed'),
  defaultChecked?: ?boolean,
  defaultValue?: ?Stringish,
  disabled?: ?boolean,
  max?: ?(string | number),
  maxLength?: ?number,
  min?: ?(string | number),
  minLength?: ?number,
  multiple?: ?boolean,
  name?: ?string,
  onBeforeInput?: StrictOpaqueEventHandler,
  onChange?: (event: StrictChangeEvent) => void,
  onInput?: (event: StrictInputEvent) => void,
  onInvalid?: StrictOpaqueEventHandler,
  onSelect?: StrictOpaqueEventHandler,
  onSelectionChange?: StrictOpaqueEventHandler,
  placeholder?: ?Stringish,
  readOnly?: ?boolean,
  required?: ?boolean,
  step?: ?(number | 'any'),
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
  value?: ?Stringish
}>;
