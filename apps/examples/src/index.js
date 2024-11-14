/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@expo/metro-runtime'; // Required for Fast Refresh to work on Expo Web
import { LogBox } from 'react-native';

import { registerRootComponent } from 'expo';

import App from './App';

import './global.css';

if (LogBox != null) {
  LogBox.ignoreLogs([
    // /React Strict DOM: .*/,
    // /Failed prop type: .*/,
  ]);
}

registerRootComponent(App);
