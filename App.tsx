import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors, ThemeProvider, useStyles, useTheme } from './theme';
import { PUZZLE_DEFS } from './data/puzzles';
import { KEYS, loadJSON, saveJSON } from './data/storage';
import { GameScreen } from './screens/GameScreen';
import { HomeScreen } from './screens/HomeScreen';
import { SettingsScreen } from './screens/SettingsScreen';

export type RoundStatus = 'attempted' | 'completed';

type Screen = 'home' | 'game' | 'settings';

const isWeb = Platform.OS === 'web';

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}

function AppInner() {
  const styles = useStyles(makeStyles);
  const { mode } = useTheme();
  const [screen, setScreen] = useState<Screen>('home');
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [roundStatuses, setRoundStatuses] = useState<Record<number, RoundStatus>>({});
  const loaded = useRef(false);

  // Progress is stored by puzzle id, so adding or removing rounds never shifts it.
  useEffect(() => {
    loadJSON<Record<string, RoundStatus>>(KEYS.progress).then(saved => {
      if (saved) {
        const byIndex: Record<number, RoundStatus> = {};
        PUZZLE_DEFS.forEach((def, i) => {
          if (saved[def.id]) byIndex[i] = saved[def.id];
        });
        setRoundStatuses(prev => ({ ...byIndex, ...prev }));
      }
      loaded.current = true;
    });
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    const byId: Record<string, RoundStatus> = {};
    Object.entries(roundStatuses).forEach(([i, st]) => {
      const def = PUZZLE_DEFS[Number(i)];
      if (def) byId[def.id] = st;
    });
    saveJSON(KEYS.progress, byId);
  }, [roundStatuses]);

  const markAttempted = (index: number) =>
    setRoundStatuses(prev =>
      prev[index] === 'completed' ? prev : { ...prev, [index]: 'attempted' }
    );

  const markCompleted = (index: number) =>
    setRoundStatuses(prev => ({ ...prev, [index]: 'completed' }));

  const goHome = useCallback(() => setScreen('home'), []);

  return (
    <SafeAreaProvider>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <View style={styles.root}>
        <View style={styles.phone}>
          {/* Home stays mounted under the other screens so its view, open sections
              and scroll position are still there when you come back. */}
          <HomeScreen
            roundStatuses={roundStatuses}
            onOpenSettings={() => setScreen('settings')}
            onSelectPuzzle={index => {
              markAttempted(index);
              setPuzzleIndex(index);
              setScreen('game');
            }}
          />
          {screen === 'game' && (
            <View style={styles.overlay}>
              <GameScreen
                puzzleDef={PUZZLE_DEFS[puzzleIndex]}
                onBack={goHome}
                onComplete={() => markCompleted(puzzleIndex)}
              />
            </View>
          )}
          {screen === 'settings' && (
            <View style={styles.overlay}>
              <SettingsScreen
                completed={Object.values(roundStatuses).filter(s => s === 'completed').length}
                started={Object.values(roundStatuses).filter(s => s === 'attempted').length}
                onBack={goHome}
                onClearProgress={() => setRoundStatuses({})}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const makeStyles = (c: Colors) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: isWeb ? c.webBackdrop : c.bg,
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: c.bg,
  },
  phone: {
    flex: 1,
    width: '100%',
    maxWidth: 430,
    backgroundColor: c.bg,
    ...(isWeb && {
      marginVertical: 24,
      borderRadius: 40,
      overflow: 'hidden',
      shadowColor: c.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.5,
      shadowRadius: 24,
    }),
  },
});
