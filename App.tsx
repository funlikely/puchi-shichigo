import React, { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { PUZZLE_DEFS } from './data/puzzles';
import { GameScreen } from './screens/GameScreen';
import { HomeScreen } from './screens/HomeScreen';

type Screen = 'home' | 'game';

const isWeb = Platform.OS === 'web';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [puzzleIndex, setPuzzleIndex] = useState(0);

  return (
    <View style={styles.root}>
      <View style={styles.phone}>
        {screen === 'home' ? (
          <HomeScreen
            onSelectPuzzle={index => {
              setPuzzleIndex(index);
              setScreen('game');
            }}
          />
        ) : (
          <GameScreen
            puzzleDef={PUZZLE_DEFS[puzzleIndex]}
            onBack={() => setScreen('home')}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: isWeb ? '#1C1C1E' : '#FAF8F3',
    alignItems: 'center',
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
});
