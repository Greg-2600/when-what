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
  { o: { title: "Hinduism Takes Shape", yearsAgo: 3500, era: "Civilization", kid: "In ancient India, people wrote sacred songs called the Vedas and worshipped many gods. Over centuries these ideas grew into Hinduism — the world's oldest major religion still practiced today!", fun: "Hinduism has no single founder; it grew over thousands of years.", summary: "The Vedic period (~1500 BCE) laid the foundations of Hinduism: the Vedas, caste (varna) system, and concepts of karma and dharma. It evolved over millennia into the diverse religion practiced by ~1.2 billion people today.", deep: ["The four Vedas are among the oldest religious texts.", "Concepts of karma, samsara and moksha shaped Indian philosophy.", "Hinduism encompasses diverse traditions (Shaivism, Vaishnavism, Shaktism).", "The Upanishads explored the nature of reality and the self (Atman/Brahman)."] } },
  { o: { title: "Buddhism is Founded", yearsAgo: 2589, era: "Civilization", kid: "A prince named Siddhartha sat under a tree and figured out a way to end suffering. He became the Buddha, and his ideas spread across Asia, shaping billions of lives!", fun: "The Buddha's first sermon was called 'Turning the Wheel of Dharma'.", summary: "Around 563 BCE, Siddhartha Gautama attained enlightenment and began teaching the Four Noble Truths and the Eightfold Path. Buddhism spread across India, China, Southeast Asia and beyond.", deep: ["The Four Noble Truths diagnose suffering and its cessation.", "The Eightfold Path guides ethical and mental development.", "Buddhism split into Theravada, Mahayana and Vajrayana traditions.", "Ashoka the Great (3rd century BCE) helped spread Buddhism across Asia."] } },
  { o: { title: "Confucius", yearsAgo: 2530, era: "Civilization", kid: "Around 500 BCE, a teacher named Confucius said that respect, family and education make a good society. His ideas shaped Chinese culture for 2,500 years! He believed in leading by example, not force.", fun: "Confucius's sayings were collected in the Analects.", summary: "Confucius (551-479 BCE) was a Chinese philosopher whose teachings on ethics, family and governance shaped East Asian civilization for millennia.", deep: ["The Analects record his teachings through disciples.", "Confucianism emphasizes ren (benevolence), li (ritual) and xiao (filial piety).", "His ideas became state ideology under the Han dynasty.", "Confucianism influenced Korea, Japan and Vietnam."] } },
  { o: { title: "Taoism Emerges", yearsAgo: 2500, era: "Civilization", kid: "In ancient China, a wise man named Laozi taught that the best way to live is to go with the flow of nature — like water. His ideas became Taoism, a religion and philosophy that values simplicity, balance and harmony!", fun: "The Tao Te Ching is one of the most translated books in history.", summary: "Taoism (Daoism) emerged in China around the 6th century BCE, attributed to Laozi. It emphasizes living in harmony with the Tao (the Way), wu wei (non-action), and balance (yin/yang).", deep: ["The Tao Te Ching is the foundational text.", "Taoism influenced Chinese medicine, martial arts and art.", "It coexisted and blended with Confucianism and Buddhism.", "Taoist alchemy contributed to Chinese science."] } },
  { o: { title: "Sikhism is Founded", yearsAgo: 557, era: "Modern", kid: "In 1469, a teacher named Guru Nanak said God is one and all people are equal. He started Sikhism, a religion that rejects caste and emphasizes service and community!", fun: "Sikh men wear turbans and carry a small ceremonial dagger (kirpan).", summary: "Guru Nanak (1469-1539) founded Sikhism in Punjab, emphasizing one God, equality, and community service (seva). The religion developed under ten Gurus.", deep: ["The Guru Granth Sahib is the eternal Guru of Sikhs.", "The Khalsa was founded by Guru Gobind Singh in 1699.", "Sikhism rejects caste and promotes gender equality.", "The Golden Temple in Amritsar is the holiest Sikh site."] } },
  { o: { title: "Zoroastrianism", yearsAgo: 3000, era: "Civilization", kid: "Around 1000 BCE, a prophet named Zoroaster taught that the world is a battle between good (Ahura Mazda) and evil (Angra Mainyu). This idea of good vs. evil influenced Judaism, Christianity and Islam!", fun: "Zoroastrianism is one of the world's oldest monotheistic religions.", summary: "Zoroastrianism, founded by Zoroaster (~1000 BCE), is one of the oldest monotheistic religions. It influenced Abrahamic religions with concepts of good vs. evil, heaven and hell.", deep: ["The Avesta is the sacred text of Zoroastrianism.", "It introduced concepts of heaven, hell and final judgment.", "It was the state religion of the Persian Empire.", "Today ~100,000 Zoroastrians remain, mostly in India (Parsis)."] } },
  // More ancient
  { o: { title: "The Code of Hammurabi", yearsAgo: 3776, era: "Civilization", kid: "Around 1754 BCE, King Hammurabi of Babylon wrote 282 laws on a stone pillar! 'An eye for an eye' is from his code. It's one of the oldest and most complete legal codes ever found.", fun: "The stele of Hammurabi is now in the Louvre in Paris.", summary: "The Code of Hammurabi (c. 1754 BCE) is one of the oldest complete legal codes. It established laws on trade, property, family and crime.", deep: ["It has 282 laws covering civil and criminal matters.", "'An eye for an eye' is the principle of retributive justice.", "The code influenced later legal systems greatly.", "It was discovered in 1901 in Susa, Iran, by French archaeologists."] } },
  { o: { title: "The Hanging Gardens", yearsAgo: 2600, era: "Civilization", kid: "The Hanging Gardens of Babylon were one of the Seven Wonders of the Ancient World! Legend says King Nebuchadnezzar built them for his homesick wife. Terraced gardens with trees and flowers hung from the palace walls!", fun: "No one is sure the Hanging Gardens actually existed.", summary: "The Hanging Gardens of Babylon (c. 600 BCE) were one of the Seven Wonders. They may have been terraced gardens built by Nebuchadnezzar II.", deep: ["They were described by ancient Greek historians.", "Archaeological evidence is still debated today.", "They may have been in Nineveh, not Babylon.", "They represent ancient engineering ambition."] } },
  { o: { title: "The Great Wall of China", yearsAgo: 2240, era: "Civilization", kid: "China built the Great Wall over centuries to keep out invaders! The most famous parts were built during the Ming dynasty. It's so long (13,000 miles) that it's visible from space — or is it? That's actually a myth!", fun: "The Great Wall is not visible from the Moon.", summary: "The Great Wall of China was built and rebuilt over centuries. The most famous sections date to the Ming dynasty (1368-1644). It is the world's longest structure.", deep: ["The wall is ~13,000 miles (21,000 km) long.", "It was built to defend against nomadic invasions.", "Different dynasties built different sections.", "It is a UNESCO World Heritage Site today."] } },
  { o: { title: "The Terracotta Army", yearsAgo: 2220, era: "Civilization", kid: "China's first emperor, Qin Shi Huang, was buried with 8,000 life-sized clay soldiers! Each one has a unique face. They were meant to protect him in the afterlife. It's the greatest archaeological find of the 20th century!", fun: "The Terracotta Army was discovered by farmers digging a well in 1974.", summary: "The Terracotta Army (c. 210 BCE) is a collection of 8,000+ life-sized clay soldiers buried with Qin Shi Huang. It is a UNESCO World Heritage Site.", deep: ["Each soldier has a unique face and hairstyle.", "The army includes horses, chariots and weapons.", "The tomb of Qin Shi Huang remains unexcavated.", "It took ~700,000 workers 38 years to build."] } },
  // Science
  { o: { title: "The Scientific Method", yearsAgo: 400, era: "Modern", kid: "In the 1600s, scientists like Francis Bacon said: don't just guess — test! Observe, hypothesize, experiment, conclude. The scientific method is how we learn about the world today. It's the foundation of all modern science!", fun: "Bacon's 'Novum Organum' (1620) laid out the scientific method.", summary: "The scientific method (17th century) emphasizes observation, hypothesis, experimentation and conclusion. It became the foundation of modern science.", deep: ["Francis Bacon and René Descartes were key figures.", "Galileo's experiments exemplified the method.", "The Royal Society (1660) promoted experimental science.", "Peer review and replication ensure reliability."] } },
  { o: { title: "The Microscope", yearsAgo: 340, era: "Modern", kid: "In 1676, Antonie van Leeuwenhoek built a powerful microscope and saw tiny 'animalcules' (bacteria) in pond water! Nobody knew such tiny creatures existed. It opened up a whole new world of biology.", fun: "Leeuwenhoek's microscopes could magnify 270x.", summary: "Antonie van Leeuwenhoek's microscopes (1670s) revealed bacteria and protozoa. This opened the field of microbiology for future research.", deep: ["Leeuwenhoek made his own lenses by hand himself.", "He discovered bacteria, sperm cells and blood cells.", "His work laid groundwork for germ theory.", "Modern electron microscopes can see individual atoms."] } },
  { o: { title: "The Steam Locomotive", yearsAgo: 222, era: "Modern", kid: "In 1804, Richard Trevithick built the first steam locomotive! It pulled 10 tons of iron and 70 men. Trains shrank the world — people could travel in hours what used to take weeks.", fun: "The first passenger railway (Stockton-Darlington) opened in 1825.", summary: "Richard Trevithick's steam locomotive (1804) was the first to run on rails. Railways transformed transport, trade and society in the 19th century.", deep: ["George Stephenson's Rocket (1829) won the Rainhill Trials.", "Railways enabled the Industrial Revolution's spread.", "Transcontinental railways connected continents.", "Steam trains were replaced by diesel and electric trains."] } },
  { o: { title: "The Telephone", yearsAgo: 150, era: "Modern", kid: "In 1876, Alexander Graham Bell said 'Mr. Watson, come here, I want to see you' — through a wire! The telephone let people talk across any distance, and it changed how we connect forever.", fun: "Bell's first phone call was to his assistant in the next room.", summary: "Alexander Graham Bell patented the telephone in 1876. It revolutionized communication, shrinking the world and laying groundwork for the modern networked age.", deep: ["Bell beat Elisha Gray by hours in filing the patent.", "The first transcontinental call was made in 1915.", "Rotary dials, then touch-tone, then mobile phones followed.", "The telephone enabled global business and personal connection."] } },
  { o: { title: "The Light Bulb", yearsAgo: 147, era: "Modern", kid: "In 1879, Thomas Edison made a bulb that glowed for hours without burning out. Suddenly nights weren't dark anymore — factories, streets and homes could stay lit after sunset!", fun: "Edison tested thousands of materials before finding the right filament.", summary: "Thomas Edison's practical incandescent light bulb (1879) and electrical distribution system transformed daily life, enabling night-time work, reading and urban nightlife.", deep: ["Edison's Pearl Street Station (1882) was the first power plant.", "Tungsten filaments (1910) made bulbs brighter and longer-lasting.", "LEDs (1990s) replaced incandescents for efficiency.", "Electric lighting reshaped cities, work hours and sleep patterns."] } },
  { o: { title: "Photography is Born", yearsAgo: 187, era: "Modern", kid: "In 1839, Louis Daguerre showed the world how to capture a picture with light! For the first time, people could see exactly what something looked like without painting it. It changed art, news and memory forever.", fun: "The first photo took 8 hours of exposure.", summary: "Louis Daguerre's daguerreotype (1839) was the first practical photographic process. Photography transformed art, journalism, science and personal memory.", deep: ["Niepce made the first surviving photo in 1826 (8-hour exposure).", "George Eastman's Kodak (1888) made photography accessible to all.", "Digital cameras (1970s-90s) replaced film.", "Smartphone cameras now take billions of photos daily."] } },
  { o: { title: "The Telegraph", yearsAgo: 182, era: "Modern", kid: "In 1844, Samuel Morse sent the first message by telegraph: 'What hath God wrought!' Electricity carried words across wires faster than any horse. News that took weeks now arrived in minutes!", fun: "Morse code uses dots and dashes to spell letters.", summary: "Samuel Morse's telegraph (1844) transmitted messages electrically over wires using Morse code. It revolutionized communication, news and business.", deep: ["The first transatlantic cable was laid in 1858.", "Telegraph networks connected continents by 1870.", "It was the 'Victorian Internet' — instant long-distance communication.", "Radio and telephone eventually replaced the telegraph."] } },
  { o: { title: "Refrigeration", yearsAgo: 192, era: "Modern", kid: "In 1834, the first working refrigerator was built! Before that, food spoiled quickly and people used ice from frozen lakes. Refrigeration changed how we eat, shop and live — and made global food trade possible.", fun: "Ice was harvested from frozen lakes and shipped worldwide before mechanical refrigeration.", summary: "Mechanical refrigeration (Perkins 1834, Gorrie 1851) used compressed gas to cool. It transformed food preservation, medicine (vaccines), and global trade.", deep: ["Ice harvesting was a major industry in the 1800s.", "Refrigerated rail cars enabled long-distance food transport.", "Cold chains now preserve vaccines and perishable goods globally.", "Refrigeration changed diets and reduced food waste."] } },
  { o: { title: "The Sewing Machine", yearsAgo: 180, era: "Modern", kid: "In 1846, Elias Howe and Isaac Singer made machines that could sew faster than any human! Clothes became cheaper, factories grew, and the garment industry was born. It was a huge step for the Industrial Revolution.", fun: "Singer's marketing made sewing machines a household item.", summary: "The sewing machine (Howe 1846, Singer 1851) mechanized clothing production. It transformed the garment industry, women's work and consumer culture.", deep: ["Early machines were hand-cranked; electric motors came later.", "The sewing machine enabled mass-produced clothing.", "It changed women's roles in the workforce.", "Modern sewing machines are computerized."] } },
  { o: { title: "X-Rays Discovered", yearsAgo: 131, era: "Modern", kid: "In 1895, Wilhelm Roentgen discovered a mysterious ray that could see through skin and show bones! He called them X-rays. Doctors could now see broken bones without cutting. He won the first Nobel Prize in Physics!", fun: "Roentgen's wife's hand was the first X-ray photo.", summary: "Wilhelm Röntgen discovered X-rays in 1895. They revolutionized medicine by allowing non-invasive imaging of the body's interior.", deep: ["X-rays are electromagnetic radiation with high energy.", "CT scans (1970s) use X-rays for 3D imaging.", "X-rays are used in security screening and crystallography.", "Overuse of X-rays carries radiation risk."] } },
  { o: { title: "Radio", yearsAgo: 131, era: "Modern", kid: "In 1895, Guglielmo Marconi sent a signal through the air without wires! Radio let people hear news, music and voices from far away. It connected the world and became the first mass medium.", fun: "Marconi's first signal traveled just 1.5 miles.", summary: "Guglielmo Marconi developed practical radio (1895-1901). Radio became the first wireless mass communication medium, transforming news, entertainment and warfare.", deep: ["The first transatlantic radio signal was sent in 1901.", "Radio was crucial in both World Wars.", "FM radio (1930s) improved sound quality.", "Radio paved the way for television and mobile phones."] } },
  { o: { title: "The Rocket", yearsAgo: 100, era: "Modern", kid: "In 1926, Robert Goddard launched the first liquid-fuel rocket! It flew only 12 seconds and 41 feet, but it proved rockets could work. That tiny flight led to space travel, satellites and the Moon landing!", fun: "Goddard was mocked by newspapers; they said rockets couldn't work in space.", summary: "Robert Goddard launched the first liquid-fuel rocket on March 16, 1926. This breakthrough enabled space exploration, satellites and human spaceflight.", deep: ["Liquid fuel (gasoline + liquid oxygen) was more controllable than solid fuel.", "Goddard held 214 patents on rocketry.", "His work influenced Wernher von Braun and the Apollo program.", "Rockets now launch satellites, probes and astronauts."] } },
  { o: { title: "Radar", yearsAgo: 91, era: "Modern", kid: "In 1935, scientists figured out how to bounce radio waves off objects and detect them — radar! It could 'see' planes and ships through fog and darkness. Radar was crucial in WWII and is in every airport and weather station today.", fun: "Radar was secretly developed by several countries before WWII.", summary: "Radar (Radio Detection and Ranging) was developed in the 1930s. It detected objects by radio waves, becoming crucial in WWII and modern aviation/weather.", deep: ["Britain's Chain Home radar network helped win the Battle of Britain.", "Doppler radar measures speed (used in weather and police).", "Stealth technology was developed to evade radar.", "Radar is in cars, airports and weather stations."] } },
  { o: { title: "Nuclear Fission", yearsAgo: 88, era: "Modern", kid: "In 1938, scientists split an atom and released enormous energy! This discovery led to nuclear power plants that provide clean electricity, but also to atomic bombs. It changed the world and created the nuclear age.", fun: "Lise Meitner helped explain the physics of fission.", summary: "Nuclear fission was discovered in 1938 by Hahn and Strassmann (explained by Meitner and Frisch). It splits atomic nuclei, releasing vast energy, enabling both nuclear power and weapons.", deep: ["The Manhattan Project (1942-1945) built the first atomic bombs.", "Nuclear power plants generate ~10% of world electricity.", "Fission of uranium-235 releases ~200 MeV per atom.", "Nuclear fusion (the Sun's process) is still being developed."] } },
  { o: { title: "The Jet Engine", yearsAgo: 87, era: "Modern", kid: "In 1939, the first jet engine was built. Instead of propellers, it blasted hot air out the back to push forward. Jets made planes much faster and eventually shrank the world — you can fly anywhere in hours!", fun: "The first jet flight was only 11 minutes long.", summary: "The jet engine (Whittle 1937, von Ohain 1939) uses compressed air and combustion to produce thrust. It revolutionized aviation, enabling high-speed, high-altitude flight.", deep: ["Frank Whittle (UK) and Hans von Ohain (Germany) independently invented it.", "The first jet aircraft flew in 1939 (Heinkel He 178).", "Turbofan engines power modern airliners.", "Jets made global air travel affordable and fast."] } },
  { o: { title: "The Laser", yearsAgo: 66, era: "Modern", kid: "In 1960, scientists made a device that produces a beam of light so focused and powerful that it can cut steel, read CDs, and perform eye surgery! 'Laser' stands for Light Amplification by Stimulated Emission of Radiation.", fun: "The first laser was built by Theodore Maiman using a ruby crystal.", summary: "The laser (1960) produces coherent, focused light. It has applications in surgery, manufacturing, communications, data storage and scientific research.", deep: ["Einstein predicted stimulated emission in 1917.", "Maiman's ruby laser was the first working device.", "Fiber optics use lasers to transmit data at light speed.", "Lasers are used in LIGO to detect gravitational waves."] } },
  { o: { title: "MRI Scanner", yearsAgo: 49, era: "Modern", kid: "In 1977, the first MRI (Magnetic Resonance Imaging) scan was done! It uses magnets and radio waves to take detailed pictures of the inside of your body — without any radiation! It revolutionized medicine.", fun: "MRI machines are so powerful they can pull metal objects across the room.", summary: "MRI (Magnetic Resonance Imaging) was developed in the 1970s (Lauterbur, Mansfield). It uses magnetic fields and radio waves to image soft tissues without ionizing radiation.", deep: ["Lauterbur and Mansfield won the Nobel Prize (2003).", "MRI is superior to X-rays for brain, muscle and organ imaging.", "Functional MRI (fMRI) maps brain activity.", "Over 100 million MRI scans are performed annually worldwide."] } },
  { o: { title: "Personal Computer", yearsAgo: 51, era: "Modern", kid: "In 1975, the Altair 8800 kit computer was released, and soon Apple, IBM and others made computers for everyone. The PC put computing power in homes and offices, changing how we work, play and communicate!", fun: "The Apple II (1977) was one of the first successful home computers.", summary: "The personal computer emerged in 1975 (Altair 8800). Apple (1976), IBM PC (1981) and others brought computing to homes and offices, transforming society.", deep: ["The Altair 8800 was sold as a kit for $439.", "Microsoft was founded in 1975 to write software for it.", "The IBM PC (1981) set the standard architecture.", "Smartphones now have more power than 1970s mainframes."] } },
  { o: { title: "GPS Navigation", yearsAgo: 48, era: "Modern", kid: "In 1978, the first GPS satellite was launched. Today, GPS tells you exactly where you are anywhere on Earth! It guides cars, planes, ships and even helps farmers plant crops precisely.", fun: "GPS is free to use worldwide, funded by the US government.", summary: "The Global Positioning System (GPS) began with the first satellite launch in 1978. It provides precise location data worldwide, transforming navigation, logistics and daily life.", deep: ["GPS uses 24+ satellites in medium Earth orbit.", "It requires 4 satellites to determine position in 3D.", "GPS enables precision agriculture, aviation and autonomous vehicles.", "Other systems: GLONASS (Russia), Galileo (EU), BeiDou (China)."] } },
  { o: { title: "3D Printing", yearsAgo: 40, era: "Modern", kid: "In the 1980s, Chuck Hull invented a machine that could build objects layer by layer from a digital design. 3D printing can now make prosthetics, airplane parts, and even houses!", fun: "The first 3D-printed object was a small cup.", summary: "3D printing (additive manufacturing) was invented by Chuck Hull in 1983 (stereolithography). It builds objects layer-by-layer from digital models, revolutionizing manufacturing.", deep: ["Early 3D printers used UV-cured resin.", "FDM (fused deposition) made home printing affordable.", "3D printing is used in medicine, aerospace and construction.", "Bioprinting aims to print living tissues and organs."] } },
  { o: { title: "Stem Cells Discovered", yearsAgo: 28, era: "Modern", kid: "In 1998, scientists found stem cells — special cells that can become any type of cell in the body. They could help cure diseases like Parkinson's and diabetes, and maybe even regrow organs!", fun: "Stem cells can divide and become muscle, nerve, blood or bone cells.", summary: "Human embryonic stem cells were isolated in 1998 by James Thomson. Stem cells can differentiate into any cell type, offering potential cures for many diseases.", deep: ["Embryonic stem cells are pluripotent (can become any cell).", "Induced pluripotent stem cells (iPSCs) (2006) avoid ethical issues.", "Stem cell therapies are in trials for blindness, paralysis and diabetes.", "Ethical debates surround embryonic stem cell research."] } },
  { o: { title: "Microwave Oven", yearsAgo: 81, era: "Modern", kid: "In 1945, Percy Spencer noticed a candy bar melted in his pocket near a radar magnetron. He realized microwaves could cook food! The first microwave oven was huge and expensive, but now they're in almost every kitchen.", fun: "The first microwave oven weighed 750 pounds.", summary: "The microwave oven was invented by Percy Spencer in 1945 (patented 1947). It uses microwave radiation to heat food quickly, revolutionizing cooking.", deep: ["Spencer worked at Raytheon on radar magnetrons.", "The first commercial microwave (1947) cost $5,000.", "Microwaves heat water molecules in food.", "Over 90% of US households have a microwave."] } },
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
  "The Scientific Method": "https://en.wikipedia.org/wiki/Scientific_method",
  "The Microscope": "https://en.wikipedia.org/wiki/Microscope",
  "The Steam Locomotive": "https://en.wikipedia.org/wiki/Steam_locomotive",
  "The Telephone": "https://en.wikipedia.org/wiki/Telephone",
  "The Light Bulb": "https://en.wikipedia.org/wiki/Incandescent_light_bulb",
  "Photography is Born": "https://en.wikipedia.org/wiki/History_of_photography",
  "The Telegraph": "https://en.wikipedia.org/wiki/Telegraphy",
  "Refrigeration": "https://en.wikipedia.org/wiki/Refrigeration",
  "The Sewing Machine": "https://en.wikipedia.org/wiki/Sewing_machine",
  "X-Rays Discovered": "https://en.wikipedia.org/wiki/X-ray",
  "Radio": "https://en.wikipedia.org/wiki/Radio",
  "The Rocket": "https://en.wikipedia.org/wiki/Rocket",
  "Radar": "https://en.wikipedia.org/wiki/Radar",
  "Nuclear Fission": "https://en.wikipedia.org/wiki/Nuclear_fission",
  "The Jet Engine": "https://en.wikipedia.org/wiki/Jet_engine",
  "The Laser": "https://en.wikipedia.org/wiki/Laser",
  "MRI Scanner": "https://en.wikipedia.org/wiki/Magnetic_resonance_imaging",
  "Personal Computer": "https://en.wikipedia.org/wiki/Personal_computer",
  "GPS Navigation": "https://en.wikipedia.org/wiki/Global_Positioning_System",
  "3D Printing": "https://en.wikipedia.org/wiki/3D_printing",
  "Stem Cells Discovered": "https://en.wikipedia.org/wiki/Stem_cell",
  "Microwave Oven": "https://en.wikipedia.org/wiki/Microwave_oven",
  "Hinduism Takes Shape": "https://en.wikipedia.org/wiki/Hinduism",
  "Buddhism is Founded": "https://en.wikipedia.org/wiki/Buddhism",
  "Confucius": "https://en.wikipedia.org/wiki/Confucius",
  "Taoism Emerges": "https://en.wikipedia.org/wiki/Taoism",
  "Sikhism is Founded": "https://en.wikipedia.org/wiki/Sikhism",
  "Zoroastrianism": "https://en.wikipedia.org/wiki/Zoroastrianism",
  "The Code of Hammurabi": "https://en.wikipedia.org/wiki/Babylonia",
  "The Hanging Gardens": "https://en.wikipedia.org/wiki/Hanging_Gardens_of_Babylon",
  "The Great Wall of China": "https://en.wikipedia.org/wiki/Great_Wall_of_China",
  "The Terracotta Army": "https://en.wikipedia.org/wiki/Terracotta_Army",
};
const lmEntries = Object.entries(lmMap).map(([t, u]) => '    ' + JSON.stringify(t) + ': ' + JSON.stringify(u) + ',\n').join("");
if (core.includes(lmAnchor)) core = core.replace(lmAnchor, lmAnchor + lmEntries);

// CURRICULUM_OVERRIDES
const coAnchor = '    "The Cold War": ["empires & power", "physics & chemistry"],\n';
const coMap = {
  "The Scientific Method": ["physics & chemistry", "technology & engineering"],
  "The Microscope": ["medicine & health", "technology & engineering"],
  "The Steam Locomotive": ["technology & engineering", "everyday life"],
  "The Telephone": ["technology & engineering", "everyday life"],
  "The Light Bulb": ["technology & engineering", "physics & chemistry"],
  "Photography is Born": ["technology & engineering", "art & language"],
  "The Telegraph": ["technology & engineering", "everyday life"],
  "Refrigeration": ["technology & engineering", "everyday life"],
  "The Sewing Machine": ["technology & engineering", "everyday life"],
  "X-Rays Discovered": ["medicine & health", "physics & chemistry"],
  "Radio": ["technology & engineering", "physics & chemistry"],
  "The Rocket": ["astronomy & space", "technology & engineering"],
  "Radar": ["technology & engineering", "physics & chemistry"],
  "Nuclear Fission": ["physics & chemistry", "technology & engineering"],
  "The Jet Engine": ["technology & engineering", "physics & chemistry"],
  "The Laser": ["physics & chemistry", "technology & engineering"],
  "MRI Scanner": ["medicine & health", "technology & engineering"],
  "Personal Computer": ["technology & engineering", "everyday life"],
  "GPS Navigation": ["technology & engineering", "astronomy & space"],
  "3D Printing": ["technology & engineering", "medicine & health"],
  "Stem Cells Discovered": ["medicine & health", "biology & evolution"],
  "Microwave Oven": ["technology & engineering", "everyday life"],
  "Hinduism Takes Shape": ["religion & ethics", "ancient history"],
  "Buddhism is Founded": ["religion & ethics", "human migration"],
  "Confucius": ["religion & ethics", "art & language"],
  "Taoism Emerges": ["religion & ethics", "art & language"],
  "Sikhism is Founded": ["religion & ethics", "human migration"],
  "Zoroastrianism": ["religion & ethics", "ancient history"],
  "The Code of Hammurabi": ["religion & ethics", "ancient history"],
  "The Hanging Gardens": ["ancient history", "technology & engineering"],
  "The Great Wall of China": ["technology & engineering", "ancient history"],
  "The Terracotta Army": ["ancient history", "technology & engineering"],
};
const coEntries = Object.entries(coMap).map(([t, tags]) => '    ' + JSON.stringify(t) + ': ' + JSON.stringify(tags) + ',\n').join("");
if (core.includes(coAnchor)) core = core.replace(coAnchor, coAnchor + coEntries);

fs.writeFileSync(CORE, core);
console.log("added", added, "new milestones");