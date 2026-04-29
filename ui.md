## Golf × Charity × Draw Platform

### Optimised Next.js App Router + Prisma

---

## 1. Product Understanding Summary

This is a **subscription-first social-impact platform** that uses golf as the mechanism, charity as the emotional hook, and a monthly prize draw as the engagement engine. The product has three distinct experiences:

- **Public** – persuasion and conversion (marketing, charity discovery, pricing)
- **Subscriber** – participation and progress (score entry, draw status, charity impact, winnings)
- **Admin** – control and verification (draw execution, winner management, charity content, analytics)

The core value loop is: **Subscribe → Enter Scores → Support a Charity → Enter a Draw → Win or Roll Over**

Key constraints from the PRD:

- Stableford scores only (1–45), 5-score rolling window, one entry per date
- Draw tiers: 5-match (40%, jackpot rollover), 4-match (35%), 3-match (25%)
- Charity contribution: minimum 10% of subscription, user can increase voluntarily
- Winner verification requires screenshot proof upload, admin approval, then payout
- Tech: Next.js App Router, Prisma, Supabase (new project), deployed to new Vercel account
- UI: emotion-driven, charity-first, NOT golf-cliché

---

## 2. MVP

### MVP

| Feature                                                  | Reason                         |
| -------------------------------------------------------- | ------------------------------ |
| Auth: signup, login, session, role-based access          | Everything depends on it       |
| Subscription flow (Stripe, monthly + yearly)             | Core paywall                   |
| Score entry with 5-score rolling logic + date uniqueness | Tested in evaluation checklist |
| Subscriber dashboard (all 5 modules from PRD §10)        | Evaluated                      |
| Charity directory + selection at signup                  | Evaluated                      |
| Admin: user list, score edit, subscription management    | Evaluated                      |
| Admin: draw config, simulation, publish results          | Evaluated                      |
| Admin: charity CRUD                                      | Evaluated                      |
| Admin: winner verification + payout status               | Evaluated                      |
| Prize pool auto-calculation                              | Core logic                     |
| Draw result page (public)                                | Product completeness           |
| Responsive UI, mobile-first                              | Evaluated                      |
| Basic email notifications (Resend or Nodemailer)         | PRD §13                        |

---

## 3. Complete Page Map

### Public Routes (`/`)

| Route               | Page                                     | Primary User        |
| ------------------- | ---------------------------------------- | ------------------- |
| `/`                 | Homepage                                 | Public Visitor      |
| `/how-it-works`     | Explainer / mechanics                    | Public Visitor      |
| `/charities`        | Charity directory                        | Public / Subscriber |
| `/charities/[slug]` | Charity profile                          | Public / Subscriber |
| `/draws`            | Draw history & results                   | Public              |
| `/pricing`          | Plans + CTA                              | Public Visitor      |
| `/login`            | Login                                    | All                 |
| `/signup`           | Signup + charity selection + plan choice | New user            |
| `/terms`            | Terms & Conditions                       | All                 |
| `/privacy`          | Privacy Policy                           | All                 |

### Subscriber Routes (`/dashboard`)

| Route                 | Page                                    | Primary User |
| --------------------- | --------------------------------------- | ------------ |
| `/dashboard`          | Main subscriber hub                     | Subscriber   |
| `/dashboard/scores`   | Score entry + history                   | Subscriber   |
| `/dashboard/charity`  | Charity selection + contribution slider | Subscriber   |
| `/dashboard/draws`    | My draws + participation history        | Subscriber   |
| `/dashboard/winnings` | Winnings overview + verification upload | Subscriber   |
| `/dashboard/settings` | Profile, password, notification prefs   | Subscriber   |
| `/dashboard/billing`  | Subscription, plan switch, cancel       | Subscriber   |

### Admin Routes (`/admin`)

| Route                        | Page                                                       | Primary User |
| ---------------------------- | ---------------------------------------------------------- | ------------ |
| `/admin`                     | Admin overview dashboard                                   | Admin        |
| `/admin/users`               | User list + management                                     | Admin        |
| `/admin/users/[id]`          | Individual user profile + score edit                       | Admin        |
| `/admin/draws`               | Draw configuration + history                               | Admin        |
| `/admin/draws/new`           | Create / configure a new draw                              | Admin        |
| `/admin/draws/[id]`          | Draw detail + simulation + publish                         | Admin        |
| `/admin/charities`           | Charity list                                               | Admin        |
| `/admin/charities/new`       | Add charity                                                | Admin        |
| `/admin/charities/[id]/edit` | Edit charity                                               | Admin        |
| `/admin/winners`             | All winners across all draws                               | Admin        |
| `/admin/winners/[id]`        | Individual winner: proof review, approve/reject, mark paid | Admin        |
| `/admin/analytics`           | Totals: users, pool, contributions, draws (Phase 2 charts) | Admin        |

---

## 4. Feature Breakdown by Page

### `/` — Homepage

**Purpose:** Convert visitors into subscribers within seconds.

**Core Sections:**

1. **Hero** — Headline: "Play Golf. Give Back. Win Big." (or equivalent emotional hook). Bold typography. Single CTA: "Start Your Journey."
2. **How It Works** — 3-step visual: Enter Scores → Support Charity → Enter Draw
3. **Impact Counter** — Live-ish stats: total donated to charities, active members, current jackpot
4. **Charity Spotlight** — 2–3 featured charities with brief story + "See All Charities" link
5. **Prize Pool Breakdown** — Visual: 40% / 35% / 25% split, current pool size
6. **Pricing Cards** — Monthly vs Yearly, clear value props, "Subscribe Now" CTA
7. **Social Proof / Testimonials** — Placeholder for MVP, can be static
8. **Footer** — Nav links, legal

---

### `/signup` — Signup + Charity + Plan Selection

**Purpose:** Complete onboarding in a single multi-step flow.

**Core Sections:**

1. Step 1: Account creation (name, email, password)
2. Step 2: Choose a charity + set contribution % (min 10%, slider)
3. Step 3: Choose plan (monthly / yearly) → Stripe checkout

---

### `/dashboard` — Subscriber Hub

**Purpose:** Central control panel. Everything the subscriber needs in one view.

**Core Sections:**

1. **Subscription Status Bar** — Active / inactive / renewal date. Upgrade prompt if lapsed.
2. **Score Summary Card** — Last 5 scores, quick-add button
3. **Charity Card** — Name, logo, current contribution %, change link
4. **Draw Participation Card** — Current draw status, scores submitted, next draw date
5. **Winnings Overview** — Total won, pending verifications, payment status

---

### `/dashboard/scores` — Score Entry + History

**Purpose:** Enter, edit, and view Stableford scores with the 5-score rolling window.

**Core Sections:**

1. **Entry Form** — Date picker (no duplicates), score input (1–45), submit
2. **Score List** — Last 5 scores, reverse chronological, edit/delete inline
3. **Rolling Window Indicator** — Visual showing current 5 scores used in draw

---

### `/dashboard/charity` — Charity Selection

**Purpose:** Let users change their selected charity and adjust contribution.

**Core Sections:**

1. **Current charity** with logo and description
2. **Change charity** — searchable list
3. **Contribution slider** — 10% minimum, up to 100%, shows £ amount

---

### `/dashboard/winnings` — Winner Claims

**Purpose:** Track winnings and submit proof for verification.

**Core Sections:**

1. List of won draws with match tier and prize amount
2. Per-win: upload screenshot, see verification status (Pending → Approved → Paid)

---

### `/admin` — Admin Overview

**Purpose:** Command centre for platform operations.

**Core Sections:**

1. KPI tiles: Total users, active subscribers, current jackpot, total donated
2. Quick links to each admin section
3. Recent activity feed (latest signups, recent draws, pending verifications)

---

### `/admin/draws/[id]` — Draw Detail

**Purpose:** Configure, simulate, and publish a draw.

**Core Sections:**

1. Draw metadata (month, status: Draft / Simulated / Published)
2. Logic toggle: Random vs Algorithmic
3. **Simulation panel** — Run simulation, see mock winners without publishing
4. **Publish button** — Finalise and notify winners
5. Winner list with match tier

---

### `/admin/winners/[id]` — Winner Verification

**Purpose:** Review proof upload, approve or reject, mark as paid.

**Core Sections:**

1. Subscriber details + draw info
2. Uploaded screenshot viewer
3. Approve / Reject buttons
4. Mark as Paid (after approval)

---

## UX Direction Summary

**Design Identity:** Refined dark-mode luxury meets social impact. Think Patagonia's social mission meets Calm's interface polish. Not Titleist. Not Augusta National.

**Color palette direction:** Deep charcoal (`#0F0F0F`) + warm white (`#F5F0EB`) + a single vibrant charitable accent (coral, teal, or gold — pick one and own it).

**Typography direction:** Display font with editorial weight (e.g. Fraunces, Playfair Display, or DM Serif) for headlines. Clean geometric sans-serif (e.g. DM Sans, Plus Jakarta Sans) for body. Never generic system fonts.

**Homepage first fold:** Full-height, dark background, large headline about charity impact (not "golf"), sub-headline about the draw mechanic, one bold CTA button. NO golf imagery in the hero. Use abstract motion graphics or a charity impact statistic as the visual anchor.

**Dashboard feel:** Light, airy, card-based. Each module is a distinct card with clear hierarchy. Score entry should feel satisfying — animate the new score appearing at the top of the list.

**Admin feel:** Functional, professional, dense but clean. Data tables with clear actions. Status badges in colour (green = active, amber = pending, red = rejected).

**Mobile first:** Every layout starts at 375px. Sidebar nav becomes a bottom tab bar on mobile. Score entry form takes full screen on mobile. Touch targets minimum 44px.

---
