/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { css, html, contexts } from 'react-strict-dom';
import { act, create } from 'react-test-renderer';

describe('<html.*>', () => {
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
  });

  test('default block layout', () => {
    const root = create(<html.div />);
    expect(root.toJSON()).toMatchSnapshot('block layout');
  });

  test('default flex layout', () => {
    const root = create(
      <html.div style={{ display: 'flex' }}>
        <html.div />
        <html.div />
      </html.div>
    );
    expect(root.toJSON()).toMatchSnapshot('flex layout');
  });

  test('block layout override of flex layout', () => {
    const root = create(
      <html.div
        style={{
          flexDirection: 'row',
          alignItems: 'start',
          flexShrink: '1',
          display: 'block'
        }}
      >
        <html.div />
      </html.div>
    );
    expect(root.toJSON()).toMatchSnapshot('block layout override of flex');
  });

  describe('style polyfills', () => {
    test('legacy: ThemeProvider', () => {
      const { ThemeProvider } = contexts;
      const customProperties = {
        rootColor: 'red'
      };
      const styles = css.create({
        root: {
          color: 'var(--rootColor)'
        }
      });

      const root = create(
        <ThemeProvider customProperties={customProperties}>
          <html.span style={styles.root}>Expect color:red</html.span>
        </ThemeProvider>
      );
      expect(root.toJSON()).toMatchSnapshot();
    });

    test('inherited themes', () => {
      const tokens = css.defineVars({
        rootColor: 'red',
        otherColor: 'pink'
      });
      const theme = css.createTheme(tokens, {
        rootColor: 'green'
      });
      const nestedTheme = css.createTheme(tokens, {
        rootColor: 'blue'
      });

      const styles = css.create({
        root: {
          backgroundColor: tokens.otherColor,
          color: tokens.rootColor
        }
      });

      const root = create(
        <>
          <html.span style={styles.root}>Expect color:red</html.span>
          <html.span style={[theme, styles.root]}>Expect color:green</html.span>
          <html.div style={theme}>
            <html.span style={styles.root}>
              Expect color:green (inherited)
            </html.span>
            <html.div style={nestedTheme}>
              <html.span style={styles.root}>
                Expect color:blue (nested)
              </html.span>
            </html.div>
          </html.div>
          <html.span style={styles.root}>Expect color:red</html.span>
        </>
      );
      expect(root.toJSON()).toMatchSnapshot();
    });

    test('default inherited text styles', () => {
      const styles = css.create({
        inheritable: {
          color: 'red',
          cursor: 'pointer',
          fontFamily: 'Arial',
          fontSize: '1em',
          fontStyle: 'italic',
          fontVariant: 'variant',
          fontWeight: 'bold',
          letterSpace: '10px',
          lineHeight: 1.5,
          textAlign: 'right',
          textIndent: '10px',
          textTransform: 'uppercase',
          whiteSpace: 'pre'
        },
        alsoInheritable: {
          fontWeight: 300
        },
        text: {
          fontSize: '2em'
        }
      });
      // This also tests that unitless line-height is correctly inherited, including
      // through nested text elements.
      const root = create(
        <html.div style={styles.inheritable}>
          <html.div style={styles.alsoInheritable}>
            <html.span style={styles.text}>
              Text should <html.span style={styles.text}>inherit</html.span> div
              styles
            </html.span>
            <html.input placeholder="Input should inherit div styles" />
          </html.div>
        </html.div>
      );
      expect(root.toJSON()).toMatchSnapshot();
    });

    test.skip('"inherit" keyword', () => {});
    test.skip('"initial" keyword', () => {});
    test.skip('"unset" keyword', () => {});

    test('"transition" properties ', () => {
      const { Easing } = require('react-native');

      const styles = css.create({
        backgroundColor: (backgroundColor) => ({
          backgroundColor: backgroundColor ?? 'rgba(0,0,0,0.1)',
          transitionDelay: 200,
          transitionDuration: 2000,
          transitionProperty: 'backgroundColor',
          transitionTimingFunction: 'ease-in-out'
        }),
        opacity: (opacity, timingFunction) => ({
          opacity: opacity ?? 1.0,
          transitionDelay: 50,
          transitionDuration: 1000,
          transitionProperty: 'opacity',
          transitionTimingFunction: timingFunction ?? 'ease-in'
        }),
        transform: (transform) => ({
          transform: transform ?? 'translateY(0px) rotateX(0deg)',
          transitionDelay: 0,
          transitionDuration: 1000,
          transitionProperty: 'transform',
          transitionTimingFunction: 'ease-out'
        }),
        transitionAll: {
          opacity: 1.0,
          transform: 'translateY(0px) rotateX(0deg)',
          transitionDelay: 0,
          transitionDuration: 1000,
          transitionProperty: 'all',
          transitionTimingFunction: 'ease-in'
        },
        transitionMultiple: {
          opacity: 1.0,
          transform: 'translateY(0px) rotateX(0deg)',
          transitionDelay: 0,
          transitionDuration: 1000,
          transitionProperty: 'opacity, transform',
          transitionTimingFunction: 'ease-in'
        },
        transitionWithoutProperty: {
          // no transform value is set
          transitionDelay: 0,
          transitionDuration: 1000,
          transitionProperty: 'transform',
          transitionTimingFunction: 'ease-out'
        },
        width: (width) => ({
          width: width ?? 100,
          transitionDelay: 0,
          transitionDuration: 500,
          transitionProperty: 'width',
          transitionTimingFunction: 'ease'
        })
      });

      let root;

      // default
      act(() => {
        root = create(<html.div />);
        root.update(<html.div style={{}} />);
      });
      // assert no warning if no transition property is specified
      expect(console.warn).not.toHaveBeenCalled();

      // backgroundColor transition
      act(() => {
        root = create(<html.div style={styles.backgroundColor()} />);
      });
      expect(root.toJSON()).toMatchSnapshot('backgroundColor transition start');
      expect(Easing.inOut).toHaveBeenCalled();
      act(() => {
        root.update(
          <html.div style={[styles.backgroundColor('rgba(255,255,255,0.9)')]} />
        );
      });
      expect(root.toJSON()).toMatchSnapshot('backgroundColor transition end');

      // opacity transition
      act(() => {
        root = create(<html.div style={styles.opacity()} />);
      });
      expect(root.toJSON()).toMatchSnapshot('opacity transition start');
      expect(Easing.in).toHaveBeenCalled();
      act(() => {
        root.update(<html.div style={[styles.opacity(0)]} />);
      });
      expect(root.toJSON()).toMatchSnapshot('opacity transition end');

      // transform transition
      act(() => {
        root = create(<html.div style={styles.transform()} />);
      });
      expect(root.toJSON()).toMatchSnapshot('transform transition start');
      expect(Easing.out).toHaveBeenCalled();
      act(() => {
        root.update(
          <html.div
            style={[styles.transform('translateY(50px) rotateX(90deg)')]}
          />
        );
      });
      expect(root.toJSON()).toMatchSnapshot('transform transition end');

      // width transition
      act(() => {
        root = create(<html.div style={styles.width()} />);
      });
      expect(root.toJSON()).toMatchSnapshot('width transition start');
      expect(Easing.out).toHaveBeenCalled();
      act(() => {
        root.update(<html.div style={[styles.width(200)]} />);
      });
      expect(root.toJSON()).toMatchSnapshot('width transition end');

      // cubic-bezier easing
      act(() => {
        root = create(
          <html.div
            style={styles.opacity(1, 'cubic-bezier( 0.1,  0.2,0.3  ,0.4)')}
          />
        );
      });
      expect(root.toJSON()).toMatchSnapshot('cubic-bezier timing function');
      expect(Easing.bezier).toHaveBeenCalledWith(0.1, 0.2, 0.3, 0.4);

      // transition all properties (opacity and transform)
      act(() => {
        root = create(<html.div style={styles.transitionAll} />);
      });
      expect(Easing.in).toHaveBeenCalled();
      expect(root.toJSON()).toMatchSnapshot('transition all properties');

      // transition multiple properties
      act(() => {
        root = create(<html.div style={styles.transitionMultiple} />);
      });
      expect(Easing.in).toHaveBeenCalled();
      expect(root.toJSON()).toMatchSnapshot('transition multiple properties');

      // transition with missing properties
      act(() => {
        root = create(<html.div style={styles.transitionWithoutProperty} />);
      });
      act(() => {
        root.update(<html.div style={[styles.transitionWithoutProperty]} />);
      });
      // no error as transform start and end value are both missing
      expect(console.error).not.toHaveBeenCalled();
      act(() => {
        root.update(
          <html.div
            style={[
              styles.transitionWithoutProperty,
              // attempt to transition to an end value without a start value
              { transform: 'translateY(50px) rotateX(90deg)' }
            ]}
          />
        );
      });
      // error as transform start value is missing
      expect(console.error).toHaveBeenCalled();
      expect(root.toJSON()).toMatchSnapshot('transition property end');
    });
  });

  describe('prop polyfills', () => {
    describe('global', () => {
      test('"dir" prop', () => {
        ['ltr', 'rtl'].forEach((dir) => {
          const root = create(<html.div dir={dir} />);
          expect(root.toJSON()).toMatchSnapshot(`"${dir}"`);
        });
      });

      test('"hidden" prop', () => {
        const root = create(<html.div hidden />);
        expect(root.toJSON()).toMatchSnapshot();

        const rootOther = create(
          <html.div hidden style={{ display: 'flex' }} />
        );
        expect(rootOther.toJSON()).toMatchSnapshot('display set');

        [true, false, 'true', 'false', 'hidden', 'until-found'].forEach(
          (hidden) => {
            const root = create(<html.input hidden={hidden} />);
            expect(root.toJSON()).toMatchSnapshot(`"${hidden}"`);
          }
        );
      });

      test('"inputMode" prop', () => {
        ['decimal', 'email', 'numeric', 'search', 'tel', 'url'].forEach(
          (inputMode) => {
            const root = create(<html.input inputMode={inputMode} />);
            expect(root.toJSON()).toMatchSnapshot(`"${inputMode}"`);
          }
        );
      });

      test('"tabIndex" prop', () => {
        const root = create(<html.input tabIndex={-1} />);
        expect(root.toJSON()).toMatchSnapshot();
      });
    });

    describe('<img>', () => {
      test('"src" prop with loading props', () => {
        const root = create(
          <html.img
            crossOrigin="use-credentials"
            decoding="async"
            fetchPriority="auto"
            loading="lazy"
            referrerPolicy="no-referrer"
            src="https://src.jpg"
          />
        );
        expect(root.toJSON()).toMatchSnapshot();
      });

      test('"srcSet" prop with loading props', () => {
        const root = create(
          <html.img
            crossOrigin="use-credentials"
            decoding="async"
            fetchPriority="auto"
            loading="lazy"
            referrerPolicy="no-referrer"
            srcSet="https://src.jpg 1x, https://srcx2.jpg 2x"
          />
        );
        expect(root.toJSON()).toMatchSnapshot();
      });

      test('"onLoad" prop', () => {
        const onLoad = jest.fn();

        const root = create(<html.img onLoad={onLoad} src="https://src.jpg" />);
        const element = root.toJSON();

        // Expected event shape
        element.props.onLoad({
          nativeEvent: {
            source: {
              height: 100,
              width: 200
            }
          }
        });
        expect(onLoad).toHaveBeenCalledWith({
          target: {
            naturalHeight: 100,
            naturalWidth: 200
          },
          type: 'load'
        });

        // Fabric event bug
        element.props.onLoad({
          nativeEvent: {
            source: undefined
          }
        });
        expect(onLoad).toHaveBeenCalledWith({
          target: {
            naturalHeight: undefined,
            naturalWidth: undefined
          },
          type: 'load'
        });
      });
    });

    describe('<input>', () => {
      test('"autoComplete" prop', () => {
        [
          'additional-name',
          'address-line1',
          'address-line2',
          'bday',
          'bday-day',
          'bday-month',
          'bday-year',
          'cc-csc',
          'cc-exp',
          'cc-exp-month',
          'cc-exp-year',
          'cc-number',
          'country',
          'current-password',
          'email',
          'family-name',
          'given-name',
          'honorific-prefix',
          'honorific-suffix',
          'name',
          'new-password',
          'nickname',
          'off',
          'one-time-code',
          'organization',
          'organization-title',
          'postal-code',
          'sex',
          'street-address',
          'tel',
          'tel-country-code',
          'tel-national',
          'url',
          'username'
        ].forEach((autoComplete) => {
          const root = create(<html.input autoComplete={autoComplete} />);
          expect(root.toJSON()).toMatchSnapshot(`"${autoComplete}"`);
        });
      });

      test('"disabled" prop', () => {
        const root = create(<html.input disabled={true} />);
        expect(root.toJSON()).toMatchSnapshot();
      });

      test('"type" prop', () => {
        ['email', 'number', 'password', 'search', 'tel', 'url'].forEach(
          (type) => {
            const root = create(<html.input type={type} />);
            expect(root.toJSON()).toMatchSnapshot(`"${type}"`);
          }
        );

        ['checkbox', 'date', 'radio'].forEach((type, i) => {
          create(<html.input type={type} />);
          expect(console.error).toHaveBeenCalledTimes(i + 1);
        });
      });
    });

    describe('<textarea>', () => {
      test('"disabled" prop', () => {
        const root = create(<html.textarea disabled={true} />);
        expect(root.toJSON()).toMatchSnapshot();
      });

      test.skip('"rows" prop', () => {
        const root = create(<html.textarea rows={5} />);
        expect(root.toJSON()).toMatchSnapshot();
      });
    });
  });

  describe('hover styles', () => {
    const hoverStyles = {
      backgroundColor: { default: 'red', ':hover': 'blue' }
    };

    test('onMouseEnter', () => {
      const root = create(<html.div style={hoverStyles} />);
      root.root.children[0].props.onMouseEnter();
      expect(root.toJSON()).toMatchSnapshot();
    });

    test('onMouseLeave', () => {
      const root = create(<html.div style={hoverStyles} />);
      root.root.children[0].props.onMouseEnter();
      root.root.children[0].props.onMouseLeave();
      expect(root.toJSON()).toMatchSnapshot();
    });

    test('onPointerEnter', () => {
      const root = create(<html.div style={hoverStyles} />);
      root.root.children[0].props.onPointerEnter();
      expect(root.toJSON()).toMatchSnapshot();
    });

    test('onPointerLeave', () => {
      const root = create(<html.div style={hoverStyles} />);
      root.root.children[0].props.onPointerEnter();
      root.root.children[0].props.onPointerLeave();
      expect(root.toJSON()).toMatchSnapshot();
    });
  });
});
