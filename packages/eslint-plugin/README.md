# eslint-plugin-react-strict-dom

A plugin to restrict styles to those that are supported on both web and native.

## How to fix?

If the lint rule complains about a invalid style property, the following options exist:

* Remove the invalid style.
* Allow the invalid style, ignore the lint warning, and accept the runtime warning.
* Split the component or its styles into separate `*.web.js` and `*.native.js` files.

### Examples

✅  Examples of ***valid*** code for this rule:

You can either replace this with a valid property:

```js
// Foo.js
const styles = stylex.create({
  root: {
    textAlign: 'center',
  },
});
```

❌  Examples of ***invalid*** code for this rule:

```js
// Foo.js
const styles = css.create({
  root: {
    justifySelf: 'center', // `justifySelf` is not supported on native
  },
});
```

If you *have to* use a property on web that is unsupported on native, fork the implementation based on the platforms:

```js
// Foo.web.js
// The plugin will ignore `*.web.js` files.
const styles = stylex.create({
  root: {
    justifySelf: 'center'
  },
});

// Foo.native.js
const styles = stylex.create({
  root: {
    textAlign: 'center'
  },
});
```

## License

React Strict DOM is MIT licensed.
