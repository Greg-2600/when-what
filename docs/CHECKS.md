# Lint & check everything

One command runs the whole gate (lint → secrets → audit → all tests):

```bash
npm run check
```

Individual gates:

| Command | What it does | Blocking in CI |
|---|---|---|
| `npm run lint` | ESLint over every JS file, zero warnings/errors allowed | ✅ yes |
| `npm run lint:fix` | Same, with safe autofixes applied | — |
| `npm run secrets` | `scripts/scan-secrets.js`: regex sweep for API keys, tokens, private keys | ✅ yes |
| `npm run audit` | `npm audit` failing only on high/critical; known moderate exception below | ✅ yes (high+) |
| `npm run test:unit` | 80+ Node unit tests (`tests/unit/`) | ✅ yes |
| `npm run test:e2e` | 45 headless-Chrome checks, incl. visual regression | best-effort in CI, required locally |
| `npm run test:mobile` | 9 phone-viewport checks | best-effort in CI, required locally |
| `npm test` | unit + e2e + mobile | — |

## ESLint layout (`eslint.config.js`)

No single env fits this repo, so each file group gets its own globals:

- **`timeline-core.js`, `scripts/**`, `tests/**`** — Node-ish (`require`, `process`, …) plus the core's public surface (`MILESTONES`, `LEARN_MORE`, …).
- **`timeline.js`** — browser only (`document`, `localStorage`, …). Shipped-code extras: `no-eval`, `no-new-func`, `no-implied-eval` are **errors** here. `new Function` appears only in `scripts/` dev tools that parse local build files — never on remote input.
- **`sw.js`** — service-worker env (`caches`, …). No DOM globals on purpose: if the worker ever touches `document`, lint fails.
- Ignored: `node_modules/**`, `img/**`, `h4k/**`, `tests/screenshots/**` (generated/vendor).

Style rules are strict on purpose: `semi`, `no-var`, `prefer-const`, `no-unused-vars` are all errors. Dead code is deleted, not commented — lint caught real bugs this way (an out-of-scope `vp` that broke arrow-key zoom with no selection, a `selectEvent` reassignment, unused gradient/label temporaries).

To add an exception, prefer fixing the code. If a rule truly can't apply, use a one-line `// eslint-disable-next-line rule-name -- reason` so the reason is reviewable.

## Security model

- **No backend, no cookies, no tracking.** Analytics was explicitly rejected. The only network hosts ever touched are same-origin plus `wikimedia.org`/`wikipedia.org` (images, runtime-cached).
- **No secrets in the repo.** The ElevenLabs voice key is typed by the user into the browser and lives only in their `localStorage`. `npm run secrets` enforces this in CI.
- **Service worker discipline** (`sw.js`): cache-first only for the app shell + Wikimedia; `resp.ok` is checked before caching (poisoned/429 responses never persist); activate purges only past-version caches.
- **XSS discipline**: dynamic text goes through `textContent`/DOM nodes (search results, quiz options, map dots, panel body). The single former `innerHTML` interpolation was rewritten to DOM construction. External links use `target="_blank"` + `rel="noopener"`.
- **Inline script**: there is none. All app JS lives in `timeline-core.js` / `timeline.js`; the only inline markup is `<noscript>` fallback text. `?reset=1` can unregister workers + clear caches for a pinned-build rescue.
- **Dependencies**: runtime has zero npm dependencies (static files + CDN-free). Dev dependencies are scanned by `npm audit`. Known accepted finding: `minimatch <11` (moderate ReDoS) reachable only through the ESLint toolchain at build time — never shipped, never executed on user input; fixing requires a breaking eslint major.

## CI (`.github/workflows/ci.yml`)

Push/PR runs: unit tests → **lint (blocking)** → **secret scan (blocking)** → e2e → mobile → screenshot artifacts → Lighthouse budget (advisory). Deploy to Pages runs only on green `main` after unit tests pass.
