"""Stage 2a: split a word into letter tiles.

Tiles are 2-4 letters. 3 letters is the norm, 4-letter tiles are welcome
occasionally (target 10-20% of a round), 2-letter tiles are a last resort.
Every tile must contain a vowel (AEIOUY) - no NT, RM, NTL. A bare ING tile is
discouraged; a 4-letter tile ending in ING (KING, TING, LING) is preferred.
Other common fragments (CON, ION, SUB...) are deliberately left alone.
Tiles should be PRODUCTIVE: found in many unrelated words (ENG·INE·ER, not
ENGI·NEER), and a 4-letter tile should not itself be a common word (VEL·OC·ITY,
not VELO·CITY).
"""
from __future__ import annotations

import functools

try:                                   # syllable-aware tiling (batch 004+)
    import pyphen
    _HYPH = pyphen.Pyphen(lang="en_US")
except Exception:                      # pragma: no cover - falls back to the old method
    _HYPH = None

MIS_COST = 0.3            # per tile boundary off a hyphenation point: a bonus, not a constraint
GIVEAWAY_OK = 0.3         # below this a tile is 'good enough' and only the mean counts
W_WORST, W_MEAN = 6.0, 2.0   # weight of the worst / mean tile giveaway in the split cost
GIVEAWAY_BAD = 0.4        # a tile at or above this gives the answer away
LEAD_TWO_COST = 0.6       # a 2-letter tile is least welcome as the first tile
SYLLABLE_TWO_COST = 1.0   # a 2-letter tile that is exactly a syllable is cheaper than 1.5
MAX_MISALIGNED = 1        # syllable-based candidates may bend at most this many boundaries


@functools.lru_cache(maxsize=None)
def syllable_points(word: str) -> frozenset:
    return frozenset(_HYPH.positions(word.lower())) if _HYPH else frozenset()


def misaligned(tiles) -> int:
    """Number of tile boundaries that do not fall on a hyphenation point."""
    pts = syllable_points("".join(tiles))
    pos, n = 0, 0
    for t in tiles[:-1]:
        pos += len(t)
        n += pos not in pts
    return n

LEN_COST = {2: 1.5, 3: 0.0, 4: 0.5}
ING_TILE_COST = 1.5      # a bare ING tile is discouraged ...
LOW_PROD = {3: 6, 4: 3}   # fewer unrelated word families than this = unproductive tile
LOW_PROD_COST = 2.0
WORD_TILE_COST = 1.0     # 4-letter tile that is itself a common word (CITY)
ING4_BONUS = 0.5         # ... in favour of KING / TING / LING / RING
SLACK = 0.5          # keep tilings within this much of the word's best cost
VOWELS = set("AEIOUY")


def all_tilings(word: str, sizes=(2, 3, 4)):
    """Yield every split of word into pieces whose lengths are in sizes."""
    n = len(word)

    def rec(i, acc):
        if i == n:
            yield tuple(acc)
            return
        for L in sizes:
            if i + L <= n and (n - i - L == 0 or n - i - L >= 2):
                acc.append(word[i : i + L])
                yield from rec(i + L, acc)
                acc.pop()

    yield from rec(0, [])


def giveaways(tiles) -> list[float]:
    import lexicon as lx
    word, pos, out = "".join(tiles), 0, []
    for t in tiles:
        out.append(lx.giveaway(t, word, pos))
        pos += len(t)
    return out


def tiling_cost(tiles) -> float:
    """Lower is better. Dominated by how much the worst tile gives the answer away."""
    import lexicon as lx
    g = giveaways(tiles)
    c = W_WORST * max(0.0, max(g) - GIVEAWAY_OK) + W_MEAN * sum(g) / len(g)
    c += MIS_COST * misaligned(tiles)                 # small bonus for syllable boundaries
    for i, t in enumerate(tiles):
        c += LEN_COST[len(t)]
        if len(t) == 2 and i == 0:
            c += LEAD_TWO_COST
        if t == "ING":
            c += ING_TILE_COST
        elif len(t) == 4 and t.endswith("ING"):
            c -= ING4_BONUS
        if lx.is_word_tile(t):
            c += WORD_TILE_COST
    return round(c, 3)


@functools.lru_cache(maxsize=None)
def good_tilings(word: str) -> tuple[tuple[str, ...], ...]:
    """Acceptable tilings of a word, best first. ALL legal splits are candidates."""
    cands = []
    for t in all_tilings(word):
        if sum(1 for x in t if len(x) == 4) > 2:
            continue
        if any(not (set(x) & VOWELS) for x in t):      # hard rule: every tile has a vowel (Y counts)
            continue
        cands.append((tiling_cost(t), t))
    if not cands:
        return ()
    cands.sort()
    best = cands[0][0]
    return tuple(t for c, t in cands if c <= best + SLACK)


def worst_giveaway(word: str) -> float:
    """Worst-tile giveaway of the word's best split (1.0 if it cannot be tiled)."""
    gt = good_tilings(word)
    return max(giveaways(gt[0])) if gt else 1.0


if __name__ == "__main__":
    import sys
    for w in sys.argv[1:] or ["PURPLE", "LANTERN", "CONTRAST", "CARPENTER", "WATERMELON", "ABYSS"]:
        print(w, sorted(syllable_points(w)), [("·".join(t), tiling_cost(t), giveaways(t)) for t in good_tilings(w)][:3])
