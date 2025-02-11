// App.tsx
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from './src/providers/AppProvider';
import { AuthProvider } from './src/providers/AuthProvider';
import SignInScreen from './src/screens/auth/SignInScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import HomeScreen from './src/screens/app/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';
import { RootStackParamList } from './src/navigation/types';
import { useAuthContext } from './src/providers/AuthProvider';
import { initializeWordFilter } from './src/utils/wordFilter';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#FF7518',
    background: '#1A1A1A',
    card: '#2A2A2A',
    text: '#FFFFFF',
  },
};

function NavigationContent() {
  const { user } = useAuthContext();

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        contentStyle: {
          backgroundColor: '#1A1A1A',
        },
      }}
    >
      {!user ? (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initializeWordFilter();
        // Add minimum delay for smooth UX
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <AppProvider>
        <AuthProvider>
          <NavigationContainer theme={navigationTheme}>
            <NavigationContent />
          </NavigationContainer>
        </AuthProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}