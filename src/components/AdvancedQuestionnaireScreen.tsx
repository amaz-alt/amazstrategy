import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Info, HelpCircle } from 'lucide-react';
import { AdvancedQuestion } from '../data/advancedQuestions';
import { ProgressBar } from './ProgressBar';

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
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  localValue === option
                    ? 'border-amber-500 bg-amber-50 text-amber-900'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>
        );

      case 'multi-select':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const newValue = Array.isArray(localValue) ? [...localValue] : [];
                  if (newValue.includes(option)) {
                    handleAnswer(newValue.filter(item => item !== option));
                  } else {
                    handleAnswer([...newValue, option]);
                  }
                }}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  Array.isArray(localValue) && localValue.includes(option)
                    ? 'border-amber-500 bg-amber-50 text-amber-900'
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
              <span className="text-3xl font-bold text-amber-600">
                {currentValue}
              </span>
              {question.unit && <p className="text-gray-600 text-sm mt-1">{question.unit}</p>}
            </div>
            <input
              type="range"
              min={question.min}
              max={question.max}
              step={question.step}
              value={currentValue}
              onChange={(e) => handleAnswer(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${sliderProgress}%, #e5e7eb ${sliderProgress}%, #e5e7eb 100%)`
              }}
            />
             <div className="flex justify-between text-xs text-gray-500">
              <span>{question.min}</span>
              <span>{question.max}</span>
            </div>
          </div>
        );

      case 'numeric':
        return (
            <div className="relative">
                <input
                    type="number"
                    value={localValue || ''}
                    onChange={(e) => handleAnswer(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder={question.placeholder}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none text-lg"
                />
                {question.unit && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">{question.unit}</span>}
            </div>
        );

      case 'text':
        return (
          <textarea
            value={localValue || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={question.placeholder}
            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none resize-none h-32"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-800 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Basic Strategy
          </button>
          <span className="text-sm text-gray-500">
            Advanced Plan: Question {currentIndex + 1} of {totalQuestions}
          </span>
        </div>
        <ProgressBar current={currentIndex + 1} total={totalQuestions} />
      </div>

      <div className="flex-1 px-6 py-8">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {question.title}
          </h2>
          
          {renderInput()}

          {question.disclaimer && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-900">{question.disclaimer}</p>
              </div>
            </div>
          )}

          {question.clarification && (
            <div className="mt-4">
              <button onClick={() => setShowClarification(!showClarification)} className="text-sm text-gray-500 hover:text-gray-800 flex items-center">
                <HelpCircle className="w-4 h-4 mr-1" /> Not sure - help me
              </button>
              {showClarification && (
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="mt-2 p-3 bg-gray-100 rounded-lg">
                  <p className="text-sm font-semibold">{question.clarification.question}</p>
                  <div className="flex space-x-2 mt-2">
                    {question.clarification.options.map(opt => (
                      <button key={opt} onClick={() => { handleAnswer(opt); setShowClarification(false); }} className="text-xs bg-white border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-200">{opt}</button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </div>

      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center space-x-4">
          {canGoPrevious && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPrevious}
              className="flex items-center justify-center p-4 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            disabled={!canGoNext}
            className={`w-full flex items-center justify-center py-4 px-6 rounded-lg font-semibold transition-all ${
              canGoNext
                ? 'bg-amber-500 text-white hover:bg-amber-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentIndex === totalQuestions - 1 ? 'Generate Advanced Strategy' : 'Next'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
