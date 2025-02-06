// src/providers/AppProvider.tsx
import React from 'react';
import { Provider as PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { useTheme } from '../hooks/useTheme';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();

  const paperTheme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: theme.colors.primary,
      background: '#1A1A1A',
      surface: '#2A2A2A',
      text: '#FFFFFF',
    },
  };

  return (
    <PaperProvider theme={paperTheme}>
      {children}
    </PaperProvider>
  );
};