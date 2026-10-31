/* -------------------------------------------------------------
   Data: milestones from the Big Bang to the modern era.
   yearsAgo: years before present (present = 0).
   era: broad cosmic/geological/human era.
   ------------------------------------------------------------- */
const { MILESTONES, ERA_COLORS, formatTime, formatShort, MAX_YEARS, HUMAN_MAX, LEARN_MORE, GLOSSARY, ERA_INFO, CURRICULUM_TAGS, curriculumTagsFor } = TimelineCore;

function eventColor(i) { return TimelineCore.eventColor(i); }
function eventColorAlpha(i, a) { return TimelineCore.eventColorAlpha(i, a); }



/* -------------------------------------------------------------
   Images for each event (Wikimedia Commons, hotlinked with
   graceful fallback if offline).
   ------------------------------------------------------------- */
/* -------------------------------------------------------------
   Images for each event (Wikimedia Commons, hotlinked via
   Special:FilePath so any size works, with graceful fallback
   if offline).
   ------------------------------------------------------------- */
const COMMONS_FILE = (name) =>
  "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(name) + "?width=700";

const EVENT_MEDIA = {
  "The Big Bang": {
    caption: "The cosmic microwave background — the oldest light in the universe, mapped across the whole sky (ESA/Planck)",
    file: "CMB_Timeline75.jpg",
    url: "./img/the-big-bang.jpg",
  },
  "First Stars Ignite": {
    caption: "The Hubble Ultra Deep Field: a long exposure of mostly empty sky revealing thousands of galaxies (NASA/ESA)",
    file: "Hubble_ultra_deep_field.jpg",
    url: "./img/first-stars-ignite.jpg",
  },
  "Milky Way Forms": {
    caption: "The Milky Way arcing over the Black Rock Desert, Nevada",
    file: "Milky_Way_Night_Sky_Black_Rock_Desert_Nevada.jpg",
    url: "./img/milky-way-forms.jpg",
  },
  "Solar System Forms": {
    caption: "The Sun and planets of our solar system to scale",
    file: "Solar_System_true_color.jpg",
    url: "./img/solar-system-forms.jpg",
  },
  "Earth Forms": {
    caption: "Blue Marble — Earth photographed from Apollo 17, 1972 (NASA)",
    file: "The_Earth_seen_from_Apollo_17.jpg",
    url: "./img/earth-forms.jpg",
  },
  "First Life Appears": {
    caption: "Living stromatolites in Shark Bay, Australia — built by microbes much like the first life on Earth",
    file: "Stromatolites_in_Sharkbay.jpg",
    url: "./img/first-life-appears.jpg",
  },
  "Oxygenation of the Atmosphere": {
    caption: "Banded iron formation rock — layered iron rusted out of ancient oceans by the first oxygen",
    file: "Banded_iron_formation.jpg",
    url: "./img/oxygenation-of-the-atmosphere.jpg",
  },
  "First Complex Life": {
    caption: "Fossil of Anomalocaris, a metre-long predator of the Cambrian seas",
    file: "Anomalocaris_canadensis.jpg",
    url: "./img/first-complex-life.jpg",
  },
  "Dinosaurs Appear": {
    caption: "The holotype Tyrannosaurus rex skeleton at the American Museum of Natural History",
    file: "Tyrannosaurus_Rex_Holotype.jpg",
    url: "./img/dinosaurs-appear.jpg",
  },
  "Dinosaur Extinction": {
    caption: "The K-Pg boundary — fossil clay layer marking the asteroid impact, seen as a thin white line",
    file: "Thin_white_line = KT (now K-Pg) boundary (5090097984).jpg",
    url: "./img/dinosaur-extinction.jpg",
  },
  "First Hominids": {
    caption: "Lucy (AL 288-1), a 3.2-million-year-old hominid skeleton on display in Ethiopia",
    file: "Lucy_blackbg.jpg",
    url: "./img/first-hominids.jpg",
  },
  "Homo sapiens": {
    caption: "Jebel Irhoud 1 — a nearly complete early Homo sapiens skull from Morocco, ~315,000 years old",
    file: "Jebel_Irhoud-1_NMNH.jpg",
    url: "./img/homo-sapiens.jpg",
  },
  "Agriculture Begins": {
    caption: "Göbekli Tepe, Turkey — carved stone pillars raised by hunter-gatherers over 11,000 years ago",
    file: "Göbekli_Tepe.jpg",
    url: "./img/agriculture-begins.jpg",
  },
  "Writing Invented": {
    caption: "Cuneiform wedge-writing pressed into clay, the world first script",
    file: "Cuneiform_script.jpg",
    url: "./img/writing-invented.jpg",
  },
  "Great Pyramid of Giza": {
    caption: "The pyramids of Giza seen from the desert plateau",
    file: "All_Gizah_Pyramids.jpg",
    url: "./img/great-pyramid-of-giza.jpg",
  },
  "Roman Empire": {
    caption: "The Colosseum in Rome — the empire largest amphitheatre",
    file: "Colosseo_2020.jpg",
    url: "./img/roman-empire.jpg",
  },
  "Fall of Rome / Middle Ages": {
    caption: "The nave of Canterbury Cathedral — Gothic architecture of the Middle Ages",
    file: "Canterbury Cathedral Nave 1, Kent, UK - Diliff.jpg",
    url: "./img/fall-of-rome-middle-ages.jpg",
  },
  "Printing Press": {
    caption: "A reconstruction of Gutenberg movable-type press",
    file: "Gutenberg_press.png",
    url: "./img/printing-press.jpg",
  },
  "Industrial Revolution": {
    caption: "Power-loom weaving in 1835 — textile mills like this one drove the Industrial Revolution",
    file: "Powerloom_weaving_in_1835.jpg",
    url: "./img/industrial-revolution.jpg",
  },
  "First Powered Flight": {
    caption: "The Wright Flyer at Kitty Hawk, December 17, 1903 — the moment the machine left the ground",
    file: "First_flight2.jpg",
    url: "./img/first-powered-flight.jpg",
  },
  "Moon Landing": {
    caption: "Buzz Aldrin on the Moon, photographed by Neil Armstrong, July 1969 (NASA)",
    file: "Aldrin_Apollo_11_original.jpg",
    url: "./img/moon-landing.jpg",
  },
  "Internet & World Wide Web": {
    caption: "A globe of the modern internet — every dot a network, every thread a data connection",
    file: "Internet_map_1024_-_transparent,_inverted.png",
    url: "./img/internet-world-wide-web.jpg",
  },
  "The Modern Era": {
    caption: "Blue Marble 2016 — our present-day Earth seen in full daylight (NASA/NOAA)",
    file: "The_Blue_Marble_(remastered).jpg",
    url: "./img/the-modern-era.jpg",
  },
  "Quasars Light Up": {
    caption: "Brilliant beacons of the quasar era — the brightest objects in the young universe",
    url: "./img/quasars-light-up.jpg",
  },
  "Cosmic Noon": {
    caption: "A star-forming nebula — the universe at 'cosmic noon', building stars ten times faster than today",
    url: "./img/cosmic-noon.jpg",
  },
  "The Cosmic Web Forms": {
    caption: "A map of the large-scale universe — galaxies clustered along the threads of the cosmic web",
    url: "./img/the-cosmic-web-forms.jpg",
  },
  "Dark Energy Takes Over": {
    caption: "Distant supernovae revealed the universe's expansion is accelerating — evidence for dark energy",
    url: "./img/dark-energy-takes-over.jpg",
  },
  "The Moon Forms": {
    caption: "Artist's impression of the giant impact that splashed debris into orbit — the birth of the Moon",
    url: "./img/the-moon-forms.jpg",
  },
  "The First Oceans": {
    caption: "Artist's impression of the early Earth, where the first oceans condensed from a cooling steam atmosphere",
    url: "./img/the-first-oceans.jpg",
  },
  "Late Heavy Bombardment": {
    caption: "The crater-pocked lunar surface — a record of the solar system's heavy asteroid blizzard",
    url: "./img/late-heavy-bombardment.jpg",
  },
  "Photosynthesis Invented": {
    caption: "Cyanobacteria — the microbes that invented oxygenic photosynthesis and changed the planet forever",
    url: "./img/photosynthesis-invented.jpg",
  },
  "Complex Cells (Eukaryotes)": {
    caption: "A unicellular eukaryote: one of the complex 'engulfing' cells born of the endosymbiotic partnership",
    url: "./img/complex-cells-eukaryotes.jpg",
  },
  "Cells Begin Pairing Up (Sex Evolves)": {
    caption: "Cell division with gene-crossover — the machinery of recombination that powers sexual reproduction",
    url: "./img/cells-begin-pairing-up-sex-evolves.jpg",
  },
  "Snowball Earth": {
    caption: "Glacial deposits near the equator — evidence that ice reached the tropics more than once",
    url: "./img/snowball-earth.jpg",
  },
  "Plants Cover the Land": {
    caption: "Early land plants like ferns spread across bare continents, building the first soils",
    url: "./img/plants-cover-the-land.jpg",
  },
  "Fire in Our Hands": {
    caption: "Fire meant warmth, light and safety — and cooked food may have powered our growing brains",
    url: "./img/fire-in-our-hands.jpg",
  },
  "The Wheel Turns": {
    caption: "One of the earliest known wheels — a solid wooden disc built up from planks",
    url: "./img/the-wheel-turns.jpg",
  },
  "The Alphabet": {
    caption: "An inscribed letter-scheme — the Phoenician letter names that became our A-B-C",
    url: "./img/the-alphabet.jpg",
  },
  "Two Worlds Collide": {
    caption: "A 16th-century map of the Americas — the moment two world biospheres reconnected",
    url: "./img/two-worlds-collide.jpg",
  },
  "Newton Rewrites the Sky": {
    caption: "Isaac Newton — whose Principia showed one set of laws rules apples and planets alike",
    url: "./img/newton-rewrites-the-sky.jpg",
  },
  "Vaccines Discovered": {
    caption: "A vial of vaccine — the technology that has saved hundreds of millions of lives since 1796",
    url: "./img/vaccines-discovered.jpg",
  },
  "The Transistor": {
    caption: "The first transistors — thumb-sized devices that shrank into billions per chip",
    url: "./img/the-transistor.jpg",
  },
  "The DNA Double Helix": {
    caption: "A DNA double-helix model — the molecule whose code we learned to read and edit",
    url: "./img/the-dna-double-helix.jpg",
  },
  "Smartphones Change Everything": {
    caption: "A modern smartphone: more computing power than the Apollo guidance computer, in a pocket",
    url: "./img/smartphones-change-everything.jpg",
  },
  "Fish Walk onto Land": {
    caption: "Tiktaalik roseae — the famous 'fishapod' whose fins bore the bones of your arms",
    url: "./img/fish-walk-onto-land.jpg",
  },
  "The Coal Forests": {
    caption: "A giant club-moss tree of the Carboniferous coal swamps — several storeys tall",
    url: "./img/the-coal-forests.jpg",
  },
  "The Great Dying": {
    caption: "Siberian volcanic rock at the Permian–Triassic boundary — the 'smoking gun'",
    url: "./img/the-great-dying.jpg",
  },
  "Whales Return to the Sea": {
    caption: "A blue whale — the largest animal ever, descended from small hoofed land mammals",
    url: "./img/whales-return-to-the-sea.jpg",
  },
  "The First Apes": {
    caption: "An ape in the canopy — our ancestors became the first tail-less, tree-swinging primates",
    url: "./img/the-first-apes.jpg",
  },
  "Out of Africa": {
    caption: "The migration routes by which modern humans populated the entire planet",
    url: "./img/out-of-africa.jpg",
  },
  "Democracy is Born": {
    caption: "A marble carving of Athenian democracy in action — citizens voting in the assembly",
    url: "./img/democracy-is-born.jpg",
  },
  "The Islamic Golden Age": {
    caption: "A brass astrolabe — an ancient computer for star navigation, prayer times and mathematics",
    url: "./img/the-islamic-golden-age.jpg",
  },
  "Electricity Lights Up the World": {
    caption: "Early electric lighting — the night sky over our cities changed forever",
    url: "./img/electricity-lights-up-the-world.jpg",
  },
  "Antibiotics Discovered": {
    caption: "Penicillium mould — the accidental discovery that defeated killer bacterial diseases",
    url: "./img/antibiotics-discovered.jpg",
  },
  "The Human Genome Mapped": {
    caption: "Human chromosomes — the Human Genome Project read our complete genetic blueprint",
    url: "./img/the-human-genome-mapped.jpg",
  },
  "Creation": {
    caption: "The Creation of Adam — Michelangelo's Sistine Chapel fresco of the Genesis story",
    url: "./img/creation.jpg",
  },
  "The Great Flood": {
    caption: "Gustave Doré's engraving of the Dove Returning to Noah's Ark",
    url: "./img/the-great-flood.jpg",
  },
  "Abraham's Journey": {
    caption: "Abraham the wanderer — the patriarch honoured by three world religions",
    url: "./img/abraham-s-journey.jpg",
  },
  "Exodus & Mount Sinai": {
    caption: "The crossing scene — the Exodus story as told for over three millennia",
    url: "./img/exodus-mount-sinai.jpg",
  },
  "King David Reigns": {
    caption: "King David — shepherd, giant-slayer, poet and the most famous king of Israel",
    url: "./img/king-david-reigns.jpg",
  },
  "Solomon's Temple": {
    caption: "An engraving of the First Temple in Jerusalem, as described in 1 Kings",
    url: "./img/solomon-s-temple.jpg",
  },
  "The Babylonian Exile": {
    caption: "The exile of Judah to Babylon — where the Jewish community rebuilt itself around scripture",
    url: "./img/the-babylonian-exile.jpg",
  },
  "The Return & Second Temple": {
    caption: "The Second Temple in Jerusalem — modest at first, later expanded by Herod into one of the ancient world's marvels",
    url: "./img/the-return-second-temple.jpg",
  },
  "The Birth of Jesus": {
    caption: "The Nativity — the Christmas story told around the world each December",
    url: "./img/the-birth-of-jesus.jpg",
  },
  "The Crucifixion & Resurrection": {
    caption: "The Crucifixion — the event at the centre of Christian belief",
    url: "./img/the-crucifixion-resurrection.jpg",
  },
  "The Second Temple Falls": {
    caption: "The Arch of Titus in Rome — showing the Temple's menorah carried away in triumph",
    url: "./img/the-second-temple-falls.jpg",
  },
  "Menes Unifies Egypt": {
    caption: "The Narmer Palette — carved stone celebrating the unification of Upper and Lower Egypt",
    url: "./img/menes-unifies-egypt.jpg",
  },
  "Hammurabi's Code": {
    caption: "The black basalt stele of Hammurabi — 282 laws carved for every citizen to read",
    url: "./img/hammurabi-s-code.jpg",
  },
  "The Neo-Assyrian Empire": {
    caption: "An Assyrian palace relief — war and hunting carved in stone as royal propaganda",
    url: "./img/the-neo-assyrian-empire.jpg",
  },
  "Darius & the Persian Empire": {
    caption: "Persepolis — the ceremonial capital of the Persian superpower",
    url: "./img/darius-the-persian-empire.jpg",
  },
  "Alexander the Great": {
    caption: "Alexander depicted in the famous 'Alexander Mosaic' — hunting the Persian king",
    url: "./img/alexander-the-great.jpg",
  },
  "The Caliphates Spread": {
    caption: "A caliphal gold dinar — the currency that linked Spain to Central Asia",
    url: "./img/the-caliphates-spread.jpg",
  },
  "The Mongol Empire": {
    caption: "The Mongol Empire at its height — the largest contiguous land empire ever conquered",
    url: "./img/the-mongol-empire.jpg",
  },
  "The British Empire": {
    caption: "The 1910 map of the British Empire — a quarter of the world in one colour",
    url: "./img/the-british-empire.jpg",
  },
  "The World Wars": {
    caption: "The mushroom cloud over Hiroshima — the war's devastating ending",
    url: "./img/the-world-wars.jpg",
  },
  "Recombination — First Light": {
    caption: "The cosmic microwave background — the oldest light in the universe, mapped across the whole sky",
    url: "./img/recombination-first-light.jpg",
  },
  "First Galaxy Clusters": {
    caption: "A galaxy cluster — thousands of galaxies bound together by gravity, the largest structures in the universe",
    url: "./img/first-galaxy-clusters.jpg",
  },
};

/* -------------------------------------------------------------
   Log-scale positioning.
   Map yearsAgo (0 to 13.8e9) onto the track width.
   We use log10(yearsAgo + 1) so human history isn't crushed
   into an invisible sliver at the right edge.
   ------------------------------------------------------------- */
let scaleMode = "deep"; // "deep" (all 13.8 Bya, log) | "human" (farming → today, log)

function fracFor(i) {
  const m = MILESTONES[i];
  if (scaleMode === "human") {
    return TimelineCore.visibleInCivilization(m) ? TimelineCore.fracFor(m.yearsAgo, HUMAN_MAX) : null;
  }
  if (scaleMode === "powers") {
    if (m.era !== "World Powers") return null; // only superpower events
    const oldest = Math.max(...MILESTONES.filter((mm) => mm.era === "World Powers").map((mm) => mm.yearsAgo));
    return TimelineCore.fracFor(m.yearsAgo, oldest); // scale to the Powers range itself
  }
  if (scaleMode === "future") {
    if (m.yearsAgo >= 0) return null; // only future events
    const futureEvents = MILESTONES.filter((mm) => mm.yearsAgo < 0);
    const minFuture = Math.min(...futureEvents.map((mm) => mm.yearsAgo));
    return TimelineCore.fracFor(-m.yearsAgo, -minFuture);
  }
  // deep time: clamp future events to present
  if (m.yearsAgo < 0) return 1;
  return TimelineCore.fracFor(m.yearsAgo, MAX_YEARS);
}



/* -------------------------------------------------------------
   Format times for labels
   ------------------------------------------------------------- */

/* -------------------------------------------------------------
   Render markers
   ------------------------------------------------------------- */
const markersContainer = document.getElementById("markers");
const connectorsContainer = document.getElementById("connectors");
const track = document.getElementById("track");

MILESTONES.forEach((m, i) => {
  const frac = fracFor(i);

  const color = eventColor(i);
  const colorSoft = eventColorAlpha(i, 0.3);

  const marker = document.createElement("div");
  marker.className = "marker";
  marker.setAttribute("aria-label", `${m.title}, ${formatTime(m.yearsAgo)}`);
  marker.setAttribute("role", "button");
  marker.tabIndex = 0;
  marker.style.left = `${(frac * 100).toFixed(4)}%`;
  marker.style.background = color;
  marker.style.boxShadow = `0 0 0 3px ${colorSoft}`;
  marker.dataset.index = i;
  marker.dataset.era = m.era;

  const label = document.createElement("div");
  label.className = "marker-label";
  label.textContent = `${formatShort(m.yearsAgo)} · ${m.title}`;
  label.style.left = `${(frac * 100).toFixed(4)}%`;
  label.style.borderLeft = `2px solid ${color}`;
  label.style.paddingLeft = "6px";

  const connector = document.createElement("div");
  connector.className = "connector";
  connector.style.left = `${(frac * 100).toFixed(4)}%`;
  connector.style.background = eventColorAlpha(i, 0.33);

  markersContainer.appendChild(marker);
  markersContainer.appendChild(label);
  connectorsContainer.appendChild(connector);
});

/* Store positions so we can sync connectors */
const markerEls = Array.from(markersContainer.querySelectorAll(".marker"));
const connectorEls = Array.from(connectorsContainer.querySelectorAll(".connector"));
const labelEls = Array.from(markersContainer.querySelectorAll(".marker-label"));

/* Make labels clickable to select their event (mirrors marker click) */
labelEls.forEach((el, i) => {
  el.style.pointerEvents = "auto";
  el.setAttribute("role", "button");
  el.tabIndex = 0;
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    cancelClose();
    pinnedIndex = (pinnedIndex === i) ? null : i;
    hoveredIndex = null;
    updatePanel();
  });
  el.addEventListener("mouseenter", () => {
    cancelClose();
    hoveredIndex = i;
    updatePanel();
  });
  el.addEventListener("mouseleave", () => {
    hoveredIndex = null;
    if (pinnedIndex === null) scheduleClose();
  });
  el.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    pinnedIndex = (pinnedIndex === i) ? null : i;
    hoveredIndex = null;
    updatePanel();
  });
});

/* -------------------------------------------------------------
   Staggered label layout.
   Labels sit in tiers above the number line; when two labels
   would overlap horizontally the lower one moves to the next
   tier up, so nothing is jumbled together.
   ------------------------------------------------------------- */
function layoutLabels() {
  const mobile = window.innerWidth <= 640;
  const lineTop = mobile ? 170 : 200;
  const tierH = mobile ? 20 : 22;
  const maxAbove = 4;   // tiers above the line before overflowing below
  const trackRect = track.getBoundingClientRect();

  const items = Array.from(labelEls)
    .filter((el) => el.style.display !== "none")
    .map((el) => {
      const r = el.getBoundingClientRect();
      // provisional
      el.style.top = `${lineTop - 10 - tierH}px`;
      const r2 = el.getBoundingClientRect();
      return { el, x: r2.left - trackRect.left, w: r2.width };
    });

  items.sort((a, b) => a.x - b.x);

  // Two-pass collision: prefer above the line; overflow to below when crowded.
  const aboveRows = [];  // aboveRows[t] = array of {x,w}
  const belowRows = [];  // belowRows[t] = array of {x,w}
  const clash = (row, x, w, minGap) => row.some((o) => !(x + w + minGap < o.x || o.x + o.w + minGap < x));

  items.forEach((it) => {
    const minGap = 8;
    // try above
    let placed = false;
    let t = 0;
    for (; t <= maxAbove; t++) {
      const row = aboveRows[t] || (aboveRows[t] = []);
      if (!clash(row, it.x, it.w, minGap)) { placed = true; break; }
    }
    if (placed) {
      (aboveRows[t] = aboveRows[t] || []).push({ x: it.x, w: it.w });
      it.el.style.top = `${lineTop - 10 - (t + 1) * tierH}px`;
      it.el.dataset.side = "above";
      return;
    }
    // overflow below
    let bt = 0;
    for (; bt <= maxAbove; bt++) {
      const row = belowRows[bt] || (belowRows[bt] = []);
      if (!clash(row, it.x, it.w, minGap)) { placed = true; break; }
    }
    if (!placed) bt = belowRows.length;
    (belowRows[bt] = belowRows[bt] || []).push({ x: it.x, w: it.w });
    it.el.style.top = `${lineTop + 14 + (bt + 1) * tierH}px`;
    it.el.dataset.side = "below";
  });
}

layoutLabels();

/* Re-stagger when the window (and thus the vw-scaled track) changes */
let resizeRaf = null;
window.addEventListener("resize", () => {
  if (resizeRaf) cancelAnimationFrame(resizeRaf);
  resizeRaf = requestAnimationFrame(() => {
    layoutLabels();
    updateWash();
  });
});

/* -------------------------------------------------------------
   Context wash — background colored by the events in view.
   ------------------------------------------------------------- */
const washBlobs = Array.from(document.querySelectorAll(".wash .blob"));

function updateWash() {
  const vp = viewportEl;
  if (!vp) return;
  const vr = vp.getBoundingClientRect();
  const cx = vr.left + vr.width / 2;

  const nearest = markerEls
    .filter((el) => el.style.display !== "none")
    .map((el) => {
      const r = el.getBoundingClientRect();
      return { el, i: Number(el.dataset.index), d: Math.abs(r.left + r.width / 2 - cx) };
    })
    .sort((a, b) => a.d - b.d)
    .slice(0, washBlobs.length);

  washBlobs.forEach((blob, k) => {
    const it = nearest[k];
    if (!it) return;
    const r = it.el.getBoundingClientRect();
    blob.style.left = `${r.left + window.scrollX - window.innerWidth * 0.28}px`;
    blob.style.top = `${r.top - window.innerHeight * 0.18}px`;
    blob.style.background = eventColorAlpha(it.i, 0.16 - k * 0.03);
  });
}

const viewportEl = document.querySelector(".viewport");
viewportEl.addEventListener("scroll", () => {
  if (washRaf) cancelAnimationFrame(washRaf);
  washRaf = requestAnimationFrame(updateWash);
});
let washRaf = null;

updateWash();

/* -------------------------------------------------------------
   Panel / detail logic
   ------------------------------------------------------------- */
const panel = document.getElementById("panel");
const panelTitle = document.getElementById("panel-title");
const panelTime = document.getElementById("panel-time");
const panelBody = document.getElementById("panel-body");
const closeBtn = document.getElementById("close-btn");

let pinnedIndex = null;   // clicked / selected marker (stays open)
let hoveredIndex = null;  // marker currently hovered
let closeTimer = null;

function setMarkerActive(index) {
  markerEls.forEach((el, i) => {
    const color = eventColor(i);
    el.classList.toggle("active", i === index);
    if (i === index) {
      el.style.background = color;
      el.style.boxShadow = `0 0 0 5px ${eventColorAlpha(i, 0.34)}, 0 0 18px ${eventColorAlpha(i, 0.55)}`;
      el.style.transform = "translate(-50%, -50%) scale(1.5)";
    } else {
      el.style.boxShadow = `0 0 0 3px ${eventColorAlpha(i, 0.3)}`;
      el.style.transform = "translate(-50%, -50%)";
    }
  });
  connectorEls.forEach((el, i) => {
    el.classList.toggle("active", i === index);
    if (i === index) {
      el.style.background = eventColor(i);
      el.style.height = "90px";
    } else {
      el.style.background = eventColorAlpha(i, 0.33);
      el.style.height = "0";
    }
  });
}

function renderDetail(index) {
  const m = MILESTONES[index];
  const lang = (typeof uiLang !== "undefined" ? uiLang : "en") || "en";
  const tr = (m.translations && m.translations[lang]) ? m.translations[lang] : null;
  const kidText = (tr && tr.kid) ? tr.kid : m.kid;
  const funText = (tr && tr.fun) ? tr.fun : m.fun;
  const summaryText = (tr && tr.summary) ? tr.summary : m.summary;
  const deepTexts = (tr && tr.deep) ? tr.deep : m.deep;
  panelTitle.textContent = m.title;
  panelTime.textContent = formatTime(m.yearsAgo);

  /* Era-tinted header chrome */
  const tint = eventColor(index);
  panel.style.setProperty("--panel-accent", tint);
  panel.style.setProperty("--panel-tint", eventColorAlpha(index, 0.1));
  if (typeof prevBtn !== "undefined" && prevBtn) {
    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= MILESTONES.length - 1;
  }

  const color = eventColor(index);
    const era = document.createElement("div");
  era.className = "era-chip";
  era.style.setProperty("--era-color", color);
  era.innerHTML = `<span class="dot"></span>${m.era}`;

  /* For young explorers — pitched at a 6-year-old */
  const kid = document.createElement("div");
  kid.className = "kid-card";
  const kidH = document.createElement("h3");
  kidH.textContent = (TimelineCore.STRINGS[uiLang] || TimelineCore.STRINGS.en).kidTitle;
  const kidP = document.createElement("p");
  kidP.textContent = kidText;
  const funP = document.createElement("p");
  funP.className = "fun";
  funP.textContent = `💡 Did you know? ${funText}`;
  kid.appendChild(kidH);
  kid.appendChild(kidP);
  kid.appendChild(funP);

  /* The bigger story — general audience */
  const story = document.createElement("div");
  story.className = "story-cell";
  const storyH = document.createElement("h3");
  storyH.textContent = (TimelineCore.STRINGS[uiLang] || TimelineCore.STRINGS.en).storyTitle;
  const storyP = document.createElement("p");
  const lens = (localStorage.getItem("ct-lens") || "scientific");
  const perspective = (m.perspectives && m.perspectives[lens]) ? m.perspectives[lens] : summaryText;
  storyP.textContent = perspective;
  story.appendChild(storyH);
  story.appendChild(storyP);

  const twoCol = document.createElement("div");
  twoCol.className = "two-col";
  twoCol.appendChild(kid);
  twoCol.appendChild(story);

  /* Go deeper — expert level: numbers, mechanisms, open questions */
  const deep = document.createElement("div");
  deep.className = "detail-block";
  const deepH = document.createElement("h3");
  deepH.textContent = (TimelineCore.STRINGS[uiLang] || TimelineCore.STRINGS.en).deepTitle;
  const ul = document.createElement("ul");
  deepTexts.forEach((d) => {
    const li = document.createElement("li");
    li.textContent = d;
    ul.appendChild(li);
  });
  deep.appendChild(deepH);
  deep.appendChild(ul);

  /* Words to know: glossary terms used in this event's text */
  const glossary = document.createElement("div");
  glossary.className = "glossary-chips";
  const glTitle = document.createElement("span");
  glTitle.className = "gl-title";
  glTitle.textContent = "🔤 Words to know";
  glossary.appendChild(glTitle);
  const haystack = (m.kid + " " + m.summary + " " + m.deep.join(" ")).toLowerCase();
  const matches = TimelineCore.glossaryTermsFor(haystack);
  matches.forEach(function (pair) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "glossary-chip";
    chip.textContent = pair.term;
    chip.title = pair.def;
    chip.dataset.term = pair.term;
    glossary.appendChild(chip);
  });
  if (matches.length === 0) {
    glTitle.textContent = "";
    glossary.style.display = "none";
  } else {
    const moreChip = document.createElement("button");
    moreChip.type = "button";
    moreChip.className = "glossary-chip";
    moreChip.textContent = "see all terms";
    moreChip.id = "glossary-open-inline";
    glossary.appendChild(moreChip);
  }

  panelBody.innerHTML = "";

  const media = EVENT_MEDIA[m.title];
  const stage = document.getElementById("image-stage");
  if (stage) {
    if (media && media.url) {
      stage.innerHTML = "";
      const img = document.createElement("img");
      img.src = media.url || COMMONS_FILE(media.file);
      img.referrerPolicy = "no-referrer";
      img.alt = media.caption || m.title;
      img.loading = "lazy";
      img.addEventListener("error", () => { stage.style.display = "none"; });
      const caption = document.createElement("figcaption");
      caption.textContent = `${media.caption} · Image: Wikimedia Commons`;
      stage.appendChild(img);
      stage.appendChild(caption);
      // position the stage below the selected marker
      const marker = markerEls[index];
      if (marker) {
        const left = marker.style.left;
        if (left) stage.style.left = left;
      }
      stage.style.display = "";
      stage.removeAttribute("hidden");
      stage.classList.remove("hidden");
    } else {
      stage.innerHTML = "";
      stage.style.display = "none";
      stage.setAttribute("hidden", "");
      stage.classList.add("hidden");
    }
  }
  panelBody.appendChild(era);
  panelBody.appendChild(twoCol);
  panelBody.appendChild(deep);
  panelBody.appendChild(glossary);

  /* Progress tracking */
  try {
    const read = JSON.parse(localStorage.getItem("ct-read") || "[]");
    if (read.indexOf(m.title) === -1) {
      read.push(m.title);
      localStorage.setItem("ct-read", JSON.stringify(read));
    }
    const badge = document.getElementById("progress-badge");
    if (badge) badge.textContent = read.length + " / " + MILESTONES.length + " read";
  } catch (e) {}

  if (LEARN_MORE[m.title]) {
    const more = document.createElement("a");
    more.className = "learn-more";
    more.href = LEARN_MORE[m.title];
    more.target = "_blank";
    more.rel = "noopener";
    more.textContent = (TimelineCore.STRINGS[uiLang] || TimelineCore.STRINGS.en).readMore.replace("🔗 Read more", "🔗") + ": " + m.title + " · Wikipedia";
    panelBody.appendChild(more);
  }

  /* See-also cross-references */
  if (m.seeAlso && m.seeAlso.length) {
    const sa = document.createElement("div");
    sa.className = "see-also";
    const saTitle = document.createElement("span");
    saTitle.className = "gl-title";
    saTitle.textContent = "🔗 See also";
    sa.appendChild(saTitle);
    m.seeAlso.forEach(function (title) {
      const idx = MILESTONES.findIndex(function (mm) { return mm.title === title; });
      if (idx === -1) return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "glossary-chip";
      btn.textContent = title;
      btn.title = formatTime(MILESTONES[idx].yearsAgo);
      btn.addEventListener("click", function () { selectEvent(idx); });
      sa.appendChild(btn);
    });
    if (sa.children.length > 1) panelBody.appendChild(sa);
  }
}

function displayedIndex() {
  return hoveredIndex !== null ? hoveredIndex : pinnedIndex;
}

function updatePanel() {
  const idx = displayedIndex();
  if (idx === null) {
    panel.classList.remove("open");
    setMarkerActive(null);
    const stage = document.getElementById("image-stage");
    if (stage) { stage.style.display = "none"; stage.setAttribute("hidden", ""); stage.classList.add("hidden"); stage.innerHTML = ""; }
    return;
  }
  panel.classList.add("open");
  setMarkerActive(idx);
  renderDetail(idx);
  if (pinnedIndex !== null) updateHash();
}

function scheduleClose() {
  if (closeTimer) clearTimeout(closeTimer);
  closeTimer = setTimeout(() => {
    if (pinnedIndex === null && hoveredIndex === null) {
      updatePanel();
    }
  }, 120);
}

function cancelClose() {
  if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
}

/* Marker interactions */
markerEls.forEach((el, i) => {
  el.addEventListener("mouseenter", () => {
    cancelClose();
    hoveredIndex = i;
    updatePanel();
  });
  el.addEventListener("mouseleave", () => {
    hoveredIndex = null;
    if (pinnedIndex === null) scheduleClose();
  });
  el.addEventListener("focus", () => {
    hoveredIndex = i;
    updatePanel();
  });
  el.addEventListener("blur", () => {
    hoveredIndex = null;
    if (pinnedIndex === null) scheduleClose();
  });
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    cancelClose();
    pinnedIndex = (pinnedIndex === i) ? null : i;
    hoveredIndex = null;
    updatePanel();
  });
});

/* Keep panel open while the cursor is over it */
panel.addEventListener("mouseenter", cancelClose);
panel.addEventListener("mouseleave", () => {
  if (pinnedIndex === null) scheduleClose();
});

/* Panel click should not deselect */
panel.addEventListener("click", (e) => e.stopPropagation());

/* Track click: deselect when clicking the track background */
track.addEventListener("click", (e) => {
  const t = e.target;
  if (t === track || t.classList.contains("number-line") || t.classList.contains("axis") || t.classList.contains("tick-label")) {
    pinnedIndex = null;
    hoveredIndex = null;
    cancelClose();
    updatePanel();
  }
});

closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  pinnedIndex = null;
  hoveredIndex = null;
  cancelClose();
  updatePanel();
});

/* Keyboard */
track.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    e.preventDefault();
    const base = hoveredIndex !== null ? hoveredIndex : (pinnedIndex !== null ? pinnedIndex : 0);
    let next = base + (e.key === "ArrowLeft" ? -1 : 1);
    next = Math.max(0, Math.min(MILESTONES.length - 1, next));
    markerEls[next].focus();
    hoveredIndex = next;
    pinnedIndex = null;
    cancelClose();
    updatePanel();
  }
  if (e.key === "Escape") {
    pinnedIndex = null;
    hoveredIndex = null;
    cancelClose();
    updatePanel();
  }
});

/* Close when clicking page background */
document.body.addEventListener("click", (e) => {
  if (e.target === document.body) {
    pinnedIndex = null;
    hoveredIndex = null;
    cancelClose();
    updatePanel();
  }
});

/* Panel navigation arrows */
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

function scrollToMarker(i) {
  const el = markerEls[i];
  if (!el) return;
  const vp = viewportEl;
  const vr = vp.getBoundingClientRect();
  const mr = el.getBoundingClientRect();
  const overshoot = (mr.left + mr.width / 2) - (vr.left + vr.width / 2);
  const target = Math.max(
    0,
    Math.min(vp.scrollWidth - vp.clientWidth, vp.scrollLeft + overshoot)
  );
  vp.scrollTo({ left: target, behavior: "smooth" });
}

function step(delta) {
  const idx = pinnedIndex !== null ? pinnedIndex : (hoveredIndex !== null ? hoveredIndex : 0);
  const next = Math.max(0, Math.min(MILESTONES.length - 1, idx + delta));
  pinnedIndex = next;
  hoveredIndex = null;
  cancelClose();
  updatePanel();
  scrollToMarker(next);
}

prevBtn.addEventListener("click", (e) => { e.stopPropagation(); step(-1); });
nextBtn.addEventListener("click", (e) => { e.stopPropagation(); step(1); });

/* Arrow keys work in the panel too */
panel.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
  if (e.key === "Escape") {
    pinnedIndex = null;
    hoveredIndex = null;
    cancelClose();
    updatePanel();
  }
});

/* -------------------------------------------------------------
   Scale modes & re-layout
   ------------------------------------------------------------- */
const numberLineEl = document.querySelector(".number-line");
const modeDeepBtn = document.getElementById("mode-deep");
const modeHumanBtn = document.getElementById("mode-human");
const modePowersBtn = document.getElementById("mode-powers");
const zoomOutBtn = document.getElementById("zoom-out");
const zoomInBtn = document.getElementById("zoom-in");
const BASE_VW = { deep: 350, human: 350, powers: 260, future: 300 };
let zoom = 1;

function buildLineGradient() {
  // Era-level bands: each era gets a colour stop at its first and last event.
  // This keeps the gradient string short enough for the browser to parse.
  const eraStops = [];
  const eraOrder = [];
  const eraRanges = {};
  MILESTONES.forEach((m, i) => {
    const f = fracFor(i);
    if (f === null || isNaN(f)) return;
    if (scaleMode !== "future" && m.era === "Future") return; // future events only show in Future mode
    if (!eraRanges[m.era]) {
      eraRanges[m.era] = { first: f, last: f, color: eventColor(i) };
      eraOrder.push(m.era);
    } else {
      eraRanges[m.era].last = f;
      // keep the colour of the middle-ish event for variety
    }
  });
  // Build stops: at each era boundary, transition to the era colour
  const stops = [];
  eraOrder.forEach((era) => {
    const r = eraRanges[era];
    const lo = Math.max(0, r.first * 100);
    const hi = Math.min(100, r.last * 100);
    const mid = (lo + hi) / 2;
    stops.push(`${r.color} ${lo.toFixed(2)}%`);
    stops.push(`${r.color} ${hi.toFixed(2)}%`);
  });
  // Sort by position (extract the trailing percentage)
  stops.sort((a, b) => {
    const ma = a.match(/([\d.]+)%\s*$/);
    const mb = b.match(/([\d.]+)%\s*$/);
    const pa = ma ? parseFloat(ma[1]) : 0;
    const pb = mb ? parseFloat(mb[1]) : 0;
    return pa - pb;
  });
  if (stops.length) {
    numberLineEl.style.backgroundImage = `linear-gradient(90deg, ${stops.join(", ")})`;
  }
}

function applyPositions() {
  track.style.width = trackWidthVw().toFixed(2) + "vw";
  track.style.minWidth = track.style.width;
  markerEls.forEach((el, i) => {
    const f = fracFor(i);
    const hidden = f === null;
    [el, labelEls[i], connectorEls[i]].forEach((node) => {
      node.style.display = hidden ? "none" : "";
    });
    if (hidden) return;
    const pct = `${(f * 100).toFixed(4)}%`;
    el.style.left = pct;
    labelEls[i].style.left = pct;
    connectorEls[i].style.left = pct;
  });
  layoutLabels();
  buildLineGradient();
  updateWash();
  if (typeof syncZoomUI === "function") syncZoomUI();
}

function trackWidthVw() {
  return BASE_VW[scaleMode] * zoom;
}

function baseWidthVw() {
  return BASE_VW[scaleMode];
}

function syncZoomUI() {
  const slider = document.getElementById("zoom-slider");
  const val = document.getElementById("zoom-val");
  if (slider) slider.value = Math.round(zoom * 100);
  if (val) val.textContent = Math.round(zoom * 100) + "%";
  // flash the zoom indicator
  const ind = document.getElementById("zoom-indicator");
  if (ind) {
    ind.textContent = Math.round(zoom * 100) + "%";
    ind.classList.add("visible");
    clearTimeout(ind._hideTimer);
    ind._hideTimer = setTimeout(() => ind.classList.remove("visible"), 1200);
  }
}

/* anchorContentPx: keep this content-x pixel under the same viewport spot after resize */
function setZoom(next, anchorContentPx, anchorViewportX) {
  zoom = Math.min(4, Math.max(0.35, next));
  const vp = viewportEl;
  const old = track.getBoundingClientRect().width;
  const aContent = anchorContentPx != null ? anchorContentPx : vp.scrollLeft + vp.clientWidth / 2;
  const aView = anchorViewportX != null ? anchorViewportX : vp.clientWidth / 2;
  track.style.width = trackWidthVw().toFixed(2) + "vw";
  track.style.minWidth = track.style.width;
  // keep the same content point under the same viewport position
  const newContentX = (aContent / old) * track.getBoundingClientRect().width;
  vp.scrollLeft = Math.max(
    0,
    Math.min(vp.scrollWidth - vp.clientWidth, newContentX - aView)
  );
  requestAnimationFrame(() => { layoutLabels(); updateWash(); });
  syncZoomUI();
}

zoomOutBtn.addEventListener("click", () => setZoom(zoom / 1.25));
zoomInBtn.addEventListener("click", () => setZoom(zoom * 1.25));
const zoomSlider = document.getElementById("zoom-slider");
if (zoomSlider) {
  zoomSlider.addEventListener("input", () => setZoom(Number(zoomSlider.value) / 100));
}

/* ── Coalesced, cursor-anchored zoom ───────────────────────────────
   Wheel events fire far faster than rAF, so we accumulate deltas into a
   single target zoom and apply it once per frame. The anchor (content
   coordinate under the cursor) is captured on the FIRST wheel of a burst
   so the timeline never drifts or "skips" while scrolling.
   shift+wheel still scrolls horizontally; trackpad pinch (ctrl+wheel)
   zooms gently and proportionally. */
let pendingZoom = null;
let pendingAnchor = null;
let zoomRafId = 0;

function scheduleZoom(step, contentX, viewX) {
  if (pendingZoom === null) {
    pendingZoom = zoom;
    pendingAnchor = { contentX: contentX, viewX: viewX };
  }
  pendingZoom = Math.min(4, Math.max(0.35, pendingZoom * step));
  if (!zoomRafId) {
    zoomRafId = requestAnimationFrame(function () {
      zoomRafId = 0;
      const target = pendingZoom;
      const anchor = pendingAnchor;
      pendingZoom = null;
      pendingAnchor = null;
      setZoom(target, anchor.contentX, anchor.viewX);
    });
  }
}

viewportEl.addEventListener("wheel", function (e) {
  if (scaleMode === undefined) return;
  const vp = viewportEl;
  // Ctrl/Cmd + wheel → zoom (anchored at cursor)
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault();
    const vr = vp.getBoundingClientRect();
    const contentX = vp.scrollLeft + (e.clientX - vr.left);
    const viewX = e.clientX - vr.left;
    const step = Math.exp(-e.deltaY * 0.012);
    scheduleZoom(step, contentX, viewX);
    return;
  }
  // Otherwise → horizontal scroll (translate vertical wheel into horizontal scroll)
  e.preventDefault();
  // support both line (deltaMode 0/1) and pixel (deltaMode 0) deltas
  let delta = e.deltaY;
  if (e.deltaMode === 1) delta *= 40;       // lines → pixels
  if (e.deltaMode === 2) delta *= vp.clientHeight; // pages
  // smooth out trackpad vs mouse: clamp per-event delta
  const maxStep = vp.clientWidth * 0.15;
  if (Math.abs(delta) > maxStep) delta = Math.sign(delta) * maxStep;
  vp.scrollLeft = Math.max(0, Math.min(vp.scrollWidth - vp.clientWidth, vp.scrollLeft + delta));
}, { passive: false });

/* double-click zooms in, alt+double-click zooms out — anchored at cursor */
viewportEl.addEventListener("dblclick", function (e) {
  const vp = viewportEl;
  const vr = vp.getBoundingClientRect();
  const contentX = vp.scrollLeft + (e.clientX - vr.left);
  setZoom(e.altKey ? zoom / 1.5 : zoom * 1.5, contentX, e.clientX - vr.left);
});

/* reset zoom on a double-click of the % readout */
const zoomValEl = document.getElementById("zoom-val");
if (zoomValEl) {
  zoomValEl.style.cursor = "pointer";
  zoomValEl.title = "Click to reset zoom to 100%";
  zoomValEl.addEventListener("click", function () {
    setZoom(1, viewportEl.scrollLeft + viewportEl.clientWidth / 2, viewportEl.clientWidth / 2);
  });
}

/* + / - / ArrowUp / ArrowDown keys zoom when the timeline has focus.
   Zoom is anchored at the selected dot (if any) so zooming in
   reveals the space around that event, and zooming out restores context. */
function zoomAnchor() {
  const idx = displayedIndex();
  if (idx !== null && markerEls[idx]) {
    const m = markerEls[idx];
    const r = m.getBoundingClientRect();
    const vp = viewportEl;
    const vr = vp.getBoundingClientRect();
    const contentX = vp.scrollLeft + (r.left + r.width / 2 - vr.left);
    const viewX = r.left + r.width / 2 - vr.left;
    return { contentX, viewX };
  }
  return { contentX: vp.scrollLeft + vp.clientWidth / 2, viewX: vp.clientWidth / 2 };
}
function handleZoomKey(e) {
  const tag = (e.target && e.target.tagName) || "";
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
  if (e.key === "+" || e.key === "=" || e.key === "ArrowUp") {
    e.preventDefault();
    const a = zoomAnchor();
    setZoom(zoom * 1.25, a.contentX, a.viewX);
  } else if (e.key === "-" || e.key === "_" || e.key === "ArrowDown") {
    e.preventDefault();
    const a = zoomAnchor();
    setZoom(zoom / 1.25, a.contentX, a.viewX);
  }
}
track.addEventListener("keydown", handleZoomKey);
document.addEventListener("keydown", handleZoomKey);

function setScaleMode(mode) {
  if (scaleMode === mode) return;
  scaleMode = mode;
  modeDeepBtn.classList.toggle("on", mode === "deep");
  modeHumanBtn.classList.toggle("on", mode === "human");
  modePowersBtn.classList.toggle("on", mode === "powers");
  if (modeFutureBtn) modeFutureBtn.classList.toggle("on", mode === "future");
  viewportEl.scrollLeft = 0;
  const current = displayedIndex();
  if (current !== null && fracFor(current) === null) {
    pinnedIndex = null;
    hoveredIndex = null;
    cancelClose();
    updatePanel();
  } else if (pinnedIndex !== null && hoveredIndex === null) {
    scrollToMarker(pinnedIndex);
  }
  applyPositions();
  updateHash();
}

modeDeepBtn.addEventListener("click", () => setScaleMode("deep"));
modeHumanBtn.addEventListener("click", () => setScaleMode("human"));
modePowersBtn.addEventListener("click", () => setScaleMode("powers"));
const modeFutureBtn = document.getElementById("mode-future");
if (modeFutureBtn) modeFutureBtn.addEventListener("click", () => setScaleMode("future"));

/* -------------------------------------------------------------
   Event selection helpers + search + era legend jumps
   ------------------------------------------------------------- */
function selectEvent(i) {
  if (fracFor(i) === null) setScaleMode("deep");
  cancelClose();
  pinnedIndex = i;
  hoveredIndex = null;
  updatePanel();
  scrollToMarker(i);
}

/* Curriculum filter chips */
  (function tagFeature() {
    if (!document.getElementById("tags")) return;
    const tagsRow = document.getElementById("tags");
    const label = document.createElement("span");
    label.className = "tags-label";
    label.textContent = "subjects:";
    tagsRow.appendChild(label);

    let activeTag = null;
    const chipEls = [];

    function applyTagFilter(tag) {
      activeTag = tag;
      chipEls.forEach(function (c) {
        c.classList.toggle("on", c.dataset.tag === tag);
      });
      markerEls.forEach(function (el, i) {
        const matches = tag === null || curriculumTagsFor(MILESTONES[i]).indexOf(tag) !== -1;
        el.classList.toggle("dimmed", !matches);
        labelEls[i].classList.toggle("dimmed", !matches);
        connectorEls[i].classList.toggle("dimmed", !matches);
      });
    }

    CURRICULUM_TAGS.forEach(function (tag) {
      const used = MILESTONES.some(function (m) {
        return curriculumTagsFor(m).indexOf(tag) !== -1;
      });
      if (!used) return;
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "tag-chip";
      chip.dataset.tag = tag;
      chip.textContent = tag;
      chip.setAttribute("aria-pressed", "false");
      chip.addEventListener("click", function () {
        const next = activeTag === tag ? null : tag;
        chip.setAttribute("aria-pressed", String(next === tag));
        applyTagFilter(next);
      });
      chipEls.push(chip);
      tagsRow.appendChild(chip);
    });
  })();

  /* Era legend chips jump to the first event of that era */
document.getElementById("legend").addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const chip = e.target.closest(".chip");
  if (!chip) return;
  e.preventDefault();
  const era = chip.dataset.era;
  if (!era) return;
  const idx = MILESTONES.findIndex((m) => m.era === era && fracFor(MILESTONES.indexOf(m)) !== null) !== -1
    ? MILESTONES.findIndex((m) => m.era === era && fracFor(MILESTONES.indexOf(m)) !== null)
    : MILESTONES.findIndex((m) => m.era === era);
  if (idx !== -1) selectEvent(idx);
});
document.getElementById("legend").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  const era = chip.dataset.era;
  if (!era) return;
  let idx = MILESTONES.findIndex(
    (m) => m.era === era && fracFor(MILESTONES.indexOf(m)) !== null
  );
  if (idx === -1) {
    setScaleMode("deep");
    idx = MILESTONES.findIndex((m) => m.era === era);
  }
  if (idx !== -1) selectEvent(idx);
});

/* Search */
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

function hideResults() {
  searchResults.hidden = true;
  searchResults.innerHTML = "";
}

function runSearch() {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { hideResults(); return; }
  let matches = [];
  if (TimelineCore.searchMilestones) {
    matches = TimelineCore.searchMilestones(q, 12);
  } else {
    const words = q.split(/\s+/).filter(Boolean);
    MILESTONES.forEach((m, i) => {
      const hay = `${m.title} ${m.era} ${m.summary} ${m.kid} ${m.fun} ${m.deep.join(" ")} ${m.yearsAgo} ${curriculumTagsFor(m).join(" ")}`.toLowerCase();
      if (words.every((w) => hay.includes(w))) matches.push(i);
    });
  }
  searchResults.hidden = false;
  searchResults.innerHTML = "";
  if (!matches.length) {
    const div = document.createElement("div");
    div.className = "search-empty";
    div.textContent = "No matching events on this timeline.";
    searchResults.appendChild(div);
    return;
  }
  matches.forEach((i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "search-result";
    const dot = document.createElement("span");
    dot.className = "sr-dot";
    dot.style.background = eventColor(i);
    const label = document.createElement("span");
    label.textContent = MILESTONES[i].title;
    const time = document.createElement("span");
    time.className = "sr-time";
    time.textContent = formatTime(MILESTONES[i].yearsAgo);
    btn.appendChild(dot);
    btn.appendChild(label);
    btn.appendChild(time);
    btn.addEventListener("mousedown", (e) => e.preventDefault()); // keep input focus
    btn.addEventListener("click", () => {
      selectEvent(i);
      hideResults();
      searchInput.blur();
    });
    searchResults.appendChild(btn);
  });
}

searchInput.addEventListener("input", runSearch);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const first = searchResults.querySelector(".search-result");
    if (first) first.click();
  }
  if (e.key === "Escape") {
    searchInput.value = "";
    hideResults();
    searchInput.blur();
  }
});

/* Apply the timeline to the current scale mode right away */
applyPositions();

/* -------------------------------------------------------------
   Guided tour: walk the full story automatically.
   ------------------------------------------------------------- */
const tourBtn = document.getElementById("tour-btn");
let tourIndex = 0;
let tourTimer = null;
const TOUR_DELAY = 6000;

function updateTourButton(text) {
  tourBtn.textContent = text;
}

function tourLabel() {
  return "⏸ Tour " + String(tourIndex + 1) + "/" + MILESTONES.length + " · " + MILESTONES[tourIndex].title;
}

function stopTour() {
  if (tourTimer) { clearInterval(tourTimer); tourTimer = null; }
  updateTourButton("▶ Take the tour");
}

function startTour() {
  stopTour();
  tourIndex = 0;
  selectEvent(tourIndex);
  updateTourButton(tourLabel());
  tourTimer = setInterval(function () {
    tourIndex += 1;
    if (tourIndex >= MILESTONES.length) { stopTour(); return; }
    selectEvent(tourIndex);
    updateTourButton(tourLabel());
  }, TOUR_DELAY);
}

tourBtn.addEventListener("click", function () {
  if (tourTimer) { stopTour(); } else { startTour(); }
});

/* Stop the tour if the user takes over by hovering or pinning */
markerEls.forEach(function (el) {
  ["mouseenter", "click"].forEach(function (evt) {
    el.addEventListener(evt, function () { if (tourTimer) stopTour(); });
  });
});

/* -------------------------------------------------------------
   Glossary modal
   ------------------------------------------------------------- */
const glossaryBtn = document.getElementById("glossary-btn");
const glossaryModal = document.getElementById("glossary-modal");
const glossaryCloseBtn = document.getElementById("glossary-close");
const glossaryList = document.getElementById("glossary-list");
const packsModalShared = document.getElementById("packs-modal");

function openGlossary() {
  glossaryList.innerHTML = "";
  Object.keys(GLOSSARY).forEach(function (term) {
    const item = document.createElement("div");
    item.className = "glossary-item";
    const b = document.createElement("b");
    b.textContent = term;
    const p = document.createElement("p");
    p.textContent = GLOSSARY[term];
    item.appendChild(b);
    item.appendChild(p);
    glossaryList.appendChild(item);
  });
  glossaryModal.hidden = false;
  setTimeout(function () { glossaryCloseBtn.focus(); }, 60);
}

function closeGlossary() {
  glossaryModal.hidden = true;
}

glossaryBtn.addEventListener("click", function () {
  if (glossaryModal.hidden) openGlossary(); else closeGlossary();
});
glossaryCloseBtn.addEventListener("click", closeGlossary);
glossaryModal.addEventListener("click", function (e) {
  if (e.target === glossaryModal) closeGlossary();
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (!glossaryModal.hidden) closeGlossary();
    if (!quizModal.hidden) closeQuiz();
    if (typeof packsModalShared !== "undefined" && !packsModalShared.hidden) packsModalShared.hidden = true;
  }
});

/* Any "see all terms" chip opens the modal too */
document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "glossary-open-inline") openGlossary();
});

/* -------------------------------------------------------------
   Quiz mode
   ------------------------------------------------------------- */
const quizBtn = document.getElementById("quiz-btn");
const quizModal = document.getElementById("quiz-modal");
const quizCloseBtn = document.getElementById("quiz-close");
const quizProgress = document.getElementById("quiz-progress");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const quizFeedback = document.getElementById("quiz-feedback");
const quizNext = document.getElementById("quiz-next");

let quizQuestions = [];
let quizPos = 0;
let quizScore = 0;

function openQuiz() {
  teacherModeActive = false;
  quizQuestions = TimelineCore.makeQuiz(5);
  quizPos = 0;
  quizScore = 0;
  renderQuizQuestion();
  quizModal.hidden = false;
  setTimeout(function () { quizCloseBtn.focus(); }, 60);
}

/* Teacher quiz mode */
const teacherQuizBtn = document.getElementById("teacher-quiz-btn");
const teacherQuizModal = document.getElementById("teacher-quiz-modal");
const teacherQuizClose = document.getElementById("teacher-quiz-close");
const teacherQuizEras = document.getElementById("teacher-quiz-eras");
const tqCount = document.getElementById("tq-count");
const tqDiff = document.getElementById("tq-diff");
const tqStart = document.getElementById("tq-start");
const tqExport = document.getElementById("tq-export");

let teacherScores = [];
let teacherModeActive = false;

function openTeacherQuiz() {
  teacherQuizEras.innerHTML = "";
  Object.keys(ERA_INFO).forEach(function (era) {
    const lbl = document.createElement("label");
    lbl.style.fontSize = "0.78rem";
    lbl.style.display = "inline-flex";
    lbl.style.alignItems = "center";
    lbl.style.gap = "0.25rem";
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.value = era;
    cb.checked = true;
    lbl.appendChild(cb);
    lbl.appendChild(document.createTextNode(era));
    teacherQuizEras.appendChild(lbl);
  });
  teacherQuizModal.hidden = false;
  setTimeout(function () { teacherQuizClose.focus(); }, 60);
}

function buildTeacherQuiz() {
  const eras = [...teacherQuizEras.querySelectorAll("input:checked")].map((c) => c.value);
  const count = Math.max(3, Math.min(20, parseInt(tqCount.value, 10) || 8));
  const diff = tqDiff.value;
  const filter = (m) => eras.indexOf(m.era) !== -1;
  const n = Math.ceil(count / 2);
  const qs1 = TimelineCore.makeQuiz(n, Math.random, filter);
  const qs2 = TimelineCore.makeEraQuiz(count - n, Math.random, filter);
  // adjust options for easy difficulty
  const qs = qs1.concat(qs2);
  qs.forEach(function (q) {
    if (diff === "easy" && q.options.length > 2) {
      // keep correct + one distractor
      const correct = q.options[q.answerIndex];
      const others = q.options.filter(function (o, i) { return i !== q.answerIndex; });
      const one = others[Math.floor(Math.random() * others.length)];
      q.options = [correct, one].sort(function () { return Math.random() - 0.5; });
      q.answerIndex = q.options.indexOf(correct);
    }
  });
  return qs;
}

if (teacherQuizBtn) teacherQuizBtn.addEventListener("click", function () {
  teacherQuizModal.hidden ? openTeacherQuiz() : (teacherQuizModal.hidden = true);
});
if (teacherQuizClose) teacherQuizClose.addEventListener("click", function () { teacherQuizModal.hidden = true; });
if (teacherQuizModal) teacherQuizModal.addEventListener("click", function (e) { if (e.target === teacherQuizModal) teacherQuizModal.hidden = true; });

if (tqStart) tqStart.addEventListener("click", function () {
  teacherModeActive = true;
  teacherScores = [];
  const qs = buildTeacherQuiz();
  if (!qs.length) return;
  teacherQuizModal.hidden = true;
  quizQuestions = qs;
  quizPos = 0;
  quizScore = 0;
  renderQuizQuestion();
  quizModal.hidden = false;
  setTimeout(function () { quizCloseBtn.focus(); }, 60);
});

if (tqExport) tqExport.addEventListener("click", function () {
  const header = "question,answer,score";
  const lines = teacherScores.map(function (s) { return '"' + s.q.replace(/"/g, '""') + '","' + s.a.replace(/"/g, '""') + '",' + s.score; });
  const csv = [header].concat(lines).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "teacher-quiz-scores.csv";
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

/* Order quiz */
const orderQuizBtn = document.getElementById("order-quiz-btn");
const orderQuizModal = document.getElementById("order-quiz-modal");
const orderQuizClose = document.getElementById("order-quiz-close");
const orderQuizProgress = document.getElementById("order-quiz-progress");
const orderQuizQuestion = document.getElementById("order-quiz-question");
const orderQuizOptions = document.getElementById("order-quiz-options");
const orderQuizFeedback = document.getElementById("order-quiz-feedback");
const orderQuizNext = document.getElementById("order-quiz-next");

let orderQuestions = [];
let orderPos = 0;
let orderPicks = [];

function renderOrderQuestion() {
  const q = orderQuestions[orderPos];
  orderQuizProgress.textContent = "Question " + (orderPos + 1) + " of " + orderQuestions.length;
  orderQuizQuestion.textContent = q.question;
  orderQuizFeedback.hidden = true;
  orderQuizNext.hidden = true;
  orderQuizOptions.innerHTML = "";
  orderPicks = [];
  q.options.forEach(function (opt) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "quiz-option";
    btn.textContent = opt;
    btn.addEventListener("click", function () {
      if (orderPicks.indexOf(opt) !== -1) return;
      orderPicks.push(opt);
      btn.classList.add("correct");
      btn.disabled = true;
      if (orderPicks.length === q.options.length) {
        const ok = orderPicks.join("||") === q.correctOrder.join("||");
        orderQuizFeedback.hidden = false;
        orderQuizFeedback.textContent = (ok ? "✔ Correct! " : "✘ The correct order is: ") + q.correctOrder.join(" → ");
        orderQuizNext.hidden = false;
        orderQuizNext.textContent = orderPos + 1 < orderQuestions.length ? "Next ▶" : "Done ▶";
      }
    });
    orderQuizOptions.appendChild(btn);
  });
}

function openOrderQuiz() {
  orderQuestions = TimelineCore.makeOrderQuiz(4);
  orderPos = 0;
  if (!orderQuestions.length) return;
  renderOrderQuestion();
  orderQuizModal.hidden = false;
  setTimeout(function () { orderQuizClose.focus(); }, 60);
}

if (orderQuizBtn) orderQuizBtn.addEventListener("click", function () {
  orderQuizModal.hidden ? openOrderQuiz() : (orderQuizModal.hidden = true);
});
if (orderQuizClose) orderQuizClose.addEventListener("click", function () { orderQuizModal.hidden = true; });
if (orderQuizModal) orderQuizModal.addEventListener("click", function (e) { if (e.target === orderQuizModal) orderQuizModal.hidden = true; });
if (orderQuizNext) orderQuizNext.addEventListener("click", function () {
  orderPos += 1;
  if (orderPos >= orderQuestions.length) {
    orderQuizModal.hidden = true;
    return;
  }
  renderOrderQuestion();
});

const imageQuizBtn = document.getElementById("image-quiz-btn");
if (imageQuizBtn) imageQuizBtn.addEventListener("click", function () {
  teacherModeActive = false;
  quizQuestions = TimelineCore.makeImageQuiz(5);
  quizPos = 0;
  quizScore = 0;
  if (!quizQuestions.length) return;
  renderQuizQuestion();
  quizModal.hidden = false;
  setTimeout(function () { quizCloseBtn.focus(); }, 60);
});

function closeQuiz() {
  quizModal.hidden = true;
}

function renderQuizQuestion() {
  const q = quizQuestions[quizPos];
  quizProgress.textContent =
    "Question " + (quizPos + 1) + " of " + quizQuestions.length + " · Score " + quizScore +
    (q.type === "which-first" ? " · Which came first?" :
     q.type === "era-match" ? " · Which era?" : " · Which is oldest?");
  quizQuestion.textContent = q.question;
  const qImg = document.getElementById("quiz-image");
  if (qImg) {
    if (q.type === "image-quiz" && EVENT_MEDIA[q.eventTitle] && EVENT_MEDIA[q.eventTitle].url) {
      qImg.src = EVENT_MEDIA[q.eventTitle].url;
      qImg.alt = q.eventTitle;
      qImg.style.display = "block";
    } else {
      qImg.style.display = "none";
    }
  }
  quizFeedback.hidden = true;
  quizNext.hidden = true;
  quizOptions.innerHTML = "";
  q.options.forEach(function (opt, idx) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "quiz-option";
    btn.textContent = opt;
    btn.addEventListener("click", function () { answerQuiz(q, idx, btn); });
    quizOptions.appendChild(btn);
  });
}

function answerQuiz(q, idx, btn) {
  const buttons = quizOptions.querySelectorAll(".quiz-option");
  buttons.forEach(function (b) { b.disabled = true; });
  const correct = idx === q.answerIndex;
  if (correct) quizScore += 1;
  if (teacherModeActive) teacherScores.push({ q: q.question, a: q.answer, score: correct ? 1 : 0 });
  buttons[q.answerIndex].classList.add("correct");
  if (!correct) btn.classList.add("wrong");
  quizFeedback.hidden = false;
  quizFeedback.textContent = (correct ? "✔ Correct! " : "✘ Not quite — ") + q.fact;
  quizNext.hidden = false;
  quizNext.textContent = quizPos + 1 < quizQuestions.length ? "Next question ▶" : "See result ▶";
  quizProgress.textContent =
    "Question " + (quizPos + 1) + " of " + quizQuestions.length + " · Score " + quizScore;
}

quizNext.addEventListener("click", function () {
  quizPos += 1;
  if (quizPos >= quizQuestions.length) {
    quizProgress.textContent = "Score " + quizScore + " / " + quizQuestions.length;
    quizQuestion.textContent = quizScore + "/" + quizQuestions.length + " — " +
      (quizScore === quizQuestions.length ? "perfect! You are a time traveller." :
       quizScore >= quizQuestions.length / 2 ? "solid work, historian!" : "a reason to keep exploring — take the tour!");
    quizOptions.innerHTML = "";
    quizFeedback.hidden = true;
    quizNext.hidden = true;
    const again = document.createElement("button");
    again.type = "button";
    again.className = "quiz-option";
    again.textContent = "🔁 New quiz";
    again.addEventListener("click", openQuiz);
    quizOptions.appendChild(again);
    return;
  }
  renderQuizQuestion();
});

quizBtn.addEventListener("click", function () {
  if (quizModal.hidden) openQuiz(); else closeQuiz();
});
quizCloseBtn.addEventListener("click", closeQuiz);
quizModal.addEventListener("click", function (e) {
  if (e.target === quizModal) closeQuiz();
});

/* -------------------------------------------------------------
   Riddle mode: guess the event from clues
   ------------------------------------------------------------- */
(function riddlesFeature() {
  const riddlesBtn = document.getElementById("riddles-btn");
  const riddlesModal = document.getElementById("riddles-modal");
  const riddlesClose = document.getElementById("riddles-close");
  const riddlesProgress = document.getElementById("riddles-progress");
  const riddlesClues = document.getElementById("riddles-clues");
  const riddlesOptions = document.getElementById("riddles-options");
  const riddlesFeedback = document.getElementById("riddles-feedback");
  const riddlesNext = document.getElementById("riddles-next");

  let riddleQuestions = [];
  let riddlePos = 0;
  let riddleScore = 0;
  let riddleAnswered = false;

  function openRiddles() {
    riddleQuestions = TimelineCore.makeRiddleGame(5);
    riddlePos = 0;
    riddleScore = 0;
    renderRiddle();
    riddlesModal.hidden = false;
    setTimeout(function () { riddlesClose.focus(); }, 60);
  }

  function closeRiddles() { riddlesModal.hidden = true; stopSpeech(); }

  function renderRiddle() {
    const q = riddleQuestions[riddlePos];
    riddlesProgress.textContent = "Riddle " + (riddlePos + 1) + " of " + riddleQuestions.length + " · Score " + riddleScore;
    riddlesClues.innerHTML = "";
    q.clues.forEach(function (clue) {
      const div = document.createElement("div");
      div.className = "riddle-clue";
      div.textContent = clue;
      riddlesClues.appendChild(div);
    });
    const head = document.createElement("div");
    head.className = "quiz-question";
    head.textContent = "Which event am I?";
    riddlesClues.insertBefore(head, riddlesClues.firstChild);
    riddlesFeedback.hidden = true;
    riddlesNext.hidden = true;
    riddlesOptions.innerHTML = "";
    riddleAnswered = false;
    q.options.forEach(function (opt, idx) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-option";
      btn.textContent = opt;
      btn.addEventListener("click", function () { answerRiddle(q, idx, btn); });
      riddlesOptions.appendChild(btn);
    });
  }

  function answerRiddle(q, idx, btn) {
    if (riddleAnswered) return;
    riddleAnswered = true;
    const buttons = riddlesOptions.querySelectorAll(".quiz-option");
    buttons.forEach(function (b) { b.disabled = true; });
    const correct = idx === q.answerIndex;
    if (correct) riddleScore += 1;
    buttons[q.answerIndex].classList.add("correct");
    if (!correct) btn.classList.add("wrong");
    riddlesFeedback.hidden = false;
    riddlesFeedback.textContent = (correct ? "✔ Correct! It's " : "✘ It was ") + q.answer + " — " + q.fact;
    riddlesNext.hidden = false;
    riddlesNext.textContent = riddlePos + 1 < riddleQuestions.length ? "Next riddle ▶" : "See result ▶";
    if (NARRATE_ON) speakText(riddlesFeedback.textContent);
  }

  riddlesNext.addEventListener("click", function () {
    riddlePos += 1;
    if (riddlePos >= riddleQuestions.length) {
      riddlesProgress.textContent = "Score " + riddleScore + " / " + riddleQuestions.length;
      riddlesClues.innerHTML = "";
      const head = document.createElement("div");
      head.className = "quiz-question";
      head.textContent = "You solved " + riddleScore + " of " + riddleQuestions.length + " riddles!";
      riddlesClues.appendChild(head);
      riddlesFeedback.hidden = true;
      riddlesNext.hidden = true;
      riddlesOptions.innerHTML = "";
      const again = document.createElement("button");
      again.type = "button";
      again.className = "quiz-option";
      again.textContent = "🔁 New riddles";
      again.addEventListener("click", openRiddles);
      riddlesOptions.appendChild(again);
      return;
    }
    renderRiddle();
  });

  riddlesBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    riddlesBtn.blur();
    if (riddlesModal.hidden) openRiddles(); else { riddlesModal.hidden = true; stopSpeech(); }
  });
  riddlesClose.addEventListener("click", closeRiddles);
  riddlesModal.addEventListener("click", function (e) {
    if (e.target === riddlesModal) closeRiddles();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !riddlesModal.hidden) closeRiddles();
  });
})();

I18N = TimelineCore.STRINGS;
const browserLang = (navigator.language || navigator.userLanguage || 'en').slice(0, 2).toLowerCase();
const urlLang = new URLSearchParams(location.search).get('lang') || localStorage.getItem('ct-lang') || browserLang;
let uiLang = (['en','it'].includes(urlLang)) ? urlLang : 'en';
function applyLang() {
  localStorage.setItem('ct-lang', uiLang);
  const dict = I18N[uiLang] || I18N.en;
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });
  const si = document.getElementById('search-input');
  if (si) si.placeholder = (dict.searchPlaceholder || '').replace('€search-hints€', searchHintWords());
  const ls = document.getElementById('lang-select');
  if (ls) ls.value = uiLang;
  document.documentElement.lang = uiLang;
}
function searchHintWords() {
  return (uiLang === 'it') ? 'luna, ossigeno, Roma' : 'moon, oxygen, Rome';
}
let NARRATE_ON = false;
function speakText(text) {
  try {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = (uiLang === 'it') ? 'it-IT' : 'en-US';
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  } catch (e) {}
}
function stopSpeech() {
  try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) {}
}

/* -------------------------------------------------------------
   Story reader: full-screen, large type, kid tier
   ------------------------------------------------------------- */
(function readerFeature() {
  const reader = document.getElementById('story-reader');
  if (!reader) return;
  let idx = 0;
  let open = false;
  function render() {
    const m = MILESTONES[idx];
    document.getElementById('reader-time').textContent = formatTime(m.yearsAgo);
    document.getElementById('reader-title').textContent = m.title;
    const kidEl = document.getElementById('reader-kid');
    kidEl.textContent = m.kid;
    const sumEl = document.getElementById('reader-summary');
    if (sumEl) { sumEl.textContent = m.summary; sumEl.hidden = false; }
    document.getElementById('reader-guide').textContent = TimelineCore.STRINGS[uiLang].readerGuided;
    if (NARRATE_ON) speakText(m.kid);
  }
  function openReader(i) {
    idx = i; open = true; reader.hidden = false;
    document.body.style.overflow = 'hidden';
    render();
    try { scrollToMarker(i); } catch (e) {}
  }
  function closeReader() {
    open = false; reader.hidden = true;
    document.body.style.overflow = '';
    stopSpeech();
  }
  function flip(delta) {
    idx = (idx + delta + MILESTONES.length) % MILESTONES.length;
    render();
    try { scrollToMarker(idx); } catch (e) {}
  }
  document.getElementById('reader-close').addEventListener('click', closeReader);
  document.getElementById('reader-prev').addEventListener('click', function () { flip(-1); });
  document.getElementById('reader-next').addEventListener('click', function () { flip(1); });
  document.getElementById('reader-full').addEventListener('click', function () {
    if (document.documentElement.requestFullscreen) {
      document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
    }
  });
  document.getElementById('reader-narrate').addEventListener('click', function () {
    if (NARRATE_ON) { stopSpeech(); NARRATE_ON = false; }
    else { NARRATE_ON = true; speakText(MILESTONES[idx].kid); }
  });
  document.addEventListener('keydown', function (e) {
    if (!open) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); flip(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); flip(-1); }
    if (e.key === 'Escape') closeReader();
  });
  document.getElementById('read-btn').addEventListener('click', function () {
    openReader(pinnedIndex !== null ? pinnedIndex : 0);
  });
  window.__storyReader = { openReader: openReader, closeReader: closeReader, isOpen: function () { return open; } };
})();

/* narration toggle in the toolbar */
(function narrateFeature() {
  const nb = document.getElementById('narrate-btn');
  if (!nb) return;
  nb.addEventListener('click', function () {
    NARRATE_ON = !NARRATE_ON;
    nb.textContent = NARRATE_ON ? '⏹ Stop narration' : '🔊 Narrate';
    if (NARRATE_ON) {
      const idx = pinnedIndex !== null ? pinnedIndex : (hoveredIndex !== null ? hoveredIndex : 0);
      speakText(MILESTONES[idx].kid);
    } else stopSpeech();
  });
  const obs = new MutationObserver(function () { /* allow narration refreshes on tours */ });
})();

/* tour speaks when narration is on */
(function tourNarration() {
  const origSelectEvent = selectEvent;
  selectEvent = function (i) {
    origSelectEvent(i);
    if (NARRATE_ON) speakText(MILESTONES[i].kid);
  };
})();

/* lang switch wiring */
(function langFeature() {
  const sel = document.getElementById('lang-select');
  if (!sel) return;
  applyLang();
  sel.addEventListener('change', function () {
    uiLang = sel.value;
    applyLang();
    if (typeof updatePanel === 'function') updatePanel();
  });
})();

/* -------------------------------------------------------------
   Lens (perspective) switching
   ------------------------------------------------------------- */
(function lensFeature() {
  const sel = document.getElementById("lens-select");
  if (!sel) return;
  sel.value = localStorage.getItem("ct-lens") || "scientific";
  sel.addEventListener("change", function () {
    localStorage.setItem("ct-lens", sel.value);
    if (typeof updatePanel === "function") updatePanel();
  });
})();

/* -------------------------------------------------------------
   Era classroom packs — multi-page printable worksheets
   ------------------------------------------------------------- */
(function packsFeature() {
  const packsBtn   = document.getElementById("packs-btn");
  const packsModal = document.getElementById("packs-modal");
  const packsClose = document.getElementById("packs-close");
  const packsList  = document.getElementById("packs-list");

  function openPacks() {
    packsList.innerHTML = "";
    Object.keys(ERA_INFO).forEach(function (era) {
      const count = MILESTONES.filter(function (m) { return m.era === era; }).length;
      if (!count) return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = era + "  (" + count + " events)";
      btn.addEventListener("click", function () {
        packsModal.hidden = true;
        buildEraPack(era);
        try { window.print(); } catch (e) {}
      });
      packsList.appendChild(btn);
    });
    packsModal.hidden = false;
    setTimeout(function () { packsClose.focus(); }, 60);
  }

  packsBtn.addEventListener("click", function () { packsModal.hidden ? openPacks() : (packsModal.hidden = true); });
  packsClose.addEventListener("click", function () { packsModal.hidden = true; });
  packsModal.addEventListener("click", function (e) { if (e.target === packsModal) packsModal.hidden = true; });
})();

function buildEraPack(era) {
  const events = MILESTONES.filter(function (m) { return m.era === era; });
  const sheet = document.getElementById("print-sheet");
  sheet.innerHTML = "";

  const h1 = document.createElement("h1");
  h1.textContent = era + " — classroom pack";
  const sub = document.createElement("div");
  sub.className = "pack-sub";
  sub.textContent = "Cosmic Timeline · " + events.length + " events · student name ______________ · class ______";
  sheet.appendChild(h1);
  sheet.appendChild(sub);

  const introH = document.createElement("h2");
  introH.textContent = "About this era";
  const introP = document.createElement("p");
  introP.textContent = ERA_INFO[era] || "";
  sheet.appendChild(introH);
  sheet.appendChild(introP);

  const stripH = document.createElement("h2");
  stripH.textContent = "Timeline strip — write the year for each event";
  sheet.appendChild(stripH);
  events.forEach(function (m) {
    const row = document.createElement("div");
    const name = document.createElement("span");
    name.textContent = m.title;
    name.style.fontSize = "10pt";
    const gap = document.createElement("span");
    gap.className = "pack-fill";
    gap.style.display = "inline-block";
    gap.style.width = "60%";
    row.appendChild(name);
    row.appendChild(gap);
    sheet.appendChild(row);
  });

  events.forEach(function (m, i) {
    const ev = document.createElement("div");
    ev.className = "pack-event";
    const h3 = document.createElement("h3");
    h3.textContent = (i + 1) + ". " + m.title;
    const when = document.createElement("div");
    when.className = "when";
    when.textContent = formatTime(m.yearsAgo);
    const story = document.createElement("p");
    story.textContent = m.kid + " " + m.fun;
    const bigger = document.createElement("p");
    bigger.textContent = m.summary;
    const qs = document.createElement("ul");
    qs.className = "pack-questions";
    const PROMPTS = [
      "What surprised you most about this event?",
      "Why did this matter for what came next?",
      "How might life be different without it?",
    ];
    PROMPTS.forEach(function (qq) {
      const li = document.createElement("li");
      li.textContent = qq;
      qs.appendChild(li);
    });
    ev.appendChild(h3);
    ev.appendChild(when);
    ev.appendChild(story);
    ev.appendChild(bigger);
    ev.appendChild(qs);
    sheet.appendChild(ev);
  });

  const matchH = document.createElement("h2");
  matchH.textContent = "Words to know (" + era + ")";
  const chipBox = document.createElement("div");
  const addedTerms = {};
  Object.keys(GLOSSARY).forEach(function (term) {
    events.forEach(function (m) {
      const hay = (m.summary + " " + m.deep.join(" ")).toLowerCase();
      if (hay.includes(term.toLowerCase()) && !addedTerms[term]) {
        addedTerms[term] = true;
        const chip = document.createElement("span");
        chip.className = "chip";
        chip.textContent = term + " — " + GLOSSARY[term];
        chipBox.appendChild(chip);
      }
    });
  });
  sheet.appendChild(matchH);
  sheet.appendChild(chipBox);

  const essay = document.createElement("div");
  essay.className = "pack-essay";
  const eh = document.createElement("h2");
  eh.textContent = "Essay prompt";
  const ep = document.createElement("p");
  ep.textContent = "Essay: choose the event from this era you think changed the world the most, and argue why.";
  const ruled = document.createElement("div");
  ruled.className = "pack-lines";
  for (let li = 0; li < 12; li++) ruled.appendChild(document.createElement("div"));
  essay.appendChild(eh);
  essay.appendChild(ep);
  essay.appendChild(ruled);
  sheet.appendChild(essay);

  const footer = document.createElement("footer");
  footer.textContent = "Cosmic Timeline Era Pack · " + era + " · generated from timeline-core data · images via Wikimedia Commons (see site credits)";
  sheet.appendChild(footer);
  sheet.hidden = false;
}

/* -------------------------------------------------------------
   Printable handout — a one-page worksheet for the selected event
   ------------------------------------------------------------- */
function buildHandout(index) {
  const m = MILESTONES[index];
  const sheet = document.getElementById("print-sheet");
  sheet.innerHTML = "";
  const h1 = document.createElement("h1");
  h1.textContent = m.title;
  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = formatTime(m.yearsAgo) + " · " + m.era + " · Cosmic Timeline classroom handout";
  const story = document.createElement("h2");
  story.textContent = "The bigger story";
  const storyP = document.createElement("p");
  storyP.textContent = m.summary;
  const kid = document.createElement("h2");
  kid.textContent = "Explain it to a 6-year-old";
  const kidP = document.createElement("p");
  kidP.textContent = m.kid + " 💡 " + m.fun;
  const deep = document.createElement("h2");
  deep.textContent = "Go deeper — discussion points";
  const ul = document.createElement("ul");
  m.deep.forEach(function (d) {
    const li = document.createElement("li");
    li.textContent = d;
    ul.appendChild(li);
  });
  sheet.appendChild(h1);
  sheet.appendChild(meta);
  sheet.appendChild(story);
  sheet.appendChild(storyP);
  sheet.appendChild(kid);
  sheet.appendChild(kidP);
  sheet.appendChild(deep);
  sheet.appendChild(ul);
  const words = TimelineCore.glossaryTermsFor(
    (m.summary + " " + m.deep.join(" ")).toLowerCase()
  );
  if (words.length) {
    const w = document.createElement("h2");
    w.textContent = "Words to know";
    const chipBox = document.createElement("div");
    words.forEach(function (pair) {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = pair.term;
      chipBox.appendChild(chip);
    });
    sheet.appendChild(w);
    sheet.appendChild(chipBox);
  }
  const footer = document.createElement("footer");
  footer.textContent = "Printed from The Cosmic Timeline · Discussion prompts: Which of these events surprised you? What do you think made it possible?";
  sheet.appendChild(footer);
}

const printBtn = document.getElementById("print-btn");
printBtn.addEventListener("click", function () {
  let idx = pinnedIndex !== null ? pinnedIndex : (hoveredIndex !== null ? hoveredIndex : 0);
  if (fracFor(idx) === null) { setScaleMode("deep"); idx = pinnedIndex !== null ? pinnedIndex : 0; }
  buildHandout(idx);
  window.print();
});

/* -------------------------------------------------------------
   Shareable permalinks: #event=<slug>&mode=<deep|human>
   ------------------------------------------------------------- */
function slugFor(i) {
  return TimelineCore.slugify(MILESTONES[i].title);
}

function updateHash() {
  if (typeof history === "undefined" || !history.replaceState) return;
  const parts = [];
  if (pinnedIndex !== null) parts.push("event=" + slugFor(pinnedIndex));
  if (scaleMode !== "deep") parts.push("mode=" + scaleMode);
  history.replaceState(null, "", parts.length ? "#" + parts.join("&") : "#");
}

function restoreFromHash() {
  const h = location.hash.replace(/^#/, "");
  if (!h) return false;
  const params = new URLSearchParams(h);
  const mode = params.get("mode");
  const ev = params.get("event");
  let matched = false;
  if (["deep", "human", "powers", "future"].includes(mode)) {
    if (mode !== scaleMode) setScaleMode(mode);
    matched = true;
  }
  if (ev) {
    const idx = MILESTONES.findIndex(function (m) {
      return TimelineCore.slugify(m.title) === ev;
    });
    if (idx !== -1) {
      if (scaleMode === "human" && MILESTONES[idx].yearsAgo > HUMAN_MAX) setScaleMode("deep");
      pinnedIndex = idx;
      hoveredIndex = null;
      cancelClose();
      updatePanel();
      scrollToMarker(idx);
      updateHash();
      matched = true;
    }
  }
  return matched;
}

const _hadHash = !!location.hash;
/* Panel resize (wide screens) */
(function panelResize() {
  const handle = document.getElementById("panel-resize-handle");
  const panel = document.getElementById("panel");
  const viewport = document.querySelector(".viewport");
  if (!handle || !panel) return;
  const saved = localStorage.getItem("ct-panel-width");
  if (saved) {
    const w = Math.max(320, Math.min(720, parseInt(saved, 10)));
    document.documentElement.style.setProperty("--panel-width", w + "px");
  }
  let dragging = false;
  handle.addEventListener("mousedown", function (e) {
    dragging = true;
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
    e.preventDefault();
  });
  window.addEventListener("mousemove", function (e) {
    if (!dragging) return;
    const w = Math.max(320, Math.min(720, window.innerWidth - e.clientX));
    document.documentElement.style.setProperty("--panel-width", w + "px");
  });
  window.addEventListener("mouseup", function () {
    if (!dragging) return;
    dragging = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    const v = getComputedStyle(document.documentElement).getPropertyValue("--panel-width").trim();
    if (v) localStorage.setItem("ct-panel-width", v);
  });
})();

restoreFromHash();
if (!_hadHash && pinnedIndex === null) {
  // Surface the detail panel on first load so the "meat" is visible
  // without scrolling; don't pollute the URL hash.
  pinnedIndex = 0;
  panel.classList.add("open");
  setMarkerActive(0);
  renderDetail(0);
}

/* Era legend */
const legend = document.getElementById("legend");
Object.keys(ERA_COLORS).forEach((era) => {
  const chip = document.createElement("span");
  chip.className = "chip";
  chip.dataset.era = era;
  chip.title = ERA_INFO[era] || era; // era explainer on hover
  chip.setAttribute("role", "button");
  chip.setAttribute("tabindex", "0");
  chip.setAttribute("aria-label", "Jump to " + era);
  const swatch = document.createElement("span");
  swatch.className = "swatch";
  swatch.style.background = ERA_COLORS[era];
  swatch.style.color = ERA_COLORS[era];
  chip.appendChild(swatch);
  chip.appendChild(document.createTextNode(era));
  legend.appendChild(chip);
});

/* Axis labels were removed — compact tiered labels sit on each marker now */

/* Initial focus polish */
track.focus();

/* PWA: register the service worker and warm the image cache so
   the app works offline after the first full pass.
   ?reset=1 unregisters workers + clears caches (desktop pinned-build rescue). */
if (new URLSearchParams(location.search).get("reset")) {
  (async () => {
    const regs = await navigator.serviceWorker.getRegistrations();
    regs.forEach((r) => r.unregister());
    const keys = await caches.keys();
    keys.forEach((k) => caches.delete(k));
    location.replace(location.pathname);
  })();
} else if ("serviceWorker" in navigator && (location.protocol === "http:" || location.protocol === "https:")) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
  // Images are cached on demand by the service worker's runtime cache,
  // so we no longer pre-fetch all 77 (which throttled the Wikimedia IP).
}
