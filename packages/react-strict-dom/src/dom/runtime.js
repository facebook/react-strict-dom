/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { StrictReactDOMProps } from '../types/StrictReactDOMProps';

type StrictReactDOMPropsStyle = StrictReactDOMProps['style'];

import * as stylex from '@stylexjs/stylex';

// set this on the root, probably in the theme context
// const fontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';

const styles = stylex.create({
  // reset all 'block' elements
  block: {
    margin: 0,
    padding: 0
  },
  // reset all 'inline' text elements
  inline: {
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
  list: {
    listStyle: 'none'
  },
  strong: {
    fontWeight: 'bold'
  },
  textarea: {
    borderWidth: 1,
    borderStyle: 'solid',
    resize: 'vertical'
  }
});

const a: StrictReactDOMPropsStyle = styles.inline;
const article: StrictReactDOMPropsStyle = styles.block;
const aside: StrictReactDOMPropsStyle = styles.block;
const b: StrictReactDOMPropsStyle = styles.inline;
const bdi: StrictReactDOMPropsStyle = styles.inline;
const bdo: StrictReactDOMPropsStyle = styles.inline;
const blockquote: StrictReactDOMPropsStyle = styles.block;
const br: StrictReactDOMPropsStyle = null;
const button: StrictReactDOMPropsStyle = [styles.inlineblock, styles.button];
const code: StrictReactDOMPropsStyle = [styles.inline, styles.codePre];
const del: StrictReactDOMPropsStyle = null;
const div: StrictReactDOMPropsStyle = styles.block;
const em: StrictReactDOMPropsStyle = styles.inline;
const fieldset: StrictReactDOMPropsStyle = styles.block;
const footer: StrictReactDOMPropsStyle = styles.block;
const form: StrictReactDOMPropsStyle = styles.block;
const heading: StrictReactDOMPropsStyle = [styles.block, styles.heading];
const header: StrictReactDOMPropsStyle = styles.block;
const hr: StrictReactDOMPropsStyle = [styles.block, styles.hr];
const i: StrictReactDOMPropsStyle = styles.inline;
const img: StrictReactDOMPropsStyle = styles.img;
const input: StrictReactDOMPropsStyle = [styles.inlineblock, styles.input];
const ins: StrictReactDOMPropsStyle = null;
const kbd: StrictReactDOMPropsStyle = null;
const label: StrictReactDOMPropsStyle = styles.inline;
const li: StrictReactDOMPropsStyle = styles.block;
const main: StrictReactDOMPropsStyle = styles.block;
const mark: StrictReactDOMPropsStyle = styles.inline;
const nav: StrictReactDOMPropsStyle = styles.block;
const ol: StrictReactDOMPropsStyle = [styles.list, styles.block];
const optgroup: StrictReactDOMPropsStyle = null;
const option: StrictReactDOMPropsStyle = null;
const p: StrictReactDOMPropsStyle = styles.block;
const pre: StrictReactDOMPropsStyle = [styles.block, styles.codePre];
const s: StrictReactDOMPropsStyle = null;
const section: StrictReactDOMPropsStyle = styles.block;
const select: StrictReactDOMPropsStyle = styles.inlineblock;
const span: StrictReactDOMPropsStyle = styles.inline;
const strong: StrictReactDOMPropsStyle = [styles.inline, styles.strong];
const sub: StrictReactDOMPropsStyle = styles.inline;
const sup: StrictReactDOMPropsStyle = styles.inline;
const textarea: StrictReactDOMPropsStyle = [
  styles.inlineblock,
  styles.textarea
];
const u: StrictReactDOMPropsStyle = null;
const ul: StrictReactDOMPropsStyle = [styles.list, styles.block];

export const defaultStyles = {
  a: a as typeof a,
  article: article as typeof article,
  aside: aside as typeof aside,
  b: b as typeof b,
  bdi: bdi as typeof bdi,
  bdo: bdo as typeof bdo,
  blockquote: blockquote as typeof blockquote,
  br: br as typeof br,
  button: button as typeof button,
  code: code as typeof code,
  del: del as typeof del,
  div: div as typeof div,
  em: em as typeof em,
  fieldset: fieldset as typeof fieldset,
  footer: footer as typeof footer,
  form: form as typeof form,
  h1: heading as typeof heading,
  h2: heading as typeof heading,
  h3: heading as typeof heading,
  h4: heading as typeof heading,
  h5: heading as typeof heading,
  h6: heading as typeof heading,
  header: header as typeof header,
  hr: hr as typeof hr,
  i: i as typeof i,
  img: img as typeof img,
  input: input as typeof input,
  ins: ins as typeof ins,
  kbd: kbd as typeof kbd,
  label: label as typeof label,
  li: li as typeof li,
  main: main as typeof main,
  mark: mark as typeof mark,
  nav: nav as typeof nav,
  ol: ol as typeof ol,
  optgroup: optgroup as typeof optgroup,
  option: option as typeof option,
  p: p as typeof p,
  pre: pre as typeof pre,
  s: s as typeof s,
  section: section as typeof section,
  select: select as typeof select,
  span: span as typeof span,
  strong: strong as typeof strong,
  sub: sub as typeof sub,
  sup: sup as typeof sup,
  textarea: textarea as typeof textarea,
  u: u as typeof u,
  ul: ul as typeof ul
};

export const resolveStyle = stylex.props;
