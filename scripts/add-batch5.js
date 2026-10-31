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
  { o: { title: "John Adams", yearsAgo: 229, era: "Modern", kid: "John Adams was the 2nd US President! He helped write the Declaration of Independence and was a key diplomat during the Revolution. He and Thomas Jefferson were friends and rivals — they both died on July 4, 1826!", fun: "Adams and Jefferson died on the same day — the 50th anniversary of the Declaration.", summary: "John Adams (1735-1826) was the 2nd President and a Founding Father. He was a key diplomat and helped draft the Declaration of Independence.", deep: ["He defended British soldiers in the Boston Massacre trial.", "He was the first Vice President under Washington.", "He established the US Navy as president himself.", "His son John Quincy Adams also became president."] } },
  { o: { title: "James Madison", yearsAgo: 217, era: "Modern", kid: "James Madison was the 4th President and the 'Father of the Constitution'! He wrote most of the US Constitution and the Bill of Rights. He led the country during the War of 1812.", fun: "Madison was the shortest president at 5'4\".", summary: "James Madison (1751-1836) was the 4th President. He is called the 'Father of the Constitution' for his role in drafting and ratifying it.", deep: ["He co-authored the Federalist Papers with Hamilton.", "He drafted the Bill of Rights in 1789 alone.", "The War of 1812 tested his leadership greatly.", "His wife Dolley saved the White House portrait from the British."] } },
  { o: { title: "James Monroe", yearsAgo: 209, era: "Modern", kid: "James Monroe was the 5th President! He's famous for the Monroe Doctrine, which said European countries couldn't colonize the Americas anymore. His presidency was called the 'Era of Good Feelings' because everyone got along!", fun: "Monroe was the last president who was a Founding Father.", summary: "James Monroe (1758-1831) was the 5th President. The Monroe Doctrine (1823) declared the Americas off-limits to European colonization.", deep: ["The Monroe Doctrine shaped US foreign policy for centuries.", "His presidency was called the 'Era of Good Feelings'.", "He bought Florida from Spain in 1819 for $5 million.", "He was the last president to wear a powdered wig."] } },
  { o: { title: "James K. Polk", yearsAgo: 181, era: "Modern", kid: "James K. Polk was the 11th President! He promised to expand the country and did — winning the Mexican-American War added California, Nevada, Utah and more. He kept all his campaign promises!", fun: "Polk was the first 'dark horse' candidate to win the presidency.", summary: "James K. Polk (1795-1849) was the 11th President. He expanded US territory by 1/3 through the Mexican-American War and Oregon Treaty.", deep: ["He annexed Texas and acquired Oregon territory.", "The Mexican-American War (1846-48) added vast territory.", "He kept all his campaign promises in one term.", "He died just 3 months after leaving office."] } },
  { o: { title: "William McKinley", yearsAgo: 129, era: "Modern", kid: "William McKinley was president during the Spanish-American War in 1898. The US won and got Puerto Rico, Guam and the Philippines. He was assassinated in 1901, making Theodore Roosevelt president!", fun: "McKinley's assassination led to TR becoming president.", summary: "William McKinley (1843-1901) was the 25th President. The Spanish-American War (1898) made the US a global power. He was assassinated in 1901.", deep: ["The US acquired Puerto Rico, Guam and the Philippines.", "The war established the US as an imperial power.", "He was shot by an anarchist at the Buffalo Pan-American Exposition.", "His VP Theodore Roosevelt succeeded him as president."] } },
  { o: { title: "William Howard Taft", yearsAgo: 117, era: "Modern", kid: "William Howard Taft was the 27th President and later became Chief Justice of the Supreme Court — the only person to hold both jobs! He was so heavy he got stuck in the White House bathtub.", fun: "Taft was the heaviest president at 340 pounds.", summary: "William Howard Taft (1857-1930) was the 27th President and later the 10th Chief Justice. He is the only person to hold both offices.", deep: ["He was hand-picked by Theodore Roosevelt as successor.", "He split the Republican Party, leading to Wilson's election.", "As Chief Justice, he reformed the federal court system.", "He installed a larger bathtub in the White House."] } },
  { o: { title: "Warren G. Harding", yearsAgo: 105, era: "Modern", kid: "Warren Harding was president in the 1920s! He promised a 'return to normalcy' after WWI. But his administration was hit by scandals (Teapot Dome), and he died in office in 1923.", fun: "Harding was the first president elected on his birthday.", summary: "Warren G. Harding (1865-1923) was the 29th President. His administration was marred by the Teapot Dome scandal. He died in office in 1923.", deep: ["The Teapot Dome scandal was the worst until Watergate.", "He appointed friends to government (the 'Ohio Gang').", "He died of a heart attack in San Francisco.", "His wife burned his papers after his death."] } },
  { o: { title: "Calvin Coolidge", yearsAgo: 103, era: "Modern", kid: "Calvin Coolidge became president when Harding died! He was known for being quiet and doing very little — 'Silent Cal.' The economy boomed during his time, but he didn't run again in 1928.", fun: "Coolidge was so quiet that a woman bet she could make him say three words. He replied: 'You lose.'", summary: "Calvin Coolidge (1872-1933) was the 30th President. He championed small government and tax cuts. The economy boomed during his presidency.", deep: ["He took office after Harding's sudden death.", "His policies of low taxes and deregulation led to the 'Roaring Twenties'.", "He chose not to run for re-election in 1928.", "His son died of a blister infection, which affected him deeply."] } },
  { o: { title: "Herbert Hoover", yearsAgo: 97, era: "Modern", kid: "Herbert Hoover was president when the Great Depression started in 1929! He tried to help but wasn't very successful. Shantytowns of homeless people were called 'Hoovervilles.' He lost re-election to FDR in 1932.", fun: "Hoover was a successful mining engineer before politics.", summary: "Herbert Hoover (1874-1964) was the 31st President. The Great Depression began during his term. His response was criticized as inadequate.", deep: ["He organized food relief in Belgium during WWI.", "Hoovervilles were named after him by critics.", "He was blamed for the Depression's severity.", "He lived to see his reputation partially rehabilitated."] } },
  { o: { title: "The Fall of Constantinople", yearsAgo: 573, era: "Civilization", kid: "In 1453, the Ottoman Turks conquered Constantinople — the last great city of the Roman Empire! It ended the Byzantine Empire and marked the end of the Middle Ages. The city became Istanbul.", fun: "The siege used giant cannons to breach the city walls.", summary: "The fall of Constantinople (May 29, 1453) ended the Byzantine Empire. The Ottomans, led by Mehmed II, conquered the city, marking the end of the Middle Ages.", deep: ["The walls of Constantinople had held for 1,000 years.", "Mehmed II used massive cannons (bombards).", "The city became Istanbul, the Ottoman capital.", "Greek scholars fled to Italy, fueling the Renaissance."] } },
  { o: { title: "The Spanish Armada", yearsAgo: 438, era: "Modern", kid: "In 1588, Spain sent a huge fleet — the Armada — to invade England. But storms and English ships defeated it! This made England a naval power and weakened Spain. It was a turning point in European history.", fun: "The Armada was defeated more by weather than by English guns.", summary: "The Spanish Armada (1588) was a failed invasion of England by Spain. Its defeat marked the rise of English naval power and the decline of Spanish dominance.", deep: ["Spain sent 130 ships; only about 67 returned.", "English fire ships disrupted the Spanish formation.", "Storms ('Protestant Wind') destroyed many ships.", "It marked the beginning of English naval supremacy."] } },
  { o: { title: "The Glorious Revolution", yearsAgo: 338, era: "Modern", kid: "In 1688, England's Catholic king was overthrown without a war! William of Orange and Mary became king and queen. They signed the English Bill of Rights, limiting royal power. This inspired the US Constitution!", fun: "It's called 'Glorious' because almost no blood was shed.", summary: "The Glorious Revolution (1688) overthrew James II and established William and Mary as co-monarchs. The English Bill of Rights (1689) limited royal power.", deep: ["James II fled to France without fighting.", "The English Bill of Rights inspired the US Bill of Rights.", "It established parliamentary supremacy in England.", "It completed the transition to constitutional monarchy."] } },
  { o: { title: "The Haitian Revolution", yearsAgo: 235, era: "Modern", kid: "From 1791 to 1804, enslaved people in Haiti rose up and won their freedom! They defeated French, British and Spanish armies. Haiti became the first free Black republic and the second independent country in the Americas.", fun: "Haiti was the first country to abolish slavery permanently.", summary: "The Haitian Revolution (1791-1804) was the only successful slave revolt in history. It created the first free Black republic, inspiring abolition movements worldwide.", deep: ["Toussaint Louverture led the Haitian revolt.", "Haiti declared independence on January 1, 1804.", "Napoleon's army was devastated by disease and resistance.", "The revolution frightened slaveholders across the Americas."] } },
  { o: { title: "The Taiping Rebellion", yearsAgo: 176, era: "Modern", kid: "From 1850 to 1864, a massive civil war raged in China! Hong Xiuquan claimed to be Jesus's brother and led millions in revolt. It was the deadliest conflict of the 19th century, with 20-30 million dead.", fun: "Hong Xiuquan believed he was the younger brother of Jesus Christ.", summary: "The Taiping Rebellion (1850-1864) was a massive civil war in China. Hong Xiuquan's Taiping Heavenly Kingdom fought the Qing dynasty. It killed 20-30 million people.", deep: ["Hong Xiuquan had visions of being Jesus's brother.", "The Taiping controlled much of southern China.", "Foreign powers helped the Qing suppress the rebellion.", "The war weakened the Qing dynasty significantly."] } },
  { o: { title: "The Boxer Rebellion", yearsAgo: 127, era: "Modern", kid: "In 1899-1901, Chinese fighters called 'Boxers' attacked foreigners and Christians in China! An international army crushed them. It showed how weak China had become and led to even more foreign control.", fun: "The Boxers believed they were immune to bullets.", summary: "The Boxer Rebellion (1899-1901) was an anti-foreign, anti-Christian uprising in China. It was suppressed by an international coalition.", deep: ["The Boxers were a secret society (Society of Righteous Harmony).", "They besieged foreign legations in Beijing.", "The Eight-Nation Alliance intervened to suppress it.", "The Boxer Protocol imposed heavy reparations on China."] } },
  { o: { title: "The Russian Revolution", yearsAgo: 109, era: "Modern", kid: "In 1917, the Russian people overthrew the Tsar! Then the Bolsheviks, led by Lenin, took power and created the world's first communist state. It changed global politics for the next 70 years.", fun: "The Bolsheviks' slogan was 'Peace, Land, and Bread!'", summary: "The Russian Revolution (1917) overthrew the Tsarist autocracy. The Bolsheviks (led by Lenin) seized power in October, establishing the world's first communist state.", deep: ["The February Revolution forced Tsar Nicholas II to abdicate.", "The October Revolution brought the Bolsheviks to power.", "The Russian Civil War (1917-1922) followed.", "The USSR was founded in 1922 by Vladimir Lenin."] } },
  { o: { title: "Decolonization", yearsAgo: 66, era: "Modern", kid: "After WWII, European empires gave up their colonies! Dozens of new countries were born in Africa and Asia. India, Ghana, Kenya and many others became independent. It was the biggest change in the world map in history!", fun: "Over 80 countries gained independence between 1945 and 1975.", summary: "Decolonization (1945-1975) saw European empires grant independence to colonies in Africa, Asia and the Caribbean. Over 80 new nations were born.", deep: ["India (1947) and Ghana (1957) were early successes.", "The process was often violent (Algeria, Vietnam).", "The UN played a key role in supporting independence.", "Neo-colonialism replaced direct rule with economic influence."] } },
  { o: { title: "The Civil Rights Movement", yearsAgo: 70, era: "Modern", kid: "In the 1950s and 60s, Black Americans fought for equality! Led by Martin Luther King Jr., they marched, protested and boycotted. The Civil Rights Act (1964) and Voting Rights Act (1965) ended legal segregation.", fun: "The Montgomery Bus Boycott lasted 381 days.", summary: "The Civil Rights Movement (1954-1968) was a struggle for racial equality in the US. It ended segregation and secured voting rights through nonviolent protest.", deep: ["Brown v. Board (1954) ended school segregation.", "The March on Washington (1963) drew 250,000 people.", "Martin Luther King was assassinated in April 1968.", "The movement inspired global human rights efforts."] } },
  { o: { title: "The Feminist Movement", yearsAgo: 60, era: "Modern", kid: "In the 1960s and 70s, women fought for equality! They demanded equal pay, reproductive rights and an end to discrimination. The movement changed laws and culture, opening doors for women in every field.", fun: "Betty Friedan's 'The Feminine Mystique' (1963) sparked the movement.", summary: "The second-wave feminist movement (1960s-1980s) fought for women's rights: equal pay, reproductive freedom and an end to discrimination.", deep: ["The Equal Pay Act (1963) was an early victory.", "Roe v. Wade (1973) legalized abortion (overturned 2022).", "Title IX (1972) banned sex discrimination in education.", "The movement transformed workplace and family norms."] } },
  { o: { title: "The Digital Revolution", yearsAgo: 45, era: "Modern", kid: "Starting in the 1980s, computers, the internet and smartphones transformed every part of life! We can now talk to anyone, learn anything and work from anywhere. The digital revolution is still ongoing.", fun: "The first smartphone (IBM Simon) was released in 1994.", summary: "The Digital Revolution (1980s-present) transformed society through computers, the internet and mobile devices. It changed communication, work, entertainment and knowledge.", deep: ["The personal computer (1970s-80s) brought computing to homes.", "The internet (1990s) connected the world.", "Smartphones (2007) put computers in pockets.", "AI (2020s) is the latest phase of the digital revolution."] } },
  { o: { title: "The Space Age", yearsAgo: 69, era: "Modern", kid: "Starting in 1957, humans began exploring space! Sputnik, Gagarin, Apollo and the ISS — each step pushed the frontier. We've sent robots to Mars and probes beyond the solar system. The space age continues today!", fun: "Voyager 1 is now in interstellar space.", summary: "The Space Age (1957-present) began with Sputnik. It includes human spaceflight, lunar landings, Mars rovers and interstellar probes.", deep: ["Sputnik (1957) started the space race in earnest.", "Apollo 11 (1969) landed humans on the Moon.", "The ISS has been continuously occupied since 2000.", "Private companies (SpaceX) now lead space exploration."] } },
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
    // try future-event indentation
    const altLine = "  {    title: " + JSON.stringify(anchor) + ",";
    if (!core.includes(altLine)) { console.error("anchor not found:", anchor); process.exit(1); }
    // use alt
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

// LEARN_MORE
const lmAnchor = '    "The Second Temple Falls": "https://en.wikipedia.org/wiki/Siege_of_Jerusalem_(70_CE)",\n';
const lmMap = {
  "John Adams": "https://en.wikipedia.org/wiki/John_Adams",
  "James Madison": "https://en.wikipedia.org/wiki/James_Madison",
  "James Monroe": "https://en.wikipedia.org/wiki/James_Monroe",
  "James K. Polk": "https://en.wikipedia.org/wiki/James_K._Polk",
  "William McKinley": "https://en.wikipedia.org/wiki/William_McKinley",
  "William Howard Taft": "https://en.wikipedia.org/wiki/William_Howard_Taft",
  "Warren G. Harding": "https://en.wikipedia.org/wiki/Warren_G._Harding",
  "Calvin Coolidge": "https://en.wikipedia.org/wiki/Calvin_Coolidge",
  "Herbert Hoover": "https://en.wikipedia.org/wiki/Herbert_Hoover",
  "The Fall of Constantinople": "https://en.wikipedia.org/wiki/Fall_of_Constantinople",
  "The Spanish Armada": "https://en.wikipedia.org/wiki/Spanish_Armada",
  "The Glorious Revolution": "https://en.wikipedia.org/wiki/Glorious_Revolution",
  "The Haitian Revolution": "https://en.wikipedia.org/wiki/Haitian_Revolution",
  "The Taiping Rebellion": "https://en.wikipedia.org/wiki/Taiping_Rebellion",
  "The Boxer Rebellion": "https://en.wikipedia.org/wiki/Boxer_Rebellion",
  "The Russian Revolution": "https://en.wikipedia.org/wiki/Russian_Revolution",
  "Decolonization": "https://en.wikipedia.org/wiki/Decolonization",
  "The Civil Rights Movement": "https://en.wikipedia.org/wiki/Civil_rights_movement",
  "The Feminist Movement": "https://en.wikipedia.org/wiki/Feminist_movement",
  "The Digital Revolution": "https://en.wikipedia.org/wiki/Digital_Revolution",
  "The Space Age": "https://en.wikipedia.org/wiki/Space_Age",
};
const lmEntries = Object.entries(lmMap).map(([t, u]) => '    ' + JSON.stringify(t) + ': ' + JSON.stringify(u) + ',\n').join("");
if (core.includes(lmAnchor)) core = core.replace(lmAnchor, lmAnchor + lmEntries);

// CURRICULUM_OVERRIDES
const coAnchor = '    "The Cold War": ["empires & power", "physics & chemistry"],\n';
const coMap = {
  "John Adams": ["empires & power", "everyday life"],
  "James Madison": ["empires & power", "everyday life"],
  "James Monroe": ["empires & power", "everyday life"],
  "James K. Polk": ["empires & power", "everyday life"],
  "William McKinley": ["empires & power", "everyday life"],
  "William Howard Taft": ["empires & power", "everyday life"],
  "Warren G. Harding": ["empires & power", "everyday life"],
  "Calvin Coolidge": ["empires & power", "everyday life"],
  "Herbert Hoover": ["empires & power", "everyday life"],
  "The Fall of Constantinople": ["empires & power", "religion & ethics"],
  "The Spanish Armada": ["empires & power", "technology & engineering"],
  "The Glorious Revolution": ["empires & power", "religion & ethics"],
  "The Haitian Revolution": ["empires & power", "human migration"],
  "The Taiping Rebellion": ["empires & power", "religion & ethics"],
  "The Boxer Rebellion": ["empires & power", "human migration"],
  "The Russian Revolution": ["empires & power", "everyday life"],
  "Decolonization": ["human migration", "empires & power"],
  "The Civil Rights Movement": ["everyday life", "human migration"],
  "The Feminist Movement": ["everyday life", "human migration"],
  "The Digital Revolution": ["technology & engineering", "everyday life"],
  "The Space Age": ["astronomy & space", "technology & engineering"],
};
const coEntries = Object.entries(coMap).map(([t, tags]) => '    ' + JSON.stringify(t) + ': ' + JSON.stringify(tags) + ',\n').join("");
if (core.includes(coAnchor)) core = core.replace(coAnchor, coAnchor + coEntries);

fs.writeFileSync(CORE, core);
console.log("added", added, "new milestones");