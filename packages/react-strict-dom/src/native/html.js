/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

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
import typeof { Pressable, Text, TextInput, View } from 'react-native';

import { createStrictDOMComponent as createStrict } from './modules/createStrictDOMComponent';
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
    fontFamily: Platform.select({ ios: 'Menlo', default: 'Courier' })
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
  input: {
    borderWidth: 1
  },
  textarea: {
    verticalAlign: 'top'
  }
});

const headingProps = {
  dir: 'auto',
  style: styles.heading
};

export const a: React$AbstractComponent<StrictReactDOMAnchorProps, Text> =
  createStrict('a', { dir: 'auto', style: styles.a });
export const article: React$AbstractComponent<StrictReactDOMProps, View> =
  createStrict('article');
export const aside: React$AbstractComponent<StrictReactDOMProps, View> =
  createStrict('aside');
export const b: React$AbstractComponent<StrictReactDOMProps, Text> =
  createStrict('b', { style: styles.bold });
export const bdi: React$AbstractComponent<StrictReactDOMProps, Text> =
  createStrict('bdi', { dir: 'auto' });
export const bdo: React$AbstractComponent<StrictReactDOMProps, Text> =
  createStrict('bdo', { dir: 'auto' });
export const blockquote: React$AbstractComponent<StrictReactDOMProps, View> =
  createStrict('blockquote');
export const br: React$AbstractComponent<StrictReactDOMProps, Text> =
  createStrict('br');
export const button: React$AbstractComponent<
  StrictReactDOMButtonProps,
  Pressable
> = createStrict('button', {
  style: styles.button,
  type: 'button'
});
export const code: React$AbstractComponent<StrictReactDOMProps, Text> =
  createStrict('code', { style: styles.code });
export const div: React$AbstractComponent<StrictReactDOMProps, View> =
  createStrict('div');
export const em: React$AbstractComponent<StrictReactDOMProps, Text> =
  createStrict('em', { style: styles.italic });
export const fieldset: React$AbstractComponent<StrictReactDOMProps, View> =
  createStrict('fieldset');
export const footer: React$AbstractComponent<StrictReactDOMProps, View> =
  createStrict('footer');
export const form: React$AbstractComponent<StrictReactDOMProps, View> =
  createStrict('form');
export const h1: React$AbstractComponent<StrictReactDOMProps, Text> =
  createStrict('h1', headingProps);
export const h2: React$AbstractComponent<StrictReactDOMProps, Text> =
  createStrict('h2', headingProps);
export const h3: React$AbstractComponent<StrictReactDOMProps, Text> =
  createStrict('h3', headingProps);
export const h4: React$AbstractComponent<StrictReactDOMProps, Text> =
  createStrict('h4', headingProps);
export const h5: React$AbstractComponent<StrictReactDOMProps, Text> =
  createStrict('h5', headingProps);
export const h6: React$AbstractComponent<StrictReactDOMProps, Text> =
  createStrict('h6', headingProps);
export const header: React$AbstractComponent<StrictReactDOMProps, View> =
  createStrict('header');
export const hr: React$AbstractComponent<StrictReactDOMProps, View> =
  createStrict('hr', { style: styles.hr });
export const i: React$AbstractComponent<StrictReactDOMProps, Text> =
  createStrict('i', { style: styles.italic });
export const img: React$AbstractComponent<
  StrictReactDOMImageProps,
  typeof Image
> = createStrict('img');
export const input: React$AbstractComponent<
  StrictReactDOMInputProps,
  TextInput
> = createStrict('input', {
  dir: 'auto',
  style: styles.input
});
export const label: React$AbstractComponent<StrictReactDOMLabelProps, Text> =
  createStrict('label');
export const li: React$AbstractComponent<StrictReactDOMProps, View> =
  createStrict('li');
export const main: React$AbstractComponent<StrictReactDOMProps, View> =
  createStrict('main');
export const nav: React$AbstractComponent<StrictReactDOMProps, View> =
  createStrict('nav');
export const ol: React$AbstractComponent<StrictReactDOMProps, View> =
  createStrict('ol');
export const p: React$AbstractComponent<StrictReactDOMProps, Text> =
  createStrict('p');
export const pre: React$AbstractComponent<StrictReactDOMProps, Text> =
  createStrict('pre', { style: styles.code });
export const option: React$AbstractComponent<StrictReactDOMOptionProps, Text> =
  createStrict('option');
export const optgroup: React$AbstractComponent<
  StrictReactDOMOptionGroupProps,
  View
> = createStrict('optgroup');
export const section: React$AbstractComponent<StrictReactDOMProps, View> =
  createStrict('section');
export const select: React$AbstractComponent<StrictReactDOMSelectProps, View> =
  createStrict('select');
export const span: React$AbstractComponent<StrictReactDOMProps, Text> =
  createStrict('span', { dir: 'auto' });
export const strong: React$AbstractComponent<StrictReactDOMProps, Text> =
  createStrict('strong', { style: styles.bold });
export const sub: React$AbstractComponent<StrictReactDOMProps, Text> =
  createStrict('sub');
export const sup: React$AbstractComponent<StrictReactDOMProps, Text> =
  createStrict('sup');
export const textarea: React$AbstractComponent<
  StrictReactDOMTextAreaProps,
  TextInput
> = createStrict('textarea', {
  dir: 'auto',
  style: styles.input
});
export const ul: React$AbstractComponent<StrictReactDOMProps, View> =
  createStrict('ul');
