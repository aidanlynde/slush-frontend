// src/screens/auth/ProfileSetupScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { haptic } from '../../utils/haptics';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';


type Props = NativeStackScreenProps<RootStackParamList, 'ProfileSetup'>;

const ProfileSetupScreen: React.FC<Props> = ({ navigation }) => {
  const [venmoUsername, setVenmoUsername] = useState('');
  const [cashappUsername, setCashappUsername] = useState('');
  const [paypalUsername, setPaypalUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const theme = useTheme();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await haptic.medium();
      // Submit logic will go here
      await haptic.success();
    } catch (error) {
      await haptic.error();
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: theme.textColor }]}>Set Up Your Profile</Text>
        
        {/* Profile picture section will go here */}
        
        <Text style={[styles.subtitle, { color: theme.textColor }]}>
          Payment Accounts
        </Text>

        <TextInput
          mode="outlined"
          label="Venmo Username"
          value={venmoUsername}
          onChangeText={setVenmoUsername}
          style={styles.input}
          theme={{ 
            colors: { 
              primary: theme.colors.primary,
              onSurfaceVariant: '#FFFFFF',
              background: '#1A1A1A',
              surface: '#2A2A2A',
              onSurface: '#FFFFFF',
            }
          }}
        />

        <TextInput
          mode="outlined"
          label="Cash App Username"
          value={cashappUsername}
          onChangeText={setCashappUsername}
          style={styles.input}
          theme={{ 
            colors: { 
              primary: theme.colors.primary,
              onSurfaceVariant: '#FFFFFF',
              background: '#1A1A1A',
              surface: '#2A2A2A',
              onSurface: '#FFFFFF',
            }
          }}
        />

        <TextInput
          mode="outlined"
          label="PayPal Username"
          value={paypalUsername}
          onChangeText={setPaypalUsername}
          style={styles.input}
          theme={{ 
            colors: { 
              primary: theme.colors.primary,
              onSurfaceVariant: '#FFFFFF',
              background: '#1A1A1A',
              surface: '#2A2A2A',
              onSurface: '#FFFFFF',
            }
          }}
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isLoading}
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          labelStyle={styles.buttonText}
        >
          Complete Setup
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 24,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileSetupScreen;