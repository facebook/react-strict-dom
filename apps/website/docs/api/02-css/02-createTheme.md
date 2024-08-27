# css.createTheme

<p className="text-xl">How to create style themes from variables in React.</p>

## Overview

This API creates themes that override the default values of style variables created with `defineVars()`. These themes can then be applied to specific element sub-trees. It returns an opaque style object that can be passed to the `style` prop of `html.*` elements. These theme objects can also be combined into an array style.

```jsx
import { css } from 'react-strict-dom';
import { colors, spacing } from './vars.stylex.js';

const themeColors = css.createTheme(colors, {
  accent: 'red',
  textPrimary: 'black',
  textSecondary: 'brown',
});

const themeSpacing = css.createTheme(spacing, {
  small: '0.25rem',
  large: '0.5rem'
});

const theme = [ themeColors, themeSpacing ];

const Theme = (props) => <html.div {...props} style={theme} />
```

## API

### Vars

The first argument to `createTheme` must be the return value of a `defineVars` call. This will determine which variables can be overridden by a given `createTheme` call.

```js
import { colors } from './vars.stylex.js';

const themeColors = css.createTheme(colors, { ... })
```

### Overrides

The second argument to `createTheme` is an object of variable value overrides, where each key must match the key of the object provided to `defineVars`.

```js title="vars.stylex.js"
export const colors = css.defineVars({
  accent: 'blue',
  textPrimary: 'black',
  textSecondary: '#333',
});
```

```js
import { colors } from './vars.stylex.js';

const themeColors = css.createTheme(colors, {
  accent: 'red',
  textPrimary: 'black',
  textSecondary: 'brown',
})
```
