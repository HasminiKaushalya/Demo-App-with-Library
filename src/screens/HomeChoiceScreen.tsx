import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AmbientBackground from "../components/AmbientBackground";
import GlassCard from "../components/GlassCard";
import GradientButton from "../components/GradientButton";
import { useAuth } from "../context/AuthContext";
import { Colors } from "../theme/colors";
import type { RootStackParamList } from "../types/navigations";

type Props = NativeStackScreenProps<RootStackParamList, "HomeChoice">;

export default function HomeChoiceScreen({ navigation }: Props) {
  const { user } = useAuth();
  const userName = user?.name ? user.name.split(" ")[0] : "Explorer";

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />
      <AmbientBackground />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Bar */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.appName}>CareerPlus</Text>
            <Text style={styles.sub}>Welcome back, {userName}</Text>
          </View>

          <View style={styles.topActions}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => navigation.navigate("SavedJobs")}
            >
              <Text style={styles.iconText}>Saved</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.iconBtn, { marginLeft: 8 }]}
              onPress={() => navigation.navigate("Profile")}
            >
              <Text style={[styles.iconText, { color: Colors.cyan }]}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Card */}
        <GlassCard style={styles.hero}>
          <Text style={styles.heroTitle}>
            Luxury career discovery for modern talent
          </Text>

          <Text style={styles.heroBody}>
            Explore role roadmaps, discover high-growth careers, and match jobs
            tailored to your skills.
          </Text>

          <View style={styles.quickRow}>
            <View style={styles.quickStat}>
              <Text style={styles.quickValue}>1.2K+</Text>
              <Text style={styles.quickLabel}>Open roles</Text>
            </View>

            <View style={styles.quickStat}>
              <Text style={styles.quickValue}>6+</Text>
              <Text style={styles.quickLabel}>Career paths</Text>
            </View>

            <View style={styles.quickStat}>
              <Text style={styles.quickValue}>200+</Text>
              <Text style={styles.quickLabel}>Companies</Text>
            </View>
          </View>
        </GlassCard>

        {/* Action 1: AI Career Matcher */}
        <TouchableOpacity
          activeOpacity={0.92}
          onPress={() => navigation.navigate("Recommendation")}
        >
          <GlassCard style={[styles.choiceCard, styles.aiCard]}>
            <View style={styles.aiBadge}>
              <Text style={styles.aiBadgeText}>NEW RULE ENGINE</Text>
            </View>

            <Text style={styles.choiceTitle}>Smart Career Matcher</Text>

            <Text style={styles.choiceText}>
              Input your skills to get instant percentage matches, missing skill
              gaps, and custom roadmaps.
            </Text>

            <Text style={[styles.choiceLink, { color: Colors.pink }]}>
              Match my skills now
            </Text>
          </GlassCard>
        </TouchableOpacity>

        {/* Action 2: Explore Careers */}
        <TouchableOpacity
          activeOpacity={0.92}
          onPress={() => navigation.navigate("ExploreCareers")}
        >
          <GlassCard style={styles.choiceCard}>
            <Text style={styles.choiceTitle}>Explore Careers</Text>

            <Text style={styles.choiceText}>
              Discover role roadmaps, skill requirements, salary benchmarks and
              future market demand.
            </Text>

            <Text style={styles.choiceLink}>Start exploring</Text>
          </GlassCard>
        </TouchableOpacity>

        {/* Action 3: Find Jobs */}
        <TouchableOpacity
          activeOpacity={0.92}
          onPress={() => navigation.navigate("FindJobs")}
        >
          <GlassCard style={styles.choiceCard}>
            <Text style={styles.choiceTitle}>Find Jobs</Text>

            <Text style={styles.choiceText}>
              Browse premium openings across Colombo & Remote, save favorites
              and apply in 1-tap.
            </Text>

            <Text style={styles.choiceLink}>Find roles</Text>
          </GlassCard>
        </TouchableOpacity>

        {/* Action 4: Battery Adaptive Demo */}
        <TouchableOpacity
          activeOpacity={0.92}
          onPress={() => navigation.navigate("BatteryAdaptiveDemo")}
        >
          <GlassCard style={[styles.choiceCard, styles.batteryCard]}>
            <View style={styles.batteryBadge}>
              <Text style={styles.batteryBadgeText}>RESEARCH DEMO</Text>
            </View>

            <Text style={styles.choiceTitle}>Battery Adaptive Demo</Text>

            <Text style={styles.choiceText}>
              Test the Adaptive Battery Score, adaptive modes, battery telemetry
              and energy-saving optimization settings.
            </Text>

            <Text style={[styles.choiceLink, { color: Colors.cyan }]}>
              Open battery test
            </Text>
          </GlassCard>
        </TouchableOpacity>

        <GradientButton
          title="Search Open Positions"
          onPress={() => navigation.navigate("FindJobs")}
          style={{ marginTop: 6 }}
        />

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },

  topActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  appName: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -0.8,
  },

  sub: {
    color: Colors.textSoft,
    marginTop: 2,
    fontSize: 13,
  },

  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: Colors.border,
  },

  iconText: {
    color: Colors.pink,
    fontSize: 20,
  },

  hero: {
    marginBottom: 16,
  },

  heroEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },

  heroTitle: {
    color: Colors.white,
    fontSize: 26,
    fontWeight: "900",
    lineHeight: 32,
  },

  heroBody: {
    color: Colors.textSoft,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },

  quickRow: {
    flexDirection: "row",
    marginTop: 18,
  },

  quickStat: {
    flex: 1,
    padding: 10,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.07)",
    marginRight: 8,
  },

  quickValue: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "900",
  },

  quickLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 2,
  },

  choiceCard: {
    marginBottom: 14,
  },

  aiCard: {
    borderColor: "rgba(255,95,178,0.4)",
    backgroundColor: "rgba(124,92,255,0.12)",
  },

  batteryCard: {
    borderColor: "rgba(0,220,255,0.35)",
    backgroundColor: "rgba(0,220,255,0.08)",
  },

  aiBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,95,178,0.2)",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 8,
  },

  batteryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(0,220,255,0.15)",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 8,
  },

  aiBadgeText: {
    color: Colors.pink,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  batteryBadgeText: {
    color: Colors.cyan,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  choiceEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },

  choiceTitle: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: "900",
  },

  choiceText: {
    color: Colors.textSoft,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },

  choiceLink: {
    color: Colors.cyan,
    fontSize: 13,
    fontWeight: "900",
    marginTop: 14,
  },
});
