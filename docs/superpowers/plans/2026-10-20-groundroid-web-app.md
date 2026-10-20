# Groundroid Web Application Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive six-screen Groundroid research frontend with deterministic demo data, shared experiment state, scientific visualizations, CSV validation, and future backend/rover integration seams.

**Architecture:** A Vite React application organizes shared domain state behind a reducer/context boundary and routes feature screens through a persistent app shell. Plotly-based field visualizations and typed simulated services are reused across screens; provenance metadata prevents demo and generated values from appearing real.

**Tech Stack:** React, TypeScript, Vite, Tailwind CSS, React Router, Lucide React, Plotly.js, Vitest, Testing Library, Playwright

**Spec:** `docs/superpowers/specs/2026-10-20-groundroid-design.md`

## Global Constraints

- Use the approved palette: `#168451`, `#145C3B`, `#EAF5EE`, `#F7F9F8`, `#FFFFFF`, `#172B24`, `#718078`, `#E3EAE6`, `#E8A23B`, and `#DC4C4C` through semantic tokens.
- Use Inter, an 8px spacing rhythm, Lucide icons, restrained shadows, and the approved compact scientific visual language.
- Preserve the six specified navigation labels and page titles.
- Default field geometry is 20m × 20m and 400m²; dimensions remain configurable.
- Label every value as demo, imported, algorithm-generated, or real where provenance could be ambiguous.
- Do not perform real SVD/POD, QR pivoting, reconstruction, hardware commands, or safety claims.
- Keep frontend service interfaces compatible with future FastAPI HTTP/WebSocket adapters.
- Support laptop, desktop, tablet, and mobile layouts with visible keyboard focus and reduced-motion handling.

## Review Focus

- Malformed, empty, oversized, or partially valid CSV input must produce actionable validation without corrupting active experiment data; covered by Task 5 tests.
- Planner mode/point counts outside dataset bounds must block execution and explain valid values; covered by Task 6 tests.
- Demo or disconnected rover controls must never report a hardware command as delivered; covered by Task 7 tests.
- Missing experiments or datasets must show useful empty states rather than fabricated zero readings; covered by Tasks 3–9 component tests.
- Narrow screens and long table values must remain navigable without clipping controls or plots; covered by Task 10 Playwright checks.

---

## File Map

- `web/src/app/`: router, providers, and shell composition.
- `web/src/components/layout/`: sidebar, header, responsive navigation, page framing.
- `web/src/components/ui/`: cards, badges, buttons, tabs, tables, fields, progress, provenance labels, states.
- `web/src/components/field/`: shared coordinate plot and map controls.
- `web/src/components/charts/`: Plotly wrapper and scientific chart variants.
- `web/src/features/*/`: one directory per route with page, focused components, and tests.
- `web/src/state/`: experiment reducer/context and selectors.
- `web/src/services/`: interfaces, demo adapters, future API placeholder.
- `web/src/data/`: deterministic fixtures only.
- `web/src/types/`: shared domain contracts.
- `web/src/utils/`: validation, CSV, export, formatting, and math helpers.
- `web/src/styles/`: semantic tokens and global accessibility/responsive rules.

### Task 1: Scaffold the Tested Application Shell and Design Tokens

**Files:**
- Create: `web/package.json`, `web/vite.config.ts`, `web/tsconfig*.json`, `web/index.html`
- Create: `web/src/main.tsx`, `web/src/app/App.tsx`, `web/src/app/routes.tsx`
- Create: `web/src/components/layout/AppShell.tsx`, `Sidebar.tsx`, `TopHeader.tsx`
- Create: `web/src/components/ui/Button.tsx`, `Card.tsx`, `StatusBadge.tsx`
- Create: `web/src/styles/index.css`, `web/src/test/setup.ts`
- Test: `web/src/app/App.test.tsx`

**Interfaces:**
- Produces: `AppShell`, route definitions for `/`, `/field-data`, `/sampling-planner`, `/rover-control`, `/soil-maps`, `/evaluation`, and shared UI primitives.

- [ ] Write a route-shell test asserting all six navigation labels, semantic landmarks, active-route state, and mobile-menu accessible name.
- [ ] Run `npm test -- --run App.test.tsx` and verify it fails before the shell exists.
- [ ] Scaffold Vite React TypeScript and install the approved runtime/dev dependencies.
- [ ] Implement semantic CSS tokens, Inter loading/fallback, responsive shell, five interaction states, and reduced-motion overrides.
- [ ] Run the focused test, `npm run typecheck`, and `npm run build`; require zero failures.

### Task 2: Define Domain Types, Deterministic Demo Data, and Shared State

**Files:**
- Create: `web/src/types/domain.ts`, `web/src/types/services.ts`
- Create: `web/src/data/mockData.ts`
- Create: `web/src/state/experimentReducer.ts`, `ExperimentProvider.tsx`, `selectors.ts`
- Test: `web/src/state/experimentReducer.test.ts`

**Interfaces:**
- Produces: `DataProvenance`, `Experiment`, `SoilMeasurement`, `SamplingPoint`, `RoverMission`, `SoilLayer`, `EvaluationDataset`; `useExperiment()` and typed reducer actions.
- Consumes: shell provider slot from Task 1.

- [ ] Write reducer tests for experiment selection, configuration updates, validated imports, simulated plan storage, mission advancement/reset, and provenance preservation.
- [ ] Run the focused test and verify missing types/reducer failures.
- [ ] Implement immutable state transitions and deterministic 20m × 20m fixtures.
- [ ] Wrap the router with `ExperimentProvider` and expose selectors for active experiment, progress, and latest reading.
- [ ] Run focused tests, typecheck, and build.

### Task 3: Build Shared Scientific UI, Field Plot, States, and Provenance Components

**Files:**
- Create: `web/src/components/ui/{DataTable,EmptyState,ErrorState,Field,ProgressBar,ProvenanceBadge,Tabs}.tsx`
- Create: `web/src/components/charts/Plot.tsx`
- Create: `web/src/components/field/FieldPlot.tsx`, `FieldPlotControls.tsx`
- Test: `web/src/components/field/FieldPlot.test.tsx`, `web/src/components/ui/ProvenanceBadge.test.tsx`

**Interfaces:**
- Produces: `FieldPlotProps` supporting points, rover, route, selected point, click handling, proportional axes, zoom/reset; accessible reusable states and tables.
- Consumes: domain types from Task 2.

- [ ] Write tests for marker semantics, provenance text, reset controls, empty plot state, and non-color status indicators.
- [ ] Run tests and confirm the missing components fail.
- [ ] Implement a responsive Plotly wrapper with stable sizing and lazy rendering.
- [ ] Implement field and UI primitives using only semantic tokens.
- [ ] Run component tests, typecheck, and build.

### Task 4: Implement the Field Dashboard

**Files:**
- Create: `web/src/features/dashboard/DashboardPage.tsx`, `SummaryCard.tsx`, `RoverSummary.tsx`, `RecentActivity.tsx`
- Test: `web/src/features/dashboard/DashboardPage.test.tsx`

**Interfaces:**
- Consumes: selectors from Task 2 and `FieldPlot` from Task 3.
- Produces: complete `/` route with quick links to planner and rover control.

- [ ] Write tests for 400m²/20m × 20m demo values, completed count, simulated labels, quick links, and no-experiment empty state.
- [ ] Verify focused-test failure.
- [ ] Implement the reference-inspired laptop grid and responsive stacked variants.
- [ ] Verify tests, typecheck, and build.

### Task 5: Implement Field Configuration and Safe CSV Import

**Files:**
- Create: `web/src/features/field-data/FieldDataPage.tsx`, `FieldConfigurationForm.tsx`, `CsvUpload.tsx`, `DatasetPreview.tsx`
- Create: `web/src/utils/csv.ts`, `web/src/utils/datasetValidation.ts`
- Test: `web/src/utils/datasetValidation.test.ts`, `web/src/features/field-data/FieldDataPage.test.tsx`

**Interfaces:**
- Produces: `parseReferenceCsv(text: string): CsvParseResult` and `validateReferenceRows(rows): DatasetValidationResult` with row/column errors.
- Consumes: experiment update/import actions from Task 2.

- [ ] Write tests for BOMs, whitespace, missing coordinates, absent soil properties, blank/non-numeric cells, duplicate IDs, partial rows, and valid N/P/K input.
- [ ] Verify focused-test failures.
- [ ] Implement dependency-free CSV parsing/validation and retain active state on failure.
- [ ] Implement accessible drag/drop/file input, success/warning/error summaries, configuration validation, and preview table.
- [ ] Verify tests, typecheck, and build.

### Task 6: Implement the Simulated Data-Driven Sampling Planner

**Files:**
- Create: `web/src/features/sampling-planner/SamplingPlannerPage.tsx`, `WorkflowStepper.tsx`, `PlannerConfiguration.tsx`, `PlannerResults.tsx`
- Create: `web/src/services/samplingService.ts`
- Test: `web/src/services/samplingService.test.ts`, `web/src/features/sampling-planner/SamplingPlannerPage.test.tsx`

**Interfaces:**
- Produces: `SamplingService.runExample(config, dataset): Promise<SamplingPlan>`; explicitly returns `algorithm-generated` provenance.
- Consumes: validated datasets and plan-storage action from Task 2.

- [ ] Write tests for missing datasets, invalid retained modes, excessive point counts, deterministic example output, and generated provenance.
- [ ] Verify focused-test failures.
- [ ] Implement the five-stage workflow, configuration validation, simulated status, field plot, diagnostics, and coordinate table.
- [ ] Ensure copy never claims real SVD/POD or QR execution.
- [ ] Verify tests, typecheck, and build.

### Task 7: Implement Safe Rover Mission Simulation

**Files:**
- Create: `web/src/features/rover-control/RoverControlPage.tsx`, `RoverStatus.tsx`, `ManualControls.tsx`, `MissionLog.tsx`
- Create: `web/src/services/roverService.ts`, `demoRoverService.ts`
- Test: `web/src/services/demoRoverService.test.ts`, `web/src/features/rover-control/RoverControlPage.test.tsx`

**Interfaces:**
- Produces: `RoverService` with connect-state, command, mission, and subscription contracts; demo adapter returns simulated acknowledgements only.
- Consumes: mission actions and field plot.

- [ ] Write tests proving disconnected commands are rejected, demo commands are labeled simulated, mission bounds are enforced, and emergency stop logs the safety disclaimer.
- [ ] Verify focused-test failures.
- [ ] Implement status/measurement cards, navigation map, manual controls, mission controls, progress, command log, and disconnection warnings.
- [ ] Disable unsupported battery/return-to-start displays unless fixture capabilities explicitly enable them.
- [ ] Verify tests, typecheck, and build.

### Task 8: Implement Soil Heatmaps and Property Controls

**Files:**
- Create: `web/src/features/soil-maps/SoilMapsPage.tsx`, `SoilMapControls.tsx`, `MeasurementTable.tsx`
- Create: `web/src/components/charts/SoilHeatmap.tsx`
- Test: `web/src/features/soil-maps/SoilMapsPage.test.tsx`

**Interfaces:**
- Produces: heatmap props for moisture, compaction, N, P, and K with units, provenance, overlays, and reference/reconstructed variants.
- Consumes: soil layers and sampling points from Task 2.

- [ ] Write tests for property switching, units, simulated labels, marker toggles, unavailable-map states, and N/P/K separation.
- [ ] Verify focused-test failure.
- [ ] Implement Plotly heatmap, numerical legend, hover values, boundaries, zoom/reset, supporting measurements, and reconstruction status.
- [ ] Verify tests, typecheck, and build.

### Task 9: Implement Research Evaluation and Exports

**Files:**
- Create: `web/src/features/evaluation/EvaluationPage.tsx`, `SensorAccuracy.tsx`, `ReconstructionAccuracy.tsx`, `SystemEfficiency.tsx`
- Create: `web/src/components/charts/{AccuracyScatter,ErrorCurve}.tsx`
- Create: `web/src/utils/export.ts`, `web/src/utils/metrics.ts`
- Test: `web/src/utils/metrics.test.ts`, `web/src/features/evaluation/EvaluationPage.test.tsx`

**Interfaces:**
- Produces: `calculateRmse(reference, measured): number | null` and safe CSV export helpers.
- Consumes: evaluation datasets and provenance from Task 2.

- [ ] Write tests for length mismatch, empty arrays, RMSE calculation, export escaping, multiple experiments, and simulated-result labeling.
- [ ] Verify focused-test failures.
- [ ] Implement the three evaluation sections, charts, accessible tables, experiment comparison, and guarded exports.
- [ ] Verify tests, typecheck, and build.

### Task 10: Integration Boundaries, Responsive Smoke Tests, Documentation, and Audit

**Files:**
- Create: `web/src/services/api.ts`, `web/src/services/contracts.ts`
- Create: `web/e2e/routes.spec.ts`, `web/playwright.config.ts`
- Create: `README.md`, `backend/README.md`, `firmware/README.md`
- Modify: all routes/components only where integration checks reveal defects.

**Interfaces:**
- Produces: typed future HTTP/WebSocket adapter contracts and documented replacement points.
- Consumes: every prior task deliverable.

- [ ] Write route smoke tests for all six screens at 1366×768 and 375×812, including navigation, no horizontal page overflow, visible controls, and stable square plots.
- [ ] Add keyboard traversal, focus-visible, reduced-motion, table-overflow, empty/error-state, and provenance assertions where automated coverage is possible.
- [ ] Run `npm test -- --run`, `npm run typecheck`, and `npm run build`; require zero failures.
- [ ] Run Playwright smoke tests when browser binaries are available; otherwise report the exact unverified command.
- [ ] Run the design audit against the approved visual and interaction theses; fix introduced critical/important findings in one bounded pass.
- [ ] Document installation, development/build commands, demo behavior, provenance meanings, and pending FastAPI/ESP32 integration.

## Self-review Result

- All sixteen source-specification sections map to Tasks 1–10 or the design specification.
- Shared type/service names are consistent across task interfaces.
- Risky inputs from the Review Focus each have a named owning test.
- Algorithm and hardware boundaries remain explicit and are never simulated as real.
- The plan deliberately avoids backend/firmware implementation and unrelated authentication/cloud work.

