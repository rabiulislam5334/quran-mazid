# QuranMazid — Frontend

Next.js frontend for the QuranMazid application. Read, listen to, and search the Holy Quran with a beautiful, responsive UI.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Fonts**: KFGQPC Uthmanic Script, Amiri Quran, Scheherazade New

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend server running (see `back/` README)

### Install & Run

```bash
npm install
npm run dev
```

App runs at **http://localhost:3000**

### Environment Variables

Create a `.env.local` file in the root of the `app/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000` | Backend API base URL |

### Build for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
app/
├── app/
│   ├── components/
│   │   ├── audio/            # BottomPlayer, AudioButton
│   │   ├── ayah/             # AyahCard, BookmarkModal, ShareModal, AyahActionModal
│   │   ├── home/             # Hero, SurahList, Collection, AppBanner, SadaqahBanner, AyahTicker
│   │   ├── layout/           # Navbar, Sidebar, Footer, BottomNav, SurahNavbar, MobileHeader
│   │   ├── search/           # SearchModal, GlobalSearch
│   │   ├── settings/         # FontSettingsPanel, ThemeSwitcher
│   │   └── surah/            # SurahHeader
│   ├── hooks/
│   │   ├── useAudioPlayer.ts # Audio playback state & controls
│   │   ├── useFontSettings.ts# Arabic font & size preferences
│   │   ├── useTheme.ts       # Light / dark / sepia theme toggle
│   │   └── useSurahData.ts   # Surah data fetching hook
│   ├── lib/
│   │   └── api.ts            # API client (fetch wrappers)
│   ├── surah/
│   │   └── [id]/
│   │       ├── page.tsx      # Surah reading page
│   │       ├── loading.tsx   # Surah skeleton loader
│   │       └── error.tsx     # Surah error boundary
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   ├── globals.css           # CSS variables & global styles
│   ├── layout.tsx            # Root layout (fonts, metadata)
│   ├── page.tsx              # Home page
│   ├── loading.tsx           # Global loading page
│   └── error.tsx             # Global error page
```

---

## Features

- **Home Page** — Surah list, last-read bookmark, search hero
- **Surah Page** — Arabic text + English translation, verse-by-verse navigation
- **Audio Player** — Mishary Al-Afasy recitation with playback controls
- **Search** — Full-text search across all 114 Surahs (Arabic & English)
- **Themes** — Dark (default), Light, Sepia — persisted in localStorage
- **Font Settings** — Switch Arabic font (Uthmani / Amiri / Scheherazade) and adjust sizes
- **Responsive** — Mobile-first with bottom navigation bar

---

## API Client (`lib/api.ts`)

| Function | Description |
|----------|-------------|
| `fetchAllSurahs()` | Fetch list of all 114 Surahs |
| `fetchSurah(id)` | Fetch metadata for a single Surah |
| `fetchSurahAyahs(id)` | Fetch all Ayahs for a Surah |
| `searchAyahs(q, page, limit)` | Full-text search with pagination |
| `getAudioUrl(surahId, verseNum)` | Build CDN audio URL for an Ayah |

---

## Theming

Themes are defined via CSS variables in `globals.css`. Three themes are supported:

| Theme | Selector |
|-------|----------|
| Dark (default) | `[data-theme="dark"]` |
| Light | `[data-theme="light"]` |
| Sepia | `[data-theme="sepia"]` |

Key CSS variables: `--bg-primary`, `--gold`, `--text-primary`, `--border`, etc.

---

## TypeScript Interfaces

```ts
Surah          // id, name, transliteration, translation, type, total_verses
Ayah           // id, surah, verse, text, translation, audio_url
SurahWithAyahs // surah, ayahs[], total
SearchResult   // surah_id, surah_name, verse, text, translation, highlight
FontSettings   // arabicFont, arabicFontSize, translationFontSize
```
