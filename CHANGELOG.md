# Changelog

## 0.0.9 (Apr 29, 2024)

### Fixes

* [Native] Fix polyfill for CSS units when value is negative ([#108](https://github.com/facebook/react-strict-dom/pull/108)).
* [Native] Simplify 'dir' prop handling.
* [Native] Fix polyfill for CSS unitless lineHeight ([#106](https://github.com/facebook/react-strict-dom/pull/106)).
* [Native] Relax the Flow types for props.

## 0.0.8 (Apr 18, 2024)

### Fixes

* [Native] Further refinement of log, warn, error messaging.
* [Native] Fix typos in names of `{row,column}Gap`` properties ([#97](https://github.com/facebook/react-strict-dom/pull/97)).
* Fix 'html' types across dom and native ([#98](https://github.com/facebook/react-strict-dom/pull/98)).
* Fix TypeScript types for StrictHTMLCollection ([#99](https://github.com/facebook/react-strict-dom/pull/99)).

## 0.0.7 (Apr 17, 2024)

### New features

* [Native] Polyfill CSS `::placeholder` support ([#96](https://github.com/facebook/react-strict-dom/pull/96)).
* Update `@stylexjs/stylex`` 0.6.0 ([#93](https://github.com/facebook/react-strict-dom/pull/93)).
* Export Element types from package ([#90](https://github.com/facebook/react-strict-dom/pull/90)).

### Fixes

* Fix for Android to convert style string '0' to number ([#91](https://github.com/facebook/react-strict-dom/pull/91)).
* Fix textarea `verticalAlign` styles not being applied ([#95](https://github.com/facebook/react-strict-dom/pull/95)).

## 0.0.6 (Apr 11, 2024)

### Fixes

* [Native] Provide structured error/warn messages ([#86](https://github.com/facebook/react-strict-dom/pull/86)).
* [Native] Polyfill click event stopPropagation & preventDefault ([#81](https://github.com/facebook/react-strict-dom/pull/81)).
* [Native] Ignore more properties in eslint-plugin.
* [Native] Fix `gap` property names in eslint-plugin  ([#85](https://github.com/facebook/react-strict-dom/pull/85)).
* Avoid inexact Flow object types ([#82](https://github.com/facebook/react-strict-dom/pull/82)).

## 0.0.5 (Apr 4, 2024)

### Fixes

* Workaround to allow arbitrary `data-*`` types with Flow ([#75](https://github.com/facebook/react-strict-dom/pull/75)).
* [Native] Fix `html.img`` event bug in Fabric ([#72](https://github.com/facebook/react-strict-dom/pull/72)).
* [Native] Fix `eslint-plugin`` inconsistent module syntax ([#74](https://github.com/facebook/react-strict-dom/pull/74)).

## 0.0.4 (Mar 25, 2024)

### New features

* [Native] Add `del`, `ins`, `kbd`, `s`, `u` semantic elements ([#57](https://github.com/facebook/react-strict-dom/pull/57)).

## 0.0.3 (Mar 10, 2024)

### New features

* TypeScript support ([#36](https://github.com/facebook/react-strict-dom/pull/36)).
* [Native] Improved CSS Custom Property support ([#44](https://github.com/facebook/react-strict-dom/pull/44)).

## 0.0.2 (Feb 26, 2024)

### Optimizations

* [Web] Add babel plugin to optimize web output ([#29](https://github.com/facebook/react-strict-dom/pull/29)).

### New features

* [Native] Partial polyfill for CSS `visibility` ([#35](https://github.com/facebook/react-strict-dom/pull/35)).

## 0.0.1 (Feb 20, 2024)

* Initial release.
