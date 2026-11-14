# Puzzle generator

Python 3.12 pipeline that builds Seven-Little-Words-style rounds for `content/puzzles.json`.
Deterministic code picks words, cuts tiles, validates and scores. Clue writing and clue judging
are a separate file-based stage so a human or an LLM can do them.

## Setup

    cd tools/generator
    python3 -m venv --without-pip .venv            # plain `python3 -m venv .venv` if ensurepip exists
    pip --python .venv/bin/python install wordfreq

Needs `/usr/share/dict/american-english` (override with `PUCHI_DICT=/path`).

## Stages

| # | Stage | Code | In -> Out |
|---|---|---|---|
| 0 | Lexicons | `lexicon.py` | dictionary + wordfreq + `data/*.txt` -> answer pool (~9.5k words), decoy lexicon (~23k) |
| 1-3 | Select words, tile, assemble | `generate.py`, `tiling.py` | -> `work/candidates.json` |
| 4a | Clue writer | `clue_stage.py export`, `prompts/clue_writer.md` | `work/clue_requests.json` -> `clues/<batch>.clues.json` |
| 4b | Clue judge | `prompts/clue_judge.md` | adds `rating` 1-5 per clue and a `critique` per round |
| 5 | Score, select, publish | `build.py` | -> `content/generated/<batch>.json`, `<batch>-review.md`, `content/puzzles.json` |
| - | Validate | `validate.py FILE` | rule check + stats for any puzzles JSON; exit 1 on errors |

Reproduce batch-001:

    .venv/bin/python generate.py --count 300 --seed 1        # ~1 min on 12 cores, deterministic
    .venv/bin/python clue_stage.py export
    #   ... write clues/batch-001.clues.json (done by hand for batch-001) ...
    .venv/bin/python clue_stage.py check clues/batch-001.clues.json
    .venv/bin/python build.py --batch batch-001 --keep 20 --publish
    .venv/bin/python validate.py ../../content/puzzles.json

`generate.py` runs seeded hill-climbing: start from 7 random words (at least 3 from
`data/favorite_words.txt`), then repeatedly swap one word or re-cut its tiles, preferring words
that share a tile with the current pool, and keep any change that raises the structure score
while every hard rule still holds. Restarts are ranked and filtered so no word appears in two
candidates. To seed a round yourself, list words in `work/manual_sets.json` and pass `--manual`;
missing slots are filled for tile structure, not for theme.

### Plugging in an LLM

Stage 4 is the only part that needs judgement. `clue_stage.py` has a `call_llm()` stub and a
`write` command that runs the writer prompt then the judge prompt per candidate. Implement the
stub; nothing else changes. Use a different call (ideally a different model) for the judge.
In the clues file, `"critique": {"verdict": "cut"}` vetoes a round regardless of score.

## Hard rules (a round failing any of these is invalid)

* 7 answers, uppercase A-Z, 5-10 letters, each 2-4 tiles, tiles join to the answer.
* Tiles are 2-4 letters, never 5+, and **every tile contains a vowel (AEIOUY, so LY and SPY are
  fine; NT, RM, NTL are not)**. 17-22 tiles per round (generator aims at 18-21); at least half
  are 3 letters; at most 3 two-letter tiles (generator: 2); at most 30% four-letter tiles; the
  same tile text at most twice.
* Target mix (generator + score, not hard): 75-80% 3-letter, 12-15% 4-letter, 8-10% 2-letter;
  within a round 2-letter tiles never outnumber 4-letter ones, and at least 2 tiles are 4-letter.
* A bare `ING` tile is penalised (tiling cost +1.5, score -2); a 4-letter tile ending in ING
  (KING, TING, LING) is preferred. This is NOT applied to other fragments (CON, ION, SUB...).
* The generator emits no `-ING`/`-ED` answers and at most 1 abstract-suffix word per round.
* At most 3 two-tile answers.
* **Unique solution:** each answer can be spelled from the round's tile multiset in exactly one
  way. Since the app accepts any tile sequence that spells the answer, a second spelling would
  strand tiles; this rule also means no two answers can trade tiles. Identical tiles (two `ING`)
  are interchangeable and fine.
* Words: in the dictionary (lowercase entries only, so no proper nouns), wordfreq zipf 3.3-5.2
  (favorites may go down to 2.4), not on `data/blocklist.txt` or `data/reject_words.txt`, not a
  plain plural; no two answers sharing a 5-letter stem; no answer used in two rounds of a file;
  at most 1 `-ING`/`-ED` form and 2 abstract-suffix words (`-TION`, `-ITY`, `-LY`...) per round.
* Clues: non-empty, at most 7 words and 42 characters, no duplicates, must not contain the
  answer or a word sharing 5+ leading letters with it; theme/title must not contain an answer.

What code cannot decide: whether a clue also fits a decoy word. That is the judge's job
(prompt rule 6). Two batch-001 clues were rewritten for exactly this reason.

## Scoring formula (0-100)

`total = structure (0-80, scaled x0.625 to 0-50) + clues (0-50)`; constants are at the top of
`scoring.py`. (Batch 001 was scored with the older 80 + 20 split.)

**Structure**

| Component | Max | How |
|---|---|---|
| Decoys | 20 | Non-answer familiar words spellable from 2-3 pool tiles. Each weighs 0.3 (4 letters) / 0.7 (5) / 1.0 (6+), x0.6 if uncommon (zipf < 3.5), x0.3 if built from a single answer's own tiles. Sum, saturating at 12. |
| Tempting pairs | 16 | Ordered tile pairs from different answers whose join starts or ends at least 3 answer-pool words (so they look like the beginning or end of something). Count, saturating at 40. |
| Shared fragments | 10 | 2 x duplicate tile texts (max 2 counted) + pairs of 3-letter tiles from different answers that differ by one letter (CON/COM). Saturates at 8. |
| Anchor balance | 8 | Anchors = 3+ letter tiles found in at most 12 answer-pool words (CKT, NDM). Full marks for 3-6 anchors; -2 per anchor outside that range. |
| Shape | 12 | Tile count (20 best) 3 + share of 3-letter tiles 5 + number of 3-tile answers 2 + variety of answer lengths 2. |
| Word appeal | 14 | Mean per-word appeal: frequency sweet spot (zipf 3.6-4.8) x 1.0 for favorites, x0.6 otherwise, x0.5 again for abstract suffixes. |
| Penalties | - | -1.5 per 2-letter tile; -2 per bare ING tile; -2 if 4-letter tiles are outside 10-20% of the round; -2 if 2-letter tiles are not rarer than 4-letter ones; -2 per two-tile answer beyond the first; -1 per answer whose first tile has no rival continuation in the pool; -1.5 per `-ING`/`-ED` answer. |

**Clues**

| Component | Max | How |
|---|---|---|
| Rating | 30 | Mean judge rating mapped linearly from 2.5 (0 pts) to 4.5 (30 pts). |
| Variety | 8 | Distinct clue types in the round: 3+ = 8, 2 = 4. |
| Puns | 12 | Clues typed `pun` or `wordplay`; full marks at 4 per round. No "?" needed. |
| Penalties | - | -2 per clue rated 2 or lower; -3 per clue sharing 4 leading letters with its answer. |

## Human-feedback knobs

`data/favorite_words.txt` (words you love), `data/reject_words.txt` (words you never want),
`data/blocklist.txt` (offensive stems), the constants at the top of `lexicon.py`, `tiling.py`,
`scoring.py` and `generate.py`, and the two prompt files. The review sheet for each batch lists
them with current values.

## Known limits

* Word appeal is mostly a hand list plus a suffix heuristic; the generator still likes
  Latinate words because their fragments overlap.
* "Common enough" is print frequency, which undersells homey words (PRETZEL) and oversells
  news words (BATTALION).
* The decoy lexicon includes inflections and a few odd entries; decoy counts are generous.
* No difficulty estimate yet, and no play-test telemetry to calibrate any weight.
