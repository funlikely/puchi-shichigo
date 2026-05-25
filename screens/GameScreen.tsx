import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ChunkTile } from '../components/ChunkTile';
import { ClueRow } from '../components/ClueRow';
import { WordBuilder } from '../components/WordBuilder';
import { PuzzleDef } from '../data/puzzles';
import { useGameState } from '../hooks/useGameState';

interface Props {
  puzzleDef: PuzzleDef;
  onBack: () => void;
}

export function GameScreen({ puzzleDef, onBack }: Props) {
  const { puzzle, state, selectClue, tapChunk, clearSelection, submitAnswer, isComplete } =
    useGameState(puzzleDef);

  const selectedTexts = state.selectedChunkIds.map(
    id => puzzle.chunks.find(c => c.id === id)!.text
  );

  const getChunkState = (chunkId: number): 'normal' | 'selected' | 'used' => {
    if (state.solvedChunkIds.has(chunkId)) return 'used';
    if (state.selectedChunkIds.includes(chunkId)) return 'selected';
    return 'normal';
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn} hitSlop={12}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerRound}>{puzzleDef.title}</Text>
          <Text style={[styles.headerTheme, { color: puzzleDef.color }]}>{puzzleDef.theme}</Text>
        </View>
      </View>

      {isComplete ? (
        <View style={styles.winScreen}>
          <Text style={styles.winEmoji}>🎉</Text>
          <Text style={styles.winText}>You solved it!</Text>
          <Text style={styles.winSub}>{puzzleDef.title} · {puzzleDef.theme}</Text>
          <TouchableOpacity style={[styles.menuBtn, { backgroundColor: puzzleDef.color }]} onPress={onBack}>
            <Text style={styles.menuBtnText}>Back to Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.hint}>Tap any clue to select it, then tap tiles to spell the answer</Text>

          <View style={styles.clues}>
            {puzzle.def.clueAnswers.map((ca, i) => (
              <ClueRow
                key={i}
                index={i}
                clue={ca.clue}
                answer={ca.answer}
                isSolved={state.solved[i]}
                isActive={!state.solved[i] && state.activeClueIndex === i}
                onPress={() => selectClue(i)}
              />
            ))}
          </View>

          <WordBuilder
            chunkTexts={selectedTexts}
            onClear={clearSelection}
            onSubmit={submitAnswer}
          />

          <View style={styles.chunkGrid}>
            {puzzle.chunks.map(chunk => (
              <ChunkTile
                key={chunk.id}
                text={chunk.text}
                tileState={getChunkState(chunk.id)}
                onPress={() => tapChunk(chunk.id)}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FAF8F3',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  backBtn: {
    marginRight: 12,
  },
  backText: {
    fontSize: 15,
    color: '#4A90D9',
    fontWeight: '600',
  },
  headerTitles: {
    flex: 1,
  },
  headerRound: {
    fontSize: 12,
    fontWeight: '700',
    color: '#AAA',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  headerTheme: {
    fontSize: 17,
    fontWeight: '700',
  },
  scroll: {
    padding: 16,
    paddingTop: 16,
  },
  hint: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    marginBottom: 14,
  },
  clues: {
    marginBottom: 4,
  },
  chunkGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 4,
  },
  winScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 32,
  },
  winEmoji: {
    fontSize: 64,
  },
  winText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#222',
  },
  winSub: {
    fontSize: 15,
    color: '#999',
    marginBottom: 8,
  },
  menuBtn: {
    marginTop: 8,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  menuBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
