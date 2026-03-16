# api service

FastAPI mock runtime for phase 1/2 loop:

- `GET /` (API landing payload, no 404)
- `GET /health`
- `GET /zero-room/status`
- `POST /ingestion/import-seed`
- `GET /map`
- `POST /entourage/reply`


После запуска `uvicorn` открывать `http://127.0.0.1:8000/` — это **API**, а не frontend.
Frontend запускается отдельно из `apps/zero-room-web` на `http://127.0.0.1:4173`.
Swagger: `http://127.0.0.1:8000/docs`.

## Run (Linux/macOS, bash)

```bash
cd services/api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 127.0.0.1 --port 8000
```

## Run (Windows, PowerShell)

```powershell
cd services/api
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --host 127.0.0.1 --port 8000
```

## Local test (no external deps)

```bash
cd services/api
python3 -m unittest tests/test_semantic_pipeline.py
```


## PR review note

`Merge conflict` in GitHub means auto-merge failed, not that you cannot run this branch.
You can still checkout the PR branch locally and run/test API before resolving conflicts.


## One-command dev

From repository root you can run both API + UI with:

```bash
python3 scripts/dev.py --bootstrap
```

If API venv already exists, plain `python3 scripts/dev.py` is enough.


Shortcut from repo root (vite-like): `npm run dev:bootstrap`.
