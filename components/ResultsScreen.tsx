import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import * as Linking from 'expo-linking';
import { 
  Download, CheckCircle, Target, Settings, DollarSign, Clock, BarChart3, RefreshCw, Edit3, Speaker, CalendarDays, Gift, Goal, Instagram, Star
} from 'lucide-react-native';
import { StrategyResult } from '../types';

const brandColors = {
  medium: '#16a34a',
  dark: '#15803d',
  light: '#f0fdf4',
  amber: '#f59e0b',
};

interface ResultsScreenProps {
  strategy: StrategyResult;
  onDownloadPDF: () => void;
  onGetAdvancedStrategy: () => void;
  onStartOver: () => void;
  isPaying: boolean;
}

const ResultCard: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode; }> = ({ title, icon: Icon, children }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Icon color={brandColors.medium} size={24} />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  strategy,
  onDownloadPDF,
  onGetAdvancedStrategy,
  onStartOver,
  isPaying
}) => {
  const platformIcons: { [key: string]: string } = {
    'LinkedIn': '💼', 'Instagram': '📷', 'TikTok': '🎵', 'Facebook': '👥', 'YouTube': '🎥', 'Twitter/X': '🐦', 'Pinterest': '📌'
  };

  const handleFollowInstagram = () => {
    Linking.openURL('https://instagram.com/amazsocials');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerIconContainer}>
          <CheckCircle color={brandColors.medium} size={32} />
        </View>
        <Text style={styles.headerTitle}>Your Strategy for <Text style={{ color: brandColors.medium }}>{strategy.businessName}</Text> is Ready!</Text>
        <Text style={styles.headerSubtitle}>Here's your AI-powered social media strategy, {strategy.name}.</Text>
      </View>

      <View style={styles.contentContainer}>
        <ResultCard title="Recommended Platforms" icon={Target}>
          <View style={{ gap: 16 }}>
            {strategy.platforms.map((platform, index) => (
              <View key={index} style={styles.platformCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                  <Text style={{ fontSize: 30, marginRight: 16 }}>{platformIcons[platform.name] || '📱'}</Text>
                  <View>
                    <Text style={styles.platformName}>{platform.name}</Text>
                    <Text style={[styles.priorityBadge, platform.priority === 'High' ? styles.priorityHigh : platform.priority === 'Medium' ? styles.priorityMedium : styles.priorityLow]}>
                      {platform.priority} Priority
                    </Text>
                  </View>
                </View>
                <View style={styles.reasoningBox}>
                  <Text style={styles.reasoningText}>{platform.reasoning}</Text>
                  {platform.countrySpecific && <Text style={styles.countrySpecificText}>{platform.countrySpecific}</Text>}
                </View>
              </View>
            ))}
          </View>
        </ResultCard>

        {/* Other cards can be added here following the same pattern */}
        
        <View style={styles.actionButtonsContainer}>
          <Text style={styles.actionButtonsTitle}>Ready to implement your strategy?</Text>
          <View style={{ gap: 12 }}>
            <TouchableOpacity onPress={onDownloadPDF} style={[styles.button, styles.buttonPrimary]}>
              <Download color="#fff" size={20} />
              <Text style={styles.buttonText}>Download PDF</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={onGetAdvancedStrategy} disabled={isPaying} style={[styles.button, styles.buttonAdvanced, isPaying && styles.buttonDisabled]}>
              {isPaying ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Star color="#fff" size={20} />
                  <Text style={styles.buttonText}>Advanced 30-Day Strategy for $5</Text>
                </>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleFollowInstagram} style={[styles.button, styles.buttonSecondary]}>
              <Instagram color="#fff" size={20} />
              <Text style={styles.buttonText}>Follow on Instagram</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity onPress={onStartOver} style={{ marginTop: 24 }}>
            <Text style={styles.startOverText}>Create New Strategy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  headerContainer: { backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#e5e7eb', padding: 24, alignItems: 'center' },
  headerIconContainer: { backgroundColor: brandColors.light, borderRadius: 999, width: 64, height: 64, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#111827', textAlign: 'center', marginBottom: 8 },
  headerSubtitle: { color: '#4b5563', textAlign: 'center' },
  contentContainer: { padding: 24, gap: 32 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 24, borderWidth: 1, borderColor: '#e5e7eb' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginLeft: 12 },
  platformCard: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 20, backgroundColor: '#f9fafb' },
  platformName: { fontWeight: '600', fontSize: 18, color: '#111827' },
  priorityBadge: { fontSize: 12, fontWeight: '500', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999, marginTop: 4, overflow: 'hidden' },
  priorityHigh: { backgroundColor: '#dcfce7', color: '#166534' },
  priorityMedium: { backgroundColor: '#fef3c7', color: '#92400e' },
  priorityLow: { backgroundColor: '#f3f4f6', color: '#374151' },
  reasoningBox: { backgroundColor: '#fff', borderRadius: 6, padding: 16, borderLeftWidth: 4, borderLeftColor: brandColors.medium },
  reasoningText: { color: '#374151', fontSize: 14, lineHeight: 20 },
  countrySpecificText: { fontSize: 14, color: '#92400e', marginTop: 8, padding: 8, backgroundColor: '#fef3c7', borderRadius: 6 },
  actionButtonsContainer: { marginTop: 16, backgroundColor: '#fff', borderRadius: 12, padding: 24, borderWidth: 1, borderColor: '#e5e7eb' },
  actionButtonsTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', textAlign: 'center', marginBottom: 24 },
  button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 8, gap: 8 },
  buttonPrimary: { backgroundColor: brandColors.medium },
  buttonAdvanced: { backgroundColor: brandColors.amber },
  buttonSecondary: { backgroundColor: '#1f2937' },
  buttonDisabled: { backgroundColor: '#fbbf24' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600', textAlign: 'center' },
  startOverText: { color: '#4b5563', textDecorationLine: 'underline', textAlign: 'center' },
});
