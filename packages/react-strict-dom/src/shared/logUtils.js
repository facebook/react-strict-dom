/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

const loggedMessages: { [string]: boolean, ... } = {};

export function errorMsg(msg: string) {
  if (process.env.NODE_ENV !== 'test' && loggedMessages[msg]) {
    return;
  }
  loggedMessages[msg] = true;
  console.error(`[error] React Strict DOM: ${msg}`);
}

export function logMsg(msg: string) {
  if (process.env.NODE_ENV !== 'test' && loggedMessages[msg]) {
    return;
  }
  loggedMessages[msg] = true;
  console.log(`[log] React Strict DOM: ${msg}`);
}

export function warnMsg(msg: string) {
  if (process.env.NODE_ENV !== 'test' && loggedMessages[msg]) {
    return;
  }
  loggedMessages[msg] = true;
  console.warn(`[warn] React Strict DOM: ${msg}`);
}
