---
title: Common (e.g. <html.div>)
---

# Common components (e.g., \<html.div>)

<p className="text-xl">HTML components support the following common props and events.</p>

## Overview

HTML components are available on the `html` export (which can be aliased). Component props are strictly typed and will provide errors if invalid values are used.

For the full list of supported HTML components, please refer to the [HTML compatibility table](/api/html/#compatibility).

Example:

```jsx
import { html } from 'react-strict-dom';

const Foo = () => {
  return (
    <html.main>
      <html.h1>Title</html.h1>
      <html.div>
        <html.p>
          Paragraph of <html.span>text</html.span> element
        </html.p>
      </html.div>
    </html.main>
  )
}
```

One of the most significant ways in which React Strict DOM elements differ from those in React DOM, is the `style` attribute. The `style` attribute only accepts styles created with the `css` export, and those styles can be (conditionally) merged in order by combining them using an array.

```jsx
import { css, html } from 'react-strict-dom';

const styles = css.create({
  avatar: {...},
  highlighted: {...}
});

<html.img
  style={[
    styles.avatar,
    highlighted && styles.highlighted
  ]}
/>
```

## Props

Please refer to the [related React DOM docs](https://react.dev/reference/react-dom/components/common) and [MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes) for further details about each of the supported attributes listed below. Capture-phase event props are not supported in React Strict DOM. It is expected that developers use the EventTarget API for working with the capture phase.

### Common

* `aria-*` - WAI-ARIA 1.2 non-deprecated properties.
* `autoCapitalize`
* `autoFocus`
* `children`
* `data-*`
* `data-testid` - This is a special-cased data attribute that is used as a test selector.
* `dir`
* `elementTiming`
* `enterKeyHint`
* `hidden`
* `id`
* `inert`
* `inputMode`
* `lang`
* `role` - The synonym `presentation` is not supported, use `none`. Excludes all abstract roles that should not be used by authors.
* `ref`
* `spellCheck`
* `style` - Accepts a style or array of styles created using `css.create()` and `css.createTheme()`. Falsey values are ignored. Order matters, with later declarations overriding earlier ones.
* `tabIndex` - Only supports `0` and `-1` values.

### Events

* `onAuxClick`
* `onBlur`
* `onClick`
* `onContextMenu`
* `onCopy`
* `onCut`
* `onFocus`
* `onFocusIn`
* `onFocusOut`
* `onFullscreenChange`
* `onFullscreenError`
* `onGotPointerCapture`
* `onKeyDown`
* `onKeyUp`
* `onLostPointerCapture`
* `onPaste`
* `onPointerCancel`
* `onPointerDown`
* `onPointerEnter`
* `onPointerLeave`
* `onPointerMove`
* `onPointerOut`
* `onPointerOver`
* `onPointerUp`
* `onScroll`
* `onWheel`
