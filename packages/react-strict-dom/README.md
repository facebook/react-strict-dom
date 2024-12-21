# react-strict-dom

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react-strict-dom/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/react-strict-dom.svg?style=flat)](https://www.npmjs.com/package/react-strict-dom)

![web (prod)](https://img.badgesize.io/https:/www.unpkg.com/react-strict-dom@latest/dist/dom/runtime.js?label=web%20(prod)&compression=brotli)
![web (dev)](https://img.badgesize.io/https:/www.unpkg.com/react-strict-dom@latest/dist/dom/index.js?label=web%20(dev)&compression=brotli)
![native](https://img.badgesize.io/https:/www.unpkg.com/react-strict-dom@latest/dist/native/index.js?label=native&compression=brotli)


**React Strict DOM** (RSD) standardizes the development of styled React components for web and native. The goal of RSD is to improve the speed and efficiency of React development without compromising on performance, reliability, or quality. Building with RSD is helping teams at Meta ship features faster, to more platforms, with fewer engineers.

## Documentation

Please refer to the [React Strict DOM website](https://facebook.github.io/react-strict-dom/) for detailed documentation. The API section includes detailed compatibility tables for native. Please read the linked issues for details on the most significant issues, and register your interest (e.g., thumbsup reaction) in supporting these features on native platforms.

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

## License

React Strict DOM is MIT licensed.
