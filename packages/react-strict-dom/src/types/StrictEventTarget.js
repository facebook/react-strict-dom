/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

// Animation

export type AnimationProgressEventTypes = 'cancel' | 'finish' | 'remove';
export interface AnimationProgressEvent extends Event {
  +currentTime: number;
  +timelineTime: number;
}
type AnimationProgressEventHandler = (event: AnimationProgressEvent) => mixed;
type AnimationProgressEventListener =
  | { handleEvent: AnimationProgressEventHandler, ... }
  | AnimationProgressEventHandler;

export interface StrictAnimationProgressEventTarget {
  addEventListener(
    type: AnimationProgressEventTypes,
    listener: AnimationProgressEventListener,
    optionsOrUseCapture?: EventListenerOptionsOrUseCapture
  ): void;
}

// Clipboard

export interface StrictClipboardEventTarget {
  addEventListener(
    type: ClipboardEventTypes,
    listener: ClipboardEventListener,
    optionsOrUseCapture?: EventListenerOptionsOrUseCapture
  ): void;
  removeEventListener(
    type: ClipboardEventTypes,
    listener: ClipboardEventListener,
    optionsOrUseCapture?: EventListenerOptionsOrUseCapture
  ): void;
}

// Focus

export interface StrictFocusEventTarget {
  addEventListener(
    type: FocusEventTypes,
    listener: FocusEventListener,
    optionsOrUseCapture?: EventListenerOptionsOrUseCapture
  ): void;
  removeEventListener(
    type: FocusEventTypes,
    listener: FocusEventListener,
    optionsOrUseCapture?: EventListenerOptionsOrUseCapture
  ): void;
}

// Input

export interface StrictInputEventTarget {
  addEventListener(
    type: InputEventTypes,
    listener: InputEventListener,
    optionsOrUseCapture?: EventListenerOptionsOrUseCapture
  ): void;
  removeEventListener(
    type: InputEventTypes,
    listener: InputEventListener,
    optionsOrUseCapture?: EventListenerOptionsOrUseCapture
  ): void;
}

// Keyboard

export interface StrictKeyboardEventTarget {
  addEventListener(
    type: KeyboardEventTypes,
    listener: KeyboardEventListener,
    optionsOrUseCapture?: EventListenerOptionsOrUseCapture
  ): void;
  removeEventListener(
    type: KeyboardEventTypes,
    listener: KeyboardEventListener,
    optionsOrUseCapture?: EventListenerOptionsOrUseCapture
  ): void;
}

// Pointer

export interface StrictPointerEventTarget {
  addEventListener(
    type: PointerEventTypes,
    listener: PointerEventListener,
    optionsOrUseCapture?: EventListenerOptionsOrUseCapture
  ): void;
  removeEventListener(
    type: PointerEventTypes,
    listener: PointerEventListener,
    optionsOrUseCapture?: EventListenerOptionsOrUseCapture
  ): void;
}

// Wheel

export interface StrictWheelEventTarget {
  addEventListener(
    type: WheelEventTypes,
    listener: WheelEventListener,
    optionsOrUseCapture?: EventListenerOptionsOrUseCapture
  ): void;
  removeEventListener(
    type: WheelEventTypes,
    listener: WheelEventListener,
    optionsOrUseCapture?: EventListenerOptionsOrUseCapture
  ): void;
}

// TEMPORARY: Mouse

export interface StrictMouseEventTarget {
  addEventListener(
    type: MouseEventTypes,
    listener: MouseEventListener,
    optionsOrUseCapture?: EventListenerOptionsOrUseCapture
  ): void;
  removeEventListener(
    type: MouseEventTypes,
    listener: MouseEventListener,
    optionsOrUseCapture?: EventListenerOptionsOrUseCapture
  ): void;
}

// TEMPORARY: Touch

export interface StrictTouchEventTarget {
  addEventListener(
    type: TouchEventTypes,
    listener: TouchEventListener,
    optionsOrUseCapture?: EventListenerOptionsOrUseCapture
  ): void;
  removeEventListener(
    type: TouchEventTypes,
    listener: TouchEventListener,
    optionsOrUseCapture?: EventListenerOptionsOrUseCapture
  ): void;
}

// TODO: Figure out the actual types needed.
export interface StrictEventTarget
  // TODO: Uncomment after D48380371
  // StrictAnimationProgressEventTarget,
  extends StrictClipboardEventTarget,
    StrictFocusEventTarget,
    StrictInputEventTarget,
    StrictKeyboardEventTarget,
    StrictPointerEventTarget,
    StrictWheelEventTarget,
    StrictMouseEventTarget,
    StrictTouchEventTarget {}

// Unsupported Event Types
// =======================
// - AbortProgressEventTypes
// - ProgressEventTypes
// - DragEventTypes
// - TransitionEventTypes
// - MessageEventTypes
// - BeforeUnloadEventTypes
// - StorageEventTypes
// - string
// - AnimationEventTypes
// - AnimationEventTypes
// - AbortProgressEventTypes
// - ProgressEventTypes
// - DragEventTypes
// - TransitionEventTypes
// - MessageEventTypes
// - BeforeUnloadEventTypes
// - StorageEventTypes
