# css.create

<p className="text-xl">How to create static and dynamic styles in React Strict DOM.</p>

:::warning

On web the style compiler and static types do not yet enforce constraints on the properties and values that can be used (e.g., various short-form properties are disallowed). This is a work in progress that depends on improvements to StyleX.

:::

## Overview

`css.create` is a function that accepts a map of style objects, and returns opaque JavaScript objects that should be passed to the `style` prop of `html.*` elements. Your code *must not introspect or modify the return value*, because it is compiled into an optimized form. The set of supported properties and values supported by different platforms is documented in the [css](/api/css) section's compatibility table.

```js
import { css } from 'react-strict-dom';

const styles = css.create({
  foo: {
    backgroundColor: 'red'
  },
  bar: (color, padding) => ({
    color: color,
    padding: padding
  })
});
```

## API

### Style rules

The `create` function accepts an object of named style rules. These rules can be referenced elsewhere by their key name.

```js
const styles = css.create({
  foo: {
    backgroundColor: 'red'
  }
});

export const foo = styles.foo;
```

### Style rule

A style rule is a combination of a style name (e.g., `root`) and a declaration object (or a function that returns such an object). A declaration object contains one or more style property-value pairs.

```js
const styles = css.create({
  // style rule's name is "foo"
  foo: {
    // declaration
    backgroundColor: 'red'
  }
});
```

### Style rule (function)

A function rule returns a declaration object when it is called. This should only be used to define dynamic styles that rely on runtime data during a component render (i.e. values that cannot be known ahead of time).

```js
const styles = css.create({
  bar: (color: string, padding: number) => ({
    color: color,
    padding: padding
  })
});

styles.bar(color, padding)
```

A function rule can accept any number of arguments, but they must be simple identifiers. A function rule must use the arrow syntax shown and the body must be an object literal. You cannot use a function body with multiple statements, destructuring, or default values.

```jsx
import { css } from 'react-strict-dom';

const styles = css.create({
  dynamic: (r, g, b) => ({
    color: `rgb(${r}, ${g}, ${b})`,
  }),
});

// in a component render
const { red, green, blue } = getColorsFromData(props.data)
styles.dynamic(red, green, blue)
```

### Style value

Style values can be either a string, a number, an object, the return value of `css.firstThatWorks()`, or `null`.

```js
const styles = css.create({
  foo: {
    backgroundColor: 'white',
    borderWidth: 10,
    color: {
      default: 'gray',
      ':hover': 'black'
    },
    position: css.firstThatWorks('sticky', 'absolute'),
    textDecorationLine: null
  }
});
```

### Style value (object)

An object value is used to define specific, stateful conditions for the property. This object only accepts certain named keys, which are as follows:

* `default` - The default value for the property when no state is otherwise active.
* `:hover` - The value when the element is being hovered.
* `:focus` - The value when the element is focused.
* `:active` - The value when the element is actively pressed.
* `::placeholder` - The placeholder value of input elements.
* `@media (...)` - The value when a given Media Query condition is satisfied. Dimension and color-scheme only.

Example of pseudo-states:

```js
const styles = css.create({
  root: {
    color: {
      default: 'black',
      ':hover': 'red',
      ':focus': 'green',
      ':active': 'blue',
    }
  }
});
```

The order of precedence for pseudo-states is `active` (highest), then `focus`, then `hover` (lowest). The pseudo-states are currently only supported on native for certain elements that accept the related user interaction. For example, `:focus` is only supported on native elements that implement the `onFocus` and `onBlur` event handlers. The values of pseudo-state fields must be primitive types, and cannot be another style value object.

Example of media queries:

```js
const styles = css.create({
  root: {
    color: {
      default: 'black',
      '@media (prefers-color-scheme:dark)': 'white'
    },
    width: {
      default: '100%',
      '@media (min-width:320px)': '800px',
    }
  }
});
```

Within a Media Query, only pseudo-states and pseudo-elements are allowed as part of a nested style value object.

```js
const styles = css.create({
  root: {
    color: {
      default: 'black',
      ':hover': 'darkgray',
      '@media (prefers-color-scheme:dark)': {
        default: 'white',
        ':hover': 'lightgray'
      }
    }
  }
});
```
