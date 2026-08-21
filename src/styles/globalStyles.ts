import { StyleSheet } from "react-native";
import { Colors } from "../theme/colors";
import { Spacing, Radius } from "../theme/spacing";

export const GlobalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },

  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingHorizontal: Spacing.lg,
  },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  spaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.sm,
    letterSpacing: -0.2,
  },

  bodyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },

  muted: {
    fontSize: 12,
    color: Colors.textMuted,
  },

  primaryBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: "center",
  },

  primaryBtnText: {
    fontSize: 16,
    fontWeight: "800",
    color: Colors.textOnDark,
    letterSpacing: 0.3,
  },
});