// src/screens/auth/SignInScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;

const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { login, isLoading, error } = useAuth();
  const theme = useTheme();

  const handleLogin = async () => {
    try {
      await login({ email, password });
      // Navigation will be handled by the auth state change
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.logoContainer}>
        {/* Placeholder for your logo - replace src with your actual logo */}
        <Text style={[styles.logoText, { color: theme.colors.primary }]}>S$</Text>
        <Text style={[styles.appName, { color: theme.textColor }]}>slush</Text>
      </View>

      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

    <TextInput
      mode="outlined"
      label="Email"
      value={email}
      onChangeText={setEmail}
      autoCapitalize="none"
      keyboardType="email-address"
      style={styles.input}
      theme={{ 
        colors: { 
          primary: theme.colors.primary,
          onSurfaceVariant: '#FFFFFF',  // Label color
          background: '#1A1A1A',        // Background color
          surface: '#2A2A2A',           // Input background
          onSurface: '#FFFFFF',         // Text color
        }
      }}
    />

    <TextInput
      mode="outlined"
      label="Password"
      value={password}
      onChangeText={setPassword}
      secureTextEntry={!isPasswordVisible}
      right={
        <TextInput.Icon 
          icon={isPasswordVisible ? "eye-off" : "eye"} 
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          color="#FFFFFF"  // Icon color
        />
      }
      style={styles.input}
      theme={{ 
        colors: { 
          primary: theme.colors.primary,
          onSurfaceVariant: '#FFFFFF',  // Label color
          background: '#1A1A1A',        // Background color
          surface: '#2A2A2A',           // Input background
          onSurface: '#FFFFFF',         // Text color
        }
      }}
    />

      <Button
        mode="contained"
        onPress={handleLogin}
        loading={isLoading}
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        labelStyle={styles.buttonText}
      >
        Sign In
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate('SignUp')}
        style={styles.linkButton}
        labelStyle={{ color: theme.colors.primary }}
      >
        Don't have an account? Sign Up
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 60,
  },
  logoText: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 24,
    marginTop: 8,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    marginTop: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default SignInScreen;