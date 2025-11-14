/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { css, html, contexts } from 'react-strict-dom';
import { act, create } from 'react-test-renderer';

const { ThemeProvider } = contexts;

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

  describe('<ThemeProvider>', () => {
    test('defines global custom properties', () => {
      const customProperties = {
        // Doesn't work but should
        '--root-color': 'green',
        // Legacy: values without `--` prefix
        legacyColor: 'red'
      };
      const styles = css.create({
        root: {
          color: 'var(--root-color)'
        },
        legacy: {
          // Legacy: values convert to camelCase
          backgroundColor: 'var(--legacy-color)',
          color: 'var(--legacyColor)'
        }
      });

      let root;
      act(() => {
        root = create(
          <ThemeProvider customProperties={customProperties}>
            <html.span style={styles.root}>Expect color:green</html.span>
            <html.span style={styles.legacy}>Expect color:red</html.span>
          </ThemeProvider>
        );
      });
      expect(root.toJSON()).toMatchSnapshot();
    });

    // Legacy: values without `--` prefix

    test('string var', () => {
      const customProperties = {
        color: 'red',
        opacity: '0.25'
      };
      const styles = css.create({
        root: {
          color: 'var(--color)',
          opacity: 'var(--opacity)'
        }
      });
      let root;
      act(() => {
        root = create(
          <ThemeProvider customProperties={customProperties}>
            <html.span style={styles.root} />
          </ThemeProvider>
        );
      });
      expect(root.toJSON()).toMatchSnapshot();
    });

    test('string var with a default value', () => {
      const customProperties = {
        color: 'red'
      };
      const styles = css.create({
        root: {
          color: 'var(--color, blue)'
        },
        notFound: {
          color: 'var(--not-found, blue)'
        }
      });
      let root;
      act(() => {
        root = create(
          <ThemeProvider customProperties={customProperties}>
            <html.span style={styles.root} />
            <html.span style={styles.notFound} />
          </ThemeProvider>
        );
      });
      expect(root.toJSON()).toMatchSnapshot();
    });

    test('string var with a default value containing spaces', () => {
      const customProperties = {
        color: 'rgb(0,0,0)'
      };
      const styles = css.create({
        root: {
          color: 'var(--color, rgb( 1 , 1 , 1 ))'
        },
        notFound: {
          color: 'var(--colorNotFound, rgb( 1 , 1 , 1 ))'
        }
      });
      let root;
      act(() => {
        root = create(
          <ThemeProvider customProperties={customProperties}>
            <html.span style={styles.root} />
            <html.span style={styles.notFound} />
          </ThemeProvider>
        );
      });
      expect(root.toJSON()).toMatchSnapshot();
    });

    test('string var and falls back to default value containing a var', () => {
      const customProperties = {
        color: 'red'
      };
      const styles = css.create({
        root: {
          color: 'var(--colorNotFound, var(--color))'
        }
      });
      let root;
      act(() => {
        root = create(
          <ThemeProvider customProperties={customProperties}>
            <html.span style={styles.root} />
          </ThemeProvider>
        );
      });
      expect(root.toJSON()).toMatchSnapshot();
    });

    test('string var and falls back to a default value containing spaces and embedded var', () => {
      const customProperties = {
        test: '255'
      };
      const styles = css.create({
        root: {
          color: 'var(--colorNotFound, rgb(255,255,var(--test))'
        }
      });
      let root;
      act(() => {
        root = create(
          <ThemeProvider customProperties={customProperties}>
            <html.span style={styles.root} />
          </ThemeProvider>
        );
      });
      expect(root.toJSON()).toMatchSnapshot();
    });

    test('number var lookup works', () => {
      const customProperties = {
        number: 10
      };
      const styles = css.create({
        root: {
          borderWidth: 'var(--number)'
        }
      });
      let root;
      act(() => {
        root = create(
          <ThemeProvider customProperties={customProperties}>
            <html.div style={styles.root} />
          </ThemeProvider>
        );
      });
      expect(root.toJSON()).toMatchSnapshot();
    });

    test('string var value lookup with pixel prop conversion', () => {
      const customProperties = {
        pxNumber: '10px'
      };
      const styles = css.create({
        root: {
          borderWidth: 'var(--pxNumber)'
        }
      });
      let root;
      act(() => {
        root = create(
          <ThemeProvider customProperties={customProperties}>
            <html.div style={styles.root} />
          </ThemeProvider>
        );
      });
      expect(root.toJSON()).toMatchSnapshot();
    });

    test('string var value lookup with em prop conversion', () => {
      const customProperties = {
        emNumber: '10em'
      };
      const styles = css.create({
        root: {
          borderWidth: 'var(--emNumber)'
        }
      });
      let root;
      act(() => {
        root = create(
          <ThemeProvider customProperties={customProperties}>
            <html.div style={styles.root} />
          </ThemeProvider>
        );
      });
      expect(root.toJSON()).toMatchSnapshot();
    });

    test('number var value lookup with reference to another var', () => {
      const customProperties = {
        number: 10,
        refToNumber: 'var(--number)',
        refToRefToNumber: 'var(--refToNumber)'
      };
      const styles = css.create({
        one: {
          borderWidth: 'var(--refToNumber)'
        },
        two: {
          borderWidth: 'var(--refToRefToNumber)'
        }
      });
      let root;
      act(() => {
        root = create(
          <ThemeProvider customProperties={customProperties}>
            <html.div style={styles.one} />
            <html.div style={styles.two} />
          </ThemeProvider>
        );
      });
      expect(root.toJSON()).toMatchSnapshot();
    });

    test('rgb(a) function with args applied through a single var', () => {
      const customProperties = {
        example: '24, 48, 96'
      };
      const styles = css.create({
        one: {
          color: 'rgb(var(--example))'
        },
        two: {
          color: 'rgba(var(--example), 0.5)'
        }
      });
      let root;
      act(() => {
        root = create(
          <ThemeProvider customProperties={customProperties}>
            <html.span style={styles.one} />
            <html.span style={styles.two} />
          </ThemeProvider>
        );
      });
      expect(root.toJSON()).toMatchSnapshot();
    });

    test('rgba function with args applied through multiple (& nested) vars', () => {
      const customProperties = {
        red: 255,
        green: 96,
        blue: 16,
        rgb: 'var(--red), var(--green), var(--blue)',
        alpha: 0.42
      };
      const styles = css.create({
        root: {
          color: 'rgba(var(--rgb), var(--alpha))'
        }
      });
      let root;
      act(() => {
        root = create(
          <ThemeProvider customProperties={customProperties}>
            <html.span style={styles.root} />
          </ThemeProvider>
        );
      });
      expect(root.toJSON()).toMatchSnapshot();
    });

    test('textShadow with nested/multiple vars', () => {
      const customProperties = {
        height: '20px',
        width: '10px',
        size: 'var(--width) var(--height)',
        radius: '30px',
        red: 'red'
      };
      const styles = css.create({
        root: {
          textShadow: 'var(--size) var(--radius) var(--red)'
        }
      });
      let root;
      act(() => {
        root = create(
          <ThemeProvider customProperties={customProperties}>
            <html.span style={styles.root} />
          </ThemeProvider>
        );
      });
      expect(root.toJSON()).toMatchSnapshot();
    });

    test('transform with nested/multiple vars', () => {
      const customProperties = {
        distance: 20,
        angle: '45deg',
        translateX: 'translateX(var(--distance))',
        rotateX: 'rotateX(var(--angle))'
      };
      const styles = css.create({
        root: {
          transform: 'var(--translateX) var(--rotateX)'
        }
      });
      let root;
      act(() => {
        root = create(
          <ThemeProvider customProperties={customProperties}>
            <html.span style={styles.root} />
          </ThemeProvider>
        );
      });
      expect(root.toJSON()).toMatchSnapshot();
    });

    test('css variable declaration inside a media query', () => {
      const customProperties = {
        example: '42px'
      };
      const styles = css.create({
        root: {
          inlineSize: {
            default: '30px',
            '@media (min-width: 400px)': 'var(--example)'
          }
        }
      });
      let root;
      act(() => {
        root = create(
          <ThemeProvider customProperties={customProperties}>
            <html.span style={styles.root} />
          </ThemeProvider>
        );
      });
      expect(root.toJSON()).toMatchSnapshot();
    });

    // Legacy: custom properties are case sensitive and this should not be supported
    test('kebab case string var to camel case', () => {
      const customProperties = {
        testVar: 'red'
      };
      const styles = css.create({
        root: {
          color: 'var(--test-var)'
        },
        fallback: {
          color: 'var(--test-var, blue)'
        }
      });
      let root;
      act(() => {
        root = create(
          <ThemeProvider customProperties={customProperties}>
            <html.span style={styles.root} />
            <html.span style={styles.fallback} />
          </ThemeProvider>
        );
      });
      expect(root.toJSON()).toMatchSnapshot();
    });
  });
});
