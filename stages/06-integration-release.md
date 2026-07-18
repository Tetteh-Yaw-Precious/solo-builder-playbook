# Stage 6 — Integration & Release

**The question:** Get it shipped (CI/CD, deploy).

## What this stage is

The automation spine: on every push a machine runs every check (CI), and on merge it deploys automatically (CD). Your tireless robot reviewer and robot ops team.

## Why it matters more when solo

You *will* forget to run the suite at 1am. CI won't. You have no one to catch a broken `main`. Manual deploys create friction, and friction makes you deploy less often — bigger, riskier releases. CD removes the friction so you ship small and often.

## Key practices

- Run, on every push, in value order: typecheck → lint → tests → **headless E2E (Playwright)** → build → secrets scan.
- Make **merge the deploy trigger** — no manual "now go deploy" step.
- Gate deploys on green CI. Only merge/ship when CI passes.
- Use preview deploys — every PR gets a real live URL, which *is* your Verify stage on real infra.

## Tooling

- **GitHub Actions** — the default CI for a solo builder; one `ci.yml` runs the whole check column.
- **Vercel / Netlify** — push-to-deploy + per-branch preview URLs (frontend).
- Git-watching PaaS (**Dokploy / Render / Railway / Fly**) — merge → deploy, migrations at boot (backend).
- `/loop`, `schedule`, `gh run watch` — poll and watch runs without babysitting.
- Dependabot / Renovate — automated dependency-update PRs.

## The two traps

1. **Silent deploy gaps** — "merged" looks deployed but isn't (a platform needing manual redeploy, a quietly-failing deploy action). Make deploy status *visible* so merged ≠ live can't hide.
2. **Flaky E2E** — random failures make you ignore red CI, and then CI is worthless. Keep the E2E suite small and deterministic.

## TODO (fill as you practice)

- [ ] Write a `ci.yml`: typecheck + lint + test + headless Playwright + build
- [ ] Wire merge-triggered deploy (frontend + backend)
- [ ] Add a visible deploy-status signal so merged≠live can't hide
- [ ] Turn on Dependabot/Renovate
