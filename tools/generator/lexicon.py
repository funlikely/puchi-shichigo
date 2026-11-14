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
