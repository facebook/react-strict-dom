/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { create } from 'react-test-renderer';
import { render } from '@testing-library/react';
import { mergeRefs } from '../mergeRefs';

describe('mergeRefs', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error');
    console.error.mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  test('warns when unsupported ref type is used', () => {
    function Component() {
      return <div ref={mergeRefs(false, 'unsupported')} />;
    }
    create(<Component />);
    expect(console.error).toHaveBeenCalled();
  });

  test('merges refs of different types', () => {
    const ref = React.createRef(null);
    let functionRefValue = null;
    let hookRef;

    function Component() {
      const functionRef = (x) => {
        functionRefValue = x;
      };
      hookRef = React.useRef(null);
      return <div ref={mergeRefs(null, ref, hookRef, functionRef)} />;
    }
    render(<Component />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(hookRef.current).toBeInstanceOf(HTMLDivElement);
    expect(functionRefValue).toBeInstanceOf(HTMLDivElement);
  });

  test('calls refs in order', () => {
    const log = [];

    function Component() {
      const refA = (x) => {
        log.push('A');
      };
      const refB = (x) => {
        log.push('B');
      };
      const refC = (x) => {
        log.push('C');
      };
      return <div ref={mergeRefs(refA, refB, refC)} />;
    }
    render(<Component />);

    expect(log).toEqual(['A', 'B', 'C']);
  });
});
