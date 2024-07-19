/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const { addNamed, addNamespace } = require('@babel/helper-module-imports');

function createShortFilename(absolutePath, baseDir = process.cwd()) {
  if (!path.isAbsolute(baseDir)) {
    throw new Error('Base directory must be an absolute path.');
  }
  const relativePath = path.relative(baseDir, absolutePath);
  // Normalize slashes in the path and truncated
  const shortPath = relativePath.split(path.sep).slice(-2).join('/');
  return shortPath;
}

module.exports = function ({ types: t }, options = {}) {
  const packageName = 'react-strict-dom';
  const packageRuntime = 'react-strict-dom/dist/dom/runtime';
  const findImportDeclaration = (body, sourceValue) =>
    body.filter(
      (node) =>
        node.type === 'ImportDeclaration' && node.source.value === sourceValue
    );
  const findHtmlSpecifier = (specifiers) =>
    specifiers
      ? specifiers.filter((specifier) => specifier.imported.name === 'html')
      : [];
  let defaultStylesImportIdentifier;
  let stylexImportIdentifier;

  return {
    visitor: {
      Program: {
        enter(path) {
          const importDeclarations = findImportDeclaration(
            path.node.body,
            packageName
          );
          if (importDeclarations.length > 0) {
            defaultStylesImportIdentifier = addNamed(
              path,
              'defaultStyles',
              packageRuntime
            );
            stylexImportIdentifier = addNamespace(path, '@stylexjs/stylex', {
              nameHint: 'stylex'
            });
            path.scope.rename(
              'defaultStyles',
              defaultStylesImportIdentifier.name
            );
            path.scope.rename('stylex', stylexImportIdentifier.name);
          }
        }
      },
      JSXMemberExpression(path, state) {
        const importDeclarations = findImportDeclaration(
          state.file.ast.program.body,
          packageName
        );
        if (!importDeclarations) return;
        const htmlSpecifiers = importDeclarations.flatMap((declaration) =>
          findHtmlSpecifier(declaration.specifiers)
        );
        if (
          htmlSpecifiers.some(
            (specifier) => path.node.object.name === specifier.local.name
          )
        ) {
          path.replaceWith(t.jsxIdentifier(path.node.property.name));
        }
      },
      JSXOpeningElement(path, state) {
        const importDeclarations = findImportDeclaration(
          state.file.ast.program.body,
          packageName
        );
        if (!importDeclarations) return;
        const htmlSpecifiers = importDeclarations.flatMap((declaration) =>
          findHtmlSpecifier(declaration.specifiers)
        );
        if (
          htmlSpecifiers.some(
            (specifier) =>
              t.isJSXMemberExpression(path.node.name) &&
              path.node.name.object.name === specifier.local.name
          )
        ) {
          let styleAttributeExists = false;
          let typeAttributeExists = false;
          let dirAttributeExists = false;

          path.node.attributes.forEach((attribute, index) => {
            if (t.isJSXAttribute(attribute) && attribute.name.name === 'for') {
              attribute.name.name = 'htmlFor';
            }
            if (
              t.isJSXAttribute(attribute) &&
              attribute.name.name === 'role' &&
              attribute.value.value === 'none'
            ) {
              attribute.value.value = 'presentation';
            }
            if (
              t.isJSXAttribute(attribute) &&
              attribute.name.name === 'style'
            ) {
              styleAttributeExists = true;
              const styleValue = attribute.value.expression;
              const elementName = path.node.name.property.name;
              const defaultStyles = t.memberExpression(
                t.identifier(defaultStylesImportIdentifier.name),
                t.identifier(elementName)
              );
              path.node.attributes[index] = t.jsxSpreadAttribute(
                t.callExpression(
                  t.memberExpression(
                    t.identifier(stylexImportIdentifier.name),
                    t.identifier('props')
                  ),
                  [defaultStyles].concat(
                    Array.isArray(styleValue.elements)
                      ? styleValue.elements
                      : [styleValue]
                  )
                )
              );
            }
            if (t.isJSXAttribute(attribute) && attribute.name.name === 'type') {
              typeAttributeExists = true;
            }
            if (t.isJSXAttribute(attribute) && attribute.name.name === 'dir') {
              dirAttributeExists = true;
            }
          });

          const elementName = path.node.name.property.name;
          if (elementName === 'button' && !typeAttributeExists) {
            path.node.attributes.push(
              t.jsxAttribute(t.jsxIdentifier('type'), t.stringLiteral('button'))
            );
          }

          if (
            (elementName === 'input' || elementName === 'textarea') &&
            !dirAttributeExists
          ) {
            path.node.attributes.push(
              t.jsxAttribute(t.jsxIdentifier('dir'), t.stringLiteral('auto'))
            );
          }

          if (!styleAttributeExists) {
            const elementName = path.node.name.property.name;
            const defaultStyles = t.memberExpression(
              t.identifier(defaultStylesImportIdentifier.name),
              t.identifier(elementName)
            );
            path.node.attributes.push(
              t.jsxSpreadAttribute(
                t.callExpression(
                  t.memberExpression(
                    t.identifier(stylexImportIdentifier.name),
                    t.identifier('props')
                  ),
                  [defaultStyles]
                )
              )
            );
          }

          if (options.debug) {
            /**
             * "HTML" sourceMap
             */
            const currentFile = path.hub.file;
            const sourceMap = currentFile.codeMap;
            const generatedLineNumber = path.node.loc.start.line;
            let originalLineNumber = generatedLineNumber;
            if (sourceMap) {
              const originalPosition = sourceMap.originalPositionFor({
                line: generatedLineNumber,
                column: path.node.loc.start.column
              });
              originalLineNumber = originalPosition.line;
            }
            const shortFilename = createShortFilename(
              currentFile.opts.filename || ''
            );
            // displays filename and line number of the source element
            path.node.attributes.unshift(
              t.jsxAttribute(
                t.jsxIdentifier('data-react-src'),
                t.stringLiteral(`${shortFilename}:${originalLineNumber}`)
              )
            );
          }
        }
      }
    }
  };
};
