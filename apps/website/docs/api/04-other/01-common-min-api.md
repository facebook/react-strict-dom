---
title: Common Web API
---

# Minimum Common Web Platform API

<p className="text-xl">A subset of standardized Web Platform APIs with the option to add others using Turbo Modules.</p>

## Overview

The [Minimum Common Web Platform API](https://common-min-api.proposal.wintercg.org/) is a curated subset of standardized Web Platform APIs intended to define a minimum set of capabilities common to browser and non-browser JavaScript-based runtime environments. The goal is to support these APIs in React Native and Hermes.

The `globalThis` APIs are considered to be independent of multi-window concerns for user interfaces. See [`window`](/api/other/window) for more.

## Add APIs using Turbo Modules

Web APIs can also be implemented on native via [Turbo Modules](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/turbo-modules.md) and do not require dedicated intregration with React Strict DOM. See this [`localStorage`](https://github.com/microsoft/rnx-kit/tree/7d031852b5e0ebebcb6aa75d846932295a67b716/incubator/%40react-native-webapis/web-storage) implementation for example.

## Compatibility

| Web APIs | Android | iOS | Issue # |
| ---- | ---- | ---- | ---- |
| AbortController | ❌ | ❌ | |
| AbortSignal | ❌ | ❌ | |
| Blob | ✅ | ✅ | |
| Crypto | ❌ | ❌ | |
| CustomEvent() constructor| ❌ | ❌ | |
| Event() constructor| ❌ | ❌ | |
| EventTarget.addEventListener() | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |
| EventTarget.dispatchEvent() | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |
| EventTarget.removeEventListener() | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |
| fetch | ✅ Partial | ✅ Partial | |
| FileReader | ✅ | ✅ | |
| URL | ❌ | ❌ | |

| globalThis | Android | iOS | Issue # |
| ---- | ---- | ---- | ---- |
| globalThis.atob() | ✅ | ✅ | |
| globalThis.btoa() | ✅ | ✅ | |
| globalThis.clearInterval() | ✅ | ✅ | |
| globalThis.clearTimeout() | ✅ | ✅ | |
| globalThis.console | ✅ | ✅ | |
| globalThis.crypto | ❌ | ❌ | |
| globalThis.fetch() | ✅ | ✅ | |
| globalThis.performance.clearMarks() | ✅ | ✅ | |
| globalThis.performance.clearMeasures() | ✅ | ✅ | |
| globalThis.performance.getEntries() | ✅ | ✅ | |
| globalThis.performance.getEntriesByName() | ✅ | ✅ | |
| globalThis.performance.getEntriesByType() | ✅ | ✅ | |
| globalThis.performance.mark | ✅ | ✅ | |
| globalThis.performance.measure() | ✅ | ✅ | |
| globalThis.performance.now() | ✅ | ✅ | |
| globalThis.performance.timeOrigin | ❌ | ❌ | |
| globalThis.queueMicrotask() | ✅ | ✅ | |
| globalThis.setInterval() | ✅ | ✅ | |
| globalThis.setTimeout() | ✅ | ✅ | |
