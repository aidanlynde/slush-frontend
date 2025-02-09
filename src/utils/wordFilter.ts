// src/utils/wordFilter.ts
// src/utils/wordFilter.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const normalizeText = (text: string): string => {
  let normalized = text.toLowerCase();
  
  Object.entries(SUBSTITUTIONS).forEach(([letter, substitutions]) => {
    substitutions.forEach(sub => {
      normalized = normalized.replace(new RegExp(sub, 'g'), letter);
    });
  });
  
  normalized = normalized.replace(/[^a-z0-9]/g, '');
  
  return normalized;
};

export const containsOffensiveContent = (text: string): boolean => {
  const normalized = normalizeText(text);
  const commonOffensiveWords = new Set(['nigger', 'nigga', 'negro', 'niger']);
  BLOCKED_WORDS = new Set([...BLOCKED_WORDS, ...commonOffensiveWords]);
  
  if (BLOCKED_WORDS.has(normalized) || commonOffensiveWords.has(normalized)) {
    return true;
  }
  
  for (const word of [...BLOCKED_WORDS, ...commonOffensiveWords]) {
    if (normalized.includes(word)) {
      return true;
    }
  }
  
  return false;
};

export const validateUsername = (username: string): string | null => {
  if (!username) return 'Username is required';
  if (username.length < 3) return 'Username must be at least 3 characters';
  if (username.length > 20) return 'Username must be less than 20 characters';
  
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return 'Username can only contain letters, numbers, and underscores';
  }

  if (containsOffensiveContent(username)) {
    return 'Username contains inappropriate content';
  }
  
  return null;
};

export const initializeWordFilter = async () => {
  try {
    const basicOffensiveWords = new Set(['nigger', 'nigga', 'negro', 'niger']);
    BLOCKED_WORDS = new Set([...BLOCKED_WORDS, ...basicOffensiveWords]);
    
    const storedWords = await AsyncStorage.getItem('blocked_words');
    if (storedWords) {
      const parsedWords = JSON.parse(storedWords);
      BLOCKED_WORDS = new Set([...BLOCKED_WORDS, ...parsedWords]);
    }
  } catch (error) {
    console.error('Error initializing word filter:', error);
  }
};