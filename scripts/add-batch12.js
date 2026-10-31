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
  // Future — more
  { o: { title: "Space Elevator", yearsAgo: -30, era: "Future", kid: "In the 2050s, we might build a giant cable from Earth to space! A space elevator would make launching things 100x cheaper. No more rockets — just ride the elevator to orbit!", fun: "A space elevator cable would be 35,000 km long.", summary: "A space elevator (2050s) would use a carbon nanotube cable to lift payloads to orbit cheaply. It would revolutionize space access.", deep: ["The cable would extend 35,000 km to geostationary orbit.", "Carbon nanotubes are the strongest known material.", "It would reduce launch costs from $10,000/kg to $100/kg.", "Technical challenges: cable strength, space debris, weather."] } },
  { o: { title: "Terraforming Mars", yearsAgo: -50, era: "Future", kid: "In the 2070s, we might start making Mars more Earth-like! We could warm it up, thicken its atmosphere and add water. It would take centuries, but Mars could become a second home for humanity.", fun: "Terraforming Mars would take hundreds of years.", summary: "Terraforming Mars (2070s+) would involve warming the planet, thickening its atmosphere and creating liquid water. It would take centuries.", deep: ["Releasing CO2 from polar caps could warm Mars.", "The atmosphere would need to be 100x thicker.", "It would require massive energy and resources.", "Ethical debates: should we alter another planet?"] } },
  { o: { title: "Mind Uploading", yearsAgo: -40, era: "Future", kid: "In the 2060s, scientists might figure out how to copy a human brain into a computer! Your memories, personality and consciousness could live forever in digital form. It raises huge questions about identity and soul.", fun: "The human brain has ~86 billion neurons.", summary: "Mind uploading (2060s) would involve scanning and digitizing the brain's neural connections, potentially enabling digital consciousness.", deep: ["The connectome (neural wiring) has ~100 trillion synapses.", "Scanning resolution needs to reach the synaptic level.", "Digital consciousness raises philosophical questions.", "It could enable 'digital immortality' for humans."] } },
  { o: { title: "Universal Basic Income", yearsAgo: -15, era: "Future", kid: "In the 2040s, governments might give everyone a monthly income just for being alive! As AI and robots take jobs, UBI could ensure everyone has enough to live. Some countries are already testing it.", fun: "Finland ran a UBI experiment in 2017-2018.", summary: "Universal Basic Income (UBI) (2040s) would provide a regular, unconditional payment to all citizens. It is proposed as a response to automation-driven job loss.", deep: ["UBI trials have been run in Finland, Kenya and Stockton, CA.", "Proponents: reduces poverty, enables creativity.", "Critics: cost, work disincentive, inflation.", "AI automation may make UBI necessary soon."] } },
  { o: { title: "Space-Based Solar Power", yearsAgo: -25, era: "Future", kid: "In the 2050s, we might put giant solar panels in space! They would collect sunlight 24/7 and beam energy to Earth via microwaves. It could provide unlimited clean energy!", fun: "Space-based solar power was proposed in 1968.", summary: "Space-based solar power (SBSP) (2050s) would collect solar energy in space and beam it to Earth. It provides 24/7 clean energy without atmospheric interference.", deep: ["Solar panels in space receive 8x more sunlight.", "Energy would be beamed via microwave or laser.", "Technical challenges: launch costs, antenna size.", "China and Japan are developing SBSP programs."] } },
  // Life
  { o: { title: "The Cambrian Explosion", yearsAgo: 540000000, era: "Life", kid: "Around 540 million years ago, life suddenly exploded with variety! In just a few million years, almost every type of animal body plan appeared. It was like an evolutionary fireworks show!", fun: "Most animal body plans appeared in a geological instant.", summary: "The Cambrian Explosion (~540 Mya) saw the rapid diversification of animal life. Most major phyla appeared in a relatively short geological period.", deep: ["Trilobites, arthropods and early chordates appeared.", "The Burgess Shale preserves soft-bodied Cambrian organisms.", "Possible causes: oxygen rise, Hox genes, ecological interactions.", "It set the template for all later animal life."] } },
  { o: { title: "The Age of Reptiles", yearsAgo: 310000000, era: "Life", kid: "Around 310 million years ago, reptiles took over the land! They had scaly skin and laid eggs on land, so they didn't need water. They ruled for 250 million years until the dinosaurs came!", fun: "Reptiles were the first vertebrates to fully conquer land.", summary: "The Carboniferous-Permian transition (~310 Mya) saw reptiles diversify and dominate terrestrial ecosystems. They were freed from water dependence.", deep: ["Amniotic eggs allowed reproduction on land.", "Reptiles split into synapsids (mammal ancestors) and sauropsids (reptiles/birds).", "The Permian-Triassic extinction ended many reptile lineages.", "Modern reptiles are descendants of surviving lineages."] } },
  { o: { title: "The Permian Extinction", yearsAgo: 252000000, era: "Life", kid: "Around 252 million years ago, the worst extinction ever happened! 96% of marine species and 70% of land species died. Volcanic eruptions in Siberia changed the climate. Life almost ended — but some survivors rebuilt!", fun: "It's called 'The Great Dying' — the worst extinction ever.", summary: "The Permian-Triassic extinction (252 Mya) was the most severe extinction event. ~96% of marine species and 70% of terrestrial species died.", deep: ["Siberian Traps volcanic eruptions caused climate change.", "Ocean acidification and anoxia killed marine life.", "Only about 4% of marine species survived.", "The extinction cleared the way for the age of reptiles and dinosaurs."] } },
  { o: { title: "The First Primates", yearsAgo: 55000000, era: "Life", kid: "Around 55 million years ago, the first primates appeared! They were small, tree-dwelling creatures with grasping hands and big eyes. They were our distant ancestors — the beginning of the line that led to monkeys, apes and humans!", fun: "Early primates were the size of mice.", summary: "The first primates appeared ~55 Mya. They were small, arboreal mammals with grasping hands and forward-facing eyes. They were our distant ancestors.", deep: ["Primates evolved from small, insect-eating mammals.", "Key traits: grasping hands, forward-facing eyes, large brains.", "They split into strepsirrhines (lemurs) and haplorhines (monkeys/apes).", "All primates share a common ancestor ~55-65 Mya."] } },
  // Humans
  { o: { title: "Australopithecus", yearsAgo: 4000000, era: "Humans", kid: "Around 4 million years ago, Australopithecus walked upright in Africa! They were small (3-4 feet tall) with small brains, but they could walk on two legs. Lucy is the most famous fossil — she changed our understanding of human evolution!", fun: "Lucy was only 3.5 feet tall and weighed 65 pounds.", summary: "Australopithecus (4-2 Mya) was an early hominin that walked upright. 'Lucy' (A. afarensis, 3.2 Mya) is the most famous fossil.", deep: ["Lucy was discovered in Ethiopia in 1974 by Johanson.", "They walked upright but had small brains (~400cc).", "They lived in savannas and ate plants and fruits.", "They are ancestors of the genus Homo (humans)."] } },
  { o: { title: "The First Language", yearsAgo: 100000, era: "Humans", kid: "Around 100,000 years ago, humans started talking! Language let us share ideas, tell stories and plan together. It's the most powerful tool ever invented — more than any machine. Language made us human!", fun: "No one knows exactly when language evolved.", summary: "Language likely emerged ~100,000 years ago. It enabled complex cooperation, storytelling and cultural transmission. It is humanity's greatest tool.", deep: ["Language required brain changes and vocal tract adaptations.", "Proto-language may have been gestural at first.", "Language enabled cumulative culture to grow.", "All modern languages share a common origin."] } },
  { o: { title: "The First Art", yearsAgo: 45000, era: "Humans", kid: "Around 45,000 years ago, humans started making art! Cave paintings, carved figurines and jewelry appeared. Art shows we could imagine things that didn't exist — a huge leap in human thinking!", fun: "The oldest cave painting is 45,500 years old (Indonesia).", summary: "The first art (~45,000 years ago) includes cave paintings, figurines and jewelry. It marks the emergence of symbolic thinking.", deep: ["Chauvet Cave (France) has 32,000-year-old paintings.", "The Lion-man of Hohlenstein-Stadel is 40,000 years old.", "Art may have been used for ritual or communication.", "Symbolic thinking is unique to Homo sapiens."] } },
  // Solar System
  { o: { title: "Jupiter's Moons", yearsAgo: 4500000000, era: "Solar System", kid: "Jupiter has 95 known moons! The four biggest — Io, Europa, Ganymede and Callisto — were discovered by Galileo in 1610. Europa might have an ocean under its ice, and life could exist there!", fun: "Ganymede is the largest moon in the solar system.", summary: "Jupiter's four Galilean moons (Io, Europa, Ganymede, Callisto) were discovered in 1610. Europa may harbor a subsurface ocean.", deep: ["Europa's ocean may contain more water than Earth's oceans.", "Io is the most volcanically active body in the solar system.", "Ganymede is larger than the planet Mercury.", "NASA's Europa Clipper mission launched in 2024."] } },
  { o: { title: "Saturn's Titan", yearsAgo: 4500000000, era: "Solar System", kid: "Titan is Saturn's largest moon — and it's amazing! It has lakes of liquid methane, a thick atmosphere, and weather. It's the only moon with a dense atmosphere. It's like Earth but made of different stuff!", fun: "Titan's lakes are made of liquid methane, not water.", summary: "Titan is Saturn's largest moon. It has a dense nitrogen atmosphere, liquid methane lakes and a complex organic chemistry.", deep: ["Titan is the only moon with a thick atmosphere.", "Its surface temperature is -180°C on average.", "The Huygens probe landed on Titan in 2005.", "Titan's chemistry resembles early Earth's own."] } },
  { o: { title: "The Kuiper Belt", yearsAgo: 4500000000, era: "Solar System", kid: "Beyond Neptune, there's a belt of icy objects called the Kuiper Belt! It contains Pluto and millions of other icy bodies. It's the source of short-period comets. It's like the asteroid belt's cold cousin!", fun: "Pluto is the largest known Kuiper Belt object.", summary: "The Kuiper Belt is a region beyond Neptune containing icy bodies, including Pluto. It is the source of short-period comets.", deep: ["The Kuiper Belt extends from 30 to 55 AU.", "Pluto was reclassified as a dwarf planet in 2006.", "New Horizons visited Pluto in 2015 up close.", "The Kuiper Belt is a remnant of the solar system's formation."] } },
  // Cosmic origins
  { o: { title: "Big Bang Nucleosynthesis", yearsAgo: 13800000000, era: "Cosmic origins", kid: "In the first few minutes after the Big Bang, the universe was so hot that hydrogen fused into helium! This created the first elements. Everything heavier was made later, inside stars.", fun: "The universe is 75% hydrogen and 25% helium by mass.", summary: "Big Bang nucleosynthesis (first 3-20 minutes) produced hydrogen, helium and trace lithium. Heavier elements were made later in stars.", deep: ["The universe is ~75% hydrogen, ~25% helium by mass.", "Only H, He and trace Li were made in the Big Bang.", "Carbon, oxygen and iron were made in stars.", "The predicted abundances match observations precisely."] } },
  { o: { title: "The First Molecules", yearsAgo: 13700000000, era: "Cosmic origins", kid: "Around 380,000 years after the Big Bang, the first molecules formed! Hydrogen atoms combined to make molecular hydrogen (H2). These tiny molecules were the building blocks for the first stars!", fun: "Molecular hydrogen is the simplest and most abundant molecule.", summary: "The first molecules (H2) formed ~380,000 years after the Big Bang, when the universe cooled enough for atoms to combine. They were the building blocks for stars.", deep: ["Molecular hydrogen (H2) is the simplest molecule.", "It enabled the formation of the first stars.", "Other molecules (HD, LiH) formed shortly after.", "Molecules are now abundant throughout the universe."] } },
  // Galaxies
  { o: { title: "Supernovae", yearsAgo: 13600000000, era: "Galaxies", kid: "When massive stars die, they explode as supernovae! These explosions are so bright they can outshine entire galaxies. They create heavy elements like gold and uranium, and spread them across space.", fun: "A supernova can release more energy in seconds than the Sun in its lifetime.", summary: "Supernovae are explosive deaths of massive stars. They create heavy elements (gold, uranium) and distribute them across the galaxy.", deep: ["Type II supernovae occur when massive stars collapse.", "Type Ia supernovae are used as 'standard candles' to measure distance.", "Supernova remnants (Crab Nebula) are observable.", "Heavy elements in your body came from supernovae."] } },
  { o: { title: "Black Holes", yearsAgo: 13600000000, era: "Galaxies", kid: "Black holes are places where gravity is so strong that not even light can escape! They form when massive stars collapse. Supermassive black holes live at the center of galaxies, including our own!", fun: "The first black hole image was taken in 2019.", summary: "Black holes are regions of spacetime where gravity prevents anything, including light, from escaping. They form from collapsed massive stars or grow to supermassive size.", deep: ["Stellar black holes form from collapsed massive stars.", "Supermassive black holes (millions/billions of solar masses) exist at galaxy centers.", "The Event Horizon Telescope imaged M87* (2019) and Sgr A* (2022).", "Black holes can be detected by their gravitational effects."] } },
  // World Powers
  { o: { title: "The Persian Empire", yearsAgo: 2548, era: "World Powers", kid: "Around 550 BCE, Cyrus the Great built the Persian Empire — the largest the world had seen! It stretched from India to Greece. The Persians were known for tolerance, roads and the first postal system!", fun: "The Persian Royal Road was 1,600 miles long.", summary: "The Achaemenid (Persian) Empire (550-330 BCE) was the largest empire of its time. Founded by Cyrus the Great, it was known for tolerance and infrastructure.", deep: ["Cyrus conquered Babylon and freed the Jews.", "The Royal Road enabled rapid communication.", "Darius I expanded the empire to its greatest extent.", "Alexander the Great conquered it in 330 BCE."] } },
  { o: { title: "Alexander the Great", yearsAgo: 2356, era: "World Powers", kid: "Alexander the Great conquered most of the known world by age 30! He never lost a battle. He spread Greek culture across Asia, creating the Hellenistic world. He died at 32 and his empire split apart.", fun: "Alexander was tutored by Aristotle.", summary: "Alexander III of Macedon (356-323 BCE) conquered an empire from Greece to India. He spread Hellenistic culture and founded cities (including Alexandria).", deep: ["He never lost a battle in 15 years of campaigning.", "He founded over 20 cities named Alexandria.", "His empire split into Hellenistic kingdoms after his death.", "His conquests spread Greek language and culture."] } },
  { o: { title: "The Roman Empire", yearsAgo: 2053, era: "World Powers", kid: "Rome started as a small city and grew into the greatest empire of the ancient world! At its peak, it ruled 65 million people across 3 continents. Roman roads, laws and language shaped Western civilization for 2,000 years.", fun: "Roman concrete (opus caementicium) is still strong today.", summary: "The Roman Empire (27 BCE-476 CE) was one of history's greatest empires. At its peak, it ruled ~65 million people across 3 continents.", deep: ["Augustus was the first emperor (27 BCE).", "Roman law influenced modern legal systems.", "The empire split into East and West in 395 CE.", "The Western Empire fell in 476 CE; the East (Byzantine) lasted until 1453."] } },
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
  // Future
  { o: { title: "Fusion Energy", yearsAgo: -10, era: "Future", kid: "In the future, we might get energy from fusion — the same process that powers the Sun! It's clean, safe and nearly unlimited. Scientists are working on it now at ITER in France!", fun: "Fusion produces 4 million times more energy than coal per gram.", summary: "Nuclear fusion (fusing hydrogen into helium) could provide clean, abundant energy. ITER (under construction in France) aims to demonstrate fusion power by 2035.", deep: ["Fusion requires temperatures of 100 million °C.", "ITER will produce 500 MW of fusion power.", "Fusion produces no greenhouse gases or long-lived waste.", "Commercial fusion may be available by 2040-2050."] } },
  { o: { title: "Mars Colony", yearsAgo: -15, era: "Future", kid: "In the 2030s, humans might live on Mars! SpaceX and NASA are planning missions to send people to the Red Planet. They'd live in habitats, grow food and explore a new world!", fun: "A Mars day is 24 hours and 37 minutes long.", summary: "A permanent Mars colony (2030s-2040s) would require life support, radiation shielding and in-situ resource utilization. SpaceX and NASA are developing plans.", deep: ["Mars has 38% of Earth's gravity.", "Radiation on Mars is 2.5x Earth's surface.", "Water ice exists at Mars's poles and underground.", "In-situ resource utilization would produce fuel and oxygen from Martian CO2."] } },
  { o: { title: "Climate Tipping Points", yearsAgo: -5, era: "Future", kid: "Scientists warn that if Earth gets too warm, we might pass 'tipping points' — points of no return. The Amazon could become savanna, ice sheets could collapse, and ocean currents could stop. We need to act now!", fun: "The Amazon rainforest produces 20% of Earth's oxygen.", summary: "Climate tipping points are thresholds beyond which changes become self-sustaining. Examples: Amazon dieback, ice sheet collapse, AMOC shutdown.", deep: ["The Amazon could flip to savanna with 20-25% deforestation.", "West Antarctic Ice Sheet collapse could raise seas 3-4 meters.", "AMOC (Atlantic current) slowdown could cool Europe.", "Tipping points create cascade effects."] } },
  { o: { title: "Lunar Base Established", yearsAgo: -8, era: "Future", kid: "By 2034, humans might have a permanent base on the Moon! Astronauts would live in habitats, mine water ice, and test technologies for Mars. The Moon becomes humanity's first off-world home!", fun: "Water ice at the Moon's poles can be turned into drinking water and rocket fuel.", summary: "A permanent lunar base (planned for the 2030s) would enable long-term human presence on the Moon, resource extraction and preparation for Mars missions.", deep: ["NASA's Artemis program aims for a sustainable lunar presence.", "Water ice in permanently shadowed craters is key.", "The Moon's low gravity makes it a launch platform for Mars.", "International cooperation (Artemis Accords) governs lunar activity."] } },
  { o: { title: "Quantum Computing", yearsAgo: -6, era: "Future", kid: "Quantum computers use the weird rules of quantum physics to solve problems that would take regular computers millions of years! They could crack codes, design drugs and model climate in seconds.", fun: "A quantum computer can be in multiple states at once (superposition).", summary: "Quantum computing (2020s-2030s) uses qubits to solve certain problems exponentially faster than classical computers. Applications include cryptography, drug discovery and optimization.", deep: ["Qubits exploit superposition and entanglement.", "Quantum supremacy was claimed by Google in 2019.", "Error correction is the main technical challenge.", "Quantum computers could break current encryption."] } },
  { o: { title: "Brain-Computer Interfaces", yearsAgo: -12, era: "Future", kid: "In the 2030s, tiny implants in the brain might let paralyzed people control computers with their thoughts! Neuralink and others are developing this. It could also help treat depression, blindness and more.", fun: "The first BCI allowed a paralyzed man to move a cursor with his mind.", summary: "Brain-computer interfaces (BCIs) (2020s-2030s) connect the brain to computers, enabling thought-controlled devices and treating neurological conditions.", deep: ["BCIs read neural signals and translate them to commands.", "Applications: paralysis, blindness, mental health.", "Neuralink, Synchron and others are developing implants.", "Ethical concerns include privacy and enhancement."] } },
  { o: { title: "Longevity Escape Velocity", yearsAgo: -20, era: "Future", kid: "By 2046, scientists might figure out how to stop aging! 'Longevity escape velocity' means we can repair the body faster than it ages. People could live for centuries. It sounds like science fiction, but researchers are working on it!", fun: "Some scientists believe aging is a disease that can be cured.", summary: "Longevity escape velocity (~2040s) is the point where medical advances extend life faster than aging progresses, potentially enabling indefinite lifespans.", deep: ["Research focuses on cellular senescence and telomeres.", "CRISPR and gene therapy target aging mechanisms.", "Ethical and social implications are enormous.", "Life extension raises questions about overpopulation and inequality."] } },
  { o: { title: "Asteroid Mining", yearsAgo: -25, era: "Future", kid: "In the 2050s, companies might mine asteroids for gold, platinum and water! A single asteroid could contain trillions of dollars worth of metals. Space mining could make rare resources abundant.", fun: "One asteroid (16 Psyche) may contain $10 quintillion in metals.", summary: "Asteroid mining (2050s) could extract valuable metals and water from asteroids, potentially transforming the space and terrestrial economies.", deep: ["Water from asteroids could fuel space missions.", "Precious metals could be returned to Earth.", "Legal frameworks (Outer Space Treaty) need updating.", "Companies like Planetary Resources pioneered concepts."] } },
  { o: { title: "Artificial General Intelligence", yearsAgo: -8, era: "Future", kid: "In the 2030s, AI might become as smart as humans in every way — not just chess or math, but everything! AGI could solve problems we can't even imagine, or it could be dangerous. Nobody knows when it will arrive.", fun: "AGI would be able to learn any intellectual task.", summary: "Artificial General Intelligence (AGI) (~2030s) would match or exceed human intelligence across all domains. It is the most consequential technology in development.", deep: ["Current AI is 'narrow' — good at specific tasks.", "AGI would be able to learn and reason generally.", "Alignment problem: ensuring AGI shares human values.", "Timelines range from 2030 to 2070 or never."] } },
  { o: { title: "Space Tourism", yearsAgo: -3, era: "Future", kid: "In the 2020s, rich tourists started flying to space! Companies like SpaceX, Blue Origin and Virgin Galactic offer suborbital and orbital trips. By the 2040s, space hotels might be a thing!", fun: "The first space tourist (Dennis Tito) paid $20 million in 2001.", summary: "Space tourism (2020s-2040s) is becoming commercial. Suborbital flights, orbital hotels and lunar tourism are in development.", deep: ["Virgin Galactic and Blue Origin offer suborbital flights.", "SpaceX's Crew Dragon has carried private astronauts.", "Orbital hotels (Axiom Station) are planned.", "Costs will drop from millions to thousands over decades."] } },
  { o: { title: "Carbon Capture", yearsAgo: -10, era: "Future", kid: "In the 2030s, we might build giant machines that suck CO2 out of the air! Carbon capture could help reverse climate change. But it's expensive and uses lots of energy. We need to plant trees AND build machines!", fun: "One tree absorbs ~22 kg of CO2 per year.", summary: "Direct air capture (DAC) technology (2030s) removes CO2 from the atmosphere. It could help achieve net-zero emissions but faces cost and energy challenges.", deep: ["DAC plants use chemicals to absorb CO2 from air.", "Captured CO2 can be stored underground or used.", "Costs need to drop from $600/ton to $100/ton.", "Nature-based solutions (reforestation) are complementary."] } },
  { o: { title: "Autonomous Vehicles", yearsAgo: -7, era: "Future", kid: "In the 2030s, self-driving cars might be everywhere! They could reduce accidents, traffic and emissions. But there are big challenges: safety, ethics (who to save in a crash?) and regulation.", fun: "A self-driving car can 'see' 360 degrees at once.", summary: "Autonomous vehicles (2030s) use AI and sensors to drive without human input. They promise safer, more efficient transportation.", deep: ["Levels 0-5 of automation; Level 5 is fully autonomous.", "Waymo and Tesla are leading AV developers.", "Ethical dilemmas include the trolley problem in AI.", "Infrastructure (smart roads) may be needed."] } },
  { o: { title: "Synthetic Biology", yearsAgo: -15, era: "Future", kid: "In the 2040s, scientists might design new life forms from scratch! Synthetic biology could create bacteria that eat plastic, produce fuel or make medicine. It's like programming DNA!", fun: "Scientists have already created a synthetic bacterial genome.", summary: "Synthetic biology (2040s) designs and constructs new biological parts and systems. Applications include bioremediation, biofuels and medicine.", deep: ["Craig Venter created the first synthetic bacterial cell (2010).", "DNA synthesis costs have dropped dramatically.", "Applications: plastic-eating bacteria, biofuels.", "Biosafety and biosecurity are major concerns."] } },
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
  "The First Fish": "https://en.wikipedia.org/wiki/Fish",
  "Plants Conquer Land": "https://en.wikipedia.org/wiki/Terrestrial_plant",
  "The First Reptiles": "https://en.wikipedia.org/wiki/Amniote",
  "The First Birds": "https://en.wikipedia.org/wiki/Bird",
  "The First Whales": "https://en.wikipedia.org/wiki/Cetacea",
  "Homo habilis": "https://en.wikipedia.org/wiki/Homo_habilis",
  "Homo sapiens": "https://en.wikipedia.org/wiki/Homo_sapiens",
  "The Agricultural Revolution": "https://en.wikipedia.org/wiki/Neolithic_Revolution",
  "The Sun is Born": "https://en.wikipedia.org/wiki/Sun",
  "Mars Rovers": "https://en.wikipedia.org/wiki/Mars_rover",
  "Voyager Probes": "https://en.wikipedia.org/wiki/Voyager_program",
  "The First Galaxies": "https://en.wikipedia.org/wiki/Galaxy",
  "The Cosmic Microwave Background": "https://en.wikipedia.org/wiki/Cosmic_microwave_background",
  "The Milky Way's Center": "https://en.wikipedia.org/wiki/Sagittarius_A*",
  "The Oxygen Revolution": "https://en.wikipedia.org/wiki/Oxygen",
  "Multicellular Life": "https://en.wikipedia.org/wiki/Multicellular_organism",
  "The First Land Plants": "https://en.wikipedia.org/wiki/Land_plant",
  "The Age of Dinosaurs": "https://en.wikipedia.org/wiki/Mesozoic",
  "The First Land Animals": "https://en.wikipedia.org/wiki/Tetrapod",
  "The Age of Insects": "https://en.wikipedia.org/wiki/Insect",
  "The First Forests": "https://en.wikipedia.org/wiki/Forest",
  "The Permian Extinction": "https://en.wikipedia.org/wiki/Permian",
  "The First Primates": "https://en.wikipedia.org/wiki/Primate",
  "Australopithecus": "https://en.wikipedia.org/wiki/Australopithecus",
  "The First Language": "https://en.wikipedia.org/wiki/Origin_of_language",
  "The First Art": "https://en.wikipedia.org/wiki/Prehistoric_art",
  "Jupiter's Moons": "https://en.wikipedia.org/wiki/Galilean_moons",
  "Saturn's Titan": "https://en.wikipedia.org/wiki/Titan_(moon)",
  "The Kuiper Belt": "https://en.wikipedia.org/wiki/Kuiper_belt",
  "Big Bang Nucleosynthesis": "https://en.wikipedia.org/wiki/Big_Bang_nucleosynthesis",
  "The First Molecules": "https://en.wikipedia.org/wiki/Molecule",
  "Supernovae": "https://en.wikipedia.org/wiki/Supernova",
  "Black Holes": "https://en.wikipedia.org/wiki/Black_hole",
  "The First Cities": "https://en.wikipedia.org/wiki/Uruk",
  "The Bronze Age": "https://en.wikipedia.org/wiki/Bronze_Age",
  "The Iron Age": "https://en.wikipedia.org/wiki/Iron_Age",
  "The Hanging Gardens": "https://en.wikipedia.org/wiki/Hanging_Gardens_of_Babylon",
  "The Great Wall of China": "https://en.wikipedia.org/wiki/Great_Wall_of_China",
  "The Terracotta Army": "https://en.wikipedia.org/wiki/Terracotta_Army",
  "The Scientific Method": "https://en.wikipedia.org/wiki/Scientific_method",
  "The Microscope": "https://en.wikipedia.org/wiki/Microscope",
  "The Exodus": "https://en.wikipedia.org/wiki/The_Exodus",
  "King David Reigns": "https://en.wikipedia.org/wiki/David",
  "The Birth of Jesus": "https://en.wikipedia.org/wiki/Nativity_of_Jesus",
  "The Crucifixion": "https://en.wikipedia.org/wiki/Crucifixion_of_Jesus",
  "The Second Temple Falls": "https://en.wikipedia.org/wiki/Siege_of_Jerusalem_(70_CE)",
  "The Persian Empire": "https://en.wikipedia.org/wiki/Persian_Empire",
  "Alexander the Great": "https://en.wikipedia.org/wiki/Alexander_the_Great",
  "The Roman Empire": "https://en.wikipedia.org/wiki/Ancient_Rome",
  "The Caliphates": "https://en.wikipedia.org/wiki/Caliphate",
  "The Mongol Empire": "https://en.wikipedia.org/wiki/Mongol_Empire",
  "The British Empire": "https://en.wikipedia.org/wiki/British_Empire",
  "The Ottoman Empire": "https://en.wikipedia.org/wiki/Ottoman_Empire",
  "The Mughal Empire": "https://en.wikipedia.org/wiki/Mughal_Empire",
  "Meiji Japan Industrialises": "https://en.wikipedia.org/wiki/Meiji_Restoration",
  "China's Economic Miracle": "https://en.wikipedia.org/wiki/Chinese_economic_reform",
  "Fusion Energy": "https://en.wikipedia.org/wiki/ITER",
  "Mars Colony": "https://en.wikipedia.org/wiki/Terraforming_of_Mars",
  "Climate Tipping Points": "https://en.wikipedia.org/wiki/Tipping_points_in_the_climate_system",
  "Universal Basic Income": "https://en.wikipedia.org/wiki/Universal_basic_income",
  "Space Elevator": "https://en.wikipedia.org/wiki/Space_elevator",
  "Space-Based Solar Power": "https://en.wikipedia.org/wiki/Space-based_solar_power",
  "Mind Uploading": "https://en.wikipedia.org/wiki/Mind_uploading",
  "Terraforming Mars": "https://en.wikipedia.org/wiki/Terraforming",
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
};
const lmEntries = Object.entries(lmMap).map(([t, u]) => '    ' + JSON.stringify(t) + ': ' + JSON.stringify(u) + ',\n').join("");
if (core.includes(lmAnchor)) core = core.replace(lmAnchor, lmAnchor + lmEntries);

// CURRICULUM_OVERRIDES
const coAnchor = '    "The Cold War": ["empires & power", "physics & chemistry"],\n';
const coMap = {
  "The First Fish": ["biology & evolution"],
  "Plants Conquer Land": ["biology & evolution", "geology & climate"],
  "The First Reptiles": ["biology & evolution"],
  "The First Birds": ["biology & evolution"],
  "The First Whales": ["biology & evolution"],
  "Homo habilis": ["biology & evolution", "technology & engineering"],
  "Homo sapiens": ["biology & evolution", "human migration"],
  "The Agricultural Revolution": ["everyday life", "ancient history"],
  "The Sun is Born": ["astronomy & space", "physics & chemistry"],
  "Mars Rovers": ["astronomy & space", "technology & engineering"],
  "Voyager Probes": ["astronomy & space", "technology & engineering"],
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
  "The First Fish": ["biology & evolution"],
  "Plants Conquer Land": ["biology & evolution", "geology & climate"],
  "The First Reptiles": ["biology & evolution"],
  "The First Birds": ["biology & evolution"],
  "The First Whales": ["biology & evolution"],
  "The First Land Animals": ["biology & evolution"],
  "The Age of Insects": ["biology & evolution"],
  "The First Forests": ["biology & evolution", "geology & climate"],
  "The Permian Extinction": ["biology & evolution", "geology & climate"],
  "The First Primates": ["biology & evolution"],
  "Australopithecus": ["biology & evolution", "human migration"],
  "The First Language": ["art & language", "human migration"],
  "The First Art": ["art & language", "everyday life"],
  "Jupiter's Moons": ["astronomy & space"],
  "Saturn's Titan": ["astronomy & space"],
  "The Kuiper Belt": ["astronomy & space"],
  "Big Bang Nucleosynthesis": ["physics & chemistry", "astronomy & space"],
  "The First Molecules": ["physics & chemistry", "astronomy & space"],
  "Supernovae": ["astronomy & space", "physics & chemistry"],
  "Black Holes": ["astronomy & space", "physics & chemistry"],
  "The First Cities": ["ancient history", "everyday life"],
  "The Bronze Age": ["technology & engineering", "ancient history"],
  "The Iron Age": ["technology & engineering", "ancient history"],
  "The Hanging Gardens": ["ancient history", "technology & engineering"],
  "The Great Wall of China": ["technology & engineering", "ancient history"],
  "The Terracotta Army": ["ancient history", "technology & engineering"],
  "The Scientific Method": ["physics & chemistry", "technology & engineering"],
  "The Microscope": ["medicine & health", "technology & engineering"],
  "The Exodus": ["religion & ethics", "ancient history"],
  "King David Reigns": ["religion & ethics", "ancient history"],
  "The Birth of Jesus": ["religion & ethics", "ancient history"],
  "The Crucifixion": ["religion & ethics", "ancient history"],
  "The Second Temple Falls": ["religion & ethics", "ancient history"],
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
  "Universal Basic Income": ["everyday life", "technology & engineering"],
  "Space Elevator": ["technology & engineering", "astronomy & space"],
  "Space-Based Solar Power": ["technology & engineering", "physics & chemistry"],
  "Mind Uploading": ["medicine & health", "technology & engineering"],
  "Terraforming Mars": ["astronomy & space", "technology & engineering"],
};
const coEntries = Object.entries(coMap).map(([t, tags]) => '    ' + JSON.stringify(t) + ': ' + JSON.stringify(tags) + ',\n').join("");
if (core.includes(coAnchor)) core = core.replace(coAnchor, coAnchor + coEntries);

fs.writeFileSync(CORE, core);
console.log("added", added, "new milestones");