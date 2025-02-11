// src/screens/SplashScreen.tsx
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Text } from 'react-native-paper';
import { useTheme } from '../hooks/useTheme';
import Svg, { Circle } from 'react-native-svg';

const SplashScreen = () => {
  const theme = useTheme();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Rotating loading circle */}
        <Animated.View style={[
          styles.loadingContainer,
          { transform: [{ rotate: spin }] }
        ]}>
          <Svg height="120" width="120" viewBox="0 0 100 100">
            <Circle
              cx="50"
              cy="50"
              r="45"
              stroke={theme.colors.primary}
              strokeWidth="2"
              fill="transparent"
              strokeDasharray="70 180"
            />
          </Svg>
        </Animated.View>

        {/* Centered logo */}
        <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
          <Text style={[styles.logo, { color: theme.colors.primary }]}>S$</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    width: 120,
    height: 120,
  },
  logoContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
  },
});

export default SplashScreen;