/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { css, html, contexts } from 'react-strict-dom';
import { act, create } from 'react-test-renderer';

global.DOMRect = class DOMRect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
};

describe('<contexts.*>', () => {
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

  describe('<ViewportProvider>', () => {
    const ReactNative = require('../../src/native/react-native');
    beforeEach(() => {
      jest
        .spyOn(ReactNative, 'useWindowDimensions')
        .mockReturnValue({ width: 960 });
    });
    afterEach(() => {
      ReactNative.useWindowDimensions.mockRestore();
    });

    test('all CSS lengths are scaled according to viewport width', () => {
      const { ViewportProvider } = contexts;

      const styles = css.create({
        container: {
          borderWidth: '1px',
          height: '100px',
          margin: '20px',
          padding: '2em',
          width: '200px',
          transform: 'translateX(10px) translateY(20px)'
        },
        text: {
          fontSize: '2rem',
          lineHeight: '1em'
        },
        textOther: {
          fontSize: 24
        }
      });

      let root;
      act(() => {
        root = create(
          <ViewportProvider viewportWidth={1280}>
            <html.div style={styles.container}>
              <html.span style={styles.text}>Scaled content</html.span>
              <html.span style={styles.textOther}>Scaled content</html.span>
            </html.div>
          </ViewportProvider>
        );
      });

      // scale factor 0.75
      expect(root.toJSON()).toMatchSnapshot('scaled lengths');
    });

    test('getClientBoundingRect() and offsetWidth return scaled values', () => {
      const { ViewportProvider } = contexts;

      function createNodeMock(element) {
        const obj = {};
        obj.blur = () => {};
        obj.focus = () => {};
        obj.getBoundingClientRect = () => new DOMRect(21, 21, 99, 99);
        obj.offsetWidth = 21;
        return obj;
      }

      let scaledDomRect, scaledOffsetWidth;
      act(() => {
        create(
          <ViewportProvider viewportWidth={1280}>
            <html.input
              ref={(node) => {
                scaledDomRect = node.getBoundingClientRect();
                scaledOffsetWidth = node.offsetWidth;
              }}
            />
          </ViewportProvider>,
          { createNodeMock }
        );
      });

      expect(scaledDomRect).toEqual(new DOMRect(28, 28, 132, 132));
      expect(scaledOffsetWidth).toEqual(28);
    });
  });
});
