/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { StrictReactDOMProps } from './StrictReactDOMProps';

export type StrictReactDOMImageProps = $ReadOnly<{
  ...StrictReactDOMProps,
  alt?: ?Stringish,
  crossOrigin?: ?('anonymous' | 'use-credentials'),
  decoding?: ?('async' | 'auto' | 'sync'),
  draggable?: ?boolean,
  fetchPriority?: ?('high' | 'low' | 'auto'),
  height?: number,
  loading?: ?('eager' | 'lazy'),
  onError?: $FlowFixMe,
  onLoad?: $FlowFixMe,
  referrerPolicy?: ?(
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url'
  ),
  src?: string,
  srcSet?: string,
  width?: number
}>;
