import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { lightTheme, darkTheme } from '../../theme';
import type { ThemeMode } from '../../theme/interface';
import type {
  ThemeStore,
  ThemePreference,
  ThemeStorage,
  ThemeUtils,
} from './interface';

// Theme storage key
const THEME_STORAGE_KEY = 'thunder-task-theme';

// Theme utilities
const themeUtils: ThemeUtils = {
  // Detect system theme preference
  detectSystemTheme: (): ThemeMode => {
    if (typeof window === 'undefined') return 'light';

    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } catch {
      return 'light';
    }
  },

  // Save theme to localStorage
  saveToStorage: (preference: ThemePreference, mode: ThemeMode): void => {
    if (typeof window === 'undefined') return;

    try {
      const storage: ThemeStorage = {
        preference,
        mode,
        timestamp: Date.now(),
      };
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(storage));
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  },

  // Load theme from localStorage
  loadFromStorage: (): ThemeStorage | null => {
    if (typeof window === 'undefined') return null;

    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (!stored) return null;

      const parsed = JSON.parse(stored) as ThemeStorage;

      // Validate the stored data
      if (
        !parsed ||
        typeof parsed.preference !== 'string' ||
        typeof parsed.mode !== 'string' ||
        !['light', 'dark', 'system'].includes(parsed.preference) ||
        !['light', 'dark'].includes(parsed.mode)
      ) {
        return null;
      }

      // Check if data is not too old (optional: 30 days)
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      if (Date.now() - parsed.timestamp > thirtyDays) {
        themeUtils.clearStorage();
        return null;
      }

      return parsed;
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
      return null;
    }
  },

  // Clear theme from localStorage
  clearStorage: (): void => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear theme from localStorage:', error);
    }
  },

  // Setup system theme change listener
  setupSystemThemeListener: (
    callback: (theme: ThemeMode) => void
  ): (() => void) => {
    if (typeof window === 'undefined') return () => {};

    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleChange = (e: MediaQueryListEvent) => {
        callback(e.matches ? 'dark' : 'light');
      };

      // Modern browsers
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }

      return () => {};
    } catch {
      return () => {};
    }
  },
};

// Create the theme store
export const useThemeStore = create<ThemeStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      mode: 'light',
      preference: 'system',
      systemTheme: 'light',
      currentTheme: lightTheme,
      isInitialized: false,

      // Actions
      setTheme: (preference: ThemePreference) => {
        const systemTheme = get().systemTheme;
        const effectiveMode =
          preference === 'system' ? systemTheme : (preference as ThemeMode);

        const newTheme = effectiveMode === 'dark' ? darkTheme : lightTheme;

        set({
          preference,
          mode: effectiveMode,
          currentTheme: newTheme,
        });

        // Save to localStorage
        themeUtils.saveToStorage(preference, effectiveMode);
      },

      toggleTheme: () => {
        const currentMode = get().mode;
        const newMode: ThemeMode = currentMode === 'light' ? 'dark' : 'light';
        const newTheme = newMode === 'dark' ? darkTheme : lightTheme;

        set({
          preference: newMode, // Set preference to the specific mode
          mode: newMode,
          currentTheme: newTheme,
        });

        // Save to localStorage
        themeUtils.saveToStorage(newMode, newMode);
      },

      initializeTheme: () => {
        // Detect system theme
        const systemTheme = themeUtils.detectSystemTheme();

        // Try to load from localStorage
        const stored = themeUtils.loadFromStorage();

        let preference: ThemePreference = 'system';
        let mode: ThemeMode = systemTheme;

        if (stored) {
          preference = stored.preference;
          mode = stored.preference === 'system' ? systemTheme : stored.mode;
        }

        const currentTheme = mode === 'dark' ? darkTheme : lightTheme;

        set({
          preference,
          mode,
          systemTheme,
          currentTheme,
          isInitialized: true,
        });

        // Save initial state to localStorage
        themeUtils.saveToStorage(preference, mode);

        // Setup system theme listener
        const cleanup = themeUtils.setupSystemThemeListener(newSystemTheme => {
          get().updateSystemTheme(newSystemTheme);
        });

        // Store cleanup function (you might want to call this on app unmount)
        if (typeof window !== 'undefined') {
          (
            window as unknown as { __themeCleanup?: () => void }
          ).__themeCleanup = cleanup;
        }
      },

      updateSystemTheme: (systemTheme: ThemeMode) => {
        const currentPreference = get().preference;

        set({ systemTheme });

        // If user prefers system theme, update the mode
        if (currentPreference === 'system') {
          const newTheme = systemTheme === 'dark' ? darkTheme : lightTheme;

          set({
            mode: systemTheme,
            currentTheme: newTheme,
          });

          // Save to localStorage
          themeUtils.saveToStorage('system', systemTheme);
        }
      },

      resetToSystem: () => {
        const systemTheme = get().systemTheme;
        const newTheme = systemTheme === 'dark' ? darkTheme : lightTheme;

        set({
          preference: 'system',
          mode: systemTheme,
          currentTheme: newTheme,
        });

        // Save to localStorage
        themeUtils.saveToStorage('system', systemTheme);
      },

      getEffectiveTheme: (): ThemeMode => {
        const { preference, systemTheme } = get();
        return preference === 'system'
          ? systemTheme
          : (preference as ThemeMode);
      },
    }),
    {
      name: 'theme-store',
    }
  )
);

// Export types
export type {
  ThemeStore,
  ThemePreference,
  ThemeStorage,
  ThemeUtils,
} from './interface';
