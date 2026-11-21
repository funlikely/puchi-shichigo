import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, useStyles } from '../theme';

interface Props {
  chunks: { id: number; text: string }[];
  onRemove: (id: number) => void;
  onClear: () => void;
  onSubmit: () => void;
}

// Picked tiles sit in order on the left (tap one to send it back); Clear/Submit on the right.
// Buttons are always rendered (hidden when empty) so the layout never shifts.
export function WordBuilder({ chunks, onRemove, onClear, onSubmit }: Props) {
  const styles = useStyles(makeStyles);
  const hasChunks = chunks.length > 0;
  return (
    <View style={styles.container}>
      <View style={styles.word}>
        {chunks.map(c => (
          <TouchableOpacity
            key={c.id}
            style={styles.chip}
            onPress={() => onRemove(c.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.chipText}>{c.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
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

const makeStyles = (c: Colors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    minHeight: 54,
    paddingVertical: 6,
    backgroundColor: c.builderBg,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
    gap: 8,
  },
  word: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
  },
  chip: {
    paddingHorizontal: 7,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: c.accent,
  },
  chipText: {
    fontSize: 16,
    fontWeight: '800',
    color: c.onAccent,
    letterSpacing: 1,
  },
  buttons: {
    flexDirection: 'row',
    gap: 6,
  },
  clearBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: c.clearBtn,
    borderRadius: 8,
  },
  clearText: {
    fontSize: 14,
    color: c.textSecondary,
    fontWeight: '600',
  },
  submitBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: c.accent,
    borderRadius: 8,
  },
  submitText: {
    fontSize: 14,
    color: c.onAccent,
    fontWeight: '700',
  },
  invisible: {
    opacity: 0,
  },
});
