import "@/global.css";
import { useSplashLoading } from "@/hooks/useSplashLoading";
import "@/unistyles";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React from "react";
import "react-native-reanimated";

export const LogitThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loaded, error] = useFonts({
    PretendardVariable: require("@/assets/fonts/PretendardVariable.ttf"),
  });

  const [, setLoading] = useSplashLoading("theme");

  React.useEffect(() => {
    if (loaded || error) {
      setLoading(false);
    }
  }, [loaded, error, setLoading]);

  if (!loaded && !error) {
    return null;
  }
  return <ThemeProvider value={DefaultTheme}>{children}</ThemeProvider>;
};
