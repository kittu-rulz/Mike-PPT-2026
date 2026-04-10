# Design System Quick Start Guide

## What You Have

A complete, premium design system with four documents:

| File | Purpose | Length |
|------|---------|--------|
| **DESIGN_SYSTEM.md** | Governance, principles, standards | Philosophy + reference |
| **design-tokens.css** | All design variables (copy into styles.css) | Variables only |
| **COMPONENT_LIBRARY.md** | Copy-paste component examples | 400+ lines of patterns |
| **QUICK_START.md** | This file | Quick reference |

---

## 🎯 Using the System

### Step 1: Integrate Tokens (Already Done)
The `design-tokens.css` file contains all CSS variables. You can:
- **Option A:** Copy all variables from `design-tokens.css` to the top of `styles.css`
- **Option B:** Keep as separate file and import: `@import 'design-tokens.css';`

### Step 2: Use Tokens in Components
Instead of:
```css
/* ❌ DON'T: Hardcode values */
.card {
  padding: 24px;
  background: #0f1b2b;
  border-radius: 24px;
}
```

Do:
```css
/* ✅ DO: Use tokens */
.card {
  padding: var(--space-lg);
  background: var(--color-bg-dark-raised);
  border-radius: var(--radius-md);
}
```

### Step 3: Reference Documentation
- **Confused about spacing?** → Check `DESIGN_SYSTEM.md` § 3 (Spacing System)
- **Need a button?** → Check `COMPONENT_LIBRARY.md` (Button Components)
- **Want to add a color?** → Check `DESIGN_SYSTEM.md` § 12 (Maintenance)

---

## 📦 Core Tokens Reference

### Typography
```css
var(--type-hero)        /* 7.4rem desktop → 3.6rem mobile */
var(--type-display)     /* 5rem desktop → 2rem mobile */
var(--type-title)       /* 4rem desktop → 2.15rem mobile */
var(--type-kpi)         /* Large metrics */
var(--type-lead)        /* Introductory text */
var(--type-body)        /* Default: 1rem */
var(--type-label)       /* 0.85rem */
var(--type-caption)     /* 0.76rem */
var(--type-micro)       /* 0.74rem - eyebrows */
```

### Colors (Brand)
```css
var(--color-blue)       /* #0b78e3 - primary action */
var(--color-gold)       /* #c18a43 - premium accent */
var(--color-teal)       /* #1b6770 - cool accent */
var(--color-violet)     /* #8650ff - tertiary */
```

### Colors (Semantic Text)
```css
var(--color-text-primary-light)     /* #0d1a2b - dark mode text */
var(--color-text-secondary-light)   /* #344055 - secondary text */
var(--color-text-tertiary-light)    /* #6c768a - faint text */
```

### Spacing
```css
var(--space-xs)   /* 4px */
var(--space-sm)   /* 8px */
var(--space-md)   /* 16px */
var(--space-lg)   /* 24px */
var(--space-xl)   /* 32px */
var(--space-2xl)  /* 48px */
var(--space-3xl)  /* 64px */
var(--space-4xl)  /* 96px */
var(--space-5xl)  /* 160px */
var(--gutter)     /* Adaptive: 1.25rem - 4rem */
```

### Shadows
```css
var(--shadow-soft)      /* Subtle elevation */
var(--shadow-deep)      /* Hero, emphasis */
```

### Motion
```css
var(--ease-default)     /* Primary easing */
var(--duration-fast)    /* 180ms */
var(--duration-base)    /* 220ms */
var(--duration-slow)    /* 320ms */
var(--duration-reveal)  /* 560ms */
```

---

## 🎨 Premium Design Checklist

**Before shipping any update, ensure:**

- [ ] **Colors:** Using `var(--color-*)` not hex values
- [ ] **Spacing:** All padding/margin from `--space-*` tokens
- [ ] **Typography:** Using named scales (`--type-*`)
- [ ] **Shadows:** Max 1 shadow per element
- [ ] **Borders:** Using design radius tokens
- [ ] **Animation:** Using motion tokens (duration + easing)
- [ ] **Focus:** Every interactive element has `:focus-visible`
- [ ] **Contrast:** Meets WCAG AA minimum (4.5:1 for text)
- [ ] **Touch targets:** Minimum 44px × 44px
- [ ] **Responsive:** Works at 640px, 820px, 1160px breakpoints

---

## 🚀 Common Tasks

### Add a New Button Variant
1. Check `COMPONENT_LIBRARY.md` for button patterns
2. Use existing button classes as base
3. Override only what's different
4. Reference colors and spacing via tokens

### Create a New Card Style
1. Copy the `.card` from `COMPONENT_LIBRARY.md`
2. Adjust `--space-lg` or `--radius-md` as needed
3. Keep glass-morphism aesthetic (backdrop-filter)
4. Test in both light/dark modes

### Build a New Section
1. Use `--space-5xl` for top/bottom padding
2. Use `--space-2xl` for internal gaps
3. Limit to max 3 colors in the section
4. Respect max-width constraints
5. Add white space—lots of it

### Responsive Without Media Queries
Use `clamp()`:
```css
/* Automatically scales between 32px and 64px */
padding: clamp(2rem, 5vw, 4rem);

/* Font automatically scales between 2rem and 5rem */
font-size: clamp(2rem, 4.8vw, 5rem);
```

---

## 📐 Layout Pattern: Premium Section

Here's the standard pattern for a premium section:

```html
<section class="chapter">
  <div class="wrap">
    <header class="section-header">
      <h2>Section Title</h2>
    </header>
    <div class="section-content">
      <!-- Content -->
    </div>
  </div>
</section>
```

```css
.chapter {
  padding: clamp(6rem, 9vw, 10rem) 0;
}

.wrap {
  width: min(calc(100% - (var(--gutter) * 2)), var(--max-width));
  margin: 0 auto;
}

.section-header {
  margin-bottom: var(--space-2xl);
}

.section-header h2 {
  font: 700 var(--type-title) / 1.02 var(--font-display);
  letter-spacing: var(--letter-normal-tight);
  color: var(--color-text-primary-light);
  margin: 0;
}

.section-content {
  display: grid;
  gap: var(--space-2xl);
}

/* Light mode */
.chapter--light {
  background: linear-gradient(180deg, var(--color-bg-light-strong), var(--color-bg-light));
  color: var(--color-text-primary-light);
}

/* Dark mode */
.chapter--dark {
  background: linear-gradient(180deg, rgba(7, 17, 29, 0.96), rgba(8, 18, 31, 0.98));
  color: var(--color-text-primary-dark);
}
```

---

## 🎯 Design Principles (The Why)

These make it feel premium:

**1. Generous White Space**
- Sections have 35%+ empty space
- Your eye has room to breathe
- Conveys confidence, quality, luxury

**2. Restrained Color Palette**
- Max 3 colors per section
- No garish accents
- Executive, not playful

**3. Perfect Typography Hierarchy**
- 9–11 distinct sizes (not 20+)
- Clear primary → secondary → tertiary
- Premium feels organized

**4. Subtle Motion**
- 200–600ms transitions (not snappy)
- Easing curves feel organic
- No page-jump surprises

**5. Consistent Grid**
- Everything aligns to a system
- No arbitrary spacing
- Professional, polished

**6. Accessible by Default**
- High contrast (AA+)
- Focus states visible
- Keyboard navigable
- = Trustworthy = Premium

---

## ⚠️ Common Mistakes to Avoid

| ❌ Avoid | ✅ Instead |
|---------|----------|
| Hardcoding `#c18a43` | Using `var(--color-gold)` |
| `margin: 20px` | Using `var(--space-lg)` |
| 5+ colors per section | Limiting to 3 palette colors |
| Stacked shadows | Single shadow only |
| Serif font in body | Serif for accent spans only |
| Tight spacing (appears cramped) | Generous spacing (feels premium) |
| No focus indicators | Visible `:focus-visible` on all buttons |
| Animating in under 180ms | Respecting motion durations |

---

## 🔄 Maintenance Workflow

### When You Need to Change Something

**Changing a color?**
1. Update the hex in `design-tokens.css` `:root`
2. That's it—everywhere updates automatically
3. No find-and-replace needed

**Adjusting spacing?**
1. Change `--space-lg: 1.5rem;` to desired value
2. All components that use it update
3. Test at different breakpoints

**Adding a new component?**
1. Use existing components from `COMPONENT_LIBRARY.md` as template
2. Only use `var(--*)` references
3. Add to `COMPONENT_LIBRARY.md` for team reference

---

## 🗂️ File Organization Tips

**Within `styles.css` or separate files:**

```
┌─ design-tokens.css          /* Variables only */
├─ base.css                   /* html, body, reset */
├─ layout.css                 /* .wrap, grid patterns */
├─ components.css             /* .btn, .card, etc */
├─ utilities.css              /* .text-right, .sr-only */
└─ responsive.css             /* Media queries */
```

OR keep it all in one `styles.css` with clear section comments:

```css
/* ──────────────── DESIGN TOKENS ──────────────── */
/* Copy from design-tokens.css */

/* ──────────────── BASE STYLES ──────────────── */
/* Reset, html, body, defaults */

/* ──────────────── LAYOUT ──────────────── */
/* .wrap, grid, flex patterns */

/* ──────────────── COMPONENTS ──────────────── */
/* .btn, .card, .table, etc */

/* ──────────────── RESPONSIVE ──────────────── */
/* Media queries */
```

---

## 📊 System Inventory

**What's included:**
- ✅ 9 typography scales (hero → micro)
- ✅ 4 primary brand colors + semantics
- ✅ 9 semantic spacing units
- ✅ 4 border radius values
- ✅ 2 shadow depths
- ✅ 3 easing curves
- ✅ 4 motion durations
- ✅ 5 responsive breakpoints
- ✅ 15+ component patterns
- ✅ WCAG AA accessible by default

**Total:** 1 system, infinite possibilities.

---

## 🎓 Learning More

1. **Overwhelmed?** Start with `DESIGN_SYSTEM.md` § 9 (Premium Execution Checklist)
2. **Building something new?** Go to `COMPONENT_LIBRARY.md` and find similar component
3. **Need a specific token?** Search `design-tokens.css` for key word
4. **Want to understand philosophy?** Read `DESIGN_SYSTEM.md` § 1-2

---

## 💡 Questions?

Common scenarios:

**Q: Should I use `--space-md` or `--space-lg`?**
A: `--space-md` (16px) for internal padding, `--space-lg` (24px) between sections

**Q: Can I use `#0b78e3` if it's the same as `--color-blue`?**
A: No. Always use the variable. Easier to change, more maintainable.

**Q: What if I need a color that's not in the palette?**
A: Don't. Constrain yourself to the 4 brand colors + neutrals. If you truly need more, add it to `design-tokens.css` and document why.

**Q: How do I make it work on mobile?**
A: Use `clamp()` for sizes/spaces, semantic breakpoints (820px, 640px) for layout, `min-height: 44px` for buttons. You've already got responsive colors built-in.

**Q: Can I disable animations for users who prefer reduced motion?**
A: Yes! Add:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## 🎬 Next Steps

1. **Copy** `design-tokens.css` variables into your stylesheet
2. **Read** `DESIGN_SYSTEM.md` § 9 (Premium Execution Checklist)
3. **Reference** `COMPONENT_LIBRARY.md` when building
4. **Validate** each change against the checklist
5. **Iterate** using the maintaining & extension section

---

**Everything you need is here. Make it premium.**
