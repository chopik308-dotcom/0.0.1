from __future__ import annotations

import itertools
import re
from collections import Counter
from typing import Any

STOPWORDS = {
    "и",
    "в",
    "на",
    "с",
    "я",
    "что",
    "когда",
    "это",
    "the",
    "and",
    "for",
    "with",
}


def _tokens(text: str) -> list[str]:
    raw = re.findall(r"[a-zA-Zа-яА-ЯёЁ]{3,}", text.lower())
    return [tok for tok in raw if tok not in STOPWORDS]


def run_pipeline(notes: list[dict[str, Any]]):
    terms_per_note: dict[str, list[str]] = {}
    frequencies = Counter()

    for note in notes:
        tokens = _tokens(note["content"])
        terms = [term for term, _ in Counter(tokens).most_common(5)]
        terms_per_note[note["id"]] = terms
        frequencies.update(terms)

    unique_terms = sorted(frequencies.keys())
    units = [{"id": f"u-{i+1}", "term": term} for i, term in enumerate(unique_terms)]
    term_to_id = {u["term"]: u["id"] for u in units}

    deterministic_links = []
    for note_id, terms in terms_per_note.items():
        for a, b in itertools.combinations(sorted(set(terms)), 2):
            deterministic_links.append(
                {
                    "id": f"d-{len(deterministic_links)+1}",
                    "source": term_to_id[a],
                    "target": term_to_id[b],
                    "reason": f"co-occurrence in {note_id}",
                }
            )

    hypotheses = []
    for i in range(len(unique_terms) - 1):
        a, b = unique_terms[i], unique_terms[i + 1]
        hypotheses.append(
            {
                "id": f"h-{i+1}",
                "source": term_to_id[a],
                "target": term_to_id[b],
                "score": 0.45,
                "requires_confirmation": True,
            }
        )

    tensions = []
    for u in units:
        if u["term"] in {"конфликт", "противоречие", "тревога", "истощением", "усталость"}:
            tensions.append(
                {
                    "id": f"t-{len(tensions)+1}",
                    "unit_id": u["id"],
                    "description": f"Potential tension marker around '{u['term']}'",
                    "severity": "medium",
                }
            )

    return units, deterministic_links, hypotheses, tensions
