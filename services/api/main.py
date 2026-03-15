from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from fastapi import FastAPI
from pydantic import BaseModel

from semantic_pipeline import run_pipeline

app = FastAPI(title="NEOcortex Local API", version="0.1.0")

ROOT = Path(__file__).resolve().parents[2]
SEED_DIR = ROOT / "data" / "seed-notes"

DB: dict[str, Any] = {
    "notes": [],
    "nodes": [],
    "deterministic_links": [],
    "hypothesis_links": [],
    "tensions": [],
    "revisions": [],
    "timeline": [],
}


class EntourageRequest(BaseModel):
    message: str


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "mode": "local-first"}


@app.get("/zero-room/status")
def zero_room_status() -> dict[str, Any]:
    return {
        "local_mode": True,
        "active_modules": ["zero-room", "semantic-core", "entourage", "map", "timeline"],
        "imported_notes_count": len(DB["notes"]),
        "node_count": len(DB["nodes"]),
        "deterministic_links_count": len(DB["deterministic_links"]),
        "hypothesis_links_count": len(DB["hypothesis_links"]),
        "tensions_count": len(DB["tensions"]),
        "revision_count": len(DB["revisions"]),
        "last_consolidation": DB["revisions"][-1]["created_at"] if DB["revisions"] else None,
        "event_log": DB["timeline"][-12:],
    }


@app.post("/entourage/reply")
def entourage_reply(payload: EntourageRequest) -> dict[str, str]:
    msg = payload.message.lower()
    state = "attentive"
    if "conflict" in msg or "противореч" in msg:
        state = "analytical"
    elif "?" in payload.message:
        state = "confirming"
    elif "не понимаю" in msg or "unresolved" in msg:
        state = "unresolved"

    return {
        "state": state,
        "reply": (
            "Принято. Я держу контекст сессии и предлагаю следующий шаг: "
            "уточни один наблюдаемый факт, который можно связать с текущим SessionAnchor."
        ),
    }


@app.post("/ingestion/import-seed")
def ingestion_import_seed() -> dict[str, Any]:
    notes = []
    for path in sorted(SEED_DIR.glob("*.md")):
        content = path.read_text(encoding="utf-8")
        title = content.splitlines()[0].lstrip("# ").strip() if content else path.stem
        notes.append({"id": path.stem, "title": title, "content": content, "source_type": "markdown"})

    units, deterministic_links, hypotheses, tensions = run_pipeline(notes)

    DB["notes"] = notes
    DB["nodes"] = units
    DB["deterministic_links"] = deterministic_links
    DB["hypothesis_links"] = hypotheses
    DB["tensions"] = tensions

    revision_id = f"rev-{len(DB['revisions']) + 1}"
    now = datetime.now(timezone.utc).isoformat()
    DB["revisions"].append(
        {
            "id": revision_id,
            "created_at": now,
            "new_nodes": len(units),
            "new_links": len(deterministic_links) + len(hypotheses),
            "new_tensions": len(tensions),
        }
    )
    DB["timeline"].append(
        f"{now} :: import complete :: notes={len(notes)}, nodes={len(units)}, links={len(deterministic_links)}+{len(hypotheses)}"
    )

    return {"ok": True, "revision_id": revision_id, "notes": len(notes)}


@app.get("/map")
def map_snapshot() -> dict[str, Any]:
    return {
        "nodes": DB["nodes"],
        "deterministic_links": DB["deterministic_links"],
        "hypothesis_links": DB["hypothesis_links"],
        "tensions": DB["tensions"],
        "revisions": DB["revisions"],
        "timeline": DB["timeline"],
    }
