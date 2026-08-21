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
import HeroBanner from '../components/HeroBanner';
import SearchBar from '../components/SearchBar';
import CategoryChip from '../components/CategoryChip';
import JobCard from '../components/JobCard';
import jobs from '../data/jobs';
import { Colors } from '../theme/colors';

const CATEGORIES = [
  { key: 'all', title: 'All', icon: '🌟', count: jobs.length },
  { key: 'engineering', title: 'Tech', icon: '💻', count: jobs.filter(j => j.category === 'engineering').length },
  { key: 'design', title: 'Design', icon: '🎨', count: jobs.filter(j => j.category === 'design').length },
  { key: 'data', title: 'Data', icon: '📊', count: jobs.filter(j => j.category === 'data').length },
  { key: 'marketing', title: 'Marketing', icon: '📢', count: jobs.filter(j => j.category === 'marketing').length },
];

export default function FindJobsScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = activeCategory === 'all' || job.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      job.position.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

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
            <Text style={styles.subtitle}>Sri Lanka & Remote premium roles</Text>
          </View>

          <TouchableOpacity style={styles.heartBtn} onPress={() => navigation.navigate('SavedJobs')}>
            <Text style={styles.heartText}>♥</Text>
          </TouchableOpacity>
        </View>

        <HeroBanner
          image={require('../assets/images/hero-jobs.jpg')}
          title="Find your next dream role"
          subtitle="Explore colorful curated openings from top companies in a premium visual experience."
          stats={[
            { value: '1,240+', label: 'Open roles' },
            { value: '200+', label: 'Companies' },
            { value: '94%', label: 'Placement vibe' },
          ]}
          height={270}
        />

        <SearchBar
          placeholder="Search jobs, companies, locations..."
          onSearch={setSearchQuery}
        />

        <Text style={styles.sectionTitle}>Browse by role</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
          {CATEGORIES.map(cat => (
            <CategoryChip
              key={cat.key}
              title={cat.title}
              icon={cat.icon}
              count={cat.count}
              isActive={activeCategory === cat.key}
              onPress={() => setActiveCategory(cat.key)}
            />
          ))}
        </ScrollView>

        <View style={styles.resultRow}>
          <Text style={styles.sectionTitle}>
            {filteredJobs.length} {filteredJobs.length === 1 ? 'role' : 'roles'} found
          </Text>
          <TouchableOpacity style={styles.sortBtn}>
            <Text style={styles.sortText}>Sort ↕</Text>
          </TouchableOpacity>
        </View>

        {filteredJobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            onPress={selectedJob => navigation.navigate('JobDetails', { job: selectedJob })}
          />
        ))}

        {filteredJobs.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>No roles found</Text>
            <Text style={styles.emptyText}>Try another search term or category.</Text>
          </View>
        ) : null}

        <View style={{ height: 100 }} />
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
    fontSize: 26,
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
    fontSize: 22,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
  },
  categories: {
    paddingBottom: 18,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sortBtn: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sortText: {
    color: Colors.textSoft,
    fontWeight: '800',
    fontSize: 12,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  emptyTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  emptyText: {
    color: Colors.textMuted,
    marginTop: 6,
  },
});