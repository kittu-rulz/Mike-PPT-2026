# Design System
## ENT Presentation — Premium Executive Brand

A unified visual language for premium, executive-focused digital experiences.

---

### Core Principles

| Principle | Definition |
|-----------|-----------|
| **Hierarchical** | Clear visual distinction between content types and importance |
| **Restrained** | Minimal ornamentation; white space as a design element |
| **Precise** | Consistent measurement and alignment across all scales |
| **Accessible** | WCAG AA compliant contrast and semantic structure |
| **Responsive** | Graceful adaptation from desktop to mobile without compromise |

---

## 1. Typography Scale

### Typeface Stack

| Family | Fonts | Role | Application |
|--------|-------|------|-------------|
| **Display** | Satoshi, Plus Jakarta Sans, sans-serif | Headlines, titles | Bold 700–900 weight only |
| **Body** | Plus Jakarta Sans, Segoe UI, sans-serif | Content, UI, labels | Full weight range |
| **Accent** | Instrument Serif, Georgia, serif | Emphasis, highlights | Italic 400 weight only |

### Typographic Scale

All sizes use fluid `clamp()` scaling for desktop-to-mobile adaptation.

| Name | Usage | Size (Desktop) | Size (Mobile) | Weight | Line Height |
|------|-------|---|---|---|---|
| **Hero** | Page titles | 7.4rem | 3.6rem | 900 | 0.9 |
| **Display** | Section titles | 5rem | 2rem | 700 | 1.02 |
| **Title** | Chapter headers | 4rem | 2.15rem | 700 | 1.02 |
| **KPI** | Large metrics | 5rem | 2.6rem | 700 | 0.96 |
| **Lead** | Intro paragraphs | 1.4rem | 1.125rem | 400–500 | 1.65 |
| **Body** | Primary content | 1rem | 0.95rem | 400–500 | 1.6 |
| **Label** | Labels, captions | 0.85rem | 0.8rem | 600 | 1.4 |
| **Caption** | Supporting text | 0.76rem | 0.72rem | 600 | 1.3 |
| **Micro** | Eyebrows, labels | 0.74rem | 0.72rem | 700 | 1 |

### Letter Spacing & Font Weights

**Letter Spacing:**
- Headlines: `-0.05em` to `-0.065em` (tight, high impact)
- Body text: Normal (`0em`)
- Labels: `+0.18em` (uppercase labels only)

**Font Weights:**
- `900` — Hero headlines
- `700` — Titles, labels, emphasis
- `600` — Subheadings, heavy text
- `500` — Buttons, medium emphasis
- `400` — Default body text

---

## 2. Color Palette

### Brand Colors

A restrained palette of 4 primary colors with semantic meaning:

| Token | Hex | Role | Use Cases |
|-------|-----|------|-----------|
| `--blue` | `#0b78e3` | Primary action | Buttons, links, active states |
| `--gold` | `#c18a43` | Warm accent | Premium highlights, accent focus |
| `--teal` | `#1b6770` | Cool accent | Secondary emphasis, data contrast |
| `--violet` | `#8650ff` | Tertiary accent | Charts, special callouts |

### Neutral & Context Colors

**Dark Mode (Primary):**

| Token | Hex | Use |
|-------|-----|-----|
| `--bg-dark` | `#07111d` | Page background |
| `--bg-dark-raised` | `#0f1b2b` | Elevated surfaces |
| `--bg-dark-soft` | `#132235` | Soft card backgrounds |
| `--paper` | `#f7f3eb` | Primary text on dark |
| `--paper-soft` | `#f7f3eb` (72%) | Secondary text on dark |

**Light Mode (Secondary):**

| Token | Hex | Use |
|-------|-----|-----|
| `--bg-light` | `#f4f0e8` | Page background |
| `--bg-light-strong` | `#fbf8f1` | Elevated surfaces |
| `--ink-strong` | `#0d1a2b` | Primary text on light |
| `--ink-body` | `#344055` | Secondary text on light |
| `--ink-soft` | `#6c768a` | Tertiary text on light |

### Surface & Border Colors

| Token | Value | Use |
|-------|-------|-----|
| `--surface-light` | `rgba(255,255,255, 0.64)` | Light overlay on dark |
| `--surface-dark` | `rgba(255,255,255, 0.06)` | Subtle overlay on dark |
| `--line-dark` | `rgba(10,20,34, 0.1)` | Subtle border (light mode) |
| `--line-dark-strong` | `rgba(10,20,34, 0.2)` | Strong border (light mode) |
| `--line-light` | `rgba(247,243,235, 0.12)` | Subtle border (dark mode) |
| `--line-light-strong` | `rgba(247,243,235, 0.2)` | Strong border (dark mode) |

### Contrast Standards

All color combinations meet these minimums:
- **Primary text:** WCAG AAA (7:1+)
- **Secondary text:** WCAG AA (4.5:1+)
- **UI elements:** WCAG AA (3:1+)

---

## 3. Spacing System

### Base Unit: 0.25rem

All spacing derives from multiples of `0.25rem` (4px), creating a consistent, predictable rhythm.

| Token | Value | Use |
|-------|-------|-----|
| `--space-xs` | `0.25rem` (1px) | Micro spacing inside inputs |
| `--space-sm` | `0.5rem` (2px) | Small gaps between inline elements |
| `--space-md` | `1rem` (4px) | Standard vertical rhythm |
| `--space-lg` | `1.5rem` (6px) | Generous section margins |
| `--space-xl` | `2rem` (8px) | Large spacing between sections |
| `--space-2xl` | `3rem` (12px) | Extra large chapter breaks |
| `--space-3xl` | `4rem` (16px) | Massive section spacing |
| `--space-4xl` | `6rem` (24px) | Hero section padding |
| `--space-5xl` | `10rem` (40px) | Page-level section padding |

### Responsive Gutter

```css
--gutter: clamp(1.25rem, 3.2vw, 4rem)
```

Automatically scales from 1.25rem on mobile to 4rem on desktop.

---

## 4. Geometry System

### Border Radius

Clean, modern geometry without trendy excess.

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | `1rem` | Buttons, badges, small inputs |
| `--radius-md` | `1.5rem` | Cards, modals, form controls |
| `--radius-lg` | `2rem` | Large containers, hero sections |
| `--radius-full` | `999px` | Circular buttons, icon wrappers |

### Shadow & Depth

Two shadows create clear elevation hierarchy:

| Token | Value | Use | Purpose |
|-------|-------|-----|---------|
| `--shadow-soft` | `0 20px 50px rgba(6,12,22, 0.08)` | Cards, standard elevation | Subtle, refined |
| `--shadow-deep` | `0 22px 60px rgba(0,0,0, 0.28)` | Hero content, emphasis | Strong focus |

**Shadow Rules:**
- Use **one shadow per element** (no stacking)
- Apply **sparingly**—white space > decoration
- Premium aesthetic requires restraint

---

## 5. Layout Architecture

### Container Sizing

```css
--max-width: 1440px;
width: min(calc(100% - (var(--gutter) * 2)), var(--max-width));
margin: 0 auto;
```

### Responsive Breakpoints

| Device | Viewport | Use |
|--------|----------|-----|
| **Desktop** | ≥1440px | Primary design target |
| **Laptop** | 1160–1440px | Begin 2-column collapse |
| **Tablet** | 820–1160px | Optimize horizontal, 2-column grids |
| **Mobile** | 640–820px | Single column, adjusted spacing |
| **Small Mobile** | <640px | Minimum viable layout |

### Grid Patterns

**2-Column (Default Layout):**
```
1.08fr (main) | 0.92fr (sidebar)
```

**3-Column (Rankings):**
```
1.12fr (primary) | 0.94fr (secondary) | 0.94fr (secondary)
```

**Flexible Metric Grid:**
```
repeat(auto-fit, minmax(200px, 1fr))
```

### Vertical Rhythm

**Chapter spacing consistency:**
- Top padding: `clamp(7.25rem, 9vw, 10rem)`
- Bottom padding: `clamp(4rem, 5.5vw, 6.5rem)`
- Inter-element gap: `clamp(1.75rem, 2.4vw, 2.5rem)`

---

## 6. Motion & Interaction

### Easing Curve

```css
--ease: cubic-bezier(0.22, 0.61, 0.36, 1)
```

**Feel:** Gentle entrance with moderate curve—sophisticated, not bouncy.

### Duration Standards

| Duration | Use |
|----------|-----|
| `180ms` | Hover states, focus ring appearance |
| `220ms` | Button interactions, icon transitions |
| `320ms` | Panel open/close, modal slides |
| `560ms` | Content reveal on scroll, page transitions |

### Animation Pattern

**Reveal animation (for scroll-triggered content):**

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 560ms var(--ease), transform 560ms var(--ease);
}

[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 7. Component Specifications

### Buttons

**Hierarchy (four levels):**

1. **Primary (Solid)** — Full background + premium color
2. **Secondary (Outline)** — Border only + neutral color
3. **Tertiary (Ghost)** — Text only, no border
4. **Rounded** — `border-radius: 999px` for pill-shaped variants

**Accessibility:** Minimum 44px × 44px touch target.

### Cards & Surfaces

**Premium glass aesthetic:**

```css
background: rgba(255, 255, 255, 0.04);
border: 1px solid var(--line-light);
border-radius: var(--radius-md);
backdrop-filter: blur(16px);
padding: var(--space-lg);
box-shadow: var(--shadow-soft);
```

**Meaning:** Glass-morphism conveys hierarchy while maintaining restraint.

### Data Tables

**Light mode:**
- Header: Strong borders, uppercase labels, 600 weight
- Cells: Light dividers, right-aligned numbers
- Emphasis rows: Bold text (no color)

**Dark mode:**
- Sticky headers with subtle background
- Light text throughout
- Subtle dividers (no color emphasis maintains sophistication)

### Form Inputs

**Consistent styling:**
- Border: `1px solid var(--line-dark)`
- Padding: `1rem` (44px minimum height)
- Radius: `var(--radius-md)`
- Focus: `2px solid var(--blue)` outline

---

## 8. Accessibility & Compliance

All design tokens and components meet **WCAG 2.1 AA** standards:

- **Text contrast:** 4.5:1 minimum for normal text, 3:1 for large text
- **Focus indicators:** 2px outline with distinct color (blue)
- **Touch targets:** All interactive elements ≥44×44px
- **Motion:** Respects `prefers-reduced-motion` user preference
- **Color:** Information never conveyed by color alone

---

## 9. Premium Execution Checklist

Use this before shipping any design change:

- [ ] **No gradients on text** (destroys readability)
- [ ] **No drop shadows on text** (appears unprofessional)
- [ ] **Max 3 colors per section** (sophisticated, not busy)
- [ ] **White space > decoration** (modern luxury aesthetic)
- [ ] **One primary CTA per section** (clear priority)
- [ ] **Serif fonts for accent only** (prevents clashing)
- [ ] **All corners use consistent tokens** (no random radius values)
- [ ] **All spacing uses token values** (maintains grid alignment)
- [ ] **Hover states on all interactive elements** (professional feedback)
- [ ] **Focus ring visible on keyboard navigation** (accessibility)

---

## 10. Implementation Examples

### Hero Section Example

```css
.hero {
  background: linear-gradient(
    180deg,
    rgba(7, 17, 29, 0.96),
    rgba(8, 18, 31, 0.98)
  );
  padding: var(--space-5xl);
  box-shadow: var(--shadow-deep);
}

.hero__title {
  font: 900 var(--type-hero) / 0.9 var(--font-display);
  letter-spacing: -0.065em;
  color: var(--paper);
}

.hero__accent {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--gold);
}
```

### Metric Card Example

```css
.metric-card {
  padding: var(--space-lg);
  border-top: 1px solid var(--line-dark-strong);
}

.metric-card__label {
  font-size: var(--type-caption);
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-soft);
  margin-bottom: var(--space-md);
}

.metric-card__value {
  font: 700 var(--type-kpi) / 0.96 var(--font-display);
  letter-spacing: -0.05em;
  color: var(--ink-strong);
}
```

### Glass Panel Example

```css
.panel {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--line-light);
  border-radius: var(--radius-md);
  backdrop-filter: blur(16px);
  padding: var(--space-lg);
  box-shadow: var(--shadow-soft);
}
```

---

## 11. Maintenance & Extension

### Adding a New Color Token

1. Define in `:root` with semantic name (e.g., `--color-status-success`)
2. Document WCAG contrast pairs with all text colors
3. Test in both light and dark modes
4. Only add if it serves a distinct semantic purpose (not duplicate)

### Adding a New Typography Scale

1. Create `--type-name` variable with `clamp()` function
2. Ensure it fits within the existing hierarchy (9–11 sizes max)
3. Test all breakpoints thoroughly
4. Document its intended use (role, component)

### Pre-Launch Design Review

Before shipping any change, verify:
- ✅ Uses existing design tokens (no hardcoded hex/px values)
- ✅ Maintains visual hierarchy and contrast ratios
- ✅ Scales predictably across all breakpoints
- ✅ Renders consistently in light and dark modes
- ✅ Passes automated accessibility audit

---

## 12. Quick Reference

### File Organization

```
styles.css
├─ Design tokens (:root variables)
├─ Base styles (html, body, reset)
├─ Layout & grid patterns
├─ Component styles (organized by type)
├─ Responsive breakpoints
└─ Utility classes

DESIGN_SYSTEM.md          (this document)
COMPONENT_LIBRARY.md      (implementation patterns)
design-tokens.css         (reference tokens)
```

### Premium Aesthetic Formula

The "premium" feeling comes from these core principles:

1. **Generous white space** (>35% empty space on desktop)
2. **Restrained color palette** (<4 colors per section)
3. **Consistent typography** (9–11 distinct sizes maximum)
4. **Subtle shadows** (soft > deep, minimal stacking)
5. **Precise alignment** (all spacing derived from grid)
6. **Smooth motion** (200–600ms range, gentle easing)
7. **Clear hierarchy** (3 distinct levels: primary, secondary, tertiary)

### Anti-Patterns to Avoid

- ❌ Saturated, loud colors or oversaturated accents
- ❌ Multiple typefaces (keep to maximum 3 font families)
- ❌ Heavy shadows, glows, or neon outlines
- ❌ Cramped spacing (appears rushed, not refined)
- ❌ Animated decorations (distracting from content)
- ❌ Misaligned elements (signals carelessness)
