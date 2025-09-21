import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LeadCaptureScreen } from './components/LeadCaptureScreen';
import { DisclaimerScreen } from './components/DisclaimerScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { ProcessingScreen } from './components/ProcessingScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { AdvancedQuestionnaireScreen } from './components/AdvancedQuestionnaireScreen';
import { AdvancedStrategyScreen } from './components/AdvancedStrategyScreen';
import { questions } from './data/questions';
import { advancedQuestions } from './data/advancedQuestions';
import { QuestionnaireData, StrategyResult, AdvancedStrategyResult, AdvancedQuestionnaireData } from './types';
import { generateStrategy } from './utils/strategyGenerator';
import { generateAdvancedStrategy } from './utils/advancedStrategyGenerator';
import { generatePDF, generateAdvancedPDF } from './utils/pdfGenerator';

type AppState = 'welcome' | 'leadCapture' | 'disclaimer' | 'questionnaire' | 'processing' | 'results' | 'advancedQuestionnaire' | 'advancedStrategy';

function App() {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuestionnaireData>>({});
  const [strategy, setStrategy] = useState<StrategyResult | null>(null);
  
  const [advancedQuestionIndex, setAdvancedQuestionIndex] = useState(0);
  const [advancedAnswers, setAdvancedAnswers] = useState<Partial<AdvancedQuestionnaireData>>({});
  const [advancedStrategy, setAdvancedStrategy] = useState<AdvancedStrategyResult | null>(null);
  
  const [isPaying, setIsPaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStart = () => setAppState('leadCapture');

  const handleLeadCaptureSubmit = (leadData: { name: string; email: string; businessName: string; websiteOrSocial: string; }) => {
    setAnswers(prev => ({ ...prev, ...leadData }));
    setAppState('disclaimer');
  };

  const handleDisclaimerContinue = () => setAppState('questionnaire');

  const handleAnswer = (value: any) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestionIndex].id]: value }));
  };

  const handleAdvancedAnswer = (value: any) => {
    setAdvancedAnswers(prev => ({ ...prev, [advancedQuestions[advancedQuestionIndex].id]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setIsProcessing(true);
      setAppState('processing');
      setTimeout(() => {
        const generatedStrategy = generateStrategy(answers as QuestionnaireData);
        setStrategy(generatedStrategy);
        setIsProcessing(false);
        setAppState('results');
      }, 3000);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(prev => prev - 1);
  };

  const handleAdvancedNext = () => {
    if (advancedQuestionIndex === advancedQuestions.length - 1) {
      setIsProcessing(true);
      setAppState('processing');
      setTimeout(() => {
        const finalAdvancedStrategy = generateAdvancedStrategy(answers as QuestionnaireData, advancedAnswers as AdvancedQuestionnaireData);
        setAdvancedStrategy(finalAdvancedStrategy);
        setIsProcessing(false);
        setAppState('advancedStrategy');
      }, 3000);
    } else {
      setAdvancedQuestionIndex(prev => prev + 1);
    }
  };

  const handleAdvancedPrevious = () => {
    if (advancedQuestionIndex > 0) setAdvancedQuestionIndex(prev => prev - 1);
  };

  const handleDownloadPDF = () => {
    if (strategy) generatePDF(strategy);
  };
  
  const handleDownloadAdvancedPDF = () => {
    if (advancedStrategy) generateAdvancedPDF(advancedStrategy);
  };

  const handleGetAdvancedStrategy = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setAppState('advancedQuestionnaire');
    }, 2000);
  };

  const handleBackToResults = () => setAppState('results');

  const handleStartOver = () => {
    setAppState('welcome');
    setCurrentQuestionIndex(0);
    setAdvancedQuestionIndex(0);
    setAnswers({});
    setAdvancedAnswers({});
    setStrategy(null);
    setAdvancedStrategy(null);
  };

  const canGoNext = () => {
    const q = questions[currentQuestionIndex];
    const a = answers[q.id];
    if (q.type === 'text') return a && (a as string).trim().length > 0;
    if (q.type === 'multi-select') return Array.isArray(a) && a.length > 0;
    return a !== undefined && a !== null && a !== '';
  };
  
  const canGoAdvancedNext = () => {
    const q = advancedQuestions[advancedQuestionIndex];
    const a = advancedAnswers[q.id];
    if (q.type === 'text') return a && (a as string).trim().length > 0;
    if (q.type === 'multi-select') return Array.isArray(a) && a.length > 0;
    return a !== undefined && a !== null && a !== '';
  };

  if (appState === 'welcome') return <WelcomeScreen onStart={handleStart} />;
  if (appState === 'leadCapture') return <LeadCaptureScreen onSubmit={handleLeadCaptureSubmit} />;
  if (appState === 'disclaimer') return <DisclaimerScreen onContinue={handleDisclaimerContinue} />;
  
  if (appState === 'questionnaire') {
    return (
      <QuestionScreen
        question={questions[currentQuestionIndex]}
        currentIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        value={answers[questions[currentQuestionIndex].id]}
        answers={answers}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        canGoNext={canGoNext()}
        canGoPrevious={currentQuestionIndex > 0}
      />
    );
  }
  
  if (appState === 'processing') return <ProcessingScreen />;

  if (appState === 'results' && strategy) {
    return (
      <ResultsScreen
        strategy={strategy}
        onDownloadPDF={handleDownloadPDF}
        onGetAdvancedStrategy={handleGetAdvancedStrategy}
        onStartOver={handleStartOver}
        isPaying={isPaying}
      />
    );
  }

  if (appState === 'advancedQuestionnaire') {
    return (
      <AdvancedQuestionnaireScreen
        question={advancedQuestions[advancedQuestionIndex]}
        currentIndex={advancedQuestionIndex}
        totalQuestions={advancedQuestions.length}
        value={advancedAnswers[advancedQuestions[advancedQuestionIndex].id]}
        onAnswer={handleAdvancedAnswer}
        onNext={handleAdvancedNext}
        onPrevious={handleAdvancedPrevious}
        onBack={handleBackToResults}
        canGoNext={canGoAdvancedNext()}
        canGoPrevious={advancedQuestionIndex > 0}
      />
    );
  }

  if (appState === 'advancedStrategy' && advancedStrategy) {
    return (
      <AdvancedStrategyScreen
        strategy={advancedStrategy}
        onBack={handleBackToResults}
        onDownloadPDF={handleDownloadAdvancedPDF}
      />
    );
  }

  return null;
}

export default App;
