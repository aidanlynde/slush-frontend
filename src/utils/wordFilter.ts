// src/utils/wordFilter.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { blockedWords } from './blockedWords';

let BLOCKED_WORDS = new Set<string>();

const SUBSTITUTIONS: { [key: string]: string[] } = {
  'a': ['@', '4'],
  'i': ['1', '!'],
  'o': ['0'],
  'e': ['3'],
  's': ['$', '5'],
  'l': ['1'],
  't': ['7'],
};

const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const normalizeText = (text: string): string => {
  try {
    let normalized = text.toLowerCase();
    
    // Safely replace substitutions
    Object.entries(SUBSTITUTIONS).forEach(([letter, substitutions]) => {
      substitutions.forEach(sub => {
        const safePattern = escapeRegExp(sub);
        normalized = normalized.replace(new RegExp(safePattern, 'g'), letter);
      });
    });

    // Safely remove repeating characters
    normalized = normalized.replace(/(.)\1+/g, '$1');
    
    return normalized;
  } catch (error) {
    console.error('Error in normalizeText:', error);
    return text.toLowerCase(); // Fallback to simple lowercase
  }
};

export const containsOffensiveContent = (text: string): boolean => {
  try {
    if (BLOCKED_WORDS.size === 0) {
      console.warn('Word filter not initialized');
      return false;
    }

    const normalized = normalizeText(text);
    
    // Check for exact matches
    if (BLOCKED_WORDS.has(normalized)) {
      return true;
    }
    
    // Check for words contained within the text
    for (const word of BLOCKED_WORDS) {
      if (normalized.includes(word)) {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error in containsOffensiveContent:', error);
    return false; // Fail safe
  }
};

export const validateUsername = (username: string): string | null => {
  try {
    if (!username) return 'Username is required';
    if (username.length < 3) return 'Username must be at least 3 characters';
    if (username.length > 20) return 'Username must be less than 20 characters';
    
    // Only allow letters, numbers, and underscores
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      return 'Username can only contain letters, numbers, and underscores';
    }

    // Check for offensive content
    if (containsOffensiveContent(username)) {
      return 'Username contains inappropriate content';
    }
    
    return null;
  } catch (error) {
    console.error('Error in validateUsername:', error);
    return 'Error validating username';
  }
};

export const initializeWordFilter = async () => {
  try {
    // Try to load from AsyncStorage first
    const storedWords = await AsyncStorage.getItem('blocked_words');
    if (storedWords) {
      BLOCKED_WORDS = new Set(JSON.parse(storedWords));
      console.log('Loaded blocked words from AsyncStorage');
      return;
    }

    // If not in storage, initialize from our static list
    const words = blockedWords
      .split('\n')
      .map(word => word.trim().toLowerCase())
      .filter(word => word && word.length > 0); // Remove empty lines and zero-length strings

    BLOCKED_WORDS = new Set(words);

    // Save to AsyncStorage for future use
    await AsyncStorage.setItem('blocked_words', JSON.stringify([...BLOCKED_WORDS]));
    console.log('Initialized word filter with', BLOCKED_WORDS.size, 'words');
  } catch (error) {
    console.error('Error initializing word filter:', error);
    BLOCKED_WORDS = new Set();
  }
};