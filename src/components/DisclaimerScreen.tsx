import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Target } from 'lucide-react';

interface DisclaimerScreenProps {
  onContinue: () => void;
}

export const DisclaimerScreen: React.FC<DisclaimerScreenProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light to-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-lg mx-auto"
      >
        <div className="flex justify-center mb-8">
          <div className="bg-brand-medium rounded-full p-4">
            <AlertCircle className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          One Quick Thing...
        </h1>
        
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          For the best results, be specific about your audience, goals, and challenges. 
          <br />
          The more detail you provide, the more personalized your AI-powered strategy will be.
        </p>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 inline-flex items-center justify-center">
          <Target className="w-5 h-5 text-amber-800 mr-2" />
          <span className="font-medium text-amber-800">Estimated Time: 5-7 minutes</span>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="w-full bg-brand-medium text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-lg hover:bg-brand-dark transition-colors"
        >
          I'm Ready - Start Questionnaire
        </motion.button>
        
        <p className="text-sm text-gray-500 mt-4">
          Let's build your winning strategy!
        </p>
      </motion.div>
    </div>
  );
};
