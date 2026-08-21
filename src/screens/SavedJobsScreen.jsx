import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import AmbientBackground from '../components/AmbientBackground';
import JobCard from '../components/JobCard';
import jobs from '../data/jobs';
import { Colors } from '../theme/colors';

export default function SavedJobsScreen({ navigation }) {
  const savedJobs = jobs.filter(item => item.isSaved);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />
      <AmbientBackground />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.title}>Saved roles</Text>
          <Text style={styles.subtitle}>{savedJobs.length} bookmarked</Text>
        </View>

        <TouchableOpacity style={styles.clearBtn}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {savedJobs.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}></Text>
          <Text style={styles.emptyTitle}>Nothing saved yet</Text>
          <Text style={styles.emptyBody}>
            Tap the heart on any job role to save it here beautifully.
          </Text>
        </View>
      ) : (
        <FlatList
          data={savedJobs}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <JobCard
              job={item}
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
    fontSize: 24,
    fontWeight: '900',
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  clearBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
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
    paddingBottom: 100,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  emptyEmoji: {
    fontSize: 58,
    marginBottom: 12,
  },
  emptyTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 8,
  },
  emptyBody: {
    color: Colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
});