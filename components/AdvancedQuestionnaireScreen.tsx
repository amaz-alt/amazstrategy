import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { ArrowLeft, ArrowRight, Info, HelpCircle } from 'lucide-react-native';
import { AdvancedQuestion } from '../data/advancedQuestions';
import { ProgressBar } from './ProgressBar';

const brandColors = {
  amber: '#f59e0b',
  amberLight: '#fffbeb',
  amberDark: '#b45309',
};

interface AdvancedQuestionnaireScreenProps {
  question: AdvancedQuestion;
  currentIndex: number;
  totalQuestions: number;
  value: any;
  onAnswer: (value: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  onBack: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export const AdvancedQuestionnaireScreen: React.FC<AdvancedQuestionnaireScreenProps> = ({
  question,
  currentIndex,
  totalQuestions,
  value,
  onAnswer,
  onNext,
  onPrevious,
  onBack,
  canGoNext,
  canGoPrevious
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [showClarification, setShowClarification] = useState(false);

  useEffect(() => {
    setLocalValue(value === undefined ? (question.type === 'multi-select' ? [] : question.type === 'slider' ? question.min : '') : value);
    setShowClarification(false);
  }, [question, value]);

  const handleAnswer = (newValue: any) => {
    setLocalValue(newValue);
    onAnswer(newValue);
  };

  const renderInput = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <View style={styles.optionsContainer}>
            {question.options?.map((option) => (
              <TouchableOpacity key={option} onPress={() => handleAnswer(option)} style={[styles.optionButton, localValue === option && styles.optionButtonSelected]}>
                <Text style={[styles.optionText, localValue === option && styles.optionTextSelected]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      case 'slider':
        const currentValue = localValue || question.min || 0;
        return (
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderValue}>{currentValue}</Text>
            {question.unit && <Text style={styles.sliderUnit}>{question.unit}</Text>}
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={question.min}
              maximumValue={question.max}
              step={question.step}
              value={currentValue}
              onValueChange={handleAnswer}
              minimumTrackTintColor={brandColors.amber}
              maximumTrackTintColor="#d1d5db"
              thumbTintColor={brandColors.amber}
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>{question.min}</Text>
              <Text style={styles.sliderLabelText}>{question.max}</Text>
            </View>
          </View>
        );
      case 'numeric':
        return (
          <View style={styles.numericInputContainer}>
            <TextInput
              value={localValue?.toString() || ''}
              onChangeText={(text) => handleAnswer(text === '' ? '' : Number(text))}
              placeholder={question.placeholder}
              placeholderTextColor="#9ca3af"
              style={styles.numericInput}
              keyboardType="numeric"
            />
            {question.unit && <Text style={styles.numericUnit}>{question.unit}</Text>}
          </View>
        );
      case 'text':
        return (
          <TextInput
            value={localValue || ''}
            onChangeText={handleAnswer}
            placeholder={question.placeholder}
            placeholderTextColor="#9ca3af"
            style={styles.textInput}
            multiline
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerNav}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ArrowLeft size={16} color="#6b7280" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.progressText}>Adv. Plan: {currentIndex + 1} of {totalQuestions}</Text>
        </View>
        <ProgressBar current={currentIndex + 1} total={totalQuestions} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.questionTitle}>{question.title}</Text>
        {renderInput()}
        {question.disclaimer && (
          <View style={styles.disclaimerBox}>
            <Info color={brandColors.amberDark} size={20} style={{ marginRight: 8, marginTop: 2 }} />
            <Text style={styles.disclaimerText}>{question.disclaimer}</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          {canGoPrevious && (
            <TouchableOpacity onPress={onPrevious} style={styles.prevButton}>
              <ArrowLeft size={20} color="#374151" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={onNext}
            disabled={!canGoNext}
            style={[styles.nextButton, !canGoNext && styles.nextButtonDisabled, !canGoPrevious && { flex: 1 }]}
          >
            <Text style={styles.nextButtonText}>{currentIndex === totalQuestions - 1 ? 'Generate Advanced Strategy' : 'Next'}</Text>
            <ArrowRight size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#e5e7eb', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16 },
  headerNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  backButtonText: { fontSize: 14, color: '#6b7280' },
  progressText: { fontSize: 14, color: '#6b7280' },
  scrollContainer: { padding: 24, paddingBottom: 120 },
  questionTitle: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 24 },
  optionsContainer: { gap: 12 },
  optionButton: { padding: 16, borderRadius: 8, borderWidth: 2, borderColor: '#e5e7eb', backgroundColor: '#fff' },
  optionButtonSelected: { borderColor: brandColors.amber, backgroundColor: brandColors.amberLight },
  optionText: { fontSize: 16 },
  optionTextSelected: { color: brandColors.amberDark, fontWeight: '500' },
  sliderContainer: { gap: 16, alignItems: 'center' },
  sliderValue: { fontSize: 30, fontWeight: 'bold', color: brandColors.amber },
  sliderUnit: { color: '#4b5563', marginTop: 4 },
  sliderLabels: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  sliderLabelText: { color: '#6b7280' },
  numericInputContainer: { position: 'relative', justifyContent: 'center' },
  numericInput: { fontSize: 18, padding: 16, borderWidth: 2, borderColor: '#e5e7eb', borderRadius: 8 },
  numericUnit: { position: 'absolute', right: 16, color: '#6b7280' },
  textInput: { height: 128, textAlignVertical: 'top', fontSize: 16, padding: 16, borderWidth: 2, borderColor: '#e5e7eb', borderRadius: 8 },
  disclaimerBox: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: brandColors.amberLight, borderColor: brandColors.amber, borderWidth: 1, borderRadius: 8, padding: 12, marginTop: 16 },
  disclaimerText: { flex: 1, color: brandColors.amberDark },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#e5e7eb', padding: 24, paddingTop: 16 },
  prevButton: { padding: 16, borderRadius: 8, backgroundColor: '#e5e7eb', justifyContent: 'center', alignItems: 'center' },
  nextButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, borderRadius: 8, backgroundColor: brandColors.amber, gap: 8 },
  nextButtonDisabled: { backgroundColor: '#d1d5db' },
  nextButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
