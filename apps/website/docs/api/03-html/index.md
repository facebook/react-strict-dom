# html

<p className="text-xl">React Strict DOM provides cross-platform components based on HTML.</p>

:::warning[Native layout is limited]

On native, the expected default layout of block-level elements is polyfilled but there is no support for [flow layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flow_layout), [grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout), or inline flexbox layout. This can result in unexpected layout of text relative to web, and currently precludes the possibility of using `inline`, `inline-block`, or `inline-flex` display values.

:::

## Overview

Components and props are a strict subset of the HTML components and props provided by React DOM. To learn more about each of the `html` components, please refer to the guides below.

* [html.*](/api/html/common)
* [html.a](/api/html/a)
* [html.button](/api/html/button)
* [html.img](/api/html/img)
* [html.input](/api/html/input)
* [html.label](/api/html/label)
* [html.li](/api/html/li)
* [html.optgroup](/api/html/optgroup)
* [html.option](/api/html/option)
* [html.select](/api/html/select)
* [html.textarea](/api/html/textarea)

## Compatibility

The following tables represent the compatibility status of the strict HTML API surface for cross-platform React development with React Strict DOM. All the APIs listed below are considered supported on Web.

<p>
✅ = React Native built-in support<br />
🟡 = Polyfilled in JavaScript<br />
❌ = No support
</p>

| Tags | Android | iOS | Issue # |
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

| Props | Android | iOS | Issue # |
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
| dir | 🟡 | 🟡 | |
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
| onKeyDown | 🟡 | 🟡 | [#38](https://github.com/facebook/react-strict-dom/issues/38) |
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

| Instance | Android | iOS | Issue # |
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
