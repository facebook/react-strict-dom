---
slug: /learn/themes
---

# Theming components

<p className="text-xl">React Strict DOM provides a flexible theming API that makes it easy to apply themed values to entire trees of components using CSS variables.</p>

:::info[Requirements]

Variables must be defined in a file that matches the following file extension pattern: `.stylex.{js,jsx,mjs,ts,tsx}`. Only CSS variables can be defined in these files. And every `css.defineVars` call must be a named export.

:::

## Defining variables

CSS variables are defined with a call to `css.defineVars`. This defines global variables which can then be imported as constants for use in any style rules. These variables and their values are essentially a "default theme".

```js title="tokens.stylex.js"
import { css } from 'react-strict-dom';

export const tokens = css.defineVars({
  primaryText: 'black',
  secondaryText: '#333',
  accent: 'blue',
  background: 'white',
  lineColor: 'gray'
});
```

Any theme can define a "dark mode" alternate – which is automatically applied when the OS theme matches –  by specifying different values for the `prefers-color-scheme` Media Query:

```js title="tokens.stylex.js"
import { css } from 'react-strict-dom';

const darkMode = '@media (prefers-color-scheme: dark)';

export const colors = css.defineVars({
  primaryText: {
    default: 'black',
    [darkMode]: 'white'
  },
  secondaryText: {
    default: '#333',
    [darkMode]: '#ccc'
  },
  accent: {
    default: 'blue',
    [darkMode]: 'lightblue'
  },
  background: {
    default: 'white',
    [darkMode]: 'black'
  },
  lineColor: {
    default: 'gray',
    [darkMode]: 'lightgray'
  }
});
```

## Using variables in styles

Once variables have been defined, they can be imported and used directly in style rules created with `css.create`.

```js title="Component.js"
import { css } from 'react-strict-dom';
import { colors } from './tokens.stylex';

const styles = css.create({
  container: {
    color: colors.primaryText,
    backgroundColor: colors.background,
  }
});
```

## Using variables to create themes

If an app supports multiple themes, these can be created by using `css.createTheme` to define new values for the global variables defined by the default theme. Named groups of variables can be imported and passed to `css.createTheme` with new values specified.

Themes can be created with `css.createTheme` anywhere in a codebase, and passed around across files or components.

```js title="theme.js"
import { css } from 'react-strict-dom';
import { colors, spacing } from './tokens.stylex';

const darkMode = '@media (prefers-color-scheme: dark)';

const themeColors = css.createTheme(colors, {
  primaryText: {default: 'purple', [darkMode]: 'lightpurple'},
  secondaryText: {default: 'pink', [darkMode]: 'hotpink'},
  accent: 'red',
  background: {default: '#555', [darkMode]: 'black'},
  lineColor: 'red',
});

const themeSpacing = css.createTheme(spacing, {
  ...
});

export const theme = [ themeColors, themeSpacing ];
```

## Using themes

The return value of `css.createTheme` is a style object similar to the ones created with `css.create`. These theme objects can be applied to any element using the `style` prop. The themed values of the variables will then be applied to all elements in the subtree that are using the global variables.

```jsx title="Component.js"
import { css, html } from 'react-strict-dom';
import { colors, spacing } from './tokens.stylex';
import { theme } from './theme';

const styles = css.create({
  container: {
    color: colors.primaryText,
    backgroundColor: colors.background,
    padding: spacing.medium,
  },
});

const Foo = () => (
  <html.div style={[ theme, styles.container ]} />
);
```

This is a flexible pattern that allows you to style components using variables, and then re-theme entire trees by applying a theme to just one element at the root of any subtree. For example, if you have multiple themes you might create a `Theme` component that makes it easy for product engineers to select a theme by name.

```jsx title="Theme.js"
import { css, html } from 'react-strict-dom';
import { marsTheme } from './marsTheme';
import { venusTheme } from './venusTheme';

const styles = css.create({
  displayContents: {
    display: 'contents'
  }
});

const Theme = (props) => {
  const theme = props.name === 'venus' ? venusTheme : marseTheme;
  return (
    <html.div
      children={props.children}
      style={[ theme, styles.displayContents ]}
    />
  );
}
```

Simply wrapping a component in the `Theme` component will ensure that the specified theme overrides the values of variables for all descandant elements.

```jsx title="App.js"
import { ProfilePage } from './ProfilePage';
import { Theme } from './Theme';

const App = () => (
  <Theme name={app.activeTheme}>
    <ProfilePage user={user} />
  </Theme>
);
```
