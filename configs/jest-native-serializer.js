/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

function flattenStyle(style) {
  if (!style) {
    return undefined;
  }
  if (!Array.isArray(style)) {
    return style;
  }
  const result = {};
  for (let i = 0, styleLength = style.length; i < styleLength; ++i) {
    const computedStyle = flattenStyle(style[i]);
    if (computedStyle) {
      for (const key in computedStyle) {
        const value = computedStyle[key];
        result[key] = value;
      }
    }
  }
  return result;
}

function createSerializer() {
  function flattenNodeStyles(node) {
    if (node && node.props) {
      // check for React elements in any props
      const nextProps = Object.keys(node.props).reduce((acc, curr) => {
        const value = node.props[curr];
        if (React.isValidElement(value)) {
          acc[curr] = flattenNodeStyles(value);
        }
        return acc;
      }, {});

      // flatten styles and avoid empty objects in snapshots
      if (node.props.style) {
        const style = flattenStyle(node.props.style);
        if (Object.keys(style).length > 0) {
          nextProps.style = style;
        } else {
          delete nextProps.style;
        }
      }

      const args = [node, nextProps];

      // recurse over children too
      const children = node.children || node.props.children;
      if (children) {
        if (Array.isArray(children)) {
          children.forEach((child) => {
            args.push(flattenNodeStyles(child));
          });
        } else {
          args.push(flattenNodeStyles(children));
        }
      }

      return React.cloneElement.apply(React.cloneElement, args);
    }

    return node;
  }

  function test(value) {
    return !!value && value.$$typeof === Symbol.for('react.test.json');
  }

  function print(value, serializer) {
    return serializer(flattenNodeStyles(value));
  }

  return { test, print };
}

const serializer = createSerializer();

module.exports = serializer;
