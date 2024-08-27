---
title: <html.img>
---

# \<html.img>

<p className="text-xl">The `<html.img>` component lets you render an image.</p>

## Overview

To display an image element, render the `<html.img>` component.

```jsx
import { html } from 'react-strict-dom';

const Foo = () => (
  <html.img
    loading="lazy"
    onLoad={() => {}}
    srcSet="https://srcSet-2x.jpg 2x"
  />
);
```

## Props

* [...Common props](/api/html/common/)
* `alt`
* `crossOrigin`
* `decoding`
* `draggable`
* `fetchPriority`
* `height`
* `loading`
* `onError`
* `onLoad`
* `referrerPolicy`
* `src`
* `srcSet`
* `width`
