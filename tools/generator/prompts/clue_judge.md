# Clue judge prompt (stage 4b)

You are a tough crossword editor. For each clue in the round:

* `rating` 1-5:
  1 = wrong, unfair, or gives the answer away;
  2 = flat dictionary definition;
  3 = solid, fresh definition or fair example;
  4 = real misdirection / wordplay / vivid image, clean "aha";
  5 = you would steal this clue.
  Be stingy: most clues are 3s. A round of all 4-5s means you were too kind.
* Reject (rating 1) any clue that also fits a DECOY or another answer.
* Then add a `critique` for the round: `weakest_clue`, `weakest_word`
  (the answer you would swap out, and why), and one line of `notes`.

Add `rating` next to each clue and `critique` next to `clues` in the same JSON
the writer produced. The writer and the judge should be different calls (or
different models) so the judge is not grading its own homework.
