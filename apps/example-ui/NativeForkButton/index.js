/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { css, html } from 'react-strict-dom';

/**
 * Example of a cross-platform button.
 */
export function NativeForkButton(props) {
  return (
    <html.button style={styles.pressable}>
      <html.span style={styles.text}>{props.children}</html.span>
      <html.span style={styles.text}>(shared)</html.span>
    </html.button>
  );
}

const styles = css.create({
  pressable: {
    alignSelf: 'flex-start',
    backgroundColor: 'darkgreen',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    display: 'flex',
    gap: '0.25rem',
    paddingBlock: 8,
    paddingInline: 32
  },
  text: {
    color: 'white',
    fontFamily: 'Arial',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
