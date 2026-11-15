# batch-009: review sheet

20 rounds kept out of 20 clued candidates (20 word-disjoint candidates came out of
the generator). Rounds are ordered best-first by total score, so Round 1 is what the scoring
formula likes most and the last round least. Play them, then tell me where the formula is wrong.
One round was removed by editor veto rather than by score (see "Cut candidates").

**Total = structure (0-80, deterministic) + clues (0-20, judge ratings).** Batch range:
36.2 to 65.1, mean 52.9.

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
## Round 271 [themed]: Landmark Experiments  (total 65.1, candidate S04)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| His oil drops weighed electric charge | MILLIKAN | MIL · LIK · AN | trivia | 5 |
| Ring a bell? His dogs drooled | PAVLOV | PAV · LOV | pun | 5 |
| With Morley, found no ether wind | MICHELSON | MIC · HEL · SON | trivia | 4 |
| Weighed the Earth with a torsion bar | CAVENDISH | CAV · END · ISH | trivia | 5 |
| Swan-neck flasks killed spontaneous life | PASTEUR | PAS · TEUR | trivia | 5 |
| Shocking 1960s obedience study | MILGRAM | MIL · GRAM | pun | 5 |
| His 1919 eclipse made Einstein a star | EDDINGTON | ED · DING · TON | pun | 5 |

**Tile pool (18: 2 x 2-letter, 13 x 3-letter, 3 x 4-letter):** AN CAV DING ED END GRAM HEL ISH LIK LOV MIC MIL MIL PAS PAV SON TEUR TON

**Score:** decoys 5.6/20 + tempting pairs 2.0/16 + shared fragments 7.5/10 + anchor balance 7.2/8 + shape 10.4/12 + word appeal 14.0/14 + penalties -11.5 = **structure 35.3/80** (scaled 22.1/50); clue rating 30.0/30 + variety 4.0/8 + puns 9.0/12 + penalties 0.0 = **clues 43.0/50**

- Decoys (6): LOVED, ENDED, LIKED, PAVED, CAVED, TONED*
- Duplicate tiles: MIL; near-twin tiles: CAV/PAV, MIC/MIL, PAS/PAV, SON/TON
- Giveaway tiles (share of the answer's family): LOV (0.509); whole-word tiles: none
- Answers whose first tile has no rival continuation: MILLIKAN, PAVLOV, MICHELSON, CAVENDISH, PASTEUR, MILGRAM, EDDINGTON
- Word frequency (zipf): MILLIKAN 2.01, PAVLOV 2.61, MICHELSON 2.39, CAVENDISH 3.16, PASTEUR 2.8, MILGRAM 2.24, EDDINGTON 2.37

**Critique:** Science trivia round.

## Round 272 [themed]: Plant Anatomy  (total 60.0, candidate S02)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Flower's manly bit, anther and all | STAMEN | STA · MEN | pun | 4 |
| Growing tip where plant cells divide | MERISTEM | MER · IS · TEM | definition | 4 |
| Waxy leaf coat, or nail edge | CUTICLE | CUT · ICLE | wordplay | 5 |
| Flower's base, or a bin | RECEPTACLE | REC · EPT · ACLE | wordplay | 4 |
| Pea plant's curly grappling hook | TENDRIL | TEN · DRIL | evocative | 4 |
| Outer cell layer, leaf or yours | EPIDERMIS | EPI · DER · MIS | definition | 4 |
| Water pipeline from roots to leaves | XYLEM | XY · LEM | definition | 4 |

**Tile pool (17: 2 x 2-letter, 12 x 3-letter, 3 x 4-letter):** ACLE CUT DER DRIL EPI EPT ICLE IS LEM MEN MER MIS REC STA TEM TEN XY

**Score:** decoys 1.7/20 + tempting pairs 0.4/16 + shared fragments 8.8/10 + anchor balance 6.9/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -11.5 = **structure 29.4/80** (scaled 18.4/50); clue rating 24.6/30 + variety 8.0/8 + puns 9.0/12 + penalties 0.0 = **clues 41.6/50**

- Decoys (1): TENDER
- Duplicate tiles: none; near-twin tiles: ACLE/ICLE, DER/MER, EPI/EPT, LEM/TEM, MEN/MER, MEN/TEN, TEM/TEN
- Giveaway tiles (share of the answer's family): DRIL (0.545), XY (0.535); whole-word tiles: none
- Answers whose first tile has no rival continuation: STAMEN, MERISTEM, CUTICLE, RECEPTACLE, TENDRIL, EPIDERMIS, XYLEM
- Word frequency (zipf): STAMEN 2.0, MERISTEM 1.85, CUTICLE 2.69, RECEPTACLE 2.87, TENDRIL 2.03, EPIDERMIS 2.71, XYLEM 2.21

**Critique:** Science trivia round.

## Round 273 [themed]: Organic Chemistry  (total 58.7, candidate S07)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Fruity-breath compound of fat-burning | KETONE | KET · ONE | pun | 4 |
| Same formula, different arrangement | ISOMER | ISO · MER | definition | 4 |
| Like benzene: stable, and often smelly | AROMATIC | ARO · MA · TIC | wordplay | 4 |
| Wood alcohol, moonshine's blinding risk | METHANOL | MET · HAN · OL | trivia | 5 |
| Nail polish remover | ACETONE | ACET · ONE | definition | 4 |
| Thalidomide's tragic mirror twin | ENANTIOMER | ENAN · TIO · MER | trivia | 4 |
| Three-carbon grill fuel | PROPANE | PROP · ANE | definition | 5 |

**Tile pool (17: 2 x 2-letter, 12 x 3-letter, 3 x 4-letter):** ACET ANE ARO ENAN HAN ISO KET MA MER MER MET OL ONE ONE PROP TIC TIO

**Score:** decoys 1.9/20 + tempting pairs 0.0/16 + shared fragments 10.0/10 + anchor balance 7.2/8 + shape 9.1/12 + word appeal 12.5/14 + penalties -12.1 = **structure 28.6/80** (scaled 17.9/50); clue rating 26.8/30 + variety 8.0/8 + puns 6.0/12 + penalties 0.0 = **clues 40.8/50**

- Decoys (2): TICKET, AROMA*
- Duplicate tiles: MER, ONE; near-twin tiles: ANE/ONE, KET/MET, MER/MET, TIC/TIO
- Giveaway tiles (share of the answer's family): ENAN (0.518); whole-word tiles: none
- Answers whose first tile has no rival continuation: KETONE, ISOMER, AROMATIC, METHANOL, ACETONE, ENANTIOMER, PROPANE
- Word frequency (zipf): KETONE 2.64, ISOMER 2.46, AROMATIC 3.32, METHANOL 2.98, ACETONE 2.79, ENANTIOMER 1.83, PROPANE 3.21

**Critique:** Science trivia round.

## Round 274 [themed]: Measuring Instruments  (total 58.5, candidate S05)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Proof it's the humidity | HYGROMETER | HYG · ROM · ETER | pun | 4 |
| Navigator's arc, a sixth of a circle | SEXTANT | SEX · TANT | trivia | 4 |
| Surveyor's angle-taker on a tripod | THEODOLITE | THEO · DOL · ITE | definition | 3 |
| Medieval brass star calculator | ASTROLABE | AST · ROL · ABE | trivia | 4 |
| Spinner that won't be pushed around | GYROSCOPE | GY · ROS · COPE | pun | 4 |
| Screw gauge for very fine distinctions | MICROMETER | MIC · ROM · ETER | pun | 4 |
| Lung gauge for those who blow hard | SPIROMETER | SPIR · OME · TER | pun | 4 |

**Tile pool (20: 1 x 2-letter, 13 x 3-letter, 6 x 4-letter):** ABE AST COPE DOL ETER ETER GY HYG ITE MIC OME ROL ROM ROM ROS SEX SPIR TANT TER THEO

**Score:** decoys 3.3/20 + tempting pairs 0.0/16 + shared fragments 10.0/10 + anchor balance 7.1/8 + shape 9.0/12 + word appeal 14.0/14 + penalties -14.4 = **structure 29.0/80** (scaled 18.1/50); clue rating 20.4/30 + variety 8.0/8 + puns 12.0/12 + penalties 0.0 = **clues 40.4/50**

- Decoys (2): ROSTER, MICROSCOPE
- Duplicate tiles: ETER, ROM; near-twin tiles: DOL/ROL, ROL/ROM, ROL/ROS, ROM/ROS
- Giveaway tiles (share of the answer's family): MIC (0.492); whole-word tiles: COPE
- Answers whose first tile has no rival continuation: HYGROMETER, SEXTANT, THEODOLITE, ASTROLABE, GYROSCOPE, MICROMETER, SPIROMETER
- Word frequency (zipf): HYGROMETER 1.87, SEXTANT 2.28, THEODOLITE 1.75, ASTROLABE 2.24, GYROSCOPE 2.55, MICROMETER 2.32, SPIROMETER 1.44

**Critique:** Science trivia round.

## Round 275 [themed]: Thermodynamics  (total 58.1, candidate S11)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| No heat in or out, by definition | ADIABATIC | ADI · ABA · TIC | definition | 3 |
| Keeping its cool, steadily | ISOTHERMAL | ISO · THER · MAL | pun | 4 |
| Why hot soup churns in the pot | CONVECTION | CON · VEC · TION | evocative | 4 |
| Why a metal spoon burns your hand | CONDUCTION | CON · DUCT · ION | evocative | 4 |
| Under unchanging pressure | ISOBARIC | ISO · BA · RIC | definition | 3 |
| Giving off heat, like a hand warmer | EXOTHERMIC | EXO · THER · MIC | definition | 4 |
| Hidden heat that melts ice silently | LATENT | LAT · ENT | trivia | 5 |

**Tile pool (20: 1 x 2-letter, 15 x 3-letter, 4 x 4-letter):** ABA ADI BA CON CON DUCT ENT EXO ION ISO ISO LAT MAL MIC RIC THER THER TIC TION VEC

**Score:** decoys 5.5/20 + tempting pairs 1.2/16 + shared fragments 10.0/10 + anchor balance 7.3/8 + shape 12.0/12 + word appeal 14.0/14 + penalties -7.3 = **structure 42.7/80** (scaled 26.7/50); clue rating 20.4/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 31.4/50**

- Decoys (5): BACON, ISOLATION, EXOTIC, CONDUCT*, THERMAL*
- Duplicate tiles: CON, ISO, THER; near-twin tiles: CON/ION, MIC/RIC, MIC/TIC, RIC/TIC
- Giveaway tiles (share of the answer's family): ADI (0.503); whole-word tiles: none
- Answers whose first tile has no rival continuation: ADIABATIC, CONDUCTION, EXOTHERMIC, LATENT
- Word frequency (zipf): ADIABATIC 2.4, ISOTHERMAL 2.32, CONVECTION 3.22, CONDUCTION 2.98, ISOBARIC 1.65, EXOTHERMIC 2.26, LATENT 3.27

**Critique:** Science trivia round.

## Round 276 [themed]: Immune System  (total 58.0, candidate S13)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Molecular ID badge that raises alarms | ANTIGEN | ANTI · GEN | evocative | 4 |
| 'Big eater,' per the Greek | MACROPHAGE | MAC · ROPH · AGE | trivia | 5 |
| Sneezy signal from mast cells | HISTAMINE | HIS · TAM · INE | trivia | 5 |
| Antiviral signal named for meddling | INTERFERON | INT · ERFE · RON | trivia | 4 |
| Gland where T cells finish school | THYMUS | THY · MUS | pun | 5 |
| What a vaccine aims to give | IMMUNITY | IM · MUN · ITY | definition | 3 |
| Pollen, to a hay fever sufferer | ALLERGEN | ALL · ER · GEN | definition | 4 |

**Tile pool (19: 2 x 2-letter, 14 x 3-letter, 3 x 4-letter):** AGE ALL ANTI ER ERFE GEN GEN HIS IM INE INT ITY MAC MUN MUS RON ROPH TAM THY

**Score:** decoys 5.0/20 + tempting pairs 2.4/16 + shared fragments 5.0/10 + anchor balance 7.1/8 + shape 11.7/12 + word appeal 12.6/14 + penalties -11.6 = **structure 32.3/80** (scaled 20.2/50); clue rating 26.8/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 37.8/50**

- Decoys (4): IMAGE, INTER, INTERIM, MACRON
- Duplicate tiles: GEN; near-twin tiles: INE/INT, MUN/MUS
- Giveaway tiles (share of the answer's family): INT (0.451); whole-word tiles: ANTI
- Answers whose first tile has no rival continuation: ANTIGEN, MACROPHAGE, HISTAMINE, THYMUS, ALLERGEN
- Word frequency (zipf): ANTIGEN 3.21, MACROPHAGE 2.44, HISTAMINE 2.64, INTERFERON 2.76, THYMUS 2.58, IMMUNITY 3.91, ALLERGEN 2.63

**Critique:** Science trivia round.

## Round 277 [themed]: Microbiology  (total 57.0, candidate S09)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Rod-shaped bug, anthrax included | BACILLUS | BAC · ILL · US | trivia | 4 |
| Bacterial DNA ring, freely swapped | PLASMID | PLAS · MID | definition | 4 |
| Microbe's whiplike outboard motor | FLAGELLUM | FLA · GEL · LUM | evocative | 5 |
| Germ with a bad attitude | PATHOGEN | PAT · HO · GEN | pun | 4 |
| Corkscrew germ behind Lyme disease | SPIROCHETE | SPIR · OCH · ETE | trivia | 5 |
| Fleming's moldy lucky break, 1928 | PENICILLIN | PENI · CIL · LIN | trivia | 5 |
| Cell with no nucleus to call home | PROKARYOTE | PRO · KAR · YOTE | pun | 4 |

**Tile pool (20: 2 x 2-letter, 14 x 3-letter, 4 x 4-letter):** BAC CIL ETE FLA GEL GEN HO ILL KAR LIN LUM MID OCH PAT PENI PLAS PRO SPIR US YOTE

**Score:** decoys 1.2/20 + tempting pairs 0.4/16 + shared fragments 1.2/10 + anchor balance 7.4/8 + shape 11.0/12 + word appeal 14.0/14 + penalties -12.7 = **structure 22.5/80** (scaled 14.1/50); clue rating 28.9/30 + variety 8.0/8 + puns 6.0/12 + penalties 0.0 = **clues 42.9/50**

- Decoys (1): GENUS
- Duplicate tiles: none; near-twin tiles: GEL/GEN
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: BACILLUS, PLASMID, FLAGELLUM, PATHOGEN, SPIROCHETE, PENICILLIN, PROKARYOTE
- Word frequency (zipf): BACILLUS 2.7, PLASMID 2.68, FLAGELLUM 2.11, PATHOGEN 3.17, SPIROCHETE 1.54, PENICILLIN 3.04, PROKARYOTE 1.45

**Critique:** Science trivia round.

## Round 278 [themed]: Particle Zoo  (total 55.7, candidate S01)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Quark-built; the H in LHC | HADRON | HAD · RON | trivia | 5 |
| Electron's clan; Greek for 'slight' | LEPTON | LEP · TON | trivia | 4 |
| Half-spin particle named for Enrico | FERMION | FERM · ION | trivia | 4 |
| Antielectron Anderson spotted in 1932 | POSITRON | POS · IT · RON | trivia | 4 |
| Hypothetical bit that keeps you grounded | GRAVITON | GRA · VIT · ON | pun | 4 |
| Hypothetical speedster, faster than light | TACHYON | TACH · YON | definition | 4 |
| Smasher in a 27 km ring | COLLIDER | COL · LI · DER | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 12 x 3-letter, 2 x 4-letter):** COL DER FERM GRA HAD ION IT LEP LI ON POS RON RON TACH TON VIT YON

**Score:** decoys 7.0/20 + tempting pairs 1.2/16 + shared fragments 10.0/10 + anchor balance 6.7/8 + shape 8.1/12 + word appeal 14.0/14 + penalties -14.9 = **structure 32.1/80** (scaled 20.1/50); clue rating 24.6/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 35.6/50**

- Decoys (7): POSITION, LION, ONION, COLON, GRADER, YONDER, COLDER*
- Duplicate tiles: RON; near-twin tiles: ION/RON, ION/TON, ION/YON, RON/TON, RON/YON, TON/YON
- Giveaway tiles (share of the answer's family): HAD (0.52), TACH (0.52); whole-word tiles: none
- Answers whose first tile has no rival continuation: HADRON, LEPTON, FERMION, POSITRON, GRAVITON, TACHYON
- Word frequency (zipf): HADRON 2.68, LEPTON 1.98, FERMION 2.05, POSITRON 2.64, GRAVITON 2.21, TACHYON 2.21, COLLIDER 2.84

**Critique:** Science trivia round.

## Round 279 [themed]: Fossil Record  (total 54.9, candidate S06)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Three-lobed Paleozoic sea bug | TRILOBITE | TRI · LOB · ITE | trivia | 4 |
| Fossilized number two | COPROLITE | COP · ROL · ITE | pun | 5 |
| Gizzard stone swallowed by sauropods | GASTROLITH | GAS · TROL · ITH | trivia | 4 |
| Flying reptile, not technically a dinosaur | PTEROSAUR | PTE · ROS · AUR | trivia | 5 |
| Period of the animal 'explosion' | CAMBRIAN | CAM · BRI · AN | trivia | 4 |
| Period that opened the dinosaur show | TRIASSIC | TRI · AS · SIC | trivia | 4 |
| Fossil resin, Jurassic Park's DNA vault | AMBER | AMB · ER | trivia | 5 |

**Tile pool (20: 3 x 2-letter, 16 x 3-letter, 1 x 4-letter):** AMB AN AS AUR BRI CAM COP ER GAS ITE ITE ITH LOB PTE ROL ROS SIC TRI TRI TROL

**Score:** decoys 2.0/20 + tempting pairs 0.8/16 + shared fragments 10.0/10 + anchor balance 7.3/8 + shape 12.0/12 + word appeal 13.2/14 + penalties -14.9 = **structure 30.4/80** (scaled 19.0/50); clue rating 28.9/30 + variety 4.0/8 + puns 3.0/12 + penalties 0.0 = **clues 35.9/50**

- Decoys (2): CAMERAS, ERAS
- Duplicate tiles: ITE, TRI; near-twin tiles: BRI/TRI, ITE/ITH, ITE/PTE, ROL/ROS
- Giveaway tiles (share of the answer's family): PTE (0.508); whole-word tiles: none
- Answers whose first tile has no rival continuation: COPROLITE, GASTROLITH, PTEROSAUR, AMBER
- Word frequency (zipf): TRILOBITE 2.04, COPROLITE 1.39, GASTROLITH 0.0, PTEROSAUR 1.94, CAMBRIAN 2.97, TRIASSIC 2.79, AMBER 3.97

**Critique:** Science trivia round.

## Round 280 [themed]: Eponymous Units  (total 54.4, candidate S08)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Scale where water freezes at 32 | FAHRENHEIT | FAH · REN · HEIT | definition | 4 |
| X-ray pioneer, and an old dose unit | ROENTGEN | RO · ENT · GEN | trivia | 4 |
| One decay per second, named for Henri | BECQUEREL | BEC · QUE · REL | trivia | 5 |
| Charge of 6.24 quintillion electrons | COULOMB | COUL · OMB | trivia | 4 |
| Radiation dose unit with a Swedish name | SIEVERT | SIE · VERT | trivia | 4 |
| Unit keeping current with a Frenchman | AMPERE | AMP · ERE | pun | 4 |
| Force unit; a small apple's weight | NEWTON | NEW · TON | pun | 5 |

**Tile pool (17: 1 x 2-letter, 13 x 3-letter, 3 x 4-letter):** AMP BEC COUL ENT ERE FAH GEN HEIT NEW OMB QUE REL REN RO SIE TON VERT

**Score:** decoys 0.0/20 + tempting pairs 0.0/16 + shared fragments 2.5/10 + anchor balance 6.4/8 + shape 10.0/12 + word appeal 13.2/14 + penalties -10.3 = **structure 21.8/80** (scaled 13.6/50); clue rating 26.8/30 + variety 8.0/8 + puns 6.0/12 + penalties 0.0 = **clues 40.8/50**

- Decoys (0): none
- Duplicate tiles: none; near-twin tiles: GEN/REN, REL/REN
- Giveaway tiles (share of the answer's family): FAH (1.0), HEIT (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: FAHRENHEIT, ROENTGEN, BECQUEREL, COULOMB, SIEVERT, AMPERE, NEWTON
- Word frequency (zipf): FAHRENHEIT 3.24, ROENTGEN 1.88, BECQUEREL 1.83, COULOMB 2.39, SIEVERT 1.68, AMPERE 2.21, NEWTON 3.94

**Critique:** Science trivia round.

## Round 281 [themed]: Neuroscience  (total 53.2, candidate S03)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| About 86 billion live upstairs | NEURON | NEU · RON | trivia | 4 |
| Gap where nerve cells pass notes | SYNAPSE | SYNA · PSE | pun | 4 |
| Branchy input; Greek for 'tree' | DENDRITE | DEN · DRI · TE | trivia | 5 |
| Almond-shaped fear center | AMYGDALA | AMYG · DALA | trivia | 4 |
| Mood chemical mostly made in the gut | SEROTONIN | SER · OTO · NIN | trivia | 5 |
| 'Inner room' relaying the senses | THALAMUS | THA · LA · MUS | trivia | 4 |
| Newest, wrinkliest layer upstairs | NEOCORTEX | NEO · COR · TEX | evocative | 4 |

**Tile pool (18: 2 x 2-letter, 13 x 3-letter, 3 x 4-letter):** AMYG COR DALA DEN DRI LA MUS NEO NEU NIN OTO PSE RON SER SYNA TE TEX THA

**Score:** decoys 5.7/20 + tempting pairs 0.8/16 + shared fragments 1.2/10 + anchor balance 3.9/8 + shape 10.4/12 + word appeal 14.0/14 + penalties -11.5 = **structure 24.6/80** (scaled 15.4/50); clue rating 26.8/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 37.8/50**

- Decoys (7): LATE, LASER, LADEN, LAPSE, LATEX, DENSER, CORTEX*
- Duplicate tiles: none; near-twin tiles: NEO/NEU
- Giveaway tiles (share of the answer's family): AMYG (1.0), DALA (1.0), NIN (0.501); whole-word tiles: none
- Answers whose first tile has no rival continuation: NEURON, SYNAPSE, DENDRITE, AMYGDALA, SEROTONIN, THALAMUS, NEOCORTEX
- Word frequency (zipf): NEURON 3.16, SYNAPSE 2.76, DENDRITE 2.01, AMYGDALA 2.84, SEROTONIN 3.26, THALAMUS 2.44, NEOCORTEX 2.22

**Critique:** Science trivia round.

## Round 282 [themed]: Quantum Weirdness  (total 53.2, candidate S15)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Uncertain fellow, or Walter White | HEISENBERG | HEI · SEN · BERG | wordplay | 5 |
| Passing through walls, quantum style | TUNNELING | TUN · NEL · ING | definition | 4 |
| Where a measurement leaves you | EIGENSTATE | EIG · ENS · TATE | definition | 3 |
| Bongo-playing diagram drawer | FEYNMAN | FEYN · MAN | trivia | 5 |
| Turns 720 degrees to get home | SPINOR | SPI · NOR | trivia | 5 |
| Link spookily at a distance | ENTANGLE | EN · TAN · GLE | trivia | 4 |
| Electron cloud, not really a path | ORBITAL | OR · BIT · AL | definition | 4 |

**Tile pool (19: 3 x 2-letter, 13 x 3-letter, 3 x 4-letter):** AL BERG BIT EIG EN ENS FEYN GLE HEI ING MAN NEL NOR OR SEN SPI TAN TATE TUN

**Score:** decoys 5.6/20 + tempting pairs 1.6/16 + shared fragments 2.5/10 + anchor balance 7.0/8 + shape 10.7/12 + word appeal 13.2/14 + penalties -16.0 = **structure 24.6/80** (scaled 15.4/50); clue rating 26.8/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 37.8/50**

- Decoys (8): MANOR, BITING, ORBITING, ORAL*, TUNNEL*, ORBIT*, TUNING*, TANGLE*
- Duplicate tiles: none; near-twin tiles: MAN/TAN, TAN/TUN
- Giveaway tiles (share of the answer's family): FEYN (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: HEISENBERG, TUNNELING, EIGENSTATE, FEYNMAN, SPINOR, ORBITAL
- Word frequency (zipf): HEISENBERG 2.82, TUNNELING 2.9, EIGENSTATE 1.47, FEYNMAN 2.68, SPINOR 1.72, ENTANGLE 2.2, ORBITAL 3.59

**Critique:** Science trivia round.

## Round 283 [themed]: Mohs and Minerals  (total 52.6, candidate S14)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Mohs 2, hiding inside drywall | GYPSUM | GYP · SUM | trivia | 4 |
| Mohs 3; fizzes in acid | CALCITE | CAL · CITE | trivia | 4 |
| Fool's gold | PYRITE | PYR · ITE | trivia | 4 |
| Lodestone's attractive mineral | MAGNETITE | MAG · NET · ITE | pun | 4 |
| Mohs 9: ruby and sapphire, really | CORUNDUM | COR · UN · DUM | trivia | 5 |
| Mohs 4; glows under UV | FLUORITE | FLU · ORI · TE | trivia | 4 |
| Hungry-sounding Mohs 5 mineral | APATITE | APA · TITE | pun | 5 |

**Tile pool (17: 2 x 2-letter, 13 x 3-letter, 2 x 4-letter):** APA CAL CITE COR DUM FLU GYP ITE ITE MAG NET ORI PYR SUM TE TITE UN

**Score:** decoys 2.7/20 + tempting pairs 0.0/16 + shared fragments 5.0/10 + anchor balance 7.0/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -13.5 = **structure 25.2/80** (scaled 15.8/50); clue rating 26.8/30 + variety 4.0/8 + puns 6.0/12 + penalties 0.0 = **clues 36.8/50**

- Decoys (4): UNITE, TENET, MAGNET*, FLUTE*
- Duplicate tiles: ITE; near-twin tiles: CITE/TITE, DUM/SUM
- Giveaway tiles (share of the answer's family): GYP (0.451); whole-word tiles: none
- Answers whose first tile has no rival continuation: GYPSUM, CALCITE, PYRITE, MAGNETITE, CORUNDUM, FLUORITE, APATITE
- Word frequency (zipf): GYPSUM 2.93, CALCITE 2.62, PYRITE 2.56, MAGNETITE 2.57, CORUNDUM 1.9, FLUORITE 2.33, APATITE 2.2

**Critique:** Science trivia round.

## Round 284 [themed]: Natural Selection  (total 52.0, candidate S10)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| When a lineage splits for good | SPECIATION | SPE · CIA · TION | definition | 3 |
| Finch islands named for tortoises | GALAPAGOS | GAL · APA · GOS | trivia | 5 |
| Like your appendix, supposedly | VESTIGIAL | VES · TIG · IAL | evocative | 4 |
| Evolution's family tree | PHYLOGENY | PHY · LOG · ENY | definition | 4 |
| A common one links you and chimps | ANCESTOR | ANC · ES · TOR | trivia | 4 |
| Giraffe-neck guy who got heredity wrong | LAMARCK | LAM · ARCK | trivia | 5 |
| His letter spurred Darwin to publish | WALLACE | WAL · LACE | trivia | 5 |

**Tile pool (19: 1 x 2-letter, 15 x 3-letter, 3 x 4-letter):** ANC APA ARCK CIA ENY ES GAL GOS IAL LACE LAM LOG PHY SPE TIG TION TOR VES WAL

**Score:** decoys 1.2/20 + tempting pairs 0.8/16 + shared fragments 3.8/10 + anchor balance 6.8/8 + shape 12.0/12 + word appeal 12.9/14 + penalties -10.0 = **structure 27.5/80** (scaled 17.2/50); clue rating 26.8/30 + variety 8.0/8 + puns 0.0/12 + penalties 0.0 = **clues 34.8/50**

- Decoys (1): WALES
- Duplicate tiles: none; near-twin tiles: GAL/IAL, GAL/WAL, IAL/WAL
- Giveaway tiles (share of the answer's family): ARCK (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: SPECIATION, GALAPAGOS, VESTIGIAL, PHYLOGENY, ANCESTOR, LAMARCK, WALLACE
- Word frequency (zipf): SPECIATION 2.63, GALAPAGOS 2.92, VESTIGIAL 2.47, PHYLOGENY 2.5, ANCESTOR 3.49, LAMARCK 2.23, WALLACE 4.05

**Critique:** Science trivia round.

## Round 285 [themed]: Fungus Among Us  (total 48.6, candidate S16)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Underground web of the forest | MYCELIUM | MY · CEL · IUM | evocative | 4 |
| Threads that weave a fungal mat | HYPHAE | HYP · HAE | definition | 3 |
| Italian 'piglets,' a prized cep | PORCINI | PORC · INI | trivia | 5 |
| Mushroom grown on Japanese oak logs | SHIITAKE | SHI · ITA · KE | trivia | 4 |
| Fungal walls, crab shells | CHITIN | CHI · TIN | trivia | 4 |
| Death cap and fly agaric genus | AMANITA | AMAN · ITA | trivia | 4 |
| Major for a fun guy | MYCOLOGY | MY · COL · OGY | pun | 5 |

**Tile pool (17: 3 x 2-letter, 12 x 3-letter, 2 x 4-letter):** AMAN CEL CHI COL HAE HYP INI ITA ITA IUM KE MY MY OGY PORC SHI TIN

**Score:** decoys 0.0/20 + tempting pairs 0.0/16 + shared fragments 7.5/10 + anchor balance 6.8/8 + shape 8.1/12 + word appeal 14.0/14 + penalties -15.6 = **structure 20.8/80** (scaled 13.0/50); clue rating 24.6/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 35.6/50**

- Decoys (0): none
- Duplicate tiles: ITA, MY; near-twin tiles: CEL/COL, CHI/SHI
- Giveaway tiles (share of the answer's family): AMAN (0.579), HAE (0.564); whole-word tiles: none
- Answers whose first tile has no rival continuation: MYCELIUM, HYPHAE, PORCINI, SHIITAKE, CHITIN, AMANITA, MYCOLOGY
- Word frequency (zipf): MYCELIUM 2.45, HYPHAE 2.44, PORCINI 2.0, SHIITAKE 2.17, CHITIN 2.24, AMANITA 2.13, MYCOLOGY 2.22

**Critique:** Science trivia round.

## Round 286 [themed]: Oceanography  (total 47.2, candidate S12)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| About 35 parts per thousand, at sea | SALINITY | SAL · IN · ITY | trivia | 4 |
| Sharp saltiness boundary underwater | HALOCLINE | HAL · OC · LINE | definition | 4 |
| Japanese for 'harbor wave' | TSUNAMI | TSUN · AMI | trivia | 5 |
| Effect falsely blamed for toilet swirls | CORIOLIS | COR · IO · LIS | trivia | 5 |
| Plain dark, miles down | ABYSSAL | ABYS · SAL | pun | 4 |
| Trench hiding the Challenger Deep | MARIANA | MARI · ANA | trivia | 5 |
| Brackish spot where river meets tide | ESTUARY | EST · UARY | definition | 4 |

**Tile pool (17: 3 x 2-letter, 9 x 3-letter, 5 x 4-letter):** ABYS AMI ANA COR EST HAL IN IO ITY LINE LIS MARI OC SAL SAL TSUN UARY

**Score:** decoys 1.0/20 + tempting pairs 0.0/16 + shared fragments 3.8/10 + anchor balance 6.5/8 + shape 4.6/12 + word appeal 13.0/14 + penalties -17.1 = **structure 11.7/80** (scaled 7.3/50); clue rating 28.9/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 39.9/50**

- Decoys (1): INLINE
- Duplicate tiles: SAL; near-twin tiles: HAL/SAL
- Giveaway tiles (share of the answer's family): ABYS (0.552), TSUN (1.0); whole-word tiles: LINE
- Answers whose first tile has no rival continuation: SALINITY, HALOCLINE, TSUNAMI, CORIOLIS, ABYSSAL, MARIANA, ESTUARY
- Word frequency (zipf): SALINITY 2.96, HALOCLINE 1.11, TSUNAMI 3.52, CORIOLIS 2.28, ABYSSAL 2.39, MARIANA 3.07, ESTUARY 3.26

**Critique:** Science trivia round.

## Round 287 [themed]: Cosmology  (total 47.0, candidate S18)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| His 1929 law: galaxies flee | HUBBLE | HUB · BLE | trivia | 4 |
| A cosmos of cosmoses | MULTIVERSE | MUL · TIV · ERSE | wordplay | 4 |
| Blazing core fed by a black hole | QUASAR | QUA · SAR | definition | 4 |
| Priest who proposed the primeval atom | LEMAITRE | LEM · AI · TRE | trivia | 5 |
| Event ___: point of no return | HORIZON | HORI · ZON | trivia | 4 |
| Tiny unevenness in the CMB | ANISOTROPY | ANI · SOT · ROPY | trivia | 3 |
| Big Bang man of alpha-beta-gamma | GAMOW | GAM · OW | trivia | 5 |

**Tile pool (17: 2 x 2-letter, 12 x 3-letter, 3 x 4-letter):** AI ANI BLE ERSE GAM HORI HUB LEM MUL OW QUA ROPY SAR SOT TIV TRE ZON

**Score:** decoys 2.7/20 + tempting pairs 0.0/16 + shared fragments 0.0/10 + anchor balance 4.2/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -11.8 = **structure 18.2/80** (scaled 11.4/50); clue rating 24.6/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 35.6/50**

- Decoys (2): GAMBLE, TREBLE
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): HORI (0.608), MUL (0.635), SAR (0.511); whole-word tiles: none
- Answers whose first tile has no rival continuation: HUBBLE, MULTIVERSE, QUASAR, LEMAITRE, HORIZON, ANISOTROPY, GAMOW
- Word frequency (zipf): HUBBLE 3.12, MULTIVERSE 2.85, QUASAR 2.43, LEMAITRE 2.04, HORIZON 4.07, ANISOTROPY 2.37, GAMOW 1.69

**Critique:** Science trivia round.

## Round 288 [themed]: Taxonomy  (total 46.2, candidate S20)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Chordata is one | PHYLUM | PHY · LUM | trivia | 4 |
| Frog, newt or caecilian | AMPHIBIAN | AMP · HIB · IAN | definition | 4 |
| Swede who gave everything two names | LINNAEUS | LIN · NAE · US | trivia | 5 |
| Jointed-leg critter, like a crab | ARTHROPOD | AR · THRO · POD | definition | 4 |
| Animalia or Plantae, rank-wise | KINGDOM | KING · DOM | definition | 4 |
| Spiny-skinned starfish kin | ECHINODERM | ECH · INO · DERM | trivia | 4 |
| Jellyfish, packing stinging cells | CNIDARIAN | CNI · DAR · IAN | trivia | 4 |

**Tile pool (19: 2 x 2-letter, 14 x 3-letter, 3 x 4-letter):** AMP AR CNI DAR DERM DOM ECH HIB IAN IAN INO KING LIN LUM NAE PHY POD THRO US

**Score:** decoys 3.7/20 + tempting pairs 1.2/16 + shared fragments 2.5/10 + anchor balance 6.6/8 + shape 11.7/12 + word appeal 14.0/14 + penalties -11.5 = **structure 28.2/80** (scaled 17.6/50); clue rating 24.6/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 28.6/50**

- Decoys (3): LINKING, LUMINOUS, DOMINO
- Duplicate tiles: IAN; near-twin tiles: none
- Giveaway tiles (share of the answer's family): CNI (0.642), DERM (0.544); whole-word tiles: none
- Answers whose first tile has no rival continuation: PHYLUM, AMPHIBIAN, LINNAEUS, ARTHROPOD, KINGDOM, ECHINODERM, CNIDARIAN
- Word frequency (zipf): PHYLUM 2.36, AMPHIBIAN 2.72, LINNAEUS 2.68, ARTHROPOD 2.33, KINGDOM 4.62, ECHINODERM 1.62, CNIDARIAN 1.33

**Critique:** Science trivia round.

## Round 289 [themed]: Women in Science  (total 40.4, candidate S17)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Emilie du ___, Newton's translator | CHATELET | CHA · TEL · ET | trivia | 4 |
| Rachel, whose Silent Spring rang alarms | CARSON | CAR · SON | trivia | 5 |
| Mary, polymath with an Oxford college | SOMERVILLE | SOM · ER · VIL · LE | trivia | 4 |
| Jane, chimp chronicler of Gombe | GOODALL | GOOD · ALL | trivia | 5 |
| Sophie, alias Monsieur LeBlanc | GERMAIN | GERM · AIN | trivia | 5 |
| Jocelyn Bell ___, pulsar finder | BURNELL | BURN · ELL | trivia | 5 |
| Henrietta, who made stars yardsticks | LEAVITT | LEAV · ITT | trivia | 5 |

**Tile pool (17: 3 x 2-letter, 10 x 3-letter, 4 x 4-letter):** AIN ALL BURN CAR CHA ELL ER ET GERM GOOD ITT LE LEAV SOM SON TEL VIL

**Score:** decoys 3.3/20 + tempting pairs 2.0/16 + shared fragments 2.5/10 + anchor balance 7.0/8 + shape 6.8/12 + word appeal 14.0/14 + penalties -18.9 = **structure 16.7/80** (scaled 10.4/50); clue rating 30.0/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 30.0/50**

- Decoys (2): CARTEL, BURNER
- Duplicate tiles: none; near-twin tiles: ALL/ELL, SOM/SON
- Giveaway tiles (share of the answer's family): ITT (0.503); whole-word tiles: BURN, GOOD
- Answers whose first tile has no rival continuation: CHATELET, CARSON, SOMERVILLE, GOODALL, GERMAIN, BURNELL, LEAVITT
- Word frequency (zipf): CHATELET 1.71, CARSON 3.91, SOMERVILLE 3.0, GOODALL 2.78, GERMAIN 3.26, BURNELL 2.22, LEAVITT 2.65

**Critique:** Science trivia round.

## Round 290 [themed]: Biochemistry  (total 36.2, candidate S19)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Fat, to a biochemist | LIPID | LIP · ID | definition | 4 |
| Short chain of amino acids | PEPTIDE | PEP · TIDE | definition | 3 |
| Iron-bearing oxygen courier | HEMOGLOBIN | HEMO · GLO · BIN | definition | 4 |
| Banting and Best's 1921 hormone | INSULIN | INSU · LIN | trivia | 4 |
| Most abundant protein in your body | COLLAGEN | COL · LA · GEN | trivia | 4 |
| Stuff of hair, horns and hooves | KERATIN | KER · ATIN | definition | 4 |
| Liver's stash of sugar | GLYCOGEN | GLY · CO · GEN | definition | 4 |

**Tile pool (17: 3 x 2-letter, 10 x 3-letter, 4 x 4-letter):** ATIN BIN CO COL GEN GEN GLO GLY HEMO ID INSU KER LA LIN LIP PEP TIDE

**Score:** decoys 1.0/20 + tempting pairs 0.4/16 + shared fragments 6.2/10 + anchor balance 6.2/8 + shape 6.8/12 + word appeal 13.2/14 + penalties -14.9 = **structure 18.9/80** (scaled 11.8/50); clue rating 20.4/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 24.4/50**

- Decoys (2): LAID, COLA
- Duplicate tiles: GEN; near-twin tiles: BIN/LIN, GLO/GLY, LIN/LIP
- Giveaway tiles (share of the answer's family): GLY (0.511), TIDE (0.603); whole-word tiles: TIDE
- Answers whose first tile has no rival continuation: LIPID, PEPTIDE, HEMOGLOBIN, COLLAGEN, KERATIN, GLYCOGEN
- Word frequency (zipf): LIPID 3.29, PEPTIDE 3.3, HEMOGLOBIN 2.92, INSULIN 3.81, COLLAGEN 3.25, KERATIN 2.58, GLYCOGEN 2.78

**Critique:** Science trivia round.
