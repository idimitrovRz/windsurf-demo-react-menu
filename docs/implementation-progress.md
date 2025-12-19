# Implementation Progress — Casino Hamburger Menu

## Setup

- [x] React + Vite project present
- [x] TypeScript strict enabled
- [x] CSS Modules in use
- [x] Design tokens via CSS variables

## Global Menu Behavior

- [x] Hamburger icon toggles drawer-style menu
- [x] Drawer overlays the game (DOM layer above canvas)
- [x] Background overlay dims the game
- [x] Clicking overlay closes the menu
- [x] ESC closes the menu
- [x] Focus is trapped inside the menu while open
- [x] Smooth, subtle animations
- [x] Respects prefers-reduced-motion

## Tabs (ARIA)

- [x] 4 tabs: Game Settings / Autoplay Settings / Information / History
- [x] Keyboard accessible tab navigation
- [x] ARIA-compliant: tablist / tab / tabpanel
- [x] Clear active/inactive styling

## Tab 1 — Game Settings

- [x] 4 toggles: Sound
- [x] 4 toggles: Background Sound
- [x] 4 toggles: Quick Spin
- [x] 4 toggles: Battery Saver
- [x] Toggle design: gold border + gold thumb
- [x] Toggle design: OFF background dark
- [x] Toggle design: ON background green
- [ ] Toggle hover/focus subtle gold glow
- [x] Toggle keyboard accessible
- [x] Toggle ARIA role switch

## Tab 2 — Autoplay Settings

- [x] Header label: STOP AUTOPLAY
- [x] Slider: If balance decreases by (0.00–800.00 EUR)
- [x] Slider: If single win exceeds (0.00–20.00 EUR)
- [x] Slider: If balance increases by (0.00–2000.00 EUR)
- [x] Sliders draggable (mouse/touch)
- [x] Sliders keyboard support (arrows, shift+arrows)
- [x] Value displayed as 0.00 EUR
- [x] Values clamped to min/max
- [x] No magic numbers (bounds are config-driven)
- [x] Slider ARIA role slider

## Tab 3 — Information

- [x] Config-driven default symbols (6–8)
- [x] Symbol row: icon placeholder allowed
- [x] Symbol row: symbol name
- [x] Symbol row: payout values (3/4/5 of a kind)
- [x] Card-like rows with gold highlights
- [x] No real gambling logic (UI-only)

## Tab 4 — History

- [x] Calendar month view at top
- [x] Segmented control: Current Game / All Games
- [x] Switching segment updates list
- [x] Calendar date selection triggers callback
- [x] Placeholder history items acceptable
- [ ] Keyboard accessible calendar navigation

## Public Component API

- [ ] Component fully controlled by props (host owns state)
- [x] Props: isOpen
- [x] Props: onRequestClose
- [x] Props: initialTab
- [x] Props: settings + onSettingsChange
- [x] Props: autoplayRules + onAutoplayRulesChange
- [x] Props: historyModel (optional)
- [x] Props: onDateChange
- [x] No internal global state

## Tests

### Unit (Vitest)

- [x] Currency formatting
- [x] Slider clamp & step logic
- [ ] Controlled-state update helpers

### Component (React Testing Library)

- [ ] Open / close menu
- [x] Overlay click closes
- [x] ESC closes
- [x] Focus trap works
- [x] Tab switching
- [x] Toggle interactions
- [ ] Slider drag interactions
- [x] Slider keyboard interactions
- [x] History mode switching
- [ ] Calendar date selection

### E2E (Playwright)

- [ ] Open menu
- [ ] Navigate all tabs
- [ ] Change settings
- [ ] Adjust autoplay sliders
- [ ] Close menu
