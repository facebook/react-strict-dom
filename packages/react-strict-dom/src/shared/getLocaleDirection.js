/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

// Refer to unicode scripts list if support for more historic scripts is required.
// https://en.wikipedia.org/wiki/Script_(Unicode)
const rtlScripts = new Set([
  'Adlm',
  'Arab',
  'Aran',
  'Armi',
  'Avst',
  'Cprt',
  'Egyp',
  'Hatr',
  'Hebr',
  'Khar',
  'Mand',
  'Mend',
  'Nkoo',
  'Rohg',
  'Samr',
  'Syrc',
  'Thaa',
  'Yezi'
]);

const rtlLangs = new Set([
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
]);

const isRTLCache = new Map<string, boolean>();

/**
 * Determine the writing direction of a locale
 */
export function getLocaleDirection(locale: string): 'ltr' | 'rtl' {
  let isRTL = false;
  let script = null;
  const isRTLCached = isRTLCache.get(locale);
  if (isRTLCached != null) {
    isRTL = isRTLCached;
  } else {
    // Attempt to use Intl for most reliable results
    if (Intl.Locale != null) {
      script = new Intl.Locale(locale).maximize().script;
    }
    if (script != null) {
      isRTL = rtlScripts.has(script);
    }
    // Fallback to inferring from language in either 'en-US' or 'en_US' format
    else {
      const lang = locale.split(/-|_/)[0];
      isRTL = rtlLangs.has(lang);
    }

    isRTLCache.set(locale, isRTL);
  }
  return isRTL ? 'rtl' : 'ltr';
}
