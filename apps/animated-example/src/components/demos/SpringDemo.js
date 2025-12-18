/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { css, html } from 'react-strict-dom';
import { animated, Animation } from 'react-strict-animated';

export default function SpringDemo() {
  const scale = Animation.useValue(1);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const runAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    Animation.sequence([
      Animation.spring(scale, {
        toValue: 1.4,
        stiffness: 300,
        damping: 10
      }),
      Animation.spring(scale, {
        toValue: 1,
        stiffness: 300,
        damping: 10
      })
    ]).start(() => {
      setIsAnimating(false);
    });
  };

  return (
    <>
      <html.div style={styles.boxContainer}>
        <animated.div
          animatedStyle={{ transform: [{ scale }] }}
          style={styles.box}
        />
      </html.div>
      <html.div onClick={runAnimation} style={styles.button}>
        <html.span style={styles.buttonText}>
          {isAnimating ? 'Bouncing...' : 'Spring Bounce'}
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
    width: 60,
    height: 60,
    backgroundColor: '#8B5CF6',
    borderRadius: 12
  },
  button: {
    display: 'flex',
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(139, 92, 246, 0.4)',
    paddingBlock: 10,
    paddingInline: 20,
    borderRadius: 10,
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#8B5CF6',
    fontWeight: '600',
    fontSize: 14
  }
});
