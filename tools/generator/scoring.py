"""Round analysis, hard validity rules and the cleverness score.

Everything here is deterministic. A round is a list of (ANSWER, [tiles]).
`analyze()` produces the facts, `hard_errors()` the rule violations,
`structure_score()` the 0-80 structural cleverness score, and
`clue_score()` the 0-20 clue score (from clue-judge ratings).
See README.md for the formula in prose.
"""
from __future__ import annotations

import re
from collections import Counter

import lexicon as lx

# ---- round shape rules (hard) -------------------------------------------
N_ANSWERS = 7
TILES_MIN, TILES_MAX = 17, 22          # hard limits; generator aims at 18-21
TILE_LEN_MIN, TILE_LEN_MAX = 2, 4       # 5+ letter tiles are never allowed
MAX_TWO_LETTER_TILES = 3               # target is 0-2
MAX_FOUR_PLUS_FRAC = 0.3               # target is 12-15% (3-letter 75-80%, 2-letter 8-10%)
MAX_TWO_TILE_ANSWERS = 3
TILE_VOWELS = set("AEIOUY")
MAX_SAME_TILE = 2                      # identical tile text at most twice
MAX_INFLECTED = 1                      # -ING / -ED answers per round
STEM_LEN = 5                           # answers sharing this prefix = same stem

# ---- scoring knobs --------------------------------------------------------
W_DECOY, DECOY_SAT = 20, 12.0
W_TEMPT, TEMPT_SAT = 16, 40.0
W_SHARED, SHARED_SAT = 10, 8.0
W_ANCHOR = 8
W_SHAPE = 12
W_APPEAL = 14
NON_FAVORITE_CAP = 0.6    # words not on data/favorite_words.txt top out here
ABSTRACT_FACTOR = 0.5     # -TION/-ITY/-NESS/-LY ... words are worth half
MAX_ABSTRACT = 2          # hard cap per round
W_CLUE_RATING, W_CLUE_VARIETY, W_CLUE_PUNS = 30, 8, 12   # clues are half the total
PUN_SAT = 4               # pun/wordplay clues per round for full pun marks
STRUCTURE_SCALE = 0.625   # structure 0-80 is scaled to 0-50 in the total
ANCHOR_MAX_WORDS_4 = 3
ANCHOR_MAX_WORDS = 12     # a 3+ letter tile found in <= this many pool words is an "anchor"
VIABLE_MIN_WORDS = 3      # tile pair must start/end this many pool words to be "tempting"
ANCHOR_LO, ANCHOR_HI = 3, 6
PEN_TWO_LETTER_TILE = 1.5
PEN_TWO_NOT_RARER = 2.0
PEN_ING_TILE = 2.0         # bare ING tile (KING/TING/LING are fine)
PEN_FOUR_SHARE = 2.0       # 4-letter tiles outside 10-20% of the round
PEN_EXTRA_TWO_TILE_ANSWER = 2.0
PEN_NO_START_RIVAL = 1.0
PEN_INFLECTED = 1.5
PEN_CLUE_STEM = 3.0
PEN_FLAT_CLUE = 2.0       # per clue the judge rates 2 or lower
CLUE_RATING_LO, CLUE_RATING_HI = 2.5, 4.5

CLUE_TYPES = {
    "definition",     # straight but fresh definition
    "misdirection",   # surface reading points the wrong way
    "pun",            # pun / double meaning; a trailing "?" is optional
    "fill-in",        # ___ blank
    "example",        # "Oak or elm", "Sherlock, e.g."
    "trivia",         # needs a fact
    "wordplay",       # letters / sounds / hidden structure
    "evocative",      # paints a scene instead of defining
}
CLUE_MAX_WORDS = 7
CLUE_MAX_CHARS = 42


def _hamming1(a: str, b: str) -> bool:
    return len(a) == len(b) and sum(x != y for x, y in zip(a, b)) == 1


def spellings(word: str, pool: Counter) -> list[tuple[str, ...]]:
    """All distinct tile-text sequences from the pool multiset that spell word."""
    out = []

    def rec(i, acc, left):
        if i == len(word):
            out.append(tuple(acc))
            return
        for t in list(left):
            if left[t] > 0 and word.startswith(t, i):
                left[t] -= 1
                acc.append(t)
                rec(i + len(t), acc, left)
                acc.pop()
                left[t] += 1

    rec(0, [], Counter(pool))
    return sorted(set(out))


def find_decoys(entries):
    """Non-answer familiar words spellable with 2-3 pool tiles."""
    lex, pre = lx.decoy_lexicon(), lx.decoy_prefixes()
    answers = {a for a, _ in entries}
    tiles = [(t, ai) for ai, (_, ts) in enumerate(entries) for t in ts]
    found: dict[str, dict] = {}

    def note(word, idxs):
        if word in answers or word not in lex:
            return
        srcs = {tiles[i][1] for i in idxs}
        cross = len(srcs) > 1
        cur = found.get(word)
        # if any spelling stays inside one answer, call it internal (weaker trap)
        if cur is None or (cur["cross"] and not cross):
            found[word] = {
                "word": word,
                "tiles": [tiles[i][0] for i in idxs],
                "cross": cross,
                "zipf": round(lx.zipf(word), 2),
            }

    n = len(tiles)
    for i in range(n):
        for j in range(n):
            if j == i:
                continue
            w2 = tiles[i][0] + tiles[j][0]
            if w2 not in pre:
                continue
            note(w2, (i, j))
            for k in range(n):
                if k == i or k == j:
                    continue
                w3 = w2 + tiles[k][0]
                if w3 in lex:
                    note(w3, (i, j, k))
    return sorted(found.values(), key=lambda d: (-d["cross"], -d["zipf"], d["word"]))


def analyze(entries) -> dict:
    start, end, anywhere = lx.fragment_stats()
    answers = [a for a, _ in entries]
    tiles = [(t, ai) for ai, (_, ts) in enumerate(entries) for t in ts]
    texts = [t for t, _ in tiles]
    pool = Counter(texts)

    alt = {a: spellings(a, pool) for a in answers}
    decoys = find_decoys(entries)

    real_adjacent = {(ts[i], ts[i + 1]) for _, ts in entries for i in range(len(ts) - 1)}
    tempting = set()
    for x, ax in tiles:
        for y, ay in tiles:
            if ax == ay or (x, y) in real_adjacent:
                continue
            f = x + y
            if start.get(f, 0) >= VIABLE_MIN_WORDS or end.get(f, 0) >= VIABLE_MIN_WORDS:
                tempting.add((x, y))

    rivals = {}
    for ai, (a, ts) in enumerate(entries):
        r = set()
        for y, ay in tiles:
            if ay != ai and y != ts[1] and start.get(ts[0] + y, 0) >= 2:
                r.add(y)
        rivals[a] = sorted(r)

    anchors = sorted({t for t in texts if (len(t) == 3 and anywhere.get(t, 0) <= ANCHOR_MAX_WORDS)
                      or (len(t) >= 4 and anywhere.get(t, 0) <= ANCHOR_MAX_WORDS_4)})
    dups = sorted(t for t, c in pool.items() if c > 1)
    near = set()
    for x, ax in tiles:
        for y, ay in tiles:
            if ax < ay and x != y and _hamming1(x, y) and len(x) >= 3:
                near.add(tuple(sorted((x, y))))

    return {
        "answers": answers,
        "tiles": texts,
        "n_tiles": len(texts),
        "tile_len_hist": dict(sorted(Counter(len(t) for t in texts).items())),
        "tiles_per_answer": [len(ts) for _, ts in entries],
        "spellings": alt,
        "decoys": decoys,
        "tempting_pairs": sorted(tempting),
        "start_rivals": rivals,
        "anchors": anchors,
        "dup_tiles": dups,
        "near_pairs": sorted(near),
        "inflected": [a for a in answers if lx.inflection(a.lower()) in ("ing", "ed")],
        "zipf": {a: round(lx.zipf(a), 2) for a in answers},
        "promiscuity": {t: anywhere.get(t, 0) for t in sorted(set(texts))},
    }


def same_stem(a: str, b: str) -> bool:
    if a == b:
        return True
    k = 0
    for x, y in zip(a, b):
        if x != y:
            break
        k += 1
    return k >= STEM_LEN or a in b or b in a


def hard_errors(entries, an=None, check_words=True) -> list[str]:
    """Rule violations that make a round invalid."""
    errs = []
    if len(entries) != N_ANSWERS:
        errs.append(f"needs {N_ANSWERS} answers, has {len(entries)}")
    seen = set()
    for a, ts in entries:
        if not re.fullmatch(r"[A-Z]+", a or ""):
            errs.append(f"{a!r}: answer must be uppercase A-Z")
            continue
        if a in seen:
            errs.append(f"{a}: duplicate answer")
        seen.add(a)
        if "".join(ts) != a:
            errs.append(f"{a}: tiles {ts} do not join to the answer")
        for t in ts:
            if not (TILE_LEN_MIN <= len(t) <= TILE_LEN_MAX):
                errs.append(f"{a}: tile {t!r} length {len(t)} outside {TILE_LEN_MIN}-{TILE_LEN_MAX}")
            if not (set(t) & TILE_VOWELS):
                errs.append(f"{a}: tile {t!r} has no vowel")
        if not (2 <= len(ts) <= 4):
            errs.append(f"{a}: {len(ts)} tiles (must be 2-4)")
        if check_words:
            ok, why = lx.answer_ok(a)
            if not ok:
                errs.append(f"{a}: {why}")
    if errs:
        return errs
    an = an or analyze(entries)
    n = an["n_tiles"]
    if not (TILES_MIN <= n <= TILES_MAX):
        errs.append(f"{n} tiles in round (must be {TILES_MIN}-{TILES_MAX})")
    h = an["tile_len_hist"]
    if h.get(2, 0) > MAX_TWO_LETTER_TILES:
        errs.append(f"{h.get(2, 0)} two-letter tiles (max {MAX_TWO_LETTER_TILES})")
    if h.get(4, 0) > MAX_FOUR_PLUS_FRAC * n:
        errs.append(f"{h.get(4, 0)} four-letter tiles (max {int(MAX_FOUR_PLUS_FRAC * 100)}%)")
    if 2 * an["tile_len_hist"].get(3, 0) < n:
        errs.append("fewer than half the tiles are 3 letters")
    n2 = sum(1 for k in an["tiles_per_answer"] if k == 2)
    if n2 > MAX_TWO_TILE_ANSWERS:
        errs.append(f"{n2} two-tile answers (max {MAX_TWO_TILE_ANSWERS})")
    for t, c in Counter(an["tiles"]).items():
        if c > MAX_SAME_TILE:
            errs.append(f"tile {t} appears {c} times (max {MAX_SAME_TILE})")
    for a, sp in an["spellings"].items():
        if len(sp) != 1:
            errs.append(f"{a}: can be spelled {len(sp)} ways from the pool: {['·'.join(s) for s in sp]}")
    answers = an["answers"]
    for i, a in enumerate(answers):
        for b in answers[i + 1 :]:
            if same_stem(a, b):
                errs.append(f"{a} / {b}: answers share a stem")
    nab = [a for a in answers if lx.is_abstract(a)]
    if len(nab) > MAX_ABSTRACT:
        errs.append(f"{len(nab)} dry abstract-suffix answers (max {MAX_ABSTRACT}): {nab}")
    if len(an["inflected"]) > MAX_INFLECTED:
        errs.append(f"{len(an['inflected'])} inflected (-ING/-ED) answers (max {MAX_INFLECTED}): {an['inflected']}")
    return errs


def _appeal(word: str) -> float:
    """0-1: frequency sweet spot, abstract-suffix discount, favorites bonus."""
    z = lx.zipf(word)
    if 3.6 <= z <= 4.8:
        v = 1.0
    elif z < 3.6:
        v = max(0.3, 1.0 - (3.6 - z) * 2.0)
    else:
        v = max(0.3, 1.0 - (z - 4.8) * 1.5)
    if word.lower() in lx.favorites():
        return 1.0
    v *= NON_FAVORITE_CAP
    if lx.is_abstract(word):
        v *= ABSTRACT_FACTOR
    return v


def decoy_weight(d: dict) -> float:
    """How tempting is one decoy? Longer, commoner, cross-answer = stronger."""
    n = len(d["word"])
    w = 0.3 if n <= 4 else 0.7 if n == 5 else 1.0
    if d["zipf"] < 3.5:
        w *= 0.6
    if not d["cross"]:
        w *= 0.3
    return w


def structure_score(an: dict) -> dict:
    """0-80 structural cleverness, with a per-component breakdown."""
    dw = sum(decoy_weight(d) for d in an["decoys"])
    s_decoy = W_DECOY * min(1.0, dw / DECOY_SAT)

    s_tempt = W_TEMPT * min(1.0, len(an["tempting_pairs"]) / TEMPT_SAT)

    sh = 2 * min(2, len(an["dup_tiles"])) + len(an["near_pairs"])
    s_shared = W_SHARED * min(1.0, sh / SHARED_SAT)

    a = len(an["anchors"])
    off = max(0, ANCHOR_LO - a, a - ANCHOR_HI)
    s_anchor = max(0.0, W_ANCHOR - 2.0 * off)

    n = an["n_tiles"]
    s_count = {20: 3, 19: 3, 21: 2, 18: 2, 17: 1, 22: 1}.get(n, 0)
    frac3 = an["tile_len_hist"].get(3, 0) / max(1, n)
    s_frac = 5 * max(0.0, min(1.0, (frac3 - 0.5) / 0.25))
    three = sum(1 for k in an["tiles_per_answer"] if k == 3)
    s_three = 2 * min(1.0, three / 4)
    nlen = len({len(x) for x in an["answers"]})
    s_var = 2 if nlen >= 4 else 1 if nlen == 3 else 0
    s_shape = s_count + s_frac + s_three + s_var

    s_appeal = W_APPEAL * sum(_appeal(x) for x in an["answers"]) / max(1, len(an["answers"]))

    pen = 0.0
    h = an["tile_len_hist"]
    pen += PEN_TWO_LETTER_TILE * h.get(2, 0)
    pen += PEN_ING_TILE * an["tiles"].count("ING")
    n4 = h.get(4, 0)
    if not (0.10 * n <= n4 <= 0.20 * n):
        pen += PEN_FOUR_SHARE
    if h.get(2, 0) >= n4:                      # 2-letter tiles should be rarer than 4-letter ones
        pen += PEN_TWO_NOT_RARER
    pen += PEN_EXTRA_TWO_TILE_ANSWER * max(0, sum(1 for k in an["tiles_per_answer"] if k == 2) - 1)
    pen += PEN_NO_START_RIVAL * sum(1 for r in an["start_rivals"].values() if not r)
    pen += PEN_INFLECTED * len(an["inflected"])

    total = s_decoy + s_tempt + s_shared + s_anchor + s_shape + s_appeal - pen
    return {
        "decoys": round(s_decoy, 1),
        "tempting_pairs": round(s_tempt, 1),
        "shared_fragments": round(s_shared, 1),
        "anchor_balance": round(s_anchor, 1),
        "shape": round(s_shape, 1),
        "word_appeal": round(s_appeal, 1),
        "penalties": round(-pen, 1) + 0.0,
        "structure": round(total, 1),
    }


# ---- clues ----------------------------------------------------------------

def clue_lint(clue: str, answer: str) -> tuple[list[str], list[str]]:
    """Return (errors, warnings) for one clue."""
    errs, warns = [], []
    if not clue or not clue.strip():
        return ["empty clue"], warns
    if clue != clue.strip():
        errs.append("leading/trailing whitespace")
    if len(clue) > CLUE_MAX_CHARS:
        errs.append(f"clue too long ({len(clue)} chars > {CLUE_MAX_CHARS})")
    words = re.findall(r"[A-Za-z]+", clue)
    if len(clue.split()) > CLUE_MAX_WORDS:
        errs.append(f"clue too wordy ({len(clue.split())} words > {CLUE_MAX_WORDS})")
    a = answer.upper()
    for w in words:
        w = w.upper()
        if len(w) < 4:
            continue
        k = 0
        for x, y in zip(w, a):
            if x != y:
                break
            k += 1
        if w == a or (len(w) >= 5 and (w in a or a in w)) or k >= 5:
            errs.append(f"clue word {w} gives away / shares a stem with {a}")
        elif k >= 4 or w in a:
            warns.append(f"clue word {w} overlaps answer {a}")
    return errs, warns


def clue_score(clue_items) -> dict:
    """clue_items: list of dicts with optional 'rating' (1-5) and 'type'."""
    ratings = [c["rating"] for c in clue_items if isinstance(c.get("rating"), (int, float))]
    types = {c.get("type") for c in clue_items if c.get("type")}
    if not ratings:
        return {"clue_rating": 0.0, "clue_variety": 0.0, "clue_puns": 0.0, "clue_penalties": 0.0, "clues": 0.0}
    mean = sum(ratings) / len(ratings)
    # judges are told most clues are 3s, so the useful range is 2.5 .. 4.5
    s_rating = W_CLUE_RATING * max(0.0, min(1.0, (mean - CLUE_RATING_LO) / (CLUE_RATING_HI - CLUE_RATING_LO)))
    s_var = {0: 0, 1: 0, 2: 4}.get(len(types), W_CLUE_VARIETY)
    s_pun = W_CLUE_PUNS * min(1.0, sum(1 for c in clue_items if c.get("type") in ("pun", "wordplay")) / PUN_SAT)
    pen = PEN_CLUE_STEM * sum(1 for c in clue_items if c.get("_warn"))
    pen += PEN_FLAT_CLUE * sum(1 for r in ratings if r <= 2)
    return {
        "clue_rating": round(s_rating, 1),
        "clue_variety": float(s_var),
        "clue_puns": round(s_pun, 1),
        "clue_penalties": round(-pen, 1) + 0.0,
        "clues": round(s_rating + s_var + s_pun - pen, 1),
    }
