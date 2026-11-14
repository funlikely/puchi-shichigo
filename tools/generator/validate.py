#!/usr/bin/env python3
"""Validate a puzzles JSON file against the round rules and print stats.

    .venv/bin/python validate.py ../../content/puzzles.json
    .venv/bin/python validate.py FILE --no-word-check   # skip frequency/dictionary rules
    .venv/bin/python validate.py FILE --quiet           # summary only

Exit status 0 = every round passes, 1 = at least one error.

ERRORS (hard rules)
  schema      id/title/theme strings, unique ids, 7 clueAnswers, each with clue/answer/chunkTexts
  joins       chunkTexts joined == answer; answer is A-Z uppercase
  tiles       each tile 2-4 letters (5+ is never allowed) and MUST CONTAIN A VOWEL (AEIOUY);
              17-22 tiles per round; at least half are 3 letters; at most 3 two-letter tiles;
              at most 30% four-letter tiles; no tile text more than twice
  answers     5-10 letters, 2-4 tiles each, at most 3 two-tile answers, no duplicates,
              no two answers sharing a stem, no answer reused in another round
  words       in the dictionary, common enough (wordfreq zipf), not blocklisted, not a plain
              plural; at most 1 -ING/-ED form and 2 abstract-suffix words per round
  uniqueness  every answer can be spelled from the round's tile pool in exactly one way, so
              the solution is unique and no tile can be stranded by an alternate spelling
  clues       non-empty, <= 7 words / 42 chars, no duplicate clues, must not contain the
              answer or a word sharing its stem; theme/title must not contain an answer
WARNINGS
  clue word shares 4 leading letters with its answer; round has no decoys at all;
  an answer whose first tile has no plausible rival continuation (a giveaway start)
"""
from __future__ import annotations

import argparse
import json
import sys
from collections import Counter
from pathlib import Path

import lexicon as lx
import scoring


def validate_round(r: dict, word_check=True):
    errs, warns = [], []
    for k in ("id", "title", "theme"):
        if not isinstance(r.get(k), str) or not r.get(k):
            errs.append(f"missing/empty string field {k!r}")
    cas = r.get("clueAnswers")
    if not isinstance(cas, list):
        return ["clueAnswers must be a list"], warns, None
    entries = []
    for ca in cas:
        if not (isinstance(ca.get("clue"), str) and isinstance(ca.get("answer"), str)
                and isinstance(ca.get("chunkTexts"), list)
                and all(isinstance(t, str) for t in ca["chunkTexts"])):
            errs.append(f"bad clueAnswer entry: {ca!r}")
            continue
        entries.append((ca["answer"], ca["chunkTexts"]))
    if errs:
        return errs, warns, None
    an = None
    hard = scoring.hard_errors(entries, check_words=word_check)
    errs += hard
    try:
        an = scoring.analyze(entries)
    except Exception as ex:  # malformed entries
        errs.append(f"could not analyze: {ex}")
    seen = set()
    for ca in cas:
        e, w = scoring.clue_lint(ca["clue"], ca["answer"])
        errs += [f"{ca['answer']}: {m}" for m in e]
        warns += [f"{ca['answer']}: {m}" for m in w]
        if ca["clue"].lower() in seen:
            errs.append(f"{ca['answer']}: duplicate clue")
        seen.add(ca["clue"].lower())
        for label in (r.get("theme", ""), r.get("title", "")):
            if ca["answer"] and ca["answer"] in "".join(c for c in label.upper() if c.isalpha()):
                errs.append(f"theme/title {label!r} contains answer {ca['answer']}")
    if an:
        if not an["decoys"]:
            warns.append("no decoy words at all (tiles are not ambiguous)")
        for a, rv in an["start_rivals"].items():
            if not rv:
                warns.append(f"{a}: first tile has no rival continuation (giveaway start)")
    return errs, warns, an


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("file")
    ap.add_argument("--no-word-check", action="store_true", help="skip dictionary/frequency/blocklist rules")
    ap.add_argument("--quiet", action="store_true")
    args = ap.parse_args()

    data = json.loads(Path(args.file).read_text(encoding="utf-8"))
    if not isinstance(data, list):
        print("ERROR: top level must be a list of rounds")
        sys.exit(1)
    if not lx.HAVE_WORDFREQ and not args.no_word_check:
        print("note: wordfreq not installed; frequency rules skipped (use tools/generator/.venv)")

    n_err = n_warn = n_fail = 0
    ids = Counter(r.get("id") for r in data)
    all_answers = Counter()
    agg_tiles = Counter()
    agg_per_answer = Counter()
    agg_len = Counter()
    scores, decoy_counts, tile_counts = [], [], []
    for r in data:
        errs, warns, an = validate_round(r, word_check=not args.no_word_check)
        if ids[r.get("id")] > 1:
            errs.append(f"duplicate id {r.get('id')!r}")
        for ca in r.get("clueAnswers", []):
            if isinstance(ca, dict) and isinstance(ca.get("answer"), str):
                all_answers[ca["answer"]] += 1
        line = f"{r.get('id', '?'):>10}  "
        if an:
            sc = scoring.structure_score(an)
            scores.append(sc["structure"])
            decoy_counts.append(len(an["decoys"]))
            tile_counts.append(an["n_tiles"])
            for t in an["tiles"]:
                agg_tiles[len(t)] += 1
            for k in an["tiles_per_answer"]:
                agg_per_answer[k] += 1
            for a in an["answers"]:
                agg_len[len(a)] += 1
            hist = "/".join(f"{k}:{v}" for k, v in an["tile_len_hist"].items())
            line += (f"tiles {an['n_tiles']:>2} ({hist})  decoys {len(an['decoys']):>2}  "
                     f"tempting {len(an['tempting_pairs']):>2}  dup {len(an['dup_tiles'])}  "
                     f"anchors {len(an['anchors'])}  structure {sc['structure']:>5.1f}/80  ")
        line += "OK" if not errs else "FAIL"
        if not args.quiet or errs:
            print(line)
            for e in errs:
                print(f"{'':>12}ERROR: {e}")
            for w in warns:
                if not args.quiet:
                    print(f"{'':>12}warn:  {w}")
        n_err += len(errs)
        n_fail += bool(errs)
        n_warn += len(warns)
    for a, c in sorted(all_answers.items()):
        if c > 1:
            print(f"ERROR: answer {a} used in {c} rounds")
            n_err += 1

    print()
    print(f"rounds: {len(data)}   answers: {sum(all_answers.values())}   distinct: {len(all_answers)}")
    if tile_counts:
        tot = sum(agg_tiles.values())
        print(f"tiles per round: min {min(tile_counts)}  mean {sum(tile_counts)/len(tile_counts):.1f}  max {max(tile_counts)}")
        print("tile lengths:    " + "  ".join(f"{k}-letter {v} ({100*v/tot:.0f}%)" for k, v in sorted(agg_tiles.items())))
        print("tiles per answer: " + "  ".join(f"{k} tiles: {v}" for k, v in sorted(agg_per_answer.items())))
        print("answer lengths:  " + "  ".join(f"{k}: {v}" for k, v in sorted(agg_len.items())))
        print(f"decoys per round: min {min(decoy_counts)}  mean {sum(decoy_counts)/len(decoy_counts):.1f}  max {max(decoy_counts)}")
        print(f"structure score: min {min(scores):.1f}  mean {sum(scores)/len(scores):.1f}  max {max(scores):.1f}  (of 80)")
    print(f"rounds failing: {n_fail} of {len(data)}")
    print(f"errors: {n_err}   warnings: {n_warn}")
    print("RESULT: " + ("PASS" if n_err == 0 else "FAIL"))
    sys.exit(0 if n_err == 0 else 1)


if __name__ == "__main__":
    main()
