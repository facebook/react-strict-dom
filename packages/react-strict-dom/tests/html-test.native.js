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
    let root;
    act(() => {
      root = create(<html.div />);
    });
    expect(root.toJSON()).toMatchSnapshot('block layout');
  });

  test('default flex layout', () => {
    const styles = css.create({
      root: {
        display: 'flex'
      }
    });

    let root;
    act(() => {
      root = create(
        <html.div style={styles.root}>
          <html.div />
          <html.div />
        </html.div>
      );
    });
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

    let root;
    act(() => {
      root = create(
        <html.div style={styles.root}>
          <html.div />
        </html.div>
      );
    });
    expect(root.toJSON()).toMatchSnapshot('block layout override of flex');
  });

  test('auto-wraps raw strings', () => {
    const styles = css.create({
      root: {
        color: 'black'
      }
    });

    let root;
    act(() => {
      root = create(<html.div style={styles.root}>text</html.div>);
    });
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

      let root;
      act(() => {
        root = create(
          <ThemeProvider customProperties={customProperties}>
            <html.span style={styles.root}>Expect color:red</html.span>
          </ThemeProvider>
        );
      });
      expect(root.toJSON()).toMatchSnapshot();
    });

    // See #136
    test('lineClamp workaround for Android', () => {
      const styles = css.create({
        root: {
          lineClamp: 3
        }
      });
      let root;
      act(() => {
        root = create(<html.span style={styles.root}>text</html.span>);
      });
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

      let root;
      act(() => {
        root = create(
          <>
            <html.span style={styles.root}>Expect color:red</html.span>
            <html.span style={[theme, styles.root]}>
              Expect color:green
            </html.span>
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
      });
      expect(root.toJSON()).toMatchSnapshot();
    });

    test('inherited styles', () => {
      const styles = css.create({
        inherits: {
          borderColor: 'red', // e.g., should not inherit
          color: 'red',
          cursor: 'pointer',
          fontFamily: 'Arial',
          fontSize: '2em',
          fontStyle: 'italic',
          fontVariant: 'variant',
          fontWeight: 'bold',
          letterSpacing: '10px',
          lineHeight: 2,
          textAlign: 'right',
          textIndent: '10px',
          textTransform: 'uppercase',
          whiteSpace: 'pre'
        },
        alsoInherits: {
          fontWeight: 300,
          fontSize: '2em'
        },
        text: {
          fontSize: '1.5em'
        }
      });
      // This also tests that unitless line-height is correctly inherited, including
      // through nested text elements.
      let root;
      act(() => {
        root = create(
          <html.div style={styles.inherits}>
            <html.div style={styles.alsoInherits}>
              <html.span style={styles.text}>Inherits text styles</html.span>
              <html.input placeholder="Does not inherit text styles" />
            </html.div>
          </html.div>
        );
      });
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
      let root;
      act(() => {
        root = create(
          <html.div style={styles.root}>
            <html.span>text</html.span>
            <html.span style={styles.nested}>text</html.span>
          </html.div>
        );
      });
      const getFontSize = (element) => element.props.style.fontSize;
      let rootElement = root.toJSON();
      let firstChild = rootElement.children[0];
      let secondSecond = rootElement.children[1];
      expect(getFontSize(firstChild)).toBe(2 * 16);
      // check that 'em' values are correctly inherited
      expect(getFontSize(secondSecond)).toBe(1.5 * 2 * 16);
      // check hover interaction updates inherited value
      act(() => {
        rootElement.props.onMouseEnter();
      });
      rootElement = root.toJSON();
      firstChild = rootElement.children[0];
      secondSecond = rootElement.children[1];
      expect(getFontSize(firstChild)).toBe(3 * 16);
      expect(getFontSize(secondSecond)).toBe(1.5 * 3 * 16);
    });

    test('inherited lineHeight (unitless)', () => {
      const styles = css.create({
        root: {
          lineHeight: 2
        },
        text: {
          fontSize: '2em'
        },
        nestedText: {
          lineHeight: '0.5'
        }
      });
      let root;
      act(() => {
        root = create(
          <html.div style={styles.root}>
            <html.span style={styles.text}>
              <html.span style={styles.nestedText}>hello</html.span>
            </html.span>
          </html.div>
        );
      });
      const getLineHeight = (element) => element.props.style.lineHeight;
      const rootElement = root.toJSON();
      const firstChild = rootElement.children[0];
      const firstGrandChild = firstChild.children[0];
      expect(getLineHeight(firstChild)).toBe(64);
      expect(getLineHeight(firstGrandChild)).toBe(16);
    });

    test('inherited lineHeight (em)', () => {
      const styles = css.create({
        root: {
          lineHeight: '2em'
        },
        text: {
          fontSize: '2em'
        },
        nestedText: {
          lineHeight: 2
        }
      });
      let root;
      act(() => {
        root = create(
          <html.div style={styles.root}>
            <html.span style={styles.text}>
              <html.span style={styles.nestedText}>hello</html.span>
            </html.span>
          </html.div>
        );
      });
      const getLineHeight = (element) => element.props.style.lineHeight;
      const rootElement = root.toJSON();
      const firstChild = rootElement.children[0];
      const firstGrandChild = firstChild.children[0];

      expect(getLineHeight(firstChild)).toBe(32);
      expect(getLineHeight(firstGrandChild)).toBe(64);
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

      let root;
      act(() => {
        root = create(
          <html.div style={[theme, styles.root]}>
            <html.div style={styles.text}>text</html.div>
          </html.div>
        );
      });
      expect(root.toJSON()).toMatchSnapshot();
    });

    test('fontSize to resolve em units', () => {
      const styles = css.create({
        root: {
          fontSize: '2em',
          maxHeight: '2em'
        }
      });
      let root;
      act(() => {
        root = create(<html.div style={styles.root} />);
      });
      const rootElement = root.toJSON();
      expect(rootElement.props.style.fontSize).toBeUndefined();
      expect(rootElement.props.style.maxHeight).toBe(2 * 2 * 16);
    });

    test.skip('"inherit" keyword', () => {});
    test.skip('"initial" keyword', () => {});
    test.skip('"unset" keyword', () => {});

    describe('"transition" properties ', () => {
      const { Animated, Easing } = require('react-native');

      const styles = css.create({
        none: {
          backgroundColor: 'red'
        },
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

      test('default', () => {
        let root;
        // default
        act(() => {
          root = create(<html.div />);
        });
        act(() => {
          root.update(<html.div style={styles.none} />);
        });
        // assert no warning if no transition property is specified
        expect(console.error).not.toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
        expect(Animated.sequence).not.toHaveBeenCalled();
      });

      test('update triggers transition', () => {
        let root;
        // update triggers transition
        act(() => {
          root = create(<html.div style={styles.none} />);
        });
        act(() => {
          root.update(<html.div style={styles.backgroundColor('green')} />);
        });
        expect(console.error).not.toHaveBeenCalled();
        expect(Animated.sequence).toHaveBeenCalled();
        expect(root.toJSON()).toMatchSnapshot('red to green');
        act(() => {
          root.update(<html.div style={styles.backgroundColor('blue')} />);
        });
        expect(root.toJSON()).toMatchSnapshot('green to blue');
      });

      test('backgroundColor transition', () => {
        let root;
        // backgroundColor transition
        act(() => {
          root = create(<html.div style={styles.backgroundColor()} />);
        });
        expect(root.toJSON()).toMatchSnapshot('start');
        expect(Easing.inOut).toHaveBeenCalled();
        act(() => {
          root.update(
            <html.div style={styles.backgroundColor('rgba(255,255,255,0.9)')} />
          );
        });
        expect(root.toJSON()).toMatchSnapshot('end');
      });

      test('opacity transition', () => {
        let root;
        // opacity transition
        act(() => {
          root = create(<html.div style={styles.opacity()} />);
        });
        expect(root.toJSON()).toMatchSnapshot('start');
        expect(Easing.in).toHaveBeenCalled();
        act(() => {
          root.update(<html.div style={styles.opacity(0)} />);
        });
        expect(root.toJSON()).toMatchSnapshot('end');
      });

      test('transform transition', () => {
        let root;
        // transform transition
        act(() => {
          root = create(<html.div style={styles.transform()} />);
        });
        expect(root.toJSON()).toMatchSnapshot('start');
        expect(Easing.out).toHaveBeenCalled();
        act(() => {
          root.update(
            <html.div
              style={styles.transform('translateY(50px) rotateX(90deg)')}
            />
          );
        });
        expect(root.toJSON()).toMatchSnapshot('end');
      });

      test('width transition', () => {
        let root;
        // width transition
        act(() => {
          root = create(<html.div style={styles.width()} />);
        });
        expect(root.toJSON()).toMatchSnapshot('start');
        expect(Easing.out).toHaveBeenCalled();
        act(() => {
          root.update(<html.div style={[styles.width(200)]} />);
        });
        expect(root.toJSON()).toMatchSnapshot('end');
      });

      test('cubic-bezier easing', () => {
        let root;
        // cubic-bezier easing
        act(() => {
          root = create(
            <html.div
              style={styles.opacity(1, 'cubic-bezier( 0.1,  0.2,0.3  ,0.4)')}
            />
          );
        });
        expect(root.toJSON()).toMatchSnapshot();
        expect(Easing.bezier).toHaveBeenCalledWith(0.1, 0.2, 0.3, 0.4);
      });

      test('transition all properties (opacity and transform)', () => {
        let root;
        // transition all properties (opacity and transform)
        act(() => {
          root = create(<html.div style={styles.transitionAll} />);
        });
        expect(Easing.in).toHaveBeenCalled();
        expect(root.toJSON()).toMatchSnapshot();
      });

      test('transition multiple properties', () => {
        let root;
        // transition multiple properties
        act(() => {
          root = create(<html.div style={styles.transitionMultiple} />);
        });
        expect(Easing.in).toHaveBeenCalled();
        expect(root.toJSON()).toMatchSnapshot();
      });

      test('transition with missing properties', () => {
        let root;
        // transition with missing properties
        act(() => {
          root = create(<html.div style={styles.transitionWithoutProperty} />);
        });
        act(() => {
          root.update(<html.div style={[styles.transitionWithoutProperty]} />);
        });
        expect(console.error).not.toHaveBeenCalled();
        expect(root.toJSON()).toMatchSnapshot();
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
        expect(console.error).not.toHaveBeenCalled();
        expect(root.toJSON()).toMatchSnapshot();
      });

      test('other transforms', () => {
        let root;
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
      });

      test('other element types', () => {
        let root;
        // other element types
        act(() => {
          root = create(<html.span style={styles.backgroundColor()} />);
        });
        expect(root.toJSON().type).toBe('Animated.Text');
        act(() => {
          root.update(<html.button style={styles.backgroundColor()} />);
        });
        expect(root.toJSON().type).toMatchSnapshot();
      });
    });
  });

  describe('prop polyfills', () => {
    describe('global', () => {
      test('"dir" prop', () => {
        ['auto', 'ltr', 'rtl'].forEach((dir) => {
          let block, text;
          act(() => {
            block = create(<html.div dir={dir} />);
          });
          act(() => {
            text = create(<html.p dir={dir} />);
          });
          expect(block.toJSON()).toMatchSnapshot(`"${dir}" block`);
          expect(text.toJSON()).toMatchSnapshot(`"${dir}" text`);
        });
      });

      test('"hidden" prop', () => {
        let root;
        act(() => {
          root = create(<html.div hidden />);
        });

        expect(root.toJSON()).toMatchSnapshot();

        let rootOther;
        act(() => {
          rootOther = create(<html.div hidden style={{ display: 'flex' }} />);
        });
        expect(rootOther.toJSON()).toMatchSnapshot('display set');

        [true, false, 'true', 'false', 'hidden', 'until-found'].forEach(
          (hidden) => {
            let root;
            act(() => {
              root = create(<html.input hidden={hidden} />);
            });
            expect(root.toJSON()).toMatchSnapshot(`"${hidden}"`);
          }
        );
      });

      test('"inputMode" prop', () => {
        ['decimal', 'email', 'numeric', 'search', 'tel', 'url'].forEach(
          (inputMode) => {
            let root;
            act(() => {
              root = create(<html.input inputMode={inputMode} />);
            });
            expect(root.toJSON()).toMatchSnapshot(`"${inputMode}"`);
          }
        );
      });

      test('"onClick" prop', () => {
        const onClick = jest.fn();
        let root;
        act(() => {
          root = create(<html.div onClick={onClick} />);
        });
        act(() => {
          root.root.children[0].props.onPress({
            nativeEvent: {
              altKey: true,
              button: 0,
              ctrlKey: true,
              metaKey: true,
              shiftKey: true
            }
          });
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
        let root;
        act(() => {
          root = create(<html.input onKeyDown={onKeyDown} />);
        });
        act(() => {
          root.root.children[0].props.onKeyPress({ nativeEvent: { key: 'a' } });
        });
        expect(onKeyDown).toHaveBeenCalledWith(
          expect.objectContaining({
            key: 'a',
            type: 'keydown'
          })
        );
        act(() => {
          root.root.children[0].props.onSubmitEditing();
        });
        expect(onKeyDown).toHaveBeenCalledWith(
          expect.objectContaining({
            key: 'Enter',
            type: 'keydown'
          })
        );
      });

      test('"tabIndex" prop', () => {
        let root;
        act(() => {
          root = create(<html.input tabIndex={-1} />);
        });
        expect(root.toJSON()).toMatchSnapshot();
      });
    });

    describe('<img>', () => {
      test('"src" prop with loading props', () => {
        let root;
        act(() => {
          root = create(
            <html.img
              crossOrigin="use-credentials"
              decoding="async"
              fetchPriority="auto"
              loading="lazy"
              referrerPolicy="no-referrer"
              src="https://src.jpg"
            />
          );
        });
        expect(root.toJSON()).toMatchSnapshot();
      });

      test('"srcSet" prop with loading props', () => {
        let root;
        act(() => {
          root = create(
            <html.img
              crossOrigin="use-credentials"
              decoding="async"
              fetchPriority="auto"
              loading="lazy"
              referrerPolicy="no-referrer"
              srcSet="https://src.jpg 1x, https://srcx2.jpg 2x"
            />
          );
        });
        expect(root.toJSON()).toMatchSnapshot();
      });

      test('"onError" and "onLoad" prop', () => {
        const onError = jest.fn();
        const onLoad = jest.fn();

        let root;
        act(() => {
          root = create(
            <html.img onError={onError} onLoad={onLoad} src="https://src.jpg" />
          );
        });
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
          'on',
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
          let root;
          act(() => {
            root = create(<html.input autoComplete={autoComplete} />);
          });
          expect(root.toJSON()).toMatchSnapshot(`"${autoComplete}"`);
        });
      });

      test('"disabled" prop', () => {
        let root;
        act(() => {
          root = create(<html.input disabled={true} />);
        });
        expect(root.toJSON()).toMatchSnapshot();
      });

      test('"onChange" and "onInput" prop', () => {
        const onChange = jest.fn();
        const onInput = jest.fn();
        let root;
        act(() => {
          root = create(<html.input onChange={onChange} onInput={onInput} />);
        });
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
            let root;
            act(() => {
              root = create(<html.input type={type} />);
            });
            expect(root.toJSON()).toMatchSnapshot(`"${type}"`);
          }
        );

        ['checkbox', 'date', 'radio'].forEach((type, i) => {
          act(() => {
            create(<html.input type={type} />);
          });
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
        let root;
        act(() => {
          root = create(<html.input style={styles.input} />);
        });
        expect(root.toJSON()).toMatchSnapshot();
      });
    });

    describe('<textarea>', () => {
      test('"disabled" prop', () => {
        let root;
        act(() => {
          root = create(<html.textarea disabled={true} />);
        });
        expect(root.toJSON()).toMatchSnapshot();
      });

      test('"rows" prop', () => {
        let root;
        act(() => {
          root = create(<html.textarea rows={5} />);
        });
        expect(root.toJSON()).toMatchSnapshot();
      });
    });
  });

  describe('interaction styles', () => {
    const styles = css.create({
      hover: {
        backgroundColor: {
          default: 'white',
          ':hover': 'red'
        }
      },
      focus: {
        backgroundColor: {
          default: 'white',
          ':focus': 'green'
        }
      },
      active: {
        backgroundColor: {
          default: 'white',
          ':active': 'blue'
        }
      },
      all: {
        backgroundColor: {
          default: 'white',
          ':hover': 'red',
          ':focus': 'green',
          ':active': 'blue'
        }
      }
    });

    const getElement = (root) => root.root.children[0];
    const getBackgroundColor = (element) => element.props.style.backgroundColor;

    test('hover (mouse)', () => {
      const onMouseEnter = jest.fn();
      const onMouseLeave = jest.fn();
      let root;
      act(() => {
        root = create(
          <html.div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={styles.hover}
          />
        );
      });
      act(() => {
        getElement(root).props.onMouseEnter();
      });
      expect(getBackgroundColor(getElement(root))).toBe('red');
      expect(onMouseEnter).toHaveBeenCalled();
      act(() => {
        getElement(root).props.onMouseLeave();
      });
      expect(getBackgroundColor(getElement(root))).toBe('white');
      expect(onMouseLeave).toHaveBeenCalled();
      act(() => {
        getElement(root).props.onMouseEnter();
      });
      expect(getBackgroundColor(getElement(root))).toBe('red');
    });

    test('hover (pointer)', () => {
      const onPointerEnter = jest.fn();
      const onPointerLeave = jest.fn();
      let root;
      act(() => {
        root = create(
          <html.div
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            style={styles.hover}
          />
        );
      });
      act(() => {
        getElement(root).props.onPointerEnter();
      });
      expect(getBackgroundColor(getElement(root))).toBe('red');
      expect(onPointerEnter).toHaveBeenCalled();
      act(() => {
        getElement(root).props.onPointerLeave();
      });
      expect(getBackgroundColor(getElement(root))).toBe('white');
      expect(onPointerLeave).toHaveBeenCalled();
      act(() => {
        getElement(root).props.onPointerEnter();
      });
      expect(getBackgroundColor(getElement(root))).toBe('red');
    });

    test('focus', () => {
      const onBlur = jest.fn();
      const onFocus = jest.fn();
      let root;
      act(() => {
        root = create(
          <html.input onBlur={onBlur} onFocus={onFocus} style={styles.focus} />
        );
      });
      act(() => {
        getElement(root).props.onFocus();
      });
      expect(getBackgroundColor(getElement(root))).toBe('green');
      expect(onFocus).toHaveBeenCalled();
      act(() => {
        getElement(root).props.onBlur();
      });
      expect(getBackgroundColor(getElement(root))).toBe('white');
      expect(onBlur).toHaveBeenCalled();
    });

    test('active', () => {
      const onPointerCancel = jest.fn();
      const onPointerDown = jest.fn();
      const onPointerUp = jest.fn();
      let root;
      act(() => {
        root = create(
          <html.input
            onPointerCancel={onPointerCancel}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            style={styles.active}
          />
        );
      });
      act(() => {
        getElement(root).props.onPointerDown();
      });
      expect(getBackgroundColor(getElement(root))).toBe('blue');
      expect(onPointerDown).toHaveBeenCalled();
      act(() => {
        getElement(root).props.onPointerUp();
      });
      expect(getBackgroundColor(getElement(root))).toBe('white');
      expect(onPointerUp).toHaveBeenCalled();
      act(() => {
        getElement(root).props.onPointerDown();
      });
      expect(getBackgroundColor(getElement(root))).toBe('blue');
      act(() => {
        getElement(root).props.onPointerCancel();
      });
      expect(getBackgroundColor(getElement(root))).toBe('white');
      expect(onPointerCancel).toHaveBeenCalled();
    });

    test('all', () => {
      const onBlur = jest.fn();
      const onFocus = jest.fn();
      const onPointerDown = jest.fn();
      const onPointerEnter = jest.fn();
      const onPointerLeave = jest.fn();
      const onPointerUp = jest.fn();
      let root;
      act(() => {
        root = create(
          <html.input
            onBlur={onBlur}
            onFocus={onFocus}
            onPointerDown={onPointerDown}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onPointerUp={onPointerUp}
            style={styles.all}
          />
        );
      });
      act(() => {
        getElement(root).props.onPointerEnter();
      });
      expect(getBackgroundColor(getElement(root))).toBe('red');
      act(() => {
        getElement(root).props.onPointerDown();
        getElement(root).props.onFocus();
      });
      expect(getBackgroundColor(getElement(root))).toBe('blue');
      act(() => {
        getElement(root).props.onPointerUp();
      });
      expect(getBackgroundColor(getElement(root))).toBe('green');
      act(() => {
        getElement(root).props.onPointerLeave();
      });
      expect(getBackgroundColor(getElement(root))).toBe('green');
    });
  });
});
