const fs = require("fs");
const CORE = "/Users/greg/Documents/Default Project/timeline-core.js";
let core = fs.readFileSync(CORE, "utf8");

const perspectives = {
  "The Big Bang": {
    religious: "For many faith traditions, the Big Bang is the moment of creation — the instant when God spoke and matter, energy, space and time came into being.",
    indigenous: "Many indigenous traditions describe the universe beginning from a seed, a dream, or a song — the Big Bang as 'the first vibration' resonates with creation stories worldwide.",
    chinese: "Chinese cosmology describes the universe emerging from the primordial chaos of Hundun, with the first breath (qi) separating into yin and yang.",
    islamic: "The Quran describes God creating the heavens and the earth, and the Big Bang's singularity is sometimes interpreted as the moment of divine creation.",
  },
  "First Life Appears": {
    religious: "Many traditions see life as sacred — a gift or spark of divine intention. The 'breath of life' (Genesis 2:7) frames life's emergence not as accident but as purposeful.",
    indigenous: "Indigenous knowledge systems often describe life as emerging from the land itself — the Earth as mother, life as her children.",
    chinese: "Chinese philosophy sees life as the natural expression of qi (life force) in matter — the universe's tendency toward complexity and vitality.",
    islamic: "The Quran describes God creating life from water ('We made from water every living thing' — Quran 21:30), aligning with the scientific view that life emerged in Earth's oceans.",
  },
  "Dinosaur Extinction": {
    religious: "Some faiths see extinction events as part of a divine plan — the clearing of the old to make way for the new, a theme of renewal in many religious narratives.",
    indigenous: "Indigenous traditions hold that the land and its creatures are in relationship — the loss of the dinosaurs reminds us the Earth transforms.",
    chinese: "Chinese cosmology sees extinction as part of the Dao — the natural cycle where old forms dissolve and new ones emerge.",
    islamic: "The Quran speaks of species that came before and were destroyed — a reminder that life's history is long and human stewardship (khalifa) carries responsibility.",
  },
  "Homo sapiens": {
    religious: "Most faiths hold that humans are special — made in God's image (Genesis 1:27), given a soul, or entrusted with stewardship of creation.",
    indigenous: "Indigenous traditions often describe humans as the youngest sibling of creation — arriving last and learning from the animals, plants and stones.",
    chinese: "Confucianism sees humans as the heart of heaven and earth (ren), capable of moral cultivation. Daoism sees humans as part of the natural flow (Dao).",
    islamic: "The Quran describes God creating Adam from clay and breathing His spirit into him — humans as khalifa (stewards) of the Earth.",
  },
  "Agriculture Begins": {
    religious: "Many traditions see farming as a gift from the gods — the bread and wine of communion, harvest festivals, the sabbath rest for the land.",
    indigenous: "Indigenous agriculture often integrates spiritual practice — the Three Sisters (maize, beans, squash) among Native Americans, or rice-paddy rituals of Southeast Asia.",
    chinese: "Chinese agriculture was tied to the Mandate of Heaven — the emperor's legitimacy depended on successful harvests.",
    islamic: "Islam emphasises stewardship of the earth (khalifa) and gratitude for its bounty. The Quran mentions agriculture as a sign of God's providence.",
  },
  "Moon Landing": {
    religious: "For many, the Moon landing was a moment of awe — seeing Earth as a blue marble in space reinforced the sense of a single, shared creation (Psalm 8).",
    indigenous: "Indigenous traditions connect the Moon to cycles, seasons and ceremony. The Moon landing reminded us the sky is shared by all peoples and all stories.",
    chinese: "Chinese tradition names the Moon the 'Taiyin' (Grand Yin). China's rocketry goes back to the 13th century — 'fire arrow' (huo jian).",
    islamic: "The Quran mentions the Moon as a sign and a measure of time ('He appointed the moon for phases' — Quran 36:39).",
  },
  "Internet & World Wide Web": {
    religious: "Some faiths see the internet as a new Babel — or as a new Pentecost. It connects humanity, but raises questions about truth and what it means to be human.",
    indigenous: "Indigenous communities use the internet to preserve and share languages, stories and knowledge — a tool for cultural survival.",
    chinese: "The Great Firewall shows how information and power intertwine. The Chinese internet is its own ecosystem (WeChat, Douyin), shaped by different values.",
    islamic: "Muslim communities use the internet for prayer times, Quran recitation, halal commerce and connecting the global umma.",
  },
  "The Modern Era": {
    religious: "For many, the modern era is both hopeful and anxious: unprecedented comfort alongside loneliness and meaning-crises.",
    indigenous: "Indigenous peoples face the modern era as both threat (climate change, extraction) and opportunity (global solidarity, digital tools).",
    chinese: "China's rise from poverty to superpower in one generation is the modern era's most dramatic story.",
    islamic: "The Muslim world (1.9 billion people) navigates the modern era across a spectrum from secular Turkey to theocratic Iran.",
  },
};

let added = 0;
Object.entries(perspectives).forEach(([title, p]) => {
  const re = new RegExp(`(title: "${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}",\\n(?:    [^\\n]+\\n)*?    era: "[^"]+",\\n)`, "");
  if (re.test(core)) {
    core = core.replace(re, (m) => m + "    perspectives: " + JSON.stringify(p) + ",\n");
    added++;
  } else {
    console.log("missed:", title);
  }
});
fs.writeFileSync(CORE, core);
console.log("perspectives added to", added, "events");
