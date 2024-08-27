# css

<p className="text-xl">React Strict DOM provides a built-in way to create and use styles, variables, and themes.</p>

## Overview

Styles are defined in JavaScript using a strict subset of CSS capabilities. Defining and using styles requires only local knowledge within a component. To learn more about each of the `css` functions, please refer to the guides below.

* [css.create](/api/css/create)
* [css.createTheme](/api/css/createTheme)
* [css.defineVars](/api/css/defineVars)
* [css.firstThatWorks](/api/css/firstThatWorks)
<!-- * [css.keyframes](/api/css/keyframes) - How to declare animation keyframes. -->

## Compatibility

The following tables represent the compatibility status of the strict CSS API for cross-platform React development with React Strict DOM. All the APIs listed below are considered supported on Web.

<p>
✅ = React Native built-in support<br />
🟡 = Polyfilled in JavaScript<br />
❌ = No support
</p>

| APIs | Android | iOS | Issue # |
| ---- | ---- | ---- | ---- |
| css.create() | 🟡 | 🟡 | |
| css.createTheme() | 🟡 | 🟡 | |
| css.defineVars() | 🟡 | 🟡 | |
| css.firstThatWorks() | 🟡 | 🟡 | |
<!-- | css.keyframes() | ❌ | ❌ | [#3](https://github.com/facebook/react-strict-dom/issues/3) | -->

| States | Android | iOS | Issue # |
| ---- | ---- | ---- | ---- |
| `:active` | 🟡 | 🟡 | |
| `:focus` | 🟡 | 🟡 | |
| `:hover` | 🟡 | 🟡 | |
| `::placeholder` | 🟡 | 🟡 | |
| `@media` | 🟡 | 🟡 | |

| Values | Android | iOS | Issue # |
| ---- | ---- | ---- | ---- |
| `%` units | ✅ | ✅ | |
| calc() | ❌ | ❌ | |
| clamp() | ❌ | ❌ | |
| `em` units | 🟡 | 🟡 | |
| max() | ❌ | ❌ | |
| min() | ❌ | ❌ | |
| minmax() | ❌ | ❌ | |
| `inherit` | 🟡 Partial | 🟡 Partial | |
| `px` units | 🟡 | 🟡 | |
| `rem` units | 🟡 | 🟡 | |
| `unset` | 🟡 Partial | 🟡 Partial | |
| url() | ❌ | ❌ | |
| `v*` units | 🟡 | 🟡 | |

| Properties | Android | iOS | Issue # |
| ---- | ---- | ---- | ---- |
| Custom Properties | 🟡 | 🟡 | |
| alignContent | ✅ | ✅ | |
| alignItems | ✅ | ✅ | |
| alignSelf | ✅ | ✅ | |
| animationDelay | ❌ | ❌ | [#3](https://github.com/facebook/react-strict-dom/issues/3) |
| animationDirection | ❌ | ❌ | [#3](https://github.com/facebook/react-strict-dom/issues/3) |
| animationDuration | ❌ | ❌ | [#3](https://github.com/facebook/react-strict-dom/issues/3) |
| animationFillMode | ❌ | ❌ | [#3](https://github.com/facebook/react-strict-dom/issues/3) |
| animationIterationCount | ❌ | ❌ | [#3](https://github.com/facebook/react-strict-dom/issues/3) |
| animationName | ❌ | ❌ | [#3](https://github.com/facebook/react-strict-dom/issues/3) |
| animationPlayState | ❌ | ❌ | [#3](https://github.com/facebook/react-strict-dom/issues/3) |
| animationTimingFunction | ❌ | ❌ | [#3](https://github.com/facebook/react-strict-dom/issues/3) |
| aspectRatio (string) | 🟡 | 🟡 | |
| backdropFilter | ❌ | ❌ | |
| backfaceVisibility | ✅ | ✅ | |
| backgroundColor | ✅ | ✅ | |
| backgroundImage | ❌ | ❌ | |
| backgroundOrigin | ❌ | ❌ | |
| backgroundPosition | ❌ | ❌ | |
| backgroundRepeat | ❌ | ❌ | |
| backgroundSize | ❌ | ❌ | |
| blockSize | 🟡 | 🟡 | |
| borderBlockColor | 🟡 | 🟡 | |
| borderBlockEndColor | 🟡 | 🟡 | |
| borderBlockEndStyle | 🟡 | 🟡 | |
| borderBlockEndWidth | 🟡 | 🟡 | |
| borderBlockStartColor | 🟡 | 🟡 | |
| borderBlockStartStyle | 🟡 | 🟡 | |
| borderBlockStartWidth | 🟡 | 🟡 | |
| borderBlockStyle | 🟡 | 🟡 | |
| borderBlockWidth | 🟡 | 🟡 | |
| borderBottomColor | ✅ | ✅ | |
| borderBottomLeftRadius | ✅ | ✅ | |
| borderBottomRightRadius | ✅ | ✅ | |
| borderBottomStyle | ✅ | ✅ | |
| borderBottomWidth | ✅ | ✅ | |
| borderColor | ✅ | ✅ | |
| borderEndEndRadius | 🟡 | 🟡 | |
| borderEndStartRadius | 🟡 | 🟡 | |
| borderInlineColor | 🟡 | 🟡 | |
| borderInlineEndColor | 🟡 | 🟡 | |
| borderInlineEndStyle | 🟡 | 🟡 | |
| borderInlineEndWidth | 🟡 | 🟡 | |
| borderInlineStartColor | 🟡 | 🟡 | |
| borderInlineStartStyle | 🟡 | 🟡 | |
| borderInlineStartWidth | 🟡 | 🟡 | |
| borderInlineStyle | 🟡 | 🟡 | |
| borderInlineWidth | 🟡 | 🟡 | |
| borderLeftColor | ✅ | ✅ | |
| borderLeftStyle | ✅ | ✅ | |
| borderLeftWidth | ✅ | ✅ | |
| borderRadius | ✅ | ✅ | |
| borderRadius % values | ❌ | ❌ | |
| borderRightColor | ✅ | ✅ | |
| borderRightStyle | ✅ | ✅ | |
| borderRightWidth | ✅ | ✅ | |
| borderStartEndRadius | 🟡 | 🟡 | |
| borderStartStartRadius | 🟡 | 🟡 | |
| borderStyle | ✅ | ✅ | |
| borderTopColor | ✅ | ✅ | |
| borderTopLeftRadius | ✅ | ✅ | |
| borderTopRightRadius | ✅ | ✅ | |
| borderTopStyle | ✅ | ✅ | |
| borderTopWidth | ✅ | ✅ | |
| borderWidth | ✅ | ✅ | |
| bottom | ✅ | ✅ | |
| boxDecorationBreak | ❌ | ❌ | |
| boxShadow | ✅ | ✅ | |
| boxSizing | ✅ | ✅ | |
| caretColor | 🟡 | ❌ | |
| clipPath | ❌ | ❌ | |
| color | ✅ | ✅ | |
| columnGap | ✅ | ✅ | |
| cursor | ❌ | ✅ Partial | |
| direction | ❌ | ❌ | |
| display: block | 🟡 Partial | 🟡 Partial | [#2](https://github.com/facebook/react-strict-dom/issues/2) |
| display: contents | ❌ | ❌ | |
| display: flex | ✅ | ✅ | |
| display: grid | ❌ | ❌ | [#1](https://github.com/facebook/react-strict-dom/issues/1) |
| display: inline | ❌ | ❌ | [#2](https://github.com/facebook/react-strict-dom/issues/2) |
| display: inline-block | ❌ | ❌ | [#2](https://github.com/facebook/react-strict-dom/issues/2) |
| display: inline-flex | ❌ | ❌ | |
| display: inline-grid | ❌ | ❌ | [#1](https://github.com/facebook/react-strict-dom/issues/1) |
| display: list-item | ❌ | ❌ | |
| display: none | ✅ | ✅ | |
| filter | ✅ | ✅ | |
| flex | ✅ | ✅ | |
| flexBasis | ✅ | ✅ | |
| flexDirection | ✅ | ✅ | |
| flexGrow | ✅ | ✅ | |
| flexShrink | ✅ | ✅ | |
| flexWrap | ✅ | ✅ | |
| fontFamily | ✅ | ✅ | |
| fontSize | ✅ | ✅ | |
| fontStyle | ✅ | ✅ | |
| fontVariant | ✅ | ✅ | |
| fontWeight | 🟡 | 🟡 | |
| gap | ✅ | ✅ | |
| height | ✅ | ✅ | |
| inlineSize | 🟡 | 🟡 | |
| inset | 🟡 | 🟡 | |
| insetBlock | 🟡 | 🟡 | |
| insetBlockEnd | 🟡 | 🟡 | |
| insetBlockStart | 🟡 | 🟡 | |
| insetInline | 🟡 | 🟡 | |
| insetInlineEnd | 🟡 | 🟡 | |
| insetInlineStart | 🟡 | 🟡 | |
| isolation | ✅ | ✅ | |
| justifyContent | ✅ | ✅ | |
| justifyItems | ❌ | ❌ | |
| justifySelf | ❌ | ❌ | |
| left | ✅ | ✅ | |
| letterSpacing | ✅ | ✅ | |
| lineClamp | 🟡 | 🟡 | [#136](https://github.com/facebook/react-strict-dom/issues/136) |
| lineHeight (inc unitless) | 🟡 | 🟡 | |
| listStyle | ❌ | ❌ | |
| listStylePosition | ❌ | ❌ | |
| listStyleType | ❌ | ❌ | |
| margin | ✅ | ✅ | |
| marginBlock | 🟡 | 🟡 | |
| marginBlockEnd | 🟡 | 🟡 | |
| marginBlockStart | 🟡 | 🟡 | |
| marginBottom | ✅ | ✅ | |
| marginInline | 🟡 | 🟡 | |
| marginInlineEnd | 🟡 | 🟡 | |
| marginInlineStart | 🟡 | 🟡 | |
| marginLeft | ✅ | ✅ | |
| marginRight | ✅ | ✅ | |
| marginTop | ✅ | ✅ | |
| maxBlockSize | 🟡 | 🟡 | |
| maxHeight | ✅ | ✅ | |
| maxInlineSize | 🟡 | 🟡 | |
| maxWidth | ✅ | ✅ | |
| minBlockSize | 🟡 | 🟡 | |
| minHeight | ✅ | ✅ | |
| minInlineSize | 🟡 | 🟡 | |
| minWidth | ✅ | ✅ | |
| mixBlendMode | ✅ | ✅ | |
| objectFit | 🟡 | 🟡 | |
| objectPosition | ❌ | ❌ | |
| opacity | ✅ | ✅ | |
| outlineColor | ✅ | ✅ | |
| outlineOffset | ✅ | ✅ | |
| outlineStyle | ✅ | ✅ | |
| outlineWidth | ✅ | ✅ | |
| overflow | ✅ | ✅ | |
| overflowBlock | ❌ | ❌ | |
| overflowInline | ❌ | ❌ | |
| overflowWrap | ❌ | ❌ | |
| overflowX | ❌ | ❌ | |
| overflowY | ❌ | ❌ | |
| padding | ✅ | ✅ | |
| paddingBlock | 🟡 | 🟡 | |
| paddingBlockEnd | 🟡 | 🟡 | |
| paddingBlockStart | 🟡 | 🟡 | |
| paddingBottom | ✅ | ✅ | |
| paddingInline | 🟡 | 🟡 | |
| paddingInlineEnd | 🟡 | 🟡 | |
| paddingInlineStart | 🟡 | 🟡 | |
| paddingLeft | ✅ | ✅ | |
| pointerRight | ✅ | ✅ | |
| pointerTop | ✅ | ✅ | |
| placeContent | 🟡 | 🟡 | |
| placeItems | ❌ | ❌ | |
| placeSelf | ❌ | ❌ | |
| pointerEvents | ✅ | ✅ | |
| position: absolute | ✅ | ✅ | |
| position: fixed | ❌ | ❌ | |
| position: relative | ✅ | ✅ | |
| position: static | ✅ | ✅ | |
| position: sticky | ❌ | ❌ | |
| right | ✅ | ✅ | |
| rotate | ❌ | ❌ | |
| rowGap | ✅ | ✅ | |
| scale | ❌ | ❌ | |
| scrollSnap* | ❌ | ❌ | |
| textAlign | ✅ | ✅ | |
| textDecorationColor | ❌ | ✅ | |
| textDecorationLine | ✅ | ✅ | |
| textDecorationStyle | ❌ | ✅ | |
| textShadow | 🟡 | 🟡 | |
| textTransform | ✅ | ✅ | |
| top | ✅ | ✅ | |
| touchAction | ❌ | ❌ | |
| transform | ✅ | ✅ | |
| transform: matrix | ✅ | ✅ | |
| transform: matrix3d | ❌ | ❌ | |
| transform: perspective | ✅ | ✅ | |
| transform: rotate | ✅ | ✅ | |
| transform: rotate3d | ❌ | ❌ | |
| transform: rotateX | ✅ | ✅ | |
| transform: rotateY | ✅ | ✅ | |
| transform: rotateZ | ✅ | ✅ | |
| transform: scale | ✅ | ✅ | |
| transform: scale3d | ❌ | ❌ | |
| transform: scaleX | ✅ | ✅ | |
| transform: scaleY | ✅ | ✅ | |
| transform: scaleZ | ❌ | ❌ | |
| transform: skew | ✅ | ✅ | |
| transform: skewX | ✅ | ✅ | |
| transform: skewY | ✅ | ✅ | |
| transform: translate | ❌ | ❌ | |
| transform: translate3d | ❌ | ❌ | |
| transform: translateX | ✅ | ✅ | |
| transform: translateY | ✅ | ✅ | |
| transform: translateZ | ❌ | ❌ | |
| transform: skew | ❌ | ❌ | |
| transform: skewX | ✅ | ✅ | |
| transform: skewY | ✅ | ✅ | |
| transformOrigin | ✅ | ✅ | |
| transformStyle | ❌ | ❌ | |
| transitionDelay | 🟡 | 🟡 | |
| transitionDuration | 🟡 | 🟡 | |
| transitionProperty | 🟡 | 🟡 | |
| transitionTimingFunction | 🟡 | 🟡 | |
| translate | ❌ | ❌ | |
| userSelect | 🟡 | 🟡 | |
| verticalAlign | 🟡 | ❌ | |
| visibility | 🟡 | 🟡 | |
| whiteSpace | ❌ | ❌ | |
| width | ✅ | ✅ | |
| wordBreak | ❌ | ❌ | |
| zIndex | ✅ | ✅ | [#100](https://github.com/facebook/react-strict-dom/issues/100) |
