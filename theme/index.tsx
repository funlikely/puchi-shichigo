import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';

export type ThemeMode = 'light' | 'dark';

const light = {
  bg: '#FAF8F3',
  webBackdrop: '#1C1C1E',
  surface: '#FFFFFF',
  surfaceMuted: '#EDEDEB',
  toggleOn: '#FFFFFF',
  border: '#EBEBEB',
  tile: '#E0D8C8',
  tileUsed: '#D0D0D0',
  tileUsedText: '#999999',
  builderBg: '#EEEAE0',
  clearBtn: '#C8C4BC',
  imagePlaceholder: '#EEEEEE',
  text: '#222222',
  textBody: '#333333',
  textSecondary: '#444444',
  textNumber: '#555555',
  textMuted: '#777777',
  textToggle: '#888888',
  textFaint: '#999999',
  textFainter: '#AAAAAA',
  textFaintest: '#BBBBBB',
  accent: '#4A90D9',
  success: '#5CB85C',
  warn: '#F5C518',
  onAccent: '#FFFFFF',
  onAccentSub: 'rgba(255,255,255,0.8)',
  onWarn: '#333333',
  onWarnSub: '#7A6000',
  shadow: '#000000',
};

export type Colors = typeof light;

const dark: Colors = {
  bg: '#141414',
  webBackdrop: '#000000',
  surface: '#232323',
  surfaceMuted: '#2A2A2A',
  toggleOn: '#3D3D3D',
  border: '#2C2C2C',
  tile: '#4A4236',
  tileUsed: '#262626',
  tileUsedText: '#5A5A5A',
  builderBg: '#211E19',
  clearBtn: '#3D3D3D',
  imagePlaceholder: '#2A2A2A',
  text: '#EEEEEE',
  textBody: '#E0E0E0',
  textSecondary: '#C8C8C8',
  textNumber: '#BBBBBB',
  textMuted: '#9A9A9A',
  textToggle: '#8A8A8A',
  textFaint: '#888888',
  textFainter: '#777777',
  textFaintest: '#666666',
  accent: '#4A90D9',
  success: '#3F9A4C',
  warn: '#D4A90F',
  onAccent: '#FFFFFF',
  onAccentSub: 'rgba(255,255,255,0.8)',
  onWarn: '#1A1A1A',
  onWarnSub: '#4A3A00',
  shadow: '#000000',
};

interface ThemeValue {
  mode: ThemeMode;
  colors: Colors;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeValue>({ mode: 'light', colors: light, toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Starts from the device setting; the in-app toggle overrides it for this session.
  const system = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(system === 'dark' ? 'dark' : 'light');
  const value = useMemo<ThemeValue>(
    () => ({
      mode,
      colors: mode === 'dark' ? dark : light,
      toggle: () => setMode(m => (m === 'dark' ? 'light' : 'dark')),
    }),
    [mode],
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);

/** Build a StyleSheet from the current colors. Pass a module-level factory so it memoizes. */
export function useStyles<T>(factory: (c: Colors) => T): T {
  const { colors } = useTheme();
  return useMemo(() => factory(colors), [colors, factory]);
}
