# puchi-shichigo

A Seven Little Words style puzzle game built with React Native / Expo.

## Branches

- `main` — clean base
- `expo` — React Native / Expo implementation (current)
- `capacitor` — Capacitor + Vite/React implementation (future)

## Tech stack

- [Expo](https://expo.dev) (SDK 56) with the blank TypeScript template
- React Native 0.85 / React 19
- `react-native-web` for browser support
- TypeScript 6

## Directory structure

```
App.tsx                  Entry point and main game screen
index.ts                 Expo entry shim
app.json                 Expo project config (name, slug, icons)
assets/                  App icons and splash screen images
components/
  ClueRow.tsx            One row in the clue list (normal / active / solved states)
  ChunkTile.tsx          A tappable letter-chunk tile
  WordBuilder.tsx        Shows the word being assembled from selected chunks
data/
  puzzles.ts             Puzzle definitions and chunk-shuffling logic
hooks/
  useGameState.ts        All game logic — selection, solving, win detection
```

## How to run

Install dependencies (first time only):
```
npm install
```

Start the web dev server:
```
npm run web
```

Expo will open a browser tab automatically at `http://localhost:8081`.
Refresh the browser (`F5`) to pick up any code changes — no server restart needed.

Run on a physical device or emulator:
```
npm run android
npm run ios        # macOS only; use Expo Go app otherwise
```

## Troubleshooting

**Port 8081 already in use** — find and kill the process:
```
netstat -ano | findstr :8081
taskkill /PID <pid> /F
```

**`npm run web` exits immediately** — try clearing the Metro cache:
```
npx expo start --web --clear
```

**Type errors after adding files** — restart the TS server in VS Code:
`Ctrl+Shift+P` → "TypeScript: Restart TS Server"

## Game mechanics

- 7 clues are shown, each answered by one word
- All answers are pre-split into 2–4 letter chunks and shuffled into a tile pool
- Tap any clue to make it active (highlighted blue)
- Tap tiles to assemble the answer — the clue auto-solves the moment the word matches
- Tap a selected tile again to deselect it; use **Clear** to reset the current selection
- Solved clues turn green and their tiles go gray
- Solving all 7 shows a win screen

## Adding puzzles

Edit `data/puzzles.ts`. Each puzzle entry is:
```ts
{ clue: 'Clue text', answer: 'ANSWER', chunkTexts: ['AN', 'SWER'] }
```
`chunkTexts` joined must equal `answer`. Chunks are shuffled automatically at startup.
