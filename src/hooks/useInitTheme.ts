import { useThemeStore } from '../store/theme';

// Hook to initialize theme on app start
export const useInitializeTheme = () => {
  const initializeTheme = useThemeStore(state => state.initializeTheme);
  const isInitialized = useThemeStore(state => state.isInitialized);

  // Initialize theme if not already done
  if (!isInitialized) {
    initializeTheme();
  }

  return isInitialized;
};
