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
const label: StrictReactDOMPropsStyle = styles.inline;
const li: StrictReactDOMPropsStyle = styles.block;
const main: StrictReactDOMPropsStyle = styles.block;
const nav: StrictReactDOMPropsStyle = styles.block;
const ol: StrictReactDOMPropsStyle = styles.block;
const optgroup: StrictReactDOMPropsStyle = null;
const option: StrictReactDOMPropsStyle = null;
const p: StrictReactDOMPropsStyle = styles.block;
const pre: StrictReactDOMPropsStyle = [styles.block, styles.codePre];
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
const ul: StrictReactDOMPropsStyle = styles.block;

export const defaultStyles = {
  a,
  article,
  aside,
  b,
  bdi,
  bdo,
  blockquote,
  br,
  button,
  code,
  div,
  em,
  fieldset,
  footer,
  form,
  h1: heading,
  h2: heading,
  h3: heading,
  h4: heading,
  h5: heading,
  h6: heading,
  header,
  hr,
  i,
  img,
  input,
  label,
  li,
  main,
  nav,
  ol,
  optgroup,
  option,
  p,
  pre,
  section,
  select,
  span,
  strong,
  sub,
  sup,
  textarea,
  ul
};
