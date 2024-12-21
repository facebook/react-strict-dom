---
slug: /learn/styles
---

# Styling components

<p className="text-xl">React Strict DOM includes a simple, scalable, and deterministic styling system. It produces optimized CSS output on web and adds many declarative styling features to native.</p>

## Creating styles

Styles are created with the `css.create` function and a map of style objects. In the example below, there are 2 named style rules - one called "base" and the other "highlighted". The names are arbitrary and represent the constant used to capture the result of the function call.

```js
import { css } from 'react-strict-dom';

const styles = css.create({
  base: {
    fontSize: 16,
    lineHeight: 1.5,
    color: 'rgb(60,60,60)',
  },
  highlighted: {
    color: 'rebeccapurple',
  },
});
```

Although styles can be inherited, there is no "selector" API and therefore no "styling at a distance".

### Shortform properties

Shortform properties style multiple properties at once. For example, `margin` sets the value for the left, right, top, and bottom margins on an element. React Strict DOM only allows a single value to be used with a shortform property, i.e., `margin: "1rem"` is allowed but `margin: "1rem 2rem"` is not. A shortform property can only be used to set *the same value* for each of the longform properties that it represents.

### Pseudo-elements

Pseudo-elements are a way of targeting shadow elements contained within the native elements provided by React Strict DOM. Currently, the only supported pseudo-element is `::placeholder`, which references the element that contains placeholder text within an `html.input` or `html.textarea` element. Only the `color` style can be set on a placeholder.

```js
import { css } from 'react-strict-dom';

const styles = css.create({
  input: {
    '::placeholder': {
      color: '#999',
    }
  },
});
```

### Pseudo-states

Pseudo-classes represent different states of an element. Declarations for pseudo-classes must be nested within properties. For example, to change the background color for different states:

```js
import { css } from 'react-strict-dom';

const styles = css.create({
  button: {
    backgroundColor: {
      default: 'lightblue',
      ':hover': 'blue',
      ':active': 'darkblue',
    },
  },
});
```

The `default` case is required when specifying property states. If you don't want any style to be applied in the default case, use `null` as the value.

### Media queries

Different media states of an element must also be nested within a property. The key should be a valid Media Query. For example:

```js
import { css } from 'react-strict-dom';

const styles = css.create({
  base: {
    width: {
      default: 800,
      '@media (max-width: 800px)': '100%',
      '@media (min-width: 1540px)': 1366,
    },
  },
});
```

### Fallback styles

The `firstThatWorks` method can be used to define fallback values that should be used in cases where a platform (or browser) might not support the first value.

```js
import { css } from 'react-strict-dom';

const styles = css.create({
  header: {
    position: css.firstThatWorks('sticky', 'fixed'),
  },
});
```

### Dynamic styles

Defining styles as a function allows them to be dynamically calculated at runtime. The style function can accept the dynamic parts of the style as parameters. These styles cannot be optimized as effectively as static styles.

```js
import { css, html } from 'react-strict-dom';

const styles = css.create({
  size: (height: number, width: number) => ({
    height * 0.9,
    width
  })
});

function MyComponent() {
  const {height, width} = useContainerSize();

  return <html.div style={styles.size(height, width))} />;
}
```

### Inherited styles

Inheritance is the process by which elements inherit the the values of properties from their ancestors in the DOM tree. Some properties, e.g. `color`, are automatically inherited by the children of the element to which they are applied. Each property defines whether it will be automatically inherited.

React Strict DOM currently only supports inheritance for text style properties on native (these style properties can be applied to any element.) The `inherit` or `unset` value can also be set for any of these properties to restore their default behavior.

## Using styles

Once styles have been defined, they can be passed directly to the `style` prop on `html.*` elements.

```jsx
import { css, html } from 'react-strict-dom';

const styles = css.create({
  root: { ... }
});

const Foo = () => (
  <html.div style={styles.root} />
);
```

Styles can be imported from other files and provided as props.

### Merge styles

The `style` prop can take a list of styles and merge them in a deterministic way.

The order in which the styles are defined does not affect the resulting styles, only the order in which they are applied to the HTML element.

```jsx
import { css, html } from 'react-strict-dom';

const styles = css.create({
  root: { ... }
});

const Foo = (props) => (
  <html.div style={[ props.style, styles.root ]} />
);
```

### Conditional styles

Styles can be conditionally applied using common JavaScript patterns, such as ternary expressions and the `&&` operator. Falsy styles (i.e., `null`, `undefined` or `false`) are ignored.

```jsx
<html.div
  style={[
    styles.root,
    props.isHighlighted && styles.highlighted,
    isActive ? styles.active : styles.inactive,
  ]}
/>
```

### Variant styles

A common styling pattern called "variants" allows styles to be set based on the value of props. This is easy to accomplish in React Strict DOM using object property lookups. This pattern can be combined with the conditional patterns to support arbitrarily complex logic for applying styles.

```jsx
import { css, html } from 'react-strict-dom';

const colorVariantStyles = css.create({
  red: {
    color: 'rgb(200, 0, 0)',
  },
  green: {
    color: 'rgb(0, 200, 0)',
  }
});

const sizeVariantStyles = css.create({
  small: {
    fontSize: '0.75rem',
  },
  large: {
    fontSize: '1.5rem',
  }
});

export function Foo({ color, size, ...props }) {
  return (
    <html.span
      {...props}
      style={[
        colorVariantStyles[color]
        sizeVariantStyles[size]
      ]}
    />
  )
}
```

## Debugging styles

React Strict DOM includes some helpful debugging information for web in the DOM output when `debug` is set to `true` in the [Babel preset](/api/babel-preset/). You may also find this [Atomic CSS Devtools](https://github.com/astahmer/atomic-css-devtools) extension useful. On native, the React Native DevTools should be used.
