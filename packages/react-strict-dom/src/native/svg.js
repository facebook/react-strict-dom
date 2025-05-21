/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

import type {
  StrictReactDOMCircleProps,
  StrictReactDOMClipPathProps,
  StrictReactDOMDefsProps,
  StrictReactDOMEllipseProps,
  StrictReactDOMFeBlendProps,
  StrictReactDOMFeColorMatrixProps,
  StrictReactDOMFeComponentTransferProps,
  StrictReactDOMFeCompositeProps,
  StrictReactDOMFeConvolveMatrixProps,
  StrictReactDOMFeDiffuseLightingProps,
  StrictReactDOMFeDisplacementMapProps,
  StrictReactDOMFeDistantLightProps,
  StrictReactDOMFeDropShadowProps,
  StrictReactDOMFeFloodProps,
  StrictReactDOMFeFuncAProps,
  StrictReactDOMFeFuncBProps,
  StrictReactDOMFeFuncGProps,
  StrictReactDOMFeFuncRProps,
  StrictReactDOMFeGaussianBlurProps,
  StrictReactDOMFeImageProps,
  StrictReactDOMFeMergeNodeProps,
  StrictReactDOMFeMergeProps,
  StrictReactDOMFeMorphologyProps,
  StrictReactDOMFeOffsetProps,
  StrictReactDOMFePointLightProps,
  StrictReactDOMFeSpecularLightingProps,
  StrictReactDOMFeSpotLightProps,
  StrictReactDOMFeTileProps,
  StrictReactDOMFeTurbulenceProps,
  StrictReactDOMFilterProps,
  StrictReactDOMForeignObjectProps,
  StrictReactDOMGProps,
  StrictReactDOMImageProps,
  StrictReactDOMLinearGradientProps,
  StrictReactDOMLineProps,
  StrictReactDOMMarkerProps,
  StrictReactDOMMaskProps,
  StrictReactDOMPathProps,
  StrictReactDOMPatternProps,
  StrictReactDOMPolygonProps,
  StrictReactDOMPolylineProps,
  StrictReactDOMRadialGradientProps,
  StrictReactDOMRectProps,
  StrictReactDOMStopProps,
  StrictReactDOMSvgProps,
  StrictReactDOMSymbolProps,
  StrictReactDOMTextPathProps,
  StrictReactDOMTextProps,
  StrictReactDOMTSpanProps,
  StrictReactDOMUseProps
} from '../types/StrictReactDOMSvgProps';

// $FlowFixMe[nonstrict-import]
import { createStrictDOMSvgComponent as createStrictSvg } from './modules/createStrictDOMSvgComponent';

/**
 * "circle"
 */
export const circle: component(
  ref?: React.RefSetter<SVGCircleElement>,
  ...StrictReactDOMCircleProps
) = createStrictSvg('circle');

/**
 * "clipPath"
 */
export const clipPath: component(
  ref?: React.RefSetter<SVGClipPathElement>,
  ...StrictReactDOMClipPathProps
) = createStrictSvg('clipPath');

/**
 * "defs"
 */
export const defs: component(
  ref?: React.RefSetter<SVGDefsElement>,
  ...StrictReactDOMDefsProps
) = createStrictSvg('defs');

/**
 * "ellipse"
 */
export const ellipse: component(
  ref?: React.RefSetter<SVGEllipseElement>,
  ...StrictReactDOMEllipseProps
) = createStrictSvg('ellipse');

/**
 * "feBlend"
 */
export const feBlend: component(
  ref?: React.RefSetter<SVGFEBlendElement>,
  ...StrictReactDOMFeBlendProps
) = createStrictSvg('feBlend');

/**
 * "feColorMatrix"
 */
export const feColorMatrix: component(
  ref?: React.RefSetter<SVGFEColorMatrixElement>,
  ...StrictReactDOMFeColorMatrixProps
) = createStrictSvg('feColorMatrix');

/**
 * "feComponentTransfer"
 */
export const feComponentTransfer: component(
  ref?: React.RefSetter<SVGFEComponentTransferElement>,
  ...StrictReactDOMFeComponentTransferProps
) = createStrictSvg('feComponentTransfer');

/**
 * "feFuncA"
 */
export const feFuncA: component(
  ref?: React.RefSetter<SVGFEFuncAElement>,
  ...StrictReactDOMFeFuncAProps
) = createStrictSvg('feFuncA');

/**
 * "feFuncB"
 */
export const feFuncB: component(
  ref?: React.RefSetter<SVGFEFuncBElement>,
  ...StrictReactDOMFeFuncBProps
) = createStrictSvg('feFuncB');

/**
 * "feFuncG"
 */
export const feFuncG: component(
  ref?: React.RefSetter<SVGFEFuncGElement>,
  ...StrictReactDOMFeFuncGProps
) = createStrictSvg('feFuncG');

/**
 * "feFuncR"
 */
export const feFuncR: component(
  ref?: React.RefSetter<SVGFEFuncRElement>,
  ...StrictReactDOMFeFuncRProps
) = createStrictSvg('feFuncR');

/**
 * "feComposite"
 */
export const feComposite: component(
  ref?: React.RefSetter<SVGFECompositeElement>,
  ...StrictReactDOMFeCompositeProps
) = createStrictSvg('feComposite');

/**
 * "feConvolveMatrix"
 */
export const feConvolveMatrix: component(
  ref?: React.RefSetter<SVGFEComponentTransferElement>,
  ...StrictReactDOMFeConvolveMatrixProps
) = createStrictSvg('feConvolveMatrix');

/**
 * "feDiffuseLighting"
 */
export const feDiffuseLighting: component(
  ref?: React.RefSetter<SVGFEDiffuseLightingElement>,
  ...StrictReactDOMFeDiffuseLightingProps
) = createStrictSvg('feDiffuseLighting');

/**
 * "feDisplacementMap"
 */
export const feDisplacementMap: component(
  ref?: React.RefSetter<SVGFEDisplacementMapElement>,
  ...StrictReactDOMFeDisplacementMapProps
) = createStrictSvg('feDisplacementMap');

/**
 * "feDistantLight"
 */
export const feDistantLight: component(
  ref?: React.RefSetter<SVGFEDistantLightElement>,
  ...StrictReactDOMFeDistantLightProps
) = createStrictSvg('feDistantLight');

/**
 * "feDropShadow"
 */
export const feDropShadow: component(
  ref?: React.RefSetter<SVGFEDropShadowElement>,
  ...StrictReactDOMFeDropShadowProps
) = createStrictSvg('feDropShadow');

/**
 * "feFlood"
 */
export const feFlood: component(
  ref?: React.RefSetter<SVGFEFloodElement>,
  ...StrictReactDOMFeFloodProps
) = createStrictSvg('feFlood');

/**
 * "feGaussianBlur"
 */
export const feGaussianBlur: component(
  ref?: React.RefSetter<SVGFEGaussianBlurElement>,
  ...StrictReactDOMFeGaussianBlurProps
) = createStrictSvg('feGaussianBlur');

/**
 * "feImage"
 */
export const feImage: component(
  ref?: React.RefSetter<SVGFEImageElement>,
  ...StrictReactDOMFeImageProps
) = createStrictSvg('feImage');

/**
 * "feMerge"
 */
export const feMerge: component(
  ref?: React.RefSetter<SVGFEMergeElement>,
  ...StrictReactDOMFeMergeProps
) = createStrictSvg('feMerge');

/**
 * "feMergeNode"
 */
export const feMergeNode: component(
  ref?: React.RefSetter<SVGFEMergeNodeElement>,
  ...StrictReactDOMFeMergeNodeProps
) = createStrictSvg('feMergeNode');

/**
 * "feMorphology"
 */
export const feMorphology: component(
  ref?: React.RefSetter<SVGFEMorphologyElement>,
  ...StrictReactDOMFeMorphologyProps
) = createStrictSvg('feMorphology');

/**
 * "feOffset"
 */
export const feOffset: component(
  ref?: React.RefSetter<SVGFEOffsetElement>,
  ...StrictReactDOMFeOffsetProps
) = createStrictSvg('feOffset');

/**
 * "fePointLight"
 */
export const fePointLight: component(
  ref?: React.RefSetter<SVGFEPointLightElement>,
  ...StrictReactDOMFePointLightProps
) = createStrictSvg('fePointLight');

/**
 * "feSpecularLighting"
 */
export const feSpecularLighting: component(
  ref?: React.RefSetter<SVGFESpecularLightingElement>,
  ...StrictReactDOMFeSpecularLightingProps
) = createStrictSvg('feSpecularLighting');

/**
 * "feSpotLight"
 */
export const feSpotLight: component(
  ref?: React.RefSetter<SVGFESpotLightElement>,
  ...StrictReactDOMFeSpotLightProps
) = createStrictSvg('feSpotLight');

/**
 * "feTile"
 */
export const feTile: component(
  ref?: React.RefSetter<SVGFETileElement>,
  ...StrictReactDOMFeTileProps
) = createStrictSvg('feTile');

/**
 * "feTurbulence"
 */
export const feTurbulence: component(
  ref?: React.RefSetter<SVGFETurbulenceElement>,
  ...StrictReactDOMFeTurbulenceProps
) = createStrictSvg('feTurbulence');

/**
 * "filter"
 */
export const filter: component(
  ref?: React.RefSetter<SVGFilterElement>,
  ...StrictReactDOMFilterProps
) = createStrictSvg('filter');

/**
 * "foreignObject"
 */
export const foreignObject: component(
  ref?: React.RefSetter<SVGForeignObjectElement>,
  ...StrictReactDOMForeignObjectProps
) = createStrictSvg('foreignObject');

/**
 * "g"
 */
export const g: component(
  ref?: React.RefSetter<SVGGElement>,
  ...StrictReactDOMGProps
) = createStrictSvg('g');

/**
 * "image"
 */
export const image: component(
  ref?: React.RefSetter<SVGImageElement>,
  ...StrictReactDOMImageProps
) = createStrictSvg('image');

/**
 * "line"
 */
export const line: component(
  ref?: React.RefSetter<SVGLineElement>,
  ...StrictReactDOMLineProps
) = createStrictSvg('line');

/**
 * "linearGradient"
 */
export const linearGradient: component(
  ref?: React.RefSetter<SVGLinearGradientElement>,
  ...StrictReactDOMLinearGradientProps
) = createStrictSvg('linearGradient');

/**
 * "marker"
 */
export const marker: component(
  ref?: React.RefSetter<SVGMarkerElement>,
  ...StrictReactDOMMarkerProps
) = createStrictSvg('marker');

/**
 * "mask"
 */
export const mask: component(
  ref?: React.RefSetter<SVGMaskElement>,
  ...StrictReactDOMMaskProps
) = createStrictSvg('mask');

/**
 * "path"
 */
export const path: component(
  ref?: React.RefSetter<SVGPathElement>,
  ...StrictReactDOMPathProps
) = createStrictSvg('path');

/**
 * "pattern"
 */
export const pattern: component(
  ref?: React.RefSetter<SVGPatternElement>,
  ...StrictReactDOMPatternProps
) = createStrictSvg('pattern');

/**
 * "polygon"
 */
export const polygon: component(
  ref?: React.RefSetter<SVGPolygonElement>,
  ...StrictReactDOMPolygonProps
) = createStrictSvg('polygon');

/**
 * "polyline"
 */
export const polyline: component(
  ref?: React.RefSetter<SVGPolylineElement>,
  ...StrictReactDOMPolylineProps
) = createStrictSvg('polyline');

/**
 * "radialGradient"
 */
export const radialGradient: component(
  ref?: React.RefSetter<SVGRadialGradientElement>,
  ...StrictReactDOMRadialGradientProps
) = createStrictSvg('radialGradient');

/**
 * "rect"
 */
export const rect: component(
  ref?: React.RefSetter<SVGRectElement>,
  ...StrictReactDOMRectProps
) = createStrictSvg('rect');

/**
 * "stop"
 */
export const stop: component(
  ref?: React.RefSetter<SVGStopElement>,
  ...StrictReactDOMStopProps
) = createStrictSvg('stop');

/**
 * "svg" (inline)
 */
export const svg: component(
  ref?: React.RefSetter<HTMLElement>,
  ...StrictReactDOMSvgProps
) = createStrictSvg('svg');

/**
 * "symbol"
 */
export const symbol: component(
  ref?: React.RefSetter<SVGSymbolElement>,
  ...StrictReactDOMSymbolProps
) = createStrictSvg('symbol');

/**
 * "tspan"
 */
export const tspan: component(
  ref?: React.RefSetter<SVGTSpanElement>,
  ...StrictReactDOMTSpanProps
) = createStrictSvg('tSpan');

/**
 * "text"
 */
export const text: component(
  ref?: React.RefSetter<SVGTextElement>,
  ...StrictReactDOMTextProps
) = createStrictSvg('text');

/**
 * "textPath"
 */
export const textPath: component(
  ref?: React.RefSetter<SVGTextPathElement>,
  ...StrictReactDOMTextPathProps
) = createStrictSvg('textPath');

/**
 * "use"
 */
export const use: component(
  ref?: React.RefSetter<SVGUseElement>,
  ...StrictReactDOMUseProps
) = createStrictSvg('use');
