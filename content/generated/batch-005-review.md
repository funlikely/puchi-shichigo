# batch-005: review sheet

30 rounds kept out of 30 clued candidates (30 word-disjoint candidates came out of
the generator). Rounds are ordered best-first by total score, so Round 1 is what the scoring
formula likes most and the last round least. Play them, then tell me where the formula is wrong.
One round was removed by editor veto rather than by score (see "Cut candidates").

**Total = structure (0-80, deterministic) + clues (0-20, judge ratings).** Batch range:
38.0 to 66.0, mean 51.0.

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

none

---
## Round 131 [themed]: Kitchen Drawer  (total 66.0, candidate T06)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| It holds water like a sieve | COLANDER | COL · AN · DER | pun | 5 |
| Tin buster with a geared wheel | CANOPENER | CAN · OPE · NER | definition | 3 |
| Cheese shredder, the very best | GRATER | GRA · TER | pun | 5 |
| Ballet star with a shell game | NUTCRACKER | NUT · CRAC · KER | pun | 4 |
| Panhandle's cozy kitchen home | SAUCEPAN | SAU · CE · PAN | pun | 3 |
| Hot today, still hot tomorrow | THERMOS | THER · MOS | evocative | 4 |
| Small stirrer, a sugar's measure | TEASPOON | TEA · SPO · ON | definition | 3 |

**Tile pool (19: 3 x 2-letter, 14 x 3-letter, 2 x 4-letter):** AN CAN CE COL CRAC DER GRA KER MOS NER NUT ON OPE PAN SAU SPO TEA TER THER

**Score:** decoys 9.0/20 + tempting pairs 1.6/16 + shared fragments 10.0/10 + anchor balance 7.6/8 + shape 11.7/12 + word appeal 14.0/14 + penalties -12.9 = **structure 41.0/80** (scaled 25.6/50); clue rating 20.4/30 + variety 8.0/8 + puns 12.0/12 + penalties 0.0 = **clues 40.4/50**

- Decoys (12): ONCE, GRACE, CANON, PANTHER, COLON, ANON, GRADER, SAUCE*, OPENER*, SPOON*, COLDER*, CRACKER*
- Duplicate tiles: none; near-twin tiles: CAN/PAN, DER/KER, DER/NER, DER/TER, KER/NER, KER/TER, NER/TER, TEA/TER
- Giveaway tiles (share of the answer's family): SAU (0.411); whole-word tiles: none
- Answers whose first tile has no rival continuation: NUTCRACKER, SAUCEPAN, THERMOS, TEASPOON
- Word frequency (zipf): COLANDER 2.37, CANOPENER 0.0, GRATER 2.51, NUTCRACKER 2.86, SAUCEPAN 3.01, THERMOS 2.65, TEASPOON 3.3

**Critique:** Weakest: CANOPENER, SAUCEPAN, TEASPOON

## Round 132 [themed]: Fruit Bowl  (total 62.7, candidate T09)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Orange fruit that puckers if unripe | PERSIMMON | PER · SIM · MON | definition | 3 |
| Darlin' of an orange | CLEMENTINE | CLE · MENT · INE | pun | 5 |
| Stone fruit with a tropical twist | MANGO | MAN · GO | pun | 3 |
| Orange, or Beijing's tongue | MANDARIN | MAN · DA · RIN | wordplay | 4 |
| Spiky fruit that isn't from Maine | PINEAPPLE | PIN · EAP · PLE | pun | 4 |
| Peach with a close shave | NECTARINE | NEC · TAR · INE | pun | 5 |
| Fruit that's a pricey cot | APRICOT | APRI · COT | wordplay | 4 |

**Tile pool (19: 2 x 2-letter, 15 x 3-letter, 2 x 4-letter):** APRI CLE COT DA EAP GO INE INE MAN MAN MENT MON NEC PER PIN PLE RIN SIM TAR

**Score:** decoys 2.3/20 + tempting pairs 0.8/16 + shared fragments 8.8/10 + anchor balance 7.1/8 + shape 12.0/12 + word appeal 14.0/14 + penalties -12.5 = **structure 32.4/80** (scaled 20.2/50); clue rating 22.5/30 + variety 8.0/8 + puns 12.0/12 + penalties 0.0 = **clues 42.5/50**

- Decoys (3): SIMPLE, CLEMENT*, NECTAR*
- Duplicate tiles: INE, MAN; near-twin tiles: CLE/PLE, MAN/MON, PIN/RIN
- Giveaway tiles (share of the answer's family): APRI (0.753); whole-word tiles: none
- Answers whose first tile has no rival continuation: PERSIMMON, CLEMENTINE, MANDARIN, PINEAPPLE, NECTARINE, APRICOT
- Word frequency (zipf): PERSIMMON 2.54, CLEMENTINE 2.89, MANGO 3.56, MANDARIN 3.52, PINEAPPLE 3.58, NECTARINE 2.08, APRICOT 2.98

**Critique:** Weakest: PERSIMMON, MANGO

## Round 133 [themed]: Garden Shed  (total 59.3, candidate T28)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| British pruning shears | SECATEURS | SEC · ATE · URS | definition | 3 |
| Hand-held digger for bulbs | TROWEL | TRO · WEL | definition | 3 |
| Hanging diner with seed menu | BIRDFEEDER | BIRD · FEE · DER | pun | 4 |
| Container for planting ideas | FLOWERPOT | FLO · WER · POT | pun | 3 |
| Trimmer who's into dried plums | PRUNER | PRU · NER | pun | 4 |
| Growth stock for gardeners | FERTILIZER | FER · TIL · IZER | pun | 5 |
| One with lots of plots | GARDENER | GAR · DEN · ER | pun | 5 |

**Tile pool (19: 1 x 2-letter, 16 x 3-letter, 2 x 4-letter):** ATE BIRD DEN DER ER FEE FER FLO GAR IZER NER POT PRU SEC TIL TRO URS WEL WER

**Score:** decoys 4.0/20 + tempting pairs 0.4/16 + shared fragments 10.0/10 + anchor balance 7.2/8 + shape 12.0/12 + word appeal 14.0/14 + penalties -10.8 = **structure 36.7/80** (scaled 22.9/50); clue rating 20.4/30 + variety 4.0/8 + puns 12.0/12 + penalties 0.0 = **clues 36.4/50**

- Decoys (5): GARNER, WELDER, GARDEN*, FLOWER*, FEEDER*
- Duplicate tiles: none; near-twin tiles: DEN/DER, DER/FER, DER/NER, DER/WER, FEE/FER, FER/NER, FER/WER, NER/WER, WEL/WER
- Giveaway tiles (share of the answer's family): none; whole-word tiles: BIRD
- Answers whose first tile has no rival continuation: SECATEURS, TROWEL, BIRDFEEDER, FLOWERPOT, PRUNER, FERTILIZER
- Word frequency (zipf): SECATEURS 1.63, TROWEL 2.45, BIRDFEEDER 1.14, FLOWERPOT 1.98, PRUNER 1.61, FERTILIZER 3.42, GARDENER 3.49

**Critique:** Weakest: SECATEURS, TROWEL, FLOWERPOT

## Round 134 [themed]: Desserts  (total 58.2, candidate T08)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Frozen treat on a stick | POPSICLE | PO · PSI · CLE | definition | 3 |
| Pie filler with a set mind | CUSTARD | CUS · TARD | pun | 3 |
| Slow pour, as in January | MOLASSES | MO · LAS · SES | evocative | 4 |
| Pastry, or a fumbled possession | TURNOVER | TUR · NO · VER | wordplay | 5 |
| Meringue that rings a bell | PAVLOVA | PAV · LOVA | pun | 5 |
| Leave the gun, take these | CANNOLI | CAN · NOLI | evocative | 5 |
| Icy palate cleanser, sorta | SORBET | SOR · BET | pun | 4 |

**Tile pool (17: 3 x 2-letter, 11 x 3-letter, 3 x 4-letter):** BET CAN CLE CUS LAS LOVA MO NO NOLI PAV PO PSI SES SOR TARD TUR VER

**Score:** decoys 6.4/20 + tempting pairs 0.8/16 + shared fragments 0.0/10 + anchor balance 6.7/8 + shape 6.9/12 + word appeal 14.0/14 + penalties -13.0 = **structure 21.8/80** (scaled 13.6/50); clue rating 24.6/30 + variety 8.0/8 + puns 12.0/12 + penalties 0.0 = **clues 44.6/50**

- Decoys (6): CLEVER, VERSES, POSES, MONO, NOSES, MOVER
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): LOVA (0.717), NOLI (0.653); whole-word tiles: none
- Answers whose first tile has no rival continuation: POPSICLE, CUSTARD, TURNOVER, PAVLOVA, SORBET
- Word frequency (zipf): POPSICLE 2.82, CUSTARD 3.17, MOLASSES 3.0, TURNOVER 3.78, PAVLOVA 2.39, CANNOLI 2.34, SORBET 2.64

**Critique:** Weakest: POPSICLE, CUSTARD

## Round 135 [themed]: On the Farm  (total 57.7, candidate T03)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Where the cock of the walk walks | BARNYARD | BAR · NY · ARD | wordplay | 4 |
| Long dinner table for pigs | TROUGH | TRO · UGH | pun | 4 |
| Clod-breaking rig, or distressing | HARROW | HAR · ROW | wordplay | 4 |
| Dawn caller with a comb, no hair | ROOSTER | ROO · STER | pun | 4 |
| Lay-by for poultry | HENHOUSE | HEN · HO · USE | pun | 5 |
| Hired help that's always in the field | FARMHAND | FARM · HAND | pun | 4 |
| Furrow maker behind a horse | PLOUGHMAN | PLO · UGH · MAN | evocative | 3 |

**Tile pool (17: 2 x 2-letter, 12 x 3-letter, 3 x 4-letter):** ARD BAR FARM HAND HAR HEN HO MAN NY PLO ROO ROW STER TRO UGH UGH USE

**Score:** decoys 3.3/20 + tempting pairs 0.0/16 + shared fragments 5.0/10 + anchor balance 7.7/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -14.8 = **structure 24.3/80** (scaled 15.2/50); clue rating 22.5/30 + variety 8.0/8 + puns 12.0/12 + penalties 0.0 = **clues 42.5/50**

- Decoys (5): FARMHOUSE, BARROW, HOARD, HOUSE*, PLOUGH*
- Duplicate tiles: UGH; near-twin tiles: BAR/HAR, ROO/ROW
- Giveaway tiles (share of the answer's family): none; whole-word tiles: FARM, HAND
- Answers whose first tile has no rival continuation: BARNYARD, TROUGH, HARROW, ROOSTER, HENHOUSE, FARMHAND, PLOUGHMAN
- Word frequency (zipf): BARNYARD 2.57, TROUGH 3.43, HARROW 3.08, ROOSTER 3.31, HENHOUSE 2.04, FARMHAND 2.12, PLOUGHMAN 1.84

**Critique:** Weakest: PLOUGHMAN

## Round 136 [themed]: Fairy Tales  (total 57.6, candidate T04)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Lucky charm, no cereal required | TALISMAN | TAL · IS · MAN | pun | 4 |
| Under a spell, or simply delighted | ENCHANTED | ENC · HAN · TED | wordplay | 4 |
| Damsel's first voyage, perhaps | MAIDEN | MAI · DEN | wordplay | 3 |
| Hex, or what a stubbed toe gets | CURSE | CUR · SE | wordplay | 4 |
| Witch who's a cut above | SORCERESS | SOR · CER · ESS | pun | 3 |
| Cinderella's wicked in-law | STEPMOTHER | STEP · MOT · HER | definition | 3 |
| Seat for a warty fellow | TOADSTOOL | TO · ADS · TOOL | pun | 5 |

**Tile pool (19: 3 x 2-letter, 14 x 3-letter, 2 x 4-letter):** ADS CER CUR DEN ENC ESS HAN HER IS MAI MAN MOT SE SOR STEP TAL TED TO TOOL

**Score:** decoys 8.5/20 + tempting pairs 1.6/16 + shared fragments 5.0/10 + anchor balance 7.7/8 + shape 11.7/12 + word appeal 14.0/14 + penalties -17.6 = **structure 31.0/80** (scaled 19.4/50); clue rating 18.2/30 + variety 8.0/8 + puns 12.0/12 + penalties 0.0 = **clues 38.2/50**

- Decoys (8): TOTAL, DENTAL, DENSE, SORTED, MOTTO, CURSOR, MOTHER*, TOADS*
- Duplicate tiles: none; near-twin tiles: CER/CUR, CER/HER, HAN/MAN, MAI/MAN
- Giveaway tiles (share of the answer's family): none; whole-word tiles: STEP, TOOL
- Answers whose first tile has no rival continuation: TALISMAN, ENCHANTED, MAIDEN, CURSE, SORCERESS, STEPMOTHER
- Word frequency (zipf): TALISMAN 3.06, ENCHANTED 3.44, MAIDEN 3.82, CURSE 4.07, SORCERESS 2.76, STEPMOTHER 3.16, TOADSTOOL 1.98

**Critique:** Weakest: MAIDEN, SORCERESS, STEPMOTHER

## Round 137 [themed]: Board Games  (total 57.5, candidate T05)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Sand timer with a slim waist | HOURGLASS | HO · URG · LASS | evocative | 4 |
| What you lose when you lose it | MARBLES | MAR · BLES | wordplay | 5 |
| Mover you might pawn off | GAMEPIECE | GAM · EPI · ECE | pun | 4 |
| Where dice get rolling | GAMEBOARD | GAM · EBO · ARD | evocative | 3 |
| Thimble, say, or a gesture | TOKEN | TO · KEN | wordplay | 4 |
| Arrow that never quite flies | SPINNER | SPIN · NER | pun | 4 |
| Diagonal clergyman | BISHOP | BIS · HOP | wordplay | 5 |

**Tile pool (17: 2 x 2-letter, 12 x 3-letter, 3 x 4-letter):** ARD BIS BLES EBO ECE EPI GAM GAM HO HOP KEN LASS MAR NER SPIN TO URG

**Score:** decoys 1.4/20 + tempting pairs 0.0/16 + shared fragments 2.5/10 + anchor balance 7.3/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -13.6 = **structure 20.7/80** (scaled 12.9/50); clue rating 24.6/30 + variety 8.0/8 + puns 12.0/12 + penalties 0.0 = **clues 44.6/50**

- Decoys (2): HOARD, TONER
- Duplicate tiles: GAM; near-twin tiles: none
- Giveaway tiles (share of the answer's family): none; whole-word tiles: SPIN
- Answers whose first tile has no rival continuation: HOURGLASS, MARBLES, GAMEPIECE, GAMEBOARD, TOKEN, SPINNER, BISHOP
- Word frequency (zipf): HOURGLASS 2.92, MARBLES 3.19, GAMEPIECE 0.0, GAMEBOARD 1.4, TOKEN 3.82, SPINNER 3.36, BISHOP 4.38

**Critique:** Weakest: GAMEBOARD

## Round 138 [themed]: Office Supplies  (total 54.9, candidate T21)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Letter's jacket, or its limit | ENVELOPE | EN · VEL · OPE | wordplay | 4 |
| Bent wire that holds sheets | PAPERCLIP | PA · PERC · LIP | definition | 3 |
| Spiral for thoughts | NOTEBOOK | NOT · EBO · OK | pun | 3 |
| Poker player, or file holder | FOLDER | FOL · DER | wordplay | 5 |
| Three rings to hold them all | BINDER | BIN · DER | pun | 5 |
| Rock's loser, paper's cutter | SCISSORS | SCIS · SORS | wordplay | 5 |
| Highlighter's bolder cousin | MARKER | MAR · KER | definition | 3 |

**Tile pool (17: 3 x 2-letter, 11 x 3-letter, 3 x 4-letter):** BIN DER DER EBO EN FOL KER LIP MAR NOT OK OPE PA PERC SCIS SORS VEL

**Score:** decoys 1.7/20 + tempting pairs 1.2/16 + shared fragments 3.8/10 + anchor balance 7.0/8 + shape 6.9/12 + word appeal 14.0/14 + penalties -14.6 = **structure 19.9/80** (scaled 12.4/50); clue rating 22.5/30 + variety 8.0/8 + puns 12.0/12 + penalties 0.0 = **clues 42.5/50**

- Decoys (1): MARVEL
- Duplicate tiles: DER; near-twin tiles: DER/KER
- Giveaway tiles (share of the answer's family): SCIS (0.662); whole-word tiles: none
- Answers whose first tile has no rival continuation: ENVELOPE, PAPERCLIP, NOTEBOOK, FOLDER, BINDER, SCISSORS
- Word frequency (zipf): ENVELOPE 3.86, PAPERCLIP 2.32, NOTEBOOK 3.74, FOLDER 3.74, BINDER 3.32, SCISSORS 3.58, MARKER 3.87

**Critique:** Weakest: PAPERCLIP, NOTEBOOK, MARKER

## Round 139 [themed]: Sports Equipment  (total 54.5, candidate T17)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Net worth for a tennis player | RACKET | RAC · KET | pun | 5 |
| Head case for a cyclist | HELMET | HEL · MET | pun | 4 |
| Spear that's thrown for points | JAVELIN | JA · VEL · IN | definition | 3 |
| Weight for the not-so-bright | DUMBBELL | DUMB · BELL | pun | 5 |
| Deck with wheels | SKATEBOARD | SKAT · EBO · ARD | wordplay | 4 |
| Plank that's on a roll | SURFBOARD | SURF · BO · ARD | pun | 4 |
| Lifter's bar with a weight problem | BARBELL | BAR · BELL | pun | 4 |

**Tile pool (17: 3 x 2-letter, 9 x 3-letter, 5 x 4-letter):** ARD ARD BAR BELL BELL BO DUMB EBO HEL IN JA KET MET RAC SKAT SURF VEL

**Score:** decoys 0.3/20 + tempting pairs 0.0/16 + shared fragments 7.5/10 + anchor balance 6.7/8 + shape 5.6/12 + word appeal 14.0/14 + penalties -18.3 = **structure 15.8/80** (scaled 9.9/50); clue rating 24.6/30 + variety 8.0/8 + puns 12.0/12 + penalties 0.0 = **clues 44.6/50**

- Decoys (1): BOARD*
- Duplicate tiles: ARD, BELL; near-twin tiles: HEL/VEL, KET/MET
- Giveaway tiles (share of the answer's family): SKAT (0.77); whole-word tiles: BELL, DUMB
- Answers whose first tile has no rival continuation: RACKET, HELMET, JAVELIN, DUMBBELL, SKATEBOARD, SURFBOARD, BARBELL
- Word frequency (zipf): RACKET 3.33, HELMET 4.02, JAVELIN 2.9, DUMBBELL 2.63, SKATEBOARD 3.21, SURFBOARD 2.81, BARBELL 2.65

**Critique:** Weakest: JAVELIN

## Round 140 [themed]: Toolbox  (total 54.2, candidate T07)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Joining wires, metal-to-metal | SOLDERING | SOL · DER · ING | definition | 3 |
| Cheat, or carve a niche | CHISEL | CHI · SEL | wordplay | 5 |
| Grit with a rough-and-ready finish | SANDPAPER | SAND · PA · PER | pun | 4 |
| Shooter that pins things down | STAPLEGUN | STA · PLE · GUN | pun | 4 |
| Locking pliers with a firm hold | VISEGRIP | VIS · EG · RIP | definition | 3 |
| Hammer with no time to lose | NAILGUN | NAIL · GUN | pun | 3 |
| Gauge with a jaw for size | CALIPER | CALI · PER | definition | 3 |

**Tile pool (18: 2 x 2-letter, 13 x 3-letter, 3 x 4-letter):** CALI CHI DER EG GUN GUN ING NAIL PA PER PER PLE RIP SAND SEL SOL STA VIS

**Score:** decoys 5.3/20 + tempting pairs 0.0/16 + shared fragments 7.5/10 + anchor balance 7.6/8 + shape 10.4/12 + word appeal 14.0/14 + penalties -15.9 = **structure 29.0/80** (scaled 18.1/50); clue rating 16.1/30 + variety 8.0/8 + puns 12.0/12 + penalties 0.0 = **clues 36.1/50**

- Decoys (7): PASTA, RIPPLE, RIPPER, NAILING, PAPER*, STAPLE*, SOLDER*
- Duplicate tiles: GUN, PER; near-twin tiles: DER/PER, SEL/SOL
- Giveaway tiles (share of the answer's family): none; whole-word tiles: NAIL, SAND
- Answers whose first tile has no rival continuation: SOLDERING, CHISEL, SANDPAPER, STAPLEGUN, VISEGRIP, NAILGUN, CALIPER
- Word frequency (zipf): SOLDERING 2.96, CHISEL 2.96, SANDPAPER 2.73, STAPLEGUN 0.0, VISEGRIP 0.0, NAILGUN 1.12, CALIPER 2.65

**Critique:** Weakest: SOLDERING, VISEGRIP, NAILGUN, CALIPER

## Round 141 [themed]: Haunted House  (total 54.2, candidate T23)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Table talk with the departed | SEANCE | SE · ANCE | pun | 4 |
| Floorboard's late-night complaint | CREAKING | CREA · KING | evocative | 4 |
| Swinging lights, at least in movies | CHANDELIER | CHAN · DEL · IER | evocative | 3 |
| Below-stairs place for spirits | CELLAR | CEL · LAR | pun | 5 |
| Liberace's three-branched light | CANDELABRA | CAN · DELA · BRA | evocative | 3 |
| Closet resident with no body | SKELETON | SKE · LE · TON | pun | 5 |
| Box that's a dead end | COFFIN | COF · FIN | pun | 4 |

**Tile pool (17: 2 x 2-letter, 10 x 3-letter, 5 x 4-letter):** ANCE BRA CAN CEL CHAN COF CREA DEL DELA FIN IER KING LAR LE SE SKE TON

**Score:** decoys 7.0/20 + tempting pairs 1.2/16 + shared fragments 1.2/10 + anchor balance 7.4/8 + shape 5.8/12 + word appeal 14.0/14 + penalties -11.5 = **structure 25.1/80** (scaled 15.7/50); clue rating 22.5/30 + variety 4.0/8 + puns 12.0/12 + penalties 0.0 = **clues 38.5/50**

- Decoys (5): FINANCE, CANCEL, CANTON, BRAKING, CREASE
- Duplicate tiles: none; near-twin tiles: CEL/DEL
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: CREAKING, CHANDELIER, CELLAR, SKELETON, COFFIN
- Word frequency (zipf): SEANCE 2.35, CREAKING 2.8, CHANDELIER 3.19, CELLAR 3.6, CANDELABRA 2.45, SKELETON 3.8, COFFIN 3.8

**Critique:** Weakest: CHANDELIER, CANDELABRA

## Round 142 [themed]: Space Mission  (total 53.9, candidate T12)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Arugula, or a lift-off | ROCKET | ROC · KET | wordplay | 5 |
| Round trip that never lands | ORBIT | OR · BIT | pun | 4 |
| Liftoff site, or career springboard | LAUNCHPAD | LA · UNCH · PAD | wordplay | 4 |
| Ten to one it's a launch | COUNTDOWN | CO · UNT · DOWN | pun | 5 |
| Outfit for a stellar outing | SPACESUIT | SPA · CES · UIT | pun | 4 |
| Lander part, or course unit | MODULE | MOD · ULE | wordplay | 4 |
| It keeps you down to earth | GRAVITY | GRA · VITY | pun | 4 |

**Tile pool (17: 3 x 2-letter, 11 x 3-letter, 3 x 4-letter):** BIT CES CO DOWN GRA KET LA MOD OR PAD ROC SPA UIT ULE UNCH UNT VITY

**Score:** decoys 3.5/20 + tempting pairs 0.0/16 + shared fragments 2.5/10 + anchor balance 6.6/8 + shape 7.9/12 + word appeal 14.0/14 + penalties -16.8 = **structure 17.8/80** (scaled 11.1/50); clue rating 26.8/30 + variety 4.0/8 + puns 12.0/12 + penalties 0.0 = **clues 42.8/50**

- Decoys (6): COLA, LACES, GRACES, COUNT*, LAUNCH*, SPACES*
- Duplicate tiles: none; near-twin tiles: BIT/UIT, UIT/UNT
- Giveaway tiles (share of the answer's family): PAD (0.535); whole-word tiles: DOWN
- Answers whose first tile has no rival continuation: ROCKET, ORBIT, LAUNCHPAD, COUNTDOWN, SPACESUIT, MODULE, GRAVITY
- Word frequency (zipf): ROCKET 4.31, ORBIT 4.03, LAUNCHPAD 2.66, COUNTDOWN 3.68, SPACESUIT 2.32, MODULE 3.89, GRAVITY 4.21

**Critique:** Weakest: 

## Round 143 [themed]: Coffee Shop  (total 53.0, candidate T27)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Twice-baked dunker | BISCOTTI | BIS · COT · TI | definition | 4 |
| Espresso watered down | AMERICANO | AME · RIC · ANO | definition | 3 |
| Espresso with a spot of milk | MACCHIATO | MAC · CHI · ATO | definition | 3 |
| Pot whose ideas keep bubbling | PERCOLATOR | PER · COL · ATOR | pun | 4 |
| Latte artist behind the counter | BARISTA | BARI · STA | evocative | 4 |
| Top choice for a baker | MUFFIN | MUF · FIN | pun | 4 |
| Bean machine, or a hard worker | GRINDER | GRIN · DER | wordplay | 4 |

**Tile pool (18: 1 x 2-letter, 14 x 3-letter, 3 x 4-letter):** AME ANO ATO ATOR BARI BIS CHI COL COT DER FIN GRIN MAC MUF PER RIC STA TI

**Score:** decoys 2.7/20 + tempting pairs 0.4/16 + shared fragments 3.8/10 + anchor balance 6.7/8 + shape 11.0/12 + word appeal 14.0/14 + penalties -10.0 = **structure 28.5/80** (scaled 17.8/50); clue rating 18.2/30 + variety 8.0/8 + puns 9.0/12 + penalties 0.0 = **clues 35.2/50**

- Decoys (2): COLDER, FINDER
- Duplicate tiles: none; near-twin tiles: ANO/ATO, COL/COT, DER/PER
- Giveaway tiles (share of the answer's family): GRIN (0.869), MUF (0.729); whole-word tiles: none
- Answers whose first tile has no rival continuation: BISCOTTI, AMERICANO, MACCHIATO, PERCOLATOR, BARISTA, MUFFIN, GRINDER
- Word frequency (zipf): BISCOTTI 2.27, AMERICANO 2.65, MACCHIATO 2.34, PERCOLATOR 1.99, BARISTA 3.02, MUFFIN 3.35, GRINDER 3.32

**Critique:** Weakest: AMERICANO, MACCHIATO

## Round 144 [themed]: Seaside  (total 52.8, candidate T20)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Seaside walk, or a dance's grand march | PROMENADE | PRO · MEN · ADE | wordplay | 4 |
| Lotion for your outer layer | SUNSCREEN | SUNS · CRE · EN | pun | 3 |
| Jetty's tip, a sea-facing end | PIERHEAD | PIER · HEAD | definition | 3 |
| Sold by a she by the shore | SEASHELL | SE · ASH · ELL | wordplay | 5 |
| Rocky basin left at low water | TIDEPOOL | TID · EP · OOL | definition | 3 |
| Shoal with nothing on tap | SANDBAR | SAND · BAR | pun | 5 |
| Bird with a bill that holds | PELICAN | PEL · ICAN | pun | 5 |

**Tile pool (18: 3 x 2-letter, 10 x 3-letter, 5 x 4-letter):** ADE ASH BAR CRE ELL EN EP HEAD ICAN MEN OOL PEL PIER PRO SAND SE SUNS TID

**Score:** decoys 3.8/20 + tempting pairs 2.0/16 + shared fragments 0.0/10 + anchor balance 7.5/8 + shape 6.1/12 + word appeal 14.0/14 + penalties -16.9 = **structure 16.5/80** (scaled 10.3/50); clue rating 22.5/30 + variety 8.0/8 + puns 12.0/12 + penalties 0.0 = **clues 42.5/50**

- Decoys (4): SEEN, CREEP, PROSE, PROPEL
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): none; whole-word tiles: HEAD, SAND
- Answers whose first tile has no rival continuation: SUNSCREEN, PIERHEAD, TIDEPOOL, SANDBAR, PELICAN
- Word frequency (zipf): PROMENADE 3.17, SUNSCREEN 3.29, PIERHEAD 1.43, SEASHELL 2.39, TIDEPOOL 1.08, SANDBAR 2.31, PELICAN 3.07

**Critique:** Weakest: SUNSCREEN, PIERHEAD, TIDEPOOL

## Round 145 [themed]: Insects  (total 51.2, candidate T01)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Summer's little bloodsucker | MOSQUITO | MOS · QUI · TO | evocative | 3 |
| Critic who really eats up the woodwork | TERMITE | TER · MITE | pun | 4 |
| Bug with a bright future | FIREFLY | FIR · EFLY | pun | 4 |
| Buzzy worker that never stops to hum | BUMBLEBEE | BUM · BLE · BEE | pun | 3 |
| Leggy crawler with a shoe budget | CENTIPEDE | CEN · TIP · EDE | pun | 4 |
| Plague member in swarming form | LOCUST | LOC · UST | definition | 3 |
| Bug named for hairpiece placement | EARWIG | EAR · WIG | wordplay | 4 |

**Tile pool (17: 1 x 2-letter, 14 x 3-letter, 2 x 4-letter):** BEE BLE BUM CEN EAR EDE EFLY FIR LOC MITE MOS QUI TER TIP TO UST WIG

**Score:** decoys 2.0/20 + tempting pairs 0.0/16 + shared fragments 0.0/10 + anchor balance 6.7/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -8.4 = **structure 24.2/80** (scaled 15.1/50); clue rating 16.1/30 + variety 8.0/8 + puns 12.0/12 + penalties 0.0 = **clues 36.1/50**

- Decoys (2): CENTER, BUMBLE*
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): BEE (0.548), WIG (0.604); whole-word tiles: none
- Answers whose first tile has no rival continuation: MOSQUITO, TERMITE, FIREFLY, BUMBLEBEE, LOCUST, EARWIG
- Word frequency (zipf): MOSQUITO 3.61, TERMITE 2.78, FIREFLY 3.13, BUMBLEBEE 2.92, CENTIPEDE 2.79, LOCUST 3.0, EARWIG 2.07

**Critique:** Weakest: MOSQUITO, BUMBLEBEE, LOCUST

## Round 146 [themed]: Music Theory  (total 50.8, candidate T19)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Clef that's three times as high | TREBLE | TRE · BLE | pun | 4 |
| Clashing notes, or a jarring mismatch | DISSONANCE | DIS · SON · ANCE | definition | 3 |
| Rhythm in a march or phrase | CADENCE | CAD · ENCE | definition | 3 |
| Lowest female voice, singing low | CONTRALTO | CON · TRAL · TO | definition | 3 |
| Eight notes in a row | OCTAVE | OCT · AVE | definition | 3 |
| Score keeping, in music | NOTATION | NOTA · TION | pun | 5 |
| Tony's family name, or high voice | SOPRANO | SOP · RA · NO | wordplay | 5 |

**Tile pool (17: 3 x 2-letter, 9 x 3-letter, 5 x 4-letter):** ANCE AVE BLE CAD CON DIS ENCE NO NOTA OCT RA SON SOP TION TO TRAL TRE

**Score:** decoys 6.5/20 + tempting pairs 1.2/16 + shared fragments 3.8/10 + anchor balance 7.5/8 + shape 5.6/12 + word appeal 14.0/14 + penalties -13.7 = **structure 24.9/80** (scaled 15.6/50); clue rating 18.2/30 + variety 8.0/8 + puns 9.0/12 + penalties 0.0 = **clues 35.2/50**

- Decoys (5): NOBLE, NOTION, NOTABLE, RATION, CONNOTATION
- Duplicate tiles: none; near-twin tiles: ANCE/ENCE, CON/SON, SON/SOP
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: TREBLE, CADENCE, CONTRALTO, OCTAVE, NOTATION, SOPRANO
- Word frequency (zipf): TREBLE 3.33, DISSONANCE 3.02, CADENCE 3.12, CONTRALTO 2.16, OCTAVE 3.08, NOTATION 3.47, SOPRANO 3.31

**Critique:** Weakest: DISSONANCE, CADENCE, CONTRALTO, OCTAVE

## Round 147 [themed]: Clothing  (total 50.2, candidate T15)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| What you wear when Mom is cold | SWEATER | SWE · ATER | pun | 5 |
| Book's cover, or a blazer | JACKET | JAC · KET | wordplay | 4 |
| Pants, if you're being proper | TROUSERS | TRO · US · ERS | wordplay | 3 |
| Top that's a bit puffed up | BLOUSE | BLO · USE | pun | 3 |
| Mister Rogers' button-down knit | CARDIGAN | CAR · DIG · AN | evocative | 4 |
| Spot that's part of a pattern | POLKADOT | POL · KA · DOT | pun | 4 |
| Arrest, or a neck's dress | COLLAR | COL · LAR | wordplay | 4 |

**Tile pool (17: 3 x 2-letter, 13 x 3-letter, 1 x 4-letter):** AN ATER BLO CAR COL DIG DOT ERS JAC KA KET LAR POL SWE TRO US USE

**Score:** decoys 0.6/20 + tempting pairs 0.4/16 + shared fragments 2.5/10 + anchor balance 7.0/8 + shape 9.0/12 + word appeal 14.0/14 + penalties -17.9 = **structure 15.6/80** (scaled 9.8/50); clue rating 20.4/30 + variety 8.0/8 + puns 12.0/12 + penalties 0.0 = **clues 40.4/50**

- Decoys (2): USERS*, POLKA*
- Duplicate tiles: none; near-twin tiles: CAR/LAR, COL/POL
- Giveaway tiles (share of the answer's family): DOT (0.563), JAC (0.505); whole-word tiles: none
- Answers whose first tile has no rival continuation: SWEATER, JACKET, TROUSERS, BLOUSE, CARDIGAN, POLKADOT, COLLAR
- Word frequency (zipf): SWEATER 3.78, JACKET 4.32, TROUSERS 3.7, BLOUSE 3.38, CARDIGAN 3.21, POLKADOT 1.65, COLLAR 4.04

**Critique:** Weakest: TROUSERS, BLOUSE

## Round 148 [themed]: Vegetable Patch  (total 49.1, candidate T10)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Cool customer in a salad | CUCUMBER | CU · CUM · BER | pun | 5 |
| Coach in disguise, at midnight | PUMPKIN | PUMP · KIN | evocative | 4 |
| Squash that won't stop multiplying | ZUCCHINI | ZUC · CHI · NI | evocative | 4 |
| Green that says let us | LETTUCE | LETT · UCE | pun | 5 |
| Spears that leave a scent | ASPARAGUS | ASP · ARA · GUS | evocative | 3 |
| Red veg that can't be beaten | BEETROOT | BEE · TRO · OT | pun | 4 |
| Pale carrot cousin, average cut | PARSNIP | PAR · SNIP | pun | 4 |

**Tile pool (18: 3 x 2-letter, 12 x 3-letter, 3 x 4-letter):** ARA ASP BEE BER CHI CU CUM GUS KIN LETT NI OT PAR PUMP SNIP TRO UCE ZUC

**Score:** decoys 0.0/20 + tempting pairs 0.0/16 + shared fragments 1.2/10 + anchor balance 6.5/8 + shape 8.3/12 + word appeal 14.0/14 + penalties -16.5 = **structure 13.6/80** (scaled 8.5/50); clue rating 24.6/30 + variety 4.0/8 + puns 12.0/12 + penalties 0.0 = **clues 40.6/50**

- Decoys (0): none
- Duplicate tiles: none; near-twin tiles: BEE/BER
- Giveaway tiles (share of the answer's family): SNIP (0.557), ZUC (1.0); whole-word tiles: PUMP
- Answers whose first tile has no rival continuation: CUCUMBER, PUMPKIN, ZUCCHINI, LETTUCE, ASPARAGUS, BEETROOT, PARSNIP
- Word frequency (zipf): CUCUMBER 3.41, PUMPKIN 3.83, ZUCCHINI 2.96, LETTUCE 3.56, ASPARAGUS 3.25, BEETROOT 2.76, PARSNIP 2.41

**Critique:** Weakest: ASPARAGUS

## Round 149 [themed]: Volcano  (total 48.7, candidate T30)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Ground zero for a quake | EPICENTER | EPI · CEN · TER | definition | 3 |
| Of rock, molten and furious | MAGMATIC | MAG · MAT · IC | evocative | 3 |
| Bowl with a hot temper | CRATER | CRA · TER | pun | 4 |
| Shake that's not on the menu | TREMOR | TRE · MOR | pun | 4 |
| Floating stone for scrubbing | PUMICE | PUM · ICE | definition | 3 |
| Outburst from a mountain | ERUPTION | ER · UPT · ION | pun | 4 |
| Hot stream with no fish | LAVAFLOW | LAV · AF · LOW | pun | 3 |

**Tile pool (18: 3 x 2-letter, 15 x 3-letter):** AF CEN CRA EPI ER IC ICE ION LAV LOW MAG MAT MOR PUM TER TER TRE UPT

**Score:** decoys 5.1/20 + tempting pairs 2.0/16 + shared fragments 2.5/10 + anchor balance 7.7/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -17.6 = **structure 23.6/80** (scaled 14.8/50); clue rating 13.9/30 + variety 8.0/8 + puns 12.0/12 + penalties 0.0 = **clues 33.9/50**

- Decoys (6): AFTER, MATTER, LOWER, CENTER*, MAGIC*, ERUPT*
- Duplicate tiles: TER; near-twin tiles: none
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: EPICENTER, MAGMATIC, CRATER, TREMOR, PUMICE, ERUPTION, LAVAFLOW
- Word frequency (zipf): EPICENTER 2.9, MAGMATIC 2.34, CRATER 3.55, TREMOR 3.05, PUMICE 2.51, ERUPTION 3.52, LAVAFLOW 0.0

**Critique:** Weakest: EPICENTER, MAGMATIC, PUMICE, LAVAFLOW

## Round 150 [themed]: Musical Instruments  (total 47.6, candidate T02)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Highland sack with drones | BAGPIPES | BAG · PIP · ES | pun | 4 |
| Fiddle, in formal attire | VIOLIN | VIO · LIN | wordplay | 4 |
| Lute's little Italian cousin | MANDOLIN | MAN · DO · LIN | definition | 3 |
| Low reed full of hot air | BASSOON | BAS · SOON | pun | 4 |
| Flute's shrill kid sibling | PICCOLO | PIC · COLO | evocative | 3 |
| Bars you hit for an A | XYLOPHONE | XY · LOP · HONE | pun | 5 |
| Four strings, Hawaiian vacation | UKULELE | UKUL · ELE | evocative | 3 |

**Tile pool (17: 3 x 2-letter, 10 x 3-letter, 4 x 4-letter):** BAG BAS COLO DO ELE ES HONE LIN LIN LOP MAN PIC PIP SOON UKUL VIO XY

**Score:** decoys 3.2/20 + tempting pairs 0.4/16 + shared fragments 5.0/10 + anchor balance 2.0/8 + shape 6.8/12 + word appeal 14.0/14 + penalties -16.2 = **structure 15.1/80** (scaled 9.4/50); clue rating 18.2/30 + variety 8.0/8 + puns 12.0/12 + penalties 0.0 = **clues 38.2/50**

- Decoys (4): DOES, LINES, BASES, PIPES*
- Duplicate tiles: LIN; near-twin tiles: BAG/BAS, PIC/PIP
- Giveaway tiles (share of the answer's family): COLO (0.508), ELE (0.501), UKUL (1.0), XY (0.535); whole-word tiles: SOON
- Answers whose first tile has no rival continuation: BAGPIPES, VIOLIN, MANDOLIN, BASSOON, PICCOLO, XYLOPHONE, UKULELE
- Word frequency (zipf): BAGPIPES 2.74, VIOLIN 3.74, MANDOLIN 2.78, BASSOON 2.53, PICCOLO 3.03, XYLOPHONE 2.37, UKULELE 3.01

**Critique:** Weakest: MANDOLIN, PICCOLO, UKULELE

## Round 151 [themed]: Weather Report  (total 47.6, candidate T16)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Sudden gust, or a baby's yell | SQUALL | SQU · ALL | wordplay | 4 |
| Rain without a drop of restraint | DOWNPOUR | DOWN · POUR | pun | 4 |
| Summer greeting from the sun | HEATWAVE | HEA · TWA · VE | pun | 4 |
| Gray sky, or too many actors | OVERCAST | OV · ERC · AST | wordplay | 5 |
| Rainy seasons in South Asia | MONSOONS | MONS · OONS | definition | 3 |
| Gentle wind, or easy task | BREEZE | BRE · EZE | wordplay | 4 |
| Pressure unit, not a candy | MILLIBAR | MIL · LIB · AR | pun | 4 |

**Tile pool (17: 3 x 2-letter, 10 x 3-letter, 4 x 4-letter):** ALL AR AST BRE DOWN ERC EZE HEA LIB MIL MONS OONS OV POUR SQU TWA VE

**Score:** decoys 0.2/20 + tempting pairs 0.0/16 + shared fragments 0.0/10 + anchor balance 7.1/8 + shape 4.8/12 + word appeal 14.0/14 + penalties -17.9 = **structure 8.2/80** (scaled 5.1/50); clue rating 22.5/30 + variety 8.0/8 + puns 12.0/12 + penalties 0.0 = **clues 42.5/50**

- Decoys (1): HEAVE*
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): POUR (0.566); whole-word tiles: DOWN, POUR
- Answers whose first tile has no rival continuation: DOWNPOUR, HEATWAVE, OVERCAST, MONSOONS, BREEZE, MILLIBAR
- Word frequency (zipf): SQUALL 2.67, DOWNPOUR 2.83, HEATWAVE 2.85, OVERCAST 3.05, MONSOONS 2.37, BREEZE 3.86, MILLIBAR 1.25

**Critique:** Weakest: MONSOONS

## Round 152 [themed]: Rainforest  (total 47.3, candidate T13)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Spotted cat, or luxury car | JAGUAR | JAG · UAR | wordplay | 4 |
| Big-billed bird for a duet | TOUCAN | TOU · CAN | pun | 5 |
| Treetop roof, or bed's crown | CANOPY | CAN · OPY | wordplay | 4 |
| Fish with a biting wit | PIRANHA | PI · RAN · HA | pun | 4 |
| Sticky-toed croaker up a trunk | TREEFROG | TRE · EF · ROG | evocative | 3 |
| Silverback in the mist | GORILLA | GOR · ILLA | evocative | 3 |
| Pineapple's flowery jungle relative | BROMELIAD | BRO · MEL · IAD | definition | 3 |

**Tile pool (17: 3 x 2-letter, 13 x 3-letter, 1 x 4-letter):** BRO CAN CAN EF GOR HA IAD ILLA JAG MEL OPY PI RAN ROG TOU TRE UAR

**Score:** decoys 0.0/20 + tempting pairs 0.0/16 + shared fragments 3.8/10 + anchor balance 4.3/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -17.6 = **structure 14.5/80** (scaled 9.1/50); clue rating 18.2/30 + variety 8.0/8 + puns 12.0/12 + penalties 0.0 = **clues 38.2/50**

- Decoys (0): none
- Duplicate tiles: CAN; near-twin tiles: CAN/RAN
- Giveaway tiles (share of the answer's family): JAG (0.736), ROG (0.505), UAR (0.514); whole-word tiles: none
- Answers whose first tile has no rival continuation: JAGUAR, TOUCAN, CANOPY, PIRANHA, TREEFROG, GORILLA, BROMELIAD
- Word frequency (zipf): JAGUAR 3.51, TOUCAN 2.36, CANOPY 3.52, PIRANHA 2.75, TREEFROG 1.21, GORILLA 3.62, BROMELIAD 1.63

**Critique:** Weakest: TREEFROG, GORILLA, BROMELIAD

## Round 153 [themed]: Hospital  (total 46.0, candidate T22)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Cutting-edge doctor | SURGEON | SUR · GEON | pun | 5 |
| Wound wrap, or a quick fix | BANDAGE | BAN · DAGE | wordplay | 3 |
| Jab-delivering needle | SYRINGE | SYR · INGE | definition | 3 |
| Siren on wheels | AMBULANCE | AM · BUL · ANCE | evocative | 3 |
| Put-under for an operation | ANESTHESIA | ANES · THE · SIA | definition | 3 |
| Doc's verdict on what ails you | DIAGNOSIS | DIA · GNO · SIS | definition | 3 |
| Laughter, reportedly the best | MEDICINE | MED · ICI · NE | wordplay | 4 |

**Tile pool (18: 2 x 2-letter, 11 x 3-letter, 5 x 4-letter):** AM ANCE ANES BAN BUL DAGE DIA GEON GNO ICI INGE MED NE SIA SIS SUR SYR THE

**Score:** decoys 2.7/20 + tempting pairs 0.8/16 + shared fragments 3.8/10 + anchor balance 6.3/8 + shape 8.2/12 + word appeal 14.0/14 + penalties -11.5 = **structure 24.2/80** (scaled 15.1/50); clue rating 13.9/30 + variety 8.0/8 + puns 9.0/12 + penalties 0.0 = **clues 30.9/50**

- Decoys (2): THESIS, AMNESIA
- Duplicate tiles: none; near-twin tiles: DIA/SIA, SIA/SIS, SUR/SYR
- Giveaway tiles (share of the answer's family): ANES (0.568), DAGE (0.404); whole-word tiles: none
- Answers whose first tile has no rival continuation: SURGEON, SYRINGE, ANESTHESIA, DIAGNOSIS, MEDICINE
- Word frequency (zipf): SURGEON 4.13, BANDAGE 3.24, SYRINGE 3.27, AMBULANCE 4.06, ANESTHESIA 3.39, DIAGNOSIS 4.2, MEDICINE 4.73

**Critique:** Weakest: BANDAGE, SYRINGE, AMBULANCE, ANESTHESIA, DIAGNOSIS

## Round 154 [themed]: Reptiles  (total 45.6, candidate T25)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Lounge _____, or a scaly creature | LIZARD | LIZ · ARD | wordplay | 4 |
| Pet lizard that's green with envy | IGUANA | IGU · ANA | pun | 3 |
| Color-changer who blends in | CHAMELEON | CHA · MEL · EON | definition | 3 |
| Squeezer from the Amazon | ANACONDA | ANA · CON · DA | pun | 3 |
| Turtle's freshwater cousin | TERRAPIN | TER · RAP · IN | definition | 3 |
| Amphibian once thought fireproof | SALAMANDER | SALA · MAN · DER | evocative | 3 |
| Kiwi reptile with a third eye | TUATARA | TUAT · ARA | evocative | 4 |

**Tile pool (18: 2 x 2-letter, 14 x 3-letter, 2 x 4-letter):** ANA ANA ARA ARD CHA CON DA DER EON IGU IN LIZ MAN MEL RAP SALA TER TUAT

**Score:** decoys 1.5/20 + tempting pairs 0.8/16 + shared fragments 7.5/10 + anchor balance 4.8/8 + shape 11.0/12 + word appeal 14.0/14 + penalties -12.8 = **structure 26.9/80** (scaled 16.8/50); clue rating 11.8/30 + variety 8.0/8 + puns 9.0/12 + penalties 0.0 = **clues 28.8/50**

- Decoys (2): CHAIN, INTER*
- Duplicate tiles: ANA; near-twin tiles: ANA/ARA, ARA/ARD, CON/EON, DER/TER
- Giveaway tiles (share of the answer's family): IGU (0.51), LIZ (0.514), TUAT (0.515); whole-word tiles: none
- Answers whose first tile has no rival continuation: LIZARD, IGUANA, ANACONDA, TERRAPIN, SALAMANDER, TUATARA
- Word frequency (zipf): LIZARD 3.63, IGUANA 2.74, CHAMELEON 3.1, ANACONDA 2.97, TERRAPIN 2.28, SALAMANDER 2.76, TUATARA 1.58

**Critique:** Weakest: IGUANA, CHAMELEON, ANACONDA, TERRAPIN, SALAMANDER

## Round 155 [themed]: Theater  (total 44.5, candidate T26)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Once more, with feeling | ENCORE | ENC · ORE | evocative | 4 |
| One-person show of talk | MONOLOGUE | MON · OLO · GUE | definition | 3 |
| Torch bearer who seats you | USHER | US · HER | pun | 3 |
| Arch that frames the stage | PROSCENIUM | PRO · SCE · NIUM | definition | 3 |
| The house, in a theater | AUDIENCE | AUDI · ENCE | wordplay | 4 |
| Crew member who works the wings | STAGEHAND | STA · GEH · AND | pun | 4 |
| Dress for a role | COSTUME | COST · UME | pun | 3 |

**Tile pool (17: 1 x 2-letter, 12 x 3-letter, 4 x 4-letter):** AND AUDI COST ENC ENCE GEH GUE HER MON NIUM OLO ORE PRO SCE STA UME US

**Score:** decoys 0.0/20 + tempting pairs 0.0/16 + shared fragments 0.0/10 + anchor balance 7.3/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -13.4 = **structure 17.0/80** (scaled 10.6/50); clue rating 13.9/30 + variety 8.0/8 + puns 12.0/12 + penalties 0.0 = **clues 33.9/50**

- Decoys (0): none
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): none; whole-word tiles: COST
- Answers whose first tile has no rival continuation: ENCORE, USHER, PROSCENIUM, AUDIENCE, STAGEHAND, COSTUME
- Word frequency (zipf): ENCORE 3.39, MONOLOGUE 3.27, USHER 3.51, PROSCENIUM 2.19, AUDIENCE 4.73, STAGEHAND 1.93, COSTUME 4.18

**Critique:** Weakest: MONOLOGUE, USHER, PROSCENIUM, COSTUME

## Round 156 [themed]: Arctic  (total 42.8, candidate T14)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Tusked mustache with flippers | WALRUS | WAL · RUS | evocative | 4 |
| White hunter who's hard to sell | POLARBEAR | POL · ARB · EAR | pun | 5 |
| Hooded coat for a long wait | PARKA | PAR · KA | pun | 3 |
| Pinniped pelt, once in fashion | SEALSKIN | SE · ALS · KIN | definition | 3 |
| Whaler's spear on a line | HARPOON | HAR · POON | definition | 3 |
| Sled with an engine | SNOWMOBILE | SNOW · MOB · ILE | definition | 3 |
| Treeless, frozen plain | TUNDRA | TUN · DRA | definition | 3 |

**Tile pool (17: 2 x 2-letter, 13 x 3-letter, 2 x 4-letter):** ALS ARB DRA EAR HAR ILE KA KIN MOB PAR POL POON RUS SE SNOW TUN WAL

**Score:** decoys 2.2/20 + tempting pairs 0.4/16 + shared fragments 3.8/10 + anchor balance 7.5/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -14.0 = **structure 23.9/80** (scaled 14.9/50); clue rating 13.9/30 + variety 8.0/8 + puns 6.0/12 + penalties 0.0 = **clues 27.9/50**

- Decoys (4): POLKA, PARSE, MOBILE*, SEALS*
- Duplicate tiles: none; near-twin tiles: EAR/HAR, EAR/PAR, HAR/PAR
- Giveaway tiles (share of the answer's family): none; whole-word tiles: SNOW
- Answers whose first tile has no rival continuation: WALRUS, POLARBEAR, PARKA, HARPOON, SNOWMOBILE, TUNDRA
- Word frequency (zipf): WALRUS 2.98, POLARBEAR 1.19, PARKA 2.76, SEALSKIN 1.61, HARPOON 2.83, SNOWMOBILE 2.75, TUNDRA 3.08

**Critique:** Weakest: PARKA, SEALSKIN, HARPOON, SNOWMOBILE, TUNDRA

## Round 157 [themed]: Royal Court  (total 42.7, candidate T29)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Woman wearing the empire's crown | EMPRESS | EMP · RESS | definition | 3 |
| Crowning moment | CORONATION | COR · ONAT · ION | pun | 5 |
| Ruler for a ruler too young | REGENT | REG · ENT | definition | 3 |
| Exchequer's head, or a university's | CHANCELLOR | CHAN · CEL · LOR | definition | 3 |
| Royal residence with a lot of rooms | PALACE | PAL · ACE | definition | 3 |
| Envoy on a foreign mission | AMBASSADOR | AMB · ASSA · DOR | definition | 3 |
| One who plays to the throne | COURTIER | CO · URT · IER | pun | 4 |

**Tile pool (18: 1 x 2-letter, 13 x 3-letter, 4 x 4-letter):** ACE AMB ASSA CEL CHAN CO COR DOR EMP ENT IER ION LOR ONAT PAL REG RESS URT

**Score:** decoys 4.9/20 + tempting pairs 1.2/16 + shared fragments 3.8/10 + anchor balance 7.1/8 + shape 10.4/12 + word appeal 14.0/14 + penalties -11.2 = **structure 30.1/80** (scaled 18.8/50); clue rating 13.9/30 + variety 4.0/8 + puns 6.0/12 + penalties 0.0 = **clues 23.9/50**

- Decoys (4): REGION, COLOR, REGRESSION, COURT*
- Duplicate tiles: none; near-twin tiles: COR/DOR, COR/LOR, DOR/LOR
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: EMPRESS, CORONATION, CHANCELLOR, PALACE, AMBASSADOR
- Word frequency (zipf): EMPRESS 3.45, CORONATION 3.45, REGENT 3.45, CHANCELLOR 4.13, PALACE 4.45, AMBASSADOR 4.35, COURTIER 2.64

**Critique:** Weakest: EMPRESS, REGENT, CHANCELLOR, PALACE, AMBASSADOR

## Round 158 [themed]: Detective Kit  (total 41.8, candidate T18)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Folder for a cold one | CASEFILE | CAS · EF · ILE | pun | 4 |
| Surveillance from a parked car | STAKEOUT | STA · KE · OUT | definition | 3 |
| Private eye, in a word | SLEUTH | SLE · UTH | definition | 3 |
| Fake mustache and other faces | DISGUISE | DIS · GU · ISE | evocative | 4 |
| Following, at a discreet distance | TAILING | TAI · LING | definition | 3 |
| Coroner's hearing into a death | INQUEST | INQU · EST | definition | 3 |
| Making mountains out of molehills | MAGNIFYING | MAG · NIF · YING | wordplay | 4 |

**Tile pool (18: 3 x 2-letter, 12 x 3-letter, 3 x 4-letter):** CAS DIS EF EST GU ILE INQU ISE KE LING MAG NIF OUT SLE STA TAI UTH YING

**Score:** decoys 3.4/20 + tempting pairs 0.0/16 + shared fragments 3.8/10 + anchor balance 7.7/8 + shape 9.3/12 + word appeal 14.0/14 + penalties -15.9 = **structure 22.3/80** (scaled 13.9/50); clue rating 13.9/30 + variety 8.0/8 + puns 6.0/12 + penalties 0.0 = **clues 27.9/50**

- Decoys (4): GUEST, STAYING, STAKE*, GUISE*
- Duplicate tiles: none; near-twin tiles: ILE/ISE, ILE/SLE, LING/YING
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: CASEFILE, STAKEOUT, SLEUTH, DISGUISE, TAILING, INQUEST, MAGNIFYING
- Word frequency (zipf): CASEFILE 1.37, STAKEOUT 2.05, SLEUTH 2.63, DISGUISE 3.72, TAILING 2.69, INQUEST 3.21, MAGNIFYING 3.0

**Critique:** Weakest: STAKEOUT, SLEUTH, TAILING, INQUEST

## Round 159 [themed]: Wild West  (total 38.9, candidate T11)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Hip home for a pistol | HOLSTER | HOL · STER | definition | 3 |
| Swinging-door watering hole | SALOON | SAL · OON | evocative | 4 |
| Panner with high hopes | PROSPECTOR | PRO · SPEC · TOR | pun | 4 |
| Rope trick for a steer | LASSO | LAS · SO | definition | 3 |
| Outlaw with nothing left to lose | DESPERADO | DES · PER · ADO | evocative | 3 |
| Bronco bust-up for a buckle | RODEO | RO · DEO | evocative | 3 |
| Settlers' convoy, westward ho | WAGONTRAIN | WAG · ONT · RAIN | definition | 3 |

**Tile pool (17: 2 x 2-letter, 12 x 3-letter, 3 x 4-letter):** ADO DEO DES HOL LAS ONT OON PER PRO RAIN RO SAL SO SPEC STER TOR WAG

**Score:** decoys 4.7/20 + tempting pairs 0.8/16 + shared fragments 1.2/10 + anchor balance 7.5/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -11.7 = **structure 25.7/80** (scaled 16.1/50); clue rating 11.8/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 22.8/50**

- Decoys (4): PROPER, ROSTER, ROTOR, TORSO
- Duplicate tiles: none; near-twin tiles: DEO/DES
- Giveaway tiles (share of the answer's family): none; whole-word tiles: RAIN
- Answers whose first tile has no rival continuation: HOLSTER, SALOON, LASSO, DESPERADO, RODEO, WAGONTRAIN
- Word frequency (zipf): HOLSTER 3.07, SALOON 3.43, PROSPECTOR 2.63, LASSO 2.74, DESPERADO 2.36, RODEO 3.47, WAGONTRAIN 0.0

**Critique:** Weakest: HOLSTER, LASSO, DESPERADO, RODEO, WAGONTRAIN

## Round 160 [themed]: Mythical Creatures  (total 38.0, candidate T24)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Half eagle, half lion | GRIFFIN | GRIF · FIN | definition | 3 |
| Hairy guy at full moon | WEREWOLF | WER · EW · OLF | evocative | 4 |
| Sea monster to be released | KRAKEN | KRA · KEN | evocative | 4 |
| Wailing spirit with a scream | BANSHEE | BAN · SHEE | definition | 3 |
| Gold-hoarding shoemaker | LEPRECHAUN | LEP · RECH · AUN | evocative | 4 |
| Serpent with a killer gaze | BASILISK | BAS · IL · ISK | pun | 4 |
| Gutter spout with a face | GARGOYLE | GAR · GOY · LE | pun | 4 |

**Tile pool (18: 3 x 2-letter, 12 x 3-letter, 3 x 4-letter):** AUN BAN BAS EW FIN GAR GOY GRIF IL ISK KEN KRA LE LEP OLF RECH SHEE WER

**Score:** decoys 0.3/20 + tempting pairs 0.0/16 + shared fragments 1.2/10 + anchor balance 0.0/8 + shape 9.3/12 + word appeal 14.0/14 + penalties -15.6 = **structure 9.3/80** (scaled 5.8/50); clue rating 18.2/30 + variety 8.0/8 + puns 6.0/12 + penalties 0.0 = **clues 32.2/50**

- Decoys (1): BASIL*
- Duplicate tiles: none; near-twin tiles: BAN/BAS
- Giveaway tiles (share of the answer's family): AUN (0.51), GOY (1.0), GRIF (1.0), KRA (1.0), OLF (0.611), SHEE (0.524), WER (0.506); whole-word tiles: none
- Answers whose first tile has no rival continuation: GRIFFIN, WEREWOLF, KRAKEN, BANSHEE, LEPRECHAUN, BASILISK, GARGOYLE
- Word frequency (zipf): GRIFFIN 3.9, WEREWOLF 3.33, KRAKEN 2.85, BANSHEE 2.81, LEPRECHAUN 2.69, BASILISK 2.42, GARGOYLE 2.63

**Critique:** Weakest: GRIFFIN, BANSHEE
