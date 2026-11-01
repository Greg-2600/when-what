import js from "@eslint/js";

// Shared Node-ish globals for CommonJS sources (core, scripts, tests).
const nodeGlobals = {
  console: "readonly",
  require: "readonly",
  module: "readonly",
  exports: "readonly",
  process: "readonly",
  Buffer: "readonly",
  self: "readonly",
  __dirname: "readonly",
  __filename: "readonly",
  setTimeout: "readonly",
  clearTimeout: "readonly",
  setInterval: "readonly",
  clearInterval: "readonly",
  fetch: "readonly",
  URL: "readonly",
  URLSearchParams: "readonly",
  Blob: "readonly",
};

// Browser globals for the shipped app script.
const browserGlobals = {
  ...nodeGlobals,
  TimelineCore: "readonly",
  caches: "readonly",
  window: "readonly",
  self: "readonly",
  document: "readonly",
  navigator: "readonly",
  location: "readonly",
  history: "readonly",
  localStorage: "readonly",
  getComputedStyle: "readonly",
  requestAnimationFrame: "readonly",
  cancelAnimationFrame: "readonly",
  MutationObserver: "readonly",
  SpeechSynthesisUtterance: "readonly",
  IntersectionObserver: "readonly",
};

// Service-worker globals.
const workerGlobals = {
  self: "readonly",
  caches: "readonly",
  fetch: "readonly",
  console: "readonly",
  setTimeout: "readonly",
  clearTimeout: "readonly",
  URL: "readonly",
  URLSearchParams: "readonly",
  location: "readonly",
  navigator: "readonly",
};

export default [
  js.configs.recommended,
  {
    files: ["timeline-core.js", "scripts/**/*.js", "tests/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        ...nodeGlobals,
        // timeline-core.js public surface (also visible to timeline.js)
        TimelineCore: "readonly",
        MILESTONES: "readonly",
        ERA_COLORS: "readonly",
        ERA_INFO: "readonly",
        LEARN_MORE: "readonly",
        GLOSSARY: "readonly",
        EVENT_COLORS: "readonly",
        ERA_HUES: "readonly",
        MAX_YEARS: "readonly",
              CURRICULUM_TAGS: "readonly",
        curriculumTagsFor: "readonly",
        STRINGS: "readonly",
        // cross-file app state owned by timeline.js
        uiLang: "writable",
        zoom: "writable",
        scaleMode: "writable",
        pinnedIndex: "writable",
        hoveredIndex: "writable",
        EVENT_MEDIA: "readonly",
        COMMONS_FILE: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-console": "off",
      semi: ["error", "always"],
      "no-var": "error",
      "prefer-const": "error",
    },
  },
  {
    files: ["timeline.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: browserGlobals,
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-console": "off",
      semi: ["error", "always"],
      "no-var": "error",
      "prefer-const": "error",
      // Shipped code must never interpret strings as code.
      "no-eval": "error",
      "no-new-func": "error",
      "no-implied-eval": "error",
    },
  },
  {
    files: ["sw.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: workerGlobals,
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-console": "off",
      semi: ["error", "always"],
      "no-var": "error",
      "prefer-const": "error",
    },
  },
  {
    ignores: ["node_modules/**", "img/**", "h4k/**", "tests/screenshots/**"],
  },
];
