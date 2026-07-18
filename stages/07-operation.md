# Stage 7 — Operation

**The question:** Run it in production (observability, incidents, reliability).

> The most under-served solo stage — right up until you have real users, at which point it becomes existential. Production *will* fail while you sleep. The only question is whether **you** find out first, or your customers do.

## What this stage is

Everything after the code is live: knowing when it breaks, understanding *why* fast, recovering, and not losing data or money in the meantime. On a team this is an ops/on-call function. Solo, it's you — so the goal is to make production *tell you* what's wrong instead of making you go look.

## Why it matters more when solo

No ops team, no on-call rotation, no one watching the dashboards at 2am. The failure mode that kills solo products isn't the loud crash — it's the **silent slow failure**: something quietly stops working and nobody notices for days because nothing errors loudly.

Real examples of the silent class (all have actually happened in production):
- A third-party balance (SMS/email credits) drains to zero — sends just... stop. No exception, no alert. Discovered weeks later by a customer complaint.
- A nightly job starts failing — no user-facing error, so no one knows until the data it produces is missing.
- A queue stops draining — messages pile up invisibly.
- An expired credential — works until the token lapses, then silently 401s a background integration.

None of these throw an error *in your app*. That's what makes them lethal solo. **You have to monitor for the *absence* of expected activity, not just the presence of errors.**

## The four pillars (in priority order for a solo builder)

### 1. Observability — make production legible
You can't fix what you can't see. Three layers, cheapest-first:
- **Structured logs as wide events.** One rich, structured event per operation (fields + per-step `actions[]` + a single `outcome`) beats scattered log lines you have to stitch together. See [Field Note #4](../field-notes.md) and the `logging-best-practices` skill. This is the single highest-leverage observability habit.
- **Error monitoring.** An error tracker (e.g. Sentry) that captures every exception with stack trace, breadcrumbs, and context — and *pushes* it to you. This is what turns "a user emailed me a screenshot" into "I got paged with the exact stack trace before they noticed."
- **Enough tracing** to answer "why is *this* request slow?" — you don't need full distributed tracing on day one, but you need to not be blind.

### 2. Alerting — page on symptoms, not noise
- Alert on **user-facing symptoms** (error rate up, checkout failing, latency spiked), not on every log line.
- **Alert on absence** for the silent class: "no SMS sent in 6h during business hours," "nightly job didn't check in," "balance below threshold." Heartbeat/dead-man's-switch checks catch what error monitoring can't.
- **Ruthlessly cut noise.** Alert fatigue = ignored alerts = you miss the real one. If an alert doesn't need action, it's not an alert.

### 3. Reliability & data safety — assume it will break
- **Backups you have actually restored.** An untested backup is a hope, not a backup. Do one real restore drill.
- **Graceful degradation.** External dependency down? Fail over or degrade, don't crash. (See [Field Note #7](../field-notes.md): ordered provider failover.)
- **Watch the boring failure modes:** expired credentials, exhausted balances/quotas, full disks, silent cron failures — the things with no error until they cause an outage.

### 4. Incident response — a ritual, even solo
When (not if) something breaks:
```
Detect  → your monitoring told you (not a customer)
Mitigate → stop the bleeding first (roll back, disable, failover) — fix comes later
Fix      → root cause, with a test/lint so it can't recur
Learn    → a short written postmortem: what, why, what stops the recurrence
```
Even a one-paragraph postmortem matters solo — it's the difference between fixing a fire and fixing the *class* of fire. The recurrence-preventer usually pushes back up the spine: a lint, a test, an alert (see [Field Note #3](../field-notes.md)).

## The trap

**Silent slow failures.** Restated because it's the one that gets solo builders: monitor for the *absence* of expected activity, not just the presence of errors. The loud crash pages you; the quiet stop doesn't — unless you built the heartbeat that notices nothing happened.

## Tooling

- **Sentry skills** (`sentry-instrument`, `sentry-debug-issue`) — error monitoring + guided debugging straight from real production errors.
- **`logging-best-practices` skill** — wide events / canonical log lines for powerful debugging *and* analytics.
- **Uptime + synthetic checks** — external ping + a scheduled golden-path run, to catch "the whole thing is down" and "the key flow broke."
- **`schedule` / `/loop`** — cron'd health checks and ops watchers (including absence-of-activity checks).
- **An ops-alert channel** (email/webhook) wired to balance/quota/credential thresholds, so silent failures become loud.

## TODO

- [ ] Wire error monitoring (Sentry) into one live project
- [ ] Adopt canonical log lines / wide events for a key operation
- [ ] Set up one uptime + one synthetic golden-path check
- [ ] Add at least one **absence-of-activity** alert (balance/quota/cron heartbeat)
- [ ] Test-restore a backup end-to-end (prove it works)
- [ ] Write a one-page incident ritual I'll actually follow
