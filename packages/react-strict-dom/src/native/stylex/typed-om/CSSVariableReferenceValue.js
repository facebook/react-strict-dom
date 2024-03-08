/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { CSSUnparsedValue } from './CSSUnparsedValue';

import { CSSStyleValue } from './CSSStyleValue';

// https://drafts.css-houdini.org/css-typed-om-1/#cssvariablereferencevalue
export class CSSVariableReferenceValue extends CSSStyleValue {
  // https://drafts.css-houdini.org/css-typed-om-1/#custom-property-name-string
  static #validateVariableName(variable: string): void {
    if (!variable.startsWith('--')) {
      throw new TypeError(`Invalid custom property name: ${variable}`);
    }
  }

  #variable: string;
  #fallback: CSSUnparsedValue | null;

  constructor(variable: string, fallback?: CSSUnparsedValue) {
    CSSVariableReferenceValue.#validateVariableName(variable);
    super();
    this.#variable = variable;
    this.#fallback = fallback ?? null;
  }

  get variable(): string {
    return this.#variable;
  }

  set variable(variable: string): void {
    this.#variable = variable;
  }

  get fallback(): CSSUnparsedValue | null {
    return this.#fallback;
  }

  toString(): string {
    return `var(${this.#variable}${
      this.#fallback ? `, ${this.#fallback.toString()}` : ''
    })`;
  }
}
