/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

'use strict';

import type { RuleContext, RuleFixer, RuleModule } from 'eslint';
import type {
  CallExpression,
  ESNode,
  JSXAttribute,
  ObjectExpression,
  ObjectProperty,
  Property,
  SpreadElement
} from 'estree';

// List of web-specific file extensions to ignore since they indicate web usage only
const ALLOWED_FILES = ['.web.js', '.web.jsx', '.web.ts', '.web.tsx'];

const allowlistedStylexProps = new Set([
  'alignContent',
  'alignItems',
  'alignSelf',
  'aspectRatio',
  'backfaceVisibility',
  'backgroundColor',
  'blockSize',
  'borderBlockColor',
  'borderBlockStyle',
  'borderBlockWidth',
  'borderBlockEndColor',
  'borderBlockEndStyle',
  'borderBlockEndWidth',
  'borderBlockStartColor',
  'borderBlockStartStyle',
  'borderBlockStartWidth',
  'borderBottomColor',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomStyle',
  'borderBottomWidth',
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
  'boxShadow', // web-only
  'boxSizing',
  'clipPath', // web-only
  'color',
  'cursor', // web-only
  'direction', // web-only
  'display',
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
  'columnGap',
  'rowGap',
  'height',
  'inlineSize',
  'inset',
  'insetBlock',
  'insetBlockEnd',
  'insetBlockStart',
  'insetInline',
  'insetInlineEnd',
  'insetInlineStart',
  'justifyContent',
  'left',
  'letterSpacing',
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
  'pointerEvents',
  'position',
  'right',
  'textAlign',
  'textDecorationColor',
  'textDecorationLine',
  'textDecorationStyle',
  'textShadow',
  'textTransform',
  'top',
  'transform',
  'transformOrigin',
  'transitionDelay',
  'transitionDuration',
  'transitionProperty',
  'transitionTimingFunction',
  'userSelect',
  'verticalAlign',
  'visibility',
  'width',
  'zIndex'
]);

const nonStandardLogicalProperties = new Map<string, string>([
  ['borderBottomEndRadius', 'borderEndEndRadius'],
  ['borderBottomStartRadius', 'borderEndStartRadius'],
  ['borderEndColor', 'borderInlineEndColor'],
  ['borderEndStyle', 'borderInlineEndStyle'],
  ['borderEndWidth', 'borderInlineEndWidth'],
  ['borderHorizontalColor', 'borderInlineColor'],
  ['borderHorizontalStyle', 'borderInlineStyle'],
  ['borderHorizontalWidth', 'borderInlineWidth'],
  ['borderStartColor', 'borderInlineStartColor'],
  ['borderStartStyle', 'borderInlineStartStyle'],
  ['borderStartWidth', 'borderInlineStartWidth'],
  ['borderTopEndRadius', 'borderStartEndRadius'],
  ['borderTopStartRadius', 'borderStartStartRadius'],
  ['borderVerticalColor', 'borderBlockColor'],
  ['borderVerticalStyle', 'borderBlockStyle'],
  ['borderVerticalWidth', 'borderBlockWidth'],
  ['end', 'insetInlineEnd'],
  ['marginEnd', 'marginInlineEnd'],
  ['marginHorizontal', 'marginInline'],
  ['marginStart', 'marginInlineStart'],
  ['marginVertical', 'marginBlock'],
  ['paddingEnd', 'paddingInlineEnd'],
  ['paddingHorizontal', 'paddingInline'],
  ['paddingStart', 'paddingInlineStart'],
  ['paddingVertical', 'paddingBlock'],
  ['start', 'insetInlineStart']
]);

// list of banned style values with allowed properties
const bannedStyleValues = new Map<
  void | null | boolean | number | string | RegExp | bigint,
  RegExp
>([['borderRadius', /[0-9]{1,3}%$/]]);

// copy-paste from `stylex/valid-rules`
function isStylexCallee(node: ESNode): boolean {
  return (
    node.type === 'MemberExpression' &&
    node.object.type === 'Identifier' &&
    (node.object.name === 'stylex' || node.object.name === 'css') &&
    node.property.type === 'Identifier' &&
    node.property.name === 'create'
  );
}

// copy-paste from `stylex/valid-rules`
function isStylexDeclaration(node: ESNode): boolean {
  return (
    node &&
    node.type === 'CallExpression' &&
    isStylexCallee(node.callee) &&
    node.arguments.length === 1 &&
    node.arguments[0].type === 'ObjectExpression'
  );
}

const rule: RuleModule = {
  meta: {
    fixable: 'code',
    messages: {
      invalid:
        'React Strict DOM: "{{value}}" is not an allowed style {{type}}. How to fix this violation: https://github.com/facebook/react-strict-dom/tree/main/packages/eslint-plugin.',
      nonStandardLogical:
        'React Strict DOM: "{{value}}" is a non-standard logical property. Replace it with the web standard property "{{replacement}}".'
    }
  },
  create(context: RuleContext) {
    if (
      ALLOWED_FILES.some((allowedFile) =>
        context.getFilename().endsWith(allowedFile)
      )
    ) {
      return {};
    }

    function checkStyleProperty(
      style: Property,
      propertyAllowlist: Set<string>,
      replacements: Map<string, string>
    ) {
      if (
        !style.computed && // handled by stylex/valid-styles
        (style.key.type === 'Literal' || style.key.type === 'Identifier')
      ) {
        const key =
          style.key.type === 'Identifier' ? style.key.name : style.key.value;

        // check if it's a pseudo-selector
        if (typeof key === 'string' && key.startsWith(':')) {
          return context.report({
            node: style.key,
            messageId: 'invalid',
            data: {
              value: key,
              type: 'property'
            }
          });
        }

        // check if it's a valid style *property*
        if (
          typeof key === 'string' &&
          !key.startsWith('@media') // media query handled by stylex/valid-styles
        ) {
          const standardLogicalProperty = replacements.get(key);
          if (standardLogicalProperty != null) {
            return context.report({
              fix(fixer: RuleFixer) {
                return fixer.replaceText(style.key, standardLogicalProperty);
              },
              node: style.key,
              messageId: 'nonStandardLogical',
              data: {
                value: key,
                replacement: standardLogicalProperty
              }
            });
          }

          if (!propertyAllowlist.has(key)) {
            return context.report({
              node: style.key,
              messageId: 'invalid',
              data: {
                value: key,
                type: 'property'
              }
            });
          }
        }

        const bannedValueRegex = bannedStyleValues.get(key);
        // check if it's a valid style *value*
        if (bannedValueRegex && style.value.type === 'Literal') {
          const styleValue = style.value.value;
          if (
            typeof styleValue === 'string' &&
            bannedValueRegex.test(styleValue)
          ) {
            return context.report({
              node: style.key,
              messageId: 'invalid',
              data: {
                value: styleValue,
                type: 'value'
              }
            });
          }
        }
      }
    }

    return {
      CallExpression(node: CallExpression) {
        if (
          !isStylexDeclaration(node) ||
          node.arguments[0].type !== 'ObjectExpression' // make flow happy
        ) {
          return;
        }

        const namespaces: ObjectExpression = node.arguments[0];

        namespaces.properties.forEach((namespaceProperty) => {
          if (
            namespaceProperty.type !== 'Property' ||
            namespaceProperty.value.type !== 'ObjectExpression'
          ) {
            return;
          }

          const styles = namespaceProperty.value;
          styles.properties.forEach((prop: ObjectProperty | SpreadElement) => {
            if (prop.type === 'SpreadElement') {
              return; // handled by stylex-no-spread
            }
            checkStyleProperty(
              prop,
              allowlistedStylexProps,
              nonStandardLogicalProperties
            );
          });
        });
      },
      JSXAttribute(node: JSXAttribute) {
        // inline style={{...}} JSXAttribute
        return;
      }
    };
  }
};

module.exports = rule;
