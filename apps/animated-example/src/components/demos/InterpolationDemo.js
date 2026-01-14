/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { css, html } from 'react-strict-dom';
import { animated, Animation } from 'react-strict-animated';

export default function InterpolationDemo() {
  const progress = Animation.useValue(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const rotate = Animation.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const scale = Animation.interpolate(progress, {
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.25, 1]
  });

  const runAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    Animation.timing(progress, {
      toValue: 1,
      duration: 1200
    }).start(() => {
      progress.setValue(0);
      setIsAnimating(false);
    });
  };

  return (
    <>
      <html.div style={styles.boxContainer}>
        <animated.div
          animatedStyle={{ transform: [{ rotate }, { scale }] }}
          style={styles.box}
        />
      </html.div>
      <html.div onClick={runAnimation} style={styles.button}>
        <html.span style={styles.buttonText}>
          {isAnimating ? 'Interpolating...' : 'Interpolate'}
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
    backgroundColor: '#EC4899',
    borderRadius: 12
  },
  button: {
    display: 'flex',
    backgroundColor: 'rgba(236, 72, 153, 0.2)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(236, 72, 153, 0.4)',
    paddingBlock: 10,
    paddingInline: 20,
    borderRadius: 10,
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#EC4899',
    fontWeight: '600',
    fontSize: 14
  }
});
