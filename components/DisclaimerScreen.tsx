import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AlertCircle, Target } from 'lucide-react-native';

const brandColors = {
  light: '#f0fdf4',
  medium: '#16a34a',
  amber: '#f59e0b',
  amberLight: '#fffbeb',
  amberDark: '#b45309',
};

interface DisclaimerScreenProps {
  onContinue: () => void;
}

export const DisclaimerScreen: React.FC<DisclaimerScreenProps> = ({ onContinue }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <AlertCircle color="#fff" size={48} />
        </View>
        
        <Text style={styles.title}>One Quick Thing...</Text>
        
        <Text style={styles.description}>
          For the best results, be specific about your audience, goals, and challenges. The more detail you provide, the more personalized your AI-powered strategy will be.
        </Text>
        
        <View style={styles.infoBox}>
          <Target color={brandColors.amberDark} size={20} />
          <Text style={styles.infoText}>Estimated Time: 5-7 minutes</Text>
        </View>
        
        <TouchableOpacity onPress={onContinue} style={styles.button}>
          <Text style={styles.buttonText}>I'm Ready - Start Questionnaire</Text>
        </TouchableOpacity>
        
        <Text style={styles.footerText}>Let's build your winning strategy!</Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 24,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 32,
  },
  infoBox: {
    backgroundColor: brandColors.amberLight,
    borderColor: brandColors.amber,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  infoText: {
    color: brandColors.amberDark,
    fontWeight: '500',
    marginLeft: 8,
  },
  button: {
    width: '100%',
    backgroundColor: brandColors.medium,
    paddingVertical: 16,
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
