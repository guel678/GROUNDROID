# Groundroid Web Application Design

## Intent

Build a complete laptop-first research interface for the undergraduate thesis “GROUNDROID: Development of a Semi-Autonomous Rover for Soil-Condition Mapping Using Data-Driven Sparse Sampling and Spatial Reconstruction.” The frontend must let a researcher configure an experiment, inspect reference data, review simulated sparse-sampling outputs, operate a clearly labeled rover simulator, visualize simulated soil maps, and compare evaluation datasets.

The first release is a functional frontend prototype. It must never imply that simulated values are live rover telemetry or genuine research conclusions. Its boundaries must make later FastAPI, SQLite, scientific-computing, and ESP32-S3 integrations replaceable without redesigning the UI.

## Goals

- Deliver one runnable React application with six connected routes.
- Preserve the thesis workflow from reference-data preparation through evaluation.
- Make data provenance visible: demo, imported, algorithm-generated, or real.
- Provide useful empty, loading, validation, success, warning, disconnected, and error states.
- Keep domain state and service interfaces typed and independent from presentation components.
- Prioritize a 1366 × 768 laptop while remaining usable on mobile, tablet, and larger desktop screens.
- Meet keyboard, focus, contrast, reduced-motion, and semantic-control accessibility expectations.

## Non-goals

- No real SVD/POD, QR-pivoting, spatial reconstruction, or pseudoinverse computation in the browser.
- No FastAPI server, SQLite database, ESP32-S3 protocol, authentication, cloud service, or physical command dispatch.
- No fabricated experimental claims. Demo charts and maps remain visibly labeled as simulated.
- No web emergency-stop claim of physical safety; the UI repeats that hardware needs independent safeguards.

## Technical Architecture

The application lives in `GROUNDROID/web` and uses React, TypeScript, Vite, Tailwind CSS, React Router, Lucide React, and Plotly.js. Vitest and Testing Library cover domain logic and component behavior. Playwright supplies route and responsive smoke coverage if the installed browser runtime is available.

The application is divided into:

- `app/`: router, providers, and application composition.
- `features/`: cohesive page-specific UI and logic.
- `components/`: reusable layout, field-visualization, chart, and UI primitives.
- `state/`: experiment context and reducer actions.
- `services/`: simulated adapters plus future API contracts.
- `data/`: deterministic demo fixtures.
- `types/`: shared domain models and provenance types.
- `utils/`: CSV parsing, validation, formatting, and numeric helpers.
- `styles/`: Tailwind entrypoint, semantic tokens, and accessibility/motion rules.

No page talks directly to future HTTP or WebSocket endpoints. Pages call typed service interfaces. The demo adapters implement those interfaces locally.

## Visual Thesis

A light scientific field instrument with deep evergreen accents, Inter typography with tabular numerals, compact 8px-based spacing, crisp bordered cards, restrained elevation, and a subtle botanical field silhouette that grounds the product in soil research without becoming decoration-heavy.

The canonical palette begins with `#168451`, `#145C3B`, `#EAF5EE`, `#F7F9F8`, `#FFFFFF`, `#172B24`, `#718078`, `#E3EAE6`, `#E8A23B`, and `#DC4C4C`. Semantic tokens, not arbitrary page-level colors, expose these values.

Allowed patterns: compact scientific cards, hairline grid rules, tabular figures, subdued field-grid textures, and the botanical field silhouette shown in the approved reference.

## Interaction Thesis

Controls respond in 120–200ms with direct ease-out color, opacity, and restrained elevation changes; maps use explicit zoom/reset controls and informative hover states; route changes and scrolling remain stable with no decorative reveals, bounce, elastic motion, large hover scaling, or layout-property animation.

Reduced-motion users receive immediate state changes. Every interactive component supports default, hover, focus-visible, active, and disabled states where applicable.

## Application Shell

- Persistent desktop sidebar with the Groundroid brand, six Lucide-based navigation items, active-state highlighting, collapse support, and a mobile drawer.
- Header with page identity, experiment selector, explicit rover/demo connection state, local date/time, and compact account/tool controls.
- Main content uses semantic landmarks, responsive grids, a pale app canvas, and consistent card primitives.
- Navigation labels, routes, experiment fields, and the Groundroid name are stable public product language.

## Shared Data Model

`Experiment` owns field geometry, coordinate reference, optional boundary, datasets, selected sample points, rover mission, reconstructed layers, and evaluation results. Each dataset and measurement carries a `DataProvenance` value: `demo`, `imported`, `algorithm-generated`, or `real`.

The initial store exposes deterministic demo data and reducer actions for selecting an experiment, updating configuration, importing a validated dataset, preparing simulated sampling output, and advancing/resetting a simulated mission. Future adapters may hydrate the same domain types from FastAPI.

## Screen Designs

### Dashboard

Four summary cards lead into a proportionally correct 20m × 20m interactive field map. The page also presents rover information, provenance-aware latest readings, mission progress, recent activity, and quick links. Empty experiments replace metrics with an instructional state rather than zero-like fake readings.

### Field Data & Configuration

Configuration fields edit the active experiment. CSV upload accepts drag/drop and file selection, validates required coordinates and at least one supported soil property, reports row-level issues, and previews accepted rows. Imported values become shared experiment state only after validation succeeds.

### Data-Driven Sampling Planner

The five thesis stages appear as a clear workflow. Configuration validates retained modes and requested points against the selected dataset. “Run” generates deterministic example output through a simulated service and labels it as such. The map, diagnostics, and coordinate table consume that output.

### Rover Mission Control

The mission screen prioritizes connection provenance, mode, current waypoint, location, progress, latest measurement, and communication time. Directional and mission controls update only the frontend simulator. Commands requiring hardware remain disabled when the source is not an explicitly connected real rover. Emergency-stop copy states that independent physical safety remains required.

### Soil Condition Maps

Property tabs switch moisture, compaction, and N/P/K layers. Plotly renders a coordinate-aware heatmap with sampling overlays, units, hover values, field boundaries, zoom, and reset. Users can toggle markers and switch between reference/reconstructed views when both exist. Demo layers carry persistent simulated labels.

### System Performance Evaluation

Three sections cover sensor accuracy, reconstruction accuracy, and system efficiency. Plotly charts and accessible tables compare reference/rover values, sparse/fixed sampling, reconstruction error versus count, timing, waypoint arrival, and communications. CSV/figure export is offered only for data currently present.

## Responsive Behavior

- At desktop/laptop widths, maintain a fixed or collapsible sidebar and dense multi-column research layout.
- At tablet widths, reduce columns without shrinking controls below accessible targets.
- At mobile widths, use a drawer, stack cards, preserve square field plots, and put wide tables in labeled horizontal-scroll regions.
- Charts resize through their containers; data is never conveyed through color alone.

## Error and Safety Behavior

- Parsing errors name the missing column or row and preserve the selected file for correction.
- Invalid algorithm settings explain the valid range and block simulated execution.
- Disconnected rover controls do not pretend that commands were delivered.
- Failed simulated actions create visible contextual errors and command-log entries.
- Export failures preserve on-screen data and provide a retryable message.

## Verification

- TypeScript compilation and production build must complete with no unresolved imports.
- Unit tests cover CSV validation, reducer transitions, provenance labels, planner bounds, and simulator safety gates.
- Component tests cover navigation, route rendering, empty/error states, and control semantics.
- Route smoke checks cover all six screens at laptop and mobile widths.
- Visual review checks the supplied reference direction, plot proportions, overflow, keyboard focus, reduced motion, and 4.5:1 body-text contrast.

