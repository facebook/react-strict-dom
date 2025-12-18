/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { css, html } from 'react-strict-dom';
import { animated, Animation } from 'react-strict-animated';

export default function TransformDemo() {
  const rotate = Animation.useValue(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const rotateInterpolated = Animation.interpolate(rotate, {
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const runAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    Animation.timing(rotate, {
      toValue: 1,
      duration: 800
    }).start(() => {
      rotate.setValue(0);
      setIsAnimating(false);
    });
  };

  return (
    <>
      <html.div style={styles.boxContainer}>
        <animated.div
          animatedStyle={{ transform: [{ rotate: rotateInterpolated }] }}
          style={styles.box}
        />
      </html.div>
      <html.div onClick={runAnimation} style={styles.button}>
        <html.span style={styles.buttonText}>
          {isAnimating ? 'Rotating...' : 'Rotate 360°'}
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
    backgroundColor: '#F97316',
    borderRadius: 12
  },
  button: {
    display: 'flex',
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(249, 115, 22, 0.4)',
    paddingBlock: 10,
    paddingInline: 20,
    borderRadius: 10,
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#F97316',
    fontWeight: '600',
    fontSize: 14
  }
});
