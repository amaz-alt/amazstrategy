import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { StrategyResult, AdvancedStrategyResult } from '../types';

const generateHtmlForPdf = (strategy: StrategyResult | AdvancedStrategyResult, isAdvanced: boolean): string => {
  const s = strategy as any;
  const title = isAdvanced ? 'Advanced 30-Day Strategy' : 'Social Media Strategy';
  
  let body = `<h1>${title} for ${s.businessName}</h1>`;

  if (isAdvanced) {
    const adv = s as AdvancedStrategyResult;
    body += '<h2>Weekly Summaries</h2>';
    adv.weeklySummaries.forEach(week => {
      body += `<p><b>Week ${week.week}: ${week.goal}</b><br/>KPI: ${week.priorityKPI} | Milestone: ${week.expectedMilestone}</p>`;
    });
    body += '<h2>Daily Action Plan</h2>';
    adv.dailyPlan.forEach(day => {
      body += `<div class="day-card">
        <h4>Day ${day.day}: ${day.taskTitle}</h4>
        <p>Time: ${day.estimatedTime} | Priority: ${day.priority}</p>
        <p>Brief: ${day.contentBrief.format} - "${day.contentBrief.hookLine}"</p>
      </div>`;
    });
  } else {
    const basic = s as StrategyResult;
    body += '<h2>Recommended Platforms</h2>';
    basic.platforms.forEach(p => {
      body += `<div><h3>${p.name} (${p.priority})</h3><p>${p.reasoning}</p></div>`;
    });
    body += '<h2>This Week\'s Content Plan</h2>';
    basic.weeklyContentIdeas.forEach(idea => {
      body += `<p><b>${idea.day}:</b> ${idea.idea}</p>`;
    });
  }

  return `
    <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 20px; }
          h1 { color: #16a34a; }
          h2 { border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-top: 20px; }
          .day-card { border: 1px solid #eee; padding: 10px; margin-bottom: 10px; border-radius: 5px; }
        </style>
      </head>
      <body>
        ${body}
      </body>
    </html>
  `;
};

const createAndSharePdf = async (html: string, fileName: string) => {
  try {
    const { uri } = await Print.printToFileAsync({ html });
    const pdfName = `${FileSystem.documentDirectory}${fileName}`;
    await FileSystem.moveAsync({
      from: uri,
      to: pdfName,
    });
    
    await Sharing.shareAsync(pdfName, {
      mimeType: 'application/pdf',
      dialogTitle: 'Share your strategy',
    });
  } catch (error) {
    console.error('Failed to create and share PDF:', error);
    alert('Could not generate PDF.');
  }
};

export async function generatePDF(strategy: StrategyResult): Promise<void> {
  const html = generateHtmlForPdf(strategy, false);
  await createAndSharePdf(html, `${strategy.businessName}-strategy.pdf`);
}

export async function generateAdvancedPDF(strategy: AdvancedStrategyResult): Promise<void> {
  const html = generateHtmlForPdf(strategy, true);
  await createAndSharePdf(html, `${strategy.businessName}-advanced-strategy.pdf`);
}
