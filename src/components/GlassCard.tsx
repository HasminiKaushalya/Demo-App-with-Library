import React, { ReactNode } from "react";

import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { Colors } from "../theme/colors";
import { Shadows } from "../theme/shadows";

import { useAdaptiveContext } from "battery-aware-adaptive-ui";

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function GlassCard({ children, style }: Props) {
  const { mode } = useAdaptiveContext();

  const balanced = mode === "Balanced";
  const powerSaver = mode === "Power Saver";
  const ultraSaver = mode === "Ultra Saver";

  // Ultra Saver
  if (ultraSaver) {
    return <View style={[styles.ultraCard, style]}>{children}</View>;
  }

  // Power Saver
  if (powerSaver) {
    return <View style={[styles.powerCard, style]}>{children}</View>;
  }

  return (
    <LinearGradient
      colors={Colors.glassGradient}
      style={[balanced ? styles.balancedCard : styles.card, style]}
    >
      <View style={balanced ? styles.balancedInner : styles.inner}>
        {children}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
    ...Shadows.soft,
  },

  inner: {
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 18,
  },

  balancedCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
  },

  balancedInner: {
    backgroundColor: "rgba(255,255,255,0.02)",
    padding: 18,
  },

  powerCard: {
    borderRadius: 22,
    backgroundColor: "#242424",
    borderWidth: 1,
    borderColor: "#444",
    padding: 18,
  },

  ultraCard: {
    borderRadius: 20,
    backgroundColor: "#1c1c1c",
    borderWidth: 1,
    borderColor: "#333",
    padding: 18,
  },
});
