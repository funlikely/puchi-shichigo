import React, { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors, ThemeProvider, useStyles, useTheme } from './theme';
import { PUZZLE_DEFS } from './data/puzzles';
import { GameScreen } from './screens/GameScreen';
import { HomeScreen } from './screens/HomeScreen';

export type RoundStatus = 'attempted' | 'completed';

type Screen = 'home' | 'game';

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

  const markAttempted = (index: number) =>
    setRoundStatuses(prev =>
      prev[index] === 'completed' ? prev : { ...prev, [index]: 'attempted' }
    );

  const markCompleted = (index: number) =>
    setRoundStatuses(prev => ({ ...prev, [index]: 'completed' }));

  return (
    <SafeAreaProvider>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <View style={styles.root}>
        <View style={styles.phone}>
          {screen === 'home' ? (
            <HomeScreen
              roundStatuses={roundStatuses}
              onSelectPuzzle={index => {
                markAttempted(index);
                setPuzzleIndex(index);
                setScreen('game');
              }}
            />
          ) : (
            <GameScreen
              puzzleDef={PUZZLE_DEFS[puzzleIndex]}
              onBack={() => setScreen('home')}
              onComplete={() => markCompleted(puzzleIndex)}
            />
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
