# Stage 1 — Discovery

**The question:** Am I building the *right* thing?

> The cheapest place to be wrong. A sentence is free to rewrite; three hours of code is not. Most solo waste is manufactured here, by skipping it.

## What this stage is

Turning a raw idea into a clear, bounded intent *before* any code exists: what it does, what it explicitly does **not** do, and what "done" looks like as an observable behavior.

## Why it matters more when solo

You have no PM to push back, no one to ask "wait, why are we building this?" The absence is silent — nothing stops you from building the wrong thing beautifully. So Discovery is the check you install *for* the missing PM. The failure it prevents — **building the wrong thing** — is one of the two ways solo products die (the other, building it so it rots, is caught by Review + Discipline).

## Key practices

- **Write the intent as prose before touching code.** If you can't write a clear paragraph describing it, you don't understand it yet — and code won't rescue an idea you can't articulate.
- **Define non-goals explicitly.** "This does *not* handle X yet" is the single most effective scope-creep defense a solo builder has. Unwritten scope expands to fill all available time.
- **State "done" as observable behavior**, not a feeling. "A user can create an invoice and see the correct total" — not "invoices work."
- **Research real decisions instead of guessing.** Library choice, API shape, a market question — a wrong foundational assumption here is the most expensive kind to unwind later.
- **Right-size the ceremony.** A one-line change needs one line of intent. A new subsystem needs a real spec. Discovery scales to the risk.

## The output

A short written artifact — even three lines — that answers:
1. **What** does this do? (one paragraph)
2. What does it **not** do? (non-goals)
3. How will I **know it works**? (the observable "done")

That artifact is what you plan against in [Stage 2](02-design-planning.md). If you can write it, the build is de-risked; if you can't, you just saved yourself three wasted hours.

## Tooling

- **`brainstorming` skill** — forces intent → spec. Your "PM." Use it *before* planning, always.
- **`feature-boilerplate` / `plan-feature` / `quick-stories`** — turn a scoped idea into a GitHub epic with sized, prioritized user stories. Your backlog-manufacturing machine.
- **`deep-research` skill** — fan-out, fact-checked research for genuine decisions instead of guessing from memory.

## Anti-patterns

| Anti-pattern | Why it fails | Fix |
|---|---|---|
| "I'll figure out the scope as I build" | Scope discovered mid-build is scope that already wasted code | Write intent + non-goals first |
| No non-goals | Unbounded scope expands to fill all time | List what you're explicitly *not* doing |
| "Done" as a feeling | Unfalsifiable — you can't verify a vibe | State done as observable behavior |
| Guessing a foundational decision | Wrong foundations are the costliest to unwind | Research the real ones |

## TODO

- [ ] Write a one-paragraph intent + explicit non-goals for the next feature
- [ ] Define the observable "done" condition before writing code
- [ ] Run one real decision through `deep-research` instead of guessing
- [ ] Capture a repeatable scoping template I reuse every project
