/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

type InlineStyle = {
  [key: string]: mixed
};

type StylesArray<+T> = T | $ReadOnlyArray<StylesArray<T>>;

type Styles = StylesArray<InlineStyle | false | void | null>;

export function flattenStyle(...styles: $ReadOnlyArray<Styles>): {
  [key: string]: $FlowFixMe
} {
  const flatArray = styles.flat(Infinity);
  const result = {};
  for (let i = 0; i < flatArray.length; i++) {
    const style = flatArray[i];
    if (style != null && typeof style === 'object') {
      Object.assign(result, style);
    }
  }
  return result;
}
