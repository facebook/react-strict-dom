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
  HTMLElement
> = createStrict('a', { style: styles.a });
export const article: React$AbstractComponent<
  StrictReactDOMProps,
  HTMLElement
> = createStrict('article');
export const aside: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('aside');
export const b: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('b', { style: styles.bold });
export const bdi: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('bdi');
export const bdo: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('bdo');
export const blockquote: React$AbstractComponent<
  StrictReactDOMProps,
  HTMLElement
> = createStrict('blockquote');
export const br: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('br');
export const button: React$AbstractComponent<
  StrictReactDOMButtonProps,
  HTMLElement
> = createStrict('button', {
  style: styles.button,
  type: 'button'
});
export const code: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('code', { style: styles.code });
export const del: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('del', { style: styles.lineThrough });
export const div: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('div');
export const em: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('em', { style: styles.italic });
export const fieldset: React$AbstractComponent<
  StrictReactDOMProps,
  HTMLElement
> = createStrict('fieldset');
export const footer: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('footer');
export const form: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('form');
export const h1: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('h1', headingProps);
export const h2: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('h2', headingProps);
export const h3: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('h3', headingProps);
export const h4: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('h4', headingProps);
export const h5: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('h5', headingProps);
export const h6: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('h6', headingProps);
export const header: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('header');
export const hr: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('hr', { style: styles.hr });
export const i: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('i', { style: styles.italic });
export const img: React$AbstractComponent<
  StrictReactDOMImageProps,
  HTMLImageElement
> = createStrict('img', { style: styles.img });
export const input: React$AbstractComponent<
  StrictReactDOMInputProps,
  HTMLInputElement
> = createStrict('input', {
  style: styles.input
});
export const ins: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('ins', { style: styles.underline });
export const kbd: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('kbd', { style: styles.code });
export const label: React$AbstractComponent<
  StrictReactDOMLabelProps,
  HTMLElement
> = createStrict('label');
export const li: React$AbstractComponent<
  StrictReactDOMListItemProps,
  HTMLElement
> = createStrict('li');
export const main: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('main');
export const nav: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('nav');
export const ol: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('ol');
export const p: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('p');
export const pre: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('pre', { style: styles.code });
export const option: React$AbstractComponent<
  StrictReactDOMOptionProps,
  HTMLOptionElement
> = createStrict('option');
export const optgroup: React$AbstractComponent<
  StrictReactDOMOptionGroupProps,
  HTMLElement
> = createStrict('optgroup');
export const s: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('s', { style: styles.lineThrough });
export const section: React$AbstractComponent<
  StrictReactDOMProps,
  HTMLElement
> = createStrict('section');
export const select: React$AbstractComponent<
  StrictReactDOMSelectProps,
  HTMLSelectElement
> = createStrict('select');
export const span: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('span');
export const strong: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('strong', { style: styles.bold });
export const sub: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('sub');
export const sup: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('sup');
export const textarea: React$AbstractComponent<
  StrictReactDOMTextAreaProps,
  HTMLTextAreaElement
> = createStrict('textarea', {
  style: styles.textarea
});
export const u: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('u', { style: styles.underline });
export const ul: React$AbstractComponent<StrictReactDOMProps, HTMLElement> =
  createStrict('ul');
