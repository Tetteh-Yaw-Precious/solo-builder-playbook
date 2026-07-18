# Field Notes — real lessons, generalized

The rest of this playbook is principle. This file is *evidence*: ten patterns pulled from a real production SaaS a solo/small team built and operates. Each one exists because something broke, cost money, or nearly leaked data — and the fix became a durable rule.

They're generalized on purpose (no client names, vendor names, or internal paths) so the lesson travels to any project. Each entry: the pattern, a code sketch, the lesson, and which stage/layer it teaches.

---

## 1. Parse imported numbers tolerantly — raw `parseInt` lies
**Stage:** Implementation · **Born from:** real spreadsheet data

```ts
function parseNumericValue(value: unknown): number {
  if (value === null || value === undefined || value === '') return NaN  // "missing" ≠ 0
  if (typeof value === 'number') return value
  const cleaned = String(value).trim()
    .replace(/[₵$€£¥₹]/g, '')   // strip currency glyphs
    .replace(/[,\s_]/g, '')      // strip thousands separators
    .replace(/[^\d.+-]/g, '')    // keep digits/decimal/sign only
  return parseFloat(cleaned)
}
```
**Lesson:** Real CSV/spreadsheet cells carry currency symbols and thousands separators. `parseInt("1,000")` silently returns `1` — a 1000× error with no exception. Canonicalize to a bare numeric string before parsing, and return `NaN` (not `0`) for empties so callers can tell "missing" from "zero." Any user-imported number needs this.

---

## 2. Verify ownership *before* you mutate — and 404, don't 403
**Stage:** Implementation · **Layer:** Discipline (security)

```go
// Route: /businesses/:id/clients/:clientId  — never trust :clientId alone
existing, err := svc.GetByID(ctx, clientID)
if err != nil { return err }
if existing.BusinessID != businessID {
    return NotFound("client")   // 404, not 403 — don't confirm the row exists elsewhere
}
// ...only now bind body + update
```
**Lesson:** A route guard that proves "this user may touch *clients*" is **not** proof that "*this* client belongs to this user." The gap is an IDOR bug — the classic way solo apps leak one tenant's data to another. Fetch the resource and confirm ownership before mutating. Return **404, not 403**, so you don't confirm the row exists in someone else's tenant.

---

## 3. When a footgun bites once, encode it as an executable lint — not a wiki note
**Layer:** Tooling · **Born from:** a production incident

A subtle ORM behavior (auto-upserting in-memory associations on `Save`) once *resurrected a row that another code path had just deleted*, milliseconds earlier, in the next transaction. The fix wasn't a doc — it was a custom linter that flags the exact dangerous type+method combination, with a documented escape-hatch comment for the rare legitimate case.

**Lesson:** A rule that lives in your head or a wiki *will* regress silently. A rule that lives in CI *can't*. When a footgun draws blood, spend the hour to make it un-repeatable: a lint, a test, a type. Make it **precise** (only the truly dangerous case) so it doesn't cry wolf, and give it an **escape hatch** so it doesn't block the legitimate exception.

---

## 4. One wide event per operation beats scattered log lines
**Stage:** Operation · **Layer:** Discipline (observability)

```go
al := NewActionLog()
al.SetMany(map[string]any{"component": "email", "to": to, "subject": subj})
done := al.StartAction("send_via_primary"); done("failed", err)   // per-step timing + status
done = al.StartAction("send_via_fallback"); done("success", nil)
al.Set("outcome", "success"); al.Emit(log, "email delivered")     // ONE line, level from outcome
```
**Lesson:** Emit **one structured event per multi-step operation** — with the fields, a per-step `actions[]` array (status + duration), and a single `outcome` — instead of ten scattered lines you have to stitch together later. You get queryable, per-step timing and a single source of truth for "what happened in this request." (See [Layer A](layers/a-best-practices.md) and the `logging-best-practices` skill.)

---

## 5. Centralize authorization hierarchy in one resolver
**Stage:** Design/Planning · **Layer:** Discipline (authorization)

A single `ScopeResolver` owns the rule "global → business → branch" (a grant at a higher scope applies below; a lower grant satisfies a higher check). Every permission check goes through it; results are cached but **explicitly invalidated** on role change. On the client, a `PermissionGate` maps route → required permission and renders children transparently *while permissions are still loading* (no access-denied flash).

**Lesson:** If the "branch rolls up to business" logic is copy-pasted across call sites, it *will* drift and become a security hole. One resolver, one place. Cache the checks, but invalidate on grant changes. On the UI, defer gating until permissions load so you don't flash "access denied" at authorized users.

---

## 6. Encoding has a dollar cost — normalize invisible characters
**Stage:** Implementation · **Born from:** a gateway failure + a cost spike

```go
// A single non-GSM-7 char flips an ENTIRE SMS to UCS-2: 160 → 70 chars/segment.
// A copy-pasted em-dash turns 2 segments into 3 — +50% cost on every send.
var replacer = strings.NewReplacer("–","-", "—","-", "→","->", "“","\"", "”","\"", "’","'", "…","...")
func NormalizeSMSBody(s string) string { return replacer.Replace(s) }
```
**Lesson:** Smart quotes and em-dashes sneak in from copy-paste and quietly triple your SMS bill (and one arrow character once made a gateway reject the message outright). Normalize invisible typographic characters to ASCII on the GSM-7 path — but **don't over-strip** legitimate content (accented names, emoji); saving a segment isn't worth corrupting data.

---

## 7. Model providers behind a tiny interface; compose an ordered failover chain
**Stage:** Design/Planning · Integration

```go
type Sender interface { Send(to, subject, body string) error; Name() string }
// failoverSender tries each provider in order; records which one delivered.
// Compose:  primary → fallback → devSender (console log when nothing configured)
```
**Lesson:** Any external dependency you can't control (email, SMS, payments) *will* have an outage. Put each provider behind a minimal interface and compose them into an ordered chain, so a primary outage degrades to a fallback instead of a failure. Degrade gracefully to a no-op/console sender in dev, and **record which provider actually delivered** (via your canonical log line) so failover is debuggable.

---

## 8. Authenticate once, reuse storage state — keep E2E fast
**Stage:** Verification

```ts
// Fixture: log in once per worker, persist storageState to .auth-state.json,
// then every spec skips login. Fail LOUDLY if test creds are unset.
// Golden path: navigate → click "Create Invoice" → assert URL + headings + buttons render.
// Locators: getByRole / getByLabel (user-visible), not brittle CSS.
```
**Lesson:** The reason solo builders skip E2E is speed — solve it structurally: log in **once**, persist the storage state, and let every test reuse it. Write golden paths around **role/label selectors and user-visible structure** (headings, buttons), not CSS that shatters on restyle. And fail loudly with a helpful message when test config is missing, so a green run always means something. (Pairs with [Stage 4](stages/04-verification.md).)

---

## 9. Absorb backend envelope quirks at the API-client boundary
**Stage:** Integration · Implementation

```ts
// Server sends { success, data: { data: [...], meta: { pagination } } }.
// ONE transformResponse unwraps both layers → consumer sees a stable { data, pagination }.
```
**Lesson:** Backends grow envelope quirks (nested `data`, `meta.pagination`, `success` flags). Don't let every component learn them — flatten to a stable shape in **one** place at the client boundary (`transformResponse`), and document the mirror relationship to the server type so the two can't silently drift.

---

## 10. Parenthesize OR'd search fragments, or leak cross-tenant rows
**Stage:** Implementation · **Layer:** Discipline (security + SQL)

```go
query = query.Where("business_id = ?", businessID)          // tenant filter (AND)
// multi-word search: each word must match a fragment; each OR group PARENTHESIZED
query = ApplyMultiWordSearch(query, term, []string{"name ILIKE ?", "phone ILIKE ?", "email ILIKE ?"})
// WRONG: WHERE business_id = ? AND name ILIKE ? OR phone ILIKE ?
//   → AND binds tighter than OR → returns EVERY business's rows matching phone. Tenant leak.
```
**Lesson:** Do search **server-side** with escaped `ILIKE` + pagination (never load 500 rows and filter in the client). And when you combine a tenant filter (`AND`) with OR'd search fragments, **always wrap the OR group in parens** — `AND` binds tighter than `OR`, so a missing paren silently returns other tenants' rows. Escape `%` `_` `\` from user input too.

---

## The meta-lesson

Notice how many of these were *born from Operation* — an incident, a cost spike, a near-leak — and then pushed **back up the spine** into a lint (Tooling), a rule (Discipline), or a test (Verification) so they couldn't recur. That's the whole flywheel: **production teaches, and you write the lesson somewhere a machine enforces it.** This file, and [Layer C](layers/c-knowledge-memory.md), are where those lessons live so the next project starts smarter.
