import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../theme/colors';
import { Shadows } from '../theme/shadows';

export default function GlassCard({ children, style }) {
  return (
    <LinearGradient
      colors={Colors.glassGradient}
      style={[styles.card, style]}
    >
      <View style={styles.inner}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    ...Shadows.soft,
  },
  inner: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    padding: 18,
  },
});