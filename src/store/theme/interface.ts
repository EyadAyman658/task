import type { Theme } from '@mui/material/styles';
import type { ThemeMode } from '../../theme/interface';

// Theme preference type
export type ThemePreference = 'light' | 'dark' | 'system';

// Theme state interface
export interface ThemeState {
  // Current theme mode being used
  mode: ThemeMode;

  preference: ThemePreference;

  systemTheme: ThemeMode;

  currentTheme: Theme;

  isInitialized: boolean;
}

export interface ThemeActions {
  setTheme: (preference: ThemePreference) => void;

  toggleTheme: () => void;

  initializeTheme: () => void;

  updateSystemTheme: (systemTheme: ThemeMode) => void;

  resetToSystem: () => void;

  getEffectiveTheme: () => ThemeMode;
}

export interface ThemeStore extends ThemeState, ThemeActions {}

export interface ThemeStorage {
  preference: ThemePreference;
  mode: ThemeMode;
  timestamp: number;
}

// Theme utilities interface
export interface ThemeUtils {
  // Detect system theme
  detectSystemTheme: () => ThemeMode;

  // Save to localStorage
  saveToStorage: (preference: ThemePreference, mode: ThemeMode) => void;

  // Load from localStorage
  loadFromStorage: () => ThemeStorage | null;

  // Clear localStorage
  clearStorage: () => void;

  // Setup system theme listener
  setupSystemThemeListener: (
    callback: (theme: ThemeMode) => void
  ) => () => void;
}
