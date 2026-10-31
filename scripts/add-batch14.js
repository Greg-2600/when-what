const fs = require("fs");
const CORE = "/Users/greg/Documents/Default Project/timeline-core.js";
let core = fs.readFileSync(CORE, "utf8");

function block(o) {
  const deep = o.deep.map(d => "      " + JSON.stringify(d) + ",").join("\n");
  return "  {\n" +
    "    title: " + JSON.stringify(o.title) + ",\n" +
    "    yearsAgo: " + o.yearsAgo + ",\n" +
    "    era: " + JSON.stringify(o.era) + ",\n" +
    "    kid: " + JSON.stringify(o.kid) + ",\n" +
    "    fun: " + JSON.stringify(o.fun) + ",\n" +
    "    summary: " + JSON.stringify(o.summary) + ",\n" +
    "    deep: [\n" + deep + "\n    ],\n" +
    "  },";
}

const events = [
  // Life — more evolution
  { o: { title: "The First Eyes", yearsAgo: 540000000, era: "Life", kid: "Around 540 million years ago, the first eyes appeared! Before that, all life was blind. Suddenly animals could see predators, prey and mates. It was one of the biggest leaps in evolution!", fun: "Eyes evolved independently at least 40 times.", summary: "The first eyes appeared ~540 Mya during the Cambrian Explosion. Vision transformed animal behavior and evolution.", deep: ["The first eyes were simple light-sensitive spots.", "Compound eyes (insects) and camera eyes (vertebrates) evolved separately.", "Vision enabled predation and escape behaviors.", "Eyes evolved independently in many lineages."] } },
  { o: { title: "The First Brains", yearsAgo: 550000000, era: "Life", kid: "Around 550 million years ago, the first brains appeared! Before that, animals had simple nerve nets. Brains let animals learn, remember and make decisions. Every thought you've ever had started here!", fun: "The first brains were tiny — smaller than a grain of sand.", summary: "The first centralized brains appeared ~550 Mya. They enabled learning, memory and complex behavior.", deep: ["Early brains were clusters of neurons (ganglia).", "Bilateral symmetry enabled directional movement and brain development.", "Brain size increased dramatically in vertebrates.", "Human brains have 86 billion neurons."] } },
  { o: { title: "The First Skeletons", yearsAgo: 545000000, era: "Life", kid: "Around 545 million years ago, animals started growing hard parts! Shells, bones and exoskeletons protected them from predators. The fossil record suddenly exploded with hard-bodied creatures!", fun: "Hard parts made fossils much more common.", summary: "Biomineralization (hard parts: shells, bones, exoskeletons) appeared ~545 Mya. It was a key innovation of the Cambrian Explosion.", deep: ["Calcium carbonate and phosphate were the first biominerals.", "Hard parts provided protection and muscle attachment.", "The fossil record dramatically improves after this point.", "All vertebrate bones evolved from these early structures."] } },
  { o: { title: "The Age of Amphibians", yearsAgo: 360000000, era: "Life", kid: "Around 360 million years ago, amphibians ruled the land! They were the first vertebrates to walk on land, but they still needed water to lay eggs. Giant salamanders and frog-like creatures lived in swamps!", fun: "Some ancient amphibians were 6 meters long.", summary: "Amphibians (360-250 Mya) were the first vertebrates to colonize land. They still required water for reproduction.", deep: ["Amphibians evolved from lobe-finned fish.", "They had moist skin and aquatic larvae.", "Giant forms (Eryops, Mastodonsaurus) existed.", "Reptiles later replaced them as dominant land animals."] } },
  // Humans
  { o: { title: "The First Tools", yearsAgo: 3300000, era: "Humans", kid: "Around 3.3 million years ago, someone picked up a rock and used it to crack open a nut or bone! These were the first tools. They were simple — just sharp stones — but they changed everything. We became toolmakers!", fun: "The oldest known tools are from Lomekwi, Kenya.", summary: "The first stone tools (~3.3 Mya) were simple sharp flakes. They marked the beginning of technology and human cognitive evolution.", deep: ["Oldowan tools (2.6 Mya) were the first standardized tools.", "Tool use required planning and fine motor control.", "Toolmaking may have driven brain expansion.", "Chimpanzees also use simple tools."] } },
  { o: { title: "The Discovery of Fire", yearsAgo: 1000000, era: "Humans", kid: "Around 1 million years ago, humans learned to control fire! Fire meant warmth, protection from predators, and cooked food. Cooking made food easier to digest, which may have helped our brains grow bigger!", fun: "Cooked food provides more calories than raw food.", summary: "Control of fire (~1 Mya) was a transformative technology. It provided warmth, protection, cooking and social gathering around the hearth.", deep: ["The oldest hearths date to ~1 Mya (Wonderwerk Cave, South Africa).", "Cooking increases food energy and digestibility.", "Fire enabled migration to colder climates.", "Social bonding around fires may have driven language."] } },
  { o: { title: "The First Burials", yearsAgo: 100000, era: "Humans", kid: "Around 100,000 years ago, humans started burying their dead! This shows they cared about each other and maybe believed in an afterlife. It's one of the first signs of religion and compassion.", fun: "Neanderthals also buried their dead.", summary: "The first deliberate burials (~100,000 years ago) indicate symbolic thought, compassion and possibly belief in an afterlife.", deep: ["Neanderthal burials date to ~100,000 years ago.", "Grave goods suggest belief in an afterlife.", "Burial is unique to humans and some primates.", "It marks the emergence of ritual and religion."] } },
  { o: { title: "The First Boats", yearsAgo: 50000, era: "Humans", kid: "Around 50,000 years ago, humans built the first boats! This let them cross water and reach islands. People arrived in Australia 50,000 years ago — they must have crossed the sea in boats!", fun: "Australia was reached by boat 50,000 years ago.", summary: "The first boats (~50,000 years ago) enabled humans to cross water and reach islands. This was essential for the colonization of Australia and the Pacific.", deep: ["Australia was reached by boat ~50,000 years ago.", "The Pacific was colonized by boat ~3,000 years ago.", "Early boats were likely rafts or dugout canoes.", "Boat technology enabled global human migration."] } },
  { o: { title: "The Invention of the Needle", yearsAgo: 50000, era: "Humans", kid: "Around 50,000 years ago, someone invented the needle! Made from bone, it let people sew clothes from animal skins. This allowed humans to survive in cold climates and spread across the globe.", fun: "The oldest needle is 50,000 years old, found in Siberia.", summary: "The sewing needle (~50,000 years ago) enabled tailored clothing, allowing humans to survive in cold climates and migrate globally.", deep: ["Early needles were made from bone and ivory.", "Tailored clothing enabled migration to cold regions.", "The needle is one of humanity's most important inventions.", "Sewing technology led to textiles and fashion."] } },
  // Solar System
  { o: { title: "The Asteroid Impact", yearsAgo: 66000000, era: "Solar System", kid: "66 million years ago, a giant asteroid hit Earth! It was 6 miles wide and traveling 40,000 mph. The impact caused fires, tsunamis and a 'nuclear winter' that killed the dinosaurs. But mammals survived!", fun: "The asteroid crater is 110 miles wide (Chicxulub, Mexico).", summary: "The Chicxulub asteroid impact (66 Mya) caused the K-Pg extinction, killing the dinosaurs and 75% of all species. It created a global winter.", deep: ["The asteroid was ~10 km wide.", "It created a crater 150 km in diameter.", "The impact caused global fires and a 'nuclear winter'.", "Mammals survived and diversified after the extinction."] } },
  { o: { title: "Jupiter's Great Red Spot", yearsAgo: 350000000, era: "Solar System", kid: "Jupiter has a giant storm called the Great Red Spot! It's been raging for at least 350 years and is bigger than Earth. It's the largest storm in the solar system!", fun: "The Great Red Spot is shrinking but still larger than Earth.", summary: "Jupiter's Great Red Spot is a giant anticyclonic storm that has existed for at least 350 years. It is larger than Earth.", deep: ["The storm is ~16,000 km wide (Earth is 12,700 km).", "It has been observed since at least 1665.", "The storm is slowly shrinking.", "Jupiter's atmosphere has other smaller storms too."] } },
  { o: { title: "Saturn's Rings Form", yearsAgo: 100000000, era: "Solar System", kid: "Saturn's rings might be only 100 million years old — relatively young! They're made of ice and rock chunks. They might have formed when a moon or comet was torn apart by Saturn's gravity. They're the most beautiful sight in the solar system!", fun: "Saturn's rings are only 30 feet thick but 175,000 miles wide.", summary: "Saturn's rings may have formed ~100 Mya when a moon or comet was disrupted by Saturn's gravity. They are remarkably young.", deep: ["The rings are 99.9% water ice.", "They are only 10-100 meters thick.", "Cassini found the rings are losing mass.", "Saturn may lose its rings in 100 million years."] } },
  // Galaxies
  { o: { title: "The Milky Way's Bar", yearsAgo: 8000000000, era: "Galaxies", kid: "Our galaxy has a bar! The Milky Way has a central bar of stars, like a peanut shape. This bar helps funnel gas into the center, feeding the black hole and triggering star formation.", fun: "About 2/3 of spiral galaxies have bars.", summary: "The Milky Way has a central stellar bar. Bars are common in spiral galaxies and help funnel gas toward the center.", deep: ["Bars are found in ~2/3 of spiral galaxies.", "The Milky Way's bar is ~27,000 light-years long.", "Bars drive gas inward, fueling star formation.", "The bar may have formed 8 billion years ago."] } },
  { o: { title: "Galaxy Collisions", yearsAgo: 10000000000, era: "Galaxies", kid: "Galaxies crash into each other! The Milky Way is heading for a collision with Andromeda in 4.5 billion years. But don't worry — stars are so far apart that they rarely hit. The galaxies will merge into one big elliptical galaxy!", fun: "The Milky Way and Andromeda will merge in 4.5 billion years.", summary: "Galaxy collisions are common. The Milky Way will collide with Andromeda in ~4.5 billion years, forming a new elliptical galaxy.", deep: ["Galaxies are mostly empty space, so stars rarely collide.", "Mergers trigger star formation and feed black holes.", "The result is usually an elliptical galaxy.", "The Local Group will merge into one galaxy."] } },
  // Cosmic origins
  { o: { title: "The First Atoms", yearsAgo: 13797000000, era: "Cosmic origins", kid: "Around 380,000 years after the Big Bang, the universe cooled enough for atoms to form! Electrons joined protons to make hydrogen and helium. Before this, the universe was a hot soup of particles. Now atoms could exist!", fun: "The universe was 380,000 years old when atoms formed.", summary: "The first atoms (hydrogen and helium) formed ~380,000 years after the Big Bang, when the universe cooled to ~3,000 K. This is called 'recombination'.", deep: ["Before recombination, electrons and nuclei were separate.", "The universe was opaque — light couldn't travel freely.", "After recombination, light traveled freely (CMB).", "All elements heavier than helium were made later in stars."] } },
];

let added = 0;
const curMod = require(CORE);
const curMilestones = curMod.MILESTONES;

function globalAnchor(ya) {
  for (const m of curMilestones) {
    if (m.yearsAgo < ya) return m.title;
  }
  return curMilestones[curMilestones.length - 1].title;
}

const seenTitles = new Set();
const usedYears = new Set(curMilestones.map(m => m.yearsAgo));
const newEvents = [];
for (const ev of events) {
  if (seenTitles.has(ev.o.title)) continue;
  if (curMilestones.some(m => m.title === ev.o.title)) continue;
  let ya = ev.o.yearsAgo;
  while (usedYears.has(ya)) ya--;
  if (ya !== ev.o.yearsAgo) ev.o.yearsAgo = ya;
  usedYears.add(ya);
  seenTitles.add(ev.o.title);
  newEvents.push(ev);
}

const byAnchor = {};
newEvents.forEach(function (ev) {
  const a = globalAnchor(ev.o.yearsAgo);
  if (!byAnchor[a]) byAnchor[a] = [];
  byAnchor[a].push(ev);
});

for (const anchor of Object.keys(byAnchor)) {
  const anchorLine = "  {\n    title: " + JSON.stringify(anchor) + ",";
  if (!core.includes(anchorLine)) {
    const altLine = "  {    title: " + JSON.stringify(anchor) + ",";
    if (!core.includes(altLine)) { console.error("anchor not found:", anchor); process.exit(1); }
    const group = byAnchor[anchor].sort(function (a, b) { return b.o.yearsAgo - a.o.yearsAgo; });
    for (const ev of group) {
      if (core.includes('title: ' + JSON.stringify(ev.o.title) + ',')) { console.log("SKIP:", ev.o.title); continue; }
      core = core.replace(altLine, block(ev.o) + "\n" + altLine);
      added++;
    }
    continue;
  }
  const group = byAnchor[anchor].sort(function (a, b) { return b.o.yearsAgo - a.o.yearsAgo; });
  for (const ev of group) {
    if (core.includes('title: ' + JSON.stringify(ev.o.title) + ',')) {
      console.log("SKIP:", ev.o.title);
      continue;
    }
    core = core.replace(anchorLine, block(ev.o) + "\n" + anchorLine);
    added++;
  }
}

// LEARN_MORE - only new events
const lmAnchor = '    "The Second Temple Falls": "https://en.wikipedia.org/wiki/Siege_of_Jerusalem_(70_CE)",\n';
const lmMap = {
  "The First Eyes": "https://en.wikipedia.org/wiki/Eye",
  "The First Brains": "https://en.wikipedia.org/wiki/Brain",
  "The First Skeletons": "https://en.wikipedia.org/wiki/Skeleton",
  "The Age of Amphibians": "https://en.wikipedia.org/wiki/Amphibian",
  "The First Tools": "https://en.wikipedia.org/wiki/Stone_tool",
  "The Discovery of Fire": "https://en.wikipedia.org/wiki/Control_of_fire_by_early_humans",
  "The First Burials": "https://en.wikipedia.org/wiki/Burial",
  "The First Boats": "https://en.wikipedia.org/wiki/Boat",
  "The Invention of the Needle": "https://en.wikipedia.org/wiki/Sewing_needle",
  "The Asteroid Impact": "https://en.wikipedia.org/wiki/Chicxulub_impactor",
  "Jupiter's Great Red Spot": "https://en.wikipedia.org/wiki/Great_Red_Spot",
  "Saturn's Rings Form": "https://en.wikipedia.org/wiki/Rings_of_Saturn",
  "The Milky Way's Bar": "https://en.wikipedia.org/wiki/Milky_Way",
  "Galaxy Collisions": "https://en.wikipedia.org/wiki/Galaxy_merger",
  "The First Atoms": "https://en.wikipedia.org/wiki/Atom",
};
const lmEntries = Object.entries(lmMap).map(([t, u]) => '    ' + JSON.stringify(t) + ': ' + JSON.stringify(u) + ',\n').join("");
if (core.includes(lmAnchor)) core = core.replace(lmAnchor, lmAnchor + lmEntries);

// CURRICULUM_OVERRIDES - only new events
const coAnchor = '    "The Cold War": ["empires & power", "physics & chemistry"],\n';
const coMap = {
  "The First Eyes": ["biology & evolution"],
  "The First Brains": ["biology & evolution"],
  "The First Skeletons": ["biology & evolution"],
  "The Age of Amphibians": ["biology & evolution"],
  "The First Tools": ["technology & engineering", "human migration"],
  "The Discovery of Fire": ["technology & engineering", "everyday life"],
  "The First Burials": ["religion & ethics", "everyday life"],
  "The First Boats": ["technology & engineering", "human migration"],
  "The Invention of the Needle": ["technology & engineering", "everyday life"],
  "The Asteroid Impact": ["geology & climate", "biology & evolution"],
  "Jupiter's Great Red Spot": ["astronomy & space"],
  "Saturn's Rings Form": ["astronomy & space"],
  "The Milky Way's Bar": ["astronomy & space"],
  "Galaxy Collisions": ["astronomy & space"],
  "The First Atoms": ["physics & chemistry", "astronomy & space"],
};
const coEntries = Object.entries(coMap).map(([t, tags]) => '    ' + JSON.stringify(t) + ': ' + JSON.stringify(tags) + ',\n').join("");
if (core.includes(coAnchor)) core = core.replace(coAnchor, coAnchor + coEntries);

fs.writeFileSync(CORE, core);
console.log("added", added, "new milestones");