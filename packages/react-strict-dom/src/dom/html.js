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
import * as stylex from '@stylexjs/stylex';

// set this on the root, probably in the theme context
// const fontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';

const styles = stylex.create({
  // reset all 'block' elements
  block: {
    // boxSizing: 'border-box',
    // borderStyle: 'solid',
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  // reset all 'inline' text elements
  inline: {
    // boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    textDecoration: 'none',
    textAlign: 'inherit',
    // disable for now as internal web code conflicts
    // whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  },
  // reset all 'inline-block' text elements
  inlineblock: {
    borderStyle: 'solid',
    margin: 0,
    padding: 0
  },
  button: {
    borderWidth: 1
  },
  codePre: {
    fontFamily: 'monospace, monospace',
    fontSize: '1em',
    overflow: 'auto'
  },
  heading: {
    fontSize: '1.5rem',
    wordWrap: 'break-word'
  },
  hr: {
    backgroundColor: 'black',
    borderStyle: 'none',
    borderWidth: 0,
    boxSizing: 'border-box',
    height: 1
  },
  img: {
    aspectRatio: 'attr(width) / attr(height)',
    height: 'auto',
    maxWidth: '100%'
  },
  input: {
    borderWidth: 1,
    borderStyle: 'solid'
  },
  strong: {
    fontWeight: 'bolder'
  },
  textarea: {
    borderWidth: 1,
    borderStyle: 'solid',
    resize: 'vertical'
  }
});

/**
 * "a" (inline)
 */
const defaultAnchorProps: StrictReactDOMAnchorProps = { style: styles.inline };
export const a: React$AbstractComponent<
  StrictReactDOMAnchorProps,
  StrictHTMLElement
> = createStrict('a', defaultAnchorProps);

/**
 * "article" (block)
 */
const defaultArticleProps: StrictReactDOMProps = { style: styles.block };
export const article: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('article', defaultArticleProps);

/**
 * "aside" (block)
 */
const defaultAsideProps: StrictReactDOMProps = { style: styles.block };
export const aside: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('aside', defaultAsideProps);

/**
 * "b" (inline)
 */
const defaultBProps: StrictReactDOMProps = { style: styles.inline };
export const b: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('b', defaultBProps);

/**
 * "bdi" (inline)
 */
const defaultBdiProps: StrictReactDOMProps = { style: styles.inline };
export const bdi: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('bdi', defaultBdiProps);

/**
 * "bdo" (inline)
 */
const defaultBdoProps: StrictReactDOMProps = { style: styles.inline };
export const bdo: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('bdo', defaultBdoProps);

/**
 * "blockquote" (block)
 */
const defaultBlockquoteProps: StrictReactDOMProps = { style: styles.block };
export const blockquote: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('blockquote', defaultBlockquoteProps);

/**
 * "br"
 */
const defaultBrProps: StrictReactDOMProps = {};
export const br: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('br', defaultBrProps);

/**
 * "button" (inline-block)
 */
const defaultButtonProps: StrictReactDOMButtonProps = {
  style: [styles.inlineblock, styles.button],
  type: 'button'
};
export const button: React$AbstractComponent<
  StrictReactDOMButtonProps,
  StrictHTMLElement
> = createStrict('button', defaultButtonProps);

/**
 * "code" (inline)
 */
const defaultCodeProps: StrictReactDOMProps = {
  style: [styles.inline, styles.codePre]
};
export const code: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('code', defaultCodeProps);

/**
 * "div" (block)
 */
const defaultDivProps: StrictReactDOMProps = { style: styles.block };
export const div: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('div', defaultDivProps);

/**
 * "em" (inline)
 */
const defaultEmphasisProps: StrictReactDOMProps = { style: styles.inline };
export const em: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('em', defaultEmphasisProps);

/**
 * "fieldset" (block)
 */
const defaultFieldsetProps: StrictReactDOMProps = { style: styles.block };
export const fieldset: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('fieldset', defaultFieldsetProps);

/**
 * "footer" (block)
 */
const defaultFooterProps: StrictReactDOMProps = { style: styles.block };
export const footer: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('footer', defaultFooterProps);

/**
 * "form" (block)
 */
const defaultFormProps: StrictReactDOMProps = { style: styles.block };
export const form: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('form', defaultFormProps);

/**
 * "h1-h6" (block)
 */
const defaultHeadingProps: StrictReactDOMProps = {
  style: [styles.block, styles.heading]
};
export const h1: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h1', defaultHeadingProps);
export const h2: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h2', defaultHeadingProps);
export const h3: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h3', defaultHeadingProps);
export const h4: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h4', defaultHeadingProps);
export const h5: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h5', defaultHeadingProps);
export const h6: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h6', defaultHeadingProps);

/**
 * "header" (block)
 */
const defaultHeaderProps: StrictReactDOMProps = { style: styles.block };
export const header: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('header', defaultHeaderProps);

/**
 * "hr" (block)
 */
const defaultHrProps: StrictReactDOMProps = {
  style: [styles.block, styles.hr]
};
export const hr: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('hr', defaultHrProps);

/**
 * "i" (inline)
 */
const defaultIProps: StrictReactDOMProps = { style: styles.inline };
export const i: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('i', defaultIProps);

/**
 * "img" (inline)
 */
const defaultImgProps: StrictReactDOMImageProps = { style: styles.img };
export const img: React$AbstractComponent<
  StrictReactDOMImageProps,
  StrictHTMLImageElement
> = createStrict('img', defaultImgProps);

/**
 * "input" (inline-block)
 */
const defaultInputProps: StrictReactDOMInputProps = {
  dir: 'auto',
  style: [styles.inlineblock, styles.input]
};
export const input: React$AbstractComponent<
  StrictReactDOMInputProps,
  StrictHTMLInputElement
> = createStrict('input', defaultInputProps);

/**
 * "label" (inline)
 */
const defaultLabelProps: StrictReactDOMLabelProps = { style: styles.inline };
export const label: React$AbstractComponent<
  StrictReactDOMLabelProps,
  StrictHTMLElement
> = createStrict('label', defaultLabelProps);

/**
 * "li" (block)
 */
const defaultListItemProps: StrictReactDOMProps = { style: styles.block };
export const li: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('li', defaultListItemProps);

/**
 * "main" (block)
 */
const defaultMainProps: StrictReactDOMProps = { style: styles.block };
export const main: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('main', defaultMainProps);

/**
 * "nav" (block)
 */
const defaultNavProps: StrictReactDOMProps = { style: styles.block };
export const nav: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('nav', defaultNavProps);

/**
 * "ol" (block)
 */
const defaultOrderedListProps: StrictReactDOMProps = { style: styles.block };
export const ol: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('ol', defaultOrderedListProps);

/**
 * "optgroup"
 */
const defaultOptionGroupProps: StrictReactDOMOptionGroupProps = {};
export const optgroup: React$AbstractComponent<
  StrictReactDOMOptionGroupProps,
  StrictHTMLElement
> = createStrict('optgroup', defaultOptionGroupProps);

/**
 * "option"
 */
const defaultOptionProps: StrictReactDOMOptionProps = {};
export const option: React$AbstractComponent<
  StrictReactDOMOptionProps,
  StrictHTMLElement
> = createStrict('option', defaultOptionProps);

/**
 * "p" (block)
 */
const defaultParagraphProps: StrictReactDOMProps = { style: styles.block };
export const p: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('p', defaultParagraphProps);

/**
 * "pre" (block)
 */
const defaultPreProps: StrictReactDOMProps = {
  style: [styles.block, styles.codePre]
};
export const pre: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('pre', defaultPreProps);

/**
 * "section" (block)
 */
const defaultSectionProps: StrictReactDOMProps = { style: styles.block };
export const section: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('section', defaultSectionProps);

/**
 * "select" (inline-block)
 */
const defaultSelectProps: StrictReactDOMSelectProps = {
  style: [styles.inlineblock]
};
export const select: React$AbstractComponent<
  StrictReactDOMSelectProps,
  StrictHTMLSelectElement
> = createStrict('select', defaultSelectProps);

/**
 * "span" (inline)
 */
const defaultSpanProps: StrictReactDOMProps = { style: styles.inline };
export const span: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('span', defaultSpanProps);

/**
 * "strong" (inline)
 */
const defaultStrongProps: StrictReactDOMProps = {
  style: [styles.inline, styles.strong]
};
export const strong: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('strong', defaultStrongProps);

/**
 * "sub" (inline)
 */
const defaultSubscriptProps: StrictReactDOMProps = { style: styles.inline };
export const sub: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('sub', defaultSubscriptProps);

/**
 * "sup" (inline)
 */
const defaultSuperscriptProps: StrictReactDOMProps = { style: styles.inline };
export const sup: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('sup', defaultSuperscriptProps);

/**
 * "textarea" (inline-block)
 */
const defaultTextareaProps: StrictReactDOMTextAreaProps = {
  dir: 'auto',
  style: [styles.inlineblock, styles.textarea]
};
export const textarea: React$AbstractComponent<
  StrictReactDOMTextAreaProps,
  StrictHTMLTextAreaElement
> = createStrict('textarea', defaultTextareaProps);

/**
 * "ul" (block)
 */
const defaultUnorderedListProps: StrictReactDOMProps = { style: styles.block };
export const ul: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('ul', defaultUnorderedListProps);
