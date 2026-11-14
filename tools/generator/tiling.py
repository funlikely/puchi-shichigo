"""Stage 2a: split a word into letter tiles.

Tiles are 2-4 letters. 3 letters is the norm, 4-letter tiles are welcome
occasionally (target 10-20% of a round), 2-letter tiles are a last resort.
Every tile must contain a vowel (AEIOUY) - no NT, RM, NTL. A bare ING tile is
discouraged; a 4-letter tile ending in ING (KING, TING, LING) is preferred.
Other common fragments (CON, ION, SUB...) are deliberately left alone.
"""
from __future__ import annotations

import functools

LEN_COST = {2: 1.5, 3: 0.0, 4: 0.5}
ING_TILE_COST = 1.5      # a bare ING tile is discouraged ...
ING4_BONUS = 0.5         # ... in favour of KING / TING / LING / RING
SLACK = 1.0          # keep tilings within this much of the word's best cost
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


def tiling_cost(tiles) -> float:
    c = 0.0
    for t in tiles:
        c += LEN_COST[len(t)]
        if t == "ING":
            c += ING_TILE_COST
        elif len(t) == 4 and t.endswith("ING"):
            c -= ING4_BONUS
    return round(c, 3)


@functools.lru_cache(maxsize=None)
def good_tilings(word: str) -> tuple[tuple[str, ...], ...]:
    """Acceptable tilings of a word, best first (deterministic order)."""
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


if __name__ == "__main__":
    for w in ["PURPLE", "LANTERN", "CONTRAST", "CARPENTER", "WATERMELON", "ABYSS"]:
        print(w, [("·".join(t), tiling_cost(t)) for t in good_tilings(w)])
