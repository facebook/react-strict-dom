/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

'use strict';

import { styleq } from 'styleq';

type CompiledStyle = $ReadOnly<{
  $$css: true,
  [key: string]: string
}>;

type InlineStyle = $ReadOnly<{
  $$css?: void,
  [key: string]: string
}>;

type StylesArray<+T> = T | $ReadOnlyArray<StylesArray<T>>;

type Props = $ReadOnly<{
  className?: string,
  'data-style-src'?: string,
  style?: $ReadOnly<{ [string]: string | number }>
}>;

const optimizedStyleq = styleq.factory({
  // ~25% faster than disableMix:false
  // Class and Style are merged independently; more cache hits.
  // 1. Inline styles can't be merged with compiled styles that have minified keys.
  // 2. Inline CSS Custom Properties drive the values of static styles
  disableMix: true
});

const DEV =
  process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development';

export function merge(
  ...styles: $ReadOnlyArray<
    StylesArray<
      ?boolean | ?CompiledStyle | ?$ReadOnly<[CompiledStyle, InlineStyle]>
    >
  >
): Props {
  const [className, style, dataStyleSrc] = optimizedStyleq(styles);
  const result: {
    className?: string,
    'data-style-src'?: string,
    style?: $ReadOnly<{ [string]: string | number }>
  } = {};
  if (className != null && className !== '') {
    result.className = className;
  }
  if (style != null) {
    result.style = style;
  }
  if (dataStyleSrc != null && dataStyleSrc !== '') {
    if (!DEV) {
      result['data-style-src'] = dataStyleSrc;
    } else {
      // Deduplicate paths from debug string
      // <path>:<line-1>; <path>:<line-2> => <path>:<line-1>,<line-2>
      const pathsMap = dataStyleSrc
        .split(';')
        .map((chunk) => chunk.trim())
        .reduce(
          (acc, chunk) => {
            const [path, line] = chunk.split(':');
            if (acc[path] == null) {
              acc[path] = [line];
            } else {
              acc[path].push(line);
            }
            return acc;
          },
          {} as { [string]: Array<string> }
        );

      const value = Object.entries(pathsMap)
        .map(([path, lines]) => {
          return `${path}:${lines.join(',')}`;
        })
        .join('; ');

      result['data-style-src'] = value;
    }
  }
  return result;
}
