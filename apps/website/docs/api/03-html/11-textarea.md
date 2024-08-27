---
title: <html.textarea>
---

# \<html.textarea>

<p className="text-xl">The `<html.textarea>` component lets you render a multiline text input.</p>

## Overview

To display a text area, render the `<html.textarea>` component.

```jsx
import { html } from 'react-strict-dom';

const Foo = () => (
  <html.textarea
    onInput={() => {}}
    placeholder="Placeholder text"
    rows={3}
  />
);
```

## Props

* [...Common props](/api/html/common/)
* `autoComplete`
* `defaultValue`
* `disabled`
* `maxLength`
* `minLength`
* `onBeforeInput`
* `onChange`
* `onInput`
* `onInvalid`
* `onSelect`
* `onSelectionChange`
* `placeholder`
* `readOnly`
* `required`
* `rows`
* `value`
