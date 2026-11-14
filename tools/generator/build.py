#!/usr/bin/env python3
"""Stage 5: merge candidates + clues, score, keep the best N, write outputs.

    .venv/bin/python build.py --batch batch-001 --keep 20 --publish

Reads   work/candidates.json            (generate.py)
        clues/<batch>.clues.json        (clue stage: human or LLM)
Writes  content/generated/<batch>.json          the kept rounds, with scores
        content/generated/<batch>-review.md     human review sheet
        content/puzzles.json                    (only with --publish) what the app loads
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path

import clue_stage
import scoring

HERE = Path(__file__).resolve().parent
REPO = HERE.parent.parent

REVIEW_HEADER = """# {batch}: review sheet

{n_kept} rounds kept out of {n_clued} clued candidates ({n_cand} word-disjoint candidates came out of
the generator). Rounds are ordered best-first by total score, so Round 1 is what the scoring
formula likes most and the last round least. Play them, then tell me where the formula is wrong.
One round was removed by editor veto rather than by score (see "Cut candidates").

**Total = structure (0-80, deterministic) + clues (0-20, judge ratings).** Batch range:
{lo:.1f} to {hi:.1f}, mean {mean:.1f}.

Honest caveats before you read on:

* The clues were written and rated by the same author (Claude, by hand, no API). The ratings are
  self-assessment, not an independent judge. Treat the clue score as soft.
* The structure score rewards tile ambiguity. It cannot tell a delightful word from a dry one
  except through `data/favorite_words.txt` and a suffix heuristic.
* "Decoys" are real words the tile pool can spell that are not answers. They are traps, not
  alternate solutions: the app only accepts the 7 answers. `*` marks a decoy made entirely from
  one answer's own tiles (weak trap).

## Knobs you can give feedback on

| Knob | Where | Current | What it changes |
|---|---|---|---|
| Tiles per round | `scoring.py` TILES_MIN/MAX, `generate.py` GEN_TILES_* | 18-22 valid, 19-21 generated | round size |
| Share of 3-letter tiles | `generate.py` GEN_MIN_FRAC3 | >= 60% | more 2-letter tiles = easier, more decoys |
| 4-letter tiles | `generate.py` GEN_MAX_FOUR | max 1 | rarely used; raise for longer chunks |
| Word commonness | `lexicon.py` ANSWER_MIN_ZIPF / FAVORITE_MIN_ZIPF | 3.3 / 2.4 | lower = harder vocabulary |
| Vivid words per round | `generate.py` GEN_MIN_FAVORITES, `data/favorite_words.txt` | >= 3 of 7 | add words you love to the list |
| Words you never want | `data/reject_words.txt`, `data/blocklist.txt` | empty / 100ish stems | bans |
| Dry-word limits | `scoring.py` MAX_ABSTRACT, MAX_INFLECTED | 2 / 1 per round | fewer -TION/-ING answers |
| Decoy weight | `scoring.py` W_DECOY, DECOY_SAT | 20 pts, saturates at 12 | how much traps matter |
| Tempting pairs | `scoring.py` W_TEMPT, TEMPT_SAT | 16 pts, saturates at 40 | tile pairs that look like a word start/end |
| Shared / near-twin tiles | `scoring.py` W_SHARED, MAX_SAME_TILE | 10 pts, same tile max twice | ING+ING, CON/COM style overlap |
| Anchors | `scoring.py` ANCHOR_LO/HI | want 3-6 per round | giveaway tiles like CKT, NDM |
| Clue weight | `scoring.py` W_CLUE_RATING / W_CLUE_VARIETY | 14 + 6 pts | raise if clues should dominate |
| Clue style | `prompts/clue_writer.md`, `prompts/clue_judge.md` | misdirection first, <= 7 words | tone, pun density, trivia tolerance |
| Theme labels | clue file `theme` | mood label, not a real theme | want true themed rounds? say so |

Things I would most like a verdict on: (1) are tiles like `NTL`, `CKT`, `RCO` fun or annoying;
(2) is three "?" clues in a round too many; (3) are 10-letter, 4-tile answers welcome;
(4) do the theme labels help or should they all just say "Mixed".

## Cut candidates

{cut}

---
"""


def build_round(cand, block):
    entries = [(e["answer"], e["chunkTexts"]) for e in cand["entries"]]
    an = scoring.analyze(entries)
    st = scoring.structure_score(an)
    items = []
    for a, _ in entries:
        it = dict(block["clues"][a])
        _e, w = scoring.clue_lint(it["clue"], a)
        it["_warn"] = bool(w)
        items.append(it)
    cs = scoring.clue_score(items)
    scores = {k: v for k, v in st.items()}
    scores.update(cs)
    scores["structure_scaled"] = round(st["structure"] * scoring.STRUCTURE_SCALE, 1)
    scores["total"] = round(scores["structure_scaled"] + cs["clues"], 1)
    rnd = {
        "theme": block["theme"],
        "clueAnswers": [
            {"clue": it["clue"], "answer": a, "chunkTexts": list(ts), "clueType": it["type"], "clueRating": it["rating"]}
            for (a, ts), it in zip(entries, items)
        ],
        "source": "generated",
        "candidateId": cand["id"],
        "scores": scores,
    }
    return rnd, an


def review_section(rnd, an, block):
    s = rnd["scores"]
    out = [f"## {rnd['title']}: {rnd['theme']}  (total {s['total']:.1f}, candidate {rnd['candidateId']})", ""]
    out.append("| Clue | Answer | Tiles | Type | Self-rating |")
    out.append("|---|---|---|---|---|")
    for ca in rnd["clueAnswers"]:
        out.append(f"| {ca['clue']} | {ca['answer']} | {' · '.join(ca['chunkTexts'])} | {ca['clueType']} | {ca['clueRating']} |")
    out.append("")
    hist = ", ".join(f"{v} x {k}-letter" for k, v in an["tile_len_hist"].items())
    out.append(f"**Tile pool ({an['n_tiles']}: {hist}):** {' '.join(sorted(an['tiles']))}")
    out.append("")
    out.append(
        f"**Score:** decoys {s['decoys']}/{scoring.W_DECOY} + tempting pairs {s['tempting_pairs']}/{scoring.W_TEMPT} "
        f"+ shared fragments {s['shared_fragments']}/{scoring.W_SHARED} + anchor balance {s['anchor_balance']}/{scoring.W_ANCHOR} "
        f"+ shape {s['shape']}/{scoring.W_SHAPE} + word appeal {s['word_appeal']}/{scoring.W_APPEAL} "
        f"+ penalties {s['penalties']} = **structure {s['structure']}/80** (scaled {s['structure_scaled']}/50); "
        f"clue rating {s['clue_rating']}/{scoring.W_CLUE_RATING} + variety {s['clue_variety']}/{scoring.W_CLUE_VARIETY} "
        f"+ puns {s['clue_puns']}/{scoring.W_CLUE_PUNS} + penalties {s['clue_penalties']} = **clues {s['clues']}/50**"
    )
    out.append("")
    dec = [d["word"] + ("" if d["cross"] else "*") for d in an["decoys"]]
    out.append(f"- Decoys ({len(dec)}): {', '.join(dec) if dec else 'none'}")
    out.append(f"- Duplicate tiles: {', '.join(an['dup_tiles']) or 'none'}; near-twin tiles: "
               f"{', '.join('/'.join(p) for p in an['near_pairs']) or 'none'}")
    out.append(f"- Anchor tiles (rare fragments): {', '.join(an['anchors']) or 'none'}")
    nr = [a for a, r in an["start_rivals"].items() if not r]
    out.append(f"- Answers whose first tile has no rival continuation: {', '.join(nr) or 'none'}")
    out.append(f"- Word frequency (zipf): {', '.join(f'{a} {z}' for a, z in an['zipf'].items())}")
    c = block.get("critique", {})
    out.append("")
    if c.get("weakest_clue"):
        out.append(f"**Weakest clue:** {c['weakest_clue']}")
        out.append("")
        out.append(f"**Weakest word:** {c.get('weakest_word', '-')}")
        out.append("")
    out.append(f"**Critique:** {c.get('notes', '-')}")
    out.append("")
    return "\n".join(out)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--batch", default="batch-001")
    ap.add_argument("--keep", type=int, default=20)
    ap.add_argument("--publish", action="store_true", help="also overwrite content/puzzles.json")
    ap.add_argument("--append", action="store_true", help="append to content/puzzles.json instead (ids continue from --start)")
    ap.add_argument("--start", type=int, default=1, help="number of the first round")
    ap.add_argument("--candidates", default=None)
    ap.add_argument("--header", default=None, help="markdown file to use as the review header")
    args = ap.parse_args()

    cands = clue_stage.load_candidates(args.candidates)
    clues = json.loads((HERE / "clues" / f"{args.batch}.clues.json").read_text(encoding="utf-8"))
    errs, warns = clue_stage.check_clues(cands, clues)
    for w in warns:
        print("warn:", w)
    if errs:
        raise SystemExit("clue errors:\n  " + "\n  ".join(errs))

    built = []
    for cid, block in clues.items():
        if cid.startswith("_"):
            continue
        entries = [(e["answer"], e["chunkTexts"]) for e in cands[cid]["entries"]]
        hard = scoring.hard_errors(entries)
        if hard:
            print(f"skip {cid}: {hard}")
            continue
        rnd, an = build_round(cands[cid], block)
        built.append((rnd, an, block))
    built.sort(key=lambda x: (-x[0]["scores"]["total"], x[0]["candidateId"]))
    # editor/judge override: "critique": {"verdict": "cut"} removes a round regardless of score
    vetoed = [x for x in built if x[2].get("critique", {}).get("verdict") == "cut"]
    ranked = [x for x in built if x not in vetoed]
    kept, cut = ranked[: args.keep], ranked[args.keep :] + vetoed

    rounds = []
    for i, (rnd, _an, _b) in enumerate(kept, args.start):
        full = {"id": f"round{i}", "title": f"Round {i}", "theme": rnd["theme"], "clueAnswers": rnd["clueAnswers"],
                "source": "generated", "batch": args.batch, "candidateId": rnd["candidateId"], "scores": rnd["scores"]}
        rnd.update(full)
        rounds.append(full)

    gen_dir = REPO / "content" / "generated"
    gen_dir.mkdir(parents=True, exist_ok=True)
    text = json.dumps(rounds, indent=2, ensure_ascii=False) + "\n"
    (gen_dir / f"{args.batch}.json").write_text(text, encoding="utf-8")
    main_path = REPO / "content" / "puzzles.json"
    if args.publish:
        main_path.write_text(text, encoding="utf-8")
    elif args.append:
        new_ids = {r["id"] for r in rounds}
        old = [r for r in json.loads(main_path.read_text(encoding="utf-8")) if r["id"] not in new_ids]
        main_path.write_text(json.dumps(old + rounds, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    totals = [r["scores"]["total"] for r in rounds]
    cut_lines = [
        f"* {r['candidateId']} ({r['theme']}), total {r['scores']['total']:.1f}: "
        f"{', '.join(ca['answer'] for ca in r['clueAnswers'])}. "
        f"{b.get('critique', {}).get('verdict_reason') or 'Cut on score.'} {b.get('critique', {}).get('notes', '')}"
        for r, _an, b in cut
    ] or ["none"]
    header = Path(args.header).read_text(encoding="utf-8") if args.header else REVIEW_HEADER
    md = header.format(
        batch=args.batch, n_kept=len(rounds), n_clued=len(built), n_cand=len(cands),
        lo=min(totals), hi=max(totals), mean=sum(totals) / len(totals), cut="\n".join(cut_lines),
    )
    md += "\n".join(review_section(r, an, b) for r, an, b in kept)
    (gen_dir / f"{args.batch}-review.md").write_text(md, encoding="utf-8")
    print(f"kept {len(rounds)} of {len(built)}; totals {min(totals)}..{max(totals)}")
    for r, _an, _b in built:
        print(f"  {r.get('id', 'CUT'):>8} {r['candidateId']} {r['scores']['total']:>5} "
              f"(structure {r['scores']['structure']}, clues {r['scores']['clues']})  {r['theme']}")


if __name__ == "__main__":
    main()
