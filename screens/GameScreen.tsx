import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo } from 'react';
import {
  BackHandler,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, useStyles, useTheme } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChunkTile } from '../components/ChunkTile';
import { ClueRow } from '../components/ClueRow';
import { WordBuilder } from '../components/WordBuilder';
import { PuzzleDef } from '../data/puzzles';
import { useGameState } from '../hooks/useGameState';
import { randomWinImage } from '../data/winImages';

interface Props {
  puzzleDef: PuzzleDef;
  onBack: () => void;
  onComplete: () => void;
}

export function GameScreen({ puzzleDef, onBack, onComplete }: Props) {
  const styles = useStyles(makeStyles);
  const { mode } = useTheme();
  const {
    puzzle, state, selectClue, tapChunk, clearSelection, submitAnswer, shuffleChunks, isComplete,
  } =
    useGameState(puzzleDef);

  useEffect(() => {
    if (isComplete) onComplete();
  }, [isComplete]);

  // Android back button returns to the menu instead of closing the app.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack();
      return true;
    });
    return () => sub.remove();
  }, [onBack]);

  // Picked once per solve so it doesn't change on re-render.
  const winImage = useMemo(() => (isComplete ? randomWinImage() : null), [isComplete]);

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
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />

      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn} hitSlop={12}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerRound}>{puzzleDef.title}</Text>
          <Text style={styles.headerTheme}>{puzzleDef.theme}</Text>
        </View>
        {!isComplete && (
          <TouchableOpacity onPress={shuffleChunks} style={styles.shuffleBtn} hitSlop={12}>
            <Text style={styles.shuffleText}>⇄ Shuffle</Text>
          </TouchableOpacity>
        )}
      </View>

      {isComplete ? (
        <View style={styles.winScreen}>
          {winImage ? (
            <Image source={winImage} style={styles.winImage} resizeMode="cover" />
          ) : (
            <Text style={styles.winEmoji}>🎉</Text>
          )}
          <Text style={styles.winText}>You solved it!</Text>
          <Text style={styles.winSub}>{puzzleDef.title} · {puzzleDef.theme}</Text>
          <TouchableOpacity style={styles.menuBtn} onPress={onBack}>
            <Text style={styles.menuBtnText}>Back to Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scroll}>
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

const makeStyles = (c: Colors) => StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: c.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  backBtn: {
    marginRight: 12,
  },
  backText: {
    fontSize: 15,
    color: c.accent,
    fontWeight: '600',
  },
  shuffleBtn: {
    marginLeft: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: c.tile,
  },
  shuffleText: {
    fontSize: 14,
    fontWeight: '700',
    color: c.textSecondary,
  },
  headerTitles: {
    flex: 1,
  },
  headerRound: {
    fontSize: 12,
    fontWeight: '700',
    color: c.textFainter,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  headerTheme: {
    fontSize: 17,
    fontWeight: '700',
    color: c.textSecondary,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
  },
  clues: {},
  chunkGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  winImage: {
    width: 260,
    height: 260,
    borderRadius: 16,
    marginBottom: 6,
    backgroundColor: c.imagePlaceholder,
  },
  winText: {
    fontSize: 28,
    fontWeight: '800',
    color: c.text,
  },
  winSub: {
    fontSize: 15,
    color: c.textFaint,
    marginBottom: 8,
  },
  menuBtn: {
    marginTop: 8,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: c.accent,
  },
  menuBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: c.onAccent,
  },
});
