"""Cut tiles for borrowed (sourced-online) puzzles and write them where the app can load them.

Reads  content/borrowed/puzzles-*.json   (clue/answer only, gitignored)
Writes content/private/borrowed-puzzles.json (app-loadable, gitignored)

Uses the same giveaway-scored splitter as generated rounds. Answers that can't
satisfy the vowel rule fall back to the best split without it.

Run from the repo root:
    tools/generator/.venv/bin/python tools/generator/tile_borrowed.py
"""
from __future__ import annotations

import glob
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import tiling  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(HERE))
SRC = os.path.join(ROOT, "content", "borrowed", "puzzles-*.json")
OUT = os.path.join(ROOT, "content", "private", "borrowed-puzzles.json")


def tile(answer: str) -> list[str]:
    multi = [t for t in tiling.good_tilings(answer) if len(t) >= 2]
    if multi:
        return list(multi[0])
    # Fallback: ignore the vowel rule, still prefer 2+ tiles and lowest cost.
    cands = [t for t in tiling.all_tilings(answer) if len(t) >= 2] or [(answer,)]
    return list(min(cands, key=tiling.tiling_cost))


def main() -> None:
    rounds, fallbacks = [], 0
    for path in sorted(glob.glob(SRC)):
        for p in json.load(open(path)):
            cas = []
            for ca in p["clueAnswers"]:
                tiles = ca.get("chunkTexts") or tile(ca["answer"])
                fallbacks += any(not (set(t) & tiling.VOWELS) for t in tiles)
                cas.append({"clue": ca["clue"], "answer": ca["answer"], "chunkTexts": tiles})
            rounds.append({
                "id": p["id"],
                "title": p["title"],
                "theme": p.get("theme") or "Sourced Online",
                "clueAnswers": cas,
                "source": "borrowed",
                "sourceName": p.get("sourceName"),
                "sourceUrl": p.get("sourceUrl"),
            })
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    json.dump(rounds, open(OUT, "w"), indent=1)
    print(f"wrote {len(rounds)} rounds to {OUT} ({fallbacks} answers needed a vowel-less tile)")


if __name__ == "__main__":
    main()
