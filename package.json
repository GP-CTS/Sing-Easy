import React, { useRef, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { Picker } from "@react-native-picker/picker"; // see README: install this package
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";

const SHRUTI_NOTES = [
  { label: "C", freq: 130.81 },
  { label: "C#", freq: 138.59 },
  { label: "D", freq: 146.83 },
  { label: "D#", freq: 155.56 },
  { label: "E", freq: 164.81 },
  { label: "F", freq: 174.61 },
  { label: "F#", freq: 185.0 },
  { label: "G", freq: 196.0 },
];

// Local HTML asset bundled with the app; see assets/tanpura-widget.html
// Requires metro.config.js to include "html" in assetExts (already set up
// in this project — see metro.config.js).
const WIDGET_SOURCE = require("../../assets/tanpura-widget.html");

export function ShrutiScreen() {
  const webviewRef = useRef<WebView>(null);
  const [noteIndex, setNoteIndex] = useState(4); // E
  const [octaveMul, setOctaveMul] = useState(1); // 1 = male, 1.5 = female

  function sendShruti() {
    const payload = JSON.stringify({
      type: "setShruti",
      baseFreq: SHRUTI_NOTES[noteIndex].freq,
      octaveMul,
    });
    webviewRef.current?.postMessage(payload);
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Shruti & Tanpura Practice</Text>
        <Text style={styles.sub}>Play your tanpura drone, then match it with your voice.</Text>

        <View style={styles.card}>
          <View style={styles.pickerRow}>
            <View style={styles.pickerWrap}>
              <Picker
                selectedValue={octaveMul}
                onValueChange={(v) => {
                  setOctaveMul(v);
                  sendShruti();
                }}
                style={styles.picker}
                dropdownIconColor={colors.ivory}
              >
                <Picker.Item label="Male voice (lower)" value={1} />
                <Picker.Item label="Female voice (higher)" value={1.5} />
              </Picker>
            </View>
            <View style={styles.pickerWrap}>
              <Picker
                selectedValue={noteIndex}
                onValueChange={(v) => {
                  setNoteIndex(v);
                  sendShruti();
                }}
                style={styles.picker}
                dropdownIconColor={colors.ivory}
              >
                {SHRUTI_NOTES.map((n, i) => (
                  <Picker.Item key={n.label} label={n.label} value={i} />
                ))}
              </Picker>
            </View>
          </View>

          {/*
            The tanpura drone and mic-based pitch detection are implemented
            in assets/tanpura-widget.html using the Web Audio API — genuine
            audio synthesis, not a mock. A WebView is the pragmatic path to
            real-time audio synthesis + FFT pitch detection without writing
            a native module. Swap for a native module (e.g. react-native-audio-api)
            later if you want tighter native integration.
          */}
          <WebView
            ref={webviewRef}
            source={WIDGET_SOURCE}
            style={styles.webview}
            onLoadEnd={sendShruti}
            javaScriptEnabled
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            originWhitelist={["*"]}
          />
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
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
  },
  pickerRow: { flexDirection: "row", gap: 8, marginBottom: 8 },
  pickerWrap: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 9,
    backgroundColor: colors.surface,
  },
  picker: { color: colors.ivory },
  webview: { height: 340, backgroundColor: "transparent" },
});
