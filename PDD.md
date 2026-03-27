# Product Design Document (PDD)
## Gridpoint Global — Real Estate Technology Platform

---

## 1. Design Philosophy

Gridpoint is a premium PropTech platform that should feel unmistakably ahead of anything on the market — including Zillow. The design language is **dark-first, precision-crafted, and data-confident**. It signals serious capability without sacrificing approachability.

Think: Linear's dark UI discipline + Vercel's deployment dashboard + the listing elegance of a luxury property portal.

**Core Design Principles:**
- **Dark-first** — Dark mode is the default, canonical experience. Light mode is a toggle, not an afterthought
- **Precision over decoration** — Every element earns its place. No gratuitous color, no visual noise
- **Cyan as signal** — Brand cyan (`#00B4D8`) is used sparingly and intentionally — it always means something: action, data, or brand
- **Generous breathing room** — Whitespace (or dark-space) is a design element, not wasted space
- **Data presented beautifully** — Numbers, stats, and property data feel like they belong in a premium dashboard
- **Motion with purpose** — Subtle fade-ins, smooth transitions — never flashy, always intentional
- **Mobile parity** — Full-featured experience on mobile, not just a responsive afterthought

---

## 2. Brand & Visual Identity

### 2.1 Logo
- Wordmark: `+ GRID point` — the `+` symbol is a distinct icon in brand cyan
- "GRID" in bold weight; "point" in light/thin weight
- On dark backgrounds: white wordmark with cyan `+`
- On light backgrounds: dark wordmark with cyan `+`

### 2.2 Color Palette

#### Dark Mode (Default)

| Role | Token | Value | Usage |
|---|---|---|---|
| Background | `--bg-base` | `#0A0A0F` | Page background |
| Surface | `--bg-surface` | `#111118` | Cards, panels |
| Surface Raised | `--bg-raised` | `#1A1A24` | Elevated cards, modals |
| Border | `--border` | `#ffffff12` | Subtle dividers, card borders |
| Border Hover | `--border-hover` | `#ffffff22` | Hover state borders |
| Text Primary | `--text-primary` | `#F0F0F5` | Headings, main copy |
| Text Secondary | `--text-secondary` | `#8888A0` | Subtext, labels, captions |
| Text Muted | `--text-muted` | `#55556A` | Placeholder text, disabled |
| Brand / Accent | `--brand` | `#00B4D8` | CTAs, active states, links, highlights |
| Brand Hover | `--brand-hover` | `#00C8EF` | Hover on brand elements |
| Brand Subtle | `--brand-subtle` | `#00B4D815` | Background tint for brand areas |
| Success | `--success` | `#22C55E` | Positive data, verified badges |
| Warning | `--warning` | `#F59E0B` | Alerts, pending states |
| Destructive | `--destructive` | `#EF4444` | Errors, removals |

#### Light Mode

| Role | Token | Value | Usage |
|---|---|---|---|
| Background | `--bg-base` | `#FFFFFF` | Page background |
| Surface | `--bg-surface` | `#F8F8FC` | Cards, panels |
| Surface Raised | `--bg-raised` | `#FFFFFF` | Elevated cards (with shadow) |
| Border | `--border` | `#E4E4EF` | Dividers, card borders |
| Text Primary | `--text-primary` | `#0A0A0F` | Headings, main copy |
| Text Secondary | `--text-secondary` | `#5555680` | Subtext, labels |
| Brand / Accent | `--brand` | `#00B4D8` | Unchanged — brand stays consistent |

### 2.3 Typography

**Font Family:** Inter (via shadcn/ui default) — clean, modern, highly legible at all sizes

| Scale | Size | Weight | Usage |
|---|---|---|---|
| Display | 56–72px | 700 | Hero headlines |
| H1 | 40–48px | 600–700 | Page titles |
| H2 | 28–32px | 600 | Section headings |
| H3 | 20–24px | 600 | Card titles, module names |
| H4 | 16–18px | 500–600 | Sub-headings, labels |
| Body Large | 18px | 400 | Lead paragraphs |
| Body | 15–16px | 400 | General copy |
| Body Small | 13–14px | 400 | Captions, meta, timestamps |
| Label | 11–12px | 500–600 | ALL CAPS labels, badges, nav items |

**Typography rules:**
- Letter-spacing: `–0.02em` to `–0.03em` on headings (tight, premium feel)
- Line-height: `1.2` for display/H1, `1.5` for body
- No ALL CAPS section headers — use sentence case or title case instead
- Hero headlines are single weight (600–700), not mixed italic/bold combinations
- Numbers and stats: tabular nums (`font-variant-numeric: tabular-nums`)

### 2.4 Iconography
- **Lucide Icons** (ships with shadcn/ui) — consistent stroke weight `1.5px`
- Icon size: `16px` inline, `20px` standalone, `24px` feature icons
- Icons always paired with text labels in navigation
- No decorative icons — only functional

### 2.5 Elevation & Depth (Dark Mode)

Instead of heavy drop shadows (which flatten in dark mode), depth is created through:

| Level | Method |
|---|---|
| Base | `background: #0A0A0F` |
| Raised card | `background: #111118` + `border: 1px solid #ffffff12` |
| Elevated card / modal | `background: #1A1A24` + `border: 1px solid #ffffff1E` |
| Hover | Border brightens to `#ffffff22`, subtle background shift |
| Brand glow (sparingly) | `box-shadow: 0 0 20px #00B4D820` on key CTAs |

---

## 3. Layout System

### 3.1 Page Structure

```
┌─────────────────────────────────────────────┐
│  Top Navigation Bar — sticky, dark          │
│  (logo · nav links · theme toggle · CTA)    │
├─────────────────────────────────────────────┤
│  Module Navigation Bar — sticky below nav   │
│  (6 product module tabs)                    │
├─────────────────────────────────────────────┤
│  Hero Section                               │
│  (full-bleed photo OR dark gradient hero)   │
├─────────────────────────────────────────────┤
│  Content Sections (max-width 1280px)        │
├─────────────────────────────────────────────┤
│  App Download Banner                        │
├─────────────────────────────────────────────┤
│  Footer                                     │
└─────────────────────────────────────────────┘
```

### 3.2 Grid
- **Max content width:** `1280px`, centered with `auto` margins
- **Column grid:** 12-column, `24px` gutters
- **Card grids:** 3-column desktop → 2-column tablet → 1-column mobile
- **Split layouts:** 50/50 or 55/45 for text + visual sections
- **Full-bleed sections** (hero, banners) break out of the max-width container

### 3.3 Spacing Scale
Based on a `4px` base unit:

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Micro gaps (icon to label) |
| `space-2` | 8px | Tight component spacing |
| `space-3` | 12px | Input padding, badge padding |
| `space-4` | 16px | Card inner padding (compact) |
| `space-6` | 24px | Card gap, section inner padding |
| `space-8` | 32px | Card inner padding (default) |
| `space-12` | 48px | Between sub-sections |
| `space-16` | 64px | Section vertical padding |
| `space-24` | 96px | Major section breaks |

---

## 4. Component Library

### 4.1 Navigation

#### Top Nav
- **Sticky**, full-width
- **Dark mode:** `bg: #0A0A0F`, bottom border `1px solid #ffffff12`
- **Light mode:** `bg: #FFFFFF`, bottom border `1px solid #E4E4EF`
- Height: `64px`
- Left: Logo (cyan `+` + wordmark)
- Center: `Home` · `Solutions ▾` · `Industries` · `Data` · `Resources`
- Right: Light/Dark toggle icon · `Sign In` (ghost) · `Get Started` (brand filled)
- Nav links: `14px`, `font-weight: 500`, secondary text color, hover → primary text

#### Module Nav (Secondary Bar)
- Sticky below top nav
- **Dark:** `bg: #111118`, border-bottom `1px solid #ffffff0F`
- **Light:** `bg: #F8F8FC`, border-bottom `1px solid #E4E4EF`
- Height: `52px`
- 6 tab items: icon (20px) + label (`12px`, uppercase, `letter-spacing: 0.08em`)
- Active tab: brand cyan text + `2px` bottom border in cyan
- Hover: text shifts to primary color

### 4.2 Hero Section

**Homepage Hero:**
- Full-bleed, `min-height: 600px`
- Background: high-quality property/city photography with a `linear-gradient` overlay
  - Dark mode: `rgba(10,10,15,0.65)` → `rgba(10,10,15,0.85)`
  - Light mode: `rgba(255,255,255,0.15)` → `rgba(255,255,255,0.6)`
- Content: left-aligned (not centered) for modern editorial feel
- Display headline: `56px`, `font-weight: 700`, text primary
- Subheadline: `18px`, `font-weight: 400`, text secondary
- Two CTAs stacked horizontally

**Module Page Hero:**
- Slimmer: `min-height: 320px`
- Same overlay approach
- Title + subtitle + sub-module action buttons

### 4.3 Buttons

| Variant | Dark Mode Style | Light Mode Style |
|---|---|---|
| **Primary** | `bg: #00B4D8`, `text: #000`, `border-radius: 8px`, hover: `#00C8EF` | Same |
| **Secondary** | `bg: #1A1A24`, `text: #F0F0F5`, `border: 1px solid #ffffff20`, hover: border brightens | `bg: #F0F0F8`, `text: #0A0A0F`, border: `#E4E4EF` |
| **Ghost** | No bg, `text: #8888A0`, hover: text → primary | No bg, `text: #555568`, hover: text → primary |
| **Destructive** | `bg: #EF444415`, `text: #EF4444`, border: `#EF444430` | Similar |
| **Icon** | Square `40px`, secondary bg, border, icon centered | Same pattern |

- `border-radius`: `8px` standard (not pill) — cleaner, more professional
- `padding`: `10px 20px` standard, `8px 16px` compact
- `font-size`: `14px`, `font-weight: 500`
- Transitions: `150ms ease` on all interactive states

### 4.4 Property Cards (Marketplace)

```
┌────────────────────────────────────────────┐
│  ┌──────────────────────────────────────┐  │
│  │  [Photo]                      ♡     │  │
│  │  [3D TOUR]  [FEATURED]              │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  $440,000                                  │
│  3 bd · 2 ba · 960 sqft                    │
│  17511 SE Scrutton Ln, Portland OR         │
│                                            │
│  ──── Days on market: 4 · Est. payment ─── │
└────────────────────────────────────────────┘
```

- **Dark:** `bg: #111118`, `border: 1px solid #ffffff12`, `border-radius: 12px`
- **Light:** `bg: #FFFFFF`, `box-shadow: 0 1px 3px rgba(0,0,0,0.08)`, `border-radius: 12px`
- Photo: `border-radius: 8px` (inset), aspect ratio `16:9`
- Badges: small pill, `12px` uppercase — `bg: #00000060` (dark overlay on photo)
- Heart icon: top-right of photo, unfilled → filled cyan on click
- Price: `22px`, `font-weight: 700`, text primary
- Details row: `14px`, text secondary, `·` separator
- Address: `14px`, text secondary
- Footer row: muted meta (days on market, estimated payment)
- Hover: `border-color` shifts to `#ffffff25`, card rises `translateY(-2px)`, `transition: 200ms`

### 4.5 Search Bar (Marketplace)

```
┌──────────────────────────────────────────────────────────┐
│  [Buy]  [Rent]  [Developments]                           │
│  ┌─────────────────────────┐ ┌──────────────┐ ┌───────┐  │
│  │  🏠 Property Type    ▾  │ │ 📍 Location  │ │Search │  │
│  └─────────────────────────┘ └──────────────┘ └───────┘  │
└──────────────────────────────────────────────────────────┘
```

- Card: `bg: #111118` (dark) / `#FFFFFF` (light), `border-radius: 16px`, `padding: 24px`
- Tabs: text-style, not pill — underline indicator, `14px`, `font-weight: 500`
- Input fields: `bg: #1A1A24` (dark) / `#F8F8FC` (light), `border: 1px solid #ffffff12`, `border-radius: 8px`, `height: 48px`
- Search button: Brand cyan, full `height: 48px`, `border-radius: 8px`
- Hover on inputs: border brightens

### 4.6 Solution / Feature Cards

- **Dark:** `bg: #111118`, `border: 1px solid #ffffff0F`, `border-radius: 12px`, `padding: 32px`
- **Light:** `bg: #FFFFFF`, `box-shadow: 0 1px 4px rgba(0,0,0,0.06)`, `border-radius: 12px`
- Icon: `40px` container, `bg: #00B4D810`, `border-radius: 10px`, cyan icon inside
- Title: `18px`, `font-weight: 600`, text primary
- Description: `14px`, `font-weight: 400`, text secondary, `line-height: 1.6`
- Hover: subtle border brightening, icon bg brightens slightly

### 4.7 Data List / Accordion Items

- Container: `border-bottom: 1px solid #ffffff0F` between items
- Row: `padding: 16px 0`, flex layout — icon + content + expand chevron
- Icon: `20px` Lucide icon in brand cyan
- Title: `15px`, `font-weight: 600`, text primary
- Description: `14px`, text secondary, revealed on expand with smooth height animation
- Expand icon: Lucide `ChevronDown`, rotates `180deg` when open

### 4.8 Sub-module Tab Bar (Conveyancing / module pages)

- Horizontal scrollable row of tab buttons
- Style: pill-less, underline-based tabs OR segmented control (pill group)
- **Segmented control (preferred):**
  - Container: `bg: #111118`, `border: 1px solid #ffffff12`, `border-radius: 10px`, `padding: 4px`
  - Active tab: `bg: #1A1A24`, `border: 1px solid #ffffff20`, `border-radius: 8px`
  - Tab labels: `13px`, `font-weight: 500`, icon + text

### 4.9 Stat / KPI Callouts

Used for data coverage numbers (155M properties, 18M businesses, etc.):

- No one-sided accent borders — use full-border cards or borderless treatment
- Large number: `48px`, `font-weight: 700`, brand cyan
- Label: `14px`, text secondary, below the number
- Layout: horizontal row of 3–4 stat blocks, centered, generous gap

### 4.10 App Download Banner

- **Dark:** gradient `from: #111118` → `to: #0A0A0F`, with subtle brand cyan gradient glow at center
- **Light:** `bg: #F0FAFD` (very light cyan tint)
- Content centered: headline + body + two app store buttons (styled, not just badges)
- No solid cyan background block — more sophisticated than the original

### 4.11 Footer

- **Dark:** `bg: #070709`, `border-top: 1px solid #ffffff0A`
- **Light:** `bg: #F8F8FC`, `border-top: 1px solid #E4E4EF`
- 4-column layout: Brand col · Solutions · Data · Industries
- Brand column: Logo + tagline + contact + social icons
- Column headers: `12px`, `font-weight: 600`, ALL CAPS, `letter-spacing: 0.1em`, text muted
- Links: `14px`, text secondary, hover → text primary, `transition: 150ms`
- Social icons: `20px` Lucide icons, secondary color, hover → primary
- Bottom bar: copyright + Terms · Privacy · Accessibility · Sitemap links, `12px`, text muted

---

## 5. Page Designs

### 5.1 Home Page

**Sections (in order):**

1. **Hero** — Left-aligned, full-bleed photo, dark overlay
   - Display headline: "The smartest way to buy, sell and invest in property."
   - Sub: one-liner about data + due diligence + end-to-end
   - CTAs: `Explore Properties` (primary) + `Book a Demo` (secondary)

2. **Stats Bar** — 4 KPI callouts: Properties listed · Data coverage · Active users · Markets
   - `bg: #111118`, full-width, `border-top` + `border-bottom`

3. **About / Problem Statement** — 2-column split
   - Left: headline + 4 problem points (icon + title + one-liner each)
   - Right: product screenshot on device frame

4. **Solutions** — 3-column card grid (6 module cards)
   - Section label: small cyan uppercase tag above heading
   - Heading: title case, `32px`

5. **Who Uses Gridpoint** — Tabbed persona section (Real Estate · Investors · Banks · Government)
   - Tab content swaps to show relevant use case + supporting visual

6. **Data Coverage** — Full-width dark section
   - 9 data categories shown as icon grid
   - Headline stat: "Covering 155M+ properties across Zimbabwe"

7. **App Download** — Subtle banner (not loud cyan block)

8. **Footer**

---

### 5.2 Marketplace Page (`/marketplace`)

**Layout:**

1. **Hero with search widget** (Buy / Rent / Developments tabs)
   - Slim hero, `400px`, photo with overlay
   - Search card floats centered over hero bottom edge

2. **Listings grid**
   - Label: "Featured properties for sale" — `14px` uppercase + count chip
   - 4-column responsive grid of property cards
   - Filter/sort bar above grid: sort dropdown + filter chips (beds, price range, property type)
   - "Load more" or infinite scroll below grid

3. **Footer**

---

### 5.3 Prospecting & Valuation Page (`/prospecting-and-valuations`)

1. **Module hero** — slim, photo overlay, sub-module segmented tab: `Prospecting` · `Property Valuations`
2. **Feature section** — alternating 2-column: description left / visual right
3. **Valuation methods** — accordion list of 8 valuation data types
4. **CTA block** — centered, dark surface card: "Start prospecting today" + primary button
5. **Footer**

---

### 5.4 Property Data & Analytics Page (`/property-data-and-analytics`)

1. **Module hero** — sub-module tabs: `Data Sets` · `Data & Analytics`
2. **Coverage stat bar** — 155M properties · 18M businesses
3. **Data categories grid** — 9 cards in a 3-column grid, icon + title + key fields
4. **Footer**

---

### 5.5 Real Estate CRM Page (`/real-estate-crm`)

1. **Module hero** — sub-module tabs: `Prospecting & Valuation` · `Skip Trace`
2. **CRM feature section** — 2-column splits for each sub-module
3. **Footer**

---

### 5.6 Investment & Brokerage Page (`/investment-and-brokerage`)

1. **Module hero** — sub-module tab: `Investment Tools`
2. **Feature section** — investment ROI tools, mortgage features
3. **Footer**

---

### 5.7 Conveyancing & Due Diligence Page (`/conveyancing-and-due-diligence`)

1. **Module hero** — "Real Estate Due Diligence"
2. **Segmented tab control:**
   - Property Due Diligence · 3rd Party Due Diligence · Property Watch List · Skip Trace · Property Inspection
3. **Tab content area** — accordion data list for active tab
4. **Footer**

---

## 6. Responsive Design

### Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | `< 640px` | 1-column, hamburger nav, stacked everything |
| Tablet | `640px–1024px` | 2-column cards, condensed nav, scrollable module bar |
| Desktop | `1024px–1280px` | 3-column cards, full nav |
| Wide | `> 1280px` | Max-width container centered, wider hero |

### Mobile Adaptations
- Top nav: hamburger → slide-in drawer menu (dark surface, full-height)
- Module nav: horizontally scrollable, no wrapping
- Property cards: 1-column, full-width
- Solution cards: 1-column stack
- Search bar: fields stack vertically, button full-width
- Stats bar: 2×2 grid
- Hero: text size scales down, CTAs stack

---

## 7. Interaction Patterns

| Interaction | Behaviour |
|---|---|
| Property card hover | `translateY(-2px)`, border brightens, `200ms ease` |
| Tab switching (Buy/Rent/Dev) | Content fades in/out `150ms`, active tab underline slides |
| Segmented control switch | Background pill slides across, `200ms ease` |
| Accordion expand | Height animates open, chevron rotates `180deg`, `200ms ease` |
| Hero CTA — primary | Routes to marketplace |
| Hero CTA — secondary | Opens demo booking modal |
| Search submit | Routes to `/marketplace?type=X&location=Y` |
| Heart / save | Fills cyan, scales `1.2` then back, `150ms` — requires auth |
| Theme toggle | Smooth `200ms` background/color transitions site-wide |
| Nav dropdown (Solutions) | Fades in below nav, `150ms`, click-outside dismisses |

---

## 8. States & Feedback

| State | Design |
|---|---|
| Loading / spinner | Cyan ring spinner, centered, `24px` |
| Skeleton loading | Animated shimmer in `#1A1A24` (dark) / `#F0F0F5` (light) |
| Empty state | Centered icon + headline + body + optional CTA |
| Active nav | Cyan underline `2px`, text shifts to primary |
| Active tab | Pill/underline indicator slides, `200ms` |
| Button hover | `10%` lightness shift, `150ms` |
| Button active/press | `scale(0.97)`, `80ms` |
| Input focus | Border → brand cyan, subtle glow `0 0 0 3px #00B4D820` |
| Form error | Border → `#EF4444`, inline error below, `12px` red text |
| Saved / favourited | Heart filled cyan, small scale animation |
| Toast notifications | Bottom-right, dark surface, `border-left: 3px solid` (cyan / green / red by type) |

---

## 9. Accessibility

- All color combinations meet **WCAG AA** minimum contrast
- Cyan `#00B4D8` on dark `#0A0A0F` — verify contrast for body text; use only for large text or UI elements if failing
- Full keyboard navigation on all interactive elements
- Focus rings: `2px solid #00B4D8`, `outline-offset: 2px`
- `aria-label` on icon-only buttons
- `alt` text required on all property photos and hero images
- Accordion: `aria-expanded`, `aria-controls`
- Tab panels: `role="tabpanel"`, `aria-labelledby`
- Reduced motion: respect `prefers-reduced-motion` — disable translate/scale animations, keep opacity fades

---

## 10. Dark / Light Mode Implementation

- **Default:** Dark mode
- **Toggle:** Sun/Moon icon in top nav, right side
- **Persistence:** Save preference to `localStorage`
- **Implementation:** `next-themes` (already in project via shadcn)
- **Strategy:** CSS custom properties on `:root` and `[data-theme="light"]` — all components reference tokens, never hardcoded colors
- **Transition:** `200ms ease` on `background-color`, `color`, `border-color` globally — use `transition: colors` Tailwind class

---

## 11. Assets & Media

| Asset Type | Spec |
|---|---|
| Hero photography | High-resolution architectural exteriors, city skylines, or professional interiors. Dark-toned or easily overlaid. Min `1920×1080`. |
| Property listing photos | Exterior + interior shots. `16:9` crop preferred. Min `800×450`. |
| Product UI screenshots | Platform mockups on device frames. Shown in dark mode by default. |
| Icons | Lucide icon set (`stroke-width: 1.5`). Consistent `20px` or `24px` sizing. |
| Social icons | Lucide where available, otherwise SVG. `20px`, footer usage. |
| App store badges | Official Apple/Google badges. Display below app download headline. |
| Illustrations | Minimal, line-based. If used — dark-mode friendly (white/grey strokes, cyan accent). |
