import React, { useMemo, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RoundStatus } from '../App';
import { isBorrowed, PUZZLE_DEFS, PuzzleDef } from '../data/puzzles';

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

type View_ = 'numbers' | 'list';
type SourceTab = 'generated' | 'borrowed';

function Toggle<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { key: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <View style={styles.toggle}>
      {options.map(o => (
        <TouchableOpacity
          key={o.key}
          style={[styles.toggleBtn, value === o.key && styles.toggleBtnOn]}
          onPress={() => onChange(o.key)}
        >
          <Text style={[styles.toggleText, value === o.key && styles.toggleTextOn]}>{o.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function ListRow({
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
  const showTheme = !isBorrowed(def) && def.theme && def.theme !== 'Mixed';
  return (
    <TouchableOpacity
      style={[styles.row, { backgroundColor: STATUS_BG[key] }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.rowNumber, { color: STATUS_SUB[key] }]}>{index + 1}</Text>
      <View style={styles.rowTitles}>
        <Text style={[styles.rowTitle, { color: STATUS_TEXT[key] }]} numberOfLines={1}>
          {def.title}
        </Text>
        {showTheme ? (
          <Text style={[styles.rowTheme, { color: STATUS_SUB[key] }]} numberOfLines={1}>
            {def.theme}
          </Text>
        ) : null}
      </View>
      {status === 'completed' && <Text style={styles.rowCheck}>✓</Text>}
    </TouchableOpacity>
  );
}

export function HomeScreen({ onSelectPuzzle, roundStatuses }: Props) {
  const [view, setView] = useState<View_>('numbers');
  const [tab, setTab] = useState<SourceTab>('generated');

  // Keep each puzzle's index into PUZZLE_DEFS so selection and status still line up.
  const indexed = useMemo(() => PUZZLE_DEFS.map((def, i) => ({ def, i })), []);
  const hasBorrowed = indexed.some(x => isBorrowed(x.def));
  const listItems = indexed.filter(x => (tab === 'borrowed') === isBorrowed(x.def));

  const header = (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>puchi-shichigo</Text>
        <Text style={styles.subtitle}>Word chunk puzzles</Text>
      </View>

      <Toggle
        options={[
          { key: 'numbers', label: 'Numbers' },
          { key: 'list', label: 'List' },
        ]}
        value={view}
        onChange={setView}
      />

      {view === 'list' && hasBorrowed && (
        <Toggle
          options={[
            { key: 'generated', label: 'Generated' },
            { key: 'borrowed', label: 'Sourced Online' },
          ]}
          value={tab}
          onChange={setTab}
        />
      )}

      <Text style={styles.sectionLabel}>Choose a round</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {view === 'numbers' ? (
        <ScrollView contentContainerStyle={styles.scroll}>
          {header}
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
      ) : (
        <FlatList
          contentContainerStyle={styles.scroll}
          ListHeaderComponent={header}
          data={listItems}
          keyExtractor={x => x.def.id}
          renderItem={({ item }) => (
            <ListRow
              def={item.def}
              index={item.i}
              status={roundStatuses[item.i]}
              onPress={() => onSelectPuzzle(item.i)}
            />
          )}
        />
      )}
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
    marginBottom: 20,
  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: '#EDEDEB',
    borderRadius: 10,
    padding: 3,
    marginBottom: 12,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleBtnOn: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
  },
  toggleTextOn: {
    color: '#222',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 10,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  rowNumber: {
    width: 40,
    fontSize: 14,
    fontWeight: '800',
  },
  rowTitles: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  rowTheme: {
    fontSize: 12,
    marginTop: 1,
  },
  rowCheck: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
    marginLeft: 8,
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
