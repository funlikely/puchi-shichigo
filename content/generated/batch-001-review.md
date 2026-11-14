# batch-001: review sheet

20 rounds kept out of 24 clued candidates (62 word-disjoint candidates came out of
the generator). Rounds are ordered best-first by total score, so Round 1 is what the scoring
formula likes most and Round 20 least. Play them, then tell me where the formula is wrong.
One round was removed by editor veto rather than by score (see "Cut candidates").

**Total = structure (0-80, deterministic) + clues (0-20, judge ratings).** Batch range:
77.9 to 86.5, mean 81.7.

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

* c047 (Tilting at Giants), total 77.5: BELFRY, ENVELOPE, REPORTEDLY, TURNOVER, WINDMILL, CATERING, VOLCANO. Cut on score. Structurally the least tangled round I clued: few shared tiles, several anchors (NDM, LCA, FRY). It was a candidate for the words and clues alone.
* c040 (Not Ha-Ha), total 77.2: PECULIAR, CANTER, PUNCHLINE, INTENSE, REASONING, CHEAPER, RECTANGLE. Cut on score. PUNCHLINE's CHL tile is a dead giveaway. "Funny" and "Joke" in neighbouring clues overlap in flavour. Theme label quotes the PECULIAR clue.
* c050 (Shaken or Stirred), total 75.7: APPALLING, MARMALADE, COCKTAIL, MARTIAL, REHEARSAL, SHALLOW, RENEW. Cut on score. ALL twice and MAR twice. "Shaken or stirred" will make people look for MARTINI, and MAR+TI is right there (MARTIAL). Theme label quotes that clue.
* c010 (Clip and Save), total 78.3: COUPON, MAYONNAISE, FORECAST, CONVINCE, COMPONENT, CURTAIN, RESIDING. Editor override: five flat definitions; the formula kept it on tile structure alone. Weakest clue set I wrote (five definitions); by taste I would drop it before any of the rounds cut on score, so I did.

---
## Round 1: Last Call  (total 86.5, candidate c012)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Wasting a sermon on the choir | PREACHING | PRE · ACH · ING | evocative | 4 |
| One who knows your usual | BARTENDER | BAR · TEN · DER | evocative | 5 |
| Like Mendeleev's table | PERIODIC | PER · IOD · IC | trivia | 4 |
| Downpour, or download | TORRENT | TOR · RE · NT | wordplay | 5 |
| How exes arrive | SEPARATELY | SE · PAR · ATE · LY | misdirection | 4 |
| The world, to an optimist | OYSTER | OYS · TER | wordplay | 5 |
| Green light's message | PROCEED | PRO · CE · ED | definition | 3 |

**Tile pool (21: 7 x 2-letter, 14 x 3-letter):** ACH ATE BAR CE DER ED IC ING IOD LY NT OYS PAR PER PRE PRO RE SE TEN TER TOR

**Score:** decoys 20.0/20 + tempting pairs 16.0/16 + shared fragments 10.0/10 + anchor balance 6.0/8 + shape 9.3/12 + word appeal 10.2/14 + penalties -3.5 = **structure 68.0/80**; clue rating 12.5/14 + clue variety 6.0/6 + clue penalties 0.0 = **clues 18.5/20**

- Decoys (38): PRESENT, SENT, PERCENT, RECENT, REACH, REACHED, CENT, PREPARED, PROPER, LYING, PROPERLY, REACHING, SEED, PREPARING, RELY, REED, TENSE, RENTED, RELYING, PROSE, RENTING, ICING, ICED, RESENT, PREACHED, SEEDING, BARTER, TENDERED, PRETENSE, BARING, REPROACH, PERIOD*, SEPARATE*, RENT*, TENDER*, PREACH*, ACHING*, PARSE*
- Duplicate tiles: none; near-twin tiles: BAR/PAR, DER/PER, DER/TER, PAR/PER, PER/TER, PRE/PRO, TEN/TER, TER/TOR
- Anchor tiles (rare fragments): IOD, OYS
- Answers whose first tile has no rival continuation: TORRENT, OYSTER
- Word frequency (zipf): PREACHING 3.69, BARTENDER 3.5, PERIODIC 3.63, TORRENT 3.43, SEPARATELY 4.08, OYSTER 3.54, PROCEED 4.18

**Weakest clue:** PROCEED ("Green light's message") is fine but ordinary.

**Weakest word:** SEPARATELY: an adverb, 10 letters in 4 tiles (SE-PAR-ATE-LY); the clue carries it.

**Notes:** My favourite clue set. OYSTER's clue needs the idiom "the world is your oyster"; solvers who miss it still get it from OYS. PREACHING lost its fill-in clue ("___ to the choir") because the sub-word PREACH (PRE+ACH) completes the blank too.

## Round 2: Stock Answers  (total 86.1, candidate c001)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Dasher, but not a reindeer | SPRINTER | SPR · INT · ER | misdirection | 4 |
| Kind of parking or universe | PARALLEL | PAR · AL · LEL | wordplay | 4 |
| Stock answer? | INVENTORY | INV · ENT · ORY | pun | 5 |
| He must be paid, proverbially | PIPER | PI · PER | trivia | 4 |
| Policy maker? | INSURER | IN · SU · RER | pun | 5 |
| Five-armed tide pool resident | STARFISH | ST · ARF · ISH | definition | 3 |
| Next generation, collectively | OFFSPRING | OFF · SPR · ING | definition | 2 |

**Tile pool (20: 6 x 2-letter, 14 x 3-letter):** AL ARF ENT ER IN ING INT INV ISH LEL OFF ORY PAR PER PI RER SPR SPR ST SU

**Score:** decoys 20.0/20 + tempting pairs 12.0/16 + shared fragments 10.0/10 + anchor balance 8.0/8 + shape 11.0/12 + word appeal 10.6/14 + penalties 0.0 = **structure 71.6/80**; clue rating 9.5/14 + clue variety 6.0/6 + clue penalties -1.0 = **clues 14.5/20**

- Decoys (23): STORY, SUPER, OFFER, ENTER, OFFERING, PARENT, ENTERING, INTENT, PARISH, PARENTING, PIER, STING, PARENTAL, STINT, SUING, PERISH, INVENTING, SPRINTING, STINGER, SPRING*, INTER*, SPRINT*, INVENT*
- Duplicate tiles: SPR; near-twin tiles: ENT/INT, ING/INT, ING/INV, INT/INV, PAR/PER, PER/RER
- Anchor tiles (rare fragments): ARF, LEL, RER
- Answers whose first tile has no rival continuation: none
- Word frequency (zipf): SPRINTER 3.19, PARALLEL 4.27, INVENTORY 4.14, PIPER 3.68, INSURER 3.53, STARFISH 3.0, OFFSPRING 3.77

**Weakest clue:** OFFSPRING ("Next generation, collectively") is a plain definition; I dropped the better "Issue for parents?" because the decoy PARENTING half-fits it.

**Weakest word:** INSURER: a dull word rescued only by its pun clue.

**Notes:** Two "?" puns in a row risk feeling samey. The SPR tile appears twice (SPRINTER, OFFSPRING), a nice shared anchor.

## Round 3: Rocks & Ranks  (total 85.7, candidate c004)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Comet or Cupid | REINDEER | RE · IND · EER | example | 5 |
| It settles at the bottom | SEDIMENT | SE · DIM · ENT | definition | 3 |
| Band's borrowed song | COVER | CO · VER | misdirection | 4 |
| Going on the offensive | ATTACKING | ATT · ACK · ING | definition | 3 |
| Pepper's rank | SERGEANT | SER · GEA · NT | trivia | 4 |
| Royal handful? | SCEPTER | SC · EPT · ER | pun | 4 |
| Rock in a belt | ASTEROID | AS · TER · OID | misdirection | 4 |

**Tile pool (20: 7 x 2-letter, 13 x 3-letter):** ACK AS ATT CO DIM EER ENT EPT ER GEA IND ING NT OID RE SC SE SER TER VER

**Score:** decoys 20.0/20 + tempting pairs 14.4/16 + shared fragments 10.0/10 + anchor balance 8.0/8 + shape 10.0/12 + word appeal 10.3/14 + penalties -2.5 = **structure 70.2/80**; clue rating 9.5/14 + clue variety 6.0/6 + clue penalties 0.0 = **clues 15.5/20**

- Decoys (25): SENT, CONTENT, ENTER, CORE, RENT, SERVER, COVERING, ENTERING, REVERSE, RECOVER, VERSE, SEAS, SCENT, COASTER, RENTING, ATTACKER, SCATTER, RESENT, CONT, ERAS, SEVER, ERASING, ASSENT, SEER, ATTACK*
- Duplicate tiles: none; near-twin tiles: EER/SER, EER/TER, EER/VER, ENT/EPT, IND/ING, SER/TER, SER/VER, TER/VER
- Anchor tiles (rare fragments): DIM, GEA, OID
- Answers whose first tile has no rival continuation: SERGEANT
- Word frequency (zipf): REINDEER 3.32, SEDIMENT 3.42, COVER 5.08, ATTACKING 4.29, SERGEANT 4.11, SCEPTER 2.73, ASTEROID 3.56

**Weakest clue:** ATTACKING: straight definition of a bland participle.

**Weakest word:** ATTACKING (inflected, nothing to play with); COVER is short and only 2 tiles.

**Notes:** "Comet or Cupid" sits next to ASTEROID on purpose: the solver's first thought is astronomy. SCEPTER uses the American spelling.

## Round 4: Waiting Room  (total 84.7, candidate c007)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Turn dollars into euros, say | CONVERT | CON · VE · RT | example | 3 |
| Calm sort in a waiting room? | PATIENT | PA · TI · ENT | pun | 4 |
| Lost in a what-if | WONDERING | WON · DER · ING | evocative | 3 |
| Half a school year | SEMESTER | SE · MES · TER | definition | 3 |
| Jury's happy ending | INNOCENT | IN · NOC · ENT | misdirection | 4 |
| Break in the action? | COMMERCIAL | COM · MER · CI · AL | pun | 5 |
| Second-place finish? | SILVER | SIL · VER | pun | 5 |

**Tile pool (21: 8 x 2-letter, 13 x 3-letter):** AL CI COM CON DER ENT ENT IN ING MER MES NOC PA RT SE SIL TER TI VE VER WON

**Score:** decoys 20.0/20 + tempting pairs 14.8/16 + shared fragments 10.0/10 + anchor balance 8.0/8 + shape 8.4/12 + word appeal 10.6/14 + penalties -2.5 = **structure 69.2/80**; clue rating 9.5/14 + clue variety 6.0/6 + clue penalties 0.0 = **clues 15.5/20**

- Decoys (28): PART, TIMES, COMING, SEVERAL, PAIN, SILENT, SEAL, VERSE, INTER, ALTER, INSERT, INCOMING, PAINTER, VEIN, TIMER, ALTERING, CIDER, CONVERSE, SEALING, CONCISE, INVERSE, CONVERTER, PARTING, PAVE, SEVER, VEAL, ALDER, WONDER*
- Duplicate tiles: ENT; near-twin tiles: COM/CON, CON/WON, DER/MER, DER/TER, DER/VER, MER/MES, MER/TER, MER/VER, TER/VER
- Anchor tiles (rare fragments): MES, NOC, WON
- Answers whose first tile has no rival continuation: WONDERING
- Word frequency (zipf): CONVERT 4.11, PATIENT 4.77, WONDERING 4.53, SEMESTER 4.03, INNOCENT 4.45, COMMERCIAL 4.92, SILVER 4.81

**Weakest clue:** SEMESTER ("Half a school year") is a dictionary definition.

**Weakest word:** WONDERING: inflected filler; CONVERT is fine but colourless.

**Notes:** Three "?" clues is one too many for a single round. PATIENT's clue leans on both senses of the word, which some solvers find too easy.

## Round 5: Crowns & Sparkle  (total 84.3, candidate c014)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Sachet scent | LAVENDER | LA · VEN · DER | definition | 3 |
| Bullwinkle, for one | MOOSE | MOO · SE | example | 4 |
| Craft sparkle you never fully vacuum | GLITTER | GLI · TT · ER | evocative | 5 |
| Crown specialist? | DENTIST | DEN · TI · ST | pun | 5 |
| "I coulda been a ___" | CONTENDER | CON · TEN · DER | fill-in | 4 |
| Kind of medicine or memo | INTERNAL | IN · TER · NAL | wordplay | 4 |
| Title at the pulpit | REVEREND | RE · VER · END | definition | 3 |

**Tile pool (20: 8 x 2-letter, 12 x 3-letter):** CON DEN DER DER END ER GLI IN LA MOO NAL RE SE ST TEN TER TI TT VEN VER

**Score:** decoys 20.0/20 + tempting pairs 13.2/16 + shared fragments 10.0/10 + anchor balance 6.0/8 + shape 9.0/12 + word appeal 11.6/14 + penalties -2.0 = **structure 67.8/80**; clue rating 10.5/14 + clue variety 6.0/6 + clue penalties 0.0 = **clues 16.5/20**

- Decoys (25): LAST, LATER, REST, SEVEN, LATTER, INTENSE, REVERSE, VERSE, TIER, TIRE, DENSE, TENSE, LADEN, CONVERSE, RENAL, INVERSE, CONVERTER, REIN, SEVER, RETINAL, GLIDER, SEER, SETTER, INTER*, TENDER*
- Duplicate tiles: DER; near-twin tiles: DEN/DER, DEN/TEN, DEN/VEN, DER/TER, DER/VER, TEN/TER, TEN/VEN, TER/VER, VEN/VER
- Anchor tiles (rare fragments): GLI, MOO
- Answers whose first tile has no rival continuation: MOOSE, GLITTER
- Word frequency (zipf): LAVENDER 3.44, MOOSE 3.61, GLITTER 3.56, DENTIST 3.86, CONTENDER 3.6, INTERNAL 4.66, REVEREND 3.74

**Weakest clue:** LAVENDER ("Sachet scent"): accurate, but "sachet" is not an everyday word.

**Weakest word:** INTERNAL: plain adjective. MOOSE is only 5 letters (MOO+SE).

**Notes:** DER appears twice (LAVENDER, CONTENDER) and VEN/DEN/TEN/VER/TER are all one letter apart, so this pool is properly slippery.

## Round 6: Indoor Flights  (total 83.4, candidate c009)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Flight indoors | STAIRCASE | STA · IRC · ASE | misdirection | 5 |
| Putting in, as software | INSTALLING | IN · ST · ALL · ING | definition | 2 |
| It makes balloons and prices rise | INFLATION | INF · LAT · ION | wordplay | 4 |
| Not second-guessing | CONFIDENT | CON · FID · ENT | definition | 3 |
| Carousel rider? | SUITCASE | SU · ITC · ASE | pun | 5 |
| Yo-yo's lifeline | STRING | STR · ING | evocative | 4 |
| Apple recipient, traditionally | TEACHER | TE · ACH · ER | misdirection | 4 |

**Tile pool (21: 5 x 2-letter, 16 x 3-letter):** ACH ALL ASE ASE CON ENT ER FID IN INF ING ING ION IRC ITC LAT ST STA STR SU TE

**Score:** decoys 20.0/20 + tempting pairs 13.2/16 + shared fragments 10.0/10 + anchor balance 6.0/8 + shape 11.0/12 + word appeal 10.2/14 + penalties -1.5 = **structure 68.9/80**; clue rating 9.5/14 + clue variety 6.0/6 + clue penalties -1.0 = **clues 14.5/20**

- Decoys (29): STATE, LATER, TEST, ENTER, TEACHING, TESTING, CONTEST, ENTERING, SUSTAIN, STAIN, ERASE, TEASE, SUING, STRINGENT, LATTE, ACHING, LATENT, STALLION, TESTER, STAINING, INFER, STINGING, STRINGER, STINGER, TEACH*, INSTALL*, STING*, STALL*, STALLING*
- Duplicate tiles: ASE, ING; near-twin tiles: CON/ION, INF/ING, IRC/ITC, STA/STR
- Anchor tiles (rare fragments): FID, IRC
- Answers whose first tile has no rival continuation: none
- Word frequency (zipf): STAIRCASE 3.58, INSTALLING 3.71, INFLATION 4.14, CONFIDENT 4.43, SUITCASE 3.55, STRING 4.4, TEACHER 4.88

**Weakest clue:** INSTALLING ("Putting in, as software").

**Weakest word:** INSTALLING: inflected and technical. STAIRCASE and SUITCASE both end in tile ASE, which is the point, but they also rhyme visually, which makes the pair fall together.

**Notes:** Best structural round for shared tiles (ASE twice, STA/STR/ST, ING twice). Theme label hints at STAIRCASE.

## Round 7: After Dark  (total 83.1, candidate c005)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Zone before dark? | TWILIGHT | TWI · LI · GHT | pun | 4 |
| Like a call that rings out | UNANSWERED | UN · ANS · WER · ED | definition | 3 |
| Do more than lurk | INTERACT | INT · ER · ACT | misdirection | 3 |
| Missing class, say | ABSENT | ABS · ENT | misdirection | 4 |
| Danger's rhyming partner, to kids | STRANGER | ST · RAN · GER | wordplay | 4 |
| Lemon pie's fluffy crown | MERINGUE | MER · ING · UE | evocative | 4 |
| Water-___ (almost waterproof) | RESISTANT | RES · IST · ANT | fill-in | 3 |

**Tile pool (21: 6 x 2-letter, 15 x 3-letter):** ABS ACT ANS ANT ED ENT ER GER GHT ING INT IST LI MER RAN RES ST TWI UE UN WER

**Score:** decoys 20.0/20 + tempting pairs 15.2/16 + shared fragments 10.0/10 + anchor balance 6.0/8 + shape 10.3/12 + word appeal 10.1/14 + penalties -2.0 = **structure 69.6/80**; clue rating 7.5/14 + clue variety 6.0/6 + clue penalties 0.0 = **clues 13.5/20**

- Decoys (35): LIST, ACTING, ENTER, ENTERED, LISTED, ENTERING, LISTING, LIGHTING, ACTED, INTENT, TWIST, LIED, LIGHTER, ANSWERING, TWISTED, MERGER, STING, RESISTED, STINT, RESISTING, TWISTING, RESENT, STUN, LIGHTED, RESENTED, STABS, TWISTER, STINGER, LIGHT*, ANSWER*, ANSWERED*, RESIST*, INTER*, INTACT*, RANGER*
- Duplicate tiles: none; near-twin tiles: ABS/ANS, ACT/ANT, ANS/ANT, ANT/ENT, ANT/INT, ENT/INT, GER/MER, GER/WER, ING/INT, INT/IST, MER/WER
- Anchor tiles (rare fragments): ABS, TWI
- Answers whose first tile has no rival continuation: ABSENT, MERINGUE
- Word frequency (zipf): TWILIGHT 3.82, UNANSWERED 3.31, INTERACT 4.05, ABSENT 3.98, STRANGER 4.28, MERINGUE 2.79, RESISTANT 3.99

**Weakest clue:** RESISTANT: the fill-in is serviceable, not clever, and "waterproof" does a lot of the work.

**Weakest word:** UNANSWERED: 10 letters split 2-3-3-2, long and a little clinical.

**Notes:** "Missing class" should read as "lacking style" first. Decoys RESISTING / RESISTED / RANGER / TWISTER make this pool busy.

## Round 8: Keys & Miles  (total 82.4, candidate c013)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Keeper of many keys | JANITOR | JAN · IT · OR | evocative | 4 |
| Doing a fishmonger's job | SCALING | SC · AL · ING | misdirection | 4 |
| Trip for two after the I do's | HONEYMOON | HON · EYM · OON | wordplay | 4 |
| Right next door | ADJACENT | AD · JAC · ENT | definition | 3 |
| I-95, for one | INTERSTATE | INT · ER · ST · ATE | example | 4 |
| Ask to the party | INVITE | INV · ITE | definition | 3 |
| Binge-watching session | MARATHON | MAR · AT · HON | misdirection | 4 |

**Tile pool (21: 8 x 2-letter, 13 x 3-letter):** AD AL AT ATE ENT ER EYM HON HON ING INT INV IT ITE JAC JAN MAR OON OR SC ST

**Score:** decoys 20.0/20 + tempting pairs 13.2/16 + shared fragments 10.0/10 + anchor balance 8.0/8 + shape 8.4/12 + word appeal 10.8/14 + penalties -2.5 = **structure 67.9/80**; clue rating 8.5/14 + clue variety 6.0/6 + clue penalties 0.0 = **clues 14.5/20**

- Decoys (26): ENTER, HONOR, ENTERING, SCORING, INTENT, ORAL, STATING, STAT, INVITING, SCENT, STING, SCORER, INVENTOR, MARITAL, INVENT, STORING, HONORING, INVADING, MAROON, INVENTING, INVADER, STINGER, SCAT, STATE*, INTER*, STINT*
- Duplicate tiles: HON; near-twin tiles: ATE/ITE, ENT/INT, HON/OON, ING/INT, ING/INV, INT/INV, JAC/JAN
- Anchor tiles (rare fragments): EYM, JAC, JAN
- Answers whose first tile has no rival continuation: JANITOR
- Word frequency (zipf): JANITOR 3.2, SCALING 3.63, HONEYMOON 3.68, ADJACENT 4.12, INTERSTATE 3.99, INVITE 4.3, MARATHON 4.16

**Weakest clue:** INVITE ("Ask to the party").

**Weakest word:** SCALING: inflected, and the clue's fish sense may feel like a stretch to some.

**Notes:** HON appears twice (HONEYMOON, MARATHON) and INT/INV are near-twins. HONEYMOON's tile EYM is an ugly anchor.

## Round 9: Slow and Steady  (total 81.7, candidate c008)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Slow and steady winner | TORTOISE | TOR · TOI · SE | trivia | 4 |
| Catcher on a football field | RECEIVER | RE · CEI · VER | misdirection | 4 |
| Trailer before the trailer | TEASER | TEA · SER | wordplay | 4 |
| Season that really pours | MONSOON | MO · NS · OON | definition | 3 |
| Like a spy in bed? | UNDERCOVER | UN · DE · RCO · VER | pun | 4 |
| Handed over, as a trophy | PRESENTED | PRE · SEN · TED | definition | 2 |
| Coat applier? | PAINTER | PA · IN · TER | pun | 4 |

**Tile pool (21: 8 x 2-letter, 13 x 3-letter):** CEI DE IN MO NS OON PA PRE RCO RE SE SEN SER TEA TED TER TOI TOR UN VER VER

**Score:** decoys 20.0/20 + tempting pairs 14.8/16 + shared fragments 10.0/10 + anchor balance 8.0/8 + shape 8.4/12 + word appeal 10.5/14 + penalties -2.5 = **structure 69.2/80**; clue rating 7.5/14 + clue variety 6.0/6 + clue penalties -1.0 = **clues 12.5/20**

- Decoys (32): MORE, SENSE, MODE, PREPARE, MOTOR, MONSTER, SERVER, REVERSE, PAINTED, MOUNTED, VERSE, DEMO, PRESENTER, INSERTED, DESERTED, TEASE, DETER, PANS, INVERSE, INVERTED, REIN, INTERNS, SERMONS, MOVER, SEVER, REVERTED, RESENTED, INNS, DEMOTED, REMOVER, PAIN*, INTER*
- Duplicate tiles: VER; near-twin tiles: SEN/SER, SER/TER, SER/VER, TEA/TED, TEA/TER, TED/TER, TER/TOR, TER/VER
- Anchor tiles (rare fragments): CEI, RCO, TOI
- Answers whose first tile has no rival continuation: TORTOISE
- Word frequency (zipf): TORTOISE 3.26, RECEIVER 4.09, TEASER 3.47, MONSOON 3.33, UNDERCOVER 3.77, PRESENTED 4.75, PAINTER 3.93

**Weakest clue:** PRESENTED ("Handed over, as a trophy"): flat, and the word gives nothing to work with.

**Weakest word:** PRESENTED (inflected, dull). UNDERCOVER's tiles UN-DE-RCO-VER include the ugly 3-consonant-ish RCO.

**Notes:** Theme label quotes the TORTOISE clue. Many 2-letter tiles here (8 of 21), so it plays a bit easier than the score suggests.

## Round 10: Smoothie Operator  (total 80.8, candidate c041)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| In a November mood? | THANKFUL | TH · ANK · FUL | pun | 4 |
| Brains of the heist | MASTERMIND | MAS · TE · RM · IND | evocative | 4 |
| "It's a ___ Life" | WONDERFUL | WON · DER · FUL | fill-in | 4 |
| One taking orders, and tips | WAITER | WAI · TER | misdirection | 4 |
| Saying no, or going downhill | DECLINING | DEC · LIN · ING | wordplay | 4 |
| Smoothie operator? | BLENDER | BL · END · ER | pun | 5 |
| Tiny wooden intruder | SPLINTER | SPL · IN · TER | evocative | 4 |

**Tile pool (21: 6 x 2-letter, 15 x 3-letter):** ANK BL DEC DER END ER FUL FUL IN IND ING LIN MAS RM SPL TE TER TER TH WAI WON

**Score:** decoys 19.7/20 + tempting pairs 9.6/16 + shared fragments 10.0/10 + anchor balance 8.0/8 + shape 10.3/12 + word appeal 10.1/14 + penalties -4.5 = **structure 63.3/80**; clue rating 11.5/14 + clue variety 6.0/6 + clue penalties 0.0 = **clues 17.5/20**

- Decoys (21): THING, MASTER, ENDING, WONDERING, BLIND, THIN, BLANK, LINER, THANKING, BLENDING, MASTERING, BLING, BLINDING, MASTERFUL, TETHER, THANK*, TERM*, WONDER*, INTER*, BLEND*, LINING*
- Duplicate tiles: FUL, TER; near-twin tiles: DEC/DER, DER/TER, END/IND, IND/ING
- Anchor tiles (rare fragments): SPL, WAI, WON
- Answers whose first tile has no rival continuation: WONDERFUL, DECLINING, SPLINTER
- Word frequency (zipf): THANKFUL 3.93, MASTERMIND 3.36, WONDERFUL 4.85, WAITER 3.61, DECLINING 3.83, BLENDER 3.43, SPLINTER 3.28

**Weakest clue:** THANKFUL ("In a November mood?") assumes US Thanksgiving.

**Weakest word:** DECLINING: inflected; MASTERMIND's tiles MAS-TE-RM-IND are choppy.

**Notes:** FUL twice (THANKFUL, WONDERFUL) and TER twice (WAITER, SPLINTER); decoys MASTERFUL, WONDERING, BLINDING. Theme label quotes the BLENDER clue.

## Round 11: Half Horse  (total 80.7, candidate c018)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Mustang, maybe (not the Ford) | STALLION | ST · ALL · ION | misdirection | 4 |
| Passport stamp collector | TRAVELER | TRA · VEL · ER | evocative | 4 |
| Hoarder with wings? | DRAGON | DRA · GON | pun | 4 |
| Opposite, in math class | INVERSE | IN · VER · SE | definition | 3 |
| Half man, half horse | CENTAUR | CEN · TA · UR | definition | 3 |
| All mixed up | CONFUSED | CON · FUS · ED | definition | 3 |
| Polka band squeeze? | ACCORDION | ACC · ORD · ION | pun | 4 |

**Tile pool (20: 7 x 2-letter, 13 x 3-letter):** ACC ALL CEN CON DRA ED ER FUS GON IN ION ION ORD SE ST TA TRA UR VEL VER

**Score:** decoys 20.0/20 + tempting pairs 11.6/16 + shared fragments 10.0/10 + anchor balance 6.0/8 + shape 10.0/12 + word appeal 11.1/14 + penalties -1.5 = **structure 67.2/80**; clue rating 7.5/14 + clue variety 6.0/6 + clue penalties 0.0 = **clues 13.5/20**

- Decoys (30): ORDER, TRAIN, ORDERED, TRAINED, CONTAIN, CONTRAST, SEED, CONFUSION, INSTALL, TRAINER, DRAIN, TRAVELED, FUSION, TASTED, DRAINED, SEVERED, CONVERSE, TRAVERSE, INFUSED, STALLED, INFUSION, INCENSE, ACCORDED, SEER, TRAVEL*, VERSE*, ACCORD*, STALL*, FUSED*, SEVER*
- Duplicate tiles: ION; near-twin tiles: CEN/CON, CON/GON, CON/ION, DRA/TRA, GON/ION, VEL/VER
- Anchor tiles (rare fragments): FUS, GON
- Answers whose first tile has no rival continuation: none
- Word frequency (zipf): STALLION 3.24, TRAVELER 3.57, DRAGON 4.41, INVERSE 3.42, CENTAUR 2.79, CONFUSED 4.47, ACCORDION 3.09

**Weakest clue:** CONFUSED ("All mixed up"): flat, though it winks at the tile jumble.

**Weakest word:** INVERSE: schoolroom word. CENTAUR's clue is a definition and STALLION makes "horse" a visible cross-hint.

**Notes:** ION twice (STALLION, ACCORDION). Decoy CONFUSION (CON+FUS+ION) is a real trap for the CONFUSED clue; the clue's adjective form is what rules it out.

## Round 12: X Marks It  (total 80.1, candidate c015)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| About to happen, like doom | IMPENDING | IMP · END · ING | definition | 3 |
| Finger armor for sewing | THIMBLE | TH · IMB · LE | evocative | 4 |
| Cast material | PLASTER | PLA · ST · ER | misdirection | 4 |
| Hot seat for a job seeker | INTERVIEW | INT · ERV · IEW | evocative | 3 |
| Built-in | INHERENT | INH · ERE · NT | definition | 3 |
| X marks its spot | TREASURE | TRE · ASU · RE | trivia | 4 |
| Far from the beach | INLAND | INL · AND | definition | 3 |

**Tile pool (20: 6 x 2-letter, 14 x 3-letter):** AND ASU END ER ERE ERV IEW IMB IMP ING INH INL INT LE NT PLA RE ST TH TRE

**Score:** decoys 20.0/20 + tempting pairs 11.6/16 + shared fragments 10.0/10 + anchor balance 8.0/8 + shape 11.0/12 + word appeal 10.5/14 + penalties -3.5 = **structure 67.6/80**; clue rating 6.5/14 + clue variety 6.0/6 + clue penalties 0.0 = **clues 12.5/20**

- Decoys (22): THERE, THING, REST, INTEREST, STAND, PLANT, STANDING, RENT, INTER, INTEND, RESTING, PLANTING, STING, LENT, RENTING, STINT, LEST, INTENDING, PLANTER, ERASURE, STINGER, ENDING*
- Duplicate tiles: none; near-twin tiles: AND/END, ERE/ERV, ERE/TRE, IMB/IMP, ING/INH, ING/INL, ING/INT, INH/INL, INH/INT, INL/INT
- Anchor tiles (rare fragments): ASU, IEW, IMB, INH, INL
- Answers whose first tile has no rival continuation: TREASURE, INLAND
- Word frequency (zipf): IMPENDING 3.53, THIMBLE 2.53, PLASTER 3.53, INTERVIEW 4.86, INHERENT 3.83, TREASURE 4.17, INLAND 3.83

**Weakest clue:** INHERENT ("Built-in"): correct, colourless.

**Weakest word:** INHERENT and IMPENDING: two abstract IN-/IM- adjectives in one round.

**Notes:** Four answers start with IN-/IM- tiles (IMP, INT, INH, INL): good ambiguity, but the first tiles are one letter apart rather than shared, so it is more fiddly than tricky.

## Round 13: Cats and Dogs  (total 80.0, candidate c006)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Coming down in buckets | RAINING | RA · IN · ING | evocative | 3 |
| Nobody blinks in one | STANDOFF | ST · AND · OFF | misdirection | 4 |
| Polite response to a dad joke | CHUCKLE | CHU · CK · LE | evocative | 4 |
| Souvenir shop bauble | TRINKET | TRI · NK · ET | definition | 3 |
| String around a finger, e.g. | REMINDER | REM · IND · ER | example | 4 |
| Endured, as surgery | UNDERWENT | UND · ERW · ENT | definition | 2 |
| Stick up for | DEFEND | DEF · END | definition | 3 |

**Tile pool (20: 8 x 2-letter, 12 x 3-letter):** AND CHU CK DEF END ENT ER ERW ET IN IND ING LE NK OFF RA REM ST TRI UND

**Score:** decoys 20.0/20 + tempting pairs 15.2/16 + shared fragments 10.0/10 + anchor balance 6.0/8 + shape 9.0/12 + word appeal 10.8/14 + penalties -1.5 = **structure 69.5/80**; clue rating 5.5/14 + clue variety 6.0/6 + clue penalties -1.0 = **clues 10.5/20**

- Decoys (33): UNDER, OFFER, STANDING, ENTER, ENDING, OFFERING, TRICK, RANK, ENTERING, DEFENDING, RANKING, STRAIN, DEFENDER, DEFINING, RACK, STING, REMINDING, OFFENDER, CHUNK, OFFEND, LEST, OFFENDING, RACKET, TRICKLE, DEFER, RACKING, TRICKING, STINGER, REMAND, STAND*, RAIN*, REMIND*, CHUCK*
- Duplicate tiles: none; near-twin tiles: AND/END, AND/IND, AND/UND, END/ENT, END/IND, END/UND, IND/ING, IND/UND
- Anchor tiles (rare fragments): CHU, ERW
- Answers whose first tile has no rival continuation: none
- Word frequency (zipf): RAINING 3.72, STANDOFF 3.13, CHUCKLE 3.52, TRINKET 2.7, REMINDER 4.12, UNDERWENT 3.65, DEFEND 4.47

**Weakest clue:** UNDERWENT ("Endured, as surgery") is the flattest clue in the batch.

**Weakest word:** UNDERWENT: an irregular past tense is no fun to clue or to find.

**Notes:** The theme label is a deliberate nudge toward RAINING; I dropped the fill-in "___ cats and dogs" because the sub-word RAIN (RA+IN) completes it too. Tiles IND and END/ENT/AND are nicely confusable.

## Round 14: Strikes Twice  (total 79.9, candidate c027)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Fair setting | COUNTY | COU · NTY | misdirection | 5 |
| Like some relatives and thunder | DISTANT | DIS · TA · NT | wordplay | 4 |
| Pancake flipper | SPATULA | SPA · TU · LA | definition | 3 |
| Spotless, like some steel | STAINLESS | STA · INL · ESS | definition | 3 |
| It never strikes twice, supposedly | LIGHTNING | LIG · HTN · ING | trivia | 4 |
| Never letting up | RELENTLESS | RE · LE · NTL · ESS | definition | 3 |
| Arm with suckers | TENTACLE | TE · NTA · CLE | misdirection | 4 |

**Tile pool (21: 7 x 2-letter, 14 x 3-letter):** CLE COU DIS ESS ESS HTN ING INL LA LE LIG NT NTA NTL NTY RE SPA STA TA TE TU

**Score:** decoys 20.0/20 + tempting pairs 9.2/16 + shared fragments 10.0/10 + anchor balance 8.0/8 + shape 9.3/12 + word appeal 9.9/14 + penalties -1.0 = **structure 65.4/80**; clue rating 8.5/14 + clue variety 6.0/6 + clue penalties 0.0 = **clues 14.5/20**

- Decoys (22): STATE, LATE, COUNT, TALENT, RENT, DISCOUNT, TALE, SPARE, COUNTING, RELATE, TENT, COUNTLESS, STARE, STATUTE, LENT, RENTING, COUNTESS, STATURE, STALE, LATENT, RECOUNT, LIGHTNESS
- Duplicate tiles: ESS; near-twin tiles: ING/INL, NTA/NTL, NTA/NTY, NTA/STA, NTL/NTY, SPA/STA
- Anchor tiles (rare fragments): HTN, INL, NTY
- Answers whose first tile has no rival continuation: LIGHTNING
- Word frequency (zipf): COUNTY 5.19, DISTANT 4.19, SPATULA 2.86, STAINLESS 3.76, LIGHTNING 4.22, RELENTLESS 3.51, TENTACLE 2.67

**Weakest clue:** SPATULA ("Pancake flipper") is the obvious clue.

**Weakest word:** RELENTLESS: tiles RE-LE-NTL-ESS; NTL is a vowel-less giveaway. STAINLESS shares ESS with it (intended) but also the -LESS ending, which is a bit repetitive.

**Notes:** Thunder in one clue and LIGHTNING as another answer is a small cross-hint. Theme label quotes the LIGHTNING clue.

## Round 15: Grapevine  (total 79.8, candidate c017)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Fan in the stands | SUPPORTER | SUP · POR · TER | misdirection | 3 |
| Banana peels' second act | COMPOST | COM · PO · ST | evocative | 5 |
| It may end with a ring | PROPOSAL | PRO · POS · AL | misdirection | 4 |
| Poking the bear | PROVOKING | PRO · VOK · ING | evocative | 4 |
| It travels by grapevine | GOSSIP | GOS · SIP | evocative | 4 |
| Tight bunch | CLUSTER | CL · UST · ER | definition | 2 |
| Yoga class leader | INSTRUCTOR | IN · ST · RUC · TOR | example | 3 |

**Tile pool (21: 7 x 2-letter, 14 x 3-letter):** AL CL COM ER GOS IN ING PO POR POS PRO PRO RUC SIP ST ST SUP TER TOR UST VOK

**Score:** decoys 20.0/20 + tempting pairs 12.0/16 + shared fragments 10.0/10 + anchor balance 8.0/8 + shape 9.3/12 + word appeal 10.5/14 + penalties -2.5 = **structure 67.3/80**; clue rating 7.5/14 + clue variety 6.0/6 + clue penalties -1.0 = **clues 12.5/20**

- Decoys (21): COMING, SUPER, POSTING, POSTER, INTER, ALTER, POSTAL, INCOMING, COMPOSER, STING, POSING, PROPOSING, POINTER, ALTERING, CLING, COMPOSING, INVOKING, SUPPOSING, STINGER, POST*, PORTER*
- Duplicate tiles: PRO, ST; near-twin tiles: GOS/POS, POR/POS, POR/TOR, SIP/SUP, TER/TOR
- Anchor tiles (rare fragments): GOS, SIP, VOK
- Answers whose first tile has no rival continuation: GOSSIP
- Word frequency (zipf): SUPPORTER 4.07, COMPOST 3.21, PROPOSAL 4.47, PROVOKING 3.47, GOSSIP 3.88, CLUSTER 3.99, INSTRUCTOR 4.02

**Weakest clue:** CLUSTER ("Tight bunch").

**Weakest word:** INSTRUCTOR: long and businesslike; PROVOKING is inflected.

**Notes:** PRO twice and POR/POS/PO near-twins. Theme label repeats a word from the GOSSIP clue.

## Round 16: Counting Sheep  (total 79.4, candidate c021)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Customer service beef | COMPLAINT | COM · PLA · INT | misdirection | 4 |
| TV remote's invisible beam | INFRARED | INF · RAR · ED | evocative | 4 |
| When bears sleep in | WINTER | WIN · TER | evocative | 4 |
| Come through, with pizza? | DELIVER | DE · LIV · ER | pun | 4 |
| Counting sheep's cause | INSOMNIA | IN · SOM · NIA | evocative | 4 |
| Mixing together | COMBINING | COM · BIN · ING | definition | 2 |
| Idyllically rural | PASTORAL | PAS · TOR · AL | definition | 3 |

**Tile pool (20: 5 x 2-letter, 15 x 3-letter):** AL BIN COM COM DE ED ER IN INF ING INT LIV NIA PAS PLA RAR SOM TER TOR WIN

**Score:** decoys 20.0/20 + tempting pairs 11.6/16 + shared fragments 10.0/10 + anchor balance 6.0/8 + shape 12.0/12 + word appeal 10.8/14 + penalties -3.5 = **structure 66.9/80**; clue rating 7.5/14 + clue variety 6.0/6 + clue penalties -1.0 = **clues 12.5/20**

- Decoys (22): DEAL, LIVING, LIVED, INDEED, COMBINED, DEALING, PLAIN, COMPLAIN, DEALER, INTER, ALTER, ALTERED, INCOMING, DEED, ALTERING, DETER, INFER, RARER, COMING*, LIVER*, DEER*, PASTOR*
- Duplicate tiles: COM; near-twin tiles: BIN/WIN, COM/SOM, INF/ING, INF/INT, ING/INT, TER/TOR
- Anchor tiles (rare fragments): NIA, RAR
- Answers whose first tile has no rival continuation: WINTER, PASTORAL
- Word frequency (zipf): COMPLAINT 4.32, INFRARED 3.71, WINTER 4.89, DELIVER 4.55, INSOMNIA 3.43, COMBINING 3.9, PASTORAL 3.54

**Weakest clue:** COMBINING ("Mixing together").

**Weakest word:** COMBINING: inflected filler. INSOMNIA's tile SOM/NIA are both anchors, so it falls quickly.

**Notes:** I changed COMPLAINT's clue from bare "Beef" because the decoy COMPLAIN (COM+PLA+IN) would have fit it as a verb. COM twice.

## Round 17: Called It  (total 79.4, candidate c038)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Second draft | REWRITE | RE · WRI · TE | definition | 3 |
| Ride with a third wheel? | TRICYCLE | TRI · CYC · LE | pun | 4 |
| One who works under the hood | MECHANIC | ME · CHA · NIC | definition | 3 |
| Chirper, or game with wickets | CRICKET | CRI · CK · ET | wordplay | 4 |
| Iceberg's famous victim | TITANIC | TI · TA · NIC | trivia | 4 |
| Called it | PREDICTED | PRE · DIC · TED | misdirection | 5 |
| Hustle's rhyming partner | BUSTLE | BUS · TLE | wordplay | 4 |

**Tile pool (20: 8 x 2-letter, 12 x 3-letter):** BUS CHA CK CRI CYC DIC ET LE ME NIC NIC PRE RE TA TE TED TI TLE TRI WRI

**Score:** decoys 20.0/20 + tempting pairs 9.6/16 + shared fragments 7.5/10 + anchor balance 8.0/8 + shape 9.0/12 + word appeal 11.3/14 + penalties -1.5 = **structure 63.9/80**; clue rating 9.5/14 + clue variety 6.0/6 + clue penalties 0.0 = **clues 15.5/20**

- Decoys (24): TIME, MEET, TITLE, CRIME, TICKET, TRICK, TALE, TACKLE, MERE, TIRE, TICK, BUSTED, META, TILE, DICTATE, TAME, MEDIC, DICTATED, TACK, RECYCLE, TRICKLE, TICKLE, WRITE*, CYCLE*
- Duplicate tiles: NIC; near-twin tiles: CRI/TRI, CRI/WRI, DIC/NIC, TRI/WRI
- Anchor tiles (rare fragments): BUS, CYC, WRI
- Answers whose first tile has no rival continuation: none
- Word frequency (zipf): REWRITE 3.47, TRICYCLE 2.79, MECHANIC 3.79, CRICKET 4.39, TITANIC 3.59, PREDICTED 4.12, BUSTLE 2.98

**Weakest clue:** MECHANIC ("One who works under the hood").

**Weakest word:** PREDICTED: inflected, but it earns its place through the clue.

**Notes:** NIC twice (MECHANIC, TITANIC), TRI/CRI twins, and lots of short real-word decoys (TICKET, TICKLE, TACKLE, TRICKLE). Seven 2-letter tiles.

## Round 18: Brass & Paper  (total 79.2, candidate c034)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Contract add-on | RIDER | RI · DER | misdirection | 4 |
| Fog of bewilderment | CONFUSION | CON · FUS · ION | evocative | 3 |
| Celebration litter | CONFETTI | CON · FET · TI | evocative | 4 |
| Bring back to glory | RESTORE | RE · ST · ORE | definition | 3 |
| Brass with a slide | TROMBONE | TRO · MBO · NE | misdirection | 4 |
| Carry, or carry away | TRANSPORT | TRA · NSP · ORT | wordplay | 4 |
| Jury's last word | VERDICT | VER · DI · CT | evocative | 4 |

**Tile pool (20: 7 x 2-letter, 13 x 3-letter):** CON CON CT DER DI FET FUS ION MBO NE NSP ORE ORT RE RI ST TI TRA TRO VER

**Score:** decoys 20.0/20 + tempting pairs 10.0/16 + shared fragments 7.5/10 + anchor balance 8.0/8 + shape 10.0/12 + word appeal 10.2/14 + penalties -1.0 = **structure 64.7/80**; clue rating 8.5/14 + clue variety 6.0/6 + clue penalties 0.0 = **clues 14.5/20**

- Decoys (20): NEVER, RIVER, CONTRACT, DIRECT, CONTRAST, CONNECT, STRICT, NEST, TIRE, TRACTION, TRADER, TRACT, DIRE, DINE, DISTORT, RETRACT, REST*, STORE*, FUSION*, DIVER*
- Duplicate tiles: CON; near-twin tiles: CON/ION, DER/VER, ORE/ORT, TRA/TRO
- Anchor tiles (rare fragments): FET, FUS, MBO, NSP
- Answers whose first tile has no rival continuation: TROMBONE
- Word frequency (zipf): RIDER 4.02, CONFUSION 4.19, CONFETTI 3.03, RESTORE 4.18, TROMBONE 2.97, TRANSPORT 4.68, VERDICT 4.03

**Weakest clue:** CONFUSION ("Fog of bewilderment") is wordy for what it does.

**Weakest word:** RIDER: 5 letters, 2 tiles; CONFUSION is abstract.

**Notes:** CON twice, TRO/TRA twins, and the decoy CONTRACT (CON+TRA+CT) is sitting in the pool while RIDER's clue says "Contract".

## Round 19: Out of This World  (total 78.9, candidate c035)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| Pub quiz fodder | TRIVIA | TRI · VIA | definition | 3 |
| Commuter to the space station | ASTRONAUT | AST · RON · AUT | misdirection | 4 |
| Where crude gets polished? | REFINERY | REF · IN · ERY | pun | 5 |
| Architect's 3D preview | RENDERING | REN · DER · ING | definition | 3 |
| Go from Clark Kent to Superman | TRANSFORM | TRA · NSF · ORM | example | 4 |
| Ring preventer on a table | COASTER | CO · AST · ER | misdirection | 4 |
| Desk item that bites paper | STAPLER | ST · APL · ER | evocative | 3 |

**Tile pool (20: 5 x 2-letter, 15 x 3-letter):** APL AST AST AUT CO DER ER ER ERY IN ING NSF ORM REF REN RON ST TRA TRI VIA

**Score:** decoys 20.0/20 + tempting pairs 8.4/16 + shared fragments 10.0/10 + anchor balance 8.0/8 + shape 12.0/12 + word appeal 10.5/14 + penalties -4.5 = **structure 64.4/80**; clue rating 8.5/14 + clue variety 6.0/6 + clue penalties 0.0 = **clues 14.5/20**

- Decoys (20): COST, TRAINING, TRAIN, TRANSFER, STORM, REFORM, REFER, COIN, TRAINER, STING, TRADER, COSTING, CORONER, REFINING, REFORMING, STORMING, REFORMER, STINGER, COAST*, RENDER*
- Duplicate tiles: AST, ER; near-twin tiles: AST/AUT, REF/REN, REN/RON, TRA/TRI
- Anchor tiles (rare fragments): APL, NSF, VIA
- Answers whose first tile has no rival continuation: TRIVIA, ASTRONAUT, RENDERING
- Word frequency (zipf): TRIVIA 3.47, ASTRONAUT 3.6, REFINERY 3.49, RENDERING 3.79, TRANSFORM 4.04, COASTER 3.69, STAPLER 2.53

**Weakest clue:** RENDERING ("Architect's 3D preview"): narrow sense of the word.

**Weakest word:** RENDERING: inflected-looking and technical.

**Notes:** AST twice (ASTRONAUT, COASTER); TRI/TRA and REF/REN twins. TRANSFORM's tiles TRA-NSF-ORM contain the ugly NSF.

## Round 20: Up a Sleeve  (total 77.9, candidate c046)

| Clue | Answer | Tiles | Type | Self-rating |
|---|---|---|---|---|
| It jams at deadline | PRINTER | PR · IN · TER | evocative | 4 |
| Kind of illusion | OPTICAL | OPT · IC · AL | definition | 3 |
| Where no roads go | WILDERNESS | WIL · DE · RN · ESS | evocative | 4 |
| Fridge art holder | MAGNET | MAG · NET | evocative | 4 |
| Hat-trick performer? | MAGICIAN | MAG · IC · IAN | pun | 5 |
| Army unit of several companies | BATTALION | BAT · TAL · ION | trivia | 3 |
| Like an idle mind or a minstrel | WANDERING | WAN · DER · ING | wordplay | 4 |

**Tile pool (21: 7 x 2-letter, 14 x 3-letter):** AL BAT DE DER ESS IAN IC IC IN ING ION MAG MAG NET OPT PR RN TAL TER WAN WIL

**Score:** decoys 20.0/20 + tempting pairs 9.6/16 + shared fragments 8.8/10 + anchor balance 6.0/8 + shape 9.3/12 + word appeal 10.2/14 + penalties -1.5 = **structure 62.4/80**; clue rating 9.5/14 + clue variety 6.0/6 + clue penalties 0.0 = **clues 15.5/20**

- Decoys (24): DEAL, PRESS, INTERNET, OPTION, DEALING, MAGICAL, MAGNETIC, PRESSING, ALTER, PRICING, OPTIONAL, DEBATING, ALTERING, BATTER, ICING, DETER, WILDER, OPTING, ALDER, MAGIC*, INTER*, WANDER*, OPTIC*, WANING*
- Duplicate tiles: IC, MAG; near-twin tiles: DER/TER, IAN/ION, IAN/WAN
- Anchor tiles (rare fragments): WAN, WIL
- Answers whose first tile has no rival continuation: none
- Word frequency (zipf): PRINTER 3.93, OPTICAL 4.07, WILDERNESS 3.95, MAGNET 3.73, MAGICIAN 3.53, BATTALION 3.81, WANDERING 3.8

**Weakest clue:** BATTALION ("Army unit of several companies") is an encyclopedia entry.

**Weakest word:** BATTALION: the least friendly word here.

**Notes:** MAG twice and IC twice, so MAGIC / MAGICAL / MAGNETIC are all spellable decoys. WILDERNESS splits WIL-DE-RN-ESS; RN is harsh.
