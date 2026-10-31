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
  // Future
  { o: { title: "Lunar Base Established", yearsAgo: -8, era: "Future", kid: "By 2034, humans might have a permanent base on the Moon! Astronauts would live in habitats, mine water ice, and test technologies for Mars. The Moon becomes humanity's first off-world home!", fun: "Water ice at the Moon's poles can be turned into drinking water and rocket fuel.", summary: "A permanent lunar base (planned for the 2030s) would enable long-term human presence on the Moon, resource extraction and preparation for Mars missions.", deep: ["NASA's Artemis program aims for a sustainable lunar presence.", "Water ice in permanently shadowed craters is key.", "The Moon's low gravity makes it a launch platform for Mars.", "International cooperation (Artemis Accords) governs lunar activity."] } },
  { o: { title: "Quantum Computing", yearsAgo: -6, era: "Future", kid: "Quantum computers use the weird rules of quantum physics to solve problems that would take regular computers millions of years! They could crack codes, design drugs and model climate in seconds.", fun: "A quantum computer can be in multiple states at once (superposition).", summary: "Quantum computing (2020s-2030s) uses qubits to solve certain problems exponentially faster than classical computers. Applications include cryptography, drug discovery and optimization.", deep: ["Qubits exploit superposition and entanglement.", "Quantum supremacy was claimed by Google in 2019.", "Error correction is the main technical challenge.", "Quantum computers could break current encryption."] } },
  { o: { title: "Brain-Computer Interfaces", yearsAgo: -12, era: "Future", kid: "In the 2030s, tiny implants in the brain might let paralyzed people control computers with their thoughts! Neuralink and others are developing this. It could also help treat depression, blindness and more.", fun: "The first BCI allowed a paralyzed man to move a cursor with his mind.", summary: "Brain-computer interfaces (BCIs) (2020s-2030s) connect the brain to computers, enabling thought-controlled devices and treating neurological conditions.", deep: ["BCIs read neural signals and translate them to commands.", "Applications: paralysis, blindness, mental health.", "Neuralink, Synchron and others are developing implants.", "Ethical concerns include privacy and enhancement."] } },
  { o: { title: "Longevity Escape Velocity", yearsAgo: -20, era: "Future", kid: "By 2046, scientists might figure out how to stop aging! 'Longevity escape velocity' means we can repair the body faster than it ages. People could live for centuries. It sounds like science fiction, but researchers are working on it!", fun: "Some scientists believe aging is a disease that can be cured.", summary: "Longevity escape velocity (~2040s) is the point where medical advances extend life faster than aging progresses, potentially enabling indefinite lifespans.", deep: ["Research focuses on cellular senescence and telomeres.", "CRISPR and gene therapy target aging mechanisms.", "Ethical and social implications are enormous.", "Life extension raises questions about overpopulation and inequality."] } },
  { o: { title: "Asteroid Mining", yearsAgo: -25, era: "Future", kid: "In the 2050s, companies might mine asteroids for gold, platinum and water! A single asteroid could contain trillions of dollars worth of metals. Space mining could make rare resources abundant.", fun: "One asteroid (16 Psyche) may contain $10 quintillion in metals.", summary: "Asteroid mining (2050s) could extract valuable metals and water from asteroids, potentially transforming the space and terrestrial economies.", deep: ["Water from asteroids could fuel space missions.", "Precious metals could be returned to Earth.", "Legal frameworks (Outer Space Treaty) need updating.", "Companies like Planetary Resources and Deep Space Industries pioneered concepts."] } },
  { o: { title: "Artificial General Intelligence", yearsAgo: -8, era: "Future", kid: "In the 2030s, AI might become as smart as humans in every way — not just chess or math, but everything! AGI could solve problems we can't even imagine, or it could be dangerous. Nobody knows when it will arrive.", fun: "AGI would be able to learn any intellectual task.", summary: "Artificial General Intelligence (AGI) (~2030s) would match or exceed human intelligence across all domains. It is the most consequential technology in development.", deep: ["Current AI is 'narrow' — good at specific tasks.", "AGI would be able to learn and reason generally.", "Alignment problem: ensuring AGI shares human values.", "Timelines range from 2030 to 2070 or never."] } },
  { o: { title: "Space Tourism", yearsAgo: -3, era: "Future", kid: "In the 2020s, rich tourists started flying to space! Companies like SpaceX, Blue Origin and Virgin Galactic offer suborbital and orbital trips. By the 2040s, space hotels might be a thing!", fun: "The first space tourist (Dennis Tito) paid $20 million in 2001.", summary: "Space tourism (2020s-2040s) is becoming commercial. Suborbital flights, orbital hotels and lunar tourism are in development.", deep: ["Virgin Galactic and Blue Origin offer suborbital flights.", "SpaceX's Crew Dragon has carried private astronauts.", "Orbital hotels (Axiom Station) are planned.", "Costs will drop from millions to thousands over decades."] } },
  { o: { title: "Carbon Capture", yearsAgo: -10, era: "Future", kid: "In the 2030s, we might build giant machines that suck CO2 out of the air! Carbon capture could help reverse climate change. But it's expensive and uses lots of energy. We need to plant trees AND build machines!", fun: "One tree absorbs ~22 kg of CO2 per year.", summary: "Direct air capture (DAC) technology (2030s) removes CO2 from the atmosphere. It could help achieve net-zero emissions but faces cost and energy challenges.", deep: ["DAC plants use chemicals to absorb CO2 from air.", "Captured CO2 can be stored underground or used.", "Costs need to drop from $600/ton to $100/ton.", "Nature-based solutions (reforestation) are complementary."] } },
  { o: { title: "Autonomous Vehicles", yearsAgo: -7, era: "Future", kid: "In the 2030s, self-driving cars might be everywhere! They could reduce accidents, traffic and emissions. But there are big challenges: safety, ethics (who to save in a crash?) and regulation.", fun: "A self-driving car can 'see' 360 degrees at once.", summary: "Autonomous vehicles (2030s) use AI and sensors to drive without human input. They promise safer, more efficient transportation.", deep: ["Levels 0-5 of automation; Level 5 is fully autonomous.", "Waymo and Tesla are leading AV developers.", "Ethical dilemmas include the trolley problem in AI.", "Infrastructure (smart roads) may be needed."] } },
  { o: { title: "Synthetic Biology", yearsAgo: -15, era: "Future", kid: "In the 2040s, scientists might design new life forms from scratch! Synthetic biology could create bacteria that eat plastic, produce fuel or make medicine. It's like programming DNA!", fun: "Scientists have already created a synthetic bacterial genome.", summary: "Synthetic biology (2040s) designs and constructs new biological parts and systems. Applications include bioremediation, biofuels and medicine.", deep: ["Craig Venter created the first synthetic bacterial cell (2010).", "DNA synthesis costs have dropped dramatically.", "Applications: plastic-eating bacteria, biofuels.", "Biosafety and biosecurity are major concerns."] } },
  // Cosmic origins
  { o: { title: "The First Galaxies", yearsAgo: 13500000000, era: "Cosmic origins", kid: "Around 13.5 billion years ago, the first galaxies formed! Tiny clumps of dark matter pulled in gas, and the first stars ignited. These galaxies were small and irregular, but they grew into the great spirals we see today.", fun: "The first galaxies were 100-1000 times smaller than the Milky Way.", summary: "The first galaxies formed ~13.5 billion years ago, when dark matter halos accreted gas and triggered star formation. They were small and irregular.", deep: ["JWST has observed galaxies from 300 million years after the Big Bang.", "Early galaxies were metal-poor and small.", "Hierarchical merging built larger galaxies over time.", "The Milky Way formed from many smaller galaxies."] } },
  { o: { title: "The Cosmic Microwave Background", yearsAgo: 13797000000, era: "Cosmic origins", kid: "The CMB is the oldest light in the universe! It was released 380,000 years after the Big Bang, when the fog cleared. It's everywhere — in every direction. It's the afterglow of creation!", fun: "The CMB has a temperature of 2.725 Kelvin.", summary: "The Cosmic Microwave Background (CMB) is the afterglow of the Big Bang, released ~380,000 years after the start. It is the oldest light in the universe.", deep: ["The CMB is uniform to 1 part in 100,000 overall.", "COBE, WMAP and Planck mapped the CMB in detail.", "Its ripples seeded all galaxies and structure.", "It provides our best measurement of the universe's age and composition."] } },
  // Galaxies
  { o: { title: "The Milky Way's Center", yearsAgo: 13600000000, era: "Galaxies", kid: "At the center of our galaxy is a supermassive black hole called Sagittarius A*! It's 4 million times the mass of the Sun. Stars orbit it at incredible speeds. We can't see the black hole, but we can see stars whipping around it!", fun: "Stars near the galactic center orbit at 5,000 km/s.", summary: "Sagittarius A* is the supermassive black hole at the center of the Milky Way. It has a mass of ~4 million suns. Stars orbit it at thousands of km/s.", deep: ["The black hole was imaged by the Event Horizon Telescope (2022).", "Stars orbit it in elliptical paths around the center.", "The black hole is currently quiet (not actively feeding).", "Stellar-mass black holes also exist in the galaxy."] } },
  // Life
  { o: { title: "The Oxygen Revolution", yearsAgo: 2400000000, era: "Life", kid: "Around 2.4 billion years ago, oxygen started filling the atmosphere! Photosynthetic bacteria had been producing it for a billion years, but now it built up. This was a catastrophe for oxygen-hating life, but it enabled complex life!", fun: "The Great Oxidation Event changed the color of rocks.", summary: "The Great Oxidation Event (~2.4 Gya) was when oxygen accumulated in the atmosphere. It caused a mass extinction of anaerobic organisms but enabled aerobic life.", deep: ["Cyanobacteria produced oxygen for ~1 billion years before it accumulated.", "Banded iron formations record the oxygen rise.", "The ozone layer formed, protecting life from UV.", "Eukaryotes (complex cells) evolved after oxygen rose."] } },
  { o: { title: "Multicellular Life", yearsAgo: 600000000, era: "Life", kid: "Around 600 million years ago, cells started sticking together to form multicellular organisms! Instead of being alone, cells could specialize — some for movement, some for eating. This led to all animals, plants and fungi!", fun: "The first multicellular organisms were simple colonies.", summary: "Multicellularity evolved ~600 Mya. Cells began cooperating and specializing, leading to all complex life (animals, plants, fungi).", deep: ["Multicellularity evolved independently multiple times.", "The Ediacaran biota (575 Mya) are the first multicellular fossils.", "Cell differentiation allowed division of labor.", "The Cambrian Explosion followed rapidly after."] } },
  { o: { title: "The First Land Plants", yearsAgo: 470000000, era: "Life", kid: "Around 470 million years ago, plants moved from water to land! They had to solve problems like drying out and standing up. They evolved roots, leaves and seeds. Soon the land was green!", fun: "Early land plants were small and moss-like.", summary: "Land plants (embryophytes) appeared ~470 Mya. They evolved from green algae and colonized terrestrial environments, transforming the landscape.", deep: ["Early plants were small and needed moist environments.", "Vascular tissues (xylem, phloem) enabled larger size.", "Seeds allowed reproduction without water.", "Land plants oxygenated the atmosphere further."] } },
  { o: { title: "The Age of Dinosaurs", yearsAgo: 230000000, era: "Life", kid: "Dinosaurs ruled Earth for 165 million years! From tiny chicken-sized creatures to 100-ton giants, they filled every niche. Birds are living dinosaurs — so dinosaurs aren't really extinct!", fun: "The largest dinosaur (Argentinosaurus) weighed 70 tons.", summary: "Dinosaurs dominated terrestrial ecosystems from ~230 to 66 Mya. They ranged from tiny to the largest land animals ever. Birds are their living descendants.", deep: ["Dinosaurs split into saurischians and ornithischians.", "The largest (Argentinosaurus) weighed ~70 tons.", "Birds evolved from theropod dinosaurs over time.", "The K-Pg extinction ended non-avian dinosaurs 66 Mya."] } },
  // Humans
  { o: { title: "Homo habilis", yearsAgo: 2400000, era: "Humans", kid: "Around 2.4 million years ago, 'Handy Man' appeared! Homo habilis was the first human species to make stone tools. They had bigger brains than earlier hominins and started the stone age.", fun: "Homo habilis tools were called Oldowan tools.", summary: "Homo habilis (2.4-1.4 Mya) was the first hominin species to make stone tools. They had larger brains than Australopithecus.", deep: ["They made simple stone tools (Oldowan) for survival.", "Their brain was ~600cc (vs 400cc for Australopithecus).", "They likely scavenged and gathered food daily.", "They were the first to use tools systematically."] } },
  { o: { title: "Homo sapiens", yearsAgo: 300000, era: "Humans", kid: "Around 300,000 years ago, our species — Homo sapiens — appeared in Africa! We had bigger brains, better tools, and the ability to plan and communicate. We eventually spread across the entire world.", fun: "The oldest Homo sapiens fossil is from Morocco (~300,000 years old).", summary: "Homo sapiens emerged ~300,000 years ago in Africa. We are the only surviving human species, with larger brains and complex language.", deep: ["The oldest fossil is from Jebel Irhoud, Morocco.", "We share 99.9% of our DNA with each other.", "We interbred with Neanderthals and Denisovans.", "We spread out of Africa ~70,000 years ago."] } },
  { o: { title: "The Agricultural Revolution", yearsAgo: 12000, era: "Humans", kid: "Around 12,000 years ago, humans stopped wandering and started farming! They planted seeds, tamed animals, and built villages. This was the biggest change in human history — it led to cities, writing and civilization!", fun: "Agriculture was invented independently in multiple places.", summary: "The Agricultural (Neolithic) Revolution (~12,000 years ago) transformed humans from hunter-gatherers to farmers. It enabled permanent settlements and civilization.", deep: ["Farming began in the Fertile Crescent, China and Mesoamerica.", "Domestication of wheat, rice and maize fed growing populations.", "Permanent settlements led to cities and states.", "Agriculture changed human diet, health and society."] } },
  // Civilization
  { o: { title: "The Wheel", yearsAgo: 5600, era: "Civilization", kid: "Around 3500 BCE, someone in Mesopotamia invented the wheel! First used for pottery, then for carts. The wheel transformed transport, trade and warfare. Almost everything moves on wheels today!", fun: "The wheel was first used for pottery, not transport.", summary: "The wheel was invented ~3500 BCE in Mesopotamia. Originally a potter's wheel, it was adapted for transport, revolutionizing trade and mobility.", deep: ["The oldest wheels are from Mesopotamia and Eastern Europe.", "Carts enabled long-distance trade networks.", "The wheel spread slowly — it took centuries to reach other regions.", "The wheel is fundamental to modern machinery."] } },
  { o: { title: "The First Cities", yearsAgo: 6000, era: "Civilization", kid: "Around 4000 BCE, the first cities appeared! Uruk in Mesopotamia had 50,000 people. Cities meant specialization — some people farmed, others made tools, others ruled. Civilization was born!", fun: "Uruk was the first city with over 10,000 people.", summary: "The first cities (Uruk ~4000 BCE) emerged in Mesopotamia. Urbanization enabled specialization, trade, governance and writing.", deep: ["Uruk had ~50,000 inhabitants at its peak.", "Cities required food surplus from agriculture.", "Specialization led to artisans, priests and rulers.", "Urbanization is the defining feature of civilization."] } },
  { o: { title: "The Bronze Age", yearsAgo: 5000, era: "Civilization", kid: "Around 3000 BCE, people learned to mix copper and tin to make bronze! Bronze tools and weapons were stronger than stone. The Bronze Age brought better farming, warfare and trade.", fun: "Bronze is harder than copper but easier to cast.", summary: "The Bronze Age (~3000 BCE) began when humans learned to alloy copper and tin. Bronze tools and weapons transformed society.", deep: ["Bronze is harder and more durable than pure copper.", "The Bronze Age enabled stronger tools and weapons.", "Trade networks spread tin and copper across regions.", "The Iron Age followed when iron-smelting was mastered."] } },
  { o: { title: "The Iron Age", yearsAgo: 3200, era: "Civilization", kid: "Around 1200 BCE, people learned to make iron tools! Iron was stronger and more common than bronze. Iron weapons changed warfare, and iron tools changed farming. The Iron Age built the ancient empires!", fun: "Iron is the most common element on Earth by mass.", summary: "The Iron Age (~1200 BCE) began when humans mastered iron smelting. Iron tools and weapons were stronger and cheaper than bronze.", deep: ["Iron is more abundant than copper or tin.", "Hittites pioneered iron working ~1500 BCE.", "Iron weapons changed military tactics greatly.", "The Iron Age enabled larger empires and armies."] } },
  // World Powers — more
  { o: { title: "The Persian Empire", yearsAgo: 2548, era: "World Powers", kid: "Around 550 BCE, Cyrus the Great built the Persian Empire — the largest the world had seen! It stretched from India to Greece. The Persians were known for tolerance, roads and the first postal system!", fun: "The Persian Royal Road was 1,600 miles long.", summary: "The Achaemenid (Persian) Empire (550-330 BCE) was the largest empire of its time. Founded by Cyrus the Great, it was known for tolerance and infrastructure.", deep: ["Cyrus conquered Babylon and freed the Jews.", "The Royal Road enabled rapid communication.", "Darius I expanded the empire to its greatest extent.", "Alexander the Great conquered it in 330 BCE."] } },
  { o: { title: "Alexander the Great", yearsAgo: 2356, era: "World Powers", kid: "Alexander the Great conquered most of the known world by age 30! He never lost a battle. He spread Greek culture across Asia, creating the Hellenistic world. He died at 32 and his empire split apart.", fun: "Alexander was tutored by Aristotle.", summary: "Alexander III of Macedon (356-323 BCE) conquered an empire from Greece to India. He spread Hellenistic culture and founded cities (including Alexandria).", deep: ["He never lost a battle in 15 years of campaigning.", "He founded over 20 cities named Alexandria.", "His empire split into Hellenistic kingdoms after his death.", "His conquests spread Greek language and culture."] } },
  { o: { title: "The Roman Empire", yearsAgo: 2053, era: "World Powers", kid: "Rome started as a small city and grew into the greatest empire of the ancient world! At its peak, it ruled 65 million people across 3 continents. Roman roads, laws and language shaped Western civilization for 2,000 years.", fun: "Roman concrete (opus caementicium) is still strong today.", summary: "The Roman Empire (27 BCE-476 CE) was one of history's greatest empires. At its peak, it ruled ~65 million people across 3 continents.", deep: ["Augustus was the first Roman emperor (27 BCE).", "Roman law influenced modern legal systems.", "The empire split into East and West in 395 CE.", "The Western Empire fell in 476 CE; the East (Byzantine) lasted until 1453."] } },
  { o: { title: "The Caliphates", yearsAgo: 1356, era: "World Powers", kid: "After Muhammad died, Islamic empires (caliphates) spread from Spain to India! The Rashidun, Umayyad and Abbasid caliphates created a golden age of science, art and trade. Baghdad became the world's greatest city.", fun: "The Abbasid Caliphate's House of Wisdom translated Greek texts.", summary: "The Islamic caliphates (632-1258 CE) spread Islam and Arabic culture from Spain to India. The Abbasid Caliphate (750-1258) was a golden age of science and learning.", deep: ["The Rashidun Caliphate (632-661) expanded rapidly.", "The Umayyad Caliphate (661-750) reached Spain and India.", "The Abbasid Caliphate (750-1258) was a golden age of learning.", "The Mongols sacked Baghdad in 1258, ending the Abbasids."] } },
  { o: { title: "The Mongol Empire", yearsAgo: 803, era: "World Powers", kid: "In 1206, Genghis Khan united the Mongol tribes and conquered the largest land empire in history! His horsemen rode from Korea to Hungary. The Mongols were fierce warriors but also promoted trade and religious tolerance.", fun: "The Mongol Empire was larger than Africa.", summary: "The Mongol Empire (1206-1368) was the largest contiguous land empire in history. Founded by Genghis Khan, it connected East and West through trade and conquest.", deep: ["Genghis Khan united the Mongol tribes in 1206.", "The empire spanned from Korea to Hungary.", "The Pax Mongolica facilitated Silk Road trade.", "The empire split into four khanates after 1260."] } },
  { o: { title: "The British Empire", yearsAgo: 106, era: "World Powers", kid: "At its peak, the British Empire was the largest in history! It ruled a quarter of the world's people and land. 'The sun never sets on the British Empire' was literally true. It shaped global trade, language and law.", fun: "The British Empire covered 24% of Earth's land area.", summary: "The British Empire (16th-20th century) was the largest empire in history. At its peak (1920), it covered 24% of Earth's land and ruled 23% of the population.", deep: ["The empire spanned every continent.", "It spread English, law and institutions worldwide.", "Decolonization (1945-1975) ended the empire.", "The Commonwealth of Nations succeeded it."] } },
  { o: { title: "The Ottoman Empire", yearsAgo: 573, era: "World Powers", kid: "The Ottoman Empire lasted 600 years! From 1299 to 1922, it ruled much of Southeast Europe, the Middle East and North Africa. Istanbul (formerly Constantinople) was its magnificent capital.", fun: "The Ottoman Empire lasted 623 years.", summary: "The Ottoman Empire (1299-1922) was a major power spanning Southeast Europe, the Middle East and North Africa. It fell after WWI.", deep: ["It conquered Constantinople in 1453.", "Suleiman the Magnificent (1520-1566) was its peak.", "The empire declined from the 17th century.", "It was dissolved after WWI (1922)."] } },
  { o: { title: "The Mughal Empire", yearsAgo: 500, era: "World Powers", kid: "The Mughal Empire ruled India from 1526 to 1857! It was rich, powerful and cultured. The Taj Mahal was built by a Mughal emperor. The empire's wealth amazed European visitors.", fun: "The Taj Mahal took 22 years to build.", summary: "The Mughal Empire (1526-1857) ruled most of the Indian subcontinent. It was known for its wealth, architecture (Taj Mahal) and cultural synthesis.", deep: ["Babur founded the empire in 1526.", "Akbar the Great promoted religious tolerance.", "Shah Jahan built the Taj Mahal for his wife.", "The British East India Company took over after 1857."] } },
  { o: { title: "Meiji Japan Industrialises", yearsAgo: 158, era: "World Powers", kid: "In 1868, Japan's emperor took back power from the shoguns and rapidly modernized the country. In just 50 years, Japan went from feudal samurai to a modern industrial power that could beat Russia in a war!", fun: "Japan adopted Western technology but kept its culture.", summary: "The Meiji Restoration (1868) ended feudal shogun rule and restored imperial power. Japan rapidly modernized, industrialized, and became a major world power.", deep: ["The Tokugawa shogunate ended after 265 years.", "Japan adopted Western military, legal and educational systems.", "The Sino-Japanese (1894-95) and Russo-Japanese (1904-05) wars proved Japan's power.", "Meiji modernization laid groundwork for Japan's 20th-century role."] } },
  { o: { title: "China's Economic Miracle", yearsAgo: 48, era: "World Powers", kid: "Starting in 1978, China opened its economy to the world. In 40 years, it went from one of the poorest countries to the second-largest economy! Hundreds of millions of people were lifted out of poverty.", fun: "China's economy grew 10% per year for 30 years.", summary: "China's economic reforms (1978-present) transformed it from a poor country to the world's second-largest economy, lifting 800 million out of poverty.", deep: ["Deng Xiaoping opened markets in 1978.", "Special Economic Zones attracted foreign investment.", "China joined the WTO in 2001.", "China is now the world's largest manufacturer."] } },
  // Biblical
  { o: { title: "The Exodus", yearsAgo: 3300, era: "Biblical", kid: "According to the Bible, Moses led the Israelites out of slavery in Egypt! They wandered the desert for 40 years and received the Ten Commandments. Whether history or myth, the Exodus story shaped Judaism, Christianity and Islam.", fun: "The Ten Commandments were given on Mount Sinai.", summary: "The Exodus (~1300 BCE) is the biblical story of Moses leading the Israelites out of Egyptian slavery. It is foundational to Judaism and influenced Christianity and Islam.", deep: ["The Passover festival commemorates the Exodus.", "Archaeological evidence for the Exodus is debated.", "The Ten Commandments form the basis of moral law in Abrahamic religions.", "The story has inspired liberation movements throughout history."] } },
  { o: { title: "King David Reigns", yearsAgo: 3000, era: "Biblical", kid: "Around 1000 BCE, David became king of Israel! He was a shepherd boy who defeated the giant Goliath. He united the tribes, conquered Jerusalem, and his son Solomon built the great Temple. David is a hero in Judaism, Christianity and Islam.", fun: "David wrote many of the Psalms.", summary: "King David (~1000 BCE) united the Israelite tribes and established Jerusalem as the capital. His reign is a golden age in biblical history.", deep: ["David defeated Goliath with a sling and stone.", "He united the northern and southern tribes.", "His son Solomon built the First Temple.", "David is a key figure in Jewish, Christian and Islamic tradition."] } },
  { o: { title: "The Birth of Jesus", yearsAgo: 2026, era: "Biblical", kid: "Around 4 BCE, a baby named Jesus was born in Bethlehem! His teachings about love, forgiveness and helping others became the foundation of Christianity — the world's largest religion, with over 2.4 billion followers.", fun: "Jesus's birth is celebrated as Christmas on December 25.", summary: "Jesus of Nazareth (c. 4 BCE-30 CE) was born in Bethlehem. His teachings became the foundation of Christianity, the world's largest religion.", deep: ["The Nativity story is told in Matthew and Luke.", "Jesus's teachings emphasized love, forgiveness and justice.", "Christianity spread rapidly through the Roman Empire.", "The calendar is based on his birth (BC/AD)."] } },
  { o: { title: "The Crucifixion", yearsAgo: 1996, era: "Biblical", kid: "Around 30 CE, Jesus was crucified by the Romans. His followers said he rose from the dead three days later! This event — the Resurrection — is the central belief of Christianity. It changed the world forever.", fun: "The cross became the symbol of Christianity.", summary: "The crucifixion of Jesus (~30 CE) and the reported resurrection became the central event of Christianity. It transformed a small Jewish sect into a world religion.", deep: ["Crucifixion was a Roman method of execution.", "The Resurrection is the core belief of Christianity.", "Paul's letters spread the message across the Mediterranean.", "Christianity became Rome's state religion in 380 CE (Edict of Thessalonica)."] } },
  { o: { title: "The Second Temple Falls", yearsAgo: 1956, era: "Biblical", kid: "In 70 CE, the Roman army destroyed the Jewish Temple in Jerusalem! This was a catastrophe for Judaism. But the religion survived by focusing on study, prayer and community instead of temple sacrifices.", fun: "The Western Wall in Jerusalem is a remnant of the Temple.", summary: "The Second Temple was destroyed by Rome in 70 CE during the First Jewish-Roman War. It ended temple-based Judaism and shaped rabbinic Judaism.", deep: ["The siege of Jerusalem lasted several months.", "The Temple's destruction is mourned on Tisha B'Av.", "Rabbinic Judaism emerged from the Pharisees.", "The Jewish diaspora expanded after the destruction."] } },
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
  "The Cambrian Explosion": "https://en.wikipedia.org/wiki/Cambrian_explosion",
  "The Age of Reptiles": "https://en.wikipedia.org/wiki/Reptile",
  "The First Mammals": "https://en.wikipedia.org/wiki/Mammal",
  "The Ice Ages": "https://en.wikipedia.org/wiki/Ice_age",
  "Megafauna Extinction": "https://en.wikipedia.org/wiki/Quaternary_extinction_event",
  "Homo erectus": "https://en.wikipedia.org/wiki/Homo_erectus",
  "Neanderthals": "https://en.wikipedia.org/wiki/Neanderthal",
  "Denisovans": "https://en.wikipedia.org/wiki/Denisovan",
  "Cave Paintings": "https://en.wikipedia.org/wiki/Cave_painting",
  "The Invention of Clothing": "https://en.wikipedia.org/wiki/Clothing",
  "The Sun is Born": "https://en.wikipedia.org/wiki/Sun",
  "Mars Rovers": "https://en.wikipedia.org/wiki/Mars_rover",
  "Voyager Probes": "https://en.wikipedia.org/wiki/Voyager_program",
  "Cosmic Inflation": "https://en.wikipedia.org/wiki/Inflation_(cosmology)",
  "Dark Matter": "https://en.wikipedia.org/wiki/Dark_matter",
  "Dark Energy": "https://en.wikipedia.org/wiki/Dark_energy",
  "The Exodus": "https://en.wikipedia.org/wiki/The_Exodus",
  "King David Reigns": "https://en.wikipedia.org/wiki/David",
  "The Birth of Jesus": "https://en.wikipedia.org/wiki/Nativity_of_Jesus",
  "The Crucifixion": "https://en.wikipedia.org/wiki/Crucifixion_of_Jesus",
  "The Second Temple Falls": "https://en.wikipedia.org/wiki/Siege_of_Jerusalem_(70_CE)",
  "The Mongol Empire": "https://en.wikipedia.org/wiki/Mongol_Empire",
  "The British Empire": "https://en.wikipedia.org/wiki/British_Empire",
  "The Ottoman Empire": "https://en.wikipedia.org/wiki/Ottoman_Empire",
  "The Mughal Empire": "https://en.wikipedia.org/wiki/Mughal_Empire",
  "Meiji Japan Industrialises": "https://en.wikipedia.org/wiki/Meiji_Restoration",
  "China's Economic Miracle": "https://en.wikipedia.org/wiki/Chinese_economic_reform",
  "Photosynthesis Evolves": "https://en.wikipedia.org/wiki/Photosynthesis",
  "The First Animals": "https://en.wikipedia.org/wiki/Animal",
  "Dinosaurs Appear": "https://en.wikipedia.org/wiki/Dinosaur",
  "The First Flowers": "https://en.wikipedia.org/wiki/Flowering_plant",
  "The Cosmic Web": "https://en.wikipedia.org/wiki/Cosmic_web",
  "Quasars": "https://en.wikipedia.org/wiki/Active_galactic_nucleus",
  "The Asteroid Belt": "https://en.wikipedia.org/wiki/Asteroid_belt",
  "Saturn's Rings": "https://en.wikipedia.org/wiki/Rings_of_Saturn",
  "Fusion Energy": "https://en.wikipedia.org/wiki/ITER",
  "Mars Colony": "https://en.wikipedia.org/wiki/Terraforming_of_Mars",
  "Climate Tipping Points": "https://en.wikipedia.org/wiki/Tipping_points_in_the_climate_system",
  "Lunar Base Established": "https://en.wikipedia.org/wiki/Lunar_base",
  "Quantum Computing": "https://en.wikipedia.org/wiki/Quantum_computing",
  "Brain-Computer Interfaces": "https://en.wikipedia.org/wiki/Brain%E2%80%93computer_interface",
  "Longevity Escape Velocity": "https://en.wikipedia.org/wiki/Longevity_escape_velocity",
  "Artificial General Intelligence": "https://en.wikipedia.org/wiki/Artificial_intelligence",
  "Space Tourism": "https://en.wikipedia.org/wiki/Space_tourism",
  "Asteroid Mining": "https://en.wikipedia.org/wiki/Asteroid_mining",
  "Carbon Capture": "https://en.wikipedia.org/wiki/Carbon_capture_and_storage",
  "Autonomous Vehicles": "https://en.wikipedia.org/wiki/Self-driving_car",
  "Synthetic Biology": "https://en.wikipedia.org/wiki/Synthetic_biology",
  "The Persian Empire": "https://en.wikipedia.org/wiki/Persian_Empire",
  "Alexander the Great": "https://en.wikipedia.org/wiki/Alexander_the_Great",
  "The Roman Empire": "https://en.wikipedia.org/wiki/Ancient_Rome",
  "The Caliphates": "https://en.wikipedia.org/wiki/Caliphate",
  "The First Galaxies": "https://en.wikipedia.org/wiki/Galaxy",
  "The Cosmic Microwave Background": "https://en.wikipedia.org/wiki/Cosmic_microwave_background",
  "The Milky Way's Center": "https://en.wikipedia.org/wiki/Sagittarius_A*",
  "The Oxygen Revolution": "https://en.wikipedia.org/wiki/Oxygen",
  "Multicellular Life": "https://en.wikipedia.org/wiki/Multicellular_organism",
  "The First Land Plants": "https://en.wikipedia.org/wiki/Land_plant",
  "The Age of Dinosaurs": "https://en.wikipedia.org/wiki/Mesozoic",
  "Homo habilis": "https://en.wikipedia.org/wiki/Homo_habilis",
  "Homo sapiens": "https://en.wikipedia.org/wiki/Homo_sapiens",
  "The Agricultural Revolution": "https://en.wikipedia.org/wiki/Agriculture",
  "The Wheel": "https://en.wikipedia.org/wiki/History_of_the_wheel",
  "The First Cities": "https://en.wikipedia.org/wiki/Uruk",
  "The Bronze Age": "https://en.wikipedia.org/wiki/Bronze_Age",
  "The Iron Age": "https://en.wikipedia.org/wiki/Iron_Age",
  "Socrates": "https://en.wikipedia.org/wiki/Socrates",
  "Plato's Academy": "https://en.wikipedia.org/wiki/Platonic_Academy",
  "Aristotle": "https://en.wikipedia.org/wiki/Aristotle",
  "Hippocrates and Medicine": "https://en.wikipedia.org/wiki/Hippocrates",
  "Euclid's Geometry": "https://en.wikipedia.org/wiki/Euclid",
  "Archimedes": "https://en.wikipedia.org/wiki/Archimedes",
  "Julius Caesar": "https://en.wikipedia.org/wiki/Julius_Caesar",
  "Augustus Founds the Empire": "https://en.wikipedia.org/wiki/Augustus",
  "Constantine and Christianity": "https://en.wikipedia.org/wiki/Constantine_the_Great",
  "Justinian's Code": "https://en.wikipedia.org/wiki/Corpus_Juris_Civilis",
  "Confucius": "https://en.wikipedia.org/wiki/Confucius",
  "Qin Shi Huang Unifies China": "https://en.wikipedia.org/wiki/Qin_Shi_Huang",
  "The Han Dynasty": "https://en.wikipedia.org/wiki/Han_dynasty",
  "The Tang Dynasty": "https://en.wikipedia.org/wiki/Tang_dynasty",
  "Ashoka the Great": "https://en.wikipedia.org/wiki/Ashoka",
  "The Gupta Empire": "https://en.wikipedia.org/wiki/Gupta_Empire",
  "Cyrus the Great": "https://en.wikipedia.org/wiki/Cyrus_the_Great",
  "Charlemagne": "https://en.wikipedia.org/wiki/Charlemagne",
  "The Crusades": "https://en.wikipedia.org/wiki/Crusades",
  "The Maya Civilization": "https://en.wikipedia.org/wiki/Maya_civilization",
  "The Aztec Empire": "https://en.wikipedia.org/wiki/Aztec_Empire",
  "The Inca Empire": "https://en.wikipedia.org/wiki/Inca_Empire",
  "The Songhai Empire": "https://en.wikipedia.org/wiki/Songhai_Empire",
  "The Swahili Coast": "https://en.wikipedia.org/wiki/Swahili_coast",
  "The Song Dynasty": "https://en.wikipedia.org/wiki/Song_dynasty",
};
const lmEntries = Object.entries(lmMap).map(([t, u]) => '    ' + JSON.stringify(t) + ': ' + JSON.stringify(u) + ',\n').join("");
if (core.includes(lmAnchor)) core = core.replace(lmAnchor, lmAnchor + lmEntries);

// CURRICULUM_OVERRIDES
const coAnchor = '    "The Cold War": ["empires & power", "physics & chemistry"],\n';
const coMap = {
  "The Cambrian Explosion": ["biology & evolution"],
  "The Age of Reptiles": ["biology & evolution", "geology & climate"],
  "The First Mammals": ["biology & evolution"],
  "The Ice Ages": ["geology & climate", "biology & evolution"],
  "Megafauna Extinction": ["biology & evolution", "geology & climate"],
  "Homo erectus": ["biology & evolution", "human migration"],
  "Neanderthals": ["biology & evolution", "human migration"],
  "Denisovans": ["biology & evolution", "human migration"],
  "Cave Paintings": ["art & language", "everyday life"],
  "The Invention of Clothing": ["everyday life", "human migration"],
  "The Sun is Born": ["astronomy & space", "physics & chemistry"],
  "Mars Rovers": ["astronomy & space", "technology & engineering"],
  "Voyager Probes": ["astronomy & space", "technology & engineering"],
  "Cosmic Inflation": ["astronomy & space", "physics & chemistry"],
  "Dark Matter": ["astronomy & space", "physics & chemistry"],
  "Dark Energy": ["astronomy & space", "physics & chemistry"],
  "The Exodus": ["religion & ethics", "ancient history"],
  "King David Reigns": ["religion & ethics", "ancient history"],
  "The Birth of Jesus": ["religion & ethics", "ancient history"],
  "The Crucifixion": ["religion & ethics", "ancient history"],
  "The Second Temple Falls": ["religion & ethics", "ancient history"],
  "The Mongol Empire": ["empires & power", "human migration"],
  "The British Empire": ["empires & power", "technology & engineering"],
  "The Ottoman Empire": ["empires & power", "technology & engineering"],
  "The Mughal Empire": ["empires & power", "art & language"],
  "Meiji Japan Industrialises": ["empires & power", "technology & engineering"],
  "China's Economic Miracle": ["empires & power", "technology & engineering"],
  "Photosynthesis Evolves": ["biology & evolution", "physics & chemistry"],
  "The First Animals": ["biology & evolution"],
  "Dinosaurs Appear": ["biology & evolution"],
  "The First Flowers": ["biology & evolution", "geology & climate"],
  "The Cosmic Web": ["astronomy & space"],
  "Quasars": ["astronomy & space"],
  "The Asteroid Belt": ["astronomy & space", "geology & climate"],
  "Saturn's Rings": ["astronomy & space"],
  "Fusion Energy": ["physics & chemistry", "technology & engineering"],
  "Mars Colony": ["astronomy & space", "technology & engineering"],
  "Climate Tipping Points": ["geology & climate", "everyday life"],
  "Lunar Base Established": ["astronomy & space", "technology & engineering"],
  "Quantum Computing": ["physics & chemistry", "technology & engineering"],
  "Brain-Computer Interfaces": ["medicine & health", "technology & engineering"],
  "Longevity Escape Velocity": ["medicine & health", "biology & evolution"],
  "Artificial General Intelligence": ["technology & engineering", "physics & chemistry"],
  "Space Tourism": ["astronomy & space", "everyday life"],
  "Asteroid Mining": ["technology & engineering", "astronomy & space"],
  "Carbon Capture": ["geology & climate", "technology & engineering"],
  "Autonomous Vehicles": ["technology & engineering", "everyday life"],
  "Synthetic Biology": ["biology & evolution", "technology & engineering"],
  "The Persian Empire": ["empires & power", "ancient history"],
  "Alexander the Great": ["empires & power", "ancient history"],
  "The Roman Empire": ["empires & power", "technology & engineering"],
  "The Caliphates": ["empires & power", "religion & ethics"],
  "The First Galaxies": ["astronomy & space"],
  "The Cosmic Microwave Background": ["astronomy & space", "physics & chemistry"],
  "The Milky Way's Center": ["astronomy & space"],
  "The Oxygen Revolution": ["biology & evolution", "physics & chemistry"],
  "Multicellular Life": ["biology & evolution"],
  "The First Land Plants": ["biology & evolution", "geology & climate"],
  "The Age of Dinosaurs": ["biology & evolution"],
  "Homo habilis": ["biology & evolution", "technology & engineering"],
  "Homo sapiens": ["biology & evolution", "human migration"],
  "The Agricultural Revolution": ["everyday life", "ancient history"],
  "The Wheel": ["technology & engineering", "everyday life"],
  "The First Cities": ["ancient history", "everyday life"],
  "The Bronze Age": ["technology & engineering", "ancient history"],
  "The Iron Age": ["technology & engineering", "ancient history"],
  "Socrates": ["religion & ethics", "art & language"],
  "Plato's Academy": ["religion & ethics", "art & language"],
  "Aristotle": ["biology & evolution", "art & language"],
  "Hippocrates and Medicine": ["medicine & health", "biology & evolution"],
  "Euclid's Geometry": ["physics & chemistry", "art & language"],
  "Archimedes": ["physics & chemistry", "technology & engineering"],
  "Julius Caesar": ["empires & power", "ancient history"],
  "Augustus Founds the Empire": ["empires & power", "ancient history"],
  "Constantine and Christianity": ["religion & ethics", "empires & power"],
  "Justinian's Code": ["religion & ethics", "empires & power"],
  "Confucius": ["religion & ethics", "art & language"],
  "Qin Shi Huang Unifies China": ["empires & power", "technology & engineering"],
  "The Han Dynasty": ["empires & power", "technology & engineering"],
  "The Tang Dynasty": ["empires & power", "art & language"],
  "Ashoka the Great": ["religion & ethics", "empires & power"],
  "The Gupta Empire": ["religion & ethics", "technology & engineering"],
  "Cyrus the Great": ["empires & power", "religion & ethics"],
  "Charlemagne": ["religion & ethics", "empires & power"],
  "The Crusades": ["religion & ethics", "empires & power"],
  "The Maya Civilization": ["ancient history", "art & language"],
  "The Aztec Empire": ["empires & power", "ancient history"],
  "The Inca Empire": ["empires & power", "technology & engineering"],
  "The Songhai Empire": ["empires & power", "human migration"],
  "The Swahili Coast": ["human migration", "everyday life"],
  "The Song Dynasty": ["technology & engineering", "everyday life"],
};
const coEntries = Object.entries(coMap).map(([t, tags]) => '    ' + JSON.stringify(t) + ': ' + JSON.stringify(tags) + ',\n').join("");
if (core.includes(coAnchor)) core = core.replace(coAnchor, coAnchor + coEntries);

fs.writeFileSync(CORE, core);
console.log("added", added, "new milestones");