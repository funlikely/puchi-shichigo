import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RoundStatus } from '../App';
import { PUZZLE_DEFS, PuzzleDef } from '../data/puzzles';

interface Props {
  onSelectPuzzle: (index: number) => void;
  roundStatuses: Record<number, RoundStatus>;
}

const STATUS_BG   = { completed: '#5CB85C', attempted: '#F5C518', none: '#fff' } as const;
const STATUS_TEXT = { completed: '#fff',    attempted: '#333',    none: '#222' } as const;
const STATUS_SUB  = { completed: 'rgba(255,255,255,0.8)', attempted: '#7A6000', none: '#AAA' } as const;

function GridCard({
  def,
  index,
  status,
  onPress,
}: {
  def: PuzzleDef;
  index: number;
  status?: RoundStatus;
  onPress: () => void;
}) {
  const key = status ?? 'none';
  const bg   = STATUS_BG[key];
  const text = STATUS_TEXT[key];
  const sub  = STATUS_SUB[key];
  const isCompleted = status === 'completed';
  const isColored = status != null;

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: bg }]} onPress={onPress} activeOpacity={0.8}>
      <Text style={[styles.number, { color: isCompleted ? '#fff' : isColored ? '#7A6000' : '#555' }]}>
        {index + 1}
      </Text>
      {isCompleted && <Text style={styles.check}>✓</Text>}
    </TouchableOpacity>
  );
}

export function HomeScreen({ onSelectPuzzle, roundStatuses }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>puchi-shichigo</Text>
          <Text style={styles.subtitle}>Word chunk puzzles</Text>
        </View>

        <Text style={styles.sectionLabel}>Choose a round</Text>

        <View style={styles.grid}>
          {PUZZLE_DEFS.map((def, i) => (
            <GridCard
              key={def.id}
              def={def}
              index={i}
              status={roundStatuses[i]}
              onPress={() => onSelectPuzzle(i)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FAF8F3',
  },
  scroll: {
    padding: 16,
    paddingTop: 36,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#222',
    letterSpacing: 1,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#BBB',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  card: {
    width: '18%',
    aspectRatio: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  number: {
    fontSize: 22,
    fontWeight: '800',
  },
  check: {
    position: 'absolute',
    bottom: 4,
    right: 6,
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.8)',
  },
});
