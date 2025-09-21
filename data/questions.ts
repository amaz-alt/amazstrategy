import { QuestionnaireData } from '../types';

export interface Question {
  id: keyof QuestionnaireData;
  title: string;
  type: 'multiple-choice' | 'slider' | 'text' | 'multi-select';
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  placeholder?: string;
  disclaimer?: string;
}

export const questions: Question[] = [
  {
    id: 'country',
    title: 'Which country is your business primarily based in?',
    type: 'multiple-choice',
    options: [
      'United States',
      'United Kingdom',
      'Canada',
      'Australia',
      'Germany',
      'France',
      'Netherlands',
      'India',
      'Singapore',
      'United Arab Emirates',
      'South Africa',
      'Brazil',
      'Mexico',
      'Other'
    ]
  },
  {
    id: 'industry',
    title: 'What industry is your business in?',
    type: 'multiple-choice',
    options: [
      'Technology & Software',
      'E-commerce & Retail',
      'Health & Wellness',
      'Food & Beverage',
      'Professional Services',
      'Education & Training',
      'Real Estate',
      'Finance & Insurance',
      'Creative & Design',
      'Other'
    ]
  },
  {
    id: 'businessType',
    title: 'What type of business model do you have?',
    type: 'multiple-choice',
    options: [
      'B2B (Business to Business)',
      'B2C (Business to Consumer)',
      'Both B2B and B2C',
      'Non-profit Organization',
      'Personal Brand/Influencer'
    ]
  },
  {
    id: 'targetAudience',
    title: 'Describe your primary target audience in detail',
    type: 'text',
    placeholder: 'e.g., Small business owners aged 25-45, tech-savvy entrepreneurs who value efficiency and are active on LinkedIn and Instagram...',
    disclaimer: 'The more specific and detailed your answer, the better we can tailor your strategy!'
  },
  {
    id: 'businessAge',
    title: 'How long has your business been operating?',
    type: 'multiple-choice',
    options: [
      'Just starting (0-6 months)',
      'New business (6 months - 2 years)',
      'Established (2-5 years)',
      'Mature (5+ years)'
    ]
  },
  {
    id: 'teamSize',
    title: 'How many people work on marketing/social media?',
    type: 'multiple-choice',
    options: [
      'Just me (solo)',
      '2-3 people',
      '4-10 people',
      '10+ people',
      'Outsourced team'
    ]
  },
  {
    id: 'monthlyBudget',
    title: 'What\'s your monthly social media marketing budget?',
    type: 'slider',
    min: 0,
    max: 10000,
    step: 50,
    unit: 'USD'
  },
  {
    id: 'timeCapacity',
    title: 'How many hours per week can you dedicate to social media?',
    type: 'slider',
    min: 1,
    max: 40,
    step: 1,
    unit: 'hours'
  },
  {
    id: 'primaryGoals',
    title: 'What are your main social media goals? (Select all that apply)',
    type: 'multi-select',
    options: [
      'Increase brand awareness',
      'Generate leads',
      'Drive website traffic',
      'Build community',
      'Customer support',
      'Sales conversion',
      'Thought leadership',
      'Recruitment'
    ]
  },
  {
    id: 'thirtyDayGoal',
    title: 'What is your most important, specific goal for the next 30 days?',
    type: 'text',
    placeholder: 'e.g., Get 5 new clients, increase website traffic by 20%, book 10 discovery calls, sell 50 units of a product...',
    disclaimer: 'A specific, measurable goal helps us create a highly focused action plan for you.'
  },
  {
    id: 'currentPlatforms',
    title: 'Which platforms do you currently use? (Select all that apply)',
    type: 'multi-select',
    options: [
      'Instagram',
      'Facebook',
      'LinkedIn',
      'TikTok',
      'Twitter/X',
      'YouTube',
      'Pinterest',
      'Snapchat',
      'None currently'
    ]
  },
  {
    id: 'contentTypes',
    title: 'What content types are you comfortable creating? (Select all that apply)',
    type: 'multi-select',
    options: [
      'Photos',
      'Videos',
      'Written posts',
      'Infographics',
      'Stories',
      'Live streams',
      'Podcasts',
      'User-generated content'
    ]
  },
  {
    id: 'brandVoice',
    title: 'How would you describe your brand voice?',
    type: 'multiple-choice',
    options: [
      'Professional & Authoritative',
      'Friendly & Approachable',
      'Fun & Playful',
      'Inspirational & Motivational',
      'Educational & Informative',
      'Luxury & Sophisticated'
    ]
  },
  {
    id: 'currentOffers',
    title: 'Describe your current offers and how you promote them.',
    type: 'text',
    placeholder: 'e.g., We offer a free 30-minute consultation promoted via Instagram posts. Our main product is a $99 online course, which we mention in our weekly newsletter.',
    disclaimer: 'This helps us suggest refinements to make your offers more compelling on social media.'
  },
  {
    id: 'competitorAnalysis',
    title: 'How active are your competitors on social media?',
    type: 'multiple-choice',
    options: [
      'Very active with strong presence',
      'Moderately active',
      'Limited presence',
      'Not sure',
      'No direct competitors on social media'
    ]
  },
  {
    id: 'previousExperience',
    title: 'What\'s your experience level with social media marketing?',
    type: 'multiple-choice',
    options: [
      'Complete beginner',
      'Some basic knowledge',
      'Intermediate experience',
      'Advanced user',
      'Expert level'
    ]
  },
  {
    id: 'contentCreationCapacity',
    title: 'How would you rate your content creation capabilities?',
    type: 'multiple-choice',
    options: [
      'Limited - need lots of help',
      'Basic - can create simple content',
      'Good - comfortable with most formats',
      'Excellent - can create professional content',
      'Have a dedicated content team'
    ]
  },
  {
    id: 'automationPreference',
    title: 'How do you feel about using automation tools?',
    type: 'multiple-choice',
    options: [
      'Love automation - want to automate everything',
      'Open to automation for basic tasks',
      'Prefer manual approach with some automation',
      'Mostly manual with minimal automation',
      'Completely manual approach'
    ]
  },
  {
    id: 'measurableGoals',
    title: 'What specific metric matters most to you?',
    type: 'multiple-choice',
    options: [
      'Follower growth',
      'Engagement rate',
      'Website clicks',
      'Lead generation',
      'Sales conversions',
      'Brand mentions',
      'Video views',
      'Not sure yet'
    ]
  },
  {
    id: 'seasonality',
    title: 'Does your business have seasonal trends?',
    type: 'multiple-choice',
    options: [
      'Yes - strong seasonal patterns',
      'Somewhat seasonal',
      'No - consistent year-round',
      'Not applicable'
    ]
  },
  {
    id: 'geographicFocus',
    title: 'What\'s your geographic target market?',
    type: 'multiple-choice',
    options: [
      'Local/City-specific',
      'Regional/State-wide',
      'National',
      'International',
      'Global'
    ]
  },
  {
    id: 'brandStage',
    title: 'What stage is your brand in?',
    type: 'multiple-choice',
    options: [
      'Building brand awareness',
      'Establishing credibility',
      'Growing customer base',
      'Scaling operations',
      'Market leader maintaining position'
    ]
  },
  {
    id: 'challenges',
    title: 'What\'s your biggest social media challenge? Be as specific as possible.',
    type: 'text',
    placeholder: 'e.g., Creating consistent content while managing a full-time job, measuring ROI from social media efforts, finding time to engage authentically with followers...',
    disclaimer: 'Detailed challenges help us provide more targeted solutions!'
  }
];
