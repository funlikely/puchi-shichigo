# Roadmap

Status as of 2026-11-14: 55 hand-written rounds, home screen + game screen, runs in Expo Go and the browser.
Nothing is installable yet, and progress is lost on reload.

## Phase 0: Housekeeping
- [ ] Set real app identity in `app.json`: `name`, `slug`, `android.package`, `ios.bundleIdentifier`, `version`
- [ ] Persist round progress (AsyncStorage on native, localStorage on web)
- [ ] Update README for Linux and the new build/deploy commands

## Phase 1: Android install (Galaxy S24 + other Android phones)
- [ ] Dev loop: Expo Go over LAN (`npx expo start`, scan QR)
- [ ] Standalone APK: EAS Build `preview` profile with `buildType: apk`, then sideload
- [ ] Optional: local build without EAS cloud (`eas build --local` or `expo prebuild` + Gradle)

## Phase 2: Web on the local network (and iPad)
- [ ] Static export: `npx expo export -p web` -> `dist/`
- [ ] Serve `dist/` on the LAN (simple static server or Caddy); open the firewall port
- [ ] PWA manifest + icons so the iPad and phones can "Add to Home Screen"
- [ ] Later: cloud hosting of the same static build (EAS Hosting, Cloudflare Pages, Netlify, GitHub Pages)

## Phase 3: UX polish
- [ ] Auto-advance to the next unsolved clue; better solved and wrong-answer feedback
- [ ] Animations (tile press, solve, win) and haptics (`expo-haptics`)
- [ ] Hints (reveal first chunk, reveal letter count)
- [ ] Tablet and landscape layout; dark mode
- [ ] Navigation between rounds without going back to home

## Phase 4: Better puzzles
- [ ] Puzzle spec: about 20 tiles per round, 2-4 letter chunks (mostly 3), 7 answers of 5-10 letters
- [ ] Validator script: chunks join to answers, unique solution, no accidental alternate words, difficulty stats
- [ ] Generator pipeline: word list -> chunker -> LLM clue writer -> LLM judge -> human review
- [ ] Review UI to approve or reject generated rounds; approved ones go to `content/puzzles.json`

## Phase 5: Later
- [ ] Native iOS/iPad build (needs an Apple Developer account for anything beyond Expo Go)
- [ ] Daily puzzle, stats, play telemetry to calibrate difficulty
- [ ] Optional backend if progress should sync across devices
