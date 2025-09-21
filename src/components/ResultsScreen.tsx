import React from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Target, 
  Settings,
  DollarSign,
  Clock,
  BarChart3,
  AlertCircle,
  RefreshCw,
  Edit3,
  Speaker,
  CalendarDays,
  Gift,
  Goal,
  Instagram,
  Star
} from 'lucide-react';
import { StrategyResult } from '../types';

interface ResultsScreenProps {
  strategy: StrategyResult;
  onDownloadPDF: () => void;
  onGetAdvancedStrategy: () => void;
  onStartOver: () => void;
  isPaying: boolean;
}

const ResultCard: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode; delay: number }> = ({ title, icon: Icon, children, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
  >
    <div className="flex items-center mb-6">
      <Icon className="w-6 h-6 text-brand-medium mr-3" />
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    </div>
    {children}
  </motion.div>
);

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  strategy,
  onDownloadPDF,
  onGetAdvancedStrategy,
  onStartOver,
  isPaying
}) => {
  const platformIcons: { [key: string]: string } = {
    'LinkedIn': '💼',
    'Instagram': '📷',
    'TikTok': '🎵',
    'Facebook': '👥',
    'YouTube': '🎥',
    'Twitter/X': '🐦',
    'Pinterest': '📌'
  };

  const handleFollowInstagram = () => {
    window.open('https://instagram.com/amazsocials', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-brand-light rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-brand-medium" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Strategy for <span className="text-brand-medium">{strategy.businessName}</span> is Ready!
            </h1>
            <p className="text-gray-600">
              Here's your AI-powered social media strategy, {strategy.name}.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid gap-8">
          <ResultCard title="Recommended Platforms" icon={Target} delay={0.1}>
            <div className="grid gap-6">
              {strategy.platforms.map((platform, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-3xl mr-4">{platformIcons[platform.name] || '📱'}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{platform.name}</h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${
                          platform.priority === 'High' ? 'bg-green-100 text-green-800' :
                          platform.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {platform.priority} Priority
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-md p-4 border-l-4 border-brand">
                    <p className="text-gray-700 text-sm leading-relaxed">{platform.reasoning}</p>
                    {platform.countrySpecific && <p className="text-sm text-amber-700 mt-2 p-2 bg-amber-50 rounded-md border border-amber-200">{platform.countrySpecific}</p>}
                  </div>
                </div>
              ))}
            </div>
          </ResultCard>

          <ResultCard title="Your 30-Day Goal Focus" icon={Goal} delay={0.15}>
            <div className="bg-brand-light border-l-4 border-brand-medium rounded-r-lg p-5">
              <p className="text-brand-darkest leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: strategy.thirtyDayGoalFocus.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
          </ResultCard>

          <ResultCard title="This Week's Content Plan" icon={Clock} delay={0.2}>
            <div className="space-y-4">
              {strategy.weeklyContentIdeas.map((idea, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="font-bold text-gray-800">{idea.day}: <span className="font-medium text-brand-dark">{idea.contentType}</span></p>
                  <p className="text-sm text-gray-700 mt-1">{idea.idea}</p>
                  <p className="text-xs text-gray-500 mt-2"><b>Hashtags:</b> {idea.hashtags.join(' ')}</p>
                  <p className="text-xs text-green-700 mt-1 bg-green-50 p-2 rounded"><b>Pro Tip:</b> {idea.tips}</p>
                </div>
              ))}
            </div>
          </ResultCard>

          <ResultCard title="Next Week's Content Ideas" icon={CalendarDays} delay={0.25}>
            <div className="space-y-4">
              {strategy.nextWeekContentIdeas.map((idea, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="font-bold text-gray-800">{idea.day}: <span className="font-medium text-blue-700">{idea.contentType}</span></p>
                  <p className="text-sm text-gray-700 mt-1">{idea.idea}</p>
                  <p className="text-xs text-gray-500 mt-2"><b>Hashtags:</b> {idea.hashtags.join(' ')}</p>
                  <p className="text-xs text-blue-700 mt-1 bg-blue-100 p-2 rounded"><b>Pro Tip:</b> {idea.tips}</p>
                </div>
              ))}
            </div>
          </ResultCard>

          <ResultCard title="Strategic Changes" icon={RefreshCw} delay={0.3}>
            <ul className="space-y-3 list-disc list-inside text-gray-700">
              {strategy.strategicChanges.map((change, index) => <li key={index}>{change}</li>)}
            </ul>
          </ResultCard>
          
          <ResultCard title="Hashtag Strategy" icon={Edit3} delay={0.4}>
            <ul className="space-y-3 list-disc list-inside text-gray-700">
              {strategy.hashtagStrategy.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </ResultCard>

          <ResultCard title="Finding Trending Content" icon={Speaker} delay={0.5}>
            <ul className="space-y-3 list-disc list-inside text-gray-700">
              {strategy.trendingTips.map((tip, index) => <li key={index}>{tip}</li>)}
            </ul>
          </ResultCard>

          <ResultCard title="Recommended Tools" icon={Settings} delay={0.6}>
            <div className="grid gap-4">
              {strategy.tools.map((tool, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-800 text-sm leading-relaxed">{tool}</p>
                </div>
              ))}
            </div>
          </ResultCard>

          <ResultCard title="Investment Strategy" icon={DollarSign} delay={0.7}>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-5">
              <p className="text-gray-800 leading-relaxed text-sm whitespace-pre-line">{strategy.budgetRecommendation}</p>
            </div>
          </ResultCard>

          <ResultCard title="Offer Refinements" icon={Gift} delay={0.75}>
            <ul className="space-y-3 list-disc list-inside text-gray-700">
              {strategy.offerRefinements.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </ResultCard>

          <ResultCard title="Actionable Next Steps" icon={BarChart3} delay={0.8}>
            <div className="grid gap-4">
              {strategy.nextSteps.map((step, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start">
                    <span className="bg-brand-medium text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-gray-800 text-sm leading-relaxed">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </ResultCard>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-12 bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">
            Ready to implement your strategy?
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDownloadPDF}
              className="flex items-center justify-center p-4 bg-brand-medium text-white rounded-lg font-semibold hover:bg-brand-dark transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetAdvancedStrategy}
              disabled={isPaying}
              className="flex items-center justify-center p-4 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition-colors disabled:bg-amber-300 disabled:cursor-wait text-center"
            >
              {isPaying ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Processing...
                </>
              ) : (
                <>
                  <Star className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="md:hidden">Adv. Plan ($5)</span>
                  <span className="hidden md:inline">Advanced 30-Day Strategy for $5</span>
                </>
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFollowInstagram}
              className="flex items-center justify-center p-4 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors"
            >
              <Instagram className="w-5 h-5 mr-2" />
              Follow on Instagram
            </motion.button>
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={onStartOver}
              className="text-gray-600 hover:text-gray-800 text-sm underline"
            >
              Create New Strategy
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
