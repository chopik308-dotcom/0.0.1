# api service

FastAPI mock runtime for phase 1/2 loop:

- `GET /health`
- `GET /zero-room/status`
- `POST /ingestion/import-seed`
- `GET /map`
- `POST /entourage/reply`

## Run

```bash
cd services/api
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 127.0.0.1 --port 8000
```
