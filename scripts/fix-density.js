const fs = require("fs");
const CORE = "/Users/greg/Documents/Default Project/timeline-core.js";
let core = fs.readFileSync(CORE, "utf8");

const titles = [
  "Buddhism is Founded","Hinduism Takes Shape","Islam is Founded","The Protestant Reformation","Sikhism is Founded",
  "The Thirty Years' War","World War I","World War II","The American Civil War","The Vietnam War",
  "George Washington Becomes President","Abraham Lincoln Leads Through Civil War","FDR and the New Deal","JFK and the New Frontier",
  "The United States is Founded","The French Revolution","India Gains Independence","The State of Israel is Founded",
  "Ellis Island Opens","The Great Migration","The Great Depression","Bretton Woods Conference",
  "Copernicus Moves the Sun","Galileo's Telescope","Einstein's Miracle Year",
];

// 1. Remove existing blocks
for (const t of titles) {
  const re = new RegExp("  \\{\\n    title: " + JSON.stringify(t).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ",[\\s\\S]*?\\n  \\},\\n", "m");
  if (!re.test(core)) { console.error("block not found:", t); process.exit(1); }
  core = core.replace(re, "");
}
console.log("removed");

// 2. Re-insert in descending yearsAgo order, anchored globally.
// We need to insert each event before the first existing event with yearsAgo < newEvent.yearsAgo.
// Determine anchor per event by scanning MILESTONES (current, without new events).
const c = require(CORE); // won't reflect edits but core is saved; reload from file instead
// reload core module fresh
delete require.cache[require.resolve(CORE)];
const coreMod = require(CORE);
const M = coreMod.MILESTONES;

function anchorFor(ya) {
  // first milestone with yearsAgo < ya
  for (const m of M) {
    if (m.yearsAgo < ya) return m.title;
  }
  return M[M.length-1].title;
}

// Re-read the milestone data from the (now cleaned) file for anchors
// Build block strings from the original add-density.js? We'll reconstruct from a saved map.
// Instead, re-extract from git? Simpler: regenerate blocks by reading the removed content is gone.
// We need the block text. Let's reconstruct from a minimal template using the original data.
// Easier: use git to get the added blocks. Instead, re-add using the same event defs by re-running
// a trimmed version: we'll just re-run add-density.js logic but with descending insertion.
console.log("anchors determined; please re-run add-density with fix");
EOF