#!/usr/bin/env python3
"""Run NEOcortex local dev services with one command.

Usage:
  python3 scripts/dev.py
  python3 scripts/dev.py --api-only
  python3 scripts/dev.py --ui-only
  python3 scripts/dev.py --bootstrap
"""

from __future__ import annotations

import argparse
import os
import signal
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
API_DIR = ROOT / "services" / "api"
UI_DIR = ROOT / "apps" / "zero-room-web"
REQS = API_DIR / "requirements.txt"


def run(cmd: list[str], cwd: Path) -> int:
    return subprocess.run(cmd, cwd=str(cwd), env=os.environ.copy()).returncode


def spawn(cmd: list[str], cwd: Path) -> subprocess.Popen:
    return subprocess.Popen(cmd, cwd=str(cwd), env=os.environ.copy())


def venv_python() -> Path:
    if os.name == "nt":
        return API_DIR / ".venv" / "Scripts" / "python.exe"
    return API_DIR / ".venv" / "bin" / "python"


def ensure_venv(bootstrap: bool) -> Path | None:
    py = venv_python()
    if py.exists():
        return py

    if not bootstrap:
        return None

    print("[dev] Creating API venv: services/api/.venv")
    code = run([sys.executable, "-m", "venv", ".venv"], API_DIR)
    if code != 0:
        return None

    py = venv_python()
    if not py.exists():
        return None

    print("[dev] Installing API requirements...")
    code = run([str(py), "-m", "pip", "install", "-r", str(REQS)], API_DIR)
    if code != 0:
        return None

    return py


def api_cmd(api_python: Path | None) -> list[str] | None:
    if api_python and api_python.exists():
        return [str(api_python), "-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000"]

    # fallback to current interpreter only if uvicorn import works
    probe = subprocess.run(
        [sys.executable, "-c", "import uvicorn"],
        cwd=str(API_DIR),
        env=os.environ.copy(),
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    if probe.returncode == 0:
        return [sys.executable, "-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000"]

    return None


def wait_started(proc: subprocess.Popen, name: str) -> bool:
    time.sleep(0.35)
    if proc.poll() is not None:
        print(f"[dev] {name} exited immediately with code {proc.returncode}.", file=sys.stderr)
        return False
    return True


def main() -> int:
    parser = argparse.ArgumentParser(description="Run local NEOcortex dev services")
    parser.add_argument("--api-only", action="store_true", help="Run only FastAPI service")
    parser.add_argument("--ui-only", action="store_true", help="Run only static zero-room UI")
    parser.add_argument(
        "--bootstrap",
        action="store_true",
        help="Create services/api/.venv and install requirements before run",
    )
    args = parser.parse_args()

    if args.api_only and args.ui_only:
        print("Choose only one of: --api-only or --ui-only", file=sys.stderr)
        return 2

    procs: list[subprocess.Popen] = []

    if not args.ui_only:
        api_py = ensure_venv(args.bootstrap)
        cmd = api_cmd(api_py)
        if cmd is None:
            print(
                "[dev] Cannot start API: uvicorn not found.\n"
                "Run either:\n"
                "  python3 scripts/dev.py --bootstrap\n"
                "or manually:\n"
                "  cd services/api && python3 -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt",
                file=sys.stderr,
            )
            return 1
        api_proc = spawn(cmd, API_DIR)
        procs.append(api_proc)
        if not wait_started(api_proc, "API"):
            return api_proc.returncode or 1

    if not args.api_only:
        ui_proc = spawn([sys.executable, "-m", "http.server", "4173"], UI_DIR)
        procs.append(ui_proc)
        if not wait_started(ui_proc, "UI"):
            return ui_proc.returncode or 1

    print("\nNEOcortex dev services started:")
    if not args.ui_only:
        print("- API: http://127.0.0.1:8000 (docs: /docs)")
    if not args.api_only:
        print("- UI : http://127.0.0.1:4173")
    print("Press Ctrl+C to stop all services.\n")

    def shutdown(*_: object) -> None:
        for p in procs:
            if p.poll() is None:
                p.terminate()

    signal.signal(signal.SIGINT, shutdown)
    signal.signal(signal.SIGTERM, shutdown)

    exit_code = 0
    try:
        for p in procs:
            code = p.wait()
            if code != 0 and exit_code == 0:
                exit_code = code
    finally:
        shutdown()

    return exit_code


if __name__ == "__main__":
    raise SystemExit(main())
