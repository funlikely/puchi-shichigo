import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  chunkTexts: string[];
  onClear: () => void;
  onSubmit: () => void;
}

export function WordBuilder({ chunkTexts, onClear, onSubmit }: Props) {
  const hasChunks = chunkTexts.length > 0;
  return (
    <View style={styles.container}>
      <Text style={styles.word}>{chunkTexts.join('') || ' '}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.clearBtn, !hasChunks && styles.invisible]}
          onPress={onClear}
          disabled={!hasChunks}
        >
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.submitBtn, !hasChunks && styles.invisible]}
          onPress={onSubmit}
          disabled={!hasChunks}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
    backgroundColor: '#EEEAE0',
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    gap: 10,
  },
  word: {
    fontSize: 24,
    fontWeight: '800',
    color: '#222',
    letterSpacing: 3,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  clearBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#C8C4BC',
    borderRadius: 8,
  },
  clearText: {
    fontSize: 14,
    color: '#444',
    fontWeight: '600',
  },
  submitBtn: {
    paddingHorizontal: 28,
    paddingVertical: 8,
    backgroundColor: '#4A90D9',
    borderRadius: 8,
  },
  submitText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
  },
  invisible: {
    opacity: 0,
  },
});
