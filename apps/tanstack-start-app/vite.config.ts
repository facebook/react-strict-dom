import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import babel from "vite-plugin-babel";

const webOnlyExtensions = [".web.js", ".web.jsx", ".web.ts", ".web.tsx"];

export default defineConfig(() => ({
  ssr: {
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
    tanstackStart(),
    react({
      babel: {
        configFile: true,
      },
    }),
    babel(),
  ],
}));
