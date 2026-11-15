# batch-008: review sheet

30 rounds kept out of 30 clued candidates (30 word-disjoint candidates came out of
the generator). Rounds are ordered best-first by total score, so Round 1 is what the scoring
formula likes most and the last round least. Play them, then tell me where the formula is wrong.
One round was removed by editor veto rather than by score (see "Cut candidates").

**Total = structure (0-80, deterministic) + clues (0-20, judge ratings).** Batch range:
29.8 to 53.3, mean 41.4.

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
## Round 241 [mixed]: Word Nerd  (total 53.3, candidate N04)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Blue-green paint pigment | VIRIDIAN | VIR · ID · IAN | definition | 3 |
| Spoiling for a war | BELLICOSE | BEL · LIC · OSE | definition | 3 |
| Baggy-trousered old fool of commedia | PANTALOON | PAN · TAL · OON | trivia | 4 |
| Chew it over, literally | MASTICATE | MAS · TIC · ATE | pun | 5 |
| Showy but worthless stuff | TRUMPERY | TRUM · PERY | definition | 3 |
| Saying the same thing twice twice | TAUTOLOGY | TAU · TOL · OGY | pun | 5 |
| Quack with a con to sell | CHARLATAN | CHAR · LA · TAN | definition | 3 |

**Tile pool (20: 2 x 2-letter, 15 x 3-letter, 3 x 4-letter):** ATE BEL CHAR IAN ID LA LIC MAS OGY OON OSE PAN PERY TAL TAN TAU TIC TOL TRUM VIR

**Score:** decoys 2.7/20 + tempting pairs 1.2/16 + shared fragments 10.0/10 + anchor balance 7.3/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -11.5 = **structure 33.7/80** (scaled 21.1/50); clue rating 18.2/30 + variety 8.0/8 + puns 6.0/12 + penalties 0.0 = **clues 32.2/50**

- Decoys (3): LAID, LABEL, TANTRUM
- Duplicate tiles: none; near-twin tiles: IAN/PAN, IAN/TAN, LIC/TIC, PAN/TAN, TAL/TAN, TAL/TAU, TAL/TOL, TAN/TAU
- Giveaway tiles (share of the answer's family): TRUM (0.715); whole-word tiles: none
- Answers whose first tile has no rival continuation: VIRIDIAN, BELLICOSE, PANTALOON, MASTICATE, TRUMPERY, TAUTOLOGY, CHARLATAN
- Word frequency (zipf): VIRIDIAN 2.04, BELLICOSE 2.28, PANTALOON 1.54, MASTICATE 1.37, TRUMPERY 1.36, TAUTOLOGY 2.24, CHARLATAN 2.63

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 242 [mixed]: Word Nerd  (total 48.5, candidate N05)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Cheeky upstart, once a pet monkey | JACKANAPES | JAC · KAN · APES | trivia | 4 |
| Mournful to the point of comedy | LUGUBRIOUS | LUG · UBRI · OUS | evocative | 4 |
| Kiss, or touch curves, formally | OSCULATE | OS · CUL · ATE | wordplay | 4 |
| Hiccup, if you're a doctor | SINGULTUS | SIN · GUL · TUS | definition | 4 |
| Insolent, scornful abuse | CONTUMELY | CON · TUM · ELY | definition | 3 |
| Notes scribbled on the edges | MARGINALIA | MAR · GIN · ALIA | definition | 4 |
| Horn that gives and gives | CORNUCOPIA | COR · NUC · OPIA | evocative | 4 |

**Tile pool (21: 1 x 2-letter, 16 x 3-letter, 4 x 4-letter):** ALIA APES ATE CON COR CUL ELY GIN GUL JAC KAN LUG MAR NUC OPIA OS OUS SIN TUM TUS UBRI

**Score:** decoys 0.5/20 + tempting pairs 0.4/16 + shared fragments 6.2/10 + anchor balance 7.1/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -10.9 = **structure 27.3/80** (scaled 17.1/50); clue rating 20.4/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 31.4/50**

- Decoys (1): MARGIN*
- Duplicate tiles: none; near-twin tiles: CON/COR, CUL/GUL, GIN/SIN, OUS/TUS, TUM/TUS
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: JACKANAPES, LUGUBRIOUS, OSCULATE, SINGULTUS, CONTUMELY, MARGINALIA, CORNUCOPIA
- Word frequency (zipf): JACKANAPES 1.32, LUGUBRIOUS 2.02, OSCULATE 0.0, SINGULTUS 0.0, CONTUMELY 1.25, MARGINALIA 2.06, CORNUCOPIA 2.56

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 243 [mixed]: Word Nerd  (total 47.7, candidate N14)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Yawning, for the long-winded | OSCITATION | OSCI · TAT · ION | pun | 4 |
| ___-piggledy | HIGGLEDY | HIG · GLE · DY | wordplay | 3 |
| Plot device everyone's chasing | MACGUFFIN | MAC · GUF · FIN | definition | 4 |
| Sneaky harm creeping in slowly | INSIDIOUS | INS · IDI · OUS | definition | 3 |
| Shining radiantly | REFULGENT | REF · UL · GENT | definition | 3 |
| Long, tedious procedure | RIGMAROLE | RIG · MAR · OLE | definition | 3 |
| Glacier's leftover rubble | MORAINE | MORA · INE | definition | 4 |

**Tile pool (20: 2 x 2-letter, 15 x 3-letter, 3 x 4-letter):** DY FIN GENT GLE GUF HIG IDI INE INS ION MAC MAR MORA OLE OSCI OUS REF RIG TAT UL

**Score:** decoys 2.7/20 + tempting pairs 0.8/16 + shared fragments 5.0/10 + anchor balance 7.2/8 + shape 12.0/12 + word appeal 14.0/14 + penalties -10.1 = **structure 31.6/80** (scaled 19.8/50); clue rating 13.9/30 + variety 8.0/8 + puns 6.0/12 + penalties 0.0 = **clues 27.9/50**

- Decoys (2): MARINE, REFINE
- Duplicate tiles: none; near-twin tiles: GLE/OLE, HIG/RIG, INE/INS, MAC/MAR
- Giveaway tiles (share of the answer's family): GUF (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: OSCITATION, HIGGLEDY, MACGUFFIN, RIGMAROLE, MORAINE
- Word frequency (zipf): OSCITATION 0.0, HIGGLEDY 1.69, MACGUFFIN 1.91, INSIDIOUS 3.24, REFULGENT 1.22, RIGMAROLE 1.93, MORAINE 2.69

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 244 [mixed]: Word Nerd  (total 47.6, candidate N25)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Accent mark, like a tilde | DIACRITIC | DIA · CRI · TIC | definition | 4 |
| Waffle between options | VACILLATE | VAC · ILL · ATE | pun | 4 |
| Belch, put politely | ERUCTATION | ER · UCTA · TION | definition | 4 |
| Wholesome and health-giving | SALUBRIOUS | SALU · BRI · OUS | definition | 3 |
| Tip or bribe, in the bazaar | BAKSHEESH | BAK · SHE · ESH | definition | 4 |
| Error clung to despite correction | MUMPSIMUS | MUM · PSI · MUS | definition | 4 |
| Sheer enough to see through | DIAPHANOUS | DIA · PHAN · OUS | definition | 4 |

**Tile pool (21: 1 x 2-letter, 16 x 3-letter, 4 x 4-letter):** ATE BAK BRI CRI DIA DIA ER ESH ILL MUM MUS OUS OUS PHAN PSI SALU SHE TIC TION UCTA VAC

**Score:** decoys 3.1/20 + tempting pairs 1.2/16 + shared fragments 7.5/10 + anchor balance 7.4/8 + shape 9.0/12 + word appeal 14.0/14 + penalties -9.9 = **structure 32.3/80** (scaled 20.2/50); clue rating 20.4/30 + variety 4.0/8 + puns 3.0/12 + penalties 0.0 = **clues 27.4/50**

- Decoys (4): BAKER, SHEER, CRITIC*, VACATE*
- Duplicate tiles: DIA, OUS; near-twin tiles: BRI/CRI, MUS/OUS
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: DIACRITIC, VACILLATE, ERUCTATION, SALUBRIOUS, MUMPSIMUS, DIAPHANOUS
- Word frequency (zipf): DIACRITIC 1.71, VACILLATE 1.77, ERUCTATION 0.0, SALUBRIOUS 2.13, BAKSHEESH 1.65, MUMPSIMUS 0.0, DIAPHANOUS 1.97

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 245 [mixed]: Word Nerd  (total 47.0, candidate N06)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Harmful in a sneaky, gradual way | PERNICIOUS | PER · NICI · OUS | definition | 3 |
| Lone hill rising from a plain | INSELBERG | IN · SEL · BERG | definition | 4 |
| Little hat over the e in fete | CIRCUMFLEX | CIR · CUM · FLEX | evocative | 5 |
| Philosophy that it's all about you | SOLIPSISM | SOL · IPS · ISM | pun | 4 |
| Dress down, severely | CASTIGATE | CAS · TIG · ATE | definition | 3 |
| Drowsy enough to drop off | SOMNOLENT | SOM · NOL · ENT | definition | 3 |
| Comic four-line biographical verse | CLERIHEW | CLE · RI · HEW | definition | 4 |

**Tile pool (21: 2 x 2-letter, 16 x 3-letter, 3 x 4-letter):** ATE BERG CAS CIR CLE CUM ENT FLEX HEW IN IPS ISM NICI NOL OUS PER RI SEL SOL SOM TIG

**Score:** decoys 2.4/20 + tempting pairs 2.0/16 + shared fragments 3.8/10 + anchor balance 7.1/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -10.8 = **structure 28.4/80** (scaled 17.8/50); clue rating 18.2/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 29.2/50**

- Decoys (2): CIRCLE, CUMIN
- Duplicate tiles: none; near-twin tiles: NOL/SOL, SEL/SOL, SOL/SOM
- Giveaway tiles (share of the answer's family): CIR (0.704); whole-word tiles: none
- Answers whose first tile has no rival continuation: PERNICIOUS, INSELBERG, CIRCUMFLEX, SOLIPSISM, SOMNOLENT, CLERIHEW
- Word frequency (zipf): PERNICIOUS 2.87, INSELBERG 0.0, CIRCUMFLEX 2.22, SOLIPSISM 2.11, CASTIGATE 1.92, SOMNOLENT 1.72, CLERIHEW 0.0

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 246 [mixed]: Word Nerd  (total 46.5, candidate N26)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Berate abusively | VITUPERATE | VIT · UPER · ATE | definition | 3 |
| Persian governor's province | SATRAPY | SAT · RAPY | definition | 4 |
| Plot's final untangling | DENOUEMENT | DEN · OUE · MENT | trivia | 4 |
| For the initiated only | ESOTERIC | ESO · TER · IC | definition | 3 |
| Scaly anteater that rolls up | PANGOLIN | PAN · GOL · IN | definition | 4 |
| Tons of soil for sons of toil | SPOONERISM | SPO · ONER · ISM | wordplay | 5 |
| Sparkle, like wit at its best | CORUSCATE | COR · US · CATE | definition | 4 |

**Tile pool (20: 3 x 2-letter, 12 x 3-letter, 5 x 4-letter):** ATE CATE COR DEN ESO GOL IC IN ISM MENT ONER OUE PAN RAPY SAT SPO TER UPER US VIT

**Score:** decoys 5.7/20 + tempting pairs 2.0/16 + shared fragments 0.0/10 + anchor balance 7.5/8 + shape 9.0/12 + word appeal 14.0/14 + penalties -14.0 = **structure 24.1/80** (scaled 15.1/50); clue rating 20.4/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 31.4/50**

- Decoys (5): GOLDEN, PANIC, INTER, CORONER, SATIN
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): OUE (0.412); whole-word tiles: none
- Answers whose first tile has no rival continuation: VITUPERATE, SATRAPY, DENOUEMENT, ESOTERIC, SPOONERISM, CORUSCATE
- Word frequency (zipf): VITUPERATE 0.0, SATRAPY 1.48, DENOUEMENT 2.42, ESOTERIC 3.17, PANGOLIN 2.36, SPOONERISM 1.33, CORUSCATE 0.0

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 247 [mixed]: Word Nerd  (total 46.4, candidate N13)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Public disgrace; strong abuse | OBLOQUY | OBLO · QUY | definition | 3 |
| Craft of gluing cutouts and varnish | DECOUPAGE | DEC · OUP · AGE | definition | 3 |
| Two dots that split naive vowels | DIAERESIS | DIA · ERE · SIS | wordplay | 4 |
| Soft whisper of rustling leaves | SUSURRUS | SUS · UR · RUS | evocative | 4 |
| Dusty blue-green, like a cabbage leaf | GLAUCOUS | GLA · UC · OUS | definition | 4 |
| Oily, in charm as well as texture | UNCTUOUS | UNC · TU · OUS | wordplay | 4 |
| Quack who climbed on a bench | MOUNTEBANK | MOUN · TEB · ANK | trivia | 4 |

**Tile pool (20: 3 x 2-letter, 15 x 3-letter, 2 x 4-letter):** AGE ANK DEC DIA ERE GLA MOUN OBLO OUP OUS OUS QUY RUS SIS SUS TEB TU UC UNC UR

**Score:** decoys 0.0/20 + tempting pairs 0.4/16 + shared fragments 7.5/10 + anchor balance 4.7/8 + shape 12.0/12 + word appeal 14.0/14 + penalties -15.9 = **structure 22.7/80** (scaled 14.2/50); clue rating 18.2/30 + variety 8.0/8 + puns 6.0/12 + penalties 0.0 = **clues 32.2/50**

- Decoys (0): none
- Duplicate tiles: OUS; near-twin tiles: OUP/OUS, OUS/RUS, OUS/SUS, SIS/SUS
- Giveaway tiles (share of the answer's family): MOUN (0.711), OBLO (0.52), QUY (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: OBLOQUY, DECOUPAGE, DIAERESIS, SUSURRUS, GLAUCOUS, UNCTUOUS, MOUNTEBANK
- Word frequency (zipf): OBLOQUY 1.3, DECOUPAGE 1.97, DIAERESIS 1.24, SUSURRUS 0.0, GLAUCOUS 2.12, UNCTUOUS 2.03, MOUNTEBANK 1.68

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 248 [mixed]: Word Nerd  (total 46.3, candidate N08)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Books from print's cradle days | INCUNABULA | INCU · NAB · ULA | trivia | 4 |
| Building with a beautiful view | BELVEDERE | BEL · VED · ERE | definition | 4 |
| Showy frill on a dress | FURBELOW | FUR · BE · LOW | definition | 3 |
| Password that betrays outsiders | SHIBBOLETH | SHIB · BOL · ETH | trivia | 4 |
| Emotional purge, Greek-tragedy style | CATHARSIS | CAT · HAR · SIS | definition | 4 |
| Nonsense that sounds fishy | CODSWALLOP | COD · SWAL · LOP | pun | 4 |
| Messy and unkempt | SLOVENLY | SLO · VEN · LY | definition | 3 |

**Tile pool (21: 2 x 2-letter, 16 x 3-letter, 3 x 4-letter):** BE BEL BOL CAT COD ERE ETH FUR HAR INCU LOP LOW LY NAB SHIB SIS SLO SWAL ULA VED VEN

**Score:** decoys 3.9/20 + tempting pairs 0.8/16 + shared fragments 3.8/10 + anchor balance 7.3/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -12.4 = **structure 27.3/80** (scaled 17.1/50); clue rating 18.2/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 29.2/50**

- Decoys (4): BELLY, SWALLOW, LOWLY, BELOW*
- Duplicate tiles: none; near-twin tiles: BEL/BOL, LOP/LOW, VED/VEN
- Giveaway tiles (share of the answer's family): SHIB (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: INCUNABULA, BELVEDERE, FURBELOW, SHIBBOLETH, CATHARSIS, CODSWALLOP, SLOVENLY
- Word frequency (zipf): INCUNABULA 1.8, BELVEDERE 2.79, FURBELOW 0.0, SHIBBOLETH 2.0, CATHARSIS 2.67, CODSWALLOP 1.55, SLOVENLY 2.21

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 249 [mixed]: Word Nerd  (total 44.2, candidate N19)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Thingamajig whose name escapes you | DOOHICKEY | DOO · HIC · KEY | evocative | 4 |
| Bearcat that smells like popcorn | BINTURONG | BIN · TUR · ONG | trivia | 5 |
| Relentless; can't be stopped | INEXORABLE | INEX · ORA · BLE | definition | 3 |
| Commotion over nothing much | KERFUFFLE | KER · FUF · FLE | definition | 4 |
| Windbag who never stops | BLOVIATOR | BLO · VIA · TOR | definition | 3 |
| Writing desk with flair | ESCRITOIRE | ES · CRIT · OIRE | definition | 3 |
| Make unclear, deliberately | OBFUSCATE | OB · FUS · CATE | definition | 3 |

**Tile pool (21: 2 x 2-letter, 15 x 3-letter, 4 x 4-letter):** BIN BLE BLO CATE CRIT DOO ES FLE FUF FUS HIC INEX KER KEY OB OIRE ONG ORA TOR TUR VIA

**Score:** decoys 7.0/20 + tempting pairs 0.0/16 + shared fragments 6.2/10 + anchor balance 7.1/8 + shape 8.3/12 + word appeal 14.0/14 + penalties -10.5 = **structure 32.1/80** (scaled 20.1/50); clue rating 16.1/30 + variety 8.0/8 + puns 0.0/12 + penalties 0.0 = **clues 24.1/50**

- Decoys (6): TURKEY, VIABLE, TURBINES, FUSES, ORATOR, HICKEY*
- Duplicate tiles: none; near-twin tiles: BLE/BLO, BLE/FLE, FUF/FUS, KER/KEY, TOR/TUR
- Giveaway tiles (share of the answer's family): FUF (1.0); whole-word tiles: none
- Answers whose first tile has no rival continuation: DOOHICKEY, BINTURONG, INEXORABLE, KERFUFFLE, BLOVIATOR, ESCRITOIRE
- Word frequency (zipf): DOOHICKEY 1.72, BINTURONG 1.09, INEXORABLE 2.57, KERFUFFLE 2.3, BLOVIATOR 0.0, ESCRITOIRE 1.08, OBFUSCATE 2.28

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 250 [mixed]: Word Nerd  (total 44.1, candidate N27)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Treacherous, faithless | PERFIDIOUS | PER · FID · IOUS | definition | 3 |
| Verbal diarrhea, clinically | LOGORRHEA | LOG · ORR · HEA | pun | 4 |
| Remark critically upon | ANIMADVERT | ANI · MAD · VERT | definition | 3 |
| 'Kiss this guy' for 'kiss the sky' | MONDEGREEN | MON · DEG · REEN | trivia | 5 |
| Just begun, not yet formed | INCHOATE | IN · CHO · ATE | definition | 3 |
| Aggressively defiant | TRUCULENT | TRU · CUL · ENT | definition | 3 |
| Appease, as angry gods | PROPITIATE | PROP · ITI · ATE | definition | 3 |

**Tile pool (21: 1 x 2-letter, 16 x 3-letter, 4 x 4-letter):** ANI ATE ATE CHO CUL DEG ENT FID HEA IN IOUS ITI LOG MAD MON ORR PER PROP REEN TRU VERT

**Score:** decoys 3.4/20 + tempting pairs 2.4/16 + shared fragments 2.5/10 + anchor balance 7.4/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -9.0 = **structure 30.7/80** (scaled 19.2/50); clue rating 13.9/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 24.9/50**

- Decoys (3): INITIATE, LOGIN, PERVERT
- Duplicate tiles: ATE; near-twin tiles: none
- Giveaway tiles (share of the answer's family): ANI (0.472), HEA (0.502); whole-word tiles: none
- Answers whose first tile has no rival continuation: PERFIDIOUS, LOGORRHEA, ANIMADVERT, MONDEGREEN, TRUCULENT, PROPITIATE
- Word frequency (zipf): PERFIDIOUS 2.09, LOGORRHEA 1.14, ANIMADVERT 0.0, MONDEGREEN 1.16, INCHOATE 2.06, TRUCULENT 2.01, PROPITIATE 1.53

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 251 [mixed]: Word Nerd  (total 44.0, candidate N11)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Gad about for fun | GALLIVANT | GAL · LIV · ANT | definition | 3 |
| Mistress of the castle keys | CHATELAINE | CHA · TEL · AINE | evocative | 4 |
| Nose-wrinklingly foul | MALODOROUS | MAL · ODOR · OUS | evocative | 3 |
| Dawdle when you should be working | LOLLYGAG | LOL · LY · GAG | definition | 3 |
| Wood-inlay art on furniture | MARQUETRY | MAR · QUE · TRY | definition | 4 |
| Cuddle and kiss, not cook pasta | CANOODLE | CANO · ODLE | pun | 4 |
| Well, actually... fussy about details | PEDANTIC | PED · ANT · IC | evocative | 4 |

**Tile pool (20: 2 x 2-letter, 14 x 3-letter, 4 x 4-letter):** AINE ANT ANT CANO CHA GAG GAL IC LIV LOL LY MAL MAR ODLE ODOR OUS PED QUE TEL TRY

**Score:** decoys 0.0/20 + tempting pairs 0.8/16 + shared fragments 6.2/10 + anchor balance 7.1/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -11.1 = **structure 27.0/80** (scaled 16.9/50); clue rating 16.1/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 27.1/50**

- Decoys (0): none
- Duplicate tiles: ANT; near-twin tiles: GAG/GAL, GAL/MAL, MAL/MAR
- Giveaway tiles (share of the answer's family): GAG (0.513), LOL (0.457); whole-word tiles: none
- Answers whose first tile has no rival continuation: GALLIVANT, CHATELAINE, LOLLYGAG, MARQUETRY, CANOODLE, PEDANTIC
- Word frequency (zipf): GALLIVANT 1.38, CHATELAINE 1.84, MALODOROUS 1.83, LOLLYGAG 1.21, MARQUETRY 2.05, CANOODLE 1.34, PEDANTIC 2.66

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 252 [mixed]: Word Nerd  (total 43.5, candidate N03)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Embarrassing tangle of a situation | IMBROGLIO | IMB · ROG · LIO | definition | 3 |
| Foodie with a fancier title | GASTRONOME | GAS · TRO · NOME | wordplay | 4 |
| Nonsense; also a frilly trifle | FOLDEROL | FOL · DER · OL | definition | 3 |
| Seeing patterns where none exist | APOPHENIA | APO · PHE · NIA | definition | 4 |
| Groove between your nose and lip | PHILTRUM | PHIL · TRUM | definition | 4 |
| Three dots for when words fail | ELLIPSIS | EL · LIP · SIS | evocative | 4 |
| Hide true feelings; put on a front | DISSEMBLE | DIS · SEM · BLE | definition | 3 |

**Tile pool (20: 2 x 2-letter, 15 x 3-letter, 3 x 4-letter):** APO BLE DER DIS EL FOL GAS IMB LIO LIP NIA NOME OL PHE PHIL ROG SEM SIS TRO TRUM

**Score:** decoys 2.0/20 + tempting pairs 0.4/16 + shared fragments 2.5/10 + anchor balance 7.4/8 + shape 11.0/12 + word appeal 14.0/14 + penalties -11.1 = **structure 26.3/80** (scaled 16.4/50); clue rating 16.1/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 27.1/50**

- Decoys (3): ELDER, OLDER*, FOLDER*
- Duplicate tiles: none; near-twin tiles: DIS/SIS, LIO/LIP
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: IMBROGLIO, GASTRONOME, FOLDEROL, APOPHENIA, PHILTRUM, DISSEMBLE
- Word frequency (zipf): IMBROGLIO 1.94, GASTRONOME 1.27, FOLDEROL 1.25, APOPHENIA 1.21, PHILTRUM 1.53, ELLIPSIS 2.43, DISSEMBLE 1.86

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 253 [mixed]: Word Nerd  (total 43.1, candidate N30)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Peevish and bad-tempered | SPLENETIC | SPLE · NE · TIC | definition | 3 |
| Smooth-talking ladies' man | LOTHARIO | LOT · HA · RIO | definition | 3 |
| Snooze through summer | AESTIVATE | AES · TIV · ATE | pun | 4 |
| High row of church windows | CLERESTORY | CLE · RES · TORY | definition | 4 |
| Redundancy, like 'free gift' | PLEONASM | PLE · ON · ASM | wordplay | 4 |
| Speak in weasel words | EQUIVOCATE | EQUI · VOC · ATE | definition | 3 |
| Unintelligible babble | GIBBERISH | GIB · BER · ISH | definition | 3 |

**Tile pool (21: 3 x 2-letter, 15 x 3-letter, 3 x 4-letter):** AES ASM ATE ATE BER CLE EQUI GIB HA ISH LOT NE ON PLE RES RIO SPLE TIC TIV TORY VOC

**Score:** decoys 3.7/20 + tempting pairs 0.4/16 + shared fragments 6.2/10 + anchor balance 7.2/8 + shape 9.3/12 + word appeal 14.0/14 + penalties -16.5 = **structure 24.3/80** (scaled 15.2/50); clue rating 13.9/30 + variety 8.0/8 + puns 6.0/12 + penalties 0.0 = **clues 27.9/50**

- Decoys (4): NEON, HAVOC, RESONATE, EQUINE
- Duplicate tiles: ATE; near-twin tiles: AES/RES, CLE/PLE, TIC/TIV
- Giveaway tiles (share of the answer's family): SPLE (0.681); whole-word tiles: none
- Answers whose first tile has no rival continuation: SPLENETIC, LOTHARIO, AESTIVATE, CLERESTORY, PLEONASM, EQUIVOCATE, GIBBERISH
- Word frequency (zipf): SPLENETIC 1.42, LOTHARIO 2.11, AESTIVATE 0.0, CLERESTORY 2.0, PLEONASM 1.29, EQUIVOCATE 1.72, GIBBERISH 2.97

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 254 [mixed]: Word Nerd  (total 43.0, candidate N22)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Make uneasy; throw off balance | DISCOMFIT | DIS · COM · FIT | definition | 3 |
| Stinkbird with clawed chicks | HOATZIN | HOAT · ZIN | trivia | 4 |
| Warmth of the winter sun | APRICITY | AP · RIC · ITY | evocative | 5 |
| Outline faintly; foreshadow | ADUMBRATE | AD · UMB · RATE | definition | 3 |
| Extra sound, as in 'athalete' | EPENTHESIS | EPEN · THE · SIS | definition | 4 |
| Quack remedy | NOSTRUM | NOS · TRUM | definition | 3 |
| Bass vs. bass, for one | HETERONYM | HE · TER · ONYM | wordplay | 4 |

**Tile pool (19: 3 x 2-letter, 11 x 3-letter, 5 x 4-letter):** AD AP COM DIS EPEN FIT HE HOAT ITY NOS ONYM RATE RIC SIS TER THE TRUM UMB ZIN

**Score:** decoys 5.8/20 + tempting pairs 1.6/16 + shared fragments 1.2/10 + anchor balance 4.7/8 + shape 8.6/12 + word appeal 14.0/14 + penalties -13.8 = **structure 22.1/80** (scaled 13.8/50); clue rating 18.2/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 29.2/50**

- Decoys (6): HEAD, SISTER, ADAPTER, HEAP, FITTER, THESIS*
- Duplicate tiles: none; near-twin tiles: DIS/SIS
- Giveaway tiles (share of the answer's family): EPEN (0.509), HOAT (1.0), ZIN (0.507); whole-word tiles: RATE
- Answers whose first tile has no rival continuation: HOATZIN, APRICITY, EPENTHESIS, NOSTRUM
- Word frequency (zipf): DISCOMFIT 1.22, HOATZIN 1.21, APRICITY 0.0, ADUMBRATE 1.07, EPENTHESIS 1.29, NOSTRUM 2.31, HETERONYM 0.0

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 255 [mixed]: Word Nerd  (total 42.5, candidate N09)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Egg-shaped hill left by a glacier | DRUMLIN | DRUM · LIN | definition | 4 |
| Art from whatever's lying around | BRICOLAGE | BRI · COL · AGE | definition | 4 |
| Uncultured type, art be damned | PHILISTINE | PHI · LIS · TINE | evocative | 3 |
| Snooze-inducing, like this clue | SOPORIFIC | SOP · ORI · FIC | pun | 4 |
| Quick to fly off the handle | IRASCIBLE | IRA · SCI · BLE | definition | 3 |
| Bartleby's job: professional copyist | SCRIVENER | SCRI · VEN · ER | trivia | 4 |
| Publicity hype at full blast | BALLYHOO | BAL · LY · HOO | definition | 3 |

**Tile pool (20: 2 x 2-letter, 15 x 3-letter, 3 x 4-letter):** AGE BAL BLE BRI COL DRUM ER FIC HOO IRA LIN LIS LY ORI PHI SCI SCRI SOP TINE VEN

**Score:** decoys 1.2/20 + tempting pairs 1.2/16 + shared fragments 2.5/10 + anchor balance 7.5/8 + shape 12.0/12 + word appeal 14.0/14 + penalties -13.6 = **structure 24.7/80** (scaled 15.4/50); clue rating 16.1/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 27.1/50**

- Decoys (1): LINER
- Duplicate tiles: none; near-twin tiles: BRI/ORI, LIN/LIS
- Giveaway tiles (share of the answer's family): IRA (0.507); whole-word tiles: DRUM
- Answers whose first tile has no rival continuation: DRUMLIN, BRICOLAGE, PHILISTINE, SOPORIFIC, IRASCIBLE, SCRIVENER, BALLYHOO
- Word frequency (zipf): DRUMLIN 1.75, BRICOLAGE 1.82, PHILISTINE 2.58, SOPORIFIC 2.1, IRASCIBLE 2.29, SCRIVENER 2.42, BALLYHOO 1.95

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 256 [mixed]: Word Nerd  (total 42.5, candidate N21)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Sea monster, or Hobbes's state | LEVIATHAN | LEV · IAT · HAN | trivia | 4 |
| Confused hodgepodge | FARRAGO | FAR · RAGO | definition | 3 |
| Too great for words | INEFFABLE | IN · EFF · ABLE | definition | 4 |
| Dangerous flightless bird of Australia | CASSOWARY | CAS · SOW · ARY | definition | 4 |
| Rake with loose morals | LIBERTINE | LIB · ERT · INE | definition | 3 |
| Seeing faces in electrical outlets | PAREIDOLIA | PARE · IDO · LIA | evocative | 5 |
| Smooth spot between the eyebrows | GLABELLA | GLA · BEL · LA | definition | 4 |

**Tile pool (20: 2 x 2-letter, 15 x 3-letter, 3 x 4-letter):** ABLE ARY BEL CAS EFF ERT FAR GLA HAN IAT IDO IN INE LA LEV LIA LIB PARE RAGO SOW

**Score:** decoys 2.0/20 + tempting pairs 0.8/16 + shared fragments 1.2/10 + anchor balance 5.0/8 + shape 12.0/12 + word appeal 14.0/14 + penalties -12.6 = **structure 22.5/80** (scaled 14.1/50); clue rating 20.4/30 + variety 8.0/8 + puns 0.0/12 + penalties 0.0 = **clues 28.4/50**

- Decoys (3): INERT, LIBIDO, LABEL*
- Duplicate tiles: none; near-twin tiles: LIA/LIB
- Giveaway tiles (share of the answer's family): LIB (0.545), RAGO (0.543), SOW (0.5); whole-word tiles: ABLE
- Answers whose first tile has no rival continuation: LEVIATHAN, FARRAGO, INEFFABLE, LIBERTINE, PAREIDOLIA, GLABELLA
- Word frequency (zipf): LEVIATHAN 3.09, FARRAGO 1.92, INEFFABLE 2.41, CASSOWARY 2.01, LIBERTINE 2.51, PAREIDOLIA 1.67, GLABELLA 1.89

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 257 [mixed]: Word Nerd  (total 42.4, candidate N12)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Unwanted adviser at the card table | KIBITZER | KI · BIT · ZER | definition | 4 |
| Tie, or letters joined as one | LIGATURE | LIGA · TURE | wordplay | 4 |
| Swagman's camp spot, an Aussie pool | BILLABONG | BIL · LAB · ONG | trivia | 4 |
| Bitter, sustained verbal attack | DIATRIBE | DIA · TRI · BE | definition | 3 |
| Unflappable calm, Epicurus's goal | ATARAXIA | AT · ARA · XIA | trivia | 4 |
| Formal tribute of high praise | ENCOMIUM | ENCO · MIUM | definition | 3 |
| Glass tube made by lightning | FULGURITE | FUL · GUR · ITE | definition | 5 |

**Tile pool (19: 3 x 2-letter, 12 x 3-letter, 4 x 4-letter):** ARA AT BE BIL BIT DIA ENCO FUL GUR ITE KI LAB LIGA MIUM ONG TRI TURE XIA ZER

**Score:** decoys 0.9/20 + tempting pairs 0.0/16 + shared fragments 2.5/10 + anchor balance 7.5/8 + shape 7.6/12 + word appeal 14.0/14 + penalties -14.9 = **structure 17.6/80** (scaled 11.0/50); clue rating 20.4/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 31.4/50**

- Decoys (2): BEAT, TRIBE*
- Duplicate tiles: none; near-twin tiles: BIL/BIT, DIA/XIA
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: KIBITZER, LIGATURE, BILLABONG, DIATRIBE, ENCOMIUM, FULGURITE
- Word frequency (zipf): KIBITZER 1.03, LIGATURE 2.78, BILLABONG 2.33, DIATRIBE 2.58, ATARAXIA 1.59, ENCOMIUM 1.82, FULGURITE 1.03

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 258 [mixed]: Word Nerd  (total 41.7, candidate N16)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Abusive language, hurled | INVECTIVE | IN · VEC · TIVE | definition | 3 |
| Silly antics and horseplay | TOMFOOLERY | TOM · FOO · LERY | definition | 3 |
| Know-nothing, Latin for 'we don't know' | IGNORAMUS | IGN · ORA · MUS | trivia | 5 |
| Sickly sweet, syrupy | SACCHARINE | SAC · CHAR · INE | definition | 3 |
| Talking a bill to death | FILIBUSTER | FILI · BUS · TER | evocative | 4 |
| Green patina on the Statue of Liberty | VERDIGRIS | VER · DIG · RIS | evocative | 4 |
| Rakishly disreputable | RAFFISH | RAFF · ISH | definition | 3 |

**Tile pool (20: 1 x 2-letter, 14 x 3-letter, 5 x 4-letter):** BUS CHAR DIG FILI FOO IGN IN INE ISH LERY MUS ORA RAFF RIS SAC TER TIVE TOM VEC VER

**Score:** decoys 4.1/20 + tempting pairs 0.4/16 + shared fragments 3.8/10 + anchor balance 7.2/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -11.3 = **structure 28.2/80** (scaled 17.6/50); clue rating 16.1/30 + variety 8.0/8 + puns 0.0/12 + penalties 0.0 = **clues 24.1/50**

- Decoys (4): CHARTER, INTER, MUSTER, BUSTER*
- Duplicate tiles: none; near-twin tiles: BUS/MUS, TER/VER, VEC/VER
- Giveaway tiles (share of the answer's family): IGN (0.455); whole-word tiles: none
- Answers whose first tile has no rival continuation: TOMFOOLERY, IGNORAMUS, SACCHARINE, FILIBUSTER, VERDIGRIS, RAFFISH
- Word frequency (zipf): INVECTIVE 2.41, TOMFOOLERY 2.23, IGNORAMUS 2.33, SACCHARINE 2.48, FILIBUSTER 2.89, VERDIGRIS 1.97, RAFFISH 1.55

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 259 [mixed]: Word Nerd  (total 41.1, candidate N01)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Earthy perfume after a rainstorm | PETRICHOR | PET · RIC · HOR | evocative | 4 |
| Biblical beast; any hulking giant | BEHEMOTH | BE · HEM · OTH | definition | 3 |
| Late bloomer in the classroom | OPSIMATH | OP · SIM · ATH | pun | 4 |
| Ruckus raised at full volume | HULLABALOO | HUL · LAB · ALOO | evocative | 3 |
| Grand poobah with a big head | PANJANDRUM | PAN · JAN · DRUM | pun | 4 |
| A nickname, put fancily | SOBRIQUET | SO · BRI · QUET | definition | 4 |
| Wicked, like a mustache-twirler | NEFARIOUS | NEF · ARI · OUS | evocative | 4 |

**Tile pool (21: 3 x 2-letter, 15 x 3-letter, 3 x 4-letter):** ALOO ARI ATH BE BRI DRUM HEM HOR HUL JAN LAB NEF OP OTH OUS PAN PET QUET RIC SIM SO

**Score:** decoys 1.2/20 + tempting pairs 0.4/16 + shared fragments 2.5/10 + anchor balance 2.4/8 + shape 9.3/12 + word appeal 14.0/14 + penalties -15.5 = **structure 14.3/80** (scaled 8.9/50); clue rating 18.2/30 + variety 8.0/8 + puns 6.0/12 + penalties 0.0 = **clues 32.2/50**

- Decoys (1): BRIBE
- Duplicate tiles: none; near-twin tiles: ARI/BRI, ATH/OTH
- Giveaway tiles (share of the answer's family): ALOO (0.638), HUL (1.0), JAN (0.443), NEF (0.514); whole-word tiles: DRUM
- Answers whose first tile has no rival continuation: PETRICHOR, OPSIMATH, HULLABALOO, PANJANDRUM, SOBRIQUET, NEFARIOUS
- Word frequency (zipf): PETRICHOR 1.6, BEHEMOTH 2.97, OPSIMATH 0.0, HULLABALOO 2.28, PANJANDRUM 1.31, SOBRIQUET 2.11, NEFARIOUS 3.0

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 260 [mixed]: Word Nerd  (total 39.9, candidate N18)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Lone peak that survived erosion | MONADNOCK | MON · AD · NOCK | definition | 4 |
| Fussy about every detail | FASTIDIOUS | FAS · TID · IOUS | definition | 3 |
| Job perk, in full | PERQUISITE | PER · QUIS · ITE | wordplay | 4 |
| Cushy job with no real duties | SINECURE | SIN · ECU · RE | definition | 4 |
| Deep sky blue | CERULEAN | CER · UL · EAN | definition | 3 |
| Unprincipled scoundrel | REPROBATE | REP · ROB · ATE | definition | 3 |
| Salad of everything, or a hodgepodge | SALMAGUNDI | SAL · MAG · UNDI | definition | 4 |

**Tile pool (21: 3 x 2-letter, 14 x 3-letter, 4 x 4-letter):** AD ATE CER EAN ECU FAS IOUS ITE MAG MON NOCK PER QUIS RE REP ROB SAL SIN TID UL UNDI

**Score:** decoys 4.9/20 + tempting pairs 2.0/16 + shared fragments 2.5/10 + anchor balance 7.5/8 + shape 8.3/12 + word appeal 14.0/14 + penalties -12.5 = **structure 26.8/80** (scaled 16.8/50); clue rating 16.1/30 + variety 4.0/8 + puns 3.0/12 + penalties 0.0 = **clues 23.1/50**

- Decoys (6): READ, SALAD, SALMON, REQUISITE, RESIN*, ULCER*
- Duplicate tiles: none; near-twin tiles: ATE/ITE, CER/PER
- Giveaway tiles (share of the answer's family): UNDI (0.512); whole-word tiles: none
- Answers whose first tile has no rival continuation: MONADNOCK, FASTIDIOUS, PERQUISITE, CERULEAN, SALMAGUNDI
- Word frequency (zipf): MONADNOCK 2.04, FASTIDIOUS 2.64, PERQUISITE 1.8, SINECURE 1.88, CERULEAN 2.3, REPROBATE 2.2, SALMAGUNDI 1.56

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 261 [mixed]: Word Nerd  (total 38.2, candidate N07)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Yes-man with a brown nose | SYCOPHANT | SYC · OPH · ANT | evocative | 4 |
| Painter's change of mind, peeking through | PENTIMENTO | PEN · TIM · ENTO | evocative | 4 |
| Softly flickering, like candlelight | LAMBENT | LAM · BENT | definition | 4 |
| Speech heaping on the praise | PANEGYRIC | PAN · EGY · RIC | definition | 3 |
| Here today, gone tomorrow | EPHEMERAL | EPH · EME · RAL | evocative | 4 |
| Noisy brawl | FRACAS | FRA · CAS | definition | 3 |
| Backwards-P paragraph mark | PILCROW | PIL · CROW | definition | 4 |

**Tile pool (18: 15 x 3-letter, 3 x 4-letter):** ANT BENT CAS CROW EGY EME ENTO EPH FRA LAM OPH PAN PEN PIL RAL RIC SYC TIM

**Score:** decoys 0.0/20 + tempting pairs 0.0/16 + shared fragments 2.5/10 + anchor balance 6.9/8 + shape 11.0/12 + word appeal 14.0/14 + penalties -8.8 = **structure 25.6/80** (scaled 16.0/50); clue rating 18.2/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 22.2/50**

- Decoys (0): none
- Duplicate tiles: none; near-twin tiles: EPH/OPH, PAN/PEN
- Giveaway tiles (share of the answer's family): EPH (0.522); whole-word tiles: none
- Answers whose first tile has no rival continuation: SYCOPHANT, PENTIMENTO, LAMBENT, PANEGYRIC, EPHEMERAL, FRACAS, PILCROW
- Word frequency (zipf): SYCOPHANT 2.2, PENTIMENTO 1.11, LAMBENT 1.61, PANEGYRIC 2.0, EPHEMERAL 2.99, FRACAS 2.38, PILCROW 0.0

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 262 [mixed]: Word Nerd  (total 37.4, candidate N29)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Loom-wrecker turned tech skeptic | LUDDITE | LUD · DITE | trivia | 4 |
| Breezily unconcerned | INSOUCIANT | INS · OUC · IANT | definition | 3 |
| Wheedle your way in | INVEIGLE | IN · VEI · GLE | definition | 3 |
| Aimless, half-hearted | DESULTORY | DES · ULT · ORY | definition | 3 |
| Stinky, though it sounds merely loud | NOISOME | NOIS · OME | pun | 4 |
| Boastful talk, extravagant bragging | GASCONADE | GAS · CON · ADE | definition | 3 |
| Radiantly brilliant | EFFULGENT | EFF · UL · GENT | definition | 3 |

**Tile pool (19: 2 x 2-letter, 13 x 3-letter, 4 x 4-letter):** ADE CON DES DITE EFF GAS GENT GLE IANT IN INS LUD NOIS OME ORY OUC UL ULT VEI

**Score:** decoys 3.3/20 + tempting pairs 0.8/16 + shared fragments 0.0/10 + anchor balance 7.6/8 + shape 10.7/12 + word appeal 14.0/14 + penalties -13.1 = **structure 23.3/80** (scaled 14.6/50); clue rating 11.8/30 + variety 8.0/8 + puns 3.0/12 + penalties 0.0 = **clues 22.8/50**

- Decoys (2): INSULT, INSULIN
- Duplicate tiles: none; near-twin tiles: none
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: LUDDITE, INVEIGLE, DESULTORY, NOISOME, GASCONADE, EFFULGENT
- Word frequency (zipf): LUDDITE 2.24, INSOUCIANT 1.63, INVEIGLE 1.51, DESULTORY 2.1, NOISOME 1.68, GASCONADE 1.64, EFFULGENT 1.56

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 263 [mixed]: Word Nerd  (total 37.0, candidate N20)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Bitter tirade, Demosthenes-style | PHILIPPIC | PHI · LIP · PIC | trivia | 4 |
| Excited fuss and fanfare | HOOPLA | HOO · PLA | definition | 3 |
| Old-timey punch-up | FISTICUFFS | FIS · TIC · UFFS | definition | 3 |
| Of the morning, like dew | MATUTINAL | MAT · UTI · NAL | definition | 3 |
| Brilliant red pigment | VERMILION | VER · MIL · ION | definition | 3 |
| Never at a loss for words | LOQUACIOUS | LOQU · ACI · OUS | evocative | 4 |
| Vain dandy; a jester's cap | COXCOMB | COX · COMB | definition | 4 |

**Tile pool (19: 16 x 3-letter, 3 x 4-letter):** ACI COMB COX FIS HOO ION LIP LOQU MAT MIL NAL OUS PHI PIC PLA TIC UFFS UTI VER

**Score:** decoys 0.0/20 + tempting pairs 0.4/16 + shared fragments 1.2/10 + anchor balance 4.6/8 + shape 12.0/12 + word appeal 14.0/14 + penalties -8.1 = **structure 24.1/80** (scaled 15.1/50); clue rating 13.9/30 + variety 8.0/8 + puns 0.0/12 + penalties 0.0 = **clues 21.9/50**

- Decoys (0): none
- Duplicate tiles: none; near-twin tiles: PIC/TIC
- Giveaway tiles (share of the answer's family): COX (1.0), LOQU (0.62), PLA (0.501); whole-word tiles: none
- Answers whose first tile has no rival continuation: PHILIPPIC, HOOPLA, FISTICUFFS, MATUTINAL, LOQUACIOUS, COXCOMB
- Word frequency (zipf): PHILIPPIC 1.35, HOOPLA 2.56, FISTICUFFS 2.3, MATUTINAL 0.0, VERMILION 2.75, LOQUACIOUS 2.11, COXCOMB 1.63

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 264 [mixed]: Word Nerd  (total 36.7, candidate N17)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Clumsy comic verse | DOGGEREL | DOG · GE · REL | definition | 3 |
| Salary, for the fancy | EMOLUMENT | EMO · LUM · ENT | definition | 3 |
| Foul-smelling, like a skunk | MEPHITIC | ME · PHI · TIC | trivia | 4 |
| Quickly fading from sight | EVANESCENT | EVA · NES · CENT | definition | 3 |
| Scraped manuscript, rewritten over | PALIMPSEST | PAL · IMPS · EST | definition | 4 |
| Sap the strength from | ENERVATE | ENER · VATE | definition | 3 |
| Freshly minted word, like 'rizz' | NEOLOGISM | NEO · LOG · ISM | evocative | 4 |

**Tile pool (20: 2 x 2-letter, 14 x 3-letter, 4 x 4-letter):** CENT DOG EMO ENER ENT EST EVA GE IMPS ISM LOG LUM ME NEO NES PAL PHI REL TIC VATE

**Score:** decoys 2.8/20 + tempting pairs 0.0/16 + shared fragments 3.8/10 + anchor balance 7.6/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -14.5 = **structure 23.6/80** (scaled 14.8/50); clue rating 13.9/30 + variety 8.0/8 + puns 0.0/12 + penalties 0.0 = **clues 21.9/50**

- Decoys (2): GENES, ENERGETIC
- Duplicate tiles: none; near-twin tiles: DOG/LOG, ENT/EST, NEO/NES
- Giveaway tiles (share of the answer's family): none; whole-word tiles: CENT
- Answers whose first tile has no rival continuation: DOGGEREL, EMOLUMENT, MEPHITIC, EVANESCENT, PALIMPSEST, ENERVATE, NEOLOGISM
- Word frequency (zipf): DOGGEREL 1.79, EMOLUMENT 1.82, MEPHITIC 1.22, EVANESCENT 2.15, PALIMPSEST 2.05, ENERVATE 1.26, NEOLOGISM 2.01

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 265 [mixed]: Word Nerd  (total 35.6, candidate N23)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Text that avoids a letter, say E | LIPOGRAM | LI · POG · RAM | definition | 4 |
| Harsh jumble of sounds | CACOPHONY | CAC · OPH · ONY | definition | 3 |
| Get-off-my-lawn type | CURMUDGEON | CUR · MUD · GEON | evocative | 5 |
| Noisy disturbance | RUMPUS | RUM · PUS | definition | 3 |
| Coax with flattery | BLANDISH | BLAN · DISH | definition | 3 |
| Cobweb-fine and delicate | GOSSAMER | GOS · SAM · ER | definition | 4 |
| Extremely poor; also stingy | PENURIOUS | PEN · URI · OUS | definition | 3 |

**Tile pool (19: 2 x 2-letter, 14 x 3-letter, 3 x 4-letter):** BLAN CAC CUR DISH ER GEON GOS LI MUD ONY OPH OUS PEN POG PUS RAM RUM SAM URI

**Score:** decoys 0.0/20 + tempting pairs 0.8/16 + shared fragments 3.8/10 + anchor balance 7.2/8 + shape 11.7/12 + word appeal 14.0/14 + penalties -12.7 = **structure 24.8/80** (scaled 15.5/50); clue rating 16.1/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 20.1/50**

- Decoys (0): none
- Duplicate tiles: none; near-twin tiles: OUS/PUS, RAM/RUM, RAM/SAM
- Giveaway tiles (share of the answer's family): none; whole-word tiles: DISH
- Answers whose first tile has no rival continuation: LIPOGRAM, CACOPHONY, CURMUDGEON, RUMPUS, BLANDISH, GOSSAMER, PENURIOUS
- Word frequency (zipf): LIPOGRAM 0.0, CACOPHONY 2.61, CURMUDGEON 2.21, RUMPUS 2.32, BLANDISH 1.21, GOSSAMER 2.44, PENURIOUS 1.43

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 266 [mixed]: Word Nerd  (total 35.2, candidate N02)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Flagrantly bad; literally out of the herd | EGREGIOUS | EG · REG · IOUS | trivia | 4 |
| Hot-tempered, full of yellow bile | CHOLERIC | CHO · LER · IC | trivia | 4 |
| One who simply loves to learn | PHILOMATH | PHI · LOM · ATH | definition | 3 |
| Itching for a fight | PUGNACIOUS | PUG · NAC · IOUS | definition | 3 |
| Monarch with a lot of clout | POTENTATE | POT · ENT · ATE | definition | 3 |
| Pointing-hand symbol in margins | MANICULE | MANI · CULE | definition | 4 |
| Scram, Civil War-style | SKEDADDLE | SKE · DAD · DLE | trivia | 4 |

**Tile pool (20: 2 x 2-letter, 14 x 3-letter, 4 x 4-letter):** ATE ATH CHO CULE DAD DLE EG ENT IC IOUS IOUS LER LOM MANI NAC PHI POT PUG REG SKE

**Score:** decoys 1.5/20 + tempting pairs 0.8/16 + shared fragments 3.8/10 + anchor balance 6.8/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -12.7 = **structure 24.1/80** (scaled 15.1/50); clue rating 16.1/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 20.1/50**

- Decoys (2): REGENT, POTENT*
- Duplicate tiles: IOUS; near-twin tiles: ATE/ATH
- Giveaway tiles (share of the answer's family): PHI (0.456), PUG (0.763); whole-word tiles: none
- Answers whose first tile has no rival continuation: EGREGIOUS, CHOLERIC, PHILOMATH, PUGNACIOUS, POTENTATE, MANICULE, SKEDADDLE
- Word frequency (zipf): EGREGIOUS 3.1, CHOLERIC 1.79, PHILOMATH 1.37, PUGNACIOUS 2.14, POTENTATE 1.94, MANICULE 0.0, SKEDADDLE 1.73

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 267 [mixed]: Word Nerd  (total 32.1, candidate N15)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Make bad worse | EXACERBATE | EXAC · ERB · ATE | definition | 3 |
| Scribe taking dictation | AMANUENSIS | AMA · NUEN · SIS | definition | 4 |
| Pleasantly lazy and dreamy | LANGUOROUS | LAN · GUO · ROUS | definition | 3 |
| ABBA figure: ask not what your country | CHIASMUS | CHI · AS · MUS | trivia | 4 |
| Grumpy, as if from indigestion | DYSPEPTIC | DYS · PEP · TIC | definition | 4 |
| Perpetual complainer | MALCONTENT | MAL · CONT · ENT | definition | 3 |
| Bowing and scraping excessively | OBSEQUIOUS | OBS · EQU · IOUS | definition | 3 |

**Tile pool (21: 1 x 2-letter, 15 x 3-letter, 5 x 4-letter):** AMA AS ATE CHI CONT DYS ENT EQU ERB EXAC GUO IOUS LAN MAL MUS NUEN OBS PEP ROUS SIS TIC

**Score:** decoys 2.5/20 + tempting pairs 0.8/16 + shared fragments 1.2/10 + anchor balance 7.2/8 + shape 9.3/12 + word appeal 14.0/14 + penalties -12.3 = **structure 22.7/80** (scaled 14.2/50); clue rating 13.9/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 17.9/50**

- Decoys (3): CONTENTIOUS, EQUATE, CONTENT*
- Duplicate tiles: none; near-twin tiles: IOUS/ROUS
- Giveaway tiles (share of the answer's family): NUEN (0.529); whole-word tiles: none
- Answers whose first tile has no rival continuation: EXACERBATE, AMANUENSIS, LANGUOROUS, CHIASMUS, DYSPEPTIC, MALCONTENT, OBSEQUIOUS
- Word frequency (zipf): EXACERBATE 2.92, AMANUENSIS 1.84, LANGUOROUS 1.9, CHIASMUS 1.44, DYSPEPTIC 1.74, MALCONTENT 2.05, OBSEQUIOUS 2.14

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 268 [mixed]: Word Nerd  (total 31.8, candidate N24)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Obsessive urge to stay in bed | CLINOMANIA | CLI · NOMA · NIA | definition | 4 |
| Scold sharply | OBJURGATE | OB · JUR · GATE | definition | 3 |
| Showy, frivolous finery | FRIPPERY | FRIP · PERY | definition | 3 |
| Ne'er-do-well with a rap sheet | MISCREANT | MIS · CRE · ANT | evocative | 3 |
| Obscure, known to few | RECONDITE | REC · OND · ITE | definition | 3 |
| Hard to understand | ABSTRUSE | ABS · TRU · SE | definition | 3 |
| Word lover, like you | LOGOPHILE | LOG · OPH · ILE | evocative | 5 |

**Tile pool (20: 2 x 2-letter, 14 x 3-letter, 4 x 4-letter):** ABS ANT CLI CRE FRIP GATE ILE ITE JUR LOG MIS NIA NOMA OB OND OPH PERY REC SE TRU

**Score:** decoys 1.0/20 + tempting pairs 1.2/16 + shared fragments 1.2/10 + anchor balance 7.1/8 + shape 10.0/12 + word appeal 14.0/14 + penalties -12.3 = **structure 22.2/80** (scaled 13.9/50); clue rating 13.9/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 17.9/50**

- Decoys (2): SEMIS, RECITE*
- Duplicate tiles: none; near-twin tiles: ILE/ITE
- Giveaway tiles (share of the answer's family): FRIP (1.0); whole-word tiles: GATE
- Answers whose first tile has no rival continuation: CLINOMANIA, FRIPPERY, MISCREANT, RECONDITE, ABSTRUSE, LOGOPHILE
- Word frequency (zipf): CLINOMANIA 0.0, OBJURGATE 0.0, FRIPPERY 1.57, MISCREANT 2.15, RECONDITE 1.73, ABSTRUSE 2.13, LOGOPHILE 0.0

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 269 [mixed]: Word Nerd  (total 31.7, candidate N10)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Always on the road | ITINERANT | ITI · NER · ANT | definition | 3 |
| Steeped in sorrow | DOLOROUS | DO · LOR · OUS | definition | 3 |
| Slash, by another name | VIRGULE | VIRG · ULE | definition | 4 |
| Trickery, legal or otherwise | CHICANERY | CHI · CAN · ERY | definition | 3 |
| Wind-carved ridges in snow | SASTRUGI | SAS · TRU · GI | definition | 4 |
| Diamond-suited clown | HARLEQUIN | HAR · LE · QUIN | evocative | 4 |
| Prolonged fuss and idle chatter | PALAVER | PALA · VER | definition | 3 |

**Tile pool (19: 3 x 2-letter, 13 x 3-letter, 3 x 4-letter):** ANT CAN CHI DO ERY GI HAR ITI LE LOR NER OUS PALA QUIN SAS TRU ULE VER VIRG

**Score:** decoys 3.8/20 + tempting pairs 0.8/16 + shared fragments 1.2/10 + anchor balance 7.2/8 + shape 9.7/12 + word appeal 14.0/14 + penalties -14.7 = **structure 22.0/80** (scaled 13.8/50); clue rating 13.9/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 17.9/50**

- Decoys (4): GIANT, CHILE, LEVER, DOLE
- Duplicate tiles: none; near-twin tiles: NER/VER
- Giveaway tiles (share of the answer's family): ITI (0.502); whole-word tiles: none
- Answers whose first tile has no rival continuation: ITINERANT, DOLOROUS, VIRGULE, CHICANERY, SASTRUGI, HARLEQUIN, PALAVER
- Word frequency (zipf): ITINERANT 2.82, DOLOROUS 1.7, VIRGULE 0.0, CHICANERY 2.24, SASTRUGI 0.0, HARLEQUIN 2.86, PALAVER 2.18

**Critique:** Word Nerd round: long, unusual vocabulary.

## Round 270 [mixed]: Word Nerd  (total 29.8, candidate N28)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Sideboard for dining room stuff | CREDENZA | CRE · DEN · ZA | definition | 3 |
| Fool with a silly-sounding name | NINCOMPOOP | NIN · COMP · OOP | evocative | 3 |
| Unstoppable force | JUGGERNAUT | JUG · GER · NAUT | definition | 3 |
| Pompous talk; also a twill cloth | FUSTIAN | FUS · TIAN | definition | 4 |
| Clear of blame | EXCULPATE | EX · CULP · ATE | definition | 3 |
| Lengthy, ranting lecture | HARANGUE | HAR · AN · GUE | definition | 3 |
| Evening-blooming or evening-active | VESPERTINE | VES · PER · TINE | definition | 3 |

**Tile pool (20: 3 x 2-letter, 12 x 3-letter, 5 x 4-letter):** AN ATE COMP CRE CULP DEN EX FUS GER GUE HAR JUG NAUT NIN OOP PER TIAN TINE VES ZA

**Score:** decoys 4.5/20 + tempting pairs 1.6/16 + shared fragments 1.2/10 + anchor balance 7.3/8 + shape 9.0/12 + word appeal 14.0/14 + penalties -11.7 = **structure 26.0/80** (scaled 16.2/50); clue rating 9.6/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 13.6/50**

- Decoys (3): CREATE, ANGER, HARDEN
- Duplicate tiles: none; near-twin tiles: GER/PER
- Giveaway tiles (share of the answer's family): none; whole-word tiles: none
- Answers whose first tile has no rival continuation: NINCOMPOOP, JUGGERNAUT, FUSTIAN, VESPERTINE
- Word frequency (zipf): CREDENZA 1.91, NINCOMPOOP 1.91, JUGGERNAUT 2.99, FUSTIAN 1.51, EXCULPATE 1.65, HARANGUE 2.07, VESPERTINE 1.43

**Critique:** Word Nerd round: long, unusual vocabulary.
