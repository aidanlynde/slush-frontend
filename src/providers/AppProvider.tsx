// src/providers/AppProvider.tsx
import React from 'react';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();

  const paperTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: theme.colors.primary,
      secondary: theme.colors.primaryDark,
    },
  };

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer>
        {children}
      </NavigationContainer>
    </PaperProvider>
  );
};