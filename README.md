import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { useAppStore } from "@/store/useAppStore";
import { SwaraLadder } from "@/components/SwaraLadder";
import { StatCard } from "@/components/StatCard";
import { BadgePill } from "@/components/Badge";
import { BADGES } from "@/data/badges";
import { SWARAS, TOTAL_COURSE_DAYS } from "@/data/courseContent";

export function DashboardScreen() {
  const progress = useAppStore();
  const stageIndex = progress.currentSwaraStageIndex();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.brand}>Sing Easy</Text>
        <Text style={styles.brandSub}>Carnatic vocal training, one swara at a time</Text>
        <SwaraLadder currentStageIndex={stageIndex} />

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Your progress</Text>
        <Text style={styles.sectionSub}>Consistency beats intensity — sing a little, every day.</Text>

        <View style={styles.statGrid}>
          <StatCard value={progress.streak} label="Day streak" />
          <StatCard value={progress.daysPracticed} label="Days practiced" />
          <StatCard
            value={`${progress.completedDays.length}/${TOTAL_COURSE_DAYS}`}
            label="Lessons completed"
          />
          <StatCard value={SWARAS[stageIndex]} label="Current stage" />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Badges</Text>
          <View style={styles.badgeRow}>
            {BADGES.map((b) => (
              <BadgePill key={b.id} label={b.name} unlocked={b.isUnlocked(progress)} />
            ))}
          </View>
        </View>

        <Text style={styles.roadmap}>
          Coming next on the roadmap: swara & ear-training games, record-and-compare, music
          theory, singing games, community leaderboard, and AI pitch feedback (Premium).
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, paddingBottom: 60 },
  brand: { ...typography.displayMd, color: colors.ivory, fontSize: 20 },
  brandSub: { color: colors.muted, fontSize: 12.5, marginTop: 2 },
  sectionTitle: { ...typography.displayMd, color: colors.ivory },
  sectionSub: { color: colors.muted, fontSize: 13.5, marginBottom: 16, marginTop: 4 },
  statGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 16 },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: { ...typography.title, color: colors.ivory, marginBottom: 8 },
  badgeRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  roadmap: {
    textAlign: "center",
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    paddingTop: 8,
  },
});
