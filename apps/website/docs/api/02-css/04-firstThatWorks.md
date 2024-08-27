# css.firstThatWorks

<p className="text-xl">How to define fallback style values.</p>

## Overview

Declare an ordered list of fallback values for a style property. The first supported style within the list takes effect within the browser.

```js
import { css } from 'react-strict-dom';

const styles = css.create({
  header: {
    position: css.firstThatWorks('sticky', 'absolute'),
  },
});
```

## API

### Values

The `firstThatWorks` function accepts any number of arguments, with the first that is supported by the runtime being used as the value of the property.
