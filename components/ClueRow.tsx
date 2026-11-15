import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, useStyles } from '../theme';

interface Props {
  index: number;
  clue: string;
  answer: string;
  isSolved: boolean;
  isActive: boolean;
  onPress: () => void;
}

export function ClueRow({ index, clue, answer, isSolved, isActive, onPress }: Props) {
  const styles = useStyles(makeStyles);
  const light = isActive || isSolved;
  return (
    <TouchableOpacity
      style={[styles.row, isActive && styles.active, isSolved && styles.solved]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.index, light && styles.lightText]}>{index + 1}</Text>
      <Text style={[styles.clue, light && styles.lightText]} numberOfLines={2}>
        {clue}
      </Text>
      {isSolved ? (
        <Text style={[styles.answer, styles.lightText]}>{answer}</Text>
      ) : (
        <Text style={[styles.letterCount, isActive && styles.lightText]}>
          {answer.length} letters
        </Text>
      )}
    </TouchableOpacity>
  );
}

const makeStyles = (c: Colors) => StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: c.surfaceMuted,
  },
  active: { backgroundColor: c.accent },
  solved: { backgroundColor: c.success },
  index: {
    width: 22,
    fontSize: 13,
    fontWeight: '600',
    color: c.textMuted,
  },
  clue: {
    flex: 1,
    marginRight: 8,
    fontSize: 14,
    color: c.textBody,
  },
  answer: {
    fontSize: 14,
    fontWeight: '700',
    color: c.textBody,
    letterSpacing: 1,
  },
  letterCount: {
    fontSize: 13,
    fontWeight: '600',
    color: c.textMuted,
  },
  lightText: { color: c.onAccent },
});
