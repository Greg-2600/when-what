# Tech Debt & Feature Board (v1.4 working notes)

This file tracks recent maintenance work. Items checked off have been implemented and are guarded by tests.

## ✅ Completed (this pass)

- [x] **Dead `.empty` overlay removed end-to-end** (markup, CSS, and JS references). The obsolete "click a marker…" hint panel had been superseded by the slide-up details panel ages ago. Guard test: `debt.test.js` — `obsolete .empty overlay is fully gone`.
- [x] **Dialog semantics + focus management** — the Glossary, Quiz and Packs modals now carry `role="dialog" aria-modal="true"`, focus their close button on open, and close on **Escape**. Guard test: `all three modals are dialogs with Escape + focus wiring`.
- [x] **Story reader Escape** — the full-screen reading mode closes with Esc alongside the panel. Guard test: `story reader closes on Escape`.
- [x] **Keyboard-accessible era legend chips** — role="button" + tabindex + Enter/Space activation (previously pointer-only). Guard test: `legend chips are keyboard-accessible buttons`.
- [x] **IIFE invocation guard test** — catches the "missing `()`" bug class (a lang-switch handler silently never running).
- [x] **i18n core cleanup** — dead `CURRENT_LOCALE`/`STRINGS_EN` leftovers removed from `timeline-core.js`.

## ⚙️ Engineering hygiene
- [x] Hardened test hooks (`debt.test.js`) scan the shipped HTML for structural regressions — no JS inside `<style>`, IIFE invocation sanity, dialog roles, and keyboard chips.
- [x] Reminder: when adding code via scripted splices, **re-run `npm test` immediately** and check the `<style>` block has no code inside it.

## 📝 Next round (small, queued)
- [ ] Add `focus` outline styling for keyboard navigation across all interactive elements (`.marker:focus-visible`, chips, buttons)
- [ ] Replace `console.log` remnants (none found — keep it that way)
- [ ] Capture the deploy URL into the browser viewport meta tags (minor SEO hygiene)
- [ ] Worst-case-cache-clearing affordance: a small "app data" note (a `?reset=1` URL that clears SW caches for users who pinned an old build)
- [ ] Small perf pass: audit the bundle weight of the inline script (14k–100k chars) and decide if a split into `timeline.js` is warranted at this scale

## 🚀 Latest production deploy
- URL: https://greg-2600.github.io/when-what/timeline.html
- Status: ✅ Deploy workflows green, features live, unit & E2E all passing
