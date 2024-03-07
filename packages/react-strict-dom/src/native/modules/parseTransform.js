/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

type Transform =
  | { matrix: number[] }
  | { perspective: number }
  | { rotate: string }
  | { rotateX: string }
  | { rotateY: string }
  | { rotateZ: string }
  | { scale: number }
  | { scaleX: number }
  | { scaleY: number }
  | { scaleZ: number }
  | { translateX: number }
  | { translateY: number }
  | { skewX: string }
  | { skewY: string };

export function parseTransform(transform: string): Transform[] {
  const transforms = transform
    .split(')')
    .flatMap((s) => (s === '' ? ([] as string[]) : [s + ')']));
  const parsedTransforms: Transform[] = [];

  for (const txf of transforms) {
    let match = txf.match(
      /(perspective|scale|scaleX|scaleY|scaleZ|translateX|translateY)\(([0-9.+\-eE]+)(px)?\)/
    );
    if (match != null) {
      const value = parseFloat(match[2]);
      if (isNaN(value)) {
        continue;
      }
      switch (match[1]) {
        case 'perspective':
          parsedTransforms.push({ perspective: value });
          break;
        case 'scale':
          parsedTransforms.push({ scale: value });
          break;
        case 'scaleX':
          parsedTransforms.push({ scaleX: value });
          break;
        case 'scaleY':
          parsedTransforms.push({ scaleY: value });
          break;
        case 'scaleZ':
          parsedTransforms.push({ scaleZ: value });
          break;
        case 'translateX':
          parsedTransforms.push({ translateX: value });
          break;
        case 'translateY':
          parsedTransforms.push({ translateY: value });
          break;
        default:
          break;
      }
      continue;
    }

    match = txf.match(/(rotate|rotateX|rotateY|rotateZ|skewX|skewY)\((.*)\)/);
    if (match != null) {
      const value = match[2];
      switch (match[1]) {
        case 'rotate':
          parsedTransforms.push({ rotate: value });
          break;
        case 'rotateX':
          parsedTransforms.push({ rotateX: value });
          break;
        case 'rotateY':
          parsedTransforms.push({ rotateY: value });
          break;
        case 'rotateZ':
          parsedTransforms.push({ rotateZ: value });
          break;
        case 'skewX':
          parsedTransforms.push({ skewX: value });
          break;
        case 'skewY':
          parsedTransforms.push({ skewY: value });
          break;
        default:
          break;
      }
      continue;
    }

    match = txf.match(/matrix\((.*)\)/);
    if (match != null) {
      const matrixValues = match[1].trim().split(/\s*,\s*/);
      if (matrixValues.length !== 6) {
        continue;
      }
      const matrix = matrixValues.map(parseFloat);
      if (matrix.some(isNaN)) {
        continue;
      }
      parsedTransforms.push({
        matrix: [
          matrix[0],
          matrix[1],
          0,
          0,
          matrix[2],
          matrix[3],
          0,
          0,
          matrix[4],
          matrix[5],
          1,
          0,
          0,
          0,
          0,
          1
        ]
      });
    }
  }

  return parsedTransforms;
}
