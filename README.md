# Solo Builder Playbook

A reusable workflow for building and running software well **when you are the whole team** — PM, architect, engineer, QA, reviewer, and ops, all at once.

This repo is a curriculum, not a one-off note. The goal is to *execute it project after project*: every new build runs through the same spine, held to the same disciplines, powered by the same tooling. Clone it, reference it, and improve it as you learn.

## First principles

"How should a solo builder work?" decomposes along **two axes**. Confusing the two is why the topic feels like a blur.

### Axis 1 — The lifecycle spine (sequential: *what* you do, in order)

Work flows through these stages. Each ships something real before the next begins.

| # | Stage | The question it answers |
|---|-------|-------------------------|
| 1 | [Discovery](stages/01-discovery.md) | Am I building the *right* thing? |
| 2 | [Design & Planning](stages/02-design-planning.md) | *How* will I build it? (architecture, slicing, the plan) |
| 3 | [Implementation](stages/03-implementation.md) | Building the slice — the craft of writing it |
| 4 | [Verification](stages/04-verification.md) | Does it actually work? (drive the real thing) |
| 5 | [Review](stages/05-review.md) | Is it *good*? (quality, security, simplification) |
| 6 | [Integration & Release](stages/06-integration-release.md) | Get it shipped (CI/CD, deploy) |
| 7 | [Operation](stages/07-operation.md) | Run it in production (observability, incidents, reliability) |

### Axis 2 — The cross-cutting layers (parallel: *how well* you do all of the above)

These are not stages. They run *through every stage*.

| Layer | What it is |
|-------|-----------|
| [A — Best practices / discipline](layers/a-best-practices.md) | The engineering principles that make each stage good |
| [B — Tooling](layers/b-tooling.md) | The instruments that execute each stage faster |
| [C — Knowledge & memory](layers/c-knowledge-memory.md) | Retaining context and decisions across time |

## The mental model

```
   DISCIPLINE  ───────────────────────────────►  applies to every stage
   TOOLING     ───────────────────────────────►  applies to every stage
   MEMORY      ───────────────────────────────►  applies to every stage
   ┌───────┬────────┬───────┬────────┬───────┬──────────┬──────────┐
   │Disco- │Design/ │Impl-  │Verify  │Review │Integrate │ Operate  │
   │very   │Plan    │ement  │        │       │/Release  │          │
   └───────┴────────┴───────┴────────┴───────┴──────────┴──────────┘
```

## The one rule that holds it together

**Never let the code leave a working, verified state for long.** Small slice → drive it → commit → repeat. Every stage and every discipline exists to protect that invariant. A solo builder's velocity does not come from typing fast; it comes from never having to backtrack.

## The two failure modes this playbook defends against

1. **Building the wrong thing** — no PM to push back → *Discovery* + *Design* exist to catch this.
2. **Building it in a way that rots** — no reviewer, so shortcuts compound → *Review* + the *Discipline* layer exist to catch this.

## How to use this repo

- Each stage and layer has its own file: a short intro, why it matters more when solo, key practices, tooling, and a TODO checklist.
- Each topic also has a tracked **GitHub issue** — work through them, check items off, add what you learn.
- This is a living document. When a project teaches you something, write it back here so the next project starts smarter.

---

*Status: starter skeleton. Fill each stage's checklist as you practice it.*
