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
export const a: component(
  ref?: React.RefSetter<HTMLAnchorElement>,
  ...StrictReactDOMAnchorProps
) = createStrict<HTMLAnchorElement, StrictReactDOMAnchorProps>(
  'a',
  defaultStyles.a
);

/**
 * "article" (block)
 */
export const article: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLElement, StrictReactDOMProps>(
  'article',
  defaultStyles.article
);

/**
 * "aside" (block)
 */
export const aside: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLElement, StrictReactDOMProps>(
  'aside',
  defaultStyles.aside
);

/**
 * "b" (inline)
 */
export const b: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLElement, StrictReactDOMProps>('b', defaultStyles.b);

/**
 * "bdi" (inline)
 */
export const bdi: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLElement, StrictReactDOMProps>('bdi', defaultStyles.bdi);

/**
 * "bdo" (inline)
 */
export const bdo: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLElement, StrictReactDOMProps>('bdo', defaultStyles.bdo);

/**
 * "blockquote" (block)
 */
export const blockquote: component(
  ref?: React.RefSetter<HTMLQuoteElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLQuoteElement, StrictReactDOMProps>(
  'blockquote',
  defaultStyles.blockquote
);

/**
 * "br"
 */
export const br: component(
  ref?: React.RefSetter<HTMLBRElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLBRElement, StrictReactDOMProps>('br', defaultStyles.br);

/**
 * "button" (inline-block)
 */
export const button: component(
  ref?: React.RefSetter<HTMLButtonElement>,
  ...StrictReactDOMButtonProps
) = createStrict<HTMLButtonElement, StrictReactDOMButtonProps>(
  'button',
  defaultStyles.button
);

/**
 * "code" (inline)
 */
export const code: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLElement, StrictReactDOMProps>('code', defaultStyles.code);

/**
 * "del" (inline)
 */
export const del: component(
  ref?: React.RefSetter<HTMLModElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLModElement, StrictReactDOMProps>('del', defaultStyles.del);

/**
 * "div" (block)
 */
export const div: component(
  ref?: React.RefSetter<HTMLDivElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLDivElement, StrictReactDOMProps>('div', defaultStyles.div);

/**
 * "em" (inline)
 */
export const em: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLElement, StrictReactDOMProps>('em', defaultStyles.em);

/**
 * "fieldset" (block)
 */
export const fieldset: component(
  ref?: React.RefSetter<HTMLFieldSetElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLFieldSetElement, StrictReactDOMProps>(
  'fieldset',
  defaultStyles.fieldset
);

/**
 * "footer" (block)
 */
export const footer: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLElement, StrictReactDOMProps>(
  'footer',
  defaultStyles.footer
);

/**
 * "form" (block)
 */
export const form: component(
  ref?: React.RefSetter<HTMLFormElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLFormElement, StrictReactDOMProps>(
  'form',
  defaultStyles.form
);

/**
 * "h1-h6" (block)
 */
export const h1: component(
  ref?: React.RefSetter<HTMLHeadingElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLHeadingElement, StrictReactDOMProps>(
  'h1',
  defaultStyles.h1
);
export const h2: component(
  ref?: React.RefSetter<HTMLHeadingElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLHeadingElement, StrictReactDOMProps>(
  'h2',
  defaultStyles.h2
);
export const h3: component(
  ref?: React.RefSetter<HTMLHeadingElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLHeadingElement, StrictReactDOMProps>(
  'h3',
  defaultStyles.h3
);
export const h4: component(
  ref?: React.RefSetter<HTMLHeadingElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLHeadingElement, StrictReactDOMProps>(
  'h4',
  defaultStyles.h4
);
export const h5: component(
  ref?: React.RefSetter<HTMLHeadingElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLHeadingElement, StrictReactDOMProps>(
  'h5',
  defaultStyles.h5
);
export const h6: component(
  ref?: React.RefSetter<HTMLHeadingElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLHeadingElement, StrictReactDOMProps>(
  'h6',
  defaultStyles.h6
);

/**
 * "header" (block)
 */
export const header: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLElement, StrictReactDOMProps>(
  'header',
  defaultStyles.header
);

/**
 * "hr" (block)
 */
export const hr: component(
  ref?: React.RefSetter<HTMLHRElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLHRElement, StrictReactDOMProps>('hr', defaultStyles.hr);

/**
 * "i" (inline)
 */
export const i: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLElement, StrictReactDOMProps>('i', defaultStyles.i);

/**
 * "img" (inline)
 */
export const img: component(
  ref?: React.RefSetter<HTMLImageElement>,
  ...StrictReactDOMImageProps
) = createStrict<HTMLImageElement, StrictReactDOMImageProps>(
  'img',
  defaultStyles.img
);

/**
 * "input" (inline-block)
 */
export const input: component(
  ref?: React.RefSetter<HTMLInputElement>,
  ...StrictReactDOMInputProps
) = createStrict<HTMLInputElement, StrictReactDOMInputProps>(
  'input',
  defaultStyles.input
);

/**
 * "ins" (inline)
 */
export const ins: component(
  ref?: React.RefSetter<HTMLModElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLModElement, StrictReactDOMProps>('ins', defaultStyles.ins);

/**
 * "kbd" (inline)
 */
export const kbd: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLElement, StrictReactDOMProps>('kbd', defaultStyles.kbd);

/**
 * "label" (inline)
 */
export const label: component(
  ref?: React.RefSetter<HTMLLabelElement>,
  ...StrictReactDOMLabelProps
) = createStrict<HTMLLabelElement, StrictReactDOMLabelProps>(
  'label',
  defaultStyles.label
);

/**
 * "li" (block)
 */
export const li: component(
  ref?: React.RefSetter<HTMLLIElement>,
  ...StrictReactDOMListItemProps
) = createStrict<HTMLLIElement, StrictReactDOMListItemProps>(
  'li',
  defaultStyles.li
);

/**
 * "main" (block)
 */
export const main: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLElement, StrictReactDOMProps>('main', defaultStyles.main);

/**
 * "mark" (inline)
 */
export const mark: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLElement, StrictReactDOMProps>('mark', defaultStyles.mark);

/**
 * "nav" (block)
 */
export const nav: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLElement, StrictReactDOMProps>('nav', defaultStyles.nav);

/**
 * "ol" (block)
 */
export const ol: component(
  ref?: React.RefSetter<HTMLOListElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLOListElement, StrictReactDOMProps>('ol', defaultStyles.ol);

/**
 * "optgroup"
 */
export const optgroup: component(
  ref?: React.RefSetter<HTMLOptGroupElement>,
  ...StrictReactDOMOptionGroupProps
) = createStrict<HTMLOptGroupElement, StrictReactDOMOptionGroupProps>(
  'optgroup',
  defaultStyles.optgroup
);

/**
 * "option"
 */
export const option: component(
  ref?: React.RefSetter<HTMLOptionElement>,
  ...StrictReactDOMOptionProps
) = createStrict<HTMLOptionElement, StrictReactDOMOptionProps>(
  'option',
  defaultStyles.option
);

/**
 * "p" (block)
 */
export const p: component(
  ref?: React.RefSetter<HTMLParagraphElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLParagraphElement, StrictReactDOMProps>(
  'p',
  defaultStyles.p
);

/**
 * "pre" (block)
 */
export const pre: component(
  ref?: React.RefSetter<HTMLPreElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLPreElement, StrictReactDOMProps>('pre', defaultStyles.pre);

/**
 * "s" (inline)
 */
export const s: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLElement, StrictReactDOMProps>('s', defaultStyles.s);

/**
 * "section" (block)
 */
export const section: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLElement, StrictReactDOMProps>(
  'section',
  defaultStyles.section
);

/**
 * "select" (inline-block)
 */
export const select: component(
  ref?: React.RefSetter<HTMLSelectElement>,
  ...StrictReactDOMSelectProps
) = createStrict<HTMLSelectElement, StrictReactDOMSelectProps>(
  'select',
  defaultStyles.select
);

/**
 * "span" (inline)
 */
export const span: component(
  ref?: React.RefSetter<HTMLSpanElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLSpanElement, StrictReactDOMProps>(
  'span',
  defaultStyles.span
);

/**
 * "strong" (inline)
 */
export const strong: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLElement, StrictReactDOMProps>(
  'strong',
  defaultStyles.strong
);

/**
 * "sub" (inline)
 */
export const sub: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLElement, StrictReactDOMProps>('sub', defaultStyles.sub);

/**
 * "sup" (inline)
 */
export const sup: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLElement, StrictReactDOMProps>('sup', defaultStyles.sup);

/**
 * "textarea" (inline-block)
 */
export const textarea: component(
  ref?: React.RefSetter<HTMLTextAreaElement>,
  ...StrictReactDOMTextAreaProps
) = createStrict<HTMLTextAreaElement, StrictReactDOMTextAreaProps>(
  'textarea',
  defaultStyles.textarea
);

/**
 * "u" (inline)
 */
export const u: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLElement, StrictReactDOMProps>('u', defaultStyles.u);

/**
 * "ul" (block)
 */
export const ul: component(
  ref?: React.RefSetter<HTMLUListElement>,
  ...StrictReactDOMProps
) = createStrict<HTMLUListElement, StrictReactDOMProps>('ul', defaultStyles.ul);
