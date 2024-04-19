/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { Styles } from './styles';

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

type StrictClickEvent = $ReadOnly<{
  altKey: boolean,
  button: number,
  ctrlKey: boolean,
  getModifierState: (string) => boolean,
  metaKey: boolean,
  pageX: number,
  pageY: number,
  preventDefault: () => void,
  shiftKey: boolean,
  stopPropagation: () => void,
  type: 'click'
}>;

type EventProps = $ReadOnly<{
  onAuxClick?: (SyntheticEvent<>) => void,
  onBlur?: (SyntheticEvent<>) => void,
  onClick?: (StrictClickEvent) => void,
  onContextMenu?: (SyntheticEvent<>) => void,
  onCopy?: (SyntheticEvent<>) => void,
  onCut?: (SyntheticEvent<>) => void,
  onFocus?: (SyntheticEvent<>) => void,
  onFocusIn?: (SyntheticEvent<>) => void,
  onFocusOut?: (SyntheticEvent<>) => void,
  onFullscreenChange?: (SyntheticEvent<>) => void,
  onFullscreenError?: (SyntheticEvent<>) => void,
  onGotPointerCapture?: (SyntheticEvent<>) => void,
  onKeyDown?: ($ReadOnly<{ key: string, type: 'keydown', ... }>) => void,
  onKeyUp?: (SyntheticEvent<>) => void,
  onLostPointerCapture?: (SyntheticEvent<>) => void,
  onPaste?: (SyntheticEvent<>) => void,
  onPointerCancel?: (SyntheticEvent<>) => void,
  onPointerDown?: (SyntheticEvent<>) => void,
  onPointerEnter?: (SyntheticEvent<>) => void,
  onPointerLeave?: (SyntheticEvent<>) => void,
  onPointerMove?: (SyntheticEvent<>) => void,
  onPointerOut?: (SyntheticEvent<>) => void,
  onPointerOver?: (SyntheticEvent<>) => void,
  onPointerUp?: (SyntheticEvent<>) => void,
  onScroll?: (SyntheticEvent<>) => void,
  onWheel?: (SyntheticEvent<>) => void,
  onMouseDown?: (SyntheticEvent<>) => void, // TEMP
  onMouseEnter?: (SyntheticEvent<>) => void, // TEMP
  onMouseLeave?: (SyntheticEvent<>) => void, // TEMP
  onMouseMove?: (SyntheticEvent<>) => void, // TEMP
  onMouseOut?: (SyntheticEvent<>) => void, // TEMP
  onMouseOver?: (SyntheticEvent<>) => void, // TEMP
  onMouseUp?: (SyntheticEvent<>) => void, // TEMP
  onTouchCancel?: (SyntheticEvent<>) => void, // TEMP
  onTouchStart?: (SyntheticEvent<>) => void, // TEMP
  onTouchEnd?: (SyntheticEvent<>) => void, // TEMP
  onTouchMove?: (SyntheticEvent<>) => void // TEMP
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
