---
slug: /contribute/tests
---

# Tests

<p className="text-xl">React Strict DOM relies on lots of tests and lots of test coverage across platforms.</p>

## Public API tests

The public API is the default test surface. This allows the project to quickly incorporate large, under-the-hood changes while minimizing regressions.

By default, Jest unit tests are run for **both web and native**. Platform-specific tests are defined as follows:

* Files with `*.dom.js` are run only on web (jsdom).
* Files with `*.native.js` extension are run only using a React Native mock (Node.js).
* Files with `*.node.js` extension are run only using Node.js.

React Strict DOM relies heavily on snapshot tests to monitor the trees that are rendered on web and native.

## Internal API tests

Certain internal APIs may require additional test coverage. Use a `__tests__` directory co-located with the internal module.

## Visual regression tests

The Expo app is the test bed for the React Strict DOM end-to-end developer and user experience. It is used to manually inspect potential visual and behavioral regressions.

Expo currently lacks built-in integrations for React Strict DOM, but the goal of the app is to drive improvements in Expo and Metro so that new cross-platform apps can more easily be built and deployed in the future.

## Performance benchmarks

Bundle sizes on web and native are also monitored for regressions. The polyfills for native platforms are also subject to performance monitoring. Currently only the style polyfills are benchmarked for regressions in Node.js, running it jitless mode to better emulate the Hermes runtime used by React Native. These benchmarks are automatically run and reported for each Pull Request submitted on GitHub.
