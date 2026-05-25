export interface ClueAnswer {
  clue: string;
  answer: string;
  chunkTexts: string[];
}

export interface PuzzleDef {
  id: string;
  title: string;
  theme: string;
  color: string;
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

export const PUZZLE_DEFS: PuzzleDef[] = [
  {
    id: 'round1',
    title: 'Round 1',
    theme: 'Everyday Words',
    color: '#4A90D9',
    clueAnswers: [
      { clue: 'Warm bed cover',        answer: 'BLANKET', chunkTexts: ['BLAN', 'KET']  },
      { clue: 'Friendly sea mammal',   answer: 'DOLPHIN', chunkTexts: ['DOL',  'PHIN'] },
      { clue: 'Room for cooking',      answer: 'KITCHEN', chunkTexts: ['KIT',  'CHEN'] },
      { clue: 'Time after sunrise',    answer: 'MORNING', chunkTexts: ['MOR',  'NING'] },
      { clue: 'Royal color',           answer: 'PURPLE',  chunkTexts: ['PUR',  'PLE']  },
      { clue: 'Precious white metal',  answer: 'SILVER',  chunkTexts: ['SIL',  'VER']  },
      { clue: 'Feel amazement',        answer: 'WONDER',  chunkTexts: ['WON',  'DER']  },
    ],
  },
  {
    id: 'round2',
    title: 'Round 2',
    theme: 'Animals',
    color: '#5CB85C',
    clueAnswers: [
      { clue: 'Spotted jungle cat',    answer: 'PANTHER',  chunkTexts: ['PAN',  'THER']  },
      { clue: 'Largest land animal',   answer: 'ELEPHANT', chunkTexts: ['ELE',  'PHANT'] },
      { clue: 'Tuxedo bird',           answer: 'PENGUIN',  chunkTexts: ['PEN',  'GUIN']  },
      { clue: 'Silver-backed ape',     answer: 'GORILLA',  chunkTexts: ['GOR',  'ILLA']  },
      { clue: 'Female lion',           answer: 'LIONESS',  chunkTexts: ['LION', 'ESS']   },
      { clue: 'Pink wading bird',      answer: 'FLAMINGO', chunkTexts: ['FLAM', 'INGO']  },
      { clue: 'Tusked sea mammal',     answer: 'WALRUS',   chunkTexts: ['WAL',  'RUS']   },
    ],
  },
  {
    id: 'round3',
    title: 'Round 3',
    theme: 'Geography',
    color: '#E8A020',
    clueAnswers: [
      { clue: 'Rainforest river',        answer: 'AMAZON',  chunkTexts: ['AMA', 'ZON']  },
      { clue: "World's highest peak",    answer: 'EVEREST', chunkTexts: ['EVE', 'REST'] },
      { clue: 'Largest ocean',           answer: 'PACIFIC', chunkTexts: ['PAC', 'IFIC'] },
      { clue: 'Lava-erupting mountain',  answer: 'VOLCANO', chunkTexts: ['VOL', 'CANO'] },
      { clue: 'Polar region',            answer: 'ARCTIC',  chunkTexts: ['ARC', 'TIC']  },
      { clue: 'River-carved gorge',      answer: 'CANYON',  chunkTexts: ['CAN', 'YON']  },
      { clue: 'Desert heat illusion',    answer: 'MIRAGE',  chunkTexts: ['MIR', 'AGE']  },
    ],
  },
];
