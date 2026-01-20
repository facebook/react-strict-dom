/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function create(styles) {
  const compiled = {};
  if (styles == null) {
    return compiled;
  }
  for (const key of Object.keys(styles)) {
    const value = styles[key];
    if (typeof value === 'function') {
      compiled[key] = () => ({ $$css: true, [key]: key });
    } else {
      compiled[key] = { $$css: true, [key]: key };
    }
  }
  return compiled;
}

export function props() {
  return {};
}

export default { create, props };
