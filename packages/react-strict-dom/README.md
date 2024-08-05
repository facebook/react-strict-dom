# react-strict-dom

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react-strict-dom/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/react-strict-dom.svg?style=flat)](https://www.npmjs.com/package/react-strict-dom)

![web (prod)](https://img.badgesize.io/https:/www.unpkg.com/react-strict-dom@latest/dist/dom/runtime.js?label=web%20(prod)&compression=brotli)
![web (dev)](https://img.badgesize.io/https:/www.unpkg.com/react-strict-dom@latest/dist/dom/index.js?label=web%20(dev)&compression=brotli)
![native](https://img.badgesize.io/https:/www.unpkg.com/react-strict-dom@latest/dist/native/index.js?label=native&compression=brotli)


**React Strict DOM** (RSD) standardizes the development of styled React components for web and native. The goal of RSD is to improve the speed and efficiency of React development without compromising on performance, reliability, or quality. Building with RSD is helping teams at Meta ship features faster, to more platforms, with fewer engineers.

## Use

**Install**

```
npm install react-strict-dom
```

**Import**

```js
import { css, html } from 'react-strict-dom';
```

**For web**

In additional to installing `react-strict-dom`, please install the following packages:

```
npm install react react-dom
npm install --dev @stylexjs/babel-plugin
```

Configure the `importSources` option for the StyleX Babel plugin or equivalent bundler integration.

Include the RSD optimizing Babel plugin to ensure there is **no runtime performance overhead** relative to Meta's baseline of using [React DOM](https://react.dev/) with [StyleX](https://stylexjs.com/).

```js
// babel.config.dom.js

import rsdPlugin from 'react-strict-dom/babel';
import styleXBabelPlugin from '@stylexjs/babel-plugin';

module.exports = function () {
  return {
    plugins: [
      rsdPlugin,
      styleXBabelPlugin({
        importSources: [
          { from: 'react-strict-dom', as: 'css '}
        ]
      })
    ]
  }
};
```

Options for the plugin:

* `debug: boolean` (default: `false`). If set to `true` the plugin adds a `data-react-src` attribute and populates it with sourceMap information about the filename and line-number responsible for rendering the element.


**For native**

In additional to installing `react-strict-dom`, please install the following packages:

```
npm install react react-native
```

On native platforms, RSD builds on the design goals of the ["React DOM for Native proposal"](https://github.com/react-native-community/discussions-and-proposals/pull/496) by polyfilling a large number of standard APIs, and by leveraging new web capabilities coming to React Native.

## Examples

Styles are passed to elements using the `style` prop. The `style` prop accepts an array of static and dynamic styles.

```jsx
import { css, html } from 'react-strict-dom';

const styles = css.create({
  root: {
    marginBlock: '1rem'
  },
  cond: {
    borderWidth: '5px'
  },
  opacity: (value) => ({
    opacity: value
  })
})

export default function App(props) {
  const opacity = useOpacity();
  return (
    <html.div
      {...props}
      style={[
        styles.root,
        cond && styles.cond,
        styles.opacity(opacity)
      ]}
    />
  );
}
```

## API

### `css`

Cross-platform CSS styling that conforms to the [StyleX](https://stylexjs.com) API.

```js
import { css } from 'react-strict-dom'

const styles = css.create({
  root: { ... }
})
```

### `html`

Cross-platform HTML components. All elements include a minimal style reset to render with no default padding or margin. Text elements inherit font styles and headings are all the same size.

```jsx
import { html } from 'react-strict-dom'

function App() {
  return (
    <html.main>
      <html.h1>h1</html.h1>
      <html.div />
    </html.main>
  )
}
```

### Types

Strict versions of most React DOM types are exported from the package.

```jsx
import type { StrictHTMLElement } from 'react-strict-dom';

function App() {
  return (
    <html.div ref={(node: StrictHTMLElement) => {}} />
  )
}
```

## Other tips

### Suppressing logs on React Native

RSD provides comprehensive runtime warnings and errors to inform developers of about prop and style incompatibilities on native. If there are certain logs that you wish to suppress, this can be done by configuring the [React Native LogBox](https://reactnative.dev/docs/debugging#logbox) at the root of the native app. Messages follow a common structure, which allows for precise or general suppression. For example:

```js
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  // Specific errors
  '[error] React Strict DOM: css.keyframes() is not supported',
  // Specific warnings
  '[warn] React Strict DOM: unsupported prop "onInvalid"',
  '[warn] React Strict DOM: unsupported style value in "display:inline-flex"',
  // All warnings of a certain kind
  /\[warn\] React Strict DOM: unsupported style property .*/,
  // All warnings
  /\[warn\] React Strict DOM: .*/,
  // All logs
  /\[log\] React Strict DOM: .*/,
]);
```

Ignore logs as a last resort and create a task to fix logs that are ignored.

### Adding Flow types for `data-*` props

Flow does not currently support typing arbitrary `data-*` props ([#71](https://github.com/facebook/react-strict-dom/issues/71)). The workaround is to use a Flow libdef to define the `data-*` props used by your apps (or dependencies) via the `ReactStrictDOMDataProps` type. For example:

```js
// flow-typed/react-strict-dom.js
declare type ReactStrictDOMDataProps = {
  'data-imgperflogname'?: string,
  'data-impression-id'?: number,
};
```

This is a temporary solution until Flow provides a built-in approach to handling `data-*` prop types. **DO NOT** use this workaround to define any non-`data-*` props.

### Adding Flow types for translation strings

Certain prop values are typically user-facing strings, and these are defined within RSD as being of type `Stringish` - just a `string`. But when Flow doesn't know that a translation function produces strings at runtime, you can override the type of `Stringish` to account for this. For example, if using Meta's internationalization framework [Fbt](https://github.com/facebook/fbt):

```js
// flow-typed/react-strict-dom.js
declare type Stringish = string | Fbt;
```

This is the same approach used by React Native, so if you are already re-declaring `Stringish` it will work out-of-the-box with RSD.

## Compatibility

Please see [COMPATIBILITY.md](https://github.com/facebook/react-strict-dom/blob/main/packages/react-strict-dom/COMPATIBILITY.md) for a detailed look at API compatibility for native.  Please read the linked issues for details on the most significant issues, and register your interest (e.g., thumbsup reaction) in supporting these features on native platforms.

## License

React Strict DOM is MIT licensed.
