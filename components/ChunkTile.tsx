import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, useStyles } from '../theme';

type TileState = 'normal' | 'selected' | 'used';

interface Props {
  text: string;
  tileState: TileState;
  onPress: () => void;
}

export function ChunkTile({ text, tileState, onPress }: Props) {
  const styles = useStyles(makeStyles);
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

const makeStyles = (c: Colors) => StyleSheet.create({
  // 5 columns: 5 x (18.4% + 2 x 0.8%) = 100%
  tile: {
    width: '18.4%',
    marginHorizontal: '0.8%',
    marginBottom: 7,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  normal:   { backgroundColor: c.tile },
  selected: { backgroundColor: c.accent },
  used:     { backgroundColor: c.tileUsed },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: c.text,
    letterSpacing: 1,
  },
  usedText: { color: c.tileUsedText },
});
