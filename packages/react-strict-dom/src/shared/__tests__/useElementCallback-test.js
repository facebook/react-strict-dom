/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { useElementCallback as useConnectedCallback } from '../useElementCallback';

describe('useConnectedCallback', () => {
  let root;
  let rootNode;

  const TestComponent = ({ callback, testKey }) => {
    const ref = useConnectedCallback(callback);
    return <div data-test-key={testKey} key={testKey} ref={ref} />;
  };

  beforeEach(() => {
    rootNode = document.createElement('div');
    document.body.appendChild(rootNode);
    root = createRoot(rootNode);
  });

  afterEach(() => {
    document.body.removeChild(rootNode);
    rootNode = null;
    root = null;
  });

  test('callback without cleanup', () => {
    const callback = jest.fn();
    React.act(() => {
      root.render(<TestComponent callback={callback} />);
    });
    expect(callback).toBeCalledTimes(1);
    React.act(() => {
      root.render(null);
    });
    expect(callback).toBeCalledTimes(1);
  });

  test('callback with cleanup', () => {
    const cleanup = jest.fn();
    const callback = jest.fn(() => {
      return cleanup;
    });
    React.act(() => {
      root.render(<TestComponent callback={callback} />);
    });
    expect(callback).toBeCalledTimes(1);
    expect(cleanup).toBeCalledTimes(0);
    React.act(() => {
      root.render(null);
    });
    expect(callback).toBeCalledTimes(1);
    expect(cleanup).toBeCalledTimes(1);
  });

  test('change of callback', () => {
    const log = [];
    React.act(() => {
      const callback = () => {
        log.push('callback 1');
        return () => {
          log.push('callback 1 cleanup');
        };
      };
      root.render(<TestComponent callback={callback} testKey="foo" />);
    });

    React.act(() => {
      const callback = () => {
        log.push('callback 2');
        return () => {
          log.push('callback 2 cleanup');
        };
      };
      root.render(<TestComponent callback={callback} testKey="foo" />);
    });

    React.act(() => {
      root.render(null);
    });

    expect(log).toEqual([
      'callback 1',
      'callback 1 cleanup',
      'callback 2',
      'callback 2 cleanup'
    ]);
  });

  test('change of host element instance', () => {
    const log = [];
    const getKey = (node) => node.getAttribute('data-test-key');
    const callback = (target) => {
      const key = getKey(target);
      log.push(`callback: ${key}`);
      return () => {
        log.push(`callback cleanup: ${key}`);
      };
    };

    React.act(() => {
      root.render(<TestComponent callback={callback} testKey="foo" />);
    });

    React.act(() => {
      root.render(<TestComponent callback={callback} testKey="bar" />);
    });

    React.act(() => {
      root.render(null);
    });

    expect(log).toEqual([
      'callback: foo',
      'callback cleanup: foo',
      'callback: bar',
      'callback cleanup: bar'
    ]);
  });
});
