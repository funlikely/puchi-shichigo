"""Stage 0: word lists.

Two lexicons are built from /usr/share/dict/american-english + wordfreq:

* ANSWER POOL  - words we are willing to use as answers (common, clean,
  5-10 letters, not plain plurals).
* DECOY LEXICON - every reasonably familiar word (4+ letters). A non-answer
  word from this list that can be spelled with tiles in a round's pool is a
  "decoy" (a tempting trap).
"""
from __future__ import annotations

import functools
import os
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
DICT_PATH = Path(os.environ.get("PUCHI_DICT", "/usr/share/dict/american-english"))

# ---- tunable knobs -------------------------------------------------------
ANSWER_MIN_LEN = 5
ANSWER_MAX_LEN = 10
ANSWER_MIN_ZIPF = 3.3      # below this a word starts to feel obscure
ANSWER_MAX_ZIPF = 5.2      # above this it is a function word ("between")
FAVORITE_MIN_ZIPF = 2.4    # hand-vetted favorites may be rarer in print (PRETZEL)
DECOY_MIN_ZIPF = 2.9
DECOY_MIN_LEN = 4
# -------------------------------------------------------------------------

try:
    from wordfreq import zipf_frequency as _zipf
    HAVE_WORDFREQ = True
except Exception:  # pragma: no cover - validate.py still works without it
    HAVE_WORDFREQ = False

    def _zipf(word, lang):
        return 0.0


@functools.lru_cache(maxsize=None)
def zipf(word: str) -> float:
    return _zipf(word.lower(), "en")


def _read_list(name: str) -> list[str]:
    out = []
    p = HERE / "data" / name
    if p.exists():
        for line in p.read_text().splitlines():
            line = line.split("#")[0].strip().lower()
            if line:
                out.append(line)
    return out


@functools.lru_cache(maxsize=None)
def _block():
    items = _read_list("blocklist.txt")
    stems = tuple(i[1:] for i in items if i.startswith("^"))
    exact = frozenset(i for i in items if not i.startswith("^"))
    return stems, exact


def is_blocked(word: str) -> bool:
    w = word.lower()
    stems, exact = _block()
    return w in exact or w.startswith(stems)


@functools.lru_cache(maxsize=None)
def rejected() -> frozenset[str]:
    return frozenset(_read_list("reject_words.txt"))


@functools.lru_cache(maxsize=None)
def dictionary() -> frozenset[str]:
    """Lowercase, purely alphabetic dictionary entries (drops proper nouns)."""
    words = set()
    with open(DICT_PATH, encoding="utf-8") as fh:
        for line in fh:
            w = line.strip()
            if re.fullmatch(r"[a-z]+", w):
                words.add(w)
    return frozenset(words)


@functools.lru_cache(maxsize=None)
def favorites() -> frozenset[str]:
    out = set()
    p = HERE / "data" / "favorite_words.txt"
    if p.exists():
        for line in p.read_text().splitlines():
            out.update(line.split("#")[0].lower().split())
    return frozenset(out)


ABSTRACT_SUFFIXES = (
    "tion", "sion", "ness", "ment", "ity", "ance", "ence", "ency", "ancy",
    "ive", "ism", "ize", "ized", "ally", "ely", "tly", "ily", "ously",
)


def is_abstract(word: str) -> bool:
    """Crude 'dry Latinate word' detector (INCLUSION, SEVERITY, STRICTLY)."""
    return word.lower().endswith(ABSTRACT_SUFFIXES)


@functools.lru_cache(maxsize=None)
def vetted() -> frozenset[str]:
    return frozenset(_read_list("vetted_words.txt"))


@functools.lru_cache(maxsize=None)
def proper_nouns() -> frozenset[str]:
    return frozenset(_read_list("proper_nouns.txt"))


def is_curated(word: str) -> bool:
    w = word.lower()
    return w in vetted() or w in proper_nouns()


@functools.lru_cache(maxsize=None)
def _fragment_stems():
    """fragment (2-4 letters) -> set of 4-letter word stems of familiar words containing it."""
    d: dict[str, set] = {}
    for w in decoy_lexicon():
        if len(w) < 5:
            continue
        stem = w[:4]
        for i in range(len(w)):
            for L in (2, 3, 4):
                if i + L <= len(w):
                    d.setdefault(w[i : i + L], set()).add(stem)
    return d


def productivity(tile: str, answer: str = "") -> int:
    """How many distinct UNRELATED word families contain this tile?

    Families are 4-letter stems of familiar words; the answer's own family is
    not counted, so ENGI (only ENGINE/ENGINEER) scores 0 and INE scores hundreds.
    """
    s = _fragment_stems().get(tile, ())
    return len(s) - (1 if answer[:4] in s else 0)


FAMILY_LEN = 5            # words sharing this many leading letters are one family


def _weight(word: str) -> float:
    """Frequency weight, compressed so a few very common words do not drown the rest."""
    return 10 ** ((max(zipf(word), 2.0) - 3.0) / 2)


@functools.lru_cache(maxsize=None)
def _giveaway_index():
    """(anywhere, start, end): fragment -> {family: weight} over familiar words."""
    anywhere: dict = {}
    start: dict = {}
    end: dict = {}
    for w in decoy_lexicon():
        if len(w) < 5:
            continue
        fam, wt, n = w[:FAMILY_LEN], _weight(w), len(w)
        seen = set()
        for L in (2, 3, 4):
            for i in range(n - L + 1):
                f = w[i : i + L]
                if f not in seen:
                    seen.add(f)
                    d = anywhere.setdefault(f, {})
                    d[fam] = d.get(fam, 0.0) + wt
            d = start.setdefault(w[:L], {})
            d[fam] = d.get(fam, 0.0) + wt
            d = end.setdefault(w[-L:], {})
            d[fam] = d.get(fam, 0.0) + wt
    return anywhere, start, end


def _share(table: dict, tile: str, answer: str) -> float:
    d = table.get(tile, {})
    fam = answer[:FAMILY_LEN]
    own, total = d.get(fam, 0.0), sum(d.values())
    if answer not in decoy_lexicon():          # curated / proper answers are not in the lexicon
        own, total = own + 1.0, total + 1.0
    return own / total if total else 1.0


@functools.lru_cache(maxsize=None)
def giveaway(tile: str, answer: str, pos: int) -> float:
    """How much does this one tile give the answer away?  0 = not at all, 1 = completely.

    Roughly P(answer's word family | tile): the frequency-weighted share of familiar words
    containing the tile that belong to the answer's own family. For a first or last tile the
    share among words that START / END with it is averaged in, because ENGI- only ever leads
    to ENGINE*, while -ITY ends thousands of words.
    """
    anywhere, start, end = _giveaway_index()
    g = _share(anywhere, tile, answer)
    if pos == 0:
        g = 0.5 * g + 0.5 * _share(start, tile, answer)
    elif pos + len(tile) == len(answer):
        g = 0.5 * g + 0.5 * _share(end, tile, answer)
    return round(g, 3)


def is_word_tile(tile: str) -> bool:
    """A 4-letter tile that is itself a common word (CITY, NECK) is a giveaway. -ING tiles are exempt."""
    return len(tile) == 4 and not tile.endswith("ING") and tile.lower() in dictionary() and zipf(tile) >= 4.0


def inflection(word: str) -> str | None:
    """Return 'plural', 'ing', 'ed' if word looks like an inflected form."""
    d = dictionary()
    w = word.lower()
    if w.endswith("s") and not w.endswith("ss"):
        if w[:-1] in d or (w.endswith("es") and w[:-2] in d) or (w.endswith("ies") and w[:-3] + "y" in d):
            return "plural"
    for suf, tag in (("ing", "ing"), ("ed", "ed")):
        if w.endswith(suf) and len(w) > len(suf) + 2:
            stem = w[: -len(suf)]
            cands = {stem, stem + "e"}
            if len(stem) > 2 and stem[-1] == stem[-2]:
                cands.add(stem[:-1])
            if stem.endswith("i"):
                cands.add(stem[:-1] + "y")
            if tag == "ed" and w[:-1] in d:
                cands.add(w[:-1])
            if cands & d:
                return tag
    return None


@functools.lru_cache(maxsize=None)
def decoy_lexicon() -> frozenset[str]:
    """UPPERCASE familiar words, used to detect decoys."""
    return frozenset(
        w.upper()
        for w in dictionary()
        if len(w) >= DECOY_MIN_LEN and zipf(w) >= DECOY_MIN_ZIPF and not is_blocked(w)
    )


@functools.lru_cache(maxsize=None)
def decoy_prefixes() -> frozenset[str]:
    out = set()
    for w in decoy_lexicon():
        for i in range(2, len(w) + 1):
            out.add(w[:i])
    return frozenset(out)


def answer_ok(word: str) -> tuple[bool, str]:
    """Is this word acceptable as an answer? Returns (ok, reason)."""
    w = word.lower()
    if not re.fullmatch(r"[a-z]+", w):
        return False, "non-alphabetic"
    if not (ANSWER_MIN_LEN <= len(w) <= ANSWER_MAX_LEN):
        return False, f"length {len(w)} outside {ANSWER_MIN_LEN}-{ANSWER_MAX_LEN}"
    if is_curated(w):
        return (False, "blocklisted") if is_blocked(w) else (True, "")
    if w not in dictionary():
        return False, "not in dictionary"
    if is_blocked(w):
        return False, "blocklisted"
    if w in rejected():
        return False, "on reject list"
    if HAVE_WORDFREQ:
        z = zipf(w)
        floor = FAVORITE_MIN_ZIPF if w in favorites() else ANSWER_MIN_ZIPF
        if z < floor:
            return False, f"too rare (zipf {z:.2f} < {floor})"
        if z > ANSWER_MAX_ZIPF:
            return False, f"too common/function-like (zipf {z:.2f})"
    if inflection(w) == "plural":
        return False, "plain plural / -s form"
    return True, ""


@functools.lru_cache(maxsize=None)
def answer_pool() -> tuple[str, ...]:
    """UPPERCASE answer candidates, sorted for determinism."""
    return tuple(sorted(w.upper() for w in dictionary() if answer_ok(w)[0]))


@functools.lru_cache(maxsize=None)
def fragment_stats():
    """How 'promiscuous' is a letter fragment?

    Returns (start, end, anywhere): dicts fragment -> number of answer-pool
    words that begin with / end with / contain the fragment (len 2-8).
    Used to tell ambiguous tiles (ING, CON, TER) from anchors (ZZL, MPH).
    """
    start: dict[str, int] = {}
    end: dict[str, int] = {}
    anywhere: dict[str, int] = {}
    for w in answer_pool():
        seen = set()
        n = len(w)
        for i in range(n):
            for L in range(2, 9):
                if i + L > n:
                    break
                f = w[i : i + L]
                if f not in seen:
                    seen.add(f)
                    anywhere[f] = anywhere.get(f, 0) + 1
                if i == 0:
                    start[f] = start.get(f, 0) + 1
                if i + L == n:
                    end[f] = end.get(f, 0) + 1
    return start, end, anywhere


if __name__ == "__main__":
    pool = answer_pool()
    print("dictionary:", len(dictionary()))
    print("answer pool:", len(pool))
    print("decoy lexicon:", len(decoy_lexicon()))
    s, e, a = fragment_stats()
    tri = sorted(((v, k) for k, v in a.items() if len(k) == 3), reverse=True)
    print("most promiscuous 3-letter fragments:", [k for _, k in tri[:25]])
    import random
    print(random.Random(1).sample(pool, 40))
