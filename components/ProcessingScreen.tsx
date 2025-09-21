import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Brain, Zap, Target } from 'lucide-react-native';

const brandColors = {
  light: '#f0fdf4',
  medium: '#16a34a',
};

export const ProcessingScreen: React.FC = () => {
  const rotation = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {/* Note: Complex animations like the original are simplified for React Native's Animated API */}
          <Brain color={brandColors.medium} size={40} />
        </View>
        
        <Text style={styles.title}>Generating Your Strategy...</Text>
        
        <Text style={styles.subtitle}>
          Our AI is analyzing your responses and creating a personalized social media strategy just for you.
        </Text>
        
        <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]} />
        
        <Text style={styles.footerText}>
          This will take just a few moments...
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.light,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 28,
  },
  spinner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: brandColors.medium,
    borderTopColor: 'transparent',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 24,
  },
});
