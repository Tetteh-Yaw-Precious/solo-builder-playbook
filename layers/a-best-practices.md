# Layer A — Best Practices / Discipline

**Not a stage — a quality applied to every stage.** These are the engineering principles that make Discovery through Operation *good* rather than just *done*.

## The governing principle

**Never let the code leave a working, verified state for long.** Every practice below serves this.

## Core disciplines

- **Small, frequent, working commits.** Your undo button, changelog, and reviewer's diff in one. Never let the working tree grow into an un-reviewable blob.
- **Vertical slices over horizontal layers.** Always have a working building, not half-built floors.
- **Test-first when it clarifies.** The test is the spec you'd otherwise not have.
- **Drive the real thing before claiming done.** Compiles ≠ works.
- **DRY, but not too dry.** Duplication is cheaper than the wrong abstraction. Wait for the third occurrence.
- **Boring and reversible beats clever.** Solo, you pay the full maintenance cost of every clever line.
- **Verify ownership before you mutate.** Check the resource belongs to the caller *before* changing it — route guards check permission, not ownership.
- **Match the surrounding code.** Consistency > personal style. Write for the future stranger (you, in six months).
- **Evidence before assertions.** Don't claim "fixed/passing" without running the check and seeing the output.
- **Surface risk early.** Recommend commits and flag large uncommitted work at natural checkpoints — don't wait for the end.

## Domain-specific rules worth codifying

*(Add rules each project teaches you. Examples of the shape:)*

- Never round money/tax; display exact values.
- Never hardcode currency symbols; use a formatter.
- Parse user-imported numbers with a tolerant parser, not raw `parseInt`.
- External service wrappers must not log; the orchestrator owns the log line.

## TODO (fill as you practice)

- [ ] Write my personal "non-negotiables" list (the rules I never break)
- [ ] Codify each hard-won lesson as a one-line rule here
- [ ] Audit one project against this list and note the gaps
