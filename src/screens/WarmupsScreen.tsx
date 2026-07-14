import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { useAppStore } from "@/store/useAppStore";
import { WARMUP_CATEGORIES } from "@/data/warmupContent";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { AppButton } from "@/components/AppButton";
import { isValidYouTubeUrl } from "@/utils/youtube";

export function WarmupsScreen() {
  const store = useAppStore();
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  function save(key: string) {
    const url = drafts[key];
    if (url && isValidYouTubeUrl(url)) {
      store.setWarmupLink(key, url);
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Vocal Warm-ups</Text>
        <Text style={styles.sub}>Pick a routine and paste your YouTube link once — it stays saved.</Text>

        {WARMUP_CATEGORIES.map((w) => (
          <View key={w.key} style={styles.card}>
            <Text style={styles.cardTitle}>{w.name}</Text>
            <YouTubeEmbed url={store.warmupLinks[w.key] ?? null} />
            <TextInput
              style={styles.input}
              placeholder="Paste YouTube link"
              placeholderTextColor={colors.muted}
              value={drafts[w.key] ?? store.warmupLinks[w.key] ?? ""}
              onChangeText={(t) => setDrafts((d) => ({ ...d, [w.key]: t }))}
              autoCapitalize="none"
            />
            <AppButton label="Save" variant="secondary" onPress={() => save(w.key)} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, paddingBottom: 60 },
  title: { ...typography.displayMd, color: colors.ivory, marginBottom: 4 },
  sub: { color: colors.muted, fontSize: 13.5, marginBottom: 18 },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: { ...typography.title, color: colors.ivory, marginBottom: 8 },
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
