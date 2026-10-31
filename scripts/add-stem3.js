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
  // Medicine
  { o: { title: "Polio Vaccine", yearsAgo: 71, era: "Modern", kid: "In 1955, Jonas Salk announced a vaccine against polio — a disease that paralyzed thousands of children. Mass vaccination campaigns followed, and polio was nearly wiped out worldwide!", fun: "Salk gave away his vaccine patent for free, saying 'Can you patent the sun?'", summary: "Jonas Salk's polio vaccine (1955) was a triumph of medical science. Mass vaccination nearly eradicated polio worldwide.", deep: ["Polio paralyzed ~35,000 Americans per year in the 1950s.", "Salk's inactivated vaccine was followed by Sabin's oral vaccine (1961).", "Polio remains endemic only in Afghanistan and Pakistan.", "The Global Polio Eradication Initiative has reduced cases by 99%."] } },
  { o: { title: "Keyhole Surgery", yearsAgo: 40, era: "Modern", kid: "In the 1980s, doctors learned to operate through tiny incisions using cameras and small tools! Instead of big cuts, patients heal in days instead of weeks. It revolutionized surgery.", fun: "The first laparoscopic cholecystectomy was performed in 1985.", summary: "Laparoscopic (keyhole) surgery emerged in the 1980s. It uses small incisions and cameras, reducing recovery time and complications.", deep: ["Minimally invasive surgery reduces hospital stays.", "Robotic surgery (da Vinci) followed in the 2000s.", "Keyhole techniques are now standard for many procedures.", "Smaller incisions mean less pain and scarring."] } },
  { o: { title: "Statins", yearsAgo: 39, era: "Modern", kid: "In 1987, a drug called lovastatin was approved — the first statin! It lowers cholesterol and prevents heart attacks. Statins are now the most prescribed drugs in the world, saving millions of lives.", fun: "Statins were discovered in a fungus.", summary: "Lovastatin (1987) was the first statin, a drug that lowers cholesterol. Statins have become the most widely prescribed medications, preventing millions of heart attacks.", deep: ["Akira Endo discovered statins in fungal compounds.", "Statins inhibit HMG-CoA reductase, blocking cholesterol synthesis.", "They reduce heart attack risk by ~30%.", "Over 200 million people worldwide take statins."] } },
  // Materials
  { o: { title: "Graphene Discovered", yearsAgo: 22, era: "Modern", kid: "In 2004, two scientists used sticky tape to peel a single layer of carbon atoms from graphite! Graphene is 200 times stronger than steel and conducts electricity better than copper. It could revolutionize electronics!", fun: "They won the Nobel Prize for using Scotch tape.", summary: "Andre Geim and Konstantin Novoselov isolated graphene in 2004 using adhesive tape on graphite. It is the strongest, thinnest, most conductive material known.", deep: ["Graphene is one atom thick.", "It has extraordinary electrical and thermal conductivity.", "Applications include batteries, sensors and flexible electronics.", "Geim and Novoselov won the Nobel Prize in Physics (2010)."] } },
  // Energy
  { o: { title: "Lithium-Ion Battery", yearsAgo: 46, era: "Modern", kid: "In 1980, scientists figured out how to use lithium ions to store energy! These batteries are in every phone, laptop and electric car. They're rechargeable and powerful — they changed the world!", fun: "The lithium-ion battery was commercialized by Sony in 1991.", summary: "The lithium-ion battery (Goodenough, Whittingham, Yoshino, 1980s) is rechargeable and high-energy-density. It powers phones, laptops, EVs and grid storage.", deep: ["Goodenough, Whittingham and Yoshino won the Nobel Prize (2019).", "Li-ion batteries enabled the mobile revolution.", "They are key to electric vehicles and renewable energy storage.", "Solid-state batteries are the next frontier."] } },
  { o: { title: "Wind Turbine", yearsAgo: 138, era: "Modern", kid: "In 1888, the first wind turbine generated electricity! Wind power has grown from small machines to giant offshore farms. Today wind provides ~10% of global electricity — clean energy from the breeze!", fun: "The first wind turbine powered a single house in Ohio.", summary: "The first electricity-generating wind turbine was built in 1888 by Charles Brush. Wind power has become a major source of renewable electricity.", deep: ["Early wind turbines were small and inefficient.", "Modern turbines can be over 100 meters tall.", "Offshore wind farms are the fastest-growing segment.", "Wind and solar are now the cheapest new electricity."] } },
  // Transport
  { o: { title: "The Airplane", yearsAgo: 123, era: "Modern", kid: "In 1903, the Wright brothers flew the first powered airplane! It lasted only 12 seconds and went 120 feet. But that short hop changed the world — now you can fly anywhere on Earth in a day!", fun: "The Wright Flyer's first flight was shorter than a Boeing 747's wingspan.", summary: "The Wright brothers (Orville and Wilbur) achieved the first powered, controlled, sustained airplane flight on December 17, 1903, at Kitty Hawk, North Carolina.", deep: ["The first flight lasted 12 seconds and covered 120 feet.", "The Wrights built their own wind tunnel to test wing designs.", "Commercial aviation began in the 1920s.", "Jets (1950s) made air travel fast and affordable."] } },
  { o: { title: "The Automobile (Mass Market)", yearsAgo: 118, era: "Modern", kid: "In 1908, Henry Ford's Model T made cars affordable for everyone! Before that, cars were toys for the rich. The Model T put America on wheels and changed cities, suburbs and daily life forever.", fun: "Ford said customers could have any color 'as long as it is black'.", summary: "Henry Ford's Model T (1908) introduced mass production via the assembly line. It made automobiles affordable and transformed American society.", deep: ["The assembly line reduced production time from 12 hours to 93 minutes.", "Over 15 million Model Ts were sold.", "Cars enabled suburban sprawl and highway systems.", "Electric vehicles are now disrupting the auto industry."] } },
  // Communication
  { o: { title: "Television (Broadcast)", yearsAgo: 99, era: "Modern", kid: "In 1927, Philo Farnsworth transmitted the first TV image! Television brought moving pictures and sound into homes. It became the dominant mass medium of the 20th century, shaping news, entertainment and culture.", fun: "Farnsworth was 14 when he first sketched the idea for electronic TV.", summary: "Philo Farnsworth demonstrated electronic television in 1927. TV became the dominant mass medium, shaping news, entertainment and culture.", deep: ["John Logie Baird demonstrated mechanical TV in 1926.", "Color TV arrived in the 1950s.", "Cable and satellite expanded TV reach.", "Streaming is now replacing traditional TV."] } },
  { o: { title: "The Helicopter", yearsAgo: 87, era: "Modern", kid: "In 1939, Igor Sikorsky flew the first practical helicopter! It could hover, fly backward and land anywhere. Helicopters rescue people, fight fires and transport troops — they go where planes can't.", fun: "Sikorsky's first helicopter flight lasted 10 seconds.", summary: "Igor Sikorsky's VS-300 (1939) was the first practical helicopter. Helicopters enabled vertical flight for rescue, military and civilian use.", deep: ["Leonardo da Vinci sketched a helicopter design in 1480.", "The VS-300 had a single main rotor and tail rotor.", "Helicopters are used in rescue, military and medical evacuation.", "Drones are now replacing some helicopter roles."] } },
  { o: { title: "The Internet (ARPANET)", yearsAgo: 57, era: "Modern", kid: "In 1969, computers at four universities were connected for the first time. The first message was 'LO' (the system crashed before 'LOGIN'). This network became the Internet — the biggest invention in human history!", fun: "The first message was supposed to be 'LOGIN' but the system crashed after 'LO'.", summary: "ARPANET (1969) was the first packet-switching network and the precursor to the Internet. It connected UCLA, SRI, UCSB and Utah.", deep: ["Packet switching was invented by Paul Baran and Donald Davies.", "TCP/IP (1983) standardized internet protocols.", "The World Wide Web (1989) made the internet user-friendly.", "Today ~5 billion people use the internet."] } },
  // Space
  { o: { title: "Sputnik Launches", yearsAgo: 69, era: "Modern", kid: "In 1957, the Soviet Union launched Sputnik — the first satellite ever! It beeped as it orbited Earth. The US was shocked and rushed to catch up, launching the space race!", fun: "Sputnik's radio signal was detectable by amateur radio operators worldwide.", summary: "Sputnik 1 (October 4, 1957) was the first artificial satellite. It triggered the space race and led to NASA's creation and the Apollo program.", deep: ["Sputnik weighed 83.6 kg and orbited for 3 months.", "The US launched Explorer 1 in January 1958.", "NASA was created in July 1958.", "The space race culminated in the Moon landing (1969)."] } },
  { o: { title: "Gagarin Orbits Earth", yearsAgo: 65, era: "Modern", kid: "On April 12, 1961, Yuri Gagarin became the first human in space! He orbited Earth once in 108 minutes. He was 27 years old and said 'Poyekhali!' (Let's go!) as he launched.", fun: "Gagarin's flight lasted 108 minutes; the whole Vostok capsule weighed only 4.7 tons.", summary: "Yuri Gagarin (1934-1968) became the first human in space aboard Vostok 1 on April 12, 1961. His flight lasted 108 minutes and orbited Earth once.", deep: ["The USSR beat the US to the first human in space.", "Alan Shepard became the first American in space 3 weeks later.", "Gagarin died in a plane crash in 1968 at age 34.", "April 12 is celebrated as 'Cosmonautics Day' in Russia."] } },
  { o: { title: "The Space Shuttle", yearsAgo: 45, era: "Modern", kid: "In 1981, the Space Shuttle Columbia launched! It was the first reusable spacecraft — it could fly to space and land like a plane. Shuttles built the ISS and launched satellites for 30 years.", fun: "The Shuttle could carry 29 tons to orbit.", summary: "The Space Shuttle (1981-2011) was the first reusable orbital spacecraft. It enabled ISS construction, satellite deployment and scientific missions.", deep: ["Columbia was the first (1981); Challenger (1986) and Columbia (2003) were lost.", "The Shuttle had 135 missions over 30 years.", "It could carry 7 astronauts and large payloads.", "Private companies (SpaceX, Boeing) now provide crew transport."] } },
  { o: { title: "The International Space Station", yearsAgo: 27, era: "Modern", kid: "In 1998, the first piece of the ISS was launched! It's a giant space laboratory orbiting Earth every 90 minutes. Astronauts from 15 countries have lived there, doing science in zero gravity.", fun: "The ISS is the size of a football field and visible from Earth.", summary: "The International Space Station (ISS) began construction in 1998. It is the largest human-made object in space and a collaboration of 15 nations.", deep: ["The ISS orbits at ~400 km altitude.", "Astronauts experience 16 sunrises/sunsets per day.", "Over 250 people have visited the ISS.", "It is scheduled to operate until ~2030."] } },
  { o: { title: "James Webb Space Telescope", yearsAgo: 4, era: "Modern", kid: "In 2021, the James Webb Space Telescope launched! It's the most powerful telescope ever built. It can see the first galaxies formed after the Big Bang and study planets around other stars!", fun: "JWST's mirror is 6.5 meters across, made of 18 hexagonal segments.", summary: "The James Webb Space Telescope (JWST) launched on December 25, 2021. It observes in infrared, seeing the first galaxies and exoplanet atmospheres.", deep: ["JWST observes infrared light, seeing through dust.", "It can detect the atmospheres of exoplanets.", "Its sunshield is the size of a tennis court.", "JWST will operate for 20+ years."] } },
  // AI
  { o: { title: "ChatGPT and the AI Revolution", yearsAgo: 4, era: "Modern", kid: "In 2022, ChatGPT was released and suddenly everyone could talk to an AI! It can write, code, answer questions and more. AI is now changing how we work, learn and create.", fun: "ChatGPT reached 1 million users in 5 days.", summary: "ChatGPT (November 2022) by OpenAI brought large language models to the public. It sparked an AI revolution across industries.", deep: ["GPT-4 (2023) is more capable and multimodal.", "AI raises questions about jobs, creativity and ethics.", "Other models: Claude, Gemini, Llama.", "AI is being integrated into search, coding and healthcare."] } },
  // Materials (already have plastic, silicon, fiber)
  { o: { title: "Steel (Bessemer)", yearsAgo: 169, era: "Modern", kid: "In 1856, Henry Bessemer figured out how to blow air through molten iron to burn off impurities, making steel cheap and fast! Steel became the backbone of bridges, skyscrapers and railroads.", fun: "The Bessemer process reduced steel costs by 80%.", summary: "The Bessemer process (1856) made steel production fast and cheap by blowing air through molten iron. It enabled mass steel production for construction and industry.", deep: ["Steel is stronger and more durable than iron.", "The process enabled skyscrapers, bridges and railways.", "Bessemer's converter could produce steel in minutes.", "Steel production became the measure of industrial power."] } },
  // Energy
  { o: { title: "The Solar Cell", yearsAgo: 72, era: "Modern", kid: "In 1954, scientists made the first practical solar cell — a device that turns sunlight into electricity! Today solar panels cover rooftops and fields, providing clean energy from the sun.", fun: "The first solar cell powered a toy Ferris wheel.", summary: "The silicon solar cell (Bell Labs, 1954) converted sunlight to electricity with 6% efficiency. Solar power is now the cheapest source of new electricity in many regions.", deep: ["Efficiency has improved from 6% to over 26%.", "Solar is now the cheapest electricity in history.", "Solar panels on the ISS provide power in space.", "Solar + batteries enable off-grid living."] } },
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
  "The Airplane": "https://en.wikipedia.org/wiki/Wright_brothers",
  "The Automobile (Mass Market)": "https://en.wikipedia.org/wiki/Ford_Model_T",
  "Polio Vaccine": "https://en.wikipedia.org/wiki/Polio_vaccine",
  "Keyhole Surgery": "https://en.wikipedia.org/wiki/Laparoscopic_surgery",
  "Statins": "https://en.wikipedia.org/wiki/Statin",
  "Graphene Discovered": "https://en.wikipedia.org/wiki/Graphene",
  "Lithium-Ion Battery": "https://en.wikipedia.org/wiki/Lithium-ion_battery",
  "Wind Turbine": "https://en.wikipedia.org/wiki/Wind_turbine",
  "Television (Broadcast)": "https://en.wikipedia.org/wiki/Television",
  "The Internet (ARPANET)": "https://en.wikipedia.org/wiki/ARPANET",
  "Sputnik Launches": "https://en.wikipedia.org/wiki/Sputnik_1",
  "Gagarin Orbits Earth": "https://en.wikipedia.org/wiki/Yuri_Gagarin",
  "The Space Shuttle": "https://en.wikipedia.org/wiki/Space_Shuttle",
  "The International Space Station": "https://en.wikipedia.org/wiki/International_Space_Station",
  "James Webb Space Telescope": "https://en.wikipedia.org/wiki/James_Webb_Space_Telescope",
  "ChatGPT and the AI Revolution": "https://en.wikipedia.org/wiki/ChatGPT",
  "Steel (Bessemer)": "https://en.wikipedia.org/wiki/Bessemer_process",
  "The Solar Cell": "https://en.wikipedia.org/wiki/Solar_cell",
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
  "The Airplane": ["technology & engineering", "physics & chemistry"],
  "The Automobile (Mass Market)": ["technology & engineering", "everyday life"],
  "Polio Vaccine": ["medicine & health", "biology & evolution"],
  "Keyhole Surgery": ["medicine & health", "technology & engineering"],
  "Statins": ["medicine & health", "physics & chemistry"],
  "Graphene Discovered": ["technology & engineering", "physics & chemistry"],
  "Lithium-Ion Battery": ["technology & engineering", "physics & chemistry"],
  "Wind Turbine": ["technology & engineering", "physics & chemistry"],
  "Television (Broadcast)": ["technology & engineering", "everyday life"],
  "The Internet (ARPANET)": ["technology & engineering", "everyday life"],
  "Sputnik Launches": ["astronomy & space", "technology & engineering"],
  "Gagarin Orbits Earth": ["astronomy & space", "technology & engineering"],
  "ChatGPT and the AI Revolution": ["technology & engineering", "physics & chemistry"],
  "Steel (Bessemer)": ["technology & engineering", "physics & chemistry"],
  "The Solar Cell": ["technology & engineering", "physics & chemistry"],
};
const coEntries = Object.entries(coMap).map(([t, tags]) => '    ' + JSON.stringify(t) + ': ' + JSON.stringify(tags) + ',\n').join("");
if (core.includes(coAnchor)) core = core.replace(coAnchor, coAnchor + coEntries);

fs.writeFileSync(CORE, core);
console.log("added", added, "new milestones");