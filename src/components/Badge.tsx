import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

interface Props {
  label: string;
  unlocked: boolean;
}

export function BadgePill({ label, unlocked }: Props) {
  return (
    <View style={[styles.pill, unlocked ? styles.pillOn : styles.pillOff]}>
      <Text style={[styles.text, unlocked ? styles.textOn : styles.textOff]}>
        {unlocked ? "★ " : "🔒 "}
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderRadius: 16,
    borderWidth: 1,
  },
  pillOn: {
    borderColor: colors.gold,
    backgroundColor: "rgba(201,162,39,0.08)",
  },
  pillOff: { borderColor: colors.line, backgroundColor: "transparent" },
  text: { fontSize: 11.5, fontWeight: "600" },
  textOn: { color: colors.goldBright },
  textOff: { color: colors.muted },
});
