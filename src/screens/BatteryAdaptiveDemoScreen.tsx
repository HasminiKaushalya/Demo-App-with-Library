import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { ABSController, useAdaptiveContext } from "battery-aware-adaptive-ui";

const BatteryAdaptiveDemoScreen = () => {
  const { batteryInfo, score, mode, settings, loading, error, refresh } =
    useAdaptiveContext();

  // Local state to trigger re-render after simulation changes
  const [simVersion, setSimVersion] = useState(0);

  const simulateABS = async (value: number) => {
    ABSController.setABS(value);
    setSimVersion(v => v + 1);
    await refresh();
  };

  const clearSimulation = async () => {
    ABSController.clearABS();
    setSimVersion(v => v + 1);
    await refresh();
  };

  // Read simulation state at render time (ABSController is synchronous)
  const isSimulating = ABSController.isSimulationEnabled();
  const simulatedValue = ABSController.getABS();

  // ── Optimization Impact helpers ─────────────────────────────────────────

  const getImageReduction = () => {
    const quality = settings?.image?.quality;
    if (typeof quality !== "number") return "N/A";
    return `${Math.max(0, 100 - quality)}%`;
  };

  // API polling: library stores in ms, baseline = 5000 ms
  const getPollingReduction = () => {
    const interval = settings?.apiPolling?.interval;
    if (typeof interval !== "number") return "N/A";
    const baseline = 5000;
    const reduction = Math.max(0, 100 - (baseline / interval) * 100);
    return `${reduction.toFixed(1)}%`;
  };

  // Background task: library stores in ms, baseline = 300000 ms (5 min)
  const getBackgroundReduction = () => {
    const enabled = settings?.backgroundTask?.syncEnabled;
    const interval = settings?.backgroundTask?.interval;
    if (enabled === false) return "100% (disabled)";
    if (typeof interval !== "number" || interval <= 0) return "N/A";
    const baseline = 300000;
    const reduction = Math.max(0, 100 - (baseline / interval) * 100);
    return `${reduction.toFixed(1)}%`;
  };

  // Convert ms to seconds for display
  const msToSec = (ms: number | undefined | null): string => {
    if (typeof ms !== "number") return "N/A";
    return `${(ms / 1000).toFixed(0)} sec`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Battery Adaptive Demo</Text>
      <Text style={styles.subtitle}>BatteryAwareAdaptiveUI — Research Evidence</Text>

      {/* Simulation active banner */}
      {isSimulating && (
        <View style={styles.simBanner}>
          <Text style={styles.simBannerLabel}>SIMULATION ACTIVE</Text>
          <Text style={styles.simBannerValue}>ABS = {simulatedValue}</Text>
        </View>
      )}

      {/* ── Current Adaptive State ── */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Current Adaptive State</Text>

        <Text style={styles.label}>ABS Score</Text>
        <Text style={styles.value}>
          {loading ? "Loading..." : score !== null ? String(score) : "N/A"}
        </Text>

        <Text style={styles.label}>Adaptive Mode</Text>
        <Text style={[styles.value, styles.modeValue]}>
          {mode ?? "N/A"}
        </Text>
      </View>

      {/* ── Device Battery ── */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Device Battery</Text>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>Battery</Text>
          <Text style={styles.rowVal}>
            {batteryInfo?.batteryPercentage != null
              ? `${batteryInfo.batteryPercentage}%`
              : "N/A"}
          </Text>
        </View>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>Charging</Text>
          <Text style={styles.rowVal}>{batteryInfo?.chargingStatus ?? "N/A"}</Text>
        </View>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>Power Save</Text>
          <Text style={styles.rowVal}>
            {batteryInfo != null
              ? batteryInfo.powerSaveMode ? "ON" : "OFF"
              : "N/A"}
          </Text>
        </View>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>Thermal Status</Text>
          <Text style={styles.rowVal}>{batteryInfo?.thermalStatus ?? "N/A"}</Text>
        </View>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>Temperature</Text>
          <Text style={styles.rowVal}>
            {batteryInfo?.batteryTemperature != null
              ? `${batteryInfo.batteryTemperature.toFixed(1)} °C`
              : "N/A"}
          </Text>
        </View>
      </View>

      {/* ── Optimization Settings ── */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Optimization Settings</Text>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>Theme</Text>
          <Text style={styles.rowVal}>{settings?.theme?.theme ?? "N/A"}</Text>
        </View>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>Color Palette</Text>
          <Text style={styles.rowVal}>{settings?.colorPalette?.palette ?? "N/A"}</Text>
        </View>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>Animation</Text>
          <Text style={styles.rowVal}>
            {settings?.animation != null
              ? settings.animation.enabled ? "ON" : "OFF"
              : "N/A"}
          </Text>
        </View>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>Animation Duration</Text>
          <Text style={styles.rowVal}>
            {settings?.animation?.duration != null
              ? `${settings.animation.duration} ms`
              : "N/A"}
          </Text>
        </View>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>Image Quality</Text>
          <Text style={styles.rowVal}>
            {settings?.image?.quality != null
              ? `${settings.image.quality}%`
              : "N/A"}
          </Text>
        </View>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>Image Cache</Text>
          <Text style={styles.rowVal}>
            {settings?.image != null
              ? settings.image.cacheEnabled ? "ON" : "OFF"
              : "N/A"}
          </Text>
        </View>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>Video Quality</Text>
          <Text style={styles.rowVal}>
            {settings?.video?.quality != null
              ? `${settings.video.quality}%`
              : "N/A"}
          </Text>
        </View>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>Video Autoplay</Text>
          <Text style={styles.rowVal}>
            {settings?.video != null
              ? settings.video.autoPlay ? "ON" : "OFF"
              : "N/A"}
          </Text>
        </View>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>Shadows</Text>
          <Text style={styles.rowVal}>
            {settings?.rendering != null
              ? settings.rendering.shadowsEnabled ? "ON" : "OFF"
              : "N/A"}
          </Text>
        </View>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>Blur</Text>
          <Text style={styles.rowVal}>
            {settings?.rendering != null
              ? settings.rendering.blurEnabled ? "ON" : "OFF"
              : "N/A"}
          </Text>
        </View>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>Gradients</Text>
          <Text style={styles.rowVal}>
            {settings?.rendering != null
              ? settings.rendering.gradientsEnabled ? "ON" : "OFF"
              : "N/A"}
          </Text>
        </View>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>Complex Effects</Text>
          <Text style={styles.rowVal}>
            {settings?.rendering != null
              ? settings.rendering.complexEffectsEnabled ? "ON" : "OFF"
              : "N/A"}
          </Text>
        </View>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>API Polling</Text>
          <Text style={styles.rowVal}>{msToSec(settings?.apiPolling?.interval)}</Text>
        </View>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>Background Sync</Text>
          <Text style={styles.rowVal}>
            {settings?.backgroundTask != null
              ? settings.backgroundTask.syncEnabled ? "ON" : "OFF"
              : "N/A"}
          </Text>
        </View>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>Background Interval</Text>
          <Text style={styles.rowVal}>
            {settings?.backgroundTask?.syncEnabled === false
              ? "N/A (disabled)"
              : msToSec(settings?.backgroundTask?.interval)}
          </Text>
        </View>
      </View>

      {/* ── Optimization Impact ── */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Optimization Impact</Text>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>Image Quality Reduction</Text>
          <Text style={styles.rowVal}>{getImageReduction()}</Text>
        </View>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>API Polling Reduction</Text>
          <Text style={styles.rowVal}>{getPollingReduction()}</Text>
        </View>

        <View style={styles.rowWrap}>
          <Text style={styles.rowLabel}>Background Task Reduction</Text>
          <Text style={styles.rowVal}>{getBackgroundReduction()}</Text>
        </View>

        <Text style={styles.note}>
          These values represent adaptive configuration reductions relative to Performance mode.
          They are NOT direct measurements of electrical energy consumed by the device.
        </Text>
      </View>

      {/* ── ABS Simulation ── */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>ABS Simulation</Text>

        <Text style={styles.note}>
          Press a button to simulate an ABS score and observe the adaptive mode and settings.
        </Text>

        <View style={styles.buttonGrid}>
          {([20, 50, 75, 90] as const).map((value) => (
            <TouchableOpacity
              key={value}
              style={[
                styles.absButton,
                isSimulating && simulatedValue === value && styles.absButtonActive,
              ]}
              onPress={() => simulateABS(value)}
            >
              <Text style={styles.absButtonLabel}>ABS {value}</Text>
              <Text style={styles.absButtonMode}>
                {value <= 25
                  ? "Ultra Saver"
                  : value <= 50
                  ? "Power Saver"
                  : value <= 75
                  ? "Balanced"
                  : "Performance"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.clearButton]}
            onPress={clearSimulation}
          >
            <Text style={styles.actionButtonText}>Clear Simulation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.refreshButton]}
            onPress={refresh}
          >
            <Text style={styles.actionButtonText}>Refresh Battery Data</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Error ── */}
      {error ? (
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>Error</Text>
          <Text style={styles.errorText}>{String(error)}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 48,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#555",
    marginBottom: 16,
  },

  // Simulation banner
  simBanner: {
    backgroundColor: "#1a6ebd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  simBannerLabel: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
  },
  simBannerValue: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  // Cards
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },

  // Large values (score / mode)
  label: {
    fontSize: 12,
    color: "#777",
    marginTop: 8,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111",
    marginBottom: 4,
  },
  modeValue: {
    color: "#1a6ebd",
  },

  // Row layout for settings
  rowWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  rowLabel: {
    fontSize: 14,
    color: "#444",
    flex: 1,
  },
  rowVal: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
    textAlign: "right",
  },

  note: {
    fontSize: 12,
    color: "#777",
    marginTop: 10,
    lineHeight: 18,
    fontStyle: "italic",
  },

  // ABS simulation buttons
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
  },
  absButton: {
    borderWidth: 1.5,
    borderColor: "#1a6ebd",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    minWidth: 80,
  },
  absButtonActive: {
    backgroundColor: "#1a6ebd",
  },
  absButtonLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1a6ebd",
  },
  absButtonMode: {
    fontSize: 10,
    color: "#555",
    marginTop: 2,
  },

  // Action buttons row
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  refreshButton: {
    backgroundColor: "#1a6ebd",
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111",
  },

  // Error
  errorCard: {
    backgroundColor: "#fff3f3",
    borderWidth: 1,
    borderColor: "#f0a0a0",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#c00",
    marginBottom: 4,
  },
  errorText: {
    fontSize: 13,
    color: "#c00",
    lineHeight: 18,
  },
});

export default BatteryAdaptiveDemoScreen;