/**
 * Design tokens — the single source of truth for color across the app.
 * Palette: a night-concert-stage feel (deep indigo, brass gold, kumkum maroon),
 * matched to the Carnatic music subject matter.
 */
export const colors = {
  bg: "#14121F",
  surface: "#1E1A2E",
  surface2: "#2A2440",
  line: "#352F4D",

  gold: "#C9A227",
  goldBright: "#E4C34A",
  maroon: "#9B2F3D",

  ivory: "#F3ECE0",
  muted: "#9C93B8",

  success: "#4CAF7D",
  danger: "#C24E4E",
} as const;

export type ColorToken = keyof typeof colors;
