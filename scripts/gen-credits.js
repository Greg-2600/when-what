const fs = require("fs");
const html = fs.readFileSync("/Users/greg/Documents/Default Project/timeline.html", "utf8");
const start = html.indexOf("const EVENT_MEDIA = {");
const end = html.indexOf("};", start) + 2;
const src = html.slice(start, end);
// eval in a sandbox-ish way
const mod = { exports: {} };
const fn = new Function(src + "\n return EVENT_MEDIA;");
// EVENT_MEDIA is a const; re-declare as var via text replace
const code = src.replace("const EVENT_MEDIA", "var EVENT_MEDIA") + "\n return EVENT_MEDIA;";
const EVENT_MEDIA = new Function(code)();
const entries = Object.entries(EVENT_MEDIA);

const rows = entries.map(([title, m]) => {
  const url = m.url || "";
  const isLocal = url.startsWith("./img/");
  const source = isLocal
    ? "Wikimedia Commons (local cache)"
    : "Wikimedia Commons (remote)";
  return `      <tr>
        <td>${escape(title)}</td>
        <td>${escape(m.caption || "")}</td>
        <td>${escape(url)}</td>
        <td>${source}</td>
      </tr>`;
}).join("\n");

function escape(s) { return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

const out = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Image Credits — Cosmic Timeline</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 1100px; margin: 2rem auto; padding: 0 1rem; color: #e6eaf2; background: #0b1020; }
  h1 { font-size: 1.6rem; }
  a { color: #818cf8; }
  table { width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.85rem; }
  th, td { border: 1px solid #2a3355; padding: 0.4rem 0.6rem; vertical-align: top; }
  th { background: #141a33; text-align: left; }
  tr:nth-child(even) td { background: #0f1530; }
  .back { display: inline-block; margin-bottom: 1rem; }
  .note { color: #9aa4bf; font-size: 0.85rem; margin: 0.5rem 0 1rem; }
</style>
</head>
<body>
  <a class="back" href="timeline.html">← Back to the timeline</a>
  <h1>Image credits</h1>
  <p class="note">All event images are sourced from <a href="https://commons.wikimedia.org" target="_blank" rel="noopener">Wikimedia Commons</a> and used under their respective licenses (CC-BY, CC-BY-SA, or public domain). Local copies are cached for offline use by the service worker. ${entries.length} events have images.</p>
  <table>
    <thead><tr><th>Event</th><th>Caption</th><th>Source URL</th><th>License note</th></tr></thead>
    <tbody>
${rows}
    </tbody>
  </table>
  <p class="note">Generated from <code>EVENT_MEDIA</code> in <code>timeline.html</code> by <code>scripts/gen-credits.js</code>. Re-run after adding images.</p>
</body>
</html>
`;
fs.writeFileSync("/Users/greg/Documents/Default Project/credits.html", out);
console.log("wrote credits.html with", entries.length, "entries");