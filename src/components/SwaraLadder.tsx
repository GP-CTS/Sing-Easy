import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { SWARAS } from "@/data/courseContent";

interface Props {
  currentStageIndex: number; // 0-6, which swara stage is active
}

/**
 * The app's signature element: progress expressed through the actual
 * Carnatic solfège (Sa Ri Ga Ma Pa Da Ni) rather than generic numbering,
 * since the swaras genuinely are the sequence the learner moves through.
 */
export function SwaraLadder({ currentStageIndex }: Props) {
  return (
    <View>
      <View style={styles.row}>
        {SWARAS.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i < currentStageIndex && styles.dotDone,
              i === currentStageIndex && styles.dotCurrent,
            ]}
          />
        ))}
      </View>
      <View style={styles.labelRow}>
        {SWARAS.map((s, i) => (
          <Text
            key={s}
            style={[styles.label, i === currentStageIndex && styles.labelActive]}
          >
            {s}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 6, marginTop: 14 },
  dot: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.surface2,
  },
  dotDone: { backgroundColor: colors.gold },
  dotCurrent: { backgroundColor: colors.goldBright, opacity: 0.6 },
  labelRow: { flexDirection: "row", gap: 6, marginTop: 6 },
  label: {
    flex: 1,
    textAlign: "center",
    fontSize: 10,
    color: colors.muted,
    fontFamily: "monospace",
  },
  labelActive: { color: colors.goldBright },
});
