/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { Styles } from './styles';
// import type { StrictEventTarget } from './StrictEventTarget';

type IDRef = string;

type AriaProps = $ReadOnly<{
  'aria-activedescendant'?: ?IDRef,
  'aria-atomic'?: ?boolean,
  'aria-autocomplete'?: ?('none' | 'inline' | 'list' | 'both'),
  'aria-busy'?: ?boolean,
  'aria-checked'?: ?(boolean | 'mixed'),
  'aria-colcount'?: ?number,
  'aria-colindex'?: ?number,
  'aria-colindextext'?: ?Stringish,
  'aria-colspan'?: ?number,
  'aria-controls'?: ?IDRef,
  'aria-current'?: ?(boolean | 'page' | 'step' | 'location' | 'date' | 'time'),
  'aria-describedby'?: ?IDRef,
  'aria-details'?: ?IDRef,
  'aria-disabled'?: ?boolean,
  'aria-errormessage'?: ?IDRef,
  'aria-expanded'?: ?boolean,
  'aria-flowto'?: ?IDRef,
  'aria-haspopup'?: ?('menu' | 'listbox' | 'tree' | 'grid' | 'dialog'),
  'aria-hidden'?: ?boolean,
  'aria-invalid'?: ?(boolean | 'grammar' | 'spelling'),
  'aria-keyshortcuts'?: ?string,
  'aria-label'?: ?Stringish,
  'aria-labelledby'?: ?IDRef,
  'aria-level'?: ?number,
  'aria-live'?: ?('off' | 'assertive' | 'polite'),
  'aria-modal'?: ?boolean,
  'aria-multiline'?: ?boolean,
  'aria-multiselectable'?: ?boolean,
  'aria-orientation'?: ?('horizontal' | 'vertical'),
  'aria-owns'?: ?IDRef,
  'aria-placeholder'?: ?Stringish,
  'aria-posinset'?: ?number,
  'aria-readonly'?: ?boolean,
  'aria-pressed'?: ?(boolean | 'mixed'),
  'aria-required'?: ?boolean,
  'aria-roledescription'?: ?Stringish,
  'aria-rowcount'?: ?number,
  'aria-rowindex'?: ?number,
  'aria-rowindextext'?: ?Stringish,
  'aria-rowspan'?: ?number,
  'aria-selected'?: ?boolean,
  'aria-setsize'?: ?number,
  'aria-sort'?: ?('none' | 'ascending' | 'descending' | 'other'),
  'aria-valuemax'?: ?number,
  'aria-valuemin'?: ?number,
  'aria-valuenow'?: ?number,
  'aria-valuetext'?: ?Stringish
}>;

// Excludes all abstract roles that should not be used by authors.
type AriaRole =
  | 'alert'
  | 'alertdialog'
  | 'application'
  | 'article'
  | 'banner'
  | 'blockquote'
  | 'button'
  | 'caption'
  | 'cell'
  | 'checkbox'
  | 'code'
  | 'columnheader'
  | 'combobox'
  | 'complementary'
  | 'contentinfo'
  | 'definition'
  | 'deletion'
  | 'dialog'
  | 'document'
  | 'emphasis'
  | 'feed'
  | 'figure'
  | 'form'
  | 'grid'
  | 'gridcell'
  | 'group'
  | 'heading'
  | 'img'
  | 'input'
  | 'insertion'
  | 'link'
  | 'list'
  | 'listbox'
  | 'listitem'
  | 'log'
  | 'main'
  | 'marquee'
  | 'math'
  | 'menu'
  | 'menubar'
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio'
  | 'meter'
  | 'navigation'
  | 'none'
  | 'note'
  | 'option'
  | 'paragraph'
  | 'progressbar'
  | 'radio'
  | 'radiogroup'
  | 'region'
  | 'row'
  | 'rowgroup'
  | 'rowheader'
  | 'scrollbar'
  | 'search'
  | 'searchbox'
  | 'separator'
  | 'slider'
  | 'spinbutton'
  | 'status'
  | 'strong'
  | 'subscript'
  | 'superscript'
  | 'switch'
  | 'tab'
  | 'table'
  | 'tablist'
  | 'tabpanel'
  | 'term'
  | 'textbox'
  | 'time'
  | 'timer'
  | 'toolbar'
  | 'tooltip'
  | 'tree'
  | 'treegrid'
  | 'treeitem';

export type AutoComplete = ?(
  | 'additional-name'
  | 'address-line1'
  | 'address-line2'
  | 'birthdate-day'
  | 'birthdate-full'
  | 'birthdate-month'
  | 'birthdate-year'
  | 'cc-csc'
  | 'cc-exp'
  | 'cc-exp-day'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-number'
  | 'cc-name'
  | 'cc-given-name'
  | 'cc-middle-name'
  | 'cc-family-name'
  | 'cc-type'
  | 'country'
  | 'current-password'
  | 'email'
  | 'family-name'
  | 'gender'
  | 'given-name'
  | 'honorific-prefix'
  | 'honorific-suffix'
  | 'name'
  | 'name-family'
  | 'name-given'
  | 'name-middle'
  | 'name-middle-initial'
  | 'name-prefix'
  | 'name-suffix'
  | 'new-password'
  | 'nickname'
  | 'on'
  | 'one-time-code'
  | 'organization'
  | 'organization-title'
  | 'password'
  | 'password-new'
  | 'postal-address'
  | 'postal-address-country'
  | 'postal-address-extended'
  | 'postal-address-extended-postal-code'
  | 'postal-address-locality'
  | 'postal-address-region'
  | 'postal-code'
  | 'street-address'
  | 'sms-otp'
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-device'
  | 'url'
  | 'username'
  | 'username-new'
  | 'off'
);

/*
type SyntheticEvent<+T> = $ReadOnly<{|
  ...T,
  bubbles: ?boolean,
  cancelable: ?boolean,
  currentTarget: ?StrictEventTarget,
  defaultPrevented: ?boolean,
  eventPhase: ?number,
  preventDefault: () => void,
  stopPropagation: () => void,
  isTrusted: ?boolean,
  srcEvent: T,
  target: ?StrictEventTarget,
  timeStamp: number,
  type: ?string,
|}>;
*/

type StrictClickEvent = $ReadOnly<{|
  altKey: boolean,
  button: number,
  ctrlKey: boolean,
  defaultPrevented: boolean,
  getModifierState: (string) => boolean,
  metaKey: boolean,
  pageX: number,
  pageY: number,
  preventDefault: () => void,
  shiftKey: boolean,
  stopPropagation: () => void,
  type: 'click'
|}>;

type EventProps = $ReadOnly<{
  onAuxClick?: $FlowFixMe,
  onBlur?: $FlowFixMe,
  onClick?: (StrictClickEvent) => void,
  onContextMenu?: $FlowFixMe,
  onCopy?: $FlowFixMe,
  onCut?: $FlowFixMe,
  onFocus?: $FlowFixMe,
  onFocusIn?: $FlowFixMe,
  onFocusOut?: $FlowFixMe,
  onFullscreenChange?: $FlowFixMe,
  onFullscreenError?: $FlowFixMe,
  onGotPointerCapture?: $FlowFixMe,
  onKeyDown?: ($ReadOnly<{ key: string, type: ?string, ... }>) => void,
  onKeyUp?: $FlowFixMe,
  onLostPointerCapture?: $FlowFixMe,
  onPaste?: $FlowFixMe,
  onPointerCancel?: $FlowFixMe,
  onPointerDown?: $FlowFixMe,
  onPointerEnter?: $FlowFixMe,
  onPointerLeave?: $FlowFixMe,
  onPointerMove?: $FlowFixMe,
  onPointerOut?: $FlowFixMe,
  onPointerOver?: $FlowFixMe,
  onPointerUp?: $FlowFixMe,
  onScroll?: $FlowFixMe,
  onWheel?: $FlowFixMe,
  onMouseDown?: $FlowFixMe, // TEMP
  onMouseEnter?: $FlowFixMe, // TEMP
  onMouseLeave?: $FlowFixMe, // TEMP
  onMouseMove?: $FlowFixMe, // TEMP
  onMouseOut?: $FlowFixMe, // TEMP
  onMouseOver?: $FlowFixMe, // TEMP
  onMouseUp?: $FlowFixMe, // TEMP
  onTouchCancel?: $FlowFixMe, // TEMP
  onTouchStart?: $FlowFixMe, // TEMP
  onTouchEnd?: $FlowFixMe, // TEMP
  onTouchMove?: $FlowFixMe // TEMP
}>;

export type StrictReactDOMProps = $ReadOnly<{
  ...AriaProps,
  ...EventProps,
  ...ReactStrictDOMDataProps,
  autoCapitalize?: ?(
    | 'off'
    | 'none'
    | 'on'
    | 'sentences'
    | 'words'
    | 'characters'
  ),
  autoFocus?: ?boolean,
  children?: React$Node,
  'data-testid'?: ?string,
  dir?: ?('auto' | 'ltr' | 'rtl'),
  elementTiming?: ?string,
  enterKeyHint?: ?(
    | 'enter'
    | 'done'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send'
  ),
  hidden?: ?(true | 'hidden' | 'until-found'),
  id?: ?string,
  inert?: ?boolean,
  inputMode?: ?(
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search'
  ),
  lang?: ?string,
  role?: ?AriaRole,
  spellCheck?: ?boolean,
  style?: ?Styles,
  suppressHydrationWarning?: ?boolean,
  tabIndex?: ?(0 | -1)
}>;
