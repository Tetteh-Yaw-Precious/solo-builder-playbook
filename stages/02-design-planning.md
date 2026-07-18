# Stage 2 — Design & Planning

**The question:** *How* will I build it? (architecture, slicing, the plan)

## What this stage is

Deciding the shape of the solution and breaking it into **vertical slices** — each shipping something real end-to-end (UI → API → DB), not horizontal layers.

## Why it matters more when solo

You are your own architect. Horizontal layering ("all the models, then all the endpoints") leaves you with three half-built floors and no working building. Vertical slices keep the app *always working*, which is the invariant everything else protects.

## Key practices

- Slice vertically: each slice is finishable and verifiable in one sitting.
- Plan the slice, not the whole feature. Detail decays; commit to the next step, sketch the rest.
- Write the plan down so a fresh session (or a tired future you) can execute it without re-deriving context.
- Prefer the boring, reversible architecture. Solo, you can't afford to maintain cleverness.

## Tooling

- `writing-plans` skill — spec → step-by-step executable plan.
- GSD suite (`gsd:new-project`, `gsd:plan-phase`, `gsd:execute-phase`, `gsd:progress`) — phase-based planning with state that survives context resets, for bigger projects.
- Figma MCP — pull designs into code instead of eyeballing them.

## TODO (fill as you practice)

- [ ] Break the next feature into vertical slices, each finishable in one sitting
- [ ] Write a plan a fresh session could execute without me re-explaining
- [ ] Try GSD phase-planning on one multi-session project
- [ ] Note one place I chose "boring & reversible" over clever
