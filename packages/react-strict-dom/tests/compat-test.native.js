/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { css, compat, html } from 'react-strict-dom';
import { act, create } from 'react-test-renderer';
import { Image, Pressable, Text, TextInput, View } from 'react-native';

describe('<compat.native>', () => {
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

  test('errors if no function child', () => {
    expect(() =>
      create(
        <compat.native>
          <View />;
        </compat.native>
      )
    ).toThrow(Error);
  });

  test('default', () => {
    const styles = css.create({
      block: {
        paddingInline: '2rem'
      }
    });

    let root;
    act(() => {
      root = create(
        <compat.native style={styles.block}>
          {(nativeProps) => {
            return <Pressable {...nativeProps} accessibilityLabel="label" />;
          }}
        </compat.native>
      );
    });
    expect(root.toJSON()).toMatchSnapshot('default');
  });

  test('"as" equals "image"', () => {
    const styles = css.create({
      image: {
        aspectRatio: '16/9'
      }
    });

    let root;
    act(() => {
      root = create(
        <compat.native
          as="image"
          srcSet="1x.img, 2x.img 2x"
          style={styles.image}
        >
          {(nativeProps) => (
            <Image {...nativeProps} accessibilityLabel="label" />
          )}
        </compat.native>
      );
    });
    expect(root.toJSON()).toMatchSnapshot('as=image');
  });

  test('"as" equals "input"', () => {
    const styles = css.create({
      input: {
        '::placeholder': {
          color: 'green'
        }
      }
    });

    let root;
    act(() => {
      root = create(
        <compat.native as="input" style={styles.input} type="password">
          {(nativeProps) => (
            <TextInput {...nativeProps} accessibilityLabel="label" />
          )}
        </compat.native>
      );
    });
    expect(root.toJSON()).toMatchSnapshot('as=input');
  });

  test('"as" equals "text"', () => {
    const styles = css.create({
      text: {
        color: 'blue',
        lineClamp: 3
      }
    });

    let root;
    act(() => {
      root = create(
        <compat.native as="text" style={styles.text}>
          {(nativeProps) => (
            <Text {...nativeProps} accessibilityLabel="label" />
          )}
        </compat.native>
      );
    });
    expect(root.toJSON()).toMatchSnapshot('as=text');
  });

  test('"as" equals "textarea"', () => {
    const styles = css.create({
      textarea: {}
    });

    let root;
    act(() => {
      root = create(
        <compat.native as="textarea" rows={3} style={styles.textarea}>
          {(nativeProps) => (
            <TextInput {...nativeProps} accessibilityLabel="label" />
          )}
        </compat.native>
      );
    });
    expect(root.toJSON()).toMatchSnapshot('as=textarea');
  });

  test('"as" equals "view"', () => {
    const styles = css.create({
      view: {
        paddingInline: '2rem'
      }
    });

    let root;
    act(() => {
      root = create(
        <compat.native as="view" style={styles.view}>
          {(nativeProps) => (
            <View {...nativeProps} accessibilityLabel="label" />
          )}
        </compat.native>
      );
    });
    expect(root.toJSON()).toMatchSnapshot('as=view');
  });

  test('nested', () => {
    const styles = css.create({
      block: {
        color: 'red'
      }
    });

    let root;
    act(() => {
      root = create(
        <compat.native style={styles.block}>
          {(nativeProps) => (
            <View {...nativeProps} accessibilityLabel="label">
              <html.span>back to html</html.span>
            </View>
          )}
        </compat.native>
      );
    });
    expect(root.toJSON()).toMatchSnapshot('nested');
  });
});
