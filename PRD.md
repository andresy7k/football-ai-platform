# Product Requirements Document: Football AI Analytics Platform

> **Status:** Draft v1.0
> **Author:** Product & Engineering Team
> **Date:** June 2026

---

## 1. Executive Summary

Football AI Analytics is a premium daily football prediction platform that surfaces the **5 most relevant matches** each day with deep AI-driven analysis. Unlike cluttered competitors, this platform is opinionated by design — it curates instead of overwhelms.

The product targets intelligent bettors who want **quality over quantity**: pre-generated AI analysis, portfolio tracking, and beautiful Apple-grade UI. It is powered by API-Football for fixture data, The Odds API for market pricing, and DeepSeek for natural language reasoning.

**Core promise:** *Open the app once per day. Get your 5 best bets. Track what happens.*

---

## 2. User Personas

### Persona 1: The Casual Sharp (Primary)
| Attribute | Detail |
|---|---|
| **Name** | Marcus Chen |
| **Age** | 28 |
| **Occupation** | Data analyst |
| **Behavior** | Bets 2–3 times per week. Wants AI reasoning, not just picks. Values clean design. |
| **Goals** | Save time on research. Learn _why_ a prediction was made. |
| **Pain Points** | Existing sites are ad-ridden, noisy, show 100+ matches. |

### Persona 2: The Portfolio Tracker (Secondary)
| Attribute | Detail |
|---|---|
| **Name** | Sarah Osterman |
| **Age** | 34 |
| **Occupation** | Consultant |
| **Behavior** | Bets occasionally but obsessively tracks P&L. Spreadsheet user today. |
| **Goals** | Automated ROI tracking. Bankroll management. Know her edge. |
| **Pain Points** | Manual tracking is error-prone. No clear picture of net performance. |

### Persona 3: The Casual Fan (Tertiary)
| Attribute | Detail |
|---|---|
| **Name** | Jamie Roberts |
| **Age** | 22 |
| **Occupation** | University student |
| **Behavior** | Watches football casually. Curious about AI predictions. |
| **Goals** | Light entertainment. One-tap deep analysis. |
| **Pain Points** | Intimidated by betting jargon. Wants simple, clean entry points. |

---

## 3. User Stories

### Auth & Onboarding
- As a **new user**, I want to sign in with Google or GitHub so I can access the platform without creating another password.
- As a **returning user**, I want to be recognized immediately via Supabase session persistence.
- As a **user**, I want a slick onboarding flow that explains the "5 matches per day" philosophy.

### Daily Matches
- As a **user**, I want to see exactly 5 matches each day so I am not overwhelmed by choice.
- As a **user**, I want matches ranked by relevance/confidence so I know where to focus.
- As a **user**, I want match cards to show teams, time, league, and AI confidence at a glance.

### AI Predictions
- As a **user**, I want to see a pre-generated AI prediction for every match so I never wait for a response.
- As a **user**, I want to read the AI's reasoning in natural language so I understand the logic.
- As a **user**, I want to toggle between **Quick Analysis** (2–3 sentence summary) and **Deep Analysis** (full breakdown of form, H2H, injuries, market movement).

### Betting Portfolio
- As a **user**, I want to save a bet (match, market, stake, odds) to my portfolio with one tap.
- As a **user**, I want to update bet outcomes (Win / Loss / Push / Pending) after matches finish.
- As a **user**, I want my portfolio aggregated into ROI, profit/loss, and bankroll metrics.

### ROI Analytics
- As a **user**, I want to see my overall ROI across all bets.
- As a **user**, I want to filter performance by league, month, or bet type.
- As a **user**, I want a clean chart showing bankroll growth over time.

### User Profile
- As a **user**, I want a profile page showing my stats, saved bets, and preferences.
- As a **user**, I want to control notification preferences (daily AI digest, bet settlement alerts).

### Saved Predictions
- As a **user**, I want to bookmark/favourite predictions so I can revisit them later.
- As a **user**, I want saved predictions to persist across sessions.

---

## 4. Functional Requirements

### FR-1: Authentication & User Management
| ID | Requirement | Priority |
|---|---|---|
| FR-1.1 | Users shall authenticate via Supabase Auth with email/password, Google OAuth, and GitHub OAuth | P0 |
| FR-1.2 | Sessions shall persist for 30 days with refresh tokens | P0 |
| FR-1.3 | User profiles shall store display name, avatar, and betting preferences | P0 |
| FR-1.4 | Anonymous browsing shall show a preview of matches with a "Sign in to see predictions" gate | P1 |

### FR-2: Match Curation Engine
| ID | Requirement | Priority |
|---|---|---|
| FR-2.1 | A daily cron job shall fetch fixtures via API-Football each morning (target: 06:00 UTC) | P0 |
| FR-2.2 | A relevance scoring algorithm shall select the top 5 matches from all fixtures | P0 |
| FR-2.3 | Relevance scoring shall consider: league tier, team market size, odds proximity (close = more interesting), rivalry index, fixture recency | P0 |
| FR-2.4 | Matches shall be displayed in a vertically scrolling card layout, ordered by confidence | P0 |
| FR-2.5 | Each card shall show: home team, away team, league badge, kickoff time (localised), AI confidence bar | P0 |

### FR-3: AI Analysis Pipeline
| ID | Requirement | Priority |
|---|---|---|
| FR-3.1 | After match curation, each match's data shall be sent to DeepSeek API for analysis | P0 |
| FR-3.2 | The AI prompt shall include: team form (last 5), H2H record, injuries, market odds, league context | P0 |
| FR-3.3 | The AI shall return: predicted winner, confidence score (0–100), key reasoning (bullet points), recommended bet type | P0 |
| FR-3.4 | AI output shall be stored in the `analyses` table (JSONB) — never re-generated on page load | P0 |
| FR-3.5 | **Quick Analysis** shall display the confidence bar + 2–3 sentence rationale | P0 |
| FR-3.6 | **Deep Analysis** shall display a full modal/sheet with: form comparison table, H2H timeline, injury list, odds movement, AI narrative | P1 |
| FR-3.7 | All analyses shall be cached and served from the database; no streaming or on-demand generation | P0 |

### FR-4: Betting Portfolio
| ID | Requirement | Priority |
|---|---|---|
| FR-4.1 | Users shall save a bet by selecting a match, entering stake, picking market (home/draw/away/over/under), and entering odds | P0 |
| FR-4.2 | Saved bets shall appear in a portfolio list sorted by date (newest first) | P0 |
| FR-4.3 | Users shall update bet status: Pending → Win / Loss / Push | P0 |
| FR-4.4 | Bets with status "Pending" shall show a pill badge; settled bets shall show green (Win) or red (Loss) | P0 |
| FR-4.5 | Users may edit or delete any unsaved (Pending) bet | P1 |
| FR-4.6 | Users shall see the match result alongside their pick for comparison | P1 |

### FR-5: ROI & Bankroll Analytics
| ID | Requirement | Priority |
|---|---|---|
| FR-5.1 | The dashboard shall display: **Total ROI (%)**, **Net Profit/Loss ($)**, **Win Rate (%)**, **Current Bankroll** | P0 |
| FR-5.2 | A line chart shall plot bankroll over time (interactive, zoomable) | P1 |
| FR-5.3 | Users shall filter analytics by date range, league, and market type | P1 |
| FR-5.4 | A "Betting Log" table shall support sorting by stake, odds, profit, date | P1 |

### FR-6: User Profile & Settings
| ID | Requirement | Priority |
|---|---|---|
| FR-6.1 | Profile page shall display: avatar, username, member since date, total bets placed | P1 |
| FR-6.2 | Settings shall include: default currency, odds format (decimal/fractional/American), dark mode toggle | P1 |

### FR-7: Saved Predictions (Bookmarks)
| ID | Requirement | Priority |
|---|---|---|
| FR-7.1 | Each match card shall have a bookmark icon to save/unsave the prediction | P1 |
| FR-7.2 | A dedicated "Saved" page shall display all bookmarked predictions grouped by date | P1 |

### FR-8: Notifications
| ID | Requirement | Priority |
|---|---|---|
| FR-8.1 | Users may opt in to daily push/email notifications when new predictions are ready | P2 |
| FR-8.2 | Users shall receive a notification when a bet in their portfolio settles | P2 |

---

## 5. Non-Functional Requirements

| ID | Requirement | Target |
|---|---|---|
| NFR-1 | **Performance** — Time-to-interactive (TTI) on the match list page shall be under 1.5s on 4G | Core Web Vitals |
| NFR-2 | **Cold start** — All analyses pre-generated; zero API wait on user-facing pages | N/A |
| NFR-3 | **Availability** — Platform uptime ≥ 99.5% during football season (Aug–May) | Uptime |
| NFR-4 | **Scalability** — Support 10,000 DAU with sub-200ms DB queries | Load testing |
| NFR-5 | **Security** — All API keys stored server-side; no exposure to client | OWASP |
| NFR-6 | **Data freshness** — Match data refreshed every 15 min on match day; predictions locked at generation time | Freshness |
| NFR-7 | **Mobile-first** — All UI responsive down to 360px width; touch targets ≥ 44px | Responsive |
| NFR-8 | **Accessibility** — WCAG 2.1 AA compliant | Accessibility |
| NFR-9 | **Offline tolerance** — App shell cached via service worker; static content readable offline | PWA |

---

## 6. MVP Scope (Phase 1)

The MVP delivers a complete, polished loop: **See matches → Read AI analysis → Save bets → Track results.**

### In Scope
- Supabase Auth (email + Google + GitHub)
- Daily match curation (5 matches, cron-based)
- Pre-generated AI analysis stored in DB (no streaming)
- Quick Analysis + Deep Analysis views
- Betting portfolio (CRUD with Win/Loss/Push)
- ROI dashboard (ROI %, net profit, win rate, bankroll chart)
- User profile with basic settings
- Saved predictions (bookmarks)
- Dark mode
- Fully responsive (mobile-first)

### Out of Scope (MVP)
- Push notifications (P2)
- Email digests (P2)
- Multi-currency support
- Social features (leaderboards, comments)
- Live/in-play betting
- Parlay builder
- Subscription billing (free during MVP)

---

## 7. Future Features (Phase 2+)

| Feature | Description | Priority |
|---|---|---|
| **Parlay Builder** | Combine multiple AI picks into a single parlay slip with combined odds | P2 |
| **Live Match Tracker** | Real-time scoreboard overlay during matches | P2 |
| **AI Chat** | Conversational deep-dive: "Why did you pick under 2.5 goals?" | P2 |
| **Social Betting** | Share predictions, public profiles, invite codes | P3 |
| **Subscription Tiers** | Free (5 matches) → Premium (15 matches + advanced filters) | P3 |
| **Multi-Sport** | Extend beyond football to basketball, tennis, esports | P3 |
| **Public API** | Expose predictions via API for external portfolio tools | P3 |
| **Arbitrage Finder** | Cross-bookmaker odds comparison for arbitrage opportunities | P3 |
| **iOS / Android Apps** | Native apps using SwiftUI and Jetpack Compose | P3 |
| **Bankroll Recommendations** | AI-recommended stake size based on Kelly Criterion | P2 |

---

## 8. Success Metrics

### North Star Metric
> **Weekly Active Users (WAU) who save at least 1 bet**

### Key Results (OKRs)

| KR | Target (3 months post-MVP) |
|---|---|
| **Daily prediction views** | ≥ 5,000 DAU viewing at least 1 analysis |
| **Bet save rate** | ≥ 25% of signed-in users save ≥ 1 bet/week |
| **Portfolio engagement** | ≥ 40% of bet-savers update outcome post-match |
| **Retention D7** | ≥ 45% |
| **Retention D30** | ≥ 25% |
| **Deep Analysis open rate** | ≥ 30% of prediction views |
| **Average session duration** | ≥ 3 minutes (signed-in) |
| **NPS** | ≥ 40 (Good) |

### Guardrail Metrics
| Metric | Threshold | Action |
|---|---|---|
| Page load time | > 2.5s | Audit bundle size, DB queries |
| AI generation failure rate | > 2% | Alert, fallback to historical data |
| Auth error rate | > 1% | P0 incident — review Supabase config |
| DB query latency (p95) | > 500ms | Optimise indexes, add Redis cache |

---

## Appendix A: Tech Stack Recommendation

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14+ (App Router), Tailwind CSS, Radix UI primitives |
| **State** | React Query (server state), Zustand (client state) |
| **Auth** | Supabase Auth (email, Google, GitHub) |
| **Database** | Supabase PostgreSQL |
| **ORM** | Drizzle ORM (type-safe, lightweight) |
| **Scheduler** | Vercel Cron Jobs / pg_cron |
| **AI** | DeepSeek API (server-side, batched overnight) |
| **External APIs** | API-Football (fixtures), The Odds API (markets) |
| **Analytics** | PostHog (self-hosted or cloud) |
| **Hosting** | Vercel (frontend), Supabase (DB + edge functions) |
| **Charts** | Recharts / visx |

---

## Appendix B: Data Model (Core Tables)

```
users
  id UUID PK
  email TEXT
  display_name TEXT
  avatar_url TEXT
  preferences JSONB
  created_at TIMESTAMPTZ

matches
  id UUID PK
  api_football_id INT UNIQUE
  home_team TEXT
  away_team TEXT
  league TEXT
  kickoff TIMESTAMPTZ
  status TEXT (scheduled / live / finished)
  home_score INT?
  away_score INT?
  created_at TIMESTAMPTZ

analyses
  id UUID PK
  match_id UUID FK -> matches
  confidence INT (0–100)
  predicted_winner TEXT
  recommended_bet TEXT
  quick_analysis TEXT
  deep_analysis JSONB
  generated_at TIMESTAMPTZ
  odds_snapshot JSONB

bets
  id UUID PK
  user_id UUID FK -> users
  match_id UUID FK -> matches
  market TEXT (home / draw / away / over / under)
  odds DECIMAL
  stake DECIMAL
  status TEXT (pending / win / loss / push)
  profit DECIMAL?
  settled_at TIMESTAMPTZ?
  created_at TIMESTAMPTZ

saved_predictions
  id UUID PK
  user_id UUID FK -> users
  match_id UUID FK -> matches
  created_at TIMESTAMPTZ
  UNIQUE(user_id, match_id)
```

---

## Appendix C: Design Principles (Apple-inspired)

1. **Typography-first.** SF Pro (or system font stack). Generous leading. Only one typeface.
2. **Whitespace is a feature.** Cards breathe. No edge-to-edge content. 24px+ padding defaults.
3. **Glassmorphism lite.** Subtle backdrop blur on modals and sheets. Frosted tab bars.
4. **Motion with purpose.** Micro-interactions on tap. Smooth page transitions. No gratuitous animation.
5. **One primary action per screen.** Every view has exactly one call-to-action.
6. **Dark mode as default.** Design dark-mode first. Light mode is the secondary variant.
7. **Data as typography.** Numbers are large, bold, and the hero of the page. Charts are simple, clean, and ink-based.
8. **No chrome.** No traditional navigation bars. Tab bar + gesture-based navigation (iOS-style).

---

*This document is a living artifact. Update as new insights emerge from user research and technical spikes.*
