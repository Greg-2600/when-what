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
  { o: { title: "The Cambrian Explosion", yearsAgo: 540000000, era: "Life", kid: "Around 540 million years ago, life suddenly exploded with variety! In just a few million years, almost every type of animal body plan appeared. It was like an evolutionary fireworks show!", fun: "Most animal body plans appeared in a geological instant.", summary: "The Cambrian Explosion (~540 Mya) saw the rapid diversification of animal life. Most major phyla appeared in a relatively short geological period.", deep: ["Trilobites, arthropods and early chordates appeared.", "The Burgess Shale preserves soft-bodied Cambrian organisms.", "Possible causes: oxygen rise, Hox genes, ecological interactions.", "It set the template for all later animal life."] } },
  { o: { title: "The Age of Reptiles", yearsAgo: 310000000, era: "Life", kid: "Around 310 million years ago, reptiles took over the land! They had scaly skin and laid eggs on land, so they didn't need water. They ruled for 250 million years until the dinosaurs came!", fun: "Reptiles were the first vertebrates to fully conquer land.", summary: "The Carboniferous-Permian transition (~310 Mya) saw reptiles diversify and dominate terrestrial ecosystems. They were freed from water dependence.", deep: ["Amniotic eggs allowed reproduction on land.", "Reptiles split into synapsids (mammal ancestors) and sauropsids (reptiles/birds).", "The Permian-Triassic extinction ended many reptile lineages.", "Modern reptiles are descendants of surviving lineages."] } },
  { o: { title: "The First Mammals", yearsAgo: 225000000, era: "Life", kid: "Around 225 million years ago, the first mammals appeared! They were tiny, shrew-like creatures that lived in the shadows of dinosaurs. They survived the dinosaur extinction and eventually gave rise to us!", fun: "Early mammals were nocturnal and had excellent hearing.", summary: "The first true mammals appeared ~225 Mya (Late Triassic). They were small, nocturnal and coexisted with dinosaurs for 160 million years.", deep: ["Mammals evolved from synapsid reptiles over time.", "Key traits: hair, mammary glands, three middle ear bones.", "They remained small during the dinosaur era.", "After the K-Pg extinction, mammals diversified rapidly."] } },
  { o: { title: "The Ice Ages", yearsAgo: 2600000, era: "Life", kid: "Starting 2.6 million years ago, Earth went through repeated ice ages! Massive glaciers covered much of the planet. These climate swings shaped human evolution — our ancestors adapted to survive the cold.", fun: "We are still in an ice age — just in a warm interglacial period.", summary: "The Pleistocene Ice Ages (2.6 Mya-present) featured repeated glacial cycles. These climate fluctuations drove human evolution and migration.", deep: ["Glaciers advanced and retreated ~20 times.", "Sea levels dropped ~120m during glacial maxima.", "Ice ages may have driven brain expansion in humans.", "The last glacial maximum was ~20,000 years ago."] } },
  { o: { title: "Megafauna Extinction", yearsAgo: 13000, era: "Life", kid: "Around 13,000 years ago, giant animals like mammoths, saber-toothed cats and giant sloths went extinct! Was it climate change? Human hunting? Probably both. Their disappearance changed ecosystems forever.", fun: "Mammoths survived on Wrangel Island until 4,000 years ago.", summary: "The late Pleistocene megafauna extinction (~13,000 years ago) eliminated most large mammals in the Americas and Australia. Causes include climate change and human hunting.", deep: ["Mammoths, saber-toothed cats, giant sloths and glyptodons died out.", "Humans arrived in the Americas ~15,000 years ago.", "Climate warming may have stressed populations.", "The extinction reshaped ecosystems and food webs."] } },
  // Humans — more evolution
  { o: { title: "Homo erectus", yearsAgo: 1900000, era: "Humans", kid: "Around 1.9 million years ago, Homo erectus appeared! They were the first human species to walk fully upright, use fire, and leave Africa. They spread across Asia and Europe — the first global humans!", fun: "Homo erectus had a brain twice the size of a chimpanzee's.", summary: "Homo erectus (1.9 Mya-100 kya) was the first hominin to leave Africa, use fire, and have a modern body plan. They persisted for nearly 2 million years.", deep: ["They were the first to use fire consistently.", "Java Man and Peking Man are famous fossils.", "They made Acheulean hand axes for their tools.", "They may have been the first to cook food."] } },
  { o: { title: "Neanderthals", yearsAgo: 400000, era: "Humans", kid: "Neanderthals were our closest relatives! They lived in Europe and Asia for 400,000 years. They were strong, smart, buried their dead, and even made art. We share 1-2% of their DNA!", fun: "Neanderthals had bigger brains than modern humans.", summary: "Neanderthals (Homo neanderthalensis) lived in Europe and western Asia from ~400,000 to 40,000 years ago. They interbred with modern humans.", deep: ["They had larger brains than Homo sapiens.", "They buried their dead and made stone tools.", "Non-African humans have 1-2% Neanderthal DNA.", "They went extinct ~40,000 years ago, possibly due to competition."] } },
  { o: { title: "Denisovans", yearsAgo: 200000, era: "Humans", kid: "Denisovans were a mysterious human species discovered from just a finger bone in a Siberian cave! We know they interbred with our ancestors. People in Tibet and Oceania still carry their DNA!", fun: "We know Denisovans existed from just a few bones and teeth.", summary: "Denisovans are an extinct human species known from DNA found in Denisova Cave (Siberia). They interbred with modern humans, contributing to high-altitude adaptation in Tibetans.", deep: ["Only a few fossils have been found (finger, teeth, skull fragment).", "Denisovan DNA is in modern Melanesians and Tibetans.", "They contributed high-altitude adaptation genes.", "They may have been widespread across Asia."] } },
  { o: { title: "Cave Paintings", yearsAgo: 45000, era: "Humans", kid: "Around 45,000 years ago, humans started painting animals on cave walls! The paintings at Chauvet and Lascaux are incredibly beautiful and detailed. They are humanity's first art!", fun: "Some cave paintings are over 40,000 years old.", summary: "Cave paintings (Chauvet ~32,000 years ago, Lascaux ~17,000 years ago) are humanity's earliest art. They depict animals, handprints and abstract symbols.", deep: ["Chauvet Cave (France) has paintings 32,000 years old.", "Lascaux (France) has 600+ paintings of animals.", "The purpose may have been ritual, hunting magic or storytelling.", "Cave art is found worldwide, including in Indonesia and Australia."] } },
  { o: { title: "The Invention of Clothing", yearsAgo: 170000, era: "Humans", kid: "Around 170,000 years ago, humans started wearing clothes! Before that, we had fur like other animals. Clothes let us survive in cold climates and eventually spread across the whole world.", fun: "The oldest known sewing needle is 50,000 years old.", summary: "Clothing likely emerged ~170,000 years ago, possibly linked to body lice evolution. It enabled human migration into cold climates.", deep: ["Body lice evolved when humans started wearing clothes.", "The oldest sewing needles date to ~50,000 years ago.", "Clothing enabled migration out of Africa.", "Textile production became a major industry."] } },
  // Solar System
  { o: { title: "The Sun is Born", yearsAgo: 4600000000, era: "Solar System", kid: "About 4.6 billion years ago, a cloud of gas and dust collapsed and the Sun ignited! It's been burning ever since, providing light and heat for everything on Earth. The Sun is 99.86% of all mass in the solar system!", fun: "The Sun is 4.6 billion years old and halfway through its life.", summary: "The Sun formed ~4.6 billion years ago from a collapsing molecular cloud. It is a G-type main-sequence star, halfway through its 10-billion-year lifespan.", deep: ["The Sun contains 99.86% of the solar system's mass.", "It fuses 600 million tons of hydrogen per second.", "It will become a red giant in ~5 billion years.", "The Sun's energy drives Earth's climate and life."] } },
  { o: { title: "Mars Rovers", yearsAgo: 29, era: "Modern", kid: "Starting in 1997, NASA sent rovers to Mars! Sojourner, Spirit, Opportunity, Curiosity and Perseverance have explored the Red Planet, looking for signs of ancient life. Perseverance even has a helicopter!", fun: "The Ingenuity helicopter made the first powered flight on another planet.", summary: "Mars rovers (Sojourner 1997, Spirit/Opportunity 2004, Curiosity 2012, Perseverance 2021) have explored Mars, searching for signs of past life.", deep: ["Curiosity found evidence of ancient water on Mars.", "Perseverance is collecting samples for return to Earth.", "Ingenuity made the first powered flight on another planet.", "Mars missions search for biosignatures of past life."] } },
  { o: { title: "Voyager Probes", yearsAgo: 48, era: "Modern", kid: "In 1977, NASA launched Voyager 1 and 2 to explore the outer planets! They visited Jupiter, Saturn, Uranus and Neptune. Voyager 1 is now in interstellar space — the farthest human-made object ever!", fun: "Voyager carries a 'Golden Record' with sounds and images of Earth.", summary: "Voyager 1 and 2 (1977) explored the outer planets and are now in interstellar space. They are the farthest human-made objects.", deep: ["Voyager 1 entered interstellar space in 2012.", "The Golden Record contains greetings in 55 languages.", "Voyager 2 is the only probe to visit Uranus and Neptune.", "They will drift through space for billions of years."] } },
  // Cosmic origins
  { o: { title: "Cosmic Inflation", yearsAgo: 13800000000, era: "Cosmic origins", kid: "In the first tiny fraction of a second after the Big Bang, the universe grew incredibly fast — faster than light! This 'inflation' explains why the universe looks the same in every direction. It's one of the wildest ideas in science!", fun: "Inflation happened in 10^-36 seconds.", summary: "Cosmic inflation (proposed by Alan Guth, 1980) posits that the universe underwent exponential expansion in the first 10^-36 seconds, explaining its uniformity.", deep: ["Inflation solves the 'horizon problem' (why the CMB is uniform).", "It also explains the 'flatness problem' (why space is Euclidean).", "Quantum fluctuations during inflation seeded galaxy formation.", "Evidence: CMB patterns match inflation predictions."] } },
  { o: { title: "Dark Matter", yearsAgo: 13800000000, era: "Cosmic origins", kid: "Most of the universe's mass is invisible! We call it 'dark matter' because we can't see it, but we know it's there because it pulls on galaxies. It makes up about 27% of the universe. Nobody knows what it is!", fun: "Dark matter is 5 times more abundant than normal matter.", summary: "Dark matter is an invisible form of matter that makes up ~27% of the universe. It is detected only through its gravitational effects on galaxies and light.", deep: ["Galaxy rotation curves show missing mass.", "Dark matter doesn't interact with light at all.", "Candidates: WIMPs, axions, primordial black holes.", "It may be an entirely new type of particle."] } },
  { o: { title: "Dark Energy", yearsAgo: 9800000000, era: "Cosmic origins", kid: "The universe isn't just expanding — it's accelerating! Something called 'dark energy' is pushing galaxies apart faster and faster. It makes up 68% of the universe. It's the biggest mystery in cosmology!", fun: "Dark energy was discovered in 1998.", summary: "Dark energy is the mysterious force driving the accelerating expansion of the universe. It makes up ~68% of the universe's energy density.", deep: ["Discovered in 1998 by two teams studying supernovae.", "It may be a cosmological constant (Einstein's 'blunder').", "Alternative: quintessence, a dynamic field.", "It will determine the ultimate fate of the universe."] } },
  // Biblical
  { o: { title: "The Exodus", yearsAgo: 3300, era: "Biblical", kid: "According to the Bible, Moses led the Israelites out of slavery in Egypt! They wandered the desert for 40 years and received the Ten Commandments. Whether history or myth, the Exodus story shaped Judaism, Christianity and Islam.", fun: "The Ten Commandments were given on Mount Sinai.", summary: "The Exodus (~1300 BCE) is the biblical story of Moses leading the Israelites out of Egyptian slavery. It is foundational to Judaism and influenced Christianity and Islam.", deep: ["The Passover festival commemorates the Exodus.", "Archaeological evidence for the Exodus is debated.", "The Ten Commandments form the basis of moral law in Abrahamic religions.", "The story has inspired liberation movements throughout history."] } },
  { o: { title: "King David Reigns", yearsAgo: 3000, era: "Biblical", kid: "Around 1000 BCE, David became king of Israel! He was a shepherd boy who defeated the giant Goliath. He united the tribes, conquered Jerusalem, and his son Solomon built the great Temple. David is a hero in Judaism, Christianity and Islam.", fun: "David wrote many of the Psalms.", summary: "King David (~1000 BCE) united the Israelite tribes and established Jerusalem as the capital. His reign is a golden age in biblical history.", deep: ["David defeated Goliath with a sling and stone.", "He united the northern and southern tribes.", "His son Solomon built the First Temple.", "David is a key figure in Jewish, Christian and Islamic tradition."] } },
  { o: { title: "The Birth of Jesus", yearsAgo: 2026, era: "Biblical", kid: "Around 4 BCE, a baby named Jesus was born in Bethlehem! His teachings about love, forgiveness and helping others became the foundation of Christianity — the world's largest religion, with over 2.4 billion followers.", fun: "Jesus's birth is celebrated as Christmas on December 25.", summary: "Jesus of Nazareth (c. 4 BCE-30 CE) was born in Bethlehem. His teachings became the foundation of Christianity, the world's largest religion.", deep: ["The Nativity story is told in Matthew and Luke.", "Jesus's teachings emphasized love, forgiveness and justice.", "Christianity spread rapidly through the Roman Empire.", "The calendar is based on his birth (BC/AD)."] } },
  { o: { title: "The Crucifixion", yearsAgo: 1996, era: "Biblical", kid: "Around 30 CE, Jesus was crucified by the Romans. His followers said he rose from the dead three days later! This event — the Resurrection — is the central belief of Christianity. It changed the world forever.", fun: "The cross became the symbol of Christianity.", summary: "The crucifixion of Jesus (~30 CE) and the reported resurrection became the central event of Christianity. It transformed a small Jewish sect into a world religion.", deep: ["Crucifixion was a Roman method of execution.", "The Resurrection is the core belief of Christianity.", "Paul's letters spread the message across the Mediterranean.", "Christianity became Rome's state religion in 380 CE (Edict of Thessalonica)."] } },
  { o: { title: "The Second Temple Falls", yearsAgo: 1956, era: "Biblical", kid: "In 70 CE, the Roman army destroyed the Jewish Temple in Jerusalem! This was a catastrophe for Judaism. But the religion survived by focusing on study, prayer and community instead of temple sacrifices.", fun: "The Western Wall in Jerusalem is a remnant of the Temple.", summary: "The Second Temple was destroyed by Rome in 70 CE during the First Jewish-Roman War. It ended temple-based Judaism and shaped rabbinic Judaism.", deep: ["The siege of Jerusalem lasted several months.", "The Temple's destruction is mourned on Tisha B'Av.", "Rabbinic Judaism emerged from the Pharisees.", "The Jewish diaspora expanded after the destruction."] } },
  // World Powers
  { o: { title: "The Mongol Empire", yearsAgo: 803, era: "World Powers", kid: "In 1206, Genghis Khan united the Mongol tribes and conquered the largest land empire in history! His horsemen rode from Korea to Hungary. The Mongols were fierce warriors but also promoted trade and religious tolerance.", fun: "The Mongol Empire was larger than Africa.", summary: "The Mongol Empire (1206-1368) was the largest contiguous land empire in history. Founded by Genghis Khan, it connected East and West through trade and conquest.", deep: ["Genghis Khan united the Mongol tribes in 1206.", "The empire spanned from Korea to Hungary.", "The Pax Mongolica facilitated Silk Road trade.", "The empire split into four khanates after 1260."] } },
  { o: { title: "The British Empire", yearsAgo: 106, era: "World Powers", kid: "At its peak, the British Empire was the largest in history! It ruled a quarter of the world's people and land. 'The sun never sets on the British Empire' was literally true. It shaped global trade, language and law.", fun: "The British Empire covered 24% of Earth's land area.", summary: "The British Empire (16th-20th century) was the largest empire in history. At its peak (1920), it covered 24% of Earth's land and ruled 23% of the population.", deep: ["The empire spanned every continent.", "It spread English, law and institutions worldwide.", "Decolonization (1945-1975) ended the empire.", "The Commonwealth of Nations succeeded it."] } },
  { o: { title: "The Ottoman Empire", yearsAgo: 573, era: "World Powers", kid: "The Ottoman Empire lasted 600 years! From 1299 to 1922, it ruled much of Southeast Europe, the Middle East and North Africa. Istanbul (formerly Constantinople) was its magnificent capital.", fun: "The Ottoman Empire lasted 623 years.", summary: "The Ottoman Empire (1299-1922) was a major power spanning Southeast Europe, the Middle East and North Africa. It fell after WWI.", deep: ["It conquered Constantinople in 1453.", "Suleiman the Magnificent (1520-1566) was its peak.", "The empire declined from the 17th century.", "It was dissolved after WWI (1922)."] } },
  { o: { title: "The Mughal Empire", yearsAgo: 500, era: "World Powers", kid: "The Mughal Empire ruled India from 1526 to 1857! It was rich, powerful and cultured. The Taj Mahal was built by a Mughal emperor. The empire's wealth amazed European visitors.", fun: "The Taj Mahal took 22 years to build.", summary: "The Mughal Empire (1526-1857) ruled most of the Indian subcontinent. It was known for its wealth, architecture (Taj Mahal) and cultural synthesis.", deep: ["Babur founded the empire in 1526.", "Akbar the Great promoted religious tolerance.", "Shah Jahan built the Taj Mahal for his wife.", "The British East India Company took over after 1857."] } },
  { o: { title: "Meiji Japan Industrialises", yearsAgo: 158, era: "World Powers", kid: "In 1868, Japan's emperor took back power from the shoguns and rapidly modernized the country. In just 50 years, Japan went from feudal samurai to a modern industrial power that could beat Russia in a war!", fun: "Japan adopted Western technology but kept its culture.", summary: "The Meiji Restoration (1868) ended feudal shogun rule and restored imperial power. Japan rapidly modernized, industrialized, and became a major world power.", deep: ["The Tokugawa shogunate ended after 265 years.", "Japan adopted Western military, legal and educational systems.", "The Sino-Japanese (1894-95) and Russo-Japanese (1904-05) wars proved Japan's power.", "Meiji modernization laid groundwork for Japan's 20th-century role."] } },
  { o: { title: "China's Economic Miracle", yearsAgo: 48, era: "World Powers", kid: "Starting in 1978, China opened its economy to the world. In 40 years, it went from one of the poorest countries to the second-largest economy! Hundreds of millions of people were lifted out of poverty.", fun: "China's GDP grew 10% per year for 30 years.", summary: "China's economic reforms (1978-present) transformed it from a poor country to the world's second-largest economy, lifting 800 million out of poverty.", deep: ["Deng Xiaoping opened markets in 1978.", "Special Economic Zones attracted foreign investment.", "China joined the WTO in 2001.", "China is now the world's largest manufacturer."] } },
  // Life — more
  { o: { title: "Photosynthesis Evolves", yearsAgo: 3500000000, era: "Life", kid: "Around 3.5 billion years ago, some tiny cells learned the best trick ever: using sunlight as energy! They soaked up light, drank water, and breathed out oxygen. This invention changed the entire planet!", fun: "Photosynthesis produces all the oxygen we breathe.", summary: "Oxygenic photosynthesis evolved ~3.5 billion years ago in cyanobacteria. It transformed Earth's atmosphere and enabled complex life.", deep: ["Cyanobacteria were the first photosynthetic organisms.", "Oxygen was a waste product that accumulated over billions of years.", "The Great Oxidation Event (~2.4 Gya) changed the atmosphere.", "All plants and algae inherited photosynthesis from cyanobacteria."] } },
  { o: { title: "The First Animals", yearsAgo: 600000000, era: "Life", kid: "Around 600 million years ago, the first animals appeared! They were simple — like sponges and jellyfish. But they were the beginning of all animal life, including us! Before this, all life was single-celled.", fun: "The first animals were soft-bodied and left few fossils.", summary: "The first animals (metazoans) appeared ~600 Mya. The Ediacaran biota (~575 Mya) preserves the earliest animal fossils. They were soft-bodied and simple.", deep: ["Sponges are among the simplest animals alive.", "The Ediacaran biota (575-541 Mya) had soft-bodied organisms.", "The Cambrian Explosion (540 Mya) followed rapidly.", "Choanoflagellates are the closest living relatives of animals."] } },
  { o: { title: "Dinosaurs Appear", yearsAgo: 230000000, era: "Life", kid: "Around 230 million years ago, the first dinosaurs appeared! They started small but grew into the biggest land animals ever. They ruled Earth for 165 million years until a space rock ended their reign.", fun: "The first dinosaurs were the size of dogs.", summary: "Dinosaurs first appeared ~230 Mya (Triassic). They diversified and dominated terrestrial ecosystems for 165 million years until the K-Pg extinction (66 Mya).", deep: ["Early dinosaurs were small bipedal predators.", "They split into saurischians and ornithischians.", "The largest (Argentinosaurus) weighed ~70 tons.", "Birds are living dinosaurs."] } },
  { o: { title: "The First Flowers", yearsAgo: 140000000, era: "Life", kid: "Around 140 million years ago, the first flowers bloomed! Flowering plants (angiosperms) were a new invention — they used insects to spread pollen. Today they're the most diverse plant group on Earth!", fun: "Angiosperms make up 90% of all plant species.", summary: "The first flowering plants (angiosperms) appeared ~140 Mya. They co-evolved with pollinators and became the dominant plant group.", deep: ["Angiosperms use flowers and fruits for reproduction.", "They co-evolved with bees, butterflies and birds.", "Grasses (a type of angiosperm) enabled grazing animals.", "Flowering plants include most crops and trees."] } },
  // Galaxies
  { o: { title: "The Cosmic Web", yearsAgo: 13000000000, era: "Galaxies", kid: "Galaxies aren't scattered randomly — they're connected by thin threads of gas and dark matter, like a giant spider web! This 'cosmic web' is the largest structure in the universe.", fun: "The cosmic web is 100 billion light-years across.", summary: "The cosmic web is the large-scale structure of the universe: galaxies clustered along filaments of dark matter and gas, with vast empty voids between.", deep: ["Dark matter forms the scaffolding of the web.", "Galaxies form at the intersections of filaments.", "Voids are enormous empty regions of space.", "The web was mapped by galaxy surveys (SDSS)."] } },
  { o: { title: "Quasars", yearsAgo: 13000000000, era: "Galaxies", kid: "Quasars are the brightest objects in the universe! They're supermassive black holes eating gas, releasing more light than a trillion suns. We can see them from billions of light-years away.", fun: "A quasar can outshine its entire galaxy.", summary: "Quasars (quasi-stellar objects) are extremely luminous active galactic nuclei powered by supermassive black holes accreting matter.", deep: ["Quasars were discovered in the 1960s by radio astronomers.", "They are powered by black holes of billions of solar masses.", "They were more common in the early universe.", "Quasar light reveals the intergalactic medium."] } },
  // Solar System
  { o: { title: "The Asteroid Belt", yearsAgo: 4500000000, era: "Solar System", kid: "Between Mars and Jupiter, there's a belt of millions of rocky asteroids! They're leftover building blocks from the solar system's formation. Some are as big as mountains!", fun: "The asteroid belt contains ~1 million objects over 1 km across.", summary: "The asteroid belt, between Mars and Jupiter, contains millions of rocky bodies. They are remnants from the solar system's formation that never formed a planet.", deep: ["Jupiter's gravity prevented the asteroids from coalescing.", "Ceres is the largest asteroid (dwarf planet).", "Asteroids preserve early solar system material.", "Some asteroids even have their own moons."] } },
  { o: { title: "Saturn's Rings", yearsAgo: 4500000000, era: "Solar System", kid: "Saturn has the most beautiful rings in the solar system! They're made of billions of ice and rock chunks, from dust to house-sized. They're only 30 feet thick but 175,000 miles wide!", fun: "Saturn's rings may be only 100 million years old.", summary: "Saturn's rings are a system of ice and rock particles orbiting Saturn. They are remarkably thin (10-100m) but vast (282,000 km diameter).", deep: ["The rings are composed of 99.9% water ice by mass.", "They may have formed from a shattered moon or comet.", "Saturn has seven main rings labeled A through G.", "The Cassini mission studied the rings in detail (2004-2017)."] } },
  // Future
  { o: { title: "Fusion Energy", yearsAgo: -10, era: "Future", kid: "In the future, we might get energy from fusion — the same process that powers the Sun! It's clean, safe and nearly unlimited. Scientists are working on it now at ITER in France!", fun: "Fusion produces 4 million times more energy than coal per gram.", summary: "Nuclear fusion (fusing hydrogen into helium) could provide clean, abundant energy. ITER (under construction in France) aims to demonstrate fusion power by 2035.", deep: ["Fusion requires temperatures of 100 million °C.", "ITER will produce 500 MW of fusion power.", "Fusion produces no greenhouse gases or long-lived waste.", "Commercial fusion may be available by 2040-2050."] } },
  { o: { title: "Mars Colony", yearsAgo: -15, era: "Future", kid: "In the 2030s, humans might live on Mars! SpaceX and NASA are planning missions to send people to the Red Planet. They'd live in habitats, grow food and explore a new world!", fun: "A Mars day is 24 hours and 37 minutes long.", summary: "NASA and SpaceX plan human missions to Mars in the 2030s. A permanent colony would require life support, radiation shielding and in-situ resource utilization.", deep: ["Mars has only 38% of Earth's gravity (0.38g).", "Radiation on Mars is 2.5x Earth's surface.", "Water ice exists at Mars's poles and underground.", "In-situ resource utilization would produce fuel and oxygen from Martian CO2."] } },
  { o: { title: "Climate Tipping Points", yearsAgo: -5, era: "Future", kid: "Scientists warn that if Earth gets too warm, we might pass 'tipping points' — points of no return. The Amazon could become savanna, ice sheets could collapse, and ocean currents could stop. We need to act now!", fun: "The Amazon rainforest produces 20% of Earth's oxygen.", summary: "Climate tipping points are thresholds beyond which changes become self-sustaining. Examples: Amazon dieback, ice sheet collapse, AMOC shutdown.", deep: ["The Amazon could flip to savanna with 20-25% deforestation.", "West Antarctic Ice Sheet collapse could raise seas 3-4 meters.", "AMOC (Atlantic current) slowdown could cool Europe.", "Tipping points create cascade effects."] } },
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
  "The Cambrian Explosion": "https://en.wikipedia.org/wiki/Burgess_Shale",
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
  "Dark Energy": "https://en.wikipedia.org/wiki/Accelerating_expansion_of_the_universe",
  "The Exodus": "https://en.wikipedia.org/wiki/Moses",
  "King David Reigns": "https://en.wikipedia.org/wiki/David",
  "The Birth of Jesus": "https://en.wikipedia.org/wiki/Nativity_of_Jesus",
  "The Crucifixion": "https://en.wikipedia.org/wiki/Resurrection_of_Jesus",
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
};
const coEntries = Object.entries(coMap).map(([t, tags]) => '    ' + JSON.stringify(t) + ': ' + JSON.stringify(tags) + ',\n').join("");
if (core.includes(coAnchor)) core = core.replace(coAnchor, coAnchor + coEntries);

fs.writeFileSync(CORE, core);
console.log("added", added, "new milestones");