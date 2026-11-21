# batch-011: review sheet

54 rounds kept out of 54 clued candidates (54 word-disjoint candidates came out of
the generator). Rounds are ordered best-first by total score, so Round 1 is what the scoring
formula likes most and the last round least. Play them, then tell me where the formula is wrong.
One round was removed by editor veto rather than by score (see "Cut candidates").

**Total = structure (0-80, deterministic) + clues (0-20, judge ratings).** Batch range:
18.8 to 47.3, mean 30.2.

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
## Round 321 [themed]: Condiments: Pickle Jar  (total 47.3, candidate Q03)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Neon-yellow British pickle | PICCALILLI | PIC · CAL · ILLI | evocative | 4 |
| Tiny cucumber, or a London tower | GHERKIN | GHER · KIN | wordplay | 4 |
| French mini pickle | CORNICHON | COR · NIC · HON | definition | 3 |
| Brined buds, or escapades | CAPERS | CAP · ERS | wordplay | 4 |
| Reuben's fermented cabbage | SAUERKRAUT | SAU · ERK · RA · UT | definition | 3 |
| Korean ferment | KIMCHI | KIM · CHI | definition | 3 |
| Relish or a fluffy dog | CHOWCHOW | CHOW · CHOW | wordplay | 4 |

**Tile pool (18: 2 x 2-letter, 12 x 3-letter, 4 x 4-letter):** CAL CAP CHI CHOW CHOW COR ERK ERS GHER HON ILLI KIM KIN NIC PIC RA SAU UT

**Score:** decoys 1.7/20 + tempting pairs 0.0/16 + shared fragments 7.5/10 + anchor balance 4.3/8 + shape 9.3/12 + word appeal 14.0/14 + penalties -14.1 = **structure 22.7/80** (scaled 14.2/50); clue rating 16.1/30 + variety 8.0/8 + puns 9.0/12 + penalties 0.0 = **clues 33.1/50**

- Decoys (1): PICNIC
- Duplicate tiles: CHOW; near-twin tiles: CAL/CAP, ERK/ERS, KIM/KIN, NIC/PIC
- Giveaway tiles (share of the answer's family): CHI (0.501), CHOW (1.0), GHER (0.532); whole-word tiles: none
- Answers whose first tile has no rival continuation: PICCALILLI, GHERKIN, CORNICHON, CAPERS, SAUERKRAUT, KIMCHI, CHOWCHOW
- Word frequency (zipf): PICCALILLI 1.49, GHERKIN 2.11, CORNICHON 1.02, CAPERS 2.83, SAUERKRAUT 2.66, KIMCHI 2.84, CHOWCHOW 0.0

**Critique:** Themed round.

## Round 322 [themed]: They Might Be Giants Lyrics: Side Three  (total 41.4, candidate P03)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Bag returned in Dead | GROCERIES | GRO · CER · IES | trivia | 4 |
| Date noted in Dead | EXPIRATION | EX · PIRA · TION | trivia | 4 |
| How everybody dies, Don't Let's Start | FRUSTRATED | FRU · STRA · TED | trivia | 4 |
| Built from garbage, in Kiss Me | EMPIRE | EMP · IRE | trivia | 4 |
| Hand you can't shake, Racist Friend | DEVILS | DEV · ILS | trivia | 4 |
| Feet in the Dr. Evil song | WEBBED | WEB · BED | trivia | 4 |
| Signifies | DENOTES | DENO · TES | definition | 2 |

**Tile pool (17: 1 x 2-letter, 12 x 3-letter, 4 x 4-letter):** BED CER DENO DEV EMP EX FRU GRO IES ILS IRE PIRA STRA TED TES TION WEB

**Score:** decoys 9.0/20 + tempting pairs 0.8/16 + shared fragments 5.0/10 + anchor balance 7.3/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -11.3 = **structure 33.9/80** (scaled 21.2/50); clue rating 18.2/30 + variety 4.0/8 + puns 0.0/12 + penalties -2.0 = **clues 20.2/50**

- Decoys (7): TESTED, PIRATES, FRUSTRATION, EXEMPTION, DENOTED, EXEMPTED, GROCER*
- Duplicate tiles: none; near-twin tiles: BED/TED, IES/ILS, IES/TES, TED/TES
- Giveaway tiles (share of the answer's family): FRU (0.407); whole-word tiles: none
- Answers whose first tile has no rival continuation: GROCERIES, FRUSTRATED, EMPIRE, DEVILS, WEBBED, DENOTES
- Word frequency (zipf): GROCERIES 3.67, EXPIRATION 3.48, FRUSTRATED 4.08, EMPIRE 4.54, DEVILS 3.79, WEBBED 2.53, DENOTES 3.42

**Critique:** Themed round.

## Round 323 [themed]: Star Trek: Lower Decks: Episodes  (total 41.1, candidate L03)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| ___ Vessel | MOIST | MO · IST | trivia | 4 |
| The Spy ___ | HUMONGOUS | HUM · ONG · OUS | trivia | 4 |
| A Mathematically Perfect ___ | REDEMPTION | RED · EMP · TION | trivia | 4 |
| ___ Point, Mariner's movie | CRISIS | CRI · SIS | trivia | 4 |
| ___ Edict, about buffer time | TEMPORAL | TEM · PO · RAL | trivia | 4 |
| Season three opener, stuck on Earth | GROUNDED | GRO · UND · ED | trivia | 4 |
| Courtroom episode, Latin for truth | VERITAS | VERI · TAS | trivia | 4 |

**Tile pool (18: 3 x 2-letter, 13 x 3-letter, 2 x 4-letter):** CRI ED EMP GRO HUM IST MO ONG OUS PO RAL RED SIS TAS TEM TION UND VERI

**Score:** decoys 9.2/20 + tempting pairs 1.6/16 + shared fragments 0.0/10 + anchor balance 7.5/8 + shape 10.4/12 + word appeal 14.0/14 + penalties -13.0 = **structure 29.7/80** (scaled 18.6/50); clue rating 22.5/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 22.5/50**

- Decoys (9): MOTION, MORAL, POUND, CRIED, MOUND, POTION, POUNDED, GROUND*, TEMPO*
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: HUMONGOUS, CRISIS, TEMPORAL, GROUNDED, VERITAS
- Word frequency (zipf): MOIST 3.69, HUMONGOUS 2.69, REDEMPTION 3.82, CRISIS 4.62, TEMPORAL 3.63, GROUNDED 3.84, VERITAS 2.84

**Critique:** Themed round.

## Round 324 [themed]: Discworld: The Watch  (total 39.3, candidate N02)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Troll sergeant with a siege crossbow | DETRITUS | DE · TRI · TUS | trivia | 4 |
| ___ Mine Road watch house | TREACLE | TREA · CLE | trivia | 4 |
| Dwarf forensics expert in a skirt | CHEERY | CHE · ERY | trivia | 4 |
| Nobby's rank | CORPORAL | COR · POR · AL | trivia | 3 |
| Adopted dwarf, secretly a king | CARROT | CAR · ROT | trivia | 4 |
| Copper's club | TRUNCHEON | TRUN · CHE · ON | definition | 3 |
| Detritus's siege crossbow | PIECEMAKER | PIE · CEM · AKER | trivia | 4 |

**Tile pool (18: 3 x 2-letter, 12 x 3-letter, 3 x 4-letter):** AKER AL CAR CEM CHE CHE CLE COR DE ERY ON PIE POR ROT TREA TRI TRUN TUS

**Score:** decoys 3.2/20 + tempting pairs 1.6/16 + shared fragments 5.0/10 + anchor balance 7.2/8 + shape 9.3/12 + word appeal 14.0/14 + penalties -13.0 = **structure 27.3/80** (scaled 17.1/50); clue rating 18.2/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 22.2/50**

- Decoys (4): DEAL, TRIAL, DECOR, CORAL*
- Duplicate tiles: CHE; near-twin tiles: CAR/COR, CHE/CLE
- Giveaway tiles (share of the answer's family): PIE (0.445); whole-word tiles: none
- Answers whose first tile has no rival continuation: TREACLE, CHEERY, CARROT, TRUNCHEON, PIECEMAKER
- Word frequency (zipf): DETRITUS 2.72, TREACLE 2.48, CHEERY 3.01, CORPORAL 3.65, CARROT 3.62, TRUNCHEON 2.1, PIECEMAKER 0.0

**Critique:** Themed round.

## Round 325 [themed]: Discworld: Witches  (total 39.0, candidate N04)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Granny, of the steely stare | WEATHERWAX | WEA · THER · WAX | trivia | 3 |
| Youngest witch of the coven | MAGRAT | MAG · RAT | trivia | 4 |
| Magrat's surname | GARLICK | GAR · LICK | trivia | 4 |
| Tiffany's surname | ACHING | ACH · ING | trivia | 4 |
| Small kingdom, big witches | LANCRE | LAN · CRE | trivia | 4 |
| Granny's practical psychology | HEADOLOGY | HEA · DOL · OGY | trivia | 4 |
| Witch transport | BROOMSTICK | BRO · OMS · TICK | definition | 2 |

**Tile pool (17: 14 x 3-letter, 3 x 4-letter):** ACH BRO CRE DOL GAR HEA ING LAN LICK MAG OGY OMS RAT THER TICK WAX WEA

**Score:** decoys 10.2/20 + tempting pairs 0.4/16 + shared fragments 2.5/10 + anchor balance 7.2/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -10.8 = **structure 33.5/80** (scaled 20.9/50); clue rating 16.1/30 + variety 4.0/8 + puns 0.0/12 + penalties -2.0 = **clues 18.1/50**

- Decoys (8): BROTHER, RATING, HEATHER, LICKING, TICKING, WAXING, WEATHERING, WEATHER*
- Duplicate tiles: none; near-twin tiles: HEA/WEA, LICK/TICK
- Giveaway tiles (share of the answer's family): WAX (0.66); whole-word tiles: none
- Answers whose first tile has no rival continuation: WEATHERWAX, MAGRAT, GARLICK, ACHING, LANCRE, HEADOLOGY, BROOMSTICK
- Word frequency (zipf): WEATHERWAX 1.66, MAGRAT 0.0, GARLICK 2.12, ACHING 3.29, LANCRE 1.02, HEADOLOGY 0.0, BROOMSTICK 2.47

**Critique:** Themed round.

## Round 326 [themed]: Star Trek: Deep Space Nine: Episodes  (total 38.5, candidate K07)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Trials and ___-ations | TRIBBLES | TRIB · BLES | trivia | 4 |
| Vic, the holographic crooner | FONTAINE | FON · TA · INE | trivia | 4 |
| Pilot, and Sisko's role | EMISSARY | EM · ISS · ARY | trivia | 3 |
| What You Leave ___, the finale | BEHIND | BEH · IND | trivia | 4 |
| Sacrifice of ___ | ANGELS | ANG · ELS | trivia | 4 |
| ___ Evil, an Occupation mystery | NECESSARY | NEC · ESS · ARY | trivia | 4 |
| ___ Cause, a Garak caper | IMPROBABLE | IMP · ROBA · BLE | trivia | 4 |

**Tile pool (18: 2 x 2-letter, 13 x 3-letter, 3 x 4-letter):** ANG ARY ARY BEH BLE BLES ELS EM ESS FON IMP IND INE ISS NEC ROBA TA TRIB

**Score:** decoys 2.8/20 + tempting pairs 0.8/16 + shared fragments 6.2/10 + anchor balance 7.0/8 + shape 10.4/12 + word appeal 14.0/14 + penalties -12.4 = **structure 28.9/80** (scaled 18.1/50); clue rating 20.4/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 20.4/50**

- Decoys (2): TABLE, TABLES
- Duplicate tiles: ARY; near-twin tiles: ELS/ESS, ESS/ISS, IND/INE
- Giveaway tiles (share of the answer's family): NEC (0.482); whole-word tiles: none
- Answers whose first tile has no rival continuation: TRIBBLES, FONTAINE, EMISSARY, BEHIND, ANGELS, NECESSARY, IMPROBABLE
- Word frequency (zipf): TRIBBLES 1.92, FONTAINE 2.99, EMISSARY 2.84, BEHIND 5.29, ANGELS 4.26, NECESSARY 4.91, IMPROBABLE 3.29

**Critique:** Themed round.

## Round 327 [themed]: Condiments: Mother Sauces  (total 38.5, candidate Q08)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| White sauce from butter, flour, milk | BECHAMEL | BEC · HA · MEL | definition | 3 |
| Stock-based mother sauce | VELOUTE | VEL · OUTE | definition | 4 |
| Brown mother sauce | ESPAGNOLE | ESP · AGN · OLE | definition | 4 |
| Tarragon sauce for steak | BEARNAISE | BE · ARN · AISE | definition | 3 |
| Mayo dressed up with capers | REMOULADE | REM · OUL · ADE | definition | 3 |
| Fish-and-chips sauce | TARTAR | TAR · TAR | definition | 3 |
| Dutch, to a Frenchman | HOLLANDAIS | HOLL · AND · AIS | wordplay | 4 |

**Tile pool (19: 2 x 2-letter, 14 x 3-letter, 3 x 4-letter):** ADE AGN AIS AISE AND ARN BE BEC ESP HA HOLL MEL OLE OUL OUTE REM TAR TAR VEL

**Score:** decoys 2.0/20 + tempting pairs 0.4/16 + shared fragments 5.0/10 + anchor balance 7.4/8 + shape 11.7/12 + word appeal 14.0/14 + penalties -12.3 = **structure 28.2/80** (scaled 17.6/50); clue rating 13.9/30 + variety 4.0/8 + puns 3.0/12 + penalties 0.0 = **clues 20.9/50**

- Decoys (3): HAREM, REMAND, REMADE*
- Duplicate tiles: TAR; near-twin tiles: AGN/ARN, MEL/VEL
- Giveaway tiles (share of the answer's family): AIS (0.508); whole-word tiles: none
- Answers whose first tile has no rival continuation: BECHAMEL, VELOUTE, ESPAGNOLE, REMOULADE, TARTAR, HOLLANDAIS
- Word frequency (zipf): BECHAMEL 1.85, VELOUTE 1.24, ESPAGNOLE 1.62, BEARNAISE 1.42, REMOULADE 1.59, TARTAR 2.88, HOLLANDAIS 0.0

**Critique:** Themed round.

## Round 328 [themed]: Star Trek: Deep Space Nine: Rules of Acquisition  (total 36.9, candidate K05)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Gold-pressed currency | LATINUM | LAT · INUM | trivia | 3 |
| Quark's word for Mom | MOOGIE | MOO · GIE | trivia | 4 |
| Ferengi pride, on each side | LOBES | LOB · ES | trivia | 3 |
| Ferengi religion, basically | PROFIT | PRO · FIT | pun | 3 |
| Zek's title | GRANDNAGUS | GRAN · DNA · GUS | trivia | 3 |
| What the Rules are all about | ACQUIRE | AC · QUI · RE | trivia | 3 |
| Trading without latinum | BARTERING | BAR · TER · ING | definition | 3 |

**Tile pool (17: 3 x 2-letter, 12 x 3-letter, 2 x 4-letter):** AC BAR DNA ES FIT GIE GRAN GUS ING INUM LAT LOB MOO PRO QUI RE TER

**Score:** decoys 9.8/20 + tempting pairs 2.0/16 + shared fragments 0.0/10 + anchor balance 6.9/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -15.7 = **structure 26.1/80** (scaled 16.3/50); clue rating 9.6/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 20.6/50**

- Decoys (11): LATTER, RELATING, RELATES, ACES, ESQUIRE, ESTER, FITTER, PROFITING, ACRE*, BARTER*, BARING*
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): GRAN (0.524); whole-word tiles: none
- Answers whose first tile has no rival continuation: LATINUM, MOOGIE, LOBES, PROFIT, GRANDNAGUS, ACQUIRE
- Word frequency (zipf): LATINUM 1.82, MOOGIE 0.0, LOBES 3.14, PROFIT 4.7, GRANDNAGUS 0.0, ACQUIRE 4.13, BARTERING 2.46

**Critique:** Themed round.

## Round 329 [themed]: They Might Be Giants Lyrics: Side Two  (total 36.4, candidate P02)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| 1844 party split, per the Polk song | DEMOCRATS | DEM · OC · RATS | trivia | 4 |
| Polk's independent achievement | TREASURY | TRE · ASU · RY | trivia | 4 |
| Martin, spurned in the Polk song | VANBUREN | VAN · BU · REN | trivia | 4 |
| Frying-pan victim's ___ Man | PERSON | PER · SON | trivia | 4 |
| Territory in the Polk song | OREGON | ORE · GON | trivia | 4 |
| Coal's element, per the song | CARBON | CAR · BON | trivia | 4 |
| What she's doing in Istanbul | WAITING | WAI · TING | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 12 x 3-letter, 2 x 4-letter):** ASU BON BU CAR DEM GON OC ORE PER RATS REN RY SON TING TRE VAN WAI

**Score:** decoys 3.3/20 + tempting pairs 0.0/16 + shared fragments 5.0/10 + anchor balance 6.3/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -15.5 = **structure 22.2/80** (scaled 13.9/50); clue rating 22.5/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 22.5/50**

- Decoys (3): CARRY, BURY, RENTING
- Duplicate tiles: none; near-twin tiles: BON/GON, BON/SON, GON/SON, ORE/TRE
- Giveaway tiles (share of the answer's family): ORE (0.502), RATS (0.656); whole-word tiles: RATS
- Answers whose first tile has no rival continuation: DEMOCRATS, TREASURY, VANBUREN, PERSON, OREGON, WAITING
- Word frequency (zipf): DEMOCRATS 4.54, TREASURY 4.24, VANBUREN 1.01, PERSON 5.55, OREGON 4.3, CARBON 4.55, WAITING 5.06

**Critique:** Themed round.

## Round 330 [themed]: Condiments: Bring the Heat  (total 36.1, candidate Q05)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Louisiana's little red bottle | TABASCO | TAB · ASCO | trivia | 3 |
| Wooden-cap hot sauce | CHOLULA | CHOL · ULA | trivia | 4 |
| Heat scale | SCOVILLE | SCO · VIL · LE | definition | 3 |
| The burn molecule | CAPSAICIN | CAP · SAI · CIN | definition | 3 |
| Mexican hot sauce, a girl's name | VALENTINA | VAL · ENT · INA | trivia | 4 |
| Sombrero-man hot sauce | TAPATIO | TAP · ATIO | trivia | 4 |
| Smoked jalapeno | CHIPOTLE | CHI · POT · LE | definition | 3 |

**Tile pool (18: 2 x 2-letter, 13 x 3-letter, 3 x 4-letter):** ASCO ATIO CAP CHI CHOL CIN ENT INA LE LE POT SAI SCO TAB TAP ULA VAL VIL

**Score:** decoys 3.2/20 + tempting pairs 0.8/16 + shared fragments 6.2/10 + anchor balance 7.3/8 + shape 9.4/12 + word appeal 14.0/14 + penalties -11.7 = **structure 29.2/80** (scaled 18.2/50); clue rating 13.9/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 17.9/50**

- Decoys (3): TABLE, POTENT, CHILE*
- Duplicate tiles: LE; near-twin tiles: CAP/TAP, TAB/TAP, VAL/VIL
- Giveaway tiles (share of the answer's family): CIN (0.503); whole-word tiles: none
- Answers whose first tile has no rival continuation: CHOLULA, SCOVILLE, CAPSAICIN, VALENTINA, TAPATIO, CHIPOTLE
- Word frequency (zipf): TABASCO 2.63, CHOLULA 1.96, SCOVILLE 2.2, CAPSAICIN 2.32, VALENTINA 3.09, TAPATIO 1.59, CHIPOTLE 3.13

**Critique:** Themed round.

## Round 331 [themed]: They Might Be Giants Lyrics: Side One  (total 35.5, candidate P01)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Istanbul's renaming: none of yours | BUSINESS | BU · SIN · ESS | trivia | 4 |
| Degrees in Why Does the Sun Shine | MILLIONS | MIL · LI · ONS | trivia | 4 |
| Men Universe Man is kind to | SMALLER | SMAL · LER | trivia | 4 |
| Istanbul's kind of delight | TURKISH | TURK · ISH | trivia | 4 |
| Turkish sweet in Istanbul | DELIGHT | DEL · IGHT | trivia | 4 |
| What the song's sun builds | HELIUM | HEL · IUM | trivia | 4 |
| Mrs. ___, a TMBG song | BLUEBEARD | BLU · EBE · ARD | trivia | 4 |

**Tile pool (17: 2 x 2-letter, 12 x 3-letter, 3 x 4-letter):** ARD BLU BU DEL EBE ESS HEL IGHT ISH IUM LER LI MIL ONS SIN SMAL TURK

**Score:** decoys 2.0/20 + tempting pairs 0.0/16 + shared fragments 1.2/10 + anchor balance 6.8/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -12.4 = **structure 20.8/80** (scaled 13.0/50); clue rating 22.5/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 22.5/50**

- Decoys (2): MILLER, LIONS*
- Duplicate tiles: none; near-twin tiles: DEL/HEL
- Giveaway tiles (share of the answer's family): SMAL (0.965); whole-word tiles: none
- Answers whose first tile has no rival continuation: BUSINESS, MILLIONS, SMALLER, TURKISH, DELIGHT, HELIUM, BLUEBEARD
- Word frequency (zipf): BUSINESS 5.56, MILLIONS 4.64, SMALLER 4.8, TURKISH 4.28, DELIGHT 3.97, HELIUM 3.42, BLUEBEARD 2.18

**Critique:** Themed round.

## Round 332 [themed]: Condiments: Spread the Word  (total 34.5, candidate Q07)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| You love it or hate it | MARMITE | MAR · MITE | trivia | 3 |
| Aussie yeast spread | VEGEMITE | VEG · EM · ITE | definition | 3 |
| Hazelnut cocoa spread | NUTELLA | NUT · ELLA | definition | 2 |
| Butter's understudy | MARGARINE | MAR · GAR · INE | pun | 3 |
| Jam, or keeps | PRESERVES | PRE · SER · VES | wordplay | 4 |
| Stewed fruit topping | COMPOTE | COMP · OTE | definition | 3 |
| PB's partner | JELLY | JEL · LY | definition | 2 |

**Tile pool (17: 2 x 2-letter, 12 x 3-letter, 3 x 4-letter):** COMP ELLA EM GAR INE ITE JEL LY MAR MAR MITE NUT OTE PRE SER VEG VES

**Score:** decoys 2.7/20 + tempting pairs 0.8/16 + shared fragments 7.5/10 + anchor balance 7.0/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -10.5 = **structure 30.6/80** (scaled 19.1/50); clue rating 5.4/30 + variety 8.0/8 + puns 6.0/12 + penalties -4.0 = **clues 15.4/50**

- Decoys (3): COMPLY, MARINE*, SERVES*
- Duplicate tiles: MAR; near-twin tiles: GAR/MAR, INE/ITE, ITE/OTE, VEG/VES
- Giveaway tiles (share of the answer's family): JEL (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: VEGEMITE, NUTELLA, MARGARINE, PRESERVES, COMPOTE, JELLY
- Word frequency (zipf): MARMITE 2.53, VEGEMITE 2.4, NUTELLA 2.84, MARGARINE 2.83, PRESERVES 3.36, COMPOTE 2.26, JELLY 3.77

**Critique:** Themed round.

## Round 333 [themed]: Discworld: Death  (total 33.7, candidate N05)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Book where Death gets fired | REAPERMAN | REA · PER · MAN | trivia | 4 |
| Death's granddaughter | SUSAN | SU · SAN | trivia | 3 |
| Hourglass of a life | LIFETIMER | LIF · ETI · MER | trivia | 4 |
| Death subs in for him | HOGFATHER | HOG · FAT · HER | trivia | 3 |
| Death's soft spot | KITTENS | KIT · TENS | trivia | 4 |
| How Death speaks | CAPITALS | CAP · IT · ALS | trivia | 4 |
| Death's manservant | ALBERT | AL · BERT | trivia | 3 |

**Tile pool (18: 3 x 2-letter, 13 x 3-letter, 2 x 4-letter):** AL ALS BERT CAP ETI FAT HER HOG IT KIT LIF MAN MER PER REA SAN SU TENS

**Score:** decoys 8.1/20 + tempting pairs 2.4/16 + shared fragments 5.0/10 + anchor balance 7.1/8 + shape 10.4/12 + word appeal 14.0/14 + penalties -14.0 = **structure 33.0/80** (scaled 20.6/50); clue rating 16.1/30 + variety 0.0/8 + puns 0.0/12 + penalties -3.0 = **clues 13.1/50**

- Decoys (8): SUPER, CAPITAL, SUIT, FATAL, MERIT, SUPERMAN, FATHER*, REAPER*
- Duplicate tiles: none; near-twin tiles: HER/MER, HER/PER, MAN/SAN, MER/PER
- Giveaway tiles (share of the answer's family): BERT (0.535); whole-word tiles: none
- Answers whose first tile has no rival continuation: REAPERMAN, LIFETIMER, HOGFATHER, KITTENS, CAPITALS, ALBERT
- Word frequency (zipf): REAPERMAN 0.0, SUSAN 4.24, LIFETIMER 0.0, HOGFATHER 1.55, KITTENS 3.47, CAPITALS 3.6, ALBERT 4.24

**Critique:** Themed round.

## Round 334 [themed]: Condiments: Table Service  (total 33.4, candidate Q10)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Takeout ketchup unit | PACKET | PAC · KET | definition | 2 |
| Pump at the hot dog stand | DISPENSER | DIS · PEN · SER | definition | 3 |
| Salt holder, or a mover | SHAKER | SHA · KER | wordplay | 3 |
| Waiter's giant grinder | PEPPERMILL | PEP · PERM · ILL | evocative | 3 |
| Generous spoonful | DOLLOP | DOL · LOP | definition | 2 |
| Light rain of sauce | DRIZZLE | DRI · ZZLE | pun | 3 |
| Vessel that never sails | GRAVYBOAT | GRA · VY · BOAT | pun | 4 |

**Tile pool (17: 1 x 2-letter, 13 x 3-letter, 3 x 4-letter):** BOAT DIS DOL DRI GRA ILL KER KET LOP PAC PEN PEP PERM SER SHA VY ZZLE

**Score:** decoys 1.2/20 + tempting pairs 0.0/16 + shared fragments 3.8/10 + anchor balance 6.9/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -11.8 = **structure 24.0/80** (scaled 15.0/50); clue rating 5.4/30 + variety 8.0/8 + puns 9.0/12 + penalties -4.0 = **clues 18.4/50**

- Decoys (2): PACKER, GRAVY*
- Duplicate tiles: none; near-twin tiles: KER/KET, KER/SER, PEN/PEP
- Giveaway tiles (share of the answer's family): PEP (1.0); whole-word tiles: BOAT
- Answers whose first tile has no rival continuation: PACKET, DISPENSER, SHAKER, PEPPERMILL, DOLLOP, DRIZZLE, GRAVYBOAT
- Word frequency (zipf): PACKET 3.77, DISPENSER 3.03, SHAKER 3.23, PEPPERMILL 1.35, DOLLOP 2.62, DRIZZLE 3.15, GRAVYBOAT 0.0

**Critique:** Themed round.

## Round 335 [themed]: Star Trek: Deep Space Nine: Cast and Crew  (total 32.6, candidate K08)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Michael, co-creator | PILLER | PIL · LER | trivia | 4 |
| Rick, co-creator | BERMAN | BER · MAN | trivia | 3 |
| Mr Shimerman, behind the lobes | ARMIN | ARM · IN | trivia | 4 |
| How it aired, off-network | SYNDICATED | SYN · DIC · ATED | trivia | 3 |
| Script credit for TV | TELEPLAY | TEL · EP · LAY | definition | 3 |
| Behr's executive title | PRODUCER | PRO · DUC · ER | definition | 2 |
| Alexander, the doctor's actor | SIDDIG | SID · DIG | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 13 x 3-letter, 1 x 4-letter):** ARM ATED BER DIC DIG DUC EP ER IN LAY LER MAN PIL PRO SID SYN TEL

**Score:** decoys 8.7/20 + tempting pairs 3.6/16 + shared fragments 3.8/10 + anchor balance 7.2/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -17.3 = **structure 30.0/80** (scaled 18.8/50); clue rating 11.8/30 + variety 4.0/8 + puns 0.0/12 + penalties -2.0 = **clues 13.8/50**

- Decoys (7): LAYER, INDICATED, INTEL, INSIDER, TELLER, LAYMAN, MANTEL
- Duplicate tiles: none; near-twin tiles: BER/LER, DIC/DIG, DIC/DUC
- Giveaway tiles (share of the answer's family): DIG (0.51); whole-word tiles: none
- Answers whose first tile has no rival continuation: PILLER, BERMAN, ARMIN, SYNDICATED, TELEPLAY, PRODUCER, SIDDIG
- Word frequency (zipf): PILLER 2.13, BERMAN 3.16, ARMIN 2.96, SYNDICATED 3.05, TELEPLAY 1.71, PRODUCER 4.44, SIDDIG 1.48

**Critique:** Themed round.

## Round 336 [themed]: Star Trek: The Next Generation: Holodeck  (total 32.3, candidate M08)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Always failing, holodeck-wise | SAFETIES | SAF · ETI · ES | trivia | 4 |
| Computer, end ___ | PROGRAM | PRO · GRAM | trivia | 3 |
| Yellow grid on a resting holodeck | GRIDLINES | GRID · LIN · ES | trivia | 4 |
| Voyager's Irish holo-village | FAIRHAVEN | FAI · RHA · VEN | trivia | 4 |
| Every holodeck story | SIMULATION | SIM · ULA · TION | definition | 2 |
| Riker's too-perfect holo-woman | MINUET | MIN · UET | trivia | 4 |
| Era of Moriarty's London | VICTORIAN | VIC · TOR · IAN | trivia | 3 |

**Tile pool (19: 2 x 2-letter, 14 x 3-letter, 3 x 4-letter):** ES ES ETI FAI GRAM GRID IAN LIN MIN PRO RHA SAF SIM TION TOR UET ULA VEN VIC

**Score:** decoys 6.0/20 + tempting pairs 1.2/16 + shared fragments 3.8/10 + anchor balance 6.7/8 + shape 11.7/12 + word appeal 14.0/14 + penalties -12.3 = **structure 31.1/80** (scaled 19.4/50); clue rating 13.9/30 + variety 4.0/8 + puns 0.0/12 + penalties -5.0 = **clues 12.9/50**

- Decoys (6): PROVEN, MINES, SIMULATOR, VICES, LINES*, VICTOR*
- Duplicate tiles: ES; near-twin tiles: LIN/MIN
- Giveaway tiles (share of the answer's family): GRAM (0.664), GRID (0.463); whole-word tiles: GRID
- Answers whose first tile has no rival continuation: SAFETIES, GRIDLINES, FAIRHAVEN, SIMULATION, MINUET, VICTORIAN
- Word frequency (zipf): SAFETIES 2.71, PROGRAM 5.27, GRIDLINES 1.29, FAIRHAVEN 2.14, SIMULATION 3.94, MINUET 2.36, VICTORIAN 4.12

**Critique:** Themed round.

## Round 337 [themed]: Condiments: Table Staples  (total 32.3, candidate Q01)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Hot dog topping, or enjoy | RELISH | REL · ISH | wordplay | 3 |
| Sesame paste | TAHINI | TA · HINI | definition | 3 |
| Fruity Indian condiment | CHUTNEY | CHUT · NEY | definition | 3 |
| Sauce for the grill | BARBECUE | BAR · BE · CUE | definition | 2 |
| British breakfast's dark dollop | BROWNSAUCE | BROW · NSA · UCE | evocative | 4 |
| Houses of Parliament on the bottle | HPSAUCE | HPSA · UCE | trivia | 4 |
| A1 ___ | STEAKSAUCE | STE · AKS · AUCE | trivia | 3 |

**Tile pool (17: 2 x 2-letter, 10 x 3-letter, 5 x 4-letter):** AKS AUCE BAR BE BROW CHUT CUE HINI HPSA ISH NEY NSA REL STE TA UCE UCE

**Score:** decoys 5.3/20 + tempting pairs 0.0/16 + shared fragments 2.5/10 + anchor balance 6.2/8 + shape 6.8/12 + word appeal 14.0/14 + penalties -12.8 = **structure 21.9/80** (scaled 13.7/50); clue rating 9.6/30 + variety 8.0/8 + puns 3.0/12 + penalties -2.0 = **clues 18.6/50**

- Decoys (5): TASTE, BETA, BARREL, BARNEY, STEAKS*
- Duplicate tiles: UCE; near-twin tiles: none
- Giveaway tiles (share of the answer's family): BROW (0.628), HPSA (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: RELISH, CHUTNEY, BARBECUE, BROWNSAUCE, HPSAUCE, STEAKSAUCE
- Word frequency (zipf): RELISH 3.32, TAHINI 2.31, CHUTNEY 2.74, BARBECUE 3.62, BROWNSAUCE 0.0, HPSAUCE 0.0, STEAKSAUCE 0.0

**Critique:** Themed round.

## Round 338 [themed]: Star Trek: Deep Space Nine: Prophets and Pah-wraiths  (total 32.1, candidate K04)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Bajor's scheming spiritual leader | KAIWINN | KAI · WINN | trivia | 4 |
| Where the Pah-wraiths were sealed | FIRECAVES | FIR · ECA · VES | trivia | 4 |
| Vedek who won Kira's heart | BAREIL | BAR · EIL | trivia | 4 |
| Celestial ___, the wormhole to Bajorans | TEMPLE | TEM · PLE | trivia | 3 |
| Bajoran ear chain | EARRING | EAR · RING | trivia | 3 |
| Relic that sent them to Kirk's era | ORBOFTIME | ORB · OFT · IME | trivia | 4 |
| What the Emissary keeps fulfilling | PROPHECY | PRO · PHE · CY | trivia | 3 |

**Tile pool (17: 1 x 2-letter, 14 x 3-letter, 2 x 4-letter):** BAR CY EAR ECA EIL FIR IME KAI OFT ORB PHE PLE PRO RING TEM VES WINN

**Score:** decoys 2.7/20 + tempting pairs 0.0/16 + shared fragments 2.5/10 + anchor balance 6.7/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -10.3 = **structure 25.6/80** (scaled 16.0/50); clue rating 16.1/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 16.1/50**

- Decoys (2): PROVES, BARRING
- Duplicate tiles: none; near-twin tiles: BAR/EAR, PHE/PLE
- Giveaway tiles (share of the answer's family): KAI (1.0), WINN (0.52); whole-word tiles: none
- Answers whose first tile has no rival continuation: KAIWINN, FIRECAVES, BAREIL, TEMPLE, EARRING, ORBOFTIME, PROPHECY
- Word frequency (zipf): KAIWINN 0.0, FIRECAVES 0.0, BAREIL 1.04, TEMPLE 4.45, EARRING 3.08, ORBOFTIME 0.0, PROPHECY 3.71

**Critique:** Themed round.

## Round 339 [themed]: Star Trek: The Next Generation: Shaka, When the Walls Fell  (total 31.4, candidate M03)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Tamarian captain who gave his life | DATHON | DAT · HON | trivia | 4 |
| How Tamarians talk | METAPHOR | MET · APH · OR | trivia | 3 |
| Darmok's partner at Tanagra | JALAD | JA · LAD | trivia | 4 |
| The episode's real puzzle | LANGUAGE | LAN · GUA · GE | evocative | 3 |
| ___ translator, stumped | UNIVERSAL | UNI · VER · SAL | trivia | 3 |
| Hero of a Tamarian tale | DARMOK | DAR · MOK | trivia | 3 |
| Where Darmok met Jalad | TANAGRA | TAN · AGRA | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 13 x 3-letter, 1 x 4-letter):** AGRA APH DAR DAT GE GUA HON JA LAD LAN MET MOK OR SAL TAN UNI VER

**Score:** decoys 2.3/20 + tempting pairs 0.4/16 + shared fragments 3.8/10 + anchor balance 6.7/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -15.6 = **structure 21.6/80** (scaled 13.5/50); clue rating 13.9/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 17.9/50**

- Decoys (2): HONOR, VERGE
- Duplicate tiles: none; near-twin tiles: DAR/DAT, LAD/LAN, LAN/TAN
- Giveaway tiles (share of the answer's family): AGRA (0.532), MOK (0.522); whole-word tiles: none
- Answers whose first tile has no rival continuation: DATHON, METAPHOR, LANGUAGE, UNIVERSAL, DARMOK
- Word frequency (zipf): DATHON 0.0, METAPHOR 3.73, JALAD 1.22, LANGUAGE 5.1, UNIVERSAL 4.49, DARMOK 1.55, TANAGRA 1.78

**Critique:** Themed round.

## Round 340 [themed]: Star Trek: Lower Decks: Running Gags  (total 31.3, candidate L04)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| ___ time, mandated chill | BUFFER | BUF · FER | trivia | 4 |
| Peanut ___, rogue exocomp | HAMPER | HAM · PER | trivia | 4 |
| Cute, deadly blob | MOOPSY | MOO · PSY | trivia | 4 |
| Peanut Hamper's kind | EXOCOMP | EXO · COMP | trivia | 4 |
| ___ Ops, whale department | CETACEAN | CE · TAC · EAN | trivia | 3 |
| Billups's Ren Faire homeworld | HYSPERIA | HYS · PER · IA | trivia | 4 |
| Hysperia's vibe, essentially | RENFAIRE | REN · FAI · RE | trivia | 3 |

**Tile pool (17: 3 x 2-letter, 13 x 3-letter, 1 x 4-letter):** BUF CE COMP EAN EXO FAI FER HAM HYS IA MOO PER PER PSY RE REN TAC

**Score:** decoys 1.2/20 + tempting pairs 2.4/16 + shared fragments 3.8/10 + anchor balance 7.0/8 + shape 9.0/12 + word appeal 14.0/14 + penalties -16.3 = **structure 21.0/80** (scaled 13.1/50); clue rating 18.2/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 18.2/50**

- Decoys (1): REFER
- Duplicate tiles: PER; near-twin tiles: FER/PER
- Giveaway tiles (share of the answer's family): BUF (0.569), COMP (0.501); whole-word tiles: none
- Answers whose first tile has no rival continuation: BUFFER, HAMPER, MOOPSY, EXOCOMP, HYSPERIA, RENFAIRE
- Word frequency (zipf): BUFFER 3.78, HAMPER 3.26, MOOPSY 0.0, EXOCOMP 0.0, CETACEAN 2.19, HYSPERIA 0.0, RENFAIRE 0.0

**Critique:** Themed round.

## Round 341 [themed]: Star Trek: Deep Space Nine: Bajor and Beyond  (total 31.1, candidate K10)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Cardassia's decades on Bajor | OCCUPATION | OCCU · PAT · ION | trivia | 3 |
| Kira's old cell, in general | RESISTANCE | RES · IST · ANCE | trivia | 3 |
| Resistance leader turned First Minister | SHAKAAR | SHAK · AAR | trivia | 4 |
| One-eyed Klingon general | MARTOK | MAR · TOK | trivia | 4 |
| Rebels in the Demilitarized Zone | MAQUIS | MA · QUIS | trivia | 3 |
| Mirror Kira's title | INTENDANT | INT · END · ANT | trivia | 4 |
| Martok's formidable wife | SIRELLA | SIR · ELLA | trivia | 4 |

**Tile pool (17: 1 x 2-letter, 11 x 3-letter, 5 x 4-letter):** AAR ANCE ANT ELLA END INT ION IST MA MAR OCCU PAT QUIS RES SHAK SIR TOK

**Score:** decoys 4.4/20 + tempting pairs 0.4/16 + shared fragments 2.5/10 + anchor balance 6.7/8 + shape 7.9/12 + word appeal 14.0/14 + penalties -11.9 = **structure 24.0/80** (scaled 15.0/50); clue rating 16.1/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 16.1/50**

- Decoys (5): RESISTANT, MARQUIS, MARES, RESIST*, INTEND*
- Duplicate tiles: none; near-twin tiles: AAR/MAR, INT/IST
- Giveaway tiles (share of the answer's family): OCCU (0.481), TOK (0.544); whole-word tiles: none
- Answers whose first tile has no rival continuation: OCCUPATION, RESISTANCE, SHAKAAR, MARTOK, INTENDANT, SIRELLA
- Word frequency (zipf): OCCUPATION 4.2, RESISTANCE 4.55, SHAKAAR 0.0, MARTOK 1.54, MAQUIS 2.43, INTENDANT 2.22, SIRELLA 0.0

**Critique:** Themed round.

## Round 342 [themed]: Star Trek: The Next Generation: Ship's Systems  (total 30.9, candidate M10)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Separable section | SAUCER | SAU · CER | trivia | 3 |
| Guinan's lounge | TENFORWARD | TEN · FOR · WARD | trivia | 3 |
| Elevator, Starfleet-style | TURBOLIFT | TUR · BOL · IFT | definition | 3 |
| Geordi's eye-wear | VISOR | VI · SOR | trivia | 3 |
| Warp core fuel's half | ANTIMATTER | ANT · IMAT · TER | trivia | 3 |
| Sub-light engines | IMPULSE | IMP · ULSE | definition | 3 |
| Bridge's big display | VIEWSCREEN | VI · EWS · CRE · EN | trivia | 3 |

**Tile pool (19: 3 x 2-letter, 13 x 3-letter, 3 x 4-letter):** ANT BOL CER CRE EN EWS FOR IFT IMAT IMP SAU SOR TEN TER TUR ULSE VI VI WARD

**Score:** decoys 7.3/20 + tempting pairs 1.2/16 + shared fragments 7.5/10 + anchor balance 7.3/8 + shape 10.7/12 + word appeal 14.0/14 + penalties -17.1 = **structure 31.0/80** (scaled 19.4/50); clue rating 7.5/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 11.5/50**

- Decoys (7): ENTER, TENANT, WARDEN, TENSOR, ENFORCER, FORWARD*, VIEWS*
- Duplicate tiles: VI; near-twin tiles: CER/TER, FOR/SOR, TEN/TER, TER/TUR
- Giveaway tiles (share of the answer's family): SAU (0.411); whole-word tiles: WARD
- Answers whose first tile has no rival continuation: SAUCER, TENFORWARD, TURBOLIFT, VISOR, ANTIMATTER, IMPULSE, VIEWSCREEN
- Word frequency (zipf): SAUCER 3.06, TENFORWARD 0.0, TURBOLIFT 1.48, VISOR 2.98, ANTIMATTER 2.64, IMPULSE 3.72, VIEWSCREEN 1.59

**Critique:** Themed round.

## Round 343 [themed]: Discworld: The Disc  (total 30.9, candidate N06)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Another of the four elephants | JERAKEEN | JER · AKE · EN | trivia | 4 |
| The Disc's Australia | FOURECKS | FOUR · ECKS | trivia | 4 |
| Klatchian kingdom | HERSHEBA | HER · SHE · BA | trivia | 4 |
| Elephant named like a gem | BERILIA | BER · ILIA | trivia | 4 |
| Four of them carry the world | ELEPHANTS | EL · EPH · ANTS | trivia | 3 |
| Philosophers' city on the Circle Sea | EPHEBE | EPH · EBE | trivia | 4 |
| Ocean pouring off the edge | RIMFALL | RIM · FALL | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 9 x 3-letter, 5 x 4-letter):** AKE ANTS BA BER EBE ECKS EL EN EPH EPH FALL FOUR HER ILIA JER RIM SHE

**Score:** decoys 2.4/20 + tempting pairs 0.0/16 + shared fragments 6.2/10 + anchor balance 6.9/8 + shape 5.6/12 + word appeal 14.0/14 + penalties -18.3 = **structure 16.8/80** (scaled 10.5/50); clue rating 20.4/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 20.4/50**

- Decoys (2): FALLEN, SHEEN
- Duplicate tiles: EPH; near-twin tiles: BER/HER, BER/JER, HER/JER
- Giveaway tiles (share of the answer's family): RIM (0.504); whole-word tiles: FALL, FOUR
- Answers whose first tile has no rival continuation: JERAKEEN, FOURECKS, HERSHEBA, BERILIA, ELEPHANTS, EPHEBE, RIMFALL
- Word frequency (zipf): JERAKEEN 0.0, FOURECKS 0.0, HERSHEBA 0.0, BERILIA 0.0, ELEPHANTS 3.81, EPHEBE 0.0, RIMFALL 0.0

**Critique:** Themed round.

## Round 344 [themed]: Discworld: Unseen University  (total 30.8, candidate N03)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Wizzard who runs away well | RINCEWIND | RIN · CE · WIND | trivia | 3 |
| Archchancellor who hunts | RIDCULLY | RID · CUL · LY | trivia | 4 |
| Wizard on dried frog pills | BURSAR | BUR · SAR | trivia | 4 |
| Eighth color, magic's own | OCTARINE | OCTA · RINE | trivia | 3 |
| Book holding eight great spells | OCTAVO | OCT · AVO | trivia | 4 |
| Rincewind's hat spelling | WIZZARD | WIZ · ZARD | trivia | 5 |
| ___ in Recent Runes | LECTURER | LEC · TUR · ER | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 10 x 3-letter, 4 x 4-letter):** AVO BUR CE CUL ER LEC LY OCT OCTA RID RIN RINE SAR TUR WIND WIZ ZARD

**Score:** decoys 1.2/20 + tempting pairs 1.6/16 + shared fragments 2.5/10 + anchor balance 6.7/8 + shape 6.8/12 + word appeal 14.0/14 + penalties -16.2 = **structure 16.6/80** (scaled 10.4/50); clue rating 20.4/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 20.4/50**

- Decoys (1): RIDER
- Duplicate tiles: none; near-twin tiles: BUR/TUR, RID/RIN
- Giveaway tiles (share of the answer's family): LEC (0.526), SAR (0.511); whole-word tiles: WIND
- Answers whose first tile has no rival continuation: RINCEWIND, RIDCULLY, BURSAR, OCTARINE, OCTAVO, WIZZARD, LECTURER
- Word frequency (zipf): RINCEWIND 1.75, RIDCULLY 0.0, BURSAR 2.19, OCTARINE 0.0, OCTAVO 2.31, WIZZARD 1.61, LECTURER 3.72

**Critique:** Themed round.

## Round 345 [themed]: Star Trek: Deep Space Nine: The War Years  (total 30.7, candidate K03)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Changelings who run the Dominion | FOUNDERS | FO · UND · ERS | trivia | 3 |
| ___-white, the Jem'Hadar fix | KETRACEL | KET · RA · CEL | trivia | 4 |
| Troi's homeworld, occupied in the war | BETAZED | BET · AZED | trivia | 4 |
| Self-replicating blockade of the wormhole | MINEFIELD | MIN · EFI · ELD | trivia | 3 |
| Gamma or Alpha, for instance | QUADRANT | QUAD · RANT | definition | 3 |
| Federation-Klingon-Romulan pact | ALLIANCE | ALLI · ANCE | trivia | 3 |
| Gamma Quadrant superpower | DOMINION | DO · MIN · ION | trivia | 3 |

**Tile pool (18: 3 x 2-letter, 10 x 3-letter, 5 x 4-letter):** ALLI ANCE AZED BET CEL DO EFI ELD ERS FO ION KET MIN MIN QUAD RA RANT UND

**Score:** decoys 5.7/20 + tempting pairs 0.8/16 + shared fragments 3.8/10 + anchor balance 7.1/8 + shape 6.1/12 + word appeal 14.0/14 + penalties -13.6 = **structure 23.8/80** (scaled 14.9/50); clue rating 11.8/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 15.8/50**

- Decoys (5): MINERS, DOMINANCE, ELDERS, FOUND*, MINION*
- Duplicate tiles: MIN; near-twin tiles: BET/KET
- Giveaway tiles (share of the answer's family): QUAD (0.614); whole-word tiles: none
- Answers whose first tile has no rival continuation: FOUNDERS, KETRACEL, MINEFIELD, ALLIANCE, DOMINION
- Word frequency (zipf): FOUNDERS 3.83, KETRACEL 0.0, BETAZED 1.02, MINEFIELD 2.92, QUADRANT 3.28, ALLIANCE 4.4, DOMINION 3.66

**Critique:** Themed round.

## Round 346 [themed]: Star Trek: The Next Generation: Picard at Home  (total 30.7, candidate M05)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Picard's French home village | LABARRE | LAB · ARRE | trivia | 4 |
| Picard's sword sport | FENCING | FEN · CING | trivia | 3 |
| Picard's holodeck gumshoe | DIXONHILL | DI · XON · HILL | trivia | 4 |
| Picard's famous gesture, meme-wise | FACEPALM | FAC · EP · ALM | evocative | 4 |
| Kind of flute Picard plays | RESSIKAN | RES · SI · KAN | trivia | 4 |
| ___ Picard, the family vintage | CHATEAU | CHA · TEAU | trivia | 4 |
| Picard's grumpy vintner brother | ROBERT | ROB · ERT | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 10 x 3-letter, 4 x 4-letter):** ALM ARRE CHA CING DI EP ERT FAC FEN HILL KAN LAB RES ROB SI TEAU XON

**Score:** decoys 0.0/20 + tempting pairs 0.0/16 + shared fragments 0.0/10 + anchor balance 7.0/8 + shape 6.8/12 + word appeal 14.0/14 + penalties -17.7 = **structure 10.1/80** (scaled 6.3/50); clue rating 20.4/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 24.4/50**

- Decoys (0): none
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): KAN (0.632); whole-word tiles: HILL
- Answers whose first tile has no rival continuation: LABARRE, FENCING, DIXONHILL, FACEPALM, RESSIKAN, CHATEAU, ROBERT
- Word frequency (zipf): LABARRE 1.36, FENCING 3.56, DIXONHILL 0.0, FACEPALM 2.52, RESSIKAN 0.0, CHATEAU 3.3, ROBERT 4.85

**Critique:** Themed round.

## Round 347 [themed]: Rick and Morty: Villains  (total 30.6, candidate O08)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Commander-in-chief Rick feuds with | PRESIDENT | PRE · SID · ENT | trivia | 4 |
| Galactic ___, Rick's nemesis | FEDERATION | FED · ERAT · ION | trivia | 3 |
| Mr Needful, really | DEVIL | DEV · IL | trivia | 3 |
| ___ Rick, the nice one | DOOFUS | DOO · FUS | trivia | 4 |
| ___ Federation | GALACTIC | GAL · ACT · IC | trivia | 3 |
| Giant heads who demand a show | CROMULONS | CRO · MUL · ONS | trivia | 4 |
| Alien scammers in a simulation | ZIGERION | ZI · GER · ION | trivia | 4 |

**Tile pool (19: 3 x 2-letter, 15 x 3-letter, 1 x 4-letter):** ACT CRO DEV DOO ENT ERAT FED FUS GAL GER IC IL ION ION MUL ONS PRE SID ZI

**Score:** decoys 4.5/20 + tempting pairs 1.2/16 + shared fragments 2.5/10 + anchor balance 6.9/8 + shape 12.0/12 + word appeal 14.0/14 + penalties -17.9 = **structure 23.2/80** (scaled 14.5/50); clue rating 16.1/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 16.1/50**

- Decoys (3): ACTION, FUSION, ICONS
- Duplicate tiles: ION; near-twin tiles: none
- Giveaway tiles (share of the answer's family): FED (0.755), FUS (0.509); whole-word tiles: none
- Answers whose first tile has no rival continuation: PRESIDENT, FEDERATION, DEVIL, DOOFUS, GALACTIC, CROMULONS, ZIGERION
- Word frequency (zipf): PRESIDENT 5.45, FEDERATION 4.26, DEVIL 4.3, DOOFUS 2.5, GALACTIC 3.49, CROMULONS 0.0, ZIGERION 0.0

**Critique:** Themed round.

## Round 348 [themed]: Discworld: The Shelf  (total 30.3, candidate N07)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Book of the eighth son's son | SOURCERY | SO · URC · ERY | trivia | 4 |
| Book of Djelibeybi | PYRAMIDS | PY · RAM · IDS | trivia | 4 |
| Witches at the opera | MASKERADE | MAS · KER · ADE | trivia | 4 |
| Watch book about golems | FEETOFCLAY | FEE · TOF · CLAY | trivia | 4 |
| Girl attends wizard school | EQUALRITES | EQU · ALRI · TES | trivia | 4 |
| Cohen climbs to the gods | LASTHERO | LAS · THE · RO | trivia | 4 |
| The ___ of Magic, book one | COLOUR | COL · OUR | trivia | 3 |

**Tile pool (20: 3 x 2-letter, 15 x 3-letter, 2 x 4-letter):** ADE ALRI CLAY COL EQU ERY FEE IDS KER LAS MAS OUR PY RAM RO SO TES THE TOF URC

**Score:** decoys 0.0/20 + tempting pairs 0.0/16 + shared fragments 1.2/10 + anchor balance 6.7/8 + shape 12.0/12 + word appeal 14.0/14 + penalties -18.0 = **structure 15.9/80** (scaled 9.9/50); clue rating 20.4/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 20.4/50**

- Decoys (0): none
- Duplicate tiles: none; near-twin tiles: LAS/MAS
- Giveaway tiles (share of the answer's family): CLAY (1.0), TOF (0.44); whole-word tiles: CLAY
- Answers whose first tile has no rival continuation: SOURCERY, PYRAMIDS, MASKERADE, FEETOFCLAY, EQUALRITES, LASTHERO, COLOUR
- Word frequency (zipf): SOURCERY 0.0, PYRAMIDS 3.33, MASKERADE 0.0, FEETOFCLAY 0.0, EQUALRITES 0.0, LASTHERO 0.0, COLOUR 4.49

**Critique:** Themed round.

## Round 349 [themed]: Discworld: Creatures  (total 29.3, candidate N10)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Helpful lisping surgeons | IGORS | IG · ORS | trivia | 4 |
| Uberwald nobility, many teetotal | VAMPIRES | VAM · PI · RES | trivia | 3 |
| Watchmen on the roofs | GARGOYLES | GAR · GOY · LES | trivia | 3 |
| Swamp dragon who goes boom | ERROL | ER · ROL | trivia | 4 |
| Angua's kin | WEREWOLVES | WERE · WOL · VES | trivia | 3 |
| Buggy Swires's kind | GNOMES | GNO · MES | trivia | 4 |
| Nac Mac Feegles, taxonomically | PICTSIES | PICT · SIES | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 11 x 3-letter, 3 x 4-letter):** ER GAR GNO GOY IG LES MES ORS PI PICT RES ROL SIES VAM VES WERE WOL

**Score:** decoys 3.8/20 + tempting pairs 0.8/16 + shared fragments 8.8/10 + anchor balance 2.0/8 + shape 7.9/12 + word appeal 14.0/14 + penalties -16.2 = **structure 21.1/80** (scaled 13.2/50); clue rating 16.1/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 16.1/50**

- Decoys (4): RESERVES, PIER, PILES, WOLVES*
- Duplicate tiles: none; near-twin tiles: LES/MES, LES/RES, LES/VES, MES/RES, MES/VES, RES/VES, ROL/WOL
- Giveaway tiles (share of the answer's family): GNO (0.526), GOY (1.0), VAM (0.839), WERE (0.562); whole-word tiles: WERE
- Answers whose first tile has no rival continuation: IGORS, VAMPIRES, GARGOYLES, ERROL, WEREWOLVES, GNOMES, PICTSIES
- Word frequency (zipf): IGORS 1.07, VAMPIRES 3.59, GARGOYLES 2.52, ERROL 2.92, WEREWOLVES 2.98, GNOMES 2.76, PICTSIES 0.0

**Critique:** Themed round.

## Round 350 [themed]: Discworld: City Life  (total 29.1, candidate N01)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Ankh's twin, across the river | MORPORK | MORP · ORK | trivia | 4 |
| ___ University, for wizards | UNSEEN | UNS · EEN | trivia | 3 |
| Slum you don't walk alone | SHADES | SHA · DES | trivia | 4 |
| Pub formerly the Broken Drum | MENDEDDRUM | MEN · DED · DRUM | trivia | 4 |
| Vetinari's title | PATRICIAN | PAT · RIC · IAN | trivia | 3 |
| Ruler who prefers not to be Tyrant | VETINARI | VET · INA · RI | trivia | 3 |
| Cut-Me-Own-Throat sausage seller | DIBBLER | DIB · BLER | trivia | 4 |

**Tile pool (17: 1 x 2-letter, 13 x 3-letter, 3 x 4-letter):** BLER DED DES DIB DRUM EEN IAN INA MEN MORP ORK PAT RI RIC SHA UNS VET

**Score:** decoys 2.2/20 + tempting pairs 0.4/16 + shared fragments 2.5/10 + anchor balance 6.9/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -10.4 = **structure 25.6/80** (scaled 16.0/50); clue rating 16.1/30 + variety 0.0/8 + puns 0.0/12 + penalties -3.0 = **clues 13.1/50**

- Decoys (2): RIDES, SHADED
- Duplicate tiles: none; near-twin tiles: DED/DES, EEN/MEN
- Giveaway tiles (share of the answer's family): DIB (0.523); whole-word tiles: DRUM
- Answers whose first tile has no rival continuation: MORPORK, UNSEEN, MENDEDDRUM, VETINARI, DIBBLER
- Word frequency (zipf): MORPORK 1.82, UNSEEN 3.61, SHADES 4.0, MENDEDDRUM 0.0, PATRICIAN 2.64, VETINARI 1.43, DIBBLER 0.0

**Critique:** Themed round.

## Round 351 [themed]: Discworld: Going Postal  (total 28.9, candidate N08)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Moist von ___ | LIPWIG | LIP · WIG | trivia | 4 |
| Building stuffed with old mail | POSTOFFICE | POST · OFF · ICE | trivia | 3 |
| Clay workers, freed | GOLEMS | GOL · EMS | trivia | 3 |
| Making Money's business | BANKING | BAN · KING | trivia | 3 |
| Adora Belle, smoking | DEARHEART | DEA · RHE · ART | trivia | 4 |
| Moist's first job | POSTMASTER | POST · MAS · TER | trivia | 3 |
| Clacks tech, basically | SEMAPHORE | SEM · APH · ORE | trivia | 3 |

**Tile pool (18: 15 x 3-letter, 3 x 4-letter):** APH ART BAN DEA EMS GOL ICE KING LIP MAS OFF ORE POST POST RHE SEM TER WIG

**Score:** decoys 3.0/20 + tempting pairs 0.0/16 + shared fragments 2.5/10 + anchor balance 7.4/8 + shape 11.0/12 + word appeal 14.0/14 + penalties -10.6 = **structure 27.3/80** (scaled 17.1/50); clue rating 11.8/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 11.8/50**

- Decoys (4): BANTER, MASKING, OFFICE*, MASTER*
- Duplicate tiles: POST; near-twin tiles: none
- Giveaway tiles (share of the answer's family): WIG (0.604); whole-word tiles: POST
- Answers whose first tile has no rival continuation: LIPWIG, POSTOFFICE, GOLEMS, BANKING, DEARHEART, POSTMASTER, SEMAPHORE
- Word frequency (zipf): LIPWIG 1.06, POSTOFFICE 1.56, GOLEMS 2.0, BANKING 4.35, DEARHEART 0.0, POSTMASTER 3.14, SEMAPHORE 2.55

**Critique:** Themed round.

## Round 352 [themed]: Rick and Morty: Garage Gadgets  (total 28.9, candidate O04)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Rick's green doorway maker | PORTALGUN | POR · TAL · GUN | trivia | 3 |
| Everyone has one at home | PLUMBUS | PLUM · BUS | trivia | 4 |
| What the little robot passes | BUTTER | BUT · TER | trivia | 4 |
| Tiny world powering the ship | MICROVERSE | MIC · ROV · ERSE | trivia | 3 |
| Rick's flying car, space-wise | CRUISER | CRU · ISER | trivia | 3 |
| Body-horror world named for a director | CRONENBERG | CRO · NEN · BERG | trivia | 4 |
| Portal ___, the refill | FLUID | FLU · ID | trivia | 3 |

**Tile pool (17: 1 x 2-letter, 12 x 3-letter, 4 x 4-letter):** BERG BUS BUT CRO CRU ERSE FLU GUN ID ISER MIC NEN PLUM POR ROV TAL TER

**Score:** decoys 3.2/20 + tempting pairs 0.4/16 + shared fragments 2.5/10 + anchor balance 6.5/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -11.7 = **structure 24.0/80** (scaled 15.0/50); clue rating 13.9/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 13.9/50**

- Decoys (3): PORTER, BUSTER, PORTAL*
- Duplicate tiles: none; near-twin tiles: BUS/BUT, CRO/CRU
- Giveaway tiles (share of the answer's family): MIC (0.492), PLUM (0.51); whole-word tiles: none
- Answers whose first tile has no rival continuation: PORTALGUN, PLUMBUS, BUTTER, MICROVERSE, CRUISER, CRONENBERG, FLUID
- Word frequency (zipf): PORTALGUN 0.0, PLUMBUS 0.0, BUTTER 4.4, MICROVERSE 1.21, CRUISER 3.52, CRONENBERG 2.33, FLUID 4.22

**Critique:** Themed round.

## Round 353 [themed]: Star Trek: Deep Space Nine: Replimat Menu  (total 28.7, candidate K09)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Klingon coffee, Kira's order | RAKTAJINO | RAK · TAJ · INO | trivia | 4 |
| Spicy Bajoran wrap that makes you cry | HASPERAT | HAS · PER · AT | trivia | 4 |
| Bajoran sweet on a stick | JUMJA | JUM · JA | trivia | 4 |
| Booze without the hangover | SYNTHEHOL | SYN · THE · HOL | trivia | 3 |
| Vulcan soup | PLOMEEK | PLOM · EEK | trivia | 4 |
| Ferengi menu item, for the brave | SLUGLIVER | SLU · GLI · VER | trivia | 3 |
| Jake's sundae base | ICECREAM | ICE · CRE · AM | definition | 2 |

**Tile pool (19: 3 x 2-letter, 15 x 3-letter, 1 x 4-letter):** AM AT CRE EEK GLI HAS HOL ICE INO JA JUM PER PLOM RAK SLU SYN TAJ THE VER

**Score:** decoys 3.2/20 + tempting pairs 0.8/16 + shared fragments 1.2/10 + anchor balance 6.5/8 + shape 12.0/12 + word appeal 14.0/14 + penalties -17.3 = **structure 20.4/80** (scaled 12.8/50); clue rating 13.9/30 + variety 4.0/8 + puns 0.0/12 + penalties -2.0 = **clues 15.9/50**

- Decoys (3): AMINO, JUMPER, CREAM*
- Duplicate tiles: none; near-twin tiles: PER/VER
- Giveaway tiles (share of the answer's family): PLOM (0.535), TAJ (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: RAKTAJINO, HASPERAT, JUMJA, SYNTHEHOL, PLOMEEK, SLUGLIVER, ICECREAM
- Word frequency (zipf): RAKTAJINO 0.0, HASPERAT 0.0, JUMJA 0.0, SYNTHEHOL 0.0, PLOMEEK 0.0, SLUGLIVER 0.0, ICECREAM 2.53

**Critique:** Themed round.

## Round 354 [themed]: Star Trek: The Next Generation: Resistance Is Futile  (total 28.6, candidate M07)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| The Borg, as one | COLLECTIVE | COL · LECT · IVE | trivia | 3 |
| Tiny agent of assimilation | NANOPROBE | NAN · OP · ROBE | trivia | 3 |
| Borg worker bees | DRONES | DRO · NES | definition | 3 |
| One brain for a cube | HIVEMIND | HI · VEM · IND | definition | 3 |
| Where drones regenerate | ALCOVE | ALCO · VE | trivia | 4 |
| Seven of Nine's ___ 01 designation | UNIMATRIX | UNI · MAT · RIX | trivia | 4 |
| Borg version of sleep | REGENERATE | REG · ENER · ATE | trivia | 3 |

**Tile pool (19: 3 x 2-letter, 12 x 3-letter, 4 x 4-letter):** ALCO ATE COL DRO ENER HI IND IVE LECT MAT NAN NES OP REG RIX ROBE UNI VE VEM

**Score:** decoys 4.3/20 + tempting pairs 0.4/16 + shared fragments 0.0/10 + anchor balance 7.3/8 + shape 9.6/12 + word appeal 14.0/14 + penalties -15.2 = **structure 20.5/80** (scaled 12.8/50); clue rating 11.8/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 15.8/50**

- Decoys (5): DROVE, OPENER, HIVE, COLLECT*, MATRIX*
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: COLLECTIVE, NANOPROBE, DRONES, HIVEMIND, ALCOVE, REGENERATE
- Word frequency (zipf): COLLECTIVE 4.3, NANOPROBE 1.02, DRONES 3.78, HIVEMIND 1.56, ALCOVE 2.62, UNIMATRIX 0.0, REGENERATE 3.15

**Critique:** Themed round.

## Round 355 [themed]: Rick and Morty: Rick's Circle  (total 28.4, candidate O02)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Rick's winged best friend | BIRDPERSON | BIRD · PER · SON | trivia | 3 |
| Cat-like friend, all slang | SQUANCHY | SQU · ANC · HY | trivia | 4 |
| Rick's hive-mind ex | UNITY | UN · ITY | trivia | 4 |
| Cog-headed frenemy | GEARHEAD | GEA · RHE · AD | trivia | 4 |
| Janitor of the Vindicators | NOOBNOOB | NOOB · NOOB | trivia | 4 |
| Fake parasite memory husband | SLEEPYGARY | SLE · EPY · GARY | trivia | 4 |
| Morty's math teacher | GOLDENFOLD | GOL · DEN · FOLD | trivia | 4 |

**Tile pool (19: 3 x 2-letter, 11 x 3-letter, 5 x 4-letter):** AD ANC BIRD DEN EPY FOLD GARY GEA GOL HY ITY NOOB NOOB PER RHE SLE SON SQU UN

**Score:** decoys 4.8/20 + tempting pairs 0.4/16 + shared fragments 2.5/10 + anchor balance 0.1/8 + shape 7.6/12 + word appeal 14.0/14 + penalties -16.6 = **structure 12.8/80** (scaled 8.0/50); clue rating 20.4/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 20.4/50**

- Decoys (6): SQUAD, HYPER, UNFOLD, PERSON*, GOLDEN*, SLEEPY*
- Duplicate tiles: NOOB; near-twin tiles: none
- Giveaway tiles (share of the answer's family): EPY (0.49), GARY (0.463), GOL (0.497), NOOB (1.0), SLE (0.495); whole-word tiles: BIRD, FOLD
- Answers whose first tile has no rival continuation: BIRDPERSON, GEARHEAD, NOOBNOOB, SLEEPYGARY, GOLDENFOLD
- Word frequency (zipf): BIRDPERSON 0.0, SQUANCHY 0.0, UNITY 4.22, GEARHEAD 1.83, NOOBNOOB 0.0, SLEEPYGARY 0.0, GOLDENFOLD 0.0

**Critique:** Themed round.

## Round 356 [themed]: Star Trek: The Next Generation: Mister Data  (total 28.0, candidate M04)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Data's maker, Noonien | SOONG | SO · ONG | trivia | 4 |
| Data's brain type | POSITRONIC | POS · ITRO · NIC | trivia | 3 |
| Riker's nickname for Data | PINOCCHIO | PIN · OC · CHIO | trivia | 4 |
| Data, technically | ANDROID | AND · ROID | definition | 2 |
| ___ chip, Data's upgrade | EMOTION | EMO · TION | trivia | 3 |
| Data's pet, described | SPOTCAT | SPOT · CAT | wordplay | 4 |
| Lal, to Data | DAUGHTER | DA · UGH · TER | trivia | 3 |

**Tile pool (17: 3 x 2-letter, 9 x 3-letter, 5 x 4-letter):** AND CAT CHIO DA EMO ITRO NIC OC ONG PIN POS ROID SO SPOT TER TION UGH

**Score:** decoys 3.3/20 + tempting pairs 0.4/16 + shared fragments 0.0/10 + anchor balance 4.1/8 + shape 5.6/12 + word appeal 14.0/14 + penalties -15.8 = **structure 11.6/80** (scaled 7.2/50); clue rating 11.8/30 + variety 8.0/8 + puns 3.0/12 + penalties -2.0 = **clues 20.8/50**

- Decoys (3): POSTER, SODA, SONIC
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): AND (0.505), CHIO (1.0), EMO (0.503); whole-word tiles: SPOT
- Answers whose first tile has no rival continuation: SOONG, PINOCCHIO, ANDROID, EMOTION, SPOTCAT, DAUGHTER
- Word frequency (zipf): SOONG 2.33, POSITRONIC 1.62, PINOCCHIO 2.93, ANDROID 4.42, EMOTION 4.19, SPOTCAT 0.0, DAUGHTER 5.07

**Critique:** Themed round.

## Round 357 [themed]: Rick and Morty: Cast and Crew  (total 27.8, candidate O07)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Chris, voice of Jerry | PARNELL | PAR · NELL | trivia | 4 |
| Spencer, voice of Summer | GRAMMER | GRAM · MER | trivia | 4 |
| Harry, the newer Morty | BELDEN | BEL · DEN | trivia | 4 |
| Ms Grammer's first name | SPENCER | SPEN · CER | trivia | 4 |
| Scott Marder's job | SHOWRUNNER | SHOW · RUN · NER | trivia | 3 |
| Drawer of the frames | ANIMATOR | AN · IMA · TOR | definition | 2 |
| Drawer of funny pictures | CARTOONIST | CAR · TOO · NIST | definition | 2 |

**Tile pool (17: 1 x 2-letter, 11 x 3-letter, 5 x 4-letter):** AN BEL CAR CER DEN GRAM IMA MER NELL NER NIST PAR RUN SHOW SPEN TOO TOR

**Score:** decoys 0.5/20 + tempting pairs 0.8/16 + shared fragments 7.5/10 + anchor balance 7.0/8 + shape 7.9/12 + word appeal 14.0/14 + penalties -12.2 = **structure 25.6/80** (scaled 16.0/50); clue rating 11.8/30 + variety 4.0/8 + puns 0.0/12 + penalties -4.0 = **clues 11.8/50**

- Decoys (1): RUNNER*
- Duplicate tiles: none; near-twin tiles: CAR/CER, CAR/PAR, CER/MER, CER/NER, MER/NER, TOO/TOR
- Giveaway tiles (share of the answer's family): GRAM (0.405), NELL (0.737); whole-word tiles: SHOW
- Answers whose first tile has no rival continuation: GRAMMER, BELDEN, SPENCER, SHOWRUNNER, ANIMATOR, CARTOONIST
- Word frequency (zipf): PARNELL 2.95, GRAMMER 2.67, BELDEN 2.33, SPENCER 4.07, SHOWRUNNER 2.64, ANIMATOR 2.93, CARTOONIST 3.07

**Critique:** Themed round.

## Round 358 [themed]: Condiments: Asian Pantry  (total 27.0, candidate Q02)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Sushi's dip | SOYSAUCE | SOY · SAU · CE | definition | 2 |
| Peking duck's sweet sauce | HOISIN | HOI · SIN | trivia | 3 |
| Indonesian chili paste | SAMBAL | SAM · BAL | definition | 3 |
| Green sinus-clearer | WASABI | WAS · ABI | evocative | 3 |
| Rooster-bottle hot sauce | SRIRACHA | SRI · RA · CHA | trivia | 3 |
| Wheat-free soy cousin | TAMARI | TAM · ARI | definition | 4 |
| Crispy red topping | CHILIOIL | CHI · LI · OIL | definition | 3 |

**Tile pool (17: 3 x 2-letter, 14 x 3-letter):** ABI ARI BAL CE CHA CHI HOI LI OIL RA SAM SAU SIN SOY SRI TAM WAS

**Score:** decoys 4.0/20 + tempting pairs 1.2/16 + shared fragments 6.2/10 + anchor balance 6.4/8 + shape 8.0/12 + word appeal 14.0/14 + penalties -18.2 = **structure 21.6/80** (scaled 13.5/50); clue rating 7.5/30 + variety 8.0/8 + puns 0.0/12 + penalties -2.0 = **clues 13.5/50**

- Decoys (7): SINCE, RACE, LICE, CHALICE, LIRA, SAUCE*, CHILI*
- Duplicate tiles: none; near-twin tiles: ABI/ARI, ARI/SRI, CHA/CHI, SAM/SAU, SAM/TAM
- Giveaway tiles (share of the answer's family): ABI (0.504), SRI (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: SOYSAUCE, HOISIN, SAMBAL, WASABI, SRIRACHA, TAMARI, CHILIOIL
- Word frequency (zipf): SOYSAUCE 0.0, HOISIN 1.81, SAMBAL 2.15, WASABI 2.77, SRIRACHA 2.72, TAMARI 1.92, CHILIOIL 0.0

**Critique:** Themed round.

## Round 359 [themed]: Star Trek: Lower Decks: Cast and Crew  (total 26.7, candidate L05)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Tawny, voice of Mariner | NEWSOME | NEW · SOME | trivia | 4 |
| Jack, voice of Boimler | QUAID | QUA · ID | trivia | 4 |
| Mike, the creator | MCMAHAN | MCMA · HAN | trivia | 4 |
| Gillian, voice of the cat doctor | VIGMAN | VIG · MAN | trivia | 4 |
| Like the show, unlike TNG | ANIMATED | ANI · MAT · ED | definition | 2 |
| Studio behind the show | PARAMOUNT | PAR · AMO · UNT | trivia | 3 |
| How it airs | STREAMING | STRE · AM · ING | definition | 2 |

**Tile pool (17: 3 x 2-letter, 11 x 3-letter, 3 x 4-letter):** AM AMO ANI ED HAN ID ING MAN MAT MCMA NEW PAR QUA SOME STRE UNT VIG

**Score:** decoys 7.0/20 + tempting pairs 2.8/16 + shared fragments 2.5/10 + anchor balance 6.8/8 + shape 7.9/12 + word appeal 14.0/14 + penalties -17.2 = **structure 23.9/80** (scaled 14.9/50); clue rating 11.8/30 + variety 4.0/8 + puns 0.0/12 + penalties -4.0 = **clues 11.8/50**

- Decoys (8): AMID, AMOUNTED, MATING, STREAMED, AMOUNTING, AMOUNT*, STREAM*, MATED*
- Duplicate tiles: none; near-twin tiles: HAN/MAN, MAN/MAT
- Giveaway tiles (share of the answer's family): ANI (0.468), MCMA (1.0); whole-word tiles: SOME
- Answers whose first tile has no rival continuation: NEWSOME, QUAID, MCMAHAN, VIGMAN, ANIMATED, STREAMING
- Word frequency (zipf): NEWSOME 2.55, QUAID 2.75, MCMAHAN 1.94, VIGMAN 0.0, ANIMATED 4.07, PARAMOUNT 3.73, STREAMING 4.22

**Critique:** Themed round.

## Round 360 [themed]: Star Trek: The Next Generation: Episodes  (total 26.6, candidate M02)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Picard lives a lifetime on Kataan | INNERLIGHT | IN · NERL · IGHT | trivia | 3 |
| The ___ of a Man | MEASURE | MEA · SURE | trivia | 3 |
| ___'s Enterprise, Tasha returns | YESTERDAY | YE · STER · DAY | trivia | 4 |
| Picard heals in France | FAMILY | FAM · ILY | trivia | 4 |
| Instrument from the Kataan probe | FLUTE | FLU · TE | trivia | 3 |
| Two-parter with Mark Twain | TIMESARROW | TIME · SAR · ROW | trivia | 4 |
| Worf slips between quantum realities | PARALLELS | PAR · ALL · ELS | trivia | 4 |

**Tile pool (18: 3 x 2-letter, 10 x 3-letter, 5 x 4-letter):** ALL DAY ELS FAM FLU IGHT ILY IN MEA NERL PAR ROW SAR STER SURE TE TIME YE

**Score:** decoys 3.7/20 + tempting pairs 1.2/16 + shared fragments 1.2/10 + anchor balance 6.3/8 + shape 7.1/12 + word appeal 14.0/14 + penalties -16.7 = **structure 16.8/80** (scaled 10.5/50); clue rating 16.1/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 16.1/50**

- Decoys (3): DAYTIME, INSURE, TESTER
- Duplicate tiles: none; near-twin tiles: PAR/SAR
- Giveaway tiles (share of the answer's family): FAM (0.703), NERL (1.0); whole-word tiles: SURE, TIME
- Answers whose first tile has no rival continuation: MEASURE, YESTERDAY, FAMILY, FLUTE, TIMESARROW, PARALLELS
- Word frequency (zipf): INNERLIGHT 0.0, MEASURE 4.65, YESTERDAY 4.91, FAMILY 5.66, FLUTE 3.52, TIMESARROW 0.0, PARALLELS 3.57

**Critique:** Themed round.

## Round 361 [themed]: Condiments: Salad Days  (total 26.4, candidate Q06)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Wing dip with veins | BLUECHEESE | BLU · ECH · EESE | evocative | 3 |
| Zesty dressing, or a nationality | ITALIAN | ITAL · IAN | wordplay | 3 |
| Modena's aged vinegar | BALSAMIC | BAL · SAM · IC | definition | 3 |
| Sweet red dressing, an island too | CATALINA | CAT · ALI · NA | wordplay | 4 |
| Sour half of vinaigrette | VINEGAR | VINE · GAR | definition | 2 |
| Oil and water, made friends | EMULSION | EMUL · SION | evocative | 4 |
| Crunchy salad toppers | CROUTONS | CRO · UT · ONS | definition | 2 |

**Tile pool (18: 3 x 2-letter, 10 x 3-letter, 5 x 4-letter):** ALI BAL BLU CAT CRO ECH EESE EMUL GAR IAN IC ITAL NA ONS SAM SION UT VINE

**Score:** decoys 1.2/20 + tempting pairs 0.8/16 + shared fragments 0.0/10 + anchor balance 7.2/8 + shape 6.1/12 + word appeal 14.0/14 + penalties -15.0 = **structure 14.3/80** (scaled 8.9/50); clue rating 7.5/30 + variety 8.0/8 + puns 6.0/12 + penalties -4.0 = **clues 17.5/50**

- Decoys (1): ICONS
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): ITAL (0.515); whole-word tiles: none
- Answers whose first tile has no rival continuation: BLUECHEESE, ITALIAN, BALSAMIC, CATALINA, VINEGAR, EMULSION, CROUTONS
- Word frequency (zipf): BLUECHEESE 0.0, ITALIAN 4.66, BALSAMIC 2.74, CATALINA 3.07, VINEGAR 3.64, EMULSION 2.89, CROUTONS 2.49

**Critique:** Themed round.

## Round 362 [themed]: Star Trek: The Next Generation: Klingon Honor  (total 25.0, candidate M09)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Worf's half-Klingon love | KEHLEYR | KEH · LEYR | trivia | 4 |
| Curved Klingon sword | BATLETH | BAT · LETH | trivia | 3 |
| Worf's warrior's drink | PRUNEJUICE | PRUN · EJU · ICE | trivia | 4 |
| Lursa's sister | BETOR | BET · OR | trivia | 4 |
| Discommendation brings it | DISHONOR | DIS · HON · OR | definition | 3 |
| The Unforgettable, cloned | KAHLESS | KAH · LESS | trivia | 4 |
| Klingon party pour | BLOODWINE | BLO · ODWI · NE | trivia | 3 |

**Tile pool (17: 3 x 2-letter, 9 x 3-letter, 5 x 4-letter):** BAT BET BLO DIS EJU HON ICE KAH KEH LESS LETH LEYR NE ODWI OR OR PRUN

**Score:** decoys 0.3/20 + tempting pairs 0.0/16 + shared fragments 5.0/10 + anchor balance 0.0/8 + shape 5.6/12 + word appeal 14.0/14 + penalties -17.1 = **structure 7.8/80** (scaled 4.9/50); clue rating 16.1/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 20.1/50**

- Decoys (1): HONOR*
- Duplicate tiles: OR; near-twin tiles: BAT/BET, KAH/KEH
- Giveaway tiles (share of the answer's family): KAH (1.0), KEH (1.0), LETH (0.6), LEYR (1.0), PRUN (0.536); whole-word tiles: LESS
- Answers whose first tile has no rival continuation: KEHLEYR, BATLETH, PRUNEJUICE, BETOR, DISHONOR, KAHLESS, BLOODWINE
- Word frequency (zipf): KEHLEYR 0.0, BATLETH 0.0, PRUNEJUICE 0.0, BETOR 0.0, DISHONOR 2.88, KAHLESS 1.51, BLOODWINE 0.0

**Critique:** Themed round.

## Round 363 [themed]: Condiments: World Tour  (total 25.0, candidate Q09)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Catalan pepper-almond sauce | ROMESCO | ROM · ESCO | definition | 3 |
| Green sauce, literally | SALSAVERDE | SAL · SAV · ERDE | definition | 3 |
| North African herb marinade | CHERMOULA | CHER · MOU · LA | definition | 4 |
| Filipino vinegar braise | ADOBO | ADO · BO | definition | 3 |
| Georgian sour plum sauce | TKEMALI | TKEM · ALI | definition | 4 |
| Slow-cooked aromatic base | SOFRITO | SOF · RITO | definition | 4 |
| Osso buco's lemony garnish | GREMOLATA | GRE · MOL · ATA | definition | 4 |

**Tile pool (17: 2 x 2-letter, 10 x 3-letter, 5 x 4-letter):** ADO ALI ATA BO CHER ERDE ESCO GRE LA MOL MOU RITO ROM SAL SAV SOF TKEM

**Score:** decoys 0.0/20 + tempting pairs 0.0/16 + shared fragments 1.2/10 + anchor balance 6.2/8 + shape 6.8/12 + word appeal 14.0/14 + penalties -14.1 = **structure 14.2/80** (scaled 8.9/50); clue rating 16.1/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 16.1/50**

- Decoys (0): none
- Duplicate tiles: none; near-twin tiles: MOL/MOU
- Giveaway tiles (share of the answer's family): ERDE (0.751), TKEM (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: ROMESCO, SALSAVERDE, CHERMOULA, ADOBO, TKEMALI, SOFRITO, GREMOLATA
- Word frequency (zipf): ROMESCO 1.43, SALSAVERDE 0.0, CHERMOULA 0.0, ADOBO 2.14, TKEMALI 0.0, SOFRITO 1.47, GREMOLATA 1.43

**Critique:** Themed round.

## Round 364 [themed]: Discworld: The Author  (total 24.6, candidate N09)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Josh, the early cover artist | KIRBY | KIR · BY | trivia | 4 |
| Paul, the later cover artist | KIDBY | KID · BY | trivia | 4 |
| Signature black hat | FEDORA | FED · ORA | trivia | 3 |
| Pratchett's first career | JOURNALIST | JOUR · NAL · IST | trivia | 3 |
| X-Clacks-___, his web memorial | OVERHEAD | OVER · HEAD | trivia | 4 |
| UK chart-topper, often | BESTSELLER | BES · TSEL · LER | definition | 2 |
| Fantasy writer with a sharp pen | SATIRIST | SA · TIR · IST | definition | 3 |

**Tile pool (17: 3 x 2-letter, 10 x 3-letter, 4 x 4-letter):** BES BY BY FED HEAD IST IST JOUR KID KIR LER NAL ORA OVER SA TIR TSEL

**Score:** decoys 0.5/20 + tempting pairs 0.0/16 + shared fragments 7.5/10 + anchor balance 6.5/8 + shape 6.8/12 + word appeal 14.0/14 + penalties -18.0 = **structure 17.3/80** (scaled 10.8/50); clue rating 11.8/30 + variety 4.0/8 + puns 0.0/12 + penalties -2.0 = **clues 13.8/50**

- Decoys (1): JOURNAL*
- Duplicate tiles: BY, IST; near-twin tiles: KID/KIR, KIR/TIR
- Giveaway tiles (share of the answer's family): JOUR (0.979), KIR (0.551); whole-word tiles: HEAD, OVER
- Answers whose first tile has no rival continuation: KIRBY, KIDBY, FEDORA, JOURNALIST, OVERHEAD, BESTSELLER, SATIRIST
- Word frequency (zipf): KIRBY 3.65, KIDBY 0.0, FEDORA 3.06, JOURNALIST 4.38, OVERHEAD 3.93, BESTSELLER 3.34, SATIRIST 2.63

**Critique:** Themed round.

## Round 365 [themed]: Rick and Morty: Episodes  (total 23.7, candidate O05)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| ___ Park, inside a man | ANATOMY | ANAT · OMY | trivia | 4 |
| ___ Dog, Snuffles's debut | LAWNMOWER | LAWN · MOW · ER | trivia | 4 |
| ___ Minutes | RIXTY | RIX · TY | trivia | 4 |
| The ___ Mixup | RICKLANTIS | RICK · LAN · TIS | trivia | 4 |
| Mr ___'s cursed shop | NEEDFUL | NEED · FUL | trivia | 4 |
| Episode one, plainly | PILOT | PIL · OT | definition | 2 |
| Fake-death plan, in episode form | VATOFACID | VAT · OFA · CID | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 10 x 3-letter, 4 x 4-letter):** ANAT CID ER FUL LAN LAWN MOW NEED OFA OMY OT PIL RICK RIX TIS TY VAT

**Score:** decoys 1.4/20 + tempting pairs 1.2/16 + shared fragments 0.0/10 + anchor balance 0.0/8 + shape 6.8/12 + word appeal 14.0/14 + penalties -17.7 = **structure 5.6/80** (scaled 3.5/50); clue rating 18.2/30 + variety 4.0/8 + puns 0.0/12 + penalties -2.0 = **clues 20.2/50**

- Decoys (2): CIDER, MOWER*
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): ANAT (0.612), LAWN (0.44), RICK (0.511), RIX (0.613), VAT (0.503); whole-word tiles: NEED, RICK
- Answers whose first tile has no rival continuation: ANATOMY, LAWNMOWER, RIXTY, RICKLANTIS, NEEDFUL, PILOT, VATOFACID
- Word frequency (zipf): ANATOMY 3.94, LAWNMOWER 2.7, RIXTY 0.0, RICKLANTIS 0.0, NEEDFUL 2.54, PILOT 4.52, VATOFACID 0.0

**Critique:** Themed round.

## Round 366 [themed]: Star Trek: Lower Decks: Crew of the Cerritos  (total 23.6, candidate L01)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| List of who does what | DUTYROSTER | DU · TYR · OST · ER | definition | 3 |
| Lowest officer rank | ENSIGN | ENS · IGN | definition | 2 |
| Rule-breaking ensign, captain's daughter | MARINER | MAR · INER | trivia | 3 |
| Rutherford's head hardware | IMPLANT | IMP · LANT | trivia | 3 |
| Captain Carol | FREEMAN | FRE · EMAN | trivia | 3 |
| Engineer with a cyborg implant | RUTHERFORD | RUTH · ERF · ORD | trivia | 3 |
| Lieutenant, junior grade, finally | PROMOTION | PRO · MOT · ION | definition | 3 |

**Tile pool (18: 2 x 2-letter, 12 x 3-letter, 4 x 4-letter):** DU EMAN ENS ER ERF FRE IGN IMP INER ION LANT MAR MOT ORD OST PRO RUTH TYR

**Score:** decoys 5.0/20 + tempting pairs 1.6/16 + shared fragments 1.2/10 + anchor balance 7.5/8 + shape 9.3/12 + word appeal 14.0/14 + penalties -12.7 = **structure 26.0/80** (scaled 16.2/50); clue rating 5.4/30 + variety 4.0/8 + puns 0.0/12 + penalties -2.0 = **clues 7.4/50**

- Decoys (5): ORDER, PROMOTER, MARTYR, FREER, MOTION*
- Duplicate tiles: none; near-twin tiles: IGN/ION
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: DUTYROSTER, ENSIGN, MARINER, FREEMAN, RUTHERFORD
- Word frequency (zipf): DUTYROSTER 0.0, ENSIGN 3.27, MARINER 3.03, IMPLANT 3.48, FREEMAN 3.83, RUTHERFORD 3.37, PROMOTION 4.41

**Critique:** Themed round.

## Round 367 [themed]: Condiments: Dip It  (total 23.4, candidate Q04)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Avocado's best look | GUACAMOLE | GUA · CAM · OLE | evocative | 3 |
| Chickpea dip | HUMMUS | HUM · MUS | definition | 2 |
| Cucumber-yogurt sauce | TZATZIKI | TZAT · ZIKI | definition | 3 |
| Chip dip, or dance | SALSA | SAL · SA | wordplay | 3 |
| Red pepper and walnut dip | MUHAMMARA | MU · HAM · MARA | definition | 4 |
| Strained yogurt spread | LABNEH | LAB · NEH | definition | 3 |
| Ripple chip's best friend | ONIONDIP | ONI · ON · DIP | evocative | 3 |

**Tile pool (17: 3 x 2-letter, 11 x 3-letter, 3 x 4-letter):** CAM DIP GUA HAM HUM LAB MARA MU MUS NEH OLE ON ONI SA SAL TZAT ZIKI

**Score:** decoys 1.5/20 + tempting pairs 0.0/16 + shared fragments 2.5/10 + anchor balance 0.0/8 + shape 7.9/12 + word appeal 14.0/14 + penalties -15.0 = **structure 11.0/80** (scaled 6.9/50); clue rating 7.5/30 + variety 8.0/8 + puns 3.0/12 + penalties -2.0 = **clues 16.5/50**

- Decoys (2): SALON, ONION*
- Duplicate tiles: none; near-twin tiles: CAM/HAM, HAM/HUM
- Giveaway tiles (share of the answer's family): DIP (0.528), MARA (0.572), MUS (0.506), NEH (1.0), ONI (0.519), SA (0.501), TZAT (1.0), ZIKI (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: GUACAMOLE, HUMMUS, TZATZIKI, SALSA, MUHAMMARA, LABNEH, ONIONDIP
- Word frequency (zipf): GUACAMOLE 2.91, HUMMUS 3.0, TZATZIKI 1.92, SALSA 3.53, MUHAMMARA 0.0, LABNEH 1.32, ONIONDIP 0.0

**Critique:** Themed round.

## Round 368 [themed]: Star Trek: Deep Space Nine: The Station  (total 22.9, candidate K01)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Quark's rentable fantasy room | HOLOSUITE | HOL · OSU · ITE | trivia | 3 |
| Stable shortcut to the Gamma Quadrant | WORMHOLE | WORM · HOLE | trivia | 3 |
| The station's Cardassian name | TEROKNOR | TER · OK · NOR | trivia | 4 |
| Promenade's self-serve eatery | REPLIMAT | REP · LI · MAT | trivia | 4 |
| Officers' meeting room | WARDROOM | WAR · DRO · OM | definition | 3 |
| Small Danube-class shuttle | RUNABOUT | RUNA · BOUT | trivia | 4 |
| ___ ring, where ships attach | DOCKING | DOC · KING | trivia | 3 |

**Tile pool (18: 3 x 2-letter, 10 x 3-letter, 5 x 4-letter):** BOUT DOC DRO HOL HOLE ITE KING LI MAT NOR OK OM OSU REP RUNA TER WAR WORM

**Score:** decoys 4.0/20 + tempting pairs 0.4/16 + shared fragments 0.0/10 + anchor balance 7.5/8 + shape 6.1/12 + word appeal 14.0/14 + penalties -19.2 = **structure 12.8/80** (scaled 8.0/50); clue rating 13.9/30 + variety 4.0/8 + puns 0.0/12 + penalties -3.0 = **clues 14.9/50**

- Decoys (3): MATTER, LIKING, LITER
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): none; whole-word tiles: BOUT, HOLE
- Answers whose first tile has no rival continuation: HOLOSUITE, WORMHOLE, TEROKNOR, REPLIMAT, WARDROOM, RUNABOUT, DOCKING
- Word frequency (zipf): HOLOSUITE 1.19, WORMHOLE 2.91, TEROKNOR 0.0, REPLIMAT 0.0, WARDROOM 1.9, RUNABOUT 2.27, DOCKING 3.31

**Critique:** Themed round.

## Round 369 [themed]: Rick and Morty: The Smiths  (total 22.9, candidate O01)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Rick's surname | SANCHEZ | SAN · CHEZ | trivia | 3 |
| Older sister, phone-glued | SUMMER | SUM · MER | trivia | 3 |
| Maybe-clone off adventuring | SPACEBETH | SPA · CEB · ETH | trivia | 4 |
| Rick's late wife | DIANE | DI · ANE | trivia | 4 |
| Hapless dad | JERRYSMITH | JER · RYS · MITH | trivia | 3 |
| Rick, to Morty | GRANDPA | GRA · NDPA | definition | 2 |
| Summer, by age | TEENAGER | TEE · NA · GER | definition | 2 |

**Tile pool (17: 2 x 2-letter, 12 x 3-letter, 3 x 4-letter):** ANE CEB CHEZ DI ETH GER GRA JER MER MITH NA NDPA RYS SAN SPA SUM TEE

**Score:** decoys 1.7/20 + tempting pairs 0.4/16 + shared fragments 3.8/10 + anchor balance 5.9/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -10.1 = **structure 24.7/80** (scaled 15.4/50); clue rating 7.5/30 + variety 4.0/8 + puns 0.0/12 + penalties -4.0 = **clues 7.5/50**

- Decoys (1): MERGER
- Duplicate tiles: none; near-twin tiles: GER/JER, GER/MER, JER/MER
- Giveaway tiles (share of the answer's family): CHEZ (1.0), NDPA (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: SANCHEZ, SUMMER, SPACEBETH, JERRYSMITH, TEENAGER
- Word frequency (zipf): SANCHEZ 3.77, SUMMER 5.23, SPACEBETH 0.0, DIANE 3.83, JERRYSMITH 0.0, GRANDPA 3.8, TEENAGER 4.09

**Critique:** Themed round.

## Round 370 [themed]: Rick and Morty: Snacks and Science  (total 22.2, candidate O10)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Sauce Rick's quest centers on | SZECHUAN | SZE · CHU · AN | trivia | 3 |
| Dip vessel for that sauce | MCNUGGET | MCNU · GGET | trivia | 3 |
| Smuggled in an uncomfortable way | MEGASEEDS | MEG · ASE · EDS | trivia | 4 |
| Movie behind Rick's sauce craving | MULAN | MUL · AN | trivia | 4 |
| ___ crystals, at Blips and Chitz? | KALAXIAN | KA · LAX · IAN | trivia | 4 |
| Concentrated ___, Rick's fuel | DARKMATTER | DARK · MAT · TER | trivia | 3 |
| Alien currency in the arcade | FLURBOS | FLUR · BOS | trivia | 4 |

**Tile pool (18: 3 x 2-letter, 11 x 3-letter, 4 x 4-letter):** AN AN ASE BOS CHU DARK EDS FLUR GGET IAN KA LAX MAT MCNU MEG MUL SZE TER

**Score:** decoys 0.5/20 + tempting pairs 0.0/16 + shared fragments 2.5/10 + anchor balance 1.7/8 + shape 8.2/12 + word appeal 14.0/14 + penalties -17.1 = **structure 9.8/80** (scaled 6.1/50); clue rating 16.1/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 16.1/50**

- Decoys (1): MATTER*
- Duplicate tiles: AN; near-twin tiles: none
- Giveaway tiles (share of the answer's family): FLUR (0.468), MCNU (1.0), MEG (0.577), SZE (1.0); whole-word tiles: DARK
- Answers whose first tile has no rival continuation: SZECHUAN, MCNUGGET, MEGASEEDS, MULAN, KALAXIAN, DARKMATTER, FLURBOS
- Word frequency (zipf): SZECHUAN 2.28, MCNUGGET 1.81, MEGASEEDS 0.0, MULAN 2.81, KALAXIAN 0.0, DARKMATTER 1.18, FLURBOS 0.0

**Critique:** Themed round.

## Round 371 [themed]: Star Trek: Deep Space Nine: Garak and Odo  (total 22.0, candidate K06)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Tain's first name, Garak's father | ENABRAN | ENAB · RAN | trivia | 4 |
| Odo's word for everyone else | SOLIDS | SOL · IDS | trivia | 4 |
| Plain, ___ Garak | SIMPLE | SIM · PLE | trivia | 4 |
| The station's tailor, in full | ELIMGARAK | ELIM · GAR · AK | trivia | 3 |
| Odo's department | SECURITY | SEC · URI · TY | definition | 2 |
| Odo's party trick | SHAPESHIFT | SHA · PES · HIFT | definition | 2 |
| Garak's status on the station | EXILE | EXI · LE | trivia | 3 |

**Tile pool (17: 3 x 2-letter, 11 x 3-letter, 3 x 4-letter):** AK ELIM ENAB EXI GAR HIFT IDS LE PES PLE RAN SEC SHA SIM SOL TY URI

**Score:** decoys 5.0/20 + tempting pairs 0.4/16 + shared fragments 0.0/10 + anchor balance 7.1/8 + shape 7.9/12 + word appeal 14.0/14 + penalties -14.6 = **structure 19.8/80** (scaled 12.4/50); clue rating 9.6/30 + variety 4.0/8 + puns 0.0/12 + penalties -4.0 = **clues 9.6/50**

- Decoys (5): TYPES, ENABLE, LEAK, SHALE, SHAPES*
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): SIM (0.457); whole-word tiles: none
- Answers whose first tile has no rival continuation: SOLIDS, SIMPLE, ELIMGARAK, SECURITY, SHAPESHIFT, EXILE
- Word frequency (zipf): ENABRAN 0.0, SOLIDS 3.33, SIMPLE 5.08, ELIMGARAK 0.0, SECURITY 5.2, SHAPESHIFT 2.07, EXILE 3.84

**Critique:** Themed round.

## Round 372 [themed]: Star Trek: Lower Decks: Alien Encounters  (total 21.2, candidate L06)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Tendi's people, green and rich | ORIONS | ORI · ONS | trivia | 3 |
| White ape with a horn | MUGATO | MUG · ATO | trivia | 4 |
| Speaker in metaphors | TAMARIAN | TAM · ARI · AN | trivia | 3 |
| Strange New Worlds team-up | CROSSOVER | CROS · SO · VER | trivia | 3 |
| Orion business, stereotypically | PIRATES | PIRA · TES | trivia | 3 |
| Class of the Cerritos | CALIFORNIA | CAL · IFOR · NIA | trivia | 3 |
| Cat-warriors from the animated era | KZINTI | KZIN · TI | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 10 x 3-letter, 4 x 4-letter):** AN ARI ATO CAL CROS IFOR KZIN MUG NIA ONS ORI PIRA SO TAM TES TI VER

**Score:** decoys 2.2/20 + tempting pairs 1.6/16 + shared fragments 1.2/10 + anchor balance 4.2/8 + shape 6.8/12 + word appeal 14.0/14 + penalties -15.0 = **structure 15.0/80** (scaled 9.4/50); clue rating 11.8/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 11.8/50**

- Decoys (2): ANTI, VERTICAL
- Duplicate tiles: none; near-twin tiles: ARI/ORI
- Giveaway tiles (share of the answer's family): CROS (0.801), KZIN (1.0), PIRA (0.472); whole-word tiles: none
- Answers whose first tile has no rival continuation: ORIONS, MUGATO, TAMARIAN, CROSSOVER, PIRATES, CALIFORNIA, KZINTI
- Word frequency (zipf): ORIONS 1.96, MUGATO 0.0, TAMARIAN 1.04, CROSSOVER 3.66, PIRATES 3.99, CALIFORNIA 5.0, KZINTI 1.09

**Critique:** Themed round.

## Round 373 [themed]: Star Trek: The Next Generation: Bridge Crew  (total 19.5, candidate M01)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Ensign told to shut up | WESLEY | WES · LEY | trivia | 3 |
| Ten Forward's wise hostess | GUINAN | GUI · NAN | trivia | 3 |
| Holo-addicted engineer Reg | BARCLAY | BARC · LAY | trivia | 3 |
| Worf's son | ALEXANDER | ALE · XAN · DER | trivia | 3 |
| Troi's first name | DEANNA | DE · ANNA | trivia | 3 |
| Troi's job | COUNSELOR | COUN · SEL · OR | trivia | 2 |
| Worf's station | TACTICAL | TAC · TIC · AL | trivia | 3 |

**Tile pool (17: 3 x 2-letter, 11 x 3-letter, 3 x 4-letter):** AL ALE ANNA BARC COUN DE DER GUI LAY LEY NAN OR SEL TAC TIC WES XAN

**Score:** decoys 8.4/20 + tempting pairs 2.0/16 + shared fragments 2.5/10 + anchor balance 4.2/8 + shape 7.9/12 + word appeal 14.0/14 + penalties -13.3 = **structure 25.7/80** (scaled 16.1/50); clue rating 5.4/30 + variety 0.0/8 + puns 0.0/12 + penalties -2.0 = **clues 3.4/50**

- Decoys (10): ORDER, DEAL, GUIDE, DELAY, ORAL, ALLEY, ORDEAL, ALDER, COUNSEL*, TACTIC*
- Duplicate tiles: none; near-twin tiles: LAY/LEY, NAN/XAN
- Giveaway tiles (share of the answer's family): BARC (1.0), NAN (0.504), XAN (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: WESLEY, BARCLAY, ALEXANDER, COUNSELOR, TACTICAL
- Word frequency (zipf): WESLEY 3.7, GUINAN 2.03, BARCLAY 3.19, ALEXANDER 4.4, DEANNA 2.85, COUNSELOR 3.79, TACTICAL 3.97

**Critique:** Themed round.

## Round 374 [themed]: Rick and Morty: Channel Surfing  (total 18.8, candidate O09)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Real ___ for sale | FAKEDOORS | FAK · EDO · ORS | trivia | 4 |
| Ants in My Eyes ___ | JOHNSON | JOHN · SON | trivia | 4 |
| Cereal with a violent mascot | EYEHOLES | EYE · HO · LES | trivia | 4 |
| Regular Legs's detective partner | BABYLEGS | BA · BYL · EGS | trivia | 4 |
| Tiny food, tiny commercials | LILBITS | LIL · BITS | trivia | 4 |
| Interdimensional ___ | CABLE | CAB · LE | trivia | 2 |
| Strawberry ___, cereal ad | SMIGGLES | SMIG · GLES | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 10 x 3-letter, 4 x 4-letter):** BA BITS BYL CAB EDO EGS EYE FAK GLES HO JOHN LE LES LIL ORS SMIG SON

**Score:** decoys 5.4/20 + tempting pairs 0.4/16 + shared fragments 0.0/10 + anchor balance 0.0/8 + shape 6.8/12 + word appeal 14.0/14 + penalties -17.6 = **structure 8.9/80** (scaled 5.6/50); clue rating 18.2/30 + variety 0.0/8 + puns 0.0/12 + penalties -5.0 = **clues 13.2/50**

- Decoys (6): HOLE, LESSON, CABLES, BALE, BALES, HOLES*
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): BYL (0.494), EGS (1.0), FAK (0.457), JOHN (1.0), SMIG (1.0); whole-word tiles: BITS, JOHN
- Answers whose first tile has no rival continuation: FAKEDOORS, JOHNSON, EYEHOLES, BABYLEGS, LILBITS, SMIGGLES
- Word frequency (zipf): FAKEDOORS 0.0, JOHNSON 4.72, EYEHOLES 1.57, BABYLEGS 0.0, LILBITS 0.0, CABLE 4.54, SMIGGLES 0.0

**Critique:** Themed round.
