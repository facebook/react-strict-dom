---
slug: /contribute/how-web-works
---

# How web works

<p className="text-xl">React Strict DOM is very simple on the web; it compiles optimized components and styles.</p>

## Development runtime

During development there is a very lightweight runtime component wrapper that validates styles and adds debugging information.

## Optimizing compiler

Production builds rely on an optimizing compiler (using Babel) that avoids component wrappers, and limits the runtime to an optimized style merging function. Components authored with React Strict DOM are flattened to the default React DOM components.

## Style compiler

Styles are optimized and extracted from JavaScript (using Babel). This is currently somewhat complicated and requires bundler integration to generate a CSS file.
