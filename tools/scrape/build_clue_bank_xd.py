#!/usr/bin/env python3
"""Build a "clever clue" bank from the xd crossword corpus clue dump.

PRIVATE / PERSONAL USE ONLY. Output is third-party content written to
content/borrowed/ (gitignored); never publish or commit it.

Source: https://xd.saul.pw/data/ -> xd-clues.zip (clues.tsv: pubid, year, answer, clue).
robots.txt there disallows only /pub; /xd-clues.zip is allowed.

Keeps wordplay / misdirection clues (ending in "?") with 5-10 letter answers,
drops grid-dependent clues (cross-references, themers, circled squares...),
dedupes, and keeps at most --per-answer clues per answer (most recent first).

Usage: python3 -I tools/scrape/build_clue_bank_xd.py /path/to/clues.tsv [--per-answer 3]
"""
import argparse
import csv
import datetime as dt
import html
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / "content" / "borrowed" / "clue-bank-xd.jsonl"

PUB_NAMES = {
    "nyt": "New York Times", "lat": "Los Angeles Times", "wsj": "Wall Street Journal",
    "usa": "USA Today", "up": "Universal", "wapo": "Washington Post", "nw": "Newsday",
    "pzz": "Puzzle Society", "tm": "Time", "bg": "Boston Globe", "cs": "CrosSynergy",
    "ch": "Chronicle of Higher Education", "jz": "Jonesin'", "nyk": "New Yorker",
    "ana": "American Values Club", "avc": "AV Club", "bea": "Brendan Emmett Quigley",
    "atl": "The Atlantic", "vox": "Vox", "unv": "Universal", "wap": "Washington Post",
    "tny": "The New Yorker", "beq": "Brendan Emmett Quigley", "nys": "New York Sun",
    "pk": "Peter Kaplan (Pocket)", "iw": "Ink Well (Tausig)",
}

BAD = re.compile(
    r"(\d+-(across|down)|\b(across|down)\b|\bsee\b \d|starred|\btheme|circled|shaded|"
    r"this puzzle|\bgrid\b|\bhint\b to|\bclue\b|\bentry\b|\banswer\b|[*\[\]{}<>]|\\)",
    re.I,
)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("tsv")
    ap.add_argument("--per-answer", type=int, default=3)
    ap.add_argument("--min-year", type=int, default=1990)
    ap.add_argument("--min-uses", type=int, default=4,
                    help="answer must appear at least this many times in the whole corpus "
                         "(filters out one-off pun theme entries like CANDYYOUNG)")
    args = ap.parse_args()

    csv.field_size_limit(10**7)
    best = {}  # (answer, clue_key) -> (year, clue, pubid)
    n_in = 0
    uses = {}
    with open(args.tsv, encoding="utf-8", errors="replace", newline="") as f:
        r = csv.reader(f, delimiter="\t", quoting=csv.QUOTE_NONE)
        next(r, None)
        for row in r:
            if len(row) >= 3:
                a = row[2].upper()
                uses[a] = uses.get(a, 0) + 1
    with open(args.tsv, encoding="utf-8", errors="replace", newline="") as f:
        r = csv.reader(f, delimiter="\t", quoting=csv.QUOTE_NONE)
        next(r, None)
        for row in r:
            n_in += 1
            if len(row) < 4:
                continue
            pubid, year, answer, clue = row[0], row[1], row[2], "\t".join(row[3:])
            if not answer.isalpha() or not answer.isascii():
                continue
            answer = answer.upper()
            if not 5 <= len(answer) <= 10 or uses.get(answer, 0) < args.min_uses:
                continue
            clue = re.sub(r"\s+", " ", html.unescape(clue)).strip()
            if not clue.endswith("?") or len(clue) < 6 or len(clue) > 90:
                continue
            if BAD.search(clue):
                continue
            # skip clues that literally contain the answer
            if answer.lower() in re.sub(r"[^a-z]", "", clue.lower()):
                continue
            try:
                y = int(year)
            except ValueError:
                y = 0
            if y and y < args.min_year:
                continue
            key = (answer, re.sub(r"[^a-z0-9]", "", clue.lower()))
            prev = best.get(key)
            if prev is None or y > prev[0]:
                best[key] = (y, clue, pubid)

    by_answer = {}
    for (answer, _), v in best.items():
        by_answer.setdefault(answer, []).append(v)

    retrieved = dt.date.today().isoformat()
    n_out = 0
    with open(OUT, "w", encoding="utf-8") as out:
        for answer in sorted(by_answer):
            for y, clue, pubid in sorted(by_answer[answer], reverse=True)[: args.per_answer]:
                pub = re.sub(r"\d+$", "", pubid)
                name = PUB_NAMES.get(pub, pubid)
                out.write(json.dumps({
                    "clue": clue,
                    "answer": answer,
                    "source": "borrowed",
                    "sourceName": f"xd crossword corpus (xd.saul.pw): {name}{f' {y}' if y else ''}",
                    "sourceUrl": "https://xd.saul.pw/data/",
                    "retrievedAt": retrieved,
                }, ensure_ascii=False) + "\n")
                n_out += 1
    print(f"read {n_in} rows; {len(best)} unique ?-clues; wrote {n_out} lines "
          f"({len(by_answer)} answers) -> {OUT}", file=sys.stderr)


if __name__ == "__main__":
    main()
