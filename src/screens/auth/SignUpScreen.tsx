// src/screens/auth/SignUpScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, ProgressBar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useAuthContext } from '../../providers/AuthProvider';
import { useTheme } from '../../hooks/useTheme';
import { validateEmail, validatePassword, getPasswordStrength } from '../../utils/validation';
import { validateUsername } from '../../utils/wordFilter';
import { haptic } from '../../utils/haptics';


type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const { signup, isLoading, error } = useAuthContext();
  const theme = useTheme();

  // Validate on input change
  useEffect(() => {
    if (email) setEmailError(validateEmail(email));
  }, [email]);

  useEffect(() => {
    if (username) {
      const validationResult = validateUsername(username);
      setUsernameError(validationResult);
    } else {
      setUsernameError(null);
    }
  }, [username]);

  useEffect(() => {
    if (password) {
      setPasswordError(validatePassword(password));
      setPasswordStrength(getPasswordStrength(password));
    }
  }, [password]);

  const handleSignUp = async () => {
    // Validate all fields before submission
    const emailValidation = validateEmail(email);
    const usernameValidation = validateUsername(username);
    const passwordValidation = validatePassword(password);
  
    setEmailError(emailValidation);
    setUsernameError(usernameValidation);
    setPasswordError(passwordValidation);
  
    if (emailValidation || usernameValidation || passwordValidation) {
      await haptic.error(); // Error feedback for validation failures
      return;
    }
  
    try {
      await haptic.medium(); // Feedback when button is pressed
      await signup({ email, username, password });
      await haptic.success();
      navigation.navigate('ProfileSetup'); 
    } catch (err) {
      await haptic.error(); // Feedback for failed signup
    }
  };

  const getProgressBarColor = (strength: number) => {
    if (strength < 30) return '#FF4444';
    if (strength < 60) return '#FFA700';
    return '#00C851';
  };

  const isFormValid = !emailError && !usernameError && !passwordError && 
    email.length > 0 && username.length > 0 && password.length > 0;

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
        error={!!emailError}
        style={styles.input}
        theme={{ 
          colors: { 
            primary: theme.colors.primary,
            onSurfaceVariant: '#FFFFFF',
            background: '#1A1A1A',
            surface: '#2A2A2A',
            onSurface: '#FFFFFF',
            error: '#FF4444',
          }
        }}
      />
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}

      <TextInput
        mode="outlined"
        label="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        error={!!usernameError}
        style={styles.input}
        theme={{ 
          colors: { 
            primary: theme.colors.primary,
            onSurfaceVariant: '#FFFFFF',
            background: '#1A1A1A',
            surface: '#2A2A2A',
            onSurface: '#FFFFFF',
            error: '#FF4444',
          }
        }}
      />
      {usernameError && <Text style={styles.errorText}>{usernameError}</Text>}

      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!isPasswordVisible}
        error={!!passwordError}
        right={
          <TextInput.Icon 
            icon={isPasswordVisible ? "eye-off" : "eye"} 
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            color="#FFFFFF"
          />
        }
        style={styles.input}
        theme={{ 
          colors: { 
            primary: theme.colors.primary,
            onSurfaceVariant: '#FFFFFF',
            background: '#1A1A1A',
            surface: '#2A2A2A',
            onSurface: '#FFFFFF',
            error: '#FF4444',
          }
        }}
      />
      {password && (
        <View style={styles.strengthContainer}>
          <ProgressBar
            progress={passwordStrength / 100}
            color={getProgressBarColor(passwordStrength)}
            style={styles.strengthBar}
          />
          <Text style={[styles.strengthText, { color: getProgressBarColor(passwordStrength) }]}>
            Password Strength: {passwordStrength < 30 ? 'Weak' : passwordStrength < 60 ? 'Medium' : 'Strong'}
          </Text>
        </View>
      )}
      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

      <Button
        mode="contained"
        onPress={handleSignUp}
        loading={isLoading}
        disabled={!isFormValid || isLoading}
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
    marginVertical: 40,
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
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
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
    color: '#FF4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  errorText: {
    color: '#FF4444',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
  },
  strengthContainer: {
    marginBottom: 16,
  },
  strengthBar: {
    height: 4,
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default SignUpScreen;