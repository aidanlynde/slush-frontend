// src/components/common/Card.tsx
import React from 'react';
import { View } from 'react-native';

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <View>{children}</View>;
};