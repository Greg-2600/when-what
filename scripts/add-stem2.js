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
  { o: { title: "Anesthesia", yearsAgo: 179, era: "Modern", kid: "In 1846, a dentist showed that ether could put people to sleep during surgery! Before that, operations were agonizing. Anesthesia made surgery survivable and transformed medicine forever.", fun: "The first public demonstration of ether anesthesia was at Massachusetts General Hospital.", summary: "Ether anesthesia was demonstrated in 1846 by William Morton. It revolutionized surgery by eliminating pain, enabling longer and more complex operations.", deep: ["Before anesthesia, surgery was a last resort due to pain.", "Chloroform and nitrous oxide followed as anesthetics.", "Modern anesthesia uses a combination of drugs for safety.", "Anesthesia transformed surgery from butchery to precision medicine."] } },
  { o: { title: "Plastic is Invented", yearsAgo: 119, era: "Modern", kid: "In 1907, Leo Baekeland made the first fully synthetic plastic — Bakelite! It could be molded into anything and didn't rot. Plastic changed everything from toys to medicine, though now it's a pollution problem.", fun: "The word 'plastic' comes from Greek 'plastikos' meaning 'moldable'.", summary: "Bakelite (1907) was the first fully synthetic plastic. Plastics revolutionized manufacturing, packaging and medicine, but now pose major environmental challenges.", deep: ["Bakelite was used in radios, telephones and jewelry.", "Nylon (1935) and polyethylene (1930s) followed.", "Plastic pollution now affects oceans and ecosystems worldwide.", "Recycling and bioplastics are active research areas."] } },
  { o: { title: "The Silicon Chip", yearsAgo: 68, era: "Modern", kid: "In 1958, Jack Kilby built the first integrated circuit — a whole electronic circuit on a tiny chip of silicon! This shrank computers from room-sized machines to pocket devices. Every phone, computer and gadget uses chips today.", fun: "The first IC was built with germanium, not silicon.", summary: "The integrated circuit (Kilby 1958, Noyce 1959) put entire circuits on a single chip. It enabled the miniaturization of electronics and the digital revolution.", deep: ["Moore's Law: transistor count doubles every ~2 years.", "Silicon Valley is named after the silicon in chips.", "Modern chips have billions of transistors.", "ICs are in every electronic device today."] } },
  { o: { title: "Fiber Optics", yearsAgo: 56, era: "Modern", kid: "In 1970, scientists figured out how to send light through thin glass fibers to carry information! Fiber optics now carry the internet's data at the speed of light, connecting the whole world.", fun: "A single fiber can carry 10 terabits per second.", summary: "Fiber optics (1970) use light to transmit data through glass fibers. They revolutionized telecommunications, enabling high-speed internet and global connectivity.", deep: ["Corning Glass developed low-loss optical fiber in 1970.", "Fiber carries 99% of international data traffic.", "Lasers send pulses of light through the fibers.", "Fiber enables 5G, cloud computing and streaming."] } },
  { o: { title: "The Electric Battery", yearsAgo: 226, era: "Modern", kid: "In 1800, Alessandro Volta stacked metal discs and salty water to make the first battery! It produced a steady electric current. Batteries power everything from flashlights to phones to electric cars.", fun: "Volta's battery was called a 'voltaic pile'.", summary: "Alessandro Volta's voltaic pile (1800) was the first electrical battery. It provided a steady current, enabling electrochemistry and electrical engineering.", deep: ["Volta's pile used zinc and copper discs separated by brine-soaked cloth.", "Lithium-ion batteries (1980s) revolutionized portable electronics.", "Batteries store energy for EVs, phones and grids.", "Battery technology is key to the energy transition."] } },
  { o: { title: "The Electric Motor", yearsAgo: 205, era: "Modern", kid: "In 1821, Michael Faraday built the first electric motor — a device that turns electricity into motion! Electric motors are in everything from fans to electric cars to industrial machines.", fun: "Faraday's first motor was a wire rotating around a magnet.", summary: "Michael Faraday's electric motor (1821) converted electrical energy into mechanical motion. It became the foundation of electrical engineering and modern industry.", deep: ["Faraday discovered electromagnetic rotation.", "Electric motors are approximately 90% efficient.", "They power EVs, appliances and factory machines.", "Faraday's work also led to generators (dynamos)."] } },
  { o: { title: "The Solar Cell", yearsAgo: 72, era: "Modern", kid: "In 1954, scientists made the first practical solar cell — a device that turns sunlight into electricity! Today solar panels cover rooftops and fields, providing clean energy from the sun.", fun: "The first solar cell powered a toy Ferris wheel.", summary: "The silicon solar cell (Bell Labs, 1954) converted sunlight to electricity with 6% efficiency. Solar power is now the cheapest source of new electricity in many regions.", deep: ["Efficiency has improved from 6% to over 26%.", "Solar is now the cheapest electricity in history.", "Solar panels on the ISS provide power in space.", "Solar + batteries enable off-grid living."] } },
  { o: { title: "The Steam Locomotive", yearsAgo: 222, era: "Modern", kid: "In 1804, Richard Trevithick built the first steam locomotive! It pulled 10 tons of iron and 70 men. Trains shrank the world — people could travel in hours what used to take weeks.", fun: "The first passenger railway (Stockton-Darlington) opened in 1825.", summary: "Richard Trevithick's steam locomotive (1804) was the first to run on rails. Railways transformed transport, trade and society in the 19th century.", deep: ["George Stephenson's Rocket (1829) won the Rainhill Trials.", "Railways enabled the Industrial Revolution's spread.", "Transcontinental railways connected continents.", "Steam trains were replaced by diesel and electric trains."] } },
  { o: { title: "The Automobile", yearsAgo: 140, era: "Modern", kid: "In 1886, Karl Benz built the first practical automobile — a three-wheeled car powered by a gasoline engine! Cars changed how we live, work and travel. Today there are over 1.4 billion cars on Earth.", fun: "Benz's wife Bertha took the first long-distance car trip (66 miles) without telling him.", summary: "Karl Benz's Motorwagen (1886) was the first practical automobile. The car transformed transportation, urban planning, and global economy.", deep: ["Henry Ford's Model T (1908) made cars affordable.", "Cars enabled suburbs and highway systems.", "Electric vehicles are now challenging gasoline cars.", "Autonomous (self-driving) cars are in development."] } },
  { o: { title: "Television", yearsAgo: 98, era: "Modern", kid: "In 1927, Philo Farnsworth transmitted the first TV image — a simple line. Television brought moving pictures and sound into every home. It became the dominant mass medium of the 20th century!", fun: "Farnsworth was 14 when he first sketched the idea for electronic TV.", summary: "Philo Farnsworth demonstrated electronic television in 1927. TV became the dominant mass medium, shaping news, entertainment and culture.", deep: ["John Logie Baird demonstrated mechanical TV in 1926.", "Color TV arrived in the 1950s for consumers.", "Cable and satellite expanded TV reach worldwide.", "Streaming is now replacing traditional TV."] } },
  { o: { title: "The Helicopter", yearsAgo: 84, era: "Modern", kid: "In 1939, Igor Sikorsky flew the first practical helicopter! It could hover, fly backward and land anywhere. Helicopters rescue people, fight fires, and transport troops — they go where planes can't.", fun: "Sikorsky's first helicopter flight lasted 10 seconds.", summary: "Igor Sikorsky's VS-300 (1939) was the first practical helicopter. Helicopters enabled vertical flight for rescue, military and civilian use.", deep: ["Leonardo da Vinci sketched a helicopter design in 1480.", "The VS-300 had a single main rotor and tail rotor.", "Helicopters are used in rescue, military and medical evacuation.", "Drones are now replacing some helicopter roles."] } },
  { o: { title: "The Pacemaker", yearsAgo: 67, era: "Modern", kid: "In 1958, the first implantable pacemaker was put in a patient! It keeps the heart beating regularly. Millions of people with heart problems now live normal lives thanks to this tiny device.", fun: "The first pacemaker was powered by a battery that needed replacing every few years.", summary: "The first implantable pacemaker (1958) regulated heart rhythm. It has saved millions of lives and evolved into modern cardiac devices.", deep: ["Arne Larsson was the first recipient (lived 43 more years).", "Modern pacemakers are now MRI-compatible.", "Defibrillators (ICDs) can restart the heart.", "Wireless pacemakers are now being developed."] } },
  { o: { title: "The CT Scanner", yearsAgo: 54, era: "Modern", kid: "In 1971, the first CT (computed tomography) scan was done! It combines many X-rays to create detailed 3D images of the body. Doctors can now see tumors, injuries and diseases in incredible detail.", fun: "The first CT scan took 5 minutes per slice and 9 days to process.", summary: "The CT scanner (Hounsfield 1971) combines X-rays with computer processing to create 3D body images. It revolutionized medical diagnosis.", deep: ["Hounsfield and Cormack won the Nobel Prize (1979).", "CT scans are faster than MRI for trauma cases.", "Modern CT scans take only a few seconds now.", "CT radiation exposure is a health consideration."] } },
  { o: { title: "IVF (Test Tube Baby)", yearsAgo: 46, era: "Modern", kid: "In 1978, the first 'test tube baby' was born! Louise Brown was conceived outside the womb in a lab. IVF (in vitro fertilization) has since helped millions of couples have children.", fun: "Louise Brown's birth was a global media sensation.", summary: "In vitro fertilization (IVF) produced the first 'test tube baby' (Louise Brown, 1978). IVF has since enabled millions of births worldwide.", deep: ["IVF involves fertilizing eggs outside the body.", "Over 8 million babies have been born via IVF.", "ICSI (1992) allows single sperm injection.", "IVF raised ethical debates about embryos."] } },
  { o: { title: "The World Wide Web", yearsAgo: 37, era: "Modern", kid: "In 1989, Tim Berners-Lee invented the World Wide Web! He created HTML, URLs and HTTP — the building blocks of every website. The web transformed how we find information, communicate and shop.", fun: "The first website was info.cern.ch, still online today.", summary: "Tim Berners-Lee invented the World Wide Web (1989) at CERN. It made the internet accessible to everyone and transformed global communication, commerce and culture.", deep: ["Berners-Lee gave the World Wide Web away for free.", "The first web browser was called 'WorldWideWeb'.", "E-commerce, social media and streaming all followed.", "The web has over 2 billion websites today."] } },
  { o: { title: "The Space Shuttle", yearsAgo: 44, era: "Modern", kid: "In 1981, the Space Shuttle Columbia launched! It was the first reusable spacecraft — it could fly to space and land like a plane. Shuttles built the ISS and launched satellites for 30 years.", fun: "The Shuttle could carry 29 tons to orbit.", summary: "The Space Shuttle (1981-2011) was the first reusable orbital spacecraft. It enabled ISS construction, satellite deployment and scientific missions.", deep: ["Columbia was the first (1981); Challenger (1986) and Columbia (2003) were lost.", "The Shuttle had 135 missions over 30 years.", "It could carry 7 astronauts and large payloads.", "Private companies (SpaceX, Boeing) now provide crew transport."] } },
  { o: { title: "The International Space Station", yearsAgo: 27, era: "Modern", kid: "In 1998, the first piece of the ISS was launched! It's a giant space laboratory orbiting Earth every 90 minutes. Astronauts from 15 countries have lived there, doing science in zero gravity.", fun: "The ISS is the size of a football field and visible from Earth.", summary: "The International Space Station (ISS) began construction in 1998. It is the largest human-made object in space and a collaboration of 15 nations.", deep: ["The ISS orbits at approximately 400 km altitude.", "Astronauts experience 16 sunrises and sunsets per day.", "Over 250 people have visited the ISS so far.", "It is scheduled to operate until around 2030."] } },
  { o: { title: "James Webb Space Telescope", yearsAgo: 4, era: "Modern", kid: "In 2021, the James Webb Space Telescope launched! It's the most powerful telescope ever built. It can see the first galaxies formed after the Big Bang and study planets around other stars!", fun: "JWST's mirror is 6.5 meters across, made of 18 hexagonal segments.", summary: "The James Webb Space Telescope (JWST) launched on December 25, 2021. It observes in infrared, seeing the first galaxies and exoplanet atmospheres.", deep: ["JWST observes infrared light, seeing through dust.", "It can detect the atmospheres of exoplanets.", "Its sunshield is the size of a tennis court.", "JWST is expected to operate for 20+ years."] } },
  { o: { title: "The Bessemer Process", yearsAgo: 169, era: "Modern", kid: "In 1856, Henry Bessemer figured out how to blow air through molten iron to burn off impurities, making steel cheap and fast! Steel became the backbone of bridges, skyscrapers and railroads.", fun: "The Bessemer process reduced steel costs by 80%.", summary: "The Bessemer process (1856) made steel production fast and cheap by blowing air through molten iron. It enabled mass steel production for construction and industry.", deep: ["Steel is stronger and more durable than iron.", "The process enabled skyscrapers, bridges and railways.", "Bessemer's converter could produce steel in minutes.", "Steel production became the measure of industrial power."] } },
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
  "Anesthesia": "https://en.wikipedia.org/wiki/Anesthesia",
  "The Bessemer Process": "https://en.wikipedia.org/wiki/Bessemer_process",
  "Plastic is Invented": "https://en.wikipedia.org/wiki/Plastic",
  "The Silicon Chip": "https://en.wikipedia.org/wiki/Integrated_circuit",
  "Fiber Optics": "https://en.wikipedia.org/wiki/Optical_fiber",
  "The Electric Battery": "https://en.wikipedia.org/wiki/Battery_(electricity)",
  "The Electric Motor": "https://en.wikipedia.org/wiki/Electric_motor",
  "The Solar Cell": "https://en.wikipedia.org/wiki/Solar_cell",
  "The Steam Locomotive": "https://en.wikipedia.org/wiki/Steam_locomotive",
  "The Automobile": "https://en.wikipedia.org/wiki/Automobile",
  "Television": "https://en.wikipedia.org/wiki/Television",
  "The Helicopter": "https://en.wikipedia.org/wiki/Helicopter",
  "The Pacemaker": "https://en.wikipedia.org/wiki/Artificial_cardiac_pacemaker",
  "The CT Scanner": "https://en.wikipedia.org/wiki/CT_scan",
  "IVF (Test Tube Baby)": "https://en.wikipedia.org/wiki/In_vitro_fertilisation",
  "The World Wide Web": "https://en.wikipedia.org/wiki/World_Wide_Web",
  "The Space Shuttle": "https://en.wikipedia.org/wiki/Space_Shuttle",
  "The International Space Station": "https://en.wikipedia.org/wiki/International_Space_Station",
  "James Webb Space Telescope": "https://en.wikipedia.org/wiki/James_Webb_Space_Telescope",
};
const lmEntries = Object.entries(lmMap).map(([t, u]) => '    ' + JSON.stringify(t) + ': ' + JSON.stringify(u) + ',\n').join("");
if (core.includes(lmAnchor)) core = core.replace(lmAnchor, lmAnchor + lmEntries);

// CURRICULUM_OVERRIDES
const coAnchor = '    "The Cold War": ["empires & power", "physics & chemistry"],\n';
const coMap = {
  "Anesthesia": ["medicine & health", "technology & engineering"],
  "The Bessemer Process": ["technology & engineering", "physics & chemistry"],
  "Plastic is Invented": ["technology & engineering", "everyday life"],
  "The Silicon Chip": ["technology & engineering", "physics & chemistry"],
  "Fiber Optics": ["technology & engineering", "physics & chemistry"],
  "The Electric Battery": ["technology & engineering", "physics & chemistry"],
  "The Electric Motor": ["technology & engineering", "physics & chemistry"],
  "The Solar Cell": ["technology & engineering", "physics & chemistry"],
  "The Steam Locomotive": ["technology & engineering", "everyday life"],
  "The Automobile": ["technology & engineering", "everyday life"],
  "Television": ["technology & engineering", "everyday life"],
  "The Helicopter": ["technology & engineering", "physics & chemistry"],
  "The Pacemaker": ["medicine & health", "technology & engineering"],
  "The CT Scanner": ["medicine & health", "technology & engineering"],
  "IVF (Test Tube Baby)": ["medicine & health", "biology & evolution"],
  "The World Wide Web": ["technology & engineering", "everyday life"],
  "The Space Shuttle": ["astronomy & space", "technology & engineering"],
  "The International Space Station": ["astronomy & space", "technology & engineering"],
  "James Webb Space Telescope": ["astronomy & space", "technology & engineering"],
};
const coEntries = Object.entries(coMap).map(([t, tags]) => '    ' + JSON.stringify(t) + ': ' + JSON.stringify(tags) + ',\n').join("");
if (core.includes(coAnchor)) core = core.replace(coAnchor, coAnchor + coEntries);

fs.writeFileSync(CORE, core);
console.log("added", added, "new milestones");