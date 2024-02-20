/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const parser = 'flow';

const IMPORT_DECLARATION_TYPE = 'ImportDeclaration';

const SYMBOLS_TO_EXPORT = new Set(['StrictHTMLElement']);

export default function transformer(file, api) {
  const j = api.jscodeshift;

  const withoutLocalImports = j(file.source)
    .find(j.ImportDeclaration)
    .filter((path) => {
      return (
        path.value.source.value[0] === '.' &&
        path.value.specifiers[0].type !== 'ImportNamespaceSpecifier'
      );
    })
    .forEach((path) => {
      path.replace();
    })
    .toSource();

  const processedImports = new Set();
  const withDedupedImports = j(withoutLocalImports)
    .find(j.ImportDeclaration)
    .forEach((path) => {
      if (path.value.source.value === 'react') {
        path.replace();
        return;
      }
      if (processedImports.has(path.value.source.value)) {
        path.replace();
        return;
      }
      processedImports.add(path.value.source.value);
    })
    .toSource();

  const flattenedExportNamedDeclarations = j(withDedupedImports)
    .find(j.ExportNamedDeclaration)
    .forEach((path) => {
      if (!SYMBOLS_TO_EXPORT.has(path.value.declaration.id.name)) {
        path.replace(path.value.declaration);
      }
    })
    .toSource();

  const flattenedDeclareExportDeclarations = j(flattenedExportNamedDeclarations)
    .find(j.DeclareExportDeclaration)
    .forEach((path) => {
      path.replace(path.value.declaration);
    })
    .toSource();

  const fixedImportDeclarations = j(flattenedDeclareExportDeclarations)
    .find(j.Program)
    .forEach((path) => {
      // Hoist imports to the top
      const importDeclarations = [];
      const otherStatements = [];

      for (const statement of path.value.body) {
        if (statement.type === IMPORT_DECLARATION_TYPE) {
          importDeclarations.push(statement);
        } else {
          otherStatements.push(statement);
        }
      }
      path.value.body = [...importDeclarations, ...otherStatements];
    })
    .toSource();

  const fixedCopyrightBlocks = j(fixedImportDeclarations)
    .find(j.Comment, {
      value: (value) => /Copyright/.test(value)
    })
    .forEach((path) => {
      path.replace();
    })
    .toSource();

  return fixedCopyrightBlocks;
}
