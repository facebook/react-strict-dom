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

const GRAPH_CONFIGS = {
  small: { depth: 2, transforms: 3 },
  medium: { depth: 4, transforms: 6 },
  large: { depth: 8, transforms: 12 }
};

function buildAnimatedStyle(baseValue, config) {
  const { depth, transforms } = config;
  const nodes = [];

  for (let i = 0; i < transforms; i++) {
    let node = baseValue;
    for (let step = 0; step < depth; step++) {
      node = Animation.interpolate(node, {
        inputRange: [0, 1],
        outputRange: [0, 1]
      });
    }
    nodes.push(node);
  }

  const transformsArray = nodes.map((node, index) => {
    if (index % 3 === 0) {
      return { translateX: node };
    }
    if (index % 3 === 1) {
      return { translateY: node };
    }
    return { scale: node };
  });

  return {
    opacity: nodes[0] ?? baseValue,
    transform: transformsArray
  };
}

function AnimatedFixture({ configName, onValue }) {
  const baseValue = Animation.useValue(0);

  React.useLayoutEffect(() => {
    onValue(baseValue);
  }, [onValue, baseValue]);

  const animatedStyle = React.useMemo(() => {
    return buildAnimatedStyle(baseValue, GRAPH_CONFIGS[configName]);
  }, [baseValue, configName]);

  return React.createElement(animated.div, { animatedStyle });
}

function createUpdateHarness(configName) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  let value = null;

  const onValue = (nextValue) => {
    value = nextValue;
  };

  flushSync(() => {
    root.render(React.createElement(AnimatedFixture, { configName, onValue }));
  });

  return {
    cleanup() {
      root.unmount();
      container.remove();
    },
    getValue() {
      if (value == null) {
        throw new Error('Animated value was not captured for updates.');
      }
      return value;
    }
  };
}

function runSuite(options) {
  const { suite, test } = createSuite('animated.render', options);

  setupDomGlobals();
  installAnimateMock();

  test('mount small', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    flushSync(() => {
      root.render(
        React.createElement(AnimatedFixture, {
          configName: 'small',
          onValue: () => {}
        })
      );
    });
    root.unmount();
    container.remove();
  });

  test('mount medium', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    flushSync(() => {
      root.render(
        React.createElement(AnimatedFixture, {
          configName: 'medium',
          onValue: () => {}
        })
      );
    });
    root.unmount();
    container.remove();
  });

  test('mount large', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    flushSync(() => {
      root.render(
        React.createElement(AnimatedFixture, {
          configName: 'large',
          onValue: () => {}
        })
      );
    });
    root.unmount();
    container.remove();
  });

  const smallUpdate = createUpdateHarness('small');
  const mediumUpdate = createUpdateHarness('medium');
  const largeUpdate = createUpdateHarness('large');
  let updateToggle = 0;

  test('update small', () => {
    const value = smallUpdate.getValue();
    updateToggle = updateToggle === 0 ? 1 : 0;
    flushSync(() => {
      value.setValue(updateToggle);
    });
  });

  test('update medium', () => {
    const value = mediumUpdate.getValue();
    updateToggle = updateToggle === 0 ? 1 : 0;
    flushSync(() => {
      value.setValue(updateToggle);
    });
  });

  test('update large', () => {
    const value = largeUpdate.getValue();
    updateToggle = updateToggle === 0 ? 1 : 0;
    flushSync(() => {
      value.setValue(updateToggle);
    });
  });

  suite.on('complete', () => {
    smallUpdate.cleanup();
    mediumUpdate.cleanup();
    largeUpdate.cleanup();
    teardownDomGlobals();
  });

  suite.run();
}

module.exports = runSuite;
