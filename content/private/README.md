# Private puzzle content

Third-party ("Sourced Online") puzzles that the app loads only when present.
Everything here except this README is gitignored: never commit or publish it.

`borrowed-puzzles.json` is built from `content/borrowed/` by
`tools/generator/tile_borrowed.py`. A fresh clone has no file here, and the
app then shows only the generated puzzles.
