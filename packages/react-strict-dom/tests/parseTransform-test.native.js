/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { parseTransform } from '../src/native/modules/parseTransform';

describe('parseTransform', () => {
  it('perspective', () => {
    expect(parseTransform('perspective(10px)')).toEqual([{ perspective: 10 }]);
  });

  it('rotate', () => {
    expect(parseTransform('rotate(10deg)')).toEqual([{ rotate: '10deg' }]);
  });

  it('rotateX', () => {
    expect(parseTransform('rotateX(10deg)')).toEqual([{ rotateX: '10deg' }]);
  });

  it('rotateY', () => {
    expect(parseTransform('rotateY(10deg)')).toEqual([{ rotateY: '10deg' }]);
  });

  it('rotateZ', () => {
    expect(parseTransform('rotateZ(10deg)')).toEqual([{ rotateZ: '10deg' }]);
  });

  it('scale', () => {
    expect(parseTransform('scale(3.14)')).toEqual([{ scale: 3.14 }]);
  });

  it('scaleX', () => {
    expect(parseTransform('scaleX(3.14)')).toEqual([{ scaleX: 3.14 }]);
  });

  it('scaleY', () => {
    expect(parseTransform('scaleY(3.14)')).toEqual([{ scaleY: 3.14 }]);
  });

  it('scaleZ', () => {
    expect(parseTransform('scaleZ(3.14)')).toEqual([{ scaleZ: 3.14 }]);
  });

  it('translateX', () => {
    expect(parseTransform('translateX(10px)')).toEqual([{ translateX: 10 }]);
  });

  it('translateY', () => {
    expect(parseTransform('translateY(10px)')).toEqual([{ translateY: 10 }]);
  });

  it('skewX', () => {
    expect(parseTransform('skewX(10deg)')).toEqual([{ skewX: '10deg' }]);
  });

  it('skewY', () => {
    expect(parseTransform('skewY(10deg)')).toEqual([{ skewY: '10deg' }]);
  });

  it('matrix', () => {
    expect(parseTransform('matrix(1, 2, 3, 4, 5, 6)')).toEqual([
      { matrix: [1, 2, 0, 0, 3, 4, 0, 0, 5, 6, 1, 0, 0, 0, 0, 1] }
    ]);
  });

  it('multiple transforms', () => {
    expect(parseTransform('translateX(10px) scaleX(1.3)')).toEqual([
      { translateX: 10 },
      { scaleX: 1.3 }
    ]);
  });

  it('scientific notation', () => {
    expect(parseTransform('translateX(-1e3px)')).toEqual([
      { translateX: -1000 }
    ]);
    expect(parseTransform('translateX(1e-2px)')).toEqual([
      { translateX: 0.01 }
    ]);
  });

  it('invalid transform', () => {
    const invalidTransforms = [
      '',
      'foo',
      'translateX(E2)',
      'matrix(1, 2, foo, 4, 5, 6)',
      'matrix(1, 2)'
    ];
    for (const invalidTransform of invalidTransforms) {
      expect(parseTransform(invalidTransform)).toEqual([]);
    }
  });
});
