import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, useStyles, useTheme } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RoundStatus } from '../App';
import { collectionOf, isBorrowed, PUZZLE_DEFS, PuzzleDef } from '../data/puzzles';

interface Props {
  onSelectPuzzle: (index: number) => void;
  roundStatuses: Record<number, RoundStatus>;
}

type StatusKey = RoundStatus | 'none';

// Card/row colors per round status: background, main text, secondary text.
const statusColors = (c: Colors, key: StatusKey) =>
  ({
    completed: { bg: c.success, text: c.onAccent, sub: c.onAccentSub, number: c.onAccent },
    attempted: { bg: c.warn, text: c.onWarn, sub: c.onWarnSub, number: c.onWarnSub },
    none: { bg: c.surface, text: c.text, sub: c.textFainter, number: c.textNumber },
  })[key];

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
  const styles = useStyles(makeStyles);
  const { colors } = useTheme();
  const sc = statusColors(colors, status ?? 'none');
  const isCompleted = status === 'completed';

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: sc.bg }]} onPress={onPress} activeOpacity={0.8}>
      <Text style={[styles.number, { color: sc.number }]}>
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
  const styles = useStyles(makeStyles);
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
  const styles = useStyles(makeStyles);
  const { colors } = useTheme();
  const sc = statusColors(colors, status ?? 'none');
  // The section header already names the collection, so drop it from the subtitle.
  const collection = collectionOf(def);
  const theme = def.theme?.startsWith(collection + ': ') ? def.theme.slice(collection.length + 2) : def.theme;
  const showTheme = !isBorrowed(def) && theme && theme !== 'Mixed' && theme !== collection;
  return (
    <TouchableOpacity
      style={[styles.row, { backgroundColor: sc.bg }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.rowNumber, { color: sc.sub }]}>{index + 1}</Text>
      <View style={styles.rowTitles}>
        <Text style={[styles.rowTitle, { color: sc.text }]} numberOfLines={1}>
          {def.title}
        </Text>
        {showTheme ? (
          <Text style={[styles.rowTheme, { color: sc.sub }]} numberOfLines={1}>
            {theme}
          </Text>
        ) : null}
      </View>
      {status === 'completed' && <Text style={styles.rowCheck}>✓</Text>}
    </TouchableOpacity>
  );
}

export function HomeScreen({ onSelectPuzzle, roundStatuses }: Props) {
  const styles = useStyles(makeStyles);
  const { mode, toggle } = useTheme();
  const [view, setView] = useState<View_>('numbers');
  const [tab, setTab] = useState<SourceTab>('generated');

  // Keep each puzzle's index into PUZZLE_DEFS so selection and status still line up.
  const indexed = useMemo(() => PUZZLE_DEFS.map((def, i) => ({ def, i })), []);
  const hasBorrowed = indexed.some(x => isBorrowed(x.def));
  const [open, setOpen] = useState<Set<string>>(new Set());

  // Collections in order of first appearance; each section keeps its full item list
  // in `items` and only hands rows to SectionList when expanded.
  const groups = useMemo(() => {
    const m = new Map<string, { def: PuzzleDef; i: number }[]>();
    for (const x of indexed) {
      if ((tab === 'borrowed') !== isBorrowed(x.def)) continue;
      const k = collectionOf(x.def);
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(x);
    }
    return [...m].map(([title, items]) => ({ title, items }));
  }, [indexed, tab]);
  const sections = groups.map(g => ({ ...g, data: open.has(g.title) ? g.items : [] }));
  const toggleSection = (title: string) =>
    setOpen(prev => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });

  const header = (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggle} style={styles.themeBtn} hitSlop={12}>
          <Text style={styles.themeText}>{mode === 'dark' ? '☀ Light' : '☾ Dark'}</Text>
        </TouchableOpacity>
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
        <SectionList
          contentContainerStyle={styles.scroll}
          ListHeaderComponent={header}
          sections={sections}
          stickySectionHeadersEnabled={false}
          keyExtractor={x => x.def.id}
          renderSectionHeader={({ section }) => {
            const done = section.items.filter(x => roundStatuses[x.i] === 'completed').length;
            const isOpen = open.has(section.title);
            return (
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleSection(section.title)}
                activeOpacity={0.7}
              >
                <Text style={styles.sectionChevron}>{isOpen ? '▾' : '▸'}</Text>
                <Text style={styles.sectionTitle} numberOfLines={1}>{section.title}</Text>
                <Text style={styles.sectionCount}>
                  {done}/{section.items.length}
                </Text>
              </TouchableOpacity>
            );
          }}
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

const makeStyles = (c: Colors) => StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: c.bg,
  },
  scroll: {
    padding: 16,
    paddingTop: 36,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  themeBtn: {
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: c.surfaceMuted,
    marginBottom: 8,
  },
  themeText: {
    fontSize: 13,
    fontWeight: '700',
    color: c.textSecondary,
  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: c.surfaceMuted,
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
    backgroundColor: c.toggleOn,
    shadowColor: c.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: c.textToggle,
  },
  toggleTextOn: {
    color: c.text,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 10,
    marginBottom: 6,
    shadowColor: c.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 6,
    backgroundColor: c.surfaceMuted,
  },
  sectionChevron: {
    width: 22,
    fontSize: 16,
    color: c.textSecondary,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: c.text,
  },
  sectionCount: {
    fontSize: 13,
    fontWeight: '700',
    color: c.textFaint,
    marginLeft: 8,
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
    color: c.onAccent,
    marginLeft: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: c.text,
    letterSpacing: 1,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: c.textFaint,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: c.textFaintest,
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
    shadowColor: c.shadow,
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
    color: c.onAccentSub,
  },
});
