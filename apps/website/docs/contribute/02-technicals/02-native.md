---
slug: /contribute/how-native-works
---

# How native works

<p className="text-xl">React Strict DOM relies on React Native and polyfills to target native platforms.</p>

## Native capabilities

React Strict DOM has helped to drive the addition of new capabilities to React Native so that they match W3C specifications, e.g., `boxShadow`, `filter`, `mixBlendMode`, DOM Traversal APIs, Event Loop, etc. Adding new capabilities in native code is the preferred approach to fleshing out web compatibility in React Native.

## Element polyfills

React Strict DOM polyfills many of the HTML elements provided by React DOM, e.g., `<div>`, `<span>`, `<main>`, `<del>`, etc. Each of those HTML elements is mapped to an equivalent element in React Native. Block elements (e.g., `<div>`) are mapped to `<ViewNativeComponent>`. Inline (text) elements (e.g., `<span>`) are mapped to `<Text>`. User input elements (e.g., `input` and `textarea`) are mapped to `<TextInput>`. And so on.

## Prop polyfills

Certain W3C element prop polyfills were previously [built into React Native](https://github.com/facebook/react-native/issues/34424). Others are implemented or re-implemented in React Strict DOM.

## Style polyfills

React Strict DOM polyfills the default block layout of elements like `<div>` by using flexbox approximations. When elements like `<div>` use flexbox layout, the browser defaults for `flex` are replicated on native too. This approach is required because React Native doesn't currently support [CSS flow layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flow_layout) and the default layout and styles of HTML elements differ from those provided by React Native elements.

React Strict DOM polyfills CSS features that rely on the element hierarchy – CSS Custom Properties, CSS Media Queries, CSS Inheritance, CSS Relative Units – by using React Context and other runtime information about the state of the app. Memoization is heavily relied upon to reduce the cost of repeat operations and limit avoidable React re-renders and updates caused by style changes.

React Strict DOM polyfills W3C CSS property names and values by mapping them to non-standard equivalents in React Native where appropriate. And it polyfills CSS transitions by using React Native's `Animated` library components.
