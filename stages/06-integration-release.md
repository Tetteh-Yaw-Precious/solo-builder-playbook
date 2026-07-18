# Stage 6 — Integration & Release

**The question:** Get it shipped (CI/CD).

> The automation spine. CI is your tireless robot reviewer; CD is your robot ops team. You buy both, once, for the price of a config file.

## What this stage is

Two automatic machines wrapped around your merge:
- **CI (Continuous Integration)** — on every push, a machine runs every check you'd run by hand.
- **CD (Continuous Deployment)** — on merge to your release branch, the app deploys itself.

Together they turn "I hope I remembered to test and deploy" into "the machine did, on every change, forever."

## Why it matters more when solo

- You *will* forget to run the suite at 1am. CI won't.
- You have no one to catch a broken `main`. CI is the gate.
- Manual deploys create friction, and friction makes you deploy *less* often — which means bigger, riskier releases. **CD removes the friction so you ship small and often**, which is the whole invariant this playbook protects.

The mindset: **your local loop is the fast inner loop; CI/CD is the trustworthy outer loop.** Solo, you want the outer loop to run *everything a machine can check*, so your scarce human attention only spends on the judgment a machine can't.

## Continuous Integration — the check column

Run these on every push/PR, in value/speed order (cheapest-that-catches-most first). A complete, copy-pasteable version is in [`examples/ci/ci.yml`](../examples/ci/ci.yml).

| Order | Check | Tool | Why it earns its slot |
|-------|-------|------|-----------------------|
| 1 | Typecheck | `tsc --noEmit` | Cheapest, catches the most — including missing-export/wiring bugs |
| 2 | Lint | eslint / your linter | Enforces the conventions you'd drift from solo |
| 3 | Unit/integration | vitest/jest, `go test` | The regression net |
| 4 | **E2E golden path** | **Playwright (headless)** | The money check — this is [Stage 4](04-verification.md)'s test, automated forever |
| 5 | Build | `next build` / `go build` | "Compiles" ≠ "builds clean" |
| — | Secrets scan | gitleaks, dependabot | You have no security team; a scanner is it (runs in parallel) |

**The Stage 4 → Stage 6 handoff is the key idea:** the exact Playwright command you ran by hand yesterday (`npx playwright test`) becomes the CI job that runs automatically on every push. Manual verification is a one-time cost; CI makes it permanent.

## Continuous Deployment — the discipline that keeps you shipping

The rule: **merging is the deploy trigger.** No manual "now go deploy" step — that step is where solo builders stall.

- **Frontend:** a push-to-deploy platform (**Vercel / Netlify**) with **per-branch preview URLs**. Preview deploys are underrated solo — every PR gets a real live URL you can click through, which *is* your Verify stage on real infra.
- **Backend:** a git-watching PaaS (**Dokploy / Render / Railway / Fly**) that redeploys on push to your release branch and runs **migrations at boot**. Merge → deploy, no SSH, no manual steps.
- **Gate deploys on green CI.** CD only fires if CI passed. That one dependency is what lets you merge confidently at 1am.

## The two traps (both nastier when solo — no ops person notices)

### 1. Silent deploy gaps
A merge that *looks* deployed but isn't — a build platform that needs a manual redeploy, or a deploy action quietly failing on every push. Because there's no ops person, "merged" and "live" can silently diverge for days.

**Fix:** make deploy status *visible* — a status badge, a notification, or a `/loop` that polls the deploy — so merged ≠ live can't hide. If your platform blocks auto-deploys behind a manual step (some do, for git-author or permission reasons), that manual step *is* a silent-gap risk: script it or alarm on it.

### 2. Flaky E2E killing trust in CI
If Playwright tests fail randomly, you start ignoring red CI — and then CI is worthless. A flaky suite is *worse* than no suite.

**Fix:** keep the E2E suite small, deterministic, and golden-path-focused. A trustworthy 8-test suite beats a flaky 200-test one.

## Solo automation on top of CI/CD

- `/loop` — poll a running deploy/CI run and re-invoke you when it settles; stop babysitting it.
- `schedule` — cron'd cloud agents for scheduled jobs (nightly checks, scheduled deploys, dependency PRs).
- `gh run watch` — watch a CI run from the terminal without leaving flow.
- **Dependabot / Renovate** — automated dependency-update PRs so security patches come to you instead of rotting.

## The updated loop

```
Build → Commit → push
                  │
      ┌───────────┴────────────┐
      │  CI (automatic)        │  typecheck · lint · test · Playwright E2E · build · secrets
      └───────────┬────────────┘
              merge (only if green)
                  │
      ┌───────────┴────────────┐
      │  CD (automatic)        │  push-to-deploy · migrations at boot · preview URLs
      └───────────┬────────────┘
           verify in prod → learn → repeat
```

## TODO

- [ ] Write a `ci.yml`: typecheck + lint + test + headless Playwright + build (start from `examples/ci/ci.yml`)
- [ ] Wire merge-triggered deploy (frontend + backend)
- [ ] Add a visible deploy-status signal so merged ≠ live can't hide
- [ ] Confirm CD is gated on green CI
- [ ] Turn on Dependabot/Renovate
