/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

// $FlowFixMe(nonstrict-import)
import { Platform } from 'react-native';

const version = Platform.constants.reactNativeVersion;
const { major, minor, patch } = version;
// Main branch OSS build, or internal build
const isMain = major === 1000 && minor === 0 && patch === 0;
// Nightly NPM package
// $FlowFixMe (pre-release is number type)
const isNightly = version?.prerelease?.startsWith('nightly-');
const isExperimental = isMain || isNightly;

const allowedStyleKeySet = new Set<string>([
  'alignContent',
  'alignItems',
  'alignSelf',
  'animationDelay',
  'animationDuration',
  'aspectRatio',
  'backfaceVisibility',
  'backgroundColor',
  'blockSize',
  'borderBottomColor',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomStyle',
  'borderBottomWidth',
  'borderBlockColor',
  'borderBlockStyle',
  'borderBlockWidth',
  'borderBlockEndColor',
  'borderBlockEndStyle',
  'borderBlockEndWidth',
  'borderBlockStartColor',
  'borderBlockStartStyle',
  'borderBlockStartWidth',
  'borderColor',
  'borderEndEndRadius',
  'borderEndStartRadius',
  'borderInlineColor',
  'borderInlineStyle',
  'borderInlineWidth',
  'borderInlineEndColor',
  'borderInlineEndStyle',
  'borderInlineEndWidth',
  'borderInlineStartColor',
  'borderInlineStartStyle',
  'borderInlineStartWidth',
  'borderLeftColor',
  'borderLeftStyle',
  'borderLeftWidth',
  'borderRadius',
  'borderRightColor',
  'borderRightStyle',
  'borderRightWidth',
  'borderStartEndRadius',
  'borderStartStartRadius',
  'borderStyle',
  'borderTopColor',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopStyle',
  'borderTopWidth',
  'borderWidth',
  'bottom',
  'boxShadow',
  'boxSizing',
  'caretColor',
  'color',
  'columnGap',
  'cursor',
  'cursorColor',
  'direction',
  'display',
  'filter',
  'flex',
  'flexBasis',
  'flexDirection',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'fontVariant',
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
  'isolation',
  'justifyContent',
  'left',
  'letterSpacing',
  'lineClamp',
  'lineHeight',
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
  'mixBlendMode',
  'objectFit',
  'opacity',
  'overflow',
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
  'placeContent',
  'pointerEvents',
  'position',
  'right',
  'rowGap',
  'textAlign',
  'textDecorationColor', // iOS Only
  'textDecorationLine',
  'textDecorationStyle', // iOS Only
  'textShadow',
  'textTransform',
  'transform',
  'transformOrigin',
  'transitionDelay',
  'transitionDuration',
  'transitionProperty',
  'transitionTimingFunction',
  'top',
  'userSelect',
  'verticalAlign', // Android Only
  'visibility',
  'width',
  'zIndex',
  // Object-value keys
  'default',
  ':active',
  ':focus',
  ':hover',
  // Pseudo-element keys
  '::placeholder'
]);

if (isExperimental === true) {
  allowedStyleKeySet.add('outlineColor');
  allowedStyleKeySet.add('outlineOffset');
  allowedStyleKeySet.add('outlineStyle');
  allowedStyleKeySet.add('outlineWidth');
}

export function isAllowedStyleKey(key: string): boolean {
  return (
    allowedStyleKeySet.has(key) ||
    key.startsWith('--') ||
    key.startsWith('@media')
  );
}
