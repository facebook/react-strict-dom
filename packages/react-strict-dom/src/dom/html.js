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

import { createStrictDOMComponent as createStrict } from './modules/createStrictDOMComponent';
import { defaultStyles } from './runtime';

/**
 * "a" (inline)
 */
export const a: React$AbstractComponent<
  StrictReactDOMAnchorProps,
  HTMLAnchorElement
> = createStrict('a', defaultStyles.a);

/**
 * "article" (block)
 */
export const article: React$AbstractComponent<
  StrictReactDOMProps,
  HTMLElement
> = createStrict('article', defaultStyles.article);

/**
 * "aside" (block)
 */
export const aside: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('aside', defaultStyles.aside);

/**
 * "b" (inline)
 */
export const b: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('b', defaultStyles.b);

/**
 * "bdi" (inline)
 */
export const bdi: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('bdi', defaultStyles.bdi);

/**
 * "bdo" (inline)
 */
export const bdo: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('bdo', defaultStyles.bdo);

/**
 * "blockquote" (block)
 */
export const blockquote: React$AbstractComponent<
  StrictReactDOMProps,
  HTMLQuoteElement
> = createStrict('blockquote', defaultStyles.blockquote);

/**
 * "br"
 */
export const br: React$AbstractComponent<StrictReactDOMProps, HTMLBRElement> =
  createStrict('br', defaultStyles.br);

/**
 * "button" (inline-block)
 */
export const button: React$AbstractComponent<
  StrictReactDOMButtonProps,
  HTMLButtonElement
> = createStrict('button', defaultStyles.button);

/**
 * "code" (inline)
 */
export const code: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('code', defaultStyles.code);

/**
 * "del" (inline)
 */
export const del: React$AbstractComponent<StrictReactDOMProps, HTMLModElement> =
  createStrict('del', defaultStyles.del);

/**
 * "div" (block)
 */
export const div: React$AbstractComponent<StrictReactDOMProps, HTMLDivElement> =
  createStrict('div', defaultStyles.div);

/**
 * "em" (inline)
 */
export const em: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('em', defaultStyles.em);

/**
 * "fieldset" (block)
 */
export const fieldset: React$AbstractComponent<
  StrictReactDOMProps,
  HTMLFieldSetElement
> = createStrict('fieldset', defaultStyles.fieldset);

/**
 * "footer" (block)
 */
export const footer: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('footer', defaultStyles.footer);

/**
 * "form" (block)
 */
export const form: React$AbstractComponent<
  StrictReactDOMProps,
  HTMLFormElement
> = createStrict('form', defaultStyles.form);

/**
 * "h1-h6" (block)
 */
export const h1: React$AbstractComponent<
  StrictReactDOMProps,
  HTMLHeadingElement
> = createStrict('h1', defaultStyles.h1);
export const h2: React$AbstractComponent<
  StrictReactDOMProps,
  HTMLHeadingElement
> = createStrict('h2', defaultStyles.h2);
export const h3: React$AbstractComponent<
  StrictReactDOMProps,
  HTMLHeadingElement
> = createStrict('h3', defaultStyles.h3);
export const h4: React$AbstractComponent<
  StrictReactDOMProps,
  HTMLHeadingElement
> = createStrict('h4', defaultStyles.h4);
export const h5: React$AbstractComponent<
  StrictReactDOMProps,
  HTMLHeadingElement
> = createStrict('h5', defaultStyles.h5);
export const h6: React$AbstractComponent<
  StrictReactDOMProps,
  HTMLHeadingElement
> = createStrict('h6', defaultStyles.h6);

/**
 * "header" (block)
 */
export const header: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('header', defaultStyles.header);

/**
 * "hr" (block)
 */
export const hr: React$AbstractComponent<StrictReactDOMProps, HTMLHRElement> =
  createStrict('hr', defaultStyles.hr);

/**
 * "i" (inline)
 */
export const i: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('i', defaultStyles.i);

/**
 * "img" (inline)
 */
export const img: React$AbstractComponent<
  StrictReactDOMImageProps,
  HTMLImageElement
> = createStrict('img', defaultStyles.img);

/**
 * "input" (inline-block)
 */
export const input: React$AbstractComponent<
  StrictReactDOMInputProps,
  HTMLInputElement
> = createStrict('input', defaultStyles.input);

/**
 * "ins" (inline)
 */
export const ins: React$AbstractComponent<StrictReactDOMProps, HTMLModElement> =
  createStrict('ins', defaultStyles.ins);

/**
 * "kbd" (inline)
 */
export const kbd: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('kbd', defaultStyles.kbd);

/**
 * "label" (inline)
 */
export const label: React$AbstractComponent<
  StrictReactDOMLabelProps,
  HTMLLabelElement
> = createStrict('label', defaultStyles.label);

/**
 * "li" (block)
 */
export const li: React$AbstractComponent<
  StrictReactDOMListItemProps,
  HTMLLIElement
> = createStrict('li', defaultStyles.li);

/**
 * "main" (block)
 */
export const main: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('main', defaultStyles.main);

/**
 * "nav" (block)
 */
export const nav: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('nav', defaultStyles.nav);

/**
 * "ol" (block)
 */
export const ol: React$AbstractComponent<
  StrictReactDOMProps,
  HTMLOListElement
> = createStrict('ol', defaultStyles.ol);

/**
 * "optgroup"
 */
export const optgroup: React$AbstractComponent<
  StrictReactDOMOptionGroupProps,
  HTMLOptGroupElement
> = createStrict('optgroup', defaultStyles.optgroup);

/**
 * "option"
 */
export const option: React$AbstractComponent<
  StrictReactDOMOptionProps,
  HTMLOptionElement
> = createStrict<HTMLOptionElement, StrictReactDOMOptionProps>(
  'option',
  defaultStyles.option
);

/**
 * "p" (block)
 */
export const p: React$AbstractComponent<
  StrictReactDOMProps,
  HTMLParagraphElement
> = createStrict('p', defaultStyles.p);

/**
 * "pre" (block)
 */
export const pre: React$AbstractComponent<StrictReactDOMProps, HTMLPreElement> =
  createStrict('pre', defaultStyles.pre);

/**
 * "s" (inline)
 */
export const s: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('s', defaultStyles.s);

/**
 * "section" (block)
 */
export const section: React$AbstractComponent<
  StrictReactDOMProps,
  HTMLElement
> = createStrict('section', defaultStyles.section);

/**
 * "select" (inline-block)
 */
export const select: React$AbstractComponent<
  StrictReactDOMSelectProps,
  HTMLSelectElement
> = createStrict('select', defaultStyles.select);

/**
 * "span" (inline)
 */
export const span: React$AbstractComponent<
  StrictReactDOMProps,
  HTMLSpanElement
> = createStrict('span', defaultStyles.span);

/**
 * "strong" (inline)
 */
export const strong: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('strong', defaultStyles.strong);

/**
 * "sub" (inline)
 */
export const sub: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('sub', defaultStyles.sub);

/**
 * "sup" (inline)
 */
export const sup: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('sup', defaultStyles.sup);

/**
 * "textarea" (inline-block)
 */
export const textarea: React$AbstractComponent<
  StrictReactDOMTextAreaProps,
  HTMLTextAreaElement
> = createStrict('textarea', defaultStyles.textarea);

/**
 * "u" (inline)
 */
export const u: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('u', defaultStyles.u);

/**
 * "ul" (block)
 */
export const ul: React$AbstractComponent<
  StrictReactDOMProps,
  HTMLUListElement
> = createStrict('ul', defaultStyles.ul);
