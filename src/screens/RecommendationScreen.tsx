import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AmbientBackground from '../components/AmbientBackground';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import CategoryChip from '../components/CategoryChip';
import CareerCard from '../components/CareerCard';
import JobCard from '../components/JobCard';
import { Colors } from '../theme/colors';
import { recommendationService, RecommendationResponse, Skill } from '../services/recommendationService';
import { useAuth } from '../context/AuthContext';

const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const POPULAR_SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'React Native', 'Figma',
  'Python', 'SQL', 'FastAPI', 'Machine Learning', 'SEO', 'Wireframes'
];

export default function RecommendationScreen({ navigation }: any) {
  const { user } = useAuth();
  const [selectedSkills, setSelectedSkills] = useState<string[]>(user?.skills || ['JavaScript', 'React']);
  const [customSkill, setCustomSkill] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<string>(user?.experience_level || 'Beginner');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<RecommendationResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'careers' | 'jobs'>('careers');

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const addCustomSkill = () => {
    const trimmed = customSkill.trim();
    if (trimmed && !selectedSkills.includes(trimmed)) {
      setSelectedSkills([...selectedSkills, trimmed]);
      setCustomSkill('');
    }
  };

  const runRecommendation = async () => {
    setLoading(true);
    try {
      const interests = selectedCategory !== 'all' ? [selectedCategory] : [];
      const res = await recommendationService.evaluate({
        skills: selectedSkills,
        experience_level: experienceLevel,
        interests,
      });
      setResults(res);
    } catch (e) {
      console.warn('Recommendation evaluation error', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runRecommendation();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />
      <AmbientBackground />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.title}>AI Career Matcher</Text>
            <Text style={styles.subtitle}>Rule-based career & skill recommendation</Text>
          </View>
        </View>

        {/* Skill Selector Card */}
        <GlassCard style={styles.filterCard}>
          <Text style={styles.cardHeader}>Select Your Current Skills</Text>
          <Text style={styles.cardSub}>
            Pick the skills you know or are currently learning:
          </Text>

          <View style={styles.skillsWrap}>
            {POPULAR_SKILLS.map(skill => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <TouchableOpacity
                  key={skill}
                  style={[styles.skillChip, isSelected && styles.skillChipActive]}
                  onPress={() => toggleSkill(skill)}
                >
                  <Text style={[styles.skillChipText, isSelected && styles.skillChipTextActive]}>
                    {isSelected ? '✓ ' : '+ '}{skill}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Add custom skill input */}
          <View style={styles.addSkillRow}>
            <TextInput
              style={styles.addSkillInput}
              placeholder="Add other skill (e.g. Docker, Redux)..."
              placeholderTextColor={Colors.textMuted}
              value={customSkill}
              onChangeText={setCustomSkill}
              onSubmitEditing={addCustomSkill}
            />
            <TouchableOpacity style={styles.addBtn} onPress={addCustomSkill}>
              <Text style={styles.addBtnText}>Add</Text>
            </TouchableOpacity>
          </View>

          {/* Experience Level Selector */}
          <Text style={[styles.cardHeader, { marginTop: 16 }]}>Experience Level</Text>
          <View style={styles.levelRow}>
            {EXPERIENCE_LEVELS.map(lvl => (
              <TouchableOpacity
                key={lvl}
                style={[styles.levelBtn, experienceLevel === lvl && styles.levelBtnActive]}
                onPress={() => setExperienceLevel(lvl)}
              >
                <Text style={[styles.levelBtnText, experienceLevel === lvl && styles.levelBtnTextActive]}>
                  {lvl}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <GradientButton
            title={loading ? 'Analyzing Profile...' : 'Compute Best Career Matches ⚡'}
            onPress={runRecommendation}
            style={{ marginTop: 18 }}
          />
        </GlassCard>

        {/* Results Section */}
        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Evaluating skills against career roadmaps...</Text>
          </View>
        ) : results ? (
          <View style={styles.resultsWrap}>
            {/* Readiness Summary */}
            <GlassCard style={styles.readinessCard}>
              <View style={styles.readinessHeader}>
                <Text style={styles.readinessTitle}>Readiness: {results.readiness_level}</Text>
                <View style={styles.readinessBadge}>
                  <Text style={styles.readinessBadgeText}>{selectedSkills.length} Skills</Text>
                </View>
              </View>
              <Text style={styles.adviceText}>{results.growth_advice}</Text>
            </GlassCard>

            {/* Tabs */}
            <View style={styles.tabRow}>
              <TouchableOpacity
                style={[styles.tabBtn, activeTab === 'careers' && styles.tabBtnActive]}
                onPress={() => setActiveTab('careers')}
              >
                <Text style={[styles.tabBtnText, activeTab === 'careers' && styles.tabBtnTextActive]}>
                  Recommended Careers ({results.top_careers.length})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tabBtn, activeTab === 'jobs' && styles.tabBtnActive]}
                onPress={() => setActiveTab('jobs')}
              >
                <Text style={[styles.tabBtnText, activeTab === 'jobs' && styles.tabBtnTextActive]}>
                  Matching Jobs ({results.top_jobs.length})
                </Text>
              </TouchableOpacity>
            </View>

            {/* Tab 1: Careers */}
            {activeTab === 'careers' && (
              <View>
                {results.top_careers.map((rec, index) => (
                  <GlassCard key={rec.career.id} style={styles.recCard}>
                    <View style={styles.recCardHeader}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.careerTitle}>{rec.career.title}</Text>
                        <Text style={styles.careerCategory}>{rec.career.level} • {rec.career.duration}</Text>
                      </View>
                      <View style={[styles.scoreBadge, { backgroundColor: rec.match_percentage >= 80 ? Colors.successSoft : Colors.infoSoft }]}>
                        <Text style={[styles.scoreText, { color: rec.match_percentage >= 80 ? Colors.success : Colors.info }]}>
                          {rec.match_percentage}% Match
                        </Text>
                      </View>
                    </View>

                    {/* Matched & Missing Skills Analysis */}
                    <View style={styles.analysisRow}>
                      {rec.matched_skills.length > 0 && (
                        <View style={styles.skillsGroup}>
                          <Text style={styles.groupLabel}>✓ Matched Skills:</Text>
                          <View style={styles.chipsWrap}>
                            {rec.matched_skills.map(s => (
                              <View key={s} style={styles.matchPill}>
                                <Text style={styles.matchPillText}>{s}</Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      )}

                      {rec.missing_skills.length > 0 && (
                        <View style={[styles.skillsGroup, { marginTop: 8 }]}>
                          <Text style={[styles.groupLabel, { color: Colors.warning }]}>⚡ Skill Gap to Learn:</Text>
                          <View style={styles.chipsWrap}>
                            {rec.missing_skills.map(s => (
                              <View key={s} style={styles.gapPill}>
                                <Text style={styles.gapPillText}>{s}</Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      )}
                    </View>

                    {/* Next step */}
                    <View style={styles.stepBox}>
                      <Text style={styles.stepLabel}>Recommended Next Step:</Text>
                      <Text style={styles.stepText}>{rec.suggested_next_step}</Text>
                    </View>

                    <TouchableOpacity
                      style={styles.exploreBtn}
                      onPress={() => navigation.navigate('CareerDiscovery', { career: rec.career })}
                    >
                      <Text style={styles.exploreBtnText}>View Full Roadmap →</Text>
                    </TouchableOpacity>
                  </GlassCard>
                ))}
              </View>
            )}

            {/* Tab 2: Jobs */}
            {activeTab === 'jobs' && (
              <View>
                {results.top_jobs.map(rec => (
                  <View key={rec.job.id} style={{ marginBottom: 14 }}>
                    <View style={styles.jobScoreBanner}>
                      <Text style={styles.jobScoreText}>⭐ {rec.match_percentage}% Skill Alignment</Text>
                    </View>
                    <JobCard
                      job={rec.job}
                      onPress={job => navigation.navigate('JobDetails', { job })}
                    />
                  </View>
                ))}
              </View>
            )}
          </View>
        ) : null}

        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 20, paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
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
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '900',
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  filterCard: {
    marginBottom: 22,
  },
  cardHeader: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  cardSub: {
    color: Colors.textSoft,
    fontSize: 13,
    marginBottom: 12,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  skillChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 6,
    marginBottom: 8,
  },
  skillChipActive: {
    backgroundColor: 'rgba(124,92,255,0.3)',
    borderColor: Colors.primary,
  },
  skillChipText: {
    color: Colors.textSoft,
    fontSize: 12,
    fontWeight: '700',
  },
  skillChipTextActive: {
    color: Colors.white,
    fontWeight: '900',
  },
  addSkillRow: {
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 6,
  },
  addSkillInput: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    color: Colors.text,
    fontSize: 13,
    marginRight: 8,
  },
  addBtn: {
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: Colors.white,
    fontWeight: '800',
    fontSize: 13,
  },
  levelRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  levelBtn: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  levelBtnActive: {
    backgroundColor: 'rgba(79,209,255,0.25)',
    borderColor: Colors.cyan,
  },
  levelBtnText: {
    color: Colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  levelBtnTextActive: {
    color: Colors.white,
    fontWeight: '900',
  },
  loadingBox: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.textSoft,
    marginTop: 12,
    fontSize: 14,
  },
  resultsWrap: {
    marginTop: 8,
  },
  readinessCard: {
    marginBottom: 16,
    backgroundColor: 'rgba(124,92,255,0.12)',
  },
  readinessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  readinessTitle: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '900',
  },
  readinessBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  readinessBadgeText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '800',
  },
  adviceText: {
    color: Colors.textSoft,
    fontSize: 13,
    lineHeight: 20,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabBtnActive: {
    backgroundColor: Colors.primary,
  },
  tabBtnText: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  tabBtnTextActive: {
    color: Colors.white,
  },
  recCard: {
    marginBottom: 14,
  },
  recCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  careerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  careerCategory: {
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  scoreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: '900',
  },
  analysisRow: {
    marginBottom: 12,
  },
  skillsGroup: {},
  groupLabel: {
    color: Colors.success,
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 6,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  matchPill: {
    backgroundColor: 'rgba(46,216,163,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    marginRight: 6,
    marginBottom: 4,
  },
  matchPillText: {
    color: Colors.success,
    fontSize: 11,
    fontWeight: '800',
  },
  gapPill: {
    backgroundColor: 'rgba(255,200,87,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    marginRight: 6,
    marginBottom: 4,
  },
  gapPillText: {
    color: Colors.warning,
    fontSize: 11,
    fontWeight: '800',
  },
  stepBox: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  stepLabel: {
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  stepText: {
    color: Colors.text,
    fontSize: 12,
    marginTop: 3,
    lineHeight: 18,
  },
  exploreBtn: {
    paddingVertical: 8,
    alignItems: 'flex-end',
  },
  exploreBtnText: {
    color: Colors.cyan,
    fontSize: 13,
    fontWeight: '800',
  },
  jobScoreBanner: {
    backgroundColor: 'rgba(124,92,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  jobScoreText: {
    color: Colors.pink,
    fontSize: 12,
    fontWeight: '900',
  },
});
