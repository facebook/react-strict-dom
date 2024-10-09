# react-strict-dom dev

[![Action status](https://github.com/facebook/react-strict-dom/actions/workflows/tests.yml/badge.svg)](https://github.com/facebook/react-strict-dom/actions/workflows/tests.yml)

Development monorepo for "React Strict DOM".

**React Strict DOM** (RSD) standardizes the development of styled React components for web and native. The goal of RSD is to improve the speed and efficiency of React development without compromising on performance, reliability, or quality. Building with RSD is helping teams at Meta ship features faster, to more platforms, with fewer engineers.

## Structure

* `.github`
  * Contains workflows used by GitHub Actions.
  * Contains issue templates.
* `apps`
  * Applications.
  * [examples](https://github.com/facebook/react-strict-dom/blob/main/apps/examples)
  * [website](https://github.com/facebook/react-strict-dom/blob/main/apps/website)
* `packages`
  * Contains the individual packages managed in the monorepo.
  * [benchmarks](https://github.com/facebook/react-strict-dom/blob/main/packages/benchmarks)
  * [react-strict-dom](https://github.com/facebook/react-strict-dom/blob/main/packages/react-strict-dom) ([docs](https://facebook.github.io/react-strict-dom/))
  * [scripts](https://github.com/facebook/react-strict-dom/blob/main/packages/scripts)
* `tools`
  * Tools used by the monorepo (pre-commit tasks, etc.)

## Contributing

Learn more about [how to contribute](https://facebook.github.io/react-strict-dom/contribute/).

## Code of conduct

This project expects all participants to adhere to Meta's OSS [Code of Conduct](https://opensource.fb.com/code-of-conduct/). Please read the full text so that you can understand what actions will and will not be tolerated.

## License

React Strict DOM is [MIT licensed](./LICENSE).
