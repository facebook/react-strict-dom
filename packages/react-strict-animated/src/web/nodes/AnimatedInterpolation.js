/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { InterpolationConfig } from '../../shared/SharedAnimatedTypes';

import AnimatedWithChildren from './AnimatedWithChildren';

import normalizeColor from '@react-native/normalize-colors';

type ExtrapolateType = 'extend' | 'identity' | 'clamp';

function findRange(input: number, inputRange: $ReadOnlyArray<number>) {
  let i;
  for (i = 1; i < inputRange.length - 1; ++i) {
    if (inputRange[i] >= input) {
      break;
    }
  }
  return i - 1;
}

function performInterpolation(
  input: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number,
  easing: (input: number) => number,
  extrapolateLeft: ExtrapolateType,
  extrapolateRight: ExtrapolateType
) {
  let result = input;

  // Extrapolate
  if (result < inputMin) {
    if (extrapolateLeft === 'identity') {
      return result;
    } else if (extrapolateLeft === 'clamp') {
      result = inputMin;
    } else if (extrapolateLeft === 'extend') {
      // noop
    }
  }

  if (result > inputMax) {
    if (extrapolateRight === 'identity') {
      return result;
    } else if (extrapolateRight === 'clamp') {
      result = inputMax;
    } else if (extrapolateRight === 'extend') {
      // noop
    }
  }

  if (outputMin === outputMax) {
    return outputMin;
  }

  if (inputMin === inputMax) {
    if (input <= inputMin) {
      return outputMin;
    }
    return outputMax;
  }

  // Input Range
  if (inputMin === -Infinity) {
    result = -result;
  } else if (inputMax === Infinity) {
    result -= inputMin;
  } else {
    result = (result - inputMin) / (inputMax - inputMin);
  }

  // Easing
  result = easing(result);

  // Output Range
  if (outputMin === -Infinity) {
    result = -result;
  } else if (outputMax === Infinity) {
    result += outputMin;
  } else {
    result = result * (outputMax - outputMin) + outputMin;
  }

  return result;
}

/**
 * Very handy helper to map input ranges to output ranges with an easing
 * function and custom behavior outside of the ranges.
 */
function createNumericInterpolation(
  config: InterpolationConfig<number>
): (input: number) => number {
  const outputRange: $ReadOnlyArray<number> = config.outputRange;
  const inputRange = config.inputRange;

  const easing = config.easing || ((t) => t);

  let extrapolateLeft: ExtrapolateType = 'extend';
  if (config.extrapolateLeft !== undefined) {
    extrapolateLeft = config.extrapolateLeft;
  } else if (config.extrapolate !== undefined) {
    extrapolateLeft = config.extrapolate;
  }

  let extrapolateRight: ExtrapolateType = 'extend';
  if (config.extrapolateRight !== undefined) {
    extrapolateRight = config.extrapolateRight;
  } else if (config.extrapolate !== undefined) {
    extrapolateRight = config.extrapolate;
  }

  return (input) => {
    if (typeof input !== 'number') {
      throw new Error('Cannot interpolate an input which is not a number');
    }

    const range = findRange(input, inputRange);
    return performInterpolation(
      input,
      inputRange[range],
      inputRange[range + 1],
      outputRange[range],
      outputRange[range + 1],
      easing,
      extrapolateLeft,
      extrapolateRight
    );
  };
}

const numericComponentRegex = /[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/g;

// Maps string inputs an RGBA color or an array of numeric components
function mapStringToNumericComponents(
  input: string
):
  | { components: [number, number, number, number], isColor: true }
  | { components: $ReadOnlyArray<number | string>, isColor: false } {
  let normalizedColor = normalizeColor(input);

  if (typeof normalizedColor === 'number') {
    normalizedColor = normalizedColor || 0;
    const r = (normalizedColor & 0xff000000) >>> 24;
    const g = (normalizedColor & 0x00ff0000) >>> 16;
    const b = (normalizedColor & 0x0000ff00) >>> 8;
    const a = (normalizedColor & 0x000000ff) / 255;
    return { components: [r, g, b, a], isColor: true };
  } else {
    const components: Array<string | number> = [];
    let lastMatchEnd = 0;
    let match: RegExp$matchResult | null = null;
    while ((match = numericComponentRegex.exec(input)) != null) {
      if (match != null) {
        if (match.index > lastMatchEnd) {
          components.push(input.substring(lastMatchEnd, match.index));
        }
        components.push(parseFloat(match[0]));
        lastMatchEnd = match.index + match[0].length;
      }
    }
    if (components.length === 0) {
      throw new Error(
        'outputRange must contain color or value with numeric component'
      );
    }
    if (lastMatchEnd < input.length) {
      components.push(input.substring(lastMatchEnd, input.length));
    }
    return { components, isColor: false };
  }
}

/**
 * Supports string shapes by extracting numbers so new values can be computed,
 * and recombines those values into new strings of the same shape.  Supports
 * things like:
 *
 *   rgba(123, 42, 99, 0.36) // colors
 *   -45deg                  // values with units
 */
function createStringInterpolation(
  config: InterpolationConfig<string>
): (input: number) => string {
  if (config.outputRange.length < 2) {
    throw new Error('Bad output range');
  }
  const outputRange = config.outputRange.map(mapStringToNumericComponents);

  const isColor = outputRange[0].isColor;

  const numericComponents: $ReadOnlyArray<$ReadOnlyArray<number>> =
    outputRange.map((output) => {
      if (output.isColor) {
        return output.components;
      } else {
        // $FlowFixMe[incompatible-call]
        return output.components.filter((c) => typeof c === 'number');
      }
    });
  const interpolations = numericComponents[0].map((_, i) =>
    createNumericInterpolation({
      ...config,
      outputRange: numericComponents.map((components) => components[i])
    })
  );
  if (!isColor) {
    return (input) => {
      const values = interpolations.map((interpolation) =>
        interpolation(input)
      );
      let i = 0;
      return outputRange[0].components
        .map((c) => (typeof c === 'number' ? values[i++] : c))
        .join('');
    };
  } else {
    return (input) => {
      const result = interpolations.map((interpolation, i) => {
        const value = interpolation(input);
        // rgba requires that the r,g,b are integers.... so we want to round them, but we *dont* want to
        // round the opacity (4th column).
        return i < 3 ? Math.round(value) : Math.round(value * 1000) / 1000;
      });
      return `rgba(${result[0]}, ${result[1]}, ${result[2]}, ${result[3]})`;
    };
  }
}

class AnimatedInterpolation<
  TOutput: number | string
> extends AnimatedWithChildren<TOutput> {
  #parent: AnimatedWithChildren<number>;
  #interpolation: (input: number) => TOutput;

  constructor(
    parent: AnimatedWithChildren<number>,
    interpolation: (input: number) => TOutput
  ) {
    super();
    this.#parent = parent;
    this.#interpolation = interpolation;
  }

  __getValue(): TOutput {
    const parentValue = this.#parent.__getValue();
    return this.#interpolation(parentValue);
  }

  __attach(): void {
    this.#parent.__addChild(this);
  }

  __detach(): void {
    this.#parent.__removeChild(this);
  }
}

function createInterpolator<TOutput: number | string>(
  config: InterpolationConfig<TOutput>
): ((number) => TOutput) | null {
  switch (typeof config.outputRange[0]) {
    case 'number': {
      return createNumericInterpolation(config as $FlowFixMe) as $FlowFixMe;
    }
    case 'string': {
      return createStringInterpolation(config as $FlowFixMe) as $FlowFixMe;
    }
    default: {
      return null;
    }
  }
}

export function Interpolate<TOutput: number | string>(
  value: AnimatedWithChildren<number>,
  config: InterpolationConfig<TOutput>
): AnimatedInterpolation<TOutput> {
  const interpolator = createInterpolator(config);
  if (interpolator == null) {
    throw new Error('Invalid output range');
  }
  // $FlowFixMe[incompatible-type] - Flow currently doesn't have a mechanism to refine the polymorphic config type
  return new AnimatedInterpolation(value, interpolator);
}
