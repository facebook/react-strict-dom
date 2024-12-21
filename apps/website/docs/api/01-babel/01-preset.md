---
title: preset
slug: /api/babel-preset
---

# Babel preset

<p className="text-xl">React Strict DOM includes a Babel preset to optimize builds. This preset is required on web.</p>

## Overview

The preset ensures that production builds have **no runtime performance overhead on web** relative to using [React DOM](https://react.dev/) with an advanced atomic CSS solution like [StyleX](https://stylexjs.com). The preset is required to extract styles to static CSS and optimize element rendering.

Import the preset from the `react-strict-dom/babel-preset` package subpath. It must be used with an options object.


```js title="babel.config.dom.js"
import reactStrictBabelPreset from 'react-strict-dom/babel-preset';

export default function babelConfig() {
  return {
    presets: [
      [reactStrictBabelPreset, { debug: true }]
    ]
  }
};
```

## API

### Preset options

* `debug: boolean` (optional). Default is `false`. If set to `true` there will be debug information included in the generated code. For example, rendered elements include a `data-element-src` attribute containing sourceMap information about the filename and line-number responsible for rendering the element.
* `dev: boolean` (optional). Default is `false`. If set to `true` there will be development logs included, and styles will not be extracted to static CSS (but injected at runtime.)
* `platform: 'web' | 'native'` (optional). Default is `web`. The target platform; this must be set to `native` for React Native builds.

### Preset methods

* `generateStyles(rules)`: **Web only**. Accetps an array of collected style rules. To generate a static CSS file, the styles must first be collected before being turned into a CSS string by this function. Next, the result should be written to a file by the build system. An illustrative example follows:

```js
import reactStrictBabelPreset from 'react-strict-dom/babel-preset';

const styleRules = {};

function transform() {
  const { code, metadata } = await babel.transformAsync(sourceCode, babelConfig);
  if (metadata.stylex != null && metadata.stylex.length > 0) {
    // collect styles from files
    styleRules[id] = metadata.stylex;
  }
  // ...
}

function bundle() {
  const rules = Object.values(styleRules).flat();
  // generate CSS string from all collected styles
  const css = reactStrictBabelPreset.generateStyles(rules);
  // ...write css to file
}
```
