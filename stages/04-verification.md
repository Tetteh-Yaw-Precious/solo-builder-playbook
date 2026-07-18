# Stage 4 — Verification

**The question:** Does it actually work? (drive the real thing)

## What this stage is

Proving the slice behaves correctly by **exercising it end-to-end**, not by trusting that it compiles.

## Why it matters more when solo

This is the corner solo builders cut most dangerously. `tsc` passing and unit tests passing is evidence it *compiles*, not that it *works*. You have no QA person — you are QA, and the only honest QA is behavioral. Invest more tooling budget here than anywhere else.

## Key practices

- Drive the real golden path in the running app before claiming done.
- Automate the golden-path check so it runs forever, not just once.
- Keep the behavioral suite small, deterministic, and focused — a trustworthy small suite beats a flaky comprehensive one.
- Verify the *behavior a user sees*, not internal state.

## Tooling

- `playwright-cli` skill — drive a real browser: click, fill, assert what the user sees. Your QA department.
- `playwright` MCP — interactive/scriptable browser control for live debugging.
- `expect` skill — fast inner-loop check for `.tsx/.jsx/.css` changes.
- `/verify` skill — exercise a change end-to-end and observe behavior before committing.

## TODO (fill as you practice)

- [ ] Write one Playwright golden-path test for a real flow
- [ ] Run `/verify` before committing a nontrivial change
- [ ] Establish "drive the real app" as a non-skippable step
- [ ] Move the golden-path test into CI so it runs on every push (see Stage 6)
