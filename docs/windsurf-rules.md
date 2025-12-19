# Windsurf Rules — Casino React Menu (Reusable Module)

You are building a reusable React + TypeScript UI module (hamburger menu) for a casino-style game.
You must produce clean, maintainable, well-tested code with strict typing.

## Non-negotiables
- TypeScript strict. No `any`. Use `unknown` + narrowing if needed.
- No magic numbers in components:
  - use typed config objects and design tokens
  - store slider bounds/steps as constants
- No large refactors unless asked.
- No hidden global state. Component must be controlled by props.
- Accessibility is required: tabs, switches, sliders, focus trap, ESC close.

## Tech choices (latest stable)
- React (current stable 19.2.x)
- Vite (current stable 7.x)
- TypeScript (current stable shown on TS download page)
- Testing:
  - Vitest + React Testing Library
  - Playwright for E2E

## Architecture
- `src/components/CasinoMenu/` contains the module:
  - `CasinoMenu.tsx` (public entry)
  - `CasinoMenu.module.css` (CSS Modules)
  - `components/*` (Tabs, Toggle, Slider, Calendar wrapper, etc.)
  - `model/*` (types, config, pure helpers)
- `src/shared/` for generic utilities (formatting, clamp, etc.)
- Keep components presentational; keep logic in model/helpers.

## Styling
- Use CSS variables as design tokens:
  - dark background, white text, gold accents, green ON fill
- Use CSS Modules. Avoid inline styles except for dynamic transforms.
- Support prefers-reduced-motion.

## Components behavior
- Drawer: overlay click closes, ESC closes, focus trap while open.
- Tabs: ARIA-compliant.
- Toggles: keyboard accessible; role switch; gold border/thumb; green fill when ON.
- Sliders: draggable + keyboard; formatted currency label; clamp to min/max.
- Calendar: keyboard navigable; date selection callback.

## Testing (required)
- Unit tests: clamp/step/format logic.
- RTL tests: open/close, tabs, toggles, sliders, history mode, calendar selection.
- Playwright: critical user flow across tabs.
- Tests must be deterministic and not rely on real timers unless mocked.

## Output format per task
1) Goal (1–2 lines)
2) Plan (3–7 steps)
3) File plan (exact paths)
4) Implementation
5) Tests added/updated
6) How to verify (commands)
