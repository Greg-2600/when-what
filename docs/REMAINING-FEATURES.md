# Cosmic Timeline — Remaining Features (comprehensive)

Generated after the v1.2 content haul (110 events, 11 eras, 70 unit + 22 E2E tests green).

## Status legend
- ✅ Done
- 🔶 Partial
- ❌ Not started

---

## A. Deployment & infrastructure (v1.1)
1. ✅ GitHub Pages live (CI runs unit + Selenium, deploys on green main)
2. ❌ Netlify/Cloudflare Pages backup with branch previews for PRs
3. ❌ Custom domain + HTTPS (PWA install requires it)
4. 🔶 Sitemap / robots.txt tweaks + README banner with deployed link
5. ✅ Social meta tags (OG/Twitter) + favicon set
6. ✅ manifest scope/start_url verified for subpath

## B. Compliance, credits, privacy
7. ✅ Central IMAGE CREDITS page (credits.html) generated from `EVENT_MEDIA`, linked from privacy note + README
8. ❌ License audit: prefer CC-BY/CC-BY-SA/PD; flag commercial-NC images
9. ✅ Privacy statement ("no cookies, no tracking") in footer note
10. 🔶 Accessibility: `aria-live` panel announcements added; full Lighthouse audit still pending

## C. Performance
11. ❌ Preload only visible event images; audit > 2 MB originals; build script for ~700 px thumbs
12. ❌ Split inline `<script>` into `timeline.js` (keep file:// double-click via loader fallback)
13. ✅ `content-visibility: auto` on the track
14. ❌ Lighthouse perf budget in CI (fail on regression)

## D. Content tracks (v1.2 §8) — ✅ mostly complete
15. ✅ World Powers: Ottomans, Mughals, Portuguese/Spanish, Dutch VOC, Qing, Meiji, multi-polar
16. ✅ Biblical: Daniel, Esther, Paul, Dead Sea Scrolls, Council of Nicaea
17. ✅ Science/tech: Mercator, Darwin, Marie Curie, Pill, Apollo–Soyuz, mRNA
18. ✅ Mesoamerican/African/Asian: Olmec, Axum, Ghana, Great Zimbabwe, Ming voyages

## E. Classroom & editorial depth (v1.2)
19. ✅ Era-themed teacher packs (📘 Packs button): pick era → multi-page worksheet (timeline strip, kid story, 3 discussion questions, glossary, essay prompt), print-to-PDF
20. ✅ Curriculum tags + filter chips (12 subjects, dimming)
21. ❌ Shareable/embeddable: iframe/`<script>` snippet with `?event=&mode=&era=`, copy-link button, OG image per event
22. ❌ Quiz v2: timeline-order drag, era matching, image quiz; teacher mode (eras, difficulty, count, CSV export); seeded `quiz(options)` with full unit coverage
23. ❌ "Recently added" page from git history

## F. Reader experience (v1.3)
24. ✅ i18n: STRINGS[locale], en + it, `?lang=`, language switch
25. 🔶 i18n: content translations (optional `translations` slug-map, fall back to English)
26. ✅ Audio narration (Web Speech + ElevenLabs cloud), narrate button, tour narration
27. ✅ Story-reading mode (full-screen, large type, next/prev)
28. ❌ Riddle mode puzzles from glossary
29. ❌ Meaning-based search (embeddings or better keyword match)

## G. Mobile / native
30. 🔶 Capacitor wrapping documented (MOBILE.md); not built
31. ❌ App-store presence (may be unnecessary given PWA)

## H. Quality / tests
32. 🔶 Unit tests 70; E2E 22 checks — all green, but coverage gaps: teacher packs, embeds, quiz v2, credits page, aria-live, content-visibility
33. ❌ Visual regression / screenshot diff in CI
34. ❌ Lighthouse budget in CI

---

## Priority order for next implementation pass
1. Image credits page (B7) — high value, data-driven, testable
2. Privacy statement (B9) — trivial
3. aria-live panel announcements (B10) — a11y, small
4. `content-visibility: auto` (C13) — perf, small
5. Era teacher packs (E19) — flagship, medium
6. Quiz v2 (E22) — medium
7. Shareable embeds (E21) — medium
8. Content translations (F25) — large, defer

Items 2–4 are quick wins; 5–7 are substantial features.
EOF