# css.defineVars

<p className="text-xl">How to define variables for use in styles and themes.</p>

:::warning

Variables must be defined as named exports in a `.stylex.js` (or `.stylex.ts`) file. This limitation is currently imposed due to constraints on how styles are compiled on web.

:::

## Overview

This API creates style variables that can be imported and used within `css.create()` and `css.createTheme()` calls anywhere within a codebase. There is also support for using multiple variables in string values.


```js title="vars.stylex.js"
import { css } from 'react-strict-dom';

export const colors = css.defineVars({
  accent: 'blue',
  background: 'white',
  line: 'gray',
  textPrimary: 'black',
  textSecondary: '#333',
});
```

## API

### Named variables

The `defineVars` function accepts an object of named variables. These variables can be referenced elsewhere by their key name. The value of a variable must be a valid style value (i.e., number, string, object value, or `null`.)

```js title="vars.stylex.js"
export const colors = css.defineVars({
  textPrimary: 'black',
  textSecondary: '#333',
});
```

```js title="component.js"
import { colors } from './vars.stylex.js';

const styles = css.create({
  text: {
    color: colors.textPrimary
  },
});
```
