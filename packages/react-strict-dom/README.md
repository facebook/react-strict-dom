# react-strict-dom

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react-strict-dom/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/react-strict-dom.svg?style=flat)](https://www.npmjs.com/package/react-strict-dom)

![web (prod)](https://img.badgesize.io/https:/www.unpkg.com/react-strict-dom@latest/dist/dom/runtime.js?label=web%20(prod)&compression=brotli)
![web (dev)](https://img.badgesize.io/https:/www.unpkg.com/react-strict-dom@latest/dist/dom/index.js?label=web%20(dev)&compression=brotli)
![native](https://img.badgesize.io/https:/www.unpkg.com/react-strict-dom@latest/dist/native/index.js?label=native&compression=brotli)


**React Strict DOM** (RSD) standardizes the development of styled React components for web and native. The goal of RSD is to improve the speed and efficiency of React development without compromising on performance, reliability, or quality. Building with RSD is helping teams at Meta ship features faster, to more platforms, with fewer engineers.

## Documentation

Please refer to the [React Strict DOM website](https://facebook.github.io/react-strict-dom/) for detailed documentation. The API section includes detailed compatibility tables for native. Please read the linked issues for details on the most significant issues, and register your interest (e.g., thumbsup reaction) in supporting these features on native platforms.

## Quick start

**Install**

```
npm install react react-strict-dom
```

For web:

```
npm install react-dom
```

For native:

```
npm install react-native
```

## Example

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
// flow-typed/stringish.js
declare type Stringish = string | Fbt;
```

This is the same approach used by React Native, so if you are already re-declaring `Stringish` it will work out-of-the-box with RSD.

## License

React Strict DOM is MIT licensed.
