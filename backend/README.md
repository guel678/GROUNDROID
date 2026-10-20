# Future FastAPI adapter

No backend is implemented in this prototype. A future FastAPI service should own persistence, validated CSV ingestion, scientific sampling/reconstruction algorithms, experiment history, and authenticated rover command routing.

Implement against the typed contracts in `web/src/services/contracts.ts`. Preserve provenance in every response and reject partial dataset writes transactionally. SQLite is suitable for the initial single-station research deployment; schema and migrations remain intentionally out of scope here.
