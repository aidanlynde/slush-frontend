// src/hooks/useAuth.ts
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';
import type { UserResponse, CreateUserRequest, LoginRequest } from '../types/api';

const TOKEN_KEY = '@slush/token';
const USER_KEY = '@slush/user';

export const useAuth = () => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStoredAuth = useCallback(async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        AsyncStorage.getItem(TOKEN_KEY),
        AsyncStorage.getItem(USER_KEY),
      ]);

      if (storedToken && storedUser) {
        api.setAccessToken(storedToken);
        setUser(JSON.parse(storedUser));
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
      ]);

      setUser(newUser);
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
      // For now, we'll create a basic user object
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
      ]);

      setUser(userObj);
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
      ]);
      api.clearAccessToken();
      setUser(null);
    } catch (err) {
      console.error('Error during logout:', err);
    }
  }, []);

  return {
    user,
    isLoading,
    error,
    signup,
    login,
    logout,
    loadStoredAuth,
  };
};