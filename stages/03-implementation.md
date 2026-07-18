# Stage 3 — Implementation

**The question:** Building the slice — the craft of writing it.

> Write for the future stranger who has to maintain this: you, six months from now, with zero memory of today. Consistency beats brilliance.

## What this stage is

Actually writing the code for one vertical slice — in a way that stays working, reads like the code around it, and doesn't plant the bugs the later stages will have to catch.

## Why it matters more when solo

No one else reads this code for months — except you, who will have forgotten everything. There's no teammate whose style you're converging toward, so the discipline has to be self-imposed: match the surrounding code, keep commits small, and don't leave clever surprises for future-you to defuse.

## Key practices

- **Isolate risky work in a git worktree** so a broken experiment never touches your working app. Cheap insurance against "I broke main while trying something."
- **Write the failing test first** where it clarifies (TDD). Solo, the test is the spec someone else would otherwise have handed you — it defines "done" before you're tempted to move the goalposts.
- **Match the surrounding code** — naming, comment density, file structure, idioms. Consistency is a feature; personal flourishes are debt.
- **Commit at every green checkpoint.** Small, frequent, working commits are your undo button, your changelog, and your reviewer's diff. Never let the tree grow into an un-reviewable blob.
- **Handle real-world input defensively.** User data is messier than your test fixtures — imported numbers carry currency symbols and separators ([Field Note #1](../field-notes.md)), text carries invisible characters ([Field Note #6](../field-notes.md)). Parse and normalize at the boundary.
- **Verify ownership before you mutate.** On any handler that changes a resource, confirm it belongs to the caller *first* ([Field Note #2](../field-notes.md)) — the route guard doesn't do this for you.

## The craft checklist (per slice)

1. Worktree for anything risky.
2. Failing test (where it clarifies the target).
3. Implement the thin end-to-end path.
4. Make it read like its neighbors.
5. Normalize/validate real-world input at the boundary.
6. Commit at green.

## Tooling

- **`using-git-worktrees` skill** — isolated workspaces for parallel/risky work.
- **`test-driven-development` skill** — write the test before the code.
- **Figma MCP** (design-to-code) — implement designs directly instead of eyeballing.
- **`gh` CLI** — PRs and issues without leaving the terminal.

## Anti-patterns

| Anti-pattern | Why it fails | Fix |
|---|---|---|
| Experimenting on your working branch | One broken experiment blocks everything | Worktree for risky work |
| Personal style over local convention | Future-you can't read a codebase of dialects | Match the surrounding code |
| Giant uncommitted blob | Un-reviewable even by you; no undo points | Commit at every green state |
| Trusting input like a test fixture | Real data breaks assumptions (`"1,000"` → `1`) | Normalize/validate at the boundary |
| Mutating before checking ownership | IDOR / cross-tenant bug | Verify ownership first |

## TODO

- [ ] Do one feature fully test-first
- [ ] Use a worktree to isolate a risky change
- [ ] Practice committing at every green state (no giant blobs)
- [ ] Review my own diff for "does this read like the code around it?"
- [ ] Add boundary normalization/validation for one real-world input
