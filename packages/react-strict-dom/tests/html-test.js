/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { html } from 'react-strict-dom';
import { create } from 'react-test-renderer';

const emptyFunction = () => {};

const tagNames = [
  'a',
  'article',
  'aside',
  'b',
  'bdi',
  'bdo',
  'blockquote',
  'br',
  'button',
  'code',
  'div',
  'em',
  'fieldset',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hr',
  'i',
  'img',
  'input',
  'label',
  'main',
  'nav',
  'ol',
  'optgroup',
  'option',
  'p',
  'pre',
  'section',
  'select',
  'span',
  'strong',
  'sub',
  'sup',
  'textarea',
  'ul'
];

const globalAttributes = {
  'aria-activedescendant': 'activedescendant',
  'aria-atomic': true,
  'aria-autocomplete': true,
  'aria-busy': true,
  'aria-checked': true,
  'aria-colcount': 1,
  'aria-colindex': 1,
  'aria-colindextext': 'colindextext',
  'aria-colspan': 1,
  'aria-controls': 'controls',
  'aria-current': 'current',
  'aria-describedby': 'describedby',
  'aria-details': 'details',
  'aria-disabled': true,
  'aria-errormessage': 'errormessage',
  'aria-expanded': true,
  'aria-flowto': 'flowto',
  'aria-haspopup': 'menu',
  'aria-hidden': true,
  'aria-invalid': true,
  'aria-keyshortcuts': 'Shift+Space',
  'aria-label': 'Label',
  'aria-labelledby': 'labelledby',
  'aria-level': 2,
  'aria-live': true,
  'aria-modal': true,
  'aria-multiline': true,
  'aria-multiselectable': true,
  'aria-orientation': 'portrait',
  'aria-owns': 'owns',
  'aria-placeholder': 'Placeholder',
  'aria-posinset': 1,
  'aria-pressed': true,
  'aria-readonly': true,
  'aria-required': true,
  'aria-roledescription': 'Description',
  'aria-rowcount': 1,
  'aria-rowindex': 1,
  'aria-rowindextext': 'rowindextext',
  'aria-rowspan': 1,
  'aria-selected': true,
  'aria-setsize': 2,
  'aria-sort': 'ascending',
  'aria-valuemax': 10,
  'aria-valuemin': 0,
  'aria-valuenow': 5,
  'aria-valuetext': 'Five',
  autoCapitalize: true,
  autoFocus: true,
  children: 'children',
  'data-testid': 'some-test-id',
  dir: 'ltr',
  enterKeyHint: 'go',
  hidden: true,
  id: 'some-id',
  inert: true,
  inputMode: 'numeric',
  lang: 'en-US',
  role: 'article',
  spellCheck: true,
  style: { '--custom-property': 'inline' },
  tabIndex: 0
};

const eventHandlers = {
  onAuxClick: emptyFunction,
  onBeforeInput: emptyFunction, // input, select, textarea
  onBlur: emptyFunction,
  onChange: emptyFunction, // input, select, textarea
  onClick: emptyFunction,
  onContextMenu: emptyFunction,
  onCopy: emptyFunction,
  onCut: emptyFunction,
  onFocus: emptyFunction,
  onFocusIn: emptyFunction,
  onFocusOut: emptyFunction,
  onFullscreenChange: emptyFunction,
  onFullscreenError: emptyFunction,
  onGotPointerCapture: emptyFunction,
  onInput: emptyFunction, // input, select, textarea
  onInvalid: emptyFunction, // input, select, textarea
  onKeyDown: emptyFunction,
  onKeyUp: emptyFunction,
  onLostPointerCapture: emptyFunction,
  onPaste: emptyFunction,
  onPointerCancel: emptyFunction,
  onPointerDown: emptyFunction,
  onPointerEnter: emptyFunction,
  onPointerLeave: emptyFunction,
  onPointerMove: emptyFunction,
  onPointerOut: emptyFunction,
  onPointerOver: emptyFunction,
  onPointerUp: emptyFunction,
  onScroll: emptyFunction,
  onSelect: emptyFunction, // input, select, textarea
  onSelectionChange: emptyFunction, // input, textarea
  onWheel: emptyFunction,
  // TEMPORARY
  onMouseDown: emptyFunction,
  onMouseEnter: emptyFunction,
  onMouseLeave: emptyFunction,
  onMouseMove: emptyFunction,
  onMouseOut: emptyFunction,
  onMouseOver: emptyFunction,
  onMouseUp: emptyFunction,
  onTouchCancel: emptyFunction,
  onTouchEnd: emptyFunction,
  onTouchMove: emptyFunction,
  onTouchStart: emptyFunction
};

describe('html', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error');
    console.error.mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  tagNames.forEach((tagName) => {
    const Component = html[tagName];

    test(`"${tagName}" is defined`, () => {
      expect(Component).toBeDefined();
    });

    test(`"${tagName}" supports global attributes`, () => {
      const root = create(<Component {...globalAttributes} />);
      expect(root.toJSON()).toMatchSnapshot();
    });

    test(`"${tagName}" supports inline event handlers`, () => {
      const root = create(<Component {...eventHandlers} />);
      expect(root.toJSON()).toMatchSnapshot();
    });

    test(`"${tagName}" ignores and warns about unsupported attributes`, () => {
      const root = create(
        <Component notSupported={true} onNotSupported={() => {}} />
      );
      expect(root.toJSON()).toMatchSnapshot();
      expect(console.error).toHaveBeenCalled();
    });

    test(`"${tagName}" supports suppressHydrationWarning attribute`, () => {
      create(<Component suppressHydrationWarning={true} />);
      expect(console.error).not.toHaveBeenCalled();
    });
  });

  test('"a" supports additional anchor attributes', () => {
    const root = create(
      <html.a
        download="download.png"
        href="https://google.com"
        referrerPolicy="no-referrer"
        rel="nofollow"
        target="_blank"
      />
    );
    expect(root.toJSON()).toMatchSnapshot();
  });

  test('"button" supports additional button attributes', () => {
    const root = create(<html.button disabled={true} type="submit" />);
    expect(root.toJSON()).toMatchSnapshot();
  });

  test('"img" supports additional image attributes', () => {
    const root = create(
      <html.img
        alt="Alt text"
        crossOrigin="anonymous"
        decoding="async"
        fetchPriority="auto"
        height={100}
        loading="lazy"
        onError={function onError() {}}
        onLoad={function onLoad() {}}
        referrerPolicy="no-referrer"
        src="https://src.jpg"
        srcSet="https://srcSet-1x.jpg 1x, https://srcSet-2x.jpg 2x"
        width={100}
      />
    );
    expect(root.toJSON()).toMatchSnapshot();
  });

  test('"input" supports additional input attributes', () => {
    const root = create(
      <html.input
        checked={true}
        defaultChecked={true}
        defaultValue="defaultValue"
        disabled={true}
        max="10"
        maxLength="10"
        min="0"
        minLength="0"
        multiple={true}
        onBeforeInput={function onBeforeInput() {}}
        onChange={function onChange() {}}
        onInput={function onInput() {}}
        onInvalid={function onInvalid() {}}
        onSelect={function onSelect() {}}
        onSelectionChange={function onSelectionChange() {}}
        placeholder="Placeholder"
        readOnly={true}
        required={true}
        step={3}
        type="text"
        value="value"
      />
    );
    expect(root.toJSON()).toMatchSnapshot();
  });

  test('"label" supports additional label attributes', () => {
    const root = create(<html.label for="some-id" />);
    expect(root.toJSON()).toMatchSnapshot();
  });

  test('"option" supports input attributes', () => {
    const root = create(
      <html.option
        defaultValue="defaultValue"
        disabled={true}
        label="label"
        value="value"
      />
    );
    expect(root.toJSON()).toMatchSnapshot();
  });

  test('"select" supports additional select attributes', () => {
    const root = create(
      <html.select
        disabled={true}
        onBeforeInput={function onBeforeInput() {}}
        onChange={function onChange() {}}
        onInput={function onInput() {}}
        onInvalid={function onInvalid() {}}
        onSelect={function onSelect() {}}
        onSelectionChange={function onSelectionChange() {}}
        readOnly={true}
        required={true}
      />
    );
    expect(root.toJSON()).toMatchSnapshot();
  });

  test('"textarea" supports additional textarea attributes', () => {
    const root = create(
      <html.textarea
        defaultValue="defaultValue"
        disabled={true}
        maxLength="10"
        minLength="0"
        onBeforeInput={function onBeforeInput() {}}
        onChange={function onChange() {}}
        onInput={function onInput() {}}
        onInvalid={function onInvalid() {}}
        onSelect={function onSelect() {}}
        onSelectionChange={function onSelectionChange() {}}
        placeholder="Placeholder"
        readOnly={true}
        required={true}
        rows={3}
        value="value"
      />
    );
    expect(root.toJSON()).toMatchSnapshot();
  });

  // Temporary while Flow adds support for typing data-* props
  test('temporary data-* props support', () => {
    const root = create(
      <html.div
        data-imgperflogname="imgperflogname"
        data-visualcompletion="visualcompletion"
      />
    );
    expect(root.toJSON()).toMatchSnapshot();
  });
});
