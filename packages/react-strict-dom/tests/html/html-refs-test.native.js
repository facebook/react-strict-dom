/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { html } from 'react-strict-dom';
import { act, create } from 'react-test-renderer';

describe('<html.*> refs', () => {
  beforeEach(() => {
    // avoid console messages for these tests
    jest.spyOn(console, 'error');
    console.error.mockImplementation(() => {});
    jest.spyOn(console, 'warn');
    console.warn.mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
    console.warn.mockRestore();
    jest.clearAllMocks();
  });

  describe('imperative api', () => {
    const setSelectionMock = jest.fn();

    // This mock should only built-in host element APIs (React Native)
    function createNodeMock(element) {
      const obj = {};
      obj.blur = () => {};
      obj.focus = () => {};
      obj.offsetWidth = 15;
      obj.setSelection = setSelectionMock;
      return obj;
    }

    test('node is defined', () => {
      act(() => {
        create(
          <html.input
            ref={(node) => {
              expect(node.offsetWidth).toBe(15);
              expect(node.selectionStart).toBe(0);
              expect(node.selectionEnd).toBe(0);
              expect(() => node.setSelectionRange(1, 5)).not.toThrow();
              expect(setSelectionMock).toHaveBeenCalledWith(1, 5);
              expect(node.selectionStart).toBe(1);
              expect(node.selectionEnd).toBe(5);
            }}
          />,
          { createNodeMock }
        );
      });
    });

    // We shouldn't create a handle if there is no underlying node
    test('node is null', () => {
      act(() => {
        create(
          <html.input
            ref={(node) => {
              expect(() => node.getBoundingClientRect()).toThrow();
            }}
          />,
          { createNodeMock: () => null }
        );
      });
    });
  });
});
