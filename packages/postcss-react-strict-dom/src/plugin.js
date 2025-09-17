/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const postcss = require('postcss');
const createBuilder = require('./builder');

module.exports = function createPlugin() {
  const PLUGIN_NAME = 'postcss-react-strict-dom';

  const builder = createBuilder();

  const isDev = process.env.NODE_ENV === 'development';

  const plugin = ({
    cwd = process.cwd(),
    // By default reuses the Babel configuration from the project root.
    // Use `babelrc: false` to disable this behavior.
    babelConfig = {},
    include,
    exclude,
    useCSSLayers = true
  }) => {
    include = [
      // Include the React Strict DOM package's source files by default
      require.resolve('react-strict-dom'),
      require.resolve('react-strict-dom/runtime'),
      ...(include ?? [])
    ];

    exclude = [
      // Exclude type declaration files by default because it never contains any styles.
      '**/*.d.ts',
      '**/*.flow',
      ...(exclude ?? [])
    ];

    // Whether to skip the error when transforming styles.
    // Useful in watch mode where Fast Refresh can recover from errors.
    // Initial transform will still throw errors in watch mode to surface issues early.
    let shouldSkipTransformError = false;

    return {
      postcssPlugin: PLUGIN_NAME,
      plugins: [
        // Processes the PostCSS root node to find and transform @-rules.
        async function (root, result) {
          const fileName = result.opts.from;

          // Configure the builder with the provided options
          await builder.configure({
            include,
            exclude,
            cwd,
            babelConfig,
            useCSSLayers,
            isDev
          });

          // Find the @-rule
          const atRule = builder.findAtRule(root);
          if (atRule == null) {
            return;
          }

          // Get dependencies to be watched for changes
          const dependencies = builder.getDependencies();

          // Add each dependency to the PostCSS result messages.
          // This watches the entire "./src" directory for "./src/**/*.{ts,tsx}"
          // to handle new files and deletions reliably in watch mode.
          for (const dependency of dependencies) {
            result.messages.push({
              plugin: PLUGIN_NAME,
              parent: fileName,
              ...dependency
            });
          }

          // Build and parse the CSS from collected styles
          const css = await builder.build({
            shouldSkipTransformError
          });
          const parsed = await postcss.parse(css, {
            from: fileName
          });

          // Replace the @-rule with the generated CSS
          atRule.replaceWith(parsed);

          result.root = root;

          if (!shouldSkipTransformError) {
            // Build was successful, subsequent builds are for watch mode
            shouldSkipTransformError = true;
          }
        }
      ]
    };
  };

  plugin.postcss = true;

  return plugin;
};
