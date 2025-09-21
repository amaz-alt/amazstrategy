import { QuestionnaireData, AdvancedQuestionnaireData, AdvancedStrategyResult, DailyAction } from '../types';

// --- HELPER FUNCTIONS for SCORING & LOGIC ---

const computeCapacityScore = (data: Partial<AdvancedQuestionnaireData>): number => {
  const hours = data.weeklyHoursCapacity || 5;
  const team = data.teamExecutionCapacity || 1;
  const camera = data.cameraComfort || 1;
  const outsource = data.willingToOutsource === 'yes' ? 1 : 0;

  // Normalize inputs to a 0-1 scale
  const hoursScore = Math.min(hours / 40, 1); // Capped at 40 hours
  const teamScore = Math.min(team / 5, 1); // Capped at 5 people
  const cameraScore = (camera - 1) / 4;
  const outsourceScore = outsource;

  // Apply weights
  const weightedScore = (hoursScore * 0.35) + (teamScore * 0.25) + (cameraScore * 0.20) + (outsourceScore * 0.20);
  
  return Math.round(weightedScore * 100);
};

const computeBudgetBand = (budget: number): 'Micro' | 'Small' | 'Medium' | 'Growth' => {
  if (budget < 200) return 'Micro';
  if (budget <= 1000) return 'Small';
  if (budget <= 5000) return 'Medium';
  return 'Growth';
};

const calculateROASViability = (data: Partial<AdvancedQuestionnaireData>): { isViable: boolean; reasoning: string; targetROAS: number } => {
  const aov = data.aov || 0;
  const conversionRate = (data.conversionRate || 0) / 100;
  const salesCycle = data.salesCycle || 30;

  if (aov === 0 || conversionRate === 0) {
    return { isViable: false, reasoning: 'Paid traffic is not recommended without a clear Average Order Value and Conversion Rate. Focus on organic growth to establish these metrics.', targetROAS: 0 };
  }

  const maxCPA = aov * 0.3; // Assuming a 30% margin for acquisition cost
  const targetROAS = aov / maxCPA;

  if (salesCycle > 30) {
    return { isViable: false, reasoning: `With a sales cycle of ${salesCycle} days, it's unlikely you'll see a positive return on ad spend within a 30-day plan. Focus on organic nurturing.`, targetROAS };
  }

  return { isViable: true, reasoning: `With an AOV of $${aov}, paid traffic is viable. We will target a minimum ROAS of ${targetROAS.toFixed(1)}x.`, targetROAS };
};

// --- MAIN GENERATOR FUNCTION ---

export function generateAdvancedStrategy(basicData: QuestionnaireData, advancedData: Partial<AdvancedQuestionnaireData>): AdvancedStrategyResult {
  const wasEstimated = Object.keys(advancedData).length < 15;
  const combinedData = { ...basicData, ...advancedData };

  // --- COMPUTE SCORES & BANDS ---
  const capacityScore = computeCapacityScore(advancedData);
  const budgetBand = computeBudgetBand(advancedData.monthlyAdBudget || 0);
  const { isViable: isAdViable, reasoning: adViabilityReasoning, targetROAS } = calculateROASViability(advancedData);

  // --- BUILD STRATEGY SECTIONS ---
  const weeklySummaries = Array.from({ length: 4 }, (_, i) => ({
    week: i + 1,
    goal: `Week ${i + 1}: ${['Foundation & Setup', 'Execution & Testing', 'Collaboration & Scaling', 'Optimization & Review'][i]}`,
    priorityKPI: `${advancedData.primaryBusinessObjective || 'Revenue'}`,
    expectedMilestone: `Achieve 25% of your 30-day target of ${advancedData.objectiveTarget || 100}`,
    estimatedTime: `${Math.round((advancedData.weeklyHoursCapacity || 5) * 0.8)} hours`,
    adSpend: isAdViable ? `$${Math.round((advancedData.monthlyAdBudget || 0) / 4)}` : '$0 (Organic Focus)'
  }));

  const dailyPlan: DailyAction[] = Array.from({ length: 30 }, (_, i) => {
    // Simplified logic for demonstration. A real implementation would have complex branching.
    const day = i + 1;
    const week = Math.floor(i / 7);
    const dayOfWeek = i % 7;

    let taskTitle = 'Default Task';
    if (dayOfWeek === 0) taskTitle = 'Plan & Strategize for the Week';
    if (dayOfWeek === 1 || dayOfWeek === 3) taskTitle = 'Publish Primary Content';
    if (dayOfWeek === 2 || dayOfWeek === 4) taskTitle = 'Engage & Nurture Community';
    if (dayOfWeek === 5) taskTitle = 'Analyze & Report on KPIs';
    if (dayOfWeek === 6) taskTitle = 'Rest & Recharge';
    
    return {
      day,
      taskTitle: `Day ${day} - ${taskTitle}`,
      estimatedTime: '1-2 hours',
      assignedTo: (advancedData.teamExecutionCapacity || 1) > 1 ? 'Team' : 'Solo',
      contentBrief: {
        format: 'Carousel',
        hookLine: `Hook based on: ${advancedData.usp || 'your unique value'}`,
        primaryCaption: 'Caption addressing customer objection: ' + (advancedData.customerObjections?.split(',')[0] || 'price'),
        hashtags: [`#${basicData.industry.replace(/\s/g, '')}`, `#${basicData.businessName.toLowerCase()}`],
        thumbnailIdea: 'A striking image with a bold text overlay.'
      },
      cta: 'Click the link in our bio to learn more.',
      measurementMetric: 'Engagement Rate, Clicks',
      priority: dayOfWeek === 6 ? 'Low' : 'High',
      effortImpactRatio: 3,
    };
  });

  const contentTemplates = [
    {
      title: 'Objection-Handling Carousel',
      type: 'Carousel' as const,
      template: `Slide 1 (Hook): "Is [Objection] stopping you?"\nSlide 2: "We hear you. Many feel that way."\nSlide 3: "But here's what you might not know..."\nSlide 4: "Our solution actually [Benefit that counters objection]."\nSlide 5 (CTA): "Ready to see the difference? DM us 'READY'."`,
      variants: ['Start with a question vs. a bold statement.']
    },
    {
      title: 'USP Showcase Reel',
      type: 'Reel' as const,
      template: `(3-second clip showing problem) Text: The old way is broken.\n(5-second clip showing your solution) Text: Here's the fix.\n(3-second clip of happy customer) Text: ${advancedData.usp}`,
      variants: ['Use trending audio vs. a voiceover.']
    },
    {
      title: 'Authority Post',
      type: 'Post' as const,
      template: `Your industry is wrong about [Topic].\n\nHere's the truth: [Your unique perspective].\n\nThis is why we focus on [Your method].\n\nWhat are your thoughts?`,
      variants: ['Ask a question at the start vs. the end.']
    }
  ];

  const adPlan = {
    isViable: isAdViable,
    viabilityReasoning: adViabilityReasoning,
    budgetBand,
    dailyBudget: isAdViable ? Math.round((advancedData.monthlyAdBudget || 0) / 30) : 0,
    weeklyObjectives: ['Week 1: Awareness (Video Views)', 'Week 2: Retargeting (Traffic)', 'Week 3: Conversion (Leads/Sales)', 'Week 4: Scale Winners'],
    recommendedCreatives: ['Video ad based on best-performing post', 'Carousel ad showcasing testimonials'],
    kpiTargets: isAdViable ? `Target CPA: <$${(advancedData.aov || 0) * 0.3}, Target ROAS: >${targetROAS.toFixed(1)}x` : 'N/A'
  };

  const repurposingMatrix = {
    coreAsset: '1x Long-Form Video (e.g., YouTube)',
    repurposedPosts: [
      { platform: 'Instagram', format: 'Reel', idea: 'Clip the best 30-second hook.' },
      { platform: 'LinkedIn', format: 'Text Post', idea: 'Transcribe the key takeaways.' },
      { platform: 'Twitter/X', format: 'Thread', idea: 'Break down the video into a 5-tweet thread.' },
      { platform: 'Instagram', format: 'Carousel', idea: 'Create a 5-slide carousel from the main points.' },
    ]
  };

  const onboardingChecklist = [
    { tool: 'Canva', purpose: 'Graphic and video design', setupTime: '30 mins' },
    { tool: 'Buffer / Later', purpose: 'Content scheduling', setupTime: '1 hour' },
    { tool: 'Google Analytics', purpose: 'Website traffic analysis', setupTime: '30 mins' },
  ];

  const measurementDashboard = [
    {
      kpi: 'Engagement Rate',
      formula: '(Likes + Comments + Shares) / Followers * 100',
      correctiveActions: ['Test new hooks', 'Ask more questions', 'Engage with other accounts']
    },
    {
      kpi: 'Click-Through Rate (CTR)',
      formula: '(Link Clicks / Impressions) * 100',
      correctiveActions: ['Make CTA clearer', 'Put link in bio', 'Use stronger visuals']
    },
    {
      kpi: `Cost Per ${advancedData.primaryBusinessObjective || 'Result'}`,
      formula: 'Total Ad Spend / Number of Results',
      correctiveActions: ['Refine ad targeting', 'Improve ad creative', 'Adjust landing page']
    }
  ];

  return {
    name: basicData.name,
    businessName: basicData.businessName,
    wasEstimated,
    weeklySummaries,
    dailyPlan,
    contentTemplates,
    adPlan,
    repurposingMatrix,
    onboardingChecklist,
    measurementDashboard,
    capacityScore,
    roasTarget: targetROAS,
  };
}
