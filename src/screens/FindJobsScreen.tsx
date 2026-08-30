import React, { useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AmbientBackground from '../components/AmbientBackground';
import HeroBanner from '../components/HeroBanner';
import SearchBar from '../components/SearchBar';
import CategoryChip from '../components/CategoryChip';
import JobCard from '../components/JobCard';
import { Colors } from '../theme/colors';
import { jobService, Job } from '../services/jobService';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigations';

type Props = NativeStackScreenProps<RootStackParamList, 'FindJobs'>;

const CATEGORIES = [
  { key: 'all', title: 'All', icon: '🌟' },
  { key: 'engineering', title: 'Tech', icon: '💻' },
  { key: 'design', title: 'Design', icon: '🎨' },
  { key: 'data', title: 'Data & AI', icon: '📊' },
  { key: 'marketing', title: 'Marketing', icon: '📢' },
];

export default function FindJobsScreen({ navigation }: Props) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [jobsList, setJobsList] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const loadJobs = async () => {
    try {
      const data = await jobService.getJobs();
      setJobsList(data);
    } catch (e) {
      console.warn('Error loading jobs', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobsList.filter(job => {
      const matchesCategory =
        activeCategory === 'all' || job.category.toLowerCase() === activeCategory.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        job.position.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.tags.some(tag => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [jobsList, activeCategory, searchQuery]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />
      <AmbientBackground />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.title}>Find Jobs</Text>
            <Text style={styles.subtitle}>Sri Lanka & Remote openings</Text>
          </View>

          <TouchableOpacity
            style={styles.heartBtn}
            onPress={() => navigation.navigate('SavedJobs')}
          >
            <Text style={styles.heartText}>♥</Text>
          </TouchableOpacity>
        </View>

        <HeroBanner
          videoSource={require('../assets/videos/career-video.mp4')}
          title="Find your dream role"
          subtitle="Explore curated openings from top engineering and design companies worldwide."
          stats={[
            { value: `${jobsList.length || 8}+`, label: 'Open roles' },
            { value: '200+', label: 'Companies' },
            { value: '94%', label: 'Placement rate' },
          ]}
          height={240}
        />

        <SearchBar
          placeholder="Search jobs, companies, skills..."
          onSearch={setSearchQuery}
        />

        <Text style={styles.sectionTitle}>Browse by Domain</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {CATEGORIES.map(cat => {
            const count =
              cat.key === 'all'
                ? jobsList.length
                : jobsList.filter(j => j.category.toLowerCase() === cat.key.toLowerCase()).length;
            return (
              <CategoryChip
                key={cat.key}
                title={cat.title}
                count={count}
                isActive={activeCategory === cat.key}
                onPress={() => setActiveCategory(cat.key)}
              />
            );
          })}
        </ScrollView>

        <View style={styles.resultRow}>
          <Text style={styles.sectionTitle}>
            {filteredJobs.length} {filteredJobs.length === 1 ? 'role' : 'roles'} found
          </Text>
          <TouchableOpacity
            style={styles.aiBtn}
            onPress={() => navigation.navigate('Recommendation')}
          >
            <Text style={styles.aiBtnText}>⚡ AI Match</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Fetching available job openings...</Text>
          </View>
        ) : (
          filteredJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onPress={selectedJob =>
                navigation.navigate('JobDetails', { job: selectedJob })
              }
            />
          ))
        )}

        {filteredJobs.length === 0 && !loading && (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>No roles found</Text>
            <Text style={styles.emptyText}>Try searching a different keyword or category.</Text>
          </View>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 20, paddingBottom: 30 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
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
  heartBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  heartText: {
    color: Colors.pink,
    fontSize: 20,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 10,
  },
  categories: {
    paddingBottom: 16,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiBtn: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(124,92,255,0.22)',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  aiBtnText: {
    color: Colors.pink,
    fontWeight: '800',
    fontSize: 11,
  },
  loading: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.textMuted,
    marginTop: 10,
    fontSize: 13,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  emptyTitle: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '900',
  },
  emptyText: {
    color: Colors.textMuted,
    marginTop: 4,
    fontSize: 13,
  },
});
