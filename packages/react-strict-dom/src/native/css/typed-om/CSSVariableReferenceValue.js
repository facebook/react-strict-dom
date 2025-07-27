/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { CSSUnparsedValue } from './CSSUnparsedValue';

// https://drafts.css-houdini.org/css-typed-om-1/#cssvariablereferencevalue
export class CSSVariableReferenceValue /*extends CSSStyleValue*/ {
  // https://drafts.css-houdini.org/css-typed-om-1/#custom-property-name-string
  static _validateVariableName(variable: string): void {
    if (!variable.startsWith('--')) {
      throw new TypeError(`Invalid custom property name: ${variable}`);
    }
  }

  _variable: string;
  _fallback: CSSUnparsedValue | null;

  constructor(variable: string, fallback?: CSSUnparsedValue) {
    if (__DEV__) {
      CSSVariableReferenceValue._validateVariableName(variable);
    }
    // No super() call because it's slow in Hermes
    this._variable = variable;
    this._fallback = fallback ?? null;
  }

  get variable(): string {
    return this._variable;
  }

  set variable(variable: string): void {
    this._variable = variable;
  }

  get fallback(): CSSUnparsedValue | null {
    return this._fallback;
  }

  toString(): string {
    return `var(${this._variable}${
      this._fallback ? `, ${this._fallback.toString()}` : ''
    })`;
  }
}
