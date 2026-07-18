# Stage 2 — Design & Planning

**The question:** *How* will I build it? (architecture, slicing, the plan)

> Where you decide the shape of the solution and cut it into pieces that each keep the app working. The slicing decision matters more than the architecture decision.

## What this stage is

Two decisions: the **shape** of the solution (architecture, data model, boundaries) and the **slices** you'll build it in — each shipping something real end-to-end (UI → API → DB), not a horizontal layer.

## Why it matters more when solo

You're your own architect, with no one to catch an over-clever design or a bad slicing plan. Two specific solo traps:

- **Horizontal layering.** "Build all the models, then all the endpoints, then all the UI" leaves you with three half-built floors and no working building — and no way to verify anything until the end. Vertical slices keep the app *always working*, which is the invariant the whole playbook protects.
- **Cleverness you'll pay full price for.** On a team, a clever abstraction is maintained by many. Solo, *you* pay its entire maintenance cost, forever. Boring and reversible almost always wins.

## Key practices

- **Slice vertically.** Each slice is a thin, complete path through all layers that you can finish *and verify* in one sitting. "A user can add one line item and see the total" is a slice; "the invoice data model" is not.
- **Plan the next slice in detail; sketch the rest.** Detailed plans decay as you learn. Commit precisely to the next step, loosely to the horizon.
- **Write the plan down** so a fresh session — or a tired future you — can execute it without re-deriving the context. A plan you can hand off is a plan you actually understood.
- **Prefer boring and reversible.** Choose the design you can rip out cheaply if you're wrong. Solo, optionality is worth more than elegance.
- **Centralize logic that must not drift.** Rules that are easy to copy-paste (authorization hierarchy, tenant filters, money math) belong in *one* place — copies drift into bugs. (See [Field Note #5](../field-notes.md): one authorization resolver.)

## The output

An executable plan: an ordered list of vertical slices, each with its own observable "done." You should be able to pick up slice #1 and build it without further decisions.

## Tooling

- **`writing-plans` skill** — spec → step-by-step executable plan a fresh session can run.
- **GSD suite** (`gsd:new-project`, `gsd:plan-phase`, `gsd:execute-phase`, `gsd:progress`) — phase-based planning with state that survives context resets, for projects big enough that you'd lose the thread otherwise.
- **Figma MCP** — pull real designs into the plan instead of eyeballing them.

## Anti-patterns

| Anti-pattern | Why it fails | Fix |
|---|---|---|
| Horizontal layers (all models, then all endpoints) | Nothing works or is verifiable until the end | Vertical slices, each end-to-end |
| Slices too big to finish in a sitting | You lose the "always working" invariant | Cut thinner |
| Clever, hard-to-reverse architecture | Solo, you pay its full maintenance cost | Boring and reversible |
| Plan only in your head | A fresh session can't execute it; neither can tired-you | Write it down |
| Copy-pasting rules that must stay consistent | Copies drift into security/correctness bugs | Centralize in one place |

## TODO

- [ ] Break the next feature into vertical slices, each finishable in one sitting
- [ ] Write a plan a fresh session could execute without me re-explaining
- [ ] Try GSD phase-planning on one multi-session project
- [ ] Note one place I chose "boring & reversible" over clever
- [ ] Identify one rule that must not drift and centralize it
