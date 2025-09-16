/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Required for CSS to work on Expo Web.
import './stylex.css';
// Required for Fast Refresh to work on Expo Web
import '@expo/metro-runtime';

import { LogBox } from 'react-native';
import { registerRootComponent } from 'expo';
import App from '../components/App';

if (LogBox != null) {
  LogBox.ignoreLogs([
    // /React Strict DOM: .*/,
    // /Failed prop type: .*/,
  ]);
}

registerRootComponent(App);
