/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { html } from 'react-strict-dom';
import { render } from '@testing-library/react';

describe('node imperative methods', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error');
    console.error.mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  test.skip('focus options polyfill', () => {
    const ref = React.createRef();
    const { container } = render(<html.div ref={ref} />);
    ref.current.focus({ preventScroll: true });
    expect(console.error).not.toBeCalled();
    expect(container.firstChild.getAttribute('tabIndex')).toBe('-1');
  });
});
