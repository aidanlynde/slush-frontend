// src/utils/haptics.ts
import * as Haptics from 'expo-haptics';

export const haptic = {
  // Light feedback for basic interactions
  light: async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      // Silently fail if haptics not available
    }
  },

  // Medium feedback for more significant actions
  medium: async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      // Silently fail if haptics not available
    }
  },

  // Success feedback (e.g., successful login)
  success: async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      // Silently fail if haptics not available
    }
  },

  // Error feedback (e.g., form validation errors)
  error: async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } catch (error) {
      // Silently fail if haptics not available
    }
  },
};