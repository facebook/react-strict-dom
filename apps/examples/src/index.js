/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Taken from "npm:expo/AppEntry.js" to fix broken "package.main"
// in Expo template when used in npm workspaces
import registerRootComponent from 'expo/build/launch/registerRootComponent';

import App from './App';

registerRootComponent(App);
