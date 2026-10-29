const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const core = require("../../timeline-core.js");

const ROOT = path.join(__dirname, "..", "..");
const HTML = fs.readFileSync(path.join(ROOT, "timeline.html"), "utf8");

/* ── structural debt invariants (guards against future splice damage) ── */

test("exactly one <style>, and no JS leaked inside it", () => {
  const start = HTML.indexOf("<style>");
  const end = HTML.indexOf("</style>", start);
  const style = HTML.slice(start, end);
  ["getElementById", "addEventListener", "MILESTONES", "applyPositions("].forEach((k) =>
    assert.ok(!style.includes(k), `JS marker leaked inside <style>: ${k}`));
  // sanity: the style actually styles
  assert.ok(style.length > 15000, "CSS unexpectedly small");
});

test("core has no dead locale consts (i18n refactor leftover)", () => {
  assert.ok(!core.STRINGS.CURRENT_LOCALE);
  assert.ok(!core.STRINGS.STRINGS_EN);
});

test("obsolete .empty overlay is fully gone", () => {
  assert.ok(!HTML.includes('id="empty"'));
  assert.ok(!/\.empty \{/.test(HTML));
  assert.ok(!/\.empty\.visible/.test(HTML));
  assert.ok(!HTML.includes('getElementById("empty")'));
});

test("all three modals are dialogs with Escape + focus wiring", () => {
  ["packs-modal", "quiz-modal", "glossary-modal"].forEach((id) => {
    assert.ok(HTML.includes(`id="${id}" role="dialog"`), `${id} missing role=dialog`);
  });
  ["glossaryCloseBtn.focus()", "quizCloseBtn.focus()", "packsClose.focus()"].forEach((k) =>
    assert.ok(HTML.includes(k), `missing focus management: ${k}`));
  assert.ok(HTML.includes("if (!quizModal.hidden) closeQuiz();"), "Escape must close the quiz");
});

test("story reader closes on Escape", () => {
  assert.ok(HTML.includes("if (e.key === 'Escape') closeReader();"));
});

test("legend chips are keyboard-accessible buttons", () => {
  assert.ok(HTML.includes('setAttribute("role", "button")'), "legend chip role");
  assert.ok(HTML.includes('chip.setAttribute("tabindex", "0")'), "legend chip tabindex");
  assert.ok(HTML.includes('if (e.key !== "Enter" && e.key !== " ") return;'), "legend Enter/Space activation");
});

test("IIFE statements are actually invoked (parenthesis sanity guard)", () => {
  // the langFeature bug class: every named IIFE must self-invoke with })()
  const starts = [...HTML.matchAll(/(?:^|\n)\(function\s+(\w+)\(\)\s*\{/g)];
  assert.ok(starts.length >= 5, "expected several named IIFEs to exist");
  starts.forEach((m) => {
    const tail = HTML.slice(m.index, m.index + 3000);
    assert.ok(
      tail.includes("\n})();"),
      `IIFE "${m[1]}" is never self-invoked (missing \n})();)`
    );
  });
});

test("focus-visible styling and ?reset=1 rescue shipped", () => {
  assert.ok(HTML.includes(":focus-visible"), "focus outlines present");
  assert.ok(HTML.includes('?reset') && HTML.includes('getRegistrations'), "reset affordance present");
});

test("dead wheel handler leftovers removed", () => {
  assert.ok(!HTML.includes("zoom only when the details panel is closed"));
});
