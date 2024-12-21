# compat

<p className="text-xl">Unstable components for mixing React Native with React Strict DOM elements.</p>

:::warning

This is an experimental and unstable API intended to aid with incremental adoption in apps that cannot avoid nesting React Native element trees within React Strict DOM trees.

:::

## API

### native

A component that translates React Strict DOM props into React Native props, which can then be passed to a custom React Native element. A type annotation must be provided for `nativeProps`, which should match the props type of the React Native component being rendered.

Example:

```jsx
import { compat } from 'react-strict-dom';
import { Text } from 'react-native';

export component Foo(...props: FooProps) {
  return (
    <compat.native
      {...props}
      aria-label="label"
      as="text"
    >
      {(nativeProps: React.PropsOf<Text>)) => (
        <Text {...nativeProps} />
      )}
    </compat.native>
  )
}
```

#### Props

* `...reactStrictDOMProps`
  * Any props accepted by `html.*` elements.
* `children: (nativeProps) => React.Node`
  * Must be a function, which receives the computed `nativeProps` as the only argument and returns a React Native element.
* `as: 'image' | 'input' | 'text' | 'textarea' | 'view'`
  * Tells the component how to translate the props for native. For example, if rendering to a multiline `TextInput`, use `textarea`. Defaults to `view`.
