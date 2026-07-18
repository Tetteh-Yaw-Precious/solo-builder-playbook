# Stage 4 — Verification

**The question:** Does it actually work? (drive the real thing)

> **Invest more tooling budget here than in any other stage.** Verification is the QA teammate you don't have. Everything before it is a *claim*; verification is the *evidence*.

## What this stage is

Proving a slice behaves correctly by **exercising it end-to-end and observing the result** — driving the real system the way a user would, then asserting on what actually happened. Not reading the code and convincing yourself. Not "it compiles." Observing behavior.

## Why it matters more when solo

`tsc` passing and unit tests passing is evidence the code *compiles and its pieces are internally consistent* — not that the feature *works*. On a team, QA catches the gap between those. Solo, nobody does. If you skip behavioral verification, your users become your QA — and they report bugs by leaving.

The corner is tempting precisely because it's invisible: skipping it *feels* fine right up until production. So the discipline has to be structural, not motivational: make "drive the real thing" a step you cannot skip, not a thing you remember to do when you're fresh.

## The mental model: the solo verification pyramid

You don't need a 10,000-test suite. You need the *right* checks at each level, weighted toward the ones that catch real user-facing breakage.

```
        ╱╲          Manual exploratory        (rare — only for genuinely new UX)
       ╱  ╲
      ╱────╲        E2E golden paths          (a FEW — the money flows, automated)   ← highest ROI solo
     ╱      ╲
    ╱────────╲      Integration tests         (some — API ↔ DB, real boundaries)
   ╱          ╲
  ╱────────────╲    Unit tests                (many — pure logic, fast, cheap)
 ╱──────────────╲   Typecheck + lint          (free — runs on every keystroke/push)
```

The solo-specific insight: **the E2E golden-path layer is where you get the most safety per unit of effort**, because a single test that drives "log in → create invoice → take payment" proves that dozens of units, the API, the DB, and the wiring between them all still work together. That's the layer a solo builder most often under-invests in — and it's exactly the layer that catches the bugs that lose customers.

## The core discipline

1. **Reproduce the user's path.** Open the running app. Do the real thing a user does. Watch what happens.
2. **Automate it once, keep it forever.** The manual pass you just did becomes a headless test that runs on every push (Stage 6). Manual verification is a one-time cost; automated verification is permanent leverage.
3. **Assert on what the user sees**, not on internal state. A test that checks the DB row but not the rendered total can pass while the user sees the wrong number.
4. **Keep the suite small, deterministic, and fast.** A trustworthy 8-test golden-path suite beats a flaky 200-test suite you've learned to ignore. Flakiness is worse than no test — it trains you to disregard red.

## Concrete: a golden-path E2E test

The pattern below is the shape of the highest-value test you can write. It drives the real browser against the real app and asserts on rendered output. A runnable, annotated version lives in [`examples/playwright/golden-path.spec.ts`](../examples/playwright/golden-path.spec.ts).

```ts
import { test, expect } from '@playwright/test'

// One test = one complete money flow, end to end, as a user experiences it.
test('a user can create an invoice and see the correct total', async ({ page }) => {
  // 1. Arrive at the real running app
  await page.goto('/')

  // 2. Do exactly what a user does — no shortcuts, no seeded state you wouldn't have in prod
  await page.getByRole('button', { name: 'New invoice' }).click()
  await page.getByLabel('Client').fill('Ada Lovelace')
  await page.getByRole('button', { name: 'Add line item' }).click()
  await page.getByLabel('Description').fill('Consultation')
  await page.getByLabel('Amount').fill('150')

  // 3. Assert on what the USER SEES — the rendered value, not the DB
  await expect(page.getByTestId('invoice-total')).toHaveText('$150.00')

  // 4. Cross the real boundaries: submit, hit the API, persist, come back
  await page.getByRole('button', { name: 'Save invoice' }).click()
  await expect(page.getByText('Invoice saved')).toBeVisible()

  // 5. Prove persistence survives a reload — the classic "it worked until refresh" bug
  await page.reload()
  await expect(page.getByTestId('invoice-total')).toHaveText('$150.00')
})
```

Why this test earns its slot:
- It exercises UI, form logic, the API call, persistence, and re-render **in one pass**.
- It asserts on the **rendered total** — the number the customer would actually be charged.
- The **reload assertion** catches "worked until refresh," one of the most common real bugs.
- It reads like a user story, so six-months-from-now-you understands it instantly.

## Running it — local, then CI

```bash
# Local inner loop, watch it drive a real browser:
npx playwright test --headed

# Fast local check, headless:
npx playwright test

# The exact command CI runs (Stage 6) — headless, on every push, forever:
npx playwright test --reporter=line
```

The point of Stage 4 → Stage 6 handoff: **the command you run by hand today is the command CI runs automatically tomorrow.** Write the golden path once; it protects you on every push after that.

## Anti-patterns (the ways solo builders fake verification)

| Anti-pattern | Why it's not verification | The fix |
|---|---|---|
| "It compiles / `tsc` is green" | Proves consistency, not behavior | Drive the real path |
| "The unit tests pass" | The units can be right while the wiring is wrong | Add one E2E golden-path test |
| Asserting on DB/state, not UI | User sees the render, not the row | Assert on what's rendered |
| Testing only the happy path you just built | The bug is in the path you didn't think about | Test the reload, the empty state, the error |
| A flaky suite you rerun until green | Trains you to ignore red — worse than nothing | Make it deterministic or delete it |
| Seeding perfect state the test then checks | Proves the seed, not the feature | Create state through the UI, like a user |

## Tooling

- **`playwright-cli` skill** — drive a real browser: click, fill, assert what the user sees. Your QA department.
- **`playwright` MCP** — interactive/scriptable browser control for live debugging a flow.
- **`expect` skill** — fast inner-loop check for `.tsx/.jsx/.css` changes; catches bugs without a full manual pass.
- **`/verify` skill** — exercise a change end-to-end and observe behavior before committing.

## Practice exercise (do this, then check the boxes)

1. Pick the single most important flow in your current project — the one that, if broken, loses money or trust.
2. Verify it by hand once: open the app, do it, watch it work.
3. Turn that exact pass into one Playwright golden-path test that asserts on rendered output *and* survives a reload.
4. Run it headed (watch it), then headless.
5. Note the command — you'll drop it into CI in Stage 6.

## TODO

- [ ] Write one Playwright golden-path test for a real flow (assert on rendered output)
- [ ] Add a reload assertion to catch "worked until refresh"
- [ ] Run `/verify` before committing a nontrivial change
- [ ] Establish "drive the real app" as a non-skippable step (make it structural)
- [ ] Move the golden-path test into CI so it runs on every push (see [Stage 6](06-integration-release.md))
