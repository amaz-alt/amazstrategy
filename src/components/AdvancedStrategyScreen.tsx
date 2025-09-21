import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Download, BarChart3, Users, Clock, Target, Calendar, ClipboardCheck, Sliders, Repeat, Settings, AlertTriangle } from 'lucide-react';
import { AdvancedStrategyResult, DailyAction } from '../types';

interface AdvancedStrategyScreenProps {
  strategy: AdvancedStrategyResult;
  onBack: () => void;
  onDownloadPDF: () => void;
}

const ResultCard: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode; delay: number }> = ({ title, icon: Icon, children, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
  >
    <div className="flex items-center mb-4">
      <Icon className="w-6 h-6 text-amber-500 mr-3" />
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
    </div>
    {children}
  </motion.div>
);

const DailyActionCard: React.FC<{ action: DailyAction }> = ({ action }) => {
  const priorityColors = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800',
  };
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 flex items-start space-x-4">
      <div className="flex-shrink-0">
        <div className="bg-amber-500 text-white rounded-lg w-16 h-16 flex flex-col items-center justify-center shadow-md">
          <span className="text-xs font-medium opacity-80">DAY</span>
          <span className="text-2xl font-bold tracking-tight">{action.day}</span>
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900">{action.taskTitle}</h3>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${priorityColors[action.priority]}`}>{action.priority}</span>
        </div>
        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
          <span><Clock className="w-3 h-3 inline mr-1" />{action.estimatedTime}</span>
          <span><Users className="w-3 h-3 inline mr-1" />{action.assignedTo}</span>
          <span>Impact: {'★'.repeat(action.effortImpactRatio)}{'☆'.repeat(5 - action.effortImpactRatio)}</span>
        </div>
        <div className="mt-3 space-y-2 text-sm">
          <p><strong>Brief:</strong> {action.contentBrief.format} - "{action.contentBrief.hookLine}"</p>
          <p><strong>CTA:</strong> "{action.cta}"</p>
          <p><strong>Track:</strong> {action.measurementMetric}</p>
        </div>
      </div>
    </div>
  );
};

export const AdvancedStrategyScreen: React.FC<AdvancedStrategyScreenProps> = ({ strategy, onBack, onDownloadPDF }) => {
  const [activeTab, setActiveTab] = useState('plan');

  const renderContent = () => {
    switch(activeTab) {
      case 'plan':
        return (
          <div className="space-y-4">
            {strategy.dailyPlan.map((day) => <DailyActionCard key={day.day} action={day} />)}
          </div>
        );
      case 'templates':
        return (
          <ResultCard title="Content Templates" icon={ClipboardCheck} delay={0}>
            <div className="space-y-6">
              {strategy.contentTemplates.map(template => (
                <div key={template.title} className="p-4 bg-gray-50 rounded-lg border">
                  <h4 className="font-bold text-gray-800">{template.title} ({template.type})</h4>
                  <pre className="text-sm text-gray-700 mt-2 whitespace-pre-wrap font-sans">{template.template}</pre>
                </div>
              ))}
            </div>
          </ResultCard>
        );
      case 'ads':
        return (
          <ResultCard title="Ad Plan" icon={Sliders} delay={0}>
            <div className="space-y-4 text-sm">
              <p><strong>Viability:</strong> {strategy.adPlan.isViable ? 'Recommended' : 'Not Recommended'}</p>
              <p className="p-3 bg-gray-100 rounded-md"><strong>Reasoning:</strong> {strategy.adPlan.viabilityReasoning}</p>
              <p><strong>Budget Band:</strong> {strategy.adPlan.budgetBand} (~${strategy.adPlan.dailyBudget}/day)</p>
              <p><strong>KPI Targets:</strong> {strategy.adPlan.kpiTargets}</p>
              <div>
                <strong>Weekly Objectives:</strong>
                <ul className="list-disc list-inside ml-4">
                  {strategy.adPlan.weeklyObjectives.map(obj => <li key={obj}>{obj}</li>)}
                </ul>
              </div>
            </div>
          </ResultCard>
        );
      case 'more':
        return (
          <div className="space-y-6">
            <ResultCard title="Repurposing Matrix" icon={Repeat} delay={0.1}>
              <p className="text-sm mb-2"><strong>Core Asset:</strong> {strategy.repurposingMatrix.coreAsset}</p>
              <ul className="list-disc list-inside ml-4 text-sm space-y-1">
                {strategy.repurposingMatrix.repurposedPosts.map(post => <li key={post.platform}><strong>{post.platform} ({post.format}):</strong> {post.idea}</li>)}
              </ul>
            </ResultCard>
            <ResultCard title="Onboarding Checklist & Tools" icon={Settings} delay={0.2}>
              <ul className="space-y-2 text-sm">
                {strategy.onboardingChecklist.map(item => <li key={item.tool}><strong>{item.tool}:</strong> {item.purpose} ({item.setupTime})</li>)}
              </ul>
            </ResultCard>
            <ResultCard title="Measurement Dashboard" icon={BarChart3} delay={0.3}>
              <ul className="space-y-4 text-sm">
                {strategy.measurementDashboard.map(item => (
                  <li key={item.kpi}>
                    <strong>{item.kpi}:</strong> <code className="text-xs bg-gray-200 p-1 rounded">{item.formula}</code>
                    <ul className="list-disc list-inside ml-6 text-gray-600">
                      {item.correctiveActions.map(action => <li key={action}>{action}</li>)}
                    </ul>
                  </li>
                ))}
              </ul>
            </ResultCard>
          </div>
        );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-800 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h2 className="text-lg font-bold text-gray-800 hidden md:block">Advanced 30-Day Strategy</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDownloadPDF}
            className="flex items-center justify-center px-4 py-2 bg-brand-medium text-white rounded-lg font-semibold hover:bg-brand-dark transition-colors text-sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </motion.button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-8">
          <div className="bg-amber-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Zap className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Plan for <span className="text-amber-500">{strategy.businessName}</span>
          </h1>
          {strategy.wasEstimated && (
            <div className="mt-2 inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-1 rounded-full">
              <AlertTriangle className="w-4 h-4 mr-1.5" />
              Some answers were estimated, so this plan is less precise.
            </div>
          )}
        </motion.div>

        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            <button onClick={() => setActiveTab('plan')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'plan' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Daily Plan</button>
            <button onClick={() => setActiveTab('templates')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'templates' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Templates</button>
            <button onClick={() => setActiveTab('ads')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'ads' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Ad Plan</button>
            <button onClick={() => setActiveTab('more')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'more' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>More</button>
          </nav>
        </div>

        {renderContent()}

      </div>
    </div>
  );
};
