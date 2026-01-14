/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { css, html } from 'react-strict-dom';
import { animated, Animation } from 'react-strict-animated';

export default function TimingDemo() {
  const opacity = Animation.useValue(0.3);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const runAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    Animation.sequence([
      Animation.timing(opacity, { toValue: 1, duration: 500 }),
      Animation.timing(opacity, { toValue: 0.3, duration: 500 })
    ]).start(() => {
      setIsAnimating(false);
    });
  };

  return (
    <>
      <html.div style={styles.boxContainer}>
        <animated.div animatedStyle={{ opacity }} style={styles.box} />
      </html.div>
      <html.div onClick={runAnimation} style={styles.button}>
        <html.span style={styles.buttonText}>
          {isAnimating ? 'Animating...' : 'Fade In/Out'}
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
    width: 70,
    height: 70,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    opacity: 0.3
  },
  button: {
    display: 'flex',
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(59, 130, 246, 0.4)',
    paddingBlock: 10,
    paddingInline: 20,
    borderRadius: 10,
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#3B82F6',
    fontWeight: '600',
    fontSize: 14
  }
});
