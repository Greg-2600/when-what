/**
 * Secret scan: fail if anything looking like a credential is committed.
 * Scans tracked text files (skips node_modules, img/, .git, screenshots).
 * Real keys are never needed in this repo: the ElevenLabs key is typed
 * by the user into the browser and lives only in their localStorage.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SKIP_DIRS = new Set(["node_modules", ".git", "img", "h4k", "tests/screenshots"]);
const SKIP_FILES = new Set(["package-lock.json", ".failure-screenshot.png"]);
const MAX_BYTES = 2 * 1024 * 1024;

const PATTERNS = [
  [/sk-(proj-)?[A-Za-z0-9-_]{20,}/, "OpenAI-style API key"],
  [/xox[bpos]-[A-Za-z0-9-]+/, "Slack token"],
  [/ghp_[A-Za-z0-9]{20,}/, "GitHub personal access token"],
  [/github_pat_[A-Za-z0-9_]+/, "GitHub fine-grained token"],
  [/AKIA[0-9A-Z]{16}/, "AWS access key id"],
  [/-----BEGIN (RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/, "private key block"],
  [/AIza[0-9A-Za-z-_]{30,}/, "Google API key"],
  [/xi-api-key\s*[:=]\s*\S/i, "ElevenLabs key value (placeholder text is fine elsewhere)"],
];

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name) && !e.name.startsWith(".")) walk(p, out);
    } else if (e.isFile() && !SKIP_FILES.has(e.name)) {
      out.push(p);
    }
  }
  return out;
}

const files = walk(ROOT, []);
let hits = 0;
for (const f of files) {
  let s;
  try {
    const st = fs.statSync(f);
    if (st.size > MAX_BYTES || !/\.(js|html|json|yml|yaml|md|css|txt|webmanifest|xml|svg)$/.test(f)) continue;
    s = fs.readFileSync(f, "utf8");
  } catch {
    continue; // unreadable/binary: skip
  }
  const rel = path.relative(ROOT, f);
  for (const [re, label] of PATTERNS) {
    const m = s.match(re);
    if (m) {
      // The ElevenLabs placeholder in the password input is documentation, not a key.
      if (/xi-api-key/.test(m[0]) && /placeholder|xi-api-key …/.test(s)) continue;
      console.error(`HIT [${label}] ${rel}: ${m[0].slice(0, 24)}…`);
      hits += 1;
    }
  }
}
if (hits > 0) {
  console.error(`\n❌ ${hits} possible secret(s) found. Remove them before committing.`);
  process.exitCode = 1;
} else {
  console.log(`✅ secret scan clean (${files.length} files checked)`);
}
