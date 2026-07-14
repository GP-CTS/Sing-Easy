import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";
import { colors } from "@/theme/colors";

interface Props {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  style?: ViewStyle;
}

export function AppButton({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  style,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        variant === "primary" ? styles.primary : styles.secondary,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          variant === "primary" ? styles.textPrimary : styles.textSecondary,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 9,
    alignItems: "center",
  },
  primary: { backgroundColor: colors.gold },
  secondary: {
    backgroundColor: colors.surface2,
    borderWidth: 1,
    borderColor: colors.line,
  },
  disabled: { opacity: 0.5 },
  text: { fontWeight: "600", fontSize: 13.5 },
  textPrimary: { color: colors.bg },
  textSecondary: { color: colors.ivory },
});
