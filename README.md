# RANDMAPP — Rick and Morty App Explorer

Web application to explore characters from the Rick and Morty Universe. Built with modern React patterns including Server Components, Server Actions, and the Next.js App Router.

## Tech Stack

- **Next.js 16** — App Router, Server Components, Server Actions, ISR caching
- **React 19** 
- **TypeScript** — Strict mode
- **SCSS Modules** — Scoped styles with centralized variables and responsive mixins
- **React Icons** — Lucide icon set

## Requirements

- [Node.js](https://nodejs.org/) v18.17 or higher

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/neidergm/randmapp.git
cd randmapp
```

2. Copy the environment file and install dependencies:

```bash
cp .env.example .env.local
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Rick and Morty API base URL | `https://rickandmortyapi.com/api` |

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Generate production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Jest with RTL |
| `npm run test:watch` | Run Jest with RTL watching changes |
| `npm run test:coverage` | Run Jest RTL coverage |

## Project Structure

```
src/
├── actions/              # Server Actions (API data fetching)
│   └── characters.actions.ts
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout (font, header, footer)
│   ├── page.tsx          # Root redirect → /home
│   ├── home/             # Character list page
│   │   ├── page.tsx      # Search + grid + pagination
│   │   ├── loading.tsx   # Skeleton loader
│   │   └── error.tsx     # Error boundary
│   └── characters/[id]/  # Character detail page
│       ├── page.tsx      # Detail view
│       ├── loading.tsx   # Skeleton loader
│       └── error.tsx     # Error boundary
├── components/           # Reusable UI components
│   ├── Character/        # CharacterCard, RecentViewedCard, CharacterLocation
│   ├── EmptyState/       # Empty search results
│   ├── ErrorState/       # Error display with retry
│   ├── LastVisited/      # Recently viewed sidebar
│   ├── MainHeader/       # App header
│   ├── MainFooter/       # App footer
│   ├── Pagination/       # Page navigation
│   ├── SearchBar/        # Search input with transitions
│   ├── Spinner/          # Loading indicator
│   ├── BackButton.tsx    # History-aware back navigation
│   └── VisitedTracker.tsx # Invisible visit tracker
├── config/               # App configuration
│   └── constants.ts      # API URL, constants
├── hooks/                # Custom React hooks
│   ├── useFetch.ts       # Generic fetch with AbortController
│   └── useLastVisited.ts # LocalStorage-persisted visit history
├── styles/               # Global styles and design tokens
│   ├── globals.scss      # Reset, body, utility classes
│   ├── _variables.scss   # Colors, breakpoints, typography, spacing
│   └── _mixins.scss      # Responsive media query mixin
└── types/                # TypeScript type definitions
    ├── character.types.ts
    └── location.types.ts
```

## Architecture Decisions

- **Server Components by default**: Pages fetch data on the server. Only interactive parts (`SearchBar`, `Pagination`, `LastVisited`) are Client Components.
- **Server Actions**: API calls in `actions/` run server-side with ISR caching (`revalidate: 3600`).
- **SCSS Modules**: Scoped per-component styles. All design tokens (colors, fonts, radii, shadows, breakpoints) centralized in `_variables.scss`.
- **URL-driven state**: Search and pagination state live in URL params, enabling shareable links and browser back/forward support.
- **LocalStorage for visit history**: Last 5 visited characters persisted client-side via `useLastVisited` hook, with hydration-safe initialization.

## API

Data sourced from the [Rick and Morty public API](https://rickandmortyapi.com/documentation).
