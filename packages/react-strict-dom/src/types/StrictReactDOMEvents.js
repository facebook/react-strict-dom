/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

/**
 * Event payloads shared by the web and native prop types. The concrete payloads
 * are the cross-platform subset the native factories construct (a strict subset
 * of web's `SyntheticEvent`); `StrictOpaqueEventHandler` is for pass-through
 * handlers whose runtime shape differs per platform.
 */

export type StrictChangeEvent = Readonly<{
  target: Readonly<{ value: string }>,
  type: 'change'
}>;

export type StrictInputEvent = Readonly<{
  target: Readonly<{ value: string }>,
  type: 'input'
}>;

// Platform extras are permitted.
export type StrictKeyEvent = Readonly<{ key: string, type: ?string, ... }>;

export type StrictClickEvent = Readonly<{|
  altKey: boolean,
  button: number,
  ctrlKey: boolean,
  defaultPrevented: boolean,
  getModifierState: (key: string) => boolean,
  metaKey: boolean,
  pageX: number,
  pageY: number,
  preventDefault: () => void,
  shiftKey: boolean,
  stopPropagation: () => void,
  type: 'click'
|}>;

export type StrictImageLoadEvent = Readonly<{
  target: Readonly<{ naturalHeight: ?number, naturalWidth: ?number }>,
  type: 'load'
}>;

export type StrictImageErrorEvent = Readonly<{
  type: 'error'
}>;

// Pass-through handlers receive the raw platform event (DOM event on web, nested
// RN synthetic event on native), so the param is `unknown`.
export type StrictOpaqueEventHandler = (event: unknown) => void;
