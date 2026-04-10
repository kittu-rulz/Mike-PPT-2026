# Component Library
## Premium Executive Components Using Design Tokens

---

## Building Premium Components

This guide shows how to use the design system tokens to build consistent, premium components.

---

## Button Components

### Primary Button (Solid Action)

**HTML:**
```html
<button class="btn btn--primary">
  <span>Schedule Review</span>
</button>
```

**CSS:**
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  min-width: 44px;
  min-height: 44px;
  padding: var(--space-md) var(--space-lg);
  font-family: var(--font-body);
  font-weight: var(--weight-semibold);
  font-size: 1rem;
  letter-spacing: var(--letter-normal);
  border: 0;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: var(--transition-base);
}

.btn--primary {
  background: var(--color-blue);
  color: white;
  box-shadow: var(--shadow-soft);
}

.btn--primary:hover {
  background: linear-gradient(135deg, var(--color-blue), var(--color-blue));
  opacity: 0.9;
  box-shadow: var(--shadow-deep);
}

.btn--primary:focus-visible {
  outline: 2px solid var(--color-blue);
  outline-offset: 2px;
}

.btn--primary:active {
  transform: scale(0.98);
}
```

### Secondary Button (Outline)

```css
.btn--secondary {
  background: transparent;
  color: var(--color-text-secondary-light);
  border: 1px solid var(--color-border-dark);
}

.btn--secondary:hover {
  background: var(--color-surface-light-low);
  border-color: var(--color-border-dark-strong);
}
```

### Tertiary Button (Ghost)

```css
.btn--tertiary {
  background: transparent;
  color: var(--color-blue);
  padding: var(--space-md) var(--space-lg);
}

.btn--tertiary:hover {
  background: var(--color-surface-light-low);
}
```

---

## Card Components

### Premium Data Card

**HTML:**
```html
<article class="card card--data">
  <div class="card__header">
    <h3 class="card__title">Revenue Forecast</h3>
    <span class="card__meta">FY'26</span>
  </div>
  <div class="card__content">
    <strong class="card__value">$18.4M</strong>
    <p class="card__description">+6.1% vs FY'25</p>
  </div>
</article>
```

**CSS:**
```css
.card {
  border: 1px solid var(--color-border-dark-subtle);
  border-radius: var(--radius-md);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.04),
    rgba(255, 255, 255, 0.02)
  );
  backdrop-filter: blur(16px);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  transition: var(--transition-base);
}

.card:hover {
  border-color: var(--color-border-dark-strong);
  box-shadow: var(--shadow-deep);
  background: rgba(255, 255, 255, 0.06);
}

.card__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: var(--space-lg);
  border-bottom: 1px solid var(--color-border-dark);
}

.card__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.84rem;
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--letter-wide);
  color: var(--color-text-tertiary-light);
}

.card__meta {
  font-size: var(--type-caption);
  color: var(--color-text-tertiary-light);
}

.card__content {
  padding: var(--space-lg);
}

.card__value {
  display: block;
  font-family: var(--font-display);
  font-size: var(--type-kpi);
  font-weight: var(--weight-bold);
  line-height: var(--line-tight);
  color: var(--color-text-primary-light);
  margin-bottom: var(--space-sm);
}

.card__description {
  margin: 0;
  font-size: var(--type-body);
  color: var(--color-text-secondary-light);
}
```

---

## Input Components

### Text Input

**HTML:**
```html
<div class="input-group">
  <label for="revenue" class="input-label">Annual Revenue</label>
  <input 
    id="revenue"
    type="text" 
    class="input input--text"
    placeholder="e.g., $10M"
  >
</div>
```

**CSS:**
```css
.input-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.input-label {
  font-family: var(--font-body);
  font-size: var(--type-label);
  font-weight: var(--weight-semibold);
  text-transform: uppercase;
  letter-spacing: var(--letter-wide);
  color: var(--color-text-tertiary-light);
}

.input {
  min-height: 44px;
  padding: var(--space-md);
  font-family: var(--font-body);
  font-size: 1rem;
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-md);
  background: var(--color-bg-light-strong);
  color: var(--color-text-primary-light);
  transition: var(--transition-fast);
}

.input:hover {
  border-color: var(--color-border-dark-strong);
}

.input:focus {
  outline: 0;
  border-color: var(--color-blue);
  box-shadow: 0 0 0 3px rgba(11, 120, 227, 0.1);
}

.input::placeholder {
  color: var(--color-text-tertiary-light);
}
```

---

## Data Table Component

### Premium Table

**HTML:**
```html
<table class="data-table">
  <thead>
    <tr>
      <th>Fiscal Year</th>
      <th class="text-right">Revenue</th>
      <th class="text-right">Growth %</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>FY'24</td>
      <td class="text-right">$17.4M</td>
      <td class="text-right">5.5%</td>
    </tr>
    <tr class="is-emphasis">
      <td>FY'25</td>
      <td class="text-right">$17.3M</td>
      <td class="text-right">-0.6%</td>
    </tr>
  </tbody>
</table>
```

**CSS:**
```css
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--type-body);
}

.data-table th,
.data-table td {
  padding: var(--space-md) var(--space-lg);
  text-align: left;
  border-top: 1px solid var(--color-border-dark);
}

.data-table thead {
  background: var(--color-bg-dark-soft);
  border-bottom: 2px solid var(--color-border-dark-strong);
}

.data-table thead th {
  font-weight: var(--weight-bold);
  font-size: var(--type-caption);
  text-transform: uppercase;
  letter-spacing: var(--letter-wide);
  color: var(--color-text-tertiary-dark);
}

.data-table tbody tr {
  transition: var(--transition-fast);
}

.data-table tbody tr:hover {
  background: rgba(11, 120, 227, 0.04);
}

.data-table tbody td {
  color: var(--color-text-secondary-dark);
}

.data-table tbody tr.is-emphasis td {
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary-dark);
}

.text-right {
  text-align: right;
}
```

---

## Modal/Dialog Component

### Premium Modal

**HTML:**
```html
<dialog class="modal" id="reviewModal">
  <div class="modal__backdrop"></div>
  <div class="modal__content">
    <header class="modal__header">
      <h2>Strategy Review</h2>
      <button class="modal__close" aria-label="Close">×</button>
    </header>
    <div class="modal__body">
      <!-- Content -->
    </div>
    <footer class="modal__footer">
      <button class="btn btn--secondary">Cancel</button>
      <button class="btn btn--primary">Confirm</button>
    </footer>
  </div>
</dialog>
```

**CSS:**
```css
.modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-lg);
}

.modal::backdrop {
  background: rgba(0, 0, 0, 0.48);
  backdrop-filter: blur(4px);
}

.modal__content {
  background: var(--color-bg-light-strong);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-deep);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
  animation: slideUp var(--duration-slow) var(--ease-default);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-xl);
  border-bottom: 1px solid var(--color-border-dark);
}

.modal__header h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--type-title);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary-light);
}

.modal__close {
  background: transparent;
  border: 0;
  font-size: 2rem;
  color: var(--color-text-secondary-light);
  cursor: pointer;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal__body {
  padding: var(--space-xl);
  color: var(--color-text-secondary-light);
  line-height: var(--line-loose);
}

.modal__footer {
  display: flex;
  gap: var(--space-lg);
  padding: var(--space-xl);
  border-top: 1px solid var(--color-border-dark);
}
```

---

## Notification/Alert Component

### Premium Alert

**HTML:**
```html
<div class="alert alert--success" role="alert">
  <span class="alert__icon">✓</span>
  <div class="alert__content">
    <h4 class="alert__title">Success</h4>
    <p class="alert__message">Your changes have been saved.</p>
  </div>
  <button class="alert__close" aria-label="Close alert">×</button>
</div>
```

**CSS:**
```css
.alert {
  display: flex;
  gap: var(--space-lg);
  align-items: flex-start;
  padding: var(--space-lg) var(--space-xl);
  border-radius: var(--radius-md);
  border-left: 4px solid;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(8px);
  animation: slideDown var(--duration-slow) var(--ease-default);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.alert--success {
  border-color: #1d782e;
  color: var(--color-text-secondary-dark);
}

.alert--error {
  border-color: #d32f2f;
}

.alert--warning {
  border-color: #f57c00;
}

.alert--info {
  border-color: var(--color-blue);
}

.alert__icon {
  font-size: 1.4rem;
  flex-shrink: 0;
}

.alert__content {
  flex: 1;
}

.alert__title {
  margin: 0 0 var(--space-xs);
  font-weight: var(--weight-semibold);
  font-size: 1rem;
}

.alert__message {
  margin: 0;
  font-size: 0.95rem;
  opacity: 0.9;
}

.alert__close {
  background: transparent;
  border: 0;
  font-size: 1.5rem;
  cursor: pointer;
  flex-shrink: 0;
  opacity: 0.6;
  transition: var(--transition-fast);
}

.alert__close:hover {
  opacity: 1;
}
```

---

## Tooltip Component

### Premium Tooltip

**HTML:**
```html
<div class="tooltip-wrapper">
  <button class="tooltip-trigger" aria-describedby="tooltip-1">
    ?
  </button>
  <div class="tooltip" id="tooltip-1" role="tooltip">
    Revenue includes all enterprise contracts signed in fiscal year
  </div>
</div>
```

**CSS:**
```css
.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.tooltip-trigger {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid var(--color-border-dark);
  background: transparent;
  color: var(--color-text-tertiary-light);
  cursor: help;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  background: var(--color-bg-dark-raised);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-sm);
  padding: var(--space-md) var(--space-lg);
  font-size: 0.9rem;
  color: var(--color-text-secondary-dark);
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition-fast);
  z-index: 999;
}

.tooltip-trigger:hover + .tooltip,
.tooltip-trigger:focus + .tooltip {
  opacity: 1;
  visibility: visible;
}

.tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid var(--color-bg-dark-raised);
}
```

---

## Spacing Patterns

### Interior Spacing (Padding)

```css
/* Card with standard internal spacing */
.card {
  padding: var(--space-lg);      /* 24px all sides */
}

/* Section with generous spacing */
.section {
  padding: var(--space-4xl) var(--space-3xl);  /* 96px v, 64px h */
}

/* Button with comfortable touch area */
.btn {
  padding: var(--space-md) var(--space-lg);   /* 16px v, 24px h */
}

/* Input with minimum 44px target */
.input {
  padding: var(--space-md);                   /* Results in ~48px height */
  min-height: 44px;
}
```

### External Spacing (Margin)

```css
/* Vertical rhythm: stack items with consistent gap */
.list {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);   /* 24px between items */
}

/* Grid with breathing room */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-2xl);  /* 48px between columns/rows */
}

/* Tight grouping (related items) */
.group {
  display: flex;
  gap: var(--space-sm);   /* 8px between related items */
}
```

---

## Premium Typography Patterns

### Hero Headline

```css
.headline-hero {
  font-family: var(--font-display);
  font-size: var(--type-hero);
  font-weight: var(--weight-xbold);
  line-height: var(--line-tight);
  letter-spacing: var(--letter-tight);
  color: var(--color-text-primary-dark);
}
```

### Section Title

```css
.title-section {
  font-family: var(--font-display);
  font-size: var(--type-title);
  font-weight: var(--weight-bold);
  line-height: var(--line-normal);
  letter-spacing: var(--letter-normal-tight);
  color: var(--color-text-primary-light);
  text-transform: none;
}
```

### Metric Caption

```css
.caption-metric {
  font-family: var(--font-body);
  font-size: var(--type-micro);
  font-weight: var(--weight-bold);
  line-height: var(--line-snug);
  letter-spacing: var(--letter-wide);
  text-transform: uppercase;
  color: var(--color-text-tertiary-light);
}
```

### Body Copy

```css
.body-copy {
  font-family: var(--font-body);
  font-size: var(--type-lead);
  font-weight: var(--weight-regular);
  line-height: var(--line-loose);
  letter-spacing: var(--letter-normal);
  color: var(--color-text-secondary-dark);
}
```

---

## Animation Patterns

### Fade In

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.element {
  animation: fadeIn var(--duration-base) var(--ease-default);
}
```

### Slide In

```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.element {
  animation: slideIn var(--duration-reveal) var(--ease-default);
}
```

### Subtle Scale

```css
.btn:hover {
  transform: scale(1.02);
  transition: var(--transition-fast);
}

.btn:active {
  transform: scale(0.98);
}
```

---

## Responsive Component Patterns

### Responsive Grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-2xl);
}

@media (max-width: 820px) {
  .grid {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }
}
```

### Responsive Text

```css
.headline {
  font-size: var(--type-title);  /* Uses clamp() for fluid scaling */
}

/* No media queries needed! clamp() handles scaling automatically */
```

### Responsive Spacing

```css
.section {
  padding: clamp(2rem, 5vw, 4rem);
}

/* Automatically scales between 32px and 64px based on viewport width */
```

---

## Do's and Don'ts

### ✅ Do

- Use design tokens for **all** values (colors, spacing, typography, shadows)
- Combine tokens to create new utilities
- Apply `var()` CSS functions consistently
- Test components in both light and dark modes
- Maintain 44px × 44px minimum touch targets
- Use semantic color names in markup
- Implement proper focus states for accessibility

### ❌ Don't

- Hardcode color hex values
- Use arbitrary spacing values
- Mix typefaces within a component
- Add shadows to multiple elements on same component
- Violate the 3-color maximum per section rule
- Use gradients on text
- Forget focus and hover states

---

## Quick Implementation Checklist

Before shipping a new component:
- [ ] Uses only design tokens (no hardcoded values)
- [ ] Has visible `:focus-visible` state
- [ ] Includes `:hover` state
- [ ] Minimum 44px × 44px touch targets
- [ ] Maintains consistent spacing (on grid)
- [ ] Passes WCAG AA contrast check
- [ ] Responsive without media queries (or breakpoint-aware)
- [ ] Works in light AND dark modes
- [ ] Has appropriate animation/transition timing

