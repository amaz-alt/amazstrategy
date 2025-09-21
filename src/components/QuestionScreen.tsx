import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { Question } from '../data/questions';
import { ProgressBar } from './ProgressBar';
import { QuestionnaireData } from '../types';

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
        : { symbol: '$', rate: 1 }; // Default to USD

      const convertedAmount = Math.round(amount * currencyInfo.rate);
      return `${currencyInfo.symbol}${convertedAmount.toLocaleString()}`;
    }
    return `${amount} ${question.unit}`;
  };

  const filterOptionsBasedOnCountry = (options: string[]) => {
    if (question.id === 'currentPlatforms' || question.id === 'contentTypes') {
      const selectedCountry = answers.country as string;
      
      // Remove TikTok if banned in selected country
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
          <div className="space-y-3">
            {filteredOptions.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  localValue === option
                    ? 'border-brand-medium bg-brand-light text-brand-darkest'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>
        );

      case 'multi-select':
        const filteredMultiOptions = filterOptionsBasedOnCountry(question.options || []);
        return (
          <div className="space-y-3">
            {filteredMultiOptions.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const newValue = Array.isArray(localValue) ? [...localValue] : [];
                  if (newValue.includes(option)) {
                    const filtered = newValue.filter(item => item !== option);
                    handleAnswer(filtered);
                  } else {
                    handleAnswer([...newValue, option]);
                  }
                }}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  Array.isArray(localValue) && localValue.includes(option)
                    ? 'border-brand-medium bg-brand-light text-brand-darkest'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>
        );

      case 'slider':
        const currentValue = localValue || question.min || 0;
        const sliderProgress = ((currentValue - (question.min || 0)) / ((question.max || 100) - (question.min || 0))) * 100;
        
        return (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-3xl font-bold text-brand-medium">
                {formatCurrency(currentValue)}
              </span>
            </div>
            <input
              type="range"
              min={question.min}
              max={question.max}
              step={question.step}
              value={currentValue}
              onChange={(e) => handleAnswer(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #16a34a 0%, #16a34a ${sliderProgress}%, #e5e7eb ${sliderProgress}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{formatCurrency(question.min || 0)}</span>
              <span>{formatCurrency(question.max || 100)}</span>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <textarea
              value={localValue || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder={question.placeholder}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-brand-medium focus:outline-none resize-none h-32"
            />
            {question.disclaimer && (
              <div className="bg-brand-light border border-green-200 rounded-lg p-3">
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-brand-medium mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-brand-darkest">{question.disclaimer}</p>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <ProgressBar current={currentIndex + 1} total={totalQuestions} />
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          {canGoPrevious && (
            <button
              onClick={onPrevious}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 px-6 py-8">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {question.title}
          </h2>
          
          {renderInput()}
        </motion.div>
      </div>

      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            disabled={!canGoNext}
            className={`w-full flex items-center justify-center py-4 px-6 rounded-lg font-semibold transition-all ${
              canGoNext
                ? 'bg-brand-medium text-white hover:bg-brand-dark'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentIndex === totalQuestions - 1 ? 'Generate Strategy' : 'Next'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
