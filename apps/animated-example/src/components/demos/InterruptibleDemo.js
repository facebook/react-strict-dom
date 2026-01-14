/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { css, html } from 'react-strict-dom';
import { animated, Animation } from 'react-strict-animated';

export default function InterruptibleDemo() {
  const translateX = Animation.useValue(0);
  const [isLeft, setIsLeft] = React.useState(true);

  const toggle = () => {
    const targetX = isLeft ? 80 : 0;
    setIsLeft(!isLeft);

    // Starting a new animation automatically interrupts any running animation
    // on the same value and starts from the current position
    Animation.spring(translateX, {
      toValue: targetX,
      stiffness: 180,
      damping: 12
    }).start();
  };

  return (
    <>
      <html.div style={styles.boxContainer}>
        <html.div style={styles.track}>
          <animated.div
            animatedStyle={{ transform: [{ translateX }] }}
            style={styles.box}
          />
        </html.div>
      </html.div>
      <html.p style={styles.hint}>Tap rapidly to interrupt</html.p>
      <html.div onClick={toggle} style={styles.button}>
        <html.span style={styles.buttonText}>
          {isLeft ? 'Move Right' : 'Move Left'}
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
  track: {
    width: 120,
    height: 44,
    backgroundColor: 'rgba(168, 85, 247, 0.15)',
    borderRadius: 22,
    padding: 4,
    display: 'flex',
    alignItems: 'center'
  },
  box: {
    width: 36,
    height: 36,
    backgroundColor: '#A855F7',
    borderRadius: 18
  },
  hint: {
    fontSize: 12,
    color: 'rgba(168, 85, 247, 0.7)',
    textAlign: 'center',
    marginBottom: 8
  },
  button: {
    display: 'flex',
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(168, 85, 247, 0.4)',
    paddingBlock: 10,
    paddingInline: 20,
    borderRadius: 10,
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#A855F7',
    fontWeight: '600',
    fontSize: 14
  }
});
