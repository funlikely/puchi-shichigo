import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Platform } from 'react-native';
import { ChunkTile } from './components/ChunkTile';
import { ClueRow } from './components/ClueRow';
import { WordBuilder } from './components/WordBuilder';
import { PUZZLE_1 } from './data/puzzles';
import { useGameState } from './hooks/useGameState';

const puzzle = PUZZLE_1;

export default function App() {
  const { state, selectClue, tapChunk, clearSelection, submitAnswer, isComplete } = useGameState(puzzle);

  const selectedTexts = state.selectedChunkIds.map(
    id => puzzle.chunks.find(c => c.id === id)!.text
  );

  const getChunkState = (chunkId: number): 'normal' | 'selected' | 'used' => {
    if (state.solvedChunkIds.has(chunkId)) return 'used';
    if (state.selectedChunkIds.includes(chunkId)) return 'selected';
    return 'normal';
  };

  return (
    <View style={styles.root}>
      <View style={styles.phone}>
        <SafeAreaView style={styles.safe}>
          <StatusBar style="dark" />
          {isComplete ? (
            <View style={styles.winScreen}>
              <Text style={styles.winEmoji}>🎉</Text>
              <Text style={styles.winText}>You solved it!</Text>
              <Text style={styles.winSub}>{puzzle.title}</Text>
            </View>
          ) : (
            <ScrollView contentContainerStyle={styles.scroll}>
              <Text style={styles.title}>puchi-shichigo</Text>
              <Text style={styles.hint}>Tap any clue to select it, then tap tiles to spell the answer</Text>

              <View style={styles.clues}>
                {puzzle.clueAnswers.map((ca, i) => (
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

              <WordBuilder chunkTexts={selectedTexts} onClear={clearSelection} onSubmit={submitAnswer} />

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
      </View>
    </View>
  );
}

const isWeb = Platform.OS === 'web';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: isWeb ? '#1C1C1E' : '#FAF8F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phone: {
    flex: 1,
    width: '100%',
    maxWidth: 430,
    backgroundColor: '#FAF8F3',
    ...(isWeb && {
      marginVertical: 24,
      borderRadius: 40,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.5,
      shadowRadius: 24,
    }),
  },
  safe: {
    flex: 1,
    backgroundColor: '#FAF8F3',
  },
  scroll: {
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 20,
    color: '#222',
    letterSpacing: 1,
  },
  hint: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    marginBottom: 14,
    marginTop: -8,
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
    gap: 8,
  },
  winEmoji: {
    fontSize: 64,
  },
  winText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#5CB85C',
  },
  winSub: {
    fontSize: 16,
    color: '#888',
  },
});
