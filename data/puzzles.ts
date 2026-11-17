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
  category?: string;
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

// Science-flavoured themes that aren't tagged STEM in the data.
const SCIENCE_THEMES = new Set([
  'Great Scientists', 'Landmark Experiments', 'Plant Anatomy', 'Organic Chemistry',
  'Measuring Instruments', 'Thermodynamics', 'Immune System', 'Microbiology', 'Particle Zoo',
  'Fossil Record', 'Eponymous Units', 'Neuroscience', 'Quantum Weirdness', 'Mohs and Minerals',
  'Natural Selection', 'Fungus Among Us', 'Oceanography', 'Cosmology', 'Taxonomy',
  'Women in Science', 'Biochemistry',
]);

/** The List-view section a puzzle belongs to. */
export function collectionOf(def: PuzzleDef): string {
  if (isBorrowed(def)) return 'Sourced Online';
  const colon = def.theme.lastIndexOf(': '); // last, so "Avatar: The Last Airbender: X" works
  if (colon > 0) return def.theme.slice(0, colon); // fandom rounds: "Star Trek: Ships"
  if (def.theme === 'Long Haul' || def.theme === 'Word Nerd') return def.theme;
  if (def.theme === 'Mixed') return 'Mixed Bag';
  if (def.category === 'STEM' || SCIENCE_THEMES.has(def.theme)) return 'Science';
  if (!def.category) return 'Originals'; // the first hand-made rounds
  return 'Everyday Themes';
}
