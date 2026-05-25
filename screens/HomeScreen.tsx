import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PUZZLE_DEFS, PuzzleDef } from '../data/puzzles';
import { RoundStatus } from '../App';

interface Props {
  onSelectPuzzle: (index: number) => void;
  roundStatuses: Record<number, RoundStatus>;
}

const STATUS_COLORS = {
  completed: { bg: '#5CB85C', text: '#fff', sub: 'rgba(255,255,255,0.75)' },
  attempted: { bg: '#F5C518', text: '#333',  sub: '#7A6000' },
  none:      { bg: '#fff',    text: '#222',  sub: '#AAA' },
} as const;

function RoundCard({
  def,
  status,
  onPress,
}: {
  def: PuzzleDef;
  status?: RoundStatus;
  onPress: () => void;
}) {
  const key = status ?? 'none';
  const colors = STATUS_COLORS[key];
  const isCompleted = status === 'completed';
  const isAttempted = status === 'attempted';

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.bg }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardBody}>
        <Text style={[styles.cardTitle, { color: colors.sub }]}>{def.title}</Text>
        <Text style={[styles.cardTheme, { color: colors.text }]}>{def.theme}</Text>
        <Text style={[styles.cardMeta, { color: colors.sub }]}>
          {isCompleted ? 'Completed' : isAttempted ? 'In progress' : `${def.clueAnswers.length} words`}
        </Text>
      </View>
      <Text style={[styles.cardSymbol, { color: isCompleted ? '#fff' : isAttempted ? '#7A6000' : def.color }]}>
        {isCompleted ? '✓' : '▶'}
      </Text>
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

        {PUZZLE_DEFS.map((def, i) => (
          <RoundCard
            key={def.id}
            def={def}
            status={roundStatuses[i]}
            onPress={() => onSelectPuzzle(i)}
          />
        ))}
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
    padding: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#222',
    letterSpacing: 1,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#999',
    letterSpacing: 0.5,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#AAA',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardBody: {
    flex: 1,
    padding: 20,
    gap: 3,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  cardTheme: {
    fontSize: 20,
    fontWeight: '800',
  },
  cardMeta: {
    fontSize: 13,
    marginTop: 2,
    fontWeight: '600',
  },
  cardSymbol: {
    fontSize: 20,
    paddingRight: 20,
    fontWeight: '800',
  },
});
