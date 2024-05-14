/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { StrictHTMLElement } from '../types/StrictHTMLElement';
import type { StrictHTMLImageElement } from '../types/StrictHTMLImageElement';
import type { StrictHTMLInputElement } from '../types/StrictHTMLFormElements';
import type { StrictHTMLOptionElement } from '../types/StrictHTMLFormElements';
import type { StrictHTMLSelectElement } from '../types/StrictHTMLFormElements';
import type { StrictHTMLTextAreaElement } from '../types/StrictHTMLFormElements';

import type { StrictReactDOMProps } from '../types/StrictReactDOMProps';
import type { StrictReactDOMAnchorProps } from '../types/StrictReactDOMAnchorProps';
import type { StrictReactDOMButtonProps } from '../types/StrictReactDOMButtonProps';
import type { StrictReactDOMImageProps } from '../types/StrictReactDOMImageProps';
import type { StrictReactDOMInputProps } from '../types/StrictReactDOMInputProps';
import type { StrictReactDOMLabelProps } from '../types/StrictReactDOMLabelProps';
import type { StrictReactDOMOptionProps } from '../types/StrictReactDOMOptionProps';
import type { StrictReactDOMOptionGroupProps } from '../types/StrictReactDOMOptionGroupProps';
import type { StrictReactDOMSelectProps } from '../types/StrictReactDOMSelectProps';
import type { StrictReactDOMTextAreaProps } from '../types/StrictReactDOMTextAreaProps';

import { createStrictDOMComponent as createStrict } from './modules/createStrictDOMComponent';
import { defaultStyles } from './runtime';

/**
 * "a" (inline)
 */
export const a: React$AbstractComponent<
  StrictReactDOMAnchorProps,
  StrictHTMLElement
> = createStrict('a', { style: defaultStyles.a });

/**
 * "article" (block)
 */
export const article: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('article', { style: defaultStyles.article });

/**
 * "aside" (block)
 */
export const aside: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('aside', { style: defaultStyles.aside });

/**
 * "b" (inline)
 */
export const b: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('b', { style: defaultStyles.b });

/**
 * "bdi" (inline)
 */
export const bdi: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('bdi', { style: defaultStyles.bdi });

/**
 * "bdo" (inline)
 */
export const bdo: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('bdo', { style: defaultStyles.bdo });

/**
 * "blockquote" (block)
 */
export const blockquote: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('blockquote', { style: defaultStyles.blockquote });

/**
 * "br"
 */
export const br: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('br', { style: defaultStyles.br });

/**
 * "button" (inline-block)
 */
export const button: React$AbstractComponent<
  StrictReactDOMButtonProps,
  StrictHTMLElement
> = createStrict('button', { style: defaultStyles.button });

/**
 * "code" (inline)
 */
export const code: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('code', { style: defaultStyles.code });

/**
 * "del" (inline)
 */
export const del: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('del', { style: defaultStyles.del });

/**
 * "div" (block)
 */
export const div: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('div', { style: defaultStyles.div });

/**
 * "em" (inline)
 */
export const em: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('em', { style: defaultStyles.em });

/**
 * "fieldset" (block)
 */
export const fieldset: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('fieldset', { style: defaultStyles.fieldset });

/**
 * "footer" (block)
 */
export const footer: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('footer', { style: defaultStyles.footer });

/**
 * "form" (block)
 */
export const form: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('form', { style: defaultStyles.form });

/**
 * "h1-h6" (block)
 */
export const h1: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h1', { style: defaultStyles.h1 });
export const h2: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h2', { style: defaultStyles.h2 });
export const h3: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h3', { style: defaultStyles.h3 });
export const h4: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h4', { style: defaultStyles.h4 });
export const h5: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h5', { style: defaultStyles.h5 });
export const h6: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h6', { style: defaultStyles.h6 });

/**
 * "header" (block)
 */
export const header: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('header', { style: defaultStyles.header });

/**
 * "hr" (block)
 */
export const hr: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('hr', { style: defaultStyles.hr });

/**
 * "i" (inline)
 */
export const i: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('i', { style: defaultStyles.i });

/**
 * "img" (inline)
 */
export const img: React$AbstractComponent<
  StrictReactDOMImageProps,
  StrictHTMLImageElement
> = createStrict('img', { style: defaultStyles.img });

/**
 * "input" (inline-block)
 */
export const input: React$AbstractComponent<
  StrictReactDOMInputProps,
  StrictHTMLInputElement
> = createStrict('input', { style: defaultStyles.input });

/**
 * "ins" (inline)
 */
export const ins: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('ins', { style: defaultStyles.ins });

/**
 * "kbd" (inline)
 */
export const kbd: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('kbd', { style: defaultStyles.kbd });

/**
 * "label" (inline)
 */
export const label: React$AbstractComponent<
  StrictReactDOMLabelProps,
  StrictHTMLElement
> = createStrict('label', { style: defaultStyles.label });

/**
 * "li" (block)
 */
export const li: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('li', { style: defaultStyles.li });

/**
 * "main" (block)
 */
export const main: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('main', { style: defaultStyles.main });

/**
 * "nav" (block)
 */
export const nav: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('nav', { style: defaultStyles.nav });

/**
 * "ol" (block)
 */
export const ol: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('ol', { style: defaultStyles.ol });

/**
 * "optgroup"
 */
export const optgroup: React$AbstractComponent<
  StrictReactDOMOptionGroupProps,
  StrictHTMLElement
> = createStrict('optgroup', { style: defaultStyles.optgroup });

/**
 * "option"
 */
export const option: React$AbstractComponent<
  StrictReactDOMOptionProps,
  StrictHTMLOptionElement
> = createStrict<StrictHTMLOptionElement, StrictReactDOMOptionProps>('option', {
  style: defaultStyles.option
});

/**
 * "p" (block)
 */
export const p: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('p', { style: defaultStyles.p });

/**
 * "pre" (block)
 */
export const pre: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('pre', { style: defaultStyles.pre });

/**
 * "s" (inline)
 */
export const s: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('s', { style: defaultStyles.s });

/**
 * "section" (block)
 */
export const section: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('section', { style: defaultStyles.section });

/**
 * "select" (inline-block)
 */
export const select: React$AbstractComponent<
  StrictReactDOMSelectProps,
  StrictHTMLSelectElement
> = createStrict('select', { style: defaultStyles.select });

/**
 * "span" (inline)
 */
export const span: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('span', { style: defaultStyles.span });

/**
 * "strong" (inline)
 */
export const strong: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('strong', { style: defaultStyles.strong });

/**
 * "sub" (inline)
 */
export const sub: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('sub', { style: defaultStyles.sub });

/**
 * "sup" (inline)
 */
export const sup: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('sup', { style: defaultStyles.sup });

/**
 * "textarea" (inline-block)
 */
export const textarea: React$AbstractComponent<
  StrictReactDOMTextAreaProps,
  StrictHTMLTextAreaElement
> = createStrict('textarea', { style: defaultStyles.textarea });

/**
 * "u" (inline)
 */
export const u: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('u', { style: defaultStyles.u });

/**
 * "ul" (block)
 */
export const ul: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('ul', { style: defaultStyles.ul });
