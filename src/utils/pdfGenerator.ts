import jsPDF from 'jspdf';
import { StrategyResult, AdvancedStrategyResult } from '../types';

let currentY = 20;
const margin = 20;
const pageHeight = 297; // A4 height

const checkAndAddPage = (pdf: jsPDF, requiredHeight: number) => {
  if (currentY + requiredHeight > pageHeight - margin) {
    pdf.addPage();
    currentY = margin;
  }
};

const addTitle = (pdf: jsPDF, text: string, fontSize = 14, color = '#111827') => {
  checkAndAddPage(pdf, 15);
  pdf.setFontSize(fontSize);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(color);
  pdf.text(text, margin, currentY);
  currentY += 10;
};

const addText = (pdf: jsPDF, text: string, fontSize = 10, isBold = false) => {
  const lines = pdf.splitTextToSize(text, 210 - 2 * margin);
  const requiredHeight = lines.length * fontSize * 0.4;
  checkAndAddPage(pdf, requiredHeight);
  pdf.setFontSize(fontSize);
  pdf.setFont(undefined, isBold ? 'bold' : 'normal');
  pdf.setTextColor('#374151');
  pdf.text(lines, margin, currentY);
  currentY += requiredHeight + 2;
};


export function generatePDF(strategy: StrategyResult): void {
  const pdf = new jsPDF();
  currentY = 20;

  pdf.text(`Strategy for ${strategy.businessName}`, margin, currentY);
  currentY += 20;
  
  strategy.platforms.forEach(p => {
    addTitle(pdf, p.name, 12);
    addText(pdf, p.reasoning);
  });
  
  pdf.save(`${strategy.businessName}-social-media-strategy.pdf`);
}

export function generateAdvancedPDF(strategy: AdvancedStrategyResult): void {
  const pdf = new jsPDF();
  currentY = 20;

  // Header
  pdf.setFillColor(245, 158, 11); // amber-500
  pdf.rect(0, 0, 210, 30, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(22);
  pdf.setFont(undefined, 'bold');
  pdf.text('Advanced 30-Day Strategy', margin, 18);
  pdf.setFontSize(12);
  pdf.text(`For: ${strategy.businessName}`, margin, 25);
  currentY = 40;

  // Weekly Summaries
  addTitle(pdf, 'Weekly Summaries');
  strategy.weeklySummaries.forEach(week => {
    addText(pdf, `Week ${week.week}: ${week.goal}`, 10, true);
    addText(pdf, `KPI: ${week.priorityKPI} | Milestone: ${week.expectedMilestone} | Ad Spend: ${week.adSpend}`);
    currentY += 2;
  });

  // Daily Plan
  addTitle(pdf, 'Daily Action Plan');
  strategy.dailyPlan.forEach(day => {
    checkAndAddPage(pdf, 25);
    pdf.setFillColor(254, 252, 232); // yellow-50
    pdf.rect(margin, currentY - 4, 170, 22, 'F');
    addText(pdf, `Day ${day.day}: ${day.taskTitle}`, 11, true);
    addText(pdf, `Time: ${day.estimatedTime} | Priority: ${day.priority} | Track: ${day.measurementMetric}`);
    addText(pdf, `Brief: ${day.contentBrief.format} - "${day.contentBrief.hookLine}"`);
    addText(pdf, `CTA: "${day.cta}"`);
    currentY += 5;
  });

  // Ad Plan
  addTitle(pdf, 'Ad Plan');
  addText(pdf, `Viability: ${strategy.adPlan.isViable ? 'Recommended' : 'Not Recommended'}`, 10, true);
  addText(pdf, strategy.adPlan.viabilityReasoning);
  addText(pdf, `Budget: ${strategy.adPlan.budgetBand} (~$${strategy.adPlan.dailyBudget}/day)`);
  addText(pdf, `KPI Targets: ${strategy.adPlan.kpiTargets}`);
  currentY += 5;
  
  // Templates
  addTitle(pdf, 'Content Templates');
  strategy.contentTemplates.forEach(template => {
    addText(pdf, `${template.title} (${template.type})`, 10, true);
    addText(pdf, template.template);
    currentY += 3;
  });

  pdf.save(`${strategy.businessName}-advanced-strategy.pdf`);
}
