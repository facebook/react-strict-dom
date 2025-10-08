# React Strict DOM (RSD) - LLM Guide

React Strict DOM is a cross-platform JavaScript library that provides React components based on web standards (W3C, React DOM). Write once using HTML, CSS, and DOM APIs that work on web and React Native (Android/iOS).

**Key characteristics:**
- Strict subset of React DOM and Web APIs
- Under 2 KB runtime on web, generates atomic CSS
- Renders platform-native UI elements
- Unified types across platforms (e.g., `HTMLElement`)

## Installation

```bash
npm install react-strict-dom
```

**Dependencies:** `react` + `react-dom` (web) or `react-native` (native)

**Setup (required):**
- Babel: `react-strict-dom/babel-preset`
- PostCSS: `react-strict-dom/postcss-plugin` (web)
- Import CSS file with `@react-strict-dom` directive
- Root element: `data-layoutconformance="strict"`

## Core Differences from React DOM

```jsx
// React DOM
import React from 'react';
function App() {
  return <div className={styles.root}>Hello</div>;
}

// React Strict DOM
import { html, css } from 'react-strict-dom';
const styles = css.create({
  root: { padding: 16, backgroundColor: 'white' }
});
function App() {
  return <html.div style={styles.root}>Hello</html.div>;
}
```

**Key Changes:**
1. **Elements:** Use `<html.div>`, `<html.span>`, etc.
2. **Styling:** No `className` - use `style` prop with `css.create()` only
3. **Props:** Use `for` NOT `htmlFor`, `role="none"` NOT `role="presentation"`
4. **Refs:** Use ref callbacks, not `useRef` objects
5. **Events:** Only bubble phase on elements (use EventTarget API for capture)

## Styling System

### Basic Styles

```jsx
import { css, html } from 'react-strict-dom';

const styles = css.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8
  }
});

<html.div style={styles.container}>Content</html.div>
```

### Pseudo-states

Nest within properties. `default` is required.

```jsx
const styles = css.create({
  button: {
    backgroundColor: {
      default: 'lightblue',
      ':hover': 'blue',
      ':focus': 'darkblue',
      ':active': 'navy'
    }
  }
});
```

**Supported:** `:hover`, `:focus`, `:active`, `::placeholder` (color only)

### Media Queries

```jsx
const styles = css.create({
  container: {
    width: {
      default: 320,
      '@media (min-width: 768px)': 600,
      '@media (min-width: 1024px)': 800
    },
    color: {
      default: 'black',
      '@media (prefers-color-scheme: dark)': 'white'
    }
  }
});
```

**Supported:** Dimension queries, `prefers-color-scheme`, `prefers-reduced-motion`

### Merging & Conditional Styles

```jsx
<html.div
  style={[
    styles.base,
    isActive && styles.active,
    variant === 'primary' && styles.primary,
    style  // External styles
  ]}
/>
```

### Dynamic Styles

```jsx
const styles = css.create({
  dynamicSize: (height, width) => ({
    height: height * 0.9,
    width
  })
});

<html.div style={styles.dynamicSize(100, 200)} />
```

**Limitations:** Arrow syntax, object literal body, simple identifier params

### Fallback Values

```jsx
const styles = css.create({
  header: {
    position: css.firstThatWorks('sticky', 'fixed')
  }
});
```

### Shortform Properties

Only single values: `margin: 16` ✓ | `margin: "16px 8px"` ✗

## Theming

### Define Variables (*.css.{js,jsx,ts,tsx})

```jsx
// tokens.css.js
import { css } from 'react-strict-dom';

export const colors = css.defineVars({
  primary: {
    default: 'blue',
    '@media (prefers-color-scheme: dark)': 'lightblue'
  },
  background: {
    default: 'white',
    '@media (prefers-color-scheme: dark)': 'black'
  }
});
```

### Use Variables

```jsx
import { colors } from './tokens.css.js';

const styles = css.create({
  container: {
    color: colors.primary,
    backgroundColor: colors.background
  }
});
```

### Create & Apply Themes

```jsx
// theme.js
export const darkTheme = css.createTheme(colors, {
  primary: 'purple',
  background: '#222'
});

// App.js
<html.div style={darkTheme}>
  {/* All children use themed variables */}
</html.div>
```

## HTML Elements & Props

**Available elements:** `div`, `span`, `p`, `h1`-`h6`, `button`, `input`, `textarea`, `img`, `a`, `ul`, `ol`, `li`, `section`, `article`, `header`, `footer`, `nav`, `main`, and more.

**Common props:** `style`, `children`, `aria-*`, `data-*`, `data-testid`, `dir`, `hidden`, `id`, `lang`, `role`, `ref`, `tabIndex` (0 or -1)

**Common events:** `onClick`, `onPointerDown/Up/Move`, `onKeyDown/Up`, `onFocus/Blur`, `onScroll`, `onCopy/Cut/Paste`

**Examples:**

```jsx
// Button
<html.button disabled={false} onClick={(e) => {}}>Click</html.button>

// Input
<html.input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Text" maxLength={100} />

// Image
<html.img src="/image.jpg" alt="Description" width={300} height={200} />

// Link
<html.a href="https://example.com">Link</html.a>
```

## DOM APIs

Use ref callbacks for element access:

```jsx
<html.div ref={(node) => {
  if (node) {
    // Measurement
    node.getBoundingClientRect();
    node.offsetHeight;
    node.clientWidth;

    // Traversal
    node.parentElement;
    node.children;
    node.nextSibling;

    // Interaction
    node.focus();
    node.blur();
    node.scrollTop;
    node.scrollLeft;
  }
}}>Content</html.div>
```

## Native Platform Integration (compat.native)

Use in `*.native.js` files to wrap React Native components:

```jsx
import type { TextProps } from 'react-native';
import { compat } from 'react-strict-dom';
import { Text } from 'react-native';

function CustomText(props) {
  return (
    <compat.native {...props} as="span">
      {(nativeProps: TextProps) => (
        <Text {...nativeProps}>{props.children}</Text>
      )}
    </compat.native>
  );
}
```

**Element mapping via `as`:**
- `as="span"` → Text
- `as="div"` → Container/Pressable
- `as="img"` → Image
- `as="input"` → Single-line TextInput
- `as="textarea"` → Multi-line TextInput

**Rules:**
- ✓ Type `nativeProps` with React Native type
- ✓ Spread entire `nativeProps` object
- ✗ Don't destructure `nativeProps`

## Cross-Platform Constraints

### Display
**Supported:** `flex`, `none`, `contents`, `block` (partial)
**Not supported:** `inline`, `inline-block`, `inline-flex`, `grid`

### Position
**Supported:** `relative`, `absolute`, `static`
**Not on native:** `fixed`, `sticky`

### Limitations
- No flow/grid layout or inline flexbox on native
- No margin collapse
- No `calc()`, `min()`, `max()`, `clamp()`
- No `url()` values
- No 3D transforms
- No animation properties (use React Native Animated)
- Background: only `backgroundColor` and `backgroundImage` (gradients)

### Units
**Supported:** Numbers (px), `%`, `rem`, `em`, `vh`, `vw`, `vmin`, `vmax`

## Migration Guide: React DOM → RSD

### 1. Change Imports
```jsx
// Before:
import React from 'react';
// After:
import { html, css } from 'react-strict-dom';
```

### 2. Convert Elements & Styles
```jsx
// Before
import styles from './styles.module.css';
<div className={styles.container}>
  <span className={styles.text}>Text</span>
</div>

// After
const styles = css.create({
  container: { padding: 16 },
  text: { fontSize: 16 }
});
<html.div style={styles.container}>
  <html.span style={styles.text}>Text</html.span>
</html.div>
```

### 3. Convert Conditional Styles
```jsx
// Before: className={`${styles.base} ${active ? styles.active : ''}`}
// After:
style={[styles.base, active && styles.active]}
```

### 4. Fix Props
```jsx
// Before: <label htmlFor="id"> <div role="presentation">
// After:
<html.label for="id"> <html.div role="none">
```

### 5. Convert Pseudo-states
```jsx
// Before (CSS): .button { background: lightblue; } .button:hover { background: blue; }
// After:
const styles = css.create({
  button: {
    backgroundColor: {
      default: 'lightblue',
      ':hover': 'blue'
    }
  }
});
```

### 6. Convert Media Queries
```jsx
// Before (CSS): .container { width: 320px; } @media (min-width: 768px) { .container { width: 600px; } }
// After:
const styles = css.create({
  container: {
    width: {
      default: 320,
      '@media (min-width: 768px)': 600
    }
  }
});
```

## Complete Example

```jsx
// tokens.css.js
import { css } from 'react-strict-dom';
export const colors = css.defineVars({
  primary: { default: 'blue', '@media (prefers-color-scheme: dark)': 'lightblue' },
  text: { default: 'black', '@media (prefers-color-scheme: dark)': 'white' },
  background: { default: 'white', '@media (prefers-color-scheme: dark)': '#222' }
});

// Component.js
import { html, css } from 'react-strict-dom';
import { colors } from './tokens.css.js';

const styles = css.create({
  container: {
    padding: 16,
    backgroundColor: colors.background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16
  },
  button: {
    padding: 12,
    backgroundColor: {
      default: colors.primary,
      ':hover': 'darkblue',
      ':active': 'navy'
    },
    color: 'white',
    borderRadius: 8,
    borderWidth: 0
  }
});

function Card({ title, onPress, style }) {
  return (
    <html.div style={[styles.container, style]}>
      <html.h1 style={styles.title}>{title}</html.h1>
      <html.button style={styles.button} onClick={onPress}>
        Click me
      </html.button>
    </html.div>
  );
}
```

## Platform-Specific Files

Use file extensions for platform-specific code:
- `*.js` - Cross-platform (preferred)
- `*.web.js` - Web-only
- `*.native.js` - Native-only (use `compat.native` if needed)

## Common Mistakes

1. ✗ Using `className` → ✓ Use `style` prop
2. ✗ Using `htmlFor` → ✓ Use `for`
3. ✗ Using `role="presentation"` → ✓ Use `role="none"`
4. ✗ Manual style objects → ✓ Use `css.create()`
5. ✗ Destructuring `nativeProps` → ✓ Spread entire object
6. ✗ Inline styles → ✓ Use `css.create()`
7. ✗ Multiple shortform values → ✓ Single value: `margin: 16`
8. ✗ Missing `default` → ✓ Required with pseudo-states/media queries

## Best Practices

1. Define styles at module level, not inside components
2. Use `css.defineVars()` for design tokens
3. Compose styles with arrays: `style={[base, variant, props.style]}`
4. Test cross-platform - consider native constraints
5. Use `compat.native` sparingly - prefer pure RSD
6. Follow naming: `.js` (cross-platform), `.native.js`/`.web.js` (platform-specific)
7. Set `data-layoutconformance="strict"` on root element
