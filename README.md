<p align="center">
  <img src="assets/bootsplash_logo@2x.png" alt="FPL Stats logo" width="120" />
</p>

<h1 align="center">FPL Stats</h1>

<p align="center">
  A React Native companion app for <a href="https://fantasy.premierleague.com">Fantasy Premier League</a> managers. Follow your team's live points, fixtures, leagues and transfer history in a clean mobile UI.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-0.72-61DAFB?logo=react&logoColor=white" alt="React Native 0.72" />
  <img src="https://img.shields.io/badge/TypeScript-4.8-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React%20Query-v4-FF4154?logo=reactquery&logoColor=white" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey" alt="iOS | Android" />
</p>

---

## Features

- **Sign in with a Team ID or team name.** Enter your FPL Team ID, or search by team name and pick your team from the results. The session is kept on the device.
- **Live team view.** See your starting XI on a pitch with captain and vice-captain, player status (injuries and news), confirmed lineups and opponents.
  - Points update while matches are being played, with **live bonus points** worked out from BPS.
  - Automatic substitutions are simulated for bench players when someone in the first XI doesn't play.
- **Gameweek navigation.** Browse earlier gameweeks with points, average and highest score, active chip, and transfers made (including their point cost).
- **Fixtures.** Fixtures are grouped by kick-off date in your local time. A match details modal shows goals, assists, cards, saves and the BPS leaders, plus a scrollable stats table for each team.
- **Leagues and cups.** View your classic and head-to-head leagues and cups. League standings highlight your own team, and you can open any rival manager's team.
- **Dream Team.** See the top-scoring XI for each gameweek.
- **Transfers and history.** Check a manager's full transfer list by gameweek, plus their past seasons and chips.

## Tech Stack

| Area | Libraries |
| --- | --- |
| Core | React Native 0.72, React 18, TypeScript |
| Data fetching and caching | TanStack React Query v4, Axios |
| Navigation | React Navigation 6 (bottom tabs + stack navigators) |
| UI | react-native-svg, react-native-modal, react-native-collapsible, react-native-reanimated-table, react-native-flash-message |
| Native | react-native-bootsplash (splash screen and app icon), AsyncStorage |
| Testing | Jest, React Native Testing Library |
| Code quality | ESLint (incl. `@tanstack/eslint-plugin-query`), Prettier |

## Project Structure

```
src/
├── assets/        # Team logos, shirts, images and SVG icon components
├── components/    # Reusable UI, grouped by feature (Team, Fixtures, Leagues, ...) and common/
├── constants/     # Colors, font and size tokens
├── navigation/    # Bottom tab + per-tab stack navigators
├── screens/       # Screen-level components
├── services/      # API layer, session context and storage
├── types/         # Typed models for the FPL API responses
└── utils/         # Data transformation helpers (picks, fixtures, bonus points, ...)
```

Each component lives in its own folder with separate `*.styles.ts` and `*.test.tsx` files. Path aliases (`@components`, `@services`, `@utils`, ...) keep imports short.

## Getting Started

### Prerequisites

- Node.js ≥ 16
- A working React Native environment for iOS (Xcode, CocoaPods) and/or Android (Android Studio, JDK). See the [official setup guide](https://reactnative.dev/docs/set-up-your-environment).

### Installation

```bash
git clone https://github.com/AmarHumackic/FPLStats.git
cd FPLStats
npm install

# iOS only
cd ios && bundle install && bundle exec pod install && cd ..
```

### Run

```bash
npm start          # start Metro
npm run ios        # run on iOS simulator
npm run android    # run on Android emulator/device
```

### Tests and lint

```bash
npm test
npm run lint
```

## Data Source

The app uses the public, unofficial Fantasy Premier League API (`https://fantasy.premierleague.com/api`) and player photos from the Premier League CDN. No FPL login is needed, because the app only reads public team data.

> **Note:** Searching by team name relies on a third-party search endpoint that needs a function key. That key is not included in this repository, so set your own in `src/services/api.ts` if you have one. Signing in by **Team ID** works without any setup.

## Status

This is a personal side project built between October 2023 and February 2024. The main flows (Team, Fixtures, Leagues, Dream Team, Transfers, History) are implemented. The **Stats** and **Profile** tabs and the per-player gameweek breakdown modal are still in progress.

## Disclaimer

This project is not affiliated with, endorsed by, or connected to the Premier League or Fantasy Premier League. All club names, logos and kits belong to their respective owners.

## Author

**Amar Humačkić**: [GitHub](https://github.com/AmarHumackic)
