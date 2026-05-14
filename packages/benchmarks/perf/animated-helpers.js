/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { JSDOM } = require('jsdom');

let dom = null;
let previousGlobals = null;

function setupDomGlobals() {
  if (dom != null) {
    return dom;
  }

  dom = new JSDOM('<!doctype html><html><body></body></html>');
  const { window } = dom;

  previousGlobals = {
    window: global.window,
    document: global.document,
    HTMLElement: global.HTMLElement,
    Node: global.Node,
    navigator: Object.getOwnPropertyDescriptor(global, 'navigator')
  };

  global.window = window;
  global.document = window.document;
  global.HTMLElement = window.HTMLElement;
  global.Node = window.Node;
  Object.defineProperty(global, 'navigator', {
    value: window.navigator,
    configurable: true,
    writable: true
  });

  return dom;
}

function teardownDomGlobals() {
  if (previousGlobals == null) {
    return;
  }

  global.window = previousGlobals.window;
  global.document = previousGlobals.document;
  global.HTMLElement = previousGlobals.HTMLElement;
  global.Node = previousGlobals.Node;
  if (previousGlobals.navigator != null) {
    Object.defineProperty(global, 'navigator', previousGlobals.navigator);
  } else {
    delete global.navigator;
  }
  previousGlobals = null;

  if (dom != null) {
    dom.window.close();
    dom = null;
  }
}

function installAnimateMock() {
  if (global.HTMLElement == null) {
    throw new Error('Expected DOM globals to be installed before mocking.');
  }

  if (global.HTMLElement.prototype.animate == null) {
    global.HTMLElement.prototype.animate = () => ({
      finished: Promise.resolve(),
      cancel() {},
      currentTime: 0
    });
  }
}

module.exports = {
  installAnimateMock,
  setupDomGlobals,
  teardownDomGlobals
};
