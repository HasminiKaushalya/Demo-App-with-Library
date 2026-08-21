import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../theme/colors';

type Props = {
  userName?: string;
  jobCount?: number;
};

export default function HeroSection({ userName = 'Alex', jobCount = 1240 }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const pulse1 = useRef(new Animated.Value(1)).current;
  const pulse2 = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 80, friction: 12, useNativeDriver: true }),
    ]).start();

    const loop1 = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse1, { toValue: 1.12, duration: 2000, useNativeDriver: true }),
        Animated.timing(pulse1, { toValue: 1, duration: 2000, useNativeDriver: true }),
      ]),
    );
    const loop2 = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse2, { toValue: 1, duration: 2400, useNativeDriver: true }),
        Animated.timing(pulse2, { toValue: 0.85, duration: 2400, useNativeDriver: true }),
      ]),
    );
    loop1.start();
    loop2.start();
    return () => {
      loop1.stop();
      loop2.stop();
    };
  }, [fadeAnim, pulse1, pulse2, slideAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.blob1, { transform: [{ scale: pulse1 }] }]} />
      <Animated.View style={[styles.blob2, { transform: [{ scale: pulse2 }] }]} />
      <View style={styles.blob3} />
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <View style={styles.greetingRow}>
          
          <Text style={styles.greeting}>Good morning, {userName}</Text>
        </View>
        <Text style={styles.headline}>Find your{`\n`}<Text style={styles.headlineAccent}>dream career</Text></Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}><Text style={styles.statValue}>{jobCount.toLocaleString()}+</Text><Text style={styles.statLabel}>Open roles</Text></View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}><Text style={styles.statValue}>200+</Text><Text style={styles.statLabel}>Companies</Text></View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}><Text style={styles.statValue}>94%</Text><Text style={styles.statLabel}>Placed</Text></View>
        </View>
        <TouchableOpacity style={styles.nudge} activeOpacity={0.85}>
          <View style={styles.nudgeLeft}>
            <View style={styles.nudgeBar}><View style={[styles.nudgeFill, { width: '72%' }]} /></View>
            <Text style={styles.nudgeText}>Complete your profile — 72%</Text>
          </View>
        
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    borderRadius: 28,
    padding: 24,
    marginBottom: 24,
    overflow: 'hidden',
    minHeight: 220,
  },
  blob1: { position: 'absolute', width: 160, height: 160, borderRadius: 80, backgroundColor: 'rgba(255,255,255,0.08)', top: -40, right: -30 },
  blob2: { position: 'absolute', width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.06)', bottom: 20, right: 60 },
  blob3: { position: 'absolute', width: 70, height: 70, borderRadius: 35, backgroundColor: 'rgba(255,255,255,0.05)', top: 60, right: 20 },
  greetingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  greeting: { fontSize: 14, color: 'rgba(255,255,255,0.82)', fontWeight: '600' },
  headline: { fontSize: 30, fontWeight: '900', color: '#FFFFFF', lineHeight: 36, marginBottom: 20, letterSpacing: -0.5 },
  headlineAccent: { color: 'rgba(255,255,255,0.75)' },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '900', color: '#FFFFFF' },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.65)', fontWeight: '600', marginTop: 2 },
  statDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },
  nudge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10 },
  nudgeLeft: { flex: 1 },
  nudgeBar: { height: 4, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 2, marginBottom: 5, overflow: 'hidden' },
  nudgeFill: { height: 4, backgroundColor: '#FFFFFF', borderRadius: 2 },
  nudgeText: { fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: '700' },
  nudgeArrow: { fontSize: 18, color: 'rgba(255,255,255,0.7)', marginLeft: 10 },
});
