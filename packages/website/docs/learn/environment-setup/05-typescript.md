---
slug: /learn/setup-typescript
---

# Typescript

<p className="text-xl">Learn how to configure Typescript for React Strict DOM.</p>

## About Typescript

[TypeScript](https://www.typescriptlang.org/) is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

## Platform-specific files

React Strict DOM supports creating separate implementations for different platforms—such as web and native using platform-specific file extensions (e.g., `.web.tsx`, `.native.tsx`). This approach allows you to write custom code for each platform while sharing a single codebase. To ensure TypeScript correctly resolves these files during development and builds, you can use the `moduleSuffixes` option in your `tsconfig.json`. The following configuration tells TypeScript to prioritize platform-specific files when resolving imports:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "moduleSuffixes": [".ios", ".android", ".native", ".web", ""],
    // ...
  },
  // ...
}
```
