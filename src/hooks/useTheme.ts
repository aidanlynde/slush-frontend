// src/hooks/useTheme.ts
import { useColorScheme } from 'react-native';
import { theme } from '../theme';

export const useTheme = () => {
  // Force dark mode by not using useColorScheme()
  const isDark = true;

  return {
    ...theme,
    isDark,
    backgroundColor: theme.colors.background.dark,
    textColor: theme.colors.text.dark.primary,
    surfaceColor: theme.colors.surface.dark,
  };
};