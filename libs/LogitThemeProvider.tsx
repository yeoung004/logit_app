import "@/global.css";
import "@/unistyles";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import "react-native-reanimated";

export const LogitThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [loaded, error] = useFonts({
    PretendardVariable: require("@/assets/fonts/PretendardVariable.ttf"),
  });

  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return <ThemeProvider value={DefaultTheme}>{children}</ThemeProvider>;
};
