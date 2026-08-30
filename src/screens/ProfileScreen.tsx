import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import AmbientBackground from '../components/AmbientBackground';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';
import { Colors } from '../theme/colors';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen({ navigation }: any) {
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [title, setTitle] = useState(user?.title || 'Career Explorer');
  const [bio, setBio] = useState(user?.bio || '');
  const [location, setLocation] = useState(user?.location || 'Colombo, Sri Lanka');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({ name, title, bio, location });
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (e: any) {
      Alert.alert('Error', e.userMessage || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigation.replace('Auth');
  };

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
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            <Text style={styles.editBtnText}>{isEditing ? 'Save' : 'Edit'}</Text>
          </TouchableOpacity>
        </View>

        {/* User Avatar & Headline */}
        <GlassCard style={styles.avatarCard}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarInner}>
              <Text style={styles.avatarInitial}>{user?.name?.charAt(0) || 'U'}</Text>
            </View>
          </View>

          {isEditing ? (
            <View style={{ width: '100%', marginTop: 12 }}>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Your Full Name"
                placeholderTextColor={Colors.textMuted}
              />
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Job Title / Role"
                placeholderTextColor={Colors.textMuted}
              />
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="Location"
                placeholderTextColor={Colors.textMuted}
              />
              <TextInput
                style={[styles.input, { height: 70, textAlignVertical: 'top' }]}
                value={bio}
                onChangeText={setBio}
                placeholder="Write a short bio..."
                placeholderTextColor={Colors.textMuted}
                multiline
              />
            </View>
          ) : (
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.userName}>{user?.name || 'Explorer'}</Text>
              <Text style={styles.userTitle}>{user?.title || 'Career Explorer'}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
              <Text style={styles.userLocation}>📍 {user?.location || 'Sri Lanka'}</Text>

              {user?.bio ? (
                <Text style={styles.userBio}>{user.bio}</Text>
              ) : null}
            </View>
          )}

          {/* Quick Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{user?.saved_jobs_count || 0}</Text>
              <Text style={styles.statLabel}>Saved Jobs</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{user?.applied_jobs_count || 0}</Text>
              <Text style={styles.statLabel}>Applications</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{user?.skills?.length || 0}</Text>
              <Text style={styles.statLabel}>Skills Added</Text>
            </View>
          </View>
        </GlassCard>

        {/* Skills Section */}
        <GlassCard style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Skills & Strengths</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Recommendation')}>
              <Text style={styles.addSkillsLink}>+ Manage</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.skillsWrap}>
            {user?.skills && user.skills.length > 0 ? (
              user.skills.map((skill: string) => (
                <View key={skill} style={styles.skillPill}>
                  <Text style={styles.skillPillText}>{skill}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noSkillsText}>
                No skills added yet. Tap 'AI Career Matcher' to select your skills.
              </Text>
            )}
          </View>
        </GlassCard>

        {/* Quick Nav Actions */}
        <TouchableOpacity
          activeOpacity={0.92}
          onPress={() => navigation.navigate('Recommendation')}
        >
          <GlassCard style={styles.actionCard}>
            <View style={styles.actionRow}>
              <Text style={styles.actionEmoji}>⚡</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionTitle}>AI Skill & Career Matcher</Text>
                <Text style={styles.actionSub}>Compute recommendations from your skills</Text>
              </View>
              <Text style={styles.actionArrow}>→</Text>
            </View>
          </GlassCard>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.92}
          onPress={() => navigation.navigate('SavedJobs')}
        >
          <GlassCard style={styles.actionCard}>
            <View style={styles.actionRow}>
              <Text style={styles.actionEmoji}>♥</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionTitle}>Bookmarked Job Roles</Text>
                <Text style={styles.actionSub}>View all roles you have saved</Text>
              </View>
              <Text style={styles.actionArrow}>→</Text>
            </View>
          </GlassCard>
        </TouchableOpacity>

        <GradientButton
          title="Sign Out"
          onPress={handleLogout}
          colors={['#FF7272', '#FF5FB2']}
          style={{ marginTop: 12 }}
        />

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
    justifyContent: 'space-between',
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
  headerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  editBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  editBtnText: {
    color: Colors.cyan,
    fontSize: 13,
    fontWeight: '800',
  },
  avatarCard: {
    alignItems: 'center',
    marginBottom: 18,
  },
  avatarWrap: {
    width: 86,
    height: 86,
    borderRadius: 28,
    backgroundColor: 'rgba(124,92,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarInner: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: '900',
  },
  userName: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '900',
  },
  userTitle: {
    color: Colors.cyan,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  userEmail: {
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  userLocation: {
    color: Colors.textSoft,
    fontSize: 12,
    marginTop: 4,
  },
  userBio: {
    color: Colors.textSoft,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 19,
    paddingHorizontal: 12,
  },
  input: {
    height: 46,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    color: Colors.text,
    fontSize: 13,
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 18,
    width: '100%',
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statNumber: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  statLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  sectionCard: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '900',
  },
  addSkillsLink: {
    color: Colors.pink,
    fontSize: 13,
    fontWeight: '800',
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillPill: {
    backgroundColor: 'rgba(124,92,255,0.22)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
  },
  skillPillText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '800',
  },
  noSkillsText: {
    color: Colors.textMuted,
    fontSize: 13,
  },
  actionCard: {
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionEmoji: {
    fontSize: 24,
    marginRight: 14,
  },
  actionTitle: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '900',
  },
  actionSub: {
    color: Colors.textSoft,
    fontSize: 12,
    marginTop: 2,
  },
  actionArrow: {
    color: Colors.cyan,
    fontSize: 18,
    fontWeight: '900',
    marginLeft: 8,
  },
});
