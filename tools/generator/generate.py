#!/usr/bin/env python3
"""Stages 1-3: pick words, tile them, assemble candidate rounds.

    .venv/bin/python generate.py --count 120 --seed 1 --out work/candidates.json

Each candidate is found by seeded hill-climbing over (word, tiling) choices,
maximising scoring.structure_score() subject to scoring.hard_errors() == [].
Output is deterministic for a given seed/count/knob set.

Editor-seeded rounds: put partial or full word lists in work/manual_sets.json
    [{"id": "m01", "words": ["LANTERN", "CANTEEN"], "theme": "Camping"}]
and run with --manual; missing words are filled in and all tilings optimised.
"""
from __future__ import annotations

import argparse
import json
import random
import zlib
from collections import defaultdict
from multiprocessing import Pool
from pathlib import Path

import lexicon as lx
import scoring
import tiling

HERE = Path(__file__).resolve().parent
GEN_TILES_MIN, GEN_TILES_MAX = 18, 21     # stricter than the validator
GEN_MAX_TWO = 2                    # 2-letter tiles per round
GEN_FOUR_MIN, GEN_FOUR_MAX_FRAC = 2, 0.2    # and 2-letter tiles must not outnumber them
GEN_MIN_FRAC3 = 0.6
GEN_MAX_INFLECTED = 0              # no -ING/-ED filler answers
GEN_MAX_ABSTRACT = 1
MANUAL_MAX_WORDS = 12      # combos of 7 from 12 = 792; fewer starves rounds of long words
EXCLUDE: set = set()               # answers already used in earlier batches
GEN_MIN_FAVORITES = 4              # vivid, hand-vetted words per round
STEPS = 90
PROPOSALS = 22
SHARDS = 3

_INDEX = None


def tile_index():
    """tile text -> [(word, tiling)] over the answer pool's good tilings."""
    global _INDEX
    if _INDEX is None:
        idx = defaultdict(list)
        for w in lx.answer_pool():
            if w in EXCLUDE:
                continue
            for t in tiling.good_tilings(w)[:6]:
                for piece in set(t):
                    if len(piece) >= 3:
                        idx[piece].append((w, t))
        _INDEX = idx
    return _INDEX


def evaluate(entries, min_fav=GEN_MIN_FAVORITES, strict=True, max_proper=None):
    """Return (score, analysis) or (None, None) if the round is invalid.

    strict=False (editor-seeded themed rounds) applies only the hard rules."""
    n = sum(len(t) for _, t in entries)
    if strict:
        if not (GEN_TILES_MIN <= n <= GEN_TILES_MAX):
            return None, None
        lens = [len(t) for _, ts in entries for t in ts]
        if lens.count(2) > GEN_MAX_TWO or lens.count(3) < GEN_MIN_FRAC3 * n:
            return None, None
        if not (GEN_FOUR_MIN <= lens.count(4) <= GEN_FOUR_MAX_FRAC * n) or lens.count(2) > lens.count(4):
            return None, None
        if sum(1 for w, _ in entries if lx.inflection(w.lower()) in ("ing", "ed")) > GEN_MAX_INFLECTED:
            return None, None
        if sum(1 for w, _ in entries if lx.is_abstract(w)) > GEN_MAX_ABSTRACT:
            return None, None
        fav = lx.favorites()
        if sum(1 for w, _ in entries if w.lower() in fav) < min_fav:
            return None, None
    an = scoring.analyze(entries)
    if scoring.hard_errors(entries, an, check_words=False, max_proper=max_proper):
        return None, None
    return scoring.structure_score(an)["structure"], an


def search(seed: int, words: list[str], fixed: list[str] | None = None):
    rng = random.Random(seed)
    fixed = list(fixed or [])
    nfix = len(fixed)
    idx = tile_index()

    favs = [w for w in words if w.lower() in lx.favorites()]
    min_fav = 0 if fixed else GEN_MIN_FAVORITES

    def rand_entry(w=None):
        w = w or rng.choice(words)
        return (w, rng.choice(tiling.good_tilings(w)[:6]))

    best, best_s = None, None
    for _ in range(4000):                      # find a feasible start
        nf = 0 if fixed else GEN_MIN_FAVORITES
        chosen = fixed + rng.sample(favs, nf) + rng.sample(words, 7 - nfix - nf)
        if len(set(chosen)) < 7:
            continue
        ent = [rand_entry(w) for w in chosen]
        s, _an = evaluate(ent, min_fav)
        if s is not None:
            best, best_s = ent, s
            break
    if best is None:
        return None
    wordset = set(words)
    for _step in range(STEPS):
        i = rng.randrange(7)
        props = []
        for k in range(PROPOSALS):
            if i < nfix or k % 5 == 0:
                props.append(rand_entry(best[i][0]))           # re-tile only
            elif k % 2 == 0:
                props.append(rand_entry())                      # random word
            else:                                               # fragment neighbour
                t = rng.choice([t for j, (_, ts) in enumerate(best) if j != i for t in ts])
                cands = idx.get(t)
                if not cands or len(t) < 3:
                    props.append(rand_entry())
                else:
                    w, tl = rng.choice(cands)
                    props.append((w, tl) if w in wordset else rand_entry())
        cur = {w for w, _ in best}
        for p in props:
            if p[0] in cur and p[0] != best[i][0]:
                continue
            ent = best[:i] + [p] + best[i + 1 :]
            s, _an = evaluate(ent, min_fav)
            if s is not None and s > best_s:
                best, best_s = ent, s
    return best


def retile(entries, strict=True, max_proper=None):
    """Keep the words, re-cut the tiles: coordinate ascent on the structure score."""
    best = [(w, tuple(t)) for w, t in entries]
    best_s, _ = evaluate(best, 0, strict, max_proper)
    if best_s is None:                         # no valid start: try seeded random tilings
        rng = random.Random(zlib.crc32("".join(w for w, _ in best).encode()))
        for _try in range(300):
            ent = [(w, rng.choice(tiling.good_tilings(w))) for w, _ in best]
            s, _an = evaluate(ent, 0, strict, max_proper)
            if s is not None:
                best, best_s = ent, s
                break
    for _sweep in range(4):
        changed = False
        for i, (w, _t) in enumerate(best):
            for t in tiling.good_tilings(w):
                ent = best[:i] + [(w, t)] + best[i + 1 :]
                s, _an = evaluate(ent, 0, strict, max_proper)
                if s is not None and (best_s is None or s > best_s):
                    best, best_s, changed = ent, s, True
        if not changed:
            break
    return best, best_s


def build_manual(m):
    """Editor-seeded round: pick the best 7 of the listed words and cut their tiles."""
    import itertools
    ok = []
    for w in (x.upper() for x in m["words"]):
        good, why = lx.answer_ok(w)
        if not good or w in EXCLUDE or not tiling.good_tilings(w):
            print(f"  {m['id']}: drop {w} ({why or 'already used / no legal tiling'})")
            continue
        ok.append(w)
    if len(ok) > MANUAL_MAX_WORDS:            # keep the words with the least giveaway-prone tiles
        ok = sorted(ok, key=lambda w: (tiling.worst_giveaway(w), w))[:MANUAL_MAX_WORDS]
    mp = 7 if m.get("allowProperNouns") else None
    best = None
    for combo in itertools.combinations(ok, 7):
        ent, s = retile([(w, tiling.good_tilings(w)[0]) for w in combo], strict=False, max_proper=mp)
        if s is not None and (best is None or s > best[1]):
            best = (ent, s)
    if best is None and tiling.SLACK < 1.5:    # no valid round from near-best splits: widen once
        old, tiling.SLACK = tiling.SLACK, 1.5
        tiling.good_tilings.cache_clear()
        try:
            return build_manual(m)
        finally:
            tiling.SLACK = old
            tiling.good_tilings.cache_clear()
    if best is None:
        ent = [(w, list(tiling.good_tilings(w)[0])) for w in ok[:7]]
        print(f"  {m['id']}: NO VALID ROUND from {ok}: e.g. {scoring.hard_errors(ent, check_words=False, max_proper=mp)[:3]}")
        return None
    EXCLUDE.update(w for w, _ in best[0])
    return package(m["id"], [[w, list(t)] for w, t in best[0]],
                   {"theme_hint": m.get("theme", ""), "category": m.get("category", "themed")})


def _shard_words(shard: int):
    pool = [w for w in lx.answer_pool() if w not in EXCLUDE and tiling.worst_giveaway(w) < tiling.GIVEAWAY_BAD]
    if SHARDS <= 1:
        return list(pool)
    return [w for w in pool if zlib.crc32(w.encode()) % SHARDS == shard]


def _job(args):
    seed, fixed = args
    words = _shard_words(seed % SHARDS) if not fixed else [w for w in lx.answer_pool() if tiling.good_tilings(w)]
    for f in fixed or []:
        ok, why = lx.answer_ok(f)
        if not ok:
            raise SystemExit(f"manual word {f}: {why}")
    ent = search(seed, words, fixed)
    if ent is None:
        return None
    rng = random.Random(seed)
    order = list(range(7))
    rng.shuffle(order)                       # don't leave fixed words first
    ent = [ent[i] for i in order]
    return [[w, list(t)] for w, t in ent]


def package(cid: str, ent, extra=None):
    entries = [(w, t) for w, t in ent]
    an = scoring.analyze(entries)
    sc = scoring.structure_score(an)
    d = {
        "id": cid,
        "entries": [{"answer": w, "chunkTexts": t} for w, t in entries],
        "structure_scores": sc,
        "analysis": summarize(an),
    }
    d.update(extra or {})
    return d


def summarize(an):
    return {
        "n_tiles": an["n_tiles"],
        "tile_len_hist": an["tile_len_hist"],
        "decoys": [f"{d['word']}={'+'.join(d['tiles'])}" + ("" if d["cross"] else "*") for d in an["decoys"]],
        "tempting_pairs": ["+".join(p) for p in an["tempting_pairs"]],
        "anchors": an["anchors"],
        "word_tiles": an["word_tiles"],
        "misaligned": an["misaligned"],
        "dup_tiles": an["dup_tiles"],
        "near_pairs": ["/".join(p) for p in an["near_pairs"]],
        "no_start_rival": [a for a, r in an["start_rivals"].items() if not r],
        "inflected": an["inflected"],
        "zipf": an["zipf"],
    }


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--count", type=int, default=120, help="search restarts")
    ap.add_argument("--seed", type=int, default=1)
    ap.add_argument("--jobs", type=int, default=8)
    ap.add_argument("--out", default=str(HERE / "work" / "candidates.json"))
    ap.add_argument("--manual-file", help="JSON of editor-seeded rounds: [{id, theme, category, words:[7-9], allowProperNouns}]")
    ap.add_argument("--manual-only", action="store_true")
    ap.add_argument("--retile", help="candidates file: keep each round's words, re-cut tiles under the current rules, rewrite in place")
    ap.add_argument("--exclude", action="append", default=[], help="puzzles JSON whose answers must not be reused")
    args = ap.parse_args()

    for path in args.exclude:
        for r in json.loads(Path(path).read_text(encoding="utf-8")):
            EXCLUDE.update(ca["answer"] for ca in r["clueAnswers"])
    if args.retile:
        out = []
        for c in json.loads(Path(args.retile).read_text()):
            ent, s = retile([(e["answer"], e["chunkTexts"]) for e in c["entries"]])
            if s is None:
                print("no valid tiling under current rules:", c["id"])
                continue
            out.append(package(c["id"], [[w, list(t)] for w, t in ent]))
        Path(args.retile).write_text(json.dumps(out, indent=1) + "\n")
        print(f"re-tiled {len(out)} candidates in {args.retile}")
        return
    out = []
    manual = []
    if args.manual_file:                       # themed rounds first, so their words are excluded below
        msets = json.loads(Path(args.manual_file).read_text())
        seen: set[str] = set()                 # a word may belong to one themed set only
        for m in msets:
            m["words"] = [w for w in m["words"] if w.upper() not in seen]
            seen.update(w.upper() for w in m["words"])
        with Pool(args.jobs) as pool:
            manual = [d for d in pool.map(build_manual, msets) if d]
        EXCLUDE.update(e["answer"] for d in manual for e in d["entries"])
    if not args.manual_only:
        jobs = [(args.seed * 1000 + i, None) for i in range(args.count)]
        with Pool(args.jobs) as pool:
            results = pool.map(_job, jobs)
        ranked = sorted(
            (package("x", r) for r in results if r),
            key=lambda d: (-d["structure_scores"]["structure"], json.dumps(d["entries"])),
        )
        used: set[str] = set()
        k = 0
        for d in ranked:                      # keep word-disjoint candidates
            ws = {e["answer"] for e in d["entries"]}
            if ws & used:
                continue
            used |= ws
            k += 1
            d["id"] = f"c{k:03d}"
            out.append(d)
    out += manual
    Path(args.out).parent.mkdir(parents=True, exist_ok=True)
    Path(args.out).write_text(json.dumps(out, indent=1) + "\n")
    print(f"wrote {len(out)} candidates to {args.out}")
    for d in out[:400]:
        print(d["id"], d["structure_scores"]["structure"], " ".join("·".join(e["chunkTexts"]) for e in d["entries"]))


if __name__ == "__main__":
    main()
