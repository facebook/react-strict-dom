/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CSSUnparsedValue } from '../typed-om/CSSUnparsedValue';
import { CSSVariableReferenceValue } from '../typed-om/CSSVariableReferenceValue';

describe('CSSUnparsedValue', () => {
  test('parses variable reference value containing spaces and embedded variables in the fallback', () => {
    const underTest =
      'var(--boxShadowVarNotFound, 0px 0px 0px var(--testVar2))';
    const actual = CSSUnparsedValue.parse('box-shadow', underTest);

    expect(actual).toBeInstanceOf(CSSUnparsedValue);
    expect(actual.size).toBe(1);

    const iterator = actual.values();

    const { value: variableInstance } = iterator.next();
    expect(variableInstance).toBeInstanceOf(CSSVariableReferenceValue);
    expect(variableInstance.variable).toBe('--boxShadowVarNotFound');

    const fallback = variableInstance.fallback;
    expect(fallback).toBeInstanceOf(CSSUnparsedValue);
    expect(fallback.size).toBe(2);

    const fallbackIterator = fallback.values();

    const { value: fallbackValue1 } = fallbackIterator.next();
    expect(fallbackValue1).toBe('0px 0px 0px ');

    const { value: fallbackValue2 } = fallbackIterator.next();
    expect(fallbackValue2).toBeInstanceOf(CSSVariableReferenceValue);
    expect(fallbackValue2.variable).toBe('--testVar2');
    expect(fallbackValue2.fallback).toBeNull();

    expect(fallbackIterator.next().done).toBe(true);
  });

  test('correctly parses a var with a complex fallback which itself contains a var', () => {
    const underTest = 'var(--colorNotFound, rgb(255,255,var(--test)))';
    const actual = CSSUnparsedValue.parse('background-color', underTest);

    expect(actual).toBeInstanceOf(CSSUnparsedValue);
    expect(actual.size).toBe(1);

    const iterator = actual.values();
    const { value: variableInstance } = iterator.next();
    expect(variableInstance).toBeInstanceOf(CSSVariableReferenceValue);
    expect(variableInstance.variable).toBe('--colorNotFound');

    const fallback = variableInstance.fallback;
    expect(fallback).toBeInstanceOf(CSSUnparsedValue);
    expect(fallback.size).toBe(3);

    const fallbackIterator = fallback.values();

    const { value: fallbackValue1 } = fallbackIterator.next();
    expect(fallbackValue1).toBe('rgb(255,255,');

    const { value: fallbackValue2 } = fallbackIterator.next();
    expect(fallbackValue2).toBeInstanceOf(CSSVariableReferenceValue);
    expect(fallbackValue2.variable).toBe('--test');
    expect(fallbackValue2.fallback).toBeNull();

    const { value: fallbackValue3 } = fallbackIterator.next();
    expect(fallbackValue3).toBe(')');

    expect(fallbackIterator.next().done).toBe(true);
  });
});
