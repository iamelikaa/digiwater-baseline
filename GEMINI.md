# AGENTS.md — DigiWater Monitoring Dashboard

Fixed project context for AI-assisted development of this prototype. Stable
facts only — not a task list, not a progress log, does not change as
features get built. The task for a given session is provided separately.

## Project Overview

DigiWater monitors water distribution networks for aqueduct operators,
helping detect leaks early. This repo is a **frontend-only** prototype of
the DigiWater dashboard, built for a Master's thesis at Politecnico di
Torino. Audience: technical operators, not consumers — prioritize clarity
and fast status recognition over decoration. Visual language follows
monitoring platforms like Grafana/IoT dashboards.

## Scope

Backend, auth, databases, deployment, and real SCADA/IoT integration are
**out of scope**. This repo starts from a minimal baseline scaffold and
features are added incrementally; treat the scope below as the target
vision, not a checklist. Anything that would normally need a backend (auth,
the AI assistant) should be a frontend-only approximation (UI shell + mock
data), not a real integration. No Express/Firebase/real auth providers.

The implementation should satisfy the functional and UX requirements
documented in the project requirements specification. Where a prompt and
the documented requirements conflict, follow the documented requirements.

## Personas

- **Luca — Aqueduct Operator.** Control room, incl. night/emergency shifts.
  Low–medium software skill, high hydraulics expertise. Works under time
  pressure. Needs: instant at-a-glance status, fast anomaly localization,
  no query languages. Wants: high-contrast traffic-light indicators,
  alert prioritization (no alarm fatigue), confirm/undo on actions.
- **Sara — Hydraulic Engineer.** Office-based analysis. High technical
  proficiency. Needs: compare observed vs. expected data, correlate
  pressure/flow to rule out sensor faults, explore history/scenarios.
  Wants: multi-variable time-series charts, drill-down into raw data,
  flexible filtering.

Default to Luca's needs on overview/status surfaces, Sara's on
detail/analysis surfaces.

## Application Scope (conceptual, not a build order)

Landing page · map view colored by leakage-risk status · drill-down into
synchronized charts/status · pressure & flow time series · leak/maintenance
report form · login with role-based views (frontend-only) · anomaly alerts
(leak vs. sensor fault) · aggregated overview metrics · chat assistant UI
(mock responses, no backend AI).

Glossary: **DMA** = District Metered Area. **Leakage probability** = 0–1
risk score. **SCADA** = external telemetry system (not in this repo).

## Tech Stack

- React + TypeScript, built with Vite (see `package.json` for exact
  versions). Package manager: npm.
- Styling: plain CSS with custom properties (`src/index.css` `:root`
  tokens). No Tailwind/CSS-in-JS/CSS Modules.
- Map: `leaflet` + `react-leaflet` + OpenStreetMap — already installed, use
  these; don't swap for Mapbox/Google Maps.
- Chart libraries are not installed in the baseline repository. Figma's
  "Grafana screenshot" areas are visual placeholders only — no real Grafana
  here. Build charts as plain React (inline SVG) unless a task requires a
  charting library; if one is added (e.g. Chart.js/Recharts), explain why.
- Mock data only, no real network calls. No backend/DB/auth provider.

## Commands

`npm install` · `npm run dev` · `npm run build` · `npm run lint` ·
`npm run preview`

## Repository Structure

```
src/
  components/   # reusable UI (cards, pills, buttons)
  pages/        # top-level page/route components
  data/         # mock data fixtures (e.g. mockData.ts)
  assets/       # images/icons
  App.tsx       # app shell / routing
  main.tsx      # entry point
```

Type-based structure (not feature-based) — deliberate choice for this
solo prototype's scale. Keep it. `components/` and `pages/` start empty;
populate them as features are implemented, following the conventions below.

## Coding Conventions

- Functional components + hooks only, no classes.
- Prefer explicit types over `any`; keep shared types near their data
  (e.g. `District` in `mockData.ts`).
- Keep components ~200 lines or less; split rather than bloat.
- Reuse existing components before adding new ones.
- Mock data stays in `src/data`, typed arrays of plain objects.
- Avoid new dependencies unless they provide a clear benefit; if one is
  required, explain why before using it.
- React state/context only; no Redux/Zustand unless explicitly requested.

## Decision Principles

When multiple valid solutions exist, prefer in this order: simplicity,
maintainability, consistency with existing code, beginner readability,
minimal new dependencies. Avoid unnecessary architectural complexity.

## UI/UX Conventions

Top bar + persistent sidebar (Overview, Cities expandable into districts,
Report Leak, Leak History, Settings/Profile) · KPI/sensor cards and status
pills/badges (default/warning/critical/offline) for at-a-glance state ·
Leaflet maps colored by status · time-series charts (real vs. predicted) ·
filterable tables · labeled forms with validation states · consistent
button states. Match existing spacing/color tokens/typography rather than
introducing a new style. High-contrast/low-cognitive-load for Luca-facing
views; denser/richer detail for Sara-facing views.

## Non-Functional

Usable with minimal training · smooth on standard office hardware · handle
slow/missing mock data gracefully (placeholder/empty states, don't break) ·
runs on major desktop browsers · stays responsive and usable at common
desktop resolutions.

## Task Behavior

Touch the minimum files needed · briefly explain non-obvious decisions ·
preserve existing conventions · no unrelated refactors · explain any new
dependency before using it · prefer straightforward, readable React
patterns over advanced abstractions, optimizing for maintainability and
understandability — this is a beginner-maintainable academic prototype,
not a production system.

## Constraints (Do Not)

No backend/DB/auth/deployment config · no real AI/chatbot logic (mock
responses only) · no folder restructuring or feature-based reorg · no
visual style changes (extend, don't replace) · no swapping Leaflet/OSM for
another map provider · no renaming/relocating existing files without cause ·
no building placeholder functionality outside the current task's scope.

## Document Stability

This file is fixed project documentation, not a work-in-progress note. Do
not rewrite, reorganize, or "improve" it — propose changes explicitly and
separately if something here seems wrong, rather than editing it inline.
