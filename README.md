# react-strict-dom dev

[![Action status](https://github.com/facebook/react-strict-dom/actions/workflows/tests.yml/badge.svg)](https://github.com/facebook/react-strict-dom/actions/workflows/tests.yml)

Development monorepo for "React Strict DOM".

**React Strict DOM** (RSD) standardizes the development of styled React components for web and native. The goal of RSD is to improve the speed and efficiency of React development without compromising on performance, reliability, or quality. Building with RSD is helping teams at Meta ship features faster, to more platforms, with fewer engineers.

On web, RSD has no performance overhead relative to Meta's baseline use of [React DOM](https://react.dev/) with [StyleX](https://stylexjs.com/). On native platforms, RSD builds on the design goals of the ["React DOM for Native proposal"](https://github.com/react-native-community/discussions-and-proposals/pull/496) by polyfilling a large number of standard APIs, and by leveraging new web capabilities coming to React Native. Please see [COMPATIBILITY.md](./packages/react-strict-dom/COMPATIBILITY.md) for a detailed breakdown of the API compatibility for native, and links to specific issues. Register your interest (e.g., thumbsup reaction) in supporting missing features on native platforms.

## Structure

* `.github`
  * Contains workflows used by GitHub Actions.
  * Contains issue templates.
* `apps`
  * Example applications.
  * [examples](https://github.com/facebook/react-strict-dom/blob/main/apps/examples)
* `packages`
  * Contains the individual packages managed in the monorepo.
  * [benchmarks](https://github.com/facebook/react-strict-dom/blob/main/packages/benchmarks)
  * [react-strict-dom](https://github.com/facebook/react-strict-dom/blob/main/packages/react-strict-dom) ([docs](https://github.com/facebook/react-strict-dom/blob/main/packages/react-strict-dom/README.md))
  * [scripts](https://github.com/facebook/react-strict-dom/blob/main/packages/scripts)
* `tools`
  * Tools used by the monorepo (pre-commit tasks, etc.)

## Tasks

* `build`
  * Use `npm run build` to run the build script in every workspace.
  * Use `npm run build -w <package-name>` to run the build script for a specific workspace.
* `dev`
  * Use `npm run dev` to run the dev script in every workspace.
  * Use `npm run dev -w <package-name>` to run the dev script for a specific workspace.
* `test`
  * Use `npm test` to run tests for every workspace.

More details and setup instructions can be found in the [CONTRIBUTING][contributing] guide.

## Code of conduct

This project expects all participants to adhere to Meta's OSS [Code of Conduct][code-of-conduct]. Please read the full text so that you can understand what actions will and will not be tolerated.


[contributing]: https://github.com/facebook/react-strict-dom/blob/main/CONTRIBUTING.md
[code-of-conduct]: https://opensource.fb.com/code-of-conduct/

## License

React Strict DOM is [MIT licensed](./LICENSE).
