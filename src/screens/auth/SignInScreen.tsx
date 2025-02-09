// src/screens/auth/SignInScreen.tsx
// src/screens/auth/SignInScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useAuthContext } from '../../providers/AuthProvider';
import { useTheme } from '../../hooks/useTheme';
import { validateEmail } from '../../utils/validation';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { login, isLoading, error } = useAuthContext();
  const theme = useTheme();

  // Refs for input fields
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  // Validate email on change
  useEffect(() => {
    if (email) {
      setEmailError(validateEmail(email));
    } else {
      setEmailError(null);
    }
  }, [email]);

  const handleLogin = async () => {
    Keyboard.dismiss();
    
    // Validate before submission
    const emailValidation = validateEmail(email);
    setEmailError(emailValidation);

    if (emailValidation || !password) {
      return;
    }

    try {
      await login({ email, password });
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  const isFormValid = !emailError && email.length > 0 && password.length > 0;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
          <View style={styles.logoContainer}>
            <Text style={[styles.logoText, { color: theme.colors.primary }]}>S$</Text>
            <Text style={[styles.appName, { color: theme.textColor }]}>slush</Text>
          </View>

          {error && (
            <Text style={styles.error}>{error}</Text>
          )}

          <TextInput
            ref={emailRef}
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
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
            ref={passwordRef}
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            returnKeyType="done"
            onSubmitEditing={handleLogin}
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

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={isLoading}
            disabled={!isFormValid || isLoading}
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

          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
          )}
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
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
    marginBottom: 16,
    marginLeft: 4,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignInScreen;