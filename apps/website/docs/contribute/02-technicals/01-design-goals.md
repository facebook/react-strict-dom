---
slug: /contribute/design-goals
---

# Design goals

<p className="text-xl">Cross-platform user interface APIs from a subset of existing web standards for CSS, DOM, and HTML.</p>

## Motivation

React Strict DOM (RSD) began as a way to prototype and drive the development of "[React DOM for Native](https://github.com/react-native-community/discussions-and-proposals/pull/496)". It enables engineers to quickly and easily reuse existing React web code and knowledge on native platforms. Our goal is to quickily and easily reuse React web code to also produce high-quality native interfaces, to reduce product time-to-market, and to improve engineering efficiency and product quality.

React Strict DOM aims to leverage the many framework investments we've made to React over the years (e.g., [React Native Fabric](https://reactnative.dev/architecture/fabric-renderer), [React Compiler](https://react.dev/learn/react-compiler), [React Developer Tools](https://react.dev/learn/react-developer-tools), [Yoga](https://www.yogalayout.dev/), etc.) that now make it possible to dramatically improve cross-platform product development.

## User experience

React Strict DOM is designed to preserve the accessible, rich user experience of web apps and provide it to native when desired. On the web, React Strict DOM provides an integrated, strict styling solution that optimizes generated styles and prevents styling collisions typical of other approaches. And by bringing more declarative prop and style APIs from the web to native, it helps to deliver a rich, multi-modality experience that is otherwise difficult to achieve directly with React Native.

### Platform-native

React Strict DOM renders native UI elements on each platform. Using a web-compatible API doesn't mean sacrificing platform-native expectations on Android or iOS. W3C APIs are translated into native equivalents and try to preserve the expected characteristics of the host platform. Adopting W3C APIs allows React Native apps to incorporate declarative styles, synchronous APIs, and well-defined scheduling that can improve native app performance.

### Performant

React Strict DOM on web has no bundle size or runtime performance overhead relative to Meta's existing React web code (authored using [React DOM](https://react.dev/reference/react-dom) and [StyleX](https://stylexjs.com/)). This is a fundamental constraint that helped to consolidate the cross-platform API on web standards. On native platforms, the runtime polyfills for React Native are optimized to avoid them being a bottleneck, and will continue to get faster as capabilities are moved into native code.

### Accessible

Applications built with React Strict DOM can leverage the accessibility and modality APIs inherit to the web. This means that users can expect to be able to interact with an app on any platform using a mouse, keyboard, pointer, and screenreader.

## Developer experience

React Strict DOM is designed to enable developers to target multiple platforms with a single, cross-platform API based on the web and React DOM. Features are unified by aligning with web standards. This simplifies code-sharing, static types, developer education, and debugging.

### Well-defined API

React Strict DOM provides a well-defined target API for implementations. By aligning with existing web specs, we can sidestep the slow and difficult work of designing bespoke, high-quality cross-platform APIs in React Native. Instead, contributors can move directly to the implementation phase, allowing us to more rapidly unify React UI development across platforms.

### Unified elements and styles

Standardizing on HTML element and CSS styles makes it possible for web engineers to re-use their existing knowledge of React DOM and StyleX to target platforms beyond web. React Strict DOM solves problems with some React Native APIs being based on W3C APIs but not conforming to the standards, and others (which are declarative on web) have inherit performance drawbacks on web.

### Unified types

React Strict DOM allows developers to use existing DOM types (e.g., `HTMLElement`) when working with host elements, and provides unified types for React components and styles. This means existing web code typed with Flow and TypeScript requires few changes to work on native.

## Approach

React Strict DOM is able to provide a unified, cross-platform API for React developers by 1) polyfilling a large number of standard APIs, 2) leveraging new capabilities coming to React Native such as DOM traversal APIs and a well-defined Event Loop processing model. Where possible, capabilities are built in native code. React Strict DOM encapsulates a large number of polyfills and shims that convert React DOM APIs to React Native equivalents. We prioritize user-space shims in JavaScript where they are faster to ship and allow us to gather feedback and drive adoption.

Other approaches that we expored were either based on React Native's API (e.g., [React Native for Web](https://necolas.github.io/react-native-web/)) or a another custom API. But they introduced performance regressions on web, implementation and migration complexity for all platforms, and ongoing design costs associated with developing non-standard APIs.

## Tradeoffs

Aiming for native compatibility with the web shifts the burden of developing new capabilities onto React Native. Although the overhead of the runtime polyfills on native is acceptable, it is not insignificant. And some cross-platform limitations are rooted in significant differences in the host platforms APIs. Developers may not be used to an API that is complete on web but partially implemented on native platforms.

## Results

Meta has been able to automatically codemod large amounts of existing React DOM + StyleX web code onto React Strict DOM, without major modifications or loss of functionality on web. By using React Strict DOM the web component library now forms the basis for a consistent, high-quality Facebook and Instagram experience on VR.
