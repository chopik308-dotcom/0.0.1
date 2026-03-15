# Module Map

## Apps

- `apps/zero-room-web`: пользовательский интерфейс и session entry loop.
- `apps/obsidian-bridge`: skeleton app/plugin workspace для обмена markdown + map context.

## Services

- `services/api`: HTTP API, contracts boundary.
- `services/entourage-runtime`: orchestration канала Entourage.
- `services/ingestion-worker`: import pipeline и revision generation.

## Packages

- `packages/shared-types`: canonical glossary entities + transport contracts.
- `packages/semantic-core`: deterministic/probabilistic extraction.
- `packages/map-engine`: map projection / nodes-links graph assembly.
- `packages/llm-abstraction`: provider abstraction (mock/Ollama later).
- `packages/design-tokens`: color, typography, density tokens.
- `packages/thesaurus-slot`: thesaurus schema + stub integration point.
- `packages/soma-slot`: soma schemas + separation contracts.
- `packages/fractal-core-slot`: future fractal adapter contracts.

## Data

- `data/seed-notes`: ingestion fixtures for local demo loop.
- `data/fixtures`: reserved structured fixtures.
