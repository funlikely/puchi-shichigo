#!/usr/bin/env python3
"""Stage 4: clues (the pluggable LLM / human stage).

This stage is deliberately file-based so anything can fill it in:

    clue_stage.py export            -> work/clue_requests.json
        One request per candidate round: answers, tiles, decoys. Feed each to
        prompts/clue_writer.md, then prompts/clue_judge.md.
    (someone writes clues/<batch>.clues.json: a human, or an LLM via API)
    clue_stage.py check clues/batch-001.clues.json
        Lints the response against the candidates (length, stem leaks,
        missing answers, unknown types, unrated clues).

For batch-001 the clues file was written by hand (no API key on the build
machine). To plug in an API later, implement `call_llm()` below and run
`clue_stage.py write`; nothing else in the pipeline needs to change.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

import scoring

HERE = Path(__file__).resolve().parent


def load_candidates(path=None):
    path = Path(path or HERE / "work" / "candidates.json")
    return {c["id"]: c for c in json.loads(path.read_text())}


def export(args):
    cands = load_candidates(args.candidates)
    reqs = []
    for c in cands.values():
        reqs.append({
            "id": c["id"],
            "answers": [{"answer": e["answer"], "tiles": e["chunkTexts"]} for e in c["entries"]],
            "decoys": [d.split("=")[0] for d in c["analysis"]["decoys"]],
            "theme_hint": c.get("theme_hint", ""),
            "structure": c["structure_scores"]["structure"],
        })
    out = HERE / "work" / "clue_requests.json"
    out.write_text(json.dumps(reqs, indent=1) + "\n")
    print(f"wrote {len(reqs)} requests to {out}")


def call_llm(prompt: str, request: dict) -> dict:  # pragma: no cover
    """Plug-in point. Return the JSON described in prompts/clue_writer.md."""
    raise NotImplementedError(
        "No LLM is wired up. Write clues/<batch>.clues.json by hand, or implement call_llm()."
    )


def write(args):  # pragma: no cover
    writer = (HERE / "prompts" / "clue_writer.md").read_text()
    judge = (HERE / "prompts" / "clue_judge.md").read_text()
    reqs = json.loads((HERE / "work" / "clue_requests.json").read_text())
    out = {}
    for r in reqs:
        draft = call_llm(writer, r)
        out.update(call_llm(judge, {"request": r, "draft": draft}))
    Path(args.out).write_text(json.dumps(out, indent=1) + "\n")


def check_clues(cands: dict, clues: dict) -> tuple[list[str], list[str]]:
    errs, warns = [], []
    for cid, block in clues.items():
        if cid.startswith('_'):
            continue
        if cid not in cands:
            errs.append(f"{cid}: no such candidate")
            continue
        answers = [e["answer"] for e in cands[cid]["entries"]]
        seen_clues = set()
        for a in answers:
            item = block.get("clues", {}).get(a)
            if not item:
                errs.append(f"{cid} {a}: missing clue")
                continue
            e, w = scoring.clue_lint(item.get("clue", ""), a)
            errs += [f"{cid} {a}: {m}" for m in e]
            warns += [f"{cid} {a}: {m}" for m in w]
            if item.get("type") not in scoring.CLUE_TYPES:
                errs.append(f"{cid} {a}: unknown clue type {item.get('type')!r}")
            if not isinstance(item.get("rating"), (int, float)) or not 1 <= item["rating"] <= 5:
                errs.append(f"{cid} {a}: needs a judge rating 1-5")
            if item.get("clue", "").lower() in seen_clues:
                errs.append(f"{cid} {a}: duplicate clue")
            seen_clues.add(item.get("clue", "").lower())
        extra = set(block.get("clues", {})) - set(answers)
        if extra:
            errs.append(f"{cid}: clues for unknown answers {sorted(extra)}")
        theme = block.get("theme", "")
        if not theme:
            errs.append(f"{cid}: missing theme label")
        for a in answers:
            if a in theme.upper().replace(" ", ""):
                errs.append(f"{cid}: theme {theme!r} contains answer {a}")
    return errs, warns


def check(args):
    cands = load_candidates(args.candidates)
    clues = json.loads(Path(args.file).read_text())
    errs, warns = check_clues(cands, clues)
    for w in warns:
        print("warn:", w)
    for e in errs:
        print("ERROR:", e)
    print(f"{sum(1 for k in clues if not k.startswith(chr(95)))} rounds clued, {len(errs)} errors, {len(warns)} warnings")
    sys.exit(1 if errs else 0)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--candidates", default=None)
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("export").set_defaults(fn=export)
    c = sub.add_parser("check")
    c.add_argument("file")
    c.set_defaults(fn=check)
    w = sub.add_parser("write")
    w.add_argument("--out", default=str(HERE / "clues" / "llm.clues.json"))
    w.set_defaults(fn=write)
    args = ap.parse_args()
    args.fn(args)


if __name__ == "__main__":
    main()
