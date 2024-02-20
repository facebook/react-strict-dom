# react-strict-dom

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react-strict-dom/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/react-strict-dom.svg?style=flat)](https://www.npmjs.com/package/react-strict-dom)

![web](https://img.badgesize.io/https:/www.unpkg.com/react-strict-dom@latest/dist/dom.js?label=web&compression=brotli)
![native](https://img.badgesize.io/https:/www.unpkg.com/react-strict-dom@latest/dist/native.js?label=native&compression=brotli)

**React Strict DOM** (RSD) is an experimental integration of [React DOM](https://react.dev/) and [StyleX](https://stylexjs.com/) that aims to improve and standardize the development of styled React components for web and native. The goal of RSD is to improve the speed and efficiency of React development without compromising on performance, reliability, or quality. Building with RSD is helping teams at Meta ship features faster, to more platforms, with fewer engineers.

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

```
npm install react react-dom
npm install --dev @stylexjs/babel-plugin
```

Configure the `importSources` option for the StyleX Babel plugin or equivalent bundler integration.

```js
styleXBabelPlugin({
  importSources: [
    { from: 'react-strict-dom', as: 'css '}
  ]
})
```

**For native**

```
npm install react react-native
```

## Examples

Styles are compiled by [StyleX](https://github.com/facebook/stylex) and passed to elements using the `style` prop. The `style` prop accepts an array of static and dynamic styles.

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

Cross-platform CSS styling via [StyleX](https://stylexjs.com).

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

## Compatibility

Please see [COMPATIBILITY.md](./COMPATIBILITY.md) for a detailed look at API compatibility for native.  Please read the linked issues for details on the most significant issues, and register your interest (e.g., thumbsup reaction) in supporting these features on native platforms.

## License

React Strict DOM is MIT licensed.
