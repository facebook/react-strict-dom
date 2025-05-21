/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import type { StrictSvgProps } from '../../types/StrictSvgProps';

import * as React from 'react';
import { Animated } from 'react-native';
import {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  FeBlend,
  FeColorMatrix,
  FeComponentTransfer,
  FeComposite,
  FeConvolveMatrix,
  FeDiffuseLighting,
  FeDisplacementMap,
  FeDistantLight,
  FeDropShadow,
  FeFlood,
  FeFuncA,
  FeFuncB,
  FeFuncG,
  FeFuncR,
  FeGaussianBlur,
  FeImage,
  FeMerge,
  FeMergeNode,
  FeMorphology,
  FeOffset,
  FePointLight,
  FeSpecularLighting,
  FeSpotLight,
  FeTile,
  FeTurbulence,
  Filter,
  ForeignObject,
  G,
  Image,
  Line,
  LinearGradient,
  Marker,
  Mask,
  Path,
  Pattern,
  Polygon,
  Polyline,
  RadialGradient,
  Rect,
  Stop,
  Svg,
  Symbol,
  Text,
  TextPath,
  TSpan,
  Use
} from 'react-native-svg';
import { mergeRefs } from '../../shared/mergeRefs';
import { useNativeProps } from './useNativeProps';
import { useStrictDOMElement } from './useStrictDOMElement';
import * as stylex from '../stylex';

const RE_CAPTURE_VAR_NAME = /^var\(--(.*)\)$/;

const nativeComponents: $ReadOnly<{
  [string]: React.AbstractComponent<empty, mixed>
}> = {
  circle: Circle,
  clipPath: ClipPath,
  defs: Defs,
  ellipse: Ellipse,
  feBlend: FeBlend,
  feColorMatrix: FeColorMatrix,
  feComponentTransfer: FeComponentTransfer,
  feComposite: FeComposite,
  feConvolveMatrix: FeConvolveMatrix,
  feDiffuseLighting: FeDiffuseLighting,
  feDisplacementMap: FeDisplacementMap,
  feDistantLight: FeDistantLight,
  feDropShadow: FeDropShadow,
  feFlood: FeFlood,
  feFuncA: FeFuncA,
  feFuncB: FeFuncB,
  feFuncG: FeFuncG,
  feFuncR: FeFuncR,
  feGaussianBlur: FeGaussianBlur,
  feImage: FeImage,
  feMerge: FeMerge,
  feMergeNode: FeMergeNode,
  feMorphology: FeMorphology,
  feOffset: FeOffset,
  fePointLight: FePointLight,
  feSpecularLighting: FeSpecularLighting,
  feSpotLight: FeSpotLight,
  feTile: FeTile,
  feTurbulence: FeTurbulence,
  filter: Filter,
  foreignObject: ForeignObject,
  g: G,
  image: Image,
  line: Line,
  linearGradient: LinearGradient,
  marker: Marker,
  mask: Mask,
  path: Path,
  pattern: Pattern,
  polygon: Polygon,
  polyline: Polyline,
  radialGradient: RadialGradient,
  rect: Rect,
  stop: Stop,
  svg: Svg,
  symbol: Symbol,
  text: Text,
  textPath: TextPath,
  tspan: TSpan,
  use: Use
};

export function createStrictDOMSvgComponent<P: StrictSvgProps, T>(
  tagName: string,
  _defaultProps?: P
): component(ref?: React.RefSetter<T>, ...P) {
  const component: React.AbstractComponent<P, T> = React.forwardRef(
    function (props, forwardedRef) {
      let NativeComponent = nativeComponents[tagName];
      const elementRef = useStrictDOMElement<T>({ tagName });

      const {
        alignmentBaseline,
        amplitude,
        azimuth,
        baseFrequency,
        baselineShift,
        bias,
        clipPath,
        clipRule,
        color,
        crossOrigin,
        cx,
        cy,
        d,
        diffuseConstant,
        divisor,
        dx,
        dy,
        edgeMode,
        elevation,
        exponent,
        fill,
        fillOpacity,
        fillRule,
        filter,
        filterUnits,
        floodColor,
        floodOpacity,
        fontFamily,
        fontFeatureSettings,
        fontSize,
        fontStyle,
        fontVariant,
        fontWeight,
        fx,
        fy,
        gradientTransform,
        gradientUnits,
        height,
        in: _in,
        in2,
        inlineSize,
        intercept,
        k1,
        k2,
        k3,
        k4,
        kernelMatrix,
        kernelUnitLength,
        kerning,
        lengthAdjust,
        letterSpacing,
        limitingConeAngle,
        marker,
        markerEnd,
        markerHeight,
        markerMid,
        markerStart,
        markerUnits,
        markerWidth,
        mask,
        maskContentUnits,
        maskType,
        maskUnits,
        method,
        midLine,
        mode,
        numOctaves,
        offset,
        onLoad,
        opacity,
        operator,
        order,
        orient,
        patternContentUnits,
        patternTransform,
        patternUnits,
        points,
        pointsAtX,
        pointsAtY,
        pointsAtZ,
        preserveAlpha,
        preserveAspectRatio,
        primitiveUnits,
        r,
        radius,
        refX,
        refY,
        rotate,
        rx,
        ry,
        scale,
        seed,
        side,
        slope,
        spacing,
        specularConstant,
        specularExponent,
        startOffset,
        stdDeviation,
        stitchTiles,
        stopColor,
        stopOpacity,
        stroke,
        strokeDasharray,
        strokeDashoffset,
        strokeLinecap,
        strokeLinejoin,
        strokeMiterlimit,
        strokeOpacity,
        strokeWidth,
        surfaceScale,
        tableValues,
        targetX,
        targetY,
        textAnchor,
        textDecoration,
        textLength,
        title,
        transform,
        transformOrigin,
        values,
        vectorEffect,
        verticalAlign,
        viewBox,
        width,
        wordSpacing,
        x,
        x1,
        x2,
        xChannelSelector,
        xlinkHref,
        xmlns,
        xmlnsXlink,
        y,
        y1,
        y2,
        yChannelSelector,
        z
      } = props;

      /**
       * Resolve global SVG and style props
       */

      const defaultProps = {
        style: [
          _defaultProps?.style,
          typeof height === 'number' &&
            typeof width === 'number' &&
            styles.aspectRatio(width, height)
        ]
      };

      const { customProperties, nativeProps } = useNativeProps(
        defaultProps,
        // $FlowFixMe
        props,
        {
          provideInheritableStyle: false,
          withInheritedStyle: false,
          withTextStyle: false
        }
      );

      // Tag-specific props

      if (alignmentBaseline != null) {
        // $FlowFixMe
        nativeProps.alignmentBaseline = alignmentBaseline;
      }
      if (amplitude != null) {
        // $FlowFixMe
        nativeProps.amplitude = amplitude;
      }
      if (azimuth != null) {
        // $FlowFixMe
        nativeProps.azimuth = azimuth;
      }
      if (baseFrequency != null) {
        // $FlowFixMe
        nativeProps.baseFrequency = baseFrequency;
      }
      if (baselineShift != null) {
        // $FlowFixMe
        nativeProps.baselineShift = baselineShift;
      }
      if (bias != null) {
        // $FlowFixMe
        nativeProps.bias = bias;
      }
      if (clipPath != null) {
        // $FlowFixMe
        nativeProps.clipPath = clipPath;
      }
      if (clipRule != null) {
        // $FlowFixMe
        nativeProps.clipRule = clipRule;
      }
      if (color != null) {
        // $FlowFixMe
        nativeProps.color = color.startsWith('var(')
          ? customProperties?.[color.replace(RE_CAPTURE_VAR_NAME, '$1')]
          : color;
      }
      if (crossOrigin != null) {
        // $FlowFixMe
        nativeProps.crossOrigin = crossOrigin;
      }
      if (cx != null) {
        // $FlowFixMe
        nativeProps.cx = cx;
      }
      if (cy != null) {
        // $FlowFixMe
        nativeProps.cy = cy;
      }
      if (d != null) {
        // $FlowFixMe
        nativeProps.d = d;
      }
      if (diffuseConstant != null) {
        // $FlowFixMe
        nativeProps.diffuseConstant = diffuseConstant;
      }
      if (divisor != null) {
        // $FlowFixMe
        nativeProps.divisor = divisor;
      }
      if (dx != null) {
        // $FlowFixMe
        nativeProps.dx = dx;
      }
      if (dy != null) {
        // $FlowFixMe
        nativeProps.dy = dy;
      }
      if (edgeMode != null) {
        // $FlowFixMe
        nativeProps.edgeMode = edgeMode;
      }
      if (elevation != null) {
        // $FlowFixMe
        nativeProps.elevation = elevation;
      }
      if (exponent != null) {
        // $FlowFixMe
        nativeProps.exponent = exponent;
      }
      if (fill != null) {
        // $FlowFixMe
        nativeProps.fill = fill.startsWith('var(')
          ? customProperties?.[fill.replace(RE_CAPTURE_VAR_NAME, '$1')]
          : fill;
      }
      if (fillOpacity != null) {
        // $FlowFixMe
        nativeProps.fillOpacity = fillOpacity;
      }
      if (fillRule != null) {
        // $FlowFixMe
        nativeProps.fillRule = fillRule;
      }
      if (filter != null) {
        // $FlowFixMe
        nativeProps.filter = filter;
      }
      if (filterUnits != null) {
        // $FlowFixMe
        nativeProps.filterUnits = filterUnits;
      }
      if (floodColor != null) {
        // $FlowFixMe
        nativeProps.floodColor = floodColor;
      }
      if (floodOpacity != null) {
        // $FlowFixMe
        nativeProps.floodOpacity = floodOpacity;
      }
      if (fontFamily != null) {
        // $FlowFixMe
        nativeProps.fontFamily = fontFamily;
      }
      if (fontFeatureSettings != null) {
        // $FlowFixMe
        nativeProps.fontFeatureSettings = fontFeatureSettings;
      }
      if (fontSize != null) {
        // $FlowFixMe
        nativeProps.fontSize = fontSize;
      }
      if (fontStyle != null) {
        // $FlowFixMe
        nativeProps.fontStyle = fontStyle;
      }
      if (fontVariant != null) {
        // $FlowFixMe
        nativeProps.fontVariant = fontVariant;
      }
      if (fontWeight != null) {
        // $FlowFixMe
        nativeProps.fontWeight = fontWeight;
      }
      if (fx != null) {
        // $FlowFixMe
        nativeProps.fx = fx;
      }
      if (fy != null) {
        // $FlowFixMe
        nativeProps.fy = fy;
      }
      if (gradientTransform != null) {
        // $FlowFixMe
        nativeProps.gradientTransform = gradientTransform;
      }
      if (gradientUnits != null) {
        // $FlowFixMe
        nativeProps.gradientUnits = gradientUnits;
      }
      if (height != null) {
        // $FlowFixMe
        nativeProps.height = height;
      }
      if (_in != null) {
        // $FlowFixMe
        nativeProps.in = _in;
      }
      if (in2 != null) {
        // $FlowFixMe
        nativeProps.in2 = in2;
      }
      if (inlineSize != null) {
        // $FlowFixMe
        nativeProps.inlineSize = inlineSize;
      }
      if (intercept != null) {
        // $FlowFixMe
        nativeProps.intercept = intercept;
      }
      if (k1 != null) {
        // $FlowFixMe
        nativeProps.k1 = k1;
      }
      if (k2 != null) {
        // $FlowFixMe
        nativeProps.k2 = k2;
      }
      if (k3 != null) {
        // $FlowFixMe
        nativeProps.k3 = k3;
      }
      if (k4 != null) {
        // $FlowFixMe
        nativeProps.k4 = k4;
      }
      if (kernelMatrix != null) {
        // $FlowFixMe
        nativeProps.kernelMatrix = kernelMatrix;
      }
      if (kernelUnitLength != null) {
        // $FlowFixMe
        nativeProps.kernelUnitLength = kernelUnitLength;
      }
      if (kerning != null) {
        // $FlowFixMe
        nativeProps.kerning = kerning;
      }
      if (lengthAdjust != null) {
        // $FlowFixMe
        nativeProps.lengthAdjust = lengthAdjust;
      }
      if (letterSpacing != null) {
        // $FlowFixMe
        nativeProps.letterSpacing = letterSpacing;
      }
      if (limitingConeAngle != null) {
        // $FlowFixMe
        nativeProps.limitingConeAngle = limitingConeAngle;
      }
      if (marker != null) {
        // $FlowFixMe
        nativeProps.marker = marker;
      }
      if (markerEnd != null) {
        // $FlowFixMe
        nativeProps.markerEnd = markerEnd;
      }
      if (markerHeight != null) {
        // $FlowFixMe
        nativeProps.markerHeight = markerHeight;
      }
      if (markerMid != null) {
        // $FlowFixMe
        nativeProps.markerMid = markerMid;
      }
      if (markerStart != null) {
        // $FlowFixMe
        nativeProps.markerStart = markerStart;
      }
      if (markerUnits != null) {
        // $FlowFixMe
        nativeProps.markerUnits = markerUnits;
      }
      if (markerWidth != null) {
        // $FlowFixMe
        nativeProps.markerWidth = markerWidth;
      }
      if (mask != null) {
        // $FlowFixMe
        nativeProps.mask = mask;
      }
      if (maskContentUnits != null) {
        // $FlowFixMe
        nativeProps.maskContentUnits = maskContentUnits;
      }
      if (maskType != null) {
        // $FlowFixMe
        nativeProps.maskType = maskType;
      }
      if (maskUnits != null) {
        // $FlowFixMe
        nativeProps.maskUnits = maskUnits;
      }
      if (method != null) {
        // $FlowFixMe
        nativeProps.method = method;
      }
      if (midLine != null) {
        // $FlowFixMe
        nativeProps.midLine = midLine;
      }
      if (mode != null) {
        // $FlowFixMe
        nativeProps.mode = mode;
      }
      if (numOctaves != null) {
        // $FlowFixMe
        nativeProps.numOctaves = numOctaves;
      }
      if (offset != null) {
        // $FlowFixMe
        nativeProps.offset = offset;
      }
      if (onLoad != null) {
        // $FlowFixMe
        nativeProps.onLoad = onLoad;
      }
      if (opacity != null) {
        // $FlowFixMe
        nativeProps.opacity = opacity;
      }
      if (operator != null) {
        // $FlowFixMe
        nativeProps.operator = operator;
      }
      if (order != null) {
        // $FlowFixMe
        nativeProps.order = order;
      }
      if (orient != null) {
        // $FlowFixMe
        nativeProps.orient = orient;
      }
      if (patternContentUnits != null) {
        // $FlowFixMe
        nativeProps.patternContentUnits = patternContentUnits;
      }
      if (patternTransform != null) {
        // $FlowFixMe
        nativeProps.patternTransform = patternTransform;
      }
      if (patternUnits != null) {
        // $FlowFixMe
        nativeProps.patternUnits = patternUnits;
      }
      if (points != null) {
        // $FlowFixMe
        nativeProps.points = points;
      }
      if (pointsAtX != null) {
        // $FlowFixMe
        nativeProps.pointsAtX = pointsAtX;
      }
      if (pointsAtY != null) {
        // $FlowFixMe
        nativeProps.pointsAtY = pointsAtY;
      }
      if (pointsAtZ != null) {
        // $FlowFixMe
        nativeProps.pointsAtZ = pointsAtZ;
      }
      if (preserveAlpha != null) {
        // $FlowFixMe
        nativeProps.preserveAlpha = preserveAlpha;
      }
      if (preserveAspectRatio != null) {
        // $FlowFixMe
        nativeProps.preserveAspectRatio = preserveAspectRatio;
      }
      if (primitiveUnits != null) {
        // $FlowFixMe
        nativeProps.primitiveUnits = primitiveUnits;
      }
      if (r != null) {
        // $FlowFixMe
        nativeProps.r = r;
      }
      if (radius != null) {
        // $FlowFixMe
        nativeProps.radius = radius;
      }
      if (refX != null) {
        // $FlowFixMe
        nativeProps.refX = refX;
      }
      if (refY != null) {
        // $FlowFixMe
        nativeProps.refY = refY;
      }
      if (rotate != null) {
        // $FlowFixMe
        nativeProps.rotate = rotate;
      }
      if (rx != null) {
        // $FlowFixMe
        nativeProps.rx = rx;
      }
      if (ry != null) {
        // $FlowFixMe
        nativeProps.ry = ry;
      }
      if (scale != null) {
        // $FlowFixMe
        nativeProps.scale = scale;
      }
      if (seed != null) {
        // $FlowFixMe
        nativeProps.seed = seed;
      }
      if (side != null) {
        // $FlowFixMe
        nativeProps.side = side;
      }
      if (slope != null) {
        // $FlowFixMe
        nativeProps.slope = slope;
      }
      if (spacing != null) {
        // $FlowFixMe
        nativeProps.spacing = spacing;
      }
      if (specularConstant != null) {
        // $FlowFixMe
        nativeProps.specularConstant = specularConstant;
      }
      if (specularExponent != null) {
        // $FlowFixMe
        nativeProps.specularExponent = specularExponent;
      }
      if (startOffset != null) {
        // $FlowFixMe
        nativeProps.startOffset = startOffset;
      }
      if (stdDeviation != null) {
        // $FlowFixMe
        nativeProps.stdDeviation = stdDeviation;
      }
      if (stitchTiles != null) {
        // $FlowFixMe
        nativeProps.stitchTiles = stitchTiles;
      }
      if (stopColor != null) {
        // $FlowFixMe
        nativeProps.stopColor = stopColor;
      }
      if (stopOpacity != null) {
        // $FlowFixMe
        nativeProps.stopOpacity = stopOpacity;
      }
      if (stroke != null) {
        // $FlowFixMe
        nativeProps.stroke = stroke.startsWith('var(')
          ? customProperties?.[stroke.replace(RE_CAPTURE_VAR_NAME, '$1')]
          : stroke;
      }
      if (strokeDasharray != null) {
        // $FlowFixMe
        nativeProps.strokeDasharray = strokeDasharray;
      }
      if (strokeDashoffset != null) {
        // $FlowFixMe
        nativeProps.strokeDashoffset = strokeDashoffset;
      }
      if (strokeLinecap != null) {
        // $FlowFixMe
        nativeProps.strokeLinecap = strokeLinecap;
      }
      if (strokeLinejoin != null) {
        // $FlowFixMe
        nativeProps.strokeLinejoin = strokeLinejoin;
      }
      if (strokeMiterlimit != null) {
        // $FlowFixMe
        nativeProps.strokeMiterlimit = strokeMiterlimit;
      }
      if (strokeOpacity != null) {
        // $FlowFixMe
        nativeProps.strokeOpacity = strokeOpacity;
      }
      if (strokeWidth != null) {
        // $FlowFixMe
        nativeProps.strokeWidth = strokeWidth;
      }
      if (surfaceScale != null) {
        // $FlowFixMe
        nativeProps.surfaceScale = surfaceScale;
      }
      if (tableValues != null) {
        // $FlowFixMe
        nativeProps.tableValues = tableValues;
      }
      if (targetX != null) {
        // $FlowFixMe
        nativeProps.targetX = targetX;
      }
      if (targetY != null) {
        // $FlowFixMe
        nativeProps.targetY = targetY;
      }
      if (textAnchor != null) {
        // $FlowFixMe
        nativeProps.textAnchor = textAnchor;
      }
      if (textDecoration != null) {
        // $FlowFixMe
        nativeProps.textDecoration = textDecoration;
      }
      if (textLength != null) {
        // $FlowFixMe
        nativeProps.textLength = textLength;
      }
      if (title != null) {
        // $FlowFixMe
        nativeProps.title = title;
      }
      if (transform != null) {
        // $FlowFixMe
        nativeProps.transform = transform;
      }
      if (transformOrigin != null) {
        // $FlowFixMe
        nativeProps.origin = transformOrigin;
      }
      if (values != null) {
        // $FlowFixMe
        nativeProps.values = values;
      }
      if (vectorEffect != null) {
        // $FlowFixMe
        nativeProps.vectorEffect = vectorEffect;
      }
      if (verticalAlign != null) {
        // $FlowFixMe
        nativeProps.verticalAlign = verticalAlign;
      }
      if (viewBox != null) {
        // $FlowFixMe
        nativeProps.viewBox = viewBox;
      }
      if (width != null) {
        // $FlowFixMe
        nativeProps.width = width;
      }
      if (wordSpacing != null) {
        // $FlowFixMe
        nativeProps.wordSpacing = wordSpacing;
      }
      if (x != null) {
        // $FlowFixMe
        nativeProps.x = x;
      }
      if (x1 != null) {
        // $FlowFixMe
        nativeProps.x1 = x1;
      }
      if (x2 != null) {
        // $FlowFixMe
        nativeProps.x2 = x2;
      }
      if (xChannelSelector != null) {
        // $FlowFixMe
        nativeProps.xChannelSelector = xChannelSelector;
      }
      if (xlinkHref != null) {
        // $FlowFixMe
        nativeProps.xlinkHref = xlinkHref;
      }
      if (xmlns != null) {
        // $FlowFixMe
        nativeProps.xmlns = xmlns;
      }
      if (xmlnsXlink != null) {
        // $FlowFixMe
        nativeProps.xmlnsXlink = xmlnsXlink;
      }
      if (y != null) {
        // $FlowFixMe
        nativeProps.y = y;
      }
      if (y1 != null) {
        // $FlowFixMe
        nativeProps.y1 = y1;
      }
      if (y2 != null) {
        // $FlowFixMe
        nativeProps.y2 = y2;
      }
      if (yChannelSelector != null) {
        // $FlowFixMe
        nativeProps.yChannelSelector = yChannelSelector;
      }
      if (z != null) {
        // $FlowFixMe
        nativeProps.z = z;
      }

      // Component-specific props

      nativeProps.ref = React.useMemo(
        () => mergeRefs(elementRef, forwardedRef),
        [elementRef, forwardedRef]
      );

      // Use Animated components if necessary
      if (nativeProps.animated === true) {
        NativeComponent = Animated.createAnimatedComponent(NativeComponent);
      }

      const element: React.Node =
        typeof props.children === 'function' ? (
          props.children(nativeProps)
        ) : (
          // $FlowFixMe
          <NativeComponent {...nativeProps} />
        );

      return element;
    }
  );

  component.displayName = `svg.${tagName}`;
  return component;
}

const styles = stylex.create({
  aspectRatio: (width: number, height: number) => ({
    aspectRatio: width / height,
    width,
    height
  })
});
