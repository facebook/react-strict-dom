# Changelog

## 0.0.26 (Sep 05, 2024)

### Fixes

* Bump `react-native@>=0.75.2` and `stylex@0.7.5`.
* [Native] Allow text-decoration-* styles to be inherited.

## 0.0.25 (Aug 27, 2024)

### Fixes

* Build RSD using jsx automatic runtime.
* [Native] ~2% reduction in render time by replacing `View` with `ViewNativeComponent`.
* [Native] ~5% reduction in render time by separating polyfill logic required by specific native components.
* [Native] Big improvement to update performance by prevent avoidable re-renders of `html.div`.

## 0.0.24 (Aug 16, 2024)

### Fixes

* Fix TypeScript types generation.
* [Native] Polyfill logical `textAlign`.
* Removes `StrictHTMLElement` and other strict instance types. Use `HTMLElement` and other DOM types.

## 0.0.23 (Aug 8, 2024)

### New features

* [Native] Allow CSS `isolation` property.
* [Native] Polyfill the `inherit` and `unset` CSS keywords for inherited properties.
* [Native] Polyfill CSS `:focus` and `:active` pseudo-state.

### Fixes

* [Native] Add missing elements to DOM -> Native mapping
* [Native] Fix `<blockquote>` polyfill

## 0.0.22 (Jul 31, 2024)

### Fixes

* Add `value` to prop types for `li` element.
* [Native] Improve scope of CSS transitions support to include adding transitions to mounted elements during React updates.

## 0.0.21 (Jul 22, 2024)

### New features

* [Web] Add babel plugin `debug` flag to add sourceMap info to rendered elements.

### Fixes

* [Native] Fix inheritance of em-based lineHeight.

## 0.0.20 (Jul 19, 2024)

### Fixes

* [Native] Refactor `createStrictDOMComponent` to forward only supported props to React Native.
* [Native] Minor refactor of native types.

## 0.0.19 (Jul 15, 2024)

### Fixes

* [Native] Add missing dev warning for CSS transitions polyfill
* [Native] Fix CSS `em` units polyfill on non-text elements.
* [Native] Fix CSS length unit polyfill when using non-inherited `fontSize`.

## 0.0.18 (Jul 4, 2024)

### Fixes

* [Native] Skip animation setup for elements with no style transitions.
* [Native] Remove invalid style properties from allowed shortforms.

## 0.0.17 (Jun 26, 2024)

### New features

* Update to StyleX 0.7.0.
* [Native] Add support for experimental React Native style implementations of `boxShadow`, `filter`, and `mixBlendMode`.

### Fixes

* [Native] Fix styling of native `<TextInput>`.
* [Native] Fix hack that auto-wraps string children of `<View>`.
* [Native] Fix style inheritance and themes for auto-wrapped string children.

## 0.0.16 (Jun 24, 2024)

### Optimizations

* [Native] Add memoization to `css-mediaquery` parser.
* [Native] [Improve performance](https://github.com/facebook/react-strict-dom/pull/149#issuecomment-2184250856) of `css.props` by 1.25-1.35x.

### New features

* [Native] Add support for dark `color-scheme` styles.
* [Native] Add support for [Media Queries](https://stylexjs.com/docs/learn/styling-ui/defining-styles/#media-queries-and-other--rules) syntax to StyleX shim.

### Fixes

* [Native] Avoid setting invalid CSS `direction:'auto'` on native elements.
* [Native] Move all dev-time style warnings to the `create` step.
* [Native] Fix support for CSS `letterSpacing`.

## 0.0.15 (Jun 17, 2024)

### Fixes

* [Native] [Improve performance](https://github.com/facebook/react-strict-dom/pull/140#issuecomment-2171040691) of `css.create` with polyfills by 5-15x.
* [Native] [Improve performance](https://github.com/facebook/react-strict-dom/pull/140#issuecomment-2171040691) of `css.props` with polyfills by 1.1-1.15x.
* [Native] CSS variable validation errors are now dev-only.

## 0.0.14 (Jun 13, 2024)

### Fixes

* Fix `readOnly` and `required` types for `<input>` props.
* [Native] Fix text truncation ellipsis on Android ([#137](https://github.com/facebook/react-strict-dom/issues/137)).
* [Native] Remove unused modules.

## 0.0.13 (Jun 7, 2024)

### Fixes

* [Native] Fix `fontSize` and `lineHeight` style inheritance polyfills.
* [Native] Reduce number of Context Providers rendered by default.
* [Native] Add display names for Context Providers.
* [Native] Avoid duplicate console messages.

## 0.0.12 (Jun 3, 2024)

### New features

* [Native] Add support for `css.defineVars` object values ([#129](https://github.com/facebook/react-strict-dom/issues/129)).

### Fixes

* [Native] Avoid creating copies of `customProperties` ([#127](https://github.com/facebook/react-strict-dom/issues/127)).
* [Native] Remove `console` log messages from prod builds ([#126](https://github.com/facebook/react-strict-dom/issues/126)).

## 0.0.11 (May 17, 2024)

### Fixes

* [Native] Fix CSS `transform` style processing ([#124](https://github.com/facebook/react-strict-dom/issues/124)).

## 0.0.10 (May 9, 2024)

* Remove eslint-plugin package ([#89](https://github.com/facebook/react-strict-dom/issues/89)).

### New features

* [Native] Log error for shortform CSS properties with invalid values.
* [Native] Polyfill CSS `caretColor` support on Android.
* [Native] Polyfill CSS `placeContent` support.

### Fixes

* [Native] Fix `fontFamily` warning for `<code>` on Android.
* [Web] Fix `<strong>` font-weight reset.
* [Web] Remove legacy `ThemeContext` from DOM exports.

## 0.0.9 (Apr 29, 2024)

### Fixes

* [Native] Fix polyfill for CSS units when value is negative ([#108](https://github.com/facebook/react-strict-dom/pull/108)).
* [Native] Simplify 'dir' prop handling.
* [Native] Fix polyfill for CSS unitless lineHeight ([#106](https://github.com/facebook/react-strict-dom/pull/106)).
* [Native] Relax the Flow types for props.

## 0.0.8 (Apr 18, 2024)

### Fixes

* [Native] Further refinement of log, warn, error messaging.
* [Native] Fix typos in names of `{row,column}Gap` properties ([#97](https://github.com/facebook/react-strict-dom/pull/97)).
* Fix `html` types across DOM and native ([#98](https://github.com/facebook/react-strict-dom/pull/98)).
* Fix TypeScript types for `StrictHTMLCollection` ([#99](https://github.com/facebook/react-strict-dom/pull/99)).

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
