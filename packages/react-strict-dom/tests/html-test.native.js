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
    const styles = css.create({
      root: {
        display: 'flex'
      }
    });

    const root = create(
      <html.div style={styles.root}>
        <html.div />
        <html.div />
      </html.div>
    );
    expect(root.toJSON()).toMatchSnapshot('flex layout');
  });

  test('block layout override of flex layout', () => {
    const styles = css.create({
      root: {
        flexDirection: 'row',
        alignItems: 'start',
        flexShrink: '1',
        display: 'block'
      }
    });

    const root = create(
      <html.div style={styles.root}>
        <html.div />
      </html.div>
    );
    expect(root.toJSON()).toMatchSnapshot('block layout override of flex');
  });

  test('auto-wraps raw strings', () => {
    const styles = css.create({
      root: {
        color: 'black'
      }
    });

    const root = create(<html.div style={styles.root}>text</html.div>);
    expect(root.toJSON()).toMatchSnapshot('auto-wrap raw strings');
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

    // See #136
    test('lineClamp workaround for Android', () => {
      const styles = css.create({
        root: {
          lineClamp: 3
        }
      });
      const root = create(<html.span style={styles.root}>text</html.span>);
      // expect userSelect:none
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
        rootColor: {
          default: 'blue',
          '@media (prefers-color-scheme: dark)': 'purple'
        }
      });

      const styles = css.create({
        root: {
          backgroundColor: tokens.otherColor,
          color: tokens.rootColor
        },
        input: {
          '::placeholder': {
            color: tokens.rootColor
          }
        }
      });

      const root = create(
        <>
          <html.span style={styles.root}>Expect color:red</html.span>
          <html.span style={[theme, styles.root]}>Expect color:green</html.span>
          <html.input
            placeholder="Expect placeholderTextColor:green"
            style={[theme, styles.input]}
          />
          <html.div style={theme}>
            <html.span style={styles.root}>
              Expect color:green (inherited)
            </html.span>
            <html.input
              placeholder="Expect placeholderTextColor:green"
              style={styles.input}
            />
            <html.div style={nestedTheme}>
              <html.span style={styles.root}>
                Expect color:blue (nested)
              </html.span>
              <html.input
                placeholder="Expect placeholderTextColor:blue"
                style={styles.input}
              />
            </html.div>
          </html.div>
          <html.span style={styles.root}>Expect color:red</html.span>
        </>
      );
      expect(root.toJSON()).toMatchSnapshot();
    });

    test('inherited styles', () => {
      const styles = css.create({
        inherits: {
          borderColor: 'red', // e.g., should not inherit
          color: 'red',
          cursor: 'pointer',
          fontFamily: 'Arial',
          fontSize: 20,
          fontStyle: 'italic',
          fontVariant: 'variant',
          fontWeight: 'bold',
          letterSpacing: '10px',
          lineHeight: '30px',
          textAlign: 'right',
          textIndent: '10px',
          textTransform: 'uppercase',
          whiteSpace: 'pre'
        },
        alsoInherits: {
          fontWeight: 300
        },
        text: {
          fontSize: '1.5em'
        }
      });
      // This also tests that unitless line-height is correctly inherited, including
      // through nested text elements.
      const root = create(
        <html.div style={styles.inherits}>
          <html.div style={styles.alsoInherits}>
            <html.span>Inherits text styles</html.span>
            <html.input placeholder="Does not inherit text styles" />
          </html.div>
        </html.div>
      );
      expect(root.toJSON()).toMatchSnapshot();
    });

    test('inherited fontSize', () => {
      const tokens = css.defineVars({
        rootFontSize: '2em',
        rootFontSizeHover: '3em',
        nestedFontSize: '1.5em'
      });

      const styles = css.create({
        root: {
          fontSize: {
            default: tokens.rootFontSize,
            ':hover': tokens.rootFontSizeHover
          }
        },
        nested: {
          fontSize: tokens.nestedFontSize
        }
      });
      const root = create(
        <html.div style={styles.root}>
          <html.span>text</html.span>
          <html.span style={styles.nested}>text</html.span>
        </html.div>
      );
      let rootElement = root.toJSON();
      let firstSpan = rootElement.children[0];
      let secondSpan = rootElement.children[1];
      expect(firstSpan.props.style.fontSize).toBe(2 * 16);
      // check that 'em' values are correctly inherited
      expect(secondSpan.props.style.fontSize).toBe(1.5 * 2 * 16);
      // check hover interaction updates inherited value
      act(() => {
        rootElement.props.onMouseEnter();
      });
      rootElement = root.toJSON();
      firstSpan = rootElement.children[0];
      secondSpan = rootElement.children[1];
      expect(firstSpan.props.style.fontSize).toBe(3 * 16);
      expect(secondSpan.props.style.fontSize).toBe(1.5 * 3 * 16);
    });

    test('inherited lineHeight', () => {
      const styles = css.create({
        unitlessLineHeight: {
          lineHeight: 1.5
        },
        increaseLineHeight: {
          lineHeight: 2
        },
        increaseFontSize: {
          fontSize: 20
        }
      });
      const root = create(
        <html.div style={styles.unitlessLineHeight}>
          <html.span>
            <html.span style={styles.increaseFontSize}>text</html.span>
          </html.span>
          <html.span style={styles.increaseFontSize}>
            <html.span style={styles.increaseLineHeight}>text</html.span>
          </html.span>
        </html.div>
      );
      const rootElement = root.toJSON();
      const firstSpan = rootElement.children[0];
      expect(firstSpan.props.style.lineHeight).toBe(1.5 * 16);
      const firstSpanInner = firstSpan.children[0];
      expect(firstSpanInner.props.style.lineHeight).toBe(1.5 * 20);
      const secondSpan = rootElement.children[1];
      expect(secondSpan.props.style.lineHeight).toBe(1.5 * 20);
      const secondSpanInner = secondSpan.children[0];
      expect(secondSpanInner.props.style.lineHeight).toBe(2 * 20);
    });

    test('inherited styles for auto-fix of raw strings', () => {
      const tokens = css.defineVars({
        color: 'red',
        fontSize: '1em',
        lineHeight: 1
      });
      const theme = css.createTheme(tokens, {
        color: 'green',
        fontSize: '2em',
        lineHeight: 3
      });

      const styles = css.create({
        root: {
          color: tokens.color,
          fontSize: tokens.fontSize,
          lineHeight: tokens.lineHeight
        },
        text: {
          fontSize: tokens.fontSize
        }
      });

      const root = create(
        <html.div style={[theme, styles.root]}>
          <html.div style={styles.text}>text</html.div>
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
          <html.div style={styles.backgroundColor('rgba(255,255,255,0.9)')} />
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
        root.update(<html.div style={styles.opacity(0)} />);
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
            style={styles.transform('translateY(50px) rotateX(90deg)')}
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
            style={
              // attempt to transition to an end value without a start value
              styles.transform('translateY(50px) rotateX(90deg)')
            }
          />
        );
      });
      // error as transform start value is missing
      expect(console.error).toHaveBeenCalled();
      expect(root.toJSON()).toMatchSnapshot('transition property end');

      // other transforms
      act(() => {
        root = create(
          <html.div
            style={styles.transform(
              'rotate(1deg) rotateX(2deg) rotateY(3deg) rotateZ(4deg)'
            )}
          />
        );
      });
      expect(root.toJSON()).toMatchSnapshot('rotate');
      act(() => {
        root = create(
          <html.div
            style={styles.transform('scale(1) scaleX(2) scaleY(4) scaleZ(6)')}
          />
        );
      });
      expect(root.toJSON()).toMatchSnapshot('scale');
      act(() => {
        root = create(
          <html.div style={styles.transform('skewX(20px) skewY(21px)')} />
        );
      });
      expect(root.toJSON()).toMatchSnapshot('skew');
      act(() => {
        root = create(
          <html.div
            style={styles.transform('translateX(11px) translateY(21px)')}
          />
        );
      });
      expect(root.toJSON()).toMatchSnapshot('translate');

      // other element types
      act(() => {
        root = create(<html.span style={styles.backgroundColor()} />);
      });
      expect(root.toJSON().type).toBe('Animated.Text');
      act(() => {
        root.update(<html.button style={styles.backgroundColor()} />);
      });
      expect(root.toJSON().type).toMatchSnapshot('Animated.Pressable');
    });
  });

  describe('prop polyfills', () => {
    describe('global', () => {
      test('"dir" prop', () => {
        ['auto', 'ltr', 'rtl'].forEach((dir) => {
          const block = create(<html.div dir={dir} />);
          const text = create(<html.p dir={dir} />);
          expect(block.toJSON()).toMatchSnapshot(`"${dir}" block`);
          expect(text.toJSON()).toMatchSnapshot(`"${dir}" text`);
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

      test('"onClick" prop', () => {
        const onClick = jest.fn();
        const root = create(<html.div onClick={onClick} />);
        root.root.children[0].props.onPress({
          nativeEvent: {
            altKey: true,
            button: 0,
            ctrlKey: true,
            metaKey: true,
            shiftKey: true
          }
        });
        expect(onClick).toHaveBeenCalledWith(
          expect.objectContaining({
            altKey: true,
            button: 0,
            ctrlKey: true,
            metaKey: true,
            shiftKey: true,
            type: 'click'
          })
        );
      });

      test('"onKeyDown" prop', () => {
        const onKeyDown = jest.fn();
        const root = create(<html.input onKeyDown={onKeyDown} />);
        root.root.children[0].props.onKeyPress({ nativeEvent: { key: 'a' } });
        expect(onKeyDown).toHaveBeenCalledWith(
          expect.objectContaining({
            key: 'a',
            type: 'keydown'
          })
        );
        root.root.children[0].props.onSubmitEditing();
        expect(onKeyDown).toHaveBeenCalledWith(
          expect.objectContaining({
            key: 'Enter',
            type: 'keydown'
          })
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

      test('"onError" and "onLoad" prop', () => {
        const onError = jest.fn();
        const onLoad = jest.fn();

        const root = create(
          <html.img onError={onError} onLoad={onLoad} src="https://src.jpg" />
        );
        const element = root.toJSON();

        element.props.onError();
        expect(onError).toHaveBeenCalledWith({ type: 'error' });

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

      test('"onChange" and "onInput" prop', () => {
        const onChange = jest.fn();
        const onInput = jest.fn();
        const root = create(
          <html.input onChange={onChange} onInput={onInput} />
        );
        const element = root.toJSON();
        element.props.onChange({
          nativeEvent: {
            text: 'hello world'
          }
        });
        // onChange and onInput are aliases in React DOM (not spec compliant)
        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.objectContaining({
              value: 'hello world'
            }),
            type: 'change'
          })
        );
        expect(onInput).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.objectContaining({
              value: 'hello world'
            }),
            type: 'input'
          })
        );
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

      test('"style" prop', () => {
        const styles = css.create({
          input: {
            color: 'red',
            fontWeight: 'bold',
            '::placeholder': {
              color: 'pink'
            }
          }
        });
        const root = create(<html.input style={styles.input} />);
        expect(root.toJSON()).toMatchSnapshot();
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
      const onMouseEnter = jest.fn();
      const root = create(
        <html.div onMouseEnter={onMouseEnter} style={hoverStyles} />
      );
      root.root.children[0].props.onMouseEnter();
      expect(root.toJSON()).toMatchSnapshot();
      root.root.children[0].props.onMouseEnter();
      expect(onMouseEnter).toHaveBeenCalled();
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
