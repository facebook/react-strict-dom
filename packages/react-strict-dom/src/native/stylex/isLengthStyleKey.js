/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import { version } from '../modules/version';

export const lengthStyleKeySet: Set<string> = new Set([
  'blockSize',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomWidth',
  'borderBlockWidth',
  'borderBlockEndWidth',
  'borderBlockStartWidth',
  'borderEndEndRadius',
  'borderEndStartRadius',
  'borderInlineWidth',
  'borderInlineEndWidth',
  'borderInlineStartWidth',
  'borderLeftWidth',
  'borderRadius',
  'borderRightWidth',
  'borderStartEndRadius',
  'borderStartStartRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopWidth',
  'borderWidth',
  'bottom',
  'columnGap',
  'gap',
  'height',
  'inlineSize',
  'inset',
  'insetBlock',
  'insetBlockEnd',
  'insetBlockStart',
  'insetInline',
  'insetInlineEnd',
  'insetInlineStart',
  'left',
  'margin',
  'marginBlock',
  'marginBlockEnd',
  'marginBlockStart',
  'marginBottom',
  'marginInline',
  'marginInlineEnd',
  'marginInlineStart',
  'marginLeft',
  'marginRight',
  'marginTop',
  'maxBlockSize',
  'maxHeight',
  'maxInlineSize',
  'maxWidth',
  'minBlockSize',
  'minHeight',
  'minInlineSize',
  'minWidth',
  'padding',
  'paddingBlock',
  'paddingBlockEnd',
  'paddingBlockStart',
  'paddingBottom',
  'paddingInline',
  'paddingInlineEnd',
  'paddingInlineStart',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'right',
  'rowGap',
  'top',
  'width'
]);

if (version.experimental) {
  lengthStyleKeySet.add('outlineOffset');
  lengthStyleKeySet.add('outlineWidth');
}
