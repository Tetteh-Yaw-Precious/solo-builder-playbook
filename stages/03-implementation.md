# Stage 3 — Implementation

**The question:** Building the slice — the craft of writing it.

## What this stage is

Actually writing the code for one vertical slice, in a way that stays working and reads like the code around it.

## Why it matters more when solo

No one else will read this code for months — except you, who will have forgotten everything. Write for that future stranger. Consistency beats brilliance.

## Key practices

- Isolate risky work in a git worktree so a broken experiment never touches your working app.
- Write the failing test first (TDD) — solo, it's the closest thing to a spec someone else handed you.
- Match the surrounding code's naming, comment density, and idioms.
- Commit at every green checkpoint. Small, frequent, working commits are your undo button and changelog.

## Tooling

- `using-git-worktrees` skill — isolated workspaces for parallel/risky work.
- `test-driven-development` skill — write the test before the code.
- Figma MCP (design-to-code) — implement designs directly.
- `gh` CLI — PRs and issues without leaving the terminal.

## TODO (fill as you practice)

- [ ] Do one feature fully test-first
- [ ] Use a worktree to isolate a risky change
- [ ] Practice committing at every green state (no giant blobs)
- [ ] Review my own diff for "does this read like the code around it?"
