# css.defineConsts

<p className="text-xl">How to define constants for use in styles and themes.</p>

:::warning

Constants must be defined as named exports in files with a `*.stylex.js` (or `*.stylex.ts`) extension. This limitation is currently imposed due to constraints on how styles are compiled on web.

## Overview

This API creates style variables that can be imported and used within `css.create()` and `css.createTheme()` calls anywhere within a codebase. These values are inlined at build time and do not generate variables.

```js title="constants.stylex.js"
import { css } from 'react-strict-dom';

export const breakpoints = css.defineConsts({
  small: '@media (max-width: 600px)',
  medium: '@media (min-width: 601px) and (max-width: 1024px)',
  large: '@media (min-width: 1025px)',
});
```

## API

### Named variables

The `defineConsts` function accepts an object of named constants. These constants can be referenced elsewhere by their key name.

```js title="component.js"
import { breakpoints } from './constants.stylex.js';

const styles = css.create({
  box: {
    padding: {
      default: '10px',,
      [breakpoints.medium]: '15px',
      [breakpoints.large]: '20px',
    },
  },
});
```
