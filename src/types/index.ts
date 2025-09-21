export interface QuestionnaireData {
  // Lead Capture Info
  name: string;
  email: string;
  businessName: string;
  websiteOrSocial: string;
  
  // Questionnaire Info
  country: string;
  industry: string;
  businessType: string;
  targetAudience: string;
  businessAge: string;
  teamSize: string;
  monthlyBudget: number;
  timeCapacity: number;
  primaryGoals: string[];
  thirtyDayGoal: string;
  currentPlatforms: string[];
  contentTypes: string[];
  brandVoice: string;
  currentOffers: string;
  competitorAnalysis: string;
  previousExperience: string;
  contentCreationCapacity: string;
  automationPreference: string;
  measurableGoals: string;
  seasonality: string;
  geographicFocus: string;
  brandStage: string;
  challenges: string;
}

export interface AdvancedQuestionnaireData {
  monthlyAdBudget: number;
  monthlyToolsBudget: number;
  aov: number;
  conversionRate: number;
  salesCycle: number;
  customerObjections: string;
  usp: string;
  bestPerformingPost: string;
  worstPerformingContent: string;
  primaryBusinessObjective: 'Revenue' | 'Leads' | 'Appointments' | 'Community Growth';
  objectiveTarget: number;
  teamExecutionCapacity: number;
  weeklyHoursCapacity: number;
  cameraComfort: number;
  willingToOutsource: 'yes' | 'no';
  technicalConstraints: string;
  currentFunnel: string;
  growthLever: string;
}

export interface ContentIdea {
  day: string;
  contentType: string;
  idea: string;
  hashtags: string[];
  tips: string;
}

export interface StrategyResult {
  name: string;
  businessName: string;
  platforms: {
    name: string;
    priority: 'High' | 'Medium' | 'Low';
    reasoning: string;
    countrySpecific?: string;
  }[];
  thirtyDayGoalFocus: string;
  postingSchedule: {
    platform: string;
    frequency: string;
    contentTypes: string[];
    bestTimes?: string;
    contentRatio?: string;
  }[];
  contentThemes: string[];
  weeklyContentIdeas: ContentIdea[];
  nextWeekContentIdeas: ContentIdea[];
  tools: string[];
  budgetRecommendation: string;
  offerRefinements: string[];
  strategicChanges: string[];
  trendingTips: string[];
  hashtagStrategy: string[];
  nextSteps: string[];
}

// --- NEW ADVANCED STRATEGY TYPES ---

export interface WeeklySummary {
  week: number;
  goal: string;
  priorityKPI: string;
  expectedMilestone: string;
  estimatedTime: string;
  adSpend: string;
}

export interface ContentBrief {
  format: string;
  hookLine: string;
  primaryCaption: string;
  hashtags: string[];
  thumbnailIdea: string;
}

export interface DailyAction {
  day: number;
  taskTitle: string;
  estimatedTime: string;
  assignedTo: 'Solo' | 'Freelancer' | 'Team';
  contentBrief: ContentBrief;
  cta: string;
  measurementMetric: string;
  priority: 'High' | 'Medium' | 'Low';
  effortImpactRatio: 1 | 2 | 3 | 4 | 5;
}

export interface ContentTemplate {
  title: string;
  type: 'Carousel' | 'Reel' | 'Post';
  template: string;
  variants: string[];
}

export interface AdPlan {
  isViable: boolean;
  viabilityReasoning: string;
  budgetBand: 'Micro' | 'Small' | 'Medium' | 'Growth';
  dailyBudget: number;
  weeklyObjectives: string[];
  recommendedCreatives: string[];
  kpiTargets: string;
}

export interface RepurposingMatrix {
  coreAsset: string;
  repurposedPosts: { platform: string; format: string; idea: string; }[];
}

export interface ToolRecommendation {
  tool: string;
  purpose: string;
  setupTime: string;
}

export interface KpiDashboardItem {
  kpi: string;
  formula: string;
  correctiveActions: string[];
}

export interface AdvancedStrategyResult {
  name: string;
  businessName: string;
  wasEstimated: boolean;
  weeklySummaries: WeeklySummary[];
  dailyPlan: DailyAction[];
  contentTemplates: ContentTemplate[];
  adPlan: AdPlan;
  repurposingMatrix: RepurposingMatrix;
  onboardingChecklist: ToolRecommendation[];
  measurementDashboard: KpiDashboardItem[];
  capacityScore: number;
  roasTarget: number;
}
