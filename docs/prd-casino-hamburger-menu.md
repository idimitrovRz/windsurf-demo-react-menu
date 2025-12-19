# PRD — Casino Hamburger Menu (React, Reusable Module)

## 1. Summary

Build a **casino-themed hamburger menu** as a **high-quality, reusable React module** to be integrated and reused into an existing web games.
The menu has **4 tabs**, strict visual requirements, strong TypeScript guarantees, and comprehensive testing.

This PRD is **implementation-oriented** and optimized for use with AI coding agents (Windsurf).

---

## 2. Goals

- Deliver a modern, cool, casino-like hamburger menu
- Dark background, white text, gold accents, green active states
- Clean architecture with reusable components
- Strict TypeScript (no `any`, no magic numbers)
- Tests that make sense: unit, component, and e2e
- Easy integration into multiple projects
- create a docs/implementation-progress.md file with checkboxes for each requirement

---

## 3. Non-Goals (Out of Scope)

The following must **NOT** be implemented:

- Backend or API integration
- Persistence (localStorage, DB)
- Authentication
- Analytics / telemetry
- Bonus games
- Free spins
- Gamble / double features
- Sound engine
- Pixi rendering inside the menu itself

---

## 4. Target Environment

### Platform
- Web (desktop-first)

### Tech Stack
- React (latest stable)
- TypeScript (strict)
- Vite (latest stable)
- Styling: CSS Variables + CSS Modules
- Testing:
  - Vitest (unit)
  - React Testing Library (component)
  - Playwright (E2E)

---

## 5. Global Menu Behavior

- Hamburger icon toggles a **drawer-style menu**
- Drawer overlays the game (DOM layer above canvas)
- Background overlay dims the game
- Clicking overlay closes the menu
- `ESC` closes the menu
- Focus is trapped inside the menu while open
- Smooth, subtle animations (no excessive motion)

---

## 6. Tabs Overview

The menu contains **4 tabs**:

1. **Game Settings**
2. **Autoplay Settings**
3. **Information**
4. **History**

Tabs must be:
- Keyboard accessible
- ARIA-compliant (`tablist`, `tab`, `tabpanel`)
- Clearly styled for active/inactive states

---

## 7. Tab 1 — Game Settings

Contains **4 toggle switches**:

- Sound
- Background Sound
- Quick Spin
- Battery Saver

### Toggle Design
- Border: **gold / golden**
- Toggle thumb: **gold**
- OFF background: dark
- ON background: **green**
- Hover/focus: subtle gold glow
- Keyboard accessible
- ARIA `role="switch"`

---

## 8. Tab 2 — Autoplay Settings

### Header
- Prominent label: **“STOP AUTOPLAY”**

### Controls
Three **horizontal draggable sliders**:

1. **If balance decreases by**
   - Min: `0.00 EUR`
   - Max: `800.00 EUR`
   - Initial: `0.00 EUR`

2. **If single win exceeds**
   - Min: `0.00 EUR`
   - Max: `20.00 EUR`
   - Initial: `0.00 EUR`

3. **If balance increases by**
   - Min: `0.00 EUR`
   - Max: `2000.00 EUR`
   - Initial: `0.00 EUR`

### Slider Requirements
- Draggable with mouse / touch
- Keyboard support (arrows, shift+arrows)
- Value displayed as `0.00 EUR`
- Clamped to min/max
- No magic numbers — all bounds are config-driven
- ARIA `role="slider"`

---

## 9. Tab 3 — Information

### Purpose
Display **symbol payout information** in a visually appealing way.

### Requirements
- 6–8 default symbols (config-driven)
- Each symbol row shows:
  - Symbol icon (placeholder allowed)
  - Symbol name
  - Payout values (e.g. 3 / 4 / 5 of a kind)
- Card-like rows
- Gold highlights and subtle separators
- No real gambling logic required — UI-only data

---

## 10. Tab 4 — History

### Layout
- Top: **Calendar** (month view)
- Below: segmented control:
  - **Current Game**
  - **All Games**

### Behavior
- Switching segment updates the list below
- Calendar selection triggers a callback
- Placeholder history items are acceptable
- Keyboard accessible calendar navigation

---

## 11. Visual Design System

### Colors
- Background: dark (casino-style)
- Text: white
- Accent: gold / golden
- Active toggle fill: green

### Design Tokens (CSS Variables)
Examples:
- `--color-bg-900`
- `--color-text-100`
- `--color-gold-500`
- `--color-green-500`
- `--radius-md`, `--radius-lg`
- `--space-xs` → `--space-xl`

No hardcoded numbers inside components.

---

## 12. Public Component API

The menu must be **fully controlled by props**.

```ts
<CasinoMenu
  isOpen={boolean}
  onRequestClose={() => void}
  initialTab="game" | "autoplay" | "info" | "history"
  settings={GameSettingsState}
  onSettingsChange={(next) => void}
  autoplayRules={AutoplayRulesState}
  onAutoplayRulesChange={(next) => void}
  historyModel={HistoryModel | undefined}
  onDateChange={(date) => void}
/>
```

No internal global state.

### 13. State Models (Typed)
- **GameSettingsState**
    - sound: boolean
    - backgroundSound: boolean
    - quickSpin: boolean
    - batterySaver: boolean

- **AutoplayRulesState**
    - stopOnBalanceDecrease
    - stopOnSingleWin
    - stopOnBalanceIncrease

- **InfoModel**
    - symbols
    - payout definitions

- **HistoryModel**
    - entries grouped by date
    - mode: current / all

### 14. Accessibility Requirements
- Focus trap inside menu
- ESC closes menu
- Keyboard navigation everywhere
- Proper ARIA roles for:
    - tabs
    - switches
    - sliders
    - calendar
- Respect prefers-reduced-motion

### 15. Testing Requirements
- **Unit Tests (Vitest)**
    - Currency formatting
    - Slider clamp & step logic
    - Controlled-state update helpers
- **Component Tests (React Testing Library)**
    - Open / close menu
    - Overlay click & ESC close
    - Tab switching
    - Toggle interactions
    - Slider drag & keyboard interactions
    - History mode switching
    - Calendar date selection
- **E2E Tests (Playwright)**
    - Open menu
    - Navigate all tabs
    - Change settings
    - Adjust autoplay sliders
    - Close menu

Tests must be deterministic and fast.

### 16. Acceptance Criteria
- Menu matches visual requirements
- All tabs function as specified
- No magic numbers
- Strict TypeScript, no any
- Accessible and keyboard navigable
- Tests pass (unit + component + e2e)
- Code is reusable across projects

### 17. Integration Notes
- Menu is expected to render as a DOM overlay above a Pixi canvas
- Host app owns all state
- Menu emits changes via callbacks only
