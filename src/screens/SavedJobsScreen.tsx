import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AmbientBackground from '../components/AmbientBackground';
import JobCard from '../components/JobCard';
import { Colors } from '../theme/colors';
import { jobService, Job } from '../services/jobService';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigations';

type Props = NativeStackScreenProps<RootStackParamList, 'SavedJobs'>;

export default function SavedJobsScreen({ navigation }: Props) {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSaved = async () => {
    try {
      const data = await jobService.getSavedJobs();
      setSavedJobs(data);
    } catch (e) {
      console.warn('Error fetching saved jobs', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSaved();
    const unsubscribe = navigation.addListener('focus', () => {
      loadSaved();
    });
    return unsubscribe;
  }, [navigation]);

  const clearAll = () => {
    setSavedJobs([]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />
      <AmbientBackground />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.title}>Saved Roles</Text>
          <Text style={styles.subtitle}>{savedJobs.length} bookmarked</Text>
        </View>

        {savedJobs.length > 0 && (
          <TouchableOpacity style={styles.clearBtn} onPress={clearAll}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.pink} />
          <Text style={styles.loadingText}>Loading your bookmarked jobs...</Text>
        </View>
      ) : savedJobs.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>♥</Text>
          <Text style={styles.emptyTitle}>Nothing saved yet</Text>
          <Text style={styles.emptyBody}>
            Tap the heart icon on any job card to save it here for easy access.
          </Text>
          <TouchableOpacity
            style={styles.browseBtn}
            onPress={() => navigation.navigate('FindJobs')}
          >
            <Text style={styles.browseBtnText}>Explore Jobs Now →</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={savedJobs}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <JobCard
              job={{ ...item, isSaved: true }}
              onPress={job => navigation.navigate('JobDetails', { job })}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 12,
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
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '900',
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  clearBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  clearText: {
    color: Colors.textSoft,
    fontWeight: '800',
    fontSize: 12,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: Colors.textMuted,
    marginTop: 10,
    fontSize: 13,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  emptyEmoji: {
    fontSize: 52,
    marginBottom: 12,
    color: Colors.pink,
  },
  emptyTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 8,
  },
  emptyBody: {
    color: Colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  browseBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: Colors.primary,
  },
  browseBtnText: {
    color: Colors.white,
    fontWeight: '900',
    fontSize: 14,
  },
});
