/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const parser = 'flow';

export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.ImportDeclaration, {
      importKind: 'type',
      source: {
        value: '@stylexjs/stylex/lib/StyleXTypes'
      }
    })
    .forEach((path) => {
      path.node.source = j.literal('StyleXTypes');
    })
    .toSource();
}
