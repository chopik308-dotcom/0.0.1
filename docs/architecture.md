# Architecture

## Scope

Phase 0/1 scaffold only: architecture slots, contracts, and documentation for a local-first NEOcortex system.

## Runtime shape

- **apps/zero-room-web**: будущий Next.js UI (Zero Room, Session Shell, Entourage Channel, Subject Map, Timeline).
- **services/api**: будущий FastAPI edge API для UI и модулей.
- **services/ingestion-worker**: импорт markdown/txt, вызов semantic pipeline, фиксация revisions.
- **services/entourage-runtime**: mock runtime для канала Entourage.
- **packages/semantic-core**: deterministic + probabilistic pass interfaces.
- **packages/map-engine**: map projection/view model слой.
- **packages/llm-abstraction**: provider interfaces (mock now, Ollama later).
- **packages/shared-types**: canonical domain schemas/types.
- **packages/design-tokens**: палитра и UI tokens.
- **packages/thesaurus-slot**: slot для gap filling.
- **packages/soma-slot**: slot для body signals без смешения с cognition.
- **packages/fractal-core-slot**: extension point под future FV/fractal core.

## Data and persistence

- `data/seed-notes`: локальные тестовые заметки для ingestion.
- SQLite планируется как первичное хранилище phase 1/2.

## Current state labels

- **Implemented now**:
  - phase 0 visual canonization doc (`docs/phase-0-visual-canon.md`)
  - phase 0 UI shell with 4 canonicalized screens (`apps/zero-room-web`)
  - FastAPI mock loop for status/import/map/entourage (`services/api`)
  - folder scaffold, docs, contracts, seed data
- **Mock now**: deterministic/probabilistic extraction logic and entourage response are stubbed but executable.
- **Deferred**: vector storage runtime, stronger entourage orchestration, fractal/vector algorithms.
