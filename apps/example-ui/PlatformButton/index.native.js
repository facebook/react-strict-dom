/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

/**
 * Example of a platform-specific button. Here we use
 * Pressable but it could be a custom native component too.
 */
export function PlatformButton(props) {
  return (
    <Pressable style={styles.pressable}>
      <Text style={styles.text}>{props.children} (native)</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    alignSelf: 'flex-start',
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
});
