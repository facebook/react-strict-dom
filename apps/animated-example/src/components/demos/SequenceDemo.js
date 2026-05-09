/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { css, html } from 'react-strict-dom';
import { animated, Animation } from 'react-strict-animated';

export default function SequenceDemo() {
  const translateX = Animation.useValue(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const runAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    Animation.parallel([
      Animation.sequence([
        Animation.timing(translateX, { toValue: 60, duration: 350 }),
        Animation.timing(translateX, { toValue: -60, duration: 700 }),
        Animation.timing(translateX, { toValue: 0, duration: 350 })
      ])
    ]).start(() => {
      setIsAnimating(false);
    });
  };

  return (
    <>
      <html.div style={styles.boxContainer}>
        <animated.div
          animatedStyle={{ transform: [{ translateX }] }}
          style={styles.box}
        />
      </html.div>
      <html.div onClick={runAnimation} style={styles.button}>
        <html.span style={styles.buttonText}>
          {isAnimating ? 'Moving...' : 'Move in Sequence'}
        </html.span>
      </html.div>
    </>
  );
}

const styles = css.create({
  boxContainer: {
    display: 'flex',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    width: 55,
    height: 55,
    backgroundColor: '#14B8A6',
    borderRadius: 12
  },
  button: {
    display: 'flex',
    backgroundColor: 'rgba(20, 184, 166, 0.2)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(20, 184, 166, 0.4)',
    paddingBlock: 10,
    paddingInline: 20,
    borderRadius: 10,
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#14B8A6',
    fontWeight: '600',
    fontSize: 14
  }
});
