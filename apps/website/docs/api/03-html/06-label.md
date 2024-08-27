---
title: <html.label>
---

# \<html.label>

<p className="text-xl">The `<html.label>` component lets you render a form field label.</p>

## Overview

To display a label for a form field, render the `<html.label>` component and link it to the field via the `for` prop.

```jsx
import { html } from 'react-strict-dom';
import { useId } from 'react';

const Foo = () => {
  const id = useId();
  return (
    <>
      <html.label for={id} />
      <html.input id={id} />
    </>
  );
);
```

## Props

* [...Common props](/api/html/common/)
* `for` - Equivalent to `htmlFor` in React DOM.
