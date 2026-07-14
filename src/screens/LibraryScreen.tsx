import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput, Pressable, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { useAppStore } from "@/store/useAppStore";
import { LIBRARY_CATEGORIES } from "@/data/libraryCategories";
import { AppButton } from "@/components/AppButton";
import { isValidYouTubeUrl } from "@/utils/youtube";

export function LibraryScreen() {
  const store = useAppStore();
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  function addVideo(category: string) {
    const url = drafts[category]?.trim();
    if (!url || !isValidYouTubeUrl(url)) return;
    store.addLibraryVideo(category, url);
    setDrafts((d) => ({ ...d, [category]: "" }));
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Your Existing Content</Text>
        <Text style={styles.sub}>
          Organize your YouTube videos into categories your students can browse.
        </Text>

        {LIBRARY_CATEGORIES.map((cat) => {
          const items = store.libraryLinks[cat] ?? [];
          return (
            <View key={cat} style={styles.card}>
              <Text style={styles.catTag}>{cat}</Text>

              {items.length === 0 ? (
                <Text style={styles.emptyText}>No videos added yet</Text>
              ) : (
                items.map((v) => (
                  <View key={v.id} style={styles.contentItem}>
                    <Pressable style={{ flex: 1 }} onPress={() => Linking.openURL(v.url)}>
                      <Text style={styles.link} numberOfLines={1}>
                        {v.url}
                      </Text>
                    </Pressable>
                    <Pressable onPress={() => store.removeLibraryVideo(cat, v.id)}>
                      <Text style={styles.del}>✕</Text>
                    </Pressable>
                  </View>
                ))
              )}

              <TextInput
                style={styles.input}
                placeholder="Paste YouTube link"
                placeholderTextColor={colors.muted}
                value={drafts[cat] ?? ""}
                onChangeText={(t) => setDrafts((d) => ({ ...d, [cat]: t }))}
                autoCapitalize="none"
              />
              <AppButton label="Add Video" variant="secondary" onPress={() => addVideo(cat)} />
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
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  catTag: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: colors.surface2,
    color: colors.goldBright,
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 10,
    overflow: "hidden",
  },
  emptyText: { color: colors.muted, fontSize: 12, marginBottom: 8 },
  contentItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    backgroundColor: colors.surface2,
    borderRadius: 10,
    marginBottom: 6,
  },
  link: { color: colors.ivory, fontSize: 13 },
  del: { color: colors.muted, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 9,
    padding: 10,
    color: colors.ivory,
    marginBottom: 8,
    marginTop: 4,
    fontSize: 13,
  },
});
