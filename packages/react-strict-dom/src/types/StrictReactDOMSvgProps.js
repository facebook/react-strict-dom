/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type { StrictReactDOMProps } from './StrictReactDOMProps';
import type { Styles } from './styles';

type Units = 'userSpaceOnUse' | 'objectBoundingBox';

type FontProps = $ReadOnly<{
  fontFamily?: string,
  fontSize?: string | number,
  fontStyle?: 'normal' | 'italic' | 'oblique',
  fontVariant?: 'normal' | 'small-caps',
  fontWeight?: string | number,
  kerning?: string | number,
  letterSpacing?: string | number,
  textAnchor?: 'start' | 'middle' | 'end',
  textDecoration?: 'none' | 'underline' | 'overline' | 'line-through' | 'blink',
  wordSpacing?: string | number
}>;

type TransformProps = $ReadOnly<{
  transform?: string,
  transformOrigin?: string,
  x?: string | number,
  y?: string | number
}>;

type PathProps = $ReadOnly<{
  ...TransformProps,
  ...Pick<StrictReactDOMProps, 'aria-label' | 'data-testid'>,
  clipPath?: string,
  clipRule?: 'evenodd' | 'nonzero',
  color?: string,
  fill?: string,
  fillOpacity?: string | number,
  fillRule?: 'evenodd' | 'nonzero',
  filter?: string,
  id?: ?string,
  marker?: string,
  markerEnd?: string,
  markerMid?: string,
  markerStart?: string,
  mask?: string,
  stroke?: string,
  strokeDasharray?: string | number,
  strokeDashoffset?: string | number,
  strokeLinecap?: 'butt' | 'square' | 'round',
  strokeLinejoin?: 'miter' | 'bevel' | 'round',
  strokeMiterlimit?: string | number,
  strokeOpacity?: string | number,
  strokeWidth?: string | number,
  vectorEffect?: 'none' | 'non-scaling-stroke' | 'default' | 'inherit' | 'uri'
}>;

type TextProps = $ReadOnly<{
  ...PathProps,
  ...FontProps,
  alignmentBaseline?:
    | 'baseline'
    | 'before-edge'
    | 'text-before-edge'
    | 'middle'
    | 'central'
    | 'after-edge'
    | 'text-after-edge'
    | 'ideographic'
    | 'alphabetic'
    | 'hanging'
    | 'mathematical',
  baselineShift?: string | number,
  fontFeatureSettings?: string,
  lengthAdjust?: 'spacing' | 'spacingAndGlyphs',
  textLength?: string | number,
  verticalAlign?: string | number
}>;

export type StrictReactDOMSvgProps = $ReadOnly<{
  ...StrictReactDOMProps,
  ...StrictReactDOMGProps,
  height?: string | number,
  preserveAspectRatio?: string,
  title?: string,
  viewBox?: string,
  width?: string | number,
  xmlns?: string,
  xmlnsXlink?: string
}>;

export type StrictReactDOMCircleProps = $ReadOnly<{
  ...PathProps,
  cx?: string | number,
  cy?: string | number,
  opacity?: string | number,
  r?: string | number
}>;

export type StrictReactDOMClipPathProps = $ReadOnly<{
  children?: React.Node,
  id?: ?string
}>;

export type StrictReactDOMDefsProps = $ReadOnly<{
  children?: React.Node,
  id?: ?string
}>;

export type StrictReactDOMEllipseProps = $ReadOnly<{
  ...PathProps,
  cx?: string | number,
  cy?: string | number,
  opacity?: string | number,
  rx?: string | number,
  ry?: string | number
}>;

export type StrictReactDOMForeignObjectProps = $ReadOnly<{
  children?: React.Node,
  height?: string | number,
  width?: string | number,
  x?: string | number,
  y?: string | number
}>;

export type StrictReactDOMGProps = $ReadOnly<{
  ...PathProps,
  ...FontProps,
  children?: React.Node,
  opacity?: string | number
}>;

export type StrictReactDOMImageProps = $ReadOnly<{
  ...PathProps,
  height?: string | number,
  href?: string,
  onLoad?: $FlowFixMe,
  opacity?: string | number,
  preserveAspectRatio?: string,
  width?: string | number,
  x?: string | number,
  xlinkHref?: string,
  y?: string | number
}>;

export type StrictReactDOMLineProps = $ReadOnly<{
  ...PathProps,
  opacity?: string | number,
  x1?: string | number,
  x2?: string | number,
  y1?: string | number,
  y2?: string | number
}>;

export type StrictReactDOMLinearGradientProps = $ReadOnly<{
  children?: React.Node,
  gradientTransform?: string,
  gradientUnits?: Units,
  id?: ?string,
  x1?: string | number,
  x2?: string | number,
  y1?: string | number,
  y2?: string | number
}>;

export type StrictReactDOMMarkerProps = $ReadOnly<{
  children?: React.Node,
  id?: ?string,
  markerHeight?: string | number,
  markerUnits?: 'strokeWidth' | 'userSpaceOnUse',
  markerWidth?: string | number,
  orient?: string | number,
  preserveAspectRatio?: string,
  refX?: string | number,
  refY?: string | number,
  viewBox?: string
}>;

export type StrictReactDOMMaskProps = $ReadOnly<{
  ...PathProps,
  children?: React.Node,
  height?: string | number,
  id?: ?string,
  maskContentUnits?: Units,
  maskType?: string | number,
  maskUnits?: Units,
  style?: ?Styles,
  width?: string | number,
  x?: string | number,
  y?: string | number
}>;

export type StrictReactDOMPathProps = $ReadOnly<{
  ...PathProps,
  d?: string,
  opacity?: string | number
}>;

export type StrictReactDOMPatternProps = $ReadOnly<{
  ...TransformProps,
  children?: React.Node,
  height?: string | number,
  id?: ?string,
  patternContentUnits?: Units,
  patternTransform?: string,
  patternUnits?: Units,
  preserveAspectRatio?: string,
  viewBox?: string,
  width?: string | number,
  x?: string | number,
  y?: string | number
}>;

export type StrictReactDOMPolygonProps = $ReadOnly<{
  ...PathProps,
  opacity?: string | number,
  points?: string
}>;

export type StrictReactDOMPolylineProps = $ReadOnly<{
  ...PathProps,
  opacity?: string | number,
  points?: string
}>;

export type StrictReactDOMRadialGradientProps = $ReadOnly<{
  children?: React.Node,
  cx?: string | number,
  cy?: string | number,
  fx?: string | number,
  fy?: string | number,
  gradientTransform?: string,
  gradientUnits?: Units,
  id?: ?string,
  r?: string | number,
  rx?: string | number,
  ry?: string | number
}>;

export type StrictReactDOMRectProps = $ReadOnly<{
  ...PathProps,
  height?: string | number,
  opacity?: string | number,
  rx?: string | number,
  ry?: string | number,
  width?: string | number,
  x?: string | number,
  y?: string | number
}>;

export type StrictReactDOMStopProps = $ReadOnly<{
  offset?: string | number,
  stopColor?: string,
  stopOpacity?: string | number
}>;

export type StrictReactDOMSymbolProps = $ReadOnly<{
  children?: React.Node,
  id?: ?string,
  opacity?: string | number,
  preserveAspectRatio?: string,
  viewBox?: string
}>;

export type StrictReactDOMTSpanProps = $ReadOnly<{
  ...PathProps,
  ...FontProps,
  children?: React.Node,
  dx?: string | number,
  dy?: string | number,
  inlineSize?: string | number,
  rotate?: string | number,
  x?: string | number,
  y?: string | number
}>;

export type StrictReactDOMTextProps = $ReadOnly<{
  ...TextProps,
  children?: React.Node,
  dx?: string | number,
  dy?: string | number,
  inlineSize?: string | number,
  opacity?: string | number,
  rotate?: string | number,
  style?: ?Styles,
  x?: string | number,
  y?: string | number
}>;

export type StrictReactDOMTextPathProps = $ReadOnly<{
  ...TextProps,
  children?: React.Node,
  href?: string,
  method?: 'align' | 'stretch',
  midLine?: 'sharp' | 'smooth',
  side?: string,
  spacing?: 'auto' | 'exact',
  startOffset?: string | number,
  xlinkHref?: string
}>;

export type StrictReactDOMUseProps = $ReadOnly<{
  ...PathProps,
  children?: React.Node,
  height?: string | number,
  href?: string,
  opacity?: string | number,
  width?: string | number,
  x?: string | number,
  xlinkHref?: string,
  y?: string | number
}>;

export type StrictReactDOMFeBlendProps = $ReadOnly<{
  in?: string,
  in2?: string,
  mode?: 'normal' | 'multiply' | 'screen' | 'darken' | 'lighten'
}>;

export type StrictReactDOMFeColorMatrixProps = $ReadOnly<{
  in?: string,
  type?: 'matrix' | 'saturate' | 'hueRotate' | 'luminanceToAlpha',
  values?: string
}>;

export type StrictReactDOMFeComponentTransferProps = $ReadOnly<{
  children?: React.Node,
  in?: string
}>;

export type StrictReactDOMFeFuncAProps = $ReadOnly<{
  amplitude?: string | number,
  exponent?: string | number,
  intercept?: string | number,
  offset?: string | number,
  slope?: string | number,
  tableValues?: string | number,
  type?: 'identity' | 'table' | 'discrete' | 'linear' | 'gamma'
}>;

export type StrictReactDOMFeFuncBProps = StrictReactDOMFeFuncAProps;

export type StrictReactDOMFeFuncGProps = StrictReactDOMFeFuncAProps;

export type StrictReactDOMFeFuncRProps = StrictReactDOMFeFuncAProps;

export type StrictReactDOMFeCompositeProps = $ReadOnly<{
  in?: string,
  in2?: string,
  k1?: string | number,
  k2?: string | number,
  k3?: string | number,
  k4?: string | number,
  operator?: 'over' | 'in' | 'out' | 'atop' | 'xor' | 'arithmetic'
}>;

export type StrictReactDOMFeConvolveMatrixProps = $ReadOnly<{
  bias?: string | number,
  divisor?: string | number,
  edgeMode?: 'duplicate' | 'wrap' | 'none',
  in?: string,
  kernelMatrix?: string | number,
  kernelUnitLength?: string | number,
  order?: string | number,
  preserveAlpha?: boolean | 'true' | 'false',
  targetX?: string | number,
  targetY?: string | number
}>;

export type StrictReactDOMFeDiffuseLightingProps = $ReadOnly<{
  diffuseConstant?: string | number,
  in?: string,
  kernelUnitLength?: string | number,
  surfaceScale?: string | number
}>;

export type StrictReactDOMFeDisplacementMapProps = $ReadOnly<{
  in?: string,
  in2?: string,
  scale?: string | number,
  xChannelSelector?: 'R' | 'G' | 'B' | 'A',
  yChannelSelector?: 'R' | 'G' | 'B' | 'A'
}>;

export type StrictReactDOMFeDistantLightProps = $ReadOnly<{
  azimuth?: string | number,
  elevation?: string | number
}>;

export type StrictReactDOMFeDropShadowProps = $ReadOnly<{
  dx?: string | number,
  dy?: string | number,
  floodColor?: string,
  floodOpacity?: string | number,
  in?: string,
  stdDeviation?: string | number
}>;

export type StrictReactDOMFeFloodProps = $ReadOnly<{
  floodColor?: string,
  floodOpacity?: string | number,
  in?: string
}>;

export type StrictReactDOMFeGaussianBlurProps = $ReadOnly<{
  edgeMode?: 'duplicate' | 'wrap' | 'none',
  in?: string,
  stdDeviation?: string | number
}>;

export type StrictReactDOMFeImageProps = $ReadOnly<{
  crossOrigin?: 'anonymous' | 'use-credentials' | '',
  href?: string,
  preserveAspectRatio?: string
}>;

export type StrictReactDOMFeMergeProps = $ReadOnly<{
  children?: React.Node
}>;

export type StrictReactDOMFeMergeNodeProps = $ReadOnly<{
  in?: string
}>;

export type StrictReactDOMFeMorphologyProps = $ReadOnly<{
  in?: string,
  operator?: 'erode' | 'dilate',
  radius?: string | number
}>;

export type StrictReactDOMFeOffsetProps = $ReadOnly<{
  dx?: string | number,
  dy?: string | number,
  in?: string
}>;

export type StrictReactDOMFePointLightProps = $ReadOnly<{
  x?: string | number,
  y?: string | number,
  z?: string | number
}>;

export type StrictReactDOMFeSpecularLightingProps = $ReadOnly<{
  in?: string,
  kernelUnitLength?: string | number,
  specularConstant?: string | number,
  specularExponent?: string | number,
  surfaceScale?: string | number
}>;

export type StrictReactDOMFeSpotLightProps = $ReadOnly<{
  limitingConeAngle?: string | number,
  pointsAtX?: string | number,
  pointsAtY?: string | number,
  pointsAtZ?: string | number,
  specularExponent?: string | number,
  x?: string | number,
  y?: string | number,
  z?: string | number
}>;

export type StrictReactDOMFeTileProps = $ReadOnly<{
  in?: string
}>;

export type StrictReactDOMFeTurbulenceProps = $ReadOnly<{
  baseFrequency?: string | number,
  numOctaves?: string | number,
  seed?: string | number,
  stitchTiles?: 'stitch' | 'noStitch',
  type?: 'fractalNoise' | 'turbulence'
}>;

export type StrictReactDOMFilterProps = $ReadOnly<{
  children?: React.Node,
  filterUnits?: Units,
  height?: string | number,
  id?: ?string,
  primitiveUnits?: Units,
  width?: string | number,
  x?: string | number,
  y?: string | number
}>;
