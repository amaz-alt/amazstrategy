import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { ArrowLeft, ArrowRight, Info } from 'lucide-react-native';
import { Question } from '../data/questions';
import { ProgressBar } from './ProgressBar';
import { QuestionnaireData } from '../types';

const brandColors = {
  light: '#f0fdf4',
  medium: '#16a34a',
  dark: '#15803d',
  darkest: '#14532d',
};

interface QuestionScreenProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  value: any;
  answers: Partial<QuestionnaireData>;
  onAnswer: (value: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  currentIndex,
  totalQuestions,
  value,
  answers,
  onAnswer,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value || (question.type === 'multi-select' ? [] : question.type === 'slider' ? question.min : ''));
  }, [question, value]);

  const handleAnswer = (newValue: any) => {
    setLocalValue(newValue);
    onAnswer(newValue);
  };

  const getCurrencyInfo = () => {
    const currencies: { [key: string]: { symbol: string; rate: number } } = {
      'United States': { symbol: '$', rate: 1 },
      'United Kingdom': { symbol: '£', rate: 0.82 },
      'Canada': { symbol: 'C$', rate: 1.37 },
      'Australia': { symbol: 'A$', rate: 1.51 },
      'Germany': { symbol: '€', rate: 0.93 },
      'France': { symbol: '€', rate: 0.93 },
      'Netherlands': { symbol: '€', rate: 0.93 },
      'India': { symbol: '₹', rate: 83.5 },
      'Singapore': { symbol: 'S$', rate: 1.35 },
      'United Arab Emirates': { symbol: 'AED', rate: 3.67 },
      'South Africa': { symbol: 'R', rate: 18.25 },
      'Brazil': { symbol: 'R$', rate: 5.15 },
      'Mexico': { symbol: 'MX$', rate: 17.1 },
      'Other': { symbol: '$', rate: 1 }
    };
    return currencies;
  };

  const formatCurrency = (amount: number) => {
    if (question.id === 'monthlyBudget') {
      const currencies = getCurrencyInfo();
      const selectedCountry = answers.country as string;
      const currencyInfo = (selectedCountry && currencies[selectedCountry])
        ? currencies[selectedCountry]
        : { symbol: '$', rate: 1 };

      const convertedAmount = Math.round(amount * currencyInfo.rate);
      return `${currencyInfo.symbol}${convertedAmount.toLocaleString()}`;
    }
    return `${amount} ${question.unit}`;
  };
  
  const filterOptionsBasedOnCountry = (options: string[]) => {
    if (question.id === 'currentPlatforms' || question.id === 'contentTypes') {
      const selectedCountry = answers.country as string;
      if (selectedCountry === 'India' && question.id === 'currentPlatforms') {
        return options.filter(option => option !== 'TikTok');
      }
    }
    return options;
  };

  const renderInput = () => {
    switch (question.type) {
      case 'multiple-choice':
        const filteredOptions = filterOptionsBasedOnCountry(question.options || []);
        return (
          <View style={styles.optionsContainer}>
            {filteredOptions.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => handleAnswer(option)}
                style={[styles.optionButton, localValue === option && styles.optionButtonSelected]}
              >
                <Text style={[styles.optionText, localValue === option && styles.optionTextSelected]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'multi-select':
        const filteredMultiOptions = filterOptionsBasedOnCountry(question.options || []);
        return (
          <View style={styles.optionsContainer}>
            {filteredMultiOptions.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => {
                  const newValue = Array.isArray(localValue) ? [...localValue] : [];
                  if (newValue.includes(option)) {
                    handleAnswer(newValue.filter(item => item !== option));
                  } else {
                    handleAnswer([...newValue, option]);
                  }
                }}
                style={[styles.optionButton, Array.isArray(localValue) && localValue.includes(option) && styles.optionButtonSelected]}
              >
                <Text style={[styles.optionText, Array.isArray(localValue) && localValue.includes(option) && styles.optionTextSelected]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'slider':
        const currentValue = localValue || question.min || 0;
        return (
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderValue}>{formatCurrency(currentValue)}</Text>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={question.min}
              maximumValue={question.max}
              step={question.step}
              value={currentValue}
              onValueChange={(val) => handleAnswer(val)}
              minimumTrackTintColor={brandColors.medium}
              maximumTrackTintColor="#d1d5db"
              thumbTintColor={brandColors.medium}
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>{formatCurrency(question.min || 0)}</Text>
              <Text style={styles.sliderLabelText}>{formatCurrency(question.max || 100)}</Text>
            </View>
          </View>
        );

      case 'text':
        return (
          <View>
            <TextInput
              value={localValue || ''}
              onChangeText={handleAnswer}
              placeholder={question.placeholder}
              placeholderTextColor="#9ca3af"
              style={styles.textInput}
              multiline
            />
            {question.disclaimer && (
              <View style={styles.disclaimerBox}>
                <Info color={brandColors.medium} size={20} style={{ marginRight: 8, marginTop: 2 }} />
                <Text style={styles.disclaimerText}>{question.disclaimer}</Text>
              </View>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ProgressBar current={currentIndex + 1} total={totalQuestions} />
        <View style={styles.headerNav}>
          <Text style={styles.progressText}>
            Question {currentIndex + 1} of {totalQuestions}
          </Text>
          {canGoPrevious && (
            <TouchableOpacity onPress={onPrevious} style={styles.backButton}>
              <ArrowLeft color="#4b5563" size={16} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.questionTitle}>{question.title}</Text>
        {renderInput()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={onNext}
          disabled={!canGoNext}
          style={[styles.nextButton, !canGoNext && styles.nextButtonDisabled]}
        >
          <Text style={styles.nextButtonText}>
            {currentIndex === totalQuestions - 1 ? 'Generate Strategy' : 'Next'}
          </Text>
          <ArrowRight color="#fff" size={20} style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#e5e7eb', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16 },
  headerNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  progressText: { fontSize: 14, color: '#6b7280' },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backButtonText: { color: '#4b5563', marginLeft: 4 },
  scrollContainer: { padding: 24, paddingBottom: 120 },
  questionTitle: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 32 },
  optionsContainer: { gap: 12 },
  optionButton: { width: '100%', padding: 16, borderRadius: 8, borderWidth: 2, borderColor: '#e5e7eb', backgroundColor: '#fff' },
  optionButtonSelected: { borderColor: brandColors.medium, backgroundColor: brandColors.light },
  optionText: { fontSize: 16, color: '#111827' },
  optionTextSelected: { color: brandColors.darkest, fontWeight: '500' },
  sliderContainer: { gap: 24 },
  sliderValue: { textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: brandColors.medium },
  sliderLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  sliderLabelText: { fontSize: 12, color: '#6b7280' },
  textInput: { width: '100%', padding: 16, borderWidth: 2, borderColor: '#e5e7eb', borderRadius: 8, textAlignVertical: 'top', height: 128, fontSize: 16 },
  disclaimerBox: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: brandColors.light, borderColor: '#a7f3d0', borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 16 },
  disclaimerText: { fontSize: 14, color: brandColors.darkest, flex: 1 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#e5e7eb', padding: 24, paddingTop: 16 },
  nextButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, borderRadius: 8, backgroundColor: brandColors.medium },
  nextButtonDisabled: { backgroundColor: '#d1d5db' },
  nextButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
