/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { create } from 'react-test-renderer';
import { html } from 'react-strict-dom';

function createNodeMock(element) {
  const obj = {};
  obj.addEventListener_unstable = () => {};
  obj.blur = () => {};
  obj.focus = () => {};
  obj.removeEventListener_unstable = () => {};

  return obj;
}

describe('node imperative methods', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error');
    console.error.mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  /*
  ['addEventListener', 'removeEventListener'].forEach((method) => {
    test(`"${method}" is supported`, () => {
      const ref = React.createRef();
      create(<html.input ref={ref} />, { createNodeMock });
      ref.current[method]('click', () => {});
      expect(console.error).not.toBeCalled();
    });
  });
  */

  [
    'animate',
    'click',
    'contains',
    'dispatchEvent',
    'getAttribute',
    'getBoundingClientRect',
    'getRootNode',
    'hasPointerCapture',
    'releasePointerCapture',
    'scroll',
    'scrollBy',
    'scrollIntoView',
    'scrollTo',
    'setPointerCapture',
    'select',
    'setSelectionRange',
    'showPicker'
  ].forEach((method) => {
    test(`"${method}" is unsupported`, () => {
      const ref = React.createRef();
      create(<html.input ref={ref} />, { createNodeMock });
      ref.current[method]();
      expect(console.error).toBeCalled();
    });
  });

  /*
  [
    'blur',
    'click',
    'focus',
    'error',
    'input',
    'keydown',
    'keyup',
    'load',
    'pointerdown',
    'pointerenter',
    'pointerleave',
    'pointermove',
    'pointerout',
    'pointerover',
    'pointerup',
    'scroll'
  ].forEach((eventType) => {
    test(`"${eventType}" is supported`, () => {
      const ref = React.createRef();
      create(<html.input ref={ref} />, { createNodeMock });
      ref.current.addEventListener(eventType, () => {});
      ref.current.removeEventListener(eventType, () => {});
      expect(console.error).not.toBeCalled();
    });
  });

  ['change', 'focusin', 'focusout'].forEach((eventType) => {
    test(`"${eventType}" is unsupported`, () => {
      const ref = React.createRef();
      create(<html.input ref={ref} />, { createNodeMock });
      ref.current.addEventListener(eventType, () => {});
      ref.current.removeEventListener(eventType, () => {});
      expect(console.error).toBeCalled();
    });
  });
  */
});
