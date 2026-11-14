# Clue writer prompt (stage 4a)

You are writing clues for a Seven Little Words-style puzzle. You get one round
from `work/clue_requests.json`: seven ANSWERS, their tiles, and the list of
DECOYS (other real words the tile pool can spell).

Write ONE clue per answer. Rules:

1. Terse: 2-6 words (hard cap 7 words / 42 characters).
2. Never use the answer, or any word sharing its root or first 4+ letters.
3. Fair: a solver who has the answer must say "oh, of course".
4. Not flat. PUNS FIRST: the editor loves puns and double meanings, the more the better, and
   a pun does not need a trailing "?" (use it sparingly). Then, in rough order: misdirection (surface reading points
   elsewhere: "Flight indoors" = STAIRCASE), "?" puns ("Smoothie operator?" =
   BLENDER), wordplay / double meanings ("Downpour - or download" = TORRENT),
   evocative scenes ("Banana peels' second act" = COMPOST), fill-in-the-blank,
   examples ("I-95, for one"), light trivia. A plain definition is allowed for
   at most 2-3 answers per round, and should still be fresh.
5. Vary clue types within the round: at least 4 different types.
6. Check the DECOYS: your clue must not be a valid clue for any decoy (or for
   another answer in the round). A clue that *tempts* toward a decoy but is
   wrong for it is good.
7. Clues in one round should not repeat a key word or the same trick.
8. Also give the round a 1-3 word `theme` label that sets a mood without
   containing or giving away any answer ("Mixed" if nothing fits).

Output JSON, keyed by candidate id:

    {"c012": {"theme": "Last Call",
              "clues": {"TORRENT": {"clue": "Downpour - or download",
                                     "type": "wordplay"}, ...}}}

`type` is one of: definition, misdirection, pun, fill-in, example, trivia,
wordplay, evocative.
