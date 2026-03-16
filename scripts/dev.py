#!/usr/bin/env python3
"""Run NEOcortex local dev services with one command.

Usage:
  python3 scripts/dev.py
  python3 scripts/dev.py --api-only
  python3 scripts/dev.py --ui-only
"""

from __future__ import annotations

import argparse
import os
import signal
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
API_DIR = ROOT / "services" / "api"
UI_DIR = ROOT / "apps" / "zero-room-web"


def spawn(cmd: list[str], cwd: Path) -> subprocess.Popen:
    return subprocess.Popen(cmd, cwd=str(cwd), env=os.environ.copy())


def main() -> int:
    parser = argparse.ArgumentParser(description="Run local NEOcortex dev services")
    parser.add_argument("--api-only", action="store_true", help="Run only FastAPI service")
    parser.add_argument("--ui-only", action="store_true", help="Run only static zero-room UI")
    args = parser.parse_args()

    if args.api_only and args.ui_only:
        print("Choose only one of: --api-only or --ui-only", file=sys.stderr)
        return 2

    procs: list[subprocess.Popen] = []

    if not args.ui_only:
        procs.append(
            spawn(
                [sys.executable, "-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000"],
                API_DIR,
            )
        )

    if not args.api_only:
        procs.append(spawn([sys.executable, "-m", "http.server", "4173"], UI_DIR))

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
