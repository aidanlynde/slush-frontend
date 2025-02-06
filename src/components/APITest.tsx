// src/components/APITest.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export const APITest = () => {
  const [connectionStatus, setConnectionStatus] = useState<string>('Not tested');
  const [loginStatus, setLoginStatus] = useState<string>('Not tested');
  const { login } = useAuth();

  const testAPIConnection = async () => {
    setConnectionStatus('Testing...');
    try {
      const result = await api.testConnection();
      setConnectionStatus(result ? 'Success' : 'Failed');
    } catch (error) {
      setConnectionStatus('Error: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  const testLogin = async () => {
    setLoginStatus('Testing...');
    try {
      const result = await login({
        email: 'test@example.com',
        password: 'password123'
      });
      setLoginStatus('Success: ' + JSON.stringify(result));
    } catch (error) {
      setLoginStatus('Error: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Test Panel</Text>
      
      <View style={styles.testSection}>
        <Text>API Connection: {connectionStatus}</Text>
        <Button mode="contained" onPress={testAPIConnection} style={styles.button}>
          Test Connection
        </Button>
      </View>

      <View style={styles.testSection}>
        <Text>Login Test: {loginStatus}</Text>
        <Button mode="contained" onPress={testLogin} style={styles.button}>
          Test Login
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  testSection: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});