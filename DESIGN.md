---
name: GROUNDROID
description: A calm, Apple-inspired research workspace for traceable soil-condition mapping.
colors:
  field-green: "#2f7658"
  field-green-strong: "#1f513e"
  field-green-soft: "#e3efe8"
  mineral-canvas: "#f2f4f1"
  paper-surface: "#ffffff"
  specimen-surface: "#f7f8f6"
  map-surface: "#edf3ee"
  ink: "#18251f"
  ink-muted: "#617069"
  mineral-border: "#d9dfdb"
  warning-ochre: "#a86522"
  danger-clay: "#bd3f43"
  information-blue: "#3c6f91"
typography:
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Segoe UI, sans-serif"
    fontSize: "clamp(21px, 2vw, 26px)"
    fontWeight: 720
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 710
    letterSpacing: "-0.025em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Segoe UI, sans-serif"
    fontSize: "12px"
    fontWeight: 670
rounded:
  sm: "10px"
  md: "12px"
  lg: "16px"
  pill: "999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  6: "24px"
  8: "32px"
components:
  button-primary:
    backgroundColor: "{colors.field-green}"
    textColor: "{colors.paper-surface}"
    rounded: "{rounded.md}"
    padding: "0 17px"
    height: "42px"
  button-primary-hover:
    backgroundColor: "#28694e"
    textColor: "{colors.paper-surface}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.map-surface}"
    textColor: "{colors.field-green-strong}"
    rounded: "{rounded.md}"
    padding: "0 17px"
    height: "42px"
  input:
    backgroundColor: "#f8f9f7"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 13px"
    height: "44px"
  card:
    backgroundColor: "{colors.paper-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
    usage: "Reserved for charts and other bounded analytical surfaces"
  status-success:
    backgroundColor: "{colors.field-green-soft}"
    textColor: "{colors.field-green-strong}"
    rounded: "{rounded.pill}"
    padding: "2px 9px"
---

# Design System: GROUNDROID

## Overview

**Creative North Star: "The Botanical Specimen Folio"**

GROUNDROID is an Apple-inspired Operate-mode research workspace: calm, precise, and dense enough for serious analysis without feeling clinical. Its mineral canvas, open sections, and fine rules recall a carefully catalogued specimen folio, while field green marks the live path through experiments, maps, and controls.

The field map is the signature expression. Spatial evidence leads; controls remain familiar, compact, and close to the data they affect. Spacing and hairline dividers organize routine content; opaque containment is reserved for bounded data surfaces such as charts, tables, maps, and upload targets.

**Key Characteristics:**

- Calm mineral neutrals with restrained botanical green.
- System typography with compact, legible research density.
- Open content sections separated by spacing and mineral hairlines.
- Spatial maps and traceable provenance as primary visual anchors.
- Responsive drawer navigation and explicit accessibility fallbacks.

## Colors

The palette combines cool mineral neutrals with a single botanical green voice; ochre, clay, and blue appear only when status semantics require them.

### Primary

- **Field Green:** The primary action, route, progress, active-navigation, and completed-sample color.
- **Deep Field Green:** High-emphasis green for text, active states, and the botanical brand mark.
- **Pressed Leaf:** A soft green wash for selected, successful, and low-emphasis interactive states.

### Secondary

- **Warning Ochre:** Reserved for caution and simulated-workflow notices.
- **Danger Clay:** Reserved for destructive actions and errors.
- **Information Blue:** Reserved for informational and imported-data semantics.

### Neutral

- **Mineral Canvas:** The workspace ground behind all research surfaces.
- **Paper Surface:** The opaque control and bounded analytical surface.
- **Specimen Surface:** A subtle neutral layer for quiet containers.
- **Map Surface:** The pale field ground and secondary-control fill.
- **Ink:** Primary text and decisive labels.
- **Muted Ink:** Supporting copy, metadata, and legends.
- **Mineral Border:** Hairlines, dividers, and high-contrast fallbacks.

**The One Green Voice Rule.** Field green is the only general-purpose accent; semantic ochre, clay, and blue never become decoration.

## Typography

**Display Font:** System UI (`-apple-system`, `BlinkMacSystemFont`, `SF Pro Text`, `Segoe UI`, sans-serif)
**Body Font:** System UI (`-apple-system`, `BlinkMacSystemFont`, `SF Pro Text`, `Segoe UI`, sans-serif)

**Character:** The single system stack is neutral, immediate, and platform-aware. Tight negative tracking sharpens headings and metrics; supporting text stays compact but readable.

### Hierarchy

- **Headline:** Page identity only; fluid sizing, strong weight, tight tracking.
- **Title:** Panel headings; compact and decisive.
- **Body:** Default interface copy and research content.
- **Label:** Field labels, metadata, legends, and small controls; use stronger weight instead of decorative casing, except established table and sidebar section headers.
- **Metric:** Large numeric findings use tabular figures and tight tracking to support comparison.

**The Instrument Type Rule.** Typography behaves like research instrumentation: stable, concise, and optimized for scanning rather than editorial flourish.

## Layout

The desktop shell uses a fixed 238px sidebar and a fluid workspace capped at 1680px. The sticky header and main content share responsive horizontal padding of `clamp(20px, 2.5vw, 38px)`. Primary page stacks use 20px vertical rhythm; analytical grids use 18px gaps and collapse progressively as their content becomes constrained.

At 760px and below, the sidebar becomes an off-canvas drawer with a scrim, the header wraps, and major analytical grids become one column. Summary metrics remain two-up until 460px, then collapse to one column. Tabs scroll horizontally or distribute across compact widths; map legends wrap and floating controls remain reachable.

**The Spatial Lead Rule.** Give maps and plots the largest useful region; supporting controls occupy the smallest column that preserves readable labels and 44px touch targets.

## Elevation & Depth

The system is flat by default. Spacing, alignment, and hairline rules establish hierarchy; translucent material belongs only to persistent chrome and floating controls. Inputs, tables, and ordinary sections rely on strokes rather than shadows, while a chart may use subtle elevation when it needs visual isolation.

### Shadow Vocabulary

- **Analytical Surface:** A 1px contact shadow plus a broad, low-opacity green-black shadow used sparingly for self-contained charts.
- **Floating:** A deeper ambient shadow for the mobile drawer.
- **Control Lift:** Compact green-tinted elevation for primary buttons and floating map controls.

**The Selective Glass Rule.** Use translucency only for the sidebar, sticky header, navigation scrim, and floating map controls; bounded data surfaces remain opaque.

## Shapes

Corners are gently rounded, never pillowy: 10px for small controls, 12px for grouped controls and navigation, and 16px only for bounded analytical surfaces. Ordinary sections remain open and square. Pills are reserved for statuses, provenance, and connection state. The botanical mark is the only intentionally organic silhouette; maps use rectilinear plots, fine grids, circular sample points, and compact square rover markers.

**The Quiet Geometry Rule.** Rounded corners soften the workspace without turning analytical containers into decorative capsules.

## Components

### Buttons

- **Shape:** Compact rounded rectangle with a 42px minimum height.
- **Primary:** Field green with white text and restrained green-tinted lift.
- **Hover / Focus:** Darken on hover; use the shared visible three-pixel focus outline; compress subtly on active press.
- **Secondary / Quiet / Danger:** Secondary uses a pale mineral-green fill and inset stroke; quiet stays transparent until hover; danger uses clay red only for destructive actions.

### Chips

- **Style:** Status and provenance badges use compact 24–25px pills with semantically tinted backgrounds.
- **State:** Provenance remains visibly labeled; do not rely on color alone to distinguish demo, imported, algorithm-generated, or real data.

### Sections / Containers

- **Default Section:** Transparent, square, and separated with whitespace plus a mineral top rule.
- **Contained Surface:** Use opaque paper white and a gently rounded large corner only when a chart or bounded interaction needs isolation.
- **Shadow Strategy:** Flat by default; increased-contrast mode gives contained surfaces a clear inset border.
- **Internal Padding:** Open sections use vertical padding; contained chart surfaces use 20px, reducing to 16px on compact screens.

### Inputs / Fields

- **Style:** Familiar native-shaped fields with a 44px minimum height, subtle neutral fill, and inset hairline.
- **Focus:** Green inset stroke plus a soft outer focus halo.
- **Error / Disabled:** Errors switch the stroke and message to danger clay; disabled buttons retain shape and reduce opacity.

### Navigation

The desktop sidebar uses 46px rows and icon tiles, with the active destination shown as an opaque white selection and green icon tile. At compact widths it becomes a focus-managed drawer behind a dimmed scrim. The sticky header keeps the experiment selector visible and exposes the menu control only when the drawer is active.

### Field Map

The field map is the signature component: pale specimen ground, fine botanical grid, dashed route, completed and pending point states, and translucent floating zoom controls. Sample points expose generous invisible hit targets, keyboard interaction, visible focus, and an explicit inspected-point readout.

## Do's and Don'ts

### Do:

- **Do** let spatial evidence lead and keep its controls adjacent to the map.
- **Do** keep provenance labels visible wherever simulated, imported, generated, and real data could be confused.
- **Do** preserve familiar web controls, visible focus, 44px targets, responsive drawer behavior, and reduced-motion, reduced-transparency, and increased-contrast fallbacks.
- **Do** use open sections and dividers for routine research content; contain only maps, charts, tables, and upload targets that need a boundary.

### Don't:

- **Don't** wrap every metric, form group, or content section in a rounded card.
- **Don't** apply translucency to tables, form fields, or plot surfaces.
- **Don't** use semantic warning, danger, or information colors as decorative accents.
- **Don't** introduce ornamental typography, oversized marketing treatments, or unfamiliar control patterns into the Operate-mode workspace.
- **Don't** imply that illustrative or simulator data is a real measurement.
