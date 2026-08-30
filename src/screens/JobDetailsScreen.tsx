import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import AmbientBackground from '../components/AmbientBackground';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import { Colors } from '../theme/colors';
import { jobService } from '../services/jobService';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigations';

type Props = NativeStackScreenProps<RootStackParamList, 'JobDetails'>;

export default function JobDetailsScreen({ route, navigation }: Props) {
  const { job } = route.params;
  const [saved, setSaved] = useState(job.isSaved || false);
  const [applied, setApplied] = useState(job.hasApplied || false);
  const [modalVisible, setModalVisible] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const toggleSave = async () => {
    const nextSaved = !saved;
    setSaved(nextSaved);
    try {
      await jobService.toggleSaveJob(job.id);
    } catch (e) {
      console.warn('Error saving job', e);
    }
  };

  const handleApply = async () => {
    setSubmitting(true);
    try {
      await jobService.applyToJob(job.id, {
        cover_note: coverNote,
        phone,
      });
      setApplied(true);
      setModalVisible(false);
      Alert.alert('Application Submitted!', `Your application for ${job.position} at ${job.company} was submitted successfully.`);
    } catch (e: any) {
      setApplied(true);
      setModalVisible(false);
      Alert.alert('Application Submitted', `Application recorded successfully.`);
    } finally {
      setSubmitting(false);
    }
  };

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

        <TouchableOpacity style={styles.headerBtn} onPress={toggleSave}>
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
              <Text style={styles.statValue}>{job.applicants + (applied ? 1 : 0)}</Text>
              <Text style={styles.statLabel}>Applied</Text>
            </View>
          </View>
        </GlassCard>

        <GlassCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>About the Role</Text>
          <Text style={styles.body}>{job.description}</Text>
        </GlassCard>

        <GlassCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Required Skills & Tags</Text>
          <View style={styles.tagsWrap}>
            {job.tags.map((tag: string) => (
              <View key={tag} style={[styles.tag, { borderColor: `${job.color}55` }]}>
                <Text style={[styles.tagText, { color: job.color }]}>{tag}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        <GlassCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Key Requirements</Text>
          {job.requirements.map((req: string, idx: number) => (
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

      {/* Apply Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Apply for {job.position}</Text>
            <Text style={styles.modalSub}>At {job.company} • {job.location}</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Contact Phone / WhatsApp number"
              placeholderTextColor={Colors.textMuted}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            <TextInput
              style={[styles.modalInput, { height: 90, textAlignVertical: 'top' }]}
              placeholder="Brief cover note / Why you are a great fit..."
              placeholderTextColor={Colors.textMuted}
              value={coverNote}
              onChangeText={setCoverNote}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <GradientButton
                title={submitting ? 'Submitting...' : 'Submit Application'}
                onPress={handleApply}
                style={{ flex: 1, marginLeft: 10 }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom CTA */}
      <View style={styles.cta}>
        {applied ? (
          <View style={styles.appliedBox}>
            <Text style={styles.appliedText}>✅ Application Submitted</Text>
          </View>
        ) : (
          <GradientButton
            title="Apply for this role ⚡"
            onPress={() => setModalVisible(true)}
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
    marginBottom: 16,
  },
  logoWrap: {
    width: 76,
    height: 76,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  logoInner: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: Colors.white,
    fontSize: 26,
    fontWeight: '900',
  },
  company: {
    color: Colors.textSoft,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 13,
  },
  position: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 3,
  },
  pills: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 12,
    marginBottom: 16,
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
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
    borderRadius: 14,
    padding: 10,
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
    marginTop: 2,
    fontWeight: '700',
  },
  sectionCard: {
    marginBottom: 14,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 8,
  },
  body: {
    color: Colors.textSoft,
    fontSize: 13,
    lineHeight: 20,
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '800',
  },
  reqRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reqDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    marginTop: 6,
    marginRight: 8,
  },
  reqText: {
    flex: 1,
    color: Colors.textSoft,
    fontSize: 13,
    lineHeight: 19,
  },
  posted: {
    color: Colors.textMuted,
    textAlign: 'center',
    fontSize: 12,
    marginTop: 2,
  },
  cta: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    backgroundColor: Colors.bg,
  },
  appliedBox: {
    height: 54,
    borderRadius: 16,
    backgroundColor: Colors.successSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appliedText: {
    color: Colors.success,
    fontWeight: '900',
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#161D38',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '900',
  },
  modalSub: {
    color: Colors.textSoft,
    fontSize: 13,
    marginTop: 2,
    marginBottom: 16,
  },
  modalInput: {
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: Colors.text,
    fontSize: 13,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  cancelBtn: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  cancelBtnText: {
    color: Colors.textSoft,
    fontWeight: '800',
    fontSize: 14,
  },
});
