---
sidebar_position: -1
---

# Introduction

<p className="text-xl">
React Strict DOM makes it possible to use web APIs to build interfaces for web and native.
</p>

:::warning[Work in progress]

React Strict DOM is under development. Not all capabilities are available on native yet. Please see the [API Reference](/api) for a detailed breakdown of API compatibility on native.

:::

## What is React Strict DOM?

**React Strict DOM** (RSD) is a JavaScript library that Meta uses to render React web interfaces on React Native.

React Strict DOM defines a subset of React DOM and Web APIs that can be used to render components on both web and native platforms, with the look and feel of the host platform. Developers can reuse their existing knowledge of React web development to build native apps. And they can reuse large amounts of existing React DOM code to reach native platforms with reduced development costs and time to market.

### Cross-platform React, but web-first

Everything you already know about using [React](https://react.dev/) is still true for React Strict DOM. Most of what you already know about using React DOM and the web also applies to using React Strict DOM. By limiting the HTML, CSS, and DOM APIs to a specific subset of those available on web, you can create apps that not only run on native but also make it easier to stay aligned with the programming model of React.

### Strict HTML elements

React Strict DOM is stricter than React DOM. Each component is exposed on the `html` export, and the stricter elements do not support deprecated or legacy web attributes. Find out more about the [HTML API](/api/html).

```jsx
import { html } from 'react-strict-dom';

function MyButton() {
  const onClick = (e) => {};

  return (
    <html.button onClick={onClick}>
      A cross-platform button
    </html.button>
  );
}
```


### Strict CSS styles

React Strict DOM includes a built-in, required way of authoring styles in JavaScript. Those styles can then be passed to the `style` prop of an `html.*` element. On web, these styles are extracted to optimized atomic CSS. Find out more about the [CSS API](/api/css).

```jsx
import { css, html } from 'react-strict-dom';

const styles = css.create({
  button: {
    backgroundColor: {
      default: 'white',
      ':hover': 'lightgray'
    },
    padding: 10
  }
});

function MyButton() {
  return (
    <html.button style={styles.button}>
      A cross-platform button
    </html.button>
  );
}
```

### Use imperative DOM and Web APIs

React Strict DOM supports the use of various DOM and Web APIs on native, thanks to new capabilities provided by React Native. Find out more about [Web APIs](/api/other/common-min-api/).

```jsx
function MyButton() {
  const elementCallback = (node) => {
    const parent = node.parentElement;
    // ...
  };

  return (
    <html.button ref={elementCallback}>
      A cross-platform button
    </html.button>
  );
}
```

## Why use React Strict DOM?

### Better web apps

React Strict DOM provides a optimized solution for describing components on web with encapsulated styles, in under 2 Kb of runtime code. It is syntactic sugar for the way that Meta successfully develops interfaces for web apps like Facebook, Instagram, Threads, and Meta.ai. And it has the advantage of providing developers with type-safe components that prevent the use of legacy web attributes.

### Better native apps

React Strict DOM allows developers to target Android and iOS using exactly the same API across platforms. It also adds declarative features not yet provided by React Native out-of-the-box, such as CSS pseudo-states and relative units.

### Engineering efficiency

Interface components built with React Strict DOM are more portable. They have the option of being run on web or native platforms, whatever the original target platform for the app.

### Less developer re-training

Developers familiar with the web can apply that knowledge directly to native app development, without having to learn how to translate web patterns into React Native patterns.
