/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css } from 'react-strict-dom';

const mockOptions = {
  hover: false,
  viewportHeight: 600,
  viewportWidth: 320
};

/**
 * Values: unsupported
 */

describe('values', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn');
    console.warn.mockImplementation(() => {});
  });

  afterEach(() => {
    console.warn.mockRestore();
  });

  test('calc()', () => {
    const { underTest } = css.create({
      underTest: {
        width: 'calc(2 * 1rem)'
      }
    });
    expect(console.warn).toHaveBeenCalled();
    expect(css.props.call(mockOptions, underTest).style?.width).toBeUndefined();
  });

  test('currentcolor', () => {
    const { underTest } = css.create({
      underTest: {
        color: 'currentcolor'
      }
    });
    expect(console.warn).toHaveBeenCalled();
    expect(css.props.call(mockOptions, underTest).style?.color).toBeUndefined();
  });

  test('inherit', () => {
    const { underTest } = css.create({
      underTest: {
        fontSize: 'inherit'
      }
    });
    expect(console.warn).toHaveBeenCalled();
    expect(
      css.props.call(mockOptions, underTest).style?.fontSize
    ).toBeUndefined();
  });

  test('initial', () => {
    const { underTest } = css.create({
      underTest: {
        fontSize: 'initial'
      }
    });
    expect(console.warn).toHaveBeenCalled();
    expect(
      css.props.call(mockOptions, underTest).style?.fontSize
    ).toBeUndefined();
  });

  test('firstThatWorks', () => {
    const { underTest } = css.create({
      underTest: {
        color: css.firstThatWorks('hsl(0,0,0)', 'rgb(0,0,0)')
      }
    });
    expect(css.props.call(mockOptions, underTest).style.color).toBe(
      'hsl(0,0,0)'
    );
  });
});

/**
 * Properties: general
 */

describe('properties: general', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error');
    jest.spyOn(console, 'warn');
    console.error.mockImplementation(() => {});
    console.warn.mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
    console.warn.mockRestore();
  });

  test('animationDelay', () => {
    const styles = css.create({
      root: {
        animationDelay: '0.3s'
      }
    });
    expect(css.props.call(mockOptions, styles.root)).toMatchSnapshot();
  });

  test('animationDuration', () => {
    const styles = css.create({
      root: {
        animationDuration: '0.5s'
      }
    });
    expect(css.props.call(mockOptions, styles.root)).toMatchSnapshot();
  });

  test('backgroundImage', () => {
    const styles = css.create({
      root: {
        backgroundImage: 'url(https://placehold.it/300/300)'
      }
    });
    css.props.call(mockOptions, styles.root);
    expect(console.warn).toHaveBeenCalled();
  });

  test('borderColor', () => {
    const { underTest } = css.create({
      underTest: {
        // test for potential false positive on invalid shortform (multiple values / spaces)
        borderColor: 'rgba(0, 0, 0, 0.5)'
      }
    });
    expect(css.props.call(mockOptions, underTest)).toMatchSnapshot();
    expect(console.error).not.toHaveBeenCalled();
  });

  test('borderStyle', () => {
    const styles = css.create({
      root: {
        borderStyle: 'none',
        borderWidth: 10
      },
      override: {
        borderStyle: 'solid'
      }
    });
    expect(css.props.call(mockOptions, styles.root)).toMatchSnapshot();
    expect(
      css.props.call(mockOptions, styles.root, styles.override)
    ).toMatchSnapshot();
  });

  test('boxShadow', () => {
    const styles = css.create({
      single: {
        boxShadow: '1px 2px 3px 4px red'
      },
      multi: {
        boxShadow: '1px 2px 3px 4px red, 2px 3px 4px 5px blue'
      },
      inset: {
        boxShadow: 'inset 1px 2px 3px 4px red'
      }
    });
    expect(css.props.call(mockOptions, styles.single)).toMatchSnapshot();

    expect(css.props.call(mockOptions, styles.multi)).toMatchSnapshot();

    expect(css.props.call(mockOptions, styles.inset)).toMatchSnapshot();
  });

  test('boxSizing: content-box', () => {
    const styles = css.create({
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
      units: {
        boxSizing: 'content-box',
        borderWidth: 2,
        padding: '1rem',
        width: '100px',
        height: 50
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
      }
    });
    expect(css.props.call(mockOptions, styles.width)).toMatchSnapshot('width');
    expect(css.props.call(mockOptions, styles.height)).toMatchSnapshot(
      'height'
    );
    expect(css.props.call(mockOptions, styles.maxWidth)).toMatchSnapshot(
      'maxWidth'
    );
    expect(css.props.call(mockOptions, styles.maxHeight)).toMatchSnapshot(
      'maxHeight'
    );
    expect(css.props.call(mockOptions, styles.minWidth)).toMatchSnapshot(
      'minWidth'
    );
    expect(css.props.call(mockOptions, styles.minHeight)).toMatchSnapshot(
      'minHeight'
    );
    expect(css.props.call(mockOptions, styles.units)).toMatchSnapshot('units');
    expect(css.props.call(mockOptions, styles.allDifferent)).toMatchSnapshot(
      'allDifferent'
    );
    expect(css.props.call(mockOptions, styles.auto)).toMatchSnapshot('auto');
  });

  test('caretColor', () => {
    const styles = css.create({
      transparentCaret: {
        caretColor: 'transparent'
      },
      redCaret: {
        caretColor: 'red'
      },
      unsupportedCaret: {
        caretColor: 'inherit'
      }
    });
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('unsupported style value in "caretColor:inherit"')
    );
    expect(
      css.props.call(mockOptions, styles.transparentCaret)
    ).toMatchSnapshot('transparent caret color');
    expect(css.props.call(mockOptions, styles.redCaret)).toMatchSnapshot(
      'red caret color'
    );
    expect(
      css.props.call(mockOptions, styles.unsupportedCaret)
    ).toMatchSnapshot('unsupported caret color');
  });

  test('direction', () => {
    const styles = css.create({
      ltr: {
        direction: 'ltr'
      },
      rtl: {
        direction: 'rtl'
      }
    });
    expect(css.props.call(mockOptions, styles.ltr)).toMatchSnapshot('ltr');
    expect(css.props.call(mockOptions, styles.rtl)).toMatchSnapshot('rtl');
  });

  test('filter', () => {
    const { underTest } = css.create({
      underTest: {
        filter: 'blur(1px)'
      }
    });
    expect(css.props.call(mockOptions, underTest)).toMatchSnapshot();
  });

  test('fontSize', () => {
    const styles = css.create({
      root: {
        fontSize: '2.5rem'
      }
    });
    expect(css.props.call(mockOptions, styles.root)).toMatchSnapshot('default');

    expect(
      css.props.call({ ...mockOptions, fontScale: 2 }, styles.root)
    ).toMatchSnapshot('fontScale:2');
  });

  test('fontVariant', () => {
    const styles = css.create({
      root: {
        fontVariant: 'common-ligatures small-caps'
      }
    });
    expect(css.props.call(mockOptions, styles.root)).toMatchSnapshot();
  });

  test('fontWeight', () => {
    const styles = css.create({
      root: {
        fontWeight: 900
      }
    });
    expect(css.props.call(mockOptions, styles.root)).toMatchSnapshot();

    const styles2 = css.create({
      root: { fontWeight: 'bold' }
    });
    expect(css.props.call(mockOptions, styles2.root)).toMatchSnapshot();
  });

  test('lineClamp', () => {
    const styles = css.create({
      root: {
        lineClamp: 3
      }
    });
    expect(css.props.call(mockOptions, styles.root)).toMatchSnapshot();
  });

  test('lineHeight', () => {
    const styles = css.create({
      numeric: {
        fontSize: 16,
        lineHeight: 1.5
      },
      string: {
        fontSize: 16,
        lineHeight: '1.5'
      },
      rem: {
        lineHeight: '1.5rem'
      },
      px: {
        lineHeight: '24px'
      }
    });
    expect(css.props.call(mockOptions, styles.numeric)).toMatchSnapshot(
      'unitless number'
    );
    expect(css.props.call(mockOptions, styles.string)).toMatchSnapshot(
      'unitless string'
    );
    expect(css.props.call(mockOptions, styles.rem)).toMatchSnapshot('rem');
    expect(css.props.call(mockOptions, styles.px)).toMatchSnapshot('px');
  });

  // multiple values are unsupported
  test('margin with multiple values', () => {
    const { underTest } = css.create({
      underTest: {
        margin: '0 auto'
      }
    });
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining(
        'Shortform properties cannot contain multiple values'
      )
    );
    expect(css.props.call(mockOptions, underTest)).toMatchSnapshot();
  });

  // unsupported
  test('marginStart', () => {
    const { underTest } = css.create({
      underTest: {
        marginStart: 10
      }
    });
    expect(css.props.call(mockOptions, underTest)).toMatchSnapshot();
    expect(console.warn).toHaveBeenCalled();
  });

  // unsupported
  test('marginEnd', () => {
    const { underTest } = css.create({
      underTest: {
        marginEnd: 10
      }
    });
    expect(css.props.call(mockOptions, underTest)).toMatchSnapshot();
    expect(console.warn).toHaveBeenCalled();
  });

  // unsupported
  test('marginHorizontal', () => {
    const { underTest } = css.create({
      underTest: {
        marginHorizontal: 10
      }
    });
    expect(css.props.call(mockOptions, underTest)).toMatchSnapshot();
    expect(console.warn).toHaveBeenCalled();
  });

  // unsupported
  test('marginVertical', () => {
    const { underTest } = css.create({
      underTest: {
        marginVertical: 10
      }
    });
    expect(css.props.call(mockOptions, underTest)).toMatchSnapshot();
    expect(console.warn).toHaveBeenCalled();
  });

  test('mixBlendMode', () => {
    const { underTest } = css.create({
      underTest: {
        mixBlendMode: 'multiply'
      }
    });
    expect(css.props.call(mockOptions, underTest)).toMatchSnapshot();
  });

  test('objectFit', () => {
    const styles = css.create({
      contain: {
        objectFit: 'contain'
      },
      cover: {
        objectFit: 'cover'
      },
      fill: {
        objectFit: 'fill'
      },
      scaleDown: {
        objectFit: 'scale-down'
      },
      none: {
        objectFit: 'none'
      }
    });
    expect(css.props.call(mockOptions, styles.contain)).toMatchSnapshot(
      'contain'
    );
    expect(css.props.call(mockOptions, styles.cover)).toMatchSnapshot(
      'contain'
    );
    expect(css.props.call(mockOptions, styles.fill)).toMatchSnapshot('fill');
    expect(css.props.call(mockOptions, styles.scaleDown)).toMatchSnapshot(
      'scaleDown'
    );
    expect(css.props.call(mockOptions, styles.none)).toMatchSnapshot('none');
  });

  // multiple values are unsupported
  test('padding with multiple values', () => {
    const { underTest } = css.create({
      underTest: {
        padding: '1px 2px 3px'
      }
    });
    expect(css.props.call(mockOptions, underTest)).toMatchSnapshot();
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining(
        'Shortform properties cannot contain multiple values'
      )
    );
  });

  // unsupported
  test('paddingHorizontal', () => {
    const { underTest } = css.create({
      underTest: {
        paddingHorizontal: 10
      }
    });
    expect(css.props.call(mockOptions, underTest)).toMatchSnapshot();
    expect(console.warn).toHaveBeenCalled();
  });

  // unsupported
  test('paddingVertical', () => {
    const { underTest } = css.create({
      underTest: {
        paddingVertical: 10
      }
    });
    expect(css.props.call(mockOptions, underTest)).toMatchSnapshot();
    expect(console.warn).toHaveBeenCalled();
  });

  test('placeContent', () => {
    const validStyles = css.create({
      center: { placeContent: 'center' },
      flexStart: { placeContent: 'flex-start' },
      longForms: {
        alignContent: 'flex-start',
        justifyContent: 'flex-start'
      }
    });
    expect(css.props.call(mockOptions, validStyles.center)).toMatchSnapshot(
      'center'
    );
    expect(css.props.call(mockOptions, validStyles.flexStart)).toMatchSnapshot(
      'flexStart'
    );
    expect(
      css.props.call(mockOptions, [validStyles.longForms, validStyles.center])
    ).toMatchSnapshot('does not override existing long-forms');

    const inValidStyles = css.create({
      safeCenter: { placeContent: 'safe center' },
      stretch: { placeContent: 'stretch' },
      invalid: { placeContent: 'flex-start flex-end' }
    });
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining(
        'unsupported style value in "placeContent:safe center"'
      )
    );
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining(
        'unsupported style value in "placeContent:stretch"'
      )
    );
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining(
        'unsupported style value in "placeContent:flex-start flex-end"'
      )
    );
    expect(
      css.props.call(mockOptions, inValidStyles.safeCenter)
    ).toMatchSnapshot('safeCenter');
    expect(css.props.call(mockOptions, inValidStyles.stretch)).toMatchSnapshot(
      'stretch'
    );
    expect(css.props.call(mockOptions, inValidStyles.invalid)).toMatchSnapshot(
      'invalid'
    );
  });

  test('pointerEvents', () => {
    const styles = css.create({
      root: {
        pointerEvents: 'none'
      }
    });
    expect(css.props.call(mockOptions, styles.root)).toMatchSnapshot();
  });

  test('position', () => {
    const styles = css.create({
      static: {
        position: 'static'
      },
      relative: {
        position: 'relative'
      },
      absolute: {
        position: 'absolute'
      },
      fixed: {
        position: 'fixed'
      },
      sticky: {
        position: 'sticky'
      }
    });
    expect(console.warn).toHaveBeenCalledTimes(2);
    expect(css.props.call(mockOptions, styles.static)).toMatchSnapshot(
      'static'
    );
    expect(css.props.call(mockOptions, styles.relative)).toMatchSnapshot(
      'relative'
    );
    expect(css.props.call(mockOptions, styles.absolute)).toMatchSnapshot(
      'absolute'
    );
    expect(css.props.call(mockOptions, styles.fixed)).toMatchSnapshot('fixed');
    expect(css.props.call(mockOptions, styles.sticky)).toMatchSnapshot(
      'sticky'
    );
  });

  test('transitionProperty', () => {
    const { underTest } = css.create({
      underTest: {
        transitionProperty: 'opacity'
      }
    });
    expect(css.props.call(mockOptions, underTest)).toMatchSnapshot();
    expect(console.warn).not.toHaveBeenCalled();
  });

  test('textShadow', () => {
    const styles = css.create({
      root: {
        textShadow: '1px 2px 3px red'
      }
    });
    expect(css.props.call(mockOptions, styles.root)).toMatchSnapshot();

    const styles2 = css.create({
      root: {
        textShadow: '1px 2px 3px red, 2px 3px 4px blue'
      }
    });
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(css.props.call(mockOptions, styles2.root)).toMatchSnapshot();
  });

  test('transform', () => {
    const styles = css.create({
      none: {
        transform: 'none'
      },
      matrix: {
        transform: 'matrix(0.1, 1, -0.3, 1, 0, 0)'
      },
      perspective: {
        transform: 'perspective(10px)'
      },
      rotate: {
        transform:
          'rotate(10deg) rotateX(20deg) rotateY(30deg) rotateZ(40deg) rotate3d(0, 0.5, 1, 90deg)'
      },
      scale: {
        transform: 'scale(1, 2) scaleX(1) scaleY(2) scaleZ(3) scale3d(1, 2, 3)'
      },
      skew: {
        transform: 'skew(10deg, 15deg) skewX(20deg) skewY(30deg)'
      },
      translate: {
        transform:
          'translate(10px, 20px) translateX(11px) translateY(12px) translateZ(13px) translate3d(20px, 30px, 40px)'
      },
      mixed: {
        transform: `
          rotateX(1deg) rotateY(2deg) rotateZ(3deg) rotate3d(1deg, 2deg, 3deg)
          scale(1) scaleX(2) scaleY(3) scaleZ(4) scale3d(1,2,3)
          translateX(1px) translateY(1em) translateZ(1rem) translate3d(1px, 1em, 1rem)
        `
      }
    });
    expect(css.props.call(mockOptions, styles.none)).toMatchSnapshot('none');
    expect(css.props.call(mockOptions, styles.matrix)).toMatchSnapshot(
      'matrix'
    );
    expect(css.props.call(mockOptions, styles.perspective)).toMatchSnapshot(
      'perspective'
    );
    expect(css.props.call(mockOptions, styles.rotate)).toMatchSnapshot(
      'rotate'
    );
    expect(css.props.call(mockOptions, styles.scale)).toMatchSnapshot('scale');
    expect(css.props.call(mockOptions, styles.skew)).toMatchSnapshot('skew');
    expect(css.props.call(mockOptions, styles.translate)).toMatchSnapshot(
      'translate'
    );
    expect(css.props.call(mockOptions, styles.rotate)).toMatchSnapshot(
      'rotate'
    );
    expect(css.props.call(mockOptions, styles.mixed)).toMatchSnapshot('mixed');
  });

  test('transitionDelay', () => {
    const styles = css.create({
      root: {
        transitionDelay: '0.3s'
      }
    });
    expect(css.props.call(mockOptions, styles.root)).toMatchSnapshot();
  });

  test('transitionDuration', () => {
    const styles = css.create({
      root: {
        transitionDuration: '0.5s'
      }
    });
    expect(css.props.call(mockOptions, styles.root)).toMatchSnapshot();
  });

  test('userSelect', () => {
    const styles = css.create({
      root: {
        userSelect: 'none'
      }
    });
    expect(css.props.call(mockOptions, styles.root)).toMatchSnapshot();
  });

  test('verticalAlign', () => {
    const styles = css.create({
      middle: {
        verticalAlign: 'middle'
      },
      top: {
        verticalAlign: 'top'
      }
    });
    expect(css.props.call(mockOptions, styles.middle)).toMatchSnapshot(
      'middle'
    );
    expect(css.props.call(mockOptions, styles.top)).toMatchSnapshot('top');
  });

  test('visibility', () => {
    const styles = css.create({
      collapse: {
        visibility: 'collapse'
      },
      hidden: {
        visibility: 'hidden'
      },
      visible: {
        visibility: 'visible'
      }
    });
    expect(css.props.call(mockOptions, styles.collapse)).toMatchSnapshot(
      'collapse'
    );
    expect(css.props.call(mockOptions, styles.hidden)).toMatchSnapshot(
      'hidden'
    );
    expect(css.props.call(mockOptions, styles.visible)).toMatchSnapshot(
      'visible'
    );
  });
});

/**
 * Properties: logical
 */

describe('properties: logical direction', () => {
  test('blockSize', () => {
    const styles = css.create({
      blockSize: {
        blockSize: '100px'
      },
      maxBlockSize: {
        maxBlockSize: '100px'
      },
      minBlockSize: {
        minBlockSize: '100px'
      }
    });
    expect(css.props.call(mockOptions, styles.blockSize)).toMatchSnapshot(
      'blockSize'
    );
    expect(
      css.props.call(mockOptions, { height: 200 }, styles.blockSize)
    ).toMatchSnapshot('blockSize after height');
    expect(css.props.call(mockOptions, styles.maxBlockSize)).toMatchSnapshot(
      'maxBlockSize'
    );
    expect(
      css.props.call(mockOptions, { maxHeight: 200 }, styles.maxBlockSize)
    ).toMatchSnapshot('maxBlockSize after maxHeight');
    expect(css.props.call(mockOptions, styles.minBlockSize)).toMatchSnapshot(
      'minBlockSize'
    );
    expect(
      css.props.call(mockOptions, { minHeight: 200 }, styles.minBlockSize)
    ).toMatchSnapshot('minBlockSize after minHeight');
  });

  test('inlineSize', () => {
    const styles = css.create({
      inlineSize: {
        inlineSize: '100px'
      },
      maxInlineSize: {
        maxInlineSize: '100px'
      },
      minInlineSize: {
        minInlineSize: '100px'
      }
    });
    expect(css.props.call(mockOptions, styles.inlineSize)).toMatchSnapshot(
      'inlineSize'
    );
    expect(
      css.props.call(mockOptions, { width: 200 }, styles.inlineSize)
    ).toMatchSnapshot('inlineSize after width');
    expect(css.props.call(mockOptions, styles.maxInlineSize)).toMatchSnapshot(
      'maxInlineSize'
    );
    expect(
      css.props.call(mockOptions, { maxWidth: 200 }, styles.maxInlineSize)
    ).toMatchSnapshot('maxInlineSize after maxWidth');
    expect(css.props.call(mockOptions, styles.minInlineSize)).toMatchSnapshot(
      'minInlineSize'
    );
    expect(
      css.props.call(mockOptions, { minWidth: 200 }, styles.minInlineSize)
    ).toMatchSnapshot('minInlineSize after minWidth');
  });

  test('borderBlock', () => {
    const styles = css.create({
      borderBlock: {
        borderBlockColor: 'black',
        borderBlockStyle: 'solid',
        borderBlockWidth: 1
      },
      borderBlockEnd: {
        borderBlockEndColor: 'red',
        borderBlockEndStyle: 'dotted',
        borderBlockEndWidth: 2
      },
      borderBlockStart: {
        borderBlockStartColor: 'green',
        borderBlockStartStyle: 'dashed',
        borderBlockStartWidth: 3
      }
    });
    expect(css.props.call(mockOptions, styles.borderBlock)).toMatchSnapshot(
      'borderBlock'
    );
    expect(css.props.call(mockOptions, styles.borderBlockEnd)).toMatchSnapshot(
      'borderBlockEnd'
    );
    expect(
      css.props.call(mockOptions, styles.borderBlockStart)
    ).toMatchSnapshot('borderBlockStart');

    expect(
      css.props.call(mockOptions, styles.borderBlockEnd, styles.borderBlock)
    ).toMatchSnapshot('borderBlock after borderBlockEnd');
    expect(
      css.props.call(mockOptions, styles.borderBlockStart, styles.borderBlock)
    ).toMatchSnapshot('borderBlock after borderBlockStart');
  });

  test('borderInline', () => {
    const styles = css.create({
      borderInline: {
        borderInlineColor: 'black',
        borderInlineStyle: 'solid',
        borderInlineWidth: 1
      },
      borderInlineEnd: {
        borderInlineEndColor: 'red',
        borderInlineEndStyle: 'dotted',
        borderInlineEndWidth: 2
      },
      borderInlineStart: {
        borderInlineStartColor: 'green',
        borderInlineStartStyle: 'dashed',
        borderInlineStartWidth: 3
      }
    });
    expect(css.props.call(mockOptions, styles.borderInline)).toMatchSnapshot(
      'borderInline'
    );
    expect(css.props.call(mockOptions, styles.borderInlineEnd)).toMatchSnapshot(
      'borderInlineEnd'
    );
    expect(
      css.props.call(mockOptions, styles.borderInlineStart)
    ).toMatchSnapshot('borderInlineStart');

    expect(
      css.props.call(mockOptions, styles.borderInlineEnd, styles.borderInline)
    ).toMatchSnapshot('borderInline after borderInlineEnd');
    expect(
      css.props.call(mockOptions, styles.borderInlineStart, styles.borderInline)
    ).toMatchSnapshot('borderInline after borderInlineStart');
  });

  test('borderRadius', () => {
    const styles = css.create({
      startstart: {
        borderStartStartRadius: 10
      },
      startend: {
        borderStartEndRadius: 10
      },
      endstart: {
        borderEndStartRadius: 10
      },
      endend: {
        borderEndEndRadius: 10
      }
    });
    expect(css.props.call(mockOptions, styles.startstart)).toMatchSnapshot(
      'startstart'
    );
    expect(css.props.call(mockOptions, styles.startend)).toMatchSnapshot(
      'startend'
    );
    expect(css.props.call(mockOptions, styles.endstart)).toMatchSnapshot(
      'endstart'
    );
    expect(css.props.call(mockOptions, styles.endend)).toMatchSnapshot(
      'endend'
    );
  });

  test.skip('borderStyle', () => {
    const styles = css.create({
      root: {}
    });
    expect(css.props.call(mockOptions, styles.root)).toMatchSnapshot();
  });

  test.skip('borderWidth', () => {
    const styles = css.create({
      root: {}
    });
    expect(css.props.call(mockOptions, styles.root)).toMatchSnapshot();
  });

  test('inset', () => {
    const styles = css.create({
      inset: {
        inset: 1
      },
      insetBlock: {
        insetBlock: 2
      },
      insetBlockStart: {
        insetBlockStart: 3
      },
      insetBlockEnd: {
        insetBlockEnd: 4
      },
      insetInline: {
        insetInline: 5
      },
      insetInlineStart: {
        insetInlineStart: 6
      },
      insetInlineEnd: {
        insetInlineEnd: 7
      }
    });
    expect(css.props.call(mockOptions, styles.inset)).toMatchSnapshot('inset');
    expect(css.props.call(mockOptions, styles.insetBlock)).toMatchSnapshot(
      'insetBlock'
    );
    expect(css.props.call(mockOptions, styles.insetBlockStart)).toMatchSnapshot(
      'insetBlockStart'
    );
    expect(css.props.call(mockOptions, styles.insetBlockEnd)).toMatchSnapshot(
      'insetBlockEnd'
    );
    expect(css.props.call(mockOptions, styles.insetInline)).toMatchSnapshot(
      'insetInline'
    );
    expect(
      css.props.call(mockOptions, styles.insetInlineStart)
    ).toMatchSnapshot('insetInlineStart');
    expect(css.props.call(mockOptions, styles.insetInlineEnd)).toMatchSnapshot(
      'insetInlineEnd'
    );

    expect(
      css.props.call(
        mockOptions,
        { left: 10, right: 10, bottom: 100, top: 100 },
        styles.insetBlockStart
      )
    ).toMatchSnapshot('inset vs top');
    expect(
      css.props.call(
        mockOptions,
        { bottom: 100, top: 100 },
        styles.insetBlockStart
      )
    ).toMatchSnapshot('insetBlock vs top');
    expect(
      css.props.call(mockOptions, { top: 100 }, styles.insetBlockStart)
    ).toMatchSnapshot('insetBlockStart vs top');
    expect(
      css.props.call(mockOptions, { bottom: 100 }, styles.insetBlockEnd)
    ).toMatchSnapshot('insetBlockEnd vs bottom');
  });

  test('margin', () => {
    const styles = css.create({
      marginBlock: {
        marginBlock: 1
      },
      marginBlockStart: {
        marginBlockStart: 2
      },
      marginBlockEnd: {
        marginBlockEnd: 3
      },
      marginInline: {
        marginInline: 1
      },
      marginInlineStart: {
        marginInlineStart: 2
      },
      marginInlineEnd: {
        marginInlineEnd: 3
      }
    });
    expect(css.props.call(mockOptions, styles.marginBlock)).toMatchSnapshot(
      'marginBlock'
    );
    expect(
      css.props.call(mockOptions, styles.marginBlockStart)
    ).toMatchSnapshot('marginBlockStart');
    expect(css.props.call(mockOptions, styles.marginBlockEnd)).toMatchSnapshot(
      'marginBlockEnd'
    );
    expect(css.props.call(mockOptions, styles.marginInline)).toMatchSnapshot(
      'marginInline'
    );
    expect(
      css.props.call(mockOptions, styles.marginInlineStart)
    ).toMatchSnapshot('marginInlineStart');
    expect(css.props.call(mockOptions, styles.marginInlineEnd)).toMatchSnapshot(
      'marginInlineEnd'
    );
  });

  test('padding', () => {
    const styles = css.create({
      paddingBlock: {
        paddingBlock: 1
      },
      paddingBlockStart: {
        paddingBlockStart: 2
      },
      paddingBlockEnd: {
        paddingBlockEnd: 3
      },
      paddingInline: {
        paddingInline: 1
      },
      paddingInlineStart: {
        paddingInlineStart: 2
      },
      paddingInlineEnd: {
        paddingInlineEnd: 3
      }
    });
    expect(css.props.call(mockOptions, styles.paddingBlock)).toMatchSnapshot(
      'paddingBlock'
    );
    expect(
      css.props.call(mockOptions, styles.paddingBlockStart)
    ).toMatchSnapshot('paddingBlockStart');
    expect(css.props.call(mockOptions, styles.paddingBlockEnd)).toMatchSnapshot(
      'paddingBlockEnd'
    );
    expect(css.props.call(mockOptions, styles.paddingInline)).toMatchSnapshot(
      'paddingInline'
    );
    expect(
      css.props.call(mockOptions, styles.paddingInlineStart)
    ).toMatchSnapshot('paddingInlineStart');
    expect(
      css.props.call(mockOptions, styles.paddingInlineEnd)
    ).toMatchSnapshot('paddingInlineEnd');
  });

  test('textAlign', () => {
    const styles = css.create({
      start: {
        textAlign: 'start'
      },
      end: {
        textAlign: 'end'
      }
    });
    expect(css.props.call(mockOptions, styles.start)).toMatchSnapshot('start');
    expect(css.props.call(mockOptions, styles.end)).toMatchSnapshot('end');
  });
});

/**
 * Properties: Custom Properties
 */

function resolveCustomPropertyValue(options, customPropertyDeclaration) {
  const [key, value] = customPropertyDeclaration;
  const styles = css.create({
    root: {
      [key]: value
    }
  });
  return css.props.call({ ...mockOptions, ...options }, styles.root).style?.[
    key
  ];
}

describe('properties: custom property', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error');
    jest.spyOn(console, 'warn');
    console.error.mockImplementation(() => {});
    console.warn.mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
    console.warn.mockRestore();
  });

  // "legacy" StyleX theming uses string values for custom variables,
  // and expects them to be provided by another system. On native, they
  // can be defined in a JS object and passed into the style resolver.
  test('legacy strings', () => {
    const options = {
      customProperties: {
        rootColor: 'red'
      }
    };
    expect(
      resolveCustomPropertyValue(options, ['color', 'var(--rootColor)'])
    ).toEqual('red');
  });

  test('css.defineVars', () => {
    const options = {};
    const tokens = css.defineVars({
      rootColor: 'red',
      themeAwareColor: {
        default: 'blue',
        '@media (prefers-color-scheme: dark)': 'green'
      }
    });
    expect(tokens).toMatchSnapshot('tokens');
    expect(css.__customProperties).toMatchSnapshot('css.__customProperties');
    expect(
      resolveCustomPropertyValue(options, ['color', tokens.rootColor])
    ).toEqual('red');
    expect(
      resolveCustomPropertyValue(options, ['color', tokens.themeAwareColor])
    ).toEqual('blue');
    // dark theme
    expect(
      resolveCustomPropertyValue({ colorScheme: 'dark' }, [
        'color',
        tokens.themeAwareColor
      ])
    ).toEqual('green');
  });

  test('css.createTheme', () => {
    const tokens = css.defineVars({
      rootColor: 'red'
    });
    const theme = css.createTheme(tokens, {
      rootColor: 'green'
    });
    expect(theme).toMatchSnapshot('theme');
    expect(css.__customProperties).toMatchSnapshot('css.__customProperties');

    const styles = css.create({
      root: {
        color: tokens.rootColor
      }
    });

    const options = {
      ...mockOptions,
      customProperties: { ...css.__customProperties, ...theme }
    };
    expect(css.props.call(options, styles.root).style.color).toEqual('green');
  });

  test('does not parse malformed vars', () => {
    const options = {};
    expect(
      resolveCustomPropertyValue(options, ['color', 'var(--testUnfinished'])
    ).toEqual(undefined);
    expect(
      resolveCustomPropertyValue(options, ['color', 'var(bad--input)'])
    ).toEqual(undefined);
    expect(
      resolveCustomPropertyValue(options, ['color', '--testMulti'])
    ).toEqual('--testMulti');
    expect(
      resolveCustomPropertyValue(options, ['color', 'var ( --testMulti)'])
    ).toEqual('var ( --testMulti)');
  });

  test('handles undefined variables', () => {
    const { underTest } = css.create({
      underTest: {
        width: 'var(--unprovided)'
      }
    });
    expect(css.props.call({ ...mockOptions }, underTest)).toMatchSnapshot();
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('unrecognized custom property "--unprovided"')
    );
  });

  test('parses a basic var correctly', () => {
    const options = {
      customProperties: { test: 'red' }
    };
    expect(
      resolveCustomPropertyValue(options, ['color', 'var(--test)'])
    ).toEqual('red');
  });

  test('parses a var with a default value', () => {
    const options = {
      customProperties: { test: 'red' }
    };
    expect(
      resolveCustomPropertyValue(options, ['color', 'var(--test, blue)'])
    ).toEqual('red');
    expect(
      resolveCustomPropertyValue(options, ['color', 'var(--not-found, blue)'])
    ).toEqual('blue');
  });

  // TODO: this transform should not be supported. Custom properties are case sensitive.
  test('parses kebab case var to camel case', () => {
    const options = {
      customProperties: { testVar: 'red' }
    };
    expect(
      resolveCustomPropertyValue(options, ['color', 'var(--test-var)'])
    ).toEqual('red');
  });

  // TODO: this transform should not be supported. Custom properties are case sensitive.
  test('parses kebab case var with a default value', () => {
    const options = {
      customProperties: { testVar: 'red' }
    };
    expect(
      resolveCustomPropertyValue(options, ['color', 'var(--test-var, blue)'])
    ).toEqual('red');
    expect(
      resolveCustomPropertyValue(options, ['color', 'var(--not-found, blue)'])
    ).toEqual('blue');
  });

  test('parses a var with a default value containing spaces', () => {
    const options = {
      customProperties: { color: 'rgb(0,0,0)' }
    };
    expect(
      resolveCustomPropertyValue(options, [
        'color',
        'var(--color, rgb( 1 , 1 , 1 ))'
      ])
    ).toEqual('rgb(0,0,0)');
    expect(
      resolveCustomPropertyValue(options, [
        'color',
        'var(--colorNotFound, rgb( 1 , 1 , 1 ))'
      ])
    ).toEqual('rgb(1 , 1 , 1)');
  });

  test('parses a var and falls back to default value containing a var', () => {
    const options = {
      customProperties: { color: 'red' }
    };
    expect(
      resolveCustomPropertyValue(options, [
        'color',
        'var(--colorNotFound, var(--color))'
      ])
    ).toEqual('red');
  });

  test('parses a var and falls back to a default value containing spaces and embedded var', () => {
    const options = {
      customProperties: {
        test: '255'
      }
    };
    expect(
      resolveCustomPropertyValue(options, [
        'color',
        'var(--colorNotFound, rgb(255,255,var(--test))'
      ])
    ).toEqual('rgb(255,255,255)');
  });

  test('basic var value lookup works', () => {
    const options = {
      customProperties: { number: 10 }
    };
    expect(
      resolveCustomPropertyValue(options, ['borderWidth', 'var(--number)'])
    ).toEqual(10);
  });

  test('var value lookup with pixel prop conversion', () => {
    const options = {
      customProperties: { pxNumber: '10px' }
    };
    expect(
      resolveCustomPropertyValue(options, ['borderWidth', 'var(--pxNumber)'])
    ).toEqual(10);
  });

  test('var value lookup with em prop conversion', () => {
    const options = {
      customProperties: { emNumber: '10em' }
    };
    expect(
      resolveCustomPropertyValue(options, ['borderWidth', 'var(--emNumber)'])
    ).toEqual(160);
  });

  test('var value lookup with reference to another var', () => {
    const options = {
      customProperties: {
        number: 10,
        refToNumber: 'var(--number)',
        refToRefToNumber: 'var(--refToNumber)'
      }
    };
    expect(
      resolveCustomPropertyValue(options, ['borderWidth', 'var(--refToNumber)'])
    ).toEqual(10);
    expect(
      resolveCustomPropertyValue(options, [
        'borderWidth',
        'var(--refToRefToNumber)'
      ])
    ).toEqual(10);
  });

  test('var with hover styles', () => {
    const options = {
      customProperties: { test: '#333' },
      hover: true
    };
    const { underTest } = css.create({
      underTest: {
        color: {
          ':hover': 'var(--test)',
          default: '#ccc'
        }
      }
    });
    expect(
      css.props.call(
        {
          ...mockOptions,
          ...options
        },
        underTest
      )
    ).toMatchSnapshot();
  });

  test('rgb(a) function with args applied through a single var', () => {
    const options = {
      customProperties: { example: '24, 48, 96' }
    };
    expect(
      resolveCustomPropertyValue(options, ['color', 'rgb(var(--example))'])
    ).toEqual('rgb(24, 48, 96)');
    expect(
      resolveCustomPropertyValue(options, [
        'color',
        'rgba(var(--example), 0.5)'
      ])
    ).toEqual('rgba(24, 48, 96, 0.5)');
  });

  test('rgba function with args applied through multiple (& nested) vars', () => {
    const options = {
      customProperties: {
        red: 255,
        green: 96,
        blue: 16,
        rgb: 'var(--red), var(--green), var(--blue)',
        alpha: 0.42
      }
    };
    expect(
      resolveCustomPropertyValue(options, [
        'color',
        'rgba(var(--rgb), var(--alpha))'
      ])
    ).toEqual('rgba(255, 96, 16, 0.42)');
  });

  test('textShadow with nested/multiple vars', () => {
    const options = {
      customProperties: {
        height: '20px',
        width: '10px',
        size: 'var(--width) var(--height)',
        radius: '30px',
        red: 'red'
      }
    };
    const styles = css.create({
      test: {
        textShadow: 'var(--size) var(--radius) var(--red)'
      }
    });
    expect(
      css.props.call({ ...mockOptions, ...options }, styles.test).style
    ).toStrictEqual({
      textShadowColor: 'red',
      textShadowOffset: {
        height: 20,
        width: 10
      },
      textShadowRadius: 30
    });
  });

  test('transform with nested/multiple vars', () => {
    const options = {
      customProperties: {
        distance: 20,
        angle: '45deg',
        translateX: 'translateX(var(--distance))',
        rotateX: 'rotateX(var(--angle))'
      }
    };
    const styles = css.create({
      test: {
        transform: 'var(--translateX) var(--rotateX)'
      }
    });
    expect(
      css.props.call({ ...mockOptions, ...options }, styles.test).style
    ).toStrictEqual({
      transform: [{ translateX: 20 }, { rotateX: '45deg' }]
    });
  });

  test('css variable declaration inside a media query', () => {
    const options = {
      customProperties: {
        example: '42px'
      },
      viewportWidth: 450
    };
    const styles = css.create({
      test: {
        inlineSize: {
          default: '30px',
          '@media (min-width: 400px)': 'var(--example)'
        }
      }
    });
    expect(
      css.props.call({ ...mockOptions, ...options }, styles.test).style
    ).toStrictEqual({
      width: 42
    });
  });
});

/**
 * Styles: pseudo-states
 */

describe('styles: pseudo-state', () => {
  const getBackgroundColor = (style, state) => {
    return css.props.call({ ...mockOptions, ...state }, style).style
      .backgroundColor;
  };

  test(':focus syntax', () => {
    const styles = css.create({
      root: {
        backgroundColor: {
          default: 'white',
          ':focus': 'red'
        }
      }
    });
    expect(getBackgroundColor(styles.root)).toBe('white');
    expect(getBackgroundColor(styles.root, { focus: true })).toBe('red');
  });

  test(':hover syntax', () => {
    const styles = css.create({
      root: {
        backgroundColor: {
          default: 'white',
          ':hover': 'red'
        }
      }
    });

    expect(getBackgroundColor(styles.root)).toBe('white');
    expect(getBackgroundColor(styles.root, { hover: true })).toBe('red');
  });

  test(':active syntax', () => {
    const styles = css.create({
      root: {
        backgroundColor: {
          default: 'white',
          ':active': 'red'
        }
      }
    });

    expect(getBackgroundColor(styles.root)).toBe('white');
    expect(getBackgroundColor(styles.root, { active: true })).toBe('red');
  });

  test('order of states', () => {
    const styles = css.create({
      root: {
        backgroundColor: {
          default: 'white',
          ':active': 'red',
          ':focus': 'green',
          ':hover': 'blue'
        }
      }
    });

    expect(getBackgroundColor(styles.root, { hover: true, focus: true })).toBe(
      'green'
    );
    expect(getBackgroundColor(styles.root, { hover: true, active: true })).toBe(
      'red'
    );
    expect(getBackgroundColor(styles.root, { focus: true, active: true })).toBe(
      'red'
    );
    expect(
      getBackgroundColor(styles.root, {
        hover: true,
        focus: true,
        active: true
      })
    ).toBe('red');
  });
});

/**
 * Styles: pseudo-elements
 */

describe('styles: pseudo-element', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn');
    console.warn.mockImplementation(() => {});
  });

  afterEach(() => {
    console.warn.mockRestore();
  });

  test('::placeholder syntax', () => {
    const styles = css.create({
      root: {
        '::placeholder': {
          color: 'red',
          fontWeight: 'bold'
        }
      }
    });
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining(
        'unsupported "::placeholder" style property "fontWeight"'
      )
    );
    expect(css.props.call(mockOptions, styles.root)).toMatchSnapshot(
      'placeholderTextColor'
    );
  });
});

/**
 * Units: length
 */

describe('units: length', () => {
  const unitsToTest = ['em', 'px', 'rem', 'vh', 'vmax', 'vmin', 'vw'];
  const value = 10;
  const negativeValue = -1 * value;

  for (const unitToTest of unitsToTest) {
    test(`${value} "${unitToTest}" units are resolved to pixels`, () => {
      const styles = css.create({
        underTest: {
          height: `${negativeValue}${unitToTest}`,
          width: `${value}${unitToTest}`
        }
      });
      expect(css.props.call(mockOptions, styles.underTest)).toMatchSnapshot();
    });
  }

  test(`${value} "em" units based on font-size`, () => {
    const styles = css.create({
      underTest: {
        fontSize: 10,
        width: `${value}em`
      }
    });
    expect(css.props.call(mockOptions, styles.underTest)).toMatchSnapshot();
  });

  test(`${value} "em" units based on inherited font-size`, () => {
    const styles = css.create({
      underTest: {
        width: `${value}em`
      }
    });
    expect(
      css.props.call(
        {
          ...mockOptions,
          inheritedFontSize: 12
        },
        styles.underTest
      )
    ).toMatchSnapshot();
  });

  test("'0' is resolved to the number 0", () => {
    const styles = css.create({
      zeroStringTest: {
        borderRadius: '0',
        width: '0'
      }
    });
    expect(
      css.props.call(mockOptions, styles.zeroStringTest)
    ).toMatchSnapshot();
  });
});

/**
 * Queries: Media
 */

expect.extend({
  toMatchWindowDimensions(query, windowSize) {
    const { height, width } = windowSize;
    const UNEXPECTED_MATCHED_VALUE = 420;
    const EXPECTED_MATCHED_VALUE = 500;
    const { underTest } = css.create({
      underTest: {
        width: {
          default: UNEXPECTED_MATCHED_VALUE,
          [query]: EXPECTED_MATCHED_VALUE
        }
      }
    });
    const theProps = css.props.call(
      {
        viewportHeight: height,
        viewportWidth: width
      },
      underTest
    );
    const actualValue = theProps.style.width;
    if (actualValue === EXPECTED_MATCHED_VALUE) {
      return {
        pass: true,
        message: () =>
          `expected media query ${query} not to match in a window of width ${width} and height ${height}`
      };
    } else {
      return {
        pass: false,
        message: () =>
          `expected media query ${query} to match in a window of width ${width} and height ${height}`
      };
    }
  }
});

describe('queries: @media', () => {
  test('matches a "min-width" query', () => {
    expect('@media (min-width: 400px)').toMatchWindowDimensions({
      width: 450,
      height: 0
    });
    expect('@media (min-width: 400px)').not.toMatchWindowDimensions({
      width: 350,
      height: 0
    });
  });

  test('matches a "max-width" query', () => {
    expect('@media (max-width: 400px)').toMatchWindowDimensions({
      width: 350,
      height: 0
    });
    expect('@media (max-width: 400px)').not.toMatchWindowDimensions({
      width: 450,
      height: 0
    });
  });

  test('matches a "min-height" query', () => {
    expect('@media (min-height: 400px)').toMatchWindowDimensions({
      width: 0,
      height: 450
    });
    expect('@media (min-height: 400px)').not.toMatchWindowDimensions({
      width: 0,
      height: 350
    });
  });

  test('matches a "max-height" query', () => {
    expect('@media (max-height: 400px)').toMatchWindowDimensions({
      width: 0,
      height: 350
    });
    expect('@media (max-height: 400px)').not.toMatchWindowDimensions({
      width: 0,
      height: 450
    });
  });

  test('matches a "prefers-color-scheme: dark" query', () => {
    const tokens = css.defineVars({
      prefersColor: {
        default: 'blue',
        '@media (prefers-color-scheme: dark)': 'darkblue'
      }
    });

    const themeTokens = css.defineVars({
      prefersColor: {
        default: 'red',
        '@media (prefers-color-scheme: dark)': 'darkred'
      }
    });

    const theme = css.createTheme(themeTokens, {
      prefersColor: {
        default: 'green',
        '@media (prefers-color-scheme: dark)': 'darkgreen'
      }
    });

    const { underTest } = css.create({
      underTest: {
        backgroundColor: tokens.prefersColor,
        borderColor: themeTokens.prefersColor,
        color: {
          default: 'black',
          '@media (prefers-color-scheme: dark)': 'white'
        }
      }
    });
    const props = css.props.call(
      {
        customProperties: { ...css.__customProperties, ...theme },
        colorScheme: 'dark'
      },
      underTest
    );
    expect(props.style.backgroundColor).toBe('darkblue');
    expect(props.style.borderColor).toBe('darkgreen');
    expect(props.style.color).toBe('white');
  });
});
