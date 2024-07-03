/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { AnimatedNode } from '../../types/react-native';
import type { Transform } from '../../types/styles';

import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { errorMsg, warnMsg } from '../../shared/logUtils';

type TransitionProperties = $ReadOnlyArray<{
  property: string,
  value: string | number | Transform[]
}>;

type TransitionConfig = $ReadOnly<{
  transitionDelay?: number,
  transitionDuration?: number,
  transitionProperties?: ?TransitionProperties,
  transitionTimingFunction?: ?string
}>;

type TransitionStyles =
  | null
  | number
  | string
  | AnimatedNode
  | $ReadOnlyArray<mixed>;

type TransitionStylesArray = Array<{
  property: string,
  style: TransitionStyles
}>;

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

const INPUT_RANGE = [0, 1];

export function useStyleTransition(
  config: TransitionConfig
): TransitionStylesArray {
  const {
    transitionDelay,
    transitionDuration,
    transitionProperties,
    transitionTimingFunction
  } = config;
  const valueRef = useRef(transitionProperties);
  const animatedRef = useRef(new Animated.Value(0));

  useEffect(() => {
    if (transitionProperties != null) {
      Animated.sequence([
        Animated.delay(transitionDelay ?? 0),
        Animated.timing(animatedRef.current, {
          toValue: 1,
          duration: transitionDuration ?? 16,
          easing: getEasingFunction(transitionTimingFunction),
          useNativeDriver: canUseNativeDriver(transitionProperties)
        })
      ]).start(() => {
        valueRef.current = transitionProperties;
        animatedRef.current = new Animated.Value(0);
      });
    }
  }, [
    transitionDelay,
    transitionDuration,
    transitionProperties,
    transitionTimingFunction
  ]);

  if (transitionProperties == null) {
    return [];
  }

  if (valueRef.current?.length !== transitionProperties.length) {
    if (__DEV__) {
      errorMsg(
        'invalid style transition. The number of transition properties must be the same before and after the transition.'
      );
    }
    return [];
  }

  const transitionStyles: TransitionStyles[] = transitionProperties.map(
    ({ property, value }, i): TransitionStyles => {
      const startValue = valueRef.current?.[i].value;

      if (typeof value === 'number') {
        return animatedRef.current.interpolate({
          inputRange: INPUT_RANGE,
          outputRange: [+startValue, value]
        });
      } else if (typeof value === 'string') {
        return animatedRef.current.interpolate({
          inputRange: INPUT_RANGE,
          outputRange: [String(startValue), value]
        });
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
          return transforms;
        }

        // TODO: Figure out how to animate matrix transforms
        for (const transform of transforms) {
          if (transform.matrix != null) {
            if (__DEV__) {
              warnMsg(
                'Matrix transforms cannot be animated. The transition will not animate.'
              );
            }
            return transforms;
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
            return transforms;
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
          if (singleTransform.rotate != null) {
            animatedTransforms.push({
              rotate: animatedRef.current.interpolate({
                inputRange: INPUT_RANGE,
                outputRange: [singleRefTransform.rotate, singleTransform.rotate]
              })
            });
            continue;
          }
          if (singleTransform.rotateX != null) {
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
          if (singleTransform.rotateY != null) {
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
          if (singleTransform.rotateZ != null) {
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
          if (singleTransform.skewX != null) {
            animatedTransforms.push({
              skewX: animatedRef.current.interpolate({
                inputRange: INPUT_RANGE,
                outputRange: [singleRefTransform.skewX, singleTransform.skewX]
              })
            });
            continue;
          }
          if (singleTransform.skewY != null) {
            animatedTransforms.push({
              skewY: animatedRef.current.interpolate({
                inputRange: INPUT_RANGE,
                outputRange: [singleRefTransform.skewY, singleTransform.skewY]
              })
            });
            continue;
          }
          if (singleTransform.translateX != null) {
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
          if (singleTransform.translateY != null) {
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
        return animatedTransforms;
      }
      return null;
    }
  );

  const animatedTransitionProperties = transitionProperties.map(
    ({ property }, i) => {
      return {
        property,
        style: transitionStyles[i]
      };
    }
  );
  return animatedTransitionProperties;
}
