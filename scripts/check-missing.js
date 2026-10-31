const c = require("../timeline-core.js");
const existing = new Set(c.MILESTONES.map(m => m.title));
const cand = [
  "Zoroastrianism","Judaism","Hinduism","Buddhism","Confucianism","Taoism","Jainism","Shinto","Sikhism","Mormonism",
  "NATO","United Nations","European Union","African Union","ASEAN","Arab League","OAS","Commonwealth of Nations",
  "Syrian Refugee Crisis","Ukrainian Refugee Crisis","DACA","Bracero Program","Ellis Island Peak","Chinese Exclusion Act",
  "Refugee Convention","Hart-Celler Immigration Act","Marshall Plan","EEC Founded","NAFTA","Bitcoin","2008 Financial Crisis",
  "Silent Spring","Earth Day","Kyoto Protocol","Paris Agreement","Stonewall Uprising","Same-Sex Marriage (US)",
  "Abolition of Slavery (UK)","Shakespeare","Beethoven","World Cup First (1930)","Woodstock (1969)","Olympics Revived","CRISPR Gene Editing",
  "ChatGPT and the AI Revolution","Maxwell's Equations","Tesla and AC Power","Sputnik Launches","Gagarin Orbits Earth",
  "Pasteur and Germ Theory","Mendel's Laws of Inheritance","Magna Carta","The Black Death","The Renaissance",
  "Hundred Years' War","Napoleonic Wars","Crimean War","Boer War","Russian Civil War","Spanish Civil War","Arab-Israeli Wars","Falklands War",
  "The Fall of Constantinople","The Spanish Armada","The Glorious Revolution","The Haitian Revolution","The Taiping Rebellion",
  "The Boxer Rebellion","The Russian Revolution","Decolonization","The Civil Rights Movement","The Feminist Movement",
  "The Digital Revolution","The Space Age","Constantine and Christianity","Justinian's Code","Charlemagne","The Crusades",
  "The Maya Civilization","The Aztec Empire","The Inca Empire","The Songhai Empire","The Swahili Coast","The Song Dynasty",
  "The Han Dynasty","The Tang Dynasty","Ashoka the Great","The Gupta Empire","Cyrus the Great","Qin Shi Huang Unifies China",
  "Confucius","Julius Caesar","Augustus Founds the Empire","Socrates","Plato's Academy","Aristotle","Hippocrates and Medicine",
  "Euclid's Geometry","Archimedes","The French Revolution","Women's Suffrage (US)","Civil Rights Act (1964)",
];
const missing = cand.filter(t => !existing.has(t));
console.log("missing:", missing.length);
missing.forEach(t => console.log("  ", t));