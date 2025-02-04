import { useColorScheme } from 'react-native';
import { theme } from '../theme';

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return {
    ...theme,
    isDark,
    // Commonly used computed properties
    backgroundColor: isDark ? theme.colors.background.dark : theme.colors.background.light,
    textColor: isDark ? theme.colors.text.dark.primary : theme.colors.text.light.primary,
    surfaceColor: isDark ? theme.colors.surface.dark : theme.colors.surface.light,
  };
};