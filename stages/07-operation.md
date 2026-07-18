# Stage 7 — Operation

**The question:** Run it in production (observability, incidents, reliability).

## What this stage is

Everything *after* the code is live: knowing when it breaks, understanding why, recovering fast, and not losing data. The stage most under-served by solo builders — until they have real users, at which point it becomes existential.

## Why it matters more when solo

You have no ops team and no on-call rotation. Production will fail while you sleep. The question is whether *you* find out first, or your users do. Good operation means production tells you what broke before a customer does.

## Key practices

- **Observability first:** structured logs (wide events / canonical log lines), error monitoring, and enough tracing to answer "why is this request slow?"
- **Alert on symptoms, not noise:** page yourself only for things that need action. Alert fatigue = ignored alerts.
- **Backups you have actually restored:** an untested backup is a hope, not a backup.
- **A written incident ritual:** even solo — detect → mitigate → fix → write a short postmortem so the same fire can't recur unseen.
- **Watch the boring failure modes:** expired credentials, exhausted balances/quotas, full disks, silent cron failures — the things with no error until they cause an outage.

## Tooling

- Sentry skills (`sentry-instrument`, `sentry-debug-issue`) — error monitoring + guided debugging from real production errors.
- `logging-best-practices` skill — wide events / canonical log lines for powerful debugging + analytics.
- Uptime + synthetic checks (external ping, scheduled golden-path run) — catch "the whole thing is down."
- `schedule` / `/loop` — cron'd health checks and ops watchers.
- Ops-alert email/webhook — get told when a balance/quota/credential is about to fail silently.

## The trap

**Silent slow failures.** Not the loud crash — the thing that quietly stops working (an unmonitored queue, a drained SMS balance, a failing nightly job) and goes unnoticed for days because nothing errors loudly. Monitor for *absence* of expected activity, not just presence of errors.

## TODO (fill as you practice)

- [ ] Wire error monitoring (Sentry) into one live project
- [ ] Adopt canonical log lines / wide events for a key operation
- [ ] Set up one uptime + one synthetic golden-path check
- [ ] Test-restore a backup end-to-end (prove it works)
- [ ] Add an alert for a silent-failure mode (balance/quota/cron)
- [ ] Write a one-page incident ritual I'll actually follow
