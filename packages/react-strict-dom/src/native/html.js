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
import type { StrictReactDOMListItemProps } from '../types/StrictReactDOMListItemProps';
import type { StrictReactDOMOptionProps } from '../types/StrictReactDOMOptionProps';
import type { StrictReactDOMOptionGroupProps } from '../types/StrictReactDOMOptionGroupProps';
import type { StrictReactDOMSelectProps } from '../types/StrictReactDOMSelectProps';
import type { StrictReactDOMTextAreaProps } from '../types/StrictReactDOMTextAreaProps';

// $FlowFixMe[nonstrict-import]
import { createStrictDOMComponent as createStrict } from './modules/createStrictDOMComponent';
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
    color: 'blue',
    textDecorationLine: 'underline'
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

export const a: React$AbstractComponent<
  StrictReactDOMAnchorProps,
  StrictHTMLElement
> = createStrict('a', { style: styles.a });
export const article: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('article');
export const aside: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('aside');
export const b: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('b', { style: styles.bold });
export const bdi: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('bdi');
export const bdo: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('bdo');
export const blockquote: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('blockquote');
export const br: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('br');
export const button: React$AbstractComponent<
  StrictReactDOMButtonProps,
  StrictHTMLElement
> = createStrict('button', {
  style: styles.button,
  type: 'button'
});
export const code: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('code', { style: styles.code });
export const del: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('del', { style: styles.lineThrough });
export const div: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('div');
export const em: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('em', { style: styles.italic });
export const fieldset: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('fieldset');
export const footer: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('footer');
export const form: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('form');
export const h1: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h1', headingProps);
export const h2: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h2', headingProps);
export const h3: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h3', headingProps);
export const h4: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h4', headingProps);
export const h5: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h5', headingProps);
export const h6: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('h6', headingProps);
export const header: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('header');
export const hr: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('hr', { style: styles.hr });
export const i: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('i', { style: styles.italic });
export const img: React$AbstractComponent<
  StrictReactDOMImageProps,
  StrictHTMLImageElement
> = createStrict('img', { style: styles.img });
export const input: React$AbstractComponent<
  StrictReactDOMInputProps,
  StrictHTMLInputElement
> = createStrict('input', {
  style: styles.input
});
export const ins: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('ins', { style: styles.underline });
export const kbd: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('kbd', { style: styles.code });
export const label: React$AbstractComponent<
  StrictReactDOMLabelProps,
  StrictHTMLElement
> = createStrict('label');
export const li: React$AbstractComponent<
  StrictReactDOMListItemProps,
  StrictHTMLElement
> = createStrict('li');
export const main: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('main');
export const nav: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('nav');
export const ol: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('ol');
export const p: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('p');
export const pre: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('pre', { style: styles.code });
export const option: React$AbstractComponent<
  StrictReactDOMOptionProps,
  StrictHTMLOptionElement
> = createStrict('option');
export const optgroup: React$AbstractComponent<
  StrictReactDOMOptionGroupProps,
  StrictHTMLElement
> = createStrict('optgroup');
export const s: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('s', { style: styles.lineThrough });
export const section: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('section');
export const select: React$AbstractComponent<
  StrictReactDOMSelectProps,
  StrictHTMLSelectElement
> = createStrict('select');
export const span: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('span');
export const strong: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('strong', { style: styles.bold });
export const sub: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('sub');
export const sup: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('sup');
export const textarea: React$AbstractComponent<
  StrictReactDOMTextAreaProps,
  StrictHTMLTextAreaElement
> = createStrict('textarea', {
  style: styles.textarea
});
export const u: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('u', { style: styles.underline });
export const ul: React$AbstractComponent<
  StrictReactDOMProps,
  StrictHTMLElement
> = createStrict('ul');
