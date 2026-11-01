/**
 * End-to-end verification of the Cosmic Timeline in a real Chrome.
 *
 *   node tests/selenium.js
 *   SELENIUM_HEADLESS=0 node tests/selenium.js   (watch it run)
 *
 * Uses Selenium Manager to resolve the matching ChromeDriver automatically.
 * Exit code 0 = everything works.
 */
const { Builder, By, until, Key } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

process.env.PORT = process.env.PORT || "8766";
const { server, PORT } = require("../scripts/serve.js");
const BASE = `http://localhost:${PORT}/timeline.html`;

const HEADLESS = (process.env.SELENIUM_HEADLESS || "1") !== "0";

let passed = 0;
function ok(label) { passed += 1; console.log(`  ✔ ${label}`); }

async function main() {
  server.listen(PORT);

  const options = new chrome.Options();
  if (HEADLESS) {
    options.addArguments("--headless=new");
    options.addArguments("--window-size=1440,900");
  } else {
    options.addArguments("--window-size=1440,900");
  }
  options.addArguments("--no-first-run");
  options.addArguments("--disable-search-engine-choice-screen");

  const driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
  const waitLoad = (ms = 800) => driver.sleep(ms);
  const hoverEvent = (title) => driver.executeScript(
    "const t = arguments[0];" +
    "const mk = [...document.querySelectorAll('.marker')].find(m => m.getAttribute('aria-label').includes(t));" +
    "mk.dispatchEvent(new MouseEvent('mouseenter',{bubbles:true}));" +
    "return mk.getAttribute('aria-label');", title
  );
  const clickEvent = (title) => driver.executeScript(
    "const t = arguments[0];" +
    "const mk = [...document.querySelectorAll('.marker')].find(m => m.getAttribute('aria-label').includes(t));" +
    "mk.click();", title
  );

  try {
    // ── 1. Shell loads ────────────────────────────────────────────────
    await driver.get(BASE);
    await driver.wait(until.titleContains("Cosmic Timeline"), 8000);
    await waitLoad(500);
    ok("page loads with correct title");

    const counts = await driver.executeScript(
      "return { markers: document.querySelectorAll('.marker').length, " +
      "labels: document.querySelectorAll('.marker-label').length, " +
      "legend: document.querySelectorAll('.legend .chip').length, " +
      "gradient: document.querySelector('.number-line').style.backgroundImage.includes('linear-gradient') }"
    );
    assert.equal(counts.markers, 428, "428 markers");
    assert.equal(counts.labels, 428, "428 labels");
    assert.equal(counts.legend, 11, "11 era chips");
    assert.equal(counts.gradient, true, "number line painted with era spectrum");
    ok("428 markers, 428 tiered labels, 11 era chips, gradient line");

    // ── Visual regression: capture screenshot + compare to baseline ──
    // Wait for boot to finish (load banner gone) and give strip images a
    // moment to settle; otherwise screenshot timing races JS and the
    // baseline flakes. Image settle is best-effort (Wikimedia throttles).
    await driver.wait(async () =>
      driver.executeScript("return !document.getElementById('js-load-warn')"),
      15000, "app boot did not finish");
    await driver.wait(async () =>
      driver.executeScript(
        "return [...document.querySelectorAll('#story-strip img')].every(im => im.complete)"
      ), 6000).catch(() => {});
    await waitLoad(400);
    const shotDir = path.join(__dirname, "screenshots");
    if (!fs.existsSync(shotDir)) fs.mkdirSync(shotDir, { recursive: true });
    const currentPath = path.join(shotDir, "current.png");
    const baselinePath = path.join(shotDir, "baseline.png");
    const diffPath = path.join(shotDir, "diff.png");
    const png = Buffer.from(await driver.takeScreenshot(), "base64");
    fs.writeFileSync(currentPath, png);
    if (fs.existsSync(baselinePath)) {
      const { PNG } = require("pngjs");
      const pixelmatch = require("pixelmatch").default || require("pixelmatch");
      const img1 = PNG.sync.read(fs.readFileSync(baselinePath));
      const img2 = PNG.sync.read(fs.readFileSync(currentPath));
      if (img1.width !== img2.width || img1.height !== img2.height) {
        throw new Error(`visual regression: dimensions changed ${img1.width}x${img1.height} vs ${img2.width}x${img2.height}`);
      }
      const diff = new PNG({ width: img1.width, height: img1.height });
      const numDiff = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold: 0.1 });
      fs.writeFileSync(diffPath, PNG.sync.write(diff));
      const pct = (numDiff / (img1.width * img1.height)) * 100;
      console.log(`  ✔ visual regression: ${numDiff} differing pixels (${pct.toFixed(3)}%)`);
      // allow up to 0.5% difference (anti-aliasing / font rendering tolerance)
      assert.ok(pct <= 0.5, `visual regression: ${pct.toFixed(3)}% pixels differ (threshold 0.5%)`);
    } else {
      fs.copyFileSync(currentPath, baselinePath);
      console.log(`  ✔ visual regression: baseline created at ${baselinePath}`);
    }


    // ── 2. Hover opens the panel with three reading levels ───────────
    await hoverEvent("Dinosaur Extinction");
    await waitLoad(400);
    await driver.wait(until.elementLocated(By.id("panel-title")), 5000);
    const titleHover = await driver.findElement(By.id("panel-title")).getText();
    assert.equal(titleHover, "Dinosaur Extinction", "hover marker → own title");
    const kid = await driver.findElement(By.css(".kid-card p")).getText();
    assert.ok(kid.length > 40, "kid card text");
    const deepCount = await driver.executeScript(
      "return document.querySelectorAll('.detail-block ul li').length"
    );
    assert.ok(deepCount >= 3, `deep dive facts (got ${deepCount})`);
    const learn = await driver.findElement(By.css("a.learn-more"));
    const learnHref = await learn.getAttribute("href");
    assert.match(learnHref, /wikipedia\.org\//, "learn-more link");
    ok(`panel: kid card (${kid.length} chars), ${deepCount} deep facts, learn-more link`);

    // ── 3. Event images load in the story strip ─────────────────────────
    await driver.wait(async () =>
      driver.executeScript("const ims=[...document.querySelectorAll('#story-strip img')]; return ims.length>0 && ims.some(im=>im.complete&&im.naturalWidth>0)"),
      15000, "story card images should load"
    );
    const stripH = await driver.executeScript("return document.querySelector('#story-strip').getBoundingClientRect().height");
    assert.ok(stripH > 100, "story strip visible height");
    ok(`story strip images loaded (${Math.round(stripH)}px strip)`);

    // ── 3b. Image strip layout: on screen, below the labels, stationary ──
    const layout = await driver.executeScript(`
      const stage = document.querySelector('#story-strip');
      const vp = document.querySelector('.viewport');
      const track = document.querySelector('.track');
      const sr = stage.getBoundingClientRect();
      const vr = vp.getBoundingClientRect();
      const mid = document.elementFromPoint(sr.left + sr.width / 2, sr.top + sr.height / 2);
      document.getElementById('track').focus();
      const outline = getComputedStyle(track).outlineStyle;
      return {
        stop: sr.top, sbottom: sr.bottom, sheight: sr.height,
        vpBottom: vr.bottom,
        winH: window.innerHeight, pageScroll: window.scrollY,
        midInsideStage: !!mid && !!mid.closest('#story-strip'),
        trackOutline: outline,
      };
    `);
    assert.ok(layout.sbottom <= layout.winH, `image strip below the fold (bottom ${Math.round(layout.sbottom)} > window ${layout.winH})`);
    assert.equal(layout.pageScroll, 0, "page must not need scrolling to see the image");
    assert.ok(layout.stop >= layout.vpBottom - 2, "image strip must sit below the timeline viewport");
    assert.ok(layout.midInsideStage, "image strip center is overlapped by another element");
    assert.equal(layout.trackOutline, "none", "track must not paint a focus rectangle");
    ok(`image strip on screen (${Math.round(layout.sheight)}px), below labels, no overlap, no focus rect`);

    // strip stays put while the timeline scrolls underneath it
    const stripX = await driver.executeScript(`
      const before = document.querySelector('#story-strip').getBoundingClientRect().left;
      const vp = document.querySelector('.viewport');
      vp.scrollLeft = Math.min(vp.scrollWidth - vp.clientWidth, vp.scrollLeft + 600);
      return [before, document.querySelector('#story-strip').getBoundingClientRect().left];
    `);
    assert.equal(stripX[0], stripX[1], "image strip must not scroll with the timeline");
    await driver.executeScript("document.querySelector('.viewport').scrollLeft = 0");
    ok("image strip stationary during horizontal scroll");

    // clicking a label selects its event
    const labelPick = await driver.executeScript(`
      const labels = [...document.querySelectorAll('.marker-label')].filter(el => {
        if (el.style.display === 'none') return false;
        const r = el.getBoundingClientRect();
        return r.left >= 0 && r.left <= window.innerWidth && r.width > 0;
      });
      if (!labels.length) return { text: '', visible: false };
      labels[0].click();
      return { text: labels[0].textContent, visible: true };
    `);
    assert.ok(labelPick.visible, "at least one label should be on screen to click");;
    await waitLoad(300);
    const labelTitle = await driver.findElement(By.id("panel-title")).getText();
    assert.ok(labelPick.text.includes(labelTitle), `panel title "${labelTitle}" should match clicked label "${labelPick.text}"`);
    ok(`label click selects event ("${labelTitle}")`);

    // ── 3c. Neighbor navigator: prev/next cards with time gaps ───────
    const navInfo = await driver.executeScript(`
      const nav = document.querySelector('#story-strip');
      const r = nav.getBoundingClientRect();
      const cards = [...nav.querySelectorAll('.story-card')];
      return { hidden: nav.hasAttribute('hidden'), count: cards.length,
        navs: cards.map(c => c.dataset.nav),
        dirs: cards.map(c => c.querySelector('.sdir').textContent),
        texts: cards.map(c => c.textContent),
        below: r.top >= document.querySelector('.viewport').getBoundingClientRect().bottom - 2,
        onscreen: r.bottom <= window.innerHeight && r.top >= 0 };
    `);
    assert.equal(navInfo.hidden, false, "story strip visible with a selection");
    assert.deepEqual(navInfo.navs, ["prev", "now", "next"], "before / now / after order");
    assert.ok(navInfo.dirs[0].includes("before") && navInfo.dirs[2].includes("after"), `wording: ${navInfo.dirs.join(" | ")}`);
    assert.ok(navInfo.texts[0].match(/\d/) && navInfo.texts[2].match(/\d/), "before/after cards show time gaps");
    assert.ok(navInfo.below && navInfo.onscreen, "strip sits in the bottom row on screen");
    ok(`story strip: before/now/after cards with gaps (${navInfo.dirs[0]} / ${navInfo.dirs[2]})`);
    const navBefore = await driver.findElement(By.id("panel-title")).getText();
    await driver.executeScript(`
      const cards = [...document.querySelectorAll('.story-card')];
      (cards.find(c => c.dataset.nav === 'next') || cards[0]).click();
    `);
    await waitLoad(300);
    const navAfter = await driver.findElement(By.id("panel-title")).getText();
    assert.notEqual(navAfter, navBefore, "neighbor card navigates to another event");
    ok(`neighbor card navigates: "${navBefore}" → "${navAfter}"`);
    await driver.executeScript(`
      const cards = [...document.querySelectorAll('.story-card')];
      (cards.find(c => c.dataset.nav === 'prev') || cards[0]).click();
    `);
    await waitLoad(300);
    const navBack = await driver.findElement(By.id("panel-title")).getText();
    assert.equal(navBack, navBefore, "before card returns to the original event");
    ok(`before card navigates back: "${navAfter}" → "${navBack}"`);

    // ── 4. Glossary words-to-know + modal ────────────────────────────
    const chipCount = (await driver.findElements(By.css(".glossary-chip"))).length;
    assert.ok(chipCount >= 2, `expected glossary chips, got ${chipCount}`);
    await driver.executeScript("document.getElementById('glossary-btn').click()");
    await waitLoad(250);
    const modalItems = (await driver.findElements(By.css(".glossary-item"))).length;
    assert.ok(modalItems >= 20, `glossary modal items: ${modalItems}`);
    await driver.executeScript("document.getElementById('glossary-close').click()");
    assert.equal(await driver.findElement(By.id("glossary-modal")).getAttribute("hidden"), "true");
    ok(`glossary: ${chipCount} inline chips, ${modalItems}-term modal`);

    // ── 5. Search jumps to an event ──────────────────────────────────
    const input = await driver.findElement(By.id("search-input"));
    await input.sendKeys("moon");
    await waitLoad(250);
    const results = (await driver.findElements(By.css(".search-result")));
    assert.ok(results.length >= 1, "search results appear");
    // "moon" matches several events (Solar System kid text mentions the Moon);
    // pick the dedicated Moon Landing entry and verify it opens.
    const moonBtn = await driver.executeScript(
      "const r = [...document.querySelectorAll('.search-result')];" +
      "const b = r.find(e => e.textContent.includes('Moon Landing')); b.click(); return b.textContent"
    );
    assert.ok(moonBtn, "Moon Landing result exists");
    await driver.wait(async () =>
      (await driver.findElement(By.id("panel-title")).getText()) === "Moon Landing", 4000
    );
    ok("search 'moon' → jumps to Moon Landing");

    // ── 5b. Map view plots geocoded events; dot click jumps ──────────
    await driver.executeScript("document.getElementById('map-btn').click()");
    await waitLoad(400);
    const mapInfo = await driver.executeScript(`
      const dots = [...document.querySelectorAll('#map-dots circle')];
      const land = document.querySelector('#world-land').getBoundingClientRect();
      return {
        open: !document.getElementById('map-modal').hidden,
        dots: dots.length,
        landW: Math.round(land.width),
        moon: dots.some(c => c.getAttribute('data-title') === 'Moon Landing'),
        bigbang: dots.some(c => c.getAttribute('data-title') === 'The Big Bang')
      };
    `);
    const expectedDots = await driver.executeScript(
      "return window.TimelineCore.MILESTONES.filter(m => m.coords && !(m.coords[0] === 0 && m.coords[1] === 0)).length");
    assert.equal(mapInfo.open, true, "map modal opens");
    assert.ok(mapInfo.landW > 300, `world outline renders (${mapInfo.landW}px)`);
    assert.equal(mapInfo.dots, expectedDots, `one dot per geocoded event (${mapInfo.dots})`);
    assert.equal(mapInfo.bigbang, false, "cosmic events have no dots");
    assert.equal(mapInfo.moon, true, "Moon Landing plotted");
    ok(`map: ${mapInfo.dots} dots on world outline`);
    await driver.executeScript(`
      const dot = [...document.querySelectorAll('#map-dots circle')].find(c => c.getAttribute('data-title') === 'Moon Landing');
      dot.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    `);
    await driver.wait(async () =>
      (await driver.findElement(By.id("panel-title")).getText()) === "Moon Landing", 4000
    );
    assert.equal(await driver.executeScript("return document.getElementById('map-modal').hidden"), true, "dot click closes the map");
    ok("map dot click → jumps to Moon Landing");

    // ── 6. Era legend chip jumps ──────────────────────────────────────
    const chip = await driver.executeScript(
      "return [...document.querySelectorAll('.legend .chip')].find(c => c.dataset.era === 'Solar System')"
    );
    // chips are spans with title tooltips (era explainer)
    assert.match(await chip.getAttribute("title"), /Sun/i, "era explainer tooltip");
    await chip.click();
    await driver.wait(async () =>
      (await driver.findElement(By.id("panel-title")).getText()) === "Solar System Forms", 4000
    );
    ok("legend chip jumps to Solar System Forms + era tooltip");

    // ── 7. Zoom modes ─────────────────────────────────────────────────
    await driver.executeScript("document.getElementById('mode-human').click()");
    await waitLoad(300);
    const civState = await driver.executeScript(
      "return { visible: [...document.querySelectorAll('.marker')].filter(m => m.style.display !== 'none').length, " +
      "grad: document.querySelector('.number-line').style.background.slice(0,22) }"
    );
    assert.equal(civState.visible, 292, "Civilization view shows 292 events");
    const gradBefore = (await driver.executeScript("return document.querySelector('.number-line').style.backgroundImage"));
    await driver.executeScript("document.getElementById('mode-deep').click()");
    await waitLoad(300);
    const deepVisible = await driver.executeScript(
      "return [...document.querySelectorAll('.marker')].filter(m => m.style.display !== 'none').length"
    );
    assert.equal(deepVisible, 428);
    const gradAfter = await driver.executeScript("return document.querySelector('.number-line').style.backgroundImage");
    assert.notEqual(gradBefore, gradAfter, "line gradient rebuilds per mode");
    ok(`zoom: civilization = 292 events, deep time = 428, gradient rebuilt`);

    // ── 8. Panel arrows step through history and scroll viewport ──────
    await hoverEvent("Moon Landing");
    await driver.wait(async () => {
      const t = await driver.findElement(By.id("panel-title")).getText();
      if (t !== "Moon Landing") await hoverEvent("Moon Landing");
      return t === "Moon Landing";
    }, 8000, "Moon Landing hover");
    await driver.executeScript("document.getElementById('next-btn').click()");
    await driver.wait(async () =>
      (await driver.findElement(By.id("panel-title")).getText()) === "The CT Scanner", 5000
    );
    await waitLoad(900); // smooth scroll
    const scrolled = await driver.executeScript("return document.querySelector('.viewport').scrollLeft");
    assert.ok(scrolled > 2000, `viewport followed the selection (scrollLeft=${scrolled})`);
    await driver.executeScript("document.getElementById('prev-btn').click()");
    await driver.wait(async () =>
      (await driver.findElement(By.id("panel-title")).getText()) === "Moon Landing", 4000
    );
    ok("‹ › step events and the viewport glides to follow");

    // ── 9. Keyboard navigation on the timeline ────────────────────────
    await driver.executeScript("document.getElementById('track').focus()");
    await driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
    await waitLoad(250);
    const kbTitle = await driver.findElement(By.id("panel-title")).getText();
    assert.match(kbTitle, /\S/, "arrow key opened a panel");
    ok(`arrow key navigation active (panel title: ${kbTitle})`);

    // ── 10. Guided tour starts and stops ─────────────────────────────
    await driver.executeScript("document.getElementById('tour-btn').click()");
    await waitLoad(250);
    const tourLabel1 = await driver.executeScript(
      "return document.getElementById('tour-btn').textContent"
    );
    assert.ok(tourLabel1.includes("Tour 1/428"), `tour button state unexpected: ${JSON.stringify(tourLabel1)}`);
    assert.equal(await driver.findElement(By.id("panel-title")).getText(), "The Big Bang", "tour opens event 1");
    await driver.executeScript("document.getElementById('tour-btn').click()"); // stop
    const tourLabel2 = await driver.executeScript(
      "return document.getElementById('tour-btn').textContent"
    );
    assert.match(tourLabel2, /Take the tour/);
    ok("guided tour starts at Big Bang and stops");

    // ── 11. Close the panel ──────────────────────────────────────────
    await driver.executeScript("document.getElementById('close-btn').click()");
    const closed = await driver.executeScript("return document.getElementById('panel').classList.contains('open')");
    assert.equal(closed, false, "close button hides panel");
    ok("panel closes cleanly");

    // ── 12. Service worker registered + caches filled ────────────────
    const swOk = await driver.wait(async () =>
      driver.executeScript("return navigator.serviceWorker.getRegistration().then(r => !!r)"), 8000
    );
    assert.equal(swOk, true, "service worker registered");
    await driver.wait(async () =>
      driver.executeScript(
        "return caches.open('images-v7').then(c => c.keys().then(k => k.length))"
      ) > 0 ? true : false, 20000
    ).catch(() => {});
    const cacheCount = await driver.executeScript(
      "return caches.open('images-v7').then(c => c.keys().then(k => k.length))"
    );
    // Wikimedia throttles bulk fetches from one IP; caching fills as the throttle lifts.
    if (cacheCount < 10) console.log(`  ⚠ image cache warming in progress (${cacheCount}/90) — Wikimedia IP throttle`);
    ok(`service worker active, image cache holds ${cacheCount} entries`);

    // ── 13. Quiz mode flow ───────────────────────────────────────────
    await driver.executeScript("document.getElementById('quiz-btn').click()");
    await waitLoad(300);
    const quizOptions = await driver.executeScript(
      "return [...document.getElementById('quiz-options').querySelectorAll('.quiz-option')].length"
    );
    assert.ok(quizOptions >= 2, `quiz options rendered: ${quizOptions}`);
    await driver.executeScript("document.getElementById('quiz-options').querySelectorAll('.quiz-option')[0].click()");
    await waitLoad(200);
    const quizState = await driver.executeScript(
      "return { feedback: !document.getElementById('quiz-feedback').hidden, " +
      "marked: [...document.getElementById('quiz-options').querySelectorAll('.quiz-option')].filter(b => b.classList.contains('correct') || b.classList.contains('wrong')).length, " +
      "progress: document.getElementById('quiz-progress').textContent }"
    );
    assert.equal(quizState.feedback, true, "feedback appears");
    assert.ok(quizState.marked >= 1 && quizState.marked <= 2, "answer marked (1 if you guessed right, 2 if wrong)");
    assert.match(quizState.progress, /Score \d+/);
    await driver.executeScript("document.getElementById('quiz-next').click()");
    await driver.wait(async () =>
      (await driver.executeScript("return document.getElementById('quiz-progress').textContent")).includes("Question 2"), 3000
    );
    await driver.executeScript("document.getElementById('quiz-close').click()");
    const quizHidden = await driver.executeScript("return document.getElementById('quiz-modal').hidden");
    assert.equal(quizHidden, true, "quiz closes");
    ok(`quiz: ${quizOptions} options rendered, feedback + progress working`);

    // ── 14. Shareable permalink restores state on load ───────────────
    await driver.executeScript("location.hash = '#event=great-pyramid-of-giza'; location.reload()");
    await waitLoad(1200);
    await driver.wait(until.elementLocated(By.id("panel-title")), 5000);
    const restoredTitle = await driver.findElement(By.id("panel-title")).getText();
    assert.equal(restoredTitle, "Great Pyramid of Giza", "hash event opened");
    const hashNow = await driver.executeScript("return location.hash");
    assert.match(hashNow, /event=great-pyramid-of-giza/);
    // selecting another event updates the hash
    await clickEvent("Moon Landing");
    await waitLoad(300);
    const hashAfter = await driver.executeScript("return location.hash");
    assert.match(hashAfter, /event=moon-landing/, "hash follows selection");
    ok("permalink: #event hash restores and tracks selection");

    // ── 15. Printable handout ─────────────────────────────────────────
    await driver.executeScript("document.getElementById('print-btn').click()");
    await waitLoad(300);
    const handout = await driver.executeScript(
      "const s = document.getElementById('print-sheet'); " +
      "return { titles: [...s.querySelectorAll('h2')].map(h => h.textContent), heading: s.querySelector('h1').textContent }"
    );
    assert.equal(handout.heading, "Moon Landing");
    assert.deepEqual(handout.titles.slice(0, 2), ["The bigger story", "Explain it to a 6-year-old"]);
    ok("printable handout builds with all three reading levels");

    // ── 16. Curriculum tag chips filter the line ─────────────────────
    await driver.executeScript("document.getElementById('tags').scrollIntoView()");
    const tagChips = await driver.executeScript(
      "return [...document.querySelectorAll('.tag-chip')].length");
    assert.ok(tagChips >= 8, `tag chips rendered: ${tagChips}`);
    await driver.executeScript(
      "[...document.querySelectorAll('.tag-chip')].find(c => c.dataset.tag === 'medicine & health').click()");
    await waitLoad(250);
    const dimmed = await driver.executeScript(
      "return [...document.querySelectorAll('.marker.dimmed')].length");
    assert.ok(dimmed > 30, `non-medicine events dimmed: ${dimmed}`);
    // clicking the active chip clears the filter
    await driver.executeScript(
      "[...document.querySelectorAll('.tag-chip')].find(c => c.dataset.tag === 'medicine & health').click()");
    const dimmedAfterClear = await driver.executeScript(
      "return [...document.querySelectorAll('.marker.dimmed')].length");
    assert.equal(dimmedAfterClear, 0);
    ok(`curriculum chips filter the line (${dimmed} dimmed for medicine & health)`);

    // ── 16b. Story reader flips pages ───────────────────────────────
    await driver.executeScript("document.getElementById('read-btn').click()");
    await driver.wait(until.elementLocated(By.id('reader-title')), 4000);
    const reader1 = await driver.executeScript("return document.getElementById('reader-title').textContent");
    await driver.executeScript("document.getElementById('reader-next').click()");
    const reader2 = await driver.executeScript("return document.getElementById('reader-title').textContent");
    assert.notEqual(reader2, reader1, "reader flips to next event");
    ok(`story reader opens + flips: ${reader1} → ${reader2}`);
    await driver.executeScript("document.getElementById('reader-close').click()");

    // ── 16c. Language switch applies Italian UI ─────────────────────
    await driver.executeScript(
      "const sel = document.getElementById('lang-select'); sel.value = 'it'; sel.dispatchEvent(new Event('change')); return 'ok'");
    await waitLoad(300);
    const itSub = await driver.executeScript(
      "return document.querySelector('[data-i18n=modeDeep]').textContent");
    assert.match(itSub, /Tempo profondo/i, "Italian strings applied");
    await driver.executeScript(
      "const sel = document.getElementById('lang-select'); sel.value = 'en'; sel.dispatchEvent(new Event('change'))");
    ok(`language switch verified (Italian: ${itSub.slice(0, 40)}…)`);

    // ── 16e. Zoom: slider + buttons + wheel ─────────────────────────
    const zoomBefore = await driver.executeScript("return document.querySelector('.track').style.width");
    await driver.executeScript("const sl = document.getElementById('zoom-slider'); sl.value = 200; sl.dispatchEvent(new Event('input'))");
    await waitLoad(300);
    const zoomAfter = await driver.executeScript("return document.querySelector('.track').style.width");
    assert.notEqual(zoomBefore, zoomAfter, "slider changes zoom");
    assert.equal(await driver.executeScript("return document.getElementById('zoom-val').textContent"), "200%", "readout updates");
    // click-to-reset
    await driver.executeScript("document.getElementById('zoom-val').click()");
    await waitLoad(200);
    const zoomReset = await driver.executeScript("return document.querySelector('.track').style.width");
    assert.equal(zoomReset, "350vw", "reset restores 100%");
    // +/- buttons
    await driver.executeScript("document.getElementById('zoom-in').click()");
    await waitLoad(200);
    const zoomIn = await driver.executeScript("return document.querySelector('.track').style.width");
    assert.notEqual(zoomIn, "350vw", "zoom-in button works");
    ok(`zoom: slider + reset + buttons (${zoomBefore} → ${zoomAfter} → ${zoomReset} → ${zoomIn})`);

    // ── 16d. A11y debt: dialog roles, Escape closes, keyboard legend ─
    const dialogCount = await driver.executeScript(
      "return [...document.querySelectorAll('[role=dialog]')].length");
    assert.equal(dialogCount, 8, "8 modals carry role=dialog (incl. map, settings, teacher quiz, order quiz)");

    /* Escape closes the quiz */
    await driver.executeScript("document.getElementById('quiz-btn').click()");
    await waitLoad(250);
    await driver.executeScript("document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));");
    const quizClosed = await driver.executeScript("return document.getElementById('quiz-modal').hidden");
    assert.equal(quizClosed, true, "Escape closes the quiz");

    /* Escape closes the story reader */
    await driver.executeScript(
      "window.__storyReader.openReader(0);" +
      "document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));" +
      "window.__rdHidden = document.getElementById('story-reader').hidden;");
    const readerClosed = await driver.executeScript("return window.__rdHidden");;
    assert.equal(readerClosed, true, "Escape closes the reader");

    /* legend chips are keyboard-focusable buttons */
    const keyboardLegend = await driver.executeScript(
      "return !!document.querySelector('.legend .chip[role=button][tabindex]')");
    assert.equal(keyboardLegend, true, "legend chips keyboard-focusable");
    ok("a11y: 8 dialogs, Esc closes quiz/reader, keyboard legend chips");

    // ── 16f. Teacher quiz + CSV export ───────────────────────────────
    await driver.executeScript("document.getElementById('teacher-quiz-btn').click()");
    await waitLoad(250);
    const eraBoxes = await driver.findElements(By.css("#teacher-quiz-eras input[type=checkbox]"));
    assert.ok(eraBoxes.length >= 11, `era checkboxes (${eraBoxes.length})`);
    await driver.executeScript("document.getElementById('tq-count').value = 4");
    await driver.executeScript("document.getElementById('tq-start').click()");
    await waitLoad(300);
    assert.match(await driver.findElement(By.id("quiz-progress")).getText(), /Question 1 of 4/, "teacher quiz starts");
    ok("teacher quiz: eras listed, 4-question quiz starts");
    await driver.executeScript("[...document.querySelectorAll('#quiz-options .quiz-option')][0].click()");
    await waitLoad(250);
    assert.equal(await driver.findElement(By.id("quiz-feedback")).getAttribute("hidden"), null, "quiz feedback shows");
    // capture the CSV instead of downloading it
    await driver.executeScript("window.__csv=null; const _c=URL.createObjectURL.bind(URL); URL.createObjectURL=function(b){ b.text().then(t=>{window.__csv=t;}); return _c(b); };");
    await driver.executeScript("document.getElementById('teacher-quiz-btn').click()"); // reopen modal
    await waitLoad(250);
    await driver.executeScript("document.getElementById('tq-export').click()");
    await driver.wait(async () => driver.executeScript("return window.__csv"), 4000);
    const csv = await driver.executeScript("return window.__csv");
    assert.ok(csv.startsWith("question,answer,score"), "CSV header");
    assert.equal(csv.trim().split("\n").length, 2, "header + 1 answered question");
    await driver.executeScript("document.getElementById('quiz-close').click()");
    ok("teacher quiz: answer recorded, CSV exports (header + 1 row)");

    // ── 16g. Order quiz: arrange events chronologically ────────────────
    await driver.executeScript("document.getElementById('order-quiz-btn').click()");
    await waitLoad(250);
    assert.equal((await driver.findElements(By.css("#order-quiz-options .quiz-option"))).length, 4, "4 order options");
    await driver.executeScript("[...document.querySelectorAll('#order-quiz-options .quiz-option')].forEach(b=>b.click())");
    await waitLoad(250);
    const orderFb = await driver.findElement(By.id("order-quiz-feedback"));
    assert.equal(await orderFb.getAttribute("hidden"), null, "order feedback shows");
    assert.match(await orderFb.getText(), /Correct|correct order/, "feedback judges the order");
    await driver.executeScript("document.getElementById('order-quiz-next').click()");
    await waitLoad(250);
    assert.match(await driver.findElement(By.id("order-quiz-progress")).getText(), /Question 2 of/, "order quiz advances");
    await driver.executeScript("document.getElementById('order-quiz-close').click()");
    ok("order quiz: options, judged feedback, advance");

    // ── 16h. Image quiz renders and judges ─────────────────────────────
    await driver.executeScript("document.getElementById('image-quiz-btn').click()");
    await waitLoad(300);
    assert.equal((await driver.findElements(By.css("#quiz-options .quiz-option"))).length, 4, "4 image options");
    assert.ok((await driver.findElement(By.id("quiz-question")).getText()).length > 10, "question text");
    const qImgState = await driver.executeScript(`
      const im = document.getElementById('quiz-image');
      return { shown: im.style.display !== 'none', ok: im.style.display === 'none' || (im.complete && im.naturalWidth > 0) };
    `);
    assert.ok(qImgState.ok, "quiz image loads when shown");
    await driver.executeScript("[...document.querySelectorAll('#quiz-options .quiz-option')][1].click()");
    await waitLoad(250);
    assert.equal(await driver.findElement(By.id("quiz-feedback")).getAttribute("hidden"), null, "image feedback shows");
    await driver.executeScript("document.getElementById('quiz-close').click()");
    ok(`image quiz: question + judged answer (image ${qImgState.shown ? "shown" : "hidden for this draw"})`);

    // ── 16i. Riddles: clues, options, score ────────────────────────────
    await driver.executeScript("document.getElementById('riddles-btn').click()");
    await waitLoad(250);
    assert.ok((await driver.findElements(By.css(".riddle-clue"))).length >= 2, "riddle clues render");
    assert.equal((await driver.findElements(By.css("#riddles-options .quiz-option"))).length, 4, "4 riddle options");
    await driver.executeScript("[...document.querySelectorAll('#riddles-options .quiz-option')][0].click()");
    await waitLoad(250);
    assert.equal(await driver.findElement(By.id("riddles-feedback")).getAttribute("hidden"), null, "riddle feedback shows");
    await driver.executeScript("document.getElementById('riddles-next').click()");
    await waitLoad(250);
    assert.match(await driver.findElement(By.id("riddles-progress")).getText(), /Riddle 2 of/, "riddles advance + score");
    await driver.executeScript("document.getElementById('riddles-close').click()");
    ok("riddles: clues, judged answer, advance");

    // ── 16j. Teacher packs list + worksheet build ──────────────────────
    await driver.executeScript("window.print = function(){ window.__printed = true; };");
    await driver.executeScript("document.getElementById('packs-btn').click()");
    await waitLoad(250);
    const packBtns = await driver.findElements(By.css("#packs-list button"));
    assert.equal(packBtns.length, 11, "one pack per era");
    await driver.executeScript("[...document.querySelectorAll('#packs-list button')][0].click()");
    await waitLoad(300);
    assert.equal(await driver.executeScript("return document.getElementById('packs-modal').hidden"), true, "pack builds + modal closes");
    assert.ok((await driver.executeScript("return document.querySelector('#print-sheet h1').textContent")).length > 3, "worksheet built");
    assert.equal(await driver.executeScript("return !!window.__printed"), true, "print invoked");
    ok("packs: 11 eras, worksheet builds, print invoked");

    // ── 16k. Lens toggle swaps the story perspective ───────────────────
    await hoverEvent("The Big Bang");
    await waitLoad(400);
    const storyBefore = await driver.executeScript("return document.querySelector('.story-cell p').textContent");
    await driver.executeScript("const s=document.getElementById('lens-select'); s.value='islamic'; s.dispatchEvent(new Event('change'))");
    await waitLoad(300);
    const storyAfter = await driver.executeScript("return document.querySelector('.story-cell p').textContent");
    assert.notEqual(storyBefore, storyAfter, "lens changes the story");
    assert.equal(await driver.executeScript("return localStorage.getItem('ct-lens')"), "islamic", "lens persists");
    await driver.executeScript("const s=document.getElementById('lens-select'); s.value='scientific'; s.dispatchEvent(new Event('change'))");
    ok("lens toggle swaps perspective (scientific ↔ islamic)");

    // ── 16l. Embed mode renders compact + preselects ───────────────────
    await driver.get(BASE + "?event=moon-landing&embed=1");
    await driver.wait(until.titleContains("Cosmic Timeline"), 8000);
    await waitLoad(500);
    assert.equal(await driver.executeScript("return document.body.classList.contains('embed-mode')"), true, "embed class applied");
    assert.equal(await driver.findElement(By.id("panel-title")).getText(), "Moon Landing", "embed preselects event");
    await driver.get(BASE);
    await driver.wait(until.titleContains("Cosmic Timeline"), 8000);
    await waitLoad(500);
    ok("embed mode: compact chrome + preselected event");

    // ── 16m. Powers + future modes filter the line ─────────────────────
    const countVisible = () => driver.executeScript(
      "return [...document.querySelectorAll('.marker')].filter(m => m.style.display !== 'none').length");
    await driver.executeScript("document.getElementById('mode-powers').click()");
    await waitLoad(300);
    const powersN = await countVisible();
    assert.ok(powersN > 0 && powersN < 428, `powers shows a subset (${powersN})`);
    await driver.executeScript("document.getElementById('mode-future').click()");
    await waitLoad(300);
    const futureN = await countVisible();
    assert.ok(futureN > 0 && futureN < 428, `future shows a subset (${futureN})`);
    await driver.executeScript("document.getElementById('mode-deep').click()");
    await waitLoad(300);
    assert.equal(await countVisible(), 428, "deep time restores all");
    ok(`modes filter the line (powers ${powersN}, future ${futureN}, deep 428)`);

    // ── 16n. Progress badge tracks the localStorage journal ───────────
    await hoverEvent("Dinosaur Extinction");
    await waitLoad(400);
    const prog = await driver.executeScript(`
      const t = document.getElementById('progress-badge').textContent;
      return { text: t, n: parseInt(t, 10), stored: JSON.parse(localStorage.getItem('ct-read') || '[]').length };
    `);
    assert.equal(prog.n, prog.stored, "badge matches journal");
    assert.ok(prog.n >= 5, `several events journaled (${prog.n})`);
    ok(`progress: badge "${prog.text.trim()}" matches journal`);

    // ── 16o. Keyboard +/- zooms the line ──────────────────────────────
    const zwBefore = await driver.executeScript("return document.querySelector('.track').style.width");
    await driver.executeScript("document.dispatchEvent(new KeyboardEvent('keydown', { key: '+', bubbles: true }))");
    await waitLoad(200);
    const zwIn = await driver.executeScript("return document.querySelector('.track').style.width");
    assert.notEqual(zwIn, zwBefore, "+ zooms in");
    await driver.executeScript("document.dispatchEvent(new KeyboardEvent('keydown', { key: '-', bubbles: true }))");
    await waitLoad(200);
    const zwOut = await driver.executeScript("return document.querySelector('.track').style.width");
    assert.notEqual(zwOut, zwIn, "- zooms out");
    ok(`keyboard zoom (${zwBefore} → ${zwIn} → ${zwOut})`);

    // ── 16p. Audio settings modal + persisted rate ────────────────────
    await driver.executeScript("document.getElementById('settings-btn').click()");
    await waitLoad(250);
    assert.equal(await driver.executeScript("return document.getElementById('settings-modal').hidden"), false, "settings opens");
    assert.ok(await driver.findElement(By.id("voice-select")), "voice picker present");
    await driver.executeScript("const r=document.getElementById('rate-slider'); r.value=120; r.dispatchEvent(new Event('input'))");
    await waitLoad(200);
    assert.equal(await driver.executeScript("return localStorage.getItem('ct-rate')"), "1.2", "rate persists");
    assert.ok((await driver.executeScript("return document.getElementById('rate-val').textContent")).includes("1.2"), "rate label updates");
    await driver.executeScript("document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))");
    await waitLoad(200);
    assert.equal(await driver.executeScript("return document.getElementById('settings-modal').hidden"), true, "Esc closes settings");
    ok("settings: opens, rate persists (1.2×), Esc closes");

    // ── 16q. Narration toggle arms without errors ──────────────────────
    await driver.executeScript("document.getElementById('narrate-btn').click()");
    await waitLoad(200);
    assert.match(await driver.executeScript("return document.getElementById('narrate-btn').textContent"), /Stop/, "narration arms");
    await driver.executeScript("document.getElementById('narrate-btn').click()");
    await waitLoad(200);
    assert.match(await driver.executeScript("return document.getElementById('narrate-btn').textContent"), /Narrate/, "narration stops");
    ok("narrate toggle arms/stops cleanly");

    // ── 16r. Credits page lists every image ───────────────────────────
    const creditsHref = await driver.executeScript("return document.querySelector('.site-footer a[href*=credits]').href");
    await driver.get(creditsHref);
    await driver.wait(until.titleContains("Image Credits"), 8000);
    const creditRows = await driver.findElements(By.css("tbody tr"));
    assert.ok(creditRows.length >= 428, `credit rows (${creditRows.length})`);
    await driver.get(BASE);
    await driver.wait(until.titleContains("Cosmic Timeline"), 8000);
    await waitLoad(500);
    ok(`credits page live (${creditRows.length} rows)`);

    // ── 16s. Map closes via Escape + backdrop ─────────────────────────
    await driver.executeScript("document.getElementById('map-btn').click()");
    await waitLoad(300);
    await driver.executeScript("document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))");
    await waitLoad(200);
    assert.equal(await driver.executeScript("return document.getElementById('map-modal').hidden"), true, "Esc closes map");
    await driver.executeScript("document.getElementById('map-btn').click()");
    await waitLoad(300);
    await driver.executeScript("document.getElementById('map-modal').click()");
    await waitLoad(200);
    assert.equal(await driver.executeScript("return document.getElementById('map-modal').hidden"), true, "backdrop closes map");
    ok("map: Esc + backdrop close");

    // ── 17. No console errors throughout ────────────────────────────

    const logs = (await driver.manage().logs().get("browser").catch(() => [])).filter(
      (l) => l.level.name === "SEVERE" && !l.message.includes("favicon")
    );
    assert.deepEqual(logs.map((l) => l.message.slice(0, 80)), [], "no severe console errors");
    ok("console clean (no severe errors)");

    console.log(`\n✅ ALL ${passed} E2E CHECKS PASSED\n`);
  } catch (err) {
    const shot = path.join(__dirname, "..", ".failure-screenshot.png");
    try {
      fs.writeFileSync(shot, Buffer.from(await driver.takeScreenshot(), "base64"));
      console.error("failure screenshot saved to", shot);
    } catch { /* screenshot is best-effort */ }
    console.error("\n❌ E2E FAILURE:", err.message);
  console.error(err.stack.split('\n').slice(1, 6).join('\n'));
    process.exitCode = 1;
  } finally {
    await driver.quit().catch(() => {});
    server.close();
  }
}

main();
