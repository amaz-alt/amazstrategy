import { AdvancedQuestionnaireData } from '../types';

export interface AdvancedQuestion {
  id: keyof AdvancedQuestionnaireData;
  title: string;
  type: 'numeric' | 'slider' | 'text' | 'multi-select' | 'multiple-choice';
  options?: string[];
  unit?: string;
  placeholder?: string;
  disclaimer?: string;
  min?: number;
  max?: number;
  step?: number;
  clarification?: {
    question: string;
    type: 'multiple-choice-small';
    options: string[];
  }
}

export const advancedQuestions: AdvancedQuestion[] = [
  {
    id: 'monthlyAdBudget',
    title: 'What is your total monthly budget for paid ads?',
    type: 'numeric',
    unit: 'USD',
    placeholder: 'e.g., 250',
    disclaimer: 'This helps determine the scale and type of ad campaigns we recommend.'
  },
  {
    id: 'monthlyToolsBudget',
    title: 'What is your monthly budget for marketing tools?',
    type: 'numeric',
    unit: 'USD',
    placeholder: 'e.g., 50',
    disclaimer: 'For tools like schedulers, design software, CRMs, etc.'
  },
  {
    id: 'aov',
    title: 'What is your Average Order Value (AOV) or average client sale value?',
    type: 'numeric',
    unit: 'USD',
    placeholder: 'e.g., 99',
    disclaimer: 'If you sell products, use the average cart value. If you sell services, use the average project/client value.'
  },
  {
    id: 'conversionRate',
    title: 'What is your estimated conversion rate from social media?',
    type: 'numeric',
    unit: '%',
    placeholder: 'e.g., 2',
    disclaimer: 'The percentage of profile visitors who become a lead or customer. Estimate if unsure.'
  },
  {
    id: 'salesCycle',
    title: 'What is your typical sales cycle length?',
    type: 'numeric',
    unit: 'days',
    placeholder: 'e.g., 14',
    disclaimer: 'The average time from a person\'s first interaction with your brand to their purchase.'
  },
  {
    id: 'customerObjections',
    title: 'What are the top 3 objections you hear from potential customers?',
    type: 'text',
    placeholder: 'e.g., "It\'s too expensive", "I don\'t have time for this", "I\'m not sure it will work for me"',
    disclaimer: 'List them separated by commas. This helps us craft content that overcomes these hurdles.'
  },
  {
    id: 'usp',
    title: 'What is your Unique Selling Proposition (USP) in one sentence?',
    type: 'text',
    placeholder: 'e.g., "We are the only social media scheduler that automatically recycles your best content."',
    disclaimer: 'What makes you different from and better than your competitors?'
  },
  {
    id: 'bestPerformingPost',
    title: 'Describe your best-performing post or campaign from the last 6 months.',
    type: 'text',
    placeholder: 'e.g., "A Reel showing a time-lapse of our product being made got 50k views and 20 sales. The hook was \'You won\'t believe how it\'s made.\'"',
    disclaimer: 'Include the format, topic, and any metrics you have (views, clicks, sales).'
  },
  {
    id: 'worstPerformingContent',
    title: 'Describe a content type that has performed poorly for you and why you think it failed.',
    type: 'text',
    placeholder: 'e.g., "Our long text-only LinkedIn posts get almost no engagement. I think they are too boring and hard to read."',
    disclaimer: 'Understanding what doesn\'t work is as important as knowing what does.'
  },
  {
    id: 'primaryBusinessObjective',
    title: 'What is your primary business objective for the next 30 days?',
    type: 'multiple-choice',
    options: ['Revenue', 'Leads', 'Appointments', 'Community Growth']
  },
  {
    id: 'objectiveTarget',
    title: 'What is your specific target for that objective?',
    type: 'numeric',
    placeholder: 'e.g., 5000 (for Revenue), 50 (for Leads)',
    disclaimer: 'Set a measurable goal for your chosen objective (e.g., a specific number of leads or dollar amount).'
  },
  {
    id: 'teamExecutionCapacity',
    title: 'How many people are on your marketing/content team?',
    type: 'numeric',
    unit: 'people',
    placeholder: 'e.g., 1',
  },
  {
    id: 'weeklyHoursCapacity',
    title: 'How many total hours per week can the team dedicate to content & social media?',
    type: 'numeric',
    unit: 'hours/week',
    placeholder: 'e.g., 10',
  },
  {
    id: 'cameraComfort',
    title: 'On a scale of 1-5, how comfortable are you with creating "face-on-camera" content?',
    type: 'slider',
    min: 1,
    max: 5,
    step: 1,
    unit: '(1 = Not at all, 5 = Very comfortable)',
  },
  {
    id: 'willingToOutsource',
    title: 'Are you willing to outsource creative tasks (like video editing or graphic design)?',
    type: 'multiple-choice',
    options: ['yes', 'no']
  },
  {
    id: 'technicalConstraints',
    title: 'List any technical constraints or requirements.',
    type: 'text',
    placeholder: 'e.g., "No online shop, all sales via DM", "Must comply with healthcare privacy laws", "Website is not mobile-friendly"',
    disclaimer: 'e.g., website limitations, legal regulations, specific languages.'
  },
  {
    id: 'currentFunnel',
    title: 'Briefly describe your current sales funnel.',
    type: 'text',
    placeholder: 'e.g., "Lead Magnet (PDF) -> Email sequence -> Book a call link"',
    disclaimer: 'How do you capture, nurture, and close leads?'
  },
  {
    id: 'growthLever',
    title: 'What is the biggest growth lever you want to test this month?',
    type: 'multiple-choice',
    options: [
      'Paid Traffic',
      'Influencer Collaboration',
      'Referral Program',
      'Giveaway / Contest',
      'Organic Community Building',
      'SEO for Social Profiles'
    ]
  },
];
