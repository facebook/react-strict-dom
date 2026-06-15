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

export type StrictReactDOMTextAreaProps = Readonly<{
  ...StrictReactDOMProps,
  autoComplete?: AutoComplete,
  defaultValue?: ?Stringish,
  disabled?: ?boolean,
  maxLength?: ?number,
  minLength?: ?number,
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
  rows?: ?number,
  value?: ?Stringish
}>;
