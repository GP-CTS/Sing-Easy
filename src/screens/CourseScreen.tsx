import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { useAppStore } from "@/store/useAppStore";
import { COURSE_CONTENT } from "@/data/courseContent";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { AppButton } from "@/components/AppButton";
import { isValidYouTubeUrl } from "@/utils/youtube";

export function CourseScreen() {
  const store = useAppStore();
  const [openDay, setOpenDay] = useState<number | null>(null);
  const [draftUrl, setDraftUrl] = useState("");

  function openLesson(day: number) {
    if (openDay === day) {
      setOpenDay(null);
      return;
    }
    setOpenDay(day);
    setDraftUrl(store.courseLinks[day] ?? "");
  }

  function saveLink(day: number) {
    if (isValidYouTubeUrl(draftUrl)) {
      store.setCourseLink(day, draftUrl);
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>30-Day Beginner Challenge</Text>
        <Text style={styles.sub}>Daily 10–15 minute lessons. Complete one to unlock the next.</Text>

        {COURSE_CONTENT.map(({ day, title }) => {
          const done = store.completedDays.includes(day);
          const unlocked = store.isDayUnlocked(day);
          const isOpen = openDay === day;

          return (
            <View key={day}>
              <Pressable
                onPress={() => unlocked && openLesson(day)}
                style={[styles.dayItem, done && styles.dayDone, !unlocked && styles.dayLocked]}
              >
                <View style={[styles.dayNum, done && styles.dayNumDone]}>
                  <Text style={[styles.dayNumText, done && styles.dayNumTextDone]}>
                    {done ? "✓" : day}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.dayTitle}>
                    Day {day}: {title}
                  </Text>
                  <Text style={styles.dayMeta}>
                    {!unlocked
                      ? `Locked — finish Day ${day - 1}`
                      : done
                      ? "Completed"
                      : "10–15 min lesson"}
                  </Text>
                </View>
              </Pressable>

              {isOpen && (
                <View style={styles.detail}>
                  <YouTubeEmbed
                    url={store.courseLinks[day] ?? null}
                    emptyLabel="Paste your YouTube link below to load this lesson"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="https://youtube.com/watch?v=..."
                    placeholderTextColor={colors.muted}
                    value={draftUrl}
                    onChangeText={setDraftUrl}
                    autoCapitalize="none"
                  />
                  <View style={{ flexDirection: "row", gap: 8 }}>
                    <AppButton label="Save Link" variant="secondary" onPress={() => saveLink(day)} style={{ flex: 1 }} />
                    <AppButton
                      label={done ? "Completed ✓" : "Mark Complete"}
                      disabled={done}
                      onPress={() => store.completeDay(day)}
                      style={{ flex: 1 }}
                    />
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, paddingBottom: 60 },
  title: { ...typography.displayMd, color: colors.ivory, marginBottom: 4 },
  sub: { color: colors.muted, fontSize: 13.5, marginBottom: 18 },
  dayItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 13,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    marginBottom: 8,
  },
  dayDone: {},
  dayLocked: { opacity: 0.45 },
  dayNum: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: colors.surface2,
    alignItems: "center",
    justifyContent: "center",
  },
  dayNumDone: { backgroundColor: colors.gold },
  dayNumText: { fontFamily: "monospace", fontSize: 12, color: colors.muted },
  dayNumTextDone: { color: colors.bg },
  dayTitle: { fontSize: 14.5, fontWeight: "500", color: colors.ivory },
  dayMeta: { fontSize: 12, color: colors.muted, marginTop: 1 },
  detail: {
    backgroundColor: colors.surface2,
    borderRadius: 12,
    padding: 14,
    marginTop: -4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.line,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 9,
    padding: 10,
    color: colors.ivory,
    marginBottom: 8,
    fontSize: 13,
  },
});
