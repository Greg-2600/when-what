const test = require("node:test");
const assert = require("node:assert/strict");
const core = require("../../timeline-core.js");

const M = core.MILESTONES;
const mapped = (m) => Array.isArray(m.coords) && !(m.coords[0] === 0 && m.coords[1] === 0);

test("every milestone has valid coords (mapped or explicit [0,0])", () => {
  M.forEach((m) => {
    assert.ok(Array.isArray(m.coords) && m.coords.length === 2, `coords missing on ${m.title}`);
    const [lat, lon] = m.coords;
    assert.ok(Number.isFinite(lat) && Number.isFinite(lon), `coords not finite on ${m.title}`);
    assert.ok(lat >= -90 && lat <= 90, `lat out of range on ${m.title}: ${lat}`);
    assert.ok(lon >= -180 && lon <= 180, `lon out of range on ${m.title}: ${lon}`);
  });
});

test("map coverage: most place-able events are geocoded", () => {
  const n = M.filter(mapped).length;
  assert.ok(n >= 320, `only ${n}/${M.length} events geocoded (want >= 320)`);
});

test("cosmic events stay unmapped (no fake locations)", () => {
  M.filter((m) => ["Cosmic origins", "Galaxies", "Solar System"].includes(m.era)).forEach((m) => {
    assert.ok(!mapped(m), `${m.title} should not have map coords`);
  });
});

test("WORLD_LAND is a usable offline outline", () => {
  assert.equal(typeof core.WORLD_LAND, "string");
  assert.ok(core.WORLD_LAND.length > 10000, "land path suspiciously small");
  assert.ok(core.WORLD_LAND.startsWith("M"), "path must start with M");
  assert.ok(core.WORLD_LAND.endsWith("Z"), "path must end with Z");
  // integer coords inside a 1000x500 box
  const nums = core.WORLD_LAND.match(/-?\d+/g).map(Number);
  for (let i = 0; i < nums.length; i += 2) {
    assert.ok(nums[i] >= -5 && nums[i] <= 1005, `x out of box: ${nums[i]}`);
    assert.ok(nums[i + 1] >= -5 && nums[i + 1] <= 505, `y out of box: ${nums[i + 1]}`);
  }
});
