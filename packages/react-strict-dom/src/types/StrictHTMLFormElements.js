/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { StrictHTMLCollection } from './StrictHTMLCollection';
import type { StrictHTMLElement } from './StrictHTMLElement';

type SelectionDirection = 'backward' | 'forward' | 'none';

interface SelectionProperties {
  selectionEnd: number;
  selectionStart: number;
  selectionDirection: SelectionDirection;

  // methods
  select(): void;
  setSelectionRange(
    selectionStart: number,
    selectionEnd: number,
    selectionDirection?: SelectionDirection
  ): void;
}

export interface StrictHTMLInputElement
  extends StrictHTMLElement,
    SelectionProperties {
  value: string;

  showPicker(): void;
}

export interface StrictHTMLOptionElement extends StrictHTMLElement {
  defaultSelected: boolean;
  disabled: boolean;
  +index: number;
  +label: string;
  +selected: boolean;
  +text: string;
  value: string;
}

export interface StrictHTMLSelectElement extends StrictHTMLElement {
  +selectedIndex: number;
  +selectedOptions: StrictHTMLCollection<StrictHTMLOptionElement>;
}

export interface StrictHTMLTextAreaElement
  extends StrictHTMLElement,
    SelectionProperties {
  value: string;
}
