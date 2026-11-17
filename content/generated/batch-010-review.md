# batch-010: review sheet

30 rounds kept out of 30 clued candidates (30 word-disjoint candidates came out of
the generator). Rounds are ordered best-first by total score, so Round 1 is what the scoring
formula likes most and the last round least. Play them, then tell me where the formula is wrong.
One round was removed by editor veto rather than by score (see "Cut candidates").

**Total = structure (0-80, deterministic) + clues (0-20, judge ratings).** Batch range:
19.5 to 38.7, mean 29.7.

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
## Round 291 [themed]: Community: Catchphrases  (total 38.7, candidate I09)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| ___ ahead, Pierce's coinage | STREETS | STRE · ETS | trivia | 4 |
| And a movie, the rallying cry | SIXSEASONS | SIX · SEAS · ONS | trivia | 4 |
| Magnitude's two-word catchphrase | POPPOP | POP · POP | trivia | 4 |
| Faint praise, with an apostrophe | THATSNICE | THAT · SNI · CE | evocative | 3 |
| E ___ Anus, a school motto | PLURIBUS | PLU · RI · BUS | trivia | 5 |
| ___ timeline, felt goatees and all | DARKEST | DAR · KEST | trivia | 4 |
| Botched, Greendale-style | BRITTAD | BRIT · TAD | trivia | 5 |

**Tile pool (17: 2 x 2-letter, 10 x 3-letter, 5 x 4-letter):** BRIT BUS CE DAR ETS KEST ONS PLU POP POP RI SEAS SIX SNI STRE TAD THAT

**Score:** decoys 2.2/20 + tempting pairs 0.0/16 + shared fragments 2.5/10 + anchor balance 6.2/8 + shape 6.8/12 + word appeal 14.0/14 + penalties -15.6 = **structure 16.1/80** (scaled 10.1/50); clue rating 24.6/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 28.6/50**

- Decoys (3): RICE, CEDAR, SEASONS*
- Duplicate tiles: POP; near-twin tiles: none
- Giveaway tiles (share of the answer's family): BRIT (0.616), TAD (0.546); whole-word tiles: THAT
- Answers whose first tile has no rival continuation: STREETS, SIXSEASONS, POPPOP, THATSNICE, PLURIBUS, DARKEST, BRITTAD
- Word frequency (zipf): STREETS 4.66, SIXSEASONS 0.0, POPPOP 1.14, THATSNICE 0.0, PLURIBUS 2.02, DARKEST 3.58, BRITTAD 0.0

**Critique:** Fandom trivia round.

## Round 292 [themed]: Parks and Recreation: Tom's Ventures  (total 37.8, candidate H07)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Tom's clothes-borrowing boutique | RENTASWAG | REN · TAS · WAG | trivia | 4 |
| Tom's restaurant, finally a hit | BISTRO | BIS · TRO | trivia | 4 |
| Jean-___, the worst | RALPHIO | RAL · PHIO | trivia | 4 |
| Jean-Ralphio's surname | SAPERSTEIN | SAP · ERST · EIN | trivia | 4 |
| Treat yo self item after clothes | FRAGRANCES | FRAG · RAN · CES | trivia | 4 |
| Treat yo self item in a flute | MIMOSAS | MI · MO · SAS | trivia | 4 |
| Fine ___ goods, a treat | LEATHER | LEA · THER | trivia | 4 |

**Tile pool (18: 2 x 2-letter, 12 x 3-letter, 4 x 4-letter):** BIS CES EIN ERST FRAG LEA MI MO PHIO RAL RAN REN SAP SAS TAS THER TRO WAG

**Score:** decoys 3.8/20 + tempting pairs 0.4/16 + shared fragments 5.0/10 + anchor balance 6.6/8 + shape 9.3/12 + word appeal 14.0/14 + penalties -14.7 = **structure 24.5/80** (scaled 15.3/50); clue rating 22.5/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 22.5/50**

- Decoys (3): MOTHER, MORAL, THEREIN
- Duplicate tiles: none; near-twin tiles: RAL/RAN, RAN/REN, SAP/SAS, SAS/TAS
- Giveaway tiles (share of the answer's family): PHIO (1.0), WAG (0.528); whole-word tiles: none
- Answers whose first tile has no rival continuation: RENTASWAG, BISTRO, RALPHIO, SAPERSTEIN, FRAGRANCES, MIMOSAS, LEATHER
- Word frequency (zipf): RENTASWAG 0.0, BISTRO 3.05, RALPHIO 1.57, SAPERSTEIN 2.0, FRAGRANCES 2.84, MIMOSAS 2.41, LEATHER 4.35

**Critique:** Fandom trivia round.

## Round 293 [themed]: Parks and Recreation: Ben and Chris  (total 37.7, candidate H08)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Ben's folded-pizza dream | CALZONE | CAL · ZONE | trivia | 4 |
| The Cones of ___ | DUNSHIRE | DUN · SHI · RE | trivia | 4 |
| Chris's favorite emphasis | LITERALLY | LIT · ERAL · LY | trivia | 3 |
| Crisis that brings Ben and Chris | BUDGET | BUD · GET | trivia | 3 |
| State job that shrinks parks | AUDITOR | AUD · ITOR | trivia | 3 |
| Ben's home state, of Ice Town | MINNESOTA | MIN · NES · OTA | trivia | 4 |
| Ben's town, also a pear tree bird | PARTRIDGE | PAR · TRID · GE | wordplay | 4 |

**Tile pool (18: 3 x 2-letter, 11 x 3-letter, 4 x 4-letter):** AUD BUD CAL DUN ERAL GE GET ITOR LIT LY MIN NES OTA PAR RE SHI TRID ZONE

**Score:** decoys 6.4/20 + tempting pairs 2.0/16 + shared fragments 1.2/10 + anchor balance 6.7/8 + shape 8.2/12 + word appeal 14.0/14 + penalties -15.2 = **structure 23.4/80** (scaled 14.6/50); clue rating 16.1/30 + variety 4.0/8 + puns 3.0/12 + penalties 0.0 = **clues 23.1/50**

- Decoys (7): RELY, GENES, MINERAL, SHINES, BUDGE, LITERAL*, SHIRE*
- Duplicate tiles: none; near-twin tiles: AUD/BUD
- Giveaway tiles (share of the answer's family): AUD (0.421), BUD (0.605); whole-word tiles: ZONE
- Answers whose first tile has no rival continuation: CALZONE, LITERALLY, BUDGET, AUDITOR, MINNESOTA, PARTRIDGE
- Word frequency (zipf): CALZONE 2.2, DUNSHIRE 0.0, LITERALLY 4.91, BUDGET 4.82, AUDITOR 3.48, MINNESOTA 4.31, PARTRIDGE 3.2

**Critique:** Fandom trivia round.

## Round 294 [themed]: Community: Abed's Meta  (total 36.0, candidate I05)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Evil timeline's chin accessory | GOATEE | GOA · TEE | trivia | 4 |
| Abed's gravelly party persona | BATMAN | BAT · MAN | trivia | 4 |
| Training sequence, Abed approves | MONTAGE | MON · TAGE | definition | 3 |
| Abed's uncontrollable Christmas style | CLAYMATION | CLAY · MAT · ION | trivia | 4 |
| What Abed keeps leaning on | FOURTHWALL | FO · URTH · WALL | trivia | 3 |
| Abed's dream job | FILMMAKER | FILM · MAK · ER | trivia | 3 |
| Every episode, seemingly | HOMAGE | HOM · AGE | evocative | 3 |

**Tile pool (17: 2 x 2-letter, 10 x 3-letter, 5 x 4-letter):** AGE BAT CLAY ER FILM FO GOA HOM ION MAK MAN MAT MON TAGE TEE URTH WALL

**Score:** decoys 3.7/20 + tempting pairs 1.2/16 + shared fragments 7.5/10 + anchor balance 6.9/8 + shape 6.8/12 + word appeal 14.0/14 + penalties -17.4 = **structure 22.6/80** (scaled 14.1/50); clue rating 13.9/30 + variety 8.0/8 + puns 0.0/12 + penalties 0.0 = **clues 21.9/50**

- Decoys (4): MANAGE, HOMER, FOURTH*, MAKER*
- Duplicate tiles: none; near-twin tiles: BAT/MAT, ION/MON, MAK/MAN, MAK/MAT, MAN/MAT, MAN/MON
- Giveaway tiles (share of the answer's family): CLAY (1.0); whole-word tiles: CLAY, FILM, WALL
- Answers whose first tile has no rival continuation: GOATEE, BATMAN, MONTAGE, CLAYMATION, FOURTHWALL, FILMMAKER, HOMAGE
- Word frequency (zipf): GOATEE 2.68, BATMAN 4.22, MONTAGE 3.33, CLAYMATION 1.98, FOURTHWALL 0.0, FILMMAKER 3.62, HOMAGE 3.61

**Critique:** Fandom trivia round.

## Round 295 [themed]: Avatar: The Last Airbender: Episodes  (total 35.5, candidate J08)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Episode of Ember Island soul-searching | BEACH | BE · ACH | trivia | 4 |
| Festival where Aang is put on trial | AVATARDAY | AVA · TAR · DAY | trivia | 4 |
| Nightmares and ___ | DAYDREAMS | DAY · DRE · AMS | trivia | 4 |
| Cave of Two ___ | LOVERS | LOV · ERS | trivia | 4 |
| The ___ Rock, a prison | BOILING | BOI · LING | trivia | 4 |
| Ember Island ___, bad actors | PLAYERS | PLAY · ERS | trivia | 4 |
| Day of Black Sun's event | ECLIPSE | EC · LI · PSE | trivia | 3 |

**Tile pool (17: 3 x 2-letter, 12 x 3-letter, 2 x 4-letter):** ACH AMS AVA BE BOI DAY DAY DRE EC ERS ERS LI LING LOV PLAY PSE TAR

**Score:** decoys 4.3/20 + tempting pairs 0.8/16 + shared fragments 5.0/10 + anchor balance 7.1/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -16.1 = **structure 24.2/80** (scaled 15.1/50); clue rating 20.4/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 20.4/50**

- Decoys (5): BEERS, BEAMS, LINGERS, DREAMS*, AVATAR*
- Duplicate tiles: DAY, ERS; near-twin tiles: none
- Giveaway tiles (share of the answer's family): none; whole-word tiles: PLAY
- Answers whose first tile has no rival continuation: AVATARDAY, DAYDREAMS, LOVERS, BOILING, PLAYERS, ECLIPSE
- Word frequency (zipf): BEACH 4.92, AVATARDAY 0.0, DAYDREAMS 2.59, LOVERS 4.15, BOILING 3.75, PLAYERS 5.3, ECLIPSE 3.81

**Critique:** Fandom trivia round.

## Round 296 [themed]: Community: Troy and Abed  (total 34.9, candidate I06)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Troy and Abed in the ___ | MORNING | MOR · NING | trivia | 3 |
| Annie's Boobs, for one | MONKEY | MON · KEY | trivia | 4 |
| Floor game that consumed campus | HOTLAVA | HOT · LA · VA | trivia | 4 |
| LeVar, Troy's idol | BURTON | BUR · TON | trivia | 4 |
| Troy's repair school, briefly | AIRCON | AIR · CON | trivia | 4 |
| Pad Troy and Abed shared with Annie | APARTMENT | AP · ART · MENT | trivia | 3 |
| Troy and Abed's sacred bond | FRIENDSHIP | FRI · END · SHIP | evocative | 3 |

**Tile pool (17: 3 x 2-letter, 11 x 3-letter, 3 x 4-letter):** AIR AP ART BUR CON END FRI HOT KEY LA MENT MON MOR NING SHIP TON VA

**Score:** decoys 5.3/20 + tempting pairs 0.0/16 + shared fragments 5.0/10 + anchor balance 7.2/8 + shape 7.9/12 + word appeal 14.0/14 + penalties -15.9 = **structure 23.6/80** (scaled 14.8/50); clue rating 16.1/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 20.1/50**

- Decoys (6): BURNING, SHIPMENT, LAMENT, FRIEND*, APART*, LAVA*
- Duplicate tiles: none; near-twin tiles: CON/MON, CON/TON, MON/MOR, MON/TON
- Giveaway tiles (share of the answer's family): FRI (0.529); whole-word tiles: SHIP
- Answers whose first tile has no rival continuation: MORNING, MONKEY, HOTLAVA, BURTON, AIRCON, APARTMENT, FRIENDSHIP
- Word frequency (zipf): MORNING 5.33, MONKEY 4.07, HOTLAVA 0.0, BURTON 3.8, AIRCON 2.27, APARTMENT 4.65, FRIENDSHIP 4.39

**Critique:** Fandom trivia round.

## Round 297 [themed]: Parks and Recreation: Cast and Crew  (total 33.4, candidate H02)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Nick, mustache for hire | OFFERMAN | OF · FER · MAN | trivia | 3 |
| Ms Plaza, deadpan as April | AUBREY | AUB · REY | trivia | 4 |
| He played Chris, literally | ROBLOWE | ROB · LOWE | trivia | 3 |
| One-named actress behind Donna | RETTA | RET · TA | trivia | 4 |
| Megan, the Tammy who scared Ron | MULLALLY | MUL · LAL · LY | trivia | 4 |
| Ghostbuster who played a late mayor | BILLMURRAY | BILL · MUR · RAY | trivia | 4 |
| Pawnee mayor Walter, Murray's role | GUNDERSON | GUN · DER · SON | trivia | 4 |

**Tile pool (18: 3 x 2-letter, 13 x 3-letter, 2 x 4-letter):** AUB BILL DER FER GUN LAL LOWE LY MAN MUL MUR OF RAY RET REY ROB SON TA

**Score:** decoys 3.5/20 + tempting pairs 0.0/16 + shared fragments 5.0/10 + anchor balance 6.9/8 + shape 10.4/12 + word appeal 14.0/14 + penalties -15.6 = **structure 24.3/80** (scaled 15.2/50); clue rating 18.2/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 18.2/50**

- Decoys (4): MANLY, GUNMAN, FERRET, OFFER*
- Duplicate tiles: none; near-twin tiles: DER/FER, MUL/MUR, RAY/REY, RET/REY
- Giveaway tiles (share of the answer's family): LAL (0.468), LOWE (0.506); whole-word tiles: BILL
- Answers whose first tile has no rival continuation: OFFERMAN, AUBREY, ROBLOWE, RETTA, MULLALLY, BILLMURRAY, GUNDERSON
- Word frequency (zipf): OFFERMAN 2.18, AUBREY 3.31, ROBLOWE 0.0, RETTA 1.71, MULLALLY 1.89, BILLMURRAY 0.0, GUNDERSON 2.49

**Critique:** Fandom trivia round.

## Round 298 [themed]: Parks and Recreation: Townies  (total 33.4, candidate H09)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Donna's prized car | MERCEDES | MER · CE · DES | trivia | 4 |
| Joan, of Pawnee Today | CALLAMEZZO | CAL · LAM · EZ · ZO | trivia | 4 |
| Perd, the anchor who states the obvious | HAPLEY | HAP · LEY | trivia | 4 |
| Bobby, Sweetums heir and rival | NEWPORT | NEW · PORT | trivia | 4 |
| Shauna ___-Tweep, reporter | MALWAE | MAL · WAE | trivia | 4 |
| Reporter with dating bad luck | SHAUNA | SHA · UNA | trivia | 4 |
| Scandal-magnet councilman Bill | DEXHART | DEX · HART | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 12 x 3-letter, 2 x 4-letter):** CAL CE DES DEX EZ HAP HART LAM LEY MAL MER NEW PORT SHA UNA WAE ZO

**Score:** decoys 2.7/20 + tempting pairs 0.0/16 + shared fragments 2.5/10 + anchor balance 6.8/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -17.7 = **structure 17.4/80** (scaled 10.9/50); clue rating 22.5/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 22.5/50**

- Decoys (2): SHADES, CALMER
- Duplicate tiles: none; near-twin tiles: CAL/MAL, DES/DEX
- Giveaway tiles (share of the answer's family): WAE (1.0); whole-word tiles: HART, PORT
- Answers whose first tile has no rival continuation: MERCEDES, CALLAMEZZO, HAPLEY, NEWPORT, MALWAE, SHAUNA, DEXHART
- Word frequency (zipf): MERCEDES 3.98, CALLAMEZZO 0.0, HAPLEY 1.29, NEWPORT 3.78, MALWAE 0.0, SHAUNA 2.62, DEXHART 0.0

**Critique:** Fandom trivia round.

## Round 299 [themed]: Community: Pierce and Shirley  (total 32.9, candidate I10)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Moist source of Pierce's wealth | TOWELETTE | TOW · ELET · TE | trivia | 4 |
| Pierce's cult's level of enlightenment | LASERLOTUS | LAS · ERLO · TUS | trivia | 4 |
| Pierce's bigoted father | CORNELIUS | COR · NEL · IUS | trivia | 4 |
| Shirley's business, between bread | SANDWICHES | SAN · DWI · CHES | trivia | 4 |
| Shirley's husband | ANDRE | AN · DRE | trivia | 4 |
| Shirley's devout faith | CHRISTIAN | CHRI · STI · AN | trivia | 3 |
| Digital ___ Planning, an 8-bit will | ESTATE | EST · ATE | trivia | 4 |

**Tile pool (19: 3 x 2-letter, 12 x 3-letter, 4 x 4-letter):** AN AN ATE CHES CHRI COR DRE DWI ELET ERLO EST IUS LAS NEL SAN STI TE TOW TUS

**Score:** decoys 0.3/20 + tempting pairs 0.8/16 + shared fragments 3.8/10 + anchor balance 6.7/8 + shape 9.6/12 + word appeal 14.0/14 + penalties -15.2 = **structure 20.0/80** (scaled 12.5/50); clue rating 20.4/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 20.4/50**

- Decoys (1): ANTE
- Duplicate tiles: AN; near-twin tiles: IUS/TUS
- Giveaway tiles (share of the answer's family): CHRI (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: TOWELETTE, LASERLOTUS, CORNELIUS, SANDWICHES, CHRISTIAN, ESTATE
- Word frequency (zipf): TOWELETTE 1.32, LASERLOTUS 0.0, CORNELIUS 3.27, SANDWICHES 3.77, ANDRE 3.85, CHRISTIAN 4.88, ESTATE 4.82

**Critique:** Fandom trivia round.

## Round 300 [themed]: Avatar: The Last Airbender: Creatures  (total 32.8, candidate J10)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Hybrid night hunter | CATOWL | CAT · OWL | trivia | 3 |
| Earthbending's original teachers | BADGERMOLE | BAD · GER · MOLE | trivia | 4 |
| Squealing barnyard hybrid | HOGMONKEY | HOG · MON · KEY | trivia | 4 |
| Swamp hybrid with whiskers | CATGATOR | CAT · GAT · OR | trivia | 4 |
| June's tongue-sniffing tracker | SHIRSHU | SHIR · SHU | trivia | 4 |
| Appa, by species | SKYBISON | SKY · BI · SON | trivia | 3 |
| Kyoshi Island's sea monster | UNAGI | UNA · GI | trivia | 4 |

**Tile pool (18: 3 x 2-letter, 13 x 3-letter, 2 x 4-letter):** BAD BI CAT CAT GAT GER GI HOG KEY MOLE MON OR OWL SHIR SHU SKY SON UNA

**Score:** decoys 1.0/20 + tempting pairs 0.4/16 + shared fragments 5.0/10 + anchor balance 6.7/8 + shape 10.4/12 + word appeal 14.0/14 + penalties -14.1 = **structure 23.4/80** (scaled 14.6/50); clue rating 18.2/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 18.2/50**

- Decoys (3): MONKEY*, BADGER*, BISON*
- Duplicate tiles: CAT; near-twin tiles: CAT/GAT, MON/SON
- Giveaway tiles (share of the answer's family): BAD (0.56), SHU (0.524); whole-word tiles: none
- Answers whose first tile has no rival continuation: CATOWL, BADGERMOLE, HOGMONKEY, CATGATOR, SHIRSHU, SKYBISON, UNAGI
- Word frequency (zipf): CATOWL 0.0, BADGERMOLE 0.0, HOGMONKEY 0.0, CATGATOR 0.0, SHIRSHU 0.0, SKYBISON 0.0, UNAGI 1.81

**Critique:** Fandom trivia round.

## Round 301 [themed]: Community: Greendale Regulars  (total 32.6, candidate I07)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Classmate with a canoe dream | VICKI | VIC · KI | trivia | 4 |
| Nervous, Stop! Stop! student | GARRETT | GAR · RETT | trivia | 4 |
| British psych professor, Ian | DUNCAN | DUN · CAN | trivia | 4 |
| Michelle, Jeff's stats crush | SLATER | SLA · TER | trivia | 4 |
| Dungeon master in need of cheer | FATNEIL | FAT · NE · IL | trivia | 4 |
| Costume-loving administrator | DEANPELTON | DEAN · PEL · TON | trivia | 3 |
| Gruff criminology teacher | BUZZHICKEY | BUZZ · HIC · KEY | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 11 x 3-letter, 3 x 4-letter):** BUZZ CAN DEAN DUN FAT GAR HIC IL KEY KI NE PEL RETT SLA TER TON VIC

**Score:** decoys 5.7/20 + tempting pairs 0.4/16 + shared fragments 1.2/10 + anchor balance 6.9/8 + shape 7.9/12 + word appeal 14.0/14 + penalties -16.7 = **structure 19.5/80** (scaled 12.2/50); clue rating 20.4/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 20.4/50**

- Decoys (6): CANTON, PELVIC, TONNE, FATTER, GARTER, HICKEY*
- Duplicate tiles: none; near-twin tiles: HIC/VIC
- Giveaway tiles (share of the answer's family): DEAN (0.483), RETT (0.517); whole-word tiles: BUZZ, DEAN
- Answers whose first tile has no rival continuation: VICKI, DUNCAN, SLATER, FATNEIL, DEANPELTON, BUZZHICKEY
- Word frequency (zipf): VICKI 3.22, GARRETT 3.67, DUNCAN 4.02, SLATER 3.46, FATNEIL 0.0, DEANPELTON 0.0, BUZZHICKEY 0.0

**Critique:** Fandom trivia round.

## Round 302 [themed]: Community: Campus Wars  (total 31.6, candidate I04)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Campus-wrecking splatter war | PAINTBALL | PA · INT · BALL | trivia | 3 |
| Modern ___, an action homage | WARFARE | WAR · FARE | trivia | 4 |
| A ___ of Paintballs | FISTFUL | FIST · FUL | trivia | 4 |
| Genre of the paintball sequel | WESTERN | WES · TERN | trivia | 4 |
| ___ registration, the war's prize | PRIORITY | PRI · OR · ITY | trivia | 4 |
| Paintball killer on campus | ASSASSIN | ASS · ASS · IN | trivia | 3 |
| Troy's soft fortress | PILLOWTOWN | PIL · LOW · TOWN | trivia | 4 |

**Tile pool (18: 3 x 2-letter, 10 x 3-letter, 5 x 4-letter):** ASS ASS BALL FARE FIST FUL IN INT ITY LOW OR PA PIL PRI TERN TOWN WAR WES

**Score:** decoys 6.0/20 + tempting pairs 1.6/16 + shared fragments 2.5/10 + anchor balance 7.0/8 + shape 7.1/12 + word appeal 14.0/14 + penalties -16.7 = **structure 21.5/80** (scaled 13.4/50); clue rating 18.2/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 18.2/50**

- Decoys (7): PAIN, PAINFUL, INTERN, PATERNITY, PRIOR*, PAINT*, PILLOW*
- Duplicate tiles: ASS; near-twin tiles: none
- Giveaway tiles (share of the answer's family): WES (0.544); whole-word tiles: BALL, TOWN
- Answers whose first tile has no rival continuation: WARFARE, FISTFUL, WESTERN, PRIORITY, ASSASSIN, PILLOWTOWN
- Word frequency (zipf): PAINTBALL 3.03, WARFARE 4.05, FISTFUL 2.58, WESTERN 5.01, PRIORITY 4.41, ASSASSIN 3.66, PILLOWTOWN 0.0

**Critique:** Fandom trivia round.

## Round 303 [themed]: Avatar: The Last Airbender: Earth Kingdom  (total 31.1, candidate J03)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| There is no war in it | BASINGSE | BAS · ING · SE | trivia | 4 |
| City of Bumi's mail chutes | OMASHU | OMA · SHU | trivia | 4 |
| Dai Li's sinister leader | LONGFENG | LONG · FENG | trivia | 4 |
| My ___! the merchant wails | CABBAGES | CAB · BAG · ES | trivia | 4 |
| Toph's hometown | GAOLING | GAO · LING | trivia | 4 |
| Ba Sing Se transit | MONORAIL | MON · ORA · IL | trivia | 4 |
| Lake hiding a brainwashing lab | LAOGAI | LAO · GAI | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 11 x 3-letter, 3 x 4-letter):** BAG BAS CAB ES FENG GAI GAO IL ING LAO LING LONG MON OMA ORA SE SHU

**Score:** decoys 4.8/20 + tempting pairs 0.8/16 + shared fragments 6.2/10 + anchor balance 0.0/8 + shape 6.9/12 + word appeal 14.0/14 + penalties -19.1 = **structure 13.7/80** (scaled 8.6/50); clue rating 22.5/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 22.5/50**

- Decoys (5): SEES, BASES, BASIL, LONGING, BASING*
- Duplicate tiles: none; near-twin tiles: BAG/BAS, GAI/GAO, GAO/LAO, LING/LONG, OMA/ORA
- Giveaway tiles (share of the answer's family): FENG (1.0), GAI (0.507), GAO (1.0), LAO (1.0), OMA (0.504), SHU (0.524); whole-word tiles: LONG
- Answers whose first tile has no rival continuation: BASINGSE, OMASHU, LONGFENG, CABBAGES, GAOLING, MONORAIL, LAOGAI
- Word frequency (zipf): BASINGSE 0.0, OMASHU 0.0, LONGFENG 0.0, CABBAGES 2.61, GAOLING 0.0, MONORAIL 2.69, LAOGAI 1.46

**Critique:** Fandom trivia round.

## Round 304 [themed]: Parks and Recreation: Episodes  (total 31.0, candidate H10)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Leslie's overnight charity marathon | TELETHON | TELE · THON | trivia | 3 |
| Zoo couple whose wedding caused uproar | PENGUINS | PEN · GU · INS | trivia | 4 |
| February 13's ladies' day | GALENTINE | GAL · ENT · INE | trivia | 3 |
| Andy falls in a pit episode | KABOOM | KAB · OOM | trivia | 4 |
| Pastry-themed primary episode | PIEMARY | PIE · MARY | trivia | 4 |
| One Last Ride, the end | FINALE | FIN · ALE | trivia | 3 |
| Leslie pitches while very sick | FLUSEASON | FLU · SEA · SON | trivia | 4 |

**Tile pool (17: 1 x 2-letter, 13 x 3-letter, 3 x 4-letter):** ALE ENT FIN FLU GAL GU INE INS KAB MARY OOM PEN PIE SEA SON TELE THON

**Score:** decoys 2.2/20 + tempting pairs 0.0/16 + shared fragments 1.2/10 + anchor balance 7.3/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -10.9 = **structure 23.8/80** (scaled 14.9/50); clue rating 16.1/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 16.1/50**

- Decoys (2): FLUENT, SEASON*
- Duplicate tiles: none; near-twin tiles: INE/INS
- Giveaway tiles (share of the answer's family): KAB (0.534); whole-word tiles: none
- Answers whose first tile has no rival continuation: TELETHON, PENGUINS, GALENTINE, KABOOM, PIEMARY, FINALE, FLUSEASON
- Word frequency (zipf): TELETHON 2.45, PENGUINS 3.67, GALENTINE 0.0, KABOOM 2.56, PIEMARY 0.0, FINALE 4.04, FLUSEASON 0.0

**Critique:** Fandom trivia round.

## Round 305 [themed]: Parks and Recreation: Andy and April  (total 30.8, candidate H06)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Andy's band, one of many names | MOUSERAT | MOU · SER · AT | trivia | 4 |
| Burt ___, FBI | MACKLIN | MACK · LIN | trivia | 4 |
| Johnny's kids'-show skill | KARATE | KAR · ATE | trivia | 3 |
| April's fake boyfriends' homeland | VENEZUELA | VENE · ZU · ELA | trivia | 4 |
| Li'l miniature horse legend | SEBASTIAN | SEB · AST · IAN | trivia | 4 |
| 5,000 in the Wind | CANDLES | CAND · LES | trivia | 4 |
| Karate kid of Andy's TV show | JOHNNY | JOH · NNY | trivia | 3 |

**Tile pool (17: 2 x 2-letter, 12 x 3-letter, 3 x 4-letter):** AST AT ATE CAND ELA IAN JOH KAR LES LIN MACK MOU NNY SEB SER VENE ZU

**Score:** decoys 1.7/20 + tempting pairs 0.0/16 + shared fragments 1.2/10 + anchor balance 6.5/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -12.4 = **structure 20.2/80** (scaled 12.6/50); clue rating 18.2/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 18.2/50**

- Decoys (1): LESSER
- Duplicate tiles: none; near-twin tiles: SEB/SER
- Giveaway tiles (share of the answer's family): ELA (0.503), SEB (0.552); whole-word tiles: none
- Answers whose first tile has no rival continuation: MOUSERAT, MACKLIN, KARATE, VENEZUELA, SEBASTIAN, CANDLES, JOHNNY
- Word frequency (zipf): MOUSERAT 0.0, MACKLIN 2.53, KARATE 3.55, VENEZUELA 3.93, SEBASTIAN 3.9, CANDLES 3.82, JOHNNY 4.35

**Critique:** Fandom trivia round.

## Round 306 [themed]: Avatar: The Last Airbender: Uncle Iroh  (total 30.1, candidate J07)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Iroh's role to Zuko | MENTOR | MEN · TOR | definition | 2 |
| Iroh's status after Ba Sing Se | PRISONER | PRI · SO · NER | trivia | 3 |
| ___ from the Vine, Iroh's lament | LEAVES | LEA · VES | trivia | 4 |
| Iroh's rank in a secret order | GRANDLOTUS | GRA · NDLO · TUS | trivia | 4 |
| Iroh's trick for lightning | REDIRECT | RE · DIR · ECT | trivia | 3 |
| Dragon of the West's old rank | GENERAL | GEN · ERAL | trivia | 3 |
| Tile game Iroh loves | PAISHO | PAI · SHO | trivia | 3 |

**Tile pool (17: 2 x 2-letter, 13 x 3-letter, 2 x 4-letter):** DIR ECT ERAL GEN GRA LEA MEN NDLO NER PAI PRI RE SHO SO TOR TUS VES

**Score:** decoys 7.4/20 + tempting pairs 1.6/16 + shared fragments 2.5/10 + anchor balance 6.9/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -12.8 = **structure 29.6/80** (scaled 18.5/50); clue rating 9.6/30 + variety 4.0/8 + puns 0.0/12 + penalties -2.0 = **clues 11.6/50**

- Decoys (7): SHORE, GENRE, NERVES, SORE, GRAVES, TORSO, DIRECT*
- Duplicate tiles: none; near-twin tiles: GEN/MEN, PAI/PRI
- Giveaway tiles (share of the answer's family): SHO (0.502); whole-word tiles: none
- Answers whose first tile has no rival continuation: MENTOR, PRISONER, LEAVES, GRANDLOTUS, GENERAL, PAISHO
- Word frequency (zipf): MENTOR 3.93, PRISONER 4.2, LEAVES 4.79, GRANDLOTUS 0.0, REDIRECT 3.21, GENERAL 5.47, PAISHO 0.0

**Critique:** Fandom trivia round.

## Round 307 [themed]: Community: Episode Hooks  (total 29.6, candidate I08)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| ___ fingers, the fryer cartel | CHICKEN | CHIC · KEN | trivia | 4 |
| Abed's riff on My ___ with Andre | DINNER | DIN · NER | trivia | 4 |
| ___ Certification, a bar crawl | MIXOLOGY | MIX · OLO · GY | trivia | 4 |
| D&D's first D | DUNGEONS | DUN · GE · ONS | trivia | 3 |
| D&D's second D | DRAGONS | DRAG · ONS | trivia | 3 |
| Zombie outbreak at the party | HALLOWEEN | HAL · LOW · EEN | trivia | 3 |
| Shoebox scene for class | DIORAMA | DIO · RAMA | definition | 2 |

**Tile pool (17: 2 x 2-letter, 12 x 3-letter, 3 x 4-letter):** CHIC DIN DIO DRAG DUN EEN GE GY HAL KEN LOW MIX NER OLO ONS ONS RAMA

**Score:** decoys 1.7/20 + tempting pairs 0.4/16 + shared fragments 6.2/10 + anchor balance 6.4/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -12.7 = **structure 25.2/80** (scaled 15.8/50); clue rating 11.8/30 + variety 4.0/8 + puns 0.0/12 + penalties -2.0 = **clues 13.8/50**

- Decoys (1): GEOLOGY
- Duplicate tiles: ONS; near-twin tiles: DIN/DIO, DIN/DUN, EEN/KEN
- Giveaway tiles (share of the answer's family): CHIC (0.899), DRAG (0.578); whole-word tiles: DRAG
- Answers whose first tile has no rival continuation: CHICKEN, DINNER, MIXOLOGY, DUNGEONS, DRAGONS, HALLOWEEN, DIORAMA
- Word frequency (zipf): CHICKEN 4.63, DINNER 4.78, MIXOLOGY 2.06, DUNGEONS 3.31, DRAGONS 4.1, HALLOWEEN 4.16, DIORAMA 2.49

**Critique:** Fandom trivia round.

## Round 308 [themed]: Avatar: The Last Airbender: Allies and Rivals  (total 28.6, candidate J09)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Jet's ___ Fighters | FREEDOM | FREE · DOM | trivia | 4 |
| Rough ___, Fire Nation cavalry | RHINOS | RHI · NOS | trivia | 4 |
| Inventor of the Northern Air Temple | MECHANIST | ME · CHA · NIST | trivia | 4 |
| Jet's loyal lieutenant | SMELLERBEE | SMEL · LER · BEE | trivia | 4 |
| Katara and Sokka's father | HAKODA | HAK · ODA | trivia | 4 |
| Northern waterbending master | PAKKU | PAK · KU | trivia | 4 |
| Hama, the inn's dark guest | PUPPETEER | PUP · PET · EER | trivia | 3 |

**Tile pool (17: 2 x 2-letter, 12 x 3-letter, 3 x 4-letter):** BEE CHA DOM EER FREE HAK KU LER ME NIST NOS ODA PAK PET PUP RHI SMEL

**Score:** decoys 0.5/20 + tempting pairs 0.0/16 + shared fragments 2.5/10 + anchor balance 0.0/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -13.0 = **structure 13.1/80** (scaled 8.2/50); clue rating 20.4/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 20.4/50**

- Decoys (1): PUPPET*
- Duplicate tiles: none; near-twin tiles: EER/LER, HAK/PAK
- Giveaway tiles (share of the answer's family): HAK (0.524), ODA (0.515), PAK (1.0), RHI (1.0), SMEL (0.938); whole-word tiles: FREE
- Answers whose first tile has no rival continuation: FREEDOM, RHINOS, MECHANIST, SMELLERBEE, HAKODA, PAKKU, PUPPETEER
- Word frequency (zipf): FREEDOM 4.86, RHINOS 3.18, MECHANIST 1.61, SMELLERBEE 0.0, HAKODA 0.0, PAKKU 0.0, PUPPETEER 2.59

**Critique:** Fandom trivia round.

## Round 309 [themed]: Avatar: The Last Airbender: Ozai's Empire  (total 28.3, candidate J02)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Ozai's crown title | FIRELORD | FIRE · LORD | trivia | 3 |
| ___ Man, with a third eye | COMBUSTION | COMB · UST · ION | trivia | 4 |
| Island resort for the royals | EMBER | EMB · ER | trivia | 4 |
| Iroh's lost son | LUTEN | LUT · EN | trivia | 4 |
| Ancient firebenders, thought extinct | SUNWARRIOR | SUN · WARR · IOR | trivia | 4 |
| Attacked, and everything changed | FIRENATION | FIRE · NAT · ION | trivia | 3 |
| Sozin's power-up from space | COMET | CO · MET | trivia | 3 |

**Tile pool (17: 3 x 2-letter, 9 x 3-letter, 5 x 4-letter):** CO COMB EMB EN ER FIRE FIRE ION ION IOR LORD LUT MET NAT SUN UST WARR

**Score:** decoys 3.8/20 + tempting pairs 2.4/16 + shared fragments 6.2/10 + anchor balance 7.4/8 + shape 4.6/12 + word appeal 14.0/14 + penalties -18.9 = **structure 19.5/80** (scaled 12.2/50); clue rating 16.1/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 16.1/50**

- Decoys (4): WARREN, METER, NATION*, WARRIOR*
- Duplicate tiles: FIRE, ION; near-twin tiles: ION/IOR
- Giveaway tiles (share of the answer's family): LUT (0.505); whole-word tiles: FIRE, LORD
- Answers whose first tile has no rival continuation: FIRELORD, COMBUSTION, EMBER, LUTEN, SUNWARRIOR, FIRENATION, COMET
- Word frequency (zipf): FIRELORD 1.71, COMBUSTION 3.57, EMBER 2.97, LUTEN 1.05, SUNWARRIOR 0.0, FIRENATION 0.0, COMET 3.64

**Critique:** Fandom trivia round.

## Round 310 [themed]: Avatar: The Last Airbender: Team Avatar  (total 26.1, candidate J01)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Aang's people | AIRNOMAD | AIR · NOM · AD | trivia | 3 |
| Monk's mountaintop home, four in all | AIRTEMPLE | AIR · TEM · PLE | trivia | 3 |
| Momo, by species | LEMUR | LEM · UR | trivia | 3 |
| Aang's staff, unfolded | GLIDER | GLI · DER | trivia | 4 |
| Aang's iceberg nap, roughly | CENTURY | CENT · URY | trivia | 4 |
| Katara and Sokka's people | WATERTRIBE | WAT · ERT · RIBE | trivia | 3 |
| Waterbender from the Southern Tribe | KATARA | KAT · ARA | trivia | 3 |

**Tile pool (17: 2 x 2-letter, 13 x 3-letter, 2 x 4-letter):** AD AIR AIR ARA CENT DER ERT GLI KAT LEM NOM PLE RIBE TEM UR URY WAT

**Score:** decoys 1.9/20 + tempting pairs 0.4/16 + shared fragments 5.0/10 + anchor balance 6.8/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -15.2 = **structure 22.9/80** (scaled 14.3/50); clue rating 11.8/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 11.8/50**

- Decoys (3): PLEAD, TEMPLE*, NOMAD*
- Duplicate tiles: AIR; near-twin tiles: KAT/WAT, LEM/TEM
- Giveaway tiles (share of the answer's family): KAT (0.537), WAT (0.474); whole-word tiles: CENT
- Answers whose first tile has no rival continuation: AIRNOMAD, AIRTEMPLE, LEMUR, GLIDER, WATERTRIBE, KATARA
- Word frequency (zipf): AIRNOMAD 0.0, AIRTEMPLE 0.0, LEMUR 2.57, GLIDER 3.09, CENTURY 5.02, WATERTRIBE 0.0, KATARA 2.47

**Critique:** Fandom trivia round.

## Round 311 [themed]: Community: Go Human Beings  (total 26.0, candidate I03)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Community college, go Human Beings | GREENDALE | GRE · END · ALE | trivia | 3 |
| 101 class that starts it all | SPANISH | SPA · NISH | trivia | 3 |
| Chang's preferred title | SENOR | SEN · OR | trivia | 4 |
| Grounds where it all happens | CAMPUS | CAM · PUS | definition | 2 |
| Kevin's convenient amnesia, supposedly | CHANGNESIA | CHAN · GNE · SIA | trivia | 4 |
| Group's table-for-seven hangout | STUDYROOM | STU · DY · ROOM | trivia | 3 |
| Human Being, for Greendale | MASCOT | MAS · COT | trivia | 4 |

**Tile pool (17: 2 x 2-letter, 12 x 3-letter, 3 x 4-letter):** ALE CAM CHAN COT DY END GNE GRE MAS NISH OR PUS ROOM SEN SIA SPA STU

**Score:** decoys 0.3/20 + tempting pairs 0.0/16 + shared fragments 2.5/10 + anchor balance 6.9/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -13.3 = **structure 19.6/80** (scaled 12.2/50); clue rating 11.8/30 + variety 4.0/8 + puns 0.0/12 + penalties -2.0 = **clues 13.8/50**

- Decoys (1): STUDY*
- Duplicate tiles: none; near-twin tiles: GNE/GRE, SIA/SPA
- Giveaway tiles (share of the answer's family): CHAN (0.405); whole-word tiles: ROOM
- Answers whose first tile has no rival continuation: GREENDALE, SPANISH, SENOR, CAMPUS, CHANGNESIA, STUDYROOM, MASCOT
- Word frequency (zipf): GREENDALE 2.35, SPANISH 4.73, SENOR 2.61, CAMPUS 4.51, CHANGNESIA 0.0, STUDYROOM 0.0, MASCOT 3.62

**Critique:** Fandom trivia round.

## Round 312 [themed]: Community: Cast and Crew  (total 25.8, candidate I02)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Ms Jacobs, Britta's player | GILLIAN | GILL · IAN | trivia | 4 |
| Britta's actress, by surname | JACOBS | JAC · OBS | trivia | 4 |
| He played Abed | DANNYPUDI | DAN · NY · PUDI | trivia | 3 |
| Donald, Troy, Childish Gambino | GLOVER | GLO · VER | trivia | 3 |
| SNL alum as Pierce | CHEVYCHASE | CHE · VY · CHA · SE | trivia | 3 |
| Dan, show's creator | HARMON | HAR · MON | trivia | 3 |
| Oscar winner who played the Dean | JIMRASH | JIM · RASH | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 11 x 3-letter, 3 x 4-letter):** CHA CHE DAN GILL GLO HAR IAN JAC JIM MON NY OBS PUDI RASH SE VER VY

**Score:** decoys 3.4/20 + tempting pairs 0.8/16 + shared fragments 1.2/10 + anchor balance 6.6/8 + shape 7.9/12 + word appeal 14.0/14 + penalties -15.0 = **structure 19.0/80** (scaled 11.9/50); clue rating 13.9/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 13.9/50**

- Decoys (4): VERSE, SEDAN, SEVER, CHASE*
- Duplicate tiles: none; near-twin tiles: DAN/IAN
- Giveaway tiles (share of the answer's family): GILL (0.483), PUDI (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: GILLIAN, JACOBS, DANNYPUDI, GLOVER, CHEVYCHASE, HARMON, JIMRASH
- Word frequency (zipf): GILLIAN 3.31, JACOBS 3.74, DANNYPUDI 0.0, GLOVER 3.33, CHEVYCHASE 0.0, HARMON 3.21, JIMRASH 0.0

**Critique:** Fandom trivia round.

## Round 313 [themed]: Parks and Recreation: Town Tour  (total 25.7, candidate H03)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Snooty rich neighbor town | EAGLETON | EA · GLE · TON | trivia | 3 |
| Candy giant with corn-syrup pride | SWEETUMS | SWE · ET · UMS | trivia | 4 |
| Town first in obesity, fourth in... | PAWNEE | PAW · NEE | trivia | 4 |
| Hoosier home of the show | INDIANA | INDI · ANA | trivia | 3 |
| City hall's masked pest problem | RACCOONS | RAC · CO · ONS | trivia | 4 |
| ___ Festival, Leslie's big gamble | HARVEST | HAR · VEST | trivia | 3 |
| Float-filled march down Main Street | PARADE | PAR · ADE | definition | 2 |

**Tile pool (17: 3 x 2-letter, 12 x 3-letter, 2 x 4-letter):** ADE ANA CO EA ET GLE HAR INDI NEE ONS PAR PAW RAC SWE TON UMS VEST

**Score:** decoys 1.9/20 + tempting pairs 0.0/16 + shared fragments 2.5/10 + anchor balance 7.2/8 + shape 8.1/12 + word appeal 14.0/14 + penalties -14.7 = **structure 19.0/80** (scaled 11.9/50); clue rating 11.8/30 + variety 4.0/8 + puns 0.0/12 + penalties -2.0 = **clues 13.8/50**

- Decoys (3): ONSET, SWEET*, EAGLE*
- Duplicate tiles: none; near-twin tiles: HAR/PAR, PAR/PAW
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: EAGLETON, SWEETUMS, PAWNEE, INDIANA, RACCOONS, HARVEST, PARADE
- Word frequency (zipf): EAGLETON 2.38, SWEETUMS 1.68, PAWNEE 2.81, INDIANA 4.31, RACCOONS 2.92, HARVEST 4.03, PARADE 4.16

**Critique:** Fandom trivia round.

## Round 314 [themed]: Parks and Recreation: Ron Swanson  (total 25.5, candidate H04)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Lagavulin, for Ron | WHISKEY | WHIS · KEY | trivia | 3 |
| Ron's upper-lip trademark | MUSTACHE | MU · STA · CHE | trivia | 3 |
| Ron's ___ of Greatness | PYRAMID | PYRA · MID | trivia | 4 |
| What Ron works in and despises | GOVERNMENT | GOV · ERN · MENT | trivia | 4 |
| Ron's woodsy weekend pursuit | HUNTING | HUN · TING | trivia | 3 |
| Pyramid top, per Ron | GREATNESS | GRE · AT · NESS | trivia | 4 |
| Name shared by two of Ron's exes | TAMMY | TAM · MY | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 9 x 3-letter, 5 x 4-letter):** AT CHE ERN GOV GRE HUN KEY MENT MID MU MY NESS PYRA STA TAM TING WHIS

**Score:** decoys 3.7/20 + tempting pairs 0.8/16 + shared fragments 0.0/10 + anchor balance 5.9/8 + shape 5.6/12 + word appeal 14.0/14 + penalties -15.0 = **structure 15.0/80** (scaled 9.4/50); clue rating 16.1/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 16.1/50**

- Decoys (4): STATING, CHEAT, GREAT*, GOVERN*
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): GOV (0.975), PYRA (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: WHISKEY, MUSTACHE, PYRAMID, GOVERNMENT, HUNTING, GREATNESS, TAMMY
- Word frequency (zipf): WHISKEY 3.78, MUSTACHE 3.41, PYRAMID 3.75, GOVERNMENT 5.57, HUNTING 4.42, GREATNESS 3.71, TAMMY 3.35

**Critique:** Fandom trivia round.

## Round 315 [themed]: Parks and Recreation: Leslie Knope  (total 24.2, candidate H05)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| JJ's specialty, Leslie's love | WAFFLES | WAF · FLES | trivia | 3 |
| Leslie's organizing obsession | BINDERS | BIN · DERS | trivia | 3 |
| Season 4's run for office | CAMPAIGN | CAM · PA · IGN | trivia | 3 |
| City body Leslie joins | COUNCIL | COUN · CIL | trivia | 3 |
| Vote that ousted Leslie | RECALL | REC · ALL | trivia | 4 |
| Leslie's future Indiana job | GOVERNOR | GO · VER · NOR | trivia | 4 |
| Leslie's bottomless resource | OPTIMISM | OP · TIM · ISM | evocative | 3 |

**Tile pool (17: 3 x 2-letter, 11 x 3-letter, 3 x 4-letter):** ALL BIN CAM CIL COUN DERS FLES GO IGN ISM NOR OP PA REC TIM VER WAF

**Score:** decoys 1.2/20 + tempting pairs 0.0/16 + shared fragments 0.0/10 + anchor balance 6.4/8 + shape 6.9/12 + word appeal 14.0/14 + penalties -15.0 = **structure 13.5/80** (scaled 8.4/50); clue rating 11.8/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 15.8/50**

- Decoys (1): BINGO
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): CIL (0.556), WAF (0.7); whole-word tiles: none
- Answers whose first tile has no rival continuation: WAFFLES, BINDERS, CAMPAIGN, COUNCIL, RECALL, GOVERNOR, OPTIMISM
- Word frequency (zipf): WAFFLES 3.23, BINDERS 2.84, CAMPAIGN 5.0, COUNCIL 5.08, RECALL 4.4, GOVERNOR 4.71, OPTIMISM 3.66

**Critique:** Fandom trivia round.

## Round 316 [themed]: Parks and Recreation: The Department  (total 23.9, candidate H01)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Donna, who says treat yo self | MEAGLE | MEA · GLE | trivia | 3 |
| Tom, a self-styled entrepreneur | HAVERFORD | HAV · ERF · ORD | trivia | 3 |
| Nurse and beautiful tropical fish | ANNPERKINS | ANN · PERK · INS | trivia | 4 |
| Deputy director with a binder habit | LESLIE | LES · LIE | trivia | 3 |
| Chris, the literally positive one | TRAEGER | TRA · EGER | trivia | 3 |
| Budget nerd who loves calzones | BENWYATT | BEN · WY · ATT | trivia | 3 |
| Jerry, the office punching bag | GERGICH | GER · GICH | trivia | 3 |

**Tile pool (17: 1 x 2-letter, 13 x 3-letter, 3 x 4-letter):** ANN ATT BEN EGER ERF GER GICH GLE HAV INS LES LIE MEA ORD PERK TRA WY

**Score:** decoys 2.7/20 + tempting pairs 0.0/16 + shared fragments 0.0/10 + anchor balance 6.5/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -10.3 = **structure 22.9/80** (scaled 14.3/50); clue rating 9.6/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 9.6/50**

- Decoys (2): TRAINS, MEAGER
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): ATT (0.501), GICH (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: MEAGLE, HAVERFORD, ANNPERKINS, LESLIE, TRAEGER, BENWYATT, GERGICH
- Word frequency (zipf): MEAGLE 0.0, HAVERFORD 2.48, ANNPERKINS 0.0, LESLIE 3.9, TRAEGER 2.11, BENWYATT 0.0, GERGICH 1.16

**Critique:** Fandom trivia round.

## Round 317 [themed]: Avatar: The Last Airbender: Spirit World  (total 23.7, candidate J05)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Panda-like forest spirit | HEIBAI | HEI · BAI | trivia | 4 |
| Tui, Yue's eventual role | MOONSPIRIT | MOON · SPI · RIT | trivia | 3 |
| Guru who opens Aang's chakras | PATHIK | PAT · HIK | trivia | 4 |
| Energy knots Aang must unblock | CHAKRAS | CHAK · RAS | trivia | 3 |
| Aang's predecessor, a firebender | AVATARROKU | AVA · TAR · RO · KU | trivia | 3 |
| Avatar whose love's face was stolen | KURUK | KU · RUK | trivia | 4 |
| Swamp tree with roots everywhere | BANYAN | BAN · YAN | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 12 x 3-letter, 2 x 4-letter):** AVA BAI BAN CHAK HEI HIK KU KU MOON PAT RAS RIT RO RUK SPI TAR YAN

**Score:** decoys 1.0/20 + tempting pairs 0.4/16 + shared fragments 3.8/10 + anchor balance 0.0/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -16.1 = **structure 12.2/80** (scaled 7.6/50); clue rating 16.1/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 16.1/50**

- Decoys (2): SPIRIT*, AVATAR*
- Duplicate tiles: KU; near-twin tiles: BAI/BAN
- Giveaway tiles (share of the answer's family): BAI (0.575), CHAK (1.0), HIK (0.569), MOON (0.542), RUK (1.0), YAN (0.557); whole-word tiles: MOON
- Answers whose first tile has no rival continuation: HEIBAI, MOONSPIRIT, CHAKRAS, AVATARROKU, KURUK, BANYAN
- Word frequency (zipf): HEIBAI 0.0, MOONSPIRIT 0.0, PATHIK 1.02, CHAKRAS 2.64, AVATARROKU 0.0, KURUK 0.0, BANYAN 2.57

**Critique:** Fandom trivia round.

## Round 318 [themed]: Community: The Seven  (total 22.8, candidate I01)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Britta's surname | PERRY | PER · RY | trivia | 3 |
| Jeff, ex-lawyer | WINGER | WIN · GER | trivia | 3 |
| Mom of the study group | SHIRLEY | SHIR · LEY | trivia | 3 |
| Spanish 101's accidental family | STUDYGROUP | STU · DY · GRO · UP | trivia | 3 |
| Jeff's fake-degree profession | LAWYER | LAW · YER | trivia | 3 |
| Former quarterback, Abed's best pal | TROYBARNES | TROY · BAR · NES | trivia | 3 |
| Shirley's last name | BENNETT | BEN · NETT | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 11 x 3-letter, 3 x 4-letter):** BAR BEN DY GER GRO LAW LEY NES NETT PER RY SHIR STU TROY UP WIN YER

**Score:** decoys 4.0/20 + tempting pairs 0.0/16 + shared fragments 3.8/10 + anchor balance 6.8/8 + shape 7.9/12 + word appeal 14.0/14 + penalties -15.3 = **structure 21.2/80** (scaled 13.2/50); clue rating 9.6/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 9.6/50**

- Decoys (5): UPPER, WINDY, BARLEY, GROUP*, STUDY*
- Duplicate tiles: none; near-twin tiles: GER/PER, GER/YER, PER/YER
- Giveaway tiles (share of the answer's family): NETT (0.6), TROY (0.523); whole-word tiles: none
- Answers whose first tile has no rival continuation: PERRY, WINGER, SHIRLEY, STUDYGROUP, LAWYER, TROYBARNES, BENNETT
- Word frequency (zipf): PERRY 4.22, WINGER 3.57, SHIRLEY 3.73, STUDYGROUP 0.0, LAWYER 4.67, TROYBARNES 0.0, BENNETT 4.03

**Critique:** Fandom trivia round.

## Round 319 [themed]: Avatar: The Last Airbender: Bending Arts  (total 20.5, candidate J04)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Aang's native art | AIRBENDING | AIR · BEN · DING | definition | 2 |
| Ty Lee's pressure-point specialty | CHIBLOCKER | CHI · BLOC · KER | trivia | 4 |
| Zuko, by element | FIREBENDER | FIRE · BEN · DER | definition | 2 |
| Waterbenders' power booster | MOONLIGHT | MO · ONL · IGHT | trivia | 3 |
| Martial art behind waterbending | TAICHI | TAI · CHI | trivia | 4 |
| Hama's dark, full-moon art | BLOODBEND | BLO · OD · BEND | trivia | 3 |
| Toph's invention in a cage | METALBEND | MET · AL · BEND | trivia | 3 |

**Tile pool (20: 3 x 2-letter, 11 x 3-letter, 6 x 4-letter):** AIR AL BEN BEN BEND BEND BLO BLOC CHI CHI DER DING FIRE IGHT KER MET MO OD ONL TAI

**Score:** decoys 3.7/20 + tempting pairs 0.4/16 + shared fragments 6.2/10 + anchor balance 7.0/8 + shape 7.0/12 + word appeal 14.0/14 + penalties -17.6 = **structure 20.8/80** (scaled 13.0/50); clue rating 7.5/30 + variety 4.0/8 + puns 0.0/12 + penalties -4.0 = **clues 7.5/50**

- Decoys (7): MOOD, ALIGHT, ALDER, BLOOD*, METAL*, BENDING*, BENDER*
- Duplicate tiles: BEN, BEND, CHI; near-twin tiles: DER/KER
- Giveaway tiles (share of the answer's family): BEND (0.58), CHI (0.501); whole-word tiles: BEND, FIRE
- Answers whose first tile has no rival continuation: AIRBENDING, CHIBLOCKER, FIREBENDER, TAICHI, BLOODBEND, METALBEND
- Word frequency (zipf): AIRBENDING 1.81, CHIBLOCKER 0.0, FIREBENDER 1.45, MOONLIGHT 3.61, TAICHI 2.28, BLOODBEND 0.0, METALBEND 0.0

**Critique:** Fandom trivia round.

## Round 320 [themed]: Avatar: The Last Airbender: Sokka's Greatest Hits  (total 19.5, candidate J06)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Sokka's returning weapon | BOOMERANG | BOO · MER · ANG | trivia | 2 |
| Meteorite blade Sokka forged | SPACESWORD | SPA · CES · WORD | trivia | 3 |
| Sokka's poetry-battle form | HAIKU | HAI · KU | trivia | 4 |
| Swordmaster who trained Sokka | PIANDAO | PI · AND · AO | trivia | 4 |
| Cactus juice superlative | QUENCHIEST | QUEN · CHI · EST | trivia | 5 |
| War transport Sokka helped invent | BALLOON | BALL · OON | trivia | 4 |
| Sokka's Black Sun plan | INVASION | INVA · SION | trivia | 3 |

**Tile pool (18: 3 x 2-letter, 10 x 3-letter, 5 x 4-letter):** AND ANG AO BALL BOO CES CHI EST HAI INVA KU MER OON PI QUEN SION SPA WORD

**Score:** decoys 0.5/20 + tempting pairs 0.4/16 + shared fragments 1.2/10 + anchor balance 4.5/8 + shape 7.1/12 + word appeal 14.0/14 + penalties -19.2 = **structure 8.6/80** (scaled 5.4/50); clue rating 16.1/30 + variety 0.0/8 + puns 0.0/12 + penalties -2.0 = **clues 14.1/50**

- Decoys (1): SPACES*
- Duplicate tiles: none; near-twin tiles: AND/ANG
- Giveaway tiles (share of the answer's family): AO (0.528), KU (0.523), QUEN (0.508); whole-word tiles: BALL, WORD
- Answers whose first tile has no rival continuation: BOOMERANG, SPACESWORD, HAIKU, PIANDAO, QUENCHIEST, BALLOON, INVASION
- Word frequency (zipf): BOOMERANG 3.06, SPACESWORD 0.0, HAIKU 3.08, PIANDAO 0.0, QUENCHIEST 0.0, BALLOON 3.9, INVASION 4.23

**Critique:** Fandom trivia round.
