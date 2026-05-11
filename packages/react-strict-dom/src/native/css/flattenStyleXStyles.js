/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

type InlineStyle = {
  +[key: string]: unknown
};

type StylesArray<+T> = T | ReadonlyArray<StylesArray<T>>;

type Styles = StylesArray<InlineStyle | false | void | null>;

export function flattenStyle(styles: InlineStyle | ReadonlyArray<Styles>): {
  +[key: string]: unknown
} {
  if (!Array.isArray(styles)) {
    return styles;
  }
  const flatArray = styles.flat(Infinity);
  const result = {};
  for (let i = 0; i < flatArray.length; i++) {
    const style = flatArray[i];
    if (style != null && typeof style === 'object') {
      // $FlowExpectedError[unsafe-object-assign]
      Object.assign(result, style);
    }
  }
  return result;
}
