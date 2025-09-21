import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Zap } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light to-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md mx-auto"
      >
        <div className="flex justify-center mb-8">
          <div className="bg-brand-medium rounded-full p-4">
            <TrendingUp className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AmazStrategy
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Your Business. Your Strategy. Powered by AI.
        </p>
        
        <div className="grid grid-cols-1 gap-4 mb-12">
          <div className="flex items-center justify-center space-x-3 text-gray-700">
            <Target className="w-5 h-5 text-brand-medium" />
            <span className="text-sm">Personalized recommendations</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-gray-700">
            <Zap className="w-5 h-5 text-brand-medium" />
            <span className="text-sm">AI-powered insights</span>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="w-full bg-brand-medium text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-lg hover:bg-brand-dark transition-colors"
        >
          Start Questionnaire
        </motion.button>
        
        <p className="text-sm text-gray-500 mt-4">
          Takes about 5-7 minutes to complete
        </p>
      </motion.div>
    </div>
  );
};
