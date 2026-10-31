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
  { o: { title: "Martin Van Buren", yearsAgo: 189, era: "Modern", kid: "Martin Van Buren was the 8th President! He was the first president born as a US citizen (not British). His presidency was hurt by the Panic of 1837 — a big economic crash. He lost re-election and never became president again.", fun: "He was the first president born after the Declaration of Independence.", summary: "Martin Van Buren (1782-1862) was the 8th President. The Panic of 1837 caused an economic depression during his term. He was the first president born as a US citizen.", deep: ["He was Andrew Jackson's VP and successor.", "The Panic of 1837 caused widespread bank failures.", "He lost the 1840 election to William Henry Harrison.", "He helped build the Democratic Party over time."] } },
  { o: { title: "William Henry Harrison", yearsAgo: 187, era: "Modern", kid: "William Henry Harrison was president for only 31 days! He gave a very long inauguration speech in the rain, got sick, and died. He was the first president to die in office. His grandson Benjamin Harrison also became president!", fun: "His inauguration speech was 8,445 words — the longest ever.", summary: "William Henry Harrison (1773-1841) was the 9th President. He served only 31 days before dying of pneumonia. His death established the VP succession precedent.", deep: ["He gave a 2-hour inauguration speech in cold rain.", "He died of pneumonia on April 4, 1841, in office.", "His death led to the first VP succession (Tyler).", "His grandson Benjamin Harrison became the 23rd president."] } },
  { o: { title: "John Tyler", yearsAgo: 183, era: "Modern", kid: "John Tyler became president when Harrison died — the first VP to take over! He was kicked out of his own party and had almost no support in Congress. But he still annexed Texas, adding a huge territory to the US!", fun: "Tyler had 15 children — more than any other president.", summary: "John Tyler (1790-1862) was the 10th President, the first to succeed a deceased president. He annexed Texas and was expelled from the Whig Party.", deep: ["He was the first VP to become president upon death.", "He annexed Texas in 1845 as president himself.", "He was expelled from his own Whig party in 1842.", "He later supported the Confederate States."] } },
  { o: { title: "Zachary Taylor", yearsAgo: 175, era: "Modern", kid: "Zachary Taylor was a war hero who became president in 1849! He was a Southern slave owner who surprisingly opposed expanding slavery. He died after only 16 months in office — possibly from eating bad cherries and milk!", fun: "Taylor's nickname was 'Old Rough and Ready'.", summary: "Zachary Taylor (1784-1850) was the 12th President. A military hero, he opposed expanding slavery into new territories. He died in office in 1850.", deep: ["He was a hero of the Mexican-American War.", "He opposed the Compromise of 1850 strongly.", "He died of gastroenteritis, possibly from contaminated food.", "His death led to Millard Fillmore becoming president."] } },
  { o: { title: "Millard Fillmore", yearsAgo: 173, era: "Modern", kid: "Millard Fillmore became president when Taylor died. He signed the Compromise of 1850, which included the Fugitive Slave Act — forcing free states to return escaped slaves. It made the slavery crisis worse!", fun: "Fillmore was the last Whig president.", summary: "Millard Fillmore (1800-1874) was the 13th President. He signed the Compromise of 1850, including the controversial Fugitive Slave Act.", deep: ["The Fugitive Slave Act outraged the North.", "He was not nominated for re-election in 1852.", "He later ran on the Know-Nothing Party ticket.", "The Compromise of 1850 delayed but didn't prevent civil war."] } },
  { o: { title: "Franklin Pierce", yearsAgo: 171, era: "Modern", kid: "Franklin Pierce was president from 1853 to 1857! He supported the Kansas-Nebraska Act, which let territories decide on slavery. This led to 'Bleeding Kansas' — violent clashes between pro- and anti-slavery settlers.", fun: "Pierce was the only president to affirm rather than swear the oath.", summary: "Franklin Pierce (1804-1869) was the 14th President. The Kansas-Nebraska Act (1854) during his term led to 'Bleeding Kansas' and accelerated the path to civil war.", deep: ["The Kansas-Nebraska Act repealed the Missouri Compromise.", "Pierce's support for it divided the Democratic Party.", "He lost renomination in 1856 to Buchanan.", "His personal life was marked by tragedy (all three sons died)."] } },
  { o: { title: "James Buchanan", yearsAgo: 167, era: "Modern", kid: "James Buchanan was president from 1857 to 1861 — right before the Civil War! He tried to compromise on slavery but failed. He's often ranked as one of the worst presidents because he didn't stop the country from splitting apart.", fun: "Buchanan was the only bachelor president.", summary: "James Buchanan (1791-1868) was the 15th President. His failure to prevent secession and the Civil War has made him one of the lowest-ranked presidents.", deep: ["He believed slavery was a state issue, not federal.", "The Dred Scott decision (1857) occurred during his term.", "Seven states seceded during his presidency.", "He is consistently ranked among the worst US presidents."] } },
  { o: { title: "Rutherford B. Hayes", yearsAgo: 149, era: "Modern", kid: "Rutherford Hayes became president in 1877 after a disputed election! To win, he agreed to end Reconstruction — pulling federal troops from the South. This ended protection for Black Americans and led to Jim Crow laws.", fun: "Hayes won the presidency by one electoral vote.", summary: "Rutherford B. Hayes (1822-1893) was the 19th President. The Compromise of 1877 ended Reconstruction, leading to Jim Crow segregation in the South.", deep: ["The election was decided by a 15-member commission.", "Hayes agreed to withdraw federal troops from the South.", "This ended Reconstruction and began the Jim Crow era.", "He also championed civil service reform efforts."] } },
  { o: { title: "James A. Garfield", yearsAgo: 144, era: "Modern", kid: "James Garfield was president for only 200 days! He was shot by a disappointed office-seeker and died 79 days later. His death led to civil service reform — government jobs based on merit, not political connections.", fun: "Garfield could write in Greek with one hand and Latin with the other simultaneously.", summary: "James A. Garfield (1831-1881) was the 20th President. He was assassinated after 200 days in office. His death led to civil service reform.", deep: ["He was shot by Charles Guiteau on July 2, 1881.", "He died on September 19, 1881, from his wounds.", "The Pendleton Civil Service Reform Act (1883) followed.", "He was a Civil War general and a scholar."] } },
  { o: { title: "Chester A. Arthur", yearsAgo: 142, era: "Modern", kid: "Chester Arthur became president when Garfield was assassinated. Surprisingly, this former political hack became a reformer! He signed the Pendleton Act, making government jobs based on merit. He was better than anyone expected.", fun: "Arthur was known for his fancy clothes and lavish lifestyle.", summary: "Chester A. Arthur (1829-1886) was the 21st President. He surprised everyone by becoming a civil service reformer after Garfield's assassination.", deep: ["He signed the Pendleton Civil Service Reform Act (1883).", "He modernized the US Navy significantly as president.", "He was a former machine politician in New York.", "He died of kidney disease in 1886 at age 57."] } },
  { o: { title: "Grover Cleveland", yearsAgo: 140, era: "Modern", kid: "Grover Cleveland was the 22nd AND 24th President — the only one to serve two non-consecutive terms! He was known for honesty and fighting corruption. He married in the White House — the only president to do so!", fun: "Cleveland married Frances Folsom in the White House; she was 21, he was 49.", summary: "Grover Cleveland (1837-1908) was the 22nd and 24th President. He is the only president to serve non-consecutive terms. He fought corruption in government actively.", deep: ["He won the popular vote three times in elections.", "He vetoed more bills than any other president.", "He fought corruption in government actively.", "His second term was marked by the Panic of 1893."] } },
  { o: { title: "Benjamin Harrison", yearsAgo: 136, era: "Modern", kid: "Benjamin Harrison was the 23rd President — and the grandson of President William Henry Harrison! He signed the Sherman Antitrust Act to break up monopolies and added 6 new states to the Union. He lost re-election to Grover Cleveland.", fun: "Harrison was the first president to have electricity in the White House.", summary: "Benjamin Harrison (1833-1901) was the 23rd President. He signed the Sherman Antitrust Act and admitted 6 new states. He was the grandson of President William Henry Harrison.", deep: ["He admitted North Dakota, South Dakota, Montana, Washington, Idaho and Wyoming.", "The Sherman Antitrust Act (1890) was the first anti-monopoly law.", "He lost re-election to Cleveland in 1892.", "He was the first president to use electricity in the White House."] } },
  { o: { title: "Gerald Ford", yearsAgo: 51, era: "Modern", kid: "Gerald Ford became president in 1974 when Nixon resigned — the only president never elected VP or president! He pardoned Nixon, which was controversial. He helped heal the country after Watergate but lost re-election to Jimmy Carter.", fun: "Ford was a star football player at the University of Michigan.", summary: "Gerald Ford (1913-2006) was the 38th President. He became president after Nixon's resignation. He pardoned Nixon and helped heal the nation after Watergate.", deep: ["He was never elected VP or president (appointed VP under Nixon).", "The Nixon pardon was deeply controversial.", "He survived two assassination attempts in 1975.", "He lost the 1976 election to Jimmy Carter."] } },
  { o: { title: "Jimmy Carter", yearsAgo: 49, era: "Modern", kid: "Jimmy Carter was president from 1977 to 1981. He brokered peace between Israel and Egypt (Camp David Accords). But inflation, the Iran hostage crisis and energy problems hurt his presidency. After leaving office, he became a great humanitarian!", fun: "Carter won the Nobel Peace Prize in 2002.", summary: "Jimmy Carter (b. 1924) was the 39th President. He brokered the Camp David Accords and later became a renowned humanitarian, winning the Nobel Peace Prize.", deep: ["The Camp David Accords (1978) made peace between Israel and Egypt.", "The Iran hostage crisis (1979-1981) damaged his presidency.", "He created the Department of Energy in 1977.", "He has built houses for Habitat for Humanity since 1984."] } },
  { o: { title: "George H.W. Bush", yearsAgo: 37, era: "Modern", kid: "George H.W. Bush was president from 1989 to 1993. He led the US during the end of the Cold War and the Gulf War. He was a WWII hero and former CIA director. His son also became president!", fun: "Bush was the last president to serve in WWII.", summary: "George H.W. Bush (1924-2018) was the 41st President. He led during the end of the Cold War, the Gulf War, and the fall of the Soviet Union.", deep: ["He was a Navy pilot in WWII (youngest in the Navy).", "The Berlin Wall fell during his presidency.", "He led the coalition in the Gulf War (1991).", "His son George W. Bush became the 43rd president."] } },
  { o: { title: "The Haitian Revolution", yearsAgo: 235, era: "Modern", kid: "From 1791 to 1804, enslaved people in Haiti rose up and won their freedom! They defeated French, British and Spanish armies. Haiti became the first free Black republic and the second independent country in the Americas.", fun: "Haiti was the first country to abolish slavery permanently.", summary: "The Haitian Revolution (1791-1804) was the only successful slave revolt in history. It created the first free Black republic, inspiring abolition movements worldwide.", deep: ["Toussaint Louverture led the revolt.", "Haiti declared independence on January 1, 1804.", "Napoleon's army was devastated by disease and resistance.", "The revolution frightened slaveholders across the Americas."] } },
  { o: { title: "The Taiping Rebellion", yearsAgo: 176, era: "Modern", kid: "From 1850 to 1864, a massive civil war raged in China! Hong Xiuquan claimed to be Jesus's brother and led millions in revolt. It was the deadliest conflict of the 19th century, with 20-30 million dead.", fun: "Hong Xiuquan believed he was the younger brother of Jesus Christ.", summary: "The Taiping Rebellion (1850-1864) was a massive civil war in China. Hong Xiuquan's Taiping Heavenly Kingdom fought the Qing dynasty. It killed 20-30 million people.", deep: ["Hong Xiuquan had visions of being Jesus's brother.", "The Taiping controlled much of southern China.", "Foreign powers helped the Qing suppress the rebellion.", "The war weakened the Qing dynasty significantly."] } },
  { o: { title: "The Boxer Rebellion", yearsAgo: 127, era: "Modern", kid: "In 1899-1901, Chinese fighters called 'Boxers' attacked foreigners and Christians in China. An international army crushed them. It showed how weak China had become and led to even more foreign control.", fun: "The Boxers believed they were immune to bullets.", summary: "The Boxer Rebellion (1899-1901) was an anti-foreign, anti-Christian uprising in China. It was suppressed by an international coalition.", deep: ["The Boxers were a secret society (Society of Righteous Harmony).", "They besieged foreign legations in Beijing.", "The Eight-Nation Alliance intervened.", "The Boxer Protocol imposed heavy reparations on China."] } },
  { o: { title: "The Russian Revolution", yearsAgo: 109, era: "Modern", kid: "In 1917, the Russian people overthrew the Tsar! Then the Bolsheviks, led by Lenin, took power and created the world's first communist state. It changed global politics for the next 70 years.", fun: "The Bolsheviks' slogan was 'Peace, Land, and Bread!'", summary: "The Russian Revolution (1917) overthrew the Tsarist autocracy. The Bolsheviks (led by Lenin) seized power in October, establishing the world's first communist state.", deep: ["The February Revolution forced Tsar Nicholas II to abdicate.", "The October Revolution brought the Bolsheviks to power.", "The Russian Civil War (1917-1922) followed.", "The USSR was founded in 1922."] } },
  { o: { title: "Decolonization", yearsAgo: 66, era: "Modern", kid: "After WWII, European empires gave up their colonies! Dozens of new countries were born in Africa and Asia. India, Ghana, Kenya and many others became independent. It was the biggest change in the world map in history!", fun: "Over 80 countries gained independence between 1945 and 1975.", summary: "Decolonization (1945-1975) saw European empires grant independence to colonies in Africa, Asia and the Caribbean. Over 80 new nations were born.", deep: ["India (1947) and Ghana (1957) were early successes.", "The process was often violent (Algeria, Vietnam).", "The UN played a key role in supporting independence.", "Neo-colonialism replaced direct rule with economic influence."] } },
  { o: { title: "The Civil Rights Movement", yearsAgo: 70, era: "Modern", kid: "In the 1950s and 60s, Black Americans fought for equality! Led by Martin Luther King Jr., they marched, protested and boycotted. The Civil Rights Act (1964) and Voting Rights Act (1965) ended legal segregation.", fun: "The Montgomery Bus Boycott lasted 381 days.", summary: "The Civil Rights Movement (1954-1968) was a struggle for racial equality in the US. It ended segregation and secured voting rights through nonviolent protest.", deep: ["Brown v. Board (1954) ended school segregation.", "The March on Washington (1963) drew 250,000 people.", "King was assassinated in April 1968.", "The movement inspired global human rights efforts."] } },
  { o: { title: "The Feminist Movement", yearsAgo: 60, era: "Modern", kid: "In the 1960s and 70s, women fought for equality! They demanded equal pay, reproductive rights and an end to discrimination. The movement changed laws and culture, opening doors for women in every field.", fun: "Betty Friedan's 'The Feminine Mystique' (1963) sparked the movement.", summary: "The second-wave feminist movement (1960s-1980s) fought for women's rights: equal pay, reproductive freedom and an end to discrimination.", deep: ["The Equal Pay Act (1963) was an early victory.", "Roe v. Wade (1973) legalized abortion (overturned 2022).", "Title IX (1972) banned sex discrimination in education.", "The movement transformed workplace and family norms."] } },
  { o: { title: "The Digital Revolution", yearsAgo: 45, era: "Modern", kid: "Starting in the 1980s, computers, the internet and smartphones transformed every part of life! We can now talk to anyone, learn anything and work from anywhere. The digital revolution is still ongoing.", fun: "The first smartphone (IBM Simon) was released in 1994.", summary: "The Digital Revolution (1980s-present) transformed society through computers, the internet and mobile devices. It changed communication, work, entertainment and knowledge.", deep: ["The personal computer (1970s-80s) brought computing to homes.", "The internet (1990s) connected the world.", "Smartphones (2007) put computers in pockets.", "AI (2020s) is the latest phase of the digital revolution."] } },
  { o: { title: "The Space Age", yearsAgo: 69, era: "Modern", kid: "Starting in 1957, humans began exploring space! Sputnik, Gagarin, Apollo and the ISS — each step pushed the frontier. We've sent robots to Mars and probes beyond the solar system. The space age continues today!", fun: "Voyager 1 is now in interstellar space.", summary: "The Space Age (1957-present) began with Sputnik. It includes human spaceflight, lunar landings, Mars rovers and interstellar probes.", deep: ["Sputnik (1957) started the space race.", "Apollo 11 (1969) landed humans on the Moon.", "The ISS has been continuously occupied since 2000.", "Private companies (SpaceX) now lead space exploration."] } },
  { o: { title: "The Fall of Constantinople", yearsAgo: 573, era: "Civilization", kid: "In 1453, the Ottoman Turks conquered Constantinople — the last great city of the Roman Empire! It ended the Byzantine Empire and marked the end of the Middle Ages. The city became Istanbul.", fun: "The siege used giant cannons to breach the city walls.", summary: "The fall of Constantinople (May 29, 1453) ended the Byzantine Empire. The Ottomans, led by Mehmed II, conquered the city, marking the end of the Middle Ages.", deep: ["The walls of Constantinople had held for 1,000 years.", "Mehmed II used massive cannons (bombards).", "The city became Istanbul, the Ottoman capital.", "Greek scholars fled to Italy, fueling the Renaissance."] } },
  { o: { title: "The Spanish Armada", yearsAgo: 438, era: "Modern", kid: "In 1588, Spain sent a huge fleet — the Armada — to invade England. But storms and English ships defeated it! This made England a naval power and weakened Spain. It was a turning point in European history.", fun: "The Armada was defeated more by weather than by English guns.", summary: "The Spanish Armada (1588) was a failed invasion of England by Spain. Its defeat marked the rise of English naval power and the decline of Spanish dominance.", deep: ["Spain sent 130 ships; only ~67 returned.", "English fire ships disrupted the Spanish formation.", "Storms ('Protestant Wind') destroyed many ships.", "It marked the beginning of English naval supremacy."] } },
  { o: { title: "The Glorious Revolution", yearsAgo: 338, era: "Modern", kid: "In 1688, England's Catholic king was overthrown without a war! William of Orange and Mary became king and queen. They signed the English Bill of Rights, limiting royal power. This inspired the US Constitution!", fun: "It's called 'Glorious' because almost no blood was shed.", summary: "The Glorious Revolution (1688) overthrew James II and established William and Mary as co-monarchs. The English Bill of Rights (1689) limited royal power.", deep: ["James II fled to France without fighting.", "The English Bill of Rights inspired the US Bill of Rights.", "It established parliamentary supremacy.", "It completed the transition to constitutional monarchy."] } },
  { o: { title: "The Haitian Revolution", yearsAgo: 235, era: "Modern", kid: "From 1791 to 1804, enslaved people in Haiti rose up and won their freedom! They defeated French, British and Spanish armies. Haiti became the first free Black republic and the second independent country in the Americas.", fun: "Haiti was the first country to abolish slavery permanently.", summary: "The Haitian Revolution (1791-1804) was the only successful slave revolt in history. It created the first free Black republic, inspiring abolition movements worldwide.", deep: ["Toussaint Louverture led the revolt.", "Haiti declared independence on January 1, 1804.", "Napoleon's army was devastated by disease and resistance.", "The revolution frightened slaveholders across the Americas."] } },
  { o: { title: "The Taiping Rebellion", yearsAgo: 176, era: "Modern", kid: "From 1850 to 1864, a massive civil war raged in China! Hong Xiuquan claimed to be Jesus's brother and led millions in revolt. It was the deadliest conflict of the 19th century, with 20-30 million dead.", fun: "Hong Xiuquan believed he was the younger brother of Jesus Christ.", summary: "The Taiping Rebellion (1850-1864) was a massive civil war in China. Hong Xiuquan's Taiping Heavenly Kingdom fought the Qing dynasty. It killed 20-30 million people.", deep: ["Hong Xiuquan had visions of being Jesus's brother.", "The Taiping controlled much of southern China.", "Foreign powers helped the Qing suppress the rebellion.", "The war weakened the Qing dynasty significantly."] } },
  { o: { title: "The Boxer Rebellion", yearsAgo: 127, era: "Modern", kid: "In 1899-1901, Chinese fighters called 'Boxers' attacked foreigners and Christians in China. An international army crushed them. It showed how weak China had become and led to even more foreign control.", fun: "The Boxers believed they were immune to bullets.", summary: "The Boxer Rebellion (1899-1901) was an anti-foreign, anti-Christian uprising in China. It was suppressed by an international coalition.", deep: ["The Boxers were a secret society (Society of Righteous Harmony).", "They besieged foreign legations in Beijing.", "The Eight-Nation Alliance intervened.", "The Boxer Protocol imposed heavy reparations on China."] } },
  { o: { title: "The Russian Revolution", yearsAgo: 109, era: "Modern", kid: "In 1917, the Russian people overthrew the Tsar! Then the Bolsheviks, led by Lenin, took power and created the world's first communist state. It changed global politics for the next 70 years.", fun: "The Bolsheviks' slogan was 'Peace, Land, and Bread!'", summary: "The Russian Revolution (1917) overthrew the Tsarist autocracy. The Bolsheviks (led by Lenin) seized power in October, establishing the world's first communist state.", deep: ["The February Revolution forced Tsar Nicholas II to abdicate.", "The October Revolution brought the Bolsheviks to power.", "The Russian Civil War (1917-1922) followed.", "The USSR was founded in 1922."] } },
  { o: { title: "Decolonization", yearsAgo: 66, era: "Modern", kid: "After WWII, European empires gave up their colonies! Dozens of new countries were born in Africa and Asia. India, Ghana, Kenya and many others became independent. It was the biggest change in the world map in history!", fun: "Over 80 countries gained independence between 1945 and 1975.", summary: "Decolonization (1945-1975) saw European empires grant independence to colonies in Africa, Asia and the Caribbean. Over 80 new nations were born.", deep: ["India (1947) and Ghana (1957) were early successes.", "The process was often violent (Algeria, Vietnam).", "The UN played a key role in supporting independence.", "Neo-colonialism replaced direct rule with economic influence."] } },
  { o: { title: "The Civil Rights Movement", yearsAgo: 70, era: "Modern", kid: "In the 1950s and 60s, Black Americans fought for equality! Led by Martin Luther King Jr., they marched, protested and boycotted. The Civil Rights Act (1964) and Voting Rights Act (1965) ended legal segregation.", fun: "The Montgomery Bus Boycott lasted 381 days.", summary: "The Civil Rights Movement (1954-1968) was a struggle for racial equality in the US. It ended segregation and secured voting rights through nonviolent protest.", deep: ["Brown v. Board (1954) ended school segregation.", "The March on Washington (1963) drew 250,000 people.", "King was assassinated in April 1968.", "The movement inspired global human rights efforts."] } },
  { o: { title: "The Feminist Movement", yearsAgo: 60, era: "Modern", kid: "In the 1960s and 70s, women fought for equality! They demanded equal pay, reproductive rights and an end to discrimination. The movement changed laws and culture, opening doors for women in every field.", fun: "Betty Friedan's 'The Feminine Mystique' (1963) sparked the movement.", summary: "The second-wave feminist movement (1960s-1980s) fought for women's rights: equal pay, reproductive freedom and an end to discrimination.", deep: ["The Equal Pay Act (1963) was an early victory.", "Roe v. Wade (1973) legalized abortion (overturned 2022).", "Title IX (1972) banned sex discrimination in education.", "The movement transformed workplace and family norms."] } },
  { o: { title: "The Digital Revolution", yearsAgo: 45, era: "Modern", kid: "Starting in the 1980s, computers, the internet and smartphones transformed every part of life! We can now talk to anyone, learn anything and work from anywhere. The digital revolution is still ongoing.", fun: "The first smartphone (IBM Simon) was released in 1994.", summary: "The Digital Revolution (1980s-present) transformed society through computers, the internet and mobile devices. It changed communication, work, entertainment and knowledge.", deep: ["The personal computer (1970s-80s) brought computing to homes.", "The internet (1990s) connected the world.", "Smartphones (2007) put computers in pockets.", "AI (2020s) is the latest phase of the digital revolution."] } },
  { o: { title: "The Space Age", yearsAgo: 69, era: "Modern", kid: "Starting in 1957, humans began exploring space! Sputnik, Gagarin, Apollo and the ISS — each step pushed the frontier. We've sent robots to Mars and probes beyond the solar system. The space age continues today!", fun: "Voyager 1 is now in interstellar space.", summary: "The Space Age (1957-present) began with Sputnik. It includes human spaceflight, lunar landings, Mars rovers and interstellar probes.", deep: ["Sputnik (1957) started the space race.", "Apollo 11 (1969) landed humans on the Moon.", "The ISS has been continuously occupied since 2000.", "Private companies (SpaceX) now lead space exploration."] } },
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
  "Martin Van Buren": "https://en.wikipedia.org/wiki/Martin_Van_Buren",
  "William Henry Harrison": "https://en.wikipedia.org/wiki/William_Henry_Harrison",
  "John Tyler": "https://en.wikipedia.org/wiki/John_Tyler",
  "Zachary Taylor": "https://en.wikipedia.org/wiki/Zachary_Taylor",
  "Millard Fillmore": "https://en.wikipedia.org/wiki/Millard_Fillmore",
  "Franklin Pierce": "https://en.wikipedia.org/wiki/Franklin_Pierce",
  "James Buchanan": "https://en.wikipedia.org/wiki/James_Buchanan",
  "Rutherford B. Hayes": "https://en.wikipedia.org/wiki/Rutherford_B._Hayes",
  "James A. Garfield": "https://en.wikipedia.org/wiki/James_A._Garfield",
  "Chester A. Arthur": "https://en.wikipedia.org/wiki/Chester_A._Arthur",
  "Grover Cleveland": "https://en.wikipedia.org/wiki/Grover_Cleveland",
  "Benjamin Harrison": "https://en.wikipedia.org/wiki/Benjamin_Harrison",
  "Gerald Ford": "https://en.wikipedia.org/wiki/Gerald_Ford",
  "Jimmy Carter": "https://en.wikipedia.org/wiki/Jimmy_Carter",
  "George H.W. Bush": "https://en.wikipedia.org/wiki/George_H._W._Bush",
  "The Haitian Revolution": "https://en.wikipedia.org/wiki/Haitian_Revolution",
  "The Taiping Rebellion": "https://en.wikipedia.org/wiki/Taiping_Rebellion",
  "The Boxer Rebellion": "https://en.wikipedia.org/wiki/Boxer_Rebellion",
  "The Russian Revolution": "https://en.wikipedia.org/wiki/Russian_Revolution",
  "Decolonization": "https://en.wikipedia.org/wiki/Decolonization",
  "The Civil Rights Movement": "https://en.wikipedia.org/wiki/Civil_rights_movement",
  "The Feminist Movement": "https://en.wikipedia.org/wiki/Feminist_movement",
  "The Digital Revolution": "https://en.wikipedia.org/wiki/Digital_Revolution",
  "The Space Age": "https://en.wikipedia.org/wiki/Space_Age",
  "The Fall of Constantinople": "https://en.wikipedia.org/wiki/Fall_of_Constantinople",
  "The Spanish Armada": "https://en.wikipedia.org/wiki/Spanish_Armada",
  "The Glorious Revolution": "https://en.wikipedia.org/wiki/Glorious_Revolution",
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