// src/providers/AppProvider.tsx
import React from 'react';
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

type Props = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  return (
    <PaperProvider theme={MD3LightTheme}>
      <NavigationContainer>
        {children}
      </NavigationContainer>
    </PaperProvider>
  );
};