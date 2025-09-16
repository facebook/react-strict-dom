---
title: <html.optgroup>
---

# \<html.optgroup>

<p className="text-xl">The `<html.optgroup>` component lets you create a grouping of options.</p>

## Overview

To display an option group, render the `<html.optgroup>` component within `<html.select>`.

```jsx
import { html } from 'react-strict-dom';

const Foo = () => (
  <html.select>
    <html.optgroup label="Colors">
      <html.option>Red</html.option>
    </html.optgroup>
  </html.select>
);
```

## Props

* [...Common props](/api/html/common/)
* `disabled`
* `label`
