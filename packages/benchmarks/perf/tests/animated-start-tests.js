/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const React = require('react');
const { createRoot } = require('react-dom/client');
const { flushSync } = require('react-dom');

const { createSuite } = require('../helpers');
const { animated, Animation } = require('../react-strict-animated');
const {
  installAnimateMock,
  setupDomGlobals,
  teardownDomGlobals
} = require('../animated-helpers');

function AnimatedStartFixture({ onReady }) {
  const valueA = Animation.useValue(0);
  const valueB = Animation.useValue(0);
  const valueC = Animation.useValue(0);

  React.useLayoutEffect(() => {
    onReady({ valueA, valueB, valueC });
  }, [onReady, valueA, valueB, valueC]);

  const animatedStyle = React.useMemo(
    () => ({
      opacity: valueA,
      transform: [{ translateX: valueB }, { scale: valueC }]
    }),
    [valueA, valueB, valueC]
  );

  return React.createElement(animated.div, { animatedStyle });
}

function runSuite(options) {
  const { suite, test } = createSuite('animated.start', options);

  setupDomGlobals();
  installAnimateMock();

  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  let values = null;

  const onReady = (nextValues) => {
    values = nextValues;
  };

  flushSync(() => {
    root.render(React.createElement(AnimatedStartFixture, { onReady }));
  });

  function getValues() {
    if (values == null) {
      throw new Error('Animated values were not captured for start tests.');
    }
    return values;
  }

  let toggle = false;

  test('timing start', () => {
    toggle = !toggle;
    const { valueA } = getValues();
    const animation = Animation.timing(valueA, {
      toValue: toggle ? 1 : 0,
      duration: 500
    });
    animation.start();
  });

  test('spring start', () => {
    toggle = !toggle;
    const { valueB } = getValues();
    const animation = Animation.spring(valueB, {
      toValue: toggle ? 1 : 0,
      tension: 40,
      friction: 7
    });
    animation.start();
  });

  test('parallel start', () => {
    toggle = !toggle;
    const { valueA, valueB, valueC } = getValues();
    const parallel = Animation.parallel([
      Animation.timing(valueA, { toValue: toggle ? 1 : 0, duration: 400 }),
      Animation.spring(valueB, { toValue: toggle ? 1 : 0, tension: 50 }),
      Animation.timing(valueC, { toValue: toggle ? 1 : 0, duration: 300 })
    ]);
    parallel.start();
  });

  test('sequence start', () => {
    toggle = !toggle;
    const { valueA, valueB, valueC } = getValues();
    const sequence = Animation.sequence([
      Animation.timing(valueA, { toValue: toggle ? 1 : 0, duration: 200 }),
      Animation.spring(valueB, { toValue: toggle ? 1 : 0, tension: 60 }),
      Animation.timing(valueC, { toValue: toggle ? 1 : 0, duration: 250 })
    ]);
    sequence.start();
  });

  suite.on('complete', () => {
    root.unmount();
    container.remove();
    teardownDomGlobals();
  });

  suite.run();
}

module.exports = runSuite;
