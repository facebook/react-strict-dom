/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { css, html } from 'react-strict-dom';
import { animated, Animation } from 'react-strict-animated';

export default function DelayDemo() {
  const opacity1 = Animation.useValue(0.2);
  const opacity2 = Animation.useValue(0.2);
  const opacity3 = Animation.useValue(0.2);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const runAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    Animation.sequence([
      Animation.parallel([
        Animation.sequence([
          Animation.timing(opacity1, { toValue: 1, duration: 300 }),
          Animation.delay(700)
        ]),
        Animation.sequence([
          Animation.delay(200),
          Animation.timing(opacity2, { toValue: 1, duration: 300 }),
          Animation.delay(500)
        ]),
        Animation.sequence([
          Animation.delay(400),
          Animation.timing(opacity3, { toValue: 1, duration: 300 }),
          Animation.delay(300)
        ])
      ]),
      Animation.parallel([
        Animation.timing(opacity1, { toValue: 0.2, duration: 400 }),
        Animation.timing(opacity2, { toValue: 0.2, duration: 400 }),
        Animation.timing(opacity3, { toValue: 0.2, duration: 400 })
      ])
    ]).start(() => {
      setIsAnimating(false);
    });
  };

  return (
    <>
      <html.div style={styles.boxContainer}>
        <html.div style={styles.row}>
          <animated.div
            animatedStyle={{ opacity: opacity1 }}
            style={styles.circle1}
          />
          <animated.div
            animatedStyle={{ opacity: opacity2 }}
            style={styles.circle2}
          />
          <animated.div
            animatedStyle={{ opacity: opacity3 }}
            style={styles.circle3}
          />
        </html.div>
      </html.div>
      <html.div onClick={runAnimation} style={styles.button}>
        <html.span style={styles.buttonText}>
          {isAnimating ? 'Staggering...' : 'Staggered Fade'}
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
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16
  },
  circle1: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EF4444'
  },
  circle2: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F59E0B'
  },
  circle3: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#22C55E'
  },
  button: {
    display: 'flex',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(245, 158, 11, 0.4)',
    paddingBlock: 10,
    paddingInline: 20,
    borderRadius: 10,
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#F59E0B',
    fontWeight: '600',
    fontSize: 14
  }
});
