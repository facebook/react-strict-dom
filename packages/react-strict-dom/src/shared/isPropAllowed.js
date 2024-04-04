/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

const strictAttributeSet: Set<string> = new Set([
  'alt', // img
  'aria-activedescendant',
  'aria-atomic',
  'aria-autocomplete',
  'aria-busy',
  'aria-checked',
  'aria-colcount',
  'aria-colindex',
  'aria-colindextext',
  'aria-colspan',
  'aria-controls',
  'aria-current',
  'aria-describedby',
  'aria-details',
  'aria-disabled',
  'aria-errormessage',
  'aria-expanded',
  'aria-flowto',
  'aria-haspopup',
  'aria-hidden',
  'aria-invalid',
  'aria-keyshortcuts',
  'aria-label',
  'aria-labelledby',
  'aria-level',
  'aria-live',
  'aria-modal',
  'aria-multiline',
  'aria-multiselectable',
  'aria-orientation',
  'aria-owns',
  'aria-placeholder',
  'aria-posinset',
  'aria-pressed',
  'aria-readonly',
  'aria-required',
  'aria-roledescription',
  'aria-rowcount',
  'aria-rowindex',
  'aria-rowindextext',
  'aria-rowspan',
  'aria-selected',
  'aria-setsize',
  'aria-sort',
  'aria-valuemax',
  'aria-valuemin',
  'aria-valuenow',
  'aria-valuetext',
  'autoCapitalize',
  'autoComplete',
  'autoFocus',
  'checked', // input
  'children',
  'crossOrigin', // img
  'decoding', // img
  'defaultChecked', // input
  'defaultValue', // input, textarea
  'dir',
  'disabled', // button, input, textarea
  'download', // a
  'draggable', // img
  'elementTiming',
  'enterKeyHint',
  'fetchPriority', // img
  'for', // label
  'height', // img
  'hidden',
  'href', // a
  'id',
  'inert',
  'inputMode',
  'label', // option, optgroup
  'lang',
  'loading', // img
  'max', // input
  'maxLength', // input, textarea
  'min', // input
  'minLength', // input, textarea
  'multiple', // input, select
  'onAuxClick',
  'onBeforeInput', // input, select, textarea
  'onBlur',
  'onChange', // input, select, textarea
  'onClick',
  'onContextMenu',
  'onCopy',
  'onCut',
  'onError', // img
  'onFocus',
  'onFocusIn',
  'onFocusOut',
  'onFullscreenChange',
  'onFullscreenError',
  'onGotPointerCapture',
  'onInput', // input, select, textarea
  'onInvalid', // input, select, textarea
  'onKeyDown',
  'onKeyUp',
  'onLoad', // img
  'onLostPointerCapture',
  'onPaste',
  'onPointerCancel',
  'onPointerDown',
  'onPointerEnter',
  'onPointerLeave',
  'onPointerMove',
  'onPointerOut',
  'onPointerOver',
  'onPointerUp',
  'onScroll',
  'onSelect', // input, select, textarea
  'onSelectionChange', // input, textarea
  'onWheel',
  'placeholder', // input, textarea
  'readOnly', // input, textarea
  'referrerPolicy', // a, img
  'rel', // a
  'required', // input, select, textarea
  'role',
  'rows', // textarea
  'selected', // option
  'spellCheck',
  'src', // img
  'srcSet', // img
  'step', // input
  'style',
  'suppressHydrationWarning',
  'tabIndex',
  'target', // a
  'type', // button, input
  'value', // input
  'width', // img

  'onMouseDown', // TEMPORARY
  'onMouseEnter', // TEMPORARY
  'onMouseLeave', // TEMPORARY
  'onMouseMove', // TEMPORARY
  'onMouseOut', // TEMPORARY
  'onMouseOver', // TEMPORARY
  'onMouseUp', // TEMPORARY
  'onTouchCancel', // TEMPORARY
  'onTouchEnd', // TEMPORARY
  'onTouchMove', // TEMPORARY
  'onTouchStart' // TEMPORARY
]);

export function isPropAllowed(key: string): boolean {
  return strictAttributeSet.has(key) || key.indexOf('data-') > -1;
}
