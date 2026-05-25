import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  chunkTexts: string[];
  onClear: () => void;
}

export function WordBuilder({ chunkTexts, onClear }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.word}>{chunkTexts.join('') || ' '}</Text>
      {chunkTexts.length > 0 && (
        <TouchableOpacity style={styles.clearBtn} onPress={onClear}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
    backgroundColor: '#EEEAE0',
    borderRadius: 10,
    marginVertical: 10,
  },
  word: {
    flex: 1,
    fontSize: 24,
    fontWeight: '800',
    color: '#222',
    letterSpacing: 3,
    textAlign: 'center',
  },
  clearBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#C8C4BC',
    borderRadius: 6,
  },
  clearText: {
    fontSize: 13,
    color: '#444',
    fontWeight: '600',
  },
});
