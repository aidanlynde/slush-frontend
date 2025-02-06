// App.tsx
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './src/providers/AppProvider';
import { APITest } from './src/components/APITest';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { View } from 'react-native';

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <AppProvider>
          <View style={{ flex: 1, marginTop: 50 }}>
            <APITest />
          </View>
        </AppProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}