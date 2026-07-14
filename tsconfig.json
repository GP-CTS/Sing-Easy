import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { useAppStore } from "@/store/useAppStore";
import { AppButton } from "@/components/AppButton";
import { BadgePill } from "@/components/Badge";

const DURATIONS = [10, 20, 45];

export function PlannerScreen() {
  const store = useAppStore();
  const [selectedMin, setSelectedMin] = useState(20);
  const [remainingSec, setRemainingSec] = useState(20 * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) {
      setRemainingSec(selectedMin * 60);
    }
  }, [selectedMin]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function toggleTimer() {
    if (running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setRunning(false);
      return;
    }
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setRemainingSec((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setRunning(false);
          store.markPracticedToday();
          Alert.alert("Session complete!", "Great practice today.");
          return selectedMin * 60;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function resetTimer() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
    setRemainingSec(selectedMin * 60);
  }

  const mm = String(Math.floor(remainingSec / 60)).padStart(2, "0");
  const ss = String(remainingSec % 60).padStart(2, "0");

  const dayLetters = ["S", "M", "T", "W", "T", "F", "S"];
  const activeDays = store.streak >= 7 ? 7 : store.streak % 7;

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Daily Practice Planner</Text>
        <Text style={styles.sub}>Choose a routine length and press start when you're ready to sing.</Text>

        <View style={styles.durationRow}>
          {DURATIONS.map((min) => (
            <Pressable
              key={min}
              onPress={() => !running && setSelectedMin(min)}
              style={[styles.durationBtn, selectedMin === min && styles.durationBtnSelected]}
            >
              <Text style={styles.durationNum}>{min}</Text>
              <Text style={styles.durationLabel}>MIN</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.timer}>
            {mm}:{ss}
          </Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <AppButton
              label={running ? "Pause" : "Start Session"}
              onPress={toggleTimer}
              style={{ flex: 1 }}
            />
            <AppButton label="Reset" variant="secondary" onPress={resetTimer} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>This week</Text>
          <View style={styles.badgeRow}>
            {dayLetters.map((d, i) => (
              <BadgePill key={i} label={d} unlocked={i < activeDays} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, paddingBottom: 60 },
  title: { ...typography.displayMd, color: colors.ivory, marginBottom: 4 },
  sub: { color: colors.muted, fontSize: 13.5, marginBottom: 18 },
  durationRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  durationBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    alignItems: "center",
  },
  durationBtnSelected: {
    borderColor: colors.gold,
    backgroundColor: "rgba(201,162,39,0.1)",
  },
  durationNum: { fontFamily: "monospace", fontSize: 20, color: colors.goldBright },
  durationLabel: { fontSize: 11, color: colors.muted, marginTop: 2 },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  timer: {
    textAlign: "center",
    fontFamily: "monospace",
    fontSize: 48,
    fontWeight: "700",
    color: colors.ivory,
    paddingVertical: 24,
  },
  cardTitle: { ...typography.title, color: colors.ivory, marginBottom: 8 },
  badgeRow: { flexDirection: "row", gap: 8 },
});
