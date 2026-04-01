/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { StrictReactDOMProps } from '../types/StrictReactDOMProps';
import type { StrictReactDOMAnchorProps } from '../types/StrictReactDOMAnchorProps';
import type { StrictReactDOMButtonProps } from '../types/StrictReactDOMButtonProps';
import type { StrictReactDOMImageProps } from '../types/StrictReactDOMImageProps';
import type { StrictReactDOMInputProps } from '../types/StrictReactDOMInputProps';
import type { StrictReactDOMLabelProps } from '../types/StrictReactDOMLabelProps';
import type { StrictReactDOMListItemProps } from '../types/StrictReactDOMListItemProps';
import type { StrictReactDOMOptionProps } from '../types/StrictReactDOMOptionProps';
import type { StrictReactDOMOptionGroupProps } from '../types/StrictReactDOMOptionGroupProps';
import type { StrictReactDOMSelectProps } from '../types/StrictReactDOMSelectProps';
import type { StrictReactDOMTextAreaProps } from '../types/StrictReactDOMTextAreaProps';

// $FlowFixMe[nonstrict-import]
import { createStrictDOMComponent as createStrict } from './modules/createStrictDOMComponent';
// $FlowFixMe[nonstrict-import]
import { createStrictDOMImageComponent as createStrictImage } from './modules/createStrictDOMImageComponent';
// $FlowFixMe[nonstrict-import]
import { createStrictDOMTextComponent as createStrictText } from './modules/createStrictDOMTextComponent';
// $FlowFixMe[nonstrict-import]
import { createStrictDOMTextInputComponent as createStrictTextInput } from './modules/createStrictDOMTextInputComponent';
// $FlowFixMe[nonstrict-import]
import * as ReactNative from './react-native';
import * as css from './css';

const styles = css.create({
  defaults: {
    // Default styles on web but missing in React Native
    boxSizing: 'content-box',
    position: 'static'
  },
  bold: {
    fontWeight: 'bold'
  },
  italic: {
    fontStyle: 'italic'
  },
  a: {
    color: 'blue',
    textDecorationLine: 'underline'
  },
  button: {
    borderWidth: 1
  },
  code: {
    fontFamily: ReactNative.Platform.select({
      ios: 'Menlo',
      default: 'monospace'
    })
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  hr: {
    backgroundColor: 'black',
    boxSizing: 'border-box',
    height: 1
  },
  img: {
    objectFit: 'fill'
  },
  input: {
    borderWidth: 1
  },
  lineThrough: {
    textDecorationLine: 'line-through'
  },
  textarea: {
    borderWidth: 1,
    verticalAlign: 'top'
  },
  underline: {
    textDecorationLine: 'underline'
  },
  mark: {
    backgroundColor: 'yellow',
    color: 'black'
  }
});

const headingProps = {
  style: [styles.defaults, styles.heading]
};

/**
 * "a" (inline)
 */
export const a: component(
  ref?: React.RefSetter<HTMLAnchorElement>,
  ...StrictReactDOMAnchorProps
) = createStrictText('a', { style: [styles.defaults, styles.a] }) as $FlowFixMe;

/**
 * "article" (block)
 */
export const article: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict('article', { style: styles.defaults }) as $FlowFixMe;

/**
 * "aside" (block)
 */
export const aside: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict('aside', { style: styles.defaults }) as $FlowFixMe;

/**
 * "b" (inline)
 */
export const b: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('b', {
  style: [styles.defaults, styles.bold]
}) as $FlowFixMe;

/**
 * "bdi" (inline)
 */
export const bdi: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('bdi', { style: styles.defaults }) as $FlowFixMe;

/**
 * "bdo" (inline)
 */
export const bdo: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('bdo', { style: styles.defaults }) as $FlowFixMe;

/**
 * "blockquote" (block)
 */
export const blockquote: component(
  ref?: React.RefSetter<HTMLQuoteElement>,
  ...StrictReactDOMProps
) = createStrict('blockquote', { style: styles.defaults }) as $FlowFixMe;

/**
 * "br"
 */
export const br: component(
  ref?: React.RefSetter<HTMLBRElement>,
  ...StrictReactDOMProps
) = createStrictText('br') as $FlowFixMe;

/**
 * "button" (inline-block)
 */
export const button: component(
  ref?: React.RefSetter<HTMLButtonElement>,
  ...StrictReactDOMButtonProps
) = createStrict('button', {
  style: [styles.defaults, styles.button],
  type: 'button'
}) as $FlowFixMe;

/**
 * "code" (inline)
 */
export const code: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('code', {
  style: [styles.defaults, styles.code]
}) as $FlowFixMe;

/**
 * "del" (inline)
 */
export const del: component(
  ref?: React.RefSetter<HTMLModElement>,
  ...StrictReactDOMProps
) = createStrictText('del', {
  style: [styles.defaults, styles.lineThrough]
}) as $FlowFixMe;

/**
 * "div" (block)
 */
export const div: component(
  ref?: React.RefSetter<HTMLDivElement>,
  ...StrictReactDOMProps
) = createStrict('div', { style: styles.defaults }) as $FlowFixMe;

/**
 * "em" (inline)
 */
export const em: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('em', {
  style: [styles.defaults, styles.italic]
}) as $FlowFixMe;

/**
 * "fieldset" (block)
 */
export const fieldset: component(
  ref?: React.RefSetter<HTMLFieldSetElement>,
  ...StrictReactDOMProps
) = createStrict('fieldset', { style: styles.defaults }) as $FlowFixMe;

/**
 * "footer" (block)
 */
export const footer: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict('footer', { style: styles.defaults }) as $FlowFixMe;

/**
 * "form" (block)
 */
export const form: component(
  ref?: React.RefSetter<HTMLFormElement>,
  ...StrictReactDOMProps
) = createStrict('form', { style: styles.defaults }) as $FlowFixMe;

/**
 * "h1-h6" (block)
 */
export const h1: component(
  ref?: React.RefSetter<HTMLHeadingElement>,
  ...StrictReactDOMProps
) = createStrictText('h1', headingProps) as $FlowFixMe;
export const h2: component(
  ref?: React.RefSetter<HTMLHeadingElement>,
  ...StrictReactDOMProps
) = createStrictText('h2', headingProps) as $FlowFixMe;
export const h3: component(
  ref?: React.RefSetter<HTMLHeadingElement>,
  ...StrictReactDOMProps
) = createStrictText('h3', headingProps) as $FlowFixMe;
export const h4: component(
  ref?: React.RefSetter<HTMLHeadingElement>,
  ...StrictReactDOMProps
) = createStrictText('h4', headingProps) as $FlowFixMe;
export const h5: component(
  ref?: React.RefSetter<HTMLHeadingElement>,
  ...StrictReactDOMProps
) = createStrictText('h5', headingProps) as $FlowFixMe;
export const h6: component(
  ref?: React.RefSetter<HTMLHeadingElement>,
  ...StrictReactDOMProps
) = createStrictText('h6', headingProps) as $FlowFixMe;

/**
 * "header" (block)
 */
export const header: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict('header', { style: styles.defaults }) as $FlowFixMe;

/**
 * "hr" (block)
 */
export const hr: component(
  ref?: React.RefSetter<HTMLHRElement>,
  ...StrictReactDOMProps
) = createStrict('hr', { style: [styles.defaults, styles.hr] }) as $FlowFixMe;

/**
 * "i" (inline)
 */
export const i: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('i', {
  style: [styles.defaults, styles.italic]
}) as $FlowFixMe;

/**
 * "img" (inline)
 */
export const img: component(
  ref?: React.RefSetter<HTMLImageElement>,
  ...StrictReactDOMImageProps
) = createStrictImage('img', {
  style: [styles.defaults, styles.img]
}) as $FlowFixMe;

/**
 * "input" (inline-block)
 */
export const input: component(
  ref?: React.RefSetter<HTMLInputElement>,
  ...StrictReactDOMInputProps
) = createStrictTextInput('input', {
  style: [styles.defaults, styles.input]
}) as $FlowFixMe;

/**
 * "ins" (inline)
 */
export const ins: component(
  ref?: React.RefSetter<HTMLModElement>,
  ...StrictReactDOMProps
) = createStrictText('ins', {
  style: [styles.defaults, styles.underline]
}) as $FlowFixMe;

/**
 * "kbd" (inline)
 */
export const kbd: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('kbd', {
  style: [styles.defaults, styles.code]
}) as $FlowFixMe;

/**
 * "label" (inline)
 */
export const label: component(
  ref?: React.RefSetter<HTMLLabelElement>,
  ...StrictReactDOMLabelProps
) = createStrictText('label', { style: styles.defaults }) as $FlowFixMe;

/**
 * "li" (block)
 */
export const li: component(
  ref?: React.RefSetter<HTMLLIElement>,
  ...StrictReactDOMListItemProps
) = createStrict('li', { style: styles.defaults }) as $FlowFixMe;

/**
 * "main" (block)
 */
export const main: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict('main', { style: styles.defaults }) as $FlowFixMe;

/**
 * "mark" (inline)
 */
export const mark: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('mark', {
  style: [styles.defaults, styles.mark]
}) as $FlowFixMe;

/**
 * "nav" (block)
 */
export const nav: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict('nav', { style: styles.defaults }) as $FlowFixMe;

/**
 * "ol" (block)
 */
export const ol: component(
  ref?: React.RefSetter<HTMLOListElement>,
  ...StrictReactDOMProps
) = createStrict('ol', { style: styles.defaults }) as $FlowFixMe;

/**
 * "optgroup" (block)
 */
export const optgroup: component(
  ref?: React.RefSetter<HTMLOptGroupElement>,
  ...StrictReactDOMOptionGroupProps
) = createStrict('optgroup', { style: styles.defaults }) as $FlowFixMe;

/**
 * "option"
 */
export const option: component(
  ref?: React.RefSetter<HTMLOptionElement>,
  ...StrictReactDOMOptionProps
) = createStrictText('option', { style: styles.defaults }) as $FlowFixMe;

/**
 * "p" (block)
 */
export const p: component(
  ref?: React.RefSetter<HTMLParagraphElement>,
  ...StrictReactDOMProps
) = createStrictText('p', { style: styles.defaults }) as $FlowFixMe;

/**
 * "pre" (block)
 */
export const pre: component(
  ref?: React.RefSetter<HTMLPreElement>,
  ...StrictReactDOMProps
) = createStrictText('pre', {
  style: [styles.defaults, styles.code]
}) as $FlowFixMe;

/**
 * "s" (inline)
 */
export const s: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('s', {
  style: [styles.defaults, styles.lineThrough]
}) as $FlowFixMe;

/**
 * "section" (block)
 */
export const section: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict('section', { style: styles.defaults }) as $FlowFixMe;

/**
 * "select" (inline-block)
 */
export const select: component(
  ref?: React.RefSetter<HTMLSelectElement>,
  ...StrictReactDOMSelectProps
) = createStrict('select', { style: styles.defaults }) as $FlowFixMe;

/**
 * "span" (inline)
 */
export const span: component(
  ref?: React.RefSetter<HTMLSpanElement>,
  ...StrictReactDOMProps
) = createStrictText('span', { style: styles.defaults }) as $FlowFixMe;

/**
 * "strong" (inline)
 */
export const strong: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('strong', {
  style: [styles.defaults, styles.bold]
}) as $FlowFixMe;

/**
 * "sub" (inline)
 */
export const sub: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('sub', { style: styles.defaults }) as $FlowFixMe;

/**
 * "sup" (inline)
 */
export const sup: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('sup', { style: styles.defaults }) as $FlowFixMe;

/**
 * "textarea" (inline-block)
 */
export const textarea: component(
  ref?: React.RefSetter<HTMLTextAreaElement>,
  ...StrictReactDOMTextAreaProps
) = createStrictTextInput('textarea', {
  style: [styles.defaults, styles.textarea]
}) as $FlowFixMe;

/**
 * "u" (inline)
 */
export const u: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('u', {
  style: [styles.defaults, styles.underline]
}) as $FlowFixMe;

/**
 * "ul" (block)
 */
export const ul: component(
  ref?: React.RefSetter<HTMLUListElement>,
  ...StrictReactDOMProps
) = createStrict('ul', { style: styles.defaults }) as $FlowFixMe;
