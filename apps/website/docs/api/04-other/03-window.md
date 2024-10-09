# window

<p className="text-xl">Represents a window containing a document.</p>

:::info

The `window` API must only be accessed using `Node.getRootNode().defaultView`, in order to support multi-window environments.

:::

## Overview

In the context of React Strict DOM the functions, namespaces, objects, and constructors not directly associated with user interfaces are exposed globally. See [`globalThis`](/api/other/common-min-api) for more.

`windows` inherits from the `EventTarget` interface.

## Compatibility

| window | Android | iOS | Issue # |
| ---- | ---- | ---- | ---- |
| window.cancelAnimationFrame() | ✅ | ✅ | |
| window.cancelIdleCallback() | ✅ | ✅ | |
| window.devicePixelRatio | ❌ | ❌ | |
| window.getSelection() | ❌ | ❌ | |
| window.matchMedia() | ❌ | ❌ | |
| window.navigator.clipboard | ❌ | ❌ | |
| window.navigator.languages | ❌ | ❌ | |
| window.navigator.permissions | ❌ | ❌ | |
| window.navigator.vibrate() | ❌ | ❌ | |
| window.requestAnimationFrame() | ✅ | ✅ | |
| window.requestIdleCallback() | ✅ | ✅ | |
