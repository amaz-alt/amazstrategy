import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const brandColors = {
  medium: '#16a34a',
};

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;
  const widthAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: percentage,
      duration: 300,
      useNativeDriver: false, // width animation not supported by native driver
    }).start();
  }, [percentage]);

  const width = widthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progress, { width }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: brandColors.medium,
    borderRadius: 4,
  },
});
