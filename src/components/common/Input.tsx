import React from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  label: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: object;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  label,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  style,
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    input: {
      backgroundColor: theme.colors.surface.light,
      marginBottom: theme.spacing.sm,
    },
  });

  return (
    <TextInput
      mode="outlined"
      value={value}
      onChangeText={onChangeText}
      label={label}
      error={!!error}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      style={[styles.input, style]}
    />
  );
};
