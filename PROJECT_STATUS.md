# Project Status

Update this file at the end of every task session (Gemini: do this yourself before
finishing, per the instruction at the end of each task prompt).

## Completed
- Task 01.1 — Login Page (login screen reproducing design, Card component, and client-side routing with `react-router-dom`)
- Task 02.1 — Top Bar & Navigation (persistent left sidebar plus top bar, expandable Aqueduct hierarchy from mock data, active item and title state)
- Task 02.2 — Overview Status Cards (four KPI control-room status cards in a responsive grid, colored accent bars, and dynamic metrics derived from mock districts)

## In progress / current task
Task 02.3 (`Study-Materials/Tasks/02_Layout/02.3-*.md`)

## Finished tasks (by ID)
- 01.1
- 02.1
- 02.2

## Recommended next task
01.1 → then 02.1, 02.2, 02.3 → 03.1, 03.2 → 04.1, 04.2, 04.3 → 05.1 → 06.1 → 07.1 → 08.1
(see `Study-Materials/Tasks/README.md` for why this order)

## Mock data state
- `src/data/mockData.ts` — districts only (id, name, status, lat, lng, parentId). Not yet
  extended with sensor counts, leakage probability, or last-update fields (needed from
  Task 03.2 onward).
- No shared leak-reports data source yet (needed from Task 05.1 onward, read by 06.1).
- No new mock data fields or shared data sources were added in Tasks 01.1, 02.1, or 02.2.

## Branch
main
