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

interface Props {
  onSelectPuzzle: (index: number) => void;
}

function RoundCard({ def, index, onPress }: { def: PuzzleDef; index: number; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
      <View style={[styles.cardAccent, { backgroundColor: def.color }]} />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{def.title}</Text>
        <Text style={styles.cardTheme}>{def.theme}</Text>
        <Text style={styles.cardMeta}>{def.clueAnswers.length} words</Text>
      </View>
      <Text style={[styles.cardArrow, { color: def.color }]}>▶</Text>
    </TouchableOpacity>
  );
}

export function HomeScreen({ onSelectPuzzle }: Props) {
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
            index={i}
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
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  cardAccent: {
    width: 6,
    alignSelf: 'stretch',
  },
  cardBody: {
    flex: 1,
    padding: 16,
    gap: 2,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#AAA',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  cardTheme: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  cardMeta: {
    fontSize: 13,
    color: '#AAA',
    marginTop: 2,
  },
  cardArrow: {
    fontSize: 18,
    paddingRight: 18,
    fontWeight: '700',
  },
});
