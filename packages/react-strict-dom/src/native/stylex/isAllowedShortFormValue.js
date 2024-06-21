/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

// regex to find spaces outside of brackets
const spacesRegex = /\s+(?![^()]*\))/g;

const allowedShortFormKeys = new Set<string>([
  'borderColor',
  'borderRadius',
  'borderStyle',
  'borderWidth',
  'borderBlockColor',
  'borderBlockRadius',
  'borderBlockStyle',
  'borderBlockWidth',
  'borderInlineColor',
  'borderInlineRadius',
  'borderInlineStyle',
  'borderInlineWidth',
  'margin',
  'marginBlock',
  'marginInline',
  'padding',
  'paddingBlock',
  'paddingInline'
]);

export function isAllowedShortFormValue(
  propName: string,
  propValue: string
): boolean {
  if (
    allowedShortFormKeys.has(propName) &&
    propValue.match(spacesRegex) !== null
  ) {
    return false;
  }

  return true;
}
