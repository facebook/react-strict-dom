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
import { Platform } from 'react-native';
import * as stylex from './stylex';

const styles = stylex.create({
  bold: {
    fontWeight: 'bold'
  },
  italic: {
    fontStyle: 'italic'
  },
  a: {
    color: 'blue'
  },
  button: {
    borderWidth: 1
  },
  code: {
    fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' })
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
  }
});

const headingProps = {
  style: styles.heading
};

/**
 * "a" (inline)
 */
export const a: component(
  ref?: React.RefSetter<HTMLAnchorElement>,
  ...StrictReactDOMAnchorProps
) = createStrictText('a', { style: [styles.a, styles.underline] });

/**
 * "article" (block)
 */
export const article: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict('article');

/**
 * "aside" (block)
 */
export const aside: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict('aside');

/**
 * "b" (inline)
 */
export const b: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('b', { style: styles.bold });

/**
 * "bdi" (inline)
 */
export const bdi: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('bdi');

/**
 * "bdo" (inline)
 */
export const bdo: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('bdo');

/**
 * "blockquote" (block)
 */
export const blockquote: component(
  ref?: React.RefSetter<HTMLQuoteElement>,
  ...StrictReactDOMProps
) = createStrict('blockquote');

/**
 * "br"
 */
export const br: component(
  ref?: React.RefSetter<HTMLBRElement>,
  ...StrictReactDOMProps
) = createStrictText('br');

/**
 * "button" (inline-block)
 */
export const button: component(
  ref?: React.RefSetter<HTMLButtonElement>,
  ...StrictReactDOMButtonProps
) = createStrict('button', {
  style: styles.button,
  type: 'button'
});

/**
 * "code" (inline)
 */
export const code: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('code', { style: styles.code });

/**
 * "del" (inline)
 */
export const del: component(
  ref?: React.RefSetter<HTMLModElement>,
  ...StrictReactDOMProps
) = createStrictText('del', { style: styles.lineThrough });

/**
 * "div" (block)
 */
export const div: component(
  ref?: React.RefSetter<HTMLDivElement>,
  ...StrictReactDOMProps
) = createStrict('div');

/**
 * "em" (inline)
 */
export const em: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('em', { style: styles.italic });

/**
 * "fieldset" (block)
 */
export const fieldset: component(
  ref?: React.RefSetter<HTMLFieldSetElement>,
  ...StrictReactDOMProps
) = createStrict('fieldset');

/**
 * "footer" (block)
 */
export const footer: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict('footer');

/**
 * "form" (block)
 */
export const form: component(
  ref?: React.RefSetter<HTMLFormElement>,
  ...StrictReactDOMProps
) = createStrict('form');

/**
 * "h1-h6" (block)
 */
export const h1: component(
  ref?: React.RefSetter<HTMLHeadingElement>,
  ...StrictReactDOMProps
) = createStrictText('h1', headingProps);
export const h2: component(
  ref?: React.RefSetter<HTMLHeadingElement>,
  ...StrictReactDOMProps
) = createStrictText('h2', headingProps);
export const h3: component(
  ref?: React.RefSetter<HTMLHeadingElement>,
  ...StrictReactDOMProps
) = createStrictText('h3', headingProps);
export const h4: component(
  ref?: React.RefSetter<HTMLHeadingElement>,
  ...StrictReactDOMProps
) = createStrictText('h4', headingProps);
export const h5: component(
  ref?: React.RefSetter<HTMLHeadingElement>,
  ...StrictReactDOMProps
) = createStrictText('h5', headingProps);
export const h6: component(
  ref?: React.RefSetter<HTMLHeadingElement>,
  ...StrictReactDOMProps
) = createStrictText('h6', headingProps);

/**
 * "header" (block)
 */
export const header: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict('header');

/**
 * "hr" (block)
 */
export const hr: component(
  ref?: React.RefSetter<HTMLHRElement>,
  ...StrictReactDOMProps
) = createStrict('hr', { style: styles.hr });

/**
 * "i" (inline)
 */
export const i: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('i', { style: styles.italic });

/**
 * "img" (inline)
 */
export const img: component(
  ref?: React.RefSetter<HTMLImageElement>,
  ...StrictReactDOMImageProps
) = createStrictImage('img', { style: styles.img });

/**
 * "input" (inline-block)
 */
export const input: component(
  ref?: React.RefSetter<HTMLInputElement>,
  ...StrictReactDOMInputProps
) = createStrictTextInput('input', {
  style: styles.input
});

/**
 * "ins" (inline)
 */
export const ins: component(
  ref?: React.RefSetter<HTMLModElement>,
  ...StrictReactDOMProps
) = createStrictText('ins', { style: styles.underline });

/**
 * "kbd" (inline)
 */
export const kbd: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('kbd', { style: styles.code });

/**
 * "label" (inline)
 */
export const label: component(
  ref?: React.RefSetter<HTMLLabelElement>,
  ...StrictReactDOMLabelProps
) = createStrictText('label');

/**
 * "li" (block)
 */
export const li: component(
  ref?: React.RefSetter<HTMLLIElement>,
  ...StrictReactDOMListItemProps
) = createStrict('li');

/**
 * "main" (block)
 */
export const main: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict('main');

/**
 * "nav" (block)
 */
export const nav: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict('nav');

/**
 * "ol" (block)
 */
export const ol: component(
  ref?: React.RefSetter<HTMLOListElement>,
  ...StrictReactDOMProps
) = createStrict('ol');

/**
 * "optgroup"
 */
export const optgroup: component(
  ref?: React.RefSetter<HTMLOptGroupElement>,
  ...StrictReactDOMOptionGroupProps
) = createStrict('optgroup');

/**
 * "option"
 */
export const option: component(
  ref?: React.RefSetter<HTMLOptionElement>,
  ...StrictReactDOMOptionProps
) = createStrictText('option');

/**
 * "p" (block)
 */
export const p: component(
  ref?: React.RefSetter<HTMLParagraphElement>,
  ...StrictReactDOMProps
) = createStrictText('p');

/**
 * "pre" (block)
 */
export const pre: component(
  ref?: React.RefSetter<HTMLPreElement>,
  ...StrictReactDOMProps
) = createStrictText('pre', { style: styles.code });

/**
 * "s" (inline)
 */
export const s: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('s', { style: styles.lineThrough });

/**
 * "section" (block)
 */
export const section: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict('section');

/**
 * "select" (inline-block)
 */
export const select: component(
  ref?: React.RefSetter<HTMLSelectElement>,
  ...StrictReactDOMSelectProps
) = createStrict('select');

/**
 * "span" (inline)
 */
export const span: component(
  ref?: React.RefSetter<HTMLSpanElement>,
  ...StrictReactDOMProps
) = createStrictText('span');

/**
 * "strong" (inline)
 */
export const strong: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('strong', { style: styles.bold });

/**
 * "sub" (inline)
 */
export const sub: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('sub');

/**
 * "sup" (inline)
 */
export const sup: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('sup');

/**
 * "textarea" (inline-block)
 */
export const textarea: component(
  ref?: React.RefSetter<HTMLTextAreaElement>,
  ...StrictReactDOMTextAreaProps
) = createStrictTextInput('textarea', {
  style: styles.textarea
});

/**
 * "u" (inline)
 */
export const u: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrictText('u', { style: styles.underline });

/**
 * "ul" (block)
 */
export const ul: component(
  ref?: React.RefSetter<HTMLUListElement>,
  ...StrictReactDOMProps
) = createStrict('ul');
