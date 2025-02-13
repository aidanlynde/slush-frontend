// src/hooks/useAuth.ts
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';
import type { UserResponse, CreateUserRequest, LoginRequest } from '../types/api';

const TOKEN_KEY = '@slush/token';
const USER_KEY = '@slush/user';
const PROFILE_SETUP_KEY = '@slush/needs_profile_setup'; // Add this

export const useAuth = () => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [needsProfileSetup, setNeedsProfileSetup] = useState(false); // Add this
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStoredAuth = useCallback(async () => {
    try {
      const [storedToken, storedUser, storedNeedsSetup] = await Promise.all([
        AsyncStorage.getItem(TOKEN_KEY),
        AsyncStorage.getItem(USER_KEY),
        AsyncStorage.getItem(PROFILE_SETUP_KEY),
      ]);

      if (storedToken && storedUser) {
        api.setAccessToken(storedToken);
        setUser(JSON.parse(storedUser));
        setNeedsProfileSetup(storedNeedsSetup === 'true');
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error loading stored auth:', err);
      return false;
    }
  }, []);

  const signup = useCallback(async (data: CreateUserRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const newUser = await api.createUser(data);
      const loginResponse = await api.login({
        email: data.email,
        password: data.password,
      });

      await Promise.all([
        AsyncStorage.setItem(TOKEN_KEY, loginResponse.access_token),
        AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser)),
        AsyncStorage.setItem(PROFILE_SETUP_KEY, 'true'), // Add this
      ]);

      setUser(newUser);
      setNeedsProfileSetup(true); // Add this
      return newUser;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (data: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const loginResponse = await api.login(data);
      const userObj = {
        id: 1,
        email: data.email,
        username: data.email.split('@')[0],
        is_active: true,
        created_at: new Date().toISOString(),
      };

      await Promise.all([
        AsyncStorage.setItem(TOKEN_KEY, loginResponse.access_token),
        AsyncStorage.setItem(USER_KEY, JSON.stringify(userObj)),
        AsyncStorage.setItem(PROFILE_SETUP_KEY, 'false'), // Add this - existing users don't need setup
      ]);

      setUser(userObj);
      setNeedsProfileSetup(false); // Add this
      return loginResponse;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(TOKEN_KEY),
        AsyncStorage.removeItem(USER_KEY),
        AsyncStorage.removeItem(PROFILE_SETUP_KEY), // Add this
      ]);
      api.clearAccessToken();
      setUser(null);
      setNeedsProfileSetup(false); // Add this
    } catch (err) {
      console.error('Error during logout:', err);
    }
  }, []);

  // Add this new function
  const completeProfileSetup = useCallback(async () => {
    try {
      await AsyncStorage.setItem(PROFILE_SETUP_KEY, 'false');
      setNeedsProfileSetup(false);
    } catch (err) {
      console.error('Error completing profile setup:', err);
    }
  }, []);

  return {
    user,
    needsProfileSetup, // Add this
    isLoading,
    error,
    signup,
    login,
    logout,
    loadStoredAuth,
    completeProfileSetup, // Add this
  };
};