# GROUNDROID Soil Condition Mapping System

Research-oriented frontend for configuring field experiments, validating reference datasets, preparing illustrative sampling plans, simulating rover missions, viewing reconstructed soil layers, and evaluating demo results.

## Run locally

```powershell
cd web
npm install
npm run dev
```

Production and verification commands:

```powershell
npm run typecheck
npm test -- --run
npm run build
npm run e2e
```

## Data provenance

- **Demo data** is deterministic fixture content for UI evaluation.
- **Imported data** passed complete client-side CSV validation.
- **Algorithm-generated** marks illustrative sampling output; the frontend does not perform scientific SVD/POD or QR pivoting.
- **Real measurement** is reserved for a future authenticated hardware/backend adapter and is not emitted by the demo application.

The rover controls are simulator-only. No action is delivered to hardware, and the emergency-stop control is not a physical safety mechanism.

## Architecture

The React/TypeScript app lives in `web/`. Shared experiment state is reducer-based, visualizations use Plotly's cartesian-only distribution, and adapter interfaces in `web/src/services/` define the future FastAPI HTTP/WebSocket boundary. `backend/` and `firmware/` contain integration notes only; this repository does not yet implement either runtime.
