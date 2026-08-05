# Project Status

Update this file at the end of every task session (Gemini: do this yourself before
finishing, per the instruction at the end of each task prompt).

## Completed
- Task 01.1 — Login Page (login screen reproducing design, Card component, and client-side routing with `react-router-dom`)
- Task 02.1 — Top Bar & Navigation (persistent left sidebar plus top bar, expandable Aqueduct hierarchy from mock data, active item and title state)
- Task 02.2 — Overview Status Cards (four KPI control-room status cards in a responsive grid, colored accent bars, and dynamic metrics derived from mock districts)
- Task 02.3 — Network Overview Panel (Map + Issues Table side by side, Leaflet polygon DMA shapes colored by effective health status, child anomaly propagation helper, and anomalies table)
- Task 02.4 — Overview: Recent Leak Events (aggregated view section, link to /leak-history, reusable static GrafanaScreenshot placeholder component, and source caption)
- Task 03.1 — City Details: Header + Network Map (Added `/aqueduct/:cityId` route within existing layout, wired Sidebar municipalities to React Router navigation, and built page header with dynamic district/sensor counts and effective status pill)
- Task 03.2 — City Details: Districts Table (Built sortable table component for child districts with leakage probability bars, extended mock data with `leakageProbability` and `lastSensorUpdate`, and added `/aqueduct/:cityId/:districtId` navigation)
- Task 04.1 — District Details: Header + Leak History (Added route `/aqueduct/:cityId/:districtId`, built DistrictDetails page with dynamic header and static Grafana placeholder for Leak History, updated Sidebar for district navigation)
- Task 04.2 — District Details: Sensor Data Charts (Installed chart.js and react-chartjs-2. Created SensorChart component with local generator for mock timeseries data. Integrated side-by-side layout in DistrictDetails with Leakage Probability placeholder.)
- Task 04.3 — District Details: Sensor Status Grid (Built SensorStatusCard component, added mock statuses to sensors array, and rendered dynamic grid in DistrictDetails with dashed placeholder.)
- Task 05.1 — Report Leak Form (Added `/report-leak` route, built `ReportLeak` component with form state, added `LeakReport` type and `leakReports` array to mock data, updated Sidebar to navigate.)
- Task 06.1 — Leak History (Added `/leak-history` route, built `LeakHistory` component with filter bar and paginated data table, implemented client-side sorting and filtering, and seeded mock data array. Fixed table header and badge casing to match design. Reverted generated mock addresses to `"Via ..."` placeholders as shown in design.)
## In progress / current task
Task 07.1

## Finished tasks (by ID)
- 01.1
- 02.1
- 02.2
- 02.3
- 02.4
- 03.1
- 03.2
- 04.1
- 04.2
- 04.3
- 05.1
- 06.1
## Recommended next task
01.1 → then 02.1, 02.2, 02.3 → 03.1, 03.2 → 04.1, 04.2, 04.3 → 05.1 → 06.1 → 07.1 → 08.1
(see `Study-Materials/Tasks/README.md` for why this order)

## Mock data state
- `src/data/mockData.ts` — extended with `sensorCount`, `leakageProbability`, and `lastSensorUpdate` in Tasks 03.1 and 03.2 for all districts and childless municipalities.
- `src/data/mockData.ts` — added `LeakReport` interface and `leakReports` array in Task 05.1, seeded with 12 mock historical records in Task 06.1 to persist submitted leak reports and drive the Leak History table.
- No new mock data fields or shared data sources were added in Tasks 01.1, 02.1, 02.2, 02.3, or 02.4.

## Branch
main
