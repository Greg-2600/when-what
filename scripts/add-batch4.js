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
  { o: { title: "Hundred Years' War", yearsAgo: 689, era: "Civilization", kid: "From 1337 to 1453, England and France fought a war that lasted 116 years! It featured knights, longbows and Joan of Arc. England lost almost all its French land, and France became a strong nation.", fun: "Joan of Arc was a 17-year-old peasant girl who led French armies to victory.", summary: "The Hundred Years' War (1337-1453) was a series of conflicts between England and France. It ended with French victory and the end of English territorial claims in France.", deep: ["Joan of Arc was burned at the stake in 1431.", "The war saw the rise of infantry over cavalry.", "The longbow gave English archers a key advantage.", "The war helped forge French and English national identities."] } },
  { o: { title: "Napoleonic Wars", yearsAgo: 223, era: "Modern", kid: "After the French Revolution, Napoleon Bonaparte conquered most of Europe! He was a brilliant general but his ambition led to disaster — his army froze in Russia. He was finally defeated at Waterloo in 1815.", fun: "Napoleon was only 5'6\" but his enemies called him 'The Little Corporal'.", summary: "The Napoleonic Wars (1803-1815) saw Napoleon Bonaparte conquer much of Europe before his defeat at Waterloo. They reshaped European borders and politics.", deep: ["Napoleon crowned himself Emperor in 1804.", "The Continental System blocked British trade.", "The disastrous Russian campaign (1812) destroyed his army.", "The Congress of Vienna (1815) redrew Europe's map."] } },
  { o: { title: "Crimean War", yearsAgo: 173, era: "Modern", kid: "From 1853 to 1856, Russia fought Britain, France and the Ottoman Empire in the Crimean War! It was the first war with photography, telegraphs and nurses (Florence Nightingale). It changed how wars were fought and reported.", fun: "Florence Nightingale became famous for nursing wounded soldiers.", summary: "The Crimean War (1853-1856) was fought between Russia and an alliance of Britain, France and the Ottoman Empire. It modernized warfare and nursing.", deep: ["The 'Charge of the Light Brigade' became famous.", "Florence Nightingale established modern nursing.", "The telegraph transmitted war news in real time.", "Russia's defeat led to reforms and the abolition of serfdom."] } },
  { o: { title: "Boer War", yearsAgo: 127, era: "Modern", kid: "From 1899 to 1902, Britain fought Dutch settlers (Boers) in South Africa! It was brutal — the British used concentration camps. It was a turning point that helped create the modern South African state.", fun: "Winston Churchill was captured and escaped during the Boer War.", summary: "The Second Boer War (1899-1902) was fought between Britain and Boer republics in South Africa. It led to British dominance and the Union of South Africa.", deep: ["The British used scorched earth and concentration camps.", "Over 26,000 Boer women and children died in camps.", "The war made Britain question its imperial role.", "It contributed to South Africa's racial policies."] } },
  { o: { title: "Russian Civil War", yearsAgo: 109, era: "Modern", kid: "From 1917 to 1922, after the Russian Revolution, the Bolsheviks (Reds) fought the anti-communists (Whites)! The Reds won and created the Soviet Union. Millions died in the fighting and famine.", fun: "The Red Army was led by Leon Trotsky.", summary: "The Russian Civil War (1917-1922) pitted the Bolsheviks against anti-communist forces. The Bolshevik victory established the Soviet Union.", deep: ["The war followed the February and October Revolutions.", "Foreign powers (US, UK, France, Japan) intervened against the Bolsheviks.", "The Red Terror and White Terror killed hundreds of thousands.", "Famine (1921-1922) killed 5 million more."] } },
  { o: { title: "Spanish Civil War", yearsAgo: 90, era: "Modern", kid: "From 1936 to 1939, Spain fought a civil war between Republicans (democrats) and Nationalists (fascists)! The Nationalists won, led by Franco, who ruled Spain as a dictator until 1975. It was a preview of WWII.", fun: "Picasso painted 'Guernica' to protest the bombing of a Basque town.", summary: "The Spanish Civil War (1936-1939) was fought between Republicans and Nationalists. Franco's Nationalists won, establishing a dictatorship that lasted until 1975.", deep: ["Germany and Italy supported Franco; the USSR supported Republicans.", "The bombing of Guernica (1937) inspired Picasso's painting.", "International Brigades fought for the Republic.", "The war was a proxy for the coming Second World War."] } },
  { o: { title: "Arab-Israeli Wars", yearsAgo: 78, era: "Modern", kid: "Starting in 1948, Israel fought several wars with its Arab neighbors! These conflicts shaped the Middle East and the lives of millions of Israelis and Palestinians. Peace remains elusive today.", fun: "The 1967 Six-Day War tripled Israel's territory.", summary: "The Arab-Israeli wars (1948, 1956, 1967, 1973) shaped the modern Middle East. Key issues include territory, refugees and security.", deep: ["The 1948 war created 700,000 Palestinian refugees.", "The 1967 war gave Israel control of Sinai, Gaza, West Bank and Golan.", "The 1973 Yom Kippur War led to peace talks.", "The Oslo Accords (1993) were a failed attempt at peace."] } },
  { o: { title: "Falklands War", yearsAgo: 44, era: "Modern", kid: "In 1982, Argentina invaded the Falkland Islands, which Britain claimed. Britain sent a fleet 8,000 miles to fight. The war lasted 74 days and Britain won. It boosted Margaret Thatcher's popularity!", fun: "The war was fought 8,000 miles from Britain.", summary: "The Falklands War (April-June 1982) was fought between Argentina and the UK over the Falkland Islands. Britain won, strengthening Thatcher's government.", deep: ["Argentina invaded the Falklands on April 2, 1982.", "The sinking of the Belgrano killed 323 Argentine sailors.", "Britain lost 255 military personnel in the war.", "The war boosted Thatcher's popularity ahead of the 1983 election."] } },
  { o: { title: "Judaism", yearsAgo: 3800, era: "Civilization", kid: "Judaism is one of the world's oldest religions, dating back 4,000 years to Abraham! Jews believe in one God and follow the Torah. Despite persecution and exile, Jewish culture and religion survived and thrived.", fun: "The Jewish diaspora spread Jewish communities worldwide.", summary: "Judaism originated ~1800 BCE with Abraham. It is the oldest Abrahamic religion, centered on the Torah and the covenant between God and the Jewish people.", deep: ["The Torah contains the first five books of the Bible.", "The Babylonian Exile (586 BCE) shaped Jewish identity.", "The Talmud contains extensive rabbinic commentary.", "Judaism influenced Christianity and Islam."] } },
  { o: { title: "Counter-Reformation", yearsAgo: 481, era: "Modern", kid: "After the Protestant Reformation split Christianity, the Catholic Church fought back! The Counter-Reformation (starting 1545) reformed the Church, created the Jesuits, and sparked new art and architecture. It reshaped Catholicism!", fun: "The Council of Trent (1545-1563) defined Catholic doctrine.", summary: "The Counter-Reformation (1545-1648) was the Catholic Church's response to the Protestant Reformation. It reformed the Church and sparked new religious orders and art.", deep: ["The Council of Trent clarified Catholic doctrine.", "The Jesuits (founded 1540) became a major force.", "Baroque art and architecture flourished greatly.", "The Inquisition was strengthened by the Counter-Reformation."] } },
  { o: { title: "African Union", yearsAgo: 24, era: "Modern", kid: "In 2002, African countries created the African Union to work together on peace, development and human rights. It's like the EU for Africa! The AU has 55 member states.", fun: "The AU replaced the Organization of African Unity (OAU).", summary: "The African Union (AU) was established in 2002, replacing the OAU. It promotes unity, peace and development across 55 African nations.", deep: ["The AU has a Peace and Security Council today.", "Agenda 2063 is the AU's long-term development plan.", "The AU has intervened in several conflicts.", "It represents 1.4 billion people across Africa today."] } },
  { o: { title: "ASEAN", yearsAgo: 59, era: "Modern", kid: "In 1967, five Southeast Asian countries formed ASEAN to promote cooperation and peace. Today it has 10 members and represents 650 million people! It's one of the world's most successful regional organizations.", fun: "ASEAN's motto is 'One Vision, One Identity, One Community'.", summary: "The Association of Southeast Asian Nations (ASEAN) was founded in 1967. It promotes economic, political and security cooperation among 10 Southeast Asian nations.", deep: ["ASEAN has a combined GDP of ~$3.6 trillion.", "The ASEAN Free Trade Area (AFTA) reduced tariffs.", "ASEAN plays a key role in Asia-Pacific diplomacy.", "It represents 650 million people across Southeast Asia."] } },
  { o: { title: "Arab League", yearsAgo: 81, era: "Modern", kid: "In 1945, Arab countries formed the Arab League to coordinate on politics and economics! Today it has 22 members. It has played a role in conflicts and peace efforts in the Middle East.", fun: "The Arab League's headquarters is in Cairo, Egypt.", summary: "The Arab League was founded on March 22, 1945. It promotes cooperation among 22 Arab states on political, economic and cultural issues.", deep: ["The Arab League was founded in Cairo, Egypt.", "It has mediated several Arab conflicts over time.", "The Palestinian issue is a central concern.", "The league has faced challenges of disunity."] } },
  { o: { title: "Organization of American States", yearsAgo: 78, era: "Modern", kid: "In 1948, countries in the Americas formed the Organization of American States (OAS) to promote democracy, human rights and security! Today it has 35 members and is the main forum for the Western Hemisphere.", fun: "The OAS is headquartered in Washington, D.C.", summary: "The Organization of American States (OAS) was founded on April 30, 1948. It promotes democracy, human rights, security and development in the Americas.", deep: ["The OAS has 35 member states in the Americas today.", "The Inter-American Commission on Human Rights is part of the OAS.", "It has mediated several regional conflicts.", "The OAS suspended Cuba in 1962 (reinstated 2009)."] } },
  { o: { title: "Commonwealth of Nations", yearsAgo: 95, era: "Modern", kid: "In 1931, Britain and its former colonies formed the Commonwealth — a voluntary association of 56 countries! They share history, language and values. The King of Britain is the head, but all members are equal.", fun: "The Commonwealth Games are held every 4 years.", summary: "The Commonwealth of Nations was formally constituted by the Statute of Westminster (1931). It is a voluntary association of 56 independent countries.", deep: ["The Commonwealth has 56 member states today.", "It promotes democracy, human rights and development.", "The Commonwealth Games are a major sporting event.", "The head of the Commonwealth is King Charles III."] } },
  { o: { title: "Syrian Refugee Crisis", yearsAgo: 11, era: "Modern", kid: "Starting in 2015, millions of Syrians fled their country's civil war! It became one of the largest refugee crises in history. Countries around the world struggled to respond, and it changed politics in Europe and beyond.", fun: "Over 6.8 million Syrians fled their country.", summary: "The Syrian refugee crisis (2011-present) displaced over 13 million people (6.8 million refugees, 6.7 million internally displaced). It strained global refugee systems.", deep: ["The Syrian civil war began in 2011 and continues.", "Turkey hosts the most Syrian refugees (3.6 million).", "The crisis fueled political debates in Europe.", "The war has killed over 500,000 people so far."] } },
  { o: { title: "Ukrainian Refugee Crisis", yearsAgo: 4, era: "Modern", kid: "In 2022, Russia invaded Ukraine, and millions of Ukrainians fled their homes! It was the largest refugee crisis in Europe since WWII. Countries worldwide welcomed Ukrainian refugees.", fun: "Over 6 million Ukrainians fled abroad.", summary: "Russia's invasion of Ukraine (February 2022) triggered the largest refugee crisis in Europe since WWII. Over 6 million Ukrainians fled abroad.", deep: ["Poland received the most Ukrainian refugees.", "The EU activated the Temporary Protection Directive.", "The war has caused massive destruction in Ukraine.", "NATO and the West imposed severe sanctions on Russia."] } },
  { o: { title: "Pasteur and Germ Theory", yearsAgo: 160, era: "Modern", kid: "In the 1860s, Louis Pasteur proved that tiny germs cause disease, not bad air. He invented pasteurization (heating milk to kill germs) and created vaccines. He saved more lives than almost anyone in history!", fun: "Pasteur also disproved 'spontaneous generation' — the idea that life appears from nothing.", summary: "Louis Pasteur (1822-1895) established germ theory, developed pasteurization, and created vaccines for rabies and anthrax. His work revolutionized medicine and public health.", deep: ["Germ theory replaced miasma theory (bad air).", "Pasteurization heats liquids to kill pathogens.", "His rabies vaccine (1885) was the first for a viral disease.", "Pasteur Institutes worldwide continue his research legacy."] } },
  { o: { title: "Mendel's Laws of Inheritance", yearsAgo: 160, era: "Modern", kid: "In the 1860s, a monk named Gregor Mendel grew pea plants and discovered the rules of heredity — how traits pass from parents to children. His work became the foundation of genetics, though nobody noticed until 1900!", fun: "Mendel's work was ignored for 35 years.", summary: "Gregor Mendel (1822-1884) published his laws of inheritance in 1866, based on pea plant experiments. His work, rediscovered in 1900, founded modern genetics.", deep: ["Mendel identified dominant and recessive traits.", "His laws: segregation and independent assortment.", "He studied 7 traits in ~28,000 pea plants.", "Genetics + Darwin's evolution = the 'modern synthesis.'"] } },
  { o: { title: "Maxwell's Equations", yearsAgo: 161, era: "Modern", kid: "In 1865, James Clerk Maxwell figured out that electricity and magnetism are the same thing! His equations predicted radio waves, X-rays and light. He unified physics and laid the groundwork for all modern technology.", fun: "Maxwell's equations are just four lines but describe all of electromagnetism.", summary: "James Clerk Maxwell (1831-1879) published his equations (1865) unifying electricity, magnetism and light. They predicted electromagnetic waves and enabled modern technology.", deep: ["His equations predicted radio waves (confirmed by Hertz in 1887).", "They unified electricity, magnetism and optics.", "Einstein's relativity built on Maxwell's work.", "Modern electronics, radio and WiFi rely on his equations."] } },
  { o: { title: "Tesla and AC Power", yearsAgo: 140, era: "Modern", kid: "In the 1880s, Nikola Tesla invented alternating current (AC) electricity! It could be sent over long distances, unlike Edison's DC. Tesla's AC power won the 'current war' and electrified the world.", fun: "Tesla also invented the Tesla coil, which makes lightning!", summary: "Nikola Tesla (1856-1943) developed AC power systems in the 1880s. AC won the 'War of Currents' over Edison's DC, enabling long-distance power transmission.", deep: ["AC can be transformed to high voltage for efficient transmission.", "The Tesla coil produces high-voltage, high-frequency electricity.", "Tesla held over 300 patents on electrical inventions.", "His ideas influenced radio, wireless power and robotics."] } },
  { o: { title: "Sputnik Launches", yearsAgo: 69, era: "Modern", kid: "In 1957, the Soviet Union launched Sputnik — the first satellite ever! It beeped as it orbited Earth. The US was shocked and rushed to catch up, launching the space race!", fun: "Sputnik's radio signal was detectable by amateur radio operators worldwide.", summary: "Sputnik 1 (October 4, 1957) was the first artificial satellite. It triggered the space race and led to NASA's creation and the Apollo program.", deep: ["Sputnik weighed 83.6 kg and orbited for 3 months.", "The US launched Explorer 1 in January 1958.", "NASA was created in July 1958.", "The space race culminated in the Moon landing (1969)."] } },
  { o: { title: "Gagarin Orbits Earth", yearsAgo: 65, era: "Modern", kid: "On April 12, 1961, Yuri Gagarin became the first human in space! He orbited Earth once in 108 minutes. He was 27 years old and said 'Poyekhali!' (Let's go!) as he launched.", fun: "Gagarin's flight lasted 108 minutes; the whole Vostok capsule weighed only 4.7 tons.", summary: "Yuri Gagarin (1934-1968) became the first human in space aboard Vostok 1 on April 12, 1961. His flight lasted 108 minutes and orbited Earth once.", deep: ["The USSR beat the US to the first human in space.", "Alan Shepard became the first American in space 3 weeks later.", "Gagarin died in a plane crash in 1968 at age 34.", "April 12 is celebrated as 'Cosmonautics Day' in Russia."] } },
  { o: { title: "CRISPR Gene Editing", yearsAgo: 14, era: "Modern", kid: "In 2012, scientists figured out how to use a bacterial immune system (CRISPR) to edit DNA precisely. It's like find-and-replace for genes! It could cure genetic diseases, but also raises big ethical questions.", fun: "CRISPR was discovered in bacteria — they use it to fight viruses.", summary: "CRISPR-Cas9 gene editing was developed in 2012 by Jennifer Doudna and Emmanuelle Charpentier. It allows precise editing of DNA and has revolutionized biology and medicine.", deep: ["Doudna and Charpentier won the Nobel Prize in Chemistry (2020).", "CRISPR can correct genetic mutations causing disease.", "It raises ethical concerns about 'designer babies'.", "The first CRISPR-based therapy was approved in 2023."] } },
  { o: { title: "ChatGPT and the AI Revolution", yearsAgo: 4, era: "Modern", kid: "In 2022, ChatGPT was released and suddenly everyone could talk to an AI! It can write, code, answer questions and more. AI is now changing how we work, learn and create.", fun: "ChatGPT reached 1 million users in 5 days.", summary: "ChatGPT (November 2022) by OpenAI brought large language models to the public. It sparked an AI revolution across industries.", deep: ["GPT-4 (2023) is more capable and multimodal.", "AI raises questions about jobs, creativity and ethics.", "Other AI models include Claude, Gemini and Llama.", "AI is being integrated into search, coding and healthcare."] } },
  { o: { title: "Olympics Revived", yearsAgo: 130, era: "Modern", kid: "In 1896, the Olympic Games were reborn in Athens, Greece! After 1,500 years, athletes from 14 nations competed. Today the Olympics are the biggest sports event in the world, with billions watching!", fun: "The marathon was created for the 1896 Olympics, inspired by the Greek messenger Pheidippides.", summary: "The first modern Olympic Games were held in Athens in 1896, revived by Pierre de Coubertin. 241 athletes from 14 nations competed in 43 events.", deep: ["Coubertin founded the International Olympic Committee (IOC) in 1894.", "The ancient Olympics ran from 776 BCE to 393 CE.", "The Winter Olympics were added in 1924.", "The Olympics have been held every 4 years since 1896 (except during wars)."] } },
  { o: { title: "World Cup First (1930)", yearsAgo: 96, era: "Modern", kid: "In 1930, the first FIFA World Cup was held in Uruguay! 13 teams competed and Uruguay won. Today the World Cup is the most-watched sporting event on Earth, with billions of viewers!", fun: "Only 13 teams competed in the first World Cup.", summary: "The first FIFA World Cup was held in Uruguay in 1930. Uruguay won, defeating Argentina 4-2 in the final. It became the world's most popular sporting event.", deep: ["The tournament was created by FIFA president Jules Rimet.", "The World Cup is now held every 4 years.", "The 2022 World Cup in Qatar was the most-watched ever.", "Brazil has won the most World Cups (five total)."] } },
  { o: { title: "Woodstock (1969)", yearsAgo: 57, era: "Modern", kid: "In 1969, 400,000 young people gathered on a farm in New York for a music festival called Woodstock! It became a symbol of the 1960s counterculture, peace and love. Jimi Hendrix, Janis Joplin and The Who performed.", fun: "Woodstock was supposed to be a paid festival, but so many came they made it free.", summary: "Woodstock (August 15-18, 1969) was a music festival that became a defining moment of the 1960s counterculture, symbolizing peace, love and music.", deep: ["400,000 people attended — far more than expected.", "Rain turned the farm into a giant mud pit.", "Jimi Hendrix's 'Star-Spangled Banner' was iconic.", "Woodstock became a symbol of a generation."] } },
  { o: { title: "Shakespeare", yearsAgo: 430, era: "Modern", kid: "William Shakespeare wrote plays and poems that are still performed 400 years later! He invented over 1,700 words and created characters like Romeo, Juliet, Hamlet and Macbeth. He's the greatest writer in English!", fun: "Shakespeare invented words like 'eyeball', 'bedroom' and 'swagger'.", summary: "William Shakespeare (1564-1616) wrote 39 plays and 154 sonnets. He is considered the greatest writer in the English language.", deep: ["His plays include Hamlet, Romeo and Juliet, Macbeth and King Lear.", "He invented over 1,700 words still used today.", "The Globe Theatre in London was his main venue.", "His works have been translated into every major language."] } },
  { o: { title: "Beethoven", yearsAgo: 220, era: "Modern", kid: "Ludwig van Beethoven was a musical genius who went deaf but kept composing! His 9th Symphony, with its 'Ode to Joy,' is one of the most famous pieces of music ever written. He changed music forever.", fun: "Beethoven composed his 9th Symphony while completely deaf.", summary: "Ludwig van Beethoven (1770-1827) was a German composer who bridged the Classical and Romantic eras. His 9th Symphony (1824) is a masterpiece.", deep: ["He began losing his hearing in his late 20s.", "The 9th Symphony includes the 'Ode to Joy' chorus.", "His 5th Symphony's opening is the most famous in music.", "He expanded the symphony orchestra and musical form."] } },
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
  let anchorLine = "  {\n    title: " + JSON.stringify(anchor) + ",";
  if (!core.includes(anchorLine)) {
    anchorLine = "  {    title: " + JSON.stringify(anchor) + ",";
  }
  if (!core.includes(anchorLine)) { console.error("anchor not found:", anchor); process.exit(1); }
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
  "Hundred Years' War": "https://en.wikipedia.org/wiki/Hundred_Years%27_War",
  "Napoleonic Wars": "https://en.wikipedia.org/wiki/Napoleonic_Wars",
  "Crimean War": "https://en.wikipedia.org/wiki/Crimean_War",
  "Boer War": "https://en.wikipedia.org/wiki/Second_Boer_War",
  "Russian Civil War": "https://en.wikipedia.org/wiki/Russian_Civil_War",
  "Spanish Civil War": "https://en.wikipedia.org/wiki/Spanish_Civil_War",
  "Arab-Israeli Wars": "https://en.wikipedia.org/wiki/Arab%E2%80%93Israeli_conflict",
  "Falklands War": "https://en.wikipedia.org/wiki/Falklands_War",
  "Judaism": "https://en.wikipedia.org/wiki/Judaism",
  "Counter-Reformation": "https://en.wikipedia.org/wiki/Counter-Reformation",
  "African Union": "https://en.wikipedia.org/wiki/African_Union",
  "ASEAN": "https://en.wikipedia.org/wiki/Association_of_Southeast_Asian_Nations",
  "Arab League": "https://en.wikipedia.org/wiki/Arab_League",
  "Organization of American States": "https://en.wikipedia.org/wiki/Organization_of_American_States",
  "Commonwealth of Nations": "https://en.wikipedia.org/wiki/Commonwealth_of_Nations",
  "Syrian Refugee Crisis": "https://en.wikipedia.org/wiki/Syrian_refugee_crisis",
  "Ukrainian Refugee Crisis": "https://en.wikipedia.org/wiki/Ukrainian_refugee_crisis",
  "Pasteur and Germ Theory": "https://en.wikipedia.org/wiki/Louis_Pasteur",
  "Mendel's Laws of Inheritance": "https://en.wikipedia.org/wiki/Gregor_Mendel",
  "Maxwell's Equations": "https://en.wikipedia.org/wiki/Maxwell%27s_equations",
  "Tesla and AC Power": "https://en.wikipedia.org/wiki/Nikola_Tesla",
  "Sputnik Launches": "https://en.wikipedia.org/wiki/Sputnik_1",
  "Gagarin Orbits Earth": "https://en.wikipedia.org/wiki/Yuri_Gagarin",
  "CRISPR Gene Editing": "https://en.wikipedia.org/wiki/CRISPR",
  "ChatGPT and the AI Revolution": "https://en.wikipedia.org/wiki/ChatGPT",
  "Olympics Revived": "https://en.wikipedia.org/wiki/1896_Summer_Olympics",
  "World Cup First (1930)": "https://en.wikipedia.org/wiki/1930_FIFA_World_Cup",
  "Woodstock (1969)": "https://en.wikipedia.org/wiki/Woodstock",
  "Shakespeare": "https://en.wikipedia.org/wiki/William_Shakespeare",
  "Beethoven": "https://en.wikipedia.org/wiki/Ludwig_van_Beethoven",
};
const lmEntries = Object.entries(lmMap).map(([t, u]) => '    ' + JSON.stringify(t) + ': ' + JSON.stringify(u) + ',\n').join("");
if (core.includes(lmAnchor)) core = core.replace(lmAnchor, lmAnchor + lmEntries);

// CURRICULUM_OVERRIDES
const coAnchor = '    "The Cold War": ["empires & power", "physics & chemistry"],\n';
const coMap = {
  "Hundred Years' War": ["empires & power", "ancient history"],
  "Napoleonic Wars": ["empires & power", "technology & engineering"],
  "Crimean War": ["empires & power", "medicine & health"],
  "Boer War": ["empires & power", "human migration"],
  "Russian Civil War": ["empires & power", "human migration"],
  "Spanish Civil War": ["empires & power", "religion & ethics"],
  "Arab-Israeli Wars": ["empires & power", "human migration"],
  "Falklands War": ["empires & power"],
  "Judaism": ["religion & ethics", "ancient history"],
  "Counter-Reformation": ["religion & ethics", "art & language"],
  "African Union": ["empires & power", "everyday life"],
  "ASEAN": ["empires & power", "everyday life"],
  "Arab League": ["empires & power", "everyday life"],
  "Organization of American States": ["empires & power", "everyday life"],
  "Commonwealth of Nations": ["empires & power", "everyday life"],
  "Syrian Refugee Crisis": ["human migration", "everyday life"],
  "Ukrainian Refugee Crisis": ["human migration", "everyday life"],
  "Pasteur and Germ Theory": ["medicine & health", "physics & chemistry"],
  "Mendel's Laws of Inheritance": ["biology & evolution"],
  "Maxwell's Equations": ["physics & chemistry", "technology & engineering"],
  "Tesla and AC Power": ["technology & engineering", "physics & chemistry"],
  "Sputnik Launches": ["astronomy & space", "technology & engineering"],
  "Gagarin Orbits Earth": ["astronomy & space", "technology & engineering"],
  "CRISPR Gene Editing": ["medicine & health", "biology & evolution"],
  "ChatGPT and the AI Revolution": ["technology & engineering", "physics & chemistry"],
  "Olympics Revived": ["everyday life", "human migration"],
  "World Cup First (1930)": ["everyday life", "human migration"],
  "Woodstock (1969)": ["everyday life", "art & language"],
  "Shakespeare": ["art & language", "ancient history"],
  "Beethoven": ["art & language", "everyday life"],
};
const coEntries = Object.entries(coMap).map(([t, tags]) => '    ' + JSON.stringify(t) + ': ' + JSON.stringify(tags) + ',\n').join("");
if (core.includes(coAnchor)) core = core.replace(coAnchor, coAnchor + coEntries);

fs.writeFileSync(CORE, core);
console.log("added", added, "new milestones");