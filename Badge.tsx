import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { colors } from "@/theme/colors";
import { toEmbedUrl } from "@/utils/youtube";

interface Props {
  url: string | null;
  emptyLabel?: string;
}

/**
 * Renders a YouTube video inline via WebView. Swap for
 * `react-native-youtube-iframe` later if you want finer playback control
 * (background audio, playback speed, looping a section) — the embed URL
 * approach here is the fastest path to "it just plays."
 */
export function YouTubeEmbed({ url, emptyLabel = "No video linked yet" }: Props) {
  const embedUrl = url ? toEmbedUrl(url) : null;

  if (!embedUrl) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>{emptyLabel}</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <WebView
        source={{ uri: embedUrl }}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        style={{ backgroundColor: "#0F0D18" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    aspectRatio: 16 / 9,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#0F0D18",
    marginBottom: 10,
  },
  empty: {
    aspectRatio: 16 / 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.line,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  emptyText: { color: colors.muted, fontSize: 12.5 },
});
