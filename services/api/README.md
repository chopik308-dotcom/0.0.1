# api service

FastAPI mock runtime for phase 1/2 loop:

- `GET /health`
- `GET /zero-room/status`
- `POST /ingestion/import-seed`
- `GET /map`
- `POST /entourage/reply`

## Run

### 1) Create virtual environment

```bash
cd services/api
python -m venv .venv
```

### 2) Activate virtual environment

#### Linux/macOS (bash/zsh)

```bash
source .venv/bin/activate
```

#### Windows PowerShell

```powershell
.\.venv\Scripts\Activate.ps1
```

If script execution is blocked:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

#### Windows cmd

```cmd
.venv\Scripts\activate.bat
```

### 3) Install dependencies and run API

```bash
pip install -r requirements.txt
uvicorn main:app --host 127.0.0.1 --port 8000
```
