/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { StrictReactDOMProps } from '../types/StrictReactDOMProps';

import type { StrictHTMLElement } from '../types/StrictHTMLElement';
import type { StrictHTMLImageElement } from '../types/StrictHTMLImageElement';
import type { StrictHTMLInputElement } from '../types/StrictHTMLFormElements';
import type { StrictHTMLSelectElement } from '../types/StrictHTMLFormElements';
import type { StrictHTMLTextAreaElement } from '../types/StrictHTMLFormElements';

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
> = createStrict('a', defaultStyles.a);

/**
 * "article" (block)
 */
export const article: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('article', defaultStyles.article);

/**
 * "aside" (block)
 */
export const aside: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('aside', defaultStyles.aside);

/**
 * "b" (inline)
 */
export const b: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('b', defaultStyles.b);

/**
 * "bdi" (inline)
 */
export const bdi: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('bdi', defaultStyles.bdi);

/**
 * "bdo" (inline)
 */
export const bdo: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('bdo', defaultStyles.bdo);

/**
 * "blockquote" (block)
 */
export const blockquote: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('blockquote', defaultStyles.blockquote);

/**
 * "br"
 */
export const br: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('br', defaultStyles.br);

/**
 * "button" (inline-block)
 */
export const button: React$AbstractComponent<
  StrictReactDOMButtonProps,
  StrictHTMLElement
> = createStrict('button', defaultStyles.button);

/**
 * "code" (inline)
 */
export const code: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('code', defaultStyles.code);

/**
 * "div" (block)
 */
export const div: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('div', defaultStyles.div);

/**
 * "em" (inline)
 */
export const em: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('em', defaultStyles.em);

/**
 * "fieldset" (block)
 */
export const fieldset: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('fieldset', defaultStyles.fieldset);

/**
 * "footer" (block)
 */
export const footer: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('footer', defaultStyles.footer);

/**
 * "form" (block)
 */
export const form: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('form', defaultStyles.form);

/**
 * "h1-h6" (block)
 */
export const h1: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h1', defaultStyles.h1);
export const h2: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h2', defaultStyles.h2);
export const h3: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h3', defaultStyles.h3);
export const h4: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h4', defaultStyles.h4);
export const h5: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h5', defaultStyles.h5);
export const h6: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h6', defaultStyles.h6);

/**
 * "header" (block)
 */
export const header: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('header', defaultStyles.header);

/**
 * "hr" (block)
 */
export const hr: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('hr', defaultStyles.hr);

/**
 * "i" (inline)
 */
export const i: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('i', defaultStyles.i);

/**
 * "img" (inline)
 */
export const img: React$AbstractComponent<
  StrictReactDOMImageProps,
  StrictHTMLImageElement
> = createStrict('img', defaultStyles.img);

/**
 * "input" (inline-block)
 */
export const input: React$AbstractComponent<
  StrictReactDOMInputProps,
  StrictHTMLInputElement
> = createStrict('input', defaultStyles.input);

/**
 * "label" (inline)
 */
export const label: React$AbstractComponent<
  StrictReactDOMLabelProps,
  StrictHTMLElement
> = createStrict('label', defaultStyles.label);

/**
 * "li" (block)
 */
export const li: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('li', defaultStyles.li);

/**
 * "main" (block)
 */
export const main: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('main', defaultStyles.main);

/**
 * "nav" (block)
 */
export const nav: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('nav', defaultStyles.nav);

/**
 * "ol" (block)
 */
export const ol: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('ol', defaultStyles.ol);

/**
 * "optgroup"
 */
export const optgroup: React$AbstractComponent<
  StrictReactDOMOptionGroupProps,
  StrictHTMLElement
> = createStrict('optgroup', defaultStyles.optgroup);

/**
 * "option"
 */
export const option: React$AbstractComponent<
  StrictReactDOMOptionProps,
  StrictHTMLElement
> = createStrict('option', defaultStyles.option);

/**
 * "p" (block)
 */
export const p: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('p', defaultStyles.p);

/**
 * "pre" (block)
 */
export const pre: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('pre', defaultStyles.pre);

/**
 * "section" (block)
 */
export const section: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('section', defaultStyles.section);

/**
 * "select" (inline-block)
 */
export const select: React$AbstractComponent<
  StrictReactDOMSelectProps,
  StrictHTMLSelectElement
> = createStrict('select', defaultStyles.select);

/**
 * "span" (inline)
 */
export const span: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('span', defaultStyles.span);

/**
 * "strong" (inline)
 */
export const strong: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('strong', defaultStyles.strong);

/**
 * "sub" (inline)
 */
export const sub: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('sub', defaultStyles.sub);

/**
 * "sup" (inline)
 */
export const sup: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('sup', defaultStyles.sup);

/**
 * "textarea" (inline-block)
 */
export const textarea: React$AbstractComponent<
  StrictReactDOMTextAreaProps,
  StrictHTMLTextAreaElement
> = createStrict('textarea', defaultStyles.textarea);

/**
 * "ul" (block)
 */
export const ul: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('ul', defaultStyles.ul);
