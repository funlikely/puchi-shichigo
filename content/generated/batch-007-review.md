# batch-007: review sheet

68 rounds kept out of 68 clued candidates (68 word-disjoint candidates came out of
the generator). Rounds are ordered best-first by total score, so Round 1 is what the scoring
formula likes most and the last round least. Play them, then tell me where the formula is wrong.
One round was removed by editor veto rather than by score (see "Cut candidates").

**Total = structure (0-80, deterministic) + clues (0-20, judge ratings).** Batch range:
11.9 to 52.5, mean 33.7.

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
## Round 173 [mixed]: Long Haul  (total 52.5, candidate G01)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Big show, or one lens of glasses | SPECTACLE | SPEC · TA · CLE | wordplay | 4 |
| Spin with a state budget | PROPAGANDA | PRO · PAG · ANDA | pun | 4 |
| Bobby on the beat | CONSTABLE | CON · STA · BLE | definition | 3 |
| Bench warmer of the courts | MAGISTRATE | MAG · IST · RATE | pun | 4 |
| Big guns, collectively | ARTILLERY | ART · ILL · ERY | definition | 3 |
| Lens for very small dramas | MICROSCOPE | MI · CRO · SCO · PE | pun | 3 |
| Laughing beyond control | HYSTERICAL | HYS · TER · ICAL | definition | 3 |

**Tile pool (22: 3 x 2-letter, 15 x 3-letter, 4 x 4-letter):** ANDA ART BLE CLE CON CRO ERY HYS ICAL ILL IST MAG MI PAG PE PRO RATE SCO SPEC STA TA TER

**Score:** decoys 9.5/20 + tempting pairs 3.2/16 + shared fragments 3.8/10 + anchor balance 7.2/8 + shape 6.6/12 + word appeal 8.9/14 + penalties -9.5 = **structure 29.7/80** (scaled 18.6/50); clue rating 13.9/30 + variety 8.0/8 + puns 12.0/12 + penalties 0.0 = **clues 33.9/50**

- Decoys (10): TABLE, PETER, ARTIST, TAPE, MAGICAL, CONICAL, SPECTER, STABLE*, SCOPE*, ARTERY*
- Duplicate tiles: none; near-twin tiles: BLE/CLE, CRO/PRO, MAG/PAG
- Giveaway tiles (share of the answer's family): HYS (0.548); whole-word tiles: RATE
- Answers whose first tile has no rival continuation: SPECTACLE, HYSTERICAL
- Word frequency (zipf): SPECTACLE 3.61, PROPAGANDA 4.17, CONSTABLE 3.79, MAGISTRATE 3.71, ARTILLERY 3.96, MICROSCOPE 3.5, HYSTERICAL 3.48

**Critique:** Long-word general round.

## Round 174 [themed]: Star Trek: Cast and Crew  (total 50.0, candidate B08)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| O'Brien's actor, in full | COLMMEANEY | COLM · MEA · NEY | trivia | 4 |
| Ricardo who played Khan | MONTALBAN | MON · TAL · BAN | trivia | 4 |
| Armin under Quark's ears | SHIMERMAN | SHI · MER · MAN | trivia | 4 |
| Mr Kelley's first name | DEFOREST | DE · FOR · EST | trivia | 4 |
| Kirk's actor, spoken-word crooner | SHATNER | SHAT · NER | trivia | 3 |
| Robert, Voyager's Doctor | PICARDO | PIC · ARDO | trivia | 4 |
| Nana, who played Kira | VISITOR | VIS · ITOR | wordplay | 4 |

**Tile pool (18: 1 x 2-letter, 13 x 3-letter, 4 x 4-letter):** ARDO BAN COLM DE EST FOR ITOR MAN MEA MER MON NER NEY PIC SHAT SHI TAL VIS

**Score:** decoys 7.2/20 + tempting pairs 1.2/16 + shared fragments 6.2/10 + anchor balance 6.7/8 + shape 10.4/12 + word appeal 14.0/14 + penalties -9.7 = **structure 36.1/80** (scaled 22.6/50); clue rating 20.4/30 + variety 4.0/8 + puns 3.0/12 + penalties 0.0 = **clues 27.4/50**

- Decoys (5): FORMER, MANNER, MONITOR, BANNER, FOREST*
- Duplicate tiles: none; near-twin tiles: BAN/MAN, MAN/MON, MEA/MER, MER/NER, NER/NEY
- Giveaway tiles (share of the answer's family): ARDO (0.556), COLM (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: COLMMEANEY, SHIMERMAN, SHATNER, PICARDO, VISITOR
- Word frequency (zipf): COLMMEANEY 0.0, MONTALBAN 1.81, SHIMERMAN 0.0, DEFOREST 2.12, SHATNER 2.74, PICARDO 1.7, VISITOR 4.01

**Critique:** Fandom trivia round.

## Round 175 [themed]: Cosmere: Shards and Realms  (total 47.2, candidate D06)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Original power, split sixteen ways | ADONALSIUM | ADO · NAL · SIUM | trivia | 4 |
| Event that made the Shards | SHATTERING | SHAT · TER · ING | trivia | 3 |
| Shard that gives Breath on Nalthis | ENDOWMENT | EN · DOW · MENT | trivia | 4 |
| One of the sixteen, still unseen | INVENTION | IN · VENT · ION | trivia | 3 |
| Realm where Shadesmar lies | COGNITIVE | COG · NIT · IVE | trivia | 4 |
| Realm of the soul's true shape | SPIRITUAL | SPI · RIT · UAL | trivia | 3 |
| Splintered Shard Odium hunted | AMBITION | AM · BIT · ION | trivia | 4 |

**Tile pool (21: 3 x 2-letter, 14 x 3-letter, 4 x 4-letter):** ADO AM BIT COG DOW EN IN ING ION ION IVE MENT NAL NIT RIT SHAT SIUM SPI TER UAL VENT

**Score:** decoys 20.0/20 + tempting pairs 4.0/16 + shared fragments 8.8/10 + anchor balance 6.9/8 + shape 8.3/12 + word appeal 14.0/14 + penalties -12.3 = **structure 49.7/80** (scaled 31.1/50); clue rating 16.1/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 16.1/50**

- Decoys (18): ENTER, MENTION, INTERNAL, ENTERING, BITTER, INTER, AMEN, SPINAL, BITING, MENTIONING, COGNITION, INVENTING, INVENTIVE, VENTING, SPIRIT*, RITUAL*, INVENT*, SHATTER*
- Duplicate tiles: ION; near-twin tiles: BIT/NIT, BIT/RIT, MENT/VENT, NAL/UAL, NIT/RIT
- Giveaway tiles (share of the answer's family): COG (0.507), SHAT (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: ADONALSIUM, SHATTERING, COGNITIVE, SPIRITUAL
- Word frequency (zipf): ADONALSIUM 0.0, SHATTERING 3.31, ENDOWMENT 3.52, INVENTION 4.04, COGNITIVE 4.11, SPIRITUAL 4.4, AMBITION 3.91

**Critique:** Fandom trivia round.

## Round 176 [themed]: The Good Place: Language, Please  (total 47.2, candidate E04)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Censored intensifier of choice | FORKING | FOR · KING | trivia | 4 |
| Janet's first correction | NOTAGIRL | NOT · AG · IRL | trivia | 5 |
| Janet's other correction | NOTAROBOT | NOT · ARO · BOT | trivia | 5 |
| Take it ___, a sign-off | SLEAZY | SLE · AZY | trivia | 4 |
| Pobody's ___ | NERFECT | NER · FECT | trivia | 5 |
| 'Ya ___!' | BASIC | BAS · IC | trivia | 4 |
| Top-shelf censored oath | MOTHERFORK | MOT · HER · FORK | trivia | 4 |

**Tile pool (17: 2 x 2-letter, 12 x 3-letter, 3 x 4-letter):** AG ARO AZY BAS BOT FECT FOR FORK HER IC IRL KING MOT NER NOT NOT SLE

**Score:** decoys 2.2/20 + tempting pairs 1.2/16 + shared fragments 7.5/10 + anchor balance 7.2/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -11.9 = **structure 29.3/80** (scaled 18.3/50); clue rating 28.9/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 28.9/50**

- Decoys (2): BOTHER, MOTHER*
- Duplicate tiles: NOT; near-twin tiles: BOT/MOT, BOT/NOT, HER/NER, MOT/NOT
- Giveaway tiles (share of the answer's family): none; whole-word tiles: FORK
- Answers whose first tile has no rival continuation: FORKING, SLEAZY, NERFECT, BASIC, MOTHERFORK
- Word frequency (zipf): FORKING 2.56, NOTAGIRL 0.0, NOTAROBOT 0.0, SLEAZY 3.04, NERFECT 0.0, BASIC 4.89, MOTHERFORK 0.0

**Critique:** Fandom trivia round.

## Round 177 [themed]: Star Trek: Tech Manual  (total 46.0, candidate B05)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Beeping handheld scanner | TRICORDER | TRI · COR · DER | definition | 3 |
| ___ device, the Romulan vanishing act | CLOAKING | CLO · AK · ING | trivia | 3 |
| Dish that fixes every plot | DEFLECTOR | DEF · LEC · TOR | pun | 4 |
| ___ chips, the computer's memory | ISOLINEAR | ISO · LIN · EAR | trivia | 4 |
| Tea, Earl Grey, hot dispenser | REPLICATOR | REP · LICA · TOR | trivia | 4 |
| Warp pod on a pylon | NACELLE | NAC · ELLE | definition | 3 |
| Set it to stun | PHASER | PHA · SER | trivia | 3 |

**Tile pool (19: 1 x 2-letter, 16 x 3-letter, 2 x 4-letter):** AK CLO COR DEF DER EAR ELLE ING ISO LEC LICA LIN NAC PHA REP SER TOR TOR TRI

**Score:** decoys 4.7/20 + tempting pairs 1.6/16 + shared fragments 6.2/10 + anchor balance 7.5/8 + shape 12.0/12 + word appeal 14.0/14 + penalties -12.3 = **structure 33.7/80** (scaled 21.1/50); clue rating 13.9/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 24.9/50**

- Decoys (5): CLOSER, LINING, LINEAR*, REPLICA*, CLOAK*
- Duplicate tiles: TOR; near-twin tiles: COR/TOR, DEF/DER, DER/SER
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: TRICORDER, CLOAKING, DEFLECTOR, ISOLINEAR, REPLICATOR, NACELLE, PHASER
- Word frequency (zipf): TRICORDER 1.8, CLOAKING 2.62, DEFLECTOR 2.52, ISOLINEAR 0.0, REPLICATOR 2.34, NACELLE 2.21, PHASER 2.5

**Critique:** Fandom trivia round.

## Round 178 [themed]: They Might Be Giants: Lyric Sheet  (total 45.8, candidate C06)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Blue bird in the outlet, per Birdhouse | CANARY | CAN · ARY | trivia | 4 |
| Where the nightlight bird perches | OUTLET | OUT · LET | trivia | 4 |
| Old New York was once New ___ | AMSTERDAM | AMS · TER · DAM | trivia | 5 |
| ___ Man, Particle Man's rival | UNIVERSE | UNI · VER · SE | trivia | 4 |
| Person Man was hit by one | FRYINGPAN | FRY · ING · PAN | trivia | 5 |
| Nobody gets what they want: ___ | BEAUTIFUL | BEA · UTI · FUL | trivia | 4 |
| Ana Ng's presence, glowing | MAJESTIC | MAJ · ES · TIC | trivia | 3 |

**Tile pool (19: 2 x 2-letter, 17 x 3-letter):** AMS ARY BEA CAN DAM ES FRY FUL ING LET MAJ OUT PAN SE TER TIC UNI UTI VER

**Score:** decoys 13.2/20 + tempting pairs 1.2/16 + shared fragments 5.0/10 + anchor balance 6.8/8 + shape 11.0/12 + word appeal 14.0/14 + penalties -17.2 = **structure 33.9/80** (scaled 21.2/50); clue rating 24.6/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 24.6/50**

- Decoys (15): LETTER, SEES, BEAVER, OUTING, BEAUTIES, SEAMS, LETTERING, CANES, BEATER, ESTER, DAMES, VERTICES, VERSE*, FRYING*, SEVER*
- Duplicate tiles: none; near-twin tiles: ARY/FRY, CAN/PAN, TER/VER, UNI/UTI
- Giveaway tiles (share of the answer's family): AMS (0.509), FRY (0.726); whole-word tiles: none
- Answers whose first tile has no rival continuation: CANARY, OUTLET, AMSTERDAM, UNIVERSE, FRYINGPAN, BEAUTIFUL, MAJESTIC
- Word frequency (zipf): CANARY 3.44, OUTLET 4.0, AMSTERDAM 4.03, UNIVERSE 4.59, FRYINGPAN 1.17, BEAUTIFUL 5.22, MAJESTIC 3.57

**Critique:** Fandom trivia round.

## Round 179 [mixed]: Long Haul  (total 45.3, candidate G20)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Joint pain | ARTHRITIS | AR · THRI · TIS | pun | 3 |
| Popcorn zapper | MICROWAVE | MIC · ROW · AVE | definition | 3 |
| Don't shoot this person | MESSENGER | MES · SEN · GER | trivia | 4 |
| Journey to Mecca, e.g. | PILGRIMAGE | PIL · GRI · MAGE | definition | 3 |
| On the edges, like vision | PERIPHERAL | PER · IPH · ERAL | definition | 3 |
| Drilling for a living | DENTISTRY | DEN · TIS · TRY | pun | 4 |
| In the genes | HEREDITARY | HER · EDI · TARY | pun | 3 |

**Tile pool (21: 1 x 2-letter, 16 x 3-letter, 4 x 4-letter):** AR AVE DEN EDI ERAL GER GRI HER IPH MAGE MES MIC PER PIL ROW SEN TARY THRI TIS TIS TRY

**Score:** decoys 4.2/20 + tempting pairs 0.8/16 + shared fragments 7.5/10 + anchor balance 7.1/8 + shape 9.0/12 + word appeal 7.4/14 + penalties -9.6 = **structure 26.4/80** (scaled 16.5/50); clue rating 11.8/30 + variety 8.0/8 + puns 9.0/12 + penalties 0.0 = **clues 28.8/50**

- Decoys (4): ARROW, GRIMES, ARTISTRY, SENTRY
- Duplicate tiles: TIS; near-twin tiles: DEN/SEN, GER/HER, GER/PER, HER/PER
- Giveaway tiles (share of the answer's family): MIC (0.485); whole-word tiles: none
- Answers whose first tile has no rival continuation: MICROWAVE, MESSENGER, PILGRIMAGE, PERIPHERAL, DENTISTRY, HEREDITARY
- Word frequency (zipf): ARTHRITIS 3.61, MICROWAVE 3.8, MESSENGER 3.95, PILGRIMAGE 3.5, PERIPHERAL 3.66, DENTISTRY 3.39, HEREDITARY 3.49

**Critique:** Long-word general round.

## Round 180 [themed]: Project Hail Mary: Eridians  (total 43.7, candidate F02)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| How Rocky 'sees' | ECHOLOCATE | ECH · OLO · CATE | trivia | 4 |
| Grace's laptop, turned Eridian ___ | TRANSLATOR | TRAN · SLA · TOR | trivia | 4 |
| Shape of Rocky's shell | PENTAGONAL | PEN · TAGO · NAL | trivia | 4 |
| Eridian wonder-material | XENONITE | XE · NON · ITE | trivia | 4 |
| Rocky's rocky shell | CARAPACE | CAR · APA · CE | pun | 4 |
| Like Eridian speech | MUSICAL | MUS · ICAL | trivia | 4 |
| Rocky's triple-stacked exclamation | AMAZE | AMA · ZE | trivia | 5 |

**Tile pool (19: 3 x 2-letter, 12 x 3-letter, 4 x 4-letter):** AMA APA CAR CATE CE ECH ICAL ITE MUS NAL NON OLO PEN SLA TAGO TOR TRAN XE ZE

**Score:** decoys 3.4/20 + tempting pairs 0.0/16 + shared fragments 1.2/10 + anchor balance 6.7/8 + shape 9.6/12 + word appeal 14.0/14 + penalties -15.6 = **structure 19.4/80** (scaled 12.1/50); clue rating 24.6/30 + variety 4.0/8 + puns 3.0/12 + penalties 0.0 = **clues 31.6/50**

- Decoys (4): PENCE, TRANCE, CARNAL, XENON*
- Duplicate tiles: none; near-twin tiles: AMA/APA
- Giveaway tiles (share of the answer's family): MUS (0.42), TRAN (0.893); whole-word tiles: none
- Answers whose first tile has no rival continuation: ECHOLOCATE, TRANSLATOR, PENTAGONAL, XENONITE, CARAPACE, MUSICAL, AMAZE
- Word frequency (zipf): ECHOLOCATE 1.09, TRANSLATOR 3.67, PENTAGONAL 2.08, XENONITE 0.0, CARAPACE 2.63, MUSICAL 4.51, AMAZE 3.19

**Critique:** Fandom trivia round.

## Round 181 [mixed]: Long Haul  (total 42.6, candidate G03)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| First draft in metal | PROTOTYPE | PROT · OTY · PE | definition | 3 |
| Red-carpet ready | GLAMOROUS | GLA · MOR · OUS | definition | 3 |
| Haggle in a suit | NEGOTIATE | NEG · OTI · ATE | definition | 3 |
| Hall built for hearing | AUDITORIUM | AUDI · TOR · IUM | wordplay | 3 |
| It throws slides at the wall | PROJECTOR | PRO · JEC · TOR | pun | 4 |
| Off-center, like a quirky aunt | ECCENTRIC | EC · CEN · TRIC | wordplay | 4 |
| Keeper of the grounds | CARETAKER | CAR · ETA · KER | definition | 3 |

**Tile pool (21: 2 x 2-letter, 16 x 3-letter, 3 x 4-letter):** ATE AUDI CAR CEN EC ETA GLA IUM JEC KER MOR NEG OTI OTY OUS PE PRO PROT TOR TOR TRIC

**Score:** decoys 2.3/20 + tempting pairs 1.2/16 + shared fragments 5.0/10 + anchor balance 7.0/8 + shape 9.0/12 + word appeal 7.1/14 + penalties -9.4 = **structure 22.1/80** (scaled 13.8/50); clue rating 11.8/30 + variety 8.0/8 + puns 9.0/12 + penalties 0.0 = **clues 28.8/50**

- Decoys (3): PROTECTOR, AUDITOR*, NEGATE*
- Duplicate tiles: TOR; near-twin tiles: MOR/TOR, OTI/OTY
- Giveaway tiles (share of the answer's family): AUDI (0.503); whole-word tiles: none
- Answers whose first tile has no rival continuation: GLAMOROUS, NEGOTIATE, AUDITORIUM, ECCENTRIC
- Word frequency (zipf): PROTOTYPE 3.83, GLAMOROUS 3.5, NEGOTIATE 3.99, AUDITORIUM 3.51, PROJECTOR 3.41, ECCENTRIC 3.58, CARETAKER 3.45

**Critique:** Long-word general round.

## Round 182 [mixed]: Long Haul  (total 42.2, candidate G04)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Size of a quake, or starshine | MAGNITUDE | MAG · NIT · UDE | definition | 3 |
| Office note, in full | MEMORANDUM | MEM · ORAN · DUM | definition | 3 |
| Vote handed straight to the people | REFERENDUM | REF · EREN · DUM | definition | 3 |
| Wonderful, superhero-adjacent | MARVELOUS | MAR · VEL · OUS | pun | 3 |
| Rubber boot, or beef in pastry | WELLINGTON | WEL · LING · TON | wordplay | 4 |
| Seamless spectrum, like space-time | CONTINUUM | CON · TIN · UUM | definition | 3 |
| Embassy's little sibling | CONSULATE | CON · SUL · ATE | definition | 3 |

**Tile pool (21: 18 x 3-letter, 3 x 4-letter):** ATE CON CON DUM DUM EREN LING MAG MAR MEM NIT ORAN OUS REF SUL TIN TON UDE UUM VEL WEL

**Score:** decoys 2.7/20 + tempting pairs 0.0/16 + shared fragments 10.0/10 + anchor balance 6.8/8 + shape 9.0/12 + word appeal 7.4/14 + penalties -6.2 = **structure 29.7/80** (scaled 18.6/50); clue rating 9.6/30 + variety 8.0/8 + puns 6.0/12 + penalties 0.0 = **clues 23.6/50**

- Decoys (3): MARTIN, MARVEL*, CONSUL*
- Duplicate tiles: CON, DUM; near-twin tiles: CON/TON, DUM/UUM, MAG/MAR, TIN/TON, VEL/WEL
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: MAGNITUDE, MEMORANDUM, REFERENDUM, MARVELOUS, WELLINGTON
- Word frequency (zipf): MAGNITUDE 4.0, MEMORANDUM 3.47, REFERENDUM 3.98, MARVELOUS 3.53, WELLINGTON 3.82, CONTINUUM 3.42, CONSULATE 3.56

**Critique:** Long-word general round.

## Round 183 [themed]: They Might Be Giants: The Band  (total 41.3, candidate C05)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Linnell's earlier, unremarkable band | MUNDANES | MUN · DA · NES | pun | 4 |
| Flansburgh side project | MONOPUFF | MON · OP · UFF | trivia | 3 |
| Linnell solo album touring the map | STATESONGS | STA · TES · ONGS | trivia | 4 |
| Early indie label, second to nobody | BARNONE | BARN · ONE | pun | 4 |
| Marty, behind the kit | BELLER | BEL · LER | trivia | 3 |
| Robin, Flansburgh's wife and collaborator | GOLDWASSER | GOLD · WAS · SER | trivia | 3 |
| Flansburgh's axe | GUITAR | GUI · TAR | definition | 2 |

**Tile pool (18: 2 x 2-letter, 13 x 3-letter, 3 x 4-letter):** BARN BEL DA GOLD GUI LER MON MUN NES ONE ONGS OP SER STA TAR TES UFF WAS

**Score:** decoys 6.0/20 + tempting pairs 0.0/16 + shared fragments 3.8/10 + anchor balance 7.4/8 + shape 10.4/12 + word appeal 14.0/14 + penalties -13.6 = **structure 28.0/80** (scaled 17.5/50); clue rating 11.8/30 + variety 8.0/8 + puns 6.0/12 + penalties -2.0 = **clues 23.8/50**

- Decoys (5): DATES, BELONGS, SERMON, WASTES, STATES*
- Duplicate tiles: none; near-twin tiles: LER/SER, MON/MUN, NES/TES
- Giveaway tiles (share of the answer's family): none; whole-word tiles: GOLD
- Answers whose first tile has no rival continuation: MUNDANES, MONOPUFF, STATESONGS, BARNONE, BELLER, GOLDWASSER, GUITAR
- Word frequency (zipf): MUNDANES 1.35, MONOPUFF 0.0, STATESONGS 0.0, BARNONE 0.0, BELLER 2.04, GOLDWASSER 1.53, GUITAR 4.48

**Critique:** Fandom trivia round.

## Round 184 [mixed]: Long Haul  (total 40.9, candidate G13)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Sorcerer's helper | APPRENTICE | AP · PREN · TICE | trivia | 4 |
| Life story by someone else | BIOGRAPHY | BIO · GRA · PHY | definition | 3 |
| Walker, or dull | PEDESTRIAN | PED · EST · RIAN | wordplay | 4 |
| Orbital in scale | PLANETARY | PLA · NET · ARY | definition | 3 |
| Spark between two people | CHEMISTRY | CHE · MIS · TRY | wordplay | 4 |
| Cogs and gears | MACHINERY | MAC · HIN · ERY | definition | 2 |
| Game-show hopeful | CONTESTANT | CON · TES · TANT | definition | 3 |

**Tile pool (21: 1 x 2-letter, 16 x 3-letter, 4 x 4-letter):** AP ARY BIO CHE CON ERY EST GRA HIN MAC MIS NET PED PHY PLA PREN RIAN TANT TES TICE TRY

**Score:** decoys 7.7/20 + tempting pairs 0.8/16 + shared fragments 3.8/10 + anchor balance 7.1/8 + shape 9.0/12 + word appeal 8.0/14 + penalties -8.9 = **structure 27.4/80** (scaled 17.1/50); clue rating 11.8/30 + variety 8.0/8 + puns 6.0/12 + penalties -2.0 = **clues 23.8/50**

- Decoys (6): CHEAP, PLATES, MISERY, CHEAPEST, CHEERY, PLANET*
- Duplicate tiles: none; near-twin tiles: ARY/ERY, ARY/TRY, ERY/TRY
- Giveaway tiles (share of the answer's family): MAC (0.454); whole-word tiles: none
- Answers whose first tile has no rival continuation: BIOGRAPHY, PEDESTRIAN, PLANETARY, MACHINERY, CONTESTANT
- Word frequency (zipf): APPRENTICE 3.7, BIOGRAPHY 3.89, PEDESTRIAN 3.71, PLANETARY 3.56, CHEMISTRY 4.35, MACHINERY 4.02, CONTESTANT 3.48

**Critique:** Long-word general round.

## Round 185 [mixed]: Long Haul  (total 40.3, candidate G06)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Yummy, formally | DELICIOUS | DEL · ICI · OUS | definition | 2 |
| Like i, or a childhood friend | IMAGINARY | IMA · GIN · ARY | wordplay | 5 |
| Unbeatable, like some summers | INVINCIBLE | IN · VINC · IBLE | evocative | 3 |
| Like pi, or a phobia | IRRATIONAL | IRR · ATI · ONAL | wordplay | 5 |
| Top-floor luxury pad | PENTHOUSE | PEN · THO · USE | definition | 3 |
| Middle class, per Marx | BOURGEOIS | BOUR · GE · OIS | definition | 3 |
| Crime ring, or news service | SYNDICATE | SYN · DIC · ATE | wordplay | 3 |

**Tile pool (21: 2 x 2-letter, 15 x 3-letter, 4 x 4-letter):** ARY ATE ATI BOUR DEL DIC GE GIN IBLE ICI IMA IN IRR OIS ONAL OUS PEN SYN THO USE VINC

**Score:** decoys 2.8/20 + tempting pairs 2.4/16 + shared fragments 2.5/10 + anchor balance 7.1/8 + shape 8.3/12 + word appeal 6.5/14 + penalties -11.3 = **structure 18.3/80** (scaled 11.4/50); clue rating 13.9/30 + variety 8.0/8 + puns 9.0/12 + penalties -2.0 = **clues 28.9/50**

- Decoys (2): IMAGE, INDICATE
- Duplicate tiles: none; near-twin tiles: ATE/ATI, OIS/OUS
- Giveaway tiles (share of the answer's family): BOUR (0.568), OIS (0.532); whole-word tiles: none
- Answers whose first tile has no rival continuation: DELICIOUS, IRRATIONAL, PENTHOUSE, BOURGEOIS, SYNDICATE
- Word frequency (zipf): DELICIOUS 4.34, IMAGINARY 3.79, INVINCIBLE 3.44, IRRATIONAL 3.56, PENTHOUSE 3.31, BOURGEOIS 3.4, SYNDICATE 3.51

**Critique:** Long-word general round.

## Round 186 [themed]: Cosmere: Metals  (total 40.2, candidate D02)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Burn it to be a Thug | PEWTER | PEW · TER | trivia | 4 |
| Smoker's metal, hiding Allomancy | COPPER | COP · PER | trivia | 4 |
| Turns your next burn into one blast | DURALUMIN | DUR · ALU · MIN | trivia | 4 |
| Wipes your reserves, blocks Pushes | ALUMINUM | ALU · MI · NUM | trivia | 4 |
| Supercharges someone else's burn | NICROSIL | NIC · ROS · IL | trivia | 4 |
| Leecher's metal | CHROMIUM | CHRO · MIUM | trivia | 3 |
| Slows time in a bubble | CADMIUM | CAD · MIUM | trivia | 4 |

**Tile pool (17: 2 x 2-letter, 12 x 3-letter, 3 x 4-letter):** ALU ALU CAD CHRO COP DUR IL MI MIN MIUM MIUM NIC NUM PER PEW ROS TER

**Score:** decoys 4.0/20 + tempting pairs 1.2/16 + shared fragments 7.5/10 + anchor balance 6.7/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -10.8 = **structure 31.7/80** (scaled 19.8/50); clue rating 20.4/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 20.4/50**

- Decoys (3): CHRONIC, ROSTER, PERIL
- Duplicate tiles: ALU, MIUM; near-twin tiles: PER/PEW, PER/TER
- Giveaway tiles (share of the answer's family): PEW (0.647); whole-word tiles: none
- Answers whose first tile has no rival continuation: PEWTER, COPPER, DURALUMIN, ALUMINUM, NICROSIL, CADMIUM
- Word frequency (zipf): PEWTER 2.78, COPPER 4.27, DURALUMIN 1.71, ALUMINUM 4.01, NICROSIL 0.0, CHROMIUM 3.14, CADMIUM 2.85

**Critique:** Fandom trivia round.

## Round 187 [themed]: Cosmere: Wax and Wayne  (total 39.9, candidate D03)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Metal-burner like Wax | ALLOMANCER | ALLO · MAN · CER | trivia | 3 |
| Train-robbing gang in Alloy of Law | VANISHERS | VAN · ISH · ERS | trivia | 4 |
| The Bands of ___ | MOURNING | MO · URN · ING | trivia | 4 |
| Marsh's later, spiky alias | IRONEYES | IRO · NEY · ES | trivia | 4 |
| Basin city named for a king | ELENDEL | ELEN · DEL | trivia | 3 |
| Gunsmith who'd gladly shoot Wayne | RANETTE | RAN · ETTE | trivia | 4 |
| Wax's meticulous fiancée | STERIS | STE · RIS | trivia | 4 |

**Tile pool (18: 2 x 2-letter, 13 x 3-letter, 3 x 4-letter):** ALLO CER DEL ELEN ERS ES ETTE ING IRO ISH MAN MO NEY RAN RIS STE URN VAN

**Score:** decoys 10.3/20 + tempting pairs 1.6/16 + shared fragments 3.8/10 + anchor balance 7.3/8 + shape 10.4/12 + word appeal 14.0/14 + penalties -12.8 = **structure 34.7/80** (scaled 21.7/50); clue rating 18.2/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 18.2/50**

- Decoys (10): MONEY, MODEL, RISING, RISES, MODELING, VANISHING, VANISHES, STEERS, MOURN*, VANISH*
- Duplicate tiles: none; near-twin tiles: MAN/RAN, MAN/VAN, RAN/VAN
- Giveaway tiles (share of the answer's family): ELEN (0.557); whole-word tiles: none
- Answers whose first tile has no rival continuation: ALLOMANCER, VANISHERS, IRONEYES, ELENDEL, RANETTE, STERIS
- Word frequency (zipf): ALLOMANCER 0.0, VANISHERS 0.0, MOURNING 3.69, IRONEYES 0.0, ELENDEL 0.0, RANETTE 0.0, STERIS 1.23

**Critique:** Fandom trivia round.

## Round 188 [themed]: They Might Be Giants: Letters and Numbers  (total 39.4, candidate C08)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| ___ of the Week, a lazy song | SEVENDAYS | SEV · END · AYS | trivia | 4 |
| ___ of Soup, a counting song | NINEBOWLS | NIN · EB · OWLS | trivia | 4 |
| ABC, in full | ALPHABET | AL · PHA · BET | trivia | 4 |
| Nine-sided shape with its own song | NONAGON | NON · AGON | trivia | 4 |
| Alphabet of ___ | NATIONS | NAT · IONS | trivia | 3 |
| Three-eyed critter of the 123s | TRIOPS | TRI · OPS | trivia | 4 |
| 123s song about nothing much | ZEROES | ZER · OES | pun | 3 |

**Tile pool (17: 2 x 2-letter, 12 x 3-letter, 3 x 4-letter):** AGON AL AYS BET EB END IONS NAT NIN NON OES OPS OWLS PHA SEV TRI ZER

**Score:** decoys 2.2/20 + tempting pairs 0.0/16 + shared fragments 2.5/10 + anchor balance 6.7/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -11.8 = **structure 22.7/80** (scaled 14.2/50); clue rating 18.2/30 + variety 4.0/8 + puns 3.0/12 + penalties 0.0 = **clues 25.2/50**

- Decoys (3): TRIAL, NATAL, ALPHA*
- Duplicate tiles: none; near-twin tiles: NIN/NON, OES/OPS
- Giveaway tiles (share of the answer's family): BET (0.532), SEV (0.437); whole-word tiles: none
- Answers whose first tile has no rival continuation: SEVENDAYS, NINEBOWLS, ALPHABET, NONAGON, NATIONS, TRIOPS, ZEROES
- Word frequency (zipf): SEVENDAYS 0.0, NINEBOWLS 0.0, ALPHABET 3.7, NONAGON 1.48, NATIONS 4.8, TRIOPS 1.17, ZEROES 2.72

**Critique:** Fandom trivia round.

## Round 189 [themed]: The Good Place: Episode Titles  (total 39.3, candidate E06)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Michael's ___, season 1 finale | GAMBIT | GAM · BIT | trivia | 4 |
| The ___, named for the Judge's idol | BURRITO | BUR · RITO | trivia | 4 |
| Episode title, relaxing but cooler | CHILLAXING | CHIL · LAX · ING | trivia | 4 |
| The Ballad of ___ Doug | DONKEY | DON · KEY | trivia | 4 |
| Dance Dance ___ | RESOLUTION | RES · OLUT · ION | trivia | 4 |
| Episode 2, up in the air | FLYING | FLY · ING | trivia | 3 |
| ___ You're Ready, the finale | WHENEVER | WHE · NEV · ER | trivia | 4 |

**Tile pool (17: 1 x 2-letter, 13 x 3-letter, 3 x 4-letter):** BIT BUR CHIL DON ER FLY GAM ING ING ION KEY LAX NEV OLUT RES RITO WHE

**Score:** decoys 6.0/20 + tempting pairs 2.0/16 + shared fragments 3.8/10 + anchor balance 6.8/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -12.4 = **structure 30.2/80** (scaled 18.9/50); clue rating 20.4/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 20.4/50**

- Decoys (5): GAMING, BITING, GAMER, FLYER, NEVER*
- Duplicate tiles: ING; near-twin tiles: DON/ION
- Giveaway tiles (share of the answer's family): FLY (0.478), RITO (0.569); whole-word tiles: none
- Answers whose first tile has no rival continuation: GAMBIT, BURRITO, CHILLAXING, DONKEY, FLYING, WHENEVER
- Word frequency (zipf): GAMBIT 3.1, BURRITO 3.26, CHILLAXING 1.58, DONKEY 3.62, RESOLUTION 4.59, FLYING 4.71, WHENEVER 4.63

**Critique:** Fandom trivia round.

## Round 190 [mixed]: Long Haul  (total 39.2, candidate G05)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Dark outline against the light | SILHOUETTE | SIL · HOU · ETTE | definition | 3 |
| Quest with risk included | ADVENTURE | AD · VEN · TURE | definition | 3 |
| Chain license, or film series | FRANCHISE | FRAN · CHI · SE | wordplay | 3 |
| Doctor's forecast | PROGNOSIS | PRO · GNO · SIS | definition | 3 |
| Your name, on the dotted line | SIGNATURE | SIG · NAT · URE | definition | 2 |
| Naval rank, or an 80s computer | COMMODORE | COM · MOD · ORE | wordplay | 4 |
| 'Oh, great,' said this way | SARCASTIC | SAR · CAS · TIC | evocative | 4 |

**Tile pool (21: 2 x 2-letter, 16 x 3-letter, 3 x 4-letter):** AD CAS CHI COM ETTE FRAN GNO HOU MOD NAT ORE PRO SAR SE SIG SIL SIS TIC TURE URE VEN

**Score:** decoys 8.3/20 + tempting pairs 1.2/16 + shared fragments 5.0/10 + anchor balance 7.3/8 + shape 9.0/12 + word appeal 6.5/14 + penalties -9.2 = **structure 28.1/80** (scaled 17.6/50); clue rating 9.6/30 + variety 8.0/8 + puns 6.0/12 + penalties -2.0 = **clues 21.6/50**

- Decoys (8): HOUSE, SEVEN, PROVEN, PROSE, ADORE, FRANTIC, NATURE*, VENTURE*
- Duplicate tiles: none; near-twin tiles: ORE/URE, SIG/SIL, SIG/SIS, SIL/SIS
- Giveaway tiles (share of the answer's family): SAR (0.478); whole-word tiles: none
- Answers whose first tile has no rival continuation: SILHOUETTE, FRANCHISE, SIGNATURE, COMMODORE, SARCASTIC
- Word frequency (zipf): SILHOUETTE 3.31, ADVENTURE 4.46, FRANCHISE 4.29, PROGNOSIS 3.33, SIGNATURE 4.25, COMMODORE 3.37, SARCASTIC 3.6

**Critique:** Long-word general round.

## Round 191 [themed]: Project Hail Mary: Lab Notes  (total 38.7, candidate F04)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Why less time passed for Grace | RELATIVITY | REL · ATIV · ITY | trivia | 4 |
| ___ factor, time dilation's math | LORENTZ | LOR · ENTZ | trivia | 4 |
| Breeding nitrogen-proof taumoeba | EVOLUTION | EVO · LUT · ION | trivia | 4 |
| Astrophage, at heart | MICROBE | MIC · ROBE | trivia | 3 |
| ___ panels farming Astrophage | BREEDER | BRE · EDER | trivia | 4 |
| How taumoeba got past xenonite | ADAPTATION | AD · APT · AT · ION | trivia | 4 |
| Petri dish crowd | CULTURE | CUL · TURE | pun | 3 |

**Tile pool (18: 2 x 2-letter, 11 x 3-letter, 5 x 4-letter):** AD APT AT ATIV BRE CUL EDER ENTZ EVO ION ION ITY LOR LUT MIC REL ROBE TURE

**Score:** decoys 3.2/20 + tempting pairs 0.8/16 + shared fragments 2.5/10 + anchor balance 6.0/8 + shape 7.2/12 + word appeal 14.0/14 + penalties -12.1 = **structure 21.6/80** (scaled 13.5/50); clue rating 18.2/30 + variety 4.0/8 + puns 3.0/12 + penalties 0.0 = **clues 25.2/50**

- Decoys (3): BREAD, RELATION, ADAPT*
- Duplicate tiles: ION; near-twin tiles: none
- Giveaway tiles (share of the answer's family): ENTZ (1.0), MIC (0.492); whole-word tiles: none
- Answers whose first tile has no rival continuation: LORENTZ, EVOLUTION, MICROBE, ADAPTATION, CULTURE
- Word frequency (zipf): RELATIVITY 3.34, LORENTZ 2.6, EVOLUTION 4.41, MICROBE 2.63, BREEDER 3.35, ADAPTATION 4.01, CULTURE 5.03

**Critique:** Fandom trivia round.

## Round 192 [themed]: They Might Be Giants: Here Comes Science  (total 38.2, candidate C03)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Glow, like the sun's gas in song | INCANDESCE | INC · ANDE · SCE | trivia | 4 |
| ___ Car, a Here Comes Science track | ELECTRIC | EL · ECT · RIC | trivia | 3 |
| ___ Assisted Design, a science song | COMPUTER | COM · PUT · ER | trivia | 3 |
| What Is a ___ Star? | SHOOTING | SHO · OT · ING | trivia | 4 |
| The sun's a gigantic nuclear one | FURNACE | FURN · ACE | trivia | 4 |
| The sun's a ___ of incandescent plasma | MIASMA | MIA · SMA | trivia | 5 |
| Not gas after all, they sang back | PLASMA | PLA · SMA | trivia | 4 |

**Tile pool (18: 3 x 2-letter, 13 x 3-letter, 2 x 4-letter):** ACE ANDE COM ECT EL ER FURN INC ING MIA OT PLA PUT RIC SCE SHO SMA SMA

**Score:** decoys 6.7/20 + tempting pairs 2.8/16 + shared fragments 5.0/10 + anchor balance 6.5/8 + shape 10.4/12 + word appeal 14.0/14 + penalties -16.9 = **structure 28.5/80** (scaled 17.8/50); clue rating 20.4/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 20.4/50**

- Decoys (6): COMING, COMPUTING, SHOOTER, ELECTING, SHOOT*, ELECT*
- Duplicate tiles: SMA; near-twin tiles: ACE/SCE, INC/ING
- Giveaway tiles (share of the answer's family): MIA (0.552), SCE (0.512); whole-word tiles: none
- Answers whose first tile has no rival continuation: INCANDESCE, ELECTRIC, SHOOTING, FURNACE, MIASMA, PLASMA
- Word frequency (zipf): INCANDESCE 0.0, ELECTRIC 4.72, COMPUTER 4.97, SHOOTING 4.78, FURNACE 3.62, MIASMA 2.27, PLASMA 3.95

**Critique:** Fandom trivia round.

## Round 193 [mixed]: Long Haul  (total 37.9, candidate G02)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Ink refill, or a blown-on game | CARTRIDGE | CAR · TRID · GE | evocative | 4 |
| Absurd beyond repair | RIDICULOUS | RID · ICUL · OUS | definition | 3 |
| Spiteful by design | MALICIOUS | MAL · ICI · OUS | definition | 3 |
| Fabled, or just very cool | LEGENDARY | LEG · END · ARY | definition | 3 |
| Indented chunk of prose | PARAGRAPH | PAR · AG · RAPH | definition | 3 |
| Pillar of the opinion page | COLUMNIST | COL · UMN · IST | pun | 4 |
| Salt-rimmed tequila sipper | MARGARITA | MAR · GAR · ITA | definition | 3 |

**Tile pool (21: 2 x 2-letter, 16 x 3-letter, 3 x 4-letter):** AG ARY CAR COL END GAR GE ICI ICUL IST ITA LEG MAL MAR OUS OUS PAR RAPH RID TRID UMN

**Score:** decoys 3.2/20 + tempting pairs 0.8/16 + shared fragments 10.0/10 + anchor balance 6.9/8 + shape 9.0/12 + word appeal 7.6/14 + penalties -13.3 = **structure 24.1/80** (scaled 15.1/50); clue rating 11.8/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 22.8/50**

- Decoys (4): RIDGE, PARTRIDGE, LEGEND*, COLUMN*
- Duplicate tiles: OUS; near-twin tiles: CAR/GAR, CAR/MAR, CAR/PAR, GAR/PAR, MAL/MAR, MAR/PAR
- Giveaway tiles (share of the answer's family): ITA (0.503), UMN (0.548); whole-word tiles: none
- Answers whose first tile has no rival continuation: CARTRIDGE, RIDICULOUS, MALICIOUS, LEGENDARY, PARAGRAPH, COLUMNIST, MARGARITA
- Word frequency (zipf): CARTRIDGE 3.57, RIDICULOUS 4.46, MALICIOUS 3.67, LEGENDARY 4.23, PARAGRAPH 4.03, COLUMNIST 3.58, MARGARITA 3.3

**Critique:** Long-word general round.

## Round 194 [themed]: Taskmaster: Greg and Alex  (total 36.9, candidate A08)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Fringe city where the show began | EDINBURGH | ED · INB · URGH | trivia | 4 |
| Greg's sitcom as a hapless teacher | MANDOWN | MAND · OWN | trivia | 4 |
| Sitcom where Greg played Ken | CUCKOO | CUC · KOO | trivia | 4 |
| Greg's tour: Firing ___s at a Dog | CHEESEBALL | CHE · ESE · BALL | trivia | 5 |
| Alex Horne's real job title | CREATOR | CRE · ATOR | trivia | 4 |
| Subject Greg once taught | DRAMA | DRA · MA | trivia | 4 |
| Every contestant's day job | COMEDIAN | COM · ED · IAN | definition | 2 |

**Tile pool (17: 3 x 2-letter, 10 x 3-letter, 4 x 4-letter):** ATOR BALL CHE COM CRE CUC DRA ED ED ESE IAN INB KOO MA MAND OWN URGH

**Score:** decoys 6.9/20 + tempting pairs 1.6/16 + shared fragments 3.8/10 + anchor balance 6.0/8 + shape 6.8/12 + word appeal 14.0/14 + penalties -15.8 = **structure 23.2/80** (scaled 14.5/50); clue rating 20.4/30 + variety 4.0/8 + puns 0.0/12 + penalties -2.0 = **clues 22.4/50**

- Decoys (6): OWNED, COMMAND, COMMANDED, CREED, COMMA, CHEESE*
- Duplicate tiles: ED; near-twin tiles: CHE/CRE
- Giveaway tiles (share of the answer's family): KOO (1.0), URGH (1.0); whole-word tiles: BALL
- Answers whose first tile has no rival continuation: EDINBURGH, MANDOWN, CUCKOO, CHEESEBALL, CREATOR, DRAMA
- Word frequency (zipf): EDINBURGH 4.28, MANDOWN 0.0, CUCKOO 3.14, CHEESEBALL 1.64, CREATOR 4.21, DRAMA 4.67, COMEDIAN 3.96

**Critique:** Fandom trivia round.

## Round 195 [mixed]: Long Haul  (total 36.9, candidate G10)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Shelf for Zeus and Thor | MYTHOLOGY | MYT · HOL · OGY | evocative | 3 |
| Belief system with a sign-up sheet | ASTROLOGY | AST · ROL · OGY | pun | 4 |
| Beyond science, like ghosts | PARANORMAL | PARA · NOR · MAL | definition | 3 |
| First, like a president's address | INAUGURAL | INA · UGU · RAL | definition | 3 |
| Like Wells's see-through man | INVISIBLE | IN · VISI · BLE | trivia | 3 |
| Like Eden's fruit | FORBIDDEN | FOR · BID · DEN | evocative | 3 |
| Cocoa confection | CHOCOLATE | CHO · COL · ATE | definition | 2 |

**Tile pool (21: 1 x 2-letter, 18 x 3-letter, 2 x 4-letter):** AST ATE BID BLE CHO COL DEN FOR HOL IN INA MAL MYT NOR OGY OGY PARA RAL ROL UGU VISI

**Score:** decoys 7.8/20 + tempting pairs 1.2/16 + shared fragments 10.0/10 + anchor balance 7.1/8 + shape 9.0/12 + word appeal 7.6/14 + penalties -10.0 = **structure 32.7/80** (scaled 20.4/50); clue rating 7.5/30 + variety 8.0/8 + puns 3.0/12 + penalties -2.0 = **clues 16.5/50**

- Decoys (8): FORMAL, INFORMAL, CHORAL, ASTRAL, PARABLE, NORMAL*, VISIBLE*, FORBID*
- Duplicate tiles: OGY; near-twin tiles: COL/HOL, COL/ROL, FOR/NOR, HOL/ROL, MAL/RAL, RAL/ROL
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: MYTHOLOGY, ASTROLOGY, PARANORMAL, INAUGURAL, CHOCOLATE
- Word frequency (zipf): MYTHOLOGY 3.64, ASTROLOGY 3.38, PARANORMAL 3.47, INAUGURAL 3.67, INVISIBLE 4.09, FORBIDDEN 3.96, CHOCOLATE 4.49

**Critique:** Long-word general round.

## Round 196 [themed]: The Good Place: Cast and Characters  (total 36.8, candidate E02)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Michael's dreaded fate: eternal shrieking | RETIREMENT | RET · IRE · MENT | trivia | 5 |
| Trevor's portrayer, Parks and Rec's Ben | ADAMSCOTT | AD · AMS · COTT | trivia | 4 |
| Ms Jamil, our Tahani | JAMEELA | JAM · EE · LA | trivia | 3 |
| D'Arcy, Janet in every form | CARDEN | CAR · DEN | trivia | 4 |
| William Jackson ___, Chidi | HARPER | HAR · PER | trivia | 3 |
| Obnoxious demon from the welcome committee | TREVOR | TRE · VOR | trivia | 4 |
| Michael's signature neckwear | BOWTIE | BOW · TIE | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 12 x 3-letter, 2 x 4-letter):** AD AMS BOW CAR COTT DEN EE HAR IRE JAM LA MENT PER RET TIE TRE VOR

**Score:** decoys 5.5/20 + tempting pairs 0.4/16 + shared fragments 3.8/10 + anchor balance 7.5/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -13.9 = **structure 26.3/80** (scaled 16.4/50); clue rating 20.4/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 20.4/50**

- Decoys (5): LADEN, HARDEN, TREAD, LAMENT, RETIRE*
- Duplicate tiles: none; near-twin tiles: CAR/HAR, IRE/TRE, TIE/TRE
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: RETIREMENT, ADAMSCOTT, JAMEELA, CARDEN, BOWTIE
- Word frequency (zipf): RETIREMENT 4.53, ADAMSCOTT 0.0, JAMEELA 1.67, CARDEN 2.21, HARPER 4.04, TREVOR 3.86, BOWTIE 2.4

**Critique:** Fandom trivia round.

## Round 197 [themed]: Star Trek: Ships  (total 35.5, candidate B03)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| NCC-1701, no bloody A or B | ENTERPRISE | ENT · ERP · RISE | trivia | 4 |
| Burnham's spore-drive ship | DISCOVERY | DIS · COV · ERY | trivia | 3 |
| Ship Khan hijacked in Wrath | RELIANT | RELI · ANT | trivia | 4 |
| Lower Decks' support vessel | CERRITOS | CER · RI · TOS | trivia | 4 |
| Riker's command after the D | TITAN | TI · TAN | trivia | 4 |
| Prodigy kids' stolen starship | PROTOSTAR | PRO · TOS · TAR | trivia | 4 |
| Romulan D'deridex, for one | WARBIRD | WAR · BIRD | trivia | 3 |

**Tile pool (18: 2 x 2-letter, 13 x 3-letter, 3 x 4-letter):** ANT BIRD CER COV DIS ENT ERP ERY PRO RELI RI RISE TAN TAR TI TOS TOS WAR

**Score:** decoys 1.0/20 + tempting pairs 0.8/16 + shared fragments 7.5/10 + anchor balance 7.1/8 + shape 10.4/12 + word appeal 14.0/14 + penalties -13.2 = **structure 27.7/80** (scaled 17.3/50); clue rating 18.2/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 18.2/50**

- Decoys (1): TARTAN
- Duplicate tiles: TOS; near-twin tiles: ANT/ENT, ERP/ERY, TAN/TAR, TAR/WAR
- Giveaway tiles (share of the answer's family): none; whole-word tiles: BIRD, RISE
- Answers whose first tile has no rival continuation: ENTERPRISE, RELIANT, CERRITOS, TITAN, PROTOSTAR, WARBIRD
- Word frequency (zipf): ENTERPRISE 4.38, DISCOVERY 4.45, RELIANT 3.41, CERRITOS 2.2, TITAN 3.69, PROTOSTAR 1.57, WARBIRD 1.88

**Critique:** Fandom trivia round.

## Round 198 [themed]: Project Hail Mary: Star Chart  (total 34.0, candidate F07)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Where Astrophage breeds sunward | VENUS | VEN · US | trivia | 4 |
| Sun's output, dropping | LUMINOSITY | LUM · INO · SITY | definition | 3 |
| What the infected Sun is doing | DIMMING | DIM · MING | trivia | 3 |
| Alpha ___, another infected neighbor | CENTAURI | CEN · TAU · RI | trivia | 4 |
| Where the Petrova line shows | SPECTRUM | SPEC · TRUM | trivia | 3 |
| Earth's looming fate | ICEAGE | ICE · AGE | trivia | 4 |
| Like most nearby stars | INFECTED | IN · FEC · TED | trivia | 3 |

**Tile pool (17: 3 x 2-letter, 10 x 3-letter, 4 x 4-letter):** AGE CEN DIM FEC ICE IN INO LUM MING RI SITY SPEC TAU TED TRUM US VEN

**Score:** decoys 6.5/20 + tempting pairs 2.0/16 + shared fragments 1.2/10 + anchor balance 7.2/8 + shape 6.8/12 + word appeal 14.0/14 + penalties -12.0 = **structure 25.7/80** (scaled 16.1/50); clue rating 13.9/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 17.9/50**

- Decoys (5): USAGE, INVENTED, INSPECTED, LUMINOUS, VENTED
- Duplicate tiles: none; near-twin tiles: CEN/VEN
- Giveaway tiles (share of the answer's family): TRUM (0.455); whole-word tiles: none
- Answers whose first tile has no rival continuation: VENUS, CENTAURI, SPECTRUM, ICEAGE
- Word frequency (zipf): VENUS 3.81, LUMINOSITY 2.9, DIMMING 2.62, CENTAURI 2.7, SPECTRUM 4.26, ICEAGE 1.35, INFECTED 4.13

**Critique:** Fandom trivia round.

## Round 199 [themed]: Project Hail Mary: Mission Control  (total 34.0, candidate F08)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| The crew's kind of ticket | ONEWAY | ONE · WAY | trivia | 4 |
| What Grace wasn't, exactly | VOLUNTEER | VOL · UNT · EER | trivia | 5 |
| Beetles, e.g. | PAYLOAD | PAY · LOAD | trivia | 3 |
| Stratt's unlimited power | AUTHORITY | AUT · HOR · ITY | trivia | 4 |
| Pact granting Stratt that power | TREATY | TRE · ATY | trivia | 3 |
| Aircraft ship hosting the lab | CARRIER | CAR · RIER | trivia | 4 |
| Putting the ship together in orbit | ASSEMBLY | AS · SEM · BLY | trivia | 3 |

**Tile pool (17: 1 x 2-letter, 14 x 3-letter, 2 x 4-letter):** AS ATY AUT BLY CAR EER HOR ITY LOAD ONE PAY RIER SEM TRE UNT VOL WAY

**Score:** decoys 2.2/20 + tempting pairs 0.4/16 + shared fragments 2.5/10 + anchor balance 6.3/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -10.2 = **structure 25.2/80** (scaled 15.8/50); clue rating 18.2/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 18.2/50**

- Decoys (2): CAREER, AUTHOR*
- Duplicate tiles: none; near-twin tiles: ATY/ITY, PAY/WAY
- Giveaway tiles (share of the answer's family): ATY (0.567); whole-word tiles: LOAD
- Answers whose first tile has no rival continuation: ONEWAY, VOLUNTEER, PAYLOAD, AUTHORITY, CARRIER, ASSEMBLY
- Word frequency (zipf): ONEWAY 1.6, VOLUNTEER 4.28, PAYLOAD 3.36, AUTHORITY 4.81, TREATY 4.31, CARRIER 4.29, ASSEMBLY 4.61

**Critique:** Fandom trivia round.

## Round 200 [themed]: Star Trek: Adversaries  (total 33.9, candidate B07)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Holodeck villain who woke up | MORIARTY | MOR · IAR · TY | trivia | 4 |
| Gul who insisted on five lights | MADRED | MAD · RED | trivia | 5 |
| Picard's Reman-raised clone | SHINZON | SHIN · ZON | trivia | 4 |
| Picard, assimilated | LOCUTUS | LOCU · TUS | trivia | 4 |
| Wide-eyed Klingon chancellor | GOWRON | GOW · RON | trivia | 4 |
| Con man with android wives | HARRYMUDD | HAR · RY · MUDD | trivia | 4 |
| Hive mind's seductive center | BORGQUEEN | BORG · QUE · EN | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 10 x 3-letter, 4 x 4-letter):** BORG EN GOW HAR IAR LOCU MAD MOR MUDD QUE RED RON RY SHIN TUS TY ZON

**Score:** decoys 1.9/20 + tempting pairs 0.4/16 + shared fragments 2.5/10 + anchor balance 4.4/8 + shape 6.8/12 + word appeal 14.0/14 + penalties -15.0 = **structure 14.9/80** (scaled 9.3/50); clue rating 24.6/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 24.6/50**

- Decoys (3): QUERY, QUEEN*, HARRY*
- Duplicate tiles: none; near-twin tiles: HAR/IAR, RON/ZON
- Giveaway tiles (share of the answer's family): BORG (1.0), GOW (0.429), MUDD (0.667); whole-word tiles: none
- Answers whose first tile has no rival continuation: MORIARTY, MADRED, SHINZON, LOCUTUS, GOWRON, HARRYMUDD, BORGQUEEN
- Word frequency (zipf): MORIARTY 2.98, MADRED 0.0, SHINZON 1.01, LOCUTUS 1.43, GOWRON 1.45, HARRYMUDD 0.0, BORGQUEEN 0.0

**Critique:** Fandom trivia round.

## Round 201 [themed]: Taskmaster: Around the World  (total 33.5, candidate A07)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Kids' spin-off: ___ Taskmaster | JUNIOR | JUN · IOR | trivia | 4 |
| Tom, the Australian Taskmaster | GLEESON | GLE · ESON | trivia | 4 |
| Taskmaster ___, the schools version | EDUCATION | EDU · CAT · ION | trivia | 3 |
| ___ 4, its home from series 10 | CHANNEL | CHAN · NEL | trivia | 4 |
| Mr Watts, the US Taskmaster | REGGIE | REG · GIE | trivia | 4 |
| Tabletop tie-in for family tasking | BOARDGAME | BO · ARD · GA · ME | trivia | 3 |
| Home of Kongen befaler | NORWAY | NOR · WAY | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 12 x 3-letter, 2 x 4-letter):** ARD BO CAT CHAN EDU ESON GA GIE GLE ION IOR JUN ME NEL NOR REG WAY

**Score:** decoys 5.5/20 + tempting pairs 0.8/16 + shared fragments 3.8/10 + anchor balance 6.6/8 + shape 8.1/12 + word appeal 14.0/14 + penalties -14.3 = **structure 24.5/80** (scaled 15.3/50); clue rating 18.2/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 18.2/50**

- Decoys (5): REGION, REGARD, JUNGLE, GAME*, BOARD*
- Duplicate tiles: none; near-twin tiles: GIE/GLE, ION/IOR, IOR/NOR
- Giveaway tiles (share of the answer's family): EDU (0.65), ESON (0.566); whole-word tiles: none
- Answers whose first tile has no rival continuation: JUNIOR, GLEESON, EDUCATION, CHANNEL, BOARDGAME, NORWAY
- Word frequency (zipf): JUNIOR 4.49, GLEESON 2.7, EDUCATION 5.28, CHANNEL 4.85, REGGIE 3.55, BOARDGAME 2.12, NORWAY 4.15

**Critique:** Fandom trivia round.

## Round 202 [themed]: Star Trek: Worlds  (total 33.4, candidate B04)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Garak's homeworld, Prime | CARDASSIA | CAR · DAS · SIA | trivia | 3 |
| Rainy capital of profit | FERENGINAR | FER · ENGI · NAR | trivia | 4 |
| Khan's exile system, minus a V | CETIALPHA | CET · IAL · PHA | trivia | 4 |
| Qo'noS, anglicized | KRONOS | KRO · NOS | trivia | 3 |
| Planet of illusionists, IV | TALOS | TA · LOS | trivia | 4 |
| Device that made a planet in Khan | GENESIS | GEN · ESIS | trivia | 4 |
| Planet of Galactic Peace, III | NIMBUS | NIM · BUS | trivia | 4 |

**Tile pool (17: 1 x 2-letter, 14 x 3-letter, 2 x 4-letter):** BUS CAR CET DAS ENGI ESIS FER GEN IAL KRO LOS NAR NIM NOS PHA SIA TA

**Score:** decoys 0.0/20 + tempting pairs 0.0/16 + shared fragments 2.5/10 + anchor balance 6.6/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -8.8 = **structure 24.3/80** (scaled 15.2/50); clue rating 18.2/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 18.2/50**

- Decoys (0): none
- Duplicate tiles: none; near-twin tiles: CAR/NAR, LOS/NOS
- Giveaway tiles (share of the answer's family): CET (0.551), KRO (0.65); whole-word tiles: none
- Answers whose first tile has no rival continuation: CARDASSIA, FERENGINAR, CETIALPHA, KRONOS, TALOS, GENESIS, NIMBUS
- Word frequency (zipf): CARDASSIA 1.6, FERENGINAR 0.0, CETIALPHA 0.0, KRONOS 2.66, TALOS 2.27, GENESIS 3.85, NIMBUS 2.62

**Critique:** Fandom trivia round.

## Round 203 [themed]: They Might Be Giants: Songbook III  (total 33.2, candidate C07)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| The ___ Got Me High | STATUE | STA · TUE | trivia | 4 |
| ___ Wage, a two-word song | MINIMUM | MIN · IMUM | trivia | 4 |
| ___ Dead Guy | EXQUISITE | EX · QUIS · ITE | trivia | 4 |
| Song named for a mail slot | LETTERBOX | LET · TER · BOX | trivia | 3 |
| Hovering ___, a floating hat | SOMBRERO | SOM · BRE · RO | trivia | 4 |
| Song ringing for supper | DINNERBELL | DIN · NER · BELL | trivia | 3 |
| You're ___ than you've ever been | OLDER | OLD · ER | trivia | 4 |

**Tile pool (18: 3 x 2-letter, 12 x 3-letter, 3 x 4-letter):** BELL BOX BRE DIN ER EX IMUM ITE LET MIN NER OLD QUIS RO SOM STA TER TUE

**Score:** decoys 4.0/20 + tempting pairs 1.2/16 + shared fragments 2.5/10 + anchor balance 6.6/8 + shape 9.3/12 + word appeal 14.0/14 + penalties -13.6 = **structure 24.0/80** (scaled 15.0/50); clue rating 18.2/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 18.2/50**

- Decoys (5): BOXER, MINER, DINER, LETTER*, DINNER*
- Duplicate tiles: none; near-twin tiles: DIN/MIN, NER/TER
- Giveaway tiles (share of the answer's family): IMUM (0.461), TUE (0.426); whole-word tiles: BELL
- Answers whose first tile has no rival continuation: STATUE, LETTERBOX, SOMBRERO, DINNERBELL, OLDER
- Word frequency (zipf): STATUE 4.09, MINIMUM 4.69, EXQUISITE 3.61, LETTERBOX 2.53, SOMBRERO 2.57, DINNERBELL 0.0, OLDER 4.92

**Critique:** Fandom trivia round.

## Round 204 [themed]: Taskmaster: Series 5-9  (total 33.1, candidate A02)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Irish comic of series 5, in full | AISLINGBEA | AIS · LING · BEA | trivia | 3 |
| Series 5's Mash Report host, in full | NISHKUMAR | NISH · KU · MAR | trivia | 3 |
| Iain of series 8, Love Island's voice | STIRLING | STIR · LING | trivia | 4 |
| James of series 7, a fan favourite | ACASTER | ACA · STER | trivia | 3 |
| Rose of series 9, a Kiwi | MATAFEO | MAT · AF · EO | trivia | 3 |
| Mark of series 5, or Sherlock's sidekick | WATSON | WAT · SON | wordplay | 4 |
| Alice of series 6, Radio 1 presenter | LEVINE | LEV · INE | trivia | 3 |

**Tile pool (17: 3 x 2-letter, 9 x 3-letter, 5 x 4-letter):** ACA AF AIS BEA EO INE KU LEV LING LING MAR MAT NISH SON STER STIR WAT

**Score:** decoys 5.0/20 + tempting pairs 0.0/16 + shared fragments 6.2/10 + anchor balance 7.0/8 + shape 5.6/12 + word appeal 14.0/14 + penalties -15.0 = **structure 22.9/80** (scaled 14.3/50); clue rating 11.8/30 + variety 4.0/8 + puns 3.0/12 + penalties 0.0 = **clues 18.8/50**

- Decoys (3): MARINE, STERLING, STEREO
- Duplicate tiles: LING; near-twin tiles: MAR/MAT, MAT/WAT, STER/STIR
- Giveaway tiles (share of the answer's family): BEA (0.505), NISH (0.506); whole-word tiles: none
- Answers whose first tile has no rival continuation: AISLINGBEA, NISHKUMAR, STIRLING, ACASTER, MATAFEO, WATSON, LEVINE
- Word frequency (zipf): AISLINGBEA 0.0, NISHKUMAR 0.0, STIRLING 3.48, ACASTER 1.51, MATAFEO 0.0, WATSON 4.18, LEVINE 3.46

**Critique:** Fandom trivia round.

## Round 205 [themed]: The Good Place: Jason and Janet  (total 33.1, candidate E07)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Jason's Sunshine State | FLORIDA | FLOR · IDA | trivia | 3 |
| Jianyu's vow, faked | SILENCE | SIL · ENCE | trivia | 4 |
| Rude counterpart from down below | BADJANET | BAD · JA · NET | trivia | 4 |
| Glitched assistant, ready to boogie | DISCOJANET | DIS · CO · JA · NET | trivia | 4 |
| ___ Janet, in Accounting | NEUTRAL | NEU · TRAL | trivia | 4 |
| Janet's spiky wrong delivery | CACTUS | CAC · TUS | trivia | 4 |
| What a killed Janet does | REBOOT | REB · OOT | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 11 x 3-letter, 3 x 4-letter):** BAD CAC CO DIS ENCE FLOR IDA JA JA NET NET NEU OOT REB SIL TRAL TUS

**Score:** decoys 0.3/20 + tempting pairs 0.0/16 + shared fragments 6.2/10 + anchor balance 6.4/8 + shape 7.9/12 + word appeal 14.0/14 + penalties -14.7 = **structure 20.3/80** (scaled 12.7/50); clue rating 20.4/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 20.4/50**

- Decoys (1): DISCO*
- Duplicate tiles: JA, NET; near-twin tiles: NET/NEU
- Giveaway tiles (share of the answer's family): IDA (0.507); whole-word tiles: none
- Answers whose first tile has no rival continuation: FLORIDA, SILENCE, BADJANET, DISCOJANET, NEUTRAL, CACTUS, REBOOT
- Word frequency (zipf): FLORIDA 4.76, SILENCE 4.46, BADJANET 0.0, DISCOJANET 0.0, NEUTRAL 4.24, CACTUS 3.4, REBOOT 3.54

**Critique:** Fandom trivia round.

## Round 206 [mixed]: Long Haul  (total 32.9, candidate G09)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Good at many things | VERSATILE | VER · SAT · ILE | definition | 2 |
| Medicine of the mind | PSYCHIATRY | PSY · CHIA · TRY | definition | 3 |
| A thousand years, or a Falcon | MILLENNIUM | MIL · LEN · NIUM | wordplay | 4 |
| '___, heal thyself' | PHYSICIAN | PHY · SIC · IAN | trivia | 4 |
| Run on pressurized fluid | HYDRAULIC | HYD · RAU · LIC | definition | 3 |
| Annie's hard-knock home | ORPHANAGE | ORP · HAN · AGE | trivia | 4 |
| Superman's city, or any big one | METROPOLIS | MET · ROPO · LIS | wordplay | 3 |

**Tile pool (21: 18 x 3-letter, 3 x 4-letter):** AGE CHIA HAN HYD IAN ILE LEN LIC LIS MET MIL NIUM ORP PHY PSY RAU ROPO SAT SIC TRY VER

**Score:** decoys 0.5/20 + tempting pairs 0.4/16 + shared fragments 5.0/10 + anchor balance 0.0/8 + shape 9.0/12 + word appeal 7.7/14 + penalties -8.1 = **structure 14.5/80** (scaled 9.1/50); clue rating 11.8/30 + variety 8.0/8 + puns 6.0/12 + penalties -2.0 = **clues 23.8/50**

- Decoys (1): ORPHAN*
- Duplicate tiles: none; near-twin tiles: HAN/IAN, LIC/LIS, LIC/SIC, PHY/PSY
- Giveaway tiles (share of the answer's family): CHIA (0.886), HYD (0.408), LIS (0.503), ORP (0.556), PHY (0.737), PSY (0.947); whole-word tiles: none
- Answers whose first tile has no rival continuation: VERSATILE, PSYCHIATRY, MILLENNIUM, PHYSICIAN, HYDRAULIC, ORPHANAGE
- Word frequency (zipf): VERSATILE 3.66, PSYCHIATRY 3.56, MILLENNIUM 3.7, PHYSICIAN 4.18, HYDRAULIC 3.72, ORPHANAGE 3.38, METROPOLIS 3.57

**Critique:** Long-word general round.

## Round 207 [themed]: Taskmaster: More Champions  (total 32.8, candidate A05)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Liza, series 6 champion | TARBUCK | TAR · BUCK | trivia | 3 |
| Lou, series 8's surreal winner | SANDERS | SAN · DERS | trivia | 3 |
| Morgana, series 12 champion | ROBINSON | ROB · IN · SON | trivia | 3 |
| Mathew of Ghosts, a recent champ | BAYNTON | BAYN · TON | trivia | 3 |
| Mae, series 15 champion | MARTIN | MAR · TIN | trivia | 3 |
| Ms Ryan, series 2 champ, informally | KATHERINE | KAT · HER · INE | trivia | 4 |
| Le Fay's first name, and a champ's | MORGANA | MOR · GA · NA | wordplay | 4 |

**Tile pool (17: 3 x 2-letter, 11 x 3-letter, 3 x 4-letter):** BAYN BUCK DERS GA HER IN INE KAT MAR MOR NA ROB SAN SON TAR TIN TON

**Score:** decoys 4.2/20 + tempting pairs 0.8/16 + shared fragments 6.2/10 + anchor balance 4.4/8 + shape 7.9/12 + word appeal 14.0/14 + penalties -15.2 = **structure 22.4/80** (scaled 14.0/50); clue rating 11.8/30 + variety 4.0/8 + puns 3.0/12 + penalties 0.0 = **clues 18.8/50**

- Decoys (4): GAIN, MARINE, MORTAR, ROBIN*
- Duplicate tiles: none; near-twin tiles: MAR/MOR, MAR/TAR, SAN/SON, SON/TON, TIN/TON
- Giveaway tiles (share of the answer's family): BAYN (1.0), BUCK (0.539), KAT (0.537); whole-word tiles: BUCK
- Answers whose first tile has no rival continuation: TARBUCK, SANDERS, ROBINSON, BAYNTON, KATHERINE, MORGANA
- Word frequency (zipf): TARBUCK 1.73, SANDERS 3.98, ROBINSON 4.21, BAYNTON 1.68, MARTIN 4.74, KATHERINE 3.83, MORGANA 2.76

**Critique:** Fandom trivia round.

## Round 208 [themed]: Taskmaster: Series 1-4  (total 32.6, candidate A01)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Roisin, a series 1 original | CONATY | CON · ATY | trivia | 3 |
| Jon, series 2's tidy grump | RICHARDSON | RIC · HARD · SON | trivia | 3 |
| Series 2's Joe, a razor brand | WILKINSON | WIL · KIN · SON | wordplay | 4 |
| Al, the Pub Landlord in series 3 | MURRAY | MUR · RAY | trivia | 4 |
| Paul, series 3 stand-up | CHOWDHRY | CHOW · DHRY | trivia | 3 |
| Lolly of series 4 | ADEFOPE | ADE · FO · PE | trivia | 3 |
| Hugh of series 4, Mock the Week | DENNIS | DEN · NIS | trivia | 3 |

**Tile pool (17: 2 x 2-letter, 12 x 3-letter, 3 x 4-letter):** ADE ATY CHOW CON DEN DHRY FO HARD KIN MUR NIS PE RAY RIC SON SON WIL

**Score:** decoys 0.7/20 + tempting pairs 0.0/16 + shared fragments 3.8/10 + anchor balance 6.4/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -12.0 = **structure 22.0/80** (scaled 13.8/50); clue rating 11.8/30 + variety 4.0/8 + puns 3.0/12 + penalties 0.0 = **clues 18.8/50**

- Decoys (1): FORAY
- Duplicate tiles: SON; near-twin tiles: CON/SON
- Giveaway tiles (share of the answer's family): CHOW (1.0), DHRY (1.0); whole-word tiles: HARD
- Answers whose first tile has no rival continuation: RICHARDSON, WILKINSON, MURRAY, CHOWDHRY, ADEFOPE, DENNIS
- Word frequency (zipf): CONATY 1.34, RICHARDSON 3.91, WILKINSON 3.53, MURRAY 4.27, CHOWDHRY 1.45, ADEFOPE 0.0, DENNIS 4.1

**Critique:** Fandom trivia round.

## Round 209 [themed]: Star Trek: Catchphrases  (total 32.0, candidate B06)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Picard's one-word go | ENGAGE | ENG · AGE | trivia | 3 |
| Picard's order to proceed | MAKEITSO | MAK · EIT · SO | trivia | 3 |
| Resistance is ___ | FUTILE | FUT · ILE | trivia | 3 |
| What the Borg do to you | ASSIMILATE | ASSI · MIL · ATE | trivia | 3 |
| Spock's highest praise | LOGICAL | LOG · ICAL | trivia | 3 |
| Bones's opener, before 'I'm a doctor' | DAMMITJIM | DAM · MIT · JIM | trivia | 5 |
| Picard's nickname for Riker | NUMBERONE | NUM · BER · ONE | trivia | 4 |

**Tile pool (18: 1 x 2-letter, 15 x 3-letter, 2 x 4-letter):** AGE ASSI ATE BER DAM EIT ENG FUT ICAL ILE JIM LOG MAK MIL MIT NUM ONE SO

**Score:** decoys 3.3/20 + tempting pairs 0.0/16 + shared fragments 3.8/10 + anchor balance 6.7/8 + shape 11.0/12 + word appeal 14.0/14 + penalties -9.9 = **structure 28.9/80** (scaled 18.1/50); clue rating 13.9/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 13.9/50**

- Decoys (3): DAMAGE, SOBER, NUMBER*
- Duplicate tiles: none; near-twin tiles: AGE/ATE, EIT/MIT, MIL/MIT
- Giveaway tiles (share of the answer's family): JIM (0.58), NUM (0.644); whole-word tiles: none
- Answers whose first tile has no rival continuation: ENGAGE, MAKEITSO, FUTILE, ASSIMILATE, LOGICAL, NUMBERONE
- Word frequency (zipf): ENGAGE 4.36, MAKEITSO 0.0, FUTILE 3.39, ASSIMILATE 3.05, LOGICAL 4.14, DAMMITJIM 0.0, NUMBERONE 1.14

**Critique:** Fandom trivia round.

## Round 210 [themed]: They Might Be Giants: Songbook II  (total 31.6, candidate C02)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Not Constantinople | ISTANBUL | IS · TAN · BUL | trivia | 4 |
| Flood single with a dance in it | TWISTING | TWIS · TING | trivia | 3 |
| Purple hairpiece of song | TOUPEE | TOU · PEE | trivia | 4 |
| ___ Rock, a one-eyed tune | CYCLOPS | CYC · LOPS | trivia | 4 |
| ___ With Teeth, a biting tool | SHOEHORN | SHO · EH · ORN | trivia | 4 |
| Downpour of number twos, in song | PENCILRAIN | PEN · CIL · RAIN | trivia | 4 |
| Song with ears on loan | HEARINGAID | HEA · RING · AID | trivia | 3 |

**Tile pool (18: 2 x 2-letter, 11 x 3-letter, 5 x 4-letter):** AID BUL CIL CYC EH HEA IS LOPS ORN PEE PEN RAIN RING SHO TAN TING TOU TWIS

**Score:** decoys 5.3/20 + tempting pairs 0.4/16 + shared fragments 2.5/10 + anchor balance 6.7/8 + shape 8.2/12 + word appeal 14.0/14 + penalties -15.6 = **structure 21.5/80** (scaled 13.4/50); clue rating 18.2/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 18.2/50**

- Decoys (5): HEATING, TOURING, PEERING, HEARING*, PENCIL*
- Duplicate tiles: none; near-twin tiles: PEE/PEN, RING/TING
- Giveaway tiles (share of the answer's family): BUL (0.508), TWIS (1.0); whole-word tiles: RAIN
- Answers whose first tile has no rival continuation: ISTANBUL, TWISTING, TOUPEE, CYCLOPS, SHOEHORN, PENCILRAIN, HEARINGAID
- Word frequency (zipf): ISTANBUL 3.74, TWISTING 3.47, TOUPEE 2.22, CYCLOPS 3.11, SHOEHORN 2.15, PENCILRAIN 0.0, HEARINGAID 0.0

**Critique:** Fandom trivia round.

## Round 211 [mixed]: Long Haul  (total 31.6, candidate G08)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Enormously awful | MONSTROUS | MON · STRO · US | definition | 3 |
| Open to two readings | AMBIGUOUS | AMB · IGU · OUS | definition | 3 |
| Catching, like a yawn | CONTAGIOUS | CON · TAG · IOUS | evocative | 4 |
| Everywhere at once | UBIQUITOUS | UBI · QUI · TOUS | definition | 3 |
| Analysis ___, overthinking's cost | PARALYSIS | PAR · ALY · SIS | trivia | 4 |
| Side-splitting | HILARIOUS | HIL · ARI · OUS | definition | 3 |
| One of seven big landmasses | CONTINENT | CON · TIN · ENT | definition | 2 |

**Tile pool (21: 1 x 2-letter, 17 x 3-letter, 3 x 4-letter):** ALY AMB ARI CON CON ENT HIL IGU IOUS MON OUS OUS PAR QUI SIS STRO TAG TIN TOUS UBI US

**Score:** decoys 1.7/20 + tempting pairs 0.8/16 + shared fragments 7.5/10 + anchor balance 7.1/8 + shape 9.0/12 + word appeal 7.1/14 + penalties -7.6 = **structure 25.6/80** (scaled 16.0/50); clue rating 9.6/30 + variety 8.0/8 + puns 0.0/12 + penalties -2.0 = **clues 15.6/50**

- Decoys (1): PARENT
- Duplicate tiles: CON, OUS; near-twin tiles: CON/MON, IOUS/TOUS
- Giveaway tiles (share of the answer's family): TOUS (0.44), UBI (0.569); whole-word tiles: none
- Answers whose first tile has no rival continuation: MONSTROUS, AMBIGUOUS, UBIQUITOUS, HILARIOUS
- Word frequency (zipf): MONSTROUS 3.41, AMBIGUOUS 3.57, CONTAGIOUS 3.58, UBIQUITOUS 3.42, PARALYSIS 3.48, HILARIOUS 4.27, CONTINENT 4.07

**Critique:** Long-word general round.

## Round 212 [mixed]: Long Haul  (total 31.6, candidate G14)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Nameless, like a tipster | ANONYMOUS | ANO · NY · MOUS | definition | 3 |
| Three-sided, like a sandwich | TRIANGULAR | TRI · ANG · ULAR | evocative | 3 |
| Make blush | EMBARRASS | EMB · ARR · ASS | definition | 3 |
| ___ Dogs, or a water store | RESERVOIR | RES · ERVO · IR | wordplay | 4 |
| Toxic | POISONOUS | POI · SON · OUS | definition | 2 |
| Bumpy, like a flight | TURBULENT | TUR · BUL · ENT | definition | 3 |
| ___ of Broken Dreams | BOULEVARD | BOU · LEV · ARD | trivia | 4 |

**Tile pool (21: 2 x 2-letter, 16 x 3-letter, 3 x 4-letter):** ANG ANO ARD ARR ASS BOU BUL EMB ENT ERVO IR LEV MOUS NY OUS POI RES SON TRI TUR ULAR

**Score:** decoys 5.2/20 + tempting pairs 1.6/16 + shared fragments 2.5/10 + anchor balance 7.4/8 + shape 9.0/12 + word appeal 7.1/14 + penalties -12.0 = **structure 20.8/80** (scaled 13.0/50); clue rating 9.6/30 + variety 8.0/8 + puns 3.0/12 + penalties -2.0 = **clues 18.6/50**

- Decoys (6): SONNY, RESENT, ARDENT, ASSENT, POISON*, ANGULAR*
- Duplicate tiles: none; near-twin tiles: ANG/ANO, ARD/ARR
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: ANONYMOUS, TRIANGULAR, EMBARRASS, POISONOUS, TURBULENT, BOULEVARD
- Word frequency (zipf): ANONYMOUS 4.17, TRIANGULAR 3.42, EMBARRASS 3.41, RESERVOIR 3.9, POISONOUS 3.57, TURBULENT 3.47, BOULEVARD 3.7

**Critique:** Long-word general round.

## Round 213 [themed]: Project Hail Mary: Shipboard  (total 31.2, candidate F03)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Door between ship and void | AIRLOCK | AIRL · OCK | definition | 3 |
| Grace's state for the trip | COMATOSE | COM · AT · OSE | trivia | 3 |
| Bedside helper that fed him | ROBOTARM | ROB · OT · ARM | trivia | 4 |
| Taumoeba in jars, e.g. | SAMPLES | SAM · PLES | definition | 3 |
| Mid-deck room for experiments | LABORATORY | LAB · ORAT · ORY | trivia | 3 |
| Bunk deck where he woke | DORMITORY | DOR · MIT · ORY | trivia | 4 |
| Control room, up top | COCKPIT | COCK · PIT | trivia | 3 |

**Tile pool (18: 2 x 2-letter, 12 x 3-letter, 4 x 4-letter):** AIRL ARM AT COCK COM DOR LAB MIT OCK ORAT ORY ORY OSE OT PIT PLES ROB SAM

**Score:** decoys 4.3/20 + tempting pairs 0.8/16 + shared fragments 3.8/10 + anchor balance 6.7/8 + shape 9.3/12 + word appeal 14.0/14 + penalties -14.3 = **structure 24.6/80** (scaled 15.4/50); clue rating 11.8/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 15.8/50**

- Decoys (5): COMMIT, ARMORY, ARMPIT, ROBOT*, ORATORY*
- Duplicate tiles: ORY; near-twin tiles: MIT/PIT
- Giveaway tiles (share of the answer's family): SAM (0.79); whole-word tiles: COCK
- Answers whose first tile has no rival continuation: AIRLOCK, ROBOTARM, SAMPLES, LABORATORY, DORMITORY, COCKPIT
- Word frequency (zipf): AIRLOCK 2.63, COMATOSE 2.81, ROBOTARM 0.0, SAMPLES 4.34, LABORATORY 4.31, DORMITORY 3.12, COCKPIT 3.6

**Critique:** Fandom trivia round.

## Round 214 [themed]: The Good Place: Afterlife Admin  (total 31.0, candidate E03)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Point-tallier in the back office | ACCOUNTANT | ACCO · UNT · ANT | trivia | 4 |
| Where the torture happens, officially | BADPLACE | BAD · PLA · CE | trivia | 3 |
| Jeremy Bearimy, technically | TIMELINE | TIM · ELI · NE | trivia | 4 |
| How long paradise lasts, in theory | ETERNITY | ET · ERN · ITY | trivia | 3 |
| Jeremy ___, afterlife time | BEARIMY | BEAR · IMY | trivia | 5 |
| Problem Michael made literal | TROLLEY | TROL · LEY | trivia | 4 |
| ___ Place, Mindy's limbo | MEDIUM | MED · IUM | trivia | 4 |

**Tile pool (18: 3 x 2-letter, 12 x 3-letter, 3 x 4-letter):** ACCO ANT BAD BEAR CE ELI ERN ET IMY ITY IUM LEY MED NE PLA TIM TROL UNT

**Score:** decoys 3.0/20 + tempting pairs 0.4/16 + shared fragments 1.2/10 + anchor balance 6.7/8 + shape 9.3/12 + word appeal 14.0/14 + penalties -17.7 = **structure 17.0/80** (scaled 10.6/50); clue rating 20.4/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 20.4/50**

- Decoys (4): PLANE, MEDLEY, PLACE*, ACCOUNT*
- Duplicate tiles: none; near-twin tiles: IMY/ITY
- Giveaway tiles (share of the answer's family): IMY (0.477), TROL (0.555); whole-word tiles: BEAR
- Answers whose first tile has no rival continuation: ACCOUNTANT, BADPLACE, TIMELINE, ETERNITY, BEARIMY, TROLLEY, MEDIUM
- Word frequency (zipf): ACCOUNTANT 3.76, BADPLACE 0.0, TIMELINE 4.15, ETERNITY 3.8, BEARIMY 0.0, TROLLEY 3.44, MEDIUM 4.61

**Critique:** Fandom trivia round.

## Round 215 [mixed]: Long Haul  (total 31.0, candidate G15)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Mocking with a point | SATIRICAL | SAT · IRI · CAL | definition | 3 |
| Thriving financially | PROSPEROUS | PRO · SPE · ROUS | definition | 2 |
| Party game of whispered errors | TELEPHONE | TEL · EPH · ONE | wordplay | 4 |
| Preacher sent abroad | MISSIONARY | MIS · SION · ARY | definition | 3 |
| Penicillin, e.g. | ANTIBIOTIC | ANT · IBI · OTIC | definition | 3 |
| Over-dramatic | THEATRICAL | THE · ATRI · CAL | definition | 3 |
| Baby's first picture | ULTRASOUND | ULT · RAS · OUND | evocative | 4 |

**Tile pool (21: 16 x 3-letter, 5 x 4-letter):** ANT ARY ATRI CAL CAL EPH IBI IRI MIS ONE OTIC OUND PRO RAS ROUS SAT SION SPE TEL THE ULT

**Score:** decoys 2.5/20 + tempting pairs 0.4/16 + shared fragments 3.8/10 + anchor balance 7.3/8 + shape 9.0/12 + word appeal 7.4/14 + penalties -10.4 = **structure 19.9/80** (scaled 12.4/50); clue rating 9.6/30 + variety 8.0/8 + puns 3.0/12 + penalties -2.0 = **clues 18.6/50**

- Decoys (3): RASCAL, ONEROUS, MISSION*
- Duplicate tiles: CAL; near-twin tiles: IBI/IRI
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: SATIRICAL, TELEPHONE, MISSIONARY, ANTIBIOTIC, THEATRICAL, ULTRASOUND
- Word frequency (zipf): SATIRICAL 3.36, PROSPEROUS 3.6, TELEPHONE 4.41, MISSIONARY 3.83, ANTIBIOTIC 3.5, THEATRICAL 3.68, ULTRASOUND 3.51

**Critique:** Long-word general round.

## Round 216 [themed]: Taskmaster: Series 15-19  (total 30.9, candidate A04)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Ivo of series 15, posh and anxious | GRAHAM | GRA · HAM | trivia | 3 |
| Lucy of series 16, Hull's dry wit | BEAUMONT | BEA · UM · ONT | trivia | 3 |
| Julian, series 16's camp icon | CLARY | CLA · RY | trivia | 4 |
| Sue, ex-Bake Off host in series 16 | PERKINS | PER · KINS | trivia | 4 |
| Susan of series 16, Chewing Gum star | WOKOMA | WOK · OMA | trivia | 3 |
| Nick of series 17, Ted Lasso's Nate | MOHAMMED | MO · HAM · MED | trivia | 4 |
| Steve of series 17, League of Gentlemen | PEMBERTON | PEM · BER · TON | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 13 x 3-letter, 1 x 4-letter):** BEA BER CLA GRA HAM HAM KINS MED MO OMA ONT PEM PER RY TON UM WOK

**Score:** decoys 3.2/20 + tempting pairs 0.8/16 + shared fragments 6.2/10 + anchor balance 6.7/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -17.3 = **structure 23.6/80** (scaled 14.8/50); clue rating 16.1/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 16.1/50**

- Decoys (3): BERRY, HAMPER, BEAMED
- Duplicate tiles: HAM; near-twin tiles: BEA/BER, BER/PER, PEM/PER
- Giveaway tiles (share of the answer's family): HAM (0.506), PEM (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: GRAHAM, BEAUMONT, CLARY, PERKINS, WOKOMA, MOHAMMED, PEMBERTON
- Word frequency (zipf): GRAHAM 4.3, BEAUMONT 3.31, CLARY 2.78, PERKINS 3.65, WOKOMA 0.0, MOHAMMED 3.75, PEMBERTON 2.9

**Critique:** Fandom trivia round.

## Round 217 [themed]: They Might Be Giants: On Screen  (total 30.3, candidate C04)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Middle child; theme: Boss of Me | MALCOLM | MAL · COLM | trivia | 4 |
| Button-eyed film they wrote songs for | CORALINE | COR · AL · INE | trivia | 4 |
| 2002 band documentary | GIGANTIC | GIG · AN · TIC | trivia | 4 |
| ___ Heroes, a Disney theme job | HIGGLYTOWN | HIG · GLY · TOWN | trivia | 4 |
| Mickey Mouse ___ | CLUBHOUSE | CLUB · HOU · SE | trivia | 3 |
| ___ Runner, a web-toon collaborator | HOMESTAR | HOME · STAR | trivia | 4 |
| Austin Powers villain who got a song | DREVIL | DRE · VIL | trivia | 4 |

**Tile pool (18: 3 x 2-letter, 10 x 3-letter, 5 x 4-letter):** AL AN CLUB COLM COR DRE GIG GLY HIG HOME HOU INE MAL SE STAR TIC TOWN VIL

**Score:** decoys 6.1/20 + tempting pairs 1.2/16 + shared fragments 1.2/10 + anchor balance 6.8/8 + shape 7.1/12 + word appeal 14.0/14 + penalties -20.7 = **structure 15.8/80** (scaled 9.9/50); clue rating 20.4/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 20.4/50**

- Decoys (8): SEAL, ANAL, HOMETOWN, CORTICAL, TOWNHOUSE, ANVIL, HOUSE*, CORAL*
- Duplicate tiles: none; near-twin tiles: GIG/HIG
- Giveaway tiles (share of the answer's family): COLM (1.0); whole-word tiles: CLUB, HOME, STAR, TOWN
- Answers whose first tile has no rival continuation: MALCOLM, CORALINE, GIGANTIC, HIGGLYTOWN, CLUBHOUSE, HOMESTAR, DREVIL
- Word frequency (zipf): MALCOLM 4.01, CORALINE 2.37, GIGANTIC 3.63, HIGGLYTOWN 0.0, CLUBHOUSE 3.41, HOMESTAR 1.59, DREVIL 0.0

**Critique:** Fandom trivia round.

## Round 218 [themed]: Project Hail Mary: Page to Screen  (total 30.1, candidate F06)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Directing duo, as one | LORDMILLER | LORD · MIL · LER | trivia | 4 |
| Star of Weir's first film adaptation | MATTDAMON | MATT · DAM · ON | trivia | 4 |
| The ___, Weir's breakout | MARTIAN | MAR · TI · AN | trivia | 3 |
| Weir's moon-city heist novel | ARTEMIS | ARTE · MIS | trivia | 4 |
| Sandra, the film's Stratt | HULLER | HUL · LER | trivia | 4 |
| Weir's potato-growing hero | WATNEY | WAT · NEY | trivia | 4 |
| How Rocky came to the screen | PUPPET | PUP · PET | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 11 x 3-letter, 3 x 4-letter):** AN ARTE DAM HUL LER LER LORD MAR MATT MIL MIS NEY ON PET PUP TI WAT

**Score:** decoys 0.9/20 + tempting pairs 0.4/16 + shared fragments 3.8/10 + anchor balance 6.8/8 + shape 7.9/12 + word appeal 14.0/14 + penalties -18.3 = **structure 15.5/80** (scaled 9.7/50); clue rating 20.4/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 20.4/50**

- Decoys (3): ANON, ANTI*, MILLER*
- Duplicate tiles: LER; near-twin tiles: MIL/MIS
- Giveaway tiles (share of the answer's family): HUL (1.0); whole-word tiles: LORD, MATT
- Answers whose first tile has no rival continuation: LORDMILLER, MATTDAMON, MARTIAN, ARTEMIS, HULLER, WATNEY, PUPPET
- Word frequency (zipf): LORDMILLER 0.0, MATTDAMON 0.0, MARTIAN 3.39, ARTEMIS 3.05, HULLER 1.28, WATNEY 2.19, PUPPET 3.8

**Critique:** Fandom trivia round.

## Round 219 [themed]: Cosmere: Nalthis and Sel  (total 30.0, candidate D07)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Kingdom with Elantris at its heart | ARELON | ARE · LON | trivia | 3 |
| Colorful realm of the Returned | HALLANDREN | HAL · LAN · DREN | trivia | 4 |
| Princess widowed before her wedding | SARENE | SAR · ENE | trivia | 4 |
| One who animates objects with Breath | AWAKENER | AWA · KEN · ER | trivia | 4 |
| Shai's forged seal of a self | SOULSTAMP | SO · ULS · TAMP | trivia | 4 |
| Siri's elder sister | VIVENNA | VIV · ENNA | trivia | 3 |
| Prince who fell into Elantris | RAODEN | RAO · DEN | trivia | 3 |

**Tile pool (17: 2 x 2-letter, 12 x 3-letter, 3 x 4-letter):** ARE AWA DEN DREN ENE ENNA ER HAL KEN LAN LON RAO SAR SO TAMP ULS VIV

**Score:** decoys 1.3/20 + tempting pairs 0.0/16 + shared fragments 2.5/10 + anchor balance 7.0/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -11.8 = **structure 22.2/80** (scaled 13.9/50); clue rating 16.1/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 16.1/50**

- Decoys (3): LONER, SOULS*, AWAKEN*
- Duplicate tiles: none; near-twin tiles: DEN/KEN, LAN/LON
- Giveaway tiles (share of the answer's family): RAO (0.548); whole-word tiles: none
- Answers whose first tile has no rival continuation: ARELON, HALLANDREN, SARENE, AWAKENER, SOULSTAMP, VIVENNA, RAODEN
- Word frequency (zipf): ARELON 0.0, HALLANDREN 0.0, SARENE 0.0, AWAKENER 1.31, SOULSTAMP 0.0, VIVENNA 0.0, RAODEN 0.0

**Critique:** Fandom trivia round.

## Round 220 [themed]: Star Trek: Species  (total 29.8, candidate B02)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Snouted, argumentative Federation founders | TELLARITE | TEL · LAR · ITE | trivia | 4 |
| Troi's telepathic people | BETAZOID | BET · AZ · OID | trivia | 3 |
| Blue antennae-bearers like Shran | ANDORIAN | AND · ORI · AN | trivia | 4 |
| Spock's father's people | VULCAN | VUL · CAN | trivia | 3 |
| Delta Quadrant big-game hunters | HIROGEN | HIR · OGEN | trivia | 4 |
| Odo's shape-shifting kind | CHANGELING | CHAN · GEL · ING | trivia | 3 |
| Cloaked cousins of the logical ones | ROMULAN | ROM · ULAN | trivia | 3 |

**Tile pool (18: 2 x 2-letter, 13 x 3-letter, 3 x 4-letter):** AN AND AZ BET CAN CHAN GEL HIR ING ITE LAR OGEN OID ORI ROM TEL ULAN VUL

**Score:** decoys 4.0/20 + tempting pairs 1.6/16 + shared fragments 1.2/10 + anchor balance 7.2/8 + shape 10.4/12 + word appeal 14.0/14 + penalties -13.1 = **structure 25.4/80** (scaled 15.9/50); clue rating 13.9/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 13.9/50**

- Decoys (3): ROMAN, ANGEL, HIRING
- Duplicate tiles: none; near-twin tiles: GEL/TEL
- Giveaway tiles (share of the answer's family): CHAN (0.405), ULAN (0.567); whole-word tiles: none
- Answers whose first tile has no rival continuation: TELLARITE, BETAZOID, ANDORIAN, VULCAN, HIROGEN, CHANGELING
- Word frequency (zipf): TELLARITE 0.0, BETAZOID 1.15, ANDORIAN 1.53, VULCAN 3.27, HIROGEN 1.33, CHANGELING 2.58, ROMULAN 2.43

**Critique:** Fandom trivia round.

## Round 221 [themed]: They Might Be Giants: Albums  (total 29.6, candidate C01)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| ___ 18, home of Fingertips | APOLLO | APOL · LO | trivia | 3 |
| 2001 album, a furry auto | MINKCAR | MINK · CAR | trivia | 4 |
| The ___, 2004 backbone of an album | SPINE | SPI · NE | trivia | 4 |
| 2018 album, dial up the energy | PHONEPOWER | PHO · NEP · OWER | trivia | 4 |
| Factory ___, 1996 | SHOWROOM | SHO · WRO · OM | trivia | 4 |
| 2011 album, an open invitation | JOINUS | JOI · NUS | trivia | 4 |
| The ___, 2018's sci-fi concept | ESCAPETEAM | ESCA · PET · EAM | trivia | 3 |

**Tile pool (17: 3 x 2-letter, 10 x 3-letter, 4 x 4-letter):** APOL CAR EAM ESCA JOI LO MINK NE NEP NUS OM OWER PET PHO SHO SPI WRO

**Score:** decoys 4.3/20 + tempting pairs 1.2/16 + shared fragments 1.2/10 + anchor balance 6.5/8 + shape 6.8/12 + word appeal 14.0/14 + penalties -15.9 = **structure 18.2/80** (scaled 11.4/50); clue rating 18.2/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 18.2/50**

- Decoys (5): PHONE, CARPET, LONE, LOOM, SHONE
- Duplicate tiles: none; near-twin tiles: PHO/SHO
- Giveaway tiles (share of the answer's family): ESCA (0.678), MINK (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: APOLLO, MINKCAR, SPINE, PHONEPOWER, SHOWROOM, JOINUS, ESCAPETEAM
- Word frequency (zipf): APOLLO 3.82, MINKCAR 0.0, SPINE 3.93, PHONEPOWER 0.0, SHOWROOM 3.14, JOINUS 0.0, ESCAPETEAM 0.0

**Critique:** Fandom trivia round.

## Round 222 [themed]: Taskmaster: Series 10-14  (total 29.5, candidate A03)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Katherine, The IT Crowd's Jen, series 10 | PARKINSON | PAR · KIN · SON | trivia | 4 |
| Daisy May of series 10, This Country | COOPER | COO · PER | trivia | 4 |
| Charlotte of series 11, haunted by Ghosts | RITCHIE | RIT · CHIE | trivia | 4 |
| Jamali, series 11's horizontal chiller | MADDIX | MAD · DIX | trivia | 3 |
| Chris of series 13, Geordie charmer | RAMSEY | RAM · SEY | trivia | 3 |
| Sarah of series 14, South Shields' finest | MILLICAN | MIL · LIC · AN | trivia | 4 |
| Munya, series 14's sketch satirist | CHAWAWA | CHA · WA · WA | trivia | 3 |

**Tile pool (17: 3 x 2-letter, 13 x 3-letter, 1 x 4-letter):** AN CHA CHIE COO DIX KIN LIC MAD MIL PAR PER RAM RIT SEY SON WA WA

**Score:** decoys 1.7/20 + tempting pairs 0.8/16 + shared fragments 3.8/10 + anchor balance 6.6/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -15.3 = **structure 21.5/80** (scaled 13.4/50); clue rating 16.1/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 16.1/50**

- Decoys (1): PERSON
- Duplicate tiles: WA; near-twin tiles: PAR/PER
- Giveaway tiles (share of the answer's family): CHIE (0.51), WA (0.501); whole-word tiles: none
- Answers whose first tile has no rival continuation: COOPER, RITCHIE, MADDIX, RAMSEY, MILLICAN
- Word frequency (zipf): PARKINSON 3.21, COOPER 4.26, RITCHIE 3.37, MADDIX 0.0, RAMSEY 3.69, MILLICAN 2.12, CHAWAWA 0.0

**Critique:** Fandom trivia round.

## Round 223 [themed]: Project Hail Mary: Grace's Story  (total 29.5, candidate F05)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Grace's old career | BIOLOGIST | BIO · LOG · IST | trivia | 3 |
| Kind of biologist Grace was | MOLECULAR | MOL · ECU · LAR | trivia | 3 |
| What Grace learns he was | COWARD | COW · ARD | trivia | 5 |
| Kids Grace taught, then and after | STUDENTS | STUD · ENTS | trivia | 4 |
| Returns in flashbacks | MEMORY | MEM · ORY | trivia | 3 |
| Turning back for Rocky | SACRIFICE | SAC · RIF · ICE | trivia | 4 |
| Life, in his ridiculed thesis | WATERLESS | WAT · ERL · ESS | trivia | 4 |

**Tile pool (18: 16 x 3-letter, 2 x 4-letter):** ARD BIO COW ECU ENTS ERL ESS ICE IST LAR LOG MEM MOL ORY RIF SAC STUD WAT

**Score:** decoys 1.0/20 + tempting pairs 0.0/16 + shared fragments 0.0/10 + anchor balance 2.2/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -9.1 = **structure 18.1/80** (scaled 11.3/50); clue rating 18.2/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 18.2/50**

- Decoys (1): COWARDICE
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): COW (0.415), MOL (0.424), SAC (0.434), WAT (0.474); whole-word tiles: none
- Answers whose first tile has no rival continuation: BIOLOGIST, MOLECULAR, COWARD, STUDENTS, MEMORY, SACRIFICE, WATERLESS
- Word frequency (zipf): BIOLOGIST 3.35, MOLECULAR 4.11, COWARD 3.67, STUDENTS 5.25, MEMORY 4.81, SACRIFICE 4.29, WATERLESS 2.18

**Critique:** Fandom trivia round.

## Round 224 [themed]: Cosmere: On the Shelf  (total 29.4, candidate D08)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Lift's novella, and her order | EDGEDANCER | EDGE · DAN · CER | trivia | 4 |
| Graphic novel of Taldain's masters | WHITESAND | WHI · TES · AND | trivia | 4 |
| Nomad's sunrise-dodging novel | SUNLITMAN | SUN · LIT · MAN | trivia | 4 |
| Words of ___ | RADIANCE | RADI · ANCE | trivia | 3 |
| Brandon, architect of it all | SANDERSON | SAN · DER · SON | trivia | 3 |
| The author, on a first-name basis | BRANDON | BRAN · DON | trivia | 2 |
| ___ of Self | SHADOWS | SHA · DOWS | trivia | 3 |

**Tile pool (18: 13 x 3-letter, 5 x 4-letter):** ANCE AND BRAN CER DAN DER DON DOWS EDGE LIT MAN RADI SAN SHA SON SUN TES WHI

**Score:** decoys 2.3/20 + tempting pairs 0.0/16 + shared fragments 10.0/10 + anchor balance 7.0/8 + shape 10.4/12 + word appeal 14.0/14 + penalties -12.3 = **structure 31.4/80** (scaled 19.6/50); clue rating 11.8/30 + variety 0.0/8 + puns 0.0/12 + penalties -2.0 = **clues 9.8/50**

- Decoys (4): SHAMAN, WHITES*, DANCER*, SANDER*
- Duplicate tiles: none; near-twin tiles: CER/DER, DAN/DON, DAN/MAN, DAN/SAN, DON/SON, MAN/SAN, SAN/SUN, SON/SUN
- Giveaway tiles (share of the answer's family): BRAN (0.558); whole-word tiles: EDGE
- Answers whose first tile has no rival continuation: EDGEDANCER, WHITESAND, SUNLITMAN, RADIANCE, SANDERSON, BRANDON, SHADOWS
- Word frequency (zipf): EDGEDANCER 0.0, WHITESAND 0.0, SUNLITMAN 0.0, RADIANCE 3.04, SANDERSON 3.27, BRANDON 4.01, SHADOWS 4.06

**Critique:** Fandom trivia round.

## Round 225 [mixed]: Long Haul  (total 29.3, candidate G12)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Collected works, bound together | ANTHOLOGY | ANT · HOL · OGY | definition | 3 |
| Handbag, or crime helper | ACCESSORY | AC · CESS · ORY | wordplay | 4 |
| Cleverly inventive | INGENIOUS | ING · ENI · OUS | definition | 2 |
| Animal-doctoring adjective | VETERINARY | VET · ERI · NARY | definition | 3 |
| One who brings the suit | PLAINTIFF | PLA · INT · IFF | pun | 3 |
| Math-class gadget | CALCULATOR | CAL · CULA · TOR | definition | 2 |
| Blue-green gem | TURQUOISE | TUR · QUO · ISE | definition | 3 |

**Tile pool (21: 1 x 2-letter, 17 x 3-letter, 3 x 4-letter):** AC ANT CAL CESS CULA ENI ERI HOL IFF ING INT ISE NARY OGY ORY OUS PLA QUO TOR TUR VET

**Score:** decoys 3.7/20 + tempting pairs 2.4/16 + shared fragments 6.2/10 + anchor balance 7.2/8 + shape 9.0/12 + word appeal 6.6/14 + penalties -12.9 = **structure 22.3/80** (scaled 13.9/50); clue rating 5.4/30 + variety 8.0/8 + puns 6.0/12 + penalties -4.0 = **clues 15.4/50**

- Decoys (4): ACTOR, ACCESSING, TORTURING, ACCESS*
- Duplicate tiles: none; near-twin tiles: ANT/INT, ENI/ERI, ING/INT, OGY/ORY, TOR/TUR
- Giveaway tiles (share of the answer's family): VET (0.683); whole-word tiles: none
- Answers whose first tile has no rival continuation: ANTHOLOGY, ACCESSORY, INGENIOUS, VETERINARY, PLAINTIFF, CALCULATOR, TURQUOISE
- Word frequency (zipf): ANTHOLOGY 3.48, ACCESSORY 3.63, INGENIOUS 3.35, VETERINARY 3.75, PLAINTIFF 3.55, CALCULATOR 3.56, TURQUOISE 3.33

**Critique:** Long-word general round.

## Round 226 [themed]: Taskmaster: The House Rules  (total 28.6, candidate A06)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Where tasks get judged, not done | STUDIO | STU · DIO | definition | 3 |
| West London home of the task house | CHISWICK | CHIS · WICK | trivia | 4 |
| Greg's golden head, for one | TROPHY | TRO · PHY | trivia | 3 |
| Extra point for flair | BONUS | BON · US | definition | 3 |
| Alex's verdict on rule-benders | DISQUALIFY | DIS · QUAL · IFY | definition | 4 |
| Mobile home parked for tasks | CARAVAN | CAR · AV · AN | definition | 3 |
| Greg's arbitrary scoring call | JUDGEMENT | JUD · GEM · ENT | definition | 3 |

**Tile pool (17: 3 x 2-letter, 11 x 3-letter, 3 x 4-letter):** AN AV BON CAR CHIS DIO DIS ENT GEM IFY JUD PHY QUAL STU TRO US WICK

**Score:** decoys 3.2/20 + tempting pairs 0.4/16 + shared fragments 1.2/10 + anchor balance 6.7/8 + shape 7.9/12 + word appeal 14.0/14 + penalties -13.0 = **structure 20.4/80** (scaled 12.8/50); clue rating 11.8/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 15.8/50**

- Decoys (3): CARBON, CARDIO, QUALIFY*
- Duplicate tiles: none; near-twin tiles: DIO/DIS
- Giveaway tiles (share of the answer's family): JUD (0.524), WICK (0.549); whole-word tiles: none
- Answers whose first tile has no rival continuation: STUDIO, CHISWICK, TROPHY, BONUS, JUDGEMENT
- Word frequency (zipf): STUDIO 4.66, CHISWICK 2.59, TROPHY 4.17, BONUS 4.45, DISQUALIFY 2.94, CARAVAN 3.62, JUDGEMENT 3.86

**Critique:** Fandom trivia round.

## Round 227 [themed]: Cosmere: Bridge Four and Friends  (total 28.5, candidate D04)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Kaladin's order of Radiants | WINDRUNNER | WIN · DRUN · NER | trivia | 3 |
| Gavilar's son, an unlucky king | ELHOKAR | EL · HOK · AR | trivia | 3 |
| Dalinar's son, a secret Truthwatcher | RENARIN | RENA · RIN | trivia | 4 |
| Syl, in full | SYLPHRENA | SYL · PHRE · NA | trivia | 4 |
| Atheist princess and Elsecaller | JASNAH | JAS · NAH | trivia | 4 |
| Ardent bearing poisoned bread | KABSAL | KAB · SAL | trivia | 4 |
| Dalinar's house | KHOLIN | KHO · LIN | trivia | 3 |

**Tile pool (17: 3 x 2-letter, 11 x 3-letter, 3 x 4-letter):** AR DRUN EL HOK JAS KAB KHO LIN NA NAH NER PHRE RENA RIN SAL SYL WIN

**Score:** decoys 1.2/20 + tempting pairs 0.0/16 + shared fragments 5.0/10 + anchor balance 6.5/8 + shape 7.9/12 + word appeal 14.0/14 + penalties -14.7 = **structure 19.9/80** (scaled 12.4/50); clue rating 16.1/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 16.1/50**

- Decoys (2): NASAL, WINNER*
- Duplicate tiles: none; near-twin tiles: LIN/RIN, LIN/WIN, RIN/WIN, SAL/SYL
- Giveaway tiles (share of the answer's family): KAB (0.534), KHO (0.666); whole-word tiles: none
- Answers whose first tile has no rival continuation: WINDRUNNER, ELHOKAR, RENARIN, SYLPHRENA, JASNAH, KABSAL, KHOLIN
- Word frequency (zipf): WINDRUNNER 1.71, ELHOKAR 0.0, RENARIN 0.0, SYLPHRENA 0.0, JASNAH 0.0, KABSAL 0.0, KHOLIN 1.23

**Critique:** Fandom trivia round.

## Round 228 [mixed]: Long Haul  (total 28.5, candidate G07)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Inexplicably wonderful | MIRACULOUS | MIR · ACUL · OUS | definition | 2 |
| Branch office for family trees | GENEALOGY | GEN · EAL · OGY | pun | 4 |
| School sick bay | INFIRMARY | IN · FIR · MARY | definition | 3 |
| Full of beans | ENERGETIC | EN · ERG · ETIC | definition | 3 |
| Class with maps and capitals | GEOGRAPHY | GEO · GRA · PHY | definition | 3 |
| Coffin nail, slangily | CIGARETTE | CI · GAR · ETTE | definition | 3 |
| Counter-intelligence for pills | PHARMACIST | PHAR · MAC · IST | pun | 5 |

**Tile pool (21: 3 x 2-letter, 13 x 3-letter, 5 x 4-letter):** ACUL CI EAL EN ERG ETIC ETTE FIR GAR GEN GEO GRA IN IST MAC MARY MIR OGY OUS PHAR PHY

**Score:** decoys 4.9/20 + tempting pairs 1.2/16 + shared fragments 2.5/10 + anchor balance 6.8/8 + shape 6.4/12 + word appeal 6.1/14 + penalties -13.9 = **structure 13.9/80** (scaled 8.7/50); clue rating 11.8/30 + variety 4.0/8 + puns 6.0/12 + penalties -2.0 = **clues 19.8/50**

- Decoys (4): GENETIC, GRAIN, GRACIOUS, CIGAR*
- Duplicate tiles: none; near-twin tiles: FIR/MIR, GEN/GEO
- Giveaway tiles (share of the answer's family): PHAR (0.895); whole-word tiles: none
- Answers whose first tile has no rival continuation: MIRACULOUS, GENEALOGY, GEOGRAPHY, CIGARETTE, PHARMACIST
- Word frequency (zipf): MIRACULOUS 3.43, GENEALOGY 3.35, INFIRMARY 3.34, ENERGETIC 3.71, GEOGRAPHY 3.98, CIGARETTE 4.06, PHARMACIST 3.34

**Critique:** Long-word general round.

## Round 229 [themed]: The Good Place: Back on Earth  (total 28.3, candidate E08)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Where Chidi lectured in Sydney | UNIVERSITY | UNI · VER · SITY | trivia | 3 |
| Scene of Eleanor's fatal cart pile-up | PARKINGLOT | PAR · KING · LOT | trivia | 4 |
| Eleanor's job, hawking fake meds | SALESWOMAN | SAL · ESWO · MAN | trivia | 4 |
| Where Chidi grew up | SENEGAL | SEN · EGAL | trivia | 3 |
| Eleanor's home state | ARIZONA | ARI · ZO · NA | trivia | 3 |
| Doug Forcett's Canadian base | CALGARY | CAL · GARY | trivia | 4 |
| Tahani's posh stomping ground | LONDON | LON · DON | trivia | 3 |

**Tile pool (18: 2 x 2-letter, 11 x 3-letter, 5 x 4-letter):** ARI CAL DON EGAL ESWO GARY KING LON LOT MAN NA PAR SAL SEN SITY UNI VER ZO

**Score:** decoys 6.2/20 + tempting pairs 0.0/16 + shared fragments 2.5/10 + anchor balance 6.9/8 + shape 7.2/12 + word appeal 14.0/14 + penalties -13.8 = **structure 23.1/80** (scaled 14.4/50); clue rating 13.9/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 13.9/50**

- Decoys (6): UNIVERSAL, PARDON, NASAL, ARISEN, SENNA, PARKING*
- Duplicate tiles: none; near-twin tiles: CAL/SAL, LON/LOT
- Giveaway tiles (share of the answer's family): ESWO (0.466), GARY (0.463); whole-word tiles: none
- Answers whose first tile has no rival continuation: UNIVERSITY, PARKINGLOT, SALESWOMAN, SENEGAL, ARIZONA, CALGARY, LONDON
- Word frequency (zipf): UNIVERSITY 5.39, PARKINGLOT 0.0, SALESWOMAN 2.28, SENEGAL 3.38, ARIZONA 4.38, CALGARY 3.78, LONDON 5.27

**Critique:** Fandom trivia round.

## Round 230 [themed]: The Good Place: Staff and Neighbors  (total 27.9, candidate E01)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Jason's dad, a fellow small-timer | DONKEYDOUG | DON · KEY · DOUG | trivia | 4 |
| Tahani's overachieving sister | KAMILAH | KA · MIL · AH | trivia | 4 |
| Ancient sage in the real paradise | HYPATIA | HYP · ATIA | trivia | 4 |
| The Good Place's paralyzed rulers | COMMITTEE | COM · MIT · TEE | trivia | 4 |
| John, gossip-blogging neighbor | WHEATON | WHE · ATON | trivia | 3 |
| Brent, the entitled neighbor | NORWALK | NOR · WALK | trivia | 3 |
| St. Claire of the Medium Place | MINDY | MIN · DY | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 10 x 3-letter, 4 x 4-letter):** AH ATIA ATON COM DON DOUG DY HYP KA KEY MIL MIN MIT NOR TEE WALK WHE

**Score:** decoys 1.0/20 + tempting pairs 0.0/16 + shared fragments 3.8/10 + anchor balance 6.5/8 + shape 6.8/12 + word appeal 14.0/14 + penalties -16.5 = **structure 15.5/80** (scaled 9.7/50); clue rating 18.2/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 18.2/50**

- Decoys (2): COMMIT*, DONKEY*
- Duplicate tiles: none; near-twin tiles: MIL/MIN, MIL/MIT, MIN/MIT
- Giveaway tiles (share of the answer's family): ATIA (0.612), DOUG (0.582); whole-word tiles: WALK
- Answers whose first tile has no rival continuation: DONKEYDOUG, KAMILAH, HYPATIA, COMMITTEE, WHEATON, NORWALK, MINDY
- Word frequency (zipf): DONKEYDOUG 0.0, KAMILAH 1.5, HYPATIA 2.06, COMMITTEE 5.01, WHEATON 3.02, NORWALK 2.91, MINDY 3.1

**Critique:** Fandom trivia round.

## Round 231 [themed]: Project Hail Mary: Earth Team  (total 27.0, candidate F01)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Grace's crew role: science ___ | SPECIALIST | SPE · CIAL · IST | trivia | 3 |
| What Commander Yao is | TAIKONAUT | TAI · KON · AUT | trivia | 4 |
| What Ilyukhina is | COSMONAUT | COS · MON · AUT | trivia | 3 |
| Russian behind the spin drive | DIMITRI | DIMI · TRI | trivia | 3 |
| Original science lead, lost in a blast | DUBOIS | DUB · OIS | trivia | 3 |
| Norwegian who designed the ship | LOKKEN | LOK · KEN | trivia | 3 |
| Disgraced engineer of the Sahara farm | REDELL | RED · ELL | trivia | 3 |

**Tile pool (17: 15 x 3-letter, 2 x 4-letter):** AUT AUT CIAL COS DIMI DUB ELL IST KEN KON LOK MON OIS RED SPE TAI TRI

**Score:** decoys 0.5/20 + tempting pairs 0.0/16 + shared fragments 6.2/10 + anchor balance 6.1/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -9.1 = **structure 27.8/80** (scaled 17.4/50); clue rating 9.6/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 9.6/50**

- Decoys (1): SPECIAL*
- Duplicate tiles: AUT; near-twin tiles: KEN/KON, KON/MON, TAI/TRI
- Giveaway tiles (share of the answer's family): LOK (1.0), TRI (0.501); whole-word tiles: none
- Answers whose first tile has no rival continuation: SPECIALIST, TAIKONAUT, COSMONAUT, DIMITRI, DUBOIS, LOKKEN, REDELL
- Word frequency (zipf): SPECIALIST 4.28, TAIKONAUT 0.0, COSMONAUT 2.51, DIMITRI 3.11, DUBOIS 3.17, LOKKEN 0.0, REDELL 0.0

**Critique:** Fandom trivia round.

## Round 232 [themed]: Cosmere: The Crew  (total 26.3, candidate D01)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Capital of the Final Empire | LUTHADEL | LU · THA · DEL | trivia | 3 |
| Vin's noble disguise, ___ Renoux | VALETTE | VAL · ETTE | trivia | 4 |
| Steel Ministry bureaucrat-priest | OBLIGATOR | OB · LIG · ATOR | trivia | 4 |
| Rashek's imperial title | LORDRULER | LOR · DRU · LER | trivia | 3 |
| Ham, in full | HAMMOND | HAM · MOND | trivia | 4 |
| Hero of Ages who wasn't | ALENDI | AL · ENDI | trivia | 4 |
| Survivor of Hathsin | KELSIER | KEL · SIER | trivia | 3 |

**Tile pool (17: 3 x 2-letter, 9 x 3-letter, 5 x 4-letter):** AL ATOR DEL DRU ENDI ETTE HAM KEL LER LIG LOR LU MOND OB SIER THA VAL

**Score:** decoys 2.7/20 + tempting pairs 0.4/16 + shared fragments 1.2/10 + anchor balance 7.0/8 + shape 5.6/12 + word appeal 14.0/14 + penalties -14.6 = **structure 16.3/80** (scaled 10.2/50); clue rating 16.1/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 16.1/50**

- Decoys (2): ALMOND, ALLIGATOR
- Duplicate tiles: none; near-twin tiles: DEL/KEL
- Giveaway tiles (share of the answer's family): ENDI (0.506), KEL (0.516); whole-word tiles: none
- Answers whose first tile has no rival continuation: LUTHADEL, VALETTE, OBLIGATOR, LORDRULER, HAMMOND, KELSIER
- Word frequency (zipf): LUTHADEL 0.0, VALETTE 1.68, OBLIGATOR 0.0, LORDRULER 0.0, HAMMOND 3.77, ALENDI 0.0, KELSIER 0.0

**Critique:** Fandom trivia round.

## Round 233 [mixed]: Long Haul  (total 26.2, candidate G19)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| PhD | DOCTORATE | DOC · TOR · ATE | definition | 2 |
| Enigmatic | MYSTERIOUS | MYS · TER · IOUS | definition | 2 |
| Jewish house of worship | SYNAGOGUE | SYN · AGO · GUE | definition | 2 |
| British lawyer | SOLICITOR | SOL · ICI · TOR | definition | 3 |
| Thing a rapper drops | MICROPHONE | MIC · ROPH · ONE | evocative | 4 |
| Man-made, like nylon | SYNTHETIC | SYN · THE · TIC | definition | 3 |
| Forty-day isolation, originally | QUARANTINE | QUAR · ANT · INE | trivia | 4 |

**Tile pool (21: 18 x 3-letter, 3 x 4-letter):** AGO ANT ATE DOC GUE ICI INE IOUS MIC MYS ONE QUAR ROPH SOL SYN SYN TER THE TIC TOR TOR

**Score:** decoys 3.8/20 + tempting pairs 0.0/16 + shared fragments 8.8/10 + anchor balance 7.0/8 + shape 9.0/12 + word appeal 7.5/14 + penalties -6.1 = **structure 30.0/80** (scaled 18.8/50); clue rating 5.4/30 + variety 8.0/8 + puns 0.0/12 + penalties -6.0 = **clues 7.4/50**

- Decoys (3): QUARTER, MYSTIC, DOCTOR*
- Duplicate tiles: SYN, TOR; near-twin tiles: INE/ONE, MIC/TIC, TER/TOR
- Giveaway tiles (share of the answer's family): MIC (0.485); whole-word tiles: none
- Answers whose first tile has no rival continuation: DOCTORATE, SOLICITOR, MICROPHONE, SYNTHETIC
- Word frequency (zipf): DOCTORATE 3.38, MYSTERIOUS 4.17, SYNAGOGUE 3.45, SOLICITOR 3.69, MICROPHONE 3.72, SYNTHETIC 3.95, QUARANTINE 3.64

**Critique:** Long-word general round.

## Round 234 [mixed]: Long Haul  (total 25.0, candidate G18)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Dauntingly impressive | FORMIDABLE | FOR · MIDA · BLE | definition | 3 |
| Crude oil | PETROLEUM | PET · ROL · EUM | definition | 2 |
| Watcher in the stands | SPECTATOR | SPEC · TA · TOR | definition | 3 |
| Pieces a performer knows | REPERTOIRE | REP · ERTO · IRE | definition | 3 |
| Fridge's squeezing part | COMPRESSOR | COMP · RES · SOR | definition | 3 |
| Too early | PREMATURE | PRE · MAT · URE | definition | 2 |
| ___ Housewives | DESPERATE | DES · PER · ATE | trivia | 3 |

**Tile pool (21: 1 x 2-letter, 16 x 3-letter, 4 x 4-letter):** ATE BLE COMP DES ERTO EUM FOR IRE MAT MIDA PER PET PRE REP RES ROL SOR SPEC TA TOR URE

**Score:** decoys 6.9/20 + tempting pairs 1.6/16 + shared fragments 10.0/10 + anchor balance 7.4/8 + shape 9.0/12 + word appeal 7.2/14 + penalties -7.3 = **structure 34.8/80** (scaled 21.8/50); clue rating 3.2/30 + variety 4.0/8 + puns 0.0/12 + penalties -4.0 = **clues 3.2/50**

- Decoys (7): TABLE, DESIRE, FORMAT, TAPER, SORTA, MATURE*, PETROL*
- Duplicate tiles: none; near-twin tiles: DES/RES, FOR/SOR, FOR/TOR, IRE/PRE, IRE/URE, PER/PET, REP/RES, SOR/TOR
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: PETROLEUM, SPECTATOR, COMPRESSOR, PREMATURE
- Word frequency (zipf): FORMIDABLE 3.65, PETROLEUM 3.9, SPECTATOR 3.51, REPERTOIRE 3.43, COMPRESSOR 3.38, PREMATURE 3.7, DESPERATE 4.32

**Critique:** Long-word general round.

## Round 235 [themed]: The Good Place: Chidi's Syllabus  (total 24.5, candidate E05)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Nothing-matters creed of season 3 | NIHILISM | NI · HIL · ISM | trivia | 3 |
| Gadfly who drank hemlock | SOCRATES | SOC · RAT · ES | trivia | 3 |
| Hell is other people, he wrote | SARTRE | SAR · TRE | trivia | 4 |
| Chidi's subject | ETHICS | ETH · ICS | definition | 2 |
| Virtue's champion, Plato's pupil | ARISTOTLE | ARIS · TOT · LE | trivia | 3 |
| ___ ethics, Aristotle's line | VIRTUE | VIR · TUE | trivia | 3 |
| Like Chidi's categorical thinking | KANTIAN | KAN · TIAN | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 12 x 3-letter, 2 x 4-letter):** ARIS ES ETH HIL ICS ISM KAN LE NI RAT SAR SOC TIAN TOT TRE TUE VIR

**Score:** decoys 4.2/20 + tempting pairs 0.0/16 + shared fragments 1.2/10 + anchor balance 6.7/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -14.6 = **structure 20.7/80** (scaled 12.9/50); clue rating 9.6/30 + variety 4.0/8 + puns 0.0/12 + penalties -2.0 = **clues 11.6/50**

- Decoys (5): TREES, ARISES, LEES, TOTES, RATES*
- Duplicate tiles: none; near-twin tiles: TRE/TUE
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: NIHILISM, SOCRATES, SARTRE, ARISTOTLE, VIRTUE, KANTIAN
- Word frequency (zipf): NIHILISM 2.74, SOCRATES 3.27, SARTRE 2.79, ETHICS 4.19, ARISTOTLE 3.41, VIRTUE 3.94, KANTIAN 2.32

**Critique:** Fandom trivia round.

## Round 236 [themed]: Star Trek: Starfleet Officers  (total 24.1, candidate B01)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Earl Grey sipper of the Enterprise-D | PICARD | PIC · ARD | trivia | 3 |
| B'Elanna, half-Klingon engineer | TORRES | TOR · RES | trivia | 3 |
| Captain whose beagle was Porthos | ARCHER | ARC · HER | trivia | 4 |
| Scotty's given name | MONTGOMERY | MONT · GO · MERY | trivia | 4 |
| Voyager's coffee-fuelled captain | JANEWAY | JAN · EWAY | trivia | 3 |
| Fencing helmsman, in full | HIKARUSULU | HIK · AR · USU · LU | trivia | 4 |
| DS9 doctor, secretly enhanced | BASHIR | BAS · HIR | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 11 x 3-letter, 3 x 4-letter):** AR ARC ARD BAS EWAY GO HER HIK HIR JAN LU MERY MONT PIC RES TOR USU

**Score:** decoys 0.7/20 + tempting pairs 0.4/16 + shared fragments 3.8/10 + anchor balance 2.6/8 + shape 6.9/12 + word appeal 14.0/14 + penalties -15.6 = **structure 12.8/80** (scaled 8.0/50); clue rating 16.1/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 16.1/50**

- Decoys (1): LURES
- Duplicate tiles: none; near-twin tiles: ARC/ARD, HER/HIR, HIK/HIR
- Giveaway tiles (share of the answer's family): HIR (0.508), JAN (0.443), LU (0.501), MERY (0.415); whole-word tiles: none
- Answers whose first tile has no rival continuation: PICARD, TORRES, ARCHER, MONTGOMERY, JANEWAY, HIKARUSULU, BASHIR
- Word frequency (zipf): PICARD 3.18, TORRES 3.67, ARCHER 3.81, MONTGOMERY 3.92, JANEWAY 2.57, HIKARUSULU 0.0, BASHIR 3.02

**Critique:** Fandom trivia round.

## Round 237 [themed]: Cosmere: Roshar Lore  (total 22.9, candidate D05)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Syl's kind | HONORSPREN | HON · ORS · PREN | trivia | 3 |
| Gem-powered gadget | FABRIAL | FAB · RIAL | trivia | 3 |
| Knight sworn to Ideals | RADIANT | RADI · ANT | trivia | 3 |
| Glowing gem currency | SPHERES | SPHE · RES | trivia | 4 |
| Parshendi's name for themselves | LISTENER | LI · STE · NER | trivia | 4 |
| Kholin kingdom | ALETHKAR | AL · ETH · KAR | trivia | 3 |
| Alethi faith of the Almighty | VORINISM | VOR · IN · ISM | trivia | 3 |

**Tile pool (18: 3 x 2-letter, 11 x 3-letter, 4 x 4-letter):** AL ANT ETH FAB HON IN ISM KAR LI NER ORS PREN RADI RES RIAL SPHE STE VOR

**Score:** decoys 6.5/20 + tempting pairs 2.4/16 + shared fragments 0.0/10 + anchor balance 2.2/8 + shape 7.2/12 + word appeal 14.0/14 + penalties -14.6 = **structure 17.7/80** (scaled 11.1/50); clue rating 11.8/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 11.8/50**

- Decoys (7): INNER, STEAL, STEIN, RESIN, RADIAL, HONORS*, LINER*
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): FAB (0.638), KAR (0.569), PREN (0.534), SPHE (0.662); whole-word tiles: none
- Answers whose first tile has no rival continuation: HONORSPREN, FABRIAL, RADIANT, SPHERES, LISTENER, VORINISM
- Word frequency (zipf): HONORSPREN 0.0, FABRIAL 0.0, RADIANT 3.49, SPHERES 3.41, LISTENER 3.52, ALETHKAR 0.0, VORINISM 0.0

**Critique:** Fandom trivia round.

## Round 238 [mixed]: Long Haul  (total 18.1, candidate G11)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Tiny version, like a schnauzer | MINIATURE | MIN · IAT · URE | definition | 3 |
| Marvel worth observing | PHENOMENON | PHE · NOME · NON | definition | 2 |
| Your word hoard | VOCABULARY | VOC · ABU · LARY | definition | 3 |
| Story's villain-in-chief | ANTAGONIST | ANT · AGON · IST | definition | 3 |
| Study of disease | PATHOLOGY | PAT · HOL · OGY | definition | 2 |
| Film-like in sweep | CINEMATIC | CIN · EMA · TIC | definition | 3 |
| Plato's drinking-party dialogue | SYMPOSIUM | SYM · POS · IUM | trivia | 4 |

**Tile pool (21: 18 x 3-letter, 3 x 4-letter):** ABU AGON ANT CIN EMA HOL IAT IST IUM LARY MIN NOME NON OGY PAT PHE POS SYM TIC URE VOC

**Score:** decoys 1.5/20 + tempting pairs 0.0/16 + shared fragments 3.8/10 + anchor balance 6.8/8 + shape 9.0/12 + word appeal 7.7/14 + penalties -8.4 = **structure 20.3/80** (scaled 12.7/50); clue rating 5.4/30 + variety 4.0/8 + puns 0.0/12 + penalties -4.0 = **clues 5.4/50**

- Decoys (2): ANTHOLOGY, CINEMA*
- Duplicate tiles: none; near-twin tiles: CIN/MIN, IAT/IST, IAT/PAT
- Giveaway tiles (share of the answer's family): NOME (0.494), PHE (0.509); whole-word tiles: none
- Answers whose first tile has no rival continuation: PHENOMENON, VOCABULARY, ANTAGONIST, PATHOLOGY, CINEMATIC, SYMPOSIUM
- Word frequency (zipf): MINIATURE 3.72, PHENOMENON 4.13, VOCABULARY 3.82, ANTAGONIST 3.32, PATHOLOGY 3.57, CINEMATIC 3.6, SYMPOSIUM 3.61

**Critique:** Long-word general round.

## Round 239 [mixed]: Long Haul  (total 15.7, candidate G17)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Gear-driven, or rote | MECHANICAL | ME · CHAN · ICAL | wordplay | 3 |
| Angular, like a pattern | GEOMETRIC | GEO · MET · RIC | definition | 3 |
| Made up | FICTIONAL | FIC · TIO · NAL | definition | 2 |
| Longing for the good old days | NOSTALGIA | NOS · TAL · GIA | definition | 3 |
| Spotless | IMMACULATE | IMMA · CUL · ATE | definition | 2 |
| Brave | COURAGEOUS | COUR · AGE · OUS | definition | 2 |
| Heavenly | CELESTIAL | CEL · EST · IAL | definition | 2 |

**Tile pool (21: 1 x 2-letter, 16 x 3-letter, 4 x 4-letter):** AGE ATE CEL CHAN COUR CUL EST FIC GEO GIA IAL ICAL IMMA ME MET NAL NOS OUS RIC TAL TIO

**Score:** decoys 3.8/20 + tempting pairs 0.4/16 + shared fragments 7.5/10 + anchor balance 7.0/8 + shape 9.0/12 + word appeal 7.6/14 + penalties -8.6 = **structure 26.7/80** (scaled 16.7/50); clue rating 0.0/30 + variety 4.0/8 + puns 3.0/12 + penalties -8.0 = **clues -1.0/50**

- Decoys (4): ESTATE, METAL, COURAGE*, METRIC*
- Duplicate tiles: none; near-twin tiles: AGE/ATE, CEL/CUL, FIC/RIC, IAL/NAL, IAL/TAL, NAL/TAL
- Giveaway tiles (share of the answer's family): FIC (0.46), GIA (0.55); whole-word tiles: none
- Answers whose first tile has no rival continuation: FICTIONAL, NOSTALGIA, IMMACULATE, COURAGEOUS, CELESTIAL
- Word frequency (zipf): MECHANICAL 4.33, GEOMETRIC 3.59, FICTIONAL 3.86, NOSTALGIA 3.62, IMMACULATE 3.37, COURAGEOUS 3.59, CELESTIAL 3.53

**Critique:** Long-word general round.

## Round 240 [mixed]: Long Haul  (total 11.9, candidate G16)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Science of the stars | ASTRONOMY | AST · RON · OMY | definition | 2 |
| Safe haven | SANCTUARY | SANC · TU · ARY | definition | 2 |
| Doubting, like Thomas | SKEPTICAL | SKEP · TI · CAL | evocative | 3 |
| ___ Me, with Minions | DESPICABLE | DES · PICA · BLE | trivia | 4 |
| Star's scribble for fans | AUTOGRAPH | AUT · OG · RAPH | definition | 3 |
| Man-made | ARTIFICIAL | ART · IFIC · IAL | definition | 2 |
| Uprising | REBELLION | REB · ELL · ION | definition | 2 |

**Tile pool (21: 3 x 2-letter, 13 x 3-letter, 5 x 4-letter):** ART ARY AST AUT BLE CAL DES ELL IAL IFIC ION OG OMY PICA RAPH REB RON SANC SKEP TI TU

**Score:** decoys 2.4/20 + tempting pairs 0.4/16 + shared fragments 7.5/10 + anchor balance 6.6/8 + shape 6.4/12 + word appeal 7.8/14 + penalties -13.9 = **structure 17.2/80** (scaled 10.8/50); clue rating 1.1/30 + variety 8.0/8 + puns 0.0/12 + penalties -8.0 = **clues 1.1/50**

- Decoys (2): ASTRONAUT, TIDES
- Duplicate tiles: none; near-twin tiles: ART/ARY, ART/AST, ART/AUT, AST/AUT, CAL/IAL, ION/RON
- Giveaway tiles (share of the answer's family): SANC (0.816), SKEP (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: ASTRONOMY, SKEPTICAL, AUTOGRAPH, ARTIFICIAL, REBELLION
- Word frequency (zipf): ASTRONOMY 3.63, SANCTUARY 3.93, SKEPTICAL 3.68, DESPICABLE 3.46, AUTOGRAPH 3.49, ARTIFICIAL 4.24, REBELLION 3.94

**Critique:** Long-word general round.
