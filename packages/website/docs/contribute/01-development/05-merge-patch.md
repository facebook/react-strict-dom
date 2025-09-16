---
slug: /contribute/merge-patch
---

# Merge a patch

<p className="text-xl">This workflow is recommended for those with permissions to merge patches.</p>

## Review a patch

All patches must pass CI tests and be reviewed before merging. Please familiarize yourself with [how reviews work on GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews).

If you determine that there are issues with the patch, please request changes and provide actionable feedback for the author to help them produce a patch that can eventually be merged.

## Checkout a patch

If a branch needs to be modified before merging, it can be checked out and modified locally. You may need to do this if a patch author doesn't follow up on review feedback in a timely manner, or if the patch has not been prepared as requested in the "Author a patch" guide.

Find the number of the "Pull Request" to amend. The following commands will checkout the patch locally in a new branch.

```bash
git fetch origin pull/<PR_NUMBER>/head:pr-<PR_NUMBER>
git checkout pr-<PR_NUMBER>
```

:::tip

If you find yourself regularly pulling down patches, you may want to [add a git alias](https://github.com/necolas/dotfiles/blob/master/git/gitconfig#L36-L38) to your `.gitconfig` so it can be done in one step, e.g., `git gh-pr <PR_NUMBER>`.

:::

## Modify a patch

Follow the steps in "Author a patch" to add, squash, and reword commits.

If you have made significant changes to their patch, e.g., added tests, fixed issues, etc., you should add yourself as a [commit co-author](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors). First, amend the patch:

```bash
git commit --amend
```

Then update the commit message to include the co-author information:

```bash
<commit-msg>
>
>
Co-authored-by: NAME <NAME@EXAMPLE.COM>
```

## Land a patch

Once a patch has been reviewed and approved by a code owner, it can be rebased and merged with `main`. Once the patch is merged, please delete its branch if published to the `origin` repository.
