#!/bin/bash
# Download and resize all event images to local img/ directory
set -e
cd "$(dirname "$0")/.."
mkdir -p img

node -e '
const fs = require("fs");
const manifest = JSON.parse(fs.readFileSync("scripts/image-manifest.json", "utf8"));
manifest.forEach(m => console.log(m.index + "\t" + m.filename + "\t" + m.url));
' | while IFS=$'\t' read -r idx filename url; do
  out="img/$filename"
  if [ -f "$out" ] && [ -s "$out" ]; then
    echo "SKIP (exists): $filename"
    continue
  fi
  echo "DOWNLOADING: $filename"
  curl -sL --max-time 30 -A "cosmic-timeline-builder/1.0" "$url" -o "/tmp/opencode/tmp_$idx.jpg" 2>/dev/null || true
  if [ -s "/tmp/opencode/tmp_$idx.jpg" ]; then
    # Resize to max 700px wide, convert to optimized JPEG
    convert "/tmp/opencode/tmp_$idx.jpg" -resize "700x>" -quality 82 -strip "$out" 2>/dev/null || cp "/tmp/opencode/tmp_$idx.jpg" "$out"
    rm -f "/tmp/opencode/tmp_$idx.jpg"
    echo "  OK: $filename ($(du -k "$out" | cut -f1)KB)"
  else
    echo "  FAILED: $filename"
  fi
done
echo "Done."
