# Contributing

## Reporting issues

Before opening an issue, please search the issue tracker to make sure your issue hasn't already been reported. Please note that your issue may be closed if it doesn't include the information requested in the issue template.

Meta has a [bounty program](https://www.facebook.com/whitehat/) for the safe disclosure of security bugs. In those cases, please go through the process outlined on that page and do not file a public issue.

## Getting started

Visit the issue tracker to find a list of open issues that need attention.

**Make sure you have npm@>=9 and node@>=18 installed.**

First, clone your fork of the `react-strict-dom` repo:

```
git clone https://github.com/your-username/react-strict-dom.git
```

Then install the package dependencies

```
npm install
```

## Automated tests

To run the linter:

```
npm run lint
```

To run flow (use `npm run build` first if you see errors in the examples app):

```
npm run flow
```

To run the unit tests:

```
npm run jest
```

…in watch mode:

```
npm run jest -- --watch
```

To update the snapshots:

```
npm run jest -- -u
```

(NOTE: if you ever end up in a state where unit test snapshots differ between local and CI, run `npm run jest -- --clearCache`.)

To run all these automated tests:

```
npm run test
```

To run the benchmarks for React Native:

```
npm run benchmarks -w react-strict-dom
```


## Development

Build and automatically rebuild the library on changes:

```
npm run dev -w react-strict-dom
```

In another process, start the examples app:

```
npm run dev -w examples
```

### Simulator testing

Launch the iOS simulator using XCode and then follow the Expo instructions to load the app in the simulator.

### On device testing

Install "Expo Go" on your device per [these instructions](https://reactnative.dev/docs/environment-setup?guide=quickstart#target-os-1).

Scan the QR code with Expo Go to load the example app on your phone.

## New Features

Please open an issue with a proposal for a new feature or refactoring before starting on the work. We don't want you to waste your efforts on a pull request that we won't want to accept.

## Pull requests

**Before submitting a pull request**, please make sure the following is done:

1. Fork the repository and create your branch from `main`.
2. If you've added code that should be tested, add tests!
3. If you've changed APIs, update the documentation.
4. Ensure the tests pass (`npm run test`).

You can now submit a pull request, referencing any issues it addresses.

Please try to keep your pull request focused in scope and avoid including unrelated commits.

After you have submitted your pull request, we'll try to get back to you as soon as possible. We may suggest some changes or improvements.

Thank you for contributing!

## Contributor License Agreement ("CLA")

In order to accept your pull request, we need you to [complete and submit a CLA](https://code.facebook.com/cla). You only need to do this once to work on any of Meta's open source projects.

## License

By contributing to react-strict-dom, you agree that your contributions will be licensed under the LICENSE file in the root directory of this source tree.
