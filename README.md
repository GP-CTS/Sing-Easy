# Sing Easy

A Carnatic vocal-training app: structured 30-day beginner course, vocal
warm-ups, shruti/tanpura practice with real pitch detection, a practice
planner, and a library for organizing your existing YouTube content.

Built with **React Native + Expo + TypeScript** so it runs on Android today
and iOS later with no extra work, and so it's easy for Claude Code (or any
developer) to keep extending.

---

## 1. Getting this running

You'll need Node.js installed. Then, from this folder:

```bash
npm install
npx expo start
```

This opens Expo's developer tools. From there:
- Press `a` to open in an Android emulator (needs Android Studio installed), or
- Install the **Expo Go** app on your Android phone and scan the QR code — fastest way to see it live on your own device.

### Building an installable APK (no Play Store needed yet)
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile preview
```
This gives you a downloadable `.apk` link you can install directly on any
Android phone — good for testing with real students before you publish.

### Publishing to Google Play
Same `eas build`, but with an `--profile production` AAB build, then upload
through the [Google Play Console](https://play.google.com/console). You'll
need a one-time $25 Play Console developer account.

---

## 2. Project structure

```
App.tsx                     entry point
metro.config.js             bundler config (lets the app load the tanpura .html widget)
assets/
  tanpura-widget.html        real Web Audio synthesis + mic pitch detection (see §4)
src/
  theme/                     colors.ts, typography.ts — all visual styling in one place
  types/                     shared TypeScript interfaces (AppProgress, CourseDay, etc.)
  data/                      static content: course lessons, warmup categories, badges
  store/useAppStore.ts       all app state + persistence (zustand + AsyncStorage)
  utils/youtube.ts           YouTube URL parsing
  components/                reusable UI: buttons, badges, stat cards, YouTube embed
  navigation/RootNavigator.tsx  bottom-tab navigation between screens
  screens/                   one file per tab: Dashboard, Course, Warmups, Shruti, Planner, Library
```

**Why this layout:** each screen only imports from `data`, `store`, and
`components` — never hardcodes content or duplicates logic. To add a new
lesson, edit `src/data/courseContent.ts`. To change a color, edit
`src/theme/colors.ts` and it updates everywhere. This is what "suitable for
future upgrading" means in practice: one place to change each kind of thing.

---

## 3. How state & persistence work

`src/store/useAppStore.ts` is the single source of truth for all progress
(streak, completed lessons, saved video links). It's a [zustand](https://github.com/pmndrs/zustand)
store wrapped in `persist()`, which automatically saves to the device via
AsyncStorage and reloads it on next launch — no manual save/load code needed
anywhere else. Any screen can read or update it with one line:

```ts
const store = useAppStore();
store.completeDay(5);
```

---

## 4. The tanpura drone & pitch detection — how it actually works

React Native itself has no built-in audio synthesis or FFT analysis. Rather
than stub this out, `assets/tanpura-widget.html` contains real Web Audio API
code — the same working audio-synthesis and autocorrelation pitch-detection
logic from the original browser prototype — loaded inside a `WebView`
(`src/screens/ShrutiScreen.tsx`). React Native and the widget talk to each
other via `postMessage`, so picking a different shruti note in the native UI
actually retunes the drone playing inside the WebView.

This is a deliberate, common pattern for audio-heavy React Native features,
not a placeholder. If you later want a fully native implementation (for
background audio, lower latency, or App Store review reasons), the natural
upgrade path is a native module using a package like
[`react-native-audio-api`](https://github.com/software-mansion/react-native-audio-api) —
the interface in `ShrutiScreen.tsx` is small enough to swap without touching
any other screen.

---

## 5. Roadmap — modules not yet built

These were on your original feature list but need more design/scoping
before writing code (each is a reasonable next task for Claude Code):

| Module | Notes |
|---|---|
| Swara Practice (Sarali/Jantai Varisai player) | Mostly a data + YouTubeEmbed reuse — quick to add |
| Ear Training games | Can reuse the pitch-detection widget for "guess the note" |
| Record & Compare | Needs `expo-av` recording + playback UI |
| Music Theory lessons | Pure content screens, same pattern as Warmups |
| Song Learning Tools (lyrics sync, loop section) | Needs a lyrics-timing data format + a custom video player (loop/slow-speed needs more than the basic YouTube embed) |
| Singing Games / Quizzes | New data model + scoring logic |
| Community (leaderboard, Q&A) | Needs a backend (Firebase or Supabase are the fastest to wire up) |
| AI Features (Premium: pitch feedback, vocal range finder) | Needs either an on-device ML model or a backend API call — biggest scope item |

Everything above the roadmap table is fully working today — not a mockup.

---

## 6. Design system

Palette, in `src/theme/colors.ts`: deep indigo background (`#14121F`), brass
gold accent (`#C9A227`), kumkum maroon (`#9B2F3D`), warm ivory text. The
progress ladder across the top of every screen uses the actual Carnatic
solfège (Sa Ri Ga Ma Pa Da Ni) as its stage markers instead of generic
numbering, since the swaras are the real sequence a learner moves through.
