---
slug: /learn/components
---

# Creating components

<p className="text-xl">Learn how to create and customize cross-platform React components.</p>

## Importing and exporting components

React Strict DOM lets you create reusable, cross-platform UI components by writing markup *and* styles in JavaScript.

React Strict DOM components are a strict subset of the HTML components found in React DOM. The first step to using a cross-platform component is importing the `html` export from the package.

```js
import { html } from 'react-strict-dom';
```

Custom components can then use the `html` object to render a variety of HTML elements. For example, this is a `Profile` component that renders a cross-platform image element:

```jsx title="Profile.js"
import { html } from 'react-strict-dom';

export function Profile() {
  return (
    <html.img
      alt={user.name}
      src={user.avatarSrc}
    />
  );
}
```

React Strict DOM automatically translates `<html.img />` into `<img />` on web and `<Image />` on native!

## Responding to events

React Strict DOM elements have event props that allow a component to respond to the bubble phase of events. The cross-platform event handlers will be triggered in response to user interactions like clicking, hovering, or focusing on form inputs.

```jsx title="Button.js"
import { html } from 'react-strict-dom';

export function Button() {
  return (
    <html.button
      onClick={(e) => {}}
    />
  );
}
```

Responding to the capture phase of events should be done using the EventTarget API on element instances.

## Manipulating the DOM

Sometimes you might need access to the element instances managed by React. For example, to focus a node, scroll to it, or measure its size and position. To access a node managed by React, using a ref callback:

```js
<html.div ref={(node) => {
  const rect = node.getBoundingClientRect;
  return () => {
    // cleanup
  }
}}>
```

React Strict DOM does not support modifying elements manually, as this risks conflicting with the changes React is making and is not compatible with React Native's immutable model. However, many readonly DOM attributes are already supported on native. Find out more about the [HTML API](/api/html).

## Platform-specific components

Some components may require platform-specific differences. In these scenarios, using [platform-specific files](/learn/setup/#platform-specific-files) is recommended.

## Flow types for `data-*` props

Flow does not currently support typing arbitrary `data-*` props ([#71](https://github.com/facebook/react-strict-dom/issues/71)). The workaround is to use a Flow libdef to define the `data-*` props used by your apps (or dependencies) via the `ReactStrictDOMDataProps` type. For example:

```js
// flow-typed/react-strict-dom.js
declare type ReactStrictDOMDataProps = {
  'data-imgperflogname'?: string,
  'data-impression-id'?: number,
};
```

This is a temporary solution until Flow provides a built-in approach to handling `data-*` prop types. **DO NOT** use this workaround to define any non-`data-*` props.

## Flow types for translation strings

Certain prop values are typically user-facing strings, and these are defined within RSD as being of type `Stringish` - just a `string`. But when Flow doesn't know that a translation function produces strings at runtime, you can override the type of `Stringish` to account for this. For example, if using Meta's internationalization framework [Fbt](https://github.com/facebook/fbt):

```js
// flow-typed/stringish.js
declare type Stringish = string | Fbt;
```

This is the same approach used by React Native, so if you are already re-declaring `Stringish` it will work out-of-the-box with RSD.

## Suppressing logs on React Native

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
