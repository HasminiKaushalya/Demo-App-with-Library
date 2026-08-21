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

export default function HomeChoiceScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />
      <AmbientBackground />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <View>
            <Text style={styles.appName}>CareerPlus</Text>
            <Text style={styles.sub}>Choose your beautiful next step</Text>
          </View>

          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('SavedJobs')}>
            <Text style={styles.iconText}>♥</Text>
          </TouchableOpacity>
        </View>

        <GlassCard style={styles.hero}>
          <Text style={styles.heroEmoji}></Text>
          <Text style={styles.heroTitle}>Luxury career discovery for modern talent</Text>
          <Text style={styles.heroBody}>
            Explore dream careers, compare salaries, and find eye-catching job opportunities in one premium experience.
          </Text>

          <View style={styles.quickRow}>
            <View style={styles.quickStat}>
              <Text style={styles.quickValue}>1.2K+</Text>
              <Text style={styles.quickLabel}>Open roles</Text>
            </View>
            <View style={styles.quickStat}>
              <Text style={styles.quickValue}>18+</Text>
              <Text style={styles.quickLabel}>Career paths</Text>
            </View>
            <View style={styles.quickStat}>
              <Text style={styles.quickValue}>200+</Text>
              <Text style={styles.quickLabel}>Companies</Text>
            </View>
          </View>
        </GlassCard>

        <TouchableOpacity
          activeOpacity={0.92}
          onPress={() => navigation.navigate('ExploreCareers')}
        >
          <GlassCard style={styles.choiceCard}>
            <Text style={styles.choiceEmoji}></Text>
            <Text style={styles.choiceTitle}>Explore Careers</Text>
            <Text style={styles.choiceText}>
              Discover role roadmaps, skills, salary ranges and future demand.
            </Text>
            <Text style={styles.choiceLink}>Start exploring →</Text>
          </GlassCard>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.92}
          onPress={() => navigation.navigate('FindJobs')}
        >
          <GlassCard style={styles.choiceCard}>
            <Text style={styles.choiceEmoji}></Text>
            <Text style={styles.choiceTitle}>Find Jobs</Text>
            <Text style={styles.choiceText}>
              Browse premium job cards, save favorites and apply confidently.
            </Text>
            <Text style={styles.choiceLink}>Find roles →</Text>
          </GlassCard>
        </TouchableOpacity>

        <GradientButton
          title="Continue to job search"
          icon="⚡"
          onPress={() => navigation.navigate('FindJobs')}
          style={{ marginTop: 6 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 20, paddingBottom: 40 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
    alignItems: 'center',
  },
  appName: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  sub: {
    color: Colors.textSoft,
    marginTop: 3,
    fontSize: 13,
  },
  iconBtn: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconText: {
    color: Colors.pink,
    fontSize: 22,
  },
  hero: {
    marginBottom: 18,
  },
  heroEmoji: {
    fontSize: 36,
    marginBottom: 10,
  },
  heroTitle: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
  },
  heroBody: {
    color: Colors.textSoft,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
  },
  quickRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  quickStat: {
    flex: 1,
    padding: 12,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.07)',
    marginRight: 10,
  },
  quickValue: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '900',
  },
  quickLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 3,
  },
  choiceCard: {
    marginBottom: 16,
  },
  choiceEmoji: {
    fontSize: 32,
    marginBottom: 10,
  },
  choiceTitle: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '900',
  },
  choiceText: {
    color: Colors.textSoft,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  choiceLink: {
    color: Colors.cyan,
    fontSize: 14,
    fontWeight: '900',
    marginTop: 16,
  },
});