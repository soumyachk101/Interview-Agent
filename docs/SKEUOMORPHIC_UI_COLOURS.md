# 🎨 Skeuomorphic UI — Colour System
## AI Interview Agent — Design Tokens, Palettes & Component Colours

**Version:** 1.0.0
**Last Updated:** 2026-02-26
**Design Philosophy:** Skeuomorphism — interfaces that mimic real-world textures, materials, and depth through light, shadow, and surface simulation.

---

## 1. What is Skeuomorphic Design?

Skeuomorphism recreates the look and feel of physical objects in a digital interface. For the **AI Interview Agent**, the design should evoke:

- A **professional interview room** — leather chairs, mahogany desks, warm lighting.
- A **physical notepad** for the chat/answer area.
- **Embossed buttons** that feel like they are physically pressed.
- **Brushed metal** or **frosted glass** panels for cards and modals.
- **Parchment-like** resume preview backgrounds.
- **Felt or leather** textures for the dashboard sidebar.

---

## 2. Master Colour Palette

### 2.1 Primary — Warm Ivory & Deep Mahogany

Inspired by a premium interview office: warm, trustworthy, serious, yet human.

| Token Name | Hex | RGB | Usage |
|------------|-----|-----|-------|
| `--color-ivory-base` | `#F5F0E8` | `245, 240, 232` | Main page background |
| `--color-ivory-light` | `#FAF7F2` | `250, 247, 242` | Card surfaces, modals |
| `--color-ivory-dark` | `#EDE5D8` | `237, 229, 216` | Input backgrounds, inset areas |
| `--color-mahogany-900` | `#2C1A0E` | `44, 26, 14` | Primary text, headings |
| `--color-mahogany-800` | `#3D2414` | `61, 36, 20` | Secondary text, labels |
| `--color-mahogany-700` | `#5C3520` | `92, 53, 32` | Sidebar background |
| `--color-mahogany-600` | `#7A4730` | `122, 71, 48` | Sidebar hover states |
| `--color-mahogany-400` | `#A8734E` | `168, 115, 78` | Borders, dividers |
| `--color-mahogany-200` | `#D4A882` | `212, 168, 130` | Subtle tints, placeholder text |

### 2.2 Accent — Antique Gold

Signals premium quality, call-to-action, and AI-powered highlights.

| Token Name | Hex | RGB | Usage |
|------------|-----|-----|-------|
| `--color-gold-500` | `#C9993A` | `201, 153, 58` | Primary CTA buttons (Pay, Start) |
| `--color-gold-400` | `#D9AE5C` | `217, 174, 92` | Button hover highlight |
| `--color-gold-300` | `#E8C97A` | `232, 201, 122` | Button pressed top-light |
| `--color-gold-600` | `#A87C28` | `168, 124, 40` | Button pressed shadow |
| `--color-gold-100` | `#F7EDD0` | `247, 237, 208` | Gold tint for active states |
| `--color-gold-shimmer` | `#F2D980` | `242, 217, 128` | Shimmer/gloss overlay on gold buttons |

### 2.3 Secondary — Steel Blue (AI / Tech elements)

Used for the AI interviewer's chat bubbles, scores, and technical indicators.

| Token Name | Hex | RGB | Usage |
|------------|-----|-----|-------|
| `--color-steel-700` | `#1C3A52` | `28, 58, 82` | AI bubble background (dark mode) |
| `--color-steel-600` | `#2A5070` | `42, 80, 112` | AI bubble background (light mode) |
| `--color-steel-500` | `#3A6B8C` | `58, 107, 140` | Score bar fill, progress |
| `--color-steel-400` | `#5A8FAD` | `90, 143, 173` | Border on AI components |
| `--color-steel-200` | `#A8C8DB` | `168, 200, 219` | Light tint for info boxes |
| `--color-steel-100` | `#D6E8F0` | `214, 232, 240` | Steel wash backgrounds |

### 2.4 Status Colours — Leather & Felt Inspired

| Token Name | Hex | RGB | Usage |
|------------|-----|-----|-------|
| `--color-success-700` | `#1A4D2E` | `26, 77, 46` | Success text (dark) |
| `--color-success-500` | `#2E7D4F` | `46, 125, 79` | Success icon, checkmarks |
| `--color-success-200` | `#A8D5B5` | `168, 213, 181` | Success badge background |
| `--color-warning-600` | `#8C5200` | `140, 82, 0` | Warning text |
| `--color-warning-400` | `#D4850A` | `212, 133, 10` | Warning icon, timer low |
| `--color-warning-100` | `#F5DBA0` | `245, 219, 160` | Warning badge background |
| `--color-danger-700` | `#5C1A1A` | `92, 26, 26` | Error text (dark) |
| `--color-danger-500` | `#A83232` | `168, 50, 50` | Error icon, failed payment |
| `--color-danger-200` | `#E8AAAA` | `232, 170, 170` | Error badge background |

### 2.5 Neutral Shadows & Highlights (Skeuomorphic Core)

These are the most critical colours for achieving realistic depth.

| Token Name | Hex / Value | Usage |
|------------|-------------|-------|
| `--shadow-dark` | `rgba(44, 26, 14, 0.55)` | Deep bottom-right shadows |
| `--shadow-medium` | `rgba(44, 26, 14, 0.30)` | Standard card drop shadow |
| `--shadow-soft` | `rgba(44, 26, 14, 0.15)` | Subtle elevation |
| `--highlight-bright` | `rgba(255, 255, 255, 0.85)` | Top-left highlight (light source) |
| `--highlight-soft` | `rgba(255, 255, 255, 0.45)` | Soft inner glow |
| `--highlight-gold` | `rgba(249, 230, 150, 0.60)` | Gold button top sheen |
| `--inset-shadow` | `rgba(44, 26, 14, 0.35)` | Inset / pressed states |
| `--surface-gloss` | `rgba(255, 255, 255, 0.20)` | Glass/lacquer overlay |

---

## 3. Gradient Recipes

### 3.1 Page Background Gradient
Simulates warm ambient room lighting from top-right corner.

```css
background: radial-gradient(
  ellipse at 80% 10%,
  #FAF6EE 0%,
  #F0E8D8 40%,
  #E8DCC8 100%
);
```

### 3.2 Leather Sidebar Gradient
Deep mahogany leather — darker at edges, slightly warm centre.

```css
background: linear-gradient(
  180deg,
  #3D2414 0%,
  #2C1A0E 30%,
  #2A1810 70%,
  #1E110A 100%
);
```

Add subtle grain texture overlay:
```css
background-image:
  url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E"),
  linear-gradient(180deg, #3D2414 0%, #2C1A0E 30%, #1E110A 100%);
```

### 3.3 Gold CTA Button Gradient
Multi-stop gradient simulating convex metal button with top light.

```css
/* Default state */
background: linear-gradient(
  180deg,
  #E8C97A 0%,      /* top highlight */
  #D9AE5C 15%,     /* upper body */
  #C9993A 50%,     /* mid tone */
  #A87C28 85%,     /* lower shadow */
  #8C6318 100%     /* bottom edge */
);
box-shadow:
  0 1px 0 rgba(255,255,255,0.50) inset,   /* inner top highlight */
  0 -1px 0 rgba(0,0,0,0.30) inset,        /* inner bottom shadow */
  0 4px 8px rgba(44,26,14,0.45),          /* drop shadow */
  0 1px 2px rgba(44,26,14,0.60);          /* contact shadow */

/* Pressed state */
background: linear-gradient(
  180deg,
  #A87C28 0%,
  #C9993A 50%,
  #D9AE5C 100%
);
box-shadow:
  0 2px 4px rgba(44,26,14,0.40) inset,
  0 1px 0 rgba(255,255,255,0.25) inset;
```

### 3.4 Embossed Card / Panel Gradient
Warm ivory surface that appears to float off the page.

```css
background: linear-gradient(
  145deg,
  #FDFAF5 0%,
  #F5F0E8 40%,
  #EDE5D5 100%
);
box-shadow:
  -4px -4px 10px rgba(255,255,255,0.80),   /* top-left light */
  4px 4px 12px rgba(44,26,14,0.25),         /* bottom-right shadow */
  0 8px 32px rgba(44,26,14,0.12);           /* ambient elevation */
border: 1px solid rgba(212, 168, 130, 0.40);
```

### 3.5 Inset Input Field
Pressed-in, engraved text input appearance.

```css
background: linear-gradient(
  180deg,
  #E5DDD0 0%,
  #EDE5D8 60%,
  #F0EAE0 100%
);
box-shadow:
  0 2px 4px rgba(44,26,14,0.30) inset,
  0 1px 0 rgba(255,255,255,0.70);
border: 1px solid rgba(168, 115, 78, 0.45);
```

### 3.6 AI Chat Bubble — Interviewer (Aria)
Steel blue surface with top-left gloss.

```css
background: linear-gradient(
  145deg,
  #3E7898 0%,
  #2A5070 50%,
  #1C3A52 100%
);
box-shadow:
  -2px -2px 6px rgba(255,255,255,0.15) inset,
  2px 2px 8px rgba(0,0,0,0.35),
  0 4px 16px rgba(28,58,82,0.30);
border: 1px solid rgba(90,143,173,0.50);
```

### 3.7 Candidate Chat Bubble
Warm ivory paper-like note.

```css
background: linear-gradient(
  145deg,
  #FDFAF5 0%,
  #F5EFE4 100%
);
box-shadow:
  -1px -1px 4px rgba(255,255,255,0.90) inset,
  1px 1px 6px rgba(44,26,14,0.20),
  0 2px 8px rgba(44,26,14,0.10);
border: 1px solid rgba(212,168,130,0.50);
```

### 3.8 Score / Progress Bar

```css
/* Track (inset groove) */
.score-track {
  background: linear-gradient(180deg, #D8CFC0 0%, #E8E0D0 100%);
  box-shadow: 0 2px 4px rgba(44,26,14,0.35) inset;
  border-radius: 6px;
}

/* Fill (raised metal) */
.score-fill {
  background: linear-gradient(
    180deg,
    #5A8FAD 0%,
    #3A6B8C 40%,
    #2A5070 100%
  );
  box-shadow:
    0 1px 0 rgba(255,255,255,0.35) inset,
    0 2px 4px rgba(28,58,82,0.40);
  border-radius: 6px;
}
```

---

## 4. Typography Colour Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#2C1A0E` | Headings, body copy |
| `--text-secondary` | `#5C3520` | Subheadings, labels |
| `--text-muted` | `#A8734E` | Placeholders, meta info |
| `--text-inverse` | `#FAF7F2` | Text on dark/leather backgrounds |
| `--text-gold` | `#C9993A` | Highlighted values, scores |
| `--text-steel` | `#3A6B8C` | AI messages, technical labels |
| `--text-success` | `#2E7D4F` | Positive feedback, paid status |
| `--text-danger` | `#A83232` | Errors, failed states |
| `--text-warning` | `#8C5200` | Timer warnings, cautions |
| `--text-link` | `#2A5070` | Hyperlinks (underlined) |
| `--text-link-hover` | `#C9993A` | Link hover (warm gold) |

---

## 5. Component Colour Map

### 5.1 Navigation Bar

```
Background:   Leather gradient (#3D2414 → #2C1A0E)
Logo text:    Gold shimmer (#E8C97A)
Nav links:    Ivory muted (#D4A882)
Active link:  Bright ivory (#FAF7F2) + gold underline (#C9993A)
Hover link:   Warm ivory (#F5EFE4)
Border bottom: Dark mahogany shadow (rgba 0,0,0,0.40)
```

### 5.2 Auth Cards (Login / Register)

```
Card surface:     Ivory embossed (#FDFAF5 → #EDE5D5 gradient)
Card border:      Warm tan (rgba 212,168,130, 0.40)
Card shadow:      Deep mahogany drop (rgba 44,26,14, 0.25)
Input background: Inset ivory (#E5DDD0 → #EDE5D8)
Input border:     Mahogany tan (#A8734E, 45% opacity)
Input focus ring: Gold glow (box-shadow: 0 0 0 3px rgba 201,153,58, 0.30)
Submit button:    Full gold gradient
Divider line:     Tan (#D4A882)
```

### 5.3 Resume Upload Panel

```
Upload zone:       Dashed border — mahogany (#A8734E)
Upload zone bg:    Parchment wash (#F7F2E8)
Hover state:       Slightly deeper ivory + gold dashed border (#C9993A)
File icon:         Mahogany 700 (#5C3520)
Parsed section bg: Inset ivory
Section header:    Steel blue (#2A5070) on ivory
Skill tag bg:      Gold tint (#F7EDD0)
Skill tag border:  Gold (#C9993A, 60% opacity)
Skill tag text:    Mahogany 800 (#3D2414)
```

### 5.4 Pricing / Payment Cards

```
Card surface:     Embossed ivory
Popular badge:    Gold (#C9993A) with dark text (#2C1A0E)
Price text:       Mahogany 900 (#2C1A0E), bold
Rupee symbol:     Gold 500 (#C9993A)
Feature list:     Mahogany 700 text (#5C3520)
Check icon:       Success green (#2E7D4F)
Pay button:       Full gold gradient (see 3.3)
Border (selected): Gold 500 (#C9993A), 2px, glow effect
```

### 5.5 Interview Room

```
Room background:   Warm ivory radial gradient
Interviewer name:  Steel 600 (#2A5070), italic
Aria bubble:       Steel blue gradient (see 3.6)
Aria bubble text:  Ivory (#FAF7F2)
Candidate bubble:  Ivory paper gradient (see 3.7)
Candidate text:    Mahogany 900 (#2C1A0E)
Timestamp:         Muted tan (#A8734E)
Answer textarea:   Inset ivory (see 3.5)
Send button:       Gold gradient (compact, square-rounded)
Skip button:       Flat ivory, mahogany border, muted text
Timer (normal):    Steel 500 (#3A6B8C)
Timer (warning <60s): Warning orange (#D4850A)
Timer (critical <15s): Danger red (#A83232) + pulse animation
Progress dots:     Filled = Gold (#C9993A) / Empty = Tan (#D4A882)
```

### 5.6 Feedback Report

```
Report container:  Embossed ivory card, heavy shadow
Overall score bg:  Concentric leather rings effect
Score number:      Gold 500 (#C9993A), large
Grade badge:       
  Excellent → Success green (#2E7D4F) background
  Good      → Steel blue (#2A5070) background
  Average   → Warning amber (#D4850A) background
  Needs Imp → Danger red (#A83232) background
  (all with ivory text #FAF7F2)
Strength items:    Left border gold (#C9993A) + ivory bg
Improvement items: Left border danger (#A83232) + light blush bg
Q feedback card:   Embossed surface, score pill in steel blue
Skill bar track:   Inset groove (see 3.8)
Skill bar fill:    
  Strong   → Success green gradient
  Moderate → Steel blue gradient
  Weak     → Warning amber gradient
Download PDF btn:  Mahogany leather gradient
```

### 5.7 Candidate Dashboard

```
Sidebar:          Deep leather (see 3.2)
Sidebar active:   Gold left border + slightly lighter mahogany bg
Sidebar icons:    Tan (#D4A882) normal / Ivory hover
Stat cards:       Embossed ivory, metric in gold, label in mahogany
Chart line:       Steel blue (#3A6B8C) with gold dots
Chart area fill:  Steel 100 tint (rgba 58,107,140, 0.15)
History row:      Ivory zebra stripe (alternating #FAF7F2 / #F5EFE4)
History row hover: Gold wash (rgba 201,153,58, 0.08)
Badge - completed: Success green
Badge - abandoned: Danger red, muted
Badge - active:   Gold
```

### 5.8 Admin Dashboard

```
Header bar:        Leather dark (#1E110A)
KPI card surface:  Embossed ivory, heavier border
Revenue chart:     Gold fill bars (#C9993A), mahogany grid lines
User table:        Ivory paper, mahogany header row
Admin badge:       Gold (#F7EDD0 bg, #8C6318 text)
Ban button:        Danger red gradient (leather-style)
Filter dropdowns:  Inset ivory with gold focus ring
```

---

## 6. CSS Custom Properties — Full Token Sheet

Paste this into your `src/index.css` or `tailwind.config.js` theme extension:

```css
:root {
  /* ── Ivory Base ── */
  --color-ivory-light:     #FAF7F2;
  --color-ivory-base:      #F5F0E8;
  --color-ivory-dark:      #EDE5D8;

  /* ── Mahogany ── */
  --color-mahogany-900:    #2C1A0E;
  --color-mahogany-800:    #3D2414;
  --color-mahogany-700:    #5C3520;
  --color-mahogany-600:    #7A4730;
  --color-mahogany-400:    #A8734E;
  --color-mahogany-200:    #D4A882;

  /* ── Antique Gold ── */
  --color-gold-600:        #8C6318;
  --color-gold-500:        #C9993A;
  --color-gold-400:        #D9AE5C;
  --color-gold-300:        #E8C97A;
  --color-gold-shimmer:    #F2D980;
  --color-gold-100:        #F7EDD0;

  /* ── Steel Blue ── */
  --color-steel-700:       #1C3A52;
  --color-steel-600:       #2A5070;
  --color-steel-500:       #3A6B8C;
  --color-steel-400:       #5A8FAD;
  --color-steel-200:       #A8C8DB;
  --color-steel-100:       #D6E8F0;

  /* ── Status ── */
  --color-success-700:     #1A4D2E;
  --color-success-500:     #2E7D4F;
  --color-success-200:     #A8D5B5;
  --color-warning-600:     #8C5200;
  --color-warning-400:     #D4850A;
  --color-warning-100:     #F5DBA0;
  --color-danger-700:      #5C1A1A;
  --color-danger-500:      #A83232;
  --color-danger-200:      #E8AAAA;

  /* ── Shadows & Highlights ── */
  --shadow-dark:           rgba(44, 26, 14, 0.55);
  --shadow-medium:         rgba(44, 26, 14, 0.30);
  --shadow-soft:           rgba(44, 26, 14, 0.15);
  --highlight-bright:      rgba(255, 255, 255, 0.85);
  --highlight-soft:        rgba(255, 255, 255, 0.45);
  --highlight-gold:        rgba(249, 230, 150, 0.60);
  --inset-shadow:          rgba(44, 26, 14, 0.35);
  --surface-gloss:         rgba(255, 255, 255, 0.20);

  /* ── Typography ── */
  --text-primary:          #2C1A0E;
  --text-secondary:        #5C3520;
  --text-muted:            #A8734E;
  --text-inverse:          #FAF7F2;
  --text-gold:             #C9993A;
  --text-steel:            #3A6B8C;
  --text-success:          #2E7D4F;
  --text-danger:           #A83232;
  --text-warning:          #8C5200;
  --text-link:             #2A5070;
  --text-link-hover:       #C9993A;

  /* ── Borders ── */
  --border-warm:           rgba(212, 168, 130, 0.40);
  --border-gold:           rgba(201, 153, 58, 0.60);
  --border-steel:          rgba(90, 143, 173, 0.50);
  --border-input:          rgba(168, 115, 78, 0.45);
  --border-divider:        rgba(168, 115, 78, 0.25);

  /* ── Radius ── */
  --radius-sm:             6px;
  --radius-md:             10px;
  --radius-lg:             16px;
  --radius-xl:             24px;
  --radius-pill:           9999px;

  /* ── Font Stacks ── */
  --font-display:          'Playfair Display', Georgia, serif;
  --font-body:             'Lora', 'Georgia', serif;
  --font-mono:             'Courier Prime', 'Courier New', monospace;
  --font-ui:               'Source Serif 4', Georgia, serif;
}
```

---

## 7. Skeuomorphic Shadow System

A consistent shadow system for every elevation level:

```css
/* Level 0 — Inset / Pressed */
.elevation-inset {
  box-shadow:
    0 2px 5px var(--inset-shadow) inset,
    0 1px 0 var(--highlight-bright);
}

/* Level 1 — Flat on surface (flush) */
.elevation-1 {
  box-shadow:
    -1px -1px 3px var(--highlight-soft),
    1px 1px 4px var(--shadow-soft);
}

/* Level 2 — Slightly raised card */
.elevation-2 {
  box-shadow:
    -3px -3px 8px var(--highlight-bright),
    3px 3px 10px var(--shadow-medium),
    0 6px 20px var(--shadow-soft);
}

/* Level 3 — Modal / prominent card */
.elevation-3 {
  box-shadow:
    -4px -4px 12px var(--highlight-bright),
    4px 4px 16px var(--shadow-medium),
    0 12px 40px var(--shadow-dark);
}

/* Level 4 — Floating / dropdown / tooltip */
.elevation-4 {
  box-shadow:
    -2px -2px 6px var(--highlight-soft),
    6px 6px 20px var(--shadow-dark),
    0 20px 60px rgba(44, 26, 14, 0.20);
}
```

---

## 8. Dark Mode — Burnished Walnut Variant

For users who prefer a dark interface, switch to a deeper walnut and gunmetal palette:

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| Page background | `#F5F0E8` | `#1A1008` |
| Card surface | `#FAF7F2` | `#2A1C10` |
| Card border | `rgba(212,168,130,0.40)` | `rgba(168,115,78,0.30)` |
| Primary text | `#2C1A0E` | `#F0E8D8` |
| Secondary text | `#5C3520` | `#C8A87A` |
| Sidebar bg | `#2C1A0E` | `#0F0804` |
| Gold (unchanged) | `#C9993A` | `#C9993A` |
| Steel blue | `#3A6B8C` | `#5A9BBF` |
| Input bg | `#E5DDD0` | `#1E1208` |
| Shadow dark | `rgba(44,26,14,0.55)` | `rgba(0,0,0,0.70)` |
| Highlight bright | `rgba(255,255,255,0.85)` | `rgba(255,255,255,0.08)` |

Activate via `data-theme="dark"` on `<html>`:

```css
[data-theme="dark"] {
  --color-ivory-light:   #2A1C10;
  --color-ivory-base:    #1A1008;
  --color-ivory-dark:    #1E1208;
  --text-primary:        #F0E8D8;
  --text-secondary:      #C8A87A;
  --highlight-bright:    rgba(255, 255, 255, 0.08);
  --shadow-dark:         rgba(0, 0, 0, 0.70);
  /* ... continue for all tokens */
}
```

---

## 9. Recommended Fonts (Skeuomorphic Character)

| Role | Font | Import |
|------|------|--------|
| Display / Headings | **Playfair Display** | `fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700` |
| Body / Paragraphs | **Lora** | `fonts.googleapis.com/css2?family=Lora:wght@400;500` |
| UI Labels / Buttons | **Source Serif 4** | `fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600` |
| Code / Monospaced | **Courier Prime** | `fonts.googleapis.com/css2?family=Courier+Prime` |

These serif and slab fonts reinforce the physical, tactile feel of the design vs. the clean sans-serif tech look.

---

## 10. Quick Reference — Colour Swatches

```
IVORY SCALE
█ #FAF7F2  ivory-light    (card surfaces)
█ #F5F0E8  ivory-base     (page background)
█ #EDE5D8  ivory-dark     (input fields)

MAHOGANY SCALE
█ #2C1A0E  mahogany-900   (text, headings)
█ #3D2414  mahogany-800   (secondary text)
█ #5C3520  mahogany-700   (sidebar)
█ #7A4730  mahogany-600   (sidebar hover)
█ #A8734E  mahogany-400   (borders)
█ #D4A882  mahogany-200   (muted, placeholder)

GOLD SCALE
█ #8C6318  gold-600       (button pressed shadow)
█ #C9993A  gold-500       (primary CTA)
█ #D9AE5C  gold-400       (button hover)
█ #E8C97A  gold-300       (button top highlight)
█ #F7EDD0  gold-100       (gold tint bg)

STEEL SCALE
█ #1C3A52  steel-700      (AI bubble dark)
█ #2A5070  steel-600      (AI bubble)
█ #3A6B8C  steel-500      (progress, scores)
█ #5A8FAD  steel-400      (AI borders)
█ #D6E8F0  steel-100      (info wash)

STATUS
█ #2E7D4F  success-500    (paid, correct)
█ #D4850A  warning-400    (timer warning)
█ #A83232  danger-500     (error, failed)
```
