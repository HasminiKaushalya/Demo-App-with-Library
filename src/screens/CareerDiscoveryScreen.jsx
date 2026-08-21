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
import careers from '../data/careers';
import { Colors } from '../theme/colors';

export default function CareerDiscoveryScreen({ route, navigation }) {
  const career = route.params?.career || careers[0];

  const suggestedJobs = career.title.includes('React')
    ? 4
    : career.title.includes('Design')
    ? 2
    : career.title.includes('Data')
    ? 1
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
          <Text style={styles.headerTitle}>Career Discovery</Text>
          <View style={styles.backBtn}>
            <Text style={styles.share}>↗</Text>
          </View>
        </View>

        <View style={[styles.hero, { backgroundColor: career.color }]}>
          <View style={styles.heroBubble} />
          <Text style={styles.heroEmoji}>{career.emoji}</Text>
          <Text style={styles.heroTitle}>{career.title}</Text>
          <Text style={styles.heroDesc}>{career.description}</Text>

          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Text style={styles.heroValue}>{career.duration}</Text>
              <Text style={styles.heroLabel}>Study time</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={styles.heroValue}>{career.demand}%</Text>
              <Text style={styles.heroLabel}>Demand</Text>
            </View>
          </View>
        </View>

        <GlassCard style={{ marginBottom: 20 }}>
          <Text style={styles.salaryLabel}>Expected monthly salary</Text>
          <Text style={[styles.salaryValue, { color: career.color }]}>
            {career.salaryRange}
          </Text>
          <Text style={styles.salaryNote}>
            Estimated based on junior to mid-level opportunities and modern market demand.
          </Text>
        </GlassCard>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills to learn</Text>
          <View style={styles.skillsWrap}>
            {career.skills.map(skill => (
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
          <Text style={styles.sectionTitle}>Roadmap</Text>
          {career.roadmap.map((step, index) => (
            <GlassCard key={step} style={styles.stepCard}>
              <View style={styles.stepRow}>
                <View style={[styles.stepNumber, { backgroundColor: career.color }]}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.stepTitle}>{step}</Text>
                  <Text style={styles.stepBody}>
                    Complete this step and turn it into a visible proof project for your portfolio.
                  </Text>
                </View>
              </View>
            </GlassCard>
          ))}
        </View>

        <GlassCard style={{ marginBottom: 18 }}>
          <Text style={styles.matchTitle}>{suggestedJobs} matching jobs found</Text>
          <Text style={styles.matchBody}>
            Jump into premium job browsing and find roles related to this career path.
          </Text>
        </GlassCard>

        <GradientButton
          title="Go to matching jobs"
          icon="✨"
          onPress={() => navigation.navigate('FindJobs')}
        />

        <View style={{ height: 80 }} />
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
    borderRadius: 30,
    padding: 22,
    overflow: 'hidden',
    marginBottom: 20,
  },
  heroBubble: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.16)',
    right: -40,
    top: -40,
  },
  heroEmoji: {
    fontSize: 44,
    marginBottom: 12,
  },
  heroTitle: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: '900',
  },
  heroDesc: {
    color: 'rgba(255,255,255,0.84)',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
  },
  heroStats: {
    flexDirection: 'row',
    marginTop: 20,
  },
  heroStat: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: 18,
    padding: 14,
    marginRight: 10,
  },
  heroValue: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  heroLabel: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 11,
    marginTop: 3,
    fontWeight: '700',
  },
  salaryLabel: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  salaryValue: {
    fontSize: 30,
    fontWeight: '900',
    marginTop: 6,
  },
  salaryNote: {
    color: Colors.textSoft,
    fontSize: 13,
    marginTop: 8,
    lineHeight: 19,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 13,
    fontWeight: '900',
  },
  stepCard: {
    marginBottom: 12,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: Colors.white,
    fontWeight: '900',
  },
  stepTitle: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  stepBody: {
    color: Colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  matchTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '900',
  },
  matchBody: {
    color: Colors.textSoft,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
});