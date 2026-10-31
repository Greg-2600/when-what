# Cosmic Timeline — Mobile (Capacitor) wrapping

The app is a PWA first (installable, offline). If App-store presence is desired, wrap it with Capacitor.

## Prerequisites
- Node 20+, Android Studio (Android) and/or Xcode (iOS)
- `npm i -g @capacitor/cli` (or use npx)

## Steps
1. `npm init -y` (if not already) and `npm i @capacitor/core @capacitor/cli`
2. `npx cap init "Cosmic Timeline" "com.example.cosmictimeline" --web-dir .`
3. `npx cap add android` (and/or `ios`)
4. Copy the static assets (`timeline.html`, `timeline-core.js`, `sw.js`, `manifest.webmanifest`, `icon.svg`, `img/`, `credits.html`) into the web dir.
5. `npx cap sync`
6. `npx cap open android` (or `ios`) and build/run from the IDE.

## Notes
- The service worker (`sw.js`) works inside the WebView; offline caching still applies.
- `navigator.language` is available in the WebView; the language default works.
- For App-store review, ensure the privacy statement (no cookies, no tracking) is reflected in the store listing.
- Consider disabling the prefetch-all (already removed) to keep the first launch fast.

## Status
Not built — this guide is the deliverable until a native build environment is available.

## Mobile-web responsive (shipped, v1.1)
The PWA itself is phone-friendly without any wrapper:
- ≤1099px: natural page scroll (timeline keeps 54vh), compact scrollable
  legend/subject rows, wrapping header controls, 20px touch markers.
- Tap a marker/label → before/now/after story strip (bottom sheet stays
  closed); `Details` on the current card opens the sheet; ✕ clears all.
- Covered by `tests/mobile.js` (8 checks: overflow, viewport height, touch
  size, tap→strip, image, Details→sheet→close, console).