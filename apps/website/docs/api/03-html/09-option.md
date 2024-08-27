---
title: <html.option>
---

# \<html.option>

<p className="text-xl">The `<html.option>` component lets you define an item within `<html.select>`.</p>

## Overview

To display an item within `<html.select>`, render the `<html.option>` component.

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
* `disabled`
* `label`
* `selected`
* `value`
