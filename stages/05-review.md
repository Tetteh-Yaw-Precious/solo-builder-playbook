# Stage 5 — Review

**The question:** Is it *good*? (quality, security, simplification)

## What this stage is

The pass that catches what "it works" misses: correctness edge cases, security holes, needless complexity, and drift from convention. This is the teammate you're most missing.

## Why it matters more when solo

No one reviews your PR. Without a deliberate review step, shortcuts compound silently until the codebase rots. You must manufacture an adversarial second opinion.

## Key practices

- Run a structured self-review pass *before* merge, not after.
- Treat AI review as an adversarial reviewer — act on the feedback with rigor, don't rubber-stamp it.
- Separate quality review (reuse, dead code, over-engineering) from bug review — they find different things.
- Run a security pass on every diff that touches auth, data ownership, or user input.

## Tooling

- `/code-review` — adversarial review of your diff; `/code-review ultra` for deep multi-agent cloud review.
- `/simplify` — quality-only pass: reuse, dead code, over-engineering.
- `/security-review` — security pass on pending changes. Your security team.
- `requesting-code-review` / `receiving-code-review` skills — the discipline to act on feedback instead of performing agreement.

## TODO (fill as you practice)

- [ ] Run `/code-review` on my own diff before every merge for a week
- [ ] Run `/simplify` and actually apply what it finds
- [ ] Add `/security-review` to any auth/data-ownership change
- [ ] Practice receiving review without rubber-stamping (verify, then act)
