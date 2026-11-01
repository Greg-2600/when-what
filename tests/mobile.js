/**
 * Mobile-viewport verification for the Cosmic Timeline.
 *
 *   node tests/mobile.js
 *
 * Runs the app at a narrow phone viewport and checks the mobile UX contract:
 * page scrolls naturally, timeline keeps usable height, tap shows the story
 * strip (no auto bottom-sheet), Details opens the sheet, touch targets fit.
 * Exit code 0 = everything works.
 */
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("node:assert/strict");

process.env.PORT = process.env.PORT || "8767";
const { server, PORT } = require("../scripts/serve.js");
const BASE = `http://localhost:${PORT}/timeline.html`;

let passed = 0;
function ok(label) { passed += 1; console.log(`  ✔ ${label}`); }

async function main() {
  server.listen(PORT);
  const options = new chrome.Options();
  options.addArguments("--headless=new");
  options.addArguments("--window-size=390,844");
  options.addArguments("--no-first-run");
  options.addArguments("--disable-search-engine-choice-screen");
  const driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
  const waitLoad = (ms = 800) => driver.sleep(ms);

  try {
    await driver.get(BASE);
    await driver.wait(until.titleContains("Cosmic Timeline"), 8000);
    await waitLoad(500);

    // ── M1. Narrow layout: no page-level horizontal overflow ──────────
    const noX = await driver.executeScript(
      "return document.documentElement.scrollWidth <= window.innerWidth + 1");
    assert.equal(noX, true, "page must not overflow horizontally on mobile");
    ok("no horizontal page overflow at phone width");

    // ── M2. Timeline keeps a usable height ────────────────────────────
    const vpH = await driver.executeScript(
      "return document.querySelector('.viewport').getBoundingClientRect().height");
    assert.ok(vpH > 200, `timeline viewport too short (${Math.round(vpH)}px)`);
    const markers = await driver.findElements(By.css(".marker"));
    assert.ok(markers.length > 100, `markers rendered (${markers.length})`);
    ok(`timeline usable (${Math.round(vpH)}px viewport, ${markers.length} markers)`);

    // ── M3. Touch-sized markers ───────────────────────────────────────
    const mSize = await driver.executeScript(`
      const r = document.querySelector('.marker').getBoundingClientRect();
      return { w: r.width, h: r.height };
    `);
    assert.ok(mSize.w >= 20 && mSize.h >= 20, `markers too small to tap (${mSize.w}x${mSize.h})`);
    ok(`touch-sized markers (${Math.round(mSize.w)}px)`);

    // ── M4. Tap selects WITHOUT auto-opening the sheet ────────────────
    await driver.executeScript(
      "const mk=[...document.querySelectorAll('.marker')].find(m=>m.getAttribute('aria-label').includes('Moon Landing')); if(mk) mk.click();");
    await waitLoad(400);
    const afterTap = await driver.executeScript(`
      const strip = document.querySelector('#story-strip');
      const sr = strip.getBoundingClientRect();
      return {
        panelOpen: document.querySelector('.panel').classList.contains('open'),
        stripHidden: strip.hasAttribute('hidden'),
        stripCards: document.querySelectorAll('.story-card').length,
        stripVisible: sr.height > 50 && sr.width > 50,
        detailsVisible: (() => { const b = document.querySelector('.scard-details'); if (!b) return false; const r = b.getBoundingClientRect(); return r.width > 0 && r.height > 0; })()
      };
    `);
    assert.equal(afterTap.panelOpen, false, "bottom sheet must not auto-open on tap");
    assert.equal(afterTap.stripHidden, false, "story strip must appear on tap");
    assert.equal(afterTap.stripCards, 3, "before / now / after cards");
    assert.ok(afterTap.detailsVisible, "Details button must be visible on mobile");
    ok("tap shows story strip, sheet stays closed, Details offered");

    // ── M5. Strip image loads ─────────────────────────────────────────
    await driver.executeScript("document.querySelector('#story-strip').scrollIntoView({block:'nearest'});");
    await driver.wait(async () =>
      driver.executeScript("const ims=[...document.querySelectorAll('#story-strip img')]; return ims.length>0 && ims.some(im=>im.complete&&im.naturalWidth>0)"),
      15000, "story strip image should load on mobile");
    ok("story strip image loads on mobile");

    // ── M6. Details opens the sheet; close clears everything ──────────
    await driver.executeScript("document.querySelector('.scard-details').click();");
    await waitLoad(400);
    assert.equal(await driver.executeScript("return document.querySelector('.panel').classList.contains('open')"), true, "Details must open the sheet");
    const sheetTitle = await driver.findElement(By.id("panel-title")).getText();
    assert.ok(sheetTitle.length > 2, "sheet shows the event");
    // panel arrows still navigate inside the sheet
    await driver.executeScript("document.getElementById('next-btn').click();");
    await waitLoad(400);
    const steppedTitle = await driver.findElement(By.id("panel-title")).getText();
    assert.notEqual(steppedTitle, sheetTitle, "sheet arrows navigate");
    ok(`Details opens sheet ("${sheetTitle}"), arrows step ("${steppedTitle}")`);
    await driver.executeScript("document.getElementById('close-btn').click();");
    await waitLoad(300);
    const afterClose = await driver.executeScript(
      "return { open: document.querySelector('.panel').classList.contains('open'), stripHidden: document.querySelector('#story-strip').hasAttribute('hidden') }");
    assert.equal(afterClose.open, false, "sheet closes");
    assert.equal(afterClose.stripHidden, true, "strip clears with the selection");
    ok("close clears sheet + strip");

    // ── M6b. Map view works at phone width ───────────────────────────
    await driver.executeScript("document.getElementById('map-btn').click();");
    await waitLoad(400);
    const mobMap = await driver.executeScript(`
      const dots = document.querySelectorAll('#map-dots circle').length;
      const r = document.querySelector('#world-map').getBoundingClientRect();
      return { open: !document.getElementById('map-modal').hidden, dots,
               fits: r.width <= window.innerWidth + 1 };
    `);
    assert.equal(mobMap.open, true, "map opens on mobile");
    assert.ok(mobMap.dots > 300, `dots plotted (${mobMap.dots})`);
    assert.ok(mobMap.fits, "map fits the phone screen");
    await driver.executeScript("document.getElementById('map-close').click();");
    await waitLoad(250);
    assert.equal(await driver.executeScript("return document.getElementById('map-modal').hidden"), true, "map closes");
    ok(`map view on mobile (${mobMap.dots} dots)`);

    // ── M7. No severe console errors ──────────────────────────────────
    const logs = (await driver.manage().logs().get("browser").catch(() => [])).filter(
      (l) => l.level.name === "SEVERE" && !l.message.includes("favicon")
    );
    assert.deepEqual(logs.map((l) => l.message.slice(0, 80)), [], "no severe console errors on mobile");
    ok("console clean (no severe errors)");

    console.log(`\n✅ ALL ${passed} MOBILE CHECKS PASSED\n`);
  } catch (err) {
    console.error("\n❌ MOBILE E2E FAILURE:", err.message);
    console.error(err.stack.split("\n").slice(1, 6).join("\n"));
    process.exitCode = 1;
  } finally {
    await driver.quit().catch(() => {});
    server.close();
  }
}

main();
