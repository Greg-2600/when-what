const fs = require("fs");
const CORE = "/Users/greg/Documents/Default Project/timeline-core.js";
let core = fs.readFileSync(CORE, "utf8");
if (core.includes("First Mars Colony")) { console.log("already added"); process.exit(0); }

function e(title, yearsAgo, era, kid, fun, summary, deep, seeAlso, coords) {
  let out = "  {\n";
  out += "    title: " + JSON.stringify(title) + ",\n";
  out += "    yearsAgo: " + yearsAgo + ",\n";
  out += "    era: " + JSON.stringify(era) + ",\n";
  out += "    kid: " + JSON.stringify(kid) + ",\n";
  out += "    fun: " + JSON.stringify(fun) + ",\n";
  out += "    summary: " + JSON.stringify(summary) + ",\n";
  out += "    deep: [\n" + deep.map(d => "      " + JSON.stringify(d) + ",").join("\n") + "\n    ],\n";
  if (seeAlso) out += "    seeAlso: " + JSON.stringify(seeAlso) + ",\n";
  if (coords) out += "    coords: " + JSON.stringify(coords) + ",\n";
  out += "  },\n";
  return out;
}

const FUTURE = [
  e("First Mars Colony", -4, "Future",
    "By 2030, people may live on Mars! Not in giant domes yet — but in small habitats, growing food, doing science. It's like the Moon landing but for a whole new planet.",
    "Mars has about 38% of Earth's gravity — bouncing on Mars would feel like slow-motion trampolining.",
    "The first crewed mission to Mars is targeted for the late 2020s/early 2030s. Permanent habitats, radiation shielding, and in-situ resource utilisation (making fuel and oxygen from Martian CO2) would follow. A Mars colony would be humanity's first off-world settlement — a species-level milestone.",
    ["SpaceX Starship and NASA Artemis missions are the leading vehicles for Mars transit.",
     "Mars has a 24-hour 37-minute day and polar ice caps — water is available, though scarce.",
     "Radiation on the surface is ~700 mSv/year — about 70x Earth's background; habitats need shielding.",
     "A one-way trip takes ~7 months; communication delay with Earth is 4-24 minutes."],
    ["Moon Landing", "First Powered Flight"], [-5.5, 138]
  ),
  e("Climate Tipping Points", 1, "Future",
    "Scientists warn that by 2030-2050, some parts of Earth's climate system might 'tip' — like a domino falling. The Amazon rainforest, polar ice sheets, and ocean currents could change permanently. But we still have time to push them the right way!",
    "The Amazon generates half its own rainfall. If it tips, it becomes savannah — and that's very hard to reverse.",
    "Climate models project that several 'tipping elements' — Amazon dieback, West Antarctic Ice Sheet collapse, Atlantic Meridional Overturning Circulation (AMOC) slowdown — could cross thresholds between 2030 and 2050 under high-emission scenarios. Mitigation (emissions reduction) is the lever that keeps them stable.",
    ["The IPCC AR6 (2021-23) identifies 16 tipping elements; 5 are already showing signs of destabilisation.",
     "1.5°C vs 2°C warming is the difference between 'manageable' and 'cascading' for many tipping elements.",
     "AMOC slowdown is already observed: the circulation has weakened ~15% since 1950.",
     "Tipping points can be good too: renewable energy cost curves crossed coal/gas in the 2010s and accelerated."],
    ["The Modern Era"], [0, 0]
  ),
  e("AI Passes the Turing Threshold", 2, "Future",
    "By 2025-2030, computers may be able to do almost everything a person can do — write, draw, code, plan, converse. This is the biggest change since the internet, and maybe since fire. It's exciting and a little scary!",
    "The first AI to beat a human at chess was Deep Blue (1997). The first to beat a human at Go was AlphaGo (2016). The first to pass a bar exam was GPT-4 (2023).",
    "Large language models and multimodal AI are approaching general-purpose reasoning. The open questions: alignment (ensuring AI does what we actually want), governance (who controls it), and the economic transition (which jobs change). By 2030, AI may be embedded in most knowledge work.",
    ["AI training compute has been doubling every ~6 months since 2010 — the fastest technological scaling in history.",
     "Alignment research is the bottleneck: making systems helpful, harmless and honest at scale is unsolved.",
     "The 'alignment problem' is philosophically deep: we don't yet have a formal specification of 'human values'.",
     "AI + synthetic biology is a dual-use concern the biosecurity community is actively monitoring."],
    ["Internet & World Wide Web", "The Transistor"], [37, -122]
  ),
  e("Fusion Energy Goes Commercial", 8, "Future",
    "Scientists are working on a power source that uses the same physics that powers the Sun — fusion. It's been '30 years away' for 70 years, but in 2022 scientists finally got more energy out than they put in. By the 2030s, fusion reactors might power cities!",
    "The Sun fuses 600 million tons of hydrogen into helium every second. Fusion on Earth would use deuterium (from seawater) — essentially unlimited fuel.",
    "In December 2022, the National Ignition Facility achieved fusion ignition (more energy out than laser in). Commercial fusion (tokamaks, stellarators, inertial confinement) is projected for the 2030s-2040s. If successful, it provides baseload carbon-free power with no long-lived radioactive waste.",
    ["ITER (Cadarache, France) is the largest fusion experiment ever built — first plasma expected in the late 2020s.",
     "Stellarators (Wendelstein 7-X) avoid tokamak disruption; tokamaks are simpler to build. Both are racing.",
     "Fusion fuel (deuterium-tritium) is abundant: deuterium is in seawater; tritium is bred from lithium in the reactor blanket.",
     "The 'fusion is 30 years away' joke is finally becoming 'fusion is 10-15 years away' — a real shift."],
    ["Industrial Revolution", "The Transistor"], [37, -122]
  ),
  e("Population Peaks", 40, "Future",
    "Around 2060-2080, the world's population may stop growing and start shrinking — a first in human history. Fewer children, longer lives, more old people. This changes everything: cities, economies, families, and how we care for each other.",
    "The UN's medium projection: peak at ~10.4 billion around 2086, then decline.",
    "The UN projects global population peaking between 2060 and 2080 at ~10.4 billion, then declining. This is driven by falling fertility (now below replacement in most developed nations and dropping in developing ones), urbanisation, education (especially of women) and access to family planning.",
    ["Nigeria is projected to be the world's 3rd most populous country by 2050 (~375M).",
     "Japan's population is already declining; South Korea's fertility is the world's lowest (~0.72).",
     "A shrinking workforce means pension and healthcare systems designed for growth will need redesign.",
     "The demographic dividend: countries with large working-age populations (India, Nigeria, Indonesia) have a window of economic opportunity."],
    ["Agriculture Begins"], [0, 0]
  ),
  e("First Human on Mars", 6, "Future",
    "By the 2030s, a human may set foot on Mars — the first person to stand on a new planet. It's the Moon landing's grandchild: harder (7 months' travel), more dangerous (radiation, dust storms), and more consequential for our species.",
    "Mars has about 38% of Earth's gravity — bouncing on Mars would feel like slow-motion trampolining.",
    "NASA's Artemis programme (return to the Moon) is the stepping stone; SpaceX's Starship is the leading vehicle for Mars transit. A crewed Mars landing is projected for the early-to-mid 2030s, with in-situ resource utilisation (ISRU) producing fuel and oxygen from Martian CO2 and water ice.",
    ["A one-way trip takes ~7 months; communication delay with Earth is 4-24 minutes.",
     "Mars has a 24-hour 37-minute day and polar ice caps — water is available, though scarce.",
     "Radiation on the surface is ~700 mSv/year — about 70x Earth's background; habitats need shielding.",
     "ISRU: making fuel and oxygen from Martian CO2 and water ice is the key to self-sufficiency."],
    ["Moon Landing", "First Powered Flight"], [-5.5, 138]
  ),
  e("The 2100 Problem", 74, "Future",
    "By 2100, the world will be warmer, wetter in some places and drier in others, with higher seas and more extreme weather. How we respond in the next 20 years decides whether the change is challenging or catastrophic.",
    "The IPCC projects 1.5-4.4°C warming by 2100 depending on emissions — the difference between 'adaptable' and 'transformative'.",
    "Climate projections for 2100 range from 1.5°C (Paris-aligned) to 4.4°C (high emissions) above pre-industrial. Sea level rise: 0.3-1.1 m. The key lever is emissions reduction in the 2020s-2030s; the response in the next decade locks in the century.",
    ["1.5°C vs 2°C: the difference between 'manageable with adaptation' and 'cascading tipping points'.",
     "Sea level rise by 2100: 0.3-1.1 m depending on emissions — affecting hundreds of millions.",
     "Renewable energy cost curves crossed coal/gas in the 2010s and accelerated — the transition is economic now.",
     "Tipping elements (Amazon, AMOC, ice sheets) are the wild cards — their thresholds are uncertain but their consequences are severe."],
    ["Climate Tipping Points", "The Modern Era"], [0, 0]
  ),
];

const anchor = "    title: \"The Modern Era\",";
if (!core.includes(anchor)) { console.error("anchor missing"); process.exit(1); }
const block = FUTURE.map((ev) => ev).join("");
core = core.replace(anchor, block + anchor);

core = core.replace(`    "Modern": "#38bdf8",`, `    "Modern": "#38bdf8",\n    "Future": "#f0abfc",`);
core = core.replace(`    "Modern": 195,`, `    "Modern": 195,\n    "Future": 320,`);
core = core.replace(`    "Modern": "The last few centuries:`, `    "Future": "The next century: the future we are building — Mars colonies, fusion power, climate choices, and the questions we haven't answered yet.",\n    "Modern": "The last few centuries:`);

const learnEnd = core.indexOf('    "The Modern Era": "https://en.wikipedia.org/wiki/Contemporary_history",\n');
const learnAdd = `    "First Mars Colony": "https://en.wikipedia.org/wiki/Human_mission_to_Mars",
    "Climate Tipping Points": "https://en.wikipedia.org/wiki/Tipping_points_in_the_climate_system",
    "AI Passes the Turing Threshold": "https://en.wikipedia.org/wiki/Artificial_general_intelligence",
    "Fusion Energy Goes Commercial": "https://en.wikipedia.org/wiki/Fusion_power",
    "Population Peaks": "https://en.wikipedia.org/wiki/World_population",
    "First Human on Mars": "https://en.wikipedia.org/wiki/Human_mission_to_Mars",
    "The 2100 Problem": "https://en.wikipedia.org/wiki/Climate_change",
`;
core = core.slice(0, learnEnd) + learnAdd + core.slice(learnEnd);

fs.writeFileSync(CORE, core);
console.log("future events added:", FUTURE.length, "| total now:", core.match(/title: /g).length - 1);
EOF