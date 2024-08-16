/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

// This type allows Meta (and other users) to define data-*
// props used by their components to work around Flow's current
// lack of support for typing arbitrary data-* props.
declare type ReactStrictDOMDataProps = {
  'data-testid'?: ?string
};

// This type allows Meta to internally override it with an
// internationalization type which is a string at runtime…
// but Flow doesn't know that.
declare type Stringish = string;
