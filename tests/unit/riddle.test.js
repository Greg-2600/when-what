const test = require("node:test");
const assert = require("node:assert/strict");
const core = require("../../timeline-core.js");

test("makeRiddleGame produces valid, guessable riddle rounds", () => {
  const qs = core.makeRiddleGame(5);
  assert.equal(qs.length, 5);
  qs.forEach((q) => {
    assert.equal(q.clues.length >= 3, true, "three clues per riddle");
    assert.equal(q.options.length, 4, "four options");
    assert.equal(new Set(q.options).size, 4, "options unique");
    assert.ok(q.options[q.answerIndex] === q.answer, "answerIndex points at answer");
    assert.ok(q.clues.every((cl) => !cl.includes(q.answer)), "clues must not name the answer: " + q.answer);
    assert.ok(q.fact.length > 20, "fact present");
  });
});

test("riddles don't repeat within a round and are supply-bounded", () => {
  const big = core.makeRiddleGame(99);
  const answers = big.map((r) => r.answer);
  assert.equal(new Set(answers).size, answers.length, "no repeated answers in one round");
  assert.equal(big.length, core.RIDDLES.length, "bounded by authored riddles");
});

test("deterministic with a seeded rng", () => {
  function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  const a = core.makeRiddleGame(4, rng(11));
  const b = core.makeRiddleGame(4, rng(11));
  assert.deepEqual(a.map((r) => r.answer + r.options.join(",")), b.map((r) => r.answer + r.options.join(",")));
});

test("answers always resolve to real milestones with summaries", () => {
  core.RIDDLES.forEach((r) => {
    const m = core.MILESTONES.find((mm) => mm.title === r.answer);
    assert.ok(m, "riddle answer not a milestone: " + r.answer);
    assert.ok(m.summary.length > 100, "answer event too thin: " + r.answer);
  });
});
