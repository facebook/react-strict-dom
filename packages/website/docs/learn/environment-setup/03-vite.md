---
slug: /learn/setup-vite
---

# Vite

<p className="text-xl">Learn how to configure Vite to use React Strict DOM.</p>

## About Vite

[Vite](https://vite.dev) is a build tool that aims to provide a faster and leaner development experience for modern web projects.

Follow the Vite instructions on how to [create a new project](https://vite.dev/guide/#scaffolding-your-first-vite-project). Then follow the steps in the [Installation](/learn/installation) guide to install React Strict DOM.

:::tip

Take a look at the working [example of Vite with React Strict DOM](https://github.com/facebook/react-strict-dom/tree/main/apps/vite-app) on GitHub.

:::

## Babel configuration

```js title="babel.config.js"
const dev = process.env.NODE_ENV !== "production";

export default {
  parserOpts: {
    plugins: ["typescript", "jsx"],
  },
  presets: [
    [
      'react-strict-dom/babel-preset',
      {
        debug: dev,
        dev,
        rootDir: process.cwd(),
        platform: "web"
      },
    ],
  ]
};
```

## PostCSS configuration

[PostCSS](https://postcss.org/) is a tool for generating CSS. It's enabled by default in Vite and it's the recommended way to extract React Strict DOM styles to static CSS for web builds. `react-strict-dom/postcss-plugin` can be used to extract styles. Create a `postcss.config.mjs` file as follows.

```js title="postcss.config.mjs"
// Be sure to share the babel configuration between Next.js and PostCS
import babelLoader from "./babel.config.js";

export default {
  plugins: {
    "react-strict-dom/postcss-plugin": {
      include: [
        // Include source files to watch for style changes
        'src/**/*.{js,jsx,mjs,ts,tsx}',
        // List any installed node_modules that include UI built with React Strict DOM
        'node_modules/<package-name>/*.js'
      ],
      babelConfig: babelLoader,
      useLayers: true,
    },
  },
};
```

## Vite configuration

Create or edit the `vite.config.ts` file as follows.

```js title="vite.config.ts"
import { defineConfig } from "vite";
import viteBabel from "vite-plugin-babel";
import viteReact from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => ({
  plugins: [
    tsConfigPaths(),
    viteReact({
      babel: {
        configFile: true,
      },
    }),
    viteBabel(),
  ],
}));
```

## App files

Your app needs to include a CSS file that contains a `@react-strict-dom` directive. This acts as a placeholder that is replaced by the generated CSS during builds.

```css title="strict.css"
/* This directive is used by the react-strict-dom postcss plugin. */
/* It is automatically replaced with generated CSS during builds. */
@react-strict-dom;
```

Next, import the CSS file in the `main.tsx` file.

```js title="src/main.tsx"
// Required for CSS to work on Vite
import "./strict.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

## Platform-specific files

React Strict DOM relies on platform-specific extensions to create platform-specific implementations of components, hooks, etc. For example, web bundles should package `*.web.jsx` file extensions but not `*.native.jsx` files. Vite can handle the presence of platform-specific extensions with a change in `vite.config.ts` with the following additions:

```js title="vite.config.ts"
const webOnlyExtensions = [".web.js", ".web.jsx", ".web.ts", ".web.tsx"];

export default defineConfig(() => ({
  // ...
  resolve: {
    // ...
    extensions: [
      ...webOnlyExtensions,
      ".mjs",
      ".js",
      ".mts",
      ".ts",
      ".jsx",
      ".tsx",
      ".json",
    ],
  },
}));

```
