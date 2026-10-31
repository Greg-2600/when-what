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
  // Religions
  { anchor: "The Alphabet", o: { title: "Buddhism is Founded", yearsAgo: 2589, era: "Civilization", kid: "A prince named Siddhartha sat under a tree and figured out a way to end suffering. He became the Buddha, and his ideas spread across Asia, shaping billions of lives!", fun: "The Buddha's first sermon was called 'Turning the Wheel of Dharma'.", summary: "Around 563 BCE, Siddhartha Gautama attained enlightenment and began teaching the Four Noble Truths and the Eightfold Path. Buddhism spread across India, China, Southeast Asia and beyond.", deep: ["The Four Noble Truths diagnose suffering and its cessation.", "The Eightfold Path guides ethical and mental development.", "Buddhism split into Theravada, Mahayana and Vajrayana traditions.", "Ashoka the Great (3rd century BCE) helped spread Buddhism across Asia."] } },
  { anchor: "The Alphabet", o: { title: "Hinduism Takes Shape", yearsAgo: 3500, era: "Civilization", kid: "In ancient India, people wrote sacred songs called the Vedas and worshipped many gods. Over centuries these ideas grew into Hinduism — the world's oldest major religion still practiced today!", fun: "Hinduism has no single founder; it grew over thousands of years.", summary: "The Vedic period (~1500 BCE) laid the foundations of Hinduism: the Vedas, caste (varna) system, and concepts of karma and dharma. It evolved over millennia into the diverse religion practiced by ~1.2 billion people today.", deep: ["The four Vedas are among the oldest religious texts.", "Concepts of karma, samsara and moksha shaped Indian philosophy.", "Hinduism encompasses diverse traditions (Shaivism, Vaishnavism, Shaktism).", "The Upanishads explored the nature of reality and the self (Atman/Brahman)."] } },
  { anchor: "Printing Press", o: { title: "Islam is Founded", yearsAgo: 1416, era: "Civilization", kid: "In 610 CE, a merchant named Muhammad said he received messages from God through an angel. He shared them, and a new religion — Islam — was born. Today over 1.9 billion people follow it!", fun: "The Quran was revealed over 23 years.", summary: "Around 610 CE, Muhammad began receiving revelations that became the Quran. Islam spread rapidly across Arabia and beyond, becoming one of the world's major religions.", deep: ["The Five Pillars define Muslim practice: faith, prayer, charity, fasting, pilgrimage.", "The Hijra (622 CE) marks the start of the Islamic calendar.", "The Rashidun and Umayyad caliphates expanded Islamic rule across three continents.", "Sufism and Shia/Sunni split shaped Islamic diversity."] } },
  { anchor: "Printing Press", o: { title: "The Protestant Reformation", yearsAgo: 509, era: "Modern", kid: "In 1517, a monk named Martin Luther nailed complaints to a church door. He said people should read the Bible themselves. This split Christianity into Catholic and Protestant churches — and changed Europe forever!", fun: "Luther translated the Bible into German so ordinary people could read it.", summary: "Martin Luther's 95 Theses (1517) challenged Catholic Church practices (indulgences, papal authority). The Reformation split Western Christianity and reshaped European politics, literacy and culture.", deep: ["Luther's translation made the Bible accessible in vernacular German.", "Calvinism and Anglicanism emerged as distinct Protestant traditions.", "The Thirty Years' War (1618-1648) was partly a religious conflict.", "The Peace of Westphalia (1648) established state sovereignty over religion."] } },
  { anchor: "Printing Press", o: { title: "Sikhism is Founded", yearsAgo: 557, era: "Modern", kid: "In 1469, a teacher named Guru Nanak said God is one and all people are equal. He started Sikhism, a religion that rejects caste and emphasizes service and community!", fun: "Sikh men wear turbans and carry a small ceremonial dagger (kirpan).", summary: "Guru Nanak (1469-1539) founded Sikhism in Punjab, emphasizing one God, equality, and community service (seva). The religion developed under ten Gurus.", deep: ["The Guru Granth Sahib is the eternal Guru of Sikhs.", "The Khalsa was founded by Guru Gobind Singh in 1699.", "Sikhism rejects caste and promotes gender equality.", "The Golden Temple in Amritsar is the holiest Sikh site."] } },
  // Wars
  { anchor: "Industrial Revolution", o: { title: "The Thirty Years' War", yearsAgo: 408, era: "Modern", kid: "From 1618 to 1648, a terrible war raged across Europe. It started as a religious fight between Catholics and Protestants but became a power struggle. Millions died, and it ended with a new idea: countries get to choose their own religion!", fun: "The war killed up to 8 million people, making it one of history's deadliest.", summary: "The Thirty Years' War (1618-1648) devastated Central Europe. The Peace of Westphalia (1648) established state sovereignty and religious tolerance, shaping modern international relations.", deep: ["It began as a Bohemian revolt against Habsburg rule.", "Sweden and France intervened on the Protestant side.", "The war killed 20-50% of Central Europe's population.", "Westphalia is considered the foundation of the modern nation-state system."] } },
  { anchor: "First Powered Flight", o: { title: "World War I", yearsAgo: 112, era: "Modern", kid: "In 1914, a single gunshot in Sarajevo sparked a war that dragged in the whole world! Trenches, tanks, and poison gas killed millions. It was supposed to be 'the war to end all wars' — but it wasn't.", fun: "The war introduced tanks, airplanes in combat, and chemical weapons.", summary: "World War I (1914-1918) pitted the Allies against the Central Powers. Trench warfare, new technology, and total mobilization killed ~20 million. The Treaty of Versailles (1919) reshaped Europe.", deep: ["The assassination of Archduke Franz Ferdinand triggered the conflict.", "The United States entered in 1917, tipping the balance.", "The Russian Revolution (1917) took Russia out of the war.", "The Versailles Treaty's harsh terms contributed to WWII."] } },
  { anchor: "First Powered Flight", o: { title: "World War II", yearsAgo: 85, era: "Modern", kid: "Starting in 1939, the world fought again — this time against Nazi Germany and its allies! It was the deadliest war ever, with 70-85 million dead. The Holocaust killed 6 million Jews. It ended with atomic bombs on Japan.", fun: "D-Day (June 6, 1944) was the largest seaborne invasion in history.", summary: "World War II (1939-1945) was the deadliest conflict in history. The Allies defeated the Axis powers. The war led to the United Nations, the Cold War, and the nuclear age.", deep: ["Germany invaded Poland on September 1, 1939.", "The Holocaust murdered 6 million Jews and millions of others.", "The Pacific war ended after atomic bombs on Hiroshima and Nagasaki.", "The war birthed the UN, NATO, and the modern international order."] } },
  { anchor: "First Powered Flight", o: { title: "The American Civil War", yearsAgo: 165, era: "Modern", kid: "From 1861 to 1865, the United States split in two — North vs South — over slavery and states' rights. It was the bloodiest war in American history. The North won, and slavery was abolished!", fun: "More Americans died in the Civil War than in all other US wars combined.", summary: "The American Civil War (1861-1865) was fought between the Union (North) and the Confederacy (South). The Union victory preserved the United States and ended slavery (13th Amendment).", deep: ["The war began with the attack on Fort Sumter (April 1861).", "The Emancipation Proclamation (1863) freed slaves in Confederate territory.", "Gettysburg (July 1863) was the turning point.", "Reconstruction (1865-1877) tried to rebuild the South and integrate freed slaves."] } },
  { anchor: "First Powered Flight", o: { title: "The Vietnam War", yearsAgo: 71, era: "Modern", kid: "From 1955 to 1975, the US and its allies fought in Vietnam to stop communism from spreading! It was deeply unpopular at home, ended with US withdrawal, and left a lasting mark on American society and foreign policy.", fun: "The war was the first 'televised war' — footage brought the conflict into American living rooms.", summary: "The Vietnam War (1955-1975) pitted North Vietnam (communist) against South Vietnam (US-backed). The US withdrew in 1973; Saigon fell in 1975. The war reshaped US foreign policy and domestic politics.", deep: ["The Gulf of Tonkin Resolution (1964) escalated US involvement.", "The Tet Offensive (1968) turned American public opinion against the war.", "The Paris Peace Accords (1973) ended US combat role.", "Over 58,000 Americans and millions of Vietnamese died."] } },
  // US Presidents
  { anchor: "First Powered Flight", o: { title: "George Washington Becomes President", yearsAgo: 236, era: "Modern", kid: "In 1789, George Washington became the first President of the United States. He could have been a king, but he chose to step down after two terms — setting a tradition that lasted until FDR!", fun: "Washington's face is on the $1 bill and the quarter.", summary: "George Washington (1732-1799) was inaugurated as the first US President on April 30, 1789. He established many precedents: cabinet, two-term limit, peaceful transfer of power.", deep: ["Washington commanded the Continental Army during the Revolution.", "He presided over the Constitutional Convention (1787).", "His Farewell Address warned against political parties and foreign alliances.", "The capital city of the United States is named after him."] } },
  { anchor: "First Powered Flight", o: { title: "Abraham Lincoln Leads Through Civil War", yearsAgo: 163, era: "Modern", kid: "Abraham Lincoln became president in 1861, just as the country split apart! He led the North to victory, freed the slaves with the Emancipation Proclamation, and was tragically assassinated days after the war ended.", fun: "Lincoln was 6'4\" — the tallest US president.", summary: "Abraham Lincoln (1809-1865) was the 16th President. He preserved the Union, issued the Emancipation Proclamation, and delivered the Gettysburg Address. He was assassinated on April 14, 1865.", deep: ["Lincoln grew up in a log cabin with almost no formal schooling.", "The Gettysburg Address redefined the war as a fight for equality.", "His assassination by John Wilkes Booth shocked the nation.", "Lincoln is consistently ranked among the greatest US presidents."] } },
  { anchor: "First Powered Flight", o: { title: "FDR and the New Deal", yearsAgo: 93, era: "Modern", kid: "In 1933, Franklin D. Roosevelt became president during the Great Depression. He created jobs, built dams, and started Social Security. He was elected four times — more than anyone else!", fun: "FDR was the only president elected to four terms; the 22nd Amendment later limited presidents to two.", summary: "Franklin D. Roosevelt (1882-1945) led the US through the Great Depression and most of WWII. His New Deal programs reshaped the federal government's role in the economy.", deep: ["FDR was paralyzed by polio at age 39, but kept leading.", "The New Deal created Social Security, the SEC, and public works programs.", "He died in office in April 1945, just before Germany's surrender.", "His 'fireside chats' used radio to speak directly to Americans."] } },
  { anchor: "First Powered Flight", o: { title: "JFK and the New Frontier", yearsAgo: 65, era: "Modern", kid: "John F. Kennedy became president in 1961 and inspired a generation! He launched the Peace Corps, promised to put a man on the Moon, and faced the Cuban Missile Crisis. He was assassinated in 1963, breaking the nation's heart.", fun: "Kennedy was the youngest elected president (43) and the first Catholic.", summary: "John F. Kennedy (1917-1963) was the 35th President. His 'New Frontier' agenda and the space race defined the early 1960s. He was assassinated in Dallas on November 22, 1963.", deep: ["The Cuban Missile Crisis (1962) brought the world closest to nuclear war.", "His Moon speech (1962) launched the Apollo program.", "The Peace Corps sent volunteers to developing nations.", "His assassination remains one of the most studied events in US history."] } },
  // Founding of nations
  { anchor: "First Powered Flight", o: { title: "The United States is Founded", yearsAgo: 250, era: "Modern", kid: "On July 4, 1776, thirteen colonies declared independence from Britain! The new United States was built on ideas of liberty and democracy — though it took centuries to live up to them for everyone.", fun: "The Declaration of Independence was signed by 56 men.", summary: "The Declaration of Independence (1776) founded the United States of America. The Constitution (1787) and Bill of Rights (1791) established the government framework.", deep: ["The Revolution (1775-1783) won independence from Britain.", "The Constitution established three branches of government.", "The Bill of Rights guaranteed individual freedoms.", "Slavery contradicted the Declaration's ideals; abolition took nearly a century."] } },
  { anchor: "First Powered Flight", o: { title: "The French Revolution", yearsAgo: 237, era: "Modern", kid: "In 1789, the people of France rose up against their king. They chopped off his head, declared 'liberty, equality, fraternity,' and changed the world. It was messy and violent, but it inspired democracies everywhere!", fun: "The French Revolution gave us the metric system and the modern calendar.", summary: "The French Revolution (1789-1799) overthrew the monarchy and established a republic. It inspired democratic movements worldwide but also led to the Terror and Napoleon's rise.", deep: ["The storming of the Bastille (July 14, 1789) became the national holiday.", "The Declaration of the Rights of Man echoed the US Declaration.", "The Reign of Terror (1793-1794) executed thousands, including Louis XVI.", "Napoleon seized power in 1799, ending the Revolution."] } },
  { anchor: "First Powered Flight", o: { title: "India Gains Independence", yearsAgo: 78, era: "Modern", kid: "In 1947, India finally became free from British rule after a long struggle led by Mahatma Gandhi, who believed in peaceful protest! But freedom came with tragedy — the country split into India and Pakistan, and millions fled.", fun: "Gandhi walked 240 miles to the sea to make salt in defiance of British salt taxes.", summary: "India gained independence from Britain on August 15, 1947. Partition created India and Pakistan, displacing 10-20 million people and killing up to 2 million.", deep: ["Gandhi's nonviolent resistance (satyagraha) inspired civil rights movements worldwide.", "Partition created Hindu-majority India and Muslim-majority Pakistan.", "The assassination of Gandhi (January 1948) shocked the world.", "India adopted a secular democratic constitution in 1950."] } },
  { anchor: "First Powered Flight", o: { title: "The State of Israel is Founded", yearsAgo: 77, era: "Modern", kid: "In 1948, the modern state of Israel was created as a homeland for the Jewish people! It was born from the horror of the Holocaust and decades of Zionist movement. The founding also led to conflicts with neighboring Arab states that continue today.", fun: "Israel's population grew from 800,000 in 1948 to over 9 million today.", summary: "Israel was established on May 14, 1948, following the UN partition plan and the end of the British Mandate. The founding triggered the 1948 Arab-Israeli War.", deep: ["The Balfour Declaration (1917) supported a Jewish homeland in Palestine.", "The Holocaust (1941-1945) intensified the push for a Jewish state.", "The 1948 war displaced ~700,000 Palestinians (the Nakba).", "Israel has fought several wars with its neighbors since 1948."] } },
  // Immigration
  { anchor: "First Powered Flight", o: { title: "Ellis Island Opens", yearsAgo: 134, era: "Modern", kid: "In 1892, Ellis Island opened in New York Harbor. Over the next 60 years, 12 million immigrants — mostly from Europe — passed through it, making America a nation of immigrants!", fun: "About 40% of Americans today can trace an ancestor through Ellis Island.", summary: "Ellis Island (1892-1954) was the main immigration processing center for the US. Over 12 million immigrants entered through it, shaping American demographics and culture.", deep: ["Immigrants underwent medical and legal inspections.", "Many were fleeing poverty, persecution, or famine in Europe.", "The island closed in 1954; it's now a museum.", "The Statue of Liberty nearby welcomed 'huddled masses yearning to breathe free.'"] } },
  { anchor: "First Powered Flight", o: { title: "The Great Migration", yearsAgo: 110, era: "Modern", kid: "Starting in 1916, millions of Black Americans left the South for cities in the North and West, seeking better jobs and escaping Jim Crow laws. It was one of the biggest movements of people in US history!", fun: "The Great Migration lasted about 60 years (1916-1970).", summary: "The Great Migration (1916-1970) saw ~6 million Black Americans move from the rural South to urban North and West. It reshaped American culture, politics and demographics.", deep: ["Push factors: Jim Crow laws, lynching, poor economic prospects.", "Pull factors: industrial jobs, better schools, less overt racism.", "The migration fueled the Harlem Renaissance and jazz culture.", "It shifted Black political power to northern cities."] } },
  // Economic
  { anchor: "First Powered Flight", o: { title: "The Great Depression", yearsAgo: 97, era: "Modern", kid: "In 1929, the stock market crashed and the world economy collapsed! Millions lost their jobs, homes and savings. Bread lines and dust storms became symbols of hard times. It led to new government programs to help people.", fun: "The Dust Bowl made the Great Depression even worse for farmers.", summary: "The Great Depression (1929-1939) was the worst economic downturn in modern history. It led to the New Deal in the US and reshaped global economic policy.", deep: ["The stock market crash of October 1929 triggered the crisis.", "Unemployment reached 25% in the United States.", "The Dust Bowl devastated Great Plains agriculture.", "The Depression contributed to the rise of fascism in Europe."] } },
  { anchor: "First Powered Flight", o: { title: "Bretton Woods Conference", yearsAgo: 82, era: "Modern", kid: "In 1944, leaders from 44 countries met in New Hampshire to design the world's money system after WWII. They created the IMF and World Bank — and made the US dollar the world's currency!", fun: "The conference was held at the Mount Washington Hotel in Bretton Woods, New Hampshire.", summary: "The Bretton Woods Conference (1944) established the postwar international monetary system: fixed exchange rates, the IMF, and the World Bank. The US dollar became the reserve currency.", deep: ["John Maynard Keynes and Harry Dexter White were the key architects.", "The system lasted until 1971, when Nixon ended dollar-gold convertibility.", "The IMF and World Bank still exist today.", "Bretton Woods shaped global trade for decades."] } },
  // Science
  { anchor: "Industrial Revolution", o: { title: "Copernicus Moves the Sun", yearsAgo: 483, era: "Modern", kid: "In 1543, a Polish astronomer named Copernicus said something shocking: the Earth goes around the Sun, not the other way around! People had believed the opposite for 1,500 years. This changed how we see our place in the universe.", fun: "Copernicus published his book on his deathbed.", summary: "Nicolaus Copernicus (1473-1543) proposed the heliocentric model: Earth and planets orbit the Sun. Published in 1543 (De revolutionibus), it launched the Scientific Revolution.", deep: ["The Catholic Church placed the book on the Index of Forbidden Books in 1616.", "Tycho Brahe and Kepler refined the model with elliptical orbits.", "Galileo's telescope observations supported heliocentrism.", "The shift from geocentrism to heliocentrism took over a century."] } },
  { anchor: "Industrial Revolution", o: { title: "Galileo's Telescope", yearsAgo: 417, era: "Modern", kid: "In 1609, Galileo built a telescope and pointed it at the sky. He saw moons around Jupiter, mountains on the Moon, and spots on the Sun. He proved Copernicus right — and got in big trouble with the Church!", fun: "Galileo was forced to recant his views and spent his last years under house arrest.", summary: "Galileo Galilei (1564-1642) used the telescope to discover Jupiter's moons, lunar craters, and sunspots. His observations supported heliocentrism and helped found modern physics.", deep: ["His 1632 book 'Dialogue' led to his trial by the Inquisition.", "He is considered the father of modern observational astronomy.", "His work on motion laid groundwork for Newton.", "The Church formally apologized to Galileo in 1992."] } },
  { anchor: "First Powered Flight", o: { title: "Einstein's Miracle Year", yearsAgo: 120, era: "Modern", kid: "In 1905, a young patent clerk named Albert Einstein published four papers that changed physics forever. He showed that time and space are relative, that light comes in packets, and that E=mc² — a tiny bit of mass can release enormous energy!", fun: "Einstein won the Nobel Prize for the photoelectric effect, not for relativity.", summary: "Albert Einstein's 1905 papers (annus mirabilis) introduced special relativity, the photoelectric effect, and E=mc². These revolutionized physics and led to the nuclear age.", deep: ["Special relativity showed time and space are relative to the observer.", "E=mc squared revealed mass-energy equivalence.", "General relativity (1915) described gravity as spacetime curvature.", "His work underpins GPS, nuclear energy, and modern cosmology."] } },
];

let added = 0;
// Need global anchors: insert each event before the first existing milestone with yearsAgo < newEvent.yearsAgo.
// First, get the current milestone list (without new events) to find anchors.
delete require.cache[require.resolve(CORE)];
// core file currently has no new milestones (removed), so require reflects current state
const curMod = require(CORE);
const curMilestones = curMod.MILESTONES;

function globalAnchor(ya) {
  for (const m of curMilestones) {
    if (m.yearsAgo < ya) return m.title;
  }
  return curMilestones[curMilestones.length - 1].title;
}

// Group by global anchor
const byAnchor = {};
events.forEach(function (ev) {
  const a = globalAnchor(ev.o.yearsAgo);
  if (!byAnchor[a]) byAnchor[a] = [];
  byAnchor[a].push(ev);
});

for (const anchor of Object.keys(byAnchor)) {
  const anchorLine = "  {\n    title: " + JSON.stringify(anchor) + ",";
  if (!core.includes(anchorLine)) { console.error("anchor not found:", anchor); process.exit(1); }
  // sort descending yearsAgo; insertion order = result order
  const group = byAnchor[anchor].sort(function (a, b) { return b.o.yearsAgo - a.o.yearsAgo; });
  for (const ev of group) {
    core = core.replace(anchorLine, block(ev.o) + "\n" + anchorLine);
    added++;
  }
}

// Add LEARN_MORE entries
const lmAnchor = '    "The Second Temple Falls": "https://en.wikipedia.org/wiki/Siege_of_Jerusalem_(70_CE)",\n';
const lmMap = {
  "Buddhism is Founded": "https://en.wikipedia.org/wiki/Buddhism",
  "Hinduism Takes Shape": "https://en.wikipedia.org/wiki/Hinduism",
  "Islam is Founded": "https://en.wikipedia.org/wiki/Islam",
  "The Protestant Reformation": "https://en.wikipedia.org/wiki/Protestant_Reformation",
  "Sikhism is Founded": "https://en.wikipedia.org/wiki/Sikhism",
  "The Thirty Years' War": "https://en.wikipedia.org/wiki/Thirty_Years%27_War",
  "World War I": "https://en.wikipedia.org/wiki/World_War_I",
  "World War II": "https://en.wikipedia.org/wiki/World_War_II",
  "The American Civil War": "https://en.wikipedia.org/wiki/American_Civil_War",
  "The Vietnam War": "https://en.wikipedia.org/wiki/Vietnam_War",
  "George Washington Becomes President": "https://en.wikipedia.org/wiki/George_Washington",
  "Abraham Lincoln Leads Through Civil War": "https://en.wikipedia.org/wiki/Abraham_Lincoln",
  "FDR and the New Deal": "https://en.wikipedia.org/wiki/Franklin_D._Roosevelt",
  "JFK and the New Frontier": "https://en.wikipedia.org/wiki/John_F._Kennedy",
  "The United States is Founded": "https://en.wikipedia.org/wiki/United_States_Declaration_of_Independence",
  "The French Revolution": "https://en.wikipedia.org/wiki/French_Revolution",
  "India Gains Independence": "https://en.wikipedia.org/wiki/Independence_of_India",
  "The State of Israel is Founded": "https://en.wikipedia.org/wiki/Declaration_of_the_Establishment_of_the_State_of_Israel",
  "Ellis Island Opens": "https://en.wikipedia.org/wiki/Ellis_Island",
  "The Great Migration": "https://en.wikipedia.org/wiki/Great_Migration_(African_American)",
  "The Great Depression": "https://en.wikipedia.org/wiki/Great_Depression",
  "Bretton Woods Conference": "https://en.wikipedia.org/wiki/Bretton_Woods_Conference",
  "Copernicus Moves the Sun": "https://en.wikipedia.org/wiki/Nicolaus_Copernicus",
  "Galileo's Telescope": "https://en.wikipedia.org/wiki/Galileo_Galilei",
  "Einstein's Miracle Year": "https://en.wikipedia.org/wiki/Annus_mirabilis_papers",
};
const lmEntries = Object.entries(lmMap).map(([t, u]) => '    ' + JSON.stringify(t) + ': ' + JSON.stringify(u) + ',\n').join("");
if (core.includes(lmAnchor)) core = core.replace(lmAnchor, lmAnchor + lmEntries);

// Add CURRICULUM_OVERRIDES
const coAnchor = '    "The Cold War": ["empires & power", "physics & chemistry"],\n';
const coMap = {
  "Buddhism is Founded": ["religion & ethics", "human migration"],
  "Hinduism Takes Shape": ["religion & ethics", "ancient history"],
  "Islam is Founded": ["religion & ethics", "human migration"],
  "The Protestant Reformation": ["religion & ethics", "art & language"],
  "Sikhism is Founded": ["religion & ethics", "human migration"],
  "The Thirty Years' War": ["empires & power", "religion & ethics"],
  "World War I": ["empires & power", "technology & engineering"],
  "World War II": ["empires & power", "medicine & health"],
  "The American Civil War": ["empires & power", "everyday life"],
  "The Vietnam War": ["empires & power", "technology & engineering"],
  "George Washington Becomes President": ["empires & power", "everyday life"],
  "Abraham Lincoln Leads Through Civil War": ["empires & power", "religion & ethics"],
  "FDR and the New Deal": ["empires & power", "everyday life"],
  "JFK and the New Frontier": ["empires & power", "technology & engineering"],
  "The United States is Founded": ["empires & power", "everyday life"],
  "The French Revolution": ["empires & power", "everyday life"],
  "India Gains Independence": ["empires & power", "human migration"],
  "The State of Israel is Founded": ["empires & power", "human migration"],
  "Ellis Island Opens": ["human migration", "everyday life"],
  "The Great Migration": ["human migration", "everyday life"],
  "The Great Depression": ["everyday life", "empires & power"],
  "Bretton Woods Conference": ["empires & power", "technology & engineering"],
  "Copernicus Moves the Sun": ["physics & chemistry", "astronomy & space"],
  "Galileo's Telescope": ["physics & chemistry", "astronomy & space"],
  "Einstein's Miracle Year": ["physics & chemistry", "astronomy & space"],
};
const coEntries = Object.entries(coMap).map(([t, tags]) => '    ' + JSON.stringify(t) + ': ' + JSON.stringify(tags) + ',\n').join("");
if (core.includes(coAnchor)) core = core.replace(coAnchor, coAnchor + coEntries);

fs.writeFileSync(CORE, core);
console.log("added", added, "new milestones");