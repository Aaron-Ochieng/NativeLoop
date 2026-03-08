# NativeLoop

NativeLoop is an Expo + React Native game app with two mini-games:
- `Memory`: a timed memory-matrix challenge.
- `Loop`: a programmable movement puzzle where instructions control a plane on a colored grid.

## Tech Stack

- Expo SDK 54
- React Native 0.81
- Expo Router (file-based routing)
- TypeScript
- Zustand (game state)
- NativeWind + Tailwind CSS (styling)
- Lucide + Expo vector icons

## Game Modes

### Memory (`/memory`)

Memory Matrix gameplay:
- Board size is `9 x 9`.
- Each round starts in `MEMORIZE` phase for 3 seconds.
- You then switch to `RECALL` and tap previously highlighted cells.
- Correct taps mark green; incorrect taps mark red.
- Base active cells start at `5` and increase with score (`+1` target every 5 points).
- The run is timed with a 5-minute countdown.

State is managed in `store/memory-store.tsx`.

### Loop (`/loop`)

Loop gameplay:
- Grid-based board (`13 x 12`) with:
  - start position at row `9`, col `1`
  - target/end position at row `5`, col `9`
- You fill an instruction row by selecting a slot, then adding:
  - movement (`FORWARD`, `TURN_LEFT`, `TURN_RIGHT`, `REPEAT`)
  - optional color condition (`red`, `amber`, `indigo`)
  - optional paint action for the current square
- `Play` executes one instruction step and advances pointer logic.
- `REPEAT` uses backtracking behavior to create loops across instructions.
- Going off the valid path resets the plane back to start.

State is managed in `store/loop-game-instructions.tsx`, with board data in `loops/gameLoop.ts`.

## Project Structure

```text
app/
  _layout.tsx      # Router stack + global layout
  index.tsx        # Home screen (mode selection)
  memory.tsx       # Memory game screen
  loop.tsx         # Loop game screen
components/
  timer.tsx
  where-to-rotate.tsx
  start-instruction-icon.tsx
store/
  memory-store.tsx
  loop-game-instructions.tsx
loops/
  gameLoop.ts      # Static board definition for Loop mode
  initial.ts       # Memory cell type and base grid shape
utils/
  rotation.ts
  seconds-to-time-string.ts
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or Bun)
- Expo tooling (via `npx expo`)

### Install

```bash
npm install
```

### Run

```bash
npm run start
```

Platform shortcuts:

```bash
npm run android
npm run ios
npm run web
```

## Scripts

- `npm run start` - start Expo dev server
- `npm run android` - launch Android target
- `npm run ios` - launch iOS target
- `npm run web` - launch web target
- `npm run lint` - run Expo lint

## Build/Release

EAS configuration is available in `eas.json` with `development`, `preview`, and `production` profiles.

Example:

```bash
npx eas build --platform android --profile development
```

## Notes

- App config is in `app.json` (scheme: `nativeloop`, Android package: `com.aaochieng.nativeloop`).
- The project includes NativeWind setup via `tailwind.config.js` and `app/globals.css`.
