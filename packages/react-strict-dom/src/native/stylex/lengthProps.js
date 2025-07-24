/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

function allSides(fn: (side: 'Top' | 'Right' | 'Bottom' | 'Left') => string) {
  return [fn('Top'), fn('Right'), fn('Bottom'), fn('Left')];
}

export const LENGTH_PROPS: Set<string> = new Set([
  'margin',
  ...allSides((prop) => `margin${prop}`),
  'padding',
  ...allSides((prop) => `padding${prop}`),
  ...allSides((prop) => prop.toLowerCase()),
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'height',
  'width',
  'marginInline',
  'marginBlock',
  'marginBlockStart',
  'marginBlockEnd',
  'marginInlineStart',
  'marginInlineEnd',
  'paddingInline',
  'paddingBlock',
  'paddingBlockStart',
  'paddingBlockEnd',
  'paddingInlineStart',
  'paddingInlineEnd',
  'borderWidth',
  ...allSides((prop) => `border${prop}Width`),
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'outlineWidth',
  ...allSides((prop) => `outline${prop}Width`),
  'outlineOffset',
  ...allSides((prop) => `${prop}Offset`),
  'gap',
  'columnGap',
  'rowGap'
]);
