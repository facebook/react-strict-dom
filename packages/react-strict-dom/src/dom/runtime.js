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
  a: (a: typeof a),
  article: (article: typeof article),
  aside: (aside: typeof aside),
  b: (b: typeof b),
  bdi: (bdi: typeof bdi),
  bdo: (bdo: typeof bdo),
  blockquote: (blockquote: typeof blockquote),
  br: (br: typeof br),
  button: (button: typeof button),
  code: (code: typeof code),
  div: (div: typeof div),
  em: (em: typeof em),
  fieldset: (fieldset: typeof fieldset),
  footer: (footer: typeof footer),
  form: (form: typeof form),
  h1: (heading: typeof heading),
  h2: (heading: typeof heading),
  h3: (heading: typeof heading),
  h4: (heading: typeof heading),
  h5: (heading: typeof heading),
  h6: (heading: typeof heading),
  header: (header: typeof header),
  hr: (hr: typeof hr),
  i: (i: typeof i),
  img: (img: typeof img),
  input: (input: typeof input),
  label: (label: typeof label),
  li: (li: typeof li),
  main: (main: typeof main),
  nav: (nav: typeof nav),
  ol: (ol: typeof ol),
  optgroup: (optgroup: typeof optgroup),
  option: (option: typeof option),
  p: (p: typeof p),
  pre: (pre: typeof pre),
  section: (section: typeof section),
  select: (select: typeof select),
  span: (span: typeof span),
  strong: (strong: typeof strong),
  sub: (sub: typeof sub),
  sup: (sup: typeof sup),
  textarea: (textarea: typeof textarea),
  ul: (ul: typeof ul)
};
