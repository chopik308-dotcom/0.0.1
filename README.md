# NEOcortex / Exocortex Scaffold

Репозиторий теперь содержит не только структуру, но и **рабочий phase-0/phase-1 minimal loop**:

- phase 0 канонизация 4 экранов (visual + semantics)
- локальный UI shell Zero Room
- локальный FastAPI mock для status/import/map/entourage

## Репозиторий

```text
.
├─ apps/
│  ├─ zero-room-web/
│  └─ obsidian-bridge/
├─ services/
│  ├─ api/
│  ├─ entourage-runtime/
│  └─ ingestion-worker/
├─ packages/
│  ├─ semantic-core/
│  ├─ map-engine/
│  ├─ llm-abstraction/
│  ├─ shared-types/
│  ├─ design-tokens/
│  ├─ thesaurus-slot/
│  ├─ soma-slot/
│  └─ fractal-core-slot/
├─ data/
│  ├─ seed-notes/
│  └─ fixtures/
├─ docs/
│  ├─ phase-0-visual-canon.md
│  ├─ ui-phase-0-notes.md
│  ├─ architecture.md
│  ├─ module-map.md
│  ├─ roadmap.md
│  ├─ prompts.md
│  ├─ glossary.md
│  ├─ session-loop.md
│  ├─ metrics.md
│  ├─ stabilization-gates.md
│  └─ future-directions.md
└─ artifacts/
```

## Quick start (local)

```bash
npm run dev:bootstrap
```

Потом для обычного старта:

```bash
npm run dev
```

Дополнительно:
- `npm run dev:api`
- `npm run dev:ui`

После установки зависимостей API (один раз):

```bash
python3 scripts/dev.py --bootstrap
```

(первый запуск с установкой зависимостей; затем можно просто `python3 scripts/dev.py`)

Запустятся сразу:
- API: `http://127.0.0.1:8000` (`/docs`)
- UI: `http://127.0.0.1:4173`

Опции:
- `python3 scripts/dev.py --api-only`
- `python3 scripts/dev.py --bootstrap --api-only` (если venv ещё нет)
- `python3 scripts/dev.py --ui-only`

1) API (Linux/macOS, bash):

```bash
cd services/api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 127.0.0.1 --port 8000
```

API (Windows, PowerShell):

```powershell
cd services/api
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --host 127.0.0.1 --port 8000
```

2) UI (new terminal):

```bash
cd apps/zero-room-web
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173`.

API checks:
- `http://127.0.0.1:8000/` (API landing payload)
- `http://127.0.0.1:8000/docs` (Swagger UI)

## Что уже работает

- 4 canonicalized screens with subject-to-self copy.
- Import Notes -> API ingest from `data/seed-notes`.
- Deterministic + probabilistic mock pass.
- Map snapshot + timeline events + revision counting.
- Entourage mock reply channel with mini state output.


## Как проверять PR без merge

Коротко: **код в вашей основной ветке/вебе не меняется, пока PR не смёржен**.

Рекомендованный flow проверки:

1. Открыть PR и смотреть `Files changed` (даже при конфликте merge).
2. Локально переключиться на ветку PR и запустить проект:
   - API: `cd services/api && python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && uvicorn main:app --host 127.0.0.1 --port 8000`
   - UI: `cd apps/zero-room-web && python3 -m http.server 4173`
3. Проверить тесты на ветке PR: `cd services/api && python3 -m unittest tests/test_semantic_pipeline.py`.
4. Только после проверки решать конфликты и merge.

Если в GitHub показаны конфликты (`README.md`, `services/api/README.md`), это значит только то, что Git не может автоматически склеить тексты. Сам PR-код при этом уже можно полноценно смотреть и запускать в ветке PR.

## Legacy

`artifacts/` сохранён как история предыдущих Figma/экспортных артефактов.


## Testing (no external deps)

```bash
cd services/api
python3 -m unittest tests/test_semantic_pipeline.py
```
