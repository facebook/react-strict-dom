/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import valueParser from 'postcss-value-parser';
import { CSSStyleValue } from './CSSStyleValue';
import { CSSVariableReferenceValue } from './CSSVariableReferenceValue';
import { errorMsg, warnMsg } from '../../../shared/logUtils';

type CSSUnparsedSegment = string | CSSVariableReferenceValue;

// Arbitrary recursive depth limit in order to exit/throw early
const MAX_RESOLVE_DEPTH = 50;

function splitComponentValueListByComma(
  input: PostCSSValueASTNode[]
): PostCSSValueASTNode[][] {
  const output = [];

  let current = [];
  for (const value of input) {
    if (value.type === 'div' && value.value === ',') {
      output.push(current);
      current = [];
    } else {
      current.push(value);
    }
  }

  if (current.length > 0) {
    output.push(current);
  }

  return output;
}

// https://drafts.css-houdini.org/css-typed-om-1/#cssunparsedvalue
export class CSSUnparsedValue extends CSSStyleValue {
  static #resolveVariableName(input: PostCSSValueASTNode[]): string | null {
    const cleanedInput = input.filter((i) => i.type === 'word');
    if (cleanedInput.length !== 1) {
      return null;
    }
    return valueParser.stringify(cleanedInput[0]);
  }

  static #resolveUnparsedValue(
    input: PostCSSValueASTNode[],
    depth: number = 0
  ): CSSUnparsedValue {
    if (depth > MAX_RESOLVE_DEPTH) {
      if (__DEV__) {
        errorMsg(
          `reached maximum recursion limit (${MAX_RESOLVE_DEPTH}) while resolving custom properties — please ensure you don't have a custom property reference cycle.`
        );
      }
      return new CSSUnparsedValue([]);
    }

    const tokens: CSSUnparsedSegment[] = [];

    const appendString = (str: string) => {
      if (tokens.length > 0) {
        const lastToken = tokens.at(-1);
        if (typeof lastToken === 'string') {
          tokens[tokens.length - 1] = lastToken + str;
          return;
        }
      }
      tokens.push(str);
    };

    for (const currentValue of input) {
      if (currentValue.type === 'function') {
        if (currentValue.value === 'var') {
          const args = splitComponentValueListByComma(currentValue.nodes);
          const variableName = CSSUnparsedValue.#resolveVariableName(args[0]);
          if (variableName == null) {
            if (__DEV__) {
              warnMsg(
                `Failed to resolve variable name from '${valueParser.stringify(
                  args[0]
                )}'`
              );
            }
            return new CSSUnparsedValue([]);
          }

          const fallbackValue =
            args[1] != null
              ? CSSUnparsedValue.#resolveUnparsedValue(args[1], depth + 1)
              : undefined;

          try {
            tokens.push(
              new CSSVariableReferenceValue(variableName, fallbackValue)
            );
          } catch (err) {
            if (__DEV__) {
              warnMsg(
                `Error creating CSSVariableReferenceValue: ${err.toString()}`
              );
            }
            return new CSSUnparsedValue([]);
          }
        } else {
          // stringify the function manually but still attempt to resolve the args
          appendString(`${currentValue.value}(`);
          const functionArgs = CSSUnparsedValue.#resolveUnparsedValue(
            currentValue.nodes,
            depth + 1
          );
          for (const arg of functionArgs.values()) {
            if (typeof arg === 'string') {
              appendString(arg);
            } else {
              tokens.push(arg);
            }
          }
          appendString(')');
        }
      } else {
        appendString(valueParser.stringify(currentValue));
      }
    }
    return new CSSUnparsedValue(tokens);
  }

  // TODO: in the full spec this should take into account the property name
  // to determine what the value should be parsed to but as we currently are only taking
  // unparsed & variable references we can ignore it for now
  static parse(_property: string, input: string): CSSUnparsedValue {
    const componentValueList = valueParser(input).nodes;
    return CSSUnparsedValue.#resolveUnparsedValue(componentValueList);
  }

  #tokens: CSSUnparsedSegment[];

  constructor(members: CSSUnparsedSegment[]) {
    super();
    this.#tokens = members;
  }

  get(index: number): CSSUnparsedSegment {
    return this.#tokens[index];
  }

  set(index: number, value: CSSUnparsedSegment): void {
    this.#tokens[index] = value;
  }

  get size(): number {
    return this.#tokens.length;
  }

  values(): Iterator<CSSUnparsedSegment> {
    return this.#tokens.values();
  }

  toString(): string {
    return this.#tokens
      .map((t) => t.toString())
      .join('')
      .trim();
  }
}
