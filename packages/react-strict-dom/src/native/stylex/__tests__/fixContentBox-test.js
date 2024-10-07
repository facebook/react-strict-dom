/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { fixContentBox } from '../fixContentBox';

describe('fixContentBox', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn');
    console.warn.mockImplementation(() => {});
  });

  afterEach(() => {
    console.warn.mockRestore();
  });

  test('boxSizing: content-box', () => {
    const styles = {
      width: {
        boxSizing: 'content-box',
        borderWidth: 2,
        padding: 10,
        width: 100,
        // test that unrelated properties are unmodified
        overflow: 'hidden'
      },
      height: {
        boxSizing: 'content-box',
        borderWidth: 2,
        padding: 10,
        height: 50
      },
      maxWidth: {
        boxSizing: 'content-box',
        borderWidth: 2,
        padding: 10,
        maxWidth: 100
      },
      minWidth: {
        boxSizing: 'content-box',
        borderWidth: 2,
        padding: 10,
        minWidth: 100
      },
      maxHeight: {
        boxSizing: 'content-box',
        borderWidth: 2,
        padding: 10,
        maxHeight: 50
      },
      minHeight: {
        boxSizing: 'content-box',
        borderWidth: 2,
        padding: 10,
        minHeight: 50
      },
      allDifferent: {
        boxSizing: 'content-box',
        borderTopWidth: 1,
        borderRightWidth: 2,
        borderBottomWidth: 3,
        borderLeftWidth: 4,
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 30,
        paddingLeft: 40,
        width: 100,
        height: 100
      },
      auto: {
        boxSizing: 'content-box',
        borderWidth: 2,
        padding: 10,
        height: 50,
        width: 'auto'
      },
      null: {
        boxSizing: 'content-box',
        borderWidth: 2,
        padding: 10,
        height: 50,
        width: null
      },
      string: {
        boxSizing: 'content-box',
        borderWidth: 2,
        padding: 10,
        height: 50,
        width: '50%'
      }
    };

    expect(fixContentBox(styles.width)).toMatchSnapshot('width');
    expect(fixContentBox(styles.height)).toMatchSnapshot('height');
    expect(fixContentBox(styles.maxWidth)).toMatchSnapshot('maxWidth');
    expect(fixContentBox(styles.maxHeight)).toMatchSnapshot('maxHeight');
    expect(fixContentBox(styles.minWidth)).toMatchSnapshot('minWidth');
    expect(fixContentBox(styles.minHeight)).toMatchSnapshot('minHeight');
    expect(fixContentBox(styles.allDifferent)).toMatchSnapshot('allDifferent');
    expect(fixContentBox(styles.auto)).toMatchSnapshot('auto');
    expect(fixContentBox(styles.null)).toMatchSnapshot('null');
    expect(fixContentBox(styles.string)).toMatchSnapshot('string');

    expect(console.warn).toHaveBeenCalledTimes(1);
  });
});
