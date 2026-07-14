/**
 * Typography scale.
 * Display text uses a serif for a classical, warm feel; body text stays
 * on the platform system font for readability and native performance.
 * (Swap `display.fontFamily` for a loaded custom font — e.g. Fraunces via
 * expo-font — once you're ready to bundle it.)
 */
import { TextStyle } from "react-native";

export const typography: Record<string, TextStyle> = {
  displayLg: {
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  displayMd: {
    fontSize: 20,
    fontWeight: "600",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
  },
  body: {
    fontSize: 14,
    fontWeight: "400",
  },
  caption: {
    fontSize: 12,
    fontWeight: "500",
  },
  mono: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "monospace",
  },
};
