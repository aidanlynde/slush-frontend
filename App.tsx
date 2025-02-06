// App.tsx
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from './src/providers/AppProvider';
import SignInScreen from './src/screens/auth/SignInScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import { AuthStackParamList } from './src/navigation/types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

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

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer theme={navigationTheme}>
          <Stack.Navigator 
            screenOptions={{ 
              headerShown: false,
              contentStyle: {
                backgroundColor: '#1A1A1A',
              },
            }}
          >
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}