import rawPuzzles from '../content/puzzles.json';

export interface ClueAnswer {
  clue: string;
  answer: string;
  chunkTexts: string[];
}

export interface PuzzleDef {
  id: string;
  title: string;
  theme: string;
  clueAnswers: ClueAnswer[];
}

export interface Chunk {
  id: number;
  text: string;
}

export interface Puzzle {
  def: PuzzleDef;
  chunks: Chunk[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildPuzzle(def: PuzzleDef): Puzzle {
  let id = 0;
  const allChunks: Chunk[] = [];
  for (const ca of def.clueAnswers) {
    for (const text of ca.chunkTexts) {
      allChunks.push({ id: id++, text });
    }
  }
  return { def, chunks: shuffle(allChunks) };
}

export const PUZZLE_DEFS: PuzzleDef[] = rawPuzzles;
