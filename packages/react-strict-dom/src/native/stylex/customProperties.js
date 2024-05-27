/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import { CSSUnparsedValue } from './typed-om/CSSUnparsedValue';
import { CSSVariableReferenceValue } from './typed-om/CSSVariableReferenceValue';
import { warnMsg } from '../../shared/logUtils';

export type MutableCustomProperties = { [string]: string | number };
export type CustomProperties = $ReadOnly<MutableCustomProperties>;

function camelize(s: string): string {
  return s.replace(/-./g, (x) => x.toUpperCase()[1]);
}

function normalizeVariableName(name: string): string {
  if (!name.startsWith('--')) {
    throw new Error("Invalid variable name, must begin with '--'");
  }
  return camelize(name.substring(2));
}

export function stringContainsVariables(input: string): boolean {
  return input.includes('var(');
}

function resolveVariableReferenceValue(
  propName: string,
  variable: CSSVariableReferenceValue,
  propertyRegistry: CustomProperties,
  inheritedPropertyRegistry: CustomProperties
) {
  const variableName = normalizeVariableName(variable.variable);
  const fallbackValue = variable.fallback;

  let variableValue: string | number | null =
    propertyRegistry[variableName] || inheritedPropertyRegistry[variableName];

  // Perform variable resolution on the variable's resolved value if it itself
  // contains variables
  if (
    typeof variableValue === 'string' &&
    stringContainsVariables(variableValue)
  ) {
    variableValue = resolveVariableReferences(
      propName,
      CSSUnparsedValue.parse(propName, variableValue),
      propertyRegistry,
      inheritedPropertyRegistry
    );
  }

  if (variableValue != null) {
    if (typeof variableValue === 'object' && variableValue.default != null) {
      // TODO: Support dark theme through media queries too.
      const defaultValue = variableValue.default;
      return defaultValue;
    }
    return variableValue;
  } else if (fallbackValue != null) {
    const resolvedFallback = resolveVariableReferences(
      propName,
      fallbackValue,
      propertyRegistry,
      inheritedPropertyRegistry
    );
    if (resolvedFallback != null) {
      return resolvedFallback;
    }
  }

  if (__DEV__) {
    warnMsg(`unrecognized custom property "${variable.variable}"`);
  }

  return null;
}

// Takes a CSSUnparsedValue and registry of variable values and resolves it down to a string
export function resolveVariableReferences(
  propName: string,
  propValue: CSSUnparsedValue,
  propertyRegistry: CustomProperties,
  inheritedPropertyRegistry: CustomProperties
): string | number | null {
  const result: Array<string | number> = [];
  for (const value of propValue.values()) {
    if (value instanceof CSSVariableReferenceValue) {
      const resolvedValue = resolveVariableReferenceValue(
        propName,
        value,
        propertyRegistry,
        inheritedPropertyRegistry
      );
      if (resolvedValue == null) {
        // Failure to resolve a css variable in a value means the entire value is unparsable so we bail out and
        // resolve the entire value as null
        return null;
      }
      result.push(resolvedValue);
    } else {
      result.push(value);
    }
  }

  // special case for signular number value
  if (result.length === 1 && typeof result[0] === 'number') {
    return result[0];
  }

  // consider empty string as a null value
  const output = result.join('').trim();
  return output === '' ? null : output;
}
