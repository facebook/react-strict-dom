# document

<p className="text-xl">The entry point into an app's content tree loaded within a given window.</p>

:::info

The `document` API must only be accessed using `Node.getRootNode()`, in order to support multi-window environments.

:::

## Overview

Only the read-only APIs should be used in the context of React Strict DOM, as React is responsible for handling cross-platform element creation and updates.

`document` inherits from the `Node` and `EventTarget` interfaces.

## Compatibility

| Name | Android | iOS | Issue # |
| ---- | ---- | ---- | ---- |
| document.activeElement | ❌ | ❌ | |
| document.defaultView | ❌ | ❌ | |
| document.getElementFromPoint(x,y) | ❌ | ❌ | |
| document.hidden | ❌ | ❌ | |
| document.visibilityState | ❌ | ❌ | |
| "scroll" event | ❌ | ❌ | |
| "visibilitychange" event | ❌ | ❌ | |
