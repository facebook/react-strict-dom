---
title: <html.select>
---

# \<html.select>

<p className="text-xl">The `<html.select>` component lets you provide a menu of options.</p>

## Overview

To display a select box, render the `<html.select` component.

```jsx
import { html } from 'react-strict-dom';

const Foo = () => (
  <html.select>
    <html.option>Red</html.option>
  </html.select>
);
```

## Props

* [...Common props](/api/html/common/)
* `autoComplete`
* `multiple`
* `required`
* `onBeforeInput`
* `onChange`
* `onInput`
* `onInvalid`
* `onSelect`
