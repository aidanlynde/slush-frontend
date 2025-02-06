// src/screens/auth/SignUpScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useAuthContext } from '../../providers/AuthProvider';
import { useTheme } from '../../hooks/useTheme';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { signup, isLoading, error } = useAuthContext();
  const theme = useTheme();

  const handleSignUp = async () => {
    try {
      await signup({ email, username, password });
      // Navigation will be handled by the auth state change
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.logoContainer}>
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
      label="Username"
      value={username}
      onChangeText={setUsername}
      autoCapitalize="none"
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
        onPress={handleSignUp}
        loading={isLoading}
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        labelStyle={styles.buttonText}
      >
        Create Account
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.goBack()}
        style={styles.linkButton}
        labelStyle={{ color: theme.colors.primary }}
      >
        Already have an account? Sign In
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

export default SignUpScreen;