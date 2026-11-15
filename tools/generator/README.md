# Puzzle generator

Python 3.12 pipeline that builds Seven-Little-Words-style rounds for `content/puzzles.json`.
Deterministic code picks words, cuts tiles, validates and scores. Clue writing and clue judging
are a separate file-based stage so a human or an LLM can do them.

## Setup

    cd tools/generator
    python3 -m venv --without-pip .venv            # plain `python3 -m venv .venv` if ensurepip exists
    pip --python .venv/bin/python install wordfreq pyphen

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
* 2-tile answers are fine (STA·BLE); hard cap 5 per round, no score penalty.
* **Productive tiles (batch 003+).** `lexicon.productivity(tile, answer)` counts the distinct
  unrelated word families (4-letter stems of familiar words, excluding the answer's own) that
  contain the tile. A 3-letter tile under 6 families or a 4-letter tile under 3 is
  "low-productivity": +1.0 tiling cost, and each one beyond two per round costs 2 points of the
  8-point tile-productivity component (formerly "anchor balance"). So ENG·INE·ER beats
  ENGI·NEER. A 4-letter tile that is itself a common word (CITY, NECK; -ING tiles exempt) costs
  +1.0 in tiling and -1.5 in the score, so VEL·OC·ITY beats VELO·CITY.
* **Proper nouns** are allowed only from the curated `data/proper_nouns.txt` (well-known places,
  historical and mythical figures): max 2 per round, unless the round sets
  `"allowProperNouns": true` (geography / history / myth rounds).
* **Themed and STEM rounds** are editor-seeded: list 7-9 words per round in a manual-sets JSON
  (`generate.py --manual-file`), the generator picks the best 7 and cuts the tiles under the
  hard rules only. Theme words go in `data/vetted_words.txt`, which bypasses the dictionary,
  frequency and dull-word filters. Each round carries `category`: STEM / themed / mixed.
* **Clue originality.** Everything under `content/generated/` and `content/puzzles.json` is
  public, so clues must be original. `content/borrowed/` (gitignored) may be read for style
  only; a round using a borrowed clue must be tagged `"source": "borrowed"` and stay there.
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

## Tiling (batch 004+): per-tile giveaway

Rounds 1-70 were cut with older rules and are not re-tiled. From batch 004, `tiling.py` works
like this:

1. **Candidates:** every split of the answer into 2-4 letter tiles that each contain a vowel.
   Hyphenation is not a constraint.
2. **Per-tile giveaway** (`lexicon.giveaway`): roughly P(answer's word family | tile). Take all
   familiar words (5+ letters) containing the tile, weight each by compressed frequency
   (10^((zipf-3)/2)), group them into families (same first 5 letters, so ENGINE / ENGINEER /
   ENGINEERING are one family), and take the share of the weight that belongs to the answer's
   family. For a first or last tile, that share is averaged with the share among words that
   START or END with the tile. 0 = tells you nothing, 1 = only this answer. Curated answers that
   are not in the lexicon count themselves, so a tile found nowhere else (GKOK) scores 1.0.
3. **Split cost** (lower wins): 6 x (worst tile giveaway above 0.30) + 2 x mean giveaway
   + tile-length costs (2-letter 1.5, +0.6 more if it is the first tile; 4-letter 0.5; bare ING
   +1.5; 4-letter -ING tile -0.5) + 1.0 per 4-letter tile that is a common word (CITY)
   + 0.3 per tile boundary that is off a `pyphen` en_US hyphenation point (the syllable bonus).
   Splits within 0.5 of the best are kept, and the round-level search picks among them
   (widened to 1.5 for a hand-seeded themed round only if no valid round exists otherwise).
4. **Round level:** a tile with giveaway >= 0.40 is a "giveaway tile". The generator's mixed
   pool only uses words whose best split has none; the 8-point tile component of the structure
   score loses 2 per giveaway tile beyond two and 10 x the round's mean giveaway.

5. **Ugly clusters (batch 005+):** a tile that starts mid-word with a consonant cluster no familiar
   English word starts with (TRU·MPET, SAN·DCAS·TLE, CHE·CKMA·TE) or ends mid-word with one no word
   ends with costs +3.0 per edge (`lexicon.ugly_boundaries`, `UGLY_COST`), and such splits are
   dropped entirely when a clean split exists. For themed sets, words whose best split is still ugly
   (CHECKMATE, HAYSTACK) are left out by the editor script (`work/themes-005.py`).

Pair giveaway (how far the first two tiles pin the answer down) is not implemented.

| Split | Giveaway per tile | Worst | Cost | Verdict |
|---|---|---|---|---|
| ENGI·NEER | 0.94 / 0.58 | 0.94 | 6.39 | bad: ENGI only leads to ENGINE*, NEER is a small set |
| ENG·INE·ER | 0.39 / 0.04 / 0.00 | 0.39 | 2.90 | better |
| EN·GIN·EER | 0.03 / 0.10 / 0.17 | 0.17 | 2.61 | chosen |
| VELO·CITY | 0.53 / 0.07 | 0.53 | 4.26 | bad: VELO- start, CITY is a whole word |
| VEL·OC·ITY | 0.31 / 0.01 / 0.01 | 0.31 | 2.09 | chosen |
| VE·LOC·ITY | 0.01 / 0.02 / 0.01 | 0.02 | 2.13 | also fine (within 0.04) |
| SYM·PHO·NY | 0.06 / 0.02 / 0.02 | 0.06 | 1.56 | chosen |
| SYMP·HONY | 0.11 / 0.62 | 0.62 | 3.95 | bad: -HONY |
| PLAY·GRO·UND | 0.04 / 0.02 / 0.01 | 0.04 | 1.85 | chosen |
| PLA·YGRO·UND | 0.01 / 1.00 / 0.01 | 1.00 | 5.98 | bad: YGRO |
| EXP·ERI·MENT | 0.19 / 0.09 / 0.01 | 0.19 | 0.99 | chosen |
| EXP·ERIM·ENT | 0.19 / 0.75 / 0.01 | 0.75 | 4.46 | bad: ERIM |
| CRE·SCEN·DO | 0.01 / 0.04 / 0.03 | 0.04 | 2.35 | syllabic |
| CRE·SCE·NDO | 0.01 / 0.03 / 0.10 | 0.10 | 0.70 | chosen: cheaper on tile lengths, see note |

Note on CRESCENDO: the metric rates both splits as non-giveaway, so the tile-length cost
decides and the non-syllabic CRE·SCE·NDO wins. Raise `MIS_COST` in `tiling.py` if syllable
boundaries should count for more.

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
