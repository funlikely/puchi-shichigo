import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type TileState = 'normal' | 'selected' | 'used';

interface Props {
  text: string;
  tileState: TileState;
  onPress: () => void;
}

export function ChunkTile({ text, tileState, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.tile, styles[tileState]]}
      onPress={onPress}
      disabled={tileState === 'used'}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, tileState === 'used' && styles.usedText]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tile: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 8,
    margin: 4,
    minWidth: 64,
    alignItems: 'center',
  },
  normal:   { backgroundColor: '#E0D8C8' },
  selected: { backgroundColor: '#4A90D9' },
  used:     { backgroundColor: '#D0D0D0' },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    letterSpacing: 1,
  },
  usedText: { color: '#999' },
});
