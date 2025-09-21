import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Target } from 'lucide-react';

export const ProcessingScreen: React.FC = () => {
  const icons = [Brain, Zap, Target];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light to-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto"
      >
        <div className="flex justify-center mb-8">
          {icons.map((Icon, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: [0, 1, 0],
                y: [20, 0, -20]
              }}
              transition={{
                duration: 1.5,
                delay: index * 0.2,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="bg-brand-medium rounded-full p-3 mx-2"
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
          ))}
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Generating Your Strategy...
        </h2>
        
        <p className="text-lg text-gray-600 mb-8">
          Our AI is analyzing your responses and creating a personalized social media strategy just for you.
        </p>
        
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-brand-medium border-t-transparent rounded-full mx-auto"
        />
        
        <p className="text-sm text-gray-500 mt-6">
          This will take just a few moments...
        </p>
      </motion.div>
    </div>
  );
};
