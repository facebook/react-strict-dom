---
slug: /learn/setup
---

# Environment setup

<p className="text-xl">Learn how to configure the environment needed to use React Strict DOM.</p>

## Expo framework

[Expo](https://expo.dev/) is a production-grade, cross-platform React framework that is the recommended solution for creating apps with React Strict DOM. The instructions in the rest of this guide are tailored to Expo, but can be adapted by readers to work with other frameworks.

Follow the Expo instructions on how to [create a new project](https://docs.expo.dev/get-started/create-a-project/). React Strict DOM requires use of the New React Native Architecture. Then follow the steps in the [Installation](/learn/installation) guide to install React Strict DOM.

A working example of an Expo setup with React Strict DOM can be found in this [examples app](https://github.com/facebook/react-strict-dom/tree/main/apps/examples).

## Babel configuration

Create or modify the `babel.config.js` file as follows. This is used to optimize builds and enables static extraction of CSS for web. Learn how to configure the [babel-preset](/api/babel-preset/) in the API docs.

```js title="babel.config.js"
const reactStrictPreset = require('react-strict-dom/babel-preset');

function getPlatform(caller) {
  // This information is populated by Expo
  return caller && caller.platform;
}

function getIsDev(caller) {
  // This information is populated by Expo
  if (caller?.isDev != null) return caller.isDev;
  // https://babeljs.io/docs/options#envname
  return (
    process.env.BABEL_ENV === 'development' ||
    process.env.NODE_ENV === 'development'
  );
}

module.exports = function (api) {
  const platform = api.caller(getPlatform);
  const dev = api.caller(getIsDev);

  return {
    plugins: [],
    presets: [
      // Expo's babel preset
      'babel-preset-expo',
      // React Strict DOM's babel preset
      [reactStrictPreset, {
        debug: dev,
        dev,
        platform
      }]
    ]
  };
};
```

## PostCSS configuration

[PostCSS](https://postcss.org/) is a tool for generating CSS. It's enabled by default in Expo and it's the recommended way to extract React Strict DOM styles to static CSS for web builds. Once the [postcss-react-strict-dom](https://github.com/javascripter/postcss-react-strict-dom) plugin is installed, it can be used to extract styles. Create a `postcss.config.js` file as follows.

```js title="postcss.config.js"
module.exports = {
  plugins: {
    'postcss-react-strict-dom': {
      include: [
        // Include source files to watch for style changes
        'src/**/*.{js,jsx,mjs,ts,tsx}',
        // List any installed node_modules that include UI built with React Strict DOM
        'node_modules/<package-name>/*.js'
      ]
    },
    autoprefixer: {}
  }
};
```

## Metro configuration

[Metro](https://reactnative.dev/docs/metro) is the bundler used by Expo and React Native. It can bundle apps for native and web targets. Create or modify the `metro.config.js` file as follows to enable support for [package exports in React Native](https://reactnative.dev/blog/2023/06/21/package-exports-support). This step is not necessary for other packagers.

```js title="metro.config.js"
// Learn more https://docs.expo.dev/guides/monorepos
const { getDefaultConfig } = require('expo/metro-config');

// Find the project and workspace directories
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);
// 1. Enable Metro support for symlinks and package exports
config.resolver.unstable_enablePackageExports = true;
// 2. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
```

## App files

Your app needs to include a CSS file that contains a `@stylex` directive. This acts as a placeholder that is replaced by the generated CSS during builds.

```css title="stylex.css"
/* This directive is used by the react-strict-dom postcss plugin. */
/* It is automatically replaced with generated CSS during builds. */
@stylex;
```

Next, import the CSS file in the entry file of your app.


```js title="index.js"
// Required for CSS to work on Expo Web.
import './stylex.css';
// Required for Fast Refresh to work on Expo Web
import '@expo/metro-runtime';

import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
```

## Platform-specific files

Expo supports [platform-specific extensions](https://docs.expo.dev/router/advanced/platform-specific-modules/#platform-specific-extensions) by default. This allows you to create platform-specific implementations of components, hooks, etc.

Other frameworks will require bundler configuration when building for each platform, so as to resolve files based on their file extensions. For example, web bundles should package `*.web.js` file extensions but not `*.native.js` files. These specific file name suffixes are recommended conventions already used by the React Native ecosystem (see the Expo docs above.)
