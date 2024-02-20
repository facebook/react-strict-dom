/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { StrictNode } from './StrictNode';

export interface StrictElement extends StrictNode {
  // properties
  +clientHeight: number;
  +clientLeft: number;
  +clientTop: number;
  +clientWidth: number;
  +firstElementChild: ?StrictElement;
  id: string;
  +lastElementChild: ?StrictElement;
  +nextElementSibling: ?StrictElement;
  +previousElementSibling: ?StrictElement;
  +scrollHeight: number;
  scrollLeft: number;
  scrollTop: number;
  +scrollWidth: number;
  +tagName: string;

  // methods
  // TODO: This means we have to use the native `Event` type in RN.
  dispatchEvent(event: Event): boolean;
  getAttribute(name?: string): ?string;
  getBoundingClientRect(): ClientRect;
  getClientRects(): $ReadOnlyArray<ClientRect>;
  hasAttribute(name: string): boolean;
  releasePointerCapture(pointerId: number): void;
  requestFullscreen(options?: {
    navigationUI: 'auto' | 'show' | 'hide',
    ...
  }): Promise<void>;
  scrollIntoView(
    arg?:
      | boolean
      | {
          behavior?: 'auto' | 'instant' | 'smooth',
          block?: 'start' | 'center' | 'end' | 'nearest',
          inline?: 'start' | 'center' | 'end' | 'nearest',
          ...
        }
  ): void;
  scroll(x: number, y: number): void;
  scroll(options: ScrollToOptions): void;
  scrollTo(x: number, y: number): void;
  scrollTo(options: ScrollToOptions): void;
  scrollBy(x: number, y: number): void;
  scrollBy(options: ScrollToOptions): void;
  setPointerCapture(pointerId: number): void;
  hasPointerCapture(pointerId: PointerEvent['pointerId']): boolean;
}
