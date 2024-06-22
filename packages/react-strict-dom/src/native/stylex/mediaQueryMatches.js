/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import mediaQuery from 'css-mediaquery';

const MEDIA = '@media';

export function mediaQueryMatches(
  query: string,
  width: number,
  height: number
): boolean {
  const q = query.split(MEDIA)[1];
  return mediaQuery.match(q, {
    width,
    height,
    orientation: width > height ? 'landscape' : 'portrait',
    'aspect-ratio': width / height
  });
}
