import { useCallback, useState } from 'react';
import { Puzzle } from '../data/puzzles';

export interface GameState {
  activeClueIndex: number;
  selectedChunkIds: number[];
  solved: boolean[];
  solvedChunkIds: Set<number>;
}

export function useGameState(puzzle: Puzzle) {
  const [state, setState] = useState<GameState>(() => ({
    activeClueIndex: 0,
    selectedChunkIds: [],
    solved: new Array(puzzle.clueAnswers.length).fill(false),
    solvedChunkIds: new Set<number>(),
  }));

  const selectClue = useCallback((index: number) => {
    setState(prev => {
      if (prev.solved[index]) return prev;
      return { ...prev, activeClueIndex: index, selectedChunkIds: [] };
    });
  }, []);

  const tapChunk = useCallback((chunkId: number) => {
    setState(prev => {
      if (prev.solvedChunkIds.has(chunkId)) return prev;

      if (prev.selectedChunkIds.includes(chunkId)) {
        return {
          ...prev,
          selectedChunkIds: prev.selectedChunkIds.filter(id => id !== chunkId),
        };
      }

      const newSelected = [...prev.selectedChunkIds, chunkId];
      const builtWord = newSelected
        .map(id => puzzle.chunks.find(c => c.id === id)!.text)
        .join('');
      const answer = puzzle.clueAnswers[prev.activeClueIndex].answer;

      if (builtWord === answer) {
        const newSolved = [...prev.solved];
        newSolved[prev.activeClueIndex] = true;
        const newSolvedChunkIds = new Set(prev.solvedChunkIds);
        newSelected.forEach(id => newSolvedChunkIds.add(id));

        let nextActive = prev.activeClueIndex;
        for (let i = 1; i <= puzzle.clueAnswers.length; i++) {
          const next = (prev.activeClueIndex + i) % puzzle.clueAnswers.length;
          if (!newSolved[next]) { nextActive = next; break; }
        }

        return {
          activeClueIndex: nextActive,
          selectedChunkIds: [],
          solved: newSolved,
          solvedChunkIds: newSolvedChunkIds,
        };
      }

      return { ...prev, selectedChunkIds: newSelected };
    });
  }, [puzzle]);

  const clearSelection = useCallback(() => {
    setState(prev => ({ ...prev, selectedChunkIds: [] }));
  }, []);

  const isComplete = state.solved.every(Boolean);

  return { state, selectClue, tapChunk, clearSelection, isComplete };
}
