import AsyncStorage from '@react-native-async-storage/async-storage';

// Small on-device persistence. Failures are ignored: the app still works, it just forgets.
export async function loadJSON<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function saveJSON(key: string, value: unknown): void {
  AsyncStorage.setItem(key, JSON.stringify(value)).catch(() => {});
}

export const KEYS = {
  progress: 'puchi.progress.v1', // { [puzzleId]: 'attempted' | 'completed' }
  theme: 'puchi.theme.v1', // 'light' | 'dark'
};
