const test = require("node:test");
const assert = require("node:assert/strict");
const core = require("../../timeline-core.js");

test("searchMilestones returns relevant results for a keyword", () => {
  const r = core.searchMilestones("moon");
  assert.ok(Array.isArray(r) && r.length >= 1, "moon search returns results");
  assert.ok(r.includes(core.MILESTONES.findIndex((m) => m.title === "Moon Landing")), "Moon Landing included");
});

test("searchMilestones handles multi-word queries", () => {
  const r = core.searchMilestones("first life");
  assert.ok(r.length >= 1, "first life returns results");
});

test("searchMilestones returns empty for nonsense", () => {
  const r = core.searchMilestones("zzzzxxxxx");
  assert.equal(r.length, 0);
});

test("searchMilestones is deterministic", () => {
  const a = core.searchMilestones("space");
  const b = core.searchMilestones("space");
  assert.deepEqual(a, b);
});