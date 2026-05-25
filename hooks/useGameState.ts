import { useCallback, useState } from 'react';
import { buildPuzzle, Puzzle, PuzzleDef } from '../data/puzzles';

export interface GameState {
  activeClueIndex: number;
  selectedChunkIds: number[];
  solved: boolean[];
  solvedChunkIds: Set<number>;
}

export function useGameState(def: PuzzleDef) {
  const [puzzle] = useState<Puzzle>(() => buildPuzzle(def));

  const [state, setState] = useState<GameState>(() => ({
    activeClueIndex: 0,
    selectedChunkIds: [],
    solved: new Array(def.clueAnswers.length).fill(false),
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
        return { ...prev, selectedChunkIds: prev.selectedChunkIds.filter(id => id !== chunkId) };
      }
      return { ...prev, selectedChunkIds: [...prev.selectedChunkIds, chunkId] };
    });
  }, []);

  const clearSelection = useCallback(() => {
    setState(prev => ({ ...prev, selectedChunkIds: [] }));
  }, []);

  const submitAnswer = useCallback(() => {
    setState(prev => {
      if (prev.selectedChunkIds.length === 0) return prev;

      const builtWord = prev.selectedChunkIds
        .map(id => puzzle.chunks.find(c => c.id === id)!.text)
        .join('');
      const answer = puzzle.def.clueAnswers[prev.activeClueIndex].answer;

      if (builtWord !== answer) {
        return { ...prev, selectedChunkIds: [] };
      }

      const newSolved = [...prev.solved];
      newSolved[prev.activeClueIndex] = true;
      const newSolvedChunkIds = new Set(prev.solvedChunkIds);
      prev.selectedChunkIds.forEach(id => newSolvedChunkIds.add(id));

      let nextActive = prev.activeClueIndex;
      for (let i = 1; i <= puzzle.def.clueAnswers.length; i++) {
        const next = (prev.activeClueIndex + i) % puzzle.def.clueAnswers.length;
        if (!newSolved[next]) { nextActive = next; break; }
      }

      return {
        activeClueIndex: nextActive,
        selectedChunkIds: [],
        solved: newSolved,
        solvedChunkIds: newSolvedChunkIds,
      };
    });
  }, [puzzle]);

  const isComplete = state.solved.every(Boolean);

  return { puzzle, state, selectClue, tapChunk, clearSelection, submitAnswer, isComplete };
}
