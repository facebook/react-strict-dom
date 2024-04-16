/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { AnimatedNode } from '../../types/react-native';

import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { parseTransform } from './parseTransform';
import { errorMsg, warnMsg } from '../../shared/logUtils';

type TransitionProperties = $ReadOnlyArray<{
  property: string,
  value: string | number
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
    if (property === 'transform' && typeof value === 'string') {
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
    errorMsg(
      'invalid style transition. The number of transition properties must be the same before and after the transition.'
    );
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
      }

      if (typeof value === 'string') {
        if (property !== 'transform') {
          return animatedRef.current.interpolate({
            inputRange: INPUT_RANGE,
            outputRange: [String(startValue), value]
          });
        } else {
          const parsedTransforms = parseTransform(value);
          const parsedRefTransforms = parseTransform(String(startValue));

          // Check that there are the same number of transforms
          if (parsedTransforms.length !== parsedRefTransforms.length) {
            warnMsg(
              'The number of transforms must be the same before and after the transition. The transition will not animate.'
            );
            return parsedTransforms;
          }

          // TODO: Figure out how to animate matrix transforms
          for (const transform of parsedTransforms) {
            if (transform.matrix != null) {
              warnMsg(
                'Matrix transforms cannot be animated. The transition will not animate.'
              );
              return parsedTransforms;
            }
          }

          // Check that the transforms have the same types in the same order
          for (let i = 0; i < parsedTransforms.length; i++) {
            if (
              (parsedTransforms[i].perspective != null &&
                parsedRefTransforms[i].perspective == null) ||
              (parsedTransforms[i].rotate != null &&
                parsedRefTransforms[i].rotate == null) ||
              (parsedTransforms[i].rotateX != null &&
                parsedRefTransforms[i].rotateX == null) ||
              (parsedTransforms[i].rotateY != null &&
                parsedRefTransforms[i].rotateY == null) ||
              (parsedTransforms[i].rotateZ != null &&
                parsedRefTransforms[i].rotateZ == null) ||
              (parsedTransforms[i].scale != null &&
                parsedRefTransforms[i].scale == null) ||
              (parsedTransforms[i].scaleX != null &&
                parsedRefTransforms[i].scaleX == null) ||
              (parsedTransforms[i].scaleY != null &&
                parsedRefTransforms[i].scaleY == null) ||
              (parsedTransforms[i].scaleZ != null &&
                parsedRefTransforms[i].scaleZ == null) ||
              (parsedTransforms[i].skewX != null &&
                parsedRefTransforms[i].skewX == null) ||
              (parsedTransforms[i].skewY != null &&
                parsedRefTransforms[i].skewY == null) ||
              (parsedTransforms[i].translateX != null &&
                parsedRefTransforms[i].translateX == null) ||
              (parsedTransforms[i].translateY != null &&
                parsedRefTransforms[i].translateY == null)
            ) {
              return parsedTransforms;
            }
          }

          // Animate the transforms
          const animatedTransforms: Array<mixed> = [];
          for (let i = 0; i < parsedTransforms.length; i++) {
            const parsedTransform = parsedTransforms[i];
            const parsedRefTransform = parsedRefTransforms[i];

            if (parsedTransform.perspective != null) {
              animatedTransforms.push({
                perspective: animatedRef.current.interpolate({
                  inputRange: INPUT_RANGE,
                  outputRange: [
                    +parsedRefTransform.perspective,
                    parsedTransform.perspective
                  ]
                })
              });
              continue;
            }
            if (parsedTransform.rotate != null) {
              const parsedRotate = parsedTransform.rotate;
              animatedTransforms.push({
                rotate: animatedRef.current.interpolate({
                  inputRange: INPUT_RANGE,
                  outputRange: [String(parsedRefTransform.rotate), parsedRotate]
                })
              });
              continue;
            }
            if (parsedTransform.rotateX != null) {
              const parsedRotateX = parsedTransform.rotateX;
              animatedTransforms.push({
                rotateX: animatedRef.current.interpolate({
                  inputRange: INPUT_RANGE,
                  outputRange: [
                    String(parsedRefTransform.rotateX),
                    parsedRotateX
                  ]
                })
              });
              continue;
            }
            if (parsedTransform.rotateY != null) {
              const parsedRotateY = parsedTransform.rotateY;
              animatedTransforms.push({
                rotateY: animatedRef.current.interpolate({
                  inputRange: INPUT_RANGE,
                  outputRange: [
                    String(parsedRefTransform.rotateY),
                    parsedRotateY
                  ]
                })
              });
              continue;
            }
            if (parsedTransform.rotateZ != null) {
              const parsedRotateZ = parsedTransform.rotateZ;
              animatedTransforms.push({
                rotateZ: animatedRef.current.interpolate({
                  inputRange: INPUT_RANGE,
                  outputRange: [
                    String(parsedRefTransform.rotateZ),
                    parsedRotateZ
                  ]
                })
              });
              continue;
            }
            if (parsedTransform.scale != null) {
              animatedTransforms.push({
                scale: animatedRef.current.interpolate({
                  inputRange: INPUT_RANGE,
                  outputRange: [
                    +parsedRefTransform.scale,
                    parsedTransform.scale
                  ]
                })
              });
              continue;
            }
            if (parsedTransform.scaleX != null) {
              animatedTransforms.push({
                scaleX: animatedRef.current.interpolate({
                  inputRange: INPUT_RANGE,
                  outputRange: [
                    +parsedRefTransform.scaleX,
                    parsedTransform.scaleX
                  ]
                })
              });
              continue;
            }
            if (parsedTransform.scaleY != null) {
              animatedTransforms.push({
                scaleY: animatedRef.current.interpolate({
                  inputRange: INPUT_RANGE,
                  outputRange: [
                    +parsedRefTransform.scaleY,
                    parsedTransform.scaleY
                  ]
                })
              });
              continue;
            }
            if (parsedTransform.scaleZ != null) {
              animatedTransforms.push({
                scaleZ: animatedRef.current.interpolate({
                  inputRange: INPUT_RANGE,
                  outputRange: [
                    +parsedRefTransform.scaleZ,
                    parsedTransform.scaleZ
                  ]
                })
              });
              continue;
            }
            if (parsedTransform.skewX != null) {
              const parsedSkewX = parsedTransform.skewX;
              animatedTransforms.push({
                skewX: animatedRef.current.interpolate({
                  inputRange: INPUT_RANGE,
                  outputRange: [String(parsedRefTransform.skewX), parsedSkewX]
                })
              });
              continue;
            }
            if (parsedTransform.skewY != null) {
              const parsedSkewY = parsedTransform.skewY;
              animatedTransforms.push({
                skewY: animatedRef.current.interpolate({
                  inputRange: INPUT_RANGE,
                  outputRange: [String(parsedRefTransform.skewY), parsedSkewY]
                })
              });
              continue;
            }
            if (parsedTransform.translateX != null) {
              animatedTransforms.push({
                translateX: animatedRef.current.interpolate({
                  inputRange: INPUT_RANGE,
                  outputRange: [
                    +parsedRefTransform.translateX,
                    parsedTransform.translateX
                  ]
                })
              });
              continue;
            }
            if (parsedTransform.translateY != null) {
              animatedTransforms.push({
                translateY: animatedRef.current.interpolate({
                  inputRange: INPUT_RANGE,
                  outputRange: [
                    +parsedRefTransform.translateY,
                    parsedTransform.translateY
                  ]
                })
              });
              continue;
            }
          }
          return animatedTransforms;
        }
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
