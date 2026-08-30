import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../theme/colors';

export default function AmbientBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={Colors.darkGradient}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.blob, styles.blob1]} />
      <View style={[styles.blob, styles.blob2]} />
      <View style={[styles.blob, styles.blob3]} />
    </View>
  );
}

const styles = StyleSheet.create({
  blob: {
    position: 'absolute',
    borderRadius: 999,
  },
  blob1: {
    width: 220,
    height: 220,
    backgroundColor: 'rgba(124,92,255,0.25)',
    top: -40,
    right: -40,
  },
  blob2: {
    width: 180,
    height: 180,
    backgroundColor: 'rgba(79,209,255,0.18)',
    bottom: 90,
    left: -50,
  },
  blob3: {
    width: 160,
    height: 160,
    backgroundColor: 'rgba(255,95,178,0.14)',
    top: '42%',
    right: -30,
  },
});
