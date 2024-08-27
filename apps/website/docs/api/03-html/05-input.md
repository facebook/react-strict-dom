---
title: <html.input>
---

# \<html.input>

<p className="text-xl">The `<html.input>` component lets you render a text input.</p>

## Overview

To display an input element, render the `<html.input>` component.

```jsx
import { html } from 'react-strict-dom';

const Foo = () => (
  <html.input
    onInput={() => {}}
    placeholder="Placeholder text"
  />
);
```

## Props

* [...Common props](/api/html/common/)
* `autoComplete`
* `checked`
* `defaultChecked`
* `defaultValue`
* `disabled`
* `max`
* `maxLength`
* `min`
* `minLength`
* `multiple`
* `onBeforeInput`
* `onChange`
* `onInput`
* `onInvalid`
* `onSelect`
* `onSelectionChange`
* `placeholder`
* `readOnly`
* `required`
* `step`
* `type`
* `value`
