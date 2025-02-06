// src/screens/app/HomeScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useTheme } from '../../hooks/useTheme';
import { useAuthContext } from '../../providers/AuthProvider';  // Update this import

const HomeScreen = () => {
  const { logout } = useAuthContext();  // Use AuthContext instead of useAuth
  const theme = useTheme();

  const handleLogout = async () => {
    try {
      console.log('Attempting to logout...');
      await logout();
      console.log('Logout successful');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={{ color: theme.textColor, fontSize: 24, marginBottom: 20 }}>
        Welcome to Slush!
      </Text>
      <Button 
        mode="contained" 
        onPress={handleLogout}
        style={styles.button}
        theme={{ colors: { primary: theme.colors.primary } }}
      >
        Sign Out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    width: '100%',
    marginTop: 20,
  },
});

export default HomeScreen;