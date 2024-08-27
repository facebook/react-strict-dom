---
slug: /contribute/workspaces-and-tasks
---

# Workspaces & Tasks

<p className="text-xl">The React Strict DOM repository uses [npm workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces) to manage multiple packages from within a singular top-level, root package. Learn how to run tasks for workspaces.</p>

## Root

The monorepo root configures a set of tools used to check various aspects of all packages, e.g., formatting, type checking, unit testing, compiling, linting, etc.

In general, all commands should be run from the root.

## Workspaces

There are currently 2 different directories of workspaces:

* `apps`
  * `examples`
  * `website`
* `packages`
  * `benchmarks`
  * `react-strict-dom`
  * `scripts`

The name of an individual workspace matches the value of the `name` field in that workspace's `package.json`.

Individual workspaces can have their own tools for package-specific tasks like builds, tests, etc.

## Tasks

Every task in the repository is run using `npm` and corresponds to a named `scripts` field in a `package.json`.

Tasks defined by the monorepo root will typically run across all workspaces:

```
npm run flow
```

Package-specific tasks have the same name across workspaces, and can be run by targeting specific workspaces.

```
npm run <task-name> -w <workspace-name>
```

For example, to build the `react-strict-dom` package and watch files for changes:

```
npm run dev -w react-strict-dom
```

## Modify a workspace

To modify the dependencies of a workspace you can either make edits directly to a workspace `package.json` and then run `npm install`. Or you can run commands within a workspace context, e.g., `npm install <package> -w <workspace>`.

New tasks can be added to a workspace in the `scripts` field of the workspace's `package.json`.
