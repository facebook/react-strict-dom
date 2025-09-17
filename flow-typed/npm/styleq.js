/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

type InlineStyle = {
  [key: string]: string | number
};

type StylesArray<+T> = T | $ReadOnlyArray<StylesArray<T>>;
type Styles = StylesArray<?{ ... } | boolean>;
type Style<+T = { ... }> = StylesArray<boolean | ?T>;

type StyleqOptions = {
  disableCache?: boolean,
  disableMix?: boolean,
  transform?: (mixed) => { ... }
};

type StyleqResult = [
  className: string,
  inlineStyle: InlineStyle | null,
  dataStyleSrc: string | null
];

type Styleq = (styles: Styles) => StyleqResult;

type IStyleq = {
  (...styles: $ReadOnlyArray<Styles>): StyleqResult,
  factory: (options?: StyleqOptions) => Styleq
};

declare module 'styleq' {
  declare module.exports: {
    styleq: IStyleq
  };
}
