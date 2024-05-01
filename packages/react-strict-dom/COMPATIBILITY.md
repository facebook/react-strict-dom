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
| del | 🟡 | 🟡 | |
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
| ins | 🟡 | 🟡 | |
| kbd | 🟡 | 🟡 | |
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
| s | 🟡 | 🟡 | |
| section | 🟡 | 🟡 | |
| select | ❌ | ❌ | [#10](https://github.com/facebook/react-strict-dom/issues/10) |
| span | 🟡 | 🟡 | |
| strong | 🟡 | 🟡 | |
| sub | 🟡 | 🟡 | |
| sup | 🟡 | 🟡 | |
| svg | ❌ | ❌ | [#4](https://github.com/facebook/react-strict-dom/issues/4) |
| textarea | 🟡 | 🟡 | |
| u | 🟡 | 🟡 | |
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
| onAuxClick | ❌ | ❌ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onBeforeInput (input) | ❌ | ❌ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onBeforeInput (select) | ❌ | ❌ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onBeforeInput (textarea) | ❌ | ❌ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onBlur | ❌ | ❌ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onChange (input) | ✅ | ✅ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onChange (select) | ❌ | ❌ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onChange (textarea) | ✅ | ✅ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onClick | ❌ | ❌ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onContextMenu | ❌ | ❌ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onCopy | ❌ | ❌ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onCut | ❌ | ❌ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onError (img) | 🟡 | 🟡 | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onFocus | ❌ | ❌ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onGotPointerCapture | ✅ | ✅ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onInput (input) | 🟡 | 🟡 | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onInput (select) | ❌ | ❌ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onInput (textarea) | 🟡 | 🟡 | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onInvalid (input) | ❌ | ❌ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onInvalid (select) | ❌ | ❌ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onInvalid (textarea) | ❌ | ❌ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onKeyDown | ❌ | ❌ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onKeyUp | ❌ | ❌ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onLoad (img) | 🟡 | 🟡 | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onLostPointerCapture | ✅ | ✅ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onPaste | ❌ | ❌ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onPointerCancel | ✅ | ✅ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onPointerDown | ✅ | ✅ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onPointerEnter | ✅ | ✅ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onPointerLeave | ✅ | ✅ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onPointerMove | ✅ | ✅ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onPointerOut | ✅ | ✅ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onPointerOver | ✅ | ✅ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onPointerUp | ✅ | ✅ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onSelect | ❌ | ❌ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
| onSelectionChange | ❌ | ❌ | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
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
| window.addEventListener() | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |
| window.devicePixelRatio | ❌ | ❌ | |
| window.dispatchEvent() | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |
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
| window.removeEventListener() | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |

### Events

| Name | Android | iOS | Issue # |
| ---- | ---- | ---- | ---- |
| event.bubbles | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |
| event.cancelable | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |
| event.composed | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |
| event.composedPath() | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |
| event.currentTarget | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |
| event.defaultPrevented | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |
| event.eventPhase | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |
| event.isTrusted | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |
| event.preventDefault() | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |
| event.stopImmediatePropagation() | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |
| event.stopPropagation() | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |
| event.target | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |
| event.timeStamp | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |
| event.type | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |

### [Minimum Common Web Platform API](https://common-min-api.proposal.wintercg.org/)

| Name | Android | iOS | Issue # |
| ---- | ---- | ---- | ---- |
| AbortController | ❌ | ❌ | |
| AbortSignal | ❌ | ❌ | |
| Blob | ✅ | ✅ | |
| Crypto | ❌ | ❌ | |
| CustomEvent() constructor| ❌ | ❌ | |
| Event() constructor| ❌ | ❌ | |
| EventTarget.addEventListener() | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |
| EventTarget.dispatchEvent() | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |
| EventTarget.removeEventListener() | ❌ | ❌ | [#37](https://github.com/facebook/react-strict-dom/issues/37) |
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
| ::placeholder | 🟡 | 🟡 | |
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
| backdropFilter | ❌ | ❌ | |
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
| columnGap | ✅ | ✅ | |
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
| filter | ❌ | ❌ | |
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
| justifyItems | ❌ | ❌ | |
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
| px units | 🟡 | 🟡 | |
| rem units | 🟡 | 🟡 | |
| right | ✅ | ✅ | |
| rotate | ❌ | ❌ | |
| rowGap | ✅ | ✅ | |
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
| zIndex | ✅ | ✅ | [#100](https://github.com/facebook/react-strict-dom/issues/100) |
