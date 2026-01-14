/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { css, html } from 'react-strict-dom';
import { animated, Animation } from 'react-strict-animated';

export default function ParallelDemo() {
  const translateX = Animation.useValue(0);
  const translateY = Animation.useValue(0);
  const opacity = Animation.useValue(1);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const runAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    Animation.sequence([
      Animation.parallel([
        Animation.timing(translateX, { toValue: 40, duration: 600 }),
        Animation.timing(translateY, { toValue: -25, duration: 600 }),
        Animation.timing(opacity, { toValue: 0.5, duration: 600 })
      ]),
      Animation.parallel([
        Animation.timing(translateX, { toValue: 0, duration: 600 }),
        Animation.timing(translateY, { toValue: 0, duration: 600 }),
        Animation.timing(opacity, { toValue: 1, duration: 600 })
      ])
    ]).start(() => {
      setIsAnimating(false);
    });
  };

  return (
    <>
      <html.div style={styles.boxContainer}>
        <animated.div
          animatedStyle={{
            opacity,
            transform: [{ translateX }, { translateY }]
          }}
          style={styles.box}
        />
      </html.div>
      <html.div onClick={runAnimation} style={styles.button}>
        <html.span style={styles.buttonText}>
          {isAnimating ? 'Moving...' : 'Move Diagonally'}
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
    backgroundColor: '#EF4444',
    borderRadius: 12
  },
  button: {
    display: 'flex',
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(239, 68, 68, 0.4)',
    paddingBlock: 10,
    paddingInline: 20,
    borderRadius: 10,
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 14
  }
});
