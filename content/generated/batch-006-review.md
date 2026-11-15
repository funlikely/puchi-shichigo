# batch-006: review sheet

12 rounds kept out of 12 clued candidates (12 word-disjoint candidates came out of
the generator). Rounds are ordered best-first by total score, so Round 1 is what the scoring
formula likes most and the last round least. Play them, then tell me where the formula is wrong.
One round was removed by editor veto rather than by score (see "Cut candidates").

**Total = structure (0-80, deterministic) + clues (0-20, judge ratings).** Batch range:
28.0 to 54.6, mean 39.2.

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
## Round 161 [themed]: Taskmaster: Champions  (total 54.6, candidate F01)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Series 10 champ; red ones mislead | HERRING | HER · RING | wordplay | 5 |
| Josh, the very first champion | WIDDICOMBE | WID · DIC · OMBE | trivia | 3 |
| Kerry, champion of series 7 | GODLIMAN | GOD · LIM · AN | trivia | 3 |
| Champion John, or red-breasted birds | ROBINS | ROB · INS | wordplay | 4 |
| Series 5 champ, Vic Reeves's partner | MORTIMER | MOR · TIM · ER | trivia | 4 |
| Ed, series 9 champ, or a punt | GAMBLE | GAM · BLE | wordplay | 4 |
| Mighty Boosh man who won series 4 | FIELDING | FI · ELD · ING | trivia | 4 |

**Tile pool (18: 3 x 2-letter, 13 x 3-letter, 2 x 4-letter):** AN BLE DIC ELD ER FI GAM GOD HER ING INS LIM MOR OMBE RING ROB TIM WID

**Score:** decoys 12.9/20 + tempting pairs 3.2/16 + shared fragments 2.5/10 + anchor balance 7.2/8 + shape 10.4/12 + word appeal 14.0/14 + penalties -16.3 = **structure 33.9/80** (scaled 21.2/50); clue rating 20.4/30 + variety 4.0/8 + puns 9.0/12 + penalties 0.0 = **clues 33.4/50**

- Decoys (11): GAMING, TIMING, FIRING, WIDER, ELDER, RINGING, GAMER, FIELDER, RINGER, FIELD*, TIMER*
- Duplicate tiles: none; near-twin tiles: ING/INS, LIM/TIM
- Giveaway tiles (share of the answer's family): OMBE (0.668); whole-word tiles: none
- Answers whose first tile has no rival continuation: HERRING, WIDDICOMBE, GODLIMAN, ROBINS, MORTIMER, GAMBLE
- Word frequency (zipf): HERRING 3.48, WIDDICOMBE 1.72, GODLIMAN 1.05, ROBINS 3.07, MORTIMER 3.23, GAMBLE 3.79, FIELDING 3.49

**Critique:** Fandom trivia round.

## Round 162 [themed]: The Good Place: Points and Ethics  (total 45.0, candidate F10)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Where all those points finally count | AFTERLIFE | AFT · ERL · IFE | pun | 4 |
| Residents of Michael's designed hood | NEIGHBORS | NE · IGH · BORS | wordplay | 3 |
| Chidi's field, ethics included | PHILOSOPHY | PHI · LOS · OPHY | definition | 3 |
| Chidi Sees the ___ | TIMEKNIFE | TIM · EK · NIFE | trivia | 5 |
| What Chidi supposedly was to Eleanor | SOULMATE | SO · ULM · ATE | trivia | 4 |
| Jason's cocktail solution to every problem | MOLOTOV | MOLO · TOV | pun | 5 |
| What We Owe to Each Other author | SCANLON | SCAN · LON | trivia | 4 |

**Tile pool (19: 3 x 2-letter, 11 x 3-letter, 5 x 4-letter):** AFT ATE BORS EK ERL IFE IGH LON LOS MOLO NE NIFE OPHY PHI SCAN SO TIM TOV ULM

**Score:** decoys 0.7/20 + tempting pairs 0.4/16 + shared fragments 1.2/10 + anchor balance 0.0/8 + shape 8.6/12 + word appeal 14.0/14 + penalties -16.1 = **structure 8.8/80** (scaled 5.5/50); clue rating 22.5/30 + variety 8.0/8 + puns 9.0/12 + penalties 0.0 = **clues 39.5/50**

- Decoys (1): SOLOS
- Duplicate tiles: none; near-twin tiles: LON/LOS
- Giveaway tiles (share of the answer's family): AFT (0.762), BORS (0.807), MOLO (0.63), OPHY (0.492), PHI (0.444), TOV (0.567); whole-word tiles: SCAN
- Answers whose first tile has no rival continuation: AFTERLIFE, NEIGHBORS, PHILOSOPHY, TIMEKNIFE, SOULMATE, MOLOTOV
- Word frequency (zipf): AFTERLIFE 3.36, NEIGHBORS 4.24, PHILOSOPHY 4.49, TIMEKNIFE 0.0, SOULMATE 2.92, MOLOTOV 3.02, SCANLON 2.7

**Critique:** Fandom trivia round.

## Round 163 [themed]: They Might Be Giants: Songbook  (total 44.8, candidate F05)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| ___ in Your Soul, a nightlight's song | BIRDHOUSE | BIRD · HOU · SE | trivia | 5 |
| ___ Man, hated by Triangle Man | PARTICLE | PAR · TI · CLE | trivia | 4 |
| Suite of tiny songs on Apollo 18 | FINGERTIPS | FING · ERT · IPS | trivia | 5 |
| Belgian painter they'd have you meet | ENSOR | EN · SOR | trivia | 5 |
| Epic king alongside Sargon and Hammurabi | GILGAMESH | GIL · GAM · ESH | trivia | 4 |
| Code-writing king in The Mesopotamians | HAMMURABI | HAM · MUR · ABI | trivia | 4 |
| Akkadian king in The Mesopotamians | SARGON | SAR · GON | trivia | 4 |

**Tile pool (19: 3 x 2-letter, 14 x 3-letter, 2 x 4-letter):** ABI BIRD CLE EN ERT ESH FING GAM GIL GON HAM HOU IPS MUR PAR SAR SE SOR TI

**Score:** decoys 1.6/20 + tempting pairs 2.0/16 + shared fragments 3.8/10 + anchor balance 6.8/8 + shape 11.7/12 + word appeal 14.0/14 + penalties -14.5 = **structure 25.4/80** (scaled 15.9/50); clue rating 28.9/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 28.9/50**

- Decoys (3): SEEN, PARSE, HOUSE*
- Duplicate tiles: none; near-twin tiles: GAM/HAM, PAR/SAR, SAR/SOR
- Giveaway tiles (share of the answer's family): ABI (0.504), FING (0.795); whole-word tiles: BIRD
- Answers whose first tile has no rival continuation: BIRDHOUSE, FINGERTIPS, GILGAMESH, HAMMURABI, SARGON
- Word frequency (zipf): BIRDHOUSE 2.32, PARTICLE 3.9, FINGERTIPS 3.27, ENSOR 1.89, GILGAMESH 2.68, HAMMURABI 2.14, SARGON 2.49

**Critique:** Fandom trivia round.

## Round 164 [themed]: Star Trek: Final Frontier  (total 43.5, candidate F04)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Silicon creature that wrote NO KILL I | HORTA | HOR · TA | trivia | 5 |
| Neelix's species | TALAXIAN | TA · LAX · IAN | trivia | 3 |
| Purrer McCoy says is born pregnant | TRIBBLE | TRIB · BLE | trivia | 5 |
| Where Data played Sherlock Holmes | HOLODECK | HOL · OD · ECK | trivia | 4 |
| Garak's people, fans of Enigma Tales | CARDASSIAN | CARD · ASS · IAN | trivia | 5 |
| Warp-core crystals taming antimatter | DILITHIUM | DIL · ITH · IUM | definition | 3 |
| Sisko's overgunned little warship | DEFIANT | DEF · IANT | trivia | 4 |

**Tile pool (18: 3 x 2-letter, 12 x 3-letter, 3 x 4-letter):** ASS BLE CARD DEF DIL ECK HOL HOR IAN IAN IANT ITH IUM LAX OD TA TA TRIB

**Score:** decoys 1.2/20 + tempting pairs 0.4/16 + shared fragments 6.2/10 + anchor balance 7.8/8 + shape 9.3/12 + word appeal 14.0/14 + penalties -15.1 = **structure 23.8/80** (scaled 14.9/50); clue rating 24.6/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 28.6/50**

- Decoys (1): TABLE
- Duplicate tiles: IAN, TA; near-twin tiles: HOL/HOR
- Giveaway tiles (share of the answer's family): none; whole-word tiles: CARD
- Answers whose first tile has no rival continuation: HORTA, TRIBBLE, HOLODECK, CARDASSIAN, DILITHIUM
- Word frequency (zipf): HORTA 2.47, TALAXIAN 0.0, TRIBBLE 2.08, HOLODECK 2.35, CARDASSIAN 2.16, DILITHIUM 1.89, DEFIANT 3.21

**Critique:** Fandom trivia round.

## Round 165 [themed]: Cosmere: Roshar and Beyond  (total 40.2, candidate F08)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Windrunner bonded to Syl | KALADIN | KA · LAD · IN | trivia | 3 |
| Lightweaver who sketches Memories | SHALLAN | SHAL · LAN | trivia | 4 |
| The Blackthorn, reformed | DALINAR | DALI · NAR | trivia | 4 |
| Fashion-minded duelist, the Kholin heir | ADOLIN | ADO · LIN | trivia | 4 |
| Novel he posted free, draft by draft | WARBREAKER | WAR · BREA · KER | trivia | 5 |
| Sanderson's debut, a city of fallen gods | ELANTRIS | EL · ANT · RIS | trivia | 4 |
| Cognitive Realm with oceans of beads | SHADESMAR | SHA · DES · MAR | trivia | 5 |

**Tile pool (18: 3 x 2-letter, 12 x 3-letter, 3 x 4-letter):** ADO ANT BREA DALI DES EL IN KA KER LAD LAN LIN MAR NAR RIS SHA SHAL WAR

**Score:** decoys 6.3/20 + tempting pairs 0.0/16 + shared fragments 6.2/10 + anchor balance 4.7/8 + shape 9.3/12 + word appeal 14.0/14 + penalties -15.6 = **structure 25.0/80** (scaled 15.6/50); clue rating 24.6/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 24.6/50**

- Decoys (6): MARKER, MARSHAL, SHAKER, MARLIN, SHADES*, BREAKER*
- Duplicate tiles: none; near-twin tiles: LAD/LAN, LAN/LIN, MAR/NAR, MAR/WAR, NAR/WAR
- Giveaway tiles (share of the answer's family): DALI (0.633), LAN (0.501), SHAL (0.727); whole-word tiles: none
- Answers whose first tile has no rival continuation: KALADIN, SHALLAN, DALINAR, ADOLIN, WARBREAKER, ELANTRIS, SHADESMAR
- Word frequency (zipf): KALADIN 1.16, SHALLAN 1.01, DALINAR 1.01, ADOLIN 0.0, WARBREAKER 0.0, ELANTRIS 1.18, SHADESMAR 0.0

**Critique:** Fandom trivia round.

## Round 166 [themed]: Project Hail Mary: Science  (total 38.9, candidate F12)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Microbe eating the Sun's energy | ASTROPHAGE | AST · ROPH · AGE | trivia | 3 |
| Microbe that eats the Sun-eaters | TAUMOEBA | TAU · MO · EBA | trivia | 4 |
| Infected star that somehow stayed bright | TAUCETI | TAU · CE · TI | trivia | 5 |
| Infrared line that betrayed the infection | PETROVA | PET · ROVA | trivia | 5 |
| Probes named John, Paul, George, Ringo | BEETLES | BEET · LES | trivia | 5 |
| Desert paved with breeder panels | SAHARA | SAH · ARA | trivia | 4 |
| Continent nuked to warm the planet | ANTARCTICA | ANT · ARC · TICA | trivia | 5 |

**Tile pool (18: 3 x 2-letter, 11 x 3-letter, 4 x 4-letter):** AGE ANT ARA ARC AST BEET CE EBA LES MO PET ROPH ROVA SAH TAU TAU TI TICA

**Score:** decoys 2.6/20 + tempting pairs 0.4/16 + shared fragments 5.0/10 + anchor balance 2.0/8 + shape 8.2/12 + word appeal 14.0/14 + penalties -16.2 = **structure 16.0/80** (scaled 10.0/50); clue rating 28.9/30 + variety 0.0/8 + puns 0.0/12 + penalties 0.0 = **clues 28.9/50**

- Decoys (3): TILES, MOLES, TIARA
- Duplicate tiles: TAU; near-twin tiles: ANT/AST, ARA/ARC
- Giveaway tiles (share of the answer's family): BEET (0.754), EBA (0.513), ROVA (0.555), SAH (0.497); whole-word tiles: none
- Answers whose first tile has no rival continuation: ASTROPHAGE, TAUMOEBA, TAUCETI, PETROVA, BEETLES, SAHARA, ANTARCTICA
- Word frequency (zipf): ASTROPHAGE 0.0, TAUMOEBA 0.0, TAUCETI 0.0, PETROVA 2.19, BEETLES 3.34, SAHARA 3.4, ANTARCTICA 3.53

**Critique:** Fandom trivia round.

## Round 167 [themed]: They Might Be Giants: Band Lore  (total 38.5, candidate F06)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Answering-machine service: call for a tune | DIALASONG | DIA · LAS · ONG | trivia | 5 |
| Knight whose giants were only windmills | QUIXOTE | QUI · XO · TE | evocative | 4 |
| 2013 album of tiny machines | NANOBOTS | NAN · OB · OTS | trivia | 4 |
| Their Mickey Mouse Clubhouse closer | HOTDOG | HOT · DOG | trivia | 5 |
| Apollo 18 song about warm-blooded kin | MAMMAL | MAM · MAL | trivia | 4 |
| The John on accordion | LINNELL | LIN · NELL | trivia | 3 |
| Massachusetts hometown and 1988 album | LINCOLN | LIN · COLN | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 12 x 3-letter, 2 x 4-letter):** COLN DIA DOG HOT LAS LIN LIN MAL MAM NAN NELL OB ONG OTS QUI TE XO

**Score:** decoys 0.3/20 + tempting pairs 0.0/16 + shared fragments 2.5/10 + anchor balance 4.2/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -14.3 = **structure 15.9/80** (scaled 9.9/50); clue rating 24.6/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 28.6/50**

- Decoys (1): QUITE*
- Duplicate tiles: LIN; near-twin tiles: none
- Giveaway tiles (share of the answer's family): COLN (1.0), MAM (0.685), NELL (0.737); whole-word tiles: none
- Answers whose first tile has no rival continuation: DIALASONG, QUIXOTE, NANOBOTS, MAMMAL, LINNELL, LINCOLN
- Word frequency (zipf): DIALASONG 0.0, QUIXOTE 2.93, NANOBOTS 2.09, HOTDOG 2.8, MAMMAL 3.31, LINNELL 1.89, LINCOLN 4.31

**Critique:** Fandom trivia round.

## Round 168 [themed]: Cosmere: Mistborn  (total 35.3, candidate F07)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Keeper who took up both Shards | SAZED | SA · ZED | trivia | 4 |
| Ash-choked world of the Final Empire | SCADRIAL | SCA · DRI · AL | trivia | 4 |
| Bead that makes anyone Mistborn | LERASIUM | LERA · SIUM | trivia | 5 |
| Burning metals to Push and Pull | ALLOMANCY | AL · LOM · ANCY | definition | 3 |
| Storing traits in metalminds | FERUCHEMY | FER · UCH · EMY | definition | 3 |
| Kandra who broke his Contract for Vin | TENSOON | TENS · OON | trivia | 4 |
| Steel Ministry hunter with spiked eyes | INQUISITOR | INQU · ISI · TOR | trivia | 4 |

**Tile pool (18: 3 x 2-letter, 10 x 3-letter, 5 x 4-letter):** AL AL ANCY DRI EMY FER INQU ISI LERA LOM OON SA SCA SIUM TENS TOR UCH ZED

**Score:** decoys 1.9/20 + tempting pairs 0.4/16 + shared fragments 2.5/10 + anchor balance 6.9/8 + shape 7.1/12 + word appeal 14.0/14 + penalties -15.3 = **structure 17.5/80** (scaled 10.9/50); clue rating 20.4/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 24.4/50**

- Decoys (2): SAFER, FERAL
- Duplicate tiles: AL; near-twin tiles: none
- Giveaway tiles (share of the answer's family): INQU (0.825), LERA (0.517); whole-word tiles: none
- Answers whose first tile has no rival continuation: SAZED, SCADRIAL, LERASIUM, ALLOMANCY, FERUCHEMY, TENSOON, INQUISITOR
- Word frequency (zipf): SAZED 0.0, SCADRIAL 0.0, LERASIUM 0.0, ALLOMANCY 0.0, FERUCHEMY 0.0, TENSOON 0.0, INQUISITOR 2.85

**Critique:** Fandom trivia round.

## Round 169 [themed]: Taskmaster: Behind the Tasks  (total 34.4, candidate F02)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Little Alex, the dutiful assistant | HORNE | HOR · NE | trivia | 3 |
| Alex's band: The Horne ___ | SECTION | SEC · TION | trivia | 4 |
| Studio decider when points are level | TIEBREAK | TIE · BRE · AK | definition | 3 |
| Greg, the 6-foot-8 Taskmaster | DAVIES | DAV · IES | trivia | 3 |
| Bring-from-home contest opening each show | PRIZETASK | PRI · ZET · ASK | trivia | 4 |
| Gilded bust of Greg, the trophy | GOLDENHEAD | GOL · DEN · HEAD | trivia | 5 |
| Mr ___, Greg's Inbetweeners role | GILBERT | GIL · BERT | trivia | 4 |

**Tile pool (17: 2 x 2-letter, 12 x 3-letter, 3 x 4-letter):** AK ASK BERT BRE DAV DEN GIL GOL HEAD HOR IES NE PRI SEC TIE TION ZET

**Score:** decoys 2.5/20 + tempting pairs 0.0/16 + shared fragments 1.2/10 + anchor balance 6.5/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -13.9 = **structure 19.5/80** (scaled 12.2/50); clue rating 18.2/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 22.2/50**

- Decoys (3): DENIES, BREAK*, GOLDEN*
- Duplicate tiles: none; near-twin tiles: GIL/GOL
- Giveaway tiles (share of the answer's family): BERT (0.535), GOL (0.497); whole-word tiles: HEAD
- Answers whose first tile has no rival continuation: HORNE, SECTION, TIEBREAK, DAVIES, PRIZETASK, GOLDENHEAD, GILBERT
- Word frequency (zipf): HORNE 3.17, SECTION 5.0, TIEBREAK 2.35, DAVIES 3.93, PRIZETASK 0.0, GOLDENHEAD 0.0, GILBERT 3.9

**Critique:** Fandom trivia round.

## Round 170 [themed]: The Good Place: Residents  (total 33.9, candidate F09)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Michael, played by a Cheers barman | TEDDANSON | TED · DAN · SON | trivia | 4 |
| Jason, the Jaguars-loving DJ, by surname | MENDOZA | MEN · DO · ZA | trivia | 4 |
| Chidi, the indecisive ethicist, by surname | ANAGONYE | ANA · GON · YE | trivia | 3 |
| Arizona dirtbag sent to the wrong place | ELEANOR | ELE · ANOR | evocative | 4 |
| Al-Jamil, champion name-dropper | TAHANI | TAH · ANI | trivia | 4 |
| Chidi's neuroscientist love in season 4 | SIMONE | SIM · ONE | trivia | 4 |
| Jason's best friend back in Jacksonville | PILLBOI | PILL · BOI | trivia | 4 |

**Tile pool (17: 3 x 2-letter, 12 x 3-letter, 2 x 4-letter):** ANA ANI ANOR BOI DAN DO ELE GON MEN ONE PILL SIM SON TAH TED YE ZA

**Score:** decoys 0.0/20 + tempting pairs 0.8/16 + shared fragments 2.5/10 + anchor balance 4.6/8 + shape 9.1/12 + word appeal 14.0/14 + penalties -15.8 = **structure 15.2/80** (scaled 9.5/50); clue rating 20.4/30 + variety 4.0/8 + puns 0.0/12 + penalties 0.0 = **clues 24.4/50**

- Decoys (0): none
- Duplicate tiles: none; near-twin tiles: ANA/ANI, GON/SON
- Giveaway tiles (share of the answer's family): ANI (0.502), BOI (0.547), TAH (0.721); whole-word tiles: PILL
- Answers whose first tile has no rival continuation: TEDDANSON, MENDOZA, ANAGONYE, TAHANI, SIMONE, PILLBOI
- Word frequency (zipf): TEDDANSON 0.0, MENDOZA 3.24, ANAGONYE 0.0, ELEANOR 3.81, TAHANI 1.65, SIMONE 3.63, PILLBOI 0.0

**Critique:** Fandom trivia round.

## Round 171 [themed]: Project Hail Mary: Crew  (total 33.3, candidate F11)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Russian crewmate with gallows humor | ILYUKHINA | ILY · UK · HINA | trivia | 4 |
| Unknown peril that killed Rocky's crew | RADIATION | RAD · IAT · ION | trivia | 5 |
| Rocky lives under crushing amounts | PRESSURE | PRES · SURE | pun | 4 |
| Coma side effect that wiped Grace | AMNESIA | AM · NE · SIA | trivia | 4 |
| Rocky's blind, five-legged kind | ERIDIAN | ERI · DIAN | trivia | 4 |
| What Rocky breathes back home | AMMONIA | AMMO · NIA | trivia | 4 |
| Grace's first name, slow to return | RYLAND | RYL · AND | trivia | 3 |

**Tile pool (17: 3 x 2-letter, 9 x 3-letter, 5 x 4-letter):** AM AMMO AND DIAN ERI HINA IAT ILY ION NE NIA PRES RAD RYL SIA SURE UK

**Score:** decoys 0.0/20 + tempting pairs 0.0/16 + shared fragments 1.2/10 + anchor balance 2.0/8 + shape 5.6/12 + word appeal 14.0/14 + penalties -16.8 = **structure 6.1/80** (scaled 3.8/50); clue rating 22.5/30 + variety 4.0/8 + puns 3.0/12 + penalties 0.0 = **clues 29.5/50**

- Decoys (0): none
- Duplicate tiles: none; near-twin tiles: NIA/SIA
- Giveaway tiles (share of the answer's family): AMMO (0.677), ERI (0.501), ILY (0.505), RYL (0.642); whole-word tiles: SURE
- Answers whose first tile has no rival continuation: ILYUKHINA, RADIATION, PRESSURE, AMNESIA, ERIDIAN, AMMONIA, RYLAND
- Word frequency (zipf): ILYUKHINA 0.0, RADIATION 4.27, PRESSURE 5.01, AMNESIA 3.34, ERIDIAN 0.0, AMMONIA 3.36, RYLAND 2.46

**Critique:** Fandom trivia round.

## Round 172 [themed]: Star Trek: Crew Manifest  (total 28.0, candidate F03)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Sisko the Emissary, informally | BENJAMIN | BEN · JAM · IN | trivia | 3 |
| Security chief killed by Armus | TASHAYAR | TAS · HA · YAR | trivia | 4 |
| Bones's first name, and Nimoy's | LEONARD | LEON · ARD | wordplay | 5 |
| Janeway, on a first-name basis | KATHRYN | KAT · HRYN | trivia | 3 |
| Captain born in La Barre, France | JEANLUC | JEAN · LUC | trivia | 4 |
| Maquis first officer with a facial tattoo | CHAKOTAY | CHA · KO · TAY | trivia | 3 |
| Doctor and mother of Wesley | CRUSHER | CRU · SHER | trivia | 3 |

**Tile pool (17: 3 x 2-letter, 10 x 3-letter, 4 x 4-letter):** ARD BEN CHA CRU HA HRYN IN JAM JEAN KAT KO LEON LUC SHER TAS TAY YAR

**Score:** decoys 2.2/20 + tempting pairs 0.0/16 + shared fragments 1.2/10 + anchor balance 0.0/8 + shape 4.8/12 + word appeal 14.0/14 + penalties -14.3 = **structure 7.9/80** (scaled 4.9/50); clue rating 16.1/30 + variety 4.0/8 + puns 3.0/12 + penalties 0.0 = **clues 23.1/50**

- Decoys (2): CHAIN, KOSHER
- Duplicate tiles: none; near-twin tiles: TAS/TAY
- Giveaway tiles (share of the answer's family): HRYN (1.0), KAT (0.537), LEON (0.736), LUC (0.514), YAR (0.524); whole-word tiles: none
- Answers whose first tile has no rival continuation: BENJAMIN, TASHAYAR, LEONARD, KATHRYN, JEANLUC, CRUSHER
- Word frequency (zipf): BENJAMIN 4.16, TASHAYAR 0.0, LEONARD 4.01, KATHRYN 3.48, JEANLUC 0.0, CHAKOTAY 1.94, CRUSHER 3.11

**Critique:** Fandom trivia round.
