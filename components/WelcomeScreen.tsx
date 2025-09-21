import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TrendingUp, Target, Zap } from 'lucide-react-native';

const brandColors = {
  light: '#f0fdf4',
  medium: '#16a34a',
};

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <TrendingUp color="#fff" size={48} />
        </View>
        
        <Text style={styles.title}>AmazStrategy</Text>
        
        <Text style={styles.subtitle}>
          Your Business. Your Strategy. Powered by AI.
        </Text>
        
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Target color={brandColors.medium} size={20} />
            <Text style={styles.featureText}>Personalized recommendations</Text>
          </View>
          <View style={styles.featureItem}>
            <Zap color={brandColors.medium} size={20} />
            <Text style={styles.featureText}>AI-powered insights</Text>
          </View>
        </View>
        
        <TouchableOpacity onPress={onStart} style={styles.button}>
          <Text style={styles.buttonText}>Start Questionnaire</Text>
        </TouchableOpacity>
        
        <Text style={styles.footerText}>
          Takes about 5-7 minutes to complete
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
    backgroundColor: brandColors.medium,
    borderRadius: 999,
    padding: 16,
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 28,
  },
  featuresContainer: {
    marginBottom: 48,
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 12,
  },
  button: {
    width: '100%',
    backgroundColor: brandColors.medium,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 16,
  },
});
