/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

// This type allows Meta to internally override it with an
// internationalization type which is a string at runtime…
// but Flow doesn't know that.
declare type Stringish = string;
