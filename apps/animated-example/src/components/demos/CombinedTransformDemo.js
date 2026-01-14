/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { css, html } from 'react-strict-dom';
import { animated, Animation } from 'react-strict-animated';

export default function CombinedTransformDemo() {
  const translateX = Animation.useValue(0);
  const translateY = Animation.useValue(0);
  const scale = Animation.useValue(1);
  const rotate = Animation.useValue(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const rotateInterpolated = Animation.interpolate(rotate, {
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  const runAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    Animation.sequence([
      Animation.parallel([
        Animation.timing(translateX, { toValue: 25, duration: 700 }),
        Animation.timing(translateY, { toValue: -18, duration: 700 }),
        Animation.timing(scale, { toValue: 1.25, duration: 700 }),
        Animation.timing(rotate, { toValue: 1, duration: 700 })
      ]),
      Animation.parallel([
        Animation.timing(translateX, { toValue: 0, duration: 700 }),
        Animation.timing(translateY, { toValue: 0, duration: 700 }),
        Animation.timing(scale, { toValue: 1, duration: 700 }),
        Animation.timing(rotate, { toValue: 0, duration: 700 })
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
            transform: [
              { translateX },
              { translateY },
              { scale },
              { rotate: rotateInterpolated }
            ]
          }}
          style={styles.box}
        />
      </html.div>
      <html.div onClick={runAnimation} style={styles.button}>
        <html.span style={styles.buttonText}>
          {isAnimating ? 'Animating...' : 'Combined Transform'}
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
    width: 50,
    height: 50,
    backgroundColor: '#10B981',
    borderRadius: 12
  },
  button: {
    display: 'flex',
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(16, 185, 129, 0.4)',
    paddingBlock: 10,
    paddingInline: 20,
    borderRadius: 10,
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#10B981',
    fontWeight: '600',
    fontSize: 14
  }
});
