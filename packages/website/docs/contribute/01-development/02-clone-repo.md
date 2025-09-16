---
slug: /contribute/clone-repo
---

# Clone the repository

<p className="text-xl">React Strict DOM is a Git repository maintained by Meta at [facebook/react-strict-dom](https://github.com/facebook/react-strict-dom) Learn how to fork and clone the source code.</p>

## Install git

You can interact with the git version control through the git command line program. We recommend following [GitHub's instructions](https://docs.github.com/en/get-started/getting-started-with-git/set-up-git) to install git.

## Clone the source

Meta-employees who have linked GitHub accounts and are registered as contributors may simply clone the source repository into a local folder.

```
git clone git@github.com:facebook/react-strict-dom.git
cd react-strict-dom
```

## Clone a fork

Other contributors should [fork the repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) to a GitHub account. And then clone the remote fork.

```
git clone git@github.com:<username>/react-strict-dom.git
cd react-strict-dom
```

If using a fork, add an `upstream` remote that points to the `facebook/react-strict-dom` repo so that the fork can be kept up-to-date with upstream changes.

```
git remote add upstream git@github.com:facebook/react-strict-dom.git
```
