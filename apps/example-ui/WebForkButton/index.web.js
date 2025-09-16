/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

/**
 * Example of a web-fork, where the default is cross-platform.
 */
export function WebForkButton(props) {
  return (
    <button style={styles.pressable} type="button">
      <span style={styles.text}>{props.children} (web)</span>
    </button>
  );
}

const styles = {
  pressable: {
    backgroundColor: 'darkgreen',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
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
};
