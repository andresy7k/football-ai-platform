# System Architecture: Football AI Analytics Platform

---

## 1. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                                       │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                    Next.js App (Vercel)                               │   │
│  │                                                                       │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐                │   │
│  │  │  Pages /     │  │  Server      │  │  Client      │                │   │
│  │  │  Layouts     │  │  Components  │  │  Components  │                │   │
│  │  │              │  │              │  │              │                │   │
│  │  │  (RSC)       │  │  (RSC)       │  │  (Framer     │                │   │
│  │  │              │  │              │  │   Motion)    │                │   │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘                │   │
│  │         │                  │                 │                         │   │
│  │         └──────────────────┴─────────────────┘                         │   │
│  │                            │                                            │   │
│  │                   ┌────────┴────────┐                                  │   │
│  │                   │   React Query   │                                  │   │
│  │                   │   (Cache Layer) │                                  │   │
│  │                   └────────┬────────┘                                  │   │
│  │                            │                                            │   │
│  │                   ┌────────┴────────┐                                  │   │
│  │                   │   API Routes    │                                  │   │
│  │                   │   (BFF Layer)   │                                  │   │
│  │                   └────────┬────────┘                                  │   │
│  └────────────────────────────┼──────────────────────────────────────────┘   │
│                               │                                              │
├───────────────────────────────┼──────────────────────────────────────────────┤
│                    SERVER LAYER (Vercel Serverless)                          │
│                               │                                              │
│  ┌────────────────────────────┼──────────────────────────────────────────┐   │
│  │                            │                                          │   │
│  │  ┌─────────────────────────┴──────────────────────┐                  │   │
│  │  │              Service Layer                       │                  │   │
│  │  │                                                   │                  │   │
│  │  │  ┌──────────────┐ ┌───────────┐ ┌─────────────┐  │                  │   │
│  │  │  │ MatchService │ │ BetService│ │AnalyticsSvc │  │                  │   │
│  │  │  └──────┬───────┘ └─────┬─────┘ └──────┬──────┘  │                  │   │
│  │  │         │               │               │          │                  │   │
│  │  │  ┌──────────────┐ ┌────┴─────┐ ┌─────────────┐  │                  │   │
│  │  │  │ AIService    │ │OddsSvc   │ │UserService  │  │                  │   │
│  │  │  └──────┬───────┘ └────┬─────┘ └──────┬──────┘  │                  │   │
│  │  └─────────┼──────────────┼───────────────┼──────────┘                  │   │
│  │            │              │               │                              │   │
│  │  ┌─────────┴──────────────┴───────────────┴──────────┐                  │   │
│  │  │              External API Clients                   │                  │   │
│  │  │                                                    │                  │   │
│  │  │  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │                  │   │
│  │  │  │ API-Football │  │ The Odds API │  │ DeepSeek │ │                  │   │
│  │  │  │   Client     │  │   Client     │  │  Client  │ │                  │   │
│  │  │  └──────────────┘  └──────────────┘  └──────────┘ │                  │   │
│  │  └────────────────────────────────────────────────────┘                  │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                         DATA LAYER                                           │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                     Supabase PostgreSQL                               │   │
│  │                                                                       │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐             │   │
│  │  │  users   │  │ matches  │  │ analyses │  │   bets   │             │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘             │   │
│  │                                                                       │   │
│  │  ┌──────────────────────┐  ┌──────────────────────────┐              │   │
│  │  │ saved_predictions    │  │  bankroll_events         │              │   │
│  │  └──────────────────────┘  └──────────────────────────┘              │   │
│  │                                                                       │   │
│  │  ┌───────────────────────────────────────────────────────────────┐   │   │
│  │  │  Row Level Security Policies (1 per table)                    │   │   │
│  │  │  - users: own row only                                        │   │   │
│  │  │  - matches: all authenticated                                 │   │   │
│  │  │  - analyses: all authenticated                                │   │   │
│  │  │  - bets: own rows only                                        │   │   │
│  │  │  - saved_predictions: own rows only                           │   │   │
│  │  └───────────────────────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                      SCHEDULED JOBS (Vercel Cron)                          │
│                                                                             │
│  06:00 UTC ─► fetch fixtures ─► score relevance ─► select top 5            │
│  06:15 UTC ─► send top 5 to DeepSeek ─► store analyses                     │
│  06:30 UTC ─► fetch odds for top 5 ─► merge into analyses                  │
│  Every 15min ─► update live match scores & odds (match day only)           │
│  23:00 UTC ─► settle resolved bets ─► recalculate ROI                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Folder Structure

```
src/
├── app/
│   ├── (marketing)/                    # Public-facing route group
│   │   ├── layout.tsx                  # Marketing layout (minimal)
│   │   ├── page.tsx                    # Landing / hero page
│   │   └── pricing/
│   │       └── page.tsx                # Future pricing page
│   │
│   ├── (dashboard)/                    # Authenticated route group
│   │   ├── layout.tsx                  # Dashboard layout (tab bar, header)
│   │   ├── page.tsx                    # Redirect to /today
│   │   ├── today/
│   │   │   ├── page.tsx                # Today's 5 matches (server component)
│   │   │   └── _components/
│   │   │       ├── MatchCard.tsx
│   │   │       ├── MatchCardSkeleton.tsx
│   │   │       ├── ConfidenceBar.tsx
│   │   │       └── MatchList.tsx
│   │   │
│   │   ├── matches/
│   │   │   └── [id]/
│   │   │       ├── page.tsx            # Match detail + Deep Analysis
│   │   │       └── _components/
│   │   │           ├── QuickAnalysis.tsx
│   │   │           ├── DeepAnalysis.tsx
│   │   │           ├── FormComparison.tsx
│   │   │           ├── H2HTimeline.tsx
│   │   │           ├── InjuryList.tsx
│   │   │           ├── OddsMovement.tsx
│   │   │           └── SaveBetSheet.tsx
│   │   │
│   │   ├── portfolio/
│   │   │   ├── page.tsx                # Bet list
│   │   │   └── _components/
│   │   │       ├── BetRow.tsx
│   │   │       ├── BetStatusBadge.tsx
│   │   │       ├── BetForm.tsx
│   │   │       └── EmptyPortfolio.tsx
│   │   │
│   │   ├── analytics/
│   │   │   ├── page.tsx                # ROI dashboard
│   │   │   └── _components/
│   │   │       ├── ROISummaryCards.tsx
│   │   │       ├── BankrollChart.tsx
│   │   │       ├── WinRatePie.tsx
│   │   │       ├── PerformanceTable.tsx
│   │   │       └── FilterBar.tsx
│   │   │
│   │   ├── saved/
│   │   │   ├── page.tsx                # Saved predictions
│   │   │   └── _components/
│   │   │       ├── SavedCard.tsx
│   │   │       └── SavedGroup.tsx
│   │   │
│   │   ├── profile/
│   │   │   ├── page.tsx                # Profile & settings
│   │   │   └── _components/
│   │   │       ├── ProfileHeader.tsx
│   │   │       ├── StatsGrid.tsx
│   │   │       └── SettingsForm.tsx
│   │   │
│   │   └── _components/
│   │       ├── TabBar.tsx              # Bottom tab navigation
│   │       ├── Header.tsx              # Top header (optional)
│   │       └── AppShell.tsx            # Layout wrapper
│   │
│   ├── auth/
│   │   ├── callback/
│   │   │   └── route.ts                # OAuth callback handler
│   │   ├── login/
│   │   │   └── page.tsx                # Login page
│   │   └── _components/
│   │       ├── OAuthButtons.tsx
│   │       ├── EmailLoginForm.tsx
│   │       └── AuthGuard.tsx
│   │
│   ├── api/
│   │   ├── matches/
│   │   │   ├── route.ts                # GET /api/matches (today's matches)
│   │   │   └── [id]/
│   │   │       └── route.ts            # GET /api/matches/:id (detail)
│   │   │
│   │   ├── bets/
│   │   │   ├── route.ts                # GET/POST /api/bets
│   │   │   └── [id]/
│   │   │       └── route.ts            # PATCH/DELETE /api/bets/:id
│   │   │
│   │   ├── analytics/
│   │   │   ├── roi/
│   │   │   │   └── route.ts            # GET /api/analytics/roi
│   │   │   └── bankroll/
│   │   │       └── route.ts            # GET /api/analytics/bankroll
│   │   │
│   │   ├── saved/
│   │   │   ├── route.ts                # GET/POST /api/saved
│   │   │   └── [id]/
│   │   │       └── route.ts            # DELETE /api/saved/:id
│   │   │
│   │   ├── user/
│   │   │   ├── profile/
│   │   │   │   └── route.ts            # GET /api/user/profile
│   │   │   └── preferences/
│   │   │       └── route.ts            # GET/PATCH /api/user/preferences
│   │   │
│   │   └── cron/
│   │       ├── fetch-matches/
│   │       │   └── route.ts            # Cron: fetch & score fixtures
│   │       ├── generate-analyses/
│   │       │   └── route.ts            # Cron: DeepSeek predictions
│   │       ├── fetch-odds/
│   │       │   └── route.ts            # Cron: odds refresh
│   │       └── settle-bets/
│   │           └── route.ts            # Cron: auto-settle finished matches
│   │
│   ├── layout.tsx                      # Root layout (fonts, providers)
│   └── globals.css                     # Tailwind + design tokens
│
├── components/                         # Shared UI components
│   ├── ui/                             # Primitive components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Sheet.tsx                   # Bottom sheet (Framer Motion)
│   │   ├── Badge.tsx
│   │   ├── Avatar.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Tabs.tsx
│   │   ├── Tooltip.tsx
│   │   └── Chart.tsx                   # Recharts wrapper
│   │
│   ├── icons/
│   │   └── index.tsx                   # SVG icon set (Lucide or custom)
│   │
│   └── layout/
│       ├── Providers.tsx               # QueryClient, Theme, Auth providers
│       ├── AuthProvider.tsx            # Supabase session context
│       ├── ThemeProvider.tsx           # Dark/light mode
│       └── QueryProvider.tsx           # React Query setup
│
├── lib/
│   ├── db/
│   │   ├── client.ts                   # Supabase server client
│   │   ├── client-browser.ts           # Supabase browser client
│   │   ├── schema.ts                   # Drizzle schema definitions
│   │   └── queries/
│   │       ├── matches.ts
│   │       ├── bets.ts
│   │       ├── analyses.ts
│   │       ├── saved.ts
│   │       └── users.ts
│   │
│   ├── ai/
│   │   ├── client.ts                   # DeepSeek HTTP client
│   │   ├── prompts.ts                  # Prompt templates
│   │   └── types.ts                    # AI response types
│   │
│   ├── external/
│   │   ├── api-football/
│   │   │   ├── client.ts
│   │   │   └── types.ts
│   │   └── odds-api/
│   │       ├── client.ts
│   │       └── types.ts
│   │
│   └── auth/
│       ├── server.ts                   # Server-side auth helpers
│       └── client.ts                   # Client-side auth helpers
│
├── services/                           # Business logic (imports lib)
│   ├── match.service.ts                # Match curation + scoring
│   ├── ai.service.ts                   # Orchestrates AI pipeline
│   ├── bet.service.ts                  # Bet CRUD + validation
│   ├── analytics.service.ts            # ROI, bankroll calculations
│   ├── user.service.ts                 # Profile + preferences
│   ├── odds.service.ts                 # Odds fetching + caching
│   └── cron.service.ts                 # Cron orchestration
│
├── types/
│   ├── index.ts                        # Re-exports
│   ├── models.ts                       # DB row types
│   ├── api.ts                          # API request/response types
│   └── ui.ts                           # UI-specific types
│
├── utils/
│   ├── currency.ts                     # Formatting, conversion
│   ├── date.ts                         # Date formatting (Temporal/date-fns)
│   ├── odds.ts                         # Odds format conversion
│   ├── cn.ts                           # clsx + twMerge utility
│   └── validators.ts                   # Zod schemas shared client/server
│
├── middleware.ts                       # Next.js middleware (auth redirect)
└── hooks/                              # Shared React hooks
    ├── use-matches.ts                  # React Query: matches
    ├── use-bets.ts                     # React Query: bets
    ├── use-analytics.ts               # React Query: analytics
    ├── use-saved.ts                    # React Query: saved predictions
    ├── use-user.ts                     # Auth state
    └── use-debounce.ts                 # Debounce utility
```

---

## 3. Data Flow

### 3.1 Daily Prediction Generation (Offline Pipeline)

```
    06:00 UTC                          06:15 UTC                          06:30 UTC
┌─────────────────┐             ┌─────────────────────┐            ┌────────────────────┐
│  API-Football    │             │  DeepSeek API        │            │  The Odds API      │
│  GET /fixtures   │             │  POST /chat/complet  │            │  GET /odds          │
└────────┬────────┘             └──────────┬──────────┘            └─────────┬──────────┘
         │                                  │                                 │
         ▼                                  ▼                                 ▼
┌─────────────────┐             ┌─────────────────────┐            ┌──────────────────────┐
│ Cron Route       │             │ Cron Route           │            │ Cron Route            │
│ /api/cron/       │──────────►  │ /api/cron/           │──────────► │ /api/cron/            │
│ fetch-matches    │  scores     │ generate-analyses    │  analysis   │ fetch-odds            │
└────────┬────────┘             └──────────┬──────────┘            └──────────┬───────────┘
         │                                  │                                 │
         ▼                                  ▼                                 ▼
┌─────────────────┐             ┌─────────────────────┐            ┌──────────────────────┐
│ Supabase DB      │             │ Supabase DB           │            │ Supabase DB            │
│ matches table    │             │ analyses table        │            │ analyses (odds jsonb)  │
│ + relevance      │             │ + generated_at        │            │ + odds_snapshot        │
│  scores          │             │                       │            │                        │
└─────────────────┘             └───────────────────────┘            └────────────────────────┘
```

### 3.2 User Request Flow (Runtime)

```
┌──────────┐     ┌──────────────┐     ┌────────────────┐     ┌───────────┐     ┌──────────┐
│  Browser  │     │  Next.js     │     │  Service       │     │ Supabase  │     │  React   │
│  (Client) │     │  (Server)    │     │  Layer         │     │  (DB)     │     │  Query   │
└─────┬─────┘     └──────┬───────┘     └───────┬────────┘     └─────┬─────┘     └─────┬────┘
      │                  │                      │                   │                  │
      │  GET /today      │                      │                   │                  │
      │─────────────────►│                      │                   │                  │
      │                  │                      │                   │                  │
      │                  │  matchService        │                   │                  │
      │                  │  .getTodaysMatches() │                   │                  │
      │                  │─────────────────────►│                   │                  │
      │                  │                      │                   │                  │
      │                  │                      │  SELECT * FROM    │                  │
      │                  │                      │  matches WHERE    │                  │
      │                  │                      │  date = today     │                  │
      │                  │                      │──────────────────►│                  │
      │                  │                      │                   │                  │
      │                  │                      │  rows + analyses  │                  │
      │                  │                      │◄──────────────────│                  │
      │                  │                      │                   │                  │
      │                  │  RSC Payload         │                   │                  │
      │  ◄──────────────│                      │                   │                  │
      │                  │                      │                   │                  │
      │  HYDRATE +       │                      │                   │                  │
      │  React Query     │                      │                   │                  │
      │───────────────────────────────────────────────────────────────────────────────►│
      │                  │                      │                   │                  │
      │  User saves bet  │                      │                   │                  │
      │─────────────────►│                      │                   │                  │
      │                  │  POST /api/bets      │                   │                  │
      │                  │─────────────────────►│                   │                  │
      │                  │                      │                   │                  │
      │                  │                      │  betService       │                  │
      │                  │                      │  .createBet()     │                  │
      │                  │                      │──────────────────►│                  │
      │                  │                      │                   │                  │
      │                  │                      │  {bet, bankroll  }│                  │
      │                  │                      │◄──────────────────│                  │
      │                  │                      │                   │                  │
      │  201 + bet       │                      │                   │                  │
      │  ◄──────────────│                      │                   │                  │
      │                  │                      │                   │                  │
      │  Invalidate      │                      │                   │                  │
      │  queries         │                      │                   │                  │
      │───────────────────────────────────────────────────────────────────────────────►│
```

### 3.3 Bet Settlement Flow

```
┌──────────────┐     ┌────────────────┐     ┌──────────────┐     ┌───────────────┐
│  Cron Route   │     │  Odds/Match    │     │  BetService  │     │  Analytics    │
│  (23:00 UTC)  │     │  Status Check  │     │              │     │  Service      │
└──────┬───────┘     └───────┬────────┘     └──────┬───────┘     └───────┬───────┘
       │                     │                      │                     │
       │  processSettlements │                      │                     │
       │────────────────────►│                      │                     │
       │                     │                      │                     │
       │                     │  API-Football:       │                     │
       │                     │  match.finished?     │                     │
       │                     │  + score             │                     │
       │                     │                      │                     │
       │                     │  for each pending:   │                     │
       │                     │  check outcome       │                     │
       │                     │─────────────────────►│                     │
       │                     │                      │                     │
       │                     │                      │  update bet.status  │
       │                     │                      │  = win/loss/push    │
       │                     │                      │                     │
       │                     │                      │  recalculate        │
       │                     │                      │  bankroll           │
       │                     │                      │────────────────────►│
       │                     │                      │                     │
       │                     │                      │  INSERT bankroll    │
       │                     │                      │  _events            │
       │                     │                      │                     │
       │  done               │                      │                     │
       │◄────────────────────│──────────────────────│─────────────────────│
```

---

## 4. API Design

### 4.1 Match Endpoints

| Method | Path | Auth | Description | Response |
|--------|------|------|-------------|----------|
| `GET` | `/api/matches` | Optional | Today's 5 matches with analyses | `{ matches: MatchWithAnalysis[] }` |
| `GET` | `/api/matches?date=2026-06-18` | Optional | Matches for a specific date | `{ matches: MatchWithAnalysis[] }` |
| `GET` | `/api/matches/[id]` | Optional | Single match with full deep analysis | `{ match: MatchDetail }` |

### 4.2 Bet Endpoints

| Method | Path | Auth | Description | Request Body | Response |
|--------|------|------|-------------|-------------|----------|
| `GET` | `/api/bets` | Required | User's bet portfolio | — | `{ bets: Bet[] }` |
| `GET` | `/api/bets?status=pending&league=EPL` | Required | Filtered portfolio | — | `{ bets: Bet[] }` |
| `POST` | `/api/bets` | Required | Create a bet | `{ matchId, market, odds, stake }` | `{ bet: Bet }` |
| `PATCH` | `/api/bets/[id]` | Required | Update bet outcome | `{ status: "win" | "loss" | "push" }` | `{ bet: Bet }` |
| `DELETE` | `/api/bets/[id]` | Required | Delete a pending bet | — | `{ success: true }` |

### 4.3 Analytics Endpoints

| Method | Path | Auth | Description | Query Params | Response |
|--------|------|------|-------------|-------------|----------|
| `GET` | `/api/analytics/roi` | Required | ROI summary | `?from=&to=&league=` | `{ roi, netProfit, winRate, totalBets, bankroll }` |
| `GET` | `/api/analytics/bankroll` | Required | Bankroll time series | `?period=7d|30d|all` | `{ events: { date, bankroll }[] }` |

### 4.4 Saved Predictions Endpoints

| Method | Path | Auth | Description | Request Body | Response |
|--------|------|------|-------------|-------------|----------|
| `GET` | `/api/saved` | Required | Saved predictions | — | `{ saved: SavedPrediction[] }` |
| `POST` | `/api/saved` | Required | Save a prediction | `{ matchId }` | `{ saved: SavedPrediction }` |
| `DELETE` | `/api/saved/[id]` | Required | Remove saved pred | — | `{ success: true }` |

### 4.5 User Endpoints

| Method | Path | Auth | Description | Request Body | Response |
|--------|------|------|-------------|-------------|----------|
| `GET` | `/api/user/profile` | Required | User profile | — | `{ user: UserProfile }` |
| `GET` | `/api/user/preferences` | Required | Get preferences | — | `{ prefs: UserPreferences }` |
| `PATCH` | `/api/user/preferences` | Required | Update preferences | `{ currency?, oddsFormat?, theme? }` | `{ prefs: UserPreferences }` |

### 4.6 Cron Endpoints (Internal)

| Method | Path | Auth | Cron Schedule | Description |
|--------|------|------|---------------|-------------|
| `GET` | `/api/cron/fetch-matches` | CRON_SECRET | 06:00 UTC | Fetch fixtures from API-Football, score relevance, store top 5 |
| `GET` | `/api/cron/generate-analyses` | CRON_SECRET | 06:15 UTC | Send top 5 matches to DeepSeek, store results |
| `GET` | `/api/cron/fetch-odds` | CRON_SECRET | 06:30 UTC, then every 15min | Fetch odds for top 5 matches |
| `GET` | `/api/cron/settle-bets` | CRON_SECRET | 23:00 UTC | Auto-settle bets for finished matches |

### 4.7 Standard Response Envelope

```typescript
// Success
{
  data: T;
  meta?: {
    page?: number;
    total?: number;
    generatedAt?: string;  // ISO 8601
  };
}

// Error
{
  error: {
    code: string;          // e.g. "BET_NOT_FOUND", "VALIDATION_ERROR"
    message: string;
    details?: unknown;
  };
}
```

---

## 5. Services

### 5.1 Match Service (`services/match.service.ts`)

```
matchService
├── fetchAndCrateMatches()    # Cron: fetch API-Football fixtures, store
├── scoreRelevance(matches)   # Algorithm: score each match 0–100
│   ├── leagueWeight()        #   Premier League > Championship > etc.
│   ├── teamPopularity()      #   Market size proxy (fan count / social)
│   ├── oddsProximity()       #   Close odds = more interesting
│   └── rivalryIndex()        #   Historical H2H intensity
├── selectTop5()              # Return highest-scored 5
├── getTodaysMatches()        # RSC: from DB with cached analyses
└── getMatchById(id)          # Single match + full analysis
```

### 5.2 AI Service (`services/ai.service.ts`)

```
aiService
├── generateAnalysis(match)   # Call DeepSeek, parse structured response
├── generateAllAnalyses()     # Batch: iterate top 5, generate + store
│   └── buildPrompt(match)    #   Assemble context: form, H2H, odds, injuries
├── parseAIResponse(raw)      #   Validate & transform to typed Analysis
└── storeAnalysis(analysis)   #   UPSERT into analyses table
```

### 5.3 Bet Service (`services/bet.service.ts`)

```
betService
├── createBet(userId, input)  # Validate stake, check match exists, insert
├── getBets(userId, filters)  # List with pagination + sorting
├── getBetById(userId, id)    # Single bet (ownership check)
├── updateOutcome(id, status) # Validate transition (pending→win/loss/push)
│   └── recalculateBankroll() #   Update user.bankroll
├── deleteBet(id)             # Only pending bets deletable
└── settlePendingBets()       # Cron: auto-settle finished matches
```

### 5.4 Analytics Service (`services/analytics.service.ts`)

```
analyticsService
├── getROISummary(userId, filters)  # Aggregate all settled bets
│   ├── totalStaked()
│   ├── totalProfit()                #   Sum of profits (loss negative)
│   ├── roi()                        #   (profit / staked) × 100
│   └── winRate()                    #   wins / (wins + losses)
├── getBankrollHistory(userId, period)  # Time series from bankroll_events
└── getPerformanceByLeague(userId)      # Breakdown by competition
```

### 5.5 User Service (`services/user.service.ts`)

```
userService
├── getProfile(userId)                # Profile + aggregate stats
├── updatePreferences(userId, prefs)  # Partial update
├── getPreferences(userId)            # With defaults fallback
├── onCreateUser(authUser)            # Supabase webhook: create profile row
└── deleteAccount(userId)             # GDPR: cascade delete user data
```

### 5.6 Odds Service (`services/odds.service.ts`)

```
oddsService
├── fetchOdds(match)                  # The Odds API request
├── getBestOdds(bookmakers)           # Pick highest across markets
├── normalizeOdds(odds)               # Convert to decimal internally
└── attachToAnalysis(matchId, odds)   # Store snapshot in analysis row
```

### 5.7 Cron Service (`services/cron.service.ts`)

```
cronService
├── executeDailyPipeline()            # Orchestrates the full morning run
│   ├── step1: fetchAndCrateMatches()
│   ├── step2: scoreRelevance() + selectTop5()
│   ├── step3: generateAllAnalyses()
│   └── step4: fetchOddsForAll()
├── executeOddsRefresh()              # Every 15min on match day
└── executeSettlement()               # Nightly bet settlement
```

### 5.8 Relevance Scoring Algorithm (Detail)

```typescript
function scoreRelevance(match: Fixture): Score {
  const weights = {
    leagueTier: 0.30,
    teamSize: 0.25,
    oddsBalance: 0.25,
    rivalry: 0.15,
    recency: 0.05,
  };

  return {
    leagueTier: scoreLeague(match.league),      // UCL=100, PL=90, EL=80, CH=70, ...
    teamSize: scorePopularity(match.teams),     // Real Madrid=100, Luton=10
    oddsBalance: scoreBalance(match.odds),      // 2.5 vs 2.8 = 95, 1.1 vs 10 = 20
    rivalry: scoreRivalry(match),               // El Clásico=100, random=0
    recency: scoreRecency(match.date),          // Today=100, days out→linear decay
    total: weightedSum(weights),
  };
}

// Only matches with total > threshold survive the top-5 cut.
```

---

## 6. Security Considerations

### 6.1 Authentication & Authorization

| Concern | Implementation |
|---------|---------------|
| **OAuth flow** | Supabase handles OAuth PKCE flow; callback route exchanges code for session |
| **Session management** | Supabase 30-day refresh tokens; `middleware.ts` checks session on protected routes |
| **Row-Level Security** | Every table has a policy: `user_id = auth.uid()` for user-owned data; `TRUE` for public reads |
| **API route protection** | Every API route extracts `userId` from request cookies via `createRouteHandlerClient()` |
| **Cron auth** | Bearer token `CRON_SECRET` in `Authorization` header; validated via env var |

### 6.2 API Key Management

| Key | Storage | Access |
|-----|---------|--------|
| `DEEPSEEK_API_KEY` | Vercel Environment Variable | Server-side only |
| `API_FOOTBALL_KEY` | Vercel Environment Variable | Server-side only |
| `ODDS_API_KEY` | Vercel Environment Variable | Server-side only |
| `SUPABASE_SERVICE_ROLE` | Vercel Environment Variable | Cron routes only |
| `CRON_SECRET` | Vercel Environment Variable | Cron routes only |

All external API calls originate from server-side code. **No API keys ever reach the client bundle.**

### 6.3 Data Validation

| Layer | Tool | Scope |
|-------|------|-------|
| **API input** | Zod schemas | All POST/PATCH/PUT request bodies |
| **DB insert** | Drizzle types + TS | Column types, enums, nullable checks |
| **Client input** | Zod + React Hook Form | Bet forms, settings forms |
| **AI output** | Zod | Parse & validate DeepSeek JSON response |

### 6.4 Additional Measures

- **Rate limiting:** Vercel WAF or Upstash rate limiter on all API routes (100 req/min per user)
- **CSRF:** Supabase cookies are `HttpOnly`, `SameSite=Lax`; no separate CSRF token needed
- **SQL injection:** Drizzle ORM parameterizes all queries
- **XSS:** React escapes by default; no `dangerouslySetInnerHTML` for AI content (use Markdown renderer)
- **Data retention:** `DELETE /api/user` cascades; scheduled cleanup of analyses > 90 days

---

## 7. Scalability Considerations

### 7.1 Current Scale (MVP Target)

| Metric | Target |
|--------|--------|
| DAU | 10,000 |
| Requests/day | ~500,000 |
| API calls/day (external) | ~500 (cron) |
| DB row count (bets) | ~500,000 |

### 7.2 Bottleneck Analysis

| Component | Bottleneck | Mitigation |
|-----------|-----------|------------|
| **DeepSeek API** | Rate limits, latency | Batch all 5 analyses in parallel; pre-generate at 06:15 |
| **API-Football** | Rate limits (calls/min) | Cache aggressively; only fetch once per day |
| **Supabase DB** | Concurrent readers | React Query deduplication; reads hit replicas |
| **Next.js API** | Cold starts | Keep-alive pings; critical path uses RSC directly |
| **Client bundle** | JS size | Dynamic imports for Deep Analysis sheet, Chart components |

### 7.3 Caching Strategy

```
┌────────────────────────────────────────────────────────────────────┐
│  CACHE LAYERS                                                      │
│                                                                    │
│  Browser Cache   ◄── Service Worker (offline shell)                │
│                                                                    │
│  React Query     ◄── staleTime: 5min (matches), ∞ (user bets)     │
│                                                                    │
│  Next.js RSC     ◄── revalidate: 300 (ISR for match pages)        │
│                                                                    │
│  DB Indexes      ◄── matches(kickoff), bets(user_id, status)      │
│                                                                    │
│  Future: Redis   ◄── Analysis JSON cache (reduce DB load)          │
└────────────────────────────────────────────────────────────────────┘
```

### 7.4 Database Indexes

```sql
-- High-traffic queries
CREATE INDEX idx_matches_kickoff ON matches(kickoff DESC);
CREATE INDEX idx_matches_status ON matches(status);
CREATE INDEX idx_bets_user_status ON bets(user_id, status);
CREATE INDEX idx_bets_user_created ON bets(user_id, created_at DESC);
CREATE INDEX idx_analyses_match ON analyses(match_id);

-- Filter queries
CREATE INDEX idx_bets_league ON bets(league) WHERE league IS NOT NULL;
CREATE INDEX idx_bets_settled_at ON bets(settled_at DESC) WHERE settled_at IS NOT NULL;
```

### 7.5 Future Scalability (Phase 2+)

| Scale | Strategy |
|-------|----------|
| **50,000 DAU** | Read replicas; Redis cache for analysis JSON |
| **100,000+ DAU** | CDN for static analyses (generated JSON files → CDN); DB only for bets |
| **Global users** | Multi-region Supabase; Edge Functions for latency-sensitive reads |
| **AI cost explosion** | Cache DeepSeek responses by match fingerprint; fallback to heuristic model |

### 7.6 Cost Projections (MVP, ~10K DAU)

| Service | Est. Monthly Cost | Notes |
|---------|-------------------|-------|
| **Vercel Pro** | $20 | 1TB bandwidth, 6,000 build mins |
| **Supabase Pro** | $25 | 8GB DB, 50GB bandwidth, 100K monthly active users |
| **DeepSeek API** | ~$30 | ~150 analyses/day × 1K tokens × 30 days |
| **API-Football** | $30/mo | "Sports" plan, 100 req/min |
| **The Odds API** | $0 (free tier) | 500 req/day, covers our use case |
| **Total** | **~$105/mo** | Well within margin for a free MVP |

---

*This architecture document should be reviewed alongside PRD.md and updated as technical decisions evolve during implementation.*
