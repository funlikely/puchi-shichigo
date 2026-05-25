import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  index: number;
  clue: string;
  answer: string;
  isSolved: boolean;
  isActive: boolean;
  onPress: () => void;
}

export function ClueRow({ index, clue, answer, isSolved, isActive, onPress }: Props) {
  const light = isActive || isSolved;
  return (
    <TouchableOpacity
      style={[styles.row, isActive && styles.active, isSolved && styles.solved]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.index, light && styles.lightText]}>{index + 1}</Text>
      <Text style={[styles.clue, light && styles.lightText]} numberOfLines={1}>
        {clue}
      </Text>
      <Text style={[styles.answer, light && styles.lightText]}>
        {isSolved ? answer : '• • •'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: '#EDEDEB',
  },
  active: { backgroundColor: '#4A90D9' },
  solved: { backgroundColor: '#5CB85C' },
  index: {
    width: 22,
    fontSize: 13,
    fontWeight: '600',
    color: '#777',
  },
  clue: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  answer: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    letterSpacing: 1,
  },
  lightText: { color: '#fff' },
});
