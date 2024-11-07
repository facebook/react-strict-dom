# compat

<p className="text-xl">Unstable components for mixing React Native with React Strict DOM elements.</p>

:::warning

This is an experimental and unstable API intended to aid with incremental adoption in apps that cannot avoid nesting React Native element trees within React Strict DOM trees.

:::

## API

### native

A component that translates React Strict DOM props into React Native props, which can then be passed to a custom React Native element. A type annotation must be provided for `nativeProps`, which should match the props type of the React Native component being rendered.

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

The `children` prop must be a function, which receives `nativeProps` as the only argument.

The `as` prop accepts values of `image`, `input`, `text`, `textarea`, and `view`.
