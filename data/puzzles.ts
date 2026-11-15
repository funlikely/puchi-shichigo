/// <reference types="expo/types" />
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
  /** 'generated' (ours, committed) or 'borrowed' (sourced online, private). */
  source?: string;
}

export interface Chunk {
  id: number;
  text: string;
}

export interface Puzzle {
  def: PuzzleDef;
  chunks: Chunk[];
}

export function shuffle<T>(arr: T[]): T[] {
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

// Sourced-online puzzles live in content/private/ (gitignored) and load only if present.
const privateCtx = require.context('../content/private', false, /\.json$/);
const privatePuzzles: PuzzleDef[] = privateCtx.keys().flatMap(key => privateCtx(key) as PuzzleDef[]);

export const PUZZLE_DEFS: PuzzleDef[] = [
  ...rawPuzzles.map(p => ({ ...p, source: 'generated' })),
  ...privatePuzzles.map(p => ({ ...p, source: 'borrowed' })),
];

export const isBorrowed = (def: PuzzleDef) => def.source === 'borrowed';
