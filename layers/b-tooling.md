# Layer B — Tooling

**Not a stage — the instruments that execute every stage faster.** A tool is only useful when pinned to a stage. This is the map.

## Tooling by stage

| Stage | Tools |
|-------|-------|
| Discovery | `brainstorming`, `feature-boilerplate`, `plan-feature`, `quick-stories`, `deep-research` |
| Design & Planning | `writing-plans`, GSD suite (`gsd:*`), Figma MCP |
| Implementation | `using-git-worktrees`, `test-driven-development`, Figma MCP, `gh` CLI |
| **Verification** | **`playwright-cli`**, `playwright` MCP, `expect`, `/verify` ← *invest most here* |
| Review | `/code-review`, `/simplify`, `/security-review`, `requesting-code-review`, `receiving-code-review` |
| Integration & Release | GitHub Actions, Vercel/Netlify, Dokploy/Render/Railway/Fly, Dependabot/Renovate |
| Operation | Sentry skills, `logging-best-practices`, uptime/synthetic checks, `schedule`, `/loop` |

## Cross-cutting tools

- `/loop` — run a task/command on a recurring interval (poll a deploy, re-run a check).
- `schedule` — cron'd cloud agents for recurring work that runs without you.
- `Artifact` + `dataviz` skill — turn data/reports into shareable hosted pages.
- `update-config` / hooks — automate "every time X, do Y" so repetitive checks run themselves.
- Memory — persist decisions and gotchas across sessions (see Layer C).

## The tooling-budget insight

The trap is spending all your tooling budget on the **Build** stage (fancier editors, more libraries) and none on **Verify** and **Review** — which is exactly backwards. Verify and Review are the teammates you're missing, so that's where automation pays off most.

## TODO (fill as you practice)

- [ ] Set up a headless Playwright golden-path test I reuse per project
- [ ] Make `/code-review` a reflex before every merge
- [ ] Pick one repetitive check and automate it with a hook or `/loop`
- [ ] Audit: am I over-investing in Build, under-investing in Verify/Review?
