// components/common/Typography.tsx
import React from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";
import { useUnistyles } from "react-native-unistyles";

// Define supported text variants
type TypographyVariant = "h1"| "h1_b" | "h2" | "subtitle" | "body" | "caption";

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  weight?: "400" | "500" | "600" | "700" | "800" | "900";
  align?: "left" | "center" | "right";
  children: React.ReactNode;
}

export const Typography = ({
  variant = "body",
  color,
  weight,
  align = "left",
  style,
  children,
  ...props
}: TypographyProps) => {
  // Access the current theme and runtime info using v3 hook
  const { theme } = useUnistyles();

  // Combine base styles with dynamic properties
  const dynamicStyle: TextStyle = {
    color: color || theme.colors.text,
    textAlign: align,
    // Variable font allows granular weight control
    ...(weight && { fontWeight: weight }),
  };

  return (
    <Text style={[typographyStyles[variant], dynamicStyle, style]} {...props}>
      {children}
    </Text>
  );
};

// Styles are parsed and optimized by the Unistyles Nitro engine
const typographyStyles = StyleSheet.create({
  h1: {
    fontFamily: "PretendardVariable",
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h1_b: {
    fontFamily: "PretendardVariable",
    fontSize: 32,
    fontWeight: "900",
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: "PretendardVariable",
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontFamily: "PretendardVariable",
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
  },
  body: {
    fontFamily: "PretendardVariable",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
  },
  caption: {
    fontFamily: "PretendardVariable",
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 18,
  },
});
