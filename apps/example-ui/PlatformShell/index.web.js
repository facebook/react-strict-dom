/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

export function PlatformShell(props) {
  return (
    <div>
      <div style={styles.headingContainer}>
        <h1 style={styles.heading}>App Shell: Web</h1>
      </div>
      {props.children}
    </div>
  );
}

const styles = {
  headingContainer: {
    backgroundColor: '#e9f7fb',
    borderBottom: '1px solid #ccc',
    marginBottom: '1rem',
    padding: '0.5rem 2rem'
  },
  heading: {
    fontFamily: 'Arial',
    fontSize: '2rem',
    fontWeight: 'normal',
    margin: 0,
    padding: 0
  }
};
