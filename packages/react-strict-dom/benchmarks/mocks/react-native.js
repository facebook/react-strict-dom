/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * React Native mock for Node.js benchmarks
 */

const Animated = {
  createAnimatedComponent(c) {
    return c;
  },
  Image: 'Animated.Image',
  View: 'Animated.View',
  Text: 'Animated.Text',
  Value: () => {
    return {
      interpolate: (value) => value
    };
  },
  timing: () => {
    return {
      start: () => {}
    };
  },
  delay: () => {},
  sequence: () => {
    return {
      start: () => {}
    };
  }
};

const Easing = {
  linear: () => {},
  ease: () => {},
  bezier: () => {},
  in: () => {},
  out: () => {},
  inOut: () => {}
};

const Image = 'Image';

const Linking = {
  openURL: () => {}
};

const Platform = {
  get constants() {
    return {
      reactNativeVersion: {
        major: 1000,
        minor: 0,
        patch: 0,
        prerelease: undefined
      }
    };
  },
  OS: 'android',
  select(obj) {
    return obj.android || obj.ios || obj.native || obj.default;
  }
};

const PixelRatio = {
  getFontScale: () => 1
};

const Pressable = 'Pressable';

const StyleSheet = {
  create(styles) {
    return styles;
  },
  flatten(style) {
    if (!style) {
      return undefined;
    }
    if (!Array.isArray(style)) {
      return style;
    }
    const result = {};
    for (let i = 0, styleLength = style.length; i < styleLength; ++i) {
      const computedStyle = this.flatten(style[i]);
      if (computedStyle) {
        for (const key in computedStyle) {
          const value = computedStyle[key];
          result[key] = value;
        }
      }
    }
    return result;
  }
};

const TextInput = 'TextInput';

const Text = 'Text';

const View = 'View';

const useColorScheme = () => 'light';

const useWindowDimensions = () => ({ width: 2000, height: 1000 });

module.exports = {
  Animated,
  Easing,
  Image,
  Linking,
  Platform,
  PixelRatio,
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
  useColorScheme,
  useWindowDimensions
};
