import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ArrowLeft, Download, Zap, BarChart3, Repeat, Settings, AlertTriangle } from 'lucide-react-native';
import { AdvancedStrategyResult, DailyAction } from '../types';

const brandColors = {
  amber: '#f59e0b',
  amberLight: '#fffbeb',
};

interface AdvancedStrategyScreenProps {
  strategy: AdvancedStrategyResult;
  onBack: () => void;
  onDownloadPDF: () => void;
}

const DailyActionCard: React.FC<{ action: DailyAction }> = ({ action }) => {
  const priorityColors = {
    High: { bg: '#fee2e2', text: '#991b1b' },
    Medium: { bg: '#fef3c7', text: '#92400e' },
    Low: { bg: '#dcfce7', text: '#166534' },
  };
  const priorityStyle = priorityColors[action.priority];

  return (
    <View style={styles.dailyCard}>
      <View style={styles.dailyCardDay}>
        <Text style={styles.dailyCardDayText}>DAY</Text>
        <Text style={styles.dailyCardDayNumber}>{action.day}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Text style={styles.dailyCardTitle}>{action.taskTitle}</Text>
          <Text style={[styles.priorityBadge, { backgroundColor: priorityStyle.bg, color: priorityStyle.text }]}>{action.priority}</Text>
        </View>
        <Text style={styles.dailyCardMeta}>Time: {action.estimatedTime} | By: {action.assignedTo}</Text>
        <Text style={styles.dailyCardDetails}>Brief: {action.contentBrief.format} - "{action.contentBrief.hookLine}"</Text>
        <Text style={styles.dailyCardDetails}>CTA: "{action.cta}"</Text>
        <Text style={styles.dailyCardDetails}>Track: {action.measurementMetric}</Text>
      </View>
    </View>
  );
};

export const AdvancedStrategyScreen: React.FC<AdvancedStrategyScreenProps> = ({ strategy, onBack, onDownloadPDF }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft size={20} color="#4b5563" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Advanced 30-Day Strategy</Text>
        <TouchableOpacity onPress={onDownloadPDF} style={styles.downloadButton}>
          <Download size={16} color="#fff" />
          <Text style={styles.downloadButtonText}>PDF</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainHeader}>
          <View style={styles.mainHeaderIcon}>
            <Zap size={32} color={brandColors.amber} />
          </View>
          <Text style={styles.mainHeaderTitle}>Your Plan for <Text style={{ color: brandColors.amber }}>{strategy.businessName}</Text></Text>
          {strategy.wasEstimated && (
            <View style={styles.estimationWarning}>
              <AlertTriangle size={16} color="#b45309" />
              <Text style={styles.estimationWarningText}>Some answers were estimated.</Text>
            </View>
          )}
        </View>

        {/* Simplified view. A tabbed view can be implemented for better UX */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Action Plan</Text>
          <View style={{ gap: 12 }}>
            {strategy.dailyPlan.slice(0, 5).map((day) => <DailyActionCard key={day.day} action={day} />)}
            <Text style={styles.moreInfoText}>Full 30-day plan available in the downloaded PDF.</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#e5e7eb', paddingHorizontal: 16, paddingVertical: 12 },
  backButton: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  backButtonText: { color: '#4b5563', fontWeight: '500' },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  downloadButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#16a34a', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, gap: 8 },
  downloadButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  scrollContainer: { padding: 24, paddingBottom: 48 },
  mainHeader: { alignItems: 'center', marginBottom: 24 },
  mainHeaderIcon: { width: 64, height: 64, borderRadius: 32, backgroundColor: brandColors.amberLight, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  mainHeaderTitle: { fontSize: 24, fontWeight: 'bold', color: '#111827', textAlign: 'center' },
  estimationWarning: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fef3c7', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, marginTop: 8, gap: 4 },
  estimationWarningText: { color: '#b45309', fontSize: 12, fontWeight: '500' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
  dailyCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e5e7eb', gap: 16 },
  dailyCardDay: { width: 64, height: 64, borderRadius: 8, backgroundColor: brandColors.amber, justifyContent: 'center', alignItems: 'center' },
  dailyCardDayText: { color: '#fff', fontSize: 12, opacity: 0.8 },
  dailyCardDayNumber: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  dailyCardTitle: { flex: 1, fontSize: 16, fontWeight: 'bold', color: '#111827' },
  priorityBadge: { fontSize: 10, fontWeight: 'bold', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, overflow: 'hidden' },
  dailyCardMeta: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  dailyCardDetails: { fontSize: 14, color: '#374151', marginTop: 8 },
  moreInfoText: { textAlign: 'center', color: '#6b7280', fontStyle: 'italic', marginTop: 16 },
});
