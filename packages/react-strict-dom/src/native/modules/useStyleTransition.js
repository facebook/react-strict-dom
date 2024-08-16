/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type {
  Style as ReactNativeStyle,
  StyleValue
} from '../../types/react-native';

import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { warnMsg } from '../../shared/logUtils';

type TransitionProperties = $ReadOnlyArray<{
  property: string,
  value: StyleValue
}>;

type AnimatedStyle = { [string]: ?StyleValue | $ReadOnlyArray<mixed> };

function isNumber(num: mixed): num is number {
  return typeof num === 'number';
}

function isString(str: mixed): str is string {
  return typeof str === 'string';
}

function canUseNativeDriver(
  transitionProperties: ?TransitionProperties
): boolean {
  if (transitionProperties == null) {
    return false;
  }
  return transitionProperties.every(({ property, value }) => {
    if (property === 'opacity') {
      return true;
    }
    if (property === 'transform' && Array.isArray(value)) {
      return !value.includes('skew');
    }
    return false;
  });
}

function getEasingFunction(input: ?string) {
  if (input === 'ease') {
    return Easing.ease;
  } else if (input === 'ease-in') {
    return Easing.in(Easing.ease);
  } else if (input === 'ease-out') {
    return Easing.out(Easing.ease);
  } else if (input === 'ease-in-out') {
    return Easing.inOut(Easing.ease);
  } else if (input != null && input.includes('cubic-bezier')) {
    const chunk = input.split('cubic-bezier(')[1];
    const str = chunk.split(')')[0];
    const curve = str.split(',').map((point) => parseFloat(point.trim()));
    return Easing.bezier(...curve);
  }
  return Easing.linear;
}

function getTransitionProperties(property: mixed): ?(string[]) {
  if (property === 'all') {
    return ['opacity', 'transform'];
  }
  if (typeof property === 'string') {
    return property.split(',').map((p) => p.trim());
  }
  return null;
}

const INPUT_RANGE = [0, 1];

export function useStyleTransition(style: ReactNativeStyle): ReactNativeStyle {
  const {
    transitionDelay: _delay,
    transitionDuration: _duration,
    transitionProperty: _transitionProperty,
    transitionTimingFunction: _timingFunction,
    ...styleWithAnimations
  } = style;

  const transitionDelay = isNumber(_delay) ? _delay : 0;
  const transitionDuration = isNumber(_duration) ? _duration : 16;
  const transitionTimingFunction = isString(_timingFunction)
    ? _timingFunction
    : null;
  const transitionProperties = getTransitionProperties(
    _transitionProperty
  )?.flatMap((property) => {
    const value = style[property];
    if (isString(value) || isNumber(value) || Array.isArray(value)) {
      return [{ property, value }];
    }
    return [] as [];
  });

  const previousStyleRef = useRef(style);
  const animatedRef = useRef(new Animated.Value(0));

  useEffect(() => {
    if (transitionProperties != null) {
      const animation = Animated.sequence([
        Animated.delay(transitionDelay ?? 0),
        Animated.timing(animatedRef.current, {
          toValue: 1,
          duration: transitionDuration ?? 16,
          easing: getEasingFunction(transitionTimingFunction),
          useNativeDriver: canUseNativeDriver(transitionProperties)
        })
      ]);
      animation.start(() => {
        previousStyleRef.current = style;
        animatedRef.current = new Animated.Value(0);
      });
      return () => {
        animation.stop();
      };
    }
  }, [
    style,
    transitionDelay,
    transitionDuration,
    transitionProperties,
    transitionTimingFunction
  ]);

  if (transitionProperties == null) {
    return style;
  }

  const transitionStyle: AnimatedStyle = transitionProperties.reduce(
    (animatedStyle, entry) => {
      const { property, value } = entry;

      const startValue = previousStyleRef.current?.[property];

      if (typeof value === 'number') {
        animatedStyle[property] = animatedRef.current.interpolate({
          inputRange: INPUT_RANGE,
          outputRange: [+startValue, value]
        });
        return animatedStyle;
      } else if (typeof value === 'string') {
        animatedStyle[property] = animatedRef.current.interpolate({
          inputRange: INPUT_RANGE,
          outputRange: [String(startValue), value]
        });
        return animatedStyle;
      } else if (property === 'transform' && Array.isArray(value)) {
        const transforms = value;
        const refTransforms = startValue;

        // Check that there are the same number of transforms
        if (
          !Array.isArray(refTransforms) ||
          transforms.length !== refTransforms.length
        ) {
          if (__DEV__) {
            warnMsg(
              'The number or types of transforms must be the same before and after the transition. The transition will not animate.'
            );
          }
          animatedStyle[property] = transforms;
          return animatedStyle;
        }

        // TODO: Figure out how to animate matrix transforms
        for (const transform of transforms) {
          if (transform.matrix != null) {
            if (__DEV__) {
              warnMsg(
                'Matrix transforms cannot be animated. The transition will not animate.'
              );
            }
            animatedStyle[property] = transforms;
            return animatedStyle;
          }
        }

        // Check that the transforms have the same types in the same order
        for (let i = 0; i < transforms.length; i++) {
          if (
            (transforms[i].perspective != null &&
              refTransforms[i].perspective == null) ||
            (transforms[i].rotate != null && refTransforms[i].rotate == null) ||
            (transforms[i].rotateX != null &&
              refTransforms[i].rotateX == null) ||
            (transforms[i].rotateY != null &&
              refTransforms[i].rotateY == null) ||
            (transforms[i].rotateZ != null &&
              refTransforms[i].rotateZ == null) ||
            (transforms[i].scale != null && refTransforms[i].scale == null) ||
            (transforms[i].scaleX != null && refTransforms[i].scaleX == null) ||
            (transforms[i].scaleY != null && refTransforms[i].scaleY == null) ||
            (transforms[i].scaleZ != null && refTransforms[i].scaleZ == null) ||
            (transforms[i].skewX != null && refTransforms[i].skewX == null) ||
            (transforms[i].skewY != null && refTransforms[i].skewY == null) ||
            (transforms[i].translateX != null &&
              refTransforms[i].translateX == null) ||
            (transforms[i].translateY != null &&
              refTransforms[i].translateY == null)
          ) {
            if (__DEV__) {
              warnMsg(
                'The types of transforms must be the same before and after the transition. The transition will not animate.\n' +
                  `Before: ${JSON.stringify(transforms)}\n` +
                  `After: ${JSON.stringify(refTransforms)}`
              );
            }
            animatedStyle[property] = transforms;
            return animatedStyle;
          }
        }

        // Animate the transforms
        const animatedTransforms: Array<mixed> = [];
        for (let i = 0; i < transforms.length; i++) {
          const singleTransform = transforms[i];
          const singleRefTransform = refTransforms[i];

          if (singleTransform.perspective != null) {
            animatedTransforms.push({
              perspective: animatedRef.current.interpolate({
                inputRange: INPUT_RANGE,
                outputRange: [
                  +singleRefTransform.perspective,
                  singleTransform.perspective
                ]
              })
            });
            continue;
          }
          if (
            singleRefTransform.rotate != null &&
            singleTransform.rotate != null
          ) {
            animatedTransforms.push({
              rotate: animatedRef.current.interpolate({
                inputRange: INPUT_RANGE,
                outputRange: [singleRefTransform.rotate, singleTransform.rotate]
              })
            });
            continue;
          }
          if (
            singleRefTransform.rotateX != null &&
            singleTransform.rotateX != null
          ) {
            animatedTransforms.push({
              rotateX: animatedRef.current.interpolate({
                inputRange: INPUT_RANGE,
                outputRange: [
                  singleRefTransform.rotateX,
                  singleTransform.rotateX
                ]
              })
            });
            continue;
          }
          if (
            singleRefTransform.rotateY != null &&
            singleTransform.rotateY != null
          ) {
            animatedTransforms.push({
              rotateY: animatedRef.current.interpolate({
                inputRange: INPUT_RANGE,
                outputRange: [
                  singleRefTransform.rotateY,
                  singleTransform.rotateY
                ]
              })
            });
            continue;
          }
          if (
            singleRefTransform.rotateZ != null &&
            singleTransform.rotateZ != null
          ) {
            animatedTransforms.push({
              rotateZ: animatedRef.current.interpolate({
                inputRange: INPUT_RANGE,
                outputRange: [
                  singleRefTransform.rotateZ,
                  singleTransform.rotateZ
                ]
              })
            });
            continue;
          }
          if (singleTransform.scale != null) {
            animatedTransforms.push({
              scale: animatedRef.current.interpolate({
                inputRange: INPUT_RANGE,
                outputRange: [+singleRefTransform.scale, singleTransform.scale]
              })
            });
            continue;
          }
          if (singleTransform.scaleX != null) {
            animatedTransforms.push({
              scaleX: animatedRef.current.interpolate({
                inputRange: INPUT_RANGE,
                outputRange: [
                  +singleRefTransform.scaleX,
                  singleTransform.scaleX
                ]
              })
            });
            continue;
          }
          if (singleTransform.scaleY != null) {
            animatedTransforms.push({
              scaleY: animatedRef.current.interpolate({
                inputRange: INPUT_RANGE,
                outputRange: [
                  +singleRefTransform.scaleY,
                  singleTransform.scaleY
                ]
              })
            });
            continue;
          }
          if (singleTransform.scaleZ != null) {
            animatedTransforms.push({
              scaleZ: animatedRef.current.interpolate({
                inputRange: INPUT_RANGE,
                outputRange: [
                  +singleRefTransform.scaleZ,
                  singleTransform.scaleZ
                ]
              })
            });
            continue;
          }
          if (
            singleRefTransform.skewX != null &&
            singleTransform.skewX != null
          ) {
            animatedTransforms.push({
              skewX: animatedRef.current.interpolate({
                inputRange: INPUT_RANGE,
                outputRange: [singleRefTransform.skewX, singleTransform.skewX]
              })
            });
            continue;
          }
          if (
            singleRefTransform.skewY != null &&
            singleTransform.skewY != null
          ) {
            animatedTransforms.push({
              skewY: animatedRef.current.interpolate({
                inputRange: INPUT_RANGE,
                outputRange: [singleRefTransform.skewY, singleTransform.skewY]
              })
            });
            continue;
          }
          if (
            singleRefTransform.translateX != null &&
            singleTransform.translateX != null
          ) {
            animatedTransforms.push({
              translateX: animatedRef.current.interpolate({
                inputRange: INPUT_RANGE,
                outputRange: [
                  +singleRefTransform.translateX,
                  singleTransform.translateX
                ]
              })
            });
            continue;
          }
          if (
            singleRefTransform.translateY != null &&
            singleTransform.translateY != null
          ) {
            animatedTransforms.push({
              translateY: animatedRef.current.interpolate({
                inputRange: INPUT_RANGE,
                outputRange: [
                  +singleRefTransform.translateY,
                  singleTransform.translateY
                ]
              })
            });
            continue;
          }
        }
        animatedStyle[property] = animatedTransforms;
        return animatedStyle;
      }

      return animatedStyle;
    },
    {} as AnimatedStyle
  );

  Object.assign(styleWithAnimations, transitionStyle);

  return styleWithAnimations;
}
