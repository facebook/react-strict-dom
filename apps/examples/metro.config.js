/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
