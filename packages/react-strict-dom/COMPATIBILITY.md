# COMPATIBILITY

The following tables represent the compatibility status of the core API surface for cross-platform React development with React Strict DOM. All APIs are considered supported on Web.

NOTE: React Native support assumes use of React Native's "Fabric" architecture, and relevant feature flags enabled.

✅ = React Native built-in support<br>
🟡 = Polyfilled in JavaScript<br>
❌ = No support

### HTML components

| Name | Android | iOS | Issue # |
| ---- | ---- | ---- | ---- |
| a | 🟡 | 🟡 | |
| article | 🟡 | 🟡 | |
| aside | 🟡 | 🟡 | |
| b | 🟡 | 🟡 | |
| bdi | 🟡 | 🟡 | |
| bdo | 🟡 | 🟡 | |
| blockquote | 🟡 | 🟡 | |
| br | 🟡 | 🟡 | |
| button | 🟡 | 🟡 | |
| code | 🟡 | 🟡 | |
| dialog | ❌ | ❌ | [#5](https://github.com/facebook/react-strict-dom/issues/5) |
| div | 🟡 | 🟡 | |
| em | 🟡 | 🟡 | |
| footer | 🟡 | 🟡 | |
| form | ❌ | ❌ | [#6](https://github.com/facebook/react-strict-dom/issues/6) |
| h1-6 | 🟡 | 🟡 | |
| header | 🟡 | 🟡 | |
| hr | 🟡 | 🟡 | |
| i | 🟡 | 🟡 | |
| img | 🟡 | 🟡 | |
| input | 🟡 | 🟡 | |
| input[type="checkbox"] | ❌ | ❌ | [#11](https://github.com/facebook/react-strict-dom/issues/11) |
| input[type="color"] | ❌ | ❌ | [#12](https://github.com/facebook/react-strict-dom/issues/12) |
| input[type="date"] | ❌ | ❌ | [#13](https://github.com/facebook/react-strict-dom/issues/13) |
| input[type="file"] | ❌ | ❌ | [#14](https://github.com/facebook/react-strict-dom/issues/14) |
| input[type="radio"] | ❌ | ❌ | [#15](https://github.com/facebook/react-strict-dom/issues/15) |
| label | 🟡 | 🟡 | |
| li | 🟡 | 🟡 | |
| main | 🟡 | 🟡 | |
| nav | 🟡 | 🟡 | |
| ol | 🟡 | 🟡 | |
| optgroup | ❌ | ❌ | [#7](https://github.com/facebook/react-strict-dom/issues/7) |
| option | ❌ | ❌ | [#8](https://github.com/facebook/react-strict-dom/issues/8) |
| p | 🟡 | 🟡 | |
| pre | 🟡 | 🟡 | |
| progress | ❌ | ❌ | [#9](https://github.com/facebook/react-strict-dom/issues/9) |
| section | 🟡 | 🟡 | |
| select | ❌ | ❌ | [#10](https://github.com/facebook/react-strict-dom/issues/10) |
| span | 🟡 | 🟡 | |
| strong | 🟡 | 🟡 | |
| sub | 🟡 | 🟡 | |
| sup | 🟡 | 🟡 | |
| svg | ❌ | ❌ | [#4](https://github.com/facebook/react-strict-dom/issues/4) |
| textarea | 🟡 | 🟡 | |
| ul | 🟡 | 🟡 | |

### HTML component props

| Name | Android | iOS | Issue # |
| ---- | ---- | ---- | ---- |
| alt (img)	| 🟡 | 🟡 | |
| aria-activedescendant | ❌ | ❌ | |
| aria-atomic | ❌ | ❌ | |
| aria-autocomplete | ❌ | ❌ | |
| aria-busy | 🟡 | 🟡 | |
| aria-checked | 🟡 | 🟡 | |
| aria-colcount | ❌ | ❌ | |
| aria-colindex | ❌ | ❌ | |
| aria-colindextext | ❌ | ❌ | |
| aria-colspan | ❌ | ❌ | |
| aria-controls | ❌ | ❌ | |
| aria-current | ❌ | ❌ | |
| aria-describedby | 🟡 | 🟡 | |
| aria-details | ❌ | ❌ | |
| aria-disabled | 🟡 | 🟡 | |
| aria-errormessage | ❌ | ❌ | |
| aria-expanded | 🟡 | 🟡 | |
| aria-flowto | ❌ | ❌ | |
| aria-haspopup | ❌ | ❌ | |
| aria-hidden | 🟡 | 🟡 | |
| aria-invalid | ❌ | ❌ | |
| aria-keyshortcuts | ❌ | ❌ | |
| aria-label | 🟡 | 🟡 | |
| aria-labelledby | 🟡 | 🟡 | |
| aria-level | ❌ | ❌ | |
| aria-live | 🟡 | 🟡 | |
| aria-modal | 🟡 | 🟡 | |
| aria-multiline | ❌ | ❌ | |
| aria-multiselectable | ❌ | ❌ | |
| aria-orientation | ❌ | ❌ | |
| aria-owns | ❌ | ❌ | |
| aria-placeholder | ❌ | ❌ | |
| aria-posinset | 🟡 | 🟡 | |
| aria-pressed | ❌ | ❌ | |
| aria-readonly | ❌ | ❌ | |
| aria-required | ❌ | ❌ | |
| aria-roledescription | ❌ | ❌ | |
| aria-rowcount | ❌ | ❌ | |
| aria-rowindex | ❌ | ❌ | |
| aria-rowindextext | ❌ | ❌ | |
| aria-rowspan | ❌ | ❌ | |
| aria-selected | 🟡 | 🟡 | |
| aria-setsize | 🟡 | 🟡 | |
| aria-sort | ❌ | ❌ | |
| aria-valuemax | 🟡 | 🟡 | |
| aria-valuemin | 🟡 | 🟡 | |
| aria-valuenow | 🟡 | 🟡 | |
| aria-valuetext | 🟡 | 🟡 | |
| autoComplete (input) | 🟡 | 🟡 | |
| autoComplete (textarea) | 🟡 | 🟡 | |
| autoFocus | ❌ | ❌ | |
| checked (input) | ❌ | ❌ | |
| crossOrigin (img) | 🟡 | 🟡 | |
| data-testid | 🟡 | 🟡 | |
| data-* | ❌ | ❌ | |
| decoding (img) | ❌ | ❌ | |
| defaultChecked (input) | ❌ | ❌ | |
| defaultValue (input) | ❌ | ❌ | |
| dir | ❌ | ❌ | |
| disabled (button) | 🟡 | 🟡 | |
| disabled (input) | 🟡 | 🟡 | |
| disabled (textarea) | 🟡 | 🟡 | |
| download (a) | ❌ | ❌ | |
| draggable (img) | ❌ | ❌ | |
| elementTiming | ❌ | ❌ | |
| enterKeyHint (input) | 🟡 | 🟡 | |
| enterKeyHint (textarea) | 🟡 | 🟡 | |
| fetchPriority (img) | ❌ | ❌ | |
| for (label) | ❌ | ❌ | |
| height (img) | 🟡 | 🟡 | |
| hidden | 🟡 | 🟡 | |
| href (a) | ❌ | ❌ | |
| id | 🟡 | 🟡 | |
| inert | ❌ | ❌ | |
| inputMode (input) | 🟡 | 🟡 | |
| inputMode (textarea) | 🟡 | 🟡 | |
| label (option) | ❌ | ❌ | |
| label (optgroup) | ❌ | ❌ | |
| lang | ❌ | ❌ | |
| loading (img) | ❌ | ❌ | |
| max (input) | ❌ | ❌ | |
| max (textarea) | ❌ | ❌ | |
| maxLength (input) | ✅ | ✅ | |
| maxLength (textarea) | ✅ | ✅ | |
| min (input) | ❌ | ❌ | |
| min (textarea) | ❌ | ❌ | |
| minLength (input) | ❌ | ❌ | |
| minLength (textarea) | ❌ | ❌ | |
| multiple (select) | ❌ | ❌ | |
| onAuxClick | ❌ | ❌ | |
| onBeforeInput (input) | ❌ | ❌ | |
| onBeforeInput (select) | ❌ | ❌ | |
| onBeforeInput (textarea) | ❌ | ❌ | |
| onBlur | ❌ | ❌ | |
| onChange (input) | ✅ | ✅ | |
| onChange (select) | ❌ | ❌ | |
| onChange (textarea) | ✅ | ✅ | |
| onClick | ❌ | ❌ | |
| onContextMenu | ❌ | ❌ | |
| onCopy | ❌ | ❌ | |
| onCut | ❌ | ❌ | |
| onError (img) | 🟡 | 🟡 | |
| onFocus | ❌ | ❌ | |
| onGotPointerCapture | ✅ | ✅ | |
| onInput (input) | 🟡 | 🟡 | |
| onInput (select) | ❌ | ❌ | |
| onInput (textarea) | 🟡 | 🟡 | |
| onInvalid (input) | ❌ | ❌ | |
| onInvalid (select) | ❌ | ❌ | |
| onInvalid (textarea) | ❌ | ❌ | |
| onKeyDown | ❌ | ❌ | |
| onKeyUp | ❌ | ❌ | |
| onLoad (img) | 🟡 | 🟡 | |
| onLostPointerCapture | ✅ | ✅ | |
| onPaste | ❌ | ❌ | |
| onPointerCancel | ✅ | ✅ | |
| onPointerDown | ✅ | ✅ | |
| onPointerEnter | ✅ | ✅ | |
| onPointerLeave | ✅ | ✅ | |
| onPointerMove | ✅ | ✅ | |
| onPointerOut | ✅ | ✅ | |
| onPointerOver | ✅ | ✅ | |
| onPointerUp | ✅ | ✅ | |
| onSelect | ❌ | ❌ | |
| onSelectionChange | ❌ | ❌ | |
| open (dialog) | ❌ | ❌ | |
| placeholder (input) | 🟡 | 🟡 | |
| placeholder (textarea) | 🟡 | 🟡 | |
| readOnly (input) | 🟡 | 🟡 | |
| readOnly (textarea) | 🟡 | 🟡 | |
| referrerPolicy (a) | ❌ | ❌ | |
| referrerPolicy (img) | 🟡 | 🟡 | |
| rel (a) | ❌ | ❌ | |
| required (input) | ❌ | ❌ | |
| required (select) | ❌ | ❌ | |
| required (textarea) | ❌ | ❌ | |
| role | 🟡 | 🟡 | |
| rows (textarea) | 🟡 | 🟡 | |
| selected (option) | ❌ | ❌ | |
| spellCheck (input) | ❌ | ❌ | |
| spellCheck (textarea) | ❌ | ❌ | |
| src (img) | 🟡 | 🟡 | |
| srcSet (img) | 🟡 | 🟡 | |
| step (input) | ❌ | ❌ | |
| style | 🟡 | 🟡 | |
| tabIndex | 🟡 | 🟡 | |
| target (a) | ❌ | ❌ | |
| type (button) | ❌ | ❌ | |
| type (input) | 🟡 | 🟡 | |
| value (input) | ✅ | ✅ | |
| value (textarea) | ✅ | ✅ | |
| width (img) | 🟡 | 🟡 | |

### SVG components

| Name | Android | iOS | Issue # |
| ---- | ---- | ---- | ---- |
| circle | ❌ | ❌ | [#4](https://github.com/facebook/react-strict-dom/issues/4) |
| clipPath | ❌ | ❌ | [#4](https://github.com/facebook/react-strict-dom/issues/4) |
| defs | ❌ | ❌ | [#4](https://github.com/facebook/react-strict-dom/issues/4) |
| ellipse | ❌ | ❌ | [#4](https://github.com/facebook/react-strict-dom/issues/4) |
| g | ❌ | ❌ | [#4](https://github.com/facebook/react-strict-dom/issues/4) |
| line | ❌ | ❌ | [#4](https://github.com/facebook/react-strict-dom/issues/4) |
| linearGradient | ❌ | ❌ | [#4](https://github.com/facebook/react-strict-dom/issues/4) |
| mask | ❌ | ❌ | [#4](https://github.com/facebook/react-strict-dom/issues/4) |
| path | ❌ | ❌ | [#4](https://github.com/facebook/react-strict-dom/issues/4) |
| pattern | ❌ | ❌ | [#4](https://github.com/facebook/react-strict-dom/issues/4) |
| polygon | ❌ | ❌ | [#4](https://github.com/facebook/react-strict-dom/issues/4) |
| radialGradient | ❌ | ❌ | [#4](https://github.com/facebook/react-strict-dom/issues/4) |
| rect | ❌ | ❌ | [#4](https://github.com/facebook/react-strict-dom/issues/4) |
| stop | ❌ | ❌ | [#4](https://github.com/facebook/react-strict-dom/issues/4) |
| symbol | ❌ | ❌ | [#4](https://github.com/facebook/react-strict-dom/issues/4) |
| text | ❌ | ❌ | [#4](https://github.com/facebook/react-strict-dom/issues/4) |
| title | ❌ | ❌ | [#4](https://github.com/facebook/react-strict-dom/issues/4) |
| use | ❌ | ❌ | [#4](https://github.com/facebook/react-strict-dom/issues/4) |

### Node

| Name | Android | iOS | Issue # |
| ---- | ---- | ---- | ---- |
| Node.DOCUMENT_NODE | ✅ | ✅ | |
| Node.DOCUMENT_POSITION_CONTAINED_BY | ✅ | ✅ | |
| Node.DOCUMENT_POSITION_CONTAINS | ✅ | ✅ | |
| Node.DOCUMENT_POSITION_DISCONNECTED | ✅ | ✅ | |
| Node.DOCUMENT_POSITION_FOLLOWING | ✅ | ✅ | |
| Node.DOCUMENT_POSITION_PRECEDING | ✅ | ✅ | |
| Node.ELEMENT_NODE | ✅ | ✅ | |
| Node.TEXT_NODE | ✅ | ✅ | |
| Node.childNodes | ✅ | ✅ | |
| Node.compareDocumentPosition() | ✅ | ✅ | |
| Node.contains() | ✅ | ✅ | |
| Node.firstChild | ✅ | ✅ | |
| Node.getRootNode(options) | ✅ Partial | ✅ Partial | |
| Node.hasChildNodes() | ✅ | ✅ | |
| Node.isConnected | ✅ | ✅ | |
| Node.lastChild | ✅ | ✅ | |
| Node.nextSibling | ✅ | ✅ | |
| Node.nodeName | ✅ | ✅ | |
| Node.nodeType | ✅ | ✅ | |
| Node.nodeValue | ✅ | ✅ | |
| Node.parentElement | ✅ | ✅ | |
| Node.parentNode | ✅ | ✅ | |
| Node.previousSibling | ✅ | ✅ | |
| Node.textContent | ✅ | ✅ | |

### Element

| Name | Android | iOS | Issue # |
| ---- | ---- | ---- | ---- |
| Element.childElementCount | ✅ | ✅ | |
| Element.children | ✅ | ✅ | |
| Element.clientHeight | ✅ | ✅ | |
| Element.clientLeft | ✅ | ✅ | |
| Element.clientTop | ✅ | ✅ | |
| Element.clientWidth | ✅ | ✅ | |
| Element.computedStyleMap() | ❌ | ❌ | |
| Element.firstElementChild | ✅ | ✅ | |
| Element.getAttribute() | ❌ | ❌ | |
| Element.getBoundingClientRect() | ✅ | ✅ | |
| Element.getClientRects() | ❌ | ❌ | |
| Element.hasAttribute() | ❌ | ❌ | |
| Element.hasPointerCapture() | ✅ | ✅ | |
| Element.id | ✅ | ✅ | |
| Element.lastElementChild | ✅ | ✅ | |
| Element.nextElementSibling | ✅ | ✅ | |
| Element.previousElementSibling | ✅ | ✅ | |
| Element.releasePointerCapture() | ✅ | ✅ | |
| Element.scroll() | ❌ | ❌ | |
| Element.scrollBy() | ❌ | ❌ | |
| Element.scrollHeight | ✅ | ✅ | |
| Element.scrollIntoView() | ❌ | ❌ | |
| Element.scrollLeft | ✅ | ✅ | |
| Element.scrollTo() | ❌ | ❌ | |
| Element.scrollTop | ✅ | ✅ | |
| Element.scrollWidth | ✅ | ✅ | |
| Element.setPointerCapture() | ✅ | ✅ | |
| Element.tagName | ✅ | ✅ | |
| HTMLDialogElement.close() | ❌ | ❌ | |
| HTMLDialogElement.open | ❌ | ❌ | |
| HTMLDialogElement.returnValue | ❌ | ❌ | |
| HTMLDialogElement.show() | ❌ | ❌ | |
| HTMLDialogElement.showModal() | ❌ | ❌ | |
| HTMLElement.blur() | ✅ | ✅ | |
| HTMLElement.click() | ❌ | ❌ | |
| HTMLElement.focus(options) | ✅ (no options) | ✅ (no options) | |
| HTMLElement.hidden | ❌ | ❌ | |
| HTMLElement.offsetHeight | ✅ | ✅ | |
| HTMLElement.offsetLeft | ✅ | ✅ | |
| HTMLElement.offsetParent | ✅ | ✅ | |
| HTMLElement.offsetTop | ✅ | ✅ | |
| HTMLElement.offsetWidth | ✅ | ✅ | |
| HTMLImageElement.complete | ❌ | ❌ | |
| HTMLImageElement.currentSrc | ❌ | ❌ | |
| HTMLImageElement.naturalHeight | ❌ | ❌ | |
| HTMLImageElement.naturalWidth | ❌ | ❌ | |
| HTMLInputElement.disabled | ❌ | ❌ | |
| HTMLInputElement.select() | ❌ | ❌ | |
| HTMLInputElement.selectionDirection | ❌ | ❌ | |
| HTMLInputElement.selectionEnd | ❌ | ❌ | |
| HTMLInputElement.selectionStart | ❌ | ❌ | |
| HTMLInputElement.setSelectionRange() | ❌ | ❌ | |
| HTMLInputElement.showPicker() | ❌ | ❌ | |
| HTMLInputElement.value | ❌ | ❌ | |
| HTMLTextAreaElement.disabled | ❌ | ❌ | |
| HTMLTextAreaElement.select() | ❌ | ❌ | |
| HTMLTextAreaElement.selectionDirection | ❌ | ❌ | |
| HTMLTextAreaElement.selectionEnd | ❌ | ❌ | |
| HTMLTextAreaElement.selectionStart | ❌ | ❌ | |
| HTMLTextAreaElement.setSelectionRange() | ❌ | ❌ | |
| HTMLTextAreaElement.value | ❌ | ❌ | |

### document

Note this should only be accessed using `Node.getRootNode()`, in order to support multi-window environments.

| Name | Android | iOS | Issue # |
| ---- | ---- | ---- | ---- |
| document.activeElement | ❌ | ❌ | |
| document.defaultView | ❌ | ❌ | |
| document.getElementFromPoint(x,y) | ❌ | ❌ | |
| document.hidden | ❌ | ❌ | |
| document.visibilityState | ❌ | ❌ | |
| "scroll" event | ❌ | ❌ | |
| "visibilitychange" event | ❌ | ❌ | |

### window

Note these APIs can only be accessed using `Node.getRootNode().defaultView`, in order to support multi-window environments.

| Name | Android | iOS | Issue # |
| ---- | ---- | ---- | ---- |
| window.addEventListener() | ❌ | ❌ | |
| window.devicePixelRatio | ❌ | ❌ | |
| window.dispatchEvent() | ❌ | ❌ | |
| window.getSelection() | ❌ | ❌ | |
| window.matchMedia() | ❌ | ❌ | |
| window.navigator.clipboard | ❌ | ❌ | |
| window.navigator.languages | ❌ | ❌ | |
| window.navigator.permissions | ❌ | ❌ | |
| window.navigator.vibrate() | ❌ | ❌ | |
| window.performance.clearMarks() | ✅ | ✅ | |
| window.performance.clearMeasures() | ✅ | ✅ | |
| window.performance.getEntries() | ✅ | ✅ | |
| window.performance.getEntriesByName() | ✅ | ✅ | |
| window.performance.getEntriesByType() | ✅ | ✅ | |
| window.performance.mark | ✅ | ✅ | |
| window.performance.measure() | ✅ | ✅ | |
| window.performance.now() | ✅ | ✅ | |
| window.performance.timeOrigin | ❌ | ❌ | |
| window.removeEventListener() | ❌ | ❌ | |

### Events

| Name | Android | iOS | Issue # |
| ---- | ---- | ---- | ---- |
| event.bubbles | ❌ | ❌ | |
| event.cancelable | ❌ | ❌ | |
| event.composed | ❌ | ❌ | |
| event.composedPath() | ❌ | ❌ | |
| event.currentTarget | ❌ | ❌ | |
| event.defaultPrevented | ❌ | ❌ | |
| event.eventPhase | ❌ | ❌ | |
| event.isTrusted | ❌ | ❌ | |
| event.preventDefault() | ❌ | ❌ | |
| event.stopImmediatePropagation() | ❌ | ❌ | |
| event.stopPropagation() | ❌ | ❌ | |
| event.target | ❌ | ❌ | |
| event.timeStamp | ❌ | ❌ | |
| event.type | ❌ | ❌ | |

### [Minimum Common Web Platform API](https://common-min-api.proposal.wintercg.org/)

| Name | Android | iOS | Issue # |
| ---- | ---- | ---- | ---- |
| AbortController | ❌ | ❌ | |
| AbortSignal | ❌ | ❌ | |
| Blob | ✅ | ✅ | |
| Crypto | ❌ | ❌ | |
| CustomEvent() constructor| ❌ | ❌ | |
| Event() constructor| ❌ | ❌ | |
| EventTarget.addEventListener() | ❌ | ❌ | |
| EventTarget.dispatchEvent() | ❌ | ❌ | |
| EventTarget.removeEventListener() | ❌ | ❌ | |
| fetch | ✅ Partial | ✅ Partial | |
| FileReader | ✅ | ✅ | |
| URL | ❌ | ❌ | |

### CSS

| Name | Android | iOS | Issue # |
| ---- | ---- | ---- | ---- |
| css.create() | 🟡 | 🟡 | |
| css.create({ foo: (v) => ({})) | 🟡 | 🟡 | |
| css.createTheme() | 🟡 | 🟡 | |
| css.defineVars() | 🟡 | 🟡 | |
| css.firstThatWorks() | 🟡 | 🟡 | |
| css.keyframes() | ❌ | ❌ | [#3](https://github.com/facebook/react-strict-dom/issues/3) |

| Name | Android | iOS | Issue # |
| ---- | ---- | ---- | ---- |
| :active | ❌ | ❌ | |
| :focus | ❌ | ❌ | |
| :hover | 🟡 | 🟡 | |
| % units | ❌ | ❌ | |
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
| backfaceVisibility | ✅ | ✅ | |
| backgroundColor | ✅ | ✅ | |
| backgroundImage | ❌ | ❌ | |
| backgroundOrigin | ❌ | ❌ | |
| backgroundPosition | ❌ | ❌ | |
| backgroundRepeat | ❌ | ❌ | |
| backgroundSize | ❌ | ❌ | |
| blockSize | 🟡 | 🟡 | |
| blur() | ❌ | ❌ | |
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
| boxShadow | ❌ | ❌ | |
| boxSizing | 🟡 Partial | 🟡 Partial | |
| brightness() | ❌ | ❌ | |
| calc() | ❌ | ❌ | |
| caretColor | ❌ | ❌ | |
| clamp() | ❌ | ❌ | |
| clipPath | ❌ | ❌ | |
| color | ✅ | ✅ | |
| contrast() | ❌ | ❌ | |
| cursor | ❌ | ❌ | |
| Custom Properties | 🟡 | 🟡 | |
| direction | ❌ | ❌ | |
| display: block | 🟡 Partial | 🟡 Partial | [#2](https://github.com/facebook/react-strict-dom/issues/2) |
| display: contents | ❌ | ❌ | |
| display: flex | ✅ | ✅ | |
| display: grid | ❌ | ❌ | [#1](https://github.com/facebook/react-strict-dom/issues/1) |
| display: inline | ❌ | ❌ | [#2](https://github.com/facebook/react-strict-dom/issues/2) |
| display: inline-block | ❌ | ❌ | [#2](https://github.com/facebook/react-strict-dom/issues/2) |
| display: inline-flex | ❌ | ❌ | |
| display: inline-grid | ❌ | ❌ | [#1](https://github.com/facebook/react-strict-dom/issues/1) |
| display: none | ✅ | ✅ | |
| drop-shadow() | ❌ | ❌ | |
| em units | 🟡 | 🟡 | |
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
| gapColumn | ✅ | ✅ | |
| gapRow | ✅ | ✅ | |
| grayscale() | ❌ | ❌ | |
| height | ✅ | ✅ | |
| hue-rotate() | ❌ | ❌ | |
| inlineSize | 🟡 | 🟡 | |
| inset | 🟡 | 🟡 | |
| insetBlock | 🟡 | 🟡 | |
| insetBlockEnd | 🟡 | 🟡 | |
| insetBlockStart | 🟡 | 🟡 | |
| insetInline | 🟡 | 🟡 | |
| insetInlineEnd | 🟡 | 🟡 | |
| insetInlineStart | 🟡 | 🟡 | |
| invert() | ❌ | ❌ | |
| justifyContent | ✅ | ✅ | |
| justifySelf | ❌ | ❌ | |
| left | ✅ | ✅ | |
| letterSpacing | ✅ | ✅ | |
| lineClamp | 🟡 | 🟡 | |
| lineHeight (unitless) | 🟡 | 🟡 | |
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
| max() | ❌ | ❌ | |
| maxBlockSize | 🟡 | 🟡 | |
| maxHeight | ✅ | ✅ | |
| maxInlineSize | 🟡 | 🟡 | |
| maxWidth | ✅ | ✅ | |
| min() | ❌ | ❌ | |
| minBlockSize | 🟡 | 🟡 | |
| minHeight | ✅ | ✅ | |
| minInlineSize | 🟡 | 🟡 | |
| minmax() | ❌ | ❌ | |
| minWidth | ✅ | ✅ | |
| objectFit | 🟡 | 🟡 | |
| objectPosition | ❌ | ❌ | |
| opacity | ✅ | ✅ | |
| opacity() | ❌ | ❌ | |
| outlineColor | ❌ | ❌ | |
| outlineOffset | ❌ | ❌ | |
| outlineStyle | ❌ | ❌ | |
| outlineWidth | ❌ | ❌ | |
| overflow | ✅ | ✅ | |
| overflowBlock | ❌ | ❌ | |
| overflowInline | ❌ | ❌ | |
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
| placeContent | ❌ | ❌ | |
| placeItems | ❌ | ❌ | |
| placeSelf | ❌ | ❌ | |
| pointerEvents | ✅ | ✅ | |
| position: absolute | ✅ | ✅ | |
| position: fixed | ❌ | ❌ | |
| position: relative | ✅ | ✅ | |
| position: static | ✅ | ✅ | |
| position: sticky | ❌ | ❌ | |
| px units | 🟡 | 🟡 | |
| rem units | 🟡 | 🟡 | |
| right | ✅ | ✅ | |
| rotate | ❌ | ❌ | |
| saturate() | ❌ | ❌ | |
| scale | ❌ | ❌ | |
| scrollSnap* | ❌ | ❌ | |
| sepia() | ❌ | ❌ | |
| textAlign | ✅ | ✅ | |
| textDecorationColor | ❌ | ✅ | |
| textDecorationLine | ✅ | ✅ | |
| textDecorationStyle | ❌ | ✅ | |
| textShadow | 🟡 | 🟡 | |
| textTransform | ✅ | ✅ | |
| top | ✅ | ✅ | |
| touchAction | ❌ | ❌ | |
| transform | ✅ | ✅ | |
| transform: translate % | ❌ | ❌ | |
| transformOrigin | ✅ | ✅ | |
| transformStyle | ❌ | ❌ | |
| transitionDelay | 🟡 | 🟡 | |
| transitionDuration | 🟡 | 🟡 | |
| transitionProperty | 🟡 | 🟡 | |
| transitionTimingFunction | 🟡 | 🟡 | |
| translate | ❌ | ❌ | |
| url() | ❌ | ❌ | |
| userSelect | 🟡 | 🟡 | |
| v* units | 🟡 | 🟡 | |
| verticalAlign | 🟡 | ❌ | |
| visibility | 🟡 | 🟡 | |
| whiteSpace | ❌ | ❌ | |
| width | ✅ | ✅ | |
| wordBreak | ❌ | ❌ | |
| zIndex | ✅ | ✅ | |
