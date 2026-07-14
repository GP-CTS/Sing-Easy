import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

interface Props {
  value: string | number;
  label: string;
}

export function StatCard({ value, label }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
  },
  value: {
    fontFamily: "monospace",
    fontSize: 24,
    fontWeight: "700",
    color: colors.goldBright,
  },
  label: { fontSize: 12, color: colors.muted, marginTop: 2 },
});
