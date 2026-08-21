import React, { useMemo, useState } from 'react';
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
import SearchBar from '../components/SearchBar';
import CategoryChip from '../components/CategoryChip';
import CareerCard from '../components/CareerCard';
import HeroBanner from '../components/HeroBanner';
import careers from '../data/careers';
import { Colors } from '../theme/colors';

const LEVELS = [
  { key: 'all', title: 'All', },
  { key: 'Beginner', title: 'Beginner',},
  { key: 'Intermediate', title: 'Intermediate',},
  { key: 'Advanced', title: 'Advanced',},
];

export default function ExploreCareersScreen({ navigation }) {
  const [activeLevel, setActiveLevel] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return careers.filter(career => {
      const q = search.toLowerCase().trim();
      const matchLevel = activeLevel === 'all' || career.level === activeLevel;
      const matchSearch =
        !q ||
        career.title.toLowerCase().includes(q) ||
        career.skills.some(skill => skill.toLowerCase().includes(q));

      return matchLevel && matchSearch;
    });
  }, [activeLevel, search]);

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
            <Text style={styles.title}>Explore Careers</Text>
            <Text style={styles.subtitle}>Find a path that fits your strengths</Text>
          </View>
        </View>

        <HeroBanner
          image={require('../assets/images/career-banner.jpg')}
          title="Discover your ideal future"
          subtitle="Compare demand, learning time, salary and essential skills in a premium visual experience."
          stats={[
            { value: '18+', label: 'Career paths' },
            { value: '94%', label: 'Top demand' },
            { value: '4-6 mo', label: 'Fast growth' },
          ]}
          height={250}
        />

        <SearchBar
          placeholder="Search careers or skills..."
          onSearch={setSearch}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.levels}>
          {LEVELS.map(item => (
            <CategoryChip
              key={item.key}
              title={item.title}
              icon={item.icon}
              isActive={activeLevel === item.key}
              onPress={() => setActiveLevel(item.key)}
            />
          ))}
        </ScrollView>

        <View style={styles.rowTitle}>
          <Text style={styles.sectionTitle}>{filtered.length} career paths</Text>
          <Text style={styles.trending}>🔥 Trending</Text>
        </View>

        {filtered.map(career => (
          <CareerCard
            key={career.id}
            career={career}
            onPress={careerItem =>
              navigation.navigate('CareerDiscovery', { career: careerItem })
            }
          />
        ))}

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
    fontSize: 26,
    fontWeight: '900',
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  levels: {
    paddingBottom: 18,
  },
  rowTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  trending: {
    color: Colors.pink,
    fontWeight: '900',
    fontSize: 12,
    backgroundColor: 'rgba(255,95,178,0.16)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
});