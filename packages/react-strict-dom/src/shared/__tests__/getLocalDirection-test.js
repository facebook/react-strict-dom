/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getLocaleDirection } from '../getLocaleDirection';

describe('getLocaleDirection', () => {
  test('identifies LTR locales', () => {
    expect(getLocaleDirection('fr')).toBe('ltr');
    expect(getLocaleDirection('en')).toBe('ltr');
    expect(getLocaleDirection('en-US')).toBe('ltr');
  });

  [
    'ae', // Avestan
    'ar', // Arabic
    'arc', // Aramaic
    'bcc', // Southern Balochi
    'bqi', // Bakthiari
    'ckb', // Sorani
    'dv', // Dhivehi
    'fa', // Persian
    'glk', // Gilaki
    'he',
    'iw', // Hebrew
    'khw', // Khowar
    'ks', // Kashmiri
    'mzn', // Mazanderani
    'nqo', // N'Ko
    'pnb', // Western Punjabi
    'ps', // Pashto
    'sd', // Sindhi
    'ug', // Uyghur
    'ur', // Urdu
    'yi' // Yiddish
  ].forEach((locale) => {
    test(`identifies "${locale}" as RTL`, () => {
      expect(getLocaleDirection(locale)).toBe('rtl');
    });
  });
});
