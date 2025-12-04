---
slug: /learn/setup-tanstack-start
---

# TanStack Start

<p className="text-xl">Learn how to configure TanStack Start to use React Strict DOM.</p>

## About TanStack Start

[TanStack Start](https://tanstack.com/start/latest) is a full-stack React framework powered by TanStack Router. It provides a full-document SSR, streaming, server functions, bundling, and more.

Follow the TanStack Start instructions on how to [create a new project](https://tanstack.com/start/latest/docs/framework/react/quick-start). Then follow the steps in the [Installation](/learn/installation) guide to install React Strict DOM.

:::tip

Take a look at the working [example of TanStack Start with React Strict DOM](https://github.com/facebook/react-strict-dom/tree/main/apps/tanstack-start-app) on GitHub.

:::

## Vite configuration

Because TanStack Start is built directly on top of Vite, integrating React Strict DOM requires very little change from the [Vite configuration](/learn/setup-vite) example.
The key changes are:

- Add the official TanStack Start plugin (`tanstackStart()`).
- Add `"react-strict-dom"` to `ssr.noExternal` to ensure it's bundled correctly during SSR.

Below is an example `vite.config.ts` that shows all of these together:

```js title="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import babel from "vite-plugin-babel";

const webOnlyExtensions = [".web.js", ".web.jsx", ".web.ts", ".web.tsx"];

export default defineConfig(() => ({
  ssr: {
    // Necessary so 'react-strict-dom' is not treated as external in SSR mode
    noExternal: ["react-strict-dom"],
  },
  resolve: {
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
  plugins: [
    tsConfigPaths(),
    tanstackStart(), // Only extra plugin needed for TanStack Start
    react({
      babel: {
        configFile: true,
      },
    }),
    babel(),
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

### Importing the CSS in TanStack Start

With TanStack Start, CSS files are usually included via the route's `head` configuration, not via a global import at the top-level entry point as in a classic Vite+React app. For example, you should add the CSS as a link tag in your root route configuration:

```js title="src/main.tsx"
// Required for CSS to work with React Strict DOM in TanStack Start
import strictCss from "../strict.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TanStack Start App" },
    ],
    links: [
      { rel: "stylesheet", href: strictCss }
    ],
  }),
  component: RootComponent,
});
```
