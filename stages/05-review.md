# Stage 5 — Review

**The question:** Is it *good*? (quality, security, simplification)

> This is the teammate you're most missing. "It works" (Stage 4) and "it's good" are different claims — verification proves behavior, review proves the code won't rot, leak, or mislead the next person.

## What this stage is

The deliberate pass that catches what "it works" misses: correctness edge cases, security holes, needless complexity, and drift from convention. On a team this is your PR reviewer. Solo, you have to manufacture an adversarial second opinion — and *act on it with rigor*, not perform agreement with yourself.

## Why it matters more when solo

No one reviews your PR. Without a deliberate review step, shortcuts compound silently: the clever abstraction nobody questioned, the ownership check nobody noticed was missing, the `TODO` that became load-bearing. Each is invisible in isolation and fatal in aggregate. Review is the only place these get caught before users find them.

## The three lenses (they find different things — run them separately)

Reviewing everything at once finds nothing well. Make three distinct passes:

### 1. Correctness / bug lens — "where does this break?"
Edge cases, empty states, error paths, off-by-one, the input you didn't test. Ask: *what's the input that makes this wrong?*

### 2. Security lens — "how is this abused?"
Especially on any diff touching **auth, data ownership, or user input**. The highest-value solo security check: **does a handler verify the resource belongs to the caller *before* mutating it?** A route guard that checks "can this user touch invoices" is not the same as "does *this* invoice belong to this user" — the gap is an IDOR bug. (See [Layer A](../layers/a-best-practices.md): verify ownership before you mutate.)

### 3. Quality / simplification lens — "what can go?"
Reuse over reinvention, dead code, over-engineering, the abstraction added before the third use. Solo code drifts toward complexity because there's no one to say "this is too clever." Pull it back.

## The discipline that makes review real

Review is worthless if you rubber-stamp it. The trap when reviewing your own work (or AI feedback on it) is **performative agreement** — nodding at a finding without verifying it, or dismissing one because fixing it is annoying.

The rule: **verify, then act.** For each finding —
- Is it actually true? Reproduce or reason it through. Don't accept *or* dismiss on vibes.
- If true, fix it now — a known issue you ship is a decision, and usually the wrong one.
- If false, understand *why* the reviewer flagged it; often there's a real smell nearby.

Run the review pass **before merge, not after.** After-merge review is just an incident report.

## Tooling

- **`/code-review`** — adversarial review of your diff. `/code-review ultra` spins up a deep multi-agent cloud review for bigger changes. This is your PR reviewer.
- **`/simplify`** — quality-only pass: reuse, dead code, over-engineering. It does *not* hunt bugs — pair it with `/code-review`.
- **`/security-review`** — security pass on pending changes. Run it on every auth/data-ownership/user-input diff. Your security team.
- **`requesting-code-review` / `receiving-code-review` skills** — the discipline layer: how to ask for review that finds real issues, and how to receive it with rigor instead of rubber-stamping.

## A lightweight self-review ritual (do this before every merge)

1. **Read your own diff top to bottom** as if someone else wrote it. Most obvious bugs die here.
2. Run **`/code-review`** for the correctness lens.
3. Run **`/simplify`** for the quality lens; apply what's real.
4. If the diff touches auth/ownership/input, run **`/security-review`**.
5. For each finding: *verify, then act.* Fix or consciously defer with a reason.
6. Only now, merge.

## Anti-patterns

| Anti-pattern | Why it fails | Fix |
|---|---|---|
| Merging your own PR unread | You wrote it blind to its flaws; reading it cold surfaces them | Read the full diff as a stranger |
| One review pass for everything | Bug-hunting and simplifying use different attention | Three separate lenses |
| Rubber-stamping AI findings | Agreement without verification isn't review | Verify each finding, then act |
| "I'll fix it in a follow-up" | Follow-ups don't happen solo; the debt compounds | Fix now or defer with an explicit reason |
| Route guard = ownership check | Permission to touch a resource type ≠ owning the instance | Verify the specific resource belongs to the caller |

## TODO

- [ ] Run `/code-review` on my own diff before every merge for a week
- [ ] Run `/simplify` and actually apply what it finds
- [ ] Add `/security-review` to any auth/data-ownership/user-input change
- [ ] Practice "verify, then act" — no rubber-stamping, no reflexive dismissal
- [ ] Make "read my own diff as a stranger" a pre-merge reflex
