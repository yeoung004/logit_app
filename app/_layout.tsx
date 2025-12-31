import "@/global.css";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../unistyles";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LogitThemeProvider>
        <Main />
      </LogitThemeProvider>
    </SafeAreaProvider>
  );
}

const Main = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

const LogitThemeProvider = ({ children }: { children: React.ReactNode }) => {
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
