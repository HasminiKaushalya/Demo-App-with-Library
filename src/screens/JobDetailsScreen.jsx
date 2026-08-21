import React, { useState } from 'react';
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

export default function JobDetailsScreen({ route, navigation }) {
  const { job } = route.params;
  const [saved, setSaved] = useState(job.isSaved || false);
  const [applied, setApplied] = useState(false);

  const typeColor =
    job.type === 'Full-time'
      ? { bg: Colors.successSoft, text: Colors.success }
      : job.type === 'Contract'
      ? { bg: Colors.warningSoft, text: Colors.warning }
      : { bg: Colors.infoSoft, text: Colors.info };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />
      <AmbientBackground />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.headerBtnText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Job Details</Text>

        <TouchableOpacity style={styles.headerBtn} onPress={() => setSaved(!saved)}>
          <Text style={[styles.headerBtnText, saved && { color: Colors.pink }]}>
            {saved ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <GlassCard style={styles.heroCard}>
          <View style={[styles.logoWrap, { backgroundColor: `${job.color}22` }]}>
            <View style={[styles.logoInner, { backgroundColor: job.color }]}>
              <Text style={styles.logoText}>{job.company.charAt(0)}</Text>
            </View>
          </View>

          <Text style={styles.company}>{job.company}</Text>
          <Text style={styles.position}>{job.position}</Text>

          <View style={styles.pills}>
            <View style={[styles.pill, { backgroundColor: typeColor.bg }]}>
              <Text style={[styles.pillText, { color: typeColor.text }]}>{job.type}</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillText}>{job.location}</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{job.salary}</Text>
              <Text style={styles.statLabel}>Per month</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{job.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{job.applicants}</Text>
              <Text style={styles.statLabel}>Applied</Text>
            </View>
          </View>
        </GlassCard>

        <GlassCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>About the role</Text>
          <Text style={styles.body}>{job.description}</Text>
        </GlassCard>

        <GlassCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Skills needed</Text>
          <View style={styles.tagsWrap}>
            {job.tags.map(tag => (
              <View key={tag} style={[styles.tag, { borderColor: `${job.color}55` }]}>
                <Text style={[styles.tagText, { color: job.color }]}>{tag}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        <GlassCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          {job.requirements.map((req, idx) => (
            <View key={idx} style={styles.reqRow}>
              <View style={[styles.reqDot, { backgroundColor: job.color }]} />
              <Text style={styles.reqText}>{req}</Text>
            </View>
          ))}
        </GlassCard>

        <Text style={styles.posted}>
          {job.postedDays === 1 ? 'Posted today' : `Posted ${job.postedDays} days ago`}
        </Text>

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.cta}>
        {applied ? (
          <View style={styles.appliedBox}>
            <Text style={styles.appliedText}>✅ Application sent!</Text>
          </View>
        ) : (
          <GradientButton
            title="Apply now"
            onPress={() => setApplied(true)}
            style={{ flex: 1 }}
            colors={[job.color, Colors.primary2, Colors.pink]}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
    alignItems: 'center',
  },
  headerBtn: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerBtnText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '900',
  },
  headerTitle: {
    color: Colors.white,
    fontWeight: '900',
    fontSize: 16,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  heroCard: {
    marginBottom: 18,
  },
  logoWrap: {
    width: 82,
    height: 82,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 14,
  },
  logoInner: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: '900',
  },
  company: {
    color: Colors.textSoft,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 14,
  },
  position: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 4,
  },
  pills: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 14,
    marginBottom: 18,
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginHorizontal: 4,
    marginBottom: 6,
  },
  pillText: {
    color: Colors.textSoft,
    fontSize: 12,
    fontWeight: '800',
  },
  statsRow: {
    flexDirection: 'row',
  },
  statBox: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statValue: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '900',
  },
  statLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    marginTop: 3,
    fontWeight: '700',
  },
  sectionCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 10,
  },
  body: {
    color: Colors.textSoft,
    fontSize: 14,
    lineHeight: 22,
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '900',
  },
  reqRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  reqDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    marginTop: 7,
    marginRight: 10,
  },
  reqText: {
    flex: 1,
    color: Colors.textSoft,
    fontSize: 14,
    lineHeight: 21,
  },
  posted: {
    color: Colors.textMuted,
    textAlign: 'center',
    fontSize: 12,
    marginTop: 2,
  },
  cta: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  appliedBox: {
    height: 56,
    borderRadius: 18,
    backgroundColor: Colors.successSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appliedText: {
    color: Colors.success,
    fontWeight: '900',
    fontSize: 16,
  },
});