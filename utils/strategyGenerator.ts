import { QuestionnaireData, StrategyResult, ContentIdea } from '../types';

export function generateStrategy(data: QuestionnaireData): StrategyResult {
  const platforms = [];
  const budget = data.monthlyBudget || 0;
  const timeCapacity = data.timeCapacity || 5;
  const isB2B = data.businessType === 'B2B (Business to Business)';
  const isB2C = data.businessType === 'B2C (Business to Consumer)';
  
  // LinkedIn Analysis
  if (isB2B || data.primaryGoals?.includes('Thought leadership') || data.primaryGoals?.includes('Generate leads')) {
    const linkedinPriority = isB2B ? 'High' : 'Medium';
    platforms.push({
      name: 'LinkedIn',
      priority: linkedinPriority as const,
      reasoning: `${isB2B ? 'Essential for B2B companies' : 'Valuable for professional networking'}. Your ${data.brandVoice?.toLowerCase()} brand voice aligns well with LinkedIn's professional environment. With a team of ${data.teamSize}, you can maintain consistent thought leadership content. ${data.primaryGoals?.includes('Generate leads') ? 'Excellent for lead generation in your industry.' : ''}`
    });
  }

  // Instagram Analysis
  if (isB2C || data.contentTypes?.includes('Photos') || data.contentTypes?.includes('Videos')) {
    const instagramPriority = (isB2C && (data.contentTypes?.includes('Photos') || data.contentTypes?.includes('Videos'))) ? 'High' : 'Medium';
    platforms.push({
      name: 'Instagram',
      priority: instagramPriority as const,
      reasoning: `Perfect for ${data.industry} businesses targeting visual-oriented audiences. Your ${data.brandVoice?.toLowerCase()} voice translates well to Instagram's visual storytelling format. ${data.contentTypes?.includes('Videos') ? 'Your video creation capability gives you a significant advantage on Reels and Stories.' : ''} ${data.geographicFocus === 'Local/City-specific' ? 'Instagram\'s local discovery features will help you reach nearby customers.' : ''}`
    });
  }

  // TikTok Analysis
  const isTikTokBanned = data.country === 'India';
  if (!isTikTokBanned && (data.contentTypes?.includes('Videos') || data.targetAudience?.toLowerCase().includes('gen z') || data.brandVoice === 'Fun & Playful')) {
    platforms.push({
      name: 'TikTok',
      priority: 'High' as const,
      reasoning: `Your ${data.brandVoice?.toLowerCase()} brand voice is perfect for TikTok's authentic, engaging format. ${data.contentTypes?.includes('Videos') ? 'Your video creation skills are essential for TikTok success.' : ''} ${data.industry === 'E-commerce & Retail' ? 'TikTok has shown exceptional conversion rates for retail businesses.' : ''} ${timeCapacity >= 10 ? 'With your time capacity, you can maintain the consistent posting TikTok requires.' : 'Consider starting with 3-4 posts per week and scaling up.'}`,
      countrySpecific: data.country === 'United States' ? 'Note: TikTok faces potential regulatory challenges in the US. Diversify your short-form video strategy across Instagram Reels and YouTube Shorts.' : undefined
    });
  } else if (isTikTokBanned && data.contentTypes?.includes('Videos')) {
    // Add Instagram with higher priority for video content in TikTok-banned countries
    if (!platforms.find(p => p.name === 'Instagram')) {
      platforms.push({
        name: 'Instagram',
        priority: 'High' as const,
        reasoning: `Instagram Reels is your best alternative for short-form video content. Your video creation skills will be highly valuable here. Focus on Reels to capture the TikTok-style content format that performs well on Instagram.`,
        countrySpecific: 'TikTok is not available in your region, making Instagram Reels even more important for your video strategy.'
      });
    }
  }

  // Facebook Analysis
  if (data.geographicFocus === 'Local/City-specific' || data.businessAge === 'Established (2-5 years)' || data.businessAge === 'Mature (5+ years)') {
    platforms.push({
      name: 'Facebook',
      priority: 'Medium' as const,
      reasoning: `${data.geographicFocus === 'Local/City-specific' ? 'Facebook\'s local business features and community groups are invaluable for local reach.' : 'Strong platform for building loyal communities.'} ${data.primaryGoals?.includes('Customer support') ? 'Excellent for customer service and community management.' : ''} ${data.targetAudience?.toLowerCase().includes('adult') ? 'Aligns with your target demographic\'s platform preferences.' : ''}`
    });
  }

  // YouTube Analysis
  if (data.contentTypes?.includes('Videos') && timeCapacity >= 15) {
    platforms.push({
      name: 'YouTube',
      priority: 'Medium' as const,
      reasoning: `Your video creation capability and ${timeCapacity} hours weekly capacity make YouTube viable. Perfect for educational content and building authority in ${data.industry}. Long-term SEO benefits and evergreen content potential.`
    });
  }

  const recommendedPlatforms = platforms.slice(0, 4).sort((a, b) => {
    const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  const weeklyContentIdeas: ContentIdea[] = [
    { day: 'Monday', contentType: 'Educational Post', idea: 'Bust a common myth in your industry with a quick-tip carousel.', hashtags: ['#MythBustingMonday', `#${data.industry.replace(/\s/g, '')}Tips`], tips: 'Use bold text and simple graphics to make it easily digestible.' },
    { day: 'Tuesday', contentType: 'Video (Reel/Short)', idea: 'Show a "behind-the-scenes" look at your workspace or product creation process.', hashtags: ['#BehindTheScenes', '#DayInTheLife'], tips: 'Use trending audio to increase reach, but make sure it fits your brand voice.' },
    { day: 'Wednesday', contentType: 'Engagement Post', idea: 'Ask a "This or That" question related to your audience\'s interests.', hashtags: ['#ThisOrThat', '#CommunityPoll'], tips: 'Create a simple graphic with two clear choices. Respond to every comment to boost engagement.' },
    { day: 'Thursday', contentType: 'Testimonial/UGC', idea: 'Share a positive customer review or user-generated content. Tag the user!', hashtags: ['#CustomerLove', '#HappyClient'], tips: 'Create a branded template for testimonials to maintain a consistent look.' },
    { day: 'Friday', contentType: 'Value-Driven Post', idea: 'Share a quick tip or resource that solves a small problem for your audience.', hashtags: ['#FridayFeeling', '#QuickTip'], tips: 'Link to a more in-depth blog post or resource on your website to drive traffic.' },
    { day: 'Saturday', contentType: 'Personal Story', idea: 'Share a story about a challenge you overcame in your business journey.', hashtags: ['#FounderStory', '#EntrepreneurLife'], tips: 'Be authentic and vulnerable. People connect with stories, not just products.' },
    { day: 'Sunday', contentType: 'Weekly Roundup/Preview', idea: 'Recap the week\'s highlights and give a sneak peek of what\'s coming next week.', hashtags: ['#WeeklyWrapUp', '#ComingSoon'], tips: 'Use this to build anticipation and encourage followers to tune in.' },
  ];

  const nextWeekContentIdeas: ContentIdea[] = [
    { day: 'Monday', contentType: 'Industry News/Trend', idea: 'React to a trending topic in your industry with your expert perspective.', hashtags: ['#TrendingNow', `#${data.industry.replace(/\s/g, '')}News`], tips: 'Add your unique take on industry news to position yourself as a thought leader.' },
    { day: 'Tuesday', contentType: 'Tutorial Video', idea: 'Create a step-by-step tutorial solving a common problem your audience faces.', hashtags: ['#TutorialTuesday', '#HowTo'], tips: 'Keep it under 60 seconds for maximum engagement. Save longer tutorials for YouTube.' },
    { day: 'Wednesday', contentType: 'Q&A Session', idea: 'Answer frequently asked questions from your community or DMs.', hashtags: ['#QandA', '#AskMeAnything'], tips: 'Use question stickers in Stories to collect questions beforehand.' },
    { day: 'Thursday', contentType: 'Before/After', idea: 'Show transformation results, project evolution, or process improvements.', hashtags: ['#Transformation', '#BeforeAndAfter'], tips: 'Visual proof of results is powerful social proof for your expertise.' },
    { day: 'Friday', contentType: 'Fun/Light Content', idea: 'Share a funny meme, office pet, or team celebration related to your brand.', hashtags: ['#FridayFun', '#TeamLife'], tips: 'Humanize your brand with lighter content that still aligns with your voice.' },
    { day: 'Saturday', contentType: 'Client Spotlight', idea: 'Feature a client success story or collaborative project in detail.', hashtags: ['#ClientSpotlight', '#SuccessStory'], tips: 'Get permission first and tag the client for mutual benefit and reach.' },
    { day: 'Sunday', contentType: 'Goal Setting/Planning', idea: 'Share your goals for the upcoming week and ask followers about theirs.', hashtags: ['#GoalSetting', '#WeeklyPlanning'], tips: 'Create accountability and community by encouraging interaction around shared goals.' },
  ];

  const tools = [];
  if (budget > 15 || data.automationPreference.includes('automation')) {
    tools.push('Buffer ($15/month): Best for affordability and straightforward scheduling across multiple platforms.');
  } else {
    tools.push('Meta Business Suite (Free): Native scheduler for Facebook and Instagram. Perfect for starting out.');
  }

  if (data.contentTypes.includes('Photos') || data.contentTypes.includes('Videos')) {
    tools.push('Canva Pro ($13/month): Essential for creating professional graphics, videos, and brand kits with ease.');
  }

  if (data.contentTypes.includes('Videos')) {
    tools.push('CapCut (Free): Powerful mobile video editor with trending effects and easy-to-use interface.');
  }

  const strategicChanges = [];
  if (data.currentPlatforms.length > 0 && data.currentPlatforms[0] !== 'None currently') {
    strategicChanges.push(`Audit your current platforms (${data.currentPlatforms.join(', ')}): Are they aligning with your primary goal of '${data.primaryGoals[0]}'? If not, consider pausing activity on lower-performing platforms to focus on the recommended ones.`);
    strategicChanges.push('Refresh your bio/profile on all active platforms to ensure it clearly states your value proposition and includes a single, clear call-to-action.');
  } else {
    strategicChanges.push('Since you\'re starting fresh, focus on setting up just 1-2 of the high-priority platforms first. Don\'t spread yourself too thin.');
  }

  const trendingTips = [
    'For Reels/TikTok: Check the "Add Audio" section and look for songs with an arrow icon, indicating they are trending. Spend 10 minutes daily scrolling your "For You" page to spot emerging trends.',
    'For LinkedIn/Twitter: Use the "Explore" or "Trending" tabs to see what topics are currently being discussed in your industry. Participate in relevant conversations.',
    'Set up Google Alerts for keywords related to your industry to stay on top of news and create timely content.'
  ];

  const hashtagStrategy = [
    'Use a mix of 5-10 hashtags per post: 2-3 broad industry tags (e.g., #DigitalMarketing), 3-4 niche-specific tags (e.g., #SmallBizSEO), and 2-3 branded or campaign-specific tags (e.g., #AmazStrategy).',
    'Create and save hashtag groups for different content themes to save time.',
    'Don\'t use the same block of hashtags on every post. Tailor them to the specific content.'
  ];
  
  const budgetRecommendation = () => {
    if (budget === 0) return 'Organic Focus: Concentrate 100% of your effort on creating high-quality, engaging content and building a community organically. Your time is your biggest investment.';
    if (budget < 500) return `Bootstrap Growth ($${budget}/month): Allocate 70% to content boosting (promoting your best-performing posts to a wider audience) and 30% to essential tools like Canva Pro.`;
    return `Balanced Growth ($${budget}/month): Allocate 50% to targeted ads (for lead gen or traffic), 30% to content boosting, and 20% to premium tools for analytics and automation.`;
  }

  const offerRefinements = [];
  if (data.currentOffers && data.currentOffers.trim().length > 0) {
    offerRefinements.push('Add a Clear Call-to-Action (CTA): Ensure every post promoting an offer tells the audience exactly what to do next (e.g., "Click the link in bio," "DM us the word \'STRATEGY\'").');
    offerRefinements.push('Introduce Urgency or Scarcity: Add elements like "Limited spots available" or "Offer ends Friday" to encourage immediate action.');
    offerRefinements.push('Enhance Value with a Bonus: Can you add a small, valuable bonus to your main offer? (e.g., a free checklist, a short video tutorial).');
  } else {
    offerRefinements.push('Create a "Tripwire" Offer: Develop a low-cost, high-value introductory offer (e.g., a $7 guide, a $27 mini-workshop) to convert followers into customers more easily.');
    offerRefinements.push('Promote a Lead Magnet: Offer a free, valuable resource (like a PDF guide, webinar, or email course) in exchange for an email address to build your list.');
  }
  
  const thirtyDayGoalFocus = data.thirtyDayGoal && data.thirtyDayGoal.trim().length > 0
    ? `Your primary focus for the next 30 days is to **${data.thirtyDayGoal}**. This strategy is specifically designed to help you achieve that objective through targeted content and platform selection.`
    : 'Your strategy is designed for balanced growth across brand awareness and community building. For a more focused plan, consider setting a specific, measurable 30-day goal next time.';

  return {
    name: data.name,
    businessName: data.businessName,
    platforms: recommendedPlatforms,
    thirtyDayGoalFocus,
    postingSchedule: [
      { platform: 'Primary Platform', frequency: '3-5 times/week', contentTypes: ['Mix of video, carousels, and single images'], bestTimes: 'Varies by platform, check insights' }
    ],
    contentThemes: ['Educational', 'Behind-the-Scenes', 'Community Building', 'Promotional'],
    weeklyContentIdeas,
    nextWeekContentIdeas,
    tools: tools.slice(0, 3),
    budgetRecommendation: budgetRecommendation(),
    offerRefinements,
    strategicChanges,
    trendingTips,
    hashtagStrategy,
    nextSteps: ['Define your content pillars based on the themes.', 'Create a content calendar for the first month.', 'Set up your recommended tools.', 'Review analytics weekly.'],
  };
}
