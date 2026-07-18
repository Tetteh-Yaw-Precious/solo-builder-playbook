# Layer C — Knowledge & Memory

**Not a stage — how you retain context and decisions across time** so you don't re-learn the same lesson every project.

## Why this is a real layer, not an afterthought

Solo, you *are* the team's memory. There's no colleague who "remembers why we did it that way." If you don't externalize decisions, every context switch and every new project pays the re-learning tax again.

## What to capture (and what not to)

**Capture** the non-obvious:
- Decisions and *why* — especially reversals and trade-offs.
- Gotchas that cost you real time (the parser that fails on `"1,000"`, the ORM that resurrects deleted rows).
- Constraints not derivable from the code or git history.
- Pointers to external resources (dashboards, tickets, source-of-truth data).

**Don't capture** what the artifact already records:
- Code structure, past fixes, git history — the repo already holds these.
- Anything that only matters to one conversation.

## Practices

- **One fact per note**, with a one-line summary you can scan later.
- **Convert relative dates to absolute** ("last Tuesday" → a real date).
- **Link related notes** so recall surfaces the neighborhood, not just the hit.
- **Update, don't duplicate** — fix the existing note rather than adding a near-copy; delete notes that turn out wrong.
- **Write lessons back into this playbook** — when a project teaches a rule, it belongs in Layer A.

## Tooling

- Persistent file-based **memory** (per-project, loaded each session).
- This **playbook repo** itself — the cross-project memory that outlives any single codebase.
- A lightweight **decision log** (ADRs or a running `DECISIONS.md`) per project.

## TODO (fill as you practice)

- [ ] Start a `DECISIONS.md` in the next project and log every real trade-off
- [ ] Move one hard-won gotcha into Layer A as a permanent rule
- [ ] Set up per-project memory so sessions start smarter
- [ ] Review this playbook after each project and update it
