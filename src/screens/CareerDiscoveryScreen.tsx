import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import AmbientBackground from '../components/AmbientBackground';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import { Colors } from '../theme/colors';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigations';

type Props = NativeStackScreenProps<RootStackParamList, 'CareerDiscovery'>;

const FALLBACK_CAREER = {
  id: 1,
  title: 'React Native Developer',
  emoji: '📱',
  color: '#53B8FF',
  level: 'Intermediate',
  duration: '4-6 months',
  salaryRange: '$1.8k - $4.5k',
  demand: 94,
  skills: ['JavaScript', 'React', 'React Native', 'Native APIs', 'UI Performance'],
  description: 'Build stunning iOS and Android apps from one codebase with polished mobile experiences.',
  roadmap: [
    'Master JavaScript fundamentals',
    'Learn React deeply',
    'Build reusable mobile components',
    'Connect APIs and local storage',
    'Publish a portfolio app',
  ],
};

export default function CareerDiscoveryScreen({ route, navigation }: Props) {
  const career = route.params?.career || FALLBACK_CAREER;

  const suggestedJobs = career.title.includes('React')
    ? 4
    : career.title.includes('Design')
    ? 2
    : career.title.includes('Data')
    ? 2
    : 3;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />
      <AmbientBackground />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Career Roadmap</Text>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.navigate('Recommendation')}
          >
            <Text style={styles.share}>⚡</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.hero, { backgroundColor: career.color }]}>
          <View style={styles.heroBubble} />
          <Text style={styles.heroEmoji}>{career.emoji || '📱'}</Text>
          <Text style={styles.heroTitle}>{career.title}</Text>
          <Text style={styles.heroDesc}>{career.description}</Text>

          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Text style={styles.heroValue}>{career.duration}</Text>
              <Text style={styles.heroLabel}>Study time</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={styles.heroValue}>{career.demand}%</Text>
              <Text style={styles.heroLabel}>Demand score</Text>
            </View>
          </View>
        </View>

        <GlassCard style={{ marginBottom: 18 }}>
          <Text style={styles.salaryLabel}>Expected monthly salary</Text>
          <Text style={[styles.salaryValue, { color: career.color }]}>
            {career.salaryRange}
          </Text>
          <Text style={styles.salaryNote}>
            Estimated based on junior to mid-level opportunities and modern Sri Lanka & Remote market demand.
          </Text>
        </GlassCard>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills to learn</Text>
          <View style={styles.skillsWrap}>
            {career.skills.map((skill: string) => (
              <View
                key={skill}
                style={[styles.skillPill, { backgroundColor: `${career.color}22` }]}
              >
                <Text style={[styles.skillText, { color: career.color }]}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Step-by-Step Roadmap</Text>
          {career.roadmap.map((step: string, index: number) => (
            <GlassCard key={step} style={styles.stepCard}>
              <View style={styles.stepRow}>
                <View style={[styles.stepNumber, { backgroundColor: career.color }]}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.stepTitle}>{step}</Text>
                  <Text style={styles.stepBody}>
                    Complete this step and turn it into a visible proof-of-work project for your portfolio.
                  </Text>
                </View>
              </View>
            </GlassCard>
          ))}
        </View>

        <GlassCard style={{ marginBottom: 18 }}>
          <Text style={styles.matchTitle}>{suggestedJobs} active job openings</Text>
          <Text style={styles.matchBody}>
            Find active hiring roles tailored to this career path and apply immediately.
          </Text>
        </GlassCard>

        <GradientButton
          title="Browse Matching Roles"
          onPress={() => navigation.navigate('FindJobs')}
        />

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 20, paddingBottom: 30 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    alignItems: 'center',
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  backText: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '900',
  },
  share: {
    color: Colors.cyan,
    fontSize: 18,
    fontWeight: '900',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '900',
  },
  hero: {
    borderRadius: 28,
    padding: 22,
    overflow: 'hidden',
    marginBottom: 18,
  },
  heroBubble: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.16)',
    right: -40,
    top: -40,
  },
  heroEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  heroTitle: {
    color: Colors.white,
    fontSize: 26,
    fontWeight: '900',
  },
  heroDesc: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },
  heroStats: {
    flexDirection: 'row',
    marginTop: 18,
  },
  heroStat: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 16,
    padding: 12,
    marginRight: 8,
  },
  heroValue: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '900',
  },
  heroLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 11,
    marginTop: 2,
    fontWeight: '700',
  },
  salaryLabel: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  salaryValue: {
    fontSize: 28,
    fontWeight: '900',
    marginTop: 4,
  },
  salaryNote: {
    color: Colors.textSoft,
    fontSize: 12,
    marginTop: 6,
    lineHeight: 18,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 10,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 6,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 12,
    fontWeight: '900',
  },
  stepCard: {
    marginBottom: 10,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  stepNumberText: {
    color: Colors.white,
    fontWeight: '900',
    fontSize: 13,
  },
  stepTitle: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  stepBody: {
    color: Colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
  },
  matchTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '900',
  },
  matchBody: {
    color: Colors.textSoft,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
});
