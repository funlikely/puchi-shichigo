import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  chunkTexts: string[];
  onClear: () => void;
  onSubmit: () => void;
}

// One row: assembled word on the left, Clear/Submit on the right.
// Buttons are always rendered (hidden when empty) so the layout never shifts.
export function WordBuilder({ chunkTexts, onClear, onSubmit }: Props) {
  const hasChunks = chunkTexts.length > 0;
  return (
    <View style={styles.container}>
      <Text style={styles.word} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.6}>
        {chunkTexts.join('') || ' '}
      </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 54,
    backgroundColor: '#EEEAE0',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
    gap: 8,
  },
  word: {
    flex: 1,
    fontSize: 21,
    fontWeight: '800',
    color: '#222',
    letterSpacing: 2,
  },
  buttons: {
    flexDirection: 'row',
    gap: 6,
  },
  clearBtn: {
    paddingHorizontal: 12,
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
    paddingHorizontal: 14,
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
