import React from 'react';
import { Button as PaperButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface ButtonProps {
  mode?: 'text' | 'outlined' | 'contained';
  onPress: () => void;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  style?: object;
}

export const Button: React.FC<ButtonProps> = ({
  mode = 'contained',
  onPress,
  children,
  loading = false,
  disabled = false,
  style,
}) => {
  const theme = useTheme();
  
  const styles = StyleSheet.create({
    button: {
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.sm,
    },
  });

  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      style={[styles.button, style]}
    >
      {children}
    </PaperButton>
  );
};