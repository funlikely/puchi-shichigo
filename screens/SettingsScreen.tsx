import React, { useEffect, useState } from 'react';
import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, useStyles, useTheme } from '../theme';

interface Props {
  completed: number;
  started: number;
  onBack: () => void;
  onClearProgress: () => void;
}

export function SettingsScreen({ completed, started, onBack, onClearProgress }: Props) {
  const styles = useStyles(makeStyles);
  const { mode, toggle } = useTheme();
  const [confirming, setConfirming] = useState(false);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack();
      return true;
    });
    return () => sub.remove();
  }, [onBack]);

  const hasProgress = completed + started > 0;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} hitSlop={12}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Appearance</Text>
          <TouchableOpacity style={styles.button} onPress={toggle}>
            <Text style={styles.buttonText}>
              {mode === 'dark' ? '☀ Switch to light' : '☾ Switch to dark'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Progress</Text>
          <Text style={styles.cardText}>
            {completed} completed · {started} started
          </Text>
          {confirming ? (
            <>
              <Text style={styles.warnText}>
                Forget every completed and started round? This can't be undone.
              </Text>
              <View style={styles.row}>
                <TouchableOpacity
                  style={[styles.button, styles.rowBtn]}
                  onPress={() => setConfirming(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.dangerBtn, styles.rowBtn]}
                  onPress={() => {
                    onClearProgress();
                    setConfirming(false);
                    setCleared(true);
                  }}
                >
                  <Text style={styles.dangerText}>Clear</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <TouchableOpacity
              style={[styles.button, !hasProgress && styles.disabled]}
              disabled={!hasProgress}
              onPress={() => {
                setCleared(false);
                setConfirming(true);
              }}
            >
              <Text style={[styles.buttonText, styles.dangerLabel]}>Clear progress</Text>
            </TouchableOpacity>
          )}
          {cleared && !confirming && <Text style={styles.cardText}>Progress cleared.</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
}

const makeStyles = (c: Colors) => StyleSheet.create({
  safe: { flex: 1, backgroundColor: c.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  backText: { fontSize: 15, color: c.accent, fontWeight: '600', marginRight: 16 },
  title: { fontSize: 17, fontWeight: '700', color: c.text },
  body: { padding: 16, gap: 16 },
  card: { backgroundColor: c.surface, borderRadius: 12, padding: 16, gap: 10 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: c.text },
  cardText: { fontSize: 14, color: c.textMuted },
  warnText: { fontSize: 14, color: c.textBody },
  button: {
    backgroundColor: c.surfaceMuted,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: { fontSize: 14, fontWeight: '700', color: c.textSecondary },
  dangerLabel: { color: c.danger },
  dangerBtn: { backgroundColor: c.danger },
  dangerText: { fontSize: 14, fontWeight: '700', color: c.onAccent },
  disabled: { opacity: 0.4 },
  row: { flexDirection: 'row', gap: 10 },
  rowBtn: { flex: 1 },
});
