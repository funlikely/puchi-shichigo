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
    color: '#FF6B35',
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
      { clue: 'Rainforest river',       answer: 'AMAZON',  chunkTexts: ['AMA', 'ZON']  },
      { clue: "World's highest peak",   answer: 'EVEREST', chunkTexts: ['EVE', 'REST'] },
      { clue: 'Largest ocean',          answer: 'PACIFIC', chunkTexts: ['PAC', 'IFIC'] },
      { clue: 'Lava-erupting mountain', answer: 'VOLCANO', chunkTexts: ['VOL', 'CANO'] },
      { clue: 'Polar region',           answer: 'ARCTIC',  chunkTexts: ['ARC', 'TIC']  },
      { clue: 'River-carved gorge',     answer: 'CANYON',  chunkTexts: ['CAN', 'YON']  },
      { clue: 'Desert heat illusion',   answer: 'MIRAGE',  chunkTexts: ['MIR', 'AGE']  },
    ],
  },
  {
    id: 'round4',
    title: 'Round 4',
    theme: 'At the Movies',
    color: '#9B59B6',
    clueAnswers: [
      { clue: 'Top-billed actor',       answer: 'STARRING', chunkTexts: ['STAR', 'RING']  },
      { clue: 'Unexpected plot turn',   answer: 'SURPRISE',  chunkTexts: ['SUR',  'PRISE'] },
      { clue: 'Movie theater',          answer: 'CINEMA',    chunkTexts: ['CIN',  'EMA']   },
      { clue: 'Raw film material',      answer: 'FOOTAGE',   chunkTexts: ['FOOT', 'AGE']   },
      { clue: 'Film with songs',        answer: 'MUSICAL',   chunkTexts: ['MUS',  'ICAL']  },
      { clue: "Story's bad guy",        answer: 'VILLAIN',   chunkTexts: ['VIL',  'LAIN']  },
      { clue: 'Final scene',            answer: 'CLOSING',   chunkTexts: ['CLO',  'SING']  },
    ],
  },
  {
    id: 'round5',
    title: 'Round 5',
    theme: 'In the Kitchen',
    color: '#E74C3C',
    clueAnswers: [
      { clue: 'Smoothie maker',         answer: 'BLENDER',   chunkTexts: ['BLEN', 'DER']        },
      { clue: 'Witch\'s boiling pot',   answer: 'CAULDRON',  chunkTexts: ['CAUL', 'DRON']       },
      { clue: 'Heavy chopper',          answer: 'CLEAVER',   chunkTexts: ['CLEA', 'VER']        },
      { clue: 'Bread browner',          answer: 'TOASTER',   chunkTexts: ['TOA',  'STER']       },
      { clue: 'Long Italian pasta',     answer: 'SPAGHETTI', chunkTexts: ['SPAG', 'HET', 'TI']  },
      { clue: 'Spice rack staple',      answer: 'CINNAMON',  chunkTexts: ['CIN',  'NA',  'MON'] },
      { clue: 'Jar preservation',       answer: 'PICKLING',  chunkTexts: ['PICK', 'LING']       },
    ],
  },
  {
    id: 'round6',
    title: 'Round 6',
    theme: 'Space Explorers',
    color: '#607D8B',
    clueAnswers: [
      { clue: 'Moon walker',            answer: 'ASTRONAUT', chunkTexts: ['AST', 'RON', 'AUT'] },
      { clue: 'Circular flight path',   answer: 'ORBITAL',   chunkTexts: ['ORB', 'ITAL']       },
      { clue: 'Star system',            answer: 'GALAXY',    chunkTexts: ['GAL', 'AXY']        },
      { clue: 'Mars inhabitant',        answer: 'MARTIAN',   chunkTexts: ['MAR', 'TIAN']       },
      { clue: 'Gas and dust cloud',     answer: 'NEBULA',    chunkTexts: ['NEB', 'ULA']        },
      { clue: 'Light particle',         answer: 'PHOTON',    chunkTexts: ['PHO', 'TON']        },
      { clue: 'Weightless movement',    answer: 'FLOATING',  chunkTexts: ['FLOAT', 'ING']      },
    ],
  },
  {
    id: 'round7',
    title: 'Round 7',
    theme: 'Music Scene',
    color: '#E91E8C',
    clueAnswers: [
      { clue: 'Rhythmic pulse',         answer: 'CADENCE',  chunkTexts: ['CAD', 'ENCE']  },
      { clue: 'Low-frequency groove',   answer: 'BASSLINE', chunkTexts: ['BASS', 'LINE'] },
      { clue: 'Conductor\'s platform',  answer: 'PODIUM',   chunkTexts: ['POD', 'IUM']   },
      { clue: 'String instrument',      answer: 'VIOLIN',   chunkTexts: ['VIO', 'LIN']   },
      { clue: 'Jazz improvisation',     answer: 'RIFFING',  chunkTexts: ['RIF', 'FING']  },
      { clue: 'Eight notes span',       answer: 'OCTAVE',   chunkTexts: ['OCT', 'AVE']   },
      { clue: 'Brass percussion disk',  answer: 'CYMBAL',   chunkTexts: ['CYM', 'BAL']   },
    ],
  },
  {
    id: 'round8',
    title: 'Round 8',
    theme: 'Science Lab',
    color: '#00897B',
    clueAnswers: [
      { clue: 'Test a hypothesis',      answer: 'EXPERIMENT', chunkTexts: ['EX', 'PER', 'IMENT'] },
      { clue: 'Tiny organism',          answer: 'MICROBE',    chunkTexts: ['MIC', 'ROBE']         },
      { clue: 'Temperature scale',      answer: 'CELSIUS',    chunkTexts: ['CEL', 'SIUS']         },
      { clue: 'Uncharged atom part',    answer: 'NEUTRON',    chunkTexts: ['NEU', 'TRON']         },
      { clue: 'Lab glassware',          answer: 'BEAKER',     chunkTexts: ['BEA', 'KER']          },
      { clue: 'Dissolved mixture',      answer: 'SOLUTION',   chunkTexts: ['SOL', 'UTION']        },
      { clue: 'Prism output',           answer: 'RAINBOW',    chunkTexts: ['RAIN', 'BOW']         },
    ],
  },
  {
    id: 'round9',
    title: 'Round 9',
    theme: 'On the Farm',
    color: '#8D6E63',
    clueAnswers: [
      { clue: 'Animal enclosure',       answer: 'BARNYARD',  chunkTexts: ['BARN', 'YARD']  },
      { clue: 'Tractor\'s work',        answer: 'PLOWING',   chunkTexts: ['PLOW', 'ING']   },
      { clue: 'Grain storage building', answer: 'GRANARY',   chunkTexts: ['GRAN', 'ARY']   },
      { clue: 'Morning alarm bird',     answer: 'ROOSTER',   chunkTexts: ['ROO',  'STER']  },
      { clue: 'Pig\'s home',            answer: 'PIGSTY',    chunkTexts: ['PIG',  'STY']   },
      { clue: 'Wool workers',           answer: 'SHEARERS',  chunkTexts: ['SHEAR', 'ERS']  },
      { clue: 'Crop collection time',   answer: 'HARVEST',   chunkTexts: ['HAR',  'VEST']  },
    ],
  },
  {
    id: 'round10',
    title: 'Round 10',
    theme: 'At the Beach',
    color: '#00ACC1',
    clueAnswers: [
      { clue: 'SPF lotion',             answer: 'SUNSCREEN', chunkTexts: ['SUN',  'SCREEN'] },
      { clue: 'Wave riding plank',      answer: 'SURFBOARD', chunkTexts: ['SURF', 'BOARD']  },
      { clue: 'Sand defense structure', answer: 'FORTRESS',  chunkTexts: ['FORT', 'RESS']   },
      { clue: 'Diving breathing tube',  answer: 'SNORKEL',   chunkTexts: ['SNOR', 'KEL']    },
      { clue: 'Ocean floor souvenir',   answer: 'SEASHELL',  chunkTexts: ['SEA',  'SHELL']  },
      { clue: 'Pouched fishing bird',   answer: 'PELICAN',   chunkTexts: ['PEL',  'ICAN']   },
      { clue: 'Holiday destination',    answer: 'RESORT',    chunkTexts: ['RE',   'SORT']   },
    ],
  },
  {
    id: 'round11',
    title: 'Round 11',
    theme: 'Sports Arena',
    color: '#FF5722',
    clueAnswers: [
      { clue: 'Football six-pointer',   answer: 'TOUCHDOWN',  chunkTexts: ['TOUCH', 'DOWN']        },
      { clue: 'Short-distance runner',  answer: 'SPRINTER',   chunkTexts: ['SPRINT', 'ER']         },
      { clue: 'Team leader',            answer: 'CAPTAIN',    chunkTexts: ['CAP',   'TAIN']        },
      { clue: 'Points display',         answer: 'SCOREBOARD', chunkTexts: ['SCORE', 'BOARD']       },
      { clue: 'Hard-won victory',       answer: 'TRIUMPH',    chunkTexts: ['TRI',   'UMPH']        },
      { clue: 'Bracket competition',    answer: 'TOURNAMENT', chunkTexts: ['TOUR',  'NA',  'MENT'] },
      { clue: 'Standing applause',      answer: 'OVATION',    chunkTexts: ['OVA',   'TION']        },
    ],
  },
  {
    id: 'round12',
    title: 'Round 12',
    theme: 'Under the Sea',
    color: '#1565C0',
    clueAnswers: [
      { clue: 'Electric flat fish',     answer: 'STINGRAY',  chunkTexts: ['STING', 'RAY']       },
      { clue: 'Eight-armed cephalopod', answer: 'OCTOPUS',   chunkTexts: ['OC', 'TO', 'PUS']    },
      { clue: 'Claw-wielding critter',  answer: 'LOBSTER',   chunkTexts: ['LOB',   'STER']       },
      { clue: 'Underwater vegetation',  answer: 'SEAWEED',   chunkTexts: ['SEA',   'WEED']       },
      { clue: 'White whale species',    answer: 'BELUGA',    chunkTexts: ['BEL',   'UGA']        },
      { clue: 'Fast predatory fish',    answer: 'BARRACUDA', chunkTexts: ['BAR',   'RA',  'CUDA'] },
      { clue: 'Pearl producer',         answer: 'OYSTER',    chunkTexts: ['OYS',   'TER']        },
    ],
  },
  {
    id: 'round13',
    title: 'Round 13',
    theme: 'In the Garden',
    color: '#689F38',
    clueAnswers: [
      { clue: 'Purple climbing vine',   answer: 'WISTERIA',  chunkTexts: ['WIS', 'TER', 'IA']  },
      { clue: 'Fragrant purple herb',   answer: 'LAVENDER',  chunkTexts: ['LAV', 'ENDER']      },
      { clue: 'Fleshy desert plant',    answer: 'SUCCULENT', chunkTexts: ['SUC', 'CU', 'LENT'] },
      { clue: 'Small digging tool',     answer: 'TROWEL',    chunkTexts: ['TROW', 'EL']        },
      { clue: 'Lawn watering arc',      answer: 'SPRINKLER', chunkTexts: ['SPRIN', 'KLER']     },
      { clue: 'Decomposed plant food',  answer: 'COMPOST',   chunkTexts: ['COM',  'POST']      },
      { clue: 'Reddish-brown color',    answer: 'RUSSET',    chunkTexts: ['RUS',  'SET']       },
    ],
  },
  {
    id: 'round14',
    title: 'Round 14',
    theme: 'Travel & Adventure',
    color: '#F57C00',
    clueAnswers: [
      { clue: 'Budget globe-trotter',   answer: 'BACKPACKER',  chunkTexts: ['BACK', 'PACK', 'ER'] },
      { clue: 'Navigation device',      answer: 'COMPASS',     chunkTexts: ['COM',  'PASS']        },
      { clue: 'Outdoor evening fire',   answer: 'CAMPFIRE',    chunkTexts: ['CAMP', 'FIRE']        },
      { clue: 'Summit conqueror',       answer: 'MOUNTAINEER', chunkTexts: ['MOUNT', 'AIN', 'EER'] },
      { clue: 'Sea journey',            answer: 'VOYAGE',      chunkTexts: ['VOY',  'AGE']         },
      { clue: 'Currency swap',          answer: 'EXCHANGE',    chunkTexts: ['EX',   'CHANGE']      },
      { clue: 'Famous site',            answer: 'LANDMARK',    chunkTexts: ['LAND', 'MARK']        },
    ],
  },
  {
    id: 'round15',
    title: 'Round 15',
    theme: 'Fairy Tale',
    color: '#7B1FA2',
    clueAnswers: [
      { clue: 'Enchanted forest',       answer: 'WOODLAND',  chunkTexts: ['WOOD', 'LAND']       },
      { clue: 'Spell-casting villain',  answer: 'SORCERESS', chunkTexts: ['SOR', 'CER', 'ESS']  },
      { clue: 'Enchanted sleep',        answer: 'SLUMBER',   chunkTexts: ['SLUM', 'BER']        },
      { clue: 'Dragon\'s breath',       answer: 'INFERNO',   chunkTexts: ['IN',   'FERNO']      },
      { clue: 'Hidden riches',          answer: 'TREASURE',  chunkTexts: ['TREA', 'SURE']       },
      { clue: 'Royal domain',           answer: 'KINGDOM',   chunkTexts: ['KING', 'DOM']        },
      { clue: 'Magic potion',           answer: 'ELIXIR',    chunkTexts: ['ELI',  'XIR']        },
    ],
  },
];
