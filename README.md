# Cosmic Timeline

**A scrollable, horizontal number-line of everything — from the Big Bang to the modern era — written so a 6-year-old gets lost in it, and a quantum physicist still learns something.**

🌐 **Live site:** [greg-2600.github.io/when-what/timeline.html](https://greg-2600.github.io/when-what/timeline.html) · **Repo:** [github.com/Greg-2600/when-what](https://github.com/Greg-2600/when-what)

Hover a dot. Open a panel. Read it like a bedtime story, then read it like a textbook. This is history, chemistry, biology, geology and physics woven into **one straight line**.

<p align="center">
  <img src="docs/screenshots/deep-time.jpg" width="720" alt="The full 13.8-billion-year timeline with the era-coloured spectrum line and a milestone detail panel open"/>
  <br/><em>Deep time: 160 milestones, each with its own colour, tiered labels and a detail panel.</em>
</p>

---

## Why this exists

Time scales lie to us. On a normal "history timeline" the Big Bang, the dinosaurs and ancient Egypt stand shoulder-to-shoulder as if they were neighbours. On a strict linear scale, all of human civilisation is a single pixel next to the age of the stars.

This project solves that with a **space that bends but never lies**:

- **Deep time view** — a logarithmic scale over 13.8 billion years, where *each event is spaced proportionally to its distance from the next* (logarithm of its age). The ancient universe clusters together because *that's when things were weird and fast*; the modern era spreads out because *that's when things got busy*.
- **Civilization view** — the same log trick applied to the last 12,000 years, so Writing, Rome, the Printing Press, Flight, the Moon and the Web each get room to breathe.
- **Powers view** — only the world's superpowers and their large events, on their own log window (5.1 kya → today).
- **Future view** — the next century (2026–2100), scaled to its own window.

The scale is **relative to the window** and stays calibrated as you scroll and zoom — the distance between any two moments never depends on where you happen to be looking.

## Quick start

```bash
# no install needed — just open the file
open timeline.html            # macOS
xdg-open timeline.html        # Linux

# or serve it (enables installable/offline PWA mode)
npm install                   # only needed if you want the test suite
npm start                     # → http://localhost:8765/timeline.html
```

No build step. Three source files, one of them an SVG.

## How to explore

| Action | What happens |
|---|---|
| **Scroll / swipe / drag** horizontally | Travel along the number line |
| **Hover a dot** | Detail panel opens — summary slides in with the event's colour |
| **Click a dot** | Panel pins open (stays while you move away) |
| **‹ › in the panel** | Step to the adjacent event; the viewport glides to follow |
| **← / → keys** | Move marker-by-marker (works on the timeline *and* inside the panel) |
| **Esc** | Close the panel |
| **Wheel / pinch / double-click** | Zoom in/out (0.35×–4×, cursor-anchored) |
| **Slider + ➖/➕** | Fine-grained zoom control; click the % readout to reset |
| **Search box** | Type "moon", "oxygen", "Rome"… click a result to teleport there |
| **Legend chips** | Click to jump to the era; hover for a two-sentence explainer; keyboard-activatable |
| **Deep time / Civilization / Powers / Future** | Switch scale modes (the whole chart re-lays-out) |
| **▶ Take the tour** | Auto-play the whole story, event by event, ~6 s each |
| **🧩 Riddles** | 14 hand-authored clue sets — guess the event from its clues |
| **🎓 Quiz** | "Which happened first?" / "Which is oldest?" generated from the data |
| **🔤 Glossary** | Every term a curious kid might ask about, from *banded iron* to *three-axis control* |
| **📘 Packs** | Multi-page printable worksheets per era |
| **🖨 Handout** | One-page printable handout for the selected event |
| **📖 Read** | Full-screen reading mode with large type |
| **🔊 Narrate** | Web Speech narration (en/it voices, rate slider, optional ElevenLabs cloud) |
| **⚙️ Settings** | Voice picker (auto-best), speed, cloud voice (ElevenLabs) |

<p align="center">
  <img src="docs/screenshots/civilization-mode.jpg" width="720" alt="Civilization mode: Agriculture, Writing, Rome and the modern world spread across the line"/>
  <br/><em>Civilization zoom: 24 events from farming to the internet — the last 12,000 years finally legible.</em>
</p>

---

## The three reading levels

Every milestone is written at **three depths**, because nobody learns in one tempo:

| Level | Audience | Example — *Dinosaur Extinction* |
|---|---|---|
| 🌟 **For young explorers** | a 6-year-old | *"One very bad day, a giant space rock as big as a mountain smashed into Mexico…"* plus a 💡 **"Did you know?"** fun fact |
| 📖 **The bigger story** | general reader | the "what happened and why it matters", in plain language |
| 🎓 **Go deeper (nerd-level)** | students, adults, experts | 3–5 real facts: Chicxulub's 180 km crater, a billion Hiroshima bombs of energy, orogeny-grade geochemistry, open research questions |

Then each panel adds:

- **🖼 A real photograph or illustration** (77 local images, sourced and credited, lazy-loaded, graceful offline fallback) — the K-Pg boundary layer, Buzz Aldrin's bootprints, living stromatolites, Göbekli Tepe's pillars…
- **🔤 Words to know** — glossary terms found *in that event's text* become hover-chips with a one-line definition; a full 🔤_modal_ lists all 26.
- **🔗 Read more** — one trusted Wikipedia article per milestone.
- **🔗 See also** — cross-references to related events (85 link entries).
- **A time chip tinted in the event's own colour**, so you always know *where* in the spectrum you are.
- **Progress badge** — "N / 101 read" tracks your journey through localStorage.

## What's inside — the complete feature list

**Exploration & scale**

- ✅ Horizontal number line, ~3.5 screen-widths, smooth scroll
- ✅ Logarithmic-calibrated distance between events ("space bends but never lies")
- ✅ Four scale modes: **Deep time** (13.8 Bya) · **Civilization** (12 kya → today) · **Powers** (5 kya → today) · **Future** (2026 → 2100)
- ✅ Event-coloured **spectrum** painted along the number line itself
- ✅ Tier-staggered labels with collision detection (labels cascade upward, never jumble) — re-staggered on every resize because the scale is window-relative
- ✅ 10 **era families**, each event getting a unique shade that still reads as its family (+ a clickable legend with era explainer tooltips, and a full-bleed background **wash** tinted by the events in your current view)

**Interaction**

- ✅ Hover → preview panel; click → pin; move away → close (with a 120 ms grace so you can slide into the panel)
- ✅ Prev/next stepping with smooth scroll-to-center
- ✅ Full keyboard support (arrows, Enter, Esc) and focusable markers with ARIA labels
- ✅ Search with live results + jump; guided story tour; era legend jumps
- ✅ Reduced-motion media query respected
- ✅ Wheel zoom 0.35×–4× (cursor-anchored, pinch, double-click, keyboard +/-, slider)
- ✅ Click-to-reset zoom (click the % readout)

**Education**

- ✅ Three reading levels per event (kid / story / nerd)
- ✅ 💡 Fun fact per event, in kid-voice
- ✅ Words-to-know glossary chips per event + a global glossary modal (26 terms, cross-checked by unit tests)
- ✅ Real imagery per event (77 local images, sourced and credited)
- ✅ "Read more" links to a canonical reference for every milestone
- ✅ "See also" cross-references to related events (85 link entries)
- ✅ Era explainers — what a whole epoch means before you zoom into it
- ✅ 🧩 Riddle mode (14 riddles) + 🎓 Quiz mode (generated from data)
- ✅ ▶ Guided tour (auto-advance, narrated)
- ✅ 📖 Story reader (full-screen, large type, ⛶ fullscreen, narration)
- ✅ 🔊 Web Speech narration (en/it voices, rate slider, optional ElevenLabs cloud)
- ✅ 📚 Era classroom packs (multi-page printable worksheets)
- ✅ 🖨 One-page handouts per milestone
- ✅ 🔗 Permalinks (`#event=…&mode=…`)
- ✅ 🌍 i18n (English + Italian UI)
- ✅ 🏷 Curriculum tags (12 subjects) + filter chips
- ✅ 📊 Progress tracking (localStorage: "N / 101 read")
- ✅ 🎯 Multiple viewpoints / lens toggle (Scientific, Religious, Indigenous, Chinese, Islamic)
- ✅ ⏩ Timeline of the future (7 events, 2026–2100)

**Engineering / ship-ability**

- ✅ PWA: installable (`manifest.webmanifest` + SVG icon), service-worker cached shell **and all 77 images** (verified) → works fully offline after one visit
- ✅ Never caches failed responses (rate-limit 429 poisoning and error-image caching are guarded)
- ✅ Zero-dependency runtime; no build step; single-page
- ✅ **70 unit tests** over the extracted pure core (data, scale math, colour algorithms, format tiers, layout algorithm, glossary matching, quiz/slug, tech-debt structural invariants, i18n)
- ✅ **21-check Selenium E2E suite** in real Chrome (shell, panel, images, glossary, search, legend, zoom, arrows, keyboard, tour, close, PWA caches, console cleanliness, a11y)
- ✅ Hotlinked images use `Special:FilePath` (handles any original size), `referrerpolicy="no-referrer"`, `loading="lazy"`
- ✅ **Local image pipeline**: all images downloaded, resized to 700px, optimized — no runtime Wikimedia dependency
- ✅ Geographic coordinates on 61 events
- ✅ "See also" cross-references (85 link entries)

**Roadmap** (designed for, not yet built — every one is small against the current architecture)

- 🔜 Quiz v2: drag-to-order, image quiz, era matching, teacher mode with CSV export
- 🔜 Printable teacher packs (auto-generated PDF worksheet per era)
- 🔜 Shareable permalinks via URL hash sync (already partially done)
- 🔜 Curriculum tagging: each event mapped to science/history syllabus units
- 🔜 i18n content (not just UI strings) — translate event content to Italian, Spanish, etc.
- 🔜 Audio narration polish (speed slider, deep-dive narration)
- 🔜 Map view (geographic coordinates → Leaflet or SVG map)
- 🔜 Comparison tool ("show me two eras side by side")
- 🔜 Admin edit mode (`?edit=1` for adding events in-browser)
- 🔜 Split files (index.html + style.css + app.js)
- 🔜 Image pipeline (download/resize/optimize — already started)
- 🔜 Analytics (privacy-respecting page views)
- 🔜 Feedback widget ("Was this event's description helpful?")
- 🔜 Multiple viewpoints / "lens" toggle (already started)
- 🔜 Timeline of the future (already started)
- 🔜 Progress tracking (already started)
- 🔜 "See also" links (already started)
- 🔜 Multiple images per event
- 🔜 Map view (already started with coords)

## Project structure

```
├── timeline.html            # the app: markup, styles, interaction glue
├── timeline-core.js         # pure data & logic — no DOM, fully unit-tested
│   ├── MILESTONES           #   160 events × { era, kid, fun, summary, deep[3-5], yearsAgo, coords, seeAlso, perspectives }
│   ├── EVENT_COLORS         #   per-event shades computed inside era hue families
│   ├── fracFor(ya, max)     #   log-scale position, mode-aware (null = off-scale)
│   ├── formatTime/formatShort
│   ├── assignTiers(items,g) #   the label-cascade algorithm, as a pure function
│   ├── glossaryTermsFor(text)
│   ├── makeQuiz(count, rng, filter)  #   seeded classroom quiz generator (pure)
│   ├── makeRiddleGame(count, rng)    #   14 hand-authored riddles
│   ├── scoreVoice(v, lang)  #   voice quality scoring for TTS
│   ├── slugify(title)       #   permalink slugs
│   ├── visibleInCivilization(m) #   civilization view membership
│   ├── CURRICULUM_TAGS      #   12-subject taxonomy
│   ├── curriculumTagsFor(m) #   per-event tag assignment
│   └── ERA_INFO / LEARN_MORE / GLOSSARY / STRINGS (en+it)
├── sw.js                    # service worker (app shell + image runtime cache)
├── manifest.webmanifest     # install metadata
├── icon.svg                 # PWA icon (five coloured eras on the line)
├── img/                     # 77 event images (downloaded, resized, optimized locally)
├── scripts/
│   ├── download-images.sh   # image pipeline: download + resize + optimize
│   └── serve.js             # zero-dep static server (correct MIME, safe paths)
├── tests/
│   ├── unit/                # node --test suite: data, scale, colors, format,
│   │                        # tiers, glossary, quiz/slug, riddle, tags, debt, page-shape
│   └── selenium.js          # 21-check real-Chrome E2E run
├── docs/
│   ├── screenshots/         # pictures for this README
│   ├── ROADMAP.md           # v1.1 → v1.3 with checkmarks
│   └── TECH-DEBT.md         # board of cleaned items + queued items
└── README.md
```

## Test it

```bash
npm install          # pulls selenium-webdriver (Selenium Manager auto-fetches ChromeDriver)
npm test             # unit tests + headless Chrome E2E
npm run test:unit    # just the 70 unit tests
npm run test:e2e     # just the browser walk-through
SELENIUM_HEADLESS=0 npm run test:e2e   # watch Chrome drive the page
```

**E2E coverage:** shell & content counts → hover → three-level panel → real image load → glossary chips + 26-term modal → search jump → era legend jump → Civilization/Deep-time zoom with gradient rebuild → ‹›‹ stepping with viewport glide → keyboard navigation → guided tour start/stop → panel close → service worker + image cache → quiz flow with feedback → permalink restore & hash tracking → printable handout → curriculum chips filter → story reader flips → language switch → a11y dialogs → console clean (no severe errors).

## Design notes (the fun part)

**Bending time honestly.** Position on the line is `1 − log₁₀(age + 1) / log₁₀(maxAge + 1)`. This keeps *relative* comparison true (a factor-of-two age difference looks like the same factor at any point on the line) while making the busy last 0.01% of cosmic history occupy a meaningful slice of screen.

**One colour family per era.** Ten era hues (violet→indigo→orange→green→pink→gold→cyan→white→lavender→red). Each event inside a family gets a small deterministic hue offset — `base + (i − center) × spread` — so a family reads like a family from afar but every dot is distinguishable up close. Markers, glows, panel stems, time chips, spectrum stops and background wash all derive from that single colour, so **selection turns the entire UI the hue of that moment in time**.

**Labels that never collide.** `assignTiers` is a pure greedy function: sort boxes left→right, drop each into the lowest tier whose row has no overlap (8 px padding), cap at tier 7. On screen it's the staircase you see in crowded stretches like the early universe.

**A wash that breathes.** Three giant blurred blobs painted in `hsl(... / 0.16)` hang over the deepest colour in view. As you scroll, the blobs re-target the events nearest the centre of your screen — the whole page slowly exhales from violet to green to blue as you travel.

**Offline by design.** The service worker installs the app shell, then the page funnels *every* event image through one sequential warm-up fetch so the runtime cache fills at a polite pace (never hammering Wikimedia). Origins outside the map (`wikimedia.org`, `wikipedia.org`) are intercepted and cache-first; everything else passes through. A deletion sweep clears only caches of past versions on activate.

## Accessibility

- Focusable markers with descriptive `aria-label`s (event name + human-readable age)
- Panels reachable & operable entirely by keyboard
- `role="dialog"` semantics on interactive dots
- Honours `prefers-reduced-motion` (transitions and animations disabled)
- Colour is never the only channel: every marker carries a text label with the era's short timecode
- `:focus-visible` outlines on every interactive element
- Esc closes every modal and the reader

## Data & sources

Milestone content is our own writing (three levels per event), fact-checked against canonical references, with a **"Read more"** link to the relevant Wikipedia article. All images are sourced from Wikimedia Commons with attribution in their captions. Ancient dates are the commonly cited scientific estimates; treat them as the range of consensus, not gospel — several events (early life, galaxy formation) have live debates, and the "nerd-level" bullets say exactly that.

## Contributing an event

1. Add an entry to `MILESTONES` in `timeline-core.js` (the unit tests will demand kid/fun/summary/deep + a `LEARN_MORE` entry).
2. Add a matching image entry to `EVENT_MEDIA` in `timeline.html` and a `LEARN_MORE` slug.
3. Run `npm test` — the suite will reject any event that is out of order, under-sized, colourless or unlinked.

---

*The whole story, in one straight line, at three speeds — because a timeline is the only map where "you are here" can be anywhere from a particle of hydrogen to the last 12,000 years of a curious species.*

**MIT licensed · images © their listed sources via Wikimedia Commons**