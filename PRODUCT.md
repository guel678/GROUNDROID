# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

GROUNDROID is designed for researchers and evaluators preparing, simulating, and reviewing soil-condition mapping experiments. The primary workflow is a desktop research workspace, with responsive access available for field-side review.

## Product Purpose

GROUNDROID brings field configuration, sampling-plan preparation, simulated rover operations, reconstructed soil maps, and evaluation results into one traceable workspace. Success means a researcher can understand the current experiment, distinguish data provenance, move between planning and evaluation without losing context, and clearly identify which outputs are illustrative rather than measured by live hardware.

## Positioning

The product connects a spatial field model, sampling workflow, rover mission state, soil-property layers, and reconstruction evaluation around one active experiment instead of presenting each as an unrelated analysis tool.

## Operating Context

The interface is used as a research dashboard with dense spatial and numerical information. Users configure field dimensions, validate CSV inputs, generate illustrative sampling plans, operate a simulator-only rover workflow, inspect reconstructed soil layers, and compare accuracy and efficiency measures.

## Capabilities and Constraints

- The frontend is a React and TypeScript web application in `web/`.
- Shared experiment state is reducer-based, and charts use Plotly's cartesian-only distribution.
- Demo data is deterministic fixture content for interface evaluation.
- Imported data must pass client-side CSV validation.
- Algorithm-generated output is illustrative; the frontend does not perform scientific SVD/POD or QR pivoting.
- Real measurements are reserved for a future authenticated backend and hardware adapter.
- Rover controls affect a simulator only and are not a physical safety mechanism.
- The existing routes, research terminology, provenance labels, and functional behavior must remain intact during visual redesign.

## Brand Commitments

- Preserve the `GROUNDROID` name and its connection to soil-condition mapping.
- The interface should feel credible, calm, precise, and suitable for research use.
- Apple-inspired design means applying clarity, hierarchy, responsiveness, accessible controls, and restrained material depth to the web; it does not mean presenting the product as a native Apple application.

## Evidence on Hand

- Deterministic fixture data and complete interface flows are available in `web/src/data/` and `web/src/features/`.
- Existing tests cover routes, state, utilities, services, charts, and core interface components.
- The repository contains no validated field study, production hardware connection, customer proof, or authenticated backend; the interface must not imply otherwise.

## Product Principles

1. Keep provenance visible wherever data could be mistaken for a live measurement.
2. Make the active experiment and current mission state easy to understand at a glance.
3. Let spatial information lead, with controls placed close to the content they affect.
4. Prefer research clarity and traceability over decorative complexity.
5. Preserve a complete desktop workflow while remaining usable at compact widths.

## Accessibility & Inclusion

The web interface must support keyboard navigation, visible focus, semantic labels, reduced motion, reduced transparency, increased contrast, and layouts that remain usable with enlarged text and narrow viewports.
