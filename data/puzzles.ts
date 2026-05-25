export interface Chunk {
  id: number;
  text: string;
}

export interface ClueAnswer {
  clue: string;
  answer: string;
  chunkTexts: string[];
}

export interface Puzzle {
  title: string;
  clueAnswers: ClueAnswer[];
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

function buildPuzzle(title: string, clueAnswers: ClueAnswer[]): Puzzle {
  let id = 0;
  const allChunks: Chunk[] = [];
  for (const ca of clueAnswers) {
    for (const text of ca.chunkTexts) {
      allChunks.push({ id: id++, text });
    }
  }
  return { title, clueAnswers, chunks: shuffle(allChunks) };
}

export const PUZZLE_1: Puzzle = buildPuzzle('Puzzle #1', [
  { clue: 'Warm bed cover',       answer: 'BLANKET', chunkTexts: ['BLAN', 'KET']  },
  { clue: 'Friendly sea mammal',  answer: 'DOLPHIN', chunkTexts: ['DOL',  'PHIN'] },
  { clue: 'Room for cooking',     answer: 'KITCHEN', chunkTexts: ['KIT',  'CHEN'] },
  { clue: 'Time after sunrise',   answer: 'MORNING', chunkTexts: ['MOR',  'NING'] },
  { clue: 'Royal color',          answer: 'PURPLE',  chunkTexts: ['PUR',  'PLE']  },
  { clue: 'Precious white metal', answer: 'SILVER',  chunkTexts: ['SIL',  'VER']  },
  { clue: 'Feel amazement',       answer: 'WONDER',  chunkTexts: ['WON',  'DER']  },
]);
