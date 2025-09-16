/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { NextConfig } from "next";

function getReactStrictDOMBabelLoader() {
  const dev = process.env.NODE_ENV !== 'production'

  return {
    loader: 'babel-loader',
    options: {
      parserOpts: {
        plugins: ['typescript', 'jsx'],
      },
      presets: [
        [
          'react-strict-dom/babel-preset',
          {
            debug: dev,
            dev,
            rootDir: process.cwd(),
          },
        ],
      ],
    },
  }
}

function withReactStrictDOM(nextConfig: NextConfig) {
  const turbopackExtensions = [".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"];
  const webOnlyExtensions = ['.web.js', '.web.jsx', '.web.ts', '.web.tsx'];

  return {
    ...nextConfig,
    turbopack: {
      ...nextConfig.turbopack,
      resolveExtensions: [ ...webOnlyExtensions, ...turbopackExtensions],
      rules: {
        ...nextConfig.turbopack?.rules,
        '*.{js,jsx,ts,tsx}': {
            loaders: [getReactStrictDOMBabelLoader()],
        },
      },
    },
    webpack(
      ...[config, context]: Parameters<NonNullable<NextConfig['webpack']>>
    )
      {
      // Configure StyleX / React Strict DOM
      config.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules(?!\/react-strict-dom)/,
        use: [getReactStrictDOMBabelLoader()],
      })

      config.resolve.extensions = [ ...webOnlyExtensions, ...config.resolve?.extensions];

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, context)
      }

      return config
    },

  }
}

const nextConfig: NextConfig = {
  /* config options here */
};


export default withReactStrictDOM(nextConfig)
