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
  { o: { title: "Theodore Roosevelt Takes Office", yearsAgo: 125, era: "Modern", kid: "In 1901, Theodore Roosevelt became the youngest president ever at age 42. He busted monopolies, conserved forests, and built the Panama Canal. He was a cowboy, a soldier, and a Nobel Prize winner!", fun: "Roosevelt was blinded in one eye during a boxing match while president.", summary: "Theodore Roosevelt (1858-1919) was the 26th President. He championed progressive reforms, conservation, and the 'Square Deal'. He won the Nobel Peace Prize for mediating the Russo-Japanese War.", deep: ["He established 5 national parks and 150 national forests.", "He broke up monopolies under the Sherman Antitrust Act.", "He negotiated the end of the Russo-Japanese War (1905).", "His 'big stick' diplomacy shaped US foreign policy."] } },
  { o: { title: "Ronald Reagan's Presidency", yearsAgo: 45, era: "Modern", kid: "In 1981, Ronald Reagan became president and promised to make America strong again. He cut taxes, built up the military, and told the Soviet leader to 'tear down this wall!' The Cold War ended soon after.", fun: "Reagan was a Hollywood actor before becoming president.", summary: "Ronald Reagan (1911-2004) was the 40th President. His conservative policies, tax cuts, and military buildup contributed to the end of the Cold War.", deep: ["He survived an assassination attempt in 1981.", "His 'Reaganomics' cut taxes and deregulated industries.", "He and Gorbachev signed the INF Treaty (1987).", "He is credited with helping end the Cold War."] } },
  { o: { title: "Barack Obama Elected", yearsAgo: 17, era: "Modern", kid: "In 2008, Barack Obama became the first Black president of the United States. He passed healthcare reform, ended the Iraq War, and killed Osama bin Laden. 'Yes we can!' became a rallying cry.", fun: "Obama won the Nobel Peace Prize in 2009, just months into his presidency.", summary: "Barack Obama (b. 1961) was the 44th President (2009-2017). He passed the Affordable Care Act, ended the Iraq War, and ordered the raid that killed bin Laden.", deep: ["The ACA expanded health insurance to ~20 million Americans.", "He authorized the raid that killed Osama bin Laden (2011).", "He normalized relations with Cuba after 50 years.", "His presidency marked a historic milestone for racial progress."] } },
  { o: { title: "The Korean War", yearsAgo: 76, era: "Modern", kid: "From 1950 to 1953, North Korea (backed by China and USSR) invaded South Korea (backed by the US and UN). The war ended in a stalemate — the two Koreas are still technically at war today!", fun: "The Korean War is sometimes called 'The Forgotten War'.", summary: "The Korean War (1950-1953) was the first hot conflict of the Cold War. North Korea invaded South Korea; UN forces (led by the US) pushed back. The armistice left Korea divided at the 38th parallel.", deep: ["General MacArthur led UN forces and pushed to the Yalu River.", "China entered the war, pushing UN forces back.", "The armistice (July 1953) never became a peace treaty.", "Over 2.5 million people died, including 36,000 Americans."] } },
  { o: { title: "The Gulf War", yearsAgo: 34, era: "Modern", kid: "In 1990, Iraq invaded Kuwait. A US-led coalition of 35 countries fought back and liberated Kuwait in just 100 hours! It was the first war broadcast live on TV.", fun: "The coalition included countries from six continents.", summary: "The Gulf War (1990-1991) was fought to liberate Kuwait from Iraqi occupation. Operation Desert Storm (January-February 1991) was a decisive coalition victory.", deep: ["Iraq's invasion of Kuwait (August 1990) triggered the war.", "The UN authorized military force to expel Iraq.", "Smart bombs and stealth aircraft were used for the first time.", "The war left Saddam Hussein in power but weakened."] } },
  { o: { title: "Taoism Emerges", yearsAgo: 2499, era: "Civilization", kid: "In ancient China, a wise man named Laozi taught that the best way to live is to go with the flow of nature — like water. His ideas became Taoism, a religion and philosophy that values simplicity, balance and harmony!", fun: "The Tao Te Ching is one of the most translated books in history.", summary: "Taoism (Daoism) emerged in China around the 6th century BCE, attributed to Laozi. It emphasizes living in harmony with the Tao (the Way), wu wei (non-action), and balance (yin/yang).", deep: ["The Tao Te Ching is the foundational text.", "Taoism influenced Chinese medicine, martial arts and art.", "It coexisted and blended with Confucianism and Buddhism.", "Taoist alchemy contributed to Chinese science."] } },
  { o: { title: "Germany Unifies", yearsAgo: 155, era: "Modern", kid: "In 1871, after winning wars against Austria and France, Prussia united all the German states into one country — the German Empire! It became a major power in Europe and set the stage for both World Wars.", fun: "Germany went from 39 separate states to one country in just a few years.", summary: "The German Empire was proclaimed on January 18, 1871, after Prussia defeated France. Otto von Bismarck's 'blood and iron' policy unified Germany under Prussian leadership.", deep: ["The Franco-Prussian War (1870-1871) sealed unification.", "Otto von Bismarck became the first Chancellor of Germany.", "The new empire was a constitutional monarchy under the Kaiser.", "German unification shifted the European balance of power."] } },
  { o: { title: "Meiji Restoration", yearsAgo: 157, era: "Modern", kid: "In 1868, Japan's emperor took back power from the shoguns and rapidly modernized the country. In just 50 years, Japan went from feudal samurai to a modern industrial power that could beat Russia in a war!", fun: "Japan adopted Western technology but kept its culture.", summary: "The Meiji Restoration (1868) ended feudal shogun rule and restored imperial power. Japan rapidly modernized, industrialized, and became a major world power.", deep: ["The Tokugawa shogunate ended after 265 years.", "Japan adopted Western military, legal and educational systems.", "The Sino-Japanese (1894-95) and Russo-Japanese (1904-05) wars proved Japan's power.", "Meiji modernization laid groundwork for Japan's 20th-century role."] } },
  { o: { title: "People's Republic of China", yearsAgo: 75, era: "Modern", kid: "In 1949, after a long civil war, Mao Zedong declared the People's Republic of China. Communist China became the world's most populous country and, after reforms, an economic superpower!", fun: "China's economy grew from one of the poorest to the second-largest in 40 years.", summary: "The People's Republic of China was proclaimed on October 1, 1949, after the Communist victory in the Chinese Civil War. Mao Zedong became chairman.", deep: ["The Chinese Civil War (1927-1949) ended with Communist victory.", "Mao's Great Leap Forward (1958-1962) caused a devastating famine.", "Deng Xiaoping's reforms (1978) opened China's economy.", "China became the world's second-largest economy by 2010."] } },
  { o: { title: "Soviet Union Founded", yearsAgo: 104, era: "Modern", kid: "In 1922, the Soviet Union was created after the Russian Revolution. It became a superpower that lasted 69 years, spreading communism and competing with the US in the Cold War and the space race!", fun: "The USSR covered 1/6 of Earth's land surface.", summary: "The Union of Soviet Socialist Republics (USSR) was formed on December 30, 1922. It became a superpower that shaped 20th-century geopolitics until its collapse in 1991.", deep: ["The Russian Revolution (1917) overthrew the Tsar.", "Lenin led the Bolsheviks to power in Russia.", "Stalin's rule (1924-1953) was marked by purges and industrialization.", "The USSR dissolved on December 26, 1991, ending the Cold War."] } },
  { o: { title: "United Nations Founded", yearsAgo: 81, era: "Modern", kid: "In 1945, after WWII, 51 countries created the United Nations to keep peace and help people. Today 193 countries belong. It's where the world tries to solve big problems together!", fun: "The UN has 6 official languages: Arabic, Chinese, English, French, Russian, Spanish.", summary: "The United Nations was established on October 24, 1945, to promote international cooperation and prevent future conflicts. It succeeded the League of Nations.", deep: ["The UN Charter was signed in San Francisco (June 1945).", "The Security Council has 5 permanent members with veto power.", "UN peacekeepers have served in 70+ missions.", "The UN's Universal Declaration of Human Rights (1948) set global standards."] } },
  { o: { title: "European Union Founded", yearsAgo: 32, era: "Modern", kid: "In 1993, European countries joined together to create the European Union. They share a currency (the euro), open borders, and work together on trade and laws. Over 440 million people live in the EU!", fun: "The EU has 24 official languages.", summary: "The European Union was formally established by the Maastricht Treaty (1993). It evolved from earlier European communities and now includes 27 member states.", deep: ["The Schengen Area allows borderless travel.", "The euro currency is used by 20 of 27 members.", "Brexit (2020) saw the United Kingdom leave the EU.", "The EU won the Nobel Peace Prize in 2012."] } },
  { o: { title: "Hart-Celler Immigration Act", yearsAgo: 61, era: "Modern", kid: "In 1965, the US changed its immigration laws to judge people by their skills and family ties, not by where they came from. This opened the door to millions of immigrants from Asia, Latin America and Africa!", fun: "The act abolished the national origins quota system that had favored Northern Europeans.", summary: "The Immigration and Nationality Act of 1965 (Hart-Celler Act) abolished national origins quotas, leading to increased immigration from Asia, Latin America and Africa.", deep: ["It prioritized family reunification and skilled workers.", "It dramatically changed US demographics over time.", "Asian and Latin American immigration surged after 1965.", "The act is considered one of the most consequential of the 20th century."] } },
  { o: { title: "Pasteur and Germ Theory", yearsAgo: 160, era: "Modern", kid: "In the 1860s, Louis Pasteur proved that tiny germs cause disease, not bad air. He invented pasteurization (heating milk to kill germs) and created vaccines. He saved more lives than almost anyone in history!", fun: "Pasteur also disproved 'spontaneous generation' — the idea that life appears from nothing.", summary: "Louis Pasteur (1822-1895) established germ theory, developed pasteurization, and created vaccines for rabies and anthrax. His work revolutionized medicine and public health.", deep: ["Germ theory replaced miasma theory (bad air).", "Pasteurization heats liquids to kill pathogens.", "His rabies vaccine (1885) was the first for a viral disease.", "Pasteur Institutes worldwide continue his research legacy."] } },
  { o: { title: "Mendel's Laws of Inheritance", yearsAgo: 159, era: "Modern", kid: "In the 1860s, a monk named Gregor Mendel grew pea plants and discovered the rules of heredity — how traits pass from parents to children. His work became the foundation of genetics, though nobody noticed until 1900!", fun: "Mendel's work was ignored for 35 years.", summary: "Gregor Mendel (1822-1884) published his laws of inheritance in 1866, based on pea plant experiments. His work, rediscovered in 1900, founded modern genetics.", deep: ["Mendel identified dominant and recessive traits.", "His laws: segregation and independent assortment.", "He studied 7 traits in ~28,000 pea plants.", "Genetics + Darwin's evolution = the 'modern synthesis.'"] } },
  { o: { title: "Sputnik Launches", yearsAgo: 69, era: "Modern", kid: "In 1957, the Soviet Union launched Sputnik — the first satellite ever! It beeped as it orbited Earth. The US was shocked and rushed to catch up, launching the space race!", fun: "Sputnik's radio signal was detectable by amateur radio operators worldwide.", summary: "Sputnik 1 (October 4, 1957) was the first artificial satellite. It triggered the space race and led to NASA's creation and the Apollo program.", deep: ["Sputnik weighed 83.6 kg and orbited for 3 months.", "The US launched Explorer 1 in January 1958.", "NASA was created in July 1958 to catch up.", "The space race culminated in the Moon landing (1969)."] } },
  { o: { title: "Gagarin Orbits Earth", yearsAgo: 64, era: "Modern", kid: "On April 12, 1961, Yuri Gagarin became the first human in space! He orbited Earth once in 108 minutes. He was 27 years old and said 'Poyekhali!' (Let's go!) as he launched.", fun: "Gagarin's flight lasted 108 minutes; the whole Vostok capsule weighed only 4.7 tons.", summary: "Yuri Gagarin (1934-1968) became the first human in space aboard Vostok 1 on April 12, 1961. His flight lasted 108 minutes and orbited Earth once.", deep: ["The USSR beat the US to the first human in space.", "Alan Shepard became the first American in space 3 weeks later.", "Gagarin died in a plane crash in 1968 at age 34.", "April 12 is celebrated as 'Cosmonautics Day' in Russia."] } },
  { o: { title: "Marshall Plan", yearsAgo: 74, era: "Modern", kid: "After WWII, the US gave billions of dollars to rebuild Europe. Called the Marshall Plan, it helped countries recover from war and stopped communism from spreading. It was one of history's greatest acts of generosity!", fun: "The US gave over $15 billion (about $150 billion today) to 16 European countries.", summary: "The Marshall Plan (1948-1952) provided ~$15 billion to rebuild Western European economies after WWII. It helped prevent communist expansion and laid groundwork for European integration.", deep: ["Named after Secretary of State George Marshall.", "The USSR refused aid and blocked Eastern Bloc countries from accepting.", "It helped create the OECD and the NATO alliance.", "The plan is credited with Europe's postwar economic miracle."] } },
  { o: { title: "Women's Suffrage (US)", yearsAgo: 105, era: "Modern", kid: "In 1920, the US Constitution was amended to give women the right to vote! After decades of protests, marches and hunger strikes, women finally got a voice in democracy. It was a huge victory for equality!", fun: "Some suffragists went to jail and were force-fed during hunger strikes.", summary: "The 19th Amendment (ratified August 18, 1920) granted women the right to vote in the United States, after decades of activism by suffragists.", deep: ["The suffrage movement began at the Seneca Falls Convention (1848).", "Susan B. Anthony and Elizabeth Cady Stanton were key leaders.", "Some states allowed women to vote before the federal amendment.", "The amendment passed by just one vote in Tennessee."] } },
  { o: { title: "Civil Rights Act (1964)", yearsAgo: 62, era: "Modern", kid: "In 1964, after years of protests and marches, the US passed a law that banned discrimination based on race, color, religion, sex, or national origin. Martin Luther King Jr. and others fought hard for this. It was a turning point for equality!", fun: "The bill was filibustered for 60 working days in the Senate.", summary: "The Civil Rights Act of 1964 outlawed discrimination and ended segregation in public places. It was a landmark achievement of the civil rights movement.", deep: ["Martin Luther King Jr.'s 'I Have a Dream' speech (1963) galvanized support.", "President Johnson signed it into law on July 2, 1964.", "The Voting Rights Act (1965) followed, banning racial voting barriers.", "The act laid groundwork for future equality legislation."] } },
  { o: { title: "Magna Carta", yearsAgo: 811, era: "Civilization", kid: "In 1215, angry English barons forced King John to sign a document saying even the king must follow the law! The Magna Carta ('Great Charter') became the foundation of human rights and democracy.", fun: "King John signed it under duress and tried to ignore it afterward.", summary: "The Magna Carta (1215) established that the king was subject to law. It became a foundational document for constitutional government and individual rights.", deep: ["Clause 39 established due process of law.", "It influenced the US Constitution and Bill of Rights.", "Only 4 of the original 63 clauses remain in UK law.", "It was reissued multiple times after John's death."] } },
  { o: { title: "Silent Spring", yearsAgo: 63, era: "Modern", kid: "In 1962, a scientist named Rachel Carson wrote a book showing that pesticides like DDT were killing birds and poisoning nature. Her book woke up the world to environmental dangers and helped start the environmental movement!", fun: "The chemical industry attacked Carson viciously, but she was right.", summary: "Rachel Carson's 'Silent Spring' (1962) exposed the dangers of pesticides, particularly DDT. It sparked the modern environmental movement and led to the EPA and DDT bans.", deep: ["DDT was finally banned in the US in 1972.", "The book led to the creation of the EPA (1970).", "Carson died of cancer in 1964, before seeing the full impact.", "Earth Day (1970) grew from the movement she started."] } },
  { o: { title: "Paris Agreement", yearsAgo: 11, era: "Modern", kid: "In 2015, 195 countries agreed to work together to stop climate change. The Paris Agreement aims to keep global warming below 2°C. It's the biggest international climate deal ever!", fun: "The agreement was negotiated in Paris over two weeks.", summary: "The Paris Agreement (2015) is a legally binding international treaty on climate change. Its goal is to limit global warming to well below 2°C above pre-industrial levels.", deep: ["Countries set their own emission reduction targets (NDCs).", "The US withdrew under Trump (2020) and rejoined under Biden (2021).", "The agreement entered into force on November 4, 2016.", "It builds on the UN Framework Convention on Climate Change (1992)."] } },
  { o: { title: "Olympics Revived", yearsAgo: 130, era: "Modern", kid: "In 1896, the Olympic Games were reborn in Athens, Greece! After 1,500 years, athletes from 14 nations competed. Today the Olympics are the biggest sports event in the world, with billions watching!", fun: "The marathon was created for the 1896 Olympics, inspired by the Greek messenger Pheidippides.", summary: "The first modern Olympic Games were held in Athens in 1896, revived by Pierre de Coubertin. 241 athletes from 14 nations competed in 43 events.", deep: ["Coubertin founded the International Olympic Committee (IOC) in 1894.", "The ancient Olympics ran from 776 BCE to 393 CE.", "The Winter Olympics were added in 1924 in Chamonix.", "The Olympics have been held every 4 years since 1896 (except during wars)."] } },
  { o: { title: "CRISPR Gene Editing", yearsAgo: 14, era: "Modern", kid: "In 2012, scientists figured out how to use a bacterial immune system (CRISPR) to edit DNA precisely. It's like find-and-replace for genes! It could cure genetic diseases, but also raises big ethical questions.", fun: "CRISPR was discovered in bacteria — they use it to fight viruses.", summary: "CRISPR-Cas9 gene editing was developed in 2012 by Jennifer Doudna and Emmanuelle Charpentier. It allows precise editing of DNA and has revolutionized biology and medicine.", deep: ["Doudna and Charpentier won the Nobel Prize in Chemistry (2020).", "CRISPR can correct genetic mutations causing disease.", "It raises ethical concerns about 'designer babies'.", "The first CRISPR-based therapy was approved in 2023."] } },
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

const byAnchor = {};
events.forEach(function (ev) {
  const a = globalAnchor(ev.o.yearsAgo);
  if (!byAnchor[a]) byAnchor[a] = [];
  byAnchor[a].push(ev);
});

for (const anchor of Object.keys(byAnchor)) {
  const anchorLine = "  {\n    title: " + JSON.stringify(anchor) + ",";
  if (!core.includes(anchorLine)) { console.error("anchor not found:", anchor); process.exit(1); }
  const group = byAnchor[anchor].sort(function (a, b) { return b.o.yearsAgo - a.o.yearsAgo; });
  for (const ev of group) {
    core = core.replace(anchorLine, block(ev.o) + "\n" + anchorLine);
    added++;
  }
}

// LEARN_MORE
const lmAnchor = '    "The Second Temple Falls": "https://en.wikipedia.org/wiki/Siege_of_Jerusalem_(70_CE)",\n';
const lmMap = {
  "Theodore Roosevelt Takes Office": "https://en.wikipedia.org/wiki/Theodore_Roosevelt",
  "Ronald Reagan's Presidency": "https://en.wikipedia.org/wiki/Ronald_Reagan",
  "Barack Obama Elected": "https://en.wikipedia.org/wiki/Barack_Obama",
  "The Korean War": "https://en.wikipedia.org/wiki/Korean_War",
  "The Gulf War": "https://en.wikipedia.org/wiki/Gulf_War",
  "Taoism Emerges": "https://en.wikipedia.org/wiki/Taoism",
  "Germany Unifies": "https://en.wikipedia.org/wiki/Unification_of_Germany",
  "Meiji Restoration": "https://en.wikipedia.org/wiki/Emperor_Meiji",
  "People's Republic of China": "https://en.wikipedia.org/wiki/People%27s_Republic_of_China",
  "Soviet Union Founded": "https://en.wikipedia.org/wiki/Soviet_Union",
  "United Nations Founded": "https://en.wikipedia.org/wiki/United_Nations",
  "European Union Founded": "https://en.wikipedia.org/wiki/European_Union",
  "Hart-Celler Immigration Act": "https://en.wikipedia.org/wiki/Immigration_and_Nationality_Act_of_1965",
  "Pasteur and Germ Theory": "https://en.wikipedia.org/wiki/Louis_Pasteur",
  "Mendel's Laws of Inheritance": "https://en.wikipedia.org/wiki/Gregor_Mendel",
  "Sputnik Launches": "https://en.wikipedia.org/wiki/Sputnik_1",
  "Gagarin Orbits Earth": "https://en.wikipedia.org/wiki/Yuri_Gagarin",
  "Marshall Plan": "https://en.wikipedia.org/wiki/Marshall_Plan",
  "Women's Suffrage (US)": "https://en.wikipedia.org/wiki/Nineteenth_Amendment_to_the_United_States_Constitution",
  "Civil Rights Act (1964)": "https://en.wikipedia.org/wiki/Civil_Rights_Act_of_1964",
  "Magna Carta": "https://en.wikipedia.org/wiki/Magna_Carta",
  "Silent Spring": "https://en.wikipedia.org/wiki/Silent_Spring",
  "Paris Agreement": "https://en.wikipedia.org/wiki/Paris_Agreement",
  "Olympics Revived": "https://en.wikipedia.org/wiki/1896_Summer_Olympics",
  "CRISPR Gene Editing": "https://en.wikipedia.org/wiki/CRISPR",
};
const lmEntries = Object.entries(lmMap).map(([t, u]) => '    ' + JSON.stringify(t) + ': ' + JSON.stringify(u) + ',\n').join("");
if (core.includes(lmAnchor)) core = core.replace(lmAnchor, lmAnchor + lmEntries);

// CURRICULUM_OVERRIDES
const coAnchor = '    "The Cold War": ["empires & power", "physics & chemistry"],\n';
const coMap = {
  "Theodore Roosevelt Takes Office": ["empires & power", "everyday life"],
  "Ronald Reagan's Presidency": ["empires & power", "everyday life"],
  "Barack Obama Elected": ["empires & power", "everyday life"],
  "The Korean War": ["empires & power"],
  "The Gulf War": ["empires & power"],
  "Taoism Emerges": ["religion & ethics", "art & language"],
  "Germany Unifies": ["empires & power", "technology & engineering"],
  "Meiji Restoration": ["empires & power", "technology & engineering"],
  "People's Republic of China": ["empires & power", "human migration"],
  "Soviet Union Founded": ["empires & power", "technology & engineering"],
  "United Nations Founded": ["empires & power", "everyday life"],
  "European Union Founded": ["empires & power", "everyday life"],
  "Hart-Celler Immigration Act": ["human migration", "everyday life"],
  "Pasteur and Germ Theory": ["medicine & health", "physics & chemistry"],
  "Mendel's Laws of Inheritance": ["biology & evolution"],
  "Sputnik Launches": ["astronomy & space", "technology & engineering"],
  "Gagarin Orbits Earth": ["astronomy & space", "technology & engineering"],
  "Marshall Plan": ["empires & power", "everyday life"],
  "Women's Suffrage (US)": ["everyday life", "human migration"],
  "Civil Rights Act (1964)": ["everyday life", "religion & ethics"],
  "Magna Carta": ["religion & ethics", "ancient history"],
  "Silent Spring": ["geology & climate", "everyday life"],
  "Paris Agreement": ["geology & climate", "everyday life"],
  "Olympics Revived": ["everyday life", "human migration"],
  "CRISPR Gene Editing": ["medicine & health", "biology & evolution"],
};
const coEntries = Object.entries(coMap).map(([t, tags]) => '    ' + JSON.stringify(t) + ': ' + JSON.stringify(tags) + ',\n').join("");
if (core.includes(coAnchor)) core = core.replace(coAnchor, coAnchor + coEntries);

fs.writeFileSync(CORE, core);
console.log("added", added, "new milestones");